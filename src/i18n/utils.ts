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
