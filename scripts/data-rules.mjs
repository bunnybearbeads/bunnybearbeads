/**
 * Допустимые значения полей базы и JSON Schema для подсказок в редакторе.
 *
 * Списки — общие для проверки при сборке (export-data.mjs) и для схемы: добавили точку или категорию
 * здесь — она появится и в подсказках (после `npm run fill-data`), и в проверке.
 *
 * Схемы лежат в служебной папке базы: `_system/product.schema.json` и `_system/family.schema.json`
 * (в демо-базе — свои копии).
 * Каждый JSON ссылается на свою полем `"$schema"` — его вписывает `npm run fill-data`. Редактор по нему
 * подсказывает поля и значения (Ctrl+Пробел), показывает описание при наведении и подчёркивает ошибки.
 * Схема — только подсказка: всё, что в ней не выразить (attachTo только у брелков, consignedAt только
 * у партнёров, одна цена у штук в наличии…), проверяет сборка.
 */
import fs from 'node:fs';
import path from 'node:path';

/** Порядок точек в данных и на сайте. Должен совпадать с src/config/locations.ts */
/** atelier — своя мастерская (сейчас в Далате): id не привязан к городу на случай переезда */
export const LOCATION_ORDER = ['atelier', 'ngay-mai', 'cat-food'];
export const MAKERS = ['bunny', 'bear'];
/** credits.crafter — под каким именем плетение подписано на сайте; credits.photographer — авторы фото. Новое имя — сюда */
export const CREDIT_CRAFTERS = ['bunnybearbeads', 'tonybrickstitch'];
export const PHOTOGRAPHERS = ['tolaxoaii_04'];
/** Категории изделий, в единственном числе. Должны совпадать с src/config/categories.ts */
export const CATEGORIES = ['charm', 'bracelet', 'ring', 'earrings', 'pen-wrap'];
/** На что носится брелок: у каждой штуки-брелка обязательно, у остальных категорий поля нет */
export const ATTACH_TO = ['keys', 'phone', 'mirror', 'bag'];
/**
 * Ключ для данных: строчными, пробелы → дефис. Справочники (бисер, бусины, нитки, фурнитура) в коде — с названиями
 * как на сайте, а в данных — ключами: «Toho One-G» → toho-one-g, «Black Satin» → black-satin, «Miyuki Delica 11/0» →
 * miyuki-delica-11/0, «#10» → #10
 */
export const toKey = (name) => name.toLowerCase().replace(/\s+/g, '-');
/** Справочник по ключам данных: { 'toho-aiko': { name: 'Toho Aiko', …свойства } } */
const keyed = (types) => Object.fromEntries(Object.entries(types).map(([name, props]) => [toKey(name), { name, ...props }]));
/** Старое название → ключ: «Toho Aiko» → toho-aiko (для миграции в fill-data и подсказки в сборке) */
export const LEGACY_KEYS = {};
/**
 * Метки изделия для выборок в каталоге (`tags`): группа → метка → пояснение в подсказке редактора. В каталоге группа —
 * фильтр: внутри группы «или», между группами «и». Животные, природа, еда — отдельными группами, чтобы Ctrl+Пробел
 * сначала давал группу, а внутри — короткий список. Общей «другое» нет: новое животное — новая метка
 * (otters), даже если оно одно. В каталоге на сайт выводим только метки, у которых 2+ изделия, — так вторая выдра
 * сама «включит» метку, и не надо помнить про первую.
 * Новая метка — дописать сюда и `npm run fill-data`; переводы — когда дойдём до каталога. На сайт пока не выводятся
 */
