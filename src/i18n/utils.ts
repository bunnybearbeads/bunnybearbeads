import { ui, defaultLang, type SupportedLanguage, type TranslationKey } from './ui';

export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as SupportedLanguage;
  return defaultLang;
}

export function useTranslations(lang: SupportedLanguage) {
  return function t(key: TranslationKey): string {
    return ui[lang]?.[key] || ui[defaultLang][key] || key;
  };
}

export function useTranslatedPath(currentLang: SupportedLanguage) {
  return function translatePath(path: string, targetLang: SupportedLanguage = currentLang): string {
    // Clean path of any existing language prefix
    let cleanPath = path;
    if (cleanPath.startsWith('/ru/') || cleanPath === '/ru') {
      cleanPath = cleanPath.replace(/^\/ru/, '') || '/';
    } else if (cleanPath.startsWith('/vi/') || cleanPath === '/vi') {
      cleanPath = cleanPath.replace(/^\/vi/, '') || '/';
    }

    if (!cleanPath.startsWith('/')) {
      cleanPath = `/${cleanPath}`;
    }

    if (targetLang === defaultLang) {
      return cleanPath;
    }

    if (cleanPath === '/') {
      return `/${targetLang}`;
    }

    return `/${targetLang}${cleanPath}`;
  };
}
