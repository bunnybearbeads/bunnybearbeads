/**
 * Фото, сжатые экспортом (scripts/photos.mjs): `${base}-${ширина}.jpg`, две копии —
 * small (180×240) и large (1080×1440), обе под Retina с сильным сжатием.
 */
import type { ProductData } from './products';

export type Photo = NonNullable<ProductData['thumb']>;
/** small — миниатюры галереи и фото к комментариям; large — всё остальное */
export type PhotoSize = 'small' | 'large';

export function photoUrl(photo: Photo, size: PhotoSize): string {
  const width = size === 'small' ? photo.widths[0] : photo.widths[photo.widths.length - 1];
  return `${photo.base}-${width}.jpg`;
}

/** Большая копия для лайтбокса: файл и его реальные пиксели */
export function photoLarge(photo: Photo) {
  const width = photo.widths[photo.widths.length - 1];
  return {
    src: photoUrl(photo, 'large'),
    width,
    height: Math.round((width * photo.height) / photo.width),
  };
}
