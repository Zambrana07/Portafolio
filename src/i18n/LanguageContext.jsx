import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STRINGS } from './strings';

const STORAGE_KEY = 'lang';
const LANGUAGES = ['es', 'en'];

const readStoredLanguage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.includes(stored) ? stored : 'es';
  } catch {
    return 'es';
  }
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(readStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Private browsing can block storage; the choice just won't persist.
    }
  }, [lang]);

  const toggle = useCallback(() => setLang(current => (current === 'es' ? 'en' : 'es')), []);
  const value = useMemo(() => ({ lang, toggle, t: STRINGS[lang] }), [lang, toggle]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

const isLocalized = value =>
  value !== null && typeof value === 'object' && !Array.isArray(value) && 'es' in value && 'en' in value;

export const localize = (value, lang) => {
  if (Array.isArray(value)) return value.map(item => localize(item, lang));
  if (isLocalized(value)) return value[lang];
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, lang)]));
  }
  return value;
};
