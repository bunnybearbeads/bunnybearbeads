/**
 * Размер и вес изделия → секция страницы товара: заголовок и HTML списка. В базе — один объект `size`,
 * поля по категории (SIZE_FIELDS в scripts/data-rules.mjs): длины в сантиметрах, вес в граммах.
 * Подписи и единицы — из ui.ts, числа — по правилам языка (1,2 см / 1.2 cm).
 *
 * Браслет: ширина, длина, под длиной вложенным пунктом — обхват запястья (считается из длины: браслет на WRIST_EASE длиннее запястья).
 * Брелок: «2,5 × 3 см без учёта крепления». Кольцо: ширина в бисеринах, обхват пальца, размер.
 * Серьги, обмотки: ширина, длина. У всех — вес последней строкой. Чего нет в базе — не выводится
 */
import type { SupportedLanguage, TranslationKey } from '../i18n/ui';
import type { useTranslations } from '../i18n/utils';

export interface Size {
  /** Категория изделия */
  kind: string;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
  beads?: number;
  fingerFrom?: number;
  fingerTo?: number;
  sizeFrom?: number;
  sizeTo?: number;
}

type T = ReturnType<typeof useTranslations>;

/** Браслет длиннее запястья на 10%: обхват запястья = длина / 1.1 */
const WRIST_EASE = 1.1;

/** Обхват запястья для браслета — до 0,5 см */
const wristFrom = (length: number) => Math.round((length / WRIST_EASE) * 2) / 2;

/**
 * Самое важное о размере — строкой в шапке товара, рядом с ценой: у браслета «На запястье от 91 см»,
 * у кольца «Размер кольца 16–17». У остальных — пусто
 */
export function sizeFit(size: Size | undefined, t: T, lang: SupportedLanguage): string {
  if (!size) return '';
  const num = (value: number) => new Intl.NumberFormat(lang, { maximumFractionDigits: 1 }).format(value);
  if (size.kind === 'bracelet' && size.length !== undefined) {
    return t('size.wrist_from').replace('{value}', t('size.cm').replace('{value}', num(wristFrom(size.length))));
  }
  if (size.kind === 'ring' && (size.sizeFrom !== undefined || size.sizeTo !== undefined)) {
    const from = size.sizeFrom ?? size.sizeTo!;
    const to = size.sizeTo ?? from;
    return t('size.ring_fit').replace('{value}', from === to ? num(from) : `${num(from)}–${num(to)}`);
  }
  return '';
}

export function sizeSection(size: Size | undefined, t: T, lang: SupportedLanguage): { heading: string; html: string } {
  if (!size) return { heading: '', html: '' };
  const num = (value: number) => new Intl.NumberFormat(lang, { maximumFractionDigits: 1 }).format(value);
  const cm = (value: number) => t('size.cm').replace('{value}', num(value));
  /** «100–110»; одно значение или оба одинаковые — одно число */
  const range = (from?: number, to?: number) => {
    if (from === undefined) return to === undefined ? undefined : num(to);
    return to === undefined || to === from ? num(from) : `${num(from)}–${num(to)}`;
  };
  const line = (key: TranslationKey, value?: string) => (value === undefined ? undefined : t(key).replace('{value}', value));
  const { kind, width, height, length, weight } = size;

  let items: (string | undefined)[];
  if (kind === 'charm') {
    items = width !== undefined && height !== undefined
      ? [t('size.charm').replace('{width}', num(width)).replace('{height}', cm(height))]
      : [line('size.width', width === undefined ? undefined : cm(width)), line('size.height', height === undefined ? undefined : cm(height))];
  } else if (kind === 'ring') {
    const finger = range(size.fingerFrom, size.fingerTo);
    items = [
      line('size.ring_beads', size.beads === undefined ? undefined : num(size.beads)),
      line('size.ring_finger', finger === undefined ? undefined : t('size.cm').replace('{value}', finger)),
      line('size.ring_size', range(size.sizeFrom, size.sizeTo)),
    ];
  } else {
    // Браслет, серьги, обмотки: ширина и длина; у браслета — ещё обхват запястья (до 0,5 см)
    const wrist = kind === 'bracelet' && length !== undefined ? wristFrom(length) : undefined;
    // Обхват запястья — вложенным списком под длиной
    const lengthLine = line('size.length', length === undefined ? undefined : cm(length));
    const wristLine = line('size.wrist_from', wrist === undefined ? undefined : cm(wrist));
    items = [
      line('size.width', width === undefined ? undefined : cm(width)),
      lengthLine && wristLine ? `${lengthLine}<ul><li>${wristLine}</li></ul>` : lengthLine,
    ];
  }
  const dimensions = items.filter(Boolean) as string[];
  const weightLine = weight === undefined ? [] : [t('size.weight').replace('{value}', t('size.g').replace('{value}', num(weight)))];
  const list = [...dimensions, ...weightLine];
  if (!list.length) return { heading: '', html: '' };
  // Заголовок — смотря что есть: «Размер», «Вес» или «Размер и вес»
  const heading = t(dimensions.length && weight !== undefined ? 'size.heading_both' : dimensions.length ? 'size.heading' : 'size.heading_weight');
  return { heading, html: `<ul>${list.map((item) => `<li>${item}</li>`).join('')}</ul>` };
}
