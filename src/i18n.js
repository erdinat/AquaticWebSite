/* ===== i18n Configuration ===== */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getDomainDefaultLang } from './i18n/langRouting';

import tr from './locales/tr.json';
import en from './locales/en.json';
import kk from './locales/kk.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';

const resources = {
    tr: { translation: tr },
    en: { translation: en },
    kk: { translation: kk },
    ru: { translation: ru },
    zh: { translation: zh },
};

// Initial guess before LangSync corrects it from the URL on mount (see
// LangSync.jsx) — domain-aware so aquatic.kz doesn't flash Turkish first.
const getInitialLanguage = () => {
    const saved = localStorage.getItem('aquatic-lang');
    if (saved) return saved;
    return getDomainDefaultLang();
};

i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'tr',
    interpolation: {
        escapeValue: false, // React already handles XSS
    },
});

export default i18n;