export const TAGS = {
  // Основные, обобщённые: стиль, настроение, большие темы
  theme: {
    graceful: 'изящное, элегантное, по-взрослому красивое, не милое',
    cute: 'милое',
    gothic: 'готика, мрачное',
    classic: 'сдержанное, для солидных женщин',
    minimal: 'минимализм',
    boho: 'бохо',
    lol: 'смешное, с юмором',
    geometry: 'геометрия, геометрический узор',
    aztec: 'ацтекский орнамент',
    tech: 'техника, технологии',
    lgbt: 'ЛГБТ, прайд, радужное',
    metallic: 'под металл: просто золотое или серебряное',
  },
  season: {
    winter: 'зима',
    spring: 'весна',
    summer: 'лето',
    autumn: 'осень',
  },
  occasion: {
    christmas: 'Рождество',
    'new-year': 'Новый год',
    halloween: 'Хэллоуин',
    valentines: 'День святого Валентина',
    easter: 'Пасха',
    birthday: 'день рождения',
  },
  audience: {
    kids: 'детям',
    'grown-ups': 'взрослым',
    'men-friendly': 'generally acceptable by men',
  },
  // Не путать с location штуки (где лежит): это откуда мотив — лотос → asia
  region: {
    asia: 'Азия: лотос…',
  },
  animals: {
    cats: 'кошки',
    dogs: 'собаки',
    birds: 'птицы',
    butterflies: 'бабочки',
    penguins: 'пингвины',
    seals: 'тюлени',
  },
  nature: {
    flowers: 'цветы',
    sea: 'море',
    mountains: 'горы',
  },
  food: {
    fruits: 'фрукты, ягоды',
    sweets: 'сладости',
  },
};
/** Группа меток → подпись в подсказке редактора */
export const TAG_GROUP_NAMES = {
  theme: 'Основные', season: 'Сезон', occasion: 'Праздник', audience: 'Для кого', region: 'Регион, страна', animals: 'Животные', nature: 'Природа', food: 'Еда',
};
/** Исход штуки (`out.type`): продана, подарена, брак или потеря, оставили себе */
export const OUT_TYPES = ['sold', 'gift', 'lost', 'kept'];
/**
 * Типы бисера для `items[].materials.beads`: ключ — название, как пишется на сайте (не переводится).
 * Delica 11/0 и 10/0 — разные типы. short — подпись цветов, когда бисера два («Delica colors: …»);
 * pairName — название в паре, если у бисера несколько цветов (по умолчанию — ключ); premium — Toho Aiko:
 * у него и у пары с ним приписка «the world’s best seed beads», у остальных — «high-quality Japanese seed beads».
 * Новый бисер — дописать сюда и запустить `npm run fill-data` (подсказки в редакторе)
 */
export const BEAD_TYPES = {
  'Miyuki Delica 11/0': { short: 'Delica', pairName: 'Miyuki Delica' },
  'Miyuki Delica 10/0': { short: 'Delica 10/0' },
  'Miyuki Delica 15/0': { short: 'Delica 15/0' },
  'Miyuki Cube Beads 1.8mm': { short: 'Cube' },
  'Miyuki Rocailles 11/0': { short: 'Rocailles' },
  'Miyuki Rocailles 15/0': { short: 'Rocailles 15/0' },
  'Miyuki Tila': { short: 'Tila' },
  'Miyuki Half Tila': { short: 'Half Tila' },
  'Miyuki Quarter Tila': { short: 'Quarter Tila' },
  '6mm Miyuki Bugles': { short: 'Bugles' },
  'Toho Aiko': { short: 'Aiko', premium: true },
  'Toho Round 11/0': { short: 'Toho Round' },
  'Toho Round 15/0': { short: 'Toho Round 15/0' },
  'Toho Round 8/0': { short: 'Toho Round 8/0' },
};
/** Бисер по ключу данных */
export const BEADS = keyed(BEAD_TYPES);
/**
 * Бусины для `items[].materials.additionalBeads` — после бисера: биконусы, простые бусины. Ключ — как в данных;
 * id — ключи перевода в src/i18n/ui.ts: `materials.additional_bead.<id>` (название с местом для цвета) и у брендовых
 * `materials.additional_bead_note.<id>` (приписка). branded — название жирным и с припиской; rank — чья приписка
 * у пары двух брендовых (больше — главнее, как Toho Aiko у бисера)
 */
export const ADDITIONAL_BEAD_TYPES = {
  'Unbranded bicones': { id: 'unbranded_bicones' },
  'Preciosa bicones': { id: 'preciosa_bicones', branded: true, rank: 1 },
  'Swarovski bicones': { id: 'swarovski_bicones', branded: true, rank: 2 },
  'Basic beads': { id: 'basic_beads' },
};
/** Бусины по ключу данных */
export const ADDITIONAL_BEADS = keyed(ADDITIONAL_BEAD_TYPES);
/** Основные цвета бусин. Перевод — `materials.color.<цвет>` в src/i18n/ui.ts, новый цвет — туда же */
export const ADDITIONAL_BEAD_COLORS = [
  'crystal', 'pale', 'white', 'black', 'red', 'pink', 'orange', 'yellow', 'green', 'light-blue', 'blue', 'purple', 'brown', 'gold', 'silver',
];
/** Поля `materials`. other — временно, пока нитки и фурнитура не разобраны: строки HTML, каждая — пункт списка */
/**
 * Нитки: ключ — название, как на сайте (не переводится); id — ключ приписки `materials.thread_note.<id>`
 * в src/i18n/ui.ts. Цвета — как на катушке: "Smoke", "Crystal", "#10". В данных (`items[].materials.threads`)
 * и нитка, и цвета пишутся ключами (toKey): "fireline": ["black-satin"], "toho-one-g": [], "fgb": ["#02"]
 */
