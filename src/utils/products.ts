import { getCollection, type CollectionEntry } from 'astro:content';
import type { LocalizedString } from '../i18n/utils';
import type { TranslationKey } from '../i18n/ui';

export type ProductEntry = CollectionEntry<'products'>;
export type ProductData = ProductEntry['data'];
export type CategoryId = ProductData['categoryId'];
export type Stock = ProductData['stock'];
export type Remake = ProductData['remake'];

/** Сколько штук лежит в точке (0, если точки нет) */
export function getLocationQty(stock: Stock, locationId: string): number {
  return stock.find((s) => s.locationId === locationId)?.quantity ?? 0;
}

/** Точки, где товар реально есть (quantity > 0) */
export function getAvailableLocations(stock: Stock): string[] {
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

/** Короткая цена для плашек: 240000 → «240k» */
export function formatPriceShort(price: number): string {
  return `${Number((price / 1000).toFixed(1))}k`;
}

export function categoryKey(categoryId: CategoryId): TranslationKey {
  return `cat.${categoryId.replace(/-/g, '_')}` as TranslationKey;
}

/** Все товары, отсортированные по order */
export async function getProducts(): Promise<ProductEntry[]> {
  const products = await getCollection('products');
  return [...products].sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export interface FamilyMember {
  product: ProductEntry;
  note?: LocalizedString;
}

export interface Family {
  id: string;
  title: LocalizedString;
  members: FamilyMember[];
}

/**
 * Семейство товара, если товар в нём состоит. Падает при сборке, если товар
 * указан в двух семействах или в семействе есть несуществующий товар.
 */
export async function getFamilyOf(productId: string): Promise<Family | undefined> {
  const products = new Map((await getCollection('products')).map((p) => [p.id, p]));
  const families = await getCollection('families');
  const owners = new Map<string, string>();
  let found: Family | undefined;

  for (const family of families) {
    const members = family.data.members.map(({ product, note }) => {
      const entry = products.get(product.id);
      if (!entry) throw new Error(`Family "${family.id}": unknown product "${product.id}"`);
      const owner = owners.get(product.id);
      if (owner) {
        throw new Error(`Product "${product.id}" is in two families: "${owner}" and "${family.id}"`);
      }
      owners.set(product.id, family.id);
      return { product: entry, note };
    });
    if (members.some((m) => m.product.id === productId)) {
      found = { id: family.id, title: family.data.title, members };
    }
  }

  return found;
}
