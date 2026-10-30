/**
 * Global Site Settings & Operational Schedule
 *
 * Central configuration file for BunnyBearBeads.
 * Edit working hours, delivery defaults, and store settings here.
 * Changes here automatically propagate to localized strings and client-side cutoff logic.
 */

export interface ScheduleConfig {
  /** Timezone for cutoff calculations (e.g. 'Asia/Ho_Chi_Minh') */
  timezone: string;
  /** Opening hour in 24h format (e.g. 10 for 10:00) */
  openHour: number;
  /** Cutoff hour for same-day delivery/pickup (e.g. 19 for 19:00 - orders after this move to tomorrow) */
  cutoffHour: number;
  /** Closing hour in 24h format (e.g. 20 for 20:00) */
  closeHour: number;
}

export interface PartnerShopsConfig {
  /** Opening hour in 24h format (e.g. 8 for 8:00) */
  openHour: number;
  /** Closing hour in 24h format (e.g. 20 for 20:00) */
  closeHour: number;
  /** Global date when offline partner showcases were last audited (YYYY-MM-DD) */
  lastCheckedAt: string;
}

export interface FulfillmentConfig {
  /** Days needed to craft a custom remake */
  remakeDays: string;
  /** Vietnam express delivery timeframe */
  vietnamShippingDays: string;
}

export interface SiteSettings {
  /** Da Lat Workshop (Studio pickup & local courier) */
  studio: ScheduleConfig;
  /** Partner offline craft shops (NGÀY MAI in Da Nang, Cat Food in HCMC) */
  partnerShops: PartnerShopsConfig;
  /** Default fulfillment timeframes */
  fulfillment: FulfillmentConfig;
  /** Primary contact links */
  contacts: {
    telegramUrl: string;
    telegramHandle: string;
    whatsappUrl: string;
    zaloUrl: string;
  };
}

export const siteSettings: SiteSettings = {
  // Da Lat Workshop schedule
  // Courier dispatch & studio pickup hours
  studio: {
    timezone: 'Asia/Ho_Chi_Minh',
    openHour: 10,   // 10:00 AM
    cutoffHour: 19, // 7:00 PM (19:00 cutoff — 1 hour needed for prep & dispatch)
    closeHour: 20,  // 8:00 PM (end of delivery/pickup window)
  },

  // Partner craft showcases (NGÀY MAI, Cat Food)
  partnerShops: {
    openHour: 8,   // 8:00 AM
    closeHour: 20, // 8:00 PM
    lastCheckedAt: '2026-10-04',
  },

  // Fulfillment defaults
  fulfillment: {
    remakeDays: '2‑4',
    vietnamShippingDays: '1‑3',
  },

  // Contact points
  contacts: {
    telegramUrl: 'https://t.me/bunnybearbeads',
    telegramHandle: '@bunnybearbeads',
    whatsappUrl: 'https://wa.me/message/bunnybearbeads',
    zaloUrl: 'https://zalo.me/bunnybearbeads',
  },
};

/* ====================================================================
   Helper formatters (automatically compute strings based on hours)
   ==================================================================== */

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function formatTime24(hour: number): string {
  return `${hour}:00`;
}

export function formatTime12(hour: number): string {
  const period = hour >= 12 ? 'pm' : 'am';
  const h = hour % 12 || 12;
  return `${h}${period}`;
}

export function getCourierScheduleText(lang: 'ru' | 'en' | 'vi') {
  const { openHour, closeHour } = siteSettings.studio;
  const schedule = {
    today: {
      en: `Today before ${formatTime12(closeHour)}`,
      ru: `Сегодня до\u00A0${formatTime24(closeHour)}`,
      vi: `Hôm nay trước ${formatTime24(closeHour)}`,
    },
    morning: {
      en: `Today ${formatTime12(openHour)} – ${formatTime12(closeHour)}`,
      ru: `Сегодня с\u00A0${formatTime24(openHour)} до\u00A0${formatTime24(closeHour)}`,
      vi: `Hôm nay ${formatTime24(openHour)} – ${formatTime24(closeHour)}`,
    },
    tomorrow: {
      en: `Tomorrow ${formatTime12(openHour)} – ${formatTime12(closeHour)}`,
      ru: `Завтра с\u00A0${formatTime24(openHour)} до\u00A0${formatTime24(closeHour)}`,
      vi: `Ngày mai ${formatTime24(openHour)} – ${formatTime24(closeHour)}`,
    },
  };
  return {
    today: schedule.today[lang],
    morning: schedule.morning[lang],
    tomorrow: schedule.tomorrow[lang],
  };
}

export function getPickupScheduleText(lang: 'ru' | 'en' | 'vi') {
  const { openHour, closeHour } = siteSettings.studio;
  const schedule = {
    today: {
      en: `Today before ${formatTime12(closeHour)}`,
      ru: `Сегодня до\u00A0${formatTime24(closeHour)}`,
      vi: `Hôm nay trước ${formatTime24(closeHour)}`,
    },
    morning: {
      en: `Today ${formatTime12(openHour)} – ${formatTime12(closeHour)}`,
      ru: `Сегодня с\u00A0${formatTime24(openHour)} до\u00A0${formatTime24(closeHour)}`,
      vi: `Hôm nay ${formatTime24(openHour)} – ${formatTime24(closeHour)}`,
    },
    tomorrow: {
      en: `Tomorrow ${formatTime12(openHour)} – ${formatTime12(closeHour)}`,
      ru: `Завтра с\u00A0${formatTime24(openHour)} до\u00A0${formatTime24(closeHour)}`,
      vi: `Ngày mai ${formatTime24(openHour)} – ${formatTime24(closeHour)}`,
    },
  };
  return {
    today: schedule.today[lang],
    morning: schedule.morning[lang],
    tomorrow: schedule.tomorrow[lang],
  };
}

