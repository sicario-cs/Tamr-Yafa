import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import ar from './locales/ar/translation.json';

const STORAGE_KEY = 'tamrYafaLanguage';

// Detect initial language: localStorage -> browser language -> English
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ar') {
      return stored;
    }
    const browserLang = window.navigator.language || window.navigator.userLanguage;
    if (browserLang?.toLowerCase().startsWith('ar')) {
      return 'ar';
    }
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Persist language changes
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, lng);
  }
});

export default i18n;

