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
/** Категории изделий, в единственном числе. Должны совпадать с src/config/categories.ts */
export const CATEGORIES = ['charm', 'bracelet', 'ring', 'earrings', 'pen-wrap'];
/** На что носится брелок: у каждой штуки-брелка обязательно, у остальных категорий поля нет */
export const ATTACH_TO = ['keys', 'phone', 'mirror', 'bag'];
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
/** Основные цвета бусин. Перевод — `materials.color.<цвет>` в src/i18n/ui.ts, новый цвет — туда же */
export const ADDITIONAL_BEAD_COLORS = [
  'crystal', 'pale', 'white', 'black', 'red', 'pink', 'orange', 'yellow', 'green', 'light-blue', 'blue', 'purple', 'brown', 'gold', 'silver',
];
/** Поля `materials`. other — временно, пока нитки и фурнитура не разобраны: строки HTML, каждая — пункт списка */
/**
 * Нитки для `items[].materials.threads`: ключ — название, как на сайте (не переводится); id — ключ приписки
 * `materials.thread_note.<id>` в src/i18n/ui.ts. Цвета — как на катушке: "Smoke", "Crystal", "#10"
 */
export const THREAD_TYPES = {
  FireLine: { id: 'fireline' },
  'Miyuki Dura-Line': { id: 'miyuki_dura_line' },
  WildFire: { id: 'wildfire' },
  'Toho One-G': { id: 'toho_one_g' },
  Miyuki: { id: 'miyuki' },
  FGB: { id: 'fgb' },
};
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
/** Металлы фурнитуры браслетов. Перевод — `materials.metal.<id>` в src/i18n/ui.ts */
export const METALS = {
  rhodium: 'rhodium-plated brass',
  gold18: '18K gold-plated brass',
  gold24: '24K gold-plated brass',
  stainless: 'stainless steel',
  zamac: 'zamac',
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
  beadEndings: { Cymbal: ['zamac'] },
  chain: { Finrusiac: PLATED, 'Tarin Thomas': PLATED, ...BASIC },
  adjustableChain: { Finrusiac: PLATED, 'Tarin Thomas': PLATED, ...BASIC },
  lobsterClasp: { Finrusiac: PLATED, 'Tarin Thomas': PLATED, ...BASIC },
  magneticClasp: { Finrusiac: PLATED, 'Tarin Thomas': PLATED, ...BASIC },
  connectorRings: { Finrusiac: PLATED, 'Tarin Thomas': PLATED, ...BASIC },
};
/** Варианты детали, как их пишут в JSON: «Tarin Thomas 18K gold-plated brass», «Basic stainless steel» → { brand, metal } */
export function braceletOptions(part) {
  return Object.fromEntries(
    Object.entries(BRACELET_PARTS[part]).flatMap(([brand, metals]) =>
      metals.map((metal) => [`${brand} ${METALS[metal]}`, { brand, metal }]),
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
export const MATERIAL_FIELDS = ['beads', 'colorsPublic', 'additionalBeads', 'threads', 'findings'];
export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
/** id штуки: 3–4 заглавные буквы (обычно первые согласные названия) и две цифры, PWST01 */
export const ITEM_ID_RE = /^[A-Z]{3,4}\d{2}$/;
/**
 * Дата может быть неполной: точная (2026-11-01), только месяц (2026-11 — например, NGÀY MAI сообщает
 * продажи за месяц без дат), квартал (2026-Q3), полугодие (2026-H1) или только год (2024 — для старых записей)
 */
export const PARTIAL_DATE_RE = /^(\d{4})(?:-(?:(0[1-9]|1[0-2])(?:-(\d{2}))?|Q[1-4]|H[12]))?$/;
export const DATE_FORMATS = '2026-11-01, 2026-11, 2026-Q3, 2026-H1 или 2026';

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
const text = (description) => ({
  description,
  type: 'object',
  properties: { en: { type: 'string' }, ru: { type: 'string' }, vi: { type: 'string' } },
  required: ['en', 'ru', 'vi'],
  additionalProperties: false,
});
const price = (description) => ({ description, anyOf: [{ type: 'integer', minimum: 1 }, empty] });
const date = (description) => ({ description: `${description}. Формат: ${DATE_FORMATS}`, ...pattern(PARTIAL_DATE_RE) });
const html = (description) => ({ description, type: 'array', items: { type: 'string' } });
/** Цвета бусин — из списка ADDITIONAL_BEAD_COLORS */
const additionalBeadColors = () => ({ description: 'Цвета из списка: black, crystal, pale… Неизвестны — []', type: 'array', items: { enum: ADDITIONAL_BEAD_COLORS } });
/** Коды цветов бисера или нити — как на упаковке: 201, "402B", "PF557", "DBS-10", "#426" */
const colors = {
  description: 'Коды цветов как на упаковке: 201, "402B", "PF557", "#426". Неизвестны — []',
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

/** Подсказка для materials.findings по категории изделия */
function findingsSchema(category) {
  if (category === 'charm') return choice(Object.keys(CHARM_FINDINGS), 'Крепление брелка');
  if (category === 'earrings') return { type: 'string', description: 'Фурнитура серёг — строкой текста, как на сайте: «Hypoallergenic stainless steel ear hooks»' };
  if (category === 'bracelet') {
    return {
      type: 'object',
      description: 'Детали браслета: бренд и металл из списка. Нет детали — пусто. Фурнитуры нет совсем — всё пусто',
      properties: Object.fromEntries(Object.keys(BRACELET_PARTS).map((part) => [part, choice(Object.keys(braceletOptions(part)), BRACELET_PART_HINTS[part])])),
      additionalProperties: false,
    };
  }
  return { not: {}, description: 'У этой категории фурнитуры нет — уберите поле' };
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

export function productSchema() {
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
      size: { type: 'string', description: 'Размер — произвольный текст, можно HTML, не переводится' },
      credits: {
        type: 'object',
        description: 'Кто сделал — просто имена, без HTML. craft и design обязательны, остальное — любые пары, на сайте выводятся все по порядку. Если все — bunnybearbeads, секции нет',
        properties: {
          craft: { type: 'string', description: 'Кто сплёл, обязательно. Пока всегда bunnybearbeads' },
          design: { type: 'string', description: 'Автор схемы, обязательно' },
          photo: { type: 'string', description: 'Автор фото, по желанию' },
        },
        additionalProperties: { type: 'string', description: 'Ещё кто-то: ключ — роль (выводится подписью), значение — имя' },
      },
      locationNotes: {
        type: 'object',
        description: 'Комментарий для посетителей к штукам в точке — ключ: точка',
        propertyNames: { enum: LOCATION_ORDER },
        additionalProperties: comment('Комментарий к точке'),
      },
      remake: {
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
      items: { type: 'array', description: 'Физические штуки, ушедшие не удаляются, а получают out', items: { $ref: '#/definitions/item' } },
    },
    additionalProperties: false,
    // Фурнитура у штук — своя для каждой категории
    allOf: CATEGORIES.map((category) => ({
      if: { properties: { category: { const: category } }, required: ['category'] },
      then: { properties: { items: { items: { properties: { materials: { properties: { findings: findingsSchema(category) } } } } } } },
    })),
    definitions: {
      item: {
        type: 'object',
        properties: {
          id: { description: '3–4 заглавные буквы и две цифры: PWST01. Уникален по всей базе', ...pattern(ITEM_ID_RE) },
          price: price('Цена в донгах, число без кавычек: 320000'),
          location: choice(LOCATION_ORDER, 'Где лежит: atelier — своя мастерская, остальные — партнёры'),
          craftedAt: date('Когда сплетена'),
          consignedAt: date('Только у штук у партнёров: когда передана'),
          attachTo: choice(ATTACH_TO, 'Только у брелков: на что сделана'),
          maker: choice(MAKERS, 'Кто сплёл'),
          privateNote: { type: 'string', description: 'Для себя, на сайт не попадает' },
          materials: {
            type: 'object',
            description: 'Материалы штуки. На сайте — материалы последней штуки в наличии',
            properties: {
              beads: {
                type: 'object',
                description: 'Бисер: тип → коды цветов. Цвета неизвестны — []. Новый тип — в BEAD_TYPES (scripts/data-rules.mjs)',
                properties: Object.fromEntries(Object.keys(BEAD_TYPES).map((name) => [name, colors])),
                additionalProperties: false,
              },
              colorsPublic: choice(COLORS_PUBLIC, 'Можно ли публиковать цвета бисера: yes — да; no — нет, секрет автора купленной схемы (на сайте пояснение вместо цветов); replaced — да, оригинальный подбор — часть платной схемы, но бисер заменён своим'),
              additionalBeads: {
                type: 'object',
                description: 'Бусины: тип → цвета из списка. Цвета неизвестны — []. Типы — ADDITIONAL_BEAD_TYPES, цвета — ADDITIONAL_BEAD_COLORS (scripts/data-rules.mjs)',
                properties: Object.fromEntries(Object.keys(ADDITIONAL_BEAD_TYPES).map((name) => [name, additionalBeadColors()])),
                additionalProperties: false,
              },
              threads: {
                type: 'object',
                description: 'Нитки: тип → цвета как на катушке ("Smoke", "#10"). Неизвестны — []. Новый тип — в THREAD_TYPES (scripts/data-rules.mjs)',
                properties: Object.fromEntries(Object.keys(THREAD_TYPES).map((name) => [name, colors])),
                additionalProperties: false,
              },
              findings: { description: 'Фурнитура — зависит от category: у брелка — одно из списка, у серёг — строка, у браслета — детали; у колец и обмоток для ручек поля нет' },
            },
            additionalProperties: false,
          },
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