export function getPartnerShopHoursText(lang: 'ru' | 'en' | 'vi'): string {
  const { openHour, closeHour } = siteSettings.partnerShops;
  const text = {
    en: `Any day ${formatTime12(openHour)} – ${formatTime12(closeHour)}`,
    ru: `В\u00A0любой день с\u00A0${formatTime24(openHour)} до\u00A0${formatTime24(closeHour)}`,
    vi: `Mỗi ngày ${formatTime24(openHour)} – ${formatTime24(closeHour)}`,
  };
  return text[lang];
}

export function getPartnerShopModalHoursText(lang: 'ru' | 'en' | 'vi'): string {
  const { openHour, closeHour } = siteSettings.partnerShops;
  const text = {
    en: `Daily from ${formatTime12(openHour)} to ${formatTime12(closeHour)}, no breaks or days off`,
    ru: `С\u00A0${formatTime24(openHour)} до\u00A0${formatTime24(closeHour)} без\u00A0обеда и\u00A0выходных`,
    vi: `Từ ${formatTime24(openHour)} đến ${formatTime24(closeHour)} hàng ngày, không nghỉ trưa`,
  };
  return text[lang];
}

export function getPartnerShopPaymentDetailsText(lang: 'ru' | 'en' | 'vi'): string {
  const text = {
    en: 'Payment via cash, VietQR, and international cards',
    ru: 'Оплата наличными, VietQR и\u00A0международными картами',
    vi: 'Thanh toán tiền mặt, VietQR và thẻ quốc tế',
  };
  return text[lang];
}

export function getPaymentSuffixText(lang: 'ru' | 'en' | 'vi') {
  const suffix = {
    receipt: {
      en: 'on delivery',
      ru: 'при\u00A0получении',
      vi: 'khi nhận',
    },
    pickup: {
      en: 'in person',
      ru: 'на\u00A0месте',
      vi: 'tại chỗ',
    },
    checkout: {
      en: 'at checkout',
      ru: 'на\u00A0кассе',
      vi: 'tại quầy',
    },
  };
  return {
    receipt: suffix.receipt[lang],
    pickup: suffix.pickup[lang],
    checkout: suffix.checkout[lang],
  };
}

export function getPaymentNotesText(lang: 'ru' | 'en' | 'vi') {
  const notes = {
    delivery: {
      en: 'Payment on delivery: cash or QR to courier',
      ru: 'Оплата при получении: наличными или QR курьеру',
      vi: 'Thanh toán khi nhận: tiền mặt hoặc QR cho shipper',
    },
    courier: {
      en: 'Payment on delivery: cash or QR to courier',
      ru: 'Оплата при получении: наличными или QR курьеру',
      vi: 'Thanh toán khi nhận: tiền mặt hoặc QR cho shipper',
    },
    pickup: {
      en: 'Cash or QR',
      ru: 'Наличными или QR',
      vi: 'Tiền mặt или QR',
    },
    shop: {
      en: 'Payment at checkout: cash, QR, or international card',
      ru: 'Оплата на кассе: наличными, QR или международной картой',
      vi: 'Thanh toán tại quầy: tiền mặt, QR hoặc thẻ quốc tế',
    },
  };
  return {
    delivery: notes.delivery[lang],
    courier: notes.courier[lang],
    pickup: notes.pickup[lang],
    shop: notes.shop[lang],
  };
}

export function getDeliveryVietnamSubnote(lang: 'ru' | 'en' | 'vi', isRemake: boolean): string {
  const { vietnamShippingDays } = siteSettings.fulfillment;
  if (isRemake) {
    const text = {
      en: `${vietnamShippingDays}\u00A0days upon completion`,
      ru: `${vietnamShippingDays}\u00A0дня после\u00A0плетения`,
      vi: `${vietnamShippingDays}\u00A0ngày sau khi hoàn thành`,
    };
    return text[lang];
  }
  const text = {
    en: `${vietnamShippingDays}\u00A0days`,
    ru: `${vietnamShippingDays}\u00A0дня`,
    vi: `${vietnamShippingDays}\u00A0ngày`,
  };
  return text[lang];
}

export function getRemakeStockPillText(lang: 'ru' | 'en' | 'vi') {
  const { remakeDays } = siteSettings.fulfillment;
  const pill = {
    label: {
      en: 'Out of stock',
      ru: 'Нет в наличии',
      vi: 'Tạm hết hàng',
    },
    suffix: {
      en: `·\u00A0Remake in ${remakeDays}\u00A0days`,
      ru: `·\u00A0Сплету повтор за\u00A0${remakeDays}\u00A0дня`,
      vi: `·\u00A0Nhận làm trong ${remakeDays}\u00A0ngày`,
    },
  };
  return {
    label: pill.label[lang],
    suffix: pill.suffix[lang],
  };
}
