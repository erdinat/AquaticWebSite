import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGS, DEFAULT_LANG, canonicalUrl } from '../../i18n/langRouting';

const SITE_NAME = 'Aquatic';
const DEFAULT_DESCRIPTION =
    'Savunma sanayiinden denizciliğe, elektronikten makine mühendisliğine kadar yenilikçi mühendislik çözümleri.';
/* Primary/registered company domain — used only for org identity (JSON-LD) and
   the default OG image, NOT for canonical/hreflang. Those are per-language and
   cross-domain-aware (aquatic.kz for kk, aquatic.com.tr for tr/en/ru) via
   canonicalUrl(), since both domains serve the same build. */
const BASE_URL = 'https://aquatic.com.tr';

/* hreflang codes used in <link>/sitemap — 'kk' below is the ISO code for Kazakh */
const HREFLANG_BY_LANG = { tr: 'tr', en: 'en', ru: 'ru', kk: 'kk', zh: 'zh' };

/**
 * PageSEO
 * Reusable SEO component for dynamic title, meta description,
 * Open Graph, hrefLang and JSON-LD tags per page.
 *
 * @param {string} titleKey        - i18n key for the page title  (e.g. 'nav.corporate')
 * @param {string} descriptionKey  - i18n key for the meta description
 * @param {string} path            - bare (unprefixed) URL path (e.g. '/corporate')
 * @param {string} ogImage         - Absolute URL for Open Graph image
 * @param {boolean} noindex        - set true to emit robots noindex,nofollow (e.g. 404 page)
 */
const PageSEO = ({
    titleKey,
    descriptionKey,
    path = '/',
    ogImage = `${BASE_URL}/og-default.jpg`,
    noindex = false,
}) => {
    const { t, i18n } = useTranslation();

    const pageTitle = titleKey
        ? `${t(titleKey)} | ${SITE_NAME}`
        : `${SITE_NAME} — Teknolojik Gözünüz | Sualtı ve Savunma Teknolojileri`;

    const description = descriptionKey ? t(descriptionKey) : DEFAULT_DESCRIPTION;
    const canonical = canonicalUrl(i18n.language, path);

    const organizationJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Aquatic Elektronik Makina Otomasyon Sav. San. Tic. Ltd. Şti.',
        url: BASE_URL,
        logo: `${BASE_URL}/favicon.svg`,
        email: 'bilgi@aquatic.com.tr',
        telephone: '+90 262 412 24 42',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Merkez Mah. 39. Sok. Donanma İş Merkezi Blok No:2/39',
            addressLocality: 'Gölcük/Kocaeli',
            addressCountry: 'TR',
        },
    };

    return (
        <Helmet>
            {/* Primary */}
            <html lang={i18n.language} />
            <title>{pageTitle}</title>
            <meta name="description" content={description} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            <link rel="canonical" href={canonical} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Hreflang – multi-language, points each language at its home domain
                (aquatic.kz for kk, aquatic.com.tr for tr/en/ru) */}
            {SUPPORTED_LANGS.map((lang) => (
                <link
                    key={lang}
                    rel="alternate"
                    hrefLang={HREFLANG_BY_LANG[lang]}
                    href={canonicalUrl(lang, path)}
                />
            ))}
            <link rel="alternate" hrefLang="x-default" href={canonicalUrl(DEFAULT_LANG, path)} />

            {/* Organization structured data */}
            <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        </Helmet>
    );
};

export default PageSEO;
