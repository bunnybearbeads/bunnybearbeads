/**
 * Сборка данных сайта из базы изделий в Dropbox.
 *
 * `data/` — симлинк на папку в Dropbox, в git она не попадает. Одно изделие — одна папка:
 *
 *   data/
 *     Lumi/
 *       Lumi.json ← данные изделия, имя = имя папки: данные сайта, штуки (items), privateNote, даты
 *       site/…           ← фото и видео; на сайт попадают только файлы, указанные в JSON изделия
 *       …              ← что угодно ещё: процесс, схемы, черновики
 *     _system/         ← служебное (папки с «_» в начале — не изделия):
 *       families/*.json  ← семейства
 *       *.schema.json    ← подсказки для редактора (scripts/data-rules.mjs)
 *       demo/            ← демо-база той же структуры (со своей _system): примеры сложных случаев.
 *                          На сайт — только с DATA_DEMO=1 (`npm run dev:demo`), вместо настоящей базы
 *
 * На сайт уходят только изделия с `"site": true`:
 *   - src/content/products/<slug>.json — без items, privateNote, дат, maker; штуки в наличии свёрнуты в количество
 *     и цену по точкам, плюс цена в шапке и ремейк (статус и цена);
 *   - src/content/families/<id>.json;
 *   - public/images/products/<slug>/<путь из JSON изделия> — фото, сжатые в несколько размеров
 *     (JPEG, scripts/photos.mjs), и копии видео (+ постеры к ним, scripts/generate-posters.mjs).
 * Всё это генерируется и лежит в .gitignore.
 *
 * Любая проблема в базе роняет сборку со списком всего, что надо поправить:
 * битый JSON, конфликтная копия Dropbox, файл не найден или не скачан («только онлайн»),
 * дубль slug или id штуки, неизвестная точка, семейство ссылается на неизвестный товар.
 * Изделия с `"site": false` в семействах просто не показываются; семейство, где на сайте
 * меньше двух изделий, на сайт не уходит.
 *
 * Запускается сам при `astro dev` и `astro build` (интеграция в astro.config.mjs), в dev ещё и
 * следит за `data/`. Вручную: `npm run export-data`.
 */
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';
import { generateMissingPosters } from './generate-posters.mjs';
import { photoFiles, photoWidths, readPhotoSize, syncPhotos } from './photos.mjs';
import {
  ADDITIONAL_BEAD_COLORS, ADDITIONAL_BEAD_TYPES, ATTACH_TO, BEAD_TYPES, BRACELET_PARTS, braceletOptions, CATEGORIES, CHARM_FINDINGS, COLORS_PUBLIC, SIZE_FIELDS, DATE_FORMATS, DEMO_DIR, FAMILIES_DIR, ITEM_ID_RE, LOCATION_ORDER, MAKERS, MATERIAL_FIELDS, OUT_TYPES, THREAD_TYPES, PARTIAL_DATE_RE, SLUG_RE,
  THUMB_EXTENSIONS, THUMBS_DIR, schemaFiles, thumbKey,
} from './data-rules.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
/** DATA_DEMO=1 — демо-база data/_system/demo вместо настоящей (`npm run dev:demo`) */
export const IS_DEMO = Boolean(process.env.DATA_DEMO);
const DATA_DIR = IS_DEMO ? path.join(ROOT, 'data', DEMO_DIR) : path.join(ROOT, 'data');

const OUT_PRODUCTS = path.join(ROOT, 'src/content/products');
const OUT_FAMILIES = path.join(ROOT, 'src/content/families');
const OUT_MEDIA = path.join(ROOT, 'public/images/products');
const MEDIA_URL = '/images/products';
/** Кэш сжатых фото (что и из какого оригинала уже сжато) — вне git, только на этом компьютере */
const PHOTO_CACHE = path.join(ROOT, 'node_modules/.cache/bunnybearbeads', IS_DEMO ? 'photos-demo.json' : 'photos.json');

const BLOCK_TAG_RE = /<\/?(p|div|ul|ol|li|h[1-6]|blockquote)\b/i;
const VIDEO_RE = /\.(mp4|webm|ogg|mov)$/i;
const execFileAsync = promisify(execFile);
/** Фото изделия (gallery) — строго 3:4, вертикальные: под эту пропорцию свёрстаны галерея и карточки */
const PHOTO_RATIO = { width: 3, height: 4 };
/** Превью для плашки семейства (thumb) — 40:22, то есть 20:11: 240×132 */
const THUMB_RATIO = { width: 20, height: 11 };
/** Точно, без допуска: 2213×2952 не проходит как 3:4 — кадрировать до 2211×2948 */
const isRatio = (width, height, ratio) => width * ratio.height === height * ratio.width;
/** Конфликтные копии Dropbox: «file (Tony's conflicted copy 2026-11-23).json», в русском интерфейсе — «конфликтующая копия» */
const CONFLICT_RE = /conflicted copy|конфликтующая копия/i;
/** Служебные поля, которые на сайт не попадают никогда */
const PRIVATE_FIELDS = ['$schema', 'slug', 'site', 'items', 'locationNotes', 'remake'];
const OUT_FIELDS = ['type', 'date', 'paid', 'privateNote'];
/** Обязательно у изделий с "site": true (credits — отдельно, в checkCredits) */
const SITE_REQUIRED = [
  ['description', 'описание'],
  ['gallery', 'хотя бы одно фото'],
  ['size', 'размер и вес'],
];
const REMAKE_FIELDS = ['price', 'publicNote', 'publicNoteImages', 'privateNote'];
/** Старые имена комментариев: в базе теперь видно, что попадает на сайт (public), а что нет (private) */
const RENAMED_NOTES = { note: 'publicNote', noteImages: 'publicNoteImages', memo: 'privateNote' };

/** Ищет старые имена (note, noteImages, memo) на любой глубине — по одной ошибке на путь */
function checkRenamedNotes(value, where, errors, at = '') {
  if (Array.isArray(value)) {
    value.forEach((x, i) => checkRenamedNotes(x, where, errors, `${at}[${i}]`));
  } else if (value && typeof value === 'object') {
    for (const [key, x] of Object.entries(value)) {
      const field = at ? `${at}.${key}` : key;
      if (RENAMED_NOTES[key]) errors.push(`${where}, ${field}: поле "${key}" теперь называется "${RENAMED_NOTES[key]}"`);
      checkRenamedNotes(x, where, errors, field);
    }
  }
}

