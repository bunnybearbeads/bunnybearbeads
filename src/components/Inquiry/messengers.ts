import { siteSettings } from '../../config/siteSettings';
import { encodePhone } from '../../utils/contacts';

export type MessengerKey = 'messenger' | 'telegram' | 'zalo';

export interface Messenger {
  id: MessengerKey;
  name: string;
  modalId: string;
  url: string;
  icon: string;
  qrImage: string;
  /** Текст ссылки в QR-модалке. Без него — «Открыть {name}» */
  username?: string;
  /** Закодированный номер: настоящую ссылку собирает utils/contacts.ts */
  zaloCode?: string;
}

/** https://m.me/bunnybearbeads → m.me/bunnybearbeads */
const toAddress = (url: string) => url.replace(/^https?:\/\//, '');

/**
 * Номер Zalo берём из переменной окружения ZALO_PHONE (.env локально, секрет в GitHub Actions),
 * чтобы он не лежал в коде текстом. Формат: 84 + номер без первого нуля (0912 345 678 → 84912345678).
 * Без переменной подставляется заведомо несуществующий номер. Импортировать только на сервере.
 */
const zaloPhone = (import.meta.env.ZALO_PHONE || '84000000000')
  .replace(/\D/g, '')
  .replace(/^0/, '84');

export const messengers: Messenger[] = [
  {
    id: 'telegram',
    name: 'Telegram',
    modalId: 'qr-modal-telegram',
    url: siteSettings.contacts.telegramUrl,
    icon: '/images/messengers/telegram.svg',
    qrImage: '/images/qr/telegram.svg',
    username: toAddress(siteSettings.contacts.telegramUrl),
  },
  {
    id: 'messenger',
    name: 'Messenger',
    modalId: 'qr-modal-messenger',
    url: siteSettings.contacts.messengerUrl,
    icon: '/images/messengers/messenger.svg',
    qrImage: '/images/qr/messenger.svg',
    username: toAddress(siteSettings.contacts.messengerUrl),
  },
  {
    id: 'zalo',
    name: 'Zalo',
    modalId: 'qr-modal-zalo',
    url: 'https://zalo.me/',
    icon: '/images/messengers/zalo.svg',
    qrImage: '/images/qr/zalo.svg',
    zaloCode: encodePhone(zaloPhone),
  },
];
