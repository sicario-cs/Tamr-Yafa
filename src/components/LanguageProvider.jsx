import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const HTML_LANG_KEY = 'tamrYafaLanguage';

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const updateDocumentDirection = (lng) => {
      if (typeof document === 'undefined') return;
      const html = document.documentElement;
      html.lang = lng === 'ar' ? 'ar' : 'en';
      html.dir = lng === 'ar' ? 'rtl' : 'ltr';
    };

    // Initial sync
    updateDocumentDirection(i18n.language);

    const handleChange = (lng) => {
      updateDocumentDirection(lng);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(HTML_LANG_KEY, lng);
      }
    };

    i18n.on('languageChanged', handleChange);

    return () => {
      i18n.off('languageChanged', handleChange);
    };
  }, [i18n]);

  return <>{children}</>;
}

