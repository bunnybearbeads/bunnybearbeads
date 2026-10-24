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
    remakeDays: '2–4',
    vietnamShippingDays: '1–3',
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
  const period = hour >= 12 ? 'PM' : 'AM';
  const h = hour % 12 || 12;
  return `${h}:00 ${period}`;
}

export function getCourierScheduleText(lang: 'ru' | 'en' | 'vi') {
  const { openHour, closeHour } = siteSettings.studio;
  if (lang === 'en') {
    return {
      today: `Free · today before ${formatTime12(closeHour)}`,
      morning: `Free · today ${formatTime12(openHour)} – ${formatTime12(closeHour)}`,
      tomorrow: `Free · tomorrow ${formatTime12(openHour)} – ${formatTime12(closeHour)}`,
    };
  }
  if (lang === 'vi') {
    return {
      today: `Miễn phí · hôm nay trước ${formatTime24(closeHour)}`,
      morning: `Miễn phí · hôm nay ${formatTime24(openHour)} – ${formatTime24(closeHour)}`,
      tomorrow: `Miễn phí · ngày mai ${formatTime24(openHour)} – ${formatTime24(closeHour)}`,
    };
  }
  // ru
  return {
    today: `Бесплатно · сегодня до ${formatTime24(closeHour)}`,
    morning: `Бесплатно · сегодня с ${formatTime24(openHour)} до ${formatTime24(closeHour)}`,
    tomorrow: `Бесплатно · завтра с ${formatTime24(openHour)} до ${formatTime24(closeHour)}`,
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
    today: `Сегодня до ${formatTime24(closeHour)}`,
    morning: `Сегодня с ${formatTime24(openHour)} до ${formatTime24(closeHour)}`,
    tomorrow: `Завтра с ${formatTime24(openHour)} до ${formatTime24(closeHour)}`,
  };
}

export function getPartnerShopHoursText(lang: 'ru' | 'en' | 'vi'): string {
  const { openHour, closeHour } = siteSettings.partnerShops;
  if (lang === 'en') {
    return `${formatTime12(openHour)} – ${formatTime12(closeHour)} daily (no breaks)`;
  }
  if (lang === 'vi') {
    return `${formatTime24(openHour)} – ${formatTime24(closeHour)} hàng ngày (không nghỉ trưa)`;
  }
  // ru
  return `С ${formatTime24(openHour)} до ${formatTime24(closeHour)} без обеда и выходных`;
}

export function getPaymentNotesText(lang: 'ru' | 'en' | 'vi') {
  if (lang === 'en') {
    return {
      delivery: 'Payment on delivery: cash or QR to courier',
      courier: 'Payment on delivery: cash or QR to courier',
      pickup: 'Cash or QR',
      shop: 'Payment at checkout: cash, QR, or international card (+3%)',
    };
  }
  if (lang === 'vi') {
    return {
      delivery: 'Thanh toán khi nhận: tiền mặt hoặc QR cho shipper',
      courier: 'Thanh toán khi nhận: tiền mặt hoặc QR cho shipper',
      pickup: 'Tiền mặt hoặc QR',
      shop: 'Thanh toán tại quầy: tiền mặt, QR hoặc thẻ quốc tế (+3%)',
    };
  }
  // ru
  return {
    delivery: 'Оплата при получении: наличными или QR курьеру',
    courier: 'Оплата при получении: наличными или QR курьеру',
    pickup: 'Наличными или QR',
    shop: 'Оплата на кассе: наличными, QR или международной картой (+3%)',
  };
}

export function getDeliveryVietnamSubnote(lang: 'ru' | 'en' | 'vi', isRemake: boolean): string {
  const { vietnamShippingDays } = siteSettings.fulfillment;
  if (lang === 'en') {
    return isRemake
      ? `Free · ${vietnamShippingDays} days upon completion · From Da Lat`
      : `Free · ${vietnamShippingDays} days · From Da Lat`;
  }
  if (lang === 'vi') {
    return isRemake
      ? `Miễn phí · ${vietnamShippingDays} ngày sau khi hoàn thành · Từ Đà Lạt`
      : `Miễn phí · ${vietnamShippingDays} ngày · Từ Đà Lạt`;
  }
  // ru
  return isRemake
    ? `Бесплатно · ${vietnamShippingDays} дня по окончанию работ · Из Далата`
    : `Бесплатно · ${vietnamShippingDays} дня · Из Далата`;
}

export function getRemakeStockPillText(lang: 'ru' | 'en' | 'vi') {
  const { remakeDays } = siteSettings.fulfillment;
  if (lang === 'en') {
    return {
      label: 'Out of stock',
      suffix: `· Remake in ${remakeDays} days`,
    };
  }
  if (lang === 'vi') {
    return {
      label: 'Tạm hết hàng',
      suffix: `· Làm lại trong ${remakeDays} ngày`,
    };
  }
  // ru
  return {
    label: 'Нет в наличии',
    suffix: `· Сплету повтор за ${remakeDays} дня`,
  };
}
