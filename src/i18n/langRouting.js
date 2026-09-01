/* ===== URL-based language routing helpers =====
 * TR is the default/canonical language on aquatic.com.tr and has no URL prefix there.
 * EN/RU/KK are served under /en, /ru, /kk prefixes on aquatic.com.tr.
 * aquatic.kz is the second, Kazakh-market domain: on that host KK is unprefixed
 * instead, and TR/EN/RU move under prefixes (see getDomainDefaultLang below).
 * The URL (combined with the current hostname) is the single source of truth
 * for the active language (see LangSync).
 */
export const SUPPORTED_LANGS = ['tr', 'en', 'ru', 'kk', 'zh'];
export const DEFAULT_LANG = 'tr';

/** Each language's canonical "home" domain, used for SEO (canonical/hreflang) —
 * independent of which domain actually served the current request, since both
 * domains deploy the exact same build. */
export const LANG_DOMAINS = {
    tr: 'https://aquatic.com.tr',
    en: 'https://aquatic.com.tr',
    ru: 'https://aquatic.com.tr',
    kk: 'https://aquatic.kz',
    zh: 'https://aquatic.com.tr',
};

function defaultLangForHostname(hostname) {
    if (hostname && hostname.endsWith('.kz')) return 'kk';
    return DEFAULT_LANG;
}

/** The language shown at an unprefixed path on the domain currently serving the page. */
export function getDomainDefaultLang() {
    if (typeof window === 'undefined') return DEFAULT_LANG;
    return defaultLangForHostname(window.location.hostname);
}

/** True when the current page is served from the Kazakhstan domain — used to
 * gate the .kz-only service-category reshuffle (see src/data/serviceGroups.jsx)
 * that must never affect aquatic.com.tr. */
export function isKzDomain() {
    if (typeof window === 'undefined') return false;
    return window.location.hostname.endsWith('.kz');
}

/** Split a pathname into { lang, barePath }. barePath never carries a lang prefix. */
export function splitLangFromPath(pathname) {
    const domainDefault = getDomainDefaultLang();
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length && SUPPORTED_LANGS.includes(parts[0]) && parts[0] !== domainDefault) {
        const barePath = '/' + parts.slice(1).join('/');
        return { lang: parts[0], barePath };
    }
    return { lang: domainDefault, barePath: pathname || '/' };
}

/** Build the localized URL path for a given language + bare (unprefixed) path,
 * relative to the domain currently serving the page. */
export function localizePath(lang, barePath) {
    const domainDefault = getDomainDefaultLang();
    const clean = barePath === '/' ? '' : barePath;
    return lang === domainDefault ? clean || '/' : `/${lang}${clean}`;
}

/** Absolute, cross-domain-correct URL for a language + bare path — always
 * resolves to that language's home domain (see LANG_DOMAINS), using that
 * domain's own prefix rule, regardless of which domain is currently serving
 * the page. Used for canonical/hreflang tags so SEO always points at the
 * authoritative domain per language. */
export function canonicalUrl(lang, barePath) {
    const base = LANG_DOMAINS[lang] || LANG_DOMAINS[DEFAULT_LANG];
    const home = defaultLangForHostname(base.replace(/^https?:\/\//, ''));
    const clean = barePath === '/' ? '' : barePath;
    const path = lang === home ? clean || '/' : `/${lang}${clean}`;
    return `${base}${path}`;
}
