/**
 * Сборка данных сайта из базы изделий в Dropbox.
 *
 * `data/` — симлинк на папку в Dropbox, в git она не попадает. Одно изделие — одна папка:
 *
 *   data/
 *     Lumi/
 *       Lumi.json ← данные изделия, имя = имя папки: данные сайта, штуки (items), memo, даты
 *       site/…           ← фото и видео; на сайт попадают только файлы, указанные в JSON изделия
 *       …              ← что угодно ещё: процесс, схемы, черновики
 *     _families/*.json ← семейства (папки с «_» в начале — служебные, не изделия)
 *     _demo/           ← демо-база той же структуры: примеры сложных случаев. На сайт — только
 *                        с DATA_DEMO=1 (`npm run dev:demo`), вместо настоящей базы
 *
 * На сайт уходят только изделия с `"site": true`:
 *   - src/content/products/<slug>.json — без items, memo, дат, maker; штуки в наличии свёрнуты в количество
 *     и цену по точкам, плюс цена в шапке и ремейк (статус и цена);
 *   - src/content/families/<id>.json;
 *   - public/images/products/<slug>/<путь из JSON изделия> — фото, сжатые в несколько размеров
 *     (AVIF + JPEG, scripts/photos.mjs), и копии видео (+ постеры к ним, scripts/generate-posters.mjs).
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
import { fileURLToPath } from 'node:url';
import { generateMissingPosters } from './generate-posters.mjs';
import { photoFiles, photoWidths, readPhotoSize, syncPhotos } from './photos.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
/** DATA_DEMO=1 — демо-база data/_demo вместо настоящей (`npm run dev:demo`) */
export const IS_DEMO = Boolean(process.env.DATA_DEMO);
const DATA_DIR = IS_DEMO ? path.join(ROOT, 'data', '_demo') : path.join(ROOT, 'data');
const FAMILIES_DIR = '_families';

const OUT_PRODUCTS = path.join(ROOT, 'src/content/products');
const OUT_FAMILIES = path.join(ROOT, 'src/content/families');
const OUT_MEDIA = path.join(ROOT, 'public/images/products');
const MEDIA_URL = '/images/products';
/** Кэш сжатых фото (что и из какого оригинала уже сжато) — вне git, только на этом компьютере */
const PHOTO_CACHE = path.join(ROOT, 'node_modules/.cache/bunnybearbeads', IS_DEMO ? 'photos-demo.json' : 'photos.json');

/** Порядок точек в данных и на сайте. Должен совпадать с src/config/locations.ts */
/** atelier — своя мастерская (сейчас в Далате): id не привязан к городу на случай переезда */
const LOCATION_ORDER = ['atelier', 'ngay-mai', 'cat-food'];
const MAKERS = ['bunny', 'bear'];
/** Категории изделий, в единственном числе. Должны совпадать с src/config/categories.ts */
const CATEGORIES = ['charm', 'bracelet', 'ring', 'earrings', 'pen-wrap'];
/** На что носится брелок: у каждой штуки-брелока обязательно, у остальных категорий поля нет */
const ATTACH_TO = ['keys', 'phone', 'mirror', 'bag'];
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
/** id штуки: 3–4 заглавные буквы (обычно первые согласные названия) и две цифры, PWST01 */
const ITEM_ID_RE = /^[A-Z]{3,4}\d{2}$/;
/**
 * Дата может быть неполной: точная (2026-11-01), только месяц (2026-11 — например, NGÀY MAI сообщает
 * продажи за месяц без дат), квартал (2026-Q3), полугодие (2026-H1) или только год (2024 — для старых записей)
 */
