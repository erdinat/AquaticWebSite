import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import MainLayout from './components/Layout/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import CorporatePage from './pages/CorporatePage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import BlackBoxPage from './pages/BlackBoxPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';

/* Loading fallback */
const LoadingFallback = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Spin size="large" />
    </div>
);

function App() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <ScrollToTop />
            <MainLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/corporate" element={<CorporatePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/blackbox" element={<BlackBoxPage />} />
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </MainLayout>
        </Suspense>
    );
}

export default App;
