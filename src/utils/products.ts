import { getCollection, type CollectionEntry } from 'astro:content';
import type { LocalizedString } from '../i18n/utils';
import type { TranslationKey } from '../i18n/ui';

export type ProductEntry = CollectionEntry<'products'>;
export type ProductData = ProductEntry['data'];
export type VariantData = ProductData['variants'][number];
export type CategoryId = ProductData['categoryId'];

/** Поля, которые вариант может переопределить; иначе берутся из товара */
const INHERITED_FIELDS = [
  'description',
  'price',
  'categoryId',
  'images',
  'materials',
  'materialsHtml',
  'badge',
] as const;

/** Данные варианта с уже подставленными полями товара */
export type ResolvedVariant = Omit<ProductData, 'variants'> &
  Omit<VariantData, (typeof INHERITED_FIELDS)[number]> & {
    productId: string;
    /** Название товара без имени варианта */
    productTitle: LocalizedString;
  };

const LANGS = ['en', 'ru', 'vi'] as const;

function toLocalized(value: string | LocalizedString): LocalizedString {
  return typeof value === 'string' ? { en: value, ru: value, vi: value } : value;
}

/** "Guaco" + "Delicato" → "Guaco Delicato" на всех языках */
function composeTitle(title: LocalizedString, name?: string | LocalizedString): LocalizedString {
  if (!name) return title;
  const n = toLocalized(name);
  return Object.fromEntries(LANGS.map((l) => [l, `${title[l]} ${n[l]}`])) as LocalizedString;
}

export function resolveVariant(product: ProductEntry, variant: VariantData): ResolvedVariant {
  const { variants: _variants, ...base } = product.data;
  const resolved: any = { ...base, ...variant };
  for (const key of INHERITED_FIELDS) {
    resolved[key] = variant[key] ?? base[key];
  }
  resolved.createdAt = variant.createdAt ?? base.createdAt;
  resolved.productId = product.id;
  resolved.productTitle = base.title;
  resolved.title = composeTitle(base.title, variant.name);
  return resolved as ResolvedVariant;
}

/** Первый активный вариант в наличии, иначе первый активный, иначе первый */
export function getDefaultVariant(product: ProductEntry): VariantData {
  const { variants } = product.data;
  const active = variants.filter((v) => v.status === 'active');
  return active.find((v) => v.inStock) ?? active[0] ?? variants[0];
}

/**
 * Варианты, которые показываются покупателю: активные, вариант по умолчанию первым.
 * Если активных нет (товар снят целиком), показываются все — страница не должна пустеть.
 */
export function getVisibleVariants(product: ProductEntry): VariantData[] {
  const { variants } = product.data;
  const active = variants.filter((v) => v.status === 'active');
  const list = active.length ? active : variants;
  const def = getDefaultVariant(product);
  return [def, ...list.filter((v) => v !== def)];
}

type StockLocations = VariantData['stockLocations'];

/** Сколько штук лежит в физической точке (0, если точки нет) */
export function getLocationQty(stock: StockLocations, locationId: string): number {
  return stock.find((s) => s.locationId === locationId)?.quantity ?? 0;
}

/** Точки, где вариант реально есть (quantity > 0) */
export function getAvailableLocations(stock: StockLocations): string[] {
  return stock
    .filter((s) => s.quantity > 0)
    .map((s) => s.locationId);
}

/** Путь к первому изображению (для видео — его постер) */
export function getFirstImageSrc(images: ProductData['images']): string | undefined {
  const first = images[0];
  if (!first) return undefined;
  if (typeof first === 'string') {
    return /\.(mp4|webm|ogg|mov)$/i.test(first) ? first.replace(/\.[^.]+$/, '.jpg') : first;
  }
  if (first.type === 'video' || /\.(mp4|webm|ogg|mov)$/i.test(first.src)) {
    return first.poster ?? first.src.replace(/\.[^.]+$/, '.jpg');
  }
  return first.src;
}

/**
 * Цена в донгах как HTML: 320000 → `320.<small class="price-thousands">000</small>&nbsp;₫`.
 * Последние три цифры во вьетнамских ценах почти всегда нули — уменьшаем их,
 * чтобы взгляд цеплялся за значимую часть. Выводить через set:html / innerHTML.
 */
export function formatPrice(price: number): string {
  const [head, ...groups] = Number(price).toLocaleString('vi-VN').split('.');
  const last = groups.pop();
  const main = [head, ...groups].join('.');
  const number = last === undefined ? main : `${main}.<small class="price-thousands">${last}</small>`;
  return `${number}&nbsp;₫`;
}

export function categoryKey(categoryId: CategoryId): TranslationKey {
  return `cat.${categoryId.replace(/-/g, '_')}` as TranslationKey;
}

function assertUniqueSkus(products: ProductEntry[]) {
  const seen = new Map<string, string>();
  for (const product of products) {
    for (const { sku } of product.data.variants) {
      const owner = seen.get(sku);
      if (owner) {
        throw new Error(`Duplicate SKU "${sku}" in products "${owner}" and "${product.id}"`);
      }
      seen.set(sku, product.id);
    }
  }
}

/** Все товары, отсортированные по order. Падает при сборке, если SKU повторяется */
export async function getProducts(): Promise<ProductEntry[]> {
  const products = await getCollection('products');
  assertUniqueSkus(products);
  return [...products].sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

/** Индекс SKU → вариант с данными товара. Основа для накладных и остатков */
export async function getSkuIndex(): Promise<Map<string, ResolvedVariant>> {
  const index = new Map<string, ResolvedVariant>();
  for (const product of await getProducts()) {
    for (const variant of product.data.variants) {
      index.set(variant.sku, resolveVariant(product, variant));
    }
  }
  return index;
}
