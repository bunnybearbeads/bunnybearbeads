import { siteSettings } from '../../config/siteSettings';

export type MessengerKey = 'messenger' | 'telegram' | 'zalo';

export interface Messenger {
  id: MessengerKey;
  name: string;
  modalId: string;
  url: string;
  icon: string;
  qrImage: string;
  username: string;
}

/** https://m.me/bunnybearbeads → m.me/bunnybearbeads */
const toAddress = (url: string) => url.replace(/^https?:\/\//, '');

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
    url: siteSettings.contacts.zaloUrl,
    icon: '/images/messengers/zalo.svg',
    qrImage: '/images/qr/zalo.svg',
    username: toAddress(siteSettings.contacts.zaloUrl),
  },
];
