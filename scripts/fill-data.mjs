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
import { BRACELET_PARTS, braceletOptions, LEGACY_BRACELET_KEYS, FINDINGS_FIELDS, THREAD_TYPES, LEGACY_KEYS, toKey, SIZE_FIELDS, DEMO_DIR, FAMILIES_DIR, FAMILY_SCHEMA_REF, LOCATION_ORDER, PRODUCT_SCHEMA_REF, schemaFiles } from './data-rules.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'data');
const LOCATIONS = LOCATION_ORDER;

const text = () => ({ en: '', ru: '', vi: '' });
/** Фото — список путей через запятую; пустой — просто [] */
const images = () => [];
const comment = () => ({ publicNote: text(), publicNoteImages: images() });

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
  /** Кто сделал: crafter — кто сплёл (пока всегда bunnybearbeads), designer — автор схемы, photographer — автор фото, по желанию; можно добавить другие роли */
  credits: { crafter: 'bunnybearbeads', designer: '', photographer: '' },
  locationNotes: {},
  remakeNote: { price: '', publicNote: text(), publicNoteImages: images(), privateNote: '' },
  /** Для себя, на сайт не попадает */
  privateNote: '',
  items: [],
});

const ITEM = () => ({
  id: '',
  price: '',
  location: '',
  craftedAt: '',
  /** Только у штук у партнёров — там обязательно; у штук в мастерской поля нет */
  consignedAt: '',
  out: { type: '', date: '', paid: '', privateNote: '' },
  /** Только у брелков (category: charm) — там обязательно: keys, phone, mirror, bag */
  attachTo: '',
  maker: '',
  privateNote: '',
  /** Размер и вес штуки — по категории: числа, длины в см, вес в г (поля — SIZE_FIELDS в data-rules.mjs) */
  size: '',
  /**
   * Материалы штуки: бисер, бусины, нитки — тип → цвета. Фурнитура — последним полем, своё у категории (FINDINGS_FIELDS):
   * findings у браслета, fastener у брелка, earWires у серёг (дописывает fillFindings)
   */
  materials: { colorsPublic: 'yes', beads: {}, additionalBeads: {}, threads: {} },
});

/** Размер и вес по категории: все поля, пустыми (видно, что вписать); заполненное не трогаем */
function fillSize(size, category) {
  const fields = SIZE_FIELDS[category];
  if (!fields) return size;
  const empty = Object.fromEntries(Object.keys(fields).map((key) => [key, '']));
  return size === '' || isPlainObject(size) ? fill(empty, size === '' ? {} : size) : size;
}

/**
 * Фурнитура по категории: у брелка и серёг — строка, у браслета — все детали пустыми (видно, что можно вписать),
 * у колец и обмоток для ручек поля нет. Заполненное не трогаем — если оно не того вида, подскажет сборка
 */
function fillFindings(materials, category) {
  // Старые нитки названиями «FireLine»: ["Black Satin"] → ключами fireline: ["black-satin"]
  if (isPlainObject(materials.threads)) {
    materials.threads = Object.fromEntries(Object.entries(materials.threads).map(([name, colors]) =>
      THREAD_TYPES[name] ? [toKey(name), Array.isArray(colors) ? colors.map((c) => (typeof c === 'string' ? toKey(c) : c)) : colors] : [name, colors]));
  }
  // Старые названия бисера, бусин и креплений брелка → ключи: «Toho Aiko» → toho-aiko
  for (const field of ['beads', 'additionalBeads']) {
    if (isPlainObject(materials[field])) {
      materials[field] = Object.fromEntries(Object.entries(materials[field]).map(([name, colors]) => [LEGACY_KEYS[name] ?? name, colors]));
    }
  }
  // Фурнитура была в findings у всех категорий — теперь своё поле: fastener у брелка, earWires у серёг
  const own = FINDINGS_FIELDS[category];
  if (own && own !== 'findings' && 'findings' in materials && !(own in materials)) {
    materials[own] = materials.findings;
    delete materials.findings;
  }
  // attachment у брелка — прежнее имя fastener
  if (own === 'fastener' && 'attachment' in materials && !('fastener' in materials)) {
    materials.fastener = materials.attachment;
    delete materials.attachment;
  }
  if (own === 'fastener' && LEGACY_KEYS[materials.fastener]) materials.fastener = LEGACY_KEYS[materials.fastener];
  const { [own ?? 'findings']: findings, ...rest } = materials;
  if (category === 'bracelet') {
    const empty = Object.fromEntries(Object.keys(BRACELET_PARTS).map((part) => [part, '']));
    // Старые полные названия «Finrusiac rhodium-plated brass» → короткие ключи «finrusiac-rhodium»
    if (isPlainObject(findings)) {
      for (const [part, value] of Object.entries(findings)) {
        if (!BRACELET_PARTS[part]) continue;
        const key = Object.entries(braceletOptions(part)).find(([, { label }]) => label === value)?.[0] ?? (braceletOptions(part)[value] ? undefined : LEGACY_BRACELET_KEYS[value]);
        if (key) findings[part] = key;
      }
    }
    return { ...rest, findings: isPlainObject(findings) || findings === '' ? fill(empty, findings === '' ? {} : findings) : findings };
  }
  if (own) return { ...rest, [own]: findings ?? '' };
  return isBlank(findings) ? rest : { ...rest, findings };
}

