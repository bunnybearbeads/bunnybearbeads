/**
 * Материалы штуки → HTML списка для страницы товара.
 *
 * Бисер:
 * - один цвет — код прямо в названии, без строки цветов: «<b>Miyuki Rocailles 11/0 #426</b> – …»;
 * - несколько — строка «Colors: 201, 658»; цвета неизвестны — ни кода, ни строки;
 * - ровно два бисера — одной строкой. У обоих по одному цвету — коды в названиях:
 *   «<b>6mm Miyuki Bugles #401</b> & <b>Miyuki Rocailles 11/0 #194</b> – …». Хотя бы у одного несколько —
 *   «<b>Miyuki Delica</b> & <b>Toho Aiko</b> – …<br>Delica colors: 2113 · Aiko colors: 41, 42»;
 *   с Toho Aiko приписка у пары премиальная;
 * - три и больше — каждый отдельным пунктом.
 * Названия бисера не переводятся, приписки — из ui.ts.
 *
 * Бусины (после бисера): цвет встроен в название — «Unbranded black bicones»; брендовые — жирным и с припиской
 * («<b>Preciosa crystal bicones</b> – fine Czech crystal»); ровно две — одной строкой через «and».
 * Названия и цвета переводятся.
 *
 * Нитки: каждая отдельным пунктом, жирным и с припиской; один цвет — в названии: «<b>FGB #10</b> – …».
 *
 * Фурнитура: у брелка — крепление, у серёг — строка как есть, у браслета — строка на бренд и металл (braceletItems)
 */
import type { TranslationKey } from '../i18n/ui';
import type { useTranslations } from '../i18n/utils';

export interface Bead {
  name: string;
  /** Название в паре, если цветов несколько: «Miyuki Delica» вместо «Miyuki Delica 11/0» */
  pairName: string;
  /** Подпись цветов в паре: «Delica colors» */
  short: string;
  premium: boolean;
  colors: string[];
}

export interface AdditionalBead {
  /** Ключ перевода: materials.additional_bead.<id>, у брендовых — ещё materials.additional_bead_note.<id> */
  id: string;
  /** Брендовые — жирным и с припиской */
  branded: boolean;
  /** Чья приписка у пары двух брендовых: больше — главнее */
  rank: number;
  /** Цвета из ADDITIONAL_BEAD_COLORS: перевод — materials.color.<цвет> */
  colors: string[];
}

export interface Thread {
  /** Название как на сайте: «FireLine» */
  name: string;
  /** Ключ приписки: materials.thread_note.<id> */
  id: string;
  /** Как на катушке: «Smoke», «#10» */
  colors: string[];
}

export interface BraceletPart {
  /** Деталь: slideTubes, chain… — перевод materials.part.<part> */
  part: string;
  /** Finrusiac, Tarin Thomas, Miyuki или Basic (без бренда — нержавеющая сталь) */
  brand: string;
  /** rhodium, gold18, gold24, stainless — перевод materials.metal.<metal> */
  metal: string;
}

export interface Findings {
  /** Брелок: id крепления — materials.charm_finding.<id> */
  charm?: string;
  /** Серьги: строка как есть */
  text?: string;
  bracelet?: BraceletPart[];
}

export interface Materials {
  beads: Bead[];
  /** Цвета бисера: no — секрет автора схемы (их уже нет, вместо них пояснение), replaced — свой микс вместо секретного */
  colorsPublic?: 'yes' | 'no' | 'replaced';
  additionalBeads: AdditionalBead[];
  threads: Thread[];
  findings?: Findings;
}

type T = ReturnType<typeof useTranslations>;
/** Ключи бусин и цветов собираются из id — в ui.ts они есть, сборка проверяет id по тем же спискам */
const tKey = (t: T, key: string) => t(key as TranslationKey);

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const COLORS_SEP = ' &nbsp;·&nbsp; ';

