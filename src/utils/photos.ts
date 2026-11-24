/**
 * Фото, сжатые экспортом (scripts/photos.mjs): `${base}-${ширина}.avif` и `.jpg`.
 * AVIF — основной формат, JPEG — запасной для браузеров без AVIF.
 */
import type { ProductData } from './products';

export type Photo = NonNullable<ProductData['thumb']>;
export type PhotoFormat = 'avif' | 'jpg';

/** Файл нужной ширины: ближайший не меньше, а если такого нет — самый большой */
export function photoUrl(photo: Photo, width: number, format: PhotoFormat): string {
  const best = photo.widths.find((w) => w >= width) ?? photo.widths[photo.widths.length - 1];
  return `${photo.base}-${best}.${format}`;
}

/** srcset всех размеров (не больше maxWidth) — браузер сам выберет по sizes и плотности экрана */
export function photoSrcset(photo: Photo, format: PhotoFormat, maxWidth = Infinity): string {
  const widths = photo.widths.filter((w) => w <= maxWidth);
  return (widths.length ? widths : [photo.widths[0]]).map((w) => `${photo.base}-${w}.${format} ${w}w`).join(', ');
}

/** Самый большой размер — для лайтбокса: оба формата и реальные пиксели (PhotoSwipe не увеличивает больше них) */
export function photoLarge(photo: Photo) {
  const width = photo.widths[photo.widths.length - 1];
  return {
    avif: `${photo.base}-${width}.avif`,
    jpg: `${photo.base}-${width}.jpg`,
    width,
    height: Math.round((width * photo.height) / photo.width),
  };
}
