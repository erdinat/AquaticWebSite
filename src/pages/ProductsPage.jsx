import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BackgroundParticles from '../components/BackgroundParticles';
import { Row, Col, Card } from 'antd';
import { DownOutlined, UpOutlined, CheckCircleOutlined } from '@ant-design/icons';
import imgHero from '../assets/images/products.webp';
import './ProductsPage.css';

/* Product Images */
import imgCamera from '../assets/images/products/camera.webp';
import imgLight from '../assets/images/products/light.webp';
import imgMonitor from '../assets/images/products/monitor.webp';
import imgHarness from '../assets/images/products/harness.webp';
import imgPortableUnit from '../assets/images/products/portable-unit.webp';
import imgPressureVessel from '../assets/images/products/pressure-vessel.webp';

/* Technical spec values per product (language-independent) */
const productSpecValues = {
    camera: {
        resolution: '4K UHD',
        sensor: 'Sony CMOS',
        depth: '6000m',
        interface: 'RS-232 / Ethernet',
        housing: 'Titanium',
    },
    light: {
        depth: '4000m',
        lumen: '15,000 lm',
        power: '100W',
        colorTemp: '5600K',
        housing: 'Anodized Aluminum',
    },
    monitor: {
        size: '21.5" IPS',
        brightness: '1500 nit',
        protection: 'IP65',
        input: 'HDMI / DVI / VGA',
        temp: '-20°C / +60°C',
    },
    harness: {
        depth: '6000m',
        conductors: '48',
        standard: 'MIL-STD-1678',
        material: 'Polyurethane / Neoprene',
        temp: '-20°C / +70°C',
    },
    portableUnit: {
        display: '10" Sunlight-readable',
        battery: '4–8 hours',
        protection: 'IP67',
        interface: 'Ethernet / USB / RS-232',
        weight: '< 8 kg',
    },
    pressureVessel: {
        depth: '6000m',
        material: '6061-T6 Al / Titanium',
        sealing: 'Double O-ring',
        standard: 'MIL-S-901D',
        maxTemp: '+80°C',
    },
};

const ProductsPage = () => {
    const { t } = useTranslation();
    const [expandedProduct, setExpandedProduct] = useState(null);

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
        { id: 'pressureVessel', image: imgPressureVessel },
    ];

    const toggleExpand = (id) => {
        setExpandedProduct((prev) => (prev === id ? null : id));
    };

    return (
        <div className="products-page">
            {/* Page Hero */}
            <section className="page-hero">
                <div className="page-hero-bg" />
                <BackgroundParticles count={15} />
                <div className="page-hero-overlay" style={{ backgroundImage: `url(${imgHero})` }} />
                <div className="page-hero-glow" />
                <div className="container page-hero-content">
                    <h1 className="page-hero-title animate-fadeInUp">{t('products.title')}</h1>
                    <p className="page-hero-subtitle animate-fadeInUp delay-1">{t('products.subtitle')}</p>
                </div>
                <div className="page-hero-wave" />
            </section>

            {/* Product Grid */}
            <section className="section products-section">
                <div className="container">
                    <Row gutter={[32, 32]}>
                        {products.map((product, index) => {
                            const isExpanded = expandedProduct === product.id;
                            const specValues = productSpecValues[product.id];

                            return (
                                <Col xs={24} sm={12} md={8} key={product.id}>
                                    <div className="reveal" style={{ height: '100%' }}>
                                    <Card
                                        hoverable
                                        className={`product-card${isExpanded ? ' product-card--expanded' : ''}`}
                                        cover={
                                            <div className="product-image-wrapper">
                                                <img
                                                    alt={t(`products.items.${product.id}.title`)}
                                                    src={product.image}
                                                />
                                            </div>
                                        }
                                    >
                                        <h3 className="product-title">{t(`products.items.${product.id}.title`)}</h3>
                                        <p className="product-desc">{t(`products.items.${product.id}.desc`)}</p>

                                        <button
                                            className="harness-toggle-btn"
                                            onClick={() => toggleExpand(product.id)}
                                            aria-expanded={isExpanded}
                                        >
                                            {isExpanded
                                                ? t(`products.items.${product.id}.viewLess`)
                                                : t(`products.items.${product.id}.viewMore`)}
                                            {isExpanded ? <UpOutlined /> : <DownOutlined />}
                                        </button>

                                        {isExpanded && (
                                            <div className="harness-detail-panel">
                                                <h4 className="harness-detail-title">
                                                    {t(`products.items.${product.id}.expandTitle`)}
                                                </h4>

                                                <ul className="harness-subcategory-list">
                                                    {t(`products.items.${product.id}.subcategories`, { returnObjects: true }).map((sub, i) => (
                                                        <li key={i} className="harness-subcategory-item">
                                                            <CheckCircleOutlined className="harness-check-icon" />
                                                            {sub}
                                                        </li>
                                                    ))}
                                                </ul>

                                                <h5 className="harness-specs-title">
                                                    {t(`products.items.${product.id}.specsTitle`)}
                                                </h5>
                                                <table className="harness-specs-table">
                                                    <tbody>
                                                        {Object.entries(specValues).map(([key, value]) => (
                                                            <tr key={key}>
                                                                <td className="harness-spec-label">
                                                                    {t(`products.items.${product.id}.specs.${key}`)}
                                                                </td>
                                                                <td className="harness-spec-value">{value}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </Card>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;