export const THREAD_TYPES = {
  FireLine: { id: 'fireline', colors: ['Black Satin', 'Smoke', 'Crystal'] },
  'Miyuki Dura-Line': { id: 'miyuki_dura_line', colors: ['Smoke', 'Crystal'] },
  // Цвета WildFire — по магазинам (официального списка у Beadalon нет): ищу по названию на катушке
  WildFire: { id: 'wildfire', colors: ['Black', 'White', 'Frost', 'Grey', 'Beige', 'Blue', 'Green', 'Pink', 'Red'] },
  // Toho One-G — 22 цвета, названия как в магазинах. На катушках ни номера, ни названия нет — не знаю цвет, оставляю []
  'Toho One-G': {
    id: 'toho_one_g',
    colors: ['White', 'Cream', 'Beige', 'Sand Ash', 'Lt Khaki', 'Lt Yellow', 'Orange', 'Pink', 'Red', 'Burgundy', 'Mauve', 'Lt Lavender', 'Purple', 'Blue', 'Navy', 'Mint Green', 'Green', 'Deep Green', 'Brown', 'Lt Gray', 'Gray', 'Black'],
  },
  // Цвета ниток Miyuki — #1…#24, FGB — #02…#23 (так на катушках: у FGB с нулём впереди и без #01)
  Miyuki: { id: 'miyuki', colors: Array.from({ length: 24 }, (_, i) => `#${i + 1}`) },
  FGB: { id: 'fgb', colors: Array.from({ length: 22 }, (_, i) => `#${String(i + 2).padStart(2, '0')}`) },
};
/** Нитки по ключу данных: { fireline: { name: 'FireLine', id: 'fireline', colors: { 'black-satin': 'Black Satin', … } } } */
export const THREADS = Object.fromEntries(
  Object.entries(THREAD_TYPES).map(([name, { id, colors }]) => [toKey(name), { name, id, colors: Object.fromEntries(colors.map((color) => [toKey(color), color])) }]),
);
/**
 * Фурнитура (`items[].materials.findings`) зависит от category изделия:
 * - charm — одно из CHARM_FINDINGS (подпись на сайте переводится: `materials.charm_finding.<id>`);
 * - earrings — просто строка текста;
 * - bracelet — объект деталей BRACELET_PARTS, у каждой — бренд с материалом из списка;
 * - ring, pen-wrap — фурнитуры нет, поля нет
 */
export const CHARM_FINDINGS = {
  'Basic keyring': 'keyring',
  'Basic charm strap': 'charm_strap',
  'Large lobster clasp': 'large_lobster_clasp',
  'Basic hanging strap': 'hanging_strap',
};
/** Ключ в данных короче названия: «Large lobster clasp» → swivel-clasp, «Basic hanging strap» → hanging-strap */
const CHARM_FINDING_SHORT_KEYS = { 'Large lobster clasp': 'swivel-clasp', 'Basic hanging strap': 'hanging-strap' };
const charmFindingKey = (name) => CHARM_FINDING_SHORT_KEYS[name] ?? toKey(name);
/** Крепления брелка по ключу данных: { 'basic-keyring': { name: 'Basic keyring', id: 'keyring' }, lobster: … } */
export const CHARM_FINDING_KEYS = Object.fromEntries(Object.entries(CHARM_FINDINGS).map(([name, id]) => [charmFindingKey(name), { name, id }]));
for (const types of [BEAD_TYPES, ADDITIONAL_BEAD_TYPES, THREAD_TYPES]) {
  for (const name of Object.keys(types)) LEGACY_KEYS[name] = toKey(name);
}
for (const name of Object.keys(CHARM_FINDINGS)) {
  LEGACY_KEYS[name] = charmFindingKey(name);
  if (toKey(name) !== charmFindingKey(name)) LEGACY_KEYS[toKey(name)] = charmFindingKey(name);
}
LEGACY_KEYS.lobster = 'swivel-clasp';
/** Металлы фурнитуры браслетов. Перевод — `materials.metal.<id>` в src/i18n/ui.ts */
export const METALS = {
  rhodium: 'rhodium-plated brass',
  gold18: '18K gold-plated brass',
  gold24: '24K gold-plated brass',
  stainless: 'stainless steel',
  // Cymbal — литьё из замака (цинковый сплав) с покрытием; бывают ещё antiqued brass и rose gold — добавить, когда появятся
  zamacAntiqueSilver: 'antique silver-plated zamac',
  zamacGold24: '24K gold-plated zamac',
};
const PLATED = ['rhodium', 'gold18', 'gold24'];
/** Без бренда — всегда нержавеющая сталь */
const BASIC = { Basic: ['stainless'] };
/**
 * Детали браслета: бренд → металлы. Порядок — порядок на сайте. Перевод названий — `materials.part.<деталь>`.
 * Обычно chain или adjustableChain, lobsterClasp или magneticClasp. connectorRings — не отдельным пунктом:
 * дописываются к деталям того же бренда и металла, а если таких нет — не выводятся
 */