const PARTIAL_DATE_RE = /^(\d{4})(?:-(?:(0[1-9]|1[0-2])(?:-(\d{2}))?|Q[1-4]|H[12]))?$/;
const DATE_FORMATS = '2026-11-01, 2026-11, 2026-Q3, 2026-H1 or 2026';
const BLOCK_TAG_RE = /<\/?(p|div|ul|ol|li|h[1-6]|blockquote)\b/i;
const VIDEO_RE = /\.(mp4|webm|ogg|mov)$/i;
/** Фото изделия (images) — строго 3:4, вертикальные: под эту пропорцию свёрстаны галерея и карточки */
const PHOTO_RATIO = { width: 3, height: 4 };
/** Точно 3:4, без допуска: 2213×2952 не проходит — кадрировать до 2211×2948 */
const isPortraitRatio = (width, height) => width * PHOTO_RATIO.height === height * PHOTO_RATIO.width;
/** Конфликтные копии Dropbox: «file (Tony's conflicted copy 2026-11-23).json», в русском интерфейсе — «конфликтующая копия» */
const CONFLICT_RE = /conflicted copy|конфликтующая копия/i;
/** Служебные поля, которые на сайт не попадают никогда */
const PRIVATE_FIELDS = ['slug', 'site', 'items', 'locationNotes', 'remake'];
/** Исход штуки (`out.type`): продана, подарена, брак или потеря, оставили себе */
const OUT_TYPES = ['sold', 'gift', 'lost', 'kept'];
const OUT_FIELDS = ['type', 'date', 'paid', 'memo'];
const REMAKE_FIELDS = ['price', 'note', 'noteImages', 'memo'];

const GENERATED_NOTE = 'Generated by scripts/export-data.mjs from data/. Do not edit: changes will be overwritten.';

