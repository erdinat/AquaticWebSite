import React, { useEffect, useRef } from 'react';
import BackgroundParticles from '../components/BackgroundParticles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Card } from 'antd';
import {
    RocketOutlined,
    ThunderboltOutlined,
    ToolOutlined,
    CompassOutlined,
    ArrowRightOutlined,
    TeamOutlined,
    GlobalOutlined,
    ProjectOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import './HomePage.css';

/* Real images from aquatic.com.tr */
import imgDefence from '../assets/images/savunmasanayi.png';
import imgElectronics from '../assets/images/elektrik.png';
import imgMachinery from '../assets/images/makina.png';
import imgMaritime from '../assets/images/denizcilik.png';
import imgHeroBg from '../assets/images/anasayfa.png';
import brandAslan from '../assets/images/brands/aslan-cimento.jpg';
import brandBilgem from '../assets/images/brands/bilgem.jpg';
import brandDalgakiran from '../assets/images/brands/dalgakiran.jpg';
import brandEms from '../assets/images/brands/ems.png';
import brandErve from '../assets/images/brands/erve.png';
import brandGolcuk from '../assets/images/brands/golcuk-belediye.jpg';
import brandTrc from '../assets/images/brands/trc.jpg';
import brandTubitak from '../assets/images/brands/tubitak-sage.jpg';
import prodCamera from '../assets/images/products/camera.jpg';
import prodHarness from '../assets/images/products/harness.jpeg';
import prodLight from '../assets/images/products/light.jpg';
import prodMonitor from '../assets/images/products/monitor.jpg';
import prodPortableUnit from '../assets/images/products/portable-unit.jpg';
import prodPortableUnit2 from '../assets/images/products/portable-unit2.jpg';
import prodPressureVessel from '../assets/images/products/pressure-vessel.png';

/* Brand Images */

import brandRef1 from '../assets/images/brands/ref1.jpg';
import brandRef3 from '../assets/images/brands/ref3.jpg';
import brandRef4 from '../assets/images/brands/ref4.jpg';
import brandRef5 from '../assets/images/brands/ref5.jpg';
import brandRef7 from '../assets/images/brands/ref7.jpg';

const HomePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const statsRef = useRef(null);

    /* Intersection observer for animations */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    /* Services preview data */
    const services = [
        {
            key: 'defence',
            icon: <RocketOutlined />,
            title: t('servicesPreview.defence.title'),
            desc: t('servicesPreview.defence.desc'),
            color: '#0050b3',
            image: imgDefence,
        },
        {
            key: 'electronics',
            icon: <ThunderboltOutlined />,
            title: t('servicesPreview.electronics.title'),
            desc: t('servicesPreview.electronics.desc'),
            color: '#00b4d8',
            image: imgElectronics,
        },
        {
            key: 'machinery',
            icon: <ToolOutlined />,
            title: t('servicesPreview.machinery.title'),
            desc: t('servicesPreview.machinery.desc'),
            color: '#0077b6',
            image: imgMachinery,
        },
        {
            key: 'maritime',
            icon: <CompassOutlined />,
            title: t('servicesPreview.maritime.title'),
            desc: t('servicesPreview.maritime.desc'),
            color: '#003a8c',
            image: imgMaritime,
        },
    ];

    /* Stats data */
    const stats = [
        { icon: <CalendarOutlined />, value: '6+', label: t('stats.experience') },
        { icon: <ProjectOutlined />, value: '150+', label: t('stats.projects') },
        { icon: <TeamOutlined />, value: '50+', label: t('stats.clients') },
        { icon: <GlobalOutlined />, value: '5+', label: t('stats.countries') },
    ];

    /* Brands / references */
    const brands = [
        { id: 1, name: 'Aslan Çimento', image: brandAslan },
        { id: 2, name: 'BİLGEM', image: brandBilgem },
        { id: 3, name: 'Dalgakıran', image: brandDalgakiran },
        { id: 4, name: 'EMS', image: brandEms },
        { id: 5, name: 'ERVE', image: brandErve },
        { id: 6, name: 'Gölcük Belediyesi', image: brandGolcuk },
        { id: 7, name: 'TRC', image: brandTrc },
        { id: 8, name: 'TÜBİTAK SAGE', image: brandTubitak },
    ];

    /* Popular products (static demo data) */
    const products = [
        {
            id: 1,
            name: 'Basınç Kabı',
            category: 'Pressure Vessel',
            price: '₺2.450.000',
            description: 'Yüksek basınca dayanıklı, sertifikalı basınç kabı tasarım ve üretimi.',
            image: prodPressureVessel,
        },
        {
            id: 2,
            name: 'Taşınabilir Ünite',
            category: 'Portable Unit',
            price: '₺1.150.000',
            description: 'Saha operasyonları için kompakt, dayanıklı taşınabilir güç ve kontrol ünitesi.',
            image: prodPortableUnit,
        },
        {
            id: 3,
            name: 'Taşınabilir Ünite 2',
            category: 'Portable Unit',
            price: '₺1.280.000',
            description: 'Geliştirilmiş bağlantı ve izleme özelliklerine sahip ikinci nesil taşınabilir ünite.',
            image: prodPortableUnit2,
        },
        {
            id: 4,
            name: 'Sualtı Kamerası',
            category: 'Camera',
            price: '₺620.000',
            description: 'Derin su operasyonları için yüksek çözünürlüklü, sualtı kamera sistemi.',
            image: prodCamera,
        },
        {
            id: 5,
            name: 'Sualtı Aydınlatma Ünitesi',
            category: 'Light',
            price: '₺185.000',
            description: 'Düşük güç tüketimli, yüksek parlaklıkta sualtı LED aydınlatma çözümü.',
            image: prodLight,
        },
        {
            id: 6,
            name: 'Kontrol Monitörü',
            category: 'Monitor',
            price: '₺145.000',
            description: 'Sualtı sistemleri ve ROV kontrolleri için endüstriyel monitör.',
            image: prodMonitor,
        },
        {
            id: 7,
            name: 'Emniyet Kemer Sistemi',
            category: 'Harness',
            price: '₺95.000',
            description: 'Sualtı operatörleri için ergonomik ve güvenli emniyet kemer takımı.',
            image: prodHarness,
        },
    ];

    /* Brands Data (duplicated for infinite scroll effect) */
    const brandImages = [
        brandAslan, brandBilgem, brandDalgakiran, brandEms, brandErve,
        brandGolcuk, brandTrc, brandTubitak, brandRef1, brandRef3,
        brandRef4, brandRef5, brandRef7
    ];
    const allBrands = [...brandImages, ...brandImages]; // Duplicate for seamless marquee

    return (
        <div className="home-page">
            {/* ===== HERO SECTION ===== */}
            <section className="hero-section">
                {/* Animated background */}
                <div className="hero-bg">
                    <div className="hero-bg-image" style={{ backgroundImage: `url(${imgHeroBg})` }} />
                    <div className="hero-wave hero-wave-1" />
                    <div className="hero-wave hero-wave-2" />
                    <div className="hero-wave hero-wave-3" />
                    <div className="hero-particles">
                        <BackgroundParticles count={20} />
                    </div>
                </div>

                <div className="hero-content container">
                    <p className="hero-slogan animate-fadeInUp delay-2">
                        {t('hero.slogan')}
                    </p>
                    <p className="hero-subtitle animate-fadeInUp delay-3">
                        {t('hero.subtitle')}
                    </p>
                    <div className="hero-actions animate-fadeInUp delay-4">
                        <Button
                            type="primary"
                            size="large"
                            icon={<ArrowRightOutlined />}
                            onClick={() => navigate('/services')}
                        >
                            {t('hero.cta')}
                        </Button>
                        <Button
                            size="large"
                            ghost
                            onClick={() => navigate('/contact')}
                            style={{
                                borderColor: 'rgba(255,255,255,0.4)',
                                color: '#fff',
                                height: 48,
                                padding: '0 32px',
                                fontSize: 15,
                                fontWeight: 600,
                            }}
                        >
                            {t('hero.ctaContact')}
                        </Button>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="scroll-indicator animate-fadeIn delay-6">
                    <div className="scroll-line" />
                </div>
            </section>

            {/* ===== STATS SECTION ===== */}
            <section className="stats-section" ref={statsRef}>
                <div className="container">
                    <Row gutter={[24, 24]} justify="center">
                        {stats.map((stat, index) => (
                            <Col xs={12} sm={12} md={6} key={index}>
                                <div className={`stat-card reveal`} style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="stat-icon">{stat.icon}</div>
                                    <div className="stat-value">{stat.value}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* ===== SERVICES PREVIEW ===== */}
            <section className="section services-preview-section">
                <div className="container">
                    <h2 className="section-title reveal">{t('servicesPreview.title')}</h2>
                    <p className="section-subtitle reveal">{t('servicesPreview.subtitle')}</p>
                    <Row gutter={[24, 24]}>
                        {services.map((service, index) => (
                            <Col xs={24} sm={12} md={6} key={service.key}>
                                <div
                                    className={`service-preview-card glass-card reveal`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    onClick={() => navigate('/services')}
                                >
                                    <div className="service-card-image">
                                        <img src={service.image} alt={service.title} />
                                    </div>
                                    <div className="service-icon-wrapper" style={{ background: service.color }}>
                                        {service.icon}
                                    </div>
                                    <h3 className="service-preview-title">{service.title}</h3>
                                    <p className="service-preview-desc">{service.desc}</p>
                                    <div className="service-link">
                                        <ArrowRightOutlined />
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* ===== POPULAR PRODUCTS ===== */}
            <section className="section products-section">
                <div className="container">
                    <div className="section-header-split reveal">
                        <div className="header-split-left">
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 8 }}>Popüler Ürünlerimiz</h2>
                            <p className="section-subtitle" style={{ textAlign: 'left', margin: 0, maxWidth: 500 }}>
                                Savunma sanayi, sualtı sistemleri, elektronik ve makine alanlarında en çok talep gören çözümlerimizden bazıları.
                            </p>
                        </div>
                        <div className="header-split-right">
                            <Button type="default" size="large" onClick={() => navigate('/products')} className="view-all-btn">
                                Tümünü İncele <ArrowRightOutlined />
                            </Button>
                        </div>
                    </div>

                    <div className="popular-products-slider reveal">
                        {products.map((product) => (
                            <div key={product.id} className="popular-product-slide">
                                <div className="premium-product-card" onClick={() => navigate('/products')}>
                                    <div className="premium-product-image">
                                        {product.image && <img src={product.image} alt={product.name} />}
                                        <div className="premium-product-badge">Top Seller</div>
                                    </div>
                                    <div className="premium-product-content">
                                        <div className="premium-product-category">{product.category}</div>
                                        <h3 className="premium-product-title">{product.name}</h3>
                                        <p className="premium-product-desc">{product.description}</p>
                                        <div className="premium-product-footer">
                                            <span className="premium-product-price">{product.price}</span>
                                            <div className="premium-product-action">
                                                <ArrowRightOutlined />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== BRANDS / REFERENCES ===== */}
            <section className="section brands-section">
                <div className="container">
                    <h2 className="section-title reveal">Birlikte Çalıştığımız Markalar</h2>
                    <p className="section-subtitle reveal">
                        Savunma sanayi, endüstri ve kamu tarafında güvenilir çözüm ortağı olduğumuz seçili kurumlar.
                    </p>
                    <div className="brands-marquee-container reveal">
                        <div className="brands-marquee">
                            {allBrands.map((brand, index) => (
                                <div key={index} className="brand-logo-wrapper glass-card">
                                    <img src={brand} alt={`Referans ${index}`} className="brand-logo" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="cta-section">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="cta-title reveal">{t('hero.slogan')}</h2>
                    <p className="cta-subtitle reveal">{t('hero.subtitle')}</p>
                    <div className="reveal" style={{ animationDelay: '0.3s' }}>
                        <Button
                            type="primary"
                            size="large"
                            icon={<ArrowRightOutlined />}
                            onClick={() => navigate('/contact')}
                        >
                            {t('hero.ctaContact')}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
