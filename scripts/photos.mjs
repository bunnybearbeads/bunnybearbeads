/**
 * Сжатие фото для сайта. В базе (Dropbox) лежат оригиналы — готовые JPEG в полном размере;
 * на сайт уходят уменьшенные копии в двух форматах:
 *   - AVIF — основной: легче JPEG в 1,5–2 раза. Цвет без понижения разрешения (4:4:4):
 *     на мелких цветных бусинах обычное 4:2:0 размывает границы;
 *   - JPEG (mozjpeg) — запасной для браузеров без AVIF (iOS 15 и старше, Opera Mini).
 * Браузер скачивает только один из них (<picture>, src/components/Photo/Photo.astro).
 *
 * Ширины — под места на сайте (все фото 3:4):
 *   240  — превью в галерее, фото к комментариям, плашка семейства;
 *   720  — карточка каталога;
 *   1440 — галерея на странице изделия;
 *   2160 — лайтбокс: бисер разглядывают при увеличении.
 * Больше оригинала не растягиваем: у фото шириной 1440 будут только 240, 720 и 1440.
 *
 * Файлы: <slug>/<путь без расширения>-<ширина>.avif|.jpg. Пересжимается только изменённый оригинал
 * (размер и время изменения в кэше) или всё, если поменялись настройки ниже (PHOTO_VERSION).
 * EXIF, в том числе GPS, в копии не попадает.
 */
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export const PHOTO_WIDTHS = [240, 720, 1440, 2160];
export const PHOTO_FORMATS = ['avif', 'jpg'];
const AVIF = { quality: 50, effort: 4, chromaSubsampling: '4:4:4' };
const JPEG = { quality: 80, mozjpeg: true };
/** Поменяли ширины или качество — поменяйте версию: все фото пересожмутся */
const PHOTO_VERSION = `${PHOTO_WIDTHS.join(',')}|${JSON.stringify(AVIF)}|${JSON.stringify(JPEG)}`;

/** Размер с учётом поворота из EXIF: телефон пишет 4032×3024 + «повернуть», а кадр вертикальный */
export async function readPhotoSize(source) {
  const meta = await sharp(source).metadata();
  const rotated = (meta.orientation ?? 1) >= 5;
  return rotated ? { width: meta.height, height: meta.width } : { width: meta.width, height: meta.height };
}

/** Ширины копий для оригинала этой ширины */
export function photoWidths(sourceWidth) {
  const widths = PHOTO_WIDTHS.filter((w) => w < sourceWidth);
  const largest = Math.min(sourceWidth, PHOTO_WIDTHS.at(-1));
  if (!widths.includes(largest)) widths.push(largest);
  return widths;
}

/** Все файлы копий фото, относительно папки public/images/products */
export function photoFiles(base, widths) {
  return widths.flatMap((w) => PHOTO_FORMATS.map((format) => `${base}-${w}.${format}`));
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

  if (todo.length) logger.info(`photos: compressing ${todo.length} photo(s), AVIF is slow — about a few seconds each`);
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
  for (const width of widths) {
    const resized = original.clone().resize({ width });
    await Promise.all([
      resized.clone().avif(AVIF).toFile(path.join(outDir, `${base}-${width}.avif`)),
      resized.clone().jpeg(JPEG).toFile(path.join(outDir, `${base}-${width}.jpg`)),
    ]);
  }
}
