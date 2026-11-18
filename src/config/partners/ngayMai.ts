/**
 * Категории товаров в учётной системе NGÀY MAI. Магазин определяет категорию
 * по цене, поэтому в данных товара её не храним — вычисляем здесь.
 * Ключ — цена в донгах, значение — код категории у партнёра.
 */
export const NGAY_MAI_CATEGORY_BY_PRICE: Readonly<Record<number, string>> = {
  75000: 'PA07',
  100000: 'PA08',
  125000: 'PA11',
  150000: 'PA13',
  175000: 'PA12',
  200000: 'PA09',
  250000: 'PA10',
  300000: 'PA14',
  350000: 'PA01',
  400000: 'PA02',
  450000: 'PA03',
  500000: 'PA04',
  600000: 'PA05',
  700000: 'PA06',
};

/** Категория NGÀY MAI для цены. Нет такой цены в таблице — undefined */
export function getNgayMaiCategory(price: number): string | undefined {
  return NGAY_MAI_CATEGORY_BY_PRICE[price];
}