/** Название с кодом, если цвет один */
const beadTitle = (bead: Bead) => (bead.colors.length === 1 ? `${bead.name} ${bead.colors[0]}` : bead.name);

const beadsNote = (beads: Bead[], t: T) =>
  t(beads.some((bead) => bead.premium) ? 'materials.beads_note_premium' : 'materials.beads_note');

function singleBead(bead: Bead, t: T): string {
  const colors = bead.colors.length > 1 ? `<br>${t('materials.colors')} ${escapeHtml(bead.colors.join(', '))}` : '';
  return `<b>${escapeHtml(beadTitle(bead))}</b> – ${beadsNote([bead], t)}${colors}`;
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** «Цвета {name}:»; не первая в строке — со строчной («· цвета Aiko:»). Если подпись начинается с имени — как есть */
function colorsOf(t: T, notFirst: boolean): string {
  const label = t('materials.colors_of');
  return notFirst && !label.startsWith('{') ? label.charAt(0).toLowerCase() + label.slice(1) : label;
}

/**
 * Пара. У обоих не больше одного цвета — коды в названиях, строки цветов нет. Хотя бы у одного
 * несколько — названия короткие (pairName), а цвета всех — строкой «Delica colors: 2113 · Aiko colors: 41, 42»
 */
function beadPair(pair: Bead[], t: T): string {
  const colorsLine = pair.some((bead) => bead.colors.length > 1);
  const titles = pair
    .map((bead) => `<b>${escapeHtml(colorsLine ? bead.pairName : beadTitle(bead))}</b>`)
    .join(' &amp; ');
  if (!colorsLine) return `${titles} – ${beadsNote(pair, t)}`;
  const colors = pair
    .filter((bead) => bead.colors.length > 0)
    .map((bead, i) => `${colorsOf(t, i > 0).replace('{name}', escapeHtml(bead.short))} ${escapeHtml(bead.colors.join(', '))}`)
    .join(COLORS_SEP);
  return `${titles} – ${beadsNote(pair, t)}${colors ? `<br>${colors}` : ''}`;
}


/**
 * Название бусин: цвет, если он один, встроен в название («unbranded black bicones»), иначе убран.
 * Первое в строке — с заглавной. Брендовые — жирным
 */
function additionalBeadTitle(bead: AdditionalBead, t: T, first: boolean): string {
  const color = bead.colors.length === 1 ? tKey(t, `materials.color.${bead.colors[0]}`) : '';
  const title = tKey(t, `materials.additional_bead.${bead.id}`).replace('{color}', color).replace(/\s+/g, ' ').trim();
  const text = first ? capitalize(title) : title;
  return bead.branded ? `<b>${text}</b>` : text;
}

/** Приписка — у брендовых; у пары — от главного бренда (Swarovski важнее Preciosa) */
function additionalBeadsNote(additionalBeads: AdditionalBead[], t: T): string {
  const main = additionalBeads.filter((bead) => bead.branded).sort((a, b) => b.rank - a.rank)[0];
  return main ? ` – ${tKey(t, `materials.additional_bead_note.${main.id}`)}` : '';
}

function additionalBeadColors(bead: AdditionalBead, t: T): string {
  if (bead.colors.length < 2) return '';
  return `<br>${t('materials.colors')} ${bead.colors.map((color) => tKey(t, `materials.color.${color}`)).join(', ')}`;
}

/**
 * Бусины: каждая отдельным пунктом; ровно две разных — одной строкой через «and»:
 * «Basic pale beads and unbranded crystal bicones». Если у какой-то несколько цветов — по отдельности
 */
function additionalBeadItems(additionalBeads: AdditionalBead[], t: T): string[] {
  if (additionalBeads.length === 2 && additionalBeads.every((bead) => bead.colors.length < 2)) {
    const [a, b] = additionalBeads;
    return [`${additionalBeadTitle(a, t, true)} ${t('materials.and')} ${additionalBeadTitle(b, t, false)}${additionalBeadsNote(additionalBeads, t)}`];
  }
  return additionalBeads.map((bead) => `${additionalBeadTitle(bead, t, true)}${additionalBeadsNote([bead], t)}${additionalBeadColors(bead, t)}`);
}

/**
 * Нитка — каждая отдельным пунктом. Один цвет — в названии: «<b>FireLine Smoke</b> – …», несколько — строкой
 * «Colors: Crystal, Smoke», неизвестен — только название
 */
function threadItem(thread: Thread, t: T): string {
  const title = thread.colors.length === 1 ? `${thread.name} ${thread.colors[0]}` : thread.name;
  const colors = thread.colors.length > 1 ? `<br>${t('materials.colors')} ${escapeHtml(thread.colors.join(', '))}` : '';
  return `<b>${escapeHtml(title)}</b> – ${tKey(t, `materials.thread_note.${thread.id}`)}${colors}`;
}

/** «a, b and c» */
function joinList(items: string[], t: T): string {
  if (items.length < 2) return items.join('');
  return `${items.slice(0, -1).join(', ')} ${t('materials.and')} ${items[items.length - 1]}`;
}

/**
 * Фурнитура браслета — одним предложением, группы «бренд + металл» через «; », детали — через запятую:
 * «Rhodium-plated brass slide tubes and chain from <b>Finrusiac</b>; basic <b>stainless steel</b> lobster clasp».
 * Бренд — жирным, а без бренда жирным — металл. Соединительные колечки — не отдельной группой:
 * дописываются к деталям того же бренда и металла, иначе не выводятся
 */
function braceletItems(parts: BraceletPart[], t: T): string[] {
  const groups = new Map<string, BraceletPart[]>();
  for (const part of parts) {
    const key = `${part.brand}|${part.metal}`;
    if (part.part === 'connectorRings') {
      groups.get(key)?.push(part);
      continue;
    }
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(part);
  }
  const lines = [...groups.values()].map((group) => {
    const [{ brand, metal }] = group;
    const names = joinList(group.map((part) => tKey(t, `materials.part.${part.part}`)), t);
    const metalText = tKey(t, `materials.metal.${metal}`);
    return brand === 'Basic'
      ? t('materials.findings_basic').replace('{parts}', names).replace('{metal}', `<b>${metalText}</b>`)
      : t('materials.findings_branded')
        .replace('{brand}', `<b>${escapeHtml(brand)}</b>`)
        .replace('{parts}', names)
        .replace('{metal}', metalText);
  });
  return lines.length ? [capitalize(lines.join('; '))] : [];
}

function findingsItems(findings: Findings | undefined, t: T): string[] {
  if (!findings) return [];
  if (findings.charm) return [tKey(t, `materials.charm_finding.${findings.charm}`)];
  if (findings.text) return [findings.text];
  return braceletItems(findings.bracelet ?? [], t);
}

/** designer — автор схемы (credits.design): называется в пояснении про платный дизайн */
export function materialsHtml(materials: Materials, t: T, designer = ''): string {
  const { beads, colorsPublic, additionalBeads, threads, findings } = materials;
  const beadItems = beads.length === 2 ? [beadPair(beads, t)] : beads.map((bead) => singleBead(bead, t));
  // Пояснение — строкой под бисером (под последним, если бисер по пунктам)
  const colorsNote = colorsPublic === 'no' ? t('materials.colors_secret').replace('{designer}', escapeHtml(designer)) : colorsPublic === 'replaced' ? t('materials.colors_replaced').replace('{designer}', escapeHtml(designer)) : '';
  if (colorsNote && beadItems.length) beadItems[beadItems.length - 1] += `<span class="materials-html-content__note">${colorsNote}</span>`;
  const items = [
    ...beadItems,
    ...additionalBeadItems(additionalBeads, t),
    ...threads.map((thread) => threadItem(thread, t)),
    ...findingsItems(findings, t),
  ];
  return items.length ? `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>` : '';
}
