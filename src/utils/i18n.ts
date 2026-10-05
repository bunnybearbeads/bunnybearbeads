export const SUPPORTED_LANGUAGES = ['en', 'vi', 'ru'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANG: SupportedLang = 'en';

export interface LocalizedString {
  en: string;
  ru: string;
  vi: string;
}

export function getStaticLangPaths() {
  return [
    { params: { lang: undefined } },
    { params: { lang: 'vi' } },
    { params: { lang: 'ru' } },
  ];
}

export function resolveLang(langParam?: string): SupportedLang {
  if (langParam === 'ru') return 'ru';
  if (langParam === 'vi') return 'vi';
  return DEFAULT_LANG;
}

/**
 * Recursively unwraps { en: ..., ru: ..., vi: ... } structures
 * into flat values for the given locale.
 */
export function localize<T>(obj: T, lang: string = DEFAULT_LANG): any {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'object') {
    // Check if this object is a LocalizedString ({ en, ru, vi })
    const keys = Object.keys(obj);
    const isLocalizable =
      'en' in (obj as any) &&
      'ru' in (obj as any) &&
      'vi' in (obj as any) &&
      keys.length <= 4; // allow optional fields or standard keys

    if (isLocalizable) {
      const record = obj as unknown as Record<string, any>;
      return record[lang] ?? record[DEFAULT_LANG] ?? Object.values(record)[0];
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
 * Builds localized internal link
 */
export function getLocalizedUrl(path: string, lang: SupportedLang = DEFAULT_LANG): string {
  let cleanPath = path;
  if (cleanPath.startsWith('/ru/') || cleanPath === '/ru') {
    cleanPath = cleanPath.replace(/^\/ru/, '') || '/';
  } else if (cleanPath.startsWith('/vi/') || cleanPath === '/vi') {
    cleanPath = cleanPath.replace(/^\/vi/, '') || '/';
  }

  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }

  if (lang === DEFAULT_LANG) {
    return cleanPath;
  }

  return cleanPath === '/' ? `/${lang}` : `/${lang}${cleanPath}`;
}
