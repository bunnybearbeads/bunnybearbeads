import type { TranslationKey } from '../i18n/ui';

/**
 * Категории изделий — как в базе (поле `category`): что это за изделие, в единственном числе (кроме `earrings`: серьги — пара).
 * Список должен совпадать с CATEGORIES в scripts/export-data.mjs.
 */
export const CATEGORIES = ['charm', 'bracelet', 'ring', 'earrings', 'pen-wrap'] as const;
export type Category = (typeof CATEGORIES)[number];

/**
 * Разделы каталога на сайте (фильтр, меню, ?category=…). Категорий в базе может быть больше,
 * чем разделов: редкие уходят в «Разное». Наберётся достаточно серёг — дать им свой раздел
 * здесь и в CATEGORY_SECTION, данные трогать не нужно.
 */
export const SECTIONS = ['charm', 'bracelet', 'ring', 'other'] as const;
export type Section = (typeof SECTIONS)[number];

export const CATEGORY_SECTION: Record<Category, Section> = {
  charm: 'charm',
  bracelet: 'bracelet',
  ring: 'ring',
  earrings: 'other',
  'pen-wrap': 'other',
};

/** Название категории или раздела: cat.charm, cat.pen_wrap, cat.other */
export function categoryKey(id: Category | Section): TranslationKey {
  return `cat.${id.replace(/-/g, '_')}` as TranslationKey;
}
