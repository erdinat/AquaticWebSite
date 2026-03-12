import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Card } from 'antd';
import './ProductsPage.css';

/* Product Images */
import imgCamera from '../assets/images/products/camera.jpg';
import imgLight from '../assets/images/products/light.jpg';
import imgMonitor from '../assets/images/products/monitor.jpg';
import imgHarness from '../assets/images/products/harness.jpeg';
import imgPortableUnit from '../assets/images/products/portable-unit.jpg';
import imgPressureVessel from '../assets/images/products/pressure-vessel.png';

const ProductsPage = () => {
    const { t } = useTranslation();

    /* Scroll reveal animations */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const products = [
        { id: 'camera', image: imgCamera },
        { id: 'light', image: imgLight },
        { id: 'monitor', image: imgMonitor },
        { id: 'harness', image: imgHarness },
        { id: 'portableUnit', image: imgPortableUnit },
        { id: 'pressureVessel', image: imgPressureVessel }
    ];

    return (
        <div className="products-page">
            {/* Page Hero */}
            <section className="page-hero">
                <div className="page-hero-bg" />
                <div className="container page-hero-content">
                    <h1 className="page-hero-title animate-fadeInUp">{t('products.title')}</h1>
                    <p className="page-hero-subtitle animate-fadeInUp delay-1">{t('products.subtitle')}</p>
                </div>
            </section>

            {/* Product Grid */}
            <section className="section products-section">
                <div className="container">
                    <Row gutter={[32, 32]}>
                        {products.map((product, index) => (
                            <Col xs={24} sm={12} md={8} key={product.id}>
                                <Card
                                    hoverable
                                    className="product-card reveal"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    cover={
                                        <div className="product-image-wrapper">
                                            <img alt={t(`products.items.${product.id}.title`)} src={product.image} />
                                        </div>
                                    }
                                >
                                    <h3 className="product-title">{t(`products.items.${product.id}.title`)}</h3>
                                    <p className="product-desc">{t(`products.items.${product.id}.desc`)}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;
