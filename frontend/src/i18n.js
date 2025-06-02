import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // load translations from backend
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // connect with React
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // React already escapes
    },
    backend: {
      loadPath: 'http://localhost:3001/locales/{{lng}}/translation.json'
    }
  });

export default i18n;
