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
  if (lang === 'en') {
    return {
      today: `Today before ${formatTime12(closeHour)}`,
      morning: `Today ${formatTime12(openHour)} – ${formatTime12(closeHour)}`,
      tomorrow: `Tomorrow ${formatTime12(openHour)} – ${formatTime12(closeHour)}`,
    };
  }
  if (lang === 'vi') {
    return {
      today: `Hôm nay trước ${formatTime24(closeHour)}`,
      morning: `Hôm nay ${formatTime24(openHour)} – ${formatTime24(closeHour)}`,
      tomorrow: `Ngày mai ${formatTime24(openHour)} – ${formatTime24(closeHour)}`,
    };
  }
  // ru
  return {
    today: `Сегодня до\u00A0${formatTime24(closeHour)}`,
    morning: `Сегодня с\u00A0${formatTime24(openHour)} до\u00A0${formatTime24(closeHour)}`,
    tomorrow: `Завтра с\u00A0${formatTime24(openHour)} до\u00A0${formatTime24(closeHour)}`,
  };
}

export function getPickupScheduleText(lang: 'ru' | 'en' | 'vi') {
  const { openHour, closeHour } = siteSettings.studio;
  if (lang === 'en') {
    return {
      today: `Today before ${formatTime12(closeHour)}`,
      morning: `Today ${formatTime12(openHour)} – ${formatTime12(closeHour)}`,
      tomorrow: `Tomorrow ${formatTime12(openHour)} – ${formatTime12(closeHour)}`,
    };
  }
  if (lang === 'vi') {
    return {
      today: `Hôm nay trước ${formatTime24(closeHour)}`,
      morning: `Hôm nay ${formatTime24(openHour)} – ${formatTime24(closeHour)}`,
      tomorrow: `Ngày mai ${formatTime24(openHour)} – ${formatTime24(closeHour)}`,
    };
  }
  // ru
  return {
    today: `Сегодня до\u00A0${formatTime24(closeHour)}`,
    morning: `Сегодня с\u00A0${formatTime24(openHour)} до\u00A0${formatTime24(closeHour)}`,
    tomorrow: `Завтра с\u00A0${formatTime24(openHour)} до\u00A0${formatTime24(closeHour)}`,
  };
}

export function getPartnerShopHoursText(lang: 'ru' | 'en' | 'vi'): string {
  const { openHour, closeHour } = siteSettings.partnerShops;
  if (lang === 'en') {
    return `Any day ${formatTime12(openHour)} – ${formatTime12(closeHour)}`;
  }
  if (lang === 'vi') {
    return `Mỗi ngày ${formatTime24(openHour)} – ${formatTime24(closeHour)}`;
  }
  // ru
  return `В\u00A0любой день с\u00A0${formatTime24(openHour)} до\u00A0${formatTime24(closeHour)}`;
}

export function getPartnerShopModalHoursText(lang: 'ru' | 'en' | 'vi'): string {
  const { openHour, closeHour } = siteSettings.partnerShops;
  if (lang === 'en') {
    return `Daily from ${formatTime12(openHour)} to ${formatTime12(closeHour)}, no breaks or days off`;
  }
  if (lang === 'vi') {
    return `Từ ${formatTime24(openHour)} đến ${formatTime24(closeHour)} hàng ngày, không nghỉ trưa`;
  }
  // ru
  return `С\u00A0${formatTime24(openHour)} до\u00A0${formatTime24(closeHour)} без\u00A0обеда и\u00A0выходных`;
}

export function getPartnerShopPaymentDetailsText(lang: 'ru' | 'en' | 'vi'): string {
  if (lang === 'en') {
    return 'Payment via cash, VietQR, and international cards';
  }
  if (lang === 'vi') {
    return 'Thanh toán tiền mặt, VietQR và thẻ quốc tế';
  }
  // ru
  return 'Оплата наличными, VietQR и\u00A0международными картами';
}

export function getPaymentSuffixText(lang: 'ru' | 'en' | 'vi') {
  if (lang === 'en') {
    return {
      receipt: 'on delivery',
      pickup: 'in person',
      checkout: 'at checkout',
    };
  }
  if (lang === 'vi') {
    return {
      receipt: 'khi nhận',
      pickup: 'tại chỗ',
      checkout: 'tại quầy',
    };
  }
  // ru
  return {
    receipt: 'при\u00A0получении',
    pickup: 'на\u00A0месте',
    checkout: 'на\u00A0кассе',
  };
}

export function getPaymentNotesText(lang: 'ru' | 'en' | 'vi') {
  if (lang === 'en') {
    return {
      delivery: 'Payment on delivery: cash or QR to courier',
      courier: 'Payment on delivery: cash or QR to courier',
      pickup: 'Cash or QR',
      shop: 'Payment at checkout: cash, QR, or international card',
    };
  }
  if (lang === 'vi') {
    return {
      delivery: 'Thanh toán khi nhận: tiền mặt hoặc QR cho shipper',
      courier: 'Thanh toán khi nhận: tiền mặt hoặc QR cho shipper',
      pickup: 'Tiền mặt hoặc QR',
      shop: 'Thanh toán tại quầy: tiền mặt, QR hoặc thẻ quốc tế',
    };
  }
  // ru
  return {
    delivery: 'Оплата при получении: наличными или QR курьеру',
    courier: 'Оплата при получении: наличными или QR курьеру',
    pickup: 'Наличными или QR',
    shop: 'Оплата на кассе: наличными, QR или международной картой',
  };
}

export function getDeliveryVietnamSubnote(lang: 'ru' | 'en' | 'vi', isRemake: boolean): string {
  const { vietnamShippingDays } = siteSettings.fulfillment;
  if (lang === 'en') {
    return isRemake
      ? `${vietnamShippingDays}\u00A0days upon completion`
      : `${vietnamShippingDays}\u00A0days`;
  }
  if (lang === 'vi') {
    return isRemake
      ? `${vietnamShippingDays}\u00A0ngày sau khi hoàn thành`
      : `${vietnamShippingDays}\u00A0ngày`;
  }
  // ru
  return isRemake
    ? `${vietnamShippingDays}\u00A0дня после\u00A0плетения`
    : `${vietnamShippingDays}\u00A0дня`;
}

export function getRemakeStockPillText(lang: 'ru' | 'en' | 'vi') {
  const { remakeDays } = siteSettings.fulfillment;
  if (lang === 'en') {
    return {
      label: 'Out of stock',
      suffix: `·\u00A0Remake in ${remakeDays}\u00A0days`,
    };
  }
  if (lang === 'vi') {
    return {
      label: 'Tạm hết hàng',
      suffix: `·\u00A0Nhận làm trong ${remakeDays}\u00A0ngày`,
    };
  }
  // ru
  return {
    label: 'Нет в наличии',
    suffix: `·\u00A0Сплету повтор за\u00A0${remakeDays}\u00A0дня`,
  };
}
