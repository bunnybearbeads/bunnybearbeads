import type { TranslationKey } from '../i18n/ui';

export type LocationId = 'online' | 'dalat' | 'ngay-mai' | 'cat-food';

export interface LocationConfig {
  id: LocationId;
  type: 'online' | 'studio' | 'partner';
  cityKey?: TranslationKey;
  districtKey?: TranslationKey;
  shop?: string;
  modalId?: string;
  mapsUrl?: string;
  photoUrl?: string;
  photoUrls?: string[];
  // Translation keys for partner modal dialogs
  modalContentKey?: TranslationKey;
  modalHoursKey?: TranslationKey;
  modalPaymentKey?: TranslationKey;
  modalMapsKey?: TranslationKey;
}

export const LOCATIONS: Record<LocationId, LocationConfig> = {
  online: {
    id: 'online',
    type: 'online',
  },
  dalat: {
    id: 'dalat',
    type: 'studio',
    cityKey: 'geo.city.dalat',
    districtKey: 'geo.district.lamvien',
  },
  'ngay-mai': {
    id: 'ngay-mai',
    type: 'partner',
    shop: 'NGÀY\u00A0MAI',
    cityKey: 'geo.city.danang',
    districtKey: 'geo.district.myan',
    modalId: 'modal-checkup-ngaymai',
    mapsUrl: 'https://maps.app.goo.gl/RPadZnwnU88RgrTB9',
    photoUrl: '/images/stock/ngay-mai-showcase-1.jpg',
    photoUrls: [
      '/images/stock/ngay-mai-showcase-1.jpg',
      '/images/stock/ngay-mai-showcase-2.jpg',
    ],
    modalContentKey: 'catalog.modal.nm_content',
    modalHoursKey: 'catalog.modal.nm_hours',
    modalPaymentKey: 'catalog.modal.nm_payment',
    modalMapsKey: 'catalog.modal.nm_maps',
  },
  'cat-food': {
    id: 'cat-food',
    type: 'partner',
    shop: 'Cat\u00A0Food',
    cityKey: 'geo.city.hcm',
    districtKey: 'geo.district.benthanh',
    modalId: 'modal-checkup-catfood',
    mapsUrl: 'https://maps.google.com/?q=Cat+Food+Shop+Ben+Thanh+Ho+Chi+Minh+City',
    modalContentKey: 'catalog.modal.catfood_content',
    modalMapsKey: 'catalog.modal.catfood_maps',
  },
};

export const PARTNER_LOCATIONS = Object.values(LOCATIONS).filter(
  (loc): loc is LocationConfig & { modalId: string; shop: string } => loc.type === 'partner'
);

export function getLocation(id?: string): LocationConfig | undefined {
  if (!id) return undefined;
  return LOCATIONS[id as LocationId];
}