export const BRACELET_PARTS = {
  slideTubes: { Finrusiac: PLATED, 'Tarin Thomas': PLATED, Miyuki: ['rhodium', 'gold24'], ...BASIC },
  /** Литые концевики под тилу и т. п. — вместо трубочек */
  beadEndings: { Cymbal: ['zamacAntiqueSilver', 'zamacGold24'] },
  chain: { Finrusiac: PLATED, 'Tarin Thomas': PLATED, ...BASIC },
  adjustableChain: { Finrusiac: PLATED, 'Tarin Thomas': PLATED, ...BASIC },
  lobsterClasp: { Finrusiac: PLATED, 'Tarin Thomas': PLATED, ...BASIC },
  magneticClasp: { Finrusiac: PLATED, 'Tarin Thomas': PLATED, ...BASIC },
  connectorRings: { Finrusiac: PLATED, 'Tarin Thomas': PLATED, ...BASIC },
};
/**
 * Металл в ключе детали — только покрытие: у Finrusiac, Tarin Thomas и Miyuki всегда латунь, у Cymbal — замак
 * (cymbal-antique-silver, cymbal-24k)
 */
const METAL_KEYS = { rhodium: 'rhodium', gold18: '18k', gold24: '24k', zamacAntiqueSilver: 'antique-silver', zamacGold24: '24k' };
/** Старые ключи деталей браслета → новые (для fill-data): у Cymbal был один металл — у нас он состаренное серебро */
export const LEGACY_BRACELET_KEYS = { cymbal: 'cymbal-antique-silver' };
/**
 * Варианты детали, как их пишут в JSON → { brand, metal, label }: «finrusiac-rhodium», «tarin-thomas-18k»;
 * у бренда с одним металлом — только бренд: «cymbal», «basic». label — полное название для подсказки
 * («Finrusiac rhodium-plated brass»); на сайте и в переводах всё по-прежнему из brand и metal
 */
export function braceletOptions(part) {
  return Object.fromEntries(
    Object.entries(BRACELET_PARTS[part]).flatMap(([brand, metals]) =>
      metals.map((metal) => [
        metals.length === 1 ? toKey(brand) : `${toKey(brand)}-${METAL_KEYS[metal] ?? metal}`,
        { brand, metal, label: `${brand} ${METALS[metal]}` },
      ]),
    ),
  );
}
/**
 * Можно ли публиковать цвета бисера (`materials.colorsPublic`):
 * - yes — да (по умолчанию);
 * - no — нет: подбор цветов — секрет автора купленной схемы. В базе есть, на сайт не попадает — вместо цветов пояснение;
 * - replaced — да: оригинальный подбор — часть платной схемы, но бисер заменён своим — цвета выводятся и пояснение, что микс свой
 */
export const COLORS_PUBLIC = ['yes', 'no', 'replaced'];
/**
 * Поле фурнитуры в materials — своё у категории, чтобы не путать: у браслета findings (детали), у брелка fastener
 * (крепление), у серёг earWires (швензы). У колец и обмоток для ручек фурнитуры нет
 */
export const FINDINGS_FIELDS = { bracelet: 'findings', charm: 'fastener', earrings: 'earWires' };
export const MATERIAL_FIELDS = ['colorsPublic', 'beads', 'additionalBeads', 'threads', ...Object.values(FINDINGS_FIELDS)];
export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
/** id штуки: 3–4 заглавные буквы (обычно первые согласные названия) и две цифры, PWST01 */
export const ITEM_ID_RE = /^[A-Z]{3,4}\d{2}$/;
/**
 * Дата может быть неполной: точная (2026-11-01), только месяц (2026-11 — например, NGÀY MAI сообщает
 * продажи за месяц без дат), квартал (2026-Q3), полугодие (2026-H1) или только год (2024 — для старых записей)
 */
export const PARTIAL_DATE_RE = /^(\d{4})(?:-(?:(0[1-9]|1[0-2])(?:-(\d{2}))?|Q[1-4]|H[12]))?$/;
export const DATE_FORMATS = '2026-11-01, 2026-11, 2026-Q3, 2026-H1 или 2026';
/** Подсказка к датам в редакторе — подробнее, чем DATE_FORMATS в ошибках сборки */
const DATE_HINT = 'Формат ГГГГ-ММ-ДД: 2026-11-01. День и месяц можно опустить, если точно не помню: 2026-11 или просто 2026. Можно квартал — 2026-Q3 (Q1…Q4) или полугодие — 2026-H1 (H1, H2)';

