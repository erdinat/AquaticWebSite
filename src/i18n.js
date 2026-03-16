/* ===== i18n Configuration ===== */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import tr from './locales/tr.json';
import en from './locales/en.json';
import kk from './locales/kk.json';
import ru from './locales/ru.json';

const resources = {
    tr: { translation: tr },
    en: { translation: en },
    kk: { translation: kk },
    ru: { translation: ru },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('aquatic-lang') || 'kk', // Default to Kazakh
        fallbackLng: 'kk',
        interpolation: {
            escapeValue: false, // React already handles XSS
        },
    });

export default i18n;