class DataErrors extends Error {
  constructor(errors) {
    super(`Product data has ${errors.length} problem(s):\n${errors.map((e) => `  - ${e}`).join('\n')}`);
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
    if (CONFLICT_RE.test(name)) errors.push(`Dropbox conflicted copy, resolve it: ${path.relative(dataDir, file)}`);
  });

  const products = new Map(); // slug → публичные данные (только site: true)
  const media = new Map(); // путь в public → исходный файл
  const slugOwners = new Map(); // slug → папка
  const hiddenSlugs = new Set(); // изделия с "site": false
  const titleOwners = new Map(); // название без учёта регистра → папка
  const itemOwners = new Map(); // id штуки → slug
  const photos = new Map(); // фото → копии разных размеров: путь в public без ширины и расширения → { source, widths }
  const photoReads = []; // размер фото читается в конце, все файлы разом

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
        errors.push(`"${folder}": expected ${fileName}, found ${otherJson.join(', ')} — rename it after the folder`);
      } else {
        logger.warn(`"${folder}": no ${fileName}, skipped`);
      }
      continue;
    }
    const raw = await readJson(file, errors);
    if (!raw) continue;

    const where = `"${folder}"`;
    // Пустые поля из шаблона (npm run fill-data) — то же, что их отсутствие
    const data = withoutEmpty(raw, where, errors) ?? {};
    const before = errors.length;
    const { slug } = data;

    if (typeof slug !== 'string' || !SLUG_RE.test(slug)) {
      errors.push(`${where}: slug must be lowercase latin, digits and dashes, got ${JSON.stringify(slug)}`);
      continue;
    }
    if (slugOwners.has(slug)) errors.push(`${where}: slug "${slug}" is already used by "${slugOwners.get(slug)}"`);
    slugOwners.set(slug, folder);
    // Название тоже уникально, без учёта регистра и лишних пробелов: Wild Rose и wild  rose — одно и то же
    if (typeof data.title === 'string') {
      const titleKey = data.title.trim().replace(/\s+/g, ' ').toLowerCase();
      if (titleOwners.has(titleKey)) errors.push(`${where}: title "${data.title}" is already used by "${titleOwners.get(titleKey)}"`);
      titleOwners.set(titleKey, folder);
    }

    if ('materialsHtml' in data) errors.push(`${where}: "materialsHtml" is gone — put the HTML into "materials"`);
    if (typeof data.site !== 'boolean') errors.push(`${where}: "site" must be true or false`);

    if (data.description !== undefined && typeof data.description !== 'string') {
      errors.push(`${where}: "description" is one English string for now, like "title" — no translations`);
    }
    // Описание и комментарии — один абзац: обёртку (<p class="product-header__description"> и т. п.) даёт сайт
    const texts = [
      ['description', data.description],
      ['remake.note', data.remake?.note],
      ...Object.entries(data.locationNotes ?? {}).map(([loc, n]) => [`locationNotes.${loc}.note`, n?.note]),
    ];
    if (typeof data.designedBy === 'string' && /<[a-z/!]/i.test(data.designedBy)) {
      errors.push(`${where}: "designedBy" is plain text, just the designer's name — no HTML`);
    }
    for (const [field, value] of texts) {
      if (value && BLOCK_TAG_RE.test(JSON.stringify(value))) errors.push(`${where}, ${field}: no <p>, <div> or other block tags: one paragraph, the site wraps it`);
    }

    if ('categoryId' in data) errors.push(`${where}: "categoryId" is now "category"`);
    if (!CATEGORIES.includes(data.category)) {
      errors.push(`${where}: "category" must be one of ${CATEGORIES.join(', ')}, got ${JSON.stringify(data.category)}`);
    }

    const { stock, price, remake } = toSales(data, where, itemOwners, slug, errors, logger);
    if (data.site !== true) {
      hiddenSlugs.add(slug);
      continue;
    }
    // На сайте у изделия должно быть хотя бы одно фото: заглушки в галерее нет
    if (!Array.isArray(data.images) || data.images.length === 0) {
      errors.push(`${where}: "images" is empty — a product on the site needs at least one photo (or set "site": false)`);
    }

    // Пути к файлам в JSON изделия — относительно папки изделия
    const checkPath = (rel, field) => {
      if (typeof rel !== 'string' || !rel || path.isAbsolute(rel) || rel.split(/[\\/]/).includes('..')) {
        errors.push(`${where}, ${field}: path must be relative to the folder, got ${JSON.stringify(rel)}`);
        return null;
      }
      const source = path.join(folderPath, rel);
      const stat = fs.statSync(source, { throwIfNoEntry: false });
      if (!stat?.isFile()) {
        errors.push(`${where}, ${field}: file not found: ${rel}`);
      } else if (stat.size > 0 && stat.blocks === 0) {
        // Файл-заглушка Dropbox: место на диске не занято, содержимое только в облаке
        errors.push(`${where}, ${field}: file is online-only in Dropbox, make the folder available offline: ${rel}`);
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
    // portrait: фото изделия, строго 3:4
    const toPhoto = (rel, field, { portrait = false, alt } = {}) => {
      const photo = { type: 'photo', base: '', widths: [], width: 0, height: 0, ...(alt ? { alt } : {}) };
      const file = checkPath(rel, field);
      if (!file) return photo;
      const base = file.target.replace(/\.[^./]+$/, '');
      photo.base = `${MEDIA_URL}/${base}`;
      photos.set(base, { source: file.source, widths: photo.widths });
      photoReads.push({ photo, where, field, rel, source: file.source, portrait });
      return photo;
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
    // Материалы — HTML; в JSON удобнее массивом строк, на сайт уходят одной строкой
    if (Array.isArray(data.materials)) publicData.materials = data.materials.join('\n');
    publicData.images = (data.images ?? []).map((item, i) => mapMedia(item, `images[${i}]`, { portrait: true }));
    if (data.thumb) publicData.thumb = toPhoto(data.thumb, 'thumb');
    for (const entry of stock) {
      entry.noteImages = (entry.noteImages ?? []).map((item, i) => mapMedia(item, `locationNotes.${entry.locationId}.noteImages[${i}]`));
    }
    if (remake) remake.noteImages = remake.noteImages.map((item, i) => mapMedia(item, `remake.noteImages[${i}]`));

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
    const data = withoutEmpty(raw, `${FAMILIES_DIR}/${file}`, errors) ?? {};
    for (const [i, member] of (data.members ?? []).entries()) {
      const where = `${FAMILIES_DIR}/${file}, members[${i}]`;
      // "site": false — изделие просто не показывается в семействе; с ошибками — о них уже сказано выше
      if (!slugOwners.has(member.product)) errors.push(`${where}: unknown product "${member.product}"`);
      if (familyOf.has(member.product)) {
        errors.push(`${where}: "${member.product}" is already in family "${familyOf.get(member.product)}"`);
      }
      familyOf.set(member.product, id);
    }
    const members = (data.members ?? []).filter((member) => products.has(member.product));
    if (members.length >= 2) families.set(id, { $comment: GENERATED_NOTE, ...data, members });
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
async function readPhoto({ photo, where, field, rel, source, portrait }) {
  if (!fs.existsSync(source)) return null; // «файл не найден» уже в списке ошибок
  let size;
  try {
    size = await readPhotoSize(source);
  } catch {
    return `${where}, ${field}: cannot read the image (JPEG, PNG or TIFF): ${rel}`;
  }
  const { width, height } = size;
  photo.width = width;
  photo.height = height;
  photo.widths.push(...photoWidths(width));
  if (!portrait || isPortraitRatio(width, height)) return null;
  // Подсказка: самый большой кадр 3:4, который помещается в фото
  const fitWidth = Math.floor(height / PHOTO_RATIO.height) * PHOTO_RATIO.width;
  const crop = fitWidth <= width
    ? `${fitWidth}×${(fitWidth / PHOTO_RATIO.width) * PHOTO_RATIO.height}`
    : `${Math.floor(width / PHOTO_RATIO.width) * PHOTO_RATIO.width}×${Math.floor(width / PHOTO_RATIO.width) * PHOTO_RATIO.height}`;
  return `${where}, ${field}: photo must be exactly 3:4 (portrait), got ${width}×${height}: ${rel} — e.g. crop to ${crop}`;
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
    if (field in data) errors.push(`${where}: "${field}" belongs to items, remove it from the product`);
  }
  if ('price' in data) errors.push(`${where}: "price" belongs to items; remake price is "remake.price"`);
  const items = Array.isArray(data.items) ? data.items : [];
  if (items.length === 0) errors.push(`${where}: "items" must list at least one piece (gone ones stay with their date)`);

  const available = new Map(); // точка → цены штук в наличии (должны совпадать)
  items.forEach((item, index) => {
    const at = `${where}, items[${index}]`;
    if (!item.id) {
      errors.push(`${at}: id is required`);
      return;
    }
    if (!ITEM_ID_RE.test(item.id)) errors.push(`${at}: id must be 3–4 capital letters and two digits, e.g. PWST01, got "${item.id}"`);
    if (itemOwners.has(item.id)) errors.push(`${at}: item id "${item.id}" is already used in "${itemOwners.get(item.id)}"`);
    itemOwners.set(item.id, slug);
    if (!MAKERS.includes(item.maker)) errors.push(`${at}: "maker" must be one of ${MAKERS.join(', ')}`);
    if (data.category === 'charm') {
      if (!ATTACH_TO.includes(item.attachTo)) errors.push(`${at}: "attachTo" is required for a charm: one of ${ATTACH_TO.join(', ')}`);
    } else if ('attachTo' in item) {
      errors.push(`${at}: "attachTo" is only for charms, this product is "${data.category}"`);
    }
    if (!isPrice(item.price)) errors.push(`${at}: "price" must be a positive number of dong, got ${JSON.stringify(item.price)}`);
    if ('createdAt' in item) errors.push(`${at}: "createdAt" is now "craftedAt"`);
    else if (!isPartialDate(item.craftedAt)) errors.push(`${at}: "craftedAt" must be ${DATE_FORMATS}, got ${JSON.stringify(item.craftedAt)}`);

    // Исход — один объект out: { type, date, paid?, memo? }. Нет out — штука в наличии
    const out = item.out;
    for (const field of ['soldAt', 'giftedAt', 'lostAt', 'keptAt', 'paid']) {
      if (field in item) errors.push(`${at}: "${field}" is now part of "out": { "type", "date", "paid", "memo" }`);
    }
    if (out !== undefined) {
      if (typeof out !== 'object' || out === null) {
        errors.push(`${at}: "out" must be an object { "type", "date" }`);
      } else {
        if (!OUT_TYPES.includes(out.type)) errors.push(`${at}: "out.type" must be one of ${OUT_TYPES.join(', ')}, got ${JSON.stringify(out.type)}`);
        if (!isPartialDate(out.date)) errors.push(`${at}: "out.date" must be ${DATE_FORMATS}, got ${JSON.stringify(out.date)}`);
        // paid — сколько реально получено, обязательно всегда: у продажи обычно равно price, у остальных исходов — 0
        if (!(Number.isInteger(out.paid) && out.paid >= 0)) {
          errors.push(`${at}: "out.paid" is required: how much was actually paid, in dong (0 for gift, lost, kept)`);
        } else if (out.type !== 'sold' && out.paid !== 0) {
          errors.push(`${at}: "out.paid" must be 0 for "${out.type}"`);
        }
        const extra = Object.keys(out).filter((key) => !OUT_FIELDS.includes(key));
        if (extra.length) errors.push(`${at}: unknown field(s) in "out": ${extra.join(', ')}`);
      }
    }

    if (!LOCATION_ORDER.includes(item.location)) {
      errors.push(`${at}: unknown location "${item.location}"`);
      return;
    }
    // Партнёрам штуки отдаются на консигнацию — дата передачи нужна для накладных
    if (item.location === 'atelier') {
      if ('consignedAt' in item) errors.push(`${at}: "consignedAt" only for partner shops, the piece is in the atelier`);
    } else if (!isPartialDate(item.consignedAt)) {
      errors.push(`${at}: "consignedAt" is required at "${item.location}": when it was handed over, ${DATE_FORMATS}`);
    }
    if (out !== undefined) return;
    if (!available.has(item.location)) available.set(item.location, []);
    available.get(item.location).push(item.price);
  });

  // Ремейк — когда в Далате штук нет: все заказы и доставка — из Далата, партнёры ничего не отправляют,
  // поэтому ремейк есть всегда, даже если штуки лежат у партнёров. Материалы считаем всегда доступными;
  // если что-то не так — пишем в remake.note, остальное решается в мессенджере.
  // Поле remake необязательно (своя цена, комментарий), но пока штука в Далате есть, его быть не должно
  const inAtelier = available.has('atelier');
  if (inAtelier && 'remake' in data) {
    errors.push(`${where}: "remake" only when nothing is available in the atelier — clear it while a piece is there`);
  }
  const remake = data.remake ?? {};
  const extra = Object.keys(remake).filter((key) => !REMAKE_FIELDS.includes(key));
  if (extra.length) errors.push(`${where}: unknown field(s) in "remake": ${extra.join(', ')}`);
  if ('price' in remake && !isPrice(remake.price)) errors.push(`${where}: "remake.price" must be a positive number of dong`);

  // Цена. Все штуки в наличии — по одной цене, где бы ни лежали: иначе сборка падает
  const availablePrices = [...new Set([...available.values()].flat())];
  if (availablePrices.length > 1) {
    const byLocation = [...available].map(([loc, prices]) => `${loc}: ${[...new Set(prices)].join(', ')}`).join('; ');
    errors.push(`${where}: available pieces must have the same price, got ${byLocation}`);
  }
  // Политика магазина: цена везде и для всех одна. Есть штуки в наличии — ремейк стоит столько же;
  // поднять цену ремейка = поднять её и у штук в наличии
  if (availablePrices.length && 'price' in remake && remake.price !== availablePrices[0]) {
    errors.push(`${where}: "remake.price" ${remake.price} differs from available pieces (${availablePrices.join(', ')}) — one price everywhere`);
  }
  // Цена ремейка: штуки в наличии, а если в наличии ничего нет — remake.price, тогда она обязательна.
  // Цены ушедших штук на цену сайта не влияют: это история (для накладных и отчётов)
  if (!availablePrices.length && !('price' in remake)) {
    errors.push(`${where}: nothing is available — set "remake.price"`);
  }
  const remakePrice = availablePrices[0] ?? remake.price;

  const locationNotes = data.locationNotes ?? {};
  for (const locationId of Object.keys(locationNotes)) {
    if (!LOCATION_ORDER.includes(locationId)) {
      errors.push(`${where}, locationNotes: unknown location "${locationId}"`);
    } else if (!available.has(locationId) && data.site === true) {
      logger.warn(`${where}: note for "${locationId}" is not shown, nothing available there`);
    }
  }

  const stock = LOCATION_ORDER.filter((id) => available.has(id)).map((locationId) => ({
    locationId,
    quantity: available.get(locationId).length,
    ...structuredClone(locationNotes[locationId] ?? {}),
  }));

  // Цена в шапке, каталоге и на плашке семейства: штуки в наличии → ремейк
  const price = availablePrices[0] ?? remakePrice;

  return {
    stock,
    price,
    ...(!inAtelier
      ? {
          remake: {
            price: remakePrice,
            ...(remake.note ? { note: structuredClone(remake.note) } : {}),
            noteImages: structuredClone(remake.noteImages ?? []),
          },
        }
      : {}),
  };
}

/**
 * Убирает пустые значения: "", пустые массивы и объекты, массивы из пустых строк,
 * переводы { en: "", ru: "", vi: "" }. Наполовину заполненный перевод — ошибка: забыли язык.
 */
function withoutEmpty(value, where, errors, field = '') {
  if (value === '' || value === null) return undefined;
  if (Array.isArray(value)) {
    const list = value.map((v, i) => withoutEmpty(v, where, errors, `${field}[${i}]`)).filter((v) => v !== undefined);
    return list.length ? list : undefined;
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    const isText = keys.length === 3 && ['en', 'ru', 'vi'].every((lang) => typeof value[lang] === 'string');
    if (isText) {
      const filled = keys.filter((lang) => value[lang].trim() !== '');
      if (filled.length === 0) return undefined;
      if (filled.length < 3) {
        errors.push(`${where}, ${field}: translation missing for ${keys.filter((l) => !filled.includes(l)).join(', ')}`);
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
    // utimes округляет время до миллисекунды, поэтому сравниваем с допуском
    if (dst && dst.size === src.size && Math.abs(dst.mtimeMs - src.mtimeMs) < 1) continue;
    await fsp.mkdir(path.dirname(dest), { recursive: true });
    await fsp.copyFile(source, dest);
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
    throw new Error(`${path.relative(ROOT, DATA_DIR)}/ not found: link data/ to the Dropbox folder (README, «Данные товаров»)`);
  }
  const dataDir = fs.realpathSync(DATA_DIR);
  const errors = [];
  const { products, families, media, photos } = await collect(dataDir, errors, logger);
  if (errors.length) throw new DataErrors(errors);

  const compressed = await syncPhotos(photos, OUT_MEDIA, PHOTO_CACHE, logger);
  const changed =
    (await writeJsonDir(OUT_PRODUCTS, products)) +
    (await writeJsonDir(OUT_FAMILIES, families)) +
    (await syncMedia(media, photos)) +
    compressed;
  // Постеры для видео, у которых нет своего (кадр через ffmpeg, рядом с копией видео)
  await generateMissingPosters(OUT_MEDIA, logger);

  logger.info(
    (IS_DEMO ? 'DEMO data: ' : '') +
    `${products.size} product(s), ${families.size} famil${families.size === 1 ? 'y' : 'ies'}, ${photos.size} photo(s), ${media.size} video file(s)` +
      (changed ? ` — ${changed} change(s) written` : ' — up to date'),
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
  // Симлинк: следим за настоящей папкой в Dropbox
  globalThis.__productDataWatcher = fs.watch(fs.realpathSync(DATA_DIR), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      exportData(logger).catch((error) => logger.error(error.message));
    }, 300);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  exportData().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
