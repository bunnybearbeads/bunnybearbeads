/**
 * Сжатие фото для сайта. В базе (Dropbox) лежат оригиналы — готовые JPEG в полном размере;
 * на сайт уходят уменьшенные копии в JPEG (mozjpeg). Один формат, без AVIF: AVIF легче, но требует
 * запасного JPEG — файлов и места на GitHub Pages вдвое больше. Выводит src/components/Photo/Photo.astro.
 *
 * Экономим место (500 изделий + видео должны влезть в 1 ГБ GitHub Pages): у фото всего две копии,
 * обе — под Retina и с сильным сжатием (качество 50). На Retina файл показывается 1:1 и артефакты
 * не видны на плотном экране; обычный экран получает тот же файл, уменьшенный вдвое, — артефакты
 * сглаживаются. Выбора размера браузером (srcset) нет: у каждого места на сайте свой файл.
 *
 * Ширины (фото изделия — 3:4):
 *   180  (180×240)   — small: миниатюры галереи (~90px на десктопе — ×2, на телефоне ×3), фото к комментариям;
 *   1080 (1080×1440) — large: галерея на странице, лайтбокс и карточка каталога — один файл на всё.
 * Больше оригинала не растягиваем: у узкого оригинала large — его собственная ширина.
 * thumb семейства — одна копия 160×88: плашка 80×44 (на мониторах от 1600px, иначе 71×39) × 2 для Retina.
 *
 * Файлы: <slug>/<путь без расширения>-<ширина>.jpg. Пересжимается только изменённый оригинал
 * (размер и время изменения в кэше) или всё, если поменялись настройки ниже (PHOTO_VERSION).
 * EXIF, в том числе GPS, в копии не попадает.
 */
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export const PHOTO_WIDTHS = [180, 1080];
/** thumb семейства: плашка 80×44 (Family.css, мониторы от 1600px) × 2 */
export const THUMB_WIDTH = 160;
const JPEG = { quality: 50, mozjpeg: true };
/** Поменяли ширины или качество — поменяйте версию: все фото пересожмутся */
const PHOTO_VERSION = `${PHOTO_WIDTHS.join(',')}|${JSON.stringify(JPEG)}`;

/** Размер с учётом поворота из EXIF: телефон пишет 4032×3024 + «повернуть», а кадр вертикальный */
export async function readPhotoSize(source) {
  const meta = await sharp(source).metadata();
  const rotated = (meta.orientation ?? 1) >= 5;
  return rotated ? { width: meta.height, height: meta.width } : { width: meta.width, height: meta.height };
}

/** Ширины копий для оригинала этой ширины; thumb — одна копия THUMB_WIDTH */
export function photoWidths(sourceWidth, { thumb = false } = {}) {
  if (thumb) return [Math.min(sourceWidth, THUMB_WIDTH)];
  const widths = PHOTO_WIDTHS.filter((w) => w < sourceWidth);
  const largest = Math.min(sourceWidth, PHOTO_WIDTHS.at(-1));
  if (!widths.includes(largest)) widths.push(largest);
  return widths;
}

/** Все файлы копий фото, относительно папки public/images/products */
export function photoFiles(base, widths) {
  return widths.map((w) => `${base}-${w}.jpg`);
}

/**
 * Сжимает фото, которые изменились с прошлого раза. photos: Map<base, { source, widths }>, base — путь
 * относительно outDir без ширины и расширения. Возвращает, сколько фото пересжато.
 */
export async function syncPhotos(photos, outDir, cacheFile, logger = console) {
  const cache = JSON.parse(await fsp.readFile(cacheFile, 'utf8').catch(() => '{}'));
  const next = {};
  const todo = [];
  for (const [base, { source, widths }] of photos) {
    const stat = fs.statSync(source);
    const stamp = { size: stat.size, mtimeMs: Math.round(stat.mtimeMs), version: PHOTO_VERSION };
    next[base] = stamp;
    const old = cache[base];
    const fresh =
      old && old.size === stamp.size && old.mtimeMs === stamp.mtimeMs && old.version === stamp.version &&
      photoFiles(base, widths).every((file) => fs.existsSync(path.join(outDir, file)));
    if (!fresh) todo.push({ base, source, widths });
  }

  if (todo.length) logger.info(`фото: сжимаю ${todo.length} шт.`);
  // По два фото за раз: sharp и так раскладывает кодирование по ядрам
  const queue = [...todo];
  const worker = async () => {
    for (let job = queue.shift(); job; job = queue.shift()) {
      await compressPhoto(job, outDir);
    }
  };
  await Promise.all([worker(), worker()]);

  await fsp.mkdir(path.dirname(cacheFile), { recursive: true });
  await fsp.writeFile(cacheFile, JSON.stringify(next));
  return todo.length;
}

async function compressPhoto({ base, source, widths }, outDir) {
  const original = sharp(source).rotate(); // поворот по EXIF; сам EXIF sharp в копию не пишет
  await fsp.mkdir(path.dirname(path.join(outDir, base)), { recursive: true });
  await Promise.all(
    widths.map((width) => original.clone().resize({ width }).jpeg(JPEG).toFile(path.join(outDir, `${base}-${width}.jpg`))),
  );
}
