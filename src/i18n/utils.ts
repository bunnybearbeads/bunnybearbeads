import { ui, defaultLang, languages, type SupportedLanguage, type TranslationKey } from './ui';

export { languages, defaultLang, type SupportedLanguage, type TranslationKey };

export const SUPPORTED_LANGUAGES = Object.keys(languages) as SupportedLanguage[];
export type SupportedLang = SupportedLanguage;
export const DEFAULT_LANG: SupportedLanguage = defaultLang;

export interface LocalizedString {
  en: string;
  ru: string;
  vi: string;
}

export function getStaticLangPaths() {
  return SUPPORTED_LANGUAGES.map((lang) => ({
    params: { lang: lang === defaultLang ? undefined : lang },
  }));
}

export function resolveLang(langParam?: string): SupportedLanguage {
  if (langParam && langParam in languages) {
    return langParam as SupportedLanguage;
  }
  return defaultLang;
}

export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as SupportedLanguage;
  return defaultLang;
}

export function stripLangFromPath(pathname: string): string {
  let cleanPath = pathname;
  for (const lang of SUPPORTED_LANGUAGES) {
    if (lang === defaultLang) continue;
    if (cleanPath === `/${lang}` || cleanPath.startsWith(`/${lang}/`)) {
      cleanPath = cleanPath.slice(lang.length + 1) || '/';
      break;
    }
  }
  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
}

export function useTranslations(lang: SupportedLanguage) {
  return function t(key: TranslationKey): string {
    return ui[lang]?.[key] || ui[defaultLang][key] || key;
  };
}

export function getLocalizedUrl(path: string, targetLang: SupportedLanguage = defaultLang): string {
  const cleanPath = stripLangFromPath(path);
  if (targetLang === defaultLang) {
    return cleanPath;
  }
  return cleanPath === '/' ? `/${targetLang}` : `/${targetLang}${cleanPath}`;
}

export function useTranslatedPath(currentLang: SupportedLanguage) {
  return function translatePath(path: string, targetLang: SupportedLanguage = currentLang): string {
    return getLocalizedUrl(path, targetLang);
  };
}

/**
 * Recursively unwraps { en: ..., ru: ..., vi: ... } structures
 * into flat values for the given locale.
 */
export function localize<T>(obj: T, lang: SupportedLanguage = defaultLang): any {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    const isLocalizable =
      'en' in (obj as any) &&
      'ru' in (obj as any) &&
      'vi' in (obj as any) &&
      keys.length <= 4;

    if (isLocalizable) {
      const record = obj as unknown as Record<string, any>;
      return record[lang] ?? record[defaultLang] ?? Object.values(record)[0];
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => localize(item, lang));
    }

    const result: Record<string, any> = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = localize(v, lang);
    }
    return result;
  }

  return obj;
}

/**
 * Formats an ISO date string (e.g. "2026-10-04") into a localized relative audit string
 * (e.g. "проверено 5 дней назад", "checked 5 days ago", "kiểm tra 5 ngày trước").
 */
export function formatAuditRelativeDate(
  dateStr?: string,
  lang: SupportedLanguage = defaultLang,
  now: Date = new Date()
): string {
  if (!dateStr) return '';
  try {
    const target = new Date(`${dateStr}T00:00:00Z`);
    if (isNaN(target.getTime())) return dateStr;

    const utcNow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const utcTarget = Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate());
    const diffDays = Math.round((utcTarget - utcNow) / (1000 * 60 * 60 * 24));

    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'always' });
    const relativePart =
      diffDays >= 0
        ? lang === 'ru'
          ? 'сегодня'
          : lang === 'vi'
            ? 'hôm\u00A0nay'
            : 'today'
        : rtf.format(diffDays, 'day').replace(/\s+/g, '\u00A0');

    if (lang === 'ru') return `проверено\u00A0${relativePart}`;
    if (lang === 'vi') return `kiểm\u00A0tra\u00A0${relativePart}`;
    return `checked\u00A0${relativePart}`;
  } catch {
    return dateStr;
  }
}

/**
 * Formats an ISO date string (e.g. "2026-10-04") into a calendar audit title
 * (e.g. "Наличие в NGÀY MAI на 4 октября", "Stock at NGÀY MAI as of October 4", "Tình trạng tại NGÀY MAI ngày 4 tháng 10").
 */
export function formatAuditCalendarDate(
  dateStr?: string,
  lang: SupportedLanguage = defaultLang,
  shopName?: string
): string {
  if (!dateStr) {
    if (lang === 'ru') return shopName ? `Наличие в\u00A0${shopName} на\u00A0витрине` : 'Наличие на\u00A0витрине';
    if (lang === 'vi') return shopName ? `Tình trạng tại\u00A0${shopName}` : 'Tình trạng tại\u00A0quầy';
    return shopName ? `Stock at\u00A0${shopName}` : 'Showcase availability';
  }
  try {
    const target = new Date(`${dateStr}T00:00:00Z`);
    if (isNaN(target.getTime())) return dateStr;

    const locale = lang === 'ru' ? 'ru-RU' : lang === 'vi' ? 'vi-VN' : 'en-US';
    const dateFormatted = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    }).format(target).replace(/\s+/g, '\u00A0');

    if (lang === 'ru') {
      return shopName
        ? `Наличие в\u00A0${shopName} на\u00A0${dateFormatted}`
        : `Наличие на\u00A0${dateFormatted}`;
    }
    if (lang === 'vi') {
      return shopName
        ? `Tình trạng tại\u00A0${shopName} ngày\u00A0${dateFormatted}`
        : `Tình trạng ngày\u00A0${dateFormatted}`;
    }
    return shopName
      ? `Stock at\u00A0${shopName} as of\u00A0${dateFormatted}`
      : `Stock as of\u00A0${dateFormatted}`;
  } catch {
    return dateStr;
  }
}

/**
 * Formats an ISO date string into purely the relative time part without prefixes
 * (e.g. "22 дня назад", "22 days ago", "22 ngày trước").
 */
export function formatAuditRelativeOnly(
  dateStr?: string,
  lang: SupportedLanguage = defaultLang,
  now: Date = new Date()
): string {
  if (!dateStr) return '';
  try {
    const target = new Date(`${dateStr}T00:00:00Z`);
    if (isNaN(target.getTime())) return dateStr;

    const utcNow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const utcTarget = Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate());
    const diffDays = Math.round((utcTarget - utcNow) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      if (lang === 'ru') return 'сегодня';
      if (lang === 'vi') return 'hôm\u00A0nay';
      return 'today';
    }

    if (diffDays === -1) {
      if (lang === 'ru') return 'вчера';
      if (lang === 'vi') return 'hôm\u00A0qua';
      return 'yesterday';
    }

    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'always' });
    return rtf.format(diffDays, 'day').replace(/\s+/g, '\u00A0');
  } catch {
    return dateStr;
  }
}

