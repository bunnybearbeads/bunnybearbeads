/**
 * `npm run fill-data` — дописывает в JSON изделий и семейств все возможные поля с пустыми значениями
 * и выстраивает их в одном порядке. Заполненное не трогает.
 *
 * Нужно, чтобы при ручной правке было видно, куда можно что-то вписать (например, цену ремейка).
 * Пустые значения ("", [], { en: "", ru: "", vi: "" }, массив из пустых строк) экспорт считает
 * отсутствующими, так что на обязательность полей это не влияет.
 *
 * Запускается только вручную: пишет прямо в базу в Dropbox. Удобно после добавления нового изделия.
 *
 * Заодно обновляет схемы для подсказок в редакторе (`_system/product.schema.json`,
 * `_system/family.schema.json`) и вписывает в каждый JSON ссылку на свою схему — `"$schema"`. См. scripts/data-rules.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEMO_DIR, FAMILIES_DIR, FAMILY_SCHEMA_REF, LOCATION_ORDER, PRODUCT_SCHEMA_REF, schemaFiles } from './data-rules.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'data');
const LOCATIONS = LOCATION_ORDER;

const text = () => ({ en: '', ru: '', vi: '' });
/** Фото — список путей через запятую; пустой — просто [] */
const images = () => [];
const comment = () => ({ note: text(), noteImages: images() });

/** Порядок и пустые значения полей. Функция — чтобы у каждого файла были свои объекты */
const PRODUCT = () => ({
  /** Подсказки в редакторе (Ctrl+Пробел) — scripts/data-rules.mjs */
  $schema: PRODUCT_SCHEMA_REF,
  site: false,
  order: '',
  title: '',
  slug: '',
  /** charm, bracelet, ring, earrings, pen-wrap */
  category: '',
  /** По-английски, как title: переводов пока нет */
  description: '',
  gallery: images(),
  designer: '',
  /** Размер — произвольный текст, можно HTML, не переводится */
  size: '',
  locationNotes: {},
  remake: { price: '', note: text(), noteImages: images(), memo: '' },
  items: [],
});

const ITEM = () => ({
  id: '',
  price: '',
  location: '',
  craftedAt: '',
  /** Только у штук у партнёров — там обязательно; у штук в мастерской поля нет */
  consignedAt: '',
  /** Только у брелоков (category: charm) — там обязательно: keys, phone, mirror, bag */
  attachTo: '',
  maker: '',
  memo: '',
  /** Материалы штуки — строки HTML (одна строка массива — одна строка текста) */
  materials: [],
  out: { type: '', date: '', paid: '', memo: '' },
});

const FAMILY = () => ({ $schema: FAMILY_SCHEMA_REF, title: text(), members: [] });
const MEMBER = () => ({ product: '', note: text() });

const isPlainObject = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);

/**
 * Накладывает данные на шаблон: порядок ключей — как в шаблоне, затем неизвестные ключи как были.
 * Массивы с данными не трогаются (кроме items/members — их элементы тоже дополняются).
 */
function fill(template, data) {
  if (!isPlainObject(template) || !isPlainObject(data)) return data === undefined ? template : data;
  const out = {};
  for (const [key, empty] of Object.entries(template)) {
    out[key] = key in data ? fill(empty, data[key]) : empty;
  }
  for (const [key, value] of Object.entries(data)) {
    if (!(key in out)) out[key] = value;
  }
  return out;
}

const isBlank = (v) =>
  v === '' || (Array.isArray(v) && v.every(isBlank)) || (isPlainObject(v) && Object.values(v).every(isBlank));

/** Поля с фото: массив из одних пустых строк → [] */
function compactImages(value) {
  if (Array.isArray(value)) return value.map(compactImages);
  if (!isPlainObject(value)) return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, v]) =>
      [key, (key === 'gallery' || key === 'noteImages') && Array.isArray(v) && v.every((x) => x === '') ? [] : compactImages(v)],
    ),
  );
}

/**
 * Комментарии к точкам: заполненные остаются, пустые убираются. Если заполненных нет —
 * одна пустышка (atelier), чтобы было что скопировать: ключ меняется на нужную точку
 */
function fillLocationNotes(notes = {}) {
  const filled = Object.entries(notes).filter(([, note]) => !isBlank(note));
  if (filled.length === 0) return { [LOCATIONS[0]]: comment() };
  return Object.fromEntries(filled.map(([id, note]) => [id, fill(comment(), note)]));
}

/** Пустой перевод — одной строкой: так короче, а после ввода текста его можно разложить */
const EMPTY_TEXT_RE = /\{\n\s*"en": "",\n\s*"ru": "",\n\s*"vi": ""\n\s*\}/g;

function write(file, data) {
  const content = `${JSON.stringify(compactImages(data), null, 2).replace(EMPTY_TEXT_RE, '{ "en": "", "ru": "", "vi": "" }')}\n`;
  if (fs.readFileSync(file, 'utf8') === content) return false;
  fs.writeFileSync(file, content);
  return true;
}

let changed = 0;

/** Настоящая база и демо-база data/_system/demo — одинаковой структуры */
function fillBase(dataDir) {
  for (const folder of fs.readdirSync(dataDir).sort()) {
    const file = path.join(dataDir, folder, `${folder}.json`);
    if (folder.startsWith('_') || folder.startsWith('.') || !fs.existsSync(file)) continue;
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const result = fill(PRODUCT(), data);
    result.$schema = PRODUCT_SCHEMA_REF;
    // thumb больше не поле: берётся из _thumbs по имени папки. Заполненное оставляем — сборка подскажет
    if (isBlank(result.thumb)) delete result.thumb;
    result.locationNotes = fillLocationNotes(data.locationNotes);
    result.items = (data.items ?? []).map((item) => {
      const filled = fill(ITEM(), item);
      if (filled.location === LOCATIONS[0] && filled.consignedAt === '') delete filled.consignedAt;
      if (result.category !== 'charm' && filled.attachTo === '') delete filled.attachTo;
      return filled;
    });
    if (write(file, result)) changed += 1;
  }

  const familiesDir = path.join(dataDir, FAMILIES_DIR);
  if (fs.existsSync(familiesDir)) {
    for (const name of fs.readdirSync(familiesDir).filter((f) => f.endsWith('.json')).sort()) {
      const file = path.join(familiesDir, name);
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      const result = fill(FAMILY(), data);
      result.$schema = FAMILY_SCHEMA_REF;
      result.members = (data.members ?? []).map((member) => fill(MEMBER(), member));
      if (write(file, result)) changed += 1;
    }
  }

  // Схемы для подсказок — после изделий: в схеме семейства список slug
  for (const [name, content] of Object.entries(schemaFiles(dataDir))) {
    const file = path.join(dataDir, name);
    if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === content) continue;
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
    changed += 1;
  }
}

const realDir = fs.realpathSync(DATA_DIR);
fillBase(realDir);
if (fs.existsSync(path.join(realDir, DEMO_DIR))) fillBase(path.join(realDir, DEMO_DIR));

console.log(changed ? `обновлено файлов: ${changed}` : 'все файлы уже в порядке, ничего не изменено');