const FAMILY = () => ({ $schema: FAMILY_SCHEMA_REF, title: text(), members: [] });
const MEMBER = () => ({ product: '', publicNote: text() });

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
      [key, (key === 'gallery' || key === 'publicNoteImages') && Array.isArray(v) && v.every((x) => x === '') ? [] : compactImages(v)],
    ),
  );
}

/** Комментарии к точкам: заполненные остаются, пустые убираются; заполненных нет — undefined, поля не будет */
function fillLocationNotes(notes = {}) {
  const filled = Object.entries(notes).filter(([, note]) => !isBlank(note));
  if (filled.length === 0) return undefined;
  return Object.fromEntries(filled.map(([id, note]) => [id, fill(comment(), note)]));
}

/** Пустой перевод — одной строкой: так короче, а после ввода текста его можно разложить */
const EMPTY_TEXT_RE = /\{\n\s*"en": "",\n\s*"ru": "",\n\s*"vi": ""\n\s*\}/g;

/** Цвета в материалах штук (бисер, бусины, нитки) — одной строкой: ["10", "201", "306"], а не столбиком */
const COLOR_FIELDS = ['beads', 'additionalBeads', 'threads'];
function inlineColors(data) {
  const inline = [];
  const items = (data.items ?? []).map((item) => {
    if (!isPlainObject(item?.materials)) return item;
    const materials = { ...item.materials };
    for (const field of COLOR_FIELDS) {
      if (!isPlainObject(materials[field])) continue;
      materials[field] = Object.fromEntries(Object.entries(materials[field]).map(([key, colors]) => {
        if (!Array.isArray(colors) || colors.length === 0 || colors.some((c) => typeof c === 'object' && c !== null)) return [key, colors];
        inline.push(colors);
        return [key, `@@inline-colors-${inline.length - 1}@@`];
      }));
    }
    return { ...item, materials };
  });
  return { data: Array.isArray(data.items) ? { ...data, items } : data, inline };
}

function write(file, data) {
  const { data: prepared, inline } = inlineColors(compactImages(data));
  const content = `${JSON.stringify(prepared, null, 2)
    .replace(EMPTY_TEXT_RE, '{ "en": "", "ru": "", "vi": "" }')
    .replace(/"@@inline-colors-(\d+)@@"/g, (_, i) => `[${inline[i].map((c) => JSON.stringify(c)).join(', ')}]`)}\n`;
  if (fs.readFileSync(file, 'utf8') === content) return false;
  fs.writeFileSync(file, content);
  return true;
}

/** Поля изделия, которые нужны редко: пустыми не вписываются (locationNotes — тоже, см. fillLocationNotes). privateNote — всегда, чтобы не забыть заполнить */
const SKIP_IF_BLANK = ['locationNotes', 'remakeNote'];

let changed = 0;

/** Настоящая база и демо-база data/_system/demo — одинаковой структуры */
function fillBase(dataDir) {
  for (const folder of fs.readdirSync(dataDir).sort()) {
    const file = path.join(dataDir, folder, `${folder}.json`);
    if (folder.startsWith('_') || folder.startsWith('.') || !fs.existsSync(file)) continue;
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    // credits: craft и maker → crafter, design → designer, photo → photographer (порядок ролей сохраняется)
    if (isPlainObject(data.credits)) {
      const RENAMED = { craft: 'crafter', maker: 'crafter', design: 'designer', photo: 'photographer' };
      data.credits = Object.fromEntries(Object.entries(data.credits).map(([role, name]) => [RENAMED[role] ?? role, name]));
    }
    // remake → remakeNote
    if ('remake' in data && !('remakeNote' in data)) {
      data.remakeNote = data.remake;
      delete data.remake;
    }
    const result = fill(PRODUCT(), data);
    result.$schema = PRODUCT_SCHEMA_REF;
    // thumb больше не поле: берётся из _thumbs по имени папки. Заполненное оставляем — сборка подскажет
    if (isBlank(result.thumb)) delete result.thumb;
    // Размер был у изделия — теперь у штук: копируем в штуки, где его ещё нет
    const productSize = data.size;
    delete result.size;
    // Редкие поля — только заполненные, пустые шаблоны не вписываем (остальные поля шаблона — всегда, чтобы не забыть про них)
    result.locationNotes = fillLocationNotes(data.locationNotes);
    for (const key of SKIP_IF_BLANK) if (isBlank(result[key])) delete result[key];
    result.items = (data.items ?? []).map((item) => {
      const filled = fill(ITEM(), isPlainObject(productSize) && !isPlainObject(item.size) ? { ...item, size: productSize } : item);
      filled.size = fillSize(filled.size, result.category);
      if (filled.location === LOCATIONS[0] && filled.consignedAt === '') delete filled.consignedAt;
      // Нет out — штука в наличии: пустой шаблон не вписываем
      if (isBlank(filled.out)) delete filled.out;
      if (result.category !== 'charm' && filled.attachTo === '') delete filled.attachTo;
      filled.materials = fillFindings(filled.materials, result.category);
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
