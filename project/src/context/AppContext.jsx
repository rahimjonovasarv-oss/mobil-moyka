import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { translations, LANGUAGES } from '../services/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('mm_lang') || 'uz');
  const [theme, setTheme] = useState(() => localStorage.getItem('mm_theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('mm_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('mm_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const t = translations[lang] || translations.uz;
  const changeLang = useCallback((newLang) => setLang(newLang), []);
  const toggleTheme = useCallback(() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')), []);

  const value = { lang, changeLang, theme, toggleTheme, t, languages: LANGUAGES };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