/** Комментарий из базы → как его ждёт сайт: { note, noteImages } */
const toSiteNote = ({ publicNote, publicNoteImages, ...rest } = {}) => ({
  ...rest,
  ...(publicNote ? { note: publicNote } : {}),
  ...(publicNoteImages ? { noteImages: publicNoteImages } : {}),
});

const GENERATED_NOTE = 'Generated by scripts/export-data.mjs from data/. Do not edit: changes will be overwritten.';

class DataErrors extends Error {
  constructor(errors) {
    super(`В базе изделий проблем: ${errors.length}. Сайт не собран, поправьте:\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  }
}

async function walkFiles(dir, onFile) {
  for (const entry of await fsp.readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) await walkFiles(fullPath, onFile);
    else if (entry.isFile()) await onFile(fullPath, entry.name);
  }
}

async function readJson(file, errors) {
  try {
    return JSON.parse(await fsp.readFile(file, 'utf8'));
  } catch (error) {
    errors.push(`${path.relative(DATA_DIR, file)}: ${error.message}`);
    return null;
  }
}

/**
 * Читает базу: папки изделий и семейства. Ничего не пишет.
 * Возвращает публичные данные и список файлов для копирования; ошибки копит в `errors`.
 */
async function collect(dataDir, errors, logger) {
  // Конфликтные копии — по всей базе, включая фото
  await walkFiles(dataDir, (file, name) => {
    if (CONFLICT_RE.test(name)) errors.push(`конфликтная копия Dropbox — разберитесь, какая версия правильная, лишнюю удалите: ${path.relative(dataDir, file)}`);
  });

  const products = new Map(); // slug → публичные данные (только site: true)
  const media = new Map(); // путь в public → исходный файл
  const slugOwners = new Map(); // slug → папка
  const hiddenSlugs = new Set(); // изделия с "site": false
  const titleOwners = new Map(); // название без учёта регистра → папка
  const itemOwners = new Map(); // id штуки → slug
  const photos = new Map(); // фото → копии разных размеров: путь в public без ширины и расширения → { source, widths }
  const photoReads = []; // размер фото читается в конце, все файлы разом
  // Превью thumb: ключ имени (thumbKey) → файл в _thumbs. Лишние файлы (изделий ещё нет) не мешают
  const thumbsDir = path.join(dataDir, THUMBS_DIR);
  const thumbs = new Map();
  if (fs.existsSync(thumbsDir)) {
    for (const name of (await fsp.readdir(thumbsDir)).sort()) {
      const ext = path.extname(name).toLowerCase();
      if (!THUMB_EXTENSIONS.includes(ext)) continue;
      const key = thumbKey(name.slice(0, -ext.length));
      if (thumbs.has(key)) errors.push(`${THUMBS_DIR}: два thumb для одного изделия: ${path.basename(thumbs.get(key))} и ${name}`);
      else thumbs.set(key, path.join(thumbsDir, name));
    }
  }

  const folders = (await fsp.readdir(dataDir, { withFileTypes: true }))
    .filter((e) => e.isDirectory() && !e.name.startsWith('_') && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort();

  for (const folder of folders) {
    const folderPath = path.join(dataDir, folder);
    // JSON изделия называется как папка: «Lumi/Lumi.json»
    const fileName = `${folder}.json`;
    const file = path.join(folderPath, fileName);
    if (!fs.existsSync(file)) {
      const otherJson = (await fsp.readdir(folderPath)).filter((f) => f.endsWith('.json'));
      if (otherJson.length) {
        // Скорее всего, папку переименовали, а JSON — нет: молча терять изделие с сайта нельзя
        errors.push(`«${folder}»: нет ${fileName}, есть ${otherJson.join(', ')} — JSON называется как папка, переименуйте`);
      } else {
        logger.warn(`«${folder}»: нет ${fileName}, папка пропущена`);
      }
      continue;
    }
    const raw = await readJson(file, errors);
    if (!raw) continue;

    const where = `«${folder}»`;
    checkRenamedNotes(raw, where, errors);
    // Пустые поля из шаблона (npm run fill-data) — то же, что их отсутствие
    const data = withoutEmpty(raw, where, errors) ?? {};
    const before = errors.length;
    const { slug } = data;

    if (typeof slug !== 'string' || !SLUG_RE.test(slug)) {
      errors.push(`${where}: slug — латиница строчными, цифры и дефисы, а сейчас ${JSON.stringify(slug)}`);
      continue;
    }
    if (slugOwners.has(slug)) errors.push(`${where}: slug «${slug}» уже занят изделием «${slugOwners.get(slug)}»`);
    slugOwners.set(slug, folder);
    // Название тоже уникально, без учёта регистра и лишних пробелов: Wild Rose и wild  rose — одно и то же
    if (typeof data.title === 'string') {
      const titleKey = data.title.trim().replace(/\s+/g, ' ').toLowerCase();
      if (titleOwners.has(titleKey)) errors.push(`${where}: название «${data.title}» уже есть у «${titleOwners.get(titleKey)}»`);
      titleOwners.set(titleKey, folder);
    }

    if ('images' in data) errors.push(`${where}: поле "images" теперь называется "gallery"`);
    if ('thumb' in data) errors.push(`${where}: уберите поле "thumb" — thumb берётся из ${THUMBS_DIR}/${folder}.png`);
    if ('materialsHtml' in data) errors.push(`${where}: поля "materialsHtml" больше нет — HTML в "materials" каждой штуки`);
    if ('materials' in data) errors.push(`${where}: "materials" теперь у штук (items), у каждой свои — уберите из изделия`);
    if ('designedBy' in data || 'designer' in data) {
      errors.push(`${where}: автор схемы теперь в "credits": { "design": "…", "craft": "bunnybearbeads", "photo": "" }`);
    }
    if (typeof data.site !== 'boolean') errors.push(`${where}: "site" — true или false`);

    if (data.description !== undefined && typeof data.description !== 'string') {
      errors.push(`${where}: "description" — пока одна строка по-английски, как "title", без переводов`);
    }
    // Описание и комментарии — один абзац: обёртку (<p class="product-header__description"> и т. п.) даёт сайт
    const texts = [
      ['description', data.description],
      ['remake.publicNote', data.remake?.publicNote],
      ...Object.entries(data.locationNotes ?? {}).map(([loc, n]) => [`locationNotes.${loc}.publicNote`, n?.publicNote]),
    ];
    // credits обязательны у изделий на сайте; у скрытых — по желанию, но если есть, проверяются
    if (data.site === true || data.credits !== undefined) checkCredits(data.credits, where, errors, data.site === true);
    for (const [field, value] of texts) {
      if (value && BLOCK_TAG_RE.test(JSON.stringify(value))) errors.push(`${where}, ${field}: без <p>, <div> и других блочных тегов — один абзац, обёртку даёт сайт`);
    }

    if ('categoryId' in data) errors.push(`${where}: поле "categoryId" теперь называется "category"`);
    if (!CATEGORIES.includes(data.category)) {
      errors.push(`${where}: "category" — одно из ${CATEGORIES.join(', ')}, а сейчас ${JSON.stringify(data.category)}`);
    }

    const { stock, price, remake, materials } = toSales(data, where, itemOwners, slug, errors, logger);
    if (data.site !== true) {
      hiddenSlugs.add(slug);
      continue;
    }
    // Изделию на сайте нужны описание, фото (заглушки в галерее нет), размер, вес и credits (проверены выше).
    // У скрытых ("site": false) всё это можно заполнить потом. Пустое значение — то же, что отсутствие
    for (const [field, what] of SITE_REQUIRED) {
      if (data[field] === undefined) errors.push(`${where}: изделию на сайте нужен "${field}" — ${what} (или "site": false)`);
    }

    // Пути к файлам в JSON изделия — относительно папки изделия
    const checkPath = (rel, field) => {
      if (typeof rel !== 'string' || !rel || path.isAbsolute(rel) || rel.split(/[\\/]/).includes('..')) {
        errors.push(`${where}, ${field}: путь — относительно папки изделия, без «..», а сейчас ${JSON.stringify(rel)}`);
        return null;
      }
      const source = path.join(folderPath, rel);
      const stat = fs.statSync(source, { throwIfNoEntry: false });
      if (!stat?.isFile()) {
        errors.push(`${where}, ${field}: файл не найден: ${rel}`);
      } else if (stat.size > 0 && stat.blocks === 0) {
        // Файл-заглушка Dropbox: место на диске не занято, содержимое только в облаке
        errors.push(`${where}, ${field}: файл в Dropbox «только онлайн» — сделайте папку доступной офлайн: ${rel}`);
      }
      return { source, target: `${slug}/${rel.split(path.sep).join('/')}` };
    };
    // Видео и постеры к ним — копируются как есть
    const toUrl = (rel, field) => {
      const file = checkPath(rel, field);
      if (!file) return rel;
      media.set(file.target, file.source);
      return `${MEDIA_URL}/${file.target}`;
    };
    // Фото — сжимаются в несколько размеров (scripts/photos.mjs). Размеры дописываются в конце, после чтения файлов.
    // ratio: точная пропорция (фото изделия — 3:4), иначе любая
    const addPhoto = (file, field, rel, { ratio, alt } = {}) => {
      const photo = { type: 'photo', base: '', widths: [], width: 0, height: 0, ...(alt ? { alt } : {}) };
      const base = file.target.replace(/\.[^./]+$/, '');
      photo.base = `${MEDIA_URL}/${base}`;
      photos.set(base, { source: file.source, widths: photo.widths });
      photoReads.push({ photo, where, field, rel, source: file.source, ratio });
      return photo;
    };
    const toPhoto = (rel, field, options) => {
      const file = checkPath(rel, field);
      return file ? addPhoto(file, field, rel, options) : { type: 'photo', base: '', widths: [], width: 0, height: 0 };
    };
    const isVideo = (item) => (typeof item === 'string' ? VIDEO_RE.test(item) : item?.type === 'video' || VIDEO_RE.test(item?.src ?? ''));
    const mapMedia = (item, field, options = {}) => {
      if (isVideo(item)) {
        const src = typeof item === 'string' ? item : item.src;
        return {
          type: 'video',
          src: toUrl(src, typeof item === 'string' ? field : `${field}.src`),
          ...(item.poster ? { poster: toUrl(item.poster, `${field}.poster`) } : {}),
        };
      }
      return typeof item === 'string'
        ? toPhoto(item, field, options)
        : toPhoto(item?.src, `${field}.src`, { ...options, alt: item?.alt });
    };

    const publicData = Object.fromEntries(Object.entries(data).filter(([key]) => !PRIVATE_FIELDS.includes(key)));
    if (materials) publicData.materials = materials;
    const size = toSize(data.size, where, errors, data.category);
    if (size) publicData.size = size;
    else delete publicData.size;
    if ('weight' in data) errors.push(`${where}: "weight" теперь внутри "size": { …, "weight": 4.5 }`);
    if (data.size !== undefined && size && size.weight === undefined) errors.push(`${where}: изделию на сайте нужен вес — "size.weight" в граммах`);
    publicData.gallery = (data.gallery ?? []).map((item, i) => mapMedia(item, `gallery[${i}]`, { ratio: PHOTO_RATIO }));
    // thumb — из _thumbs по имени папки. На сайте копия называется по slug: имя файла может быть служебным
    const thumbFile = thumbs.get(thumbKey(folder));
    if (!thumbFile) {
      errors.push(`${where}: нет thumb — изделию на сайте нужен ${THUMBS_DIR}/${folder}.png (40:22, например 240×132)`);
    } else {
      const stat = fs.statSync(thumbFile);
      const rel = `${THUMBS_DIR}/${path.basename(thumbFile)}`;
      if (stat.size > 0 && stat.blocks === 0) {
        errors.push(`${where}, thumb: файл в Dropbox «только онлайн» — сделайте ${THUMBS_DIR} доступной офлайн: ${rel}`);
      } else {
        publicData.thumb = addPhoto({ source: thumbFile, target: `${slug}/thumb${path.extname(thumbFile).toLowerCase()}` }, 'thumb', rel, { ratio: THUMB_RATIO });
      }
    }
    for (const entry of stock) {
      entry.noteImages = (entry.noteImages ?? []).map((item, i) => mapMedia(item, `locationNotes.${entry.locationId}.publicNoteImages[${i}]`));
    }
    if (remake) remake.noteImages = remake.noteImages.map((item, i) => mapMedia(item, `remake.publicNoteImages[${i}]`));

    // С ошибками на сайт не берём, но файлы всё равно проверены — в отчёт попадает всё сразу
    if (errors.length === before) products.set(slug, { $comment: GENERATED_NOTE, ...publicData, price, ...(remake ? { remake } : {}), stock });
  }

  // Семейства
  const families = new Map();
  const familiesDir = path.join(dataDir, FAMILIES_DIR);
  const familyOf = new Map();
  const familyFiles = fs.existsSync(familiesDir)
    ? (await fsp.readdir(familiesDir)).filter((f) => f.endsWith('.json')).sort()
    : [];
  for (const file of familyFiles) {
    const id = file.slice(0, -5);
    const raw = await readJson(path.join(familiesDir, file), errors);
    if (!raw) continue;
    checkRenamedNotes(raw, `${FAMILIES_DIR}/${file}`, errors);
    const data = withoutEmpty(raw, `${FAMILIES_DIR}/${file}`, errors) ?? {};
    for (const [i, member] of (data.members ?? []).entries()) {
      const where = `${FAMILIES_DIR}/${file}, members[${i}]`;
      // "site": false — изделие просто не показывается в семействе; с ошибками — о них уже сказано выше
      if (!slugOwners.has(member.product)) errors.push(`${where}: нет изделия со slug «${member.product}»`);
      if (familyOf.has(member.product)) {
        errors.push(`${where}: «${member.product}» уже в семействе «${familyOf.get(member.product)}» — изделие может быть только в одном`);
      }
      familyOf.set(member.product, id);
    }
    const members = (data.members ?? []).filter((member) => products.has(member.product)).map(toSiteNote);
    const { $schema, ...familyData } = data;
    if (members.length >= 2) {
      families.set(id, { $comment: GENERATED_NOTE, ...familyData, members });
    } else {
      // Плашка семейства — выбор между изделиями: из одного выбирать нечего
      const shown = members.length ? `только ${members.map((m) => m.product).join(', ')}` : 'ни одного';
      logger.warn(`семейство «${id}» на сайте не показывается: из его изделий на сайте ${shown}, а нужно минимум два ("site": true)`);
    }
  }

  for (const error of await Promise.all(photoReads.map(readPhoto))) {
    if (error) errors.push(error);
  }

  return { products, families, media, photos };
}

/**
 * Размер фото → в публичные данные (ширины копий, пропорция для разметки). У фото изделия ещё и проверка 3:4.
 * Поворот из EXIF учитывается: телефон пишет 4032×3024 + «повернуть», а это вертикальный кадр
 */
async function readPhoto({ photo, where, field, rel, source, ratio }) {
  if (!fs.existsSync(source)) return null; // «файл не найден» уже в списке ошибок
  let size;
  try {
    size = await readPhotoSize(source);
  } catch {
    return `${where}, ${field}: не удалось прочитать картинку (нужен JPEG, PNG или TIFF): ${rel}`;
  }
  const { width, height } = size;
  photo.width = width;
  photo.height = height;
  photo.widths.push(...photoWidths(width, { thumb: ratio === THUMB_RATIO }));
  if (!ratio || isRatio(width, height, ratio)) return null;
  // Подсказка: самый большой кадр нужной пропорции, который помещается в фото
  const units = Math.min(Math.floor(width / ratio.width), Math.floor(height / ratio.height));
  const crop = `${units * ratio.width}×${units * ratio.height}`;
  const name = ratio === THUMB_RATIO ? 'thumb должен быть строго 40:22' : 'фото должно быть строго 3:4, вертикальное';
  return `${where}, ${field}: ${name}, а сейчас ${width}×${height}: ${rel} — например, обрежьте до ${crop}`;
}

/**
 * Штуки изделия и `remake` → то, что видит сайт: наличие по точкам с ценами, цена в шапке, ремейк.
 * Ушедшие штуки (с `out`: продана, подарена, брак, себе) и служебные поля отбрасываются.
 * К точке добавляется её комментарий из `locationNotes`, если там есть штуки в наличии.
 * Проверяется для всех изделий, включая не попадающие на сайт: id штук уникальны по всей базе.
 */
function toSales(data, where, itemOwners, slug, errors, logger) {
  // Даты, мастер и цена — только у штук, а хотя бы одна штука есть всегда (её сплели)
  for (const field of ['craftedAt', 'createdAt', 'maker']) {
    if (field in data) errors.push(`${where}: "${field}" — поле штуки (items), уберите из изделия`);
  }
  if ('price' in data) errors.push(`${where}: "price" — поле штуки (items); цена ремейка — "remake.price"`);
  const items = Array.isArray(data.items) ? data.items : [];
  if (items.length === 0) errors.push(`${where}: в "items" нужна хотя бы одна штука (ушедшие не удаляются, у них out)`);

  const available = new Map(); // точка → цены штук в наличии (должны совпадать)
  // Материалы — у каждой штуки свои (HTML; в JSON массивом строк, склеиваются в одну строку)
  let lastMaterials;
  let lastAvailableMaterials;
  items.forEach((item, index) => {
    const at = `${where}, items[${index}]`;
    if (!item.id) {
      errors.push(`${at}: нет id`);
      return;
    }
    if (!ITEM_ID_RE.test(item.id)) errors.push(`${at}: id — 3–4 заглавные латинские буквы и две цифры, например PWST01, а сейчас «${item.id}»`);
    if (itemOwners.has(item.id)) errors.push(`${at}: id «${item.id}» уже есть у штуки в «${itemOwners.get(item.id)}»`);
    itemOwners.set(item.id, slug);
    if (!MAKERS.includes(item.maker)) errors.push(`${at}: "maker" — одно из ${MAKERS.join(', ')}`);
    if (data.category === 'charm') {
      if (!ATTACH_TO.includes(item.attachTo)) errors.push(`${at}: у брелка нужен "attachTo" — одно из ${ATTACH_TO.join(', ')}`);
    } else if ('attachTo' in item) {
      errors.push(`${at}: "attachTo" — только у брелков (charm), а это «${data.category}»`);
    }
    if (!isPrice(item.price)) errors.push(`${at}: "price" — цена в донгах числом без кавычек, а сейчас ${JSON.stringify(item.price)}`);
    if ('createdAt' in item) errors.push(`${at}: поле "createdAt" теперь называется "craftedAt"`);
    else if (!isPartialDate(item.craftedAt)) errors.push(`${at}: "craftedAt" — дата в формате ${DATE_FORMATS}, а сейчас ${JSON.stringify(item.craftedAt)}`);

    // Исход — один объект out: { type, date, paid?, privateNote? }. Нет out — штука в наличии
    const out = item.out;
    for (const field of ['soldAt', 'giftedAt', 'lostAt', 'keptAt', 'paid']) {
      if (field in item) errors.push(`${at}: "${field}" теперь внутри "out": { "type", "date", "paid", "privateNote" }`);
    }
    if (out !== undefined) {
      if (typeof out !== 'object' || out === null) {
        errors.push(`${at}: "out" — объект { "type", "date", "paid" }`);
      } else {
        if (!OUT_TYPES.includes(out.type)) errors.push(`${at}: "out.type" — одно из ${OUT_TYPES.join(', ')}, а сейчас ${JSON.stringify(out.type)}`);
        if (!isPartialDate(out.date)) errors.push(`${at}: "out.date" — дата в формате ${DATE_FORMATS}, а сейчас ${JSON.stringify(out.date)}`);
        // paid — сколько реально получено, обязательно всегда: у продажи обычно равно price, у остальных исходов — 0
        if (!(Number.isInteger(out.paid) && out.paid >= 0)) {
          errors.push(`${at}: нужен "out.paid" — сколько реально получено, в донгах числом (0 для gift, lost, kept)`);
        } else if (out.type !== 'sold' && out.paid !== 0) {
          errors.push(`${at}: у «${out.type}» "out.paid" должен быть 0`);
        }
        const extra = Object.keys(out).filter((key) => !OUT_FIELDS.includes(key));
        if (extra.length) errors.push(`${at}: лишние поля в "out": ${extra.join(', ')}`);
      }
    }

    const materials = 'materials' in item ? toMaterials(item.materials, at, errors, data.category) : undefined;
    if (materials) lastMaterials = materials;

    if (!LOCATION_ORDER.includes(item.location)) {
      errors.push(`${at}: неизвестная точка «${item.location}» — одна из ${LOCATION_ORDER.join(', ')}`);
      return;
    }
    // Партнёрам штуки отдаются на консигнацию — дата передачи нужна для накладных
    if (item.location === 'atelier') {
      if ('consignedAt' in item) errors.push(`${at}: "consignedAt" — только у штук у партнёров, а эта в мастерской`);
    } else if (!isPartialDate(item.consignedAt)) {
      errors.push(`${at}: у штуки в «${item.location}» нужен "consignedAt" — когда передана, в формате ${DATE_FORMATS}`);
    }
    if (out !== undefined) return;
    if (materials) lastAvailableMaterials = materials;
    if (!available.has(item.location)) available.set(item.location, []);
    available.get(item.location).push(item.price);
  });

  // Ремейк — когда в Далате штук нет: все заказы и доставка — из Далата, партнёры ничего не отправляют,
  // поэтому ремейк есть всегда, даже если штуки лежат у партнёров. Материалы считаем всегда доступными;
  // если что-то не так — пишем в remake.publicNote, остальное решается в мессенджере.
  // Поле remake необязательно (своя цена, комментарий), но пока штука в Далате есть, его быть не должно
  const inAtelier = available.has('atelier');
  if (inAtelier && 'remake' in data) {
    errors.push(`${where}: "remake" — только когда в мастерской нет штук; пока штука там есть, очистите`);
  }
  const remake = data.remake ?? {};
  const extra = Object.keys(remake).filter((key) => !REMAKE_FIELDS.includes(key));
  if (extra.length) errors.push(`${where}: лишние поля в "remake": ${extra.join(', ')}`);
  if ('price' in remake && !isPrice(remake.price)) errors.push(`${where}: "remake.price" — цена в донгах числом без кавычек`);

  // Цена. Все штуки в наличии — по одной цене, где бы ни лежали: иначе сборка падает
  const availablePrices = [...new Set([...available.values()].flat())];
  if (availablePrices.length > 1) {
    const byLocation = [...available].map(([loc, prices]) => `${loc}: ${[...new Set(prices)].join(', ')}`).join('; ');
    errors.push(`${where}: у штук в наличии цена должна быть одна, а сейчас ${byLocation}`);
  }
  // Политика магазина: цена везде и для всех одна. Есть штуки в наличии — ремейк стоит столько же;
  // поднять цену ремейка = поднять её и у штук в наличии
  if (availablePrices.length && 'price' in remake && remake.price !== availablePrices[0]) {
    errors.push(`${where}: "remake.price" ${remake.price} не совпадает с ценой штук в наличии (${availablePrices.join(', ')}) — цена везде одна`);
  }
  // Цена ремейка: штуки в наличии, а если в наличии ничего нет — remake.price, тогда она обязательна.
  // Цены ушедших штук на цену сайта не влияют: это история (для накладных и отчётов)
  if (!availablePrices.length && !('price' in remake)) {
    errors.push(`${where}: в наличии ничего нет — укажите "remake.price"`);
  }
  const remakePrice = availablePrices[0] ?? remake.price;

  const locationNotes = data.locationNotes ?? {};
  for (const locationId of Object.keys(locationNotes)) {
    if (!LOCATION_ORDER.includes(locationId)) {
      errors.push(`${where}, locationNotes: неизвестная точка «${locationId}»`);
    } else if (!available.has(locationId) && data.site === true) {
      logger.warn(`${where}: комментарий к «${locationId}» на сайте не виден — там нет штук в наличии`);
    }
  }

  const stock = LOCATION_ORDER.filter((id) => available.has(id)).map((locationId) => ({
    locationId,
    quantity: available.get(locationId).length,
    ...toSiteNote(structuredClone(locationNotes[locationId])),
  }));

  // Цена в шапке, каталоге и на плашке семейства: штуки в наличии → ремейк
  const price = availablePrices[0] ?? remakePrice;

  // Материалы на сайте — одни: последней штуки в наличии (по порядку в items), а если в наличии ничего нет —
  // последней штуки в списке, у которой они заполнены: ремейк делается как она. Как показывать разные — TODO.md
  const materials = lastAvailableMaterials ?? lastMaterials;

  return {
    stock,
    price,
    materials,
    ...(!inAtelier
      ? {
          remake: {
            price: remakePrice,
            ...(remake.publicNote ? { note: structuredClone(remake.publicNote) } : {}),
            noteImages: structuredClone(remake.publicNoteImages ?? []),
          },
        }
      : {}),
  };
}

/** Путь к цветам бисера и бусин в withoutEmpty: items[0].materials.beads.Toho Aiko */
const BEAD_COLORS_FIELD_RE = /(^|\.)materials\.(beads|additionalBeads|threads)\.[^[\]]+$/;

/**
 * Размер и вес — по категории (SIZE_FIELDS): числа, длины в см, вес в г → { kind: category, …поля }.
 * Подписи, единицы и обхват запястья — на сайте (src/utils/size.ts)
 */
function toSize(size, where, errors, category) {
  if (size === undefined) return undefined;
  const fields = SIZE_FIELDS[category];
  if (!fields) return undefined; // неизвестная категория — о ней уже сказано
  if (typeof size !== 'object' || size === null || Array.isArray(size)) {
    errors.push(`${where}, size: объект с числами: { ${Object.keys(fields).map((k) => `"${k}": …`).join(', ')} }`);
    return undefined;
  }
  const result = {};
  for (const [key, value] of Object.entries(size)) {
    if (key === 'wristFrom') errors.push(`${where}, size.wristFrom: уберите — обхват запястья сайт считает сам из длины`);
    else if (!(key in fields)) errors.push(`${where}, size: лишнее поле «${key}» — можно ${Object.keys(fields).join(', ')}`);
    else if (typeof value !== 'number' || !(value > 0)) errors.push(`${where}, size.${key}: число без кавычек больше нуля, а сейчас ${JSON.stringify(value)}`);
    else result[key] = value;
  }
  return Object.keys(result).length ? { kind: category, ...result } : undefined;
}

/**
 * Фурнитура — по категории: у брелка — одно из CHARM_FINDINGS, у серёг — строка, у браслета — детали из
 * BRACELET_PARTS («Tarin Thomas 18K gold-plated brass»), у колец и обмоток для ручек её нет
 */
function toFindings(findings, at, errors, category) {
  if (findings === undefined) return undefined;
  const field = `${at}, materials.findings`;
  if (category === 'charm') {
    if (!(findings in CHARM_FINDINGS)) {
      errors.push(`${field}: у брелка — одно из: ${Object.keys(CHARM_FINDINGS).join(', ')}, а сейчас ${JSON.stringify(findings)}`);
      return undefined;
    }
    return { charm: CHARM_FINDINGS[findings] };
  }
  if (category === 'earrings') {
    if (typeof findings !== 'string') {
      errors.push(`${field}: у серёг — строка текста, «Hypoallergenic stainless steel ear hooks»`);
      return undefined;
    }
    return { text: findings };
  }
  if (category === 'bracelet') {
    if (typeof findings !== 'object' || findings === null || Array.isArray(findings)) {
      errors.push(`${field}: у браслета — объект деталей: { "slideTubes": "Tarin Thomas 18K gold-plated brass", "chain": "Basic stainless steel", … }`);
      return undefined;
    }
    const bracelet = [];
    for (const [part, value] of Object.entries(findings)) {
      if (!(part in BRACELET_PARTS)) {
        errors.push(`${field}: неизвестная деталь «${part}» — одна из: ${Object.keys(BRACELET_PARTS).join(', ')}`);
        continue;
      }
      const option = braceletOptions(part)[value];
      if (!option) {
        errors.push(`${field}.${part}: одно из: ${Object.keys(braceletOptions(part)).join(', ')}, а сейчас ${JSON.stringify(value)}`);
        continue;
      }
      bracelet.push({ part, ...option });
    }
    // Порядок деталей на сайте — как в BRACELET_PARTS, а не как в JSON
    const order = Object.keys(BRACELET_PARTS);
    bracelet.sort((a, b) => order.indexOf(a.part) - order.indexOf(b.part));
    return bracelet.length ? { bracelet } : undefined;
  }
  errors.push(`${field}: у «${category}» фурнитуры нет — уберите поле`);
  return undefined;
}

/** Коды цветов бисера и ниток — как на упаковке: числа и строки ("402B", "#426", "Smoke"), без повторов */
function toColorCodes(rawColors, field, errors) {
  const colors = [];
  for (const color of rawColors) {
    const code = Number.isInteger(color) && color >= 0 ? String(color) : typeof color === 'string' ? color.trim() : '';
    if (!code) errors.push(`${field}: код цвета — строка или число, а сейчас ${JSON.stringify(color)}`);
    else if (colors.includes(code)) errors.push(`${field}: цвет ${code} записан дважды`);
    else colors.push(code);
  }
  return colors;
}

/**
 * materials штуки → для сайта: { beads: [{ name, pairName, short, premium, colors }],
 *   additionalBeads: [{ id, branded, rank, colors }], threads: [{ name, id, colors }],
 *   findings: { charm } | { text } | { bracelet: [{ part, brand, metal }] } }.
 * HTML собирает сайт (src/utils/materials.ts) — с переводом приписок. Пусто — undefined
 */
function toMaterials(materials, at, errors, category) {
  if (typeof materials !== 'object' || materials === null || Array.isArray(materials)) {
    errors.push(`${at}: "materials" теперь объект: { "beads": { "Toho Aiko": ["41", "PF557"] }, "threads": { "FireLine": ["Smoke"] }, "findings": … }`);
    return undefined;
  }
  const extra = Object.keys(materials).filter((key) => !MATERIAL_FIELDS.includes(key));
  if (extra.includes('other')) errors.push(`${at}: "materials.other" больше нет — нитки в "threads", фурнитура в "findings"`);
  const unknown = extra.filter((key) => key !== 'other');
  if (unknown.length) errors.push(`${at}: лишние поля в "materials": ${unknown.join(', ')} — можно ${MATERIAL_FIELDS.join(', ')}`);

  const beads = [];
  const rawBeads = materials.beads ?? {};
  if (typeof rawBeads !== 'object' || rawBeads === null || Array.isArray(rawBeads)) {
    errors.push(`${at}: "materials.beads" — объект: тип бисера → коды цветов, { "Toho Aiko": ["41", "PF557"] }`);
  } else {
    for (const [name, rawColors] of Object.entries(rawBeads)) {
      const field = `${at}, materials.beads «${name}»`;
      const type = BEAD_TYPES[name];
      if (!type) {
        errors.push(`${field}: неизвестный бисер — одно из: ${Object.keys(BEAD_TYPES).join(', ')}. Новый тип — в BEAD_TYPES (scripts/data-rules.mjs)`);
        continue;
      }
      if (!Array.isArray(rawColors)) {
        errors.push(`${field}: коды цветов списком — ["201", "402B", "#426"], неизвестны — []`);
        continue;
      }
      const colors = toColorCodes(rawColors, field, errors);
      beads.push({ name, pairName: type.pairName ?? name, short: type.short, premium: Boolean(type.premium), colors });
    }
  }

  const additionalBeads = [];
  const rawAdditionalBeads = materials.additionalBeads ?? {};
  if (typeof rawAdditionalBeads !== 'object' || rawAdditionalBeads === null || Array.isArray(rawAdditionalBeads)) {
    errors.push(`${at}: "materials.additionalBeads" — объект: тип бусин → цвета, { "Unbranded bicones": ["black"] }`);
  } else {
    for (const [name, rawColors] of Object.entries(rawAdditionalBeads)) {
      const field = `${at}, materials.additionalBeads «${name}»`;
      const type = ADDITIONAL_BEAD_TYPES[name];
      if (!type) {
        errors.push(`${field}: неизвестные бусины — одно из: ${Object.keys(ADDITIONAL_BEAD_TYPES).join(', ')}. Новый тип — в ADDITIONAL_BEAD_TYPES (scripts/data-rules.mjs)`);
        continue;
      }
      if (!Array.isArray(rawColors)) {
        errors.push(`${field}: цвета списком — ["black"], неизвестны — []`);
        continue;
      }
      const colors = [];
      for (const color of rawColors) {
        if (!ADDITIONAL_BEAD_COLORS.includes(color)) errors.push(`${field}: цвет ${JSON.stringify(color)} — одно из: ${ADDITIONAL_BEAD_COLORS.join(', ')}. Новый — в ADDITIONAL_BEAD_COLORS (scripts/data-rules.mjs) и перевод в ui.ts`);
        else if (colors.includes(color)) errors.push(`${field}: цвет ${color} записан дважды`);
        else colors.push(color);
      }
      additionalBeads.push({ id: type.id, branded: Boolean(type.branded), rank: type.rank ?? 0, colors });
    }
  }

  const threads = [];
  const rawThreads = materials.threads ?? {};
  if (typeof rawThreads !== 'object' || rawThreads === null || Array.isArray(rawThreads)) {
    errors.push(`${at}: "materials.threads" — объект: нитка → цвета, { "FireLine": ["Smoke"] }`);
  } else {
    for (const [name, rawColors] of Object.entries(rawThreads)) {
      const field = `${at}, materials.threads «${name}»`;
      const type = THREAD_TYPES[name];
      if (!type) {
        errors.push(`${field}: неизвестная нитка — одно из: ${Object.keys(THREAD_TYPES).join(', ')}. Новый тип — в THREAD_TYPES (scripts/data-rules.mjs)`);
        continue;
      }
      if (!Array.isArray(rawColors)) {
        errors.push(`${field}: цвета списком — ["Smoke"], ["#10"], неизвестны — []`);
        continue;
      }
      threads.push({ name, id: type.id, colors: toColorCodes(rawColors, field, errors) });
    }
  }

  // Цвета бисера — секрет автора купленной схемы: остаются в базе, на сайт не уходят даже в данных
  if ('secretColors' in materials) errors.push(`${at}: "secretColors" теперь "colorsPublic": "yes", "no" или "replaced"`);
  const colorsPublic = materials.colorsPublic ?? 'yes';
  if (!COLORS_PUBLIC.includes(colorsPublic)) {
    errors.push(`${at}: "materials.colorsPublic" — одно из ${COLORS_PUBLIC.join(', ')}, а сейчас ${JSON.stringify(colorsPublic)}`);
  }
  if (colorsPublic === 'no') for (const bead of beads) bead.colors = [];
  const findings = toFindings(materials.findings, at, errors, category);
  return beads.length || additionalBeads.length || threads.length || findings
    ? { beads, ...(colorsPublic !== 'yes' ? { colorsPublic } : {}), additionalBeads, threads, ...(findings ? { findings } : {}) }
    : undefined;
}

/**
 * Убирает пустые значения: "", пустые массивы и объекты, массивы из пустых строк,
 * переводы { en: "", ru: "", vi: "" }. Наполовину заполненный перевод — ошибка: забыли язык.
 */
/**
 * credits — кто сделал: design (автор схемы) и craft (кто сплёл) обязательны, остальное — по желанию и любое
 * (photo — автор фото, можно добавить автора видео, соавтора…). Сайт выводит все пары по порядку.
 * Только имена текстом, без HTML. Если все имена — bunnybearbeads, сайт секцию не выводит
 */
const CREDIT_REQUIRED = ['craft', 'design'];

/** required — у изделий на сайте: credits, craft и design обязательны; у скрытых — только формат того, что вписано */
function checkCredits(credits, where, errors, required = true) {
  if (typeof credits !== 'object' || credits === null || Array.isArray(credits)) {
    errors.push(`${where}: нет "credits" — нужны "craft" (кто сплёл) и "design" (автор схемы), остальное — по желанию`);
    return;
  }
  for (const key of required ? CREDIT_REQUIRED : []) {
    if (credits[key] === undefined) errors.push(`${where}, credits.${key}: обязательно`);
  }
  for (const [key, value] of Object.entries(credits)) {
    if (typeof value !== 'string') errors.push(`${where}, credits.${key}: имя строкой`);
    else if (/<[a-z/!]/i.test(value)) errors.push(`${where}, credits.${key}: просто имя, без HTML`);
  }
}

function withoutEmpty(value, where, errors, field = '') {
  if (value === '' || value === null) return undefined;
  if (Array.isArray(value)) {
    const list = value.map((v, i) => withoutEmpty(v, where, errors, `${field}[${i}]`)).filter((v) => v !== undefined);
    // Бисер с неизвестными цветами — "Toho Aiko": [] — значимая запись, а не пустое поле
    if (BEAD_COLORS_FIELD_RE.test(field)) return list;
    return list.length ? list : undefined;
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    const isText = keys.length === 3 && ['en', 'ru', 'vi'].every((lang) => typeof value[lang] === 'string');
    if (isText) {
      const filled = keys.filter((lang) => value[lang].trim() !== '');
      if (filled.length === 0) return undefined;
      if (filled.length < 3) {
        errors.push(`${where}, ${field}: не хватает перевода: ${keys.filter((l) => !filled.includes(l)).join(', ')}`);
      }
      return value;
    }
    const entries = keys
      .map((key) => [key, withoutEmpty(value[key], where, errors, field ? `${field}.${key}` : key)])
      .filter(([, v]) => v !== undefined);
    return entries.length ? Object.fromEntries(entries) : undefined;
  }
  return value;
}

function isPartialDate(value) {
  const match = typeof value === 'string' && value.match(PARTIAL_DATE_RE);
  if (!match) return false;
  if (!match[3]) return true;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function isPrice(value) {
  return Number.isInteger(value) && value > 0;
}

/** Пишет файл, только если содержимое изменилось — иначе dev-сервер перезагружается зря */
async function writeIfChanged(file, data) {
  const content = `${JSON.stringify(data, null, 2)}\n`;
  const current = await fsp.readFile(file, 'utf8').catch(() => null);
  if (current === content) return false;
  await fsp.writeFile(file, content);
  return true;
}

async function writeJsonDir(dir, entries) {
  await fsp.mkdir(dir, { recursive: true });
  let changed = 0;
  for (const [id, data] of entries) {
    if (await writeIfChanged(path.join(dir, `${id}.json`), data)) changed += 1;
  }
  for (const file of await fsp.readdir(dir)) {
    if (file.endsWith('.json') && !entries.has(file.slice(0, -5))) {
      await fsp.unlink(path.join(dir, file));
      changed += 1;
    }
  }
  return changed;
}

/**
 * Копия видео без метаданных: в ролике с телефона записаны геолокация, модель, дата. Фото чистит sharp
 * (photos.mjs), а видео ffmpeg переупаковывает без пережатия: берёт только картинку и звук
 * (служебные дорожки iPhone тоже могут нести координаты), метаданные и главы отбрасывает
 */
async function copyVideoWithoutMetadata(source, dest) {
  const tmp = `${dest}.tmp${path.extname(dest)}`;
  try {
    await execFileAsync(ffmpegPath, [
      '-y', '-loglevel', 'error', '-i', source,
      '-map', '0:v', '-map', '0:a?', '-map_metadata', '-1', '-map_chapters', '-1',
      '-c', 'copy', ...(/\.(mp4|mov)$/i.test(dest) ? ['-movflags', '+faststart'] : []), tmp,
    ]);
    await fsp.rename(tmp, dest);
  } catch (err) {
    await fsp.rm(tmp, { force: true });
    throw new Error(`не удалось скопировать видео без метаданных: ${source}\n${err.stderr || err.message}`);
  }
}

/** Копирует фото и видео, если файл новый или изменился; лишнее удаляет. Постеры видео не трогает */
async function syncMedia(media, photos) {
  let changed = 0;
  // Копии фото сжимает syncPhotos — здесь они только не удаляются как лишние
  const keep = new Set([...photos].flatMap(([base, { widths }]) => photoFiles(base, widths)));
  for (const [target, source] of media) {
    keep.add(target);
    if (VIDEO_RE.test(target)) keep.add(target.replace(/\.[^.]+$/, '.jpg')); // постер от generate-posters
    const dest = path.join(OUT_MEDIA, target);
    const src = fs.statSync(source);
    const dst = fs.statSync(dest, { throwIfNoEntry: false });
    const isVideo = VIDEO_RE.test(target);
    // utimes округляет время до миллисекунды, поэтому сравниваем с допуском. Копия видео без метаданных
    // по размеру отличается от исходника — у видео сверяем только время
    const sameTime = dst && Math.abs(dst.mtimeMs - src.mtimeMs) < 1;
    if (sameTime && (isVideo || dst.size === src.size)) continue;
    await fsp.mkdir(path.dirname(dest), { recursive: true });
    if (isVideo) await copyVideoWithoutMetadata(source, dest);
    else await fsp.copyFile(source, dest);
    await fsp.utimes(dest, src.atime, src.mtime);
    changed += 1;
  }

  if (!fs.existsSync(OUT_MEDIA)) return changed;
  const stale = [];
  await walkFiles(OUT_MEDIA, (file) => {
    const rel = path.relative(OUT_MEDIA, file).split(path.sep).join('/');
    if (!keep.has(rel)) stale.push(file);
  });
  for (const file of stale) {
    await fsp.unlink(file);
    changed += 1;
  }
  // Пустые папки после удаления
  const prune = async (dir) => {
    for (const entry of await fsp.readdir(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) await prune(path.join(dir, entry.name));
    }
    if (dir !== OUT_MEDIA && (await fsp.readdir(dir)).length === 0) await fsp.rmdir(dir);
  };
  await prune(OUT_MEDIA);
  return changed;
}

/**
 * Собирает данные сайта из data/. Падает со списком всех проблем, если в базе что-то не так;
 * в этом случае ничего не пишет.
 */
export async function exportData(logger = console) {
  if (!fs.existsSync(DATA_DIR)) {
    throw new Error(`нет папки ${path.relative(ROOT, DATA_DIR)}/ — сделайте data/ ссылкой на папку в Dropbox (README, «Данные товаров»)`);
  }
  const dataDir = fs.realpathSync(DATA_DIR);
  const errors = [];
  const { products, families, media, photos } = await collect(dataDir, errors, logger);
  if (errors.length) throw new DataErrors(errors);
  // Схемы для подсказок в редакторе пишет fill-data, а не сборка: сборка в базу не пишет
  for (const [name, content] of Object.entries(schemaFiles(dataDir))) {
    if (!fs.existsSync(path.join(dataDir, name)) || fs.readFileSync(path.join(dataDir, name), 'utf8') !== content) {
      logger.warn(`${name} устарела — запустите npm run fill-data, чтобы обновить подсказки в редакторе`);
    }
  }

  const compressed = await syncPhotos(photos, OUT_MEDIA, PHOTO_CACHE, logger);
  const changed =
    (await writeJsonDir(OUT_PRODUCTS, products)) +
    (await writeJsonDir(OUT_FAMILIES, families)) +
    (await syncMedia(media, photos)) +
    compressed;
  // Постеры для видео, у которых нет своего (кадр через ffmpeg, рядом с копией видео)
  await generateMissingPosters(OUT_MEDIA, logger);

  logger.info(
    (IS_DEMO ? 'ДЕМО-база: ' : '') +
    `изделий: ${products.size}, семейств: ${families.size}, фото: ${photos.size}, видео: ${media.size}` +
      (changed ? ` — обновлено файлов: ${changed}` : ' — без изменений'),
  );
  return true;
}

/**
 * Следит за data/ в dev и пересобирает данные при изменениях.
 * Astro перезапускает сервер внутри того же процесса (например, после правки конфига),
 * поэтому прежний наблюдатель закрываем — иначе остаётся старый со старым кодом экспорта.
 */
export function watchData(logger = console) {
  globalThis.__productDataWatcher?.close();
  if (!fs.existsSync(DATA_DIR)) return;
  let timer;
  let running = false;
  let again = false;
  // Экспорты не идут параллельно: изменение во время экспорта — ещё один экспорт после него
  const run = async () => {
    if (running) {
      again = true;
      return;
    }
    running = true;
    try {
      await exportData(logger);
    } catch (error) {
      logger.error(error.message);
    } finally {
      running = false;
      if (again) {
        again = false;
        run();
      }
    }
  };
  // Симлинк: следим за настоящей папкой в Dropbox. Скрытые файлы и папки (.idea — WebStorm пишет туда
  // постоянно, .DS_Store, служебные файлы Dropbox) на сайт не влияют — иначе экспорт крутится без конца
  globalThis.__productDataWatcher = fs.watch(fs.realpathSync(DATA_DIR), { recursive: true }, (_event, file) => {
    if (file && String(file).split(/[\\/]/).some((part) => part.startsWith('.'))) return;
    clearTimeout(timer);
    timer = setTimeout(run, 300);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  exportData().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
