import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import MainLayout from './components/Layout/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import LangSync from './components/LangSync';
import { SUPPORTED_LANGS, getDomainDefaultLang } from './i18n/langRouting';
const HomePage = lazy(() => import('./pages/HomePage'));
const CorporatePage = lazy(() => import('./pages/CorporatePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceCategoryPage = lazy(() => import('./pages/ServiceCategoryPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const BlackBoxPage = lazy(() => import('./pages/BlackBoxPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/* Loading fallback */
const LoadingFallback = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
        }}
    >
        <Spin size="large" />
    </div>
);

/* Pages available under every supported language */
const PAGES = [
    { path: '', Component: HomePage },
    { path: 'corporate', Component: CorporatePage },
    { path: 'services', Component: ServicesPage },
    { path: 'services/category/:categoryKey', Component: ServiceCategoryPage },
    { path: 'services/:slug', Component: ServiceDetailPage },
    { path: 'products', Component: ProductsPage },
    { path: 'blackbox', Component: BlackBoxPage },
    { path: 'careers', Component: CareersPage },
    { path: 'contact', Component: ContactPage },
    { path: 'privacy', Component: PrivacyPolicyPage },
];

function App() {
    /* Which language sits at the unprefixed path depends on the serving domain
       (aquatic.com.tr -> tr, aquatic.kz -> kk) — see getDomainDefaultLang(). */
    const domainDefaultLang = getDomainDefaultLang();
    return (
        <Suspense fallback={<LoadingFallback />}>
            <ScrollToTop />
            <LangSync />
            <MainLayout>
                <Routes>
                    {SUPPORTED_LANGS.filter((lang) => lang !== domainDefaultLang).flatMap((lang) =>
                        PAGES.map(({ path, Component }) => (
                            <Route
                                key={`${lang}/${path}`}
                                path={`/${lang}${path ? `/${path}` : ''}`}
                                element={<Component />}
                            />
                        ))
                    )}
                    {PAGES.map(({ path, Component }) => (
                        <Route key={path || 'home'} path={`/${path}`} element={<Component />} />
                    ))}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </MainLayout>
        </Suspense>
    );
}

export default App;
