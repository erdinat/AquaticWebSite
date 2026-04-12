import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SITE_NAME = 'Aquatic';
const DEFAULT_DESCRIPTION =
    'Savunma sanayiinden denizciliğe, elektronikten makine mühendisliğine kadar yenilikçi mühendislik çözümleri.';
const BASE_URL = 'https://aquaticdefense.com'; // gerçek domain ile değiştirilebilir

/**
 * PageSEO
 * Reusable SEO component for dynamic title, meta description,
 * Open Graph and hrefLang tags per page.
 *
 * @param {string} titleKey        - i18n key for the page title  (e.g. 'nav.corporate')
 * @param {string} descriptionKey  - i18n key for the meta description
 * @param {string} path            - URL path (e.g. '/corporate')
 * @param {string} ogImage         - Absolute URL for Open Graph image
 */
const PageSEO = ({
    titleKey,
    descriptionKey,
    path = '/',
    ogImage = `${BASE_URL}/og-default.jpg`,
}) => {
    const { t, i18n } = useTranslation();

    const pageTitle = titleKey
        ? `${t(titleKey)} | ${SITE_NAME}`
        : `${SITE_NAME} — Teknolojik Gözünüz | Sualtı ve Savunma Teknolojileri`;

    const description = descriptionKey ? t(descriptionKey) : DEFAULT_DESCRIPTION;
    const canonical = `${BASE_URL}${path}`;

    return (
        <Helmet>
            {/* Primary */}
            <html lang={i18n.language} />
            <title>{pageTitle}</title>
            <meta name="description" content={description} />
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

            {/* Hreflang – multi-language */}
            <link rel="alternate" hrefLang="tr" href={`${BASE_URL}/tr${path}`} />
            <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en${path}`} />
            <link rel="alternate" hrefLang="ru" href={`${BASE_URL}/ru${path}`} />
            <link rel="alternate" hrefLang="kk" href={`${BASE_URL}/kk${path}`} />
            <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${path}`} />
        </Helmet>
    );
};

export default PageSEO;
