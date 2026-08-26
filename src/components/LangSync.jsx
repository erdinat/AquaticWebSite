import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { splitLangFromPath } from '../i18n/langRouting';

/** Keeps i18next in sync with the language encoded in the URL — the URL is the source of truth. */
const LangSync = () => {
    const location = useLocation();
    const { i18n } = useTranslation();

    useEffect(() => {
        const { lang } = splitLangFromPath(location.pathname);
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
            localStorage.setItem('aquatic-lang', lang);
        }
    }, [location.pathname, i18n]);

    return null;
};

export default LangSync;
