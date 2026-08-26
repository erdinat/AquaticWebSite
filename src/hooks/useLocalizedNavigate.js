import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { splitLangFromPath, localizePath } from '../i18n/langRouting';

/**
 * Drop-in replacement for react-router's useNavigate() that automatically
 * prefixes bare paths (e.g. '/contact') with the current URL language.
 */
export function useLocalizedNavigate() {
    const navigate = useNavigate();
    const location = useLocation();

    return useCallback(
        (barePath, options) => {
            const { lang } = splitLangFromPath(location.pathname);
            navigate(localizePath(lang, barePath), options);
        },
        [navigate, location.pathname]
    );
}