/**
 * Служебная папка базы — всё, что не изделия: семейства, схемы, демо-база, заметки.
 * Папки с «_» в начале сборка изделиями не считает. У демо-базы — своя такая же
 */
export const SYSTEM_DIR = '_system';
export const FAMILIES_DIR = `${SYSTEM_DIR}/families`;
export const DEMO_DIR = `${SYSTEM_DIR}/demo`;
/**
 * Превью 40:22 для плашки семейства (thumb) — одной папкой в корне базы, экспорт из Фигмы пачкой.
 * Файл называется как папка изделия: Lumi/ → _thumbs/Lumi.png. Поля в JSON нет — сборка находит сама
 */
export const THUMBS_DIR = '_thumbs';
export const THUMB_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
/**
 * Ключ для сравнения имени папки и файла thumb: без регистра, а символы, которые Фигма и файловые системы
 * в именах файлов заменяют (`:` → `_`), считаются одинаковыми. «Sunlit Orchard: Early Pick» = «Sunlit Orchard_ Early Pick»
 */
export const thumbKey = (name) => name.normalize('NFC').toLowerCase().replace(/[:/\\?*"<>|_]/g, '_').trim();
export const PRODUCT_SCHEMA_FILE = `${SYSTEM_DIR}/product.schema.json`;
export const FAMILY_SCHEMA_FILE = `${SYSTEM_DIR}/family.schema.json`;
/** Значение "$schema" в JSON: путь от файла изделия (Lumi/Lumi.json) и семейства (_system/families/cats.json) */
export const PRODUCT_SCHEMA_REF = `../${PRODUCT_SCHEMA_FILE}`;
export const FAMILY_SCHEMA_REF = '../family.schema.json';

/** slug всех изделий базы — для подсказок в семействах */
export function productSlugs(dataDir) {
  const slugs = new Set();
  for (const folder of fs.readdirSync(dataDir)) {
    const file = path.join(dataDir, folder, `${folder}.json`);
    if (folder.startsWith('_') || folder.startsWith('.') || !fs.existsSync(file)) continue;
    try {
      const { slug } = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (typeof slug === 'string' && SLUG_RE.test(slug)) slugs.add(slug);
    } catch {
      // битый JSON — о нём скажет сборка
    }
  }
  return [...slugs].sort();
}

// Пустое значение ("") разрешено везде: в шаблоне все поля есть, пустое = не заполнено
const empty = { const: '' };
const pattern = (re) => ({ type: 'string', pattern: `^$|${re.source}` });
const choice = (values, description) => ({ description, enum: ['', ...values] });
/**
 * Выбор из списка с пояснением к каждому значению: { yes: 'да', no: 'нет' }. Пояснения видны прямо в списке
 * подсказок: x-intellij-enum-metadata — WebStorm (справа от значения), enumDescriptions — VS Code
 */
const choiceWithHints = (hints, description) => ({
  ...choice(Object.keys(hints), description),
  'x-intellij-enum-metadata': Object.fromEntries(Object.entries(hints).map(([value, hint]) => [value, { description: hint }])),
  enumDescriptions: ['', ...Object.values(hints)],
});
const text = (description) => ({
  description,
  type: 'object',
  properties: { en: { type: 'string' }, ru: { type: 'string' }, vi: { type: 'string' } },
  required: ['en', 'ru', 'vi'],
  additionalProperties: false,
});
const price = (description) => ({ description, anyOf: [{ type: 'integer', minimum: 1 }, empty] });
/**
 * Дата: подсказки по Ctrl+Пробел — сегодняшняя дата во всех форматах, с пояснением справа. Это не ограничение:
 * подходит любая дата по PARTIAL_DATE_RE (anyOf), список — только образцы. Пересчитывается при каждом npm run fill-data
 */
function dateExamples(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  // Массив пар, не объект: ключ «2026» объект поставил бы первым (числовые ключи сортируются)
  return [
    [`${year}-${month}-${day}`, 'точная дата: год-месяц-день'],
    [`${year}-${month}`, 'только месяц — день не помню'],
    [`${year}-Q${Math.floor(now.getMonth() / 3) + 1}`, 'квартал: Q1…Q4'],
    [`${year}-H${now.getMonth() < 6 ? 1 : 2}`, 'полугодие: H1, H2'],
    [String(year), 'только год'],
  ];
}
const date = (description) => {
  const examples = dateExamples();
  return {
    description: `${description}. ${DATE_HINT}`,
    anyOf: [
      { enum: examples.map(([value]) => value), 'x-intellij-enum-metadata': Object.fromEntries(examples.map(([value, hint]) => [value, { description: hint }])) },
      pattern(PARTIAL_DATE_RE),
    ],
  };
};
const html = (description) => ({ description, type: 'array', items: { type: 'string' } });
/** Цвета бусин — из списка ADDITIONAL_BEAD_COLORS. Без описания: оно одно на все типы — сказано у additionalBeads */
const additionalBeadColors = () => ({ type: 'array', items: { enum: ADDITIONAL_BEAD_COLORS } });
/** Коды цветов бисера или нити — как на упаковке: 201, "402B", "PF557", "DBS-10", "#426". Без описания: оно одно на все типы
 * и только мешает в списке подсказок — как вписывать цвета, сказано у beads и threads */
const colors = {
  type: 'array',
  items: { anyOf: [{ type: 'string', minLength: 1 }, { type: 'integer', minimum: 0 }] },
};
const filePath = { type: 'string', description: 'Путь относительно папки изделия: "site/PB090071.jpg"' };
const media = (description) => ({
  description,
  type: 'array',
  items: {
    anyOf: [
      filePath,
      {
        type: 'object',
        description: 'Видео: { "type": "video", "src": "site/turn.mp4" }, постер — необязательно',
        properties: { type: { const: 'video' }, src: filePath, poster: filePath },
        required: ['type', 'src'],
        additionalProperties: false,
      },
      {
        type: 'object',
        description: 'Фото с подписью: { "src": "site/x.jpg", "alt": "…" }',
        properties: { src: filePath, alt: { type: 'string' } },
        required: ['src'],
        additionalProperties: false,
      },
    ],
  },
});
const comment = (description) => ({
  description,
  type: 'object',
  properties: { publicNote: text('Один абзац, без <p> и <div>'), publicNoteImages: media('Фото к комментарию') },
  additionalProperties: false,
});

/**
 * Размер и вес изделия (`size`) — один объект, поля по категории. Длины — в сантиметрах, вес — в граммах,
 * числа можно дробные (1.2). Подписи и единицы переводит сайт (src/utils/size.ts); обхват запястья у браслета
 * сайт считает сам из длины
 */
const WEIGHT = { weight: 'Вес, г' };
export const SIZE_FIELDS = {
  bracelet: { width: 'Ширина, см', length: 'Длина, см', ...WEIGHT },
  charm: { width: 'Ширина без крепления, см', height: 'Высота без крепления, см', ...WEIGHT },
  ring: {
    beads: 'Ширина в бисеринах',
    fingerFrom: 'Обхват пальца от, см',
    fingerTo: 'Обхват пальца до, см',
    sizeFrom: 'Размер кольца от',
    sizeTo: 'Размер кольца до (один размер — как sizeFrom)',
    ...WEIGHT,
  },
  earrings: { width: 'Ширина, см', length: 'Длина, см', ...WEIGHT },
  'pen-wrap': { width: 'Ширина, см', length: 'Длина, см', ...WEIGHT },
};

/** Поле size → подсказка; у разных категорий подпись может отличаться: «Ширина, см (bracelet, earrings…) / Ширина без крепления, см (charm)» */
function sizeFieldHint(key) {
  const byHint = new Map();
  for (const [category, fields] of Object.entries(SIZE_FIELDS)) {
    if (fields[key]) byHint.set(fields[key], [...(byHint.get(fields[key]) ?? []), category]);
  }
  if (byHint.size === 1 && [...byHint.values()][0].length === CATEGORIES.length) return [...byHint.keys()][0];
  return [...byHint].map(([hint, categories]) => `${hint} (${categories.join(', ')})`).join(' / ');
}

/**
 * Подсказки для size и materials.findings — сразу для всех категорий, без if/then по category:
 * WebStorm при подсказках условие не проверяет (берёт общую схему или первую ветку), и подсказки пропадают.
 * Какие поля нужны именно этой категории, проверяет сборка (export-data.mjs)
 */
function sizeSchema() {
  const number = (description) => ({ description, anyOf: [{ type: 'number', exclusiveMinimum: 0 }, empty] });
  const keys = [...new Set(Object.values(SIZE_FIELDS).flatMap(Object.keys))];
  return {
    type: 'object',
    description: 'Размер и вес штуки — поля по category (в скобках — у каких категорий): числа без кавычек, длины в см, вес в г, можно дробные (1.2). Нет значения — пусто. На сайте — размер той же штуки, что и материалы; другой размер у штуки в наличии — нужен комментарий к её точке (locationNotes)',
    properties: Object.fromEntries(keys.map((key) => [key, number(sizeFieldHint(key))])),
    additionalProperties: false,
  };
}

/** Фурнитура — своё поле у каждой категории (FINDINGS_FIELDS) */
function findingsSchemas() {
  return {
    findings: {
      type: 'object',
      description: 'Только у браслетов: детали — бренд и металл из списка. Нет детали — пусто. Фурнитуры нет совсем — всё пусто',
      properties: Object.fromEntries(Object.keys(BRACELET_PARTS).map((part) => [
        part,
        choiceWithHints(Object.fromEntries(Object.entries(braceletOptions(part)).map(([key, { label }]) => [key, label])), BRACELET_PART_HINTS[part]),
      ])),
      additionalProperties: false,
    },
    fastener: choiceWithHints(Object.fromEntries(Object.entries(CHARM_FINDING_KEYS).map(([key, { name }]) => [key, name])), 'Только у брелков: крепление'),
    earWires: { type: 'string', description: 'Только у серёг: швензы строкой текста, как на сайте: «Hypoallergenic stainless steel ear hooks»' },
  };
}

/** Схема изделия: одна схема штуки на все категории (см. sizeSchema) */
export function productSchema() {
  const schema = baseProductSchema();
  const item = schema.definitions.item;
  item.properties.size = sizeSchema();
  Object.assign(item.properties.materials.properties, findingsSchemas());
  return schema;
}

const BRACELET_PART_HINTS = {
  slideTubes: 'Концевики-трубочки',
  beadEndings: 'Литые концевики (Cymbal) — например, у браслетов из тилы',
  chain: 'Цепочка (обычно она или adjustableChain)',
  adjustableChain: 'Цепочка с бегунком',
  lobsterClasp: 'Замок-карабин (обычно он или magneticClasp)',
  magneticClasp: 'Магнитный замок',
  connectorRings: 'Соединительные колечки — на сайте дописываются к деталям того же бренда и металла, иначе не выводятся',
};

function baseProductSchema() {
  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Изделие bunnybearbeads',
    description: 'Подсказки для редактора. Сгенерировано npm run fill-data из scripts/data-rules.mjs — не править руками',
    type: 'object',
    properties: {
      $schema: { type: 'string' },
      site: { type: 'boolean', description: 'Показывать на сайте. С true нужно хотя бы одно фото в gallery' },
      order: { description: 'Место в каталоге: число без кавычек, меньше — выше. Без него — в конец, по алфавиту', anyOf: [{ type: 'number' }, empty] },
      title: { type: 'string', description: 'Название по-английски, не переводится. Уникально' },
      slug: { description: 'Адрес /catalog/<slug>: латиница строчными, цифры, дефисы. Уникален', ...pattern(SLUG_RE) },
      category: choice(CATEGORIES, 'Категория, в единственном числе (earrings — пара)'),
      description: { type: 'string', description: 'Описание по-английски, один абзац без <p> и <div>' },
      gallery: media('Фото и видео изделия, первое — обложка в каталоге. Фото строго 3:4, вертикальные'),
      tags: {
        type: 'object',
        description: 'Метки для выборок в каталоге: группа → метки из списка (TAGS в scripts/data-rules.mjs). Можно несколько, можно ни одной',
        properties: Object.fromEntries(Object.entries(TAGS).map(([group, hints]) => [group, {
          type: 'array',
          description: TAG_GROUP_NAMES[group] ?? group,
          uniqueItems: true,
          items: {
            enum: Object.keys(hints),
            'x-intellij-enum-metadata': Object.fromEntries(Object.entries(hints).map(([tag, hint]) => [tag, { description: hint }])),
            enumDescriptions: Object.values(hints),
          },
        }])),
        additionalProperties: false,
      },
      credits: {
        type: 'object',
        description: 'Кто сделал — просто имена, без HTML. crafter и designer обязательны, остальное — любые пары, на сайте выводятся все по порядку. Если все — bunnybearbeads, секции нет',
        properties: {
          crafter: choice(CREDIT_CRAFTERS, 'Кто сплёл — имя на сайте, обязательно (не путать с maker у штуки). Новое — в CREDIT_CRAFTERS (scripts/data-rules.mjs)'),
          designer: { type: 'string', description: 'Автор схемы, обязательно' },
          photographer: choice(PHOTOGRAPHERS, 'Автор фото, по желанию. Новый — в PHOTOGRAPHERS (scripts/data-rules.mjs)'),
        },
        additionalProperties: { type: 'string', description: 'Ещё кто-то: ключ — роль (выводится подписью), значение — имя' },
      },
      locationNotes: {
        type: 'object',
        description: 'Комментарий для посетителей к штукам в точке — ключ: точка',
        propertyNames: { enum: LOCATION_ORDER },
        additionalProperties: comment('Комментарий к точке'),
      },
      remakeNote: {
        type: 'object',
        description: 'Ремейк — только когда в мастерской нет ни одной штуки',
        properties: {
          price: price('Цена ремейка в донгах, число без кавычек'),
          publicNote: text('Комментарий к ремейку для посетителей, один абзац'),
          publicNoteImages: media('Фото к комментарию ремейка'),
          privateNote: { type: 'string', description: 'Для себя, на сайт не попадает' },
        },
        additionalProperties: false,
      },
      privateNote: { type: 'string', description: 'Для себя, на сайт не попадает. Необязательно' },
      items: { type: 'array', description: 'Физические штуки, ушедшие не удаляются, а получают out', items: { $ref: '#/definitions/item' } },
    },
    additionalProperties: false,
    definitions: {
      item: {
        type: 'object',
        properties: {
          id: { description: '3–4 заглавные буквы и две цифры: PWST01. Уникален по всей базе', ...pattern(ITEM_ID_RE) },
          price: price('Цена в донгах, число без кавычек: 320000'),
          location: choice(LOCATION_ORDER, 'Где лежит: atelier — своя мастерская, остальные — партнёры'),
          craftedAt: date('Когда сплетена'),
          consignedAt: date('Только у штук у партнёров: когда передана'),
          out: {
            type: 'object',
            description: 'Исход: штука ушла. Нет out — штука в наличии',
            properties: {
              type: choice(OUT_TYPES, 'sold — продана, gift — подарена, lost — брак или потеря, kept — оставили себе'),
              date: date('Когда ушла'),
              paid: { description: 'Сколько реально получено, в донгах, число без кавычек (0 — не продажа)', anyOf: [{ type: 'integer', minimum: 0 }, empty] },
              privateNote: { type: 'string', description: 'Для себя, на сайт не попадает' },
            },
            additionalProperties: false,
          },
          attachTo: choice(ATTACH_TO, 'Только у брелков: на что сделана'),
          maker: choice(MAKERS, 'Кто сплёл'),
          privateNote: { type: 'string', description: 'Для себя, на сайт не попадает' },
          size: {},
          materials: {
            type: 'object',
            description: 'Материалы штуки. На сайте — материалы последней штуки в наличии',
            properties: {
              colorsPublic: choiceWithHints({
                yes: 'можно публиковать',
                no: 'нельзя: секрет автора купленной схемы — на сайте пояснение вместо цветов',
                replaced: 'можно: подбор автора платный, но бисер заменён своим',
              }, 'Можно ли публиковать цвета бисера'),
              beads: {
                type: 'object',
                description: 'Бисер: тип → коды цветов, тип ключом: "miyuki-delica-11/0": [877, "PF557"]. Цвета неизвестны — []. Новый тип — в BEAD_TYPES (scripts/data-rules.mjs)',
                properties: Object.fromEntries(Object.entries(BEADS).map(([key, { name }]) => [key, { ...colors, description: name }])),
                additionalProperties: false,
              },
              additionalBeads: {
                type: 'object',
                description: 'Бусины: тип → цвета из списка, ключами: "unbranded-bicones": ["black"]. Цвета неизвестны — []. Типы — ADDITIONAL_BEAD_TYPES, цвета — ADDITIONAL_BEAD_COLORS (scripts/data-rules.mjs)',
                properties: Object.fromEntries(Object.entries(ADDITIONAL_BEADS).map(([key, { name }]) => [key, { ...additionalBeadColors(), description: name }])),
                additionalProperties: false,
              },
              threads: {
                type: 'object',
                description: 'Нитки: тип → цвета, ключами: "fireline": ["black-satin"], "fgb": ["#02"]. Неизвестны — []. Новый тип — в THREAD_TYPES (scripts/data-rules.mjs)',
                properties: Object.fromEntries(Object.entries(THREADS).map(([key, { name, colors: list }]) => [key, { description: name, type: 'array', items: { enum: Object.keys(list) } }])),
                additionalProperties: false,
              },
            },
            additionalProperties: false,
          },
        },
        additionalProperties: false,
      },
    },
  };
}

export function familySchema(slugs) {
  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Семейство bunnybearbeads',
    description: 'Подсказки для редактора. Сгенерировано npm run fill-data из scripts/data-rules.mjs — не править руками',
    type: 'object',
    properties: {
      $schema: { type: 'string' },
      title: text('Название семейства'),
      members: {
        type: 'array',
        description: 'Изделия семейства, от двух',
        items: {
          type: 'object',
          properties: {
            product: choice(slugs, 'slug изделия'),
            publicNote: text('Чем отличается от остальных, выводится под плашкой'),
          },
          additionalProperties: false,
        },
      },
    },
    additionalProperties: false,
  };
}

/** Содержимое файлов схем базы: путь от корня базы → текст */
export function schemaFiles(dataDir) {
  const json = (data) => `${JSON.stringify(data, null, 2)}\n`;
  return {
    [PRODUCT_SCHEMA_FILE]: json(productSchema()),
    [FAMILY_SCHEMA_FILE]: json(familySchema(productSlugs(dataDir))),
  };
}
