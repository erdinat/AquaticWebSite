import BackgroundParticles from '../components/BackgroundParticles';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import PageSEO from '../components/common/PageSEO';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
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
    TrophyOutlined,
    SafetyCertificateOutlined,
    FileTextOutlined,
    StarOutlined,
    AppstoreOutlined,
    ShoppingOutlined,
    ApartmentOutlined,
} from '@ant-design/icons';
import './HomePage.css';

/* Optimized images */
import imgDefence from '../assets/images/savunmasanayi.webp';
import imgElectronics from '../assets/images/elektrik.webp';
import imgMachinery from '../assets/images/makina.webp';
import imgMaritime from '../assets/images/denizcilik.webp';
import imgHeroBg from '../assets/images/products/main.webp';
import brandAslan from '../assets/images/brands/aslan-cimento.webp';
import brandBilgem from '../assets/images/brands/bilgem.webp';
import brandDalgakiran from '../assets/images/brands/dalgakiran.webp';
import brandEms from '../assets/images/brands/ems.webp';
import brandErve from '../assets/images/brands/erve.webp';
import brandGolcuk from '../assets/images/brands/golcuk-belediye.webp';
import brandTrc from '../assets/images/brands/trc.webp';
import brandTubitak from '../assets/images/brands/tubitak-sage.webp';
import prodCamera from '../assets/images/products/camera.webp';
import prodHarness from '../assets/images/products/harness.webp';
import prodLight from '../assets/images/products/light.webp';
import prodMonitor from '../assets/images/products/monitor.webp';
import prodPortableUnit from '../assets/images/products/portable-unit.webp';
import prodPortableUnit2 from '../assets/images/products/portable-unit2.webp';
import prodPressureVessel from '../assets/images/products/pressure-vessel.webp';

/* Brand Images */

import brandRef1 from '../assets/images/brands/ref1.webp';
import brandRef3 from '../assets/images/brands/ref3.webp';
import brandRef4 from '../assets/images/brands/ref4.webp';
import brandRef5 from '../assets/images/brands/ref5.webp';
import brandRef7 from '../assets/images/brands/ref7.webp';

const HomePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    /* Intersection observer for animations */
    useRevealAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

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

    /* Popular products (static demo data) */
    const products = [
        {
            id: 1,
            name: 'Basınç Kabı',
            category: 'Pressure Vessel',
            description: 'Yüksek basınca dayanıklı, sertifikalı basınç kabı tasarım ve üretimi.',
            image: prodPressureVessel,
        },
        {
            id: 2,
            name: 'Taşınabilir Ünite',
            category: 'Portable Unit',
            description: 'Saha operasyonları için kompakt, dayanıklı taşınabilir güç ve kontrol ünitesi.',
            image: prodPortableUnit,
        },
        {
            id: 3,
            name: 'Taşınabilir Ünite 2',
            category: 'Portable Unit',
            description: 'Geliştirilmiş bağlantı ve izleme özelliklerine sahip ikinci nesil taşınabilir ünite.',
            image: prodPortableUnit2,
        },
        {
            id: 4,
            name: 'Sualtı Kamerası',
            category: 'Camera',
            description: 'Derin su operasyonları için yüksek çözünürlüklü, sualtı kamera sistemi.',
            image: prodCamera,
        },
        {
            id: 5,
            name: 'Sualtı Aydınlatma Ünitesi',
            category: 'Light',
            description: 'Düşük güç tüketimli, yüksek parlaklıkta sualtı LED aydınlatma çözümü.',
            image: prodLight,
        },
        {
            id: 6,
            name: 'Kontrol Monitörü',
            category: 'Monitor',
            description: 'Sualtı sistemleri ve ROV kontrolleri için endüstriyel monitör.',
            image: prodMonitor,
        },
        {
            id: 7,
            name: 'Emniyet Kemer Sistemi',
            category: 'Harness',
            description: 'Sualtı operatörleri için ergonomik ve güvenli emniyet kemer takımı.',
            image: prodHarness,
        },
    ];

    /* Brands Data with names for accessibility */
    const marqueeBrands = [
        { name: 'Aslan Çimento', image: brandAslan },
        { name: 'BİLGEM', image: brandBilgem },
        { name: 'Dalgakıran', image: brandDalgakiran },
        { name: 'EMS', image: brandEms },
        { name: 'ERVE', image: brandErve },
        { name: 'Gölcük Belediyesi', image: brandGolcuk },
        { name: 'TRC', image: brandTrc },
        { name: 'TÜBİTAK SAGE', image: brandTubitak },
        { name: 'Reference 1', image: brandRef1 },
        { name: 'Reference 3', image: brandRef3 },
        { name: 'Reference 4', image: brandRef4 },
        { name: 'Reference 5', image: brandRef5 },
        { name: 'Reference 7', image: brandRef7 }
    ];
    const allBrands = [...marqueeBrands, ...marqueeBrands]; // Duplicate for seamless marquee

    /* News — static data (GNews API key removed for security — needs backend proxy) */
    const newsItems = [
        {
            id: 's1',
            tag: 'Savunma Sanayi',
            date: 'Nisan 2025',
            title: 'IDEF 2025\'te Yeni Nesil Sualtı Konnektör Serisi Tanıtıldı',
            desc: 'Aquatic Elektronik, IDEF 2025 fuarında 6000m derinlik dayanımlı yeni konnektör serisini kamuoyuyla paylaştı.',
            url: null,
        },
        {
            id: 's2',
            tag: 'Uluslararası',
            date: 'Ocak 2025',
            title: 'Kazakistan\'da Yeni Ofis Açılışı',
            desc: 'Aquatic Elektronik, Orta Asya pazarına açılmak amacıyla Kazakistan\'da temsilcilik ofisi kurdu.',
            url: null,
        },
        {
            id: 's3',
            tag: 'Teknoloji',
            date: 'Kasım 2024',
            title: 'Yerli Kara Kutu Projesi Test Aşamasını Tamamladı',
            desc: 'Türkiye\'nin ilk yerli havacılık kara kutu projesi kapsamında geliştirilen sistem, zorlu çevre koşulları testlerini başarıyla geçti.',
            url: null,
        },
    ];

    /* Milestones / references */
    const milestones = [
        { id: 1, icon: <GlobalOutlined />, year: '2025', title: 'Kazakistan Açılışı', desc: 'Orta Asya pazarına giriş ve bölgesel ortaklıkların kurulması.' },
        { id: 2, icon: <TrophyOutlined />, year: '2025', title: 'IDEF Ürün Lansmanı', desc: 'Yeni nesil sualtı konnektör serisinin uluslararası tanıtımı.' },
        { id: 3, icon: <RocketOutlined />, year: '2024', title: 'Yerli Kara Kutu', desc: 'Türkiye\'nin ilk yerli kara kutu projesinde aktif tasarım ve üretim rolü.' },
        { id: 4, icon: <SafetyCertificateOutlined />, year: '2023', title: 'Uluslararası Sertifikasyon', desc: 'Ürün gamının uluslararası standartlara uygunluk belgesinin alınması.' },
        { id: 5, icon: <FileTextOutlined />, year: '2023', title: 'Savunma Tedarikçisi', desc: 'Yerli savunma sanayii projelerinde stratejik tedarikçi konumuna geçiş.' },
        { id: 6, icon: <StarOutlined />, year: '2022', title: 'İlk Sualtı Sistemi', desc: 'Türk deniz kuvvetleri için ilk yerli sualtı elektronik sisteminin teslimi.' },
    ];

    return (
        <div className="home-page">
            <PageSEO
                titleKey="nav.home"
                descriptionKey="hero.subtitle"
                path="/"
            />
            <section className="hero-section">
                {/* Animated background */}
                <div className="hero-bg">
                    <div className="hero-bg-image" style={{ backgroundImage: `url(${imgHeroBg})` }} />
                    <div className="hero-wave hero-wave-1" aria-hidden="true" />
                    <div className="hero-wave hero-wave-2" aria-hidden="true" />
                    <div className="hero-wave hero-wave-3" aria-hidden="true" />
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
                <div className="scroll-indicator animate-fadeIn delay-6" aria-hidden="true">
                    <div className="scroll-line" />
                </div>
            </section>

            {/* ===== STATS SECTION ===== */}
            <section id="home-stats" className="stats-section">
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
            <section id="home-services" className="section services-preview-section">
                <div className="container">
                    <div className="section-header-split reveal">
                        <div>
                            <span className="section-label"><AppstoreOutlined /> Hizmetlerimiz</span>
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 8 }}>{t('servicesPreview.title')}</h2>
                            <p className="section-subtitle" style={{ textAlign: 'left', margin: 0, maxWidth: 500 }}>{t('servicesPreview.subtitle')}</p>
                        </div>
                    </div>
                    <Row gutter={[24, 24]}>
                        {services.map((service, index) => (
                            <Col xs={24} sm={12} md={6} key={service.key}>
                                <div
                                    className={`service-preview-card reveal`}
                                    style={{ animationDelay: `${index * 0.1}s`, '--card-accent': service.color }}
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
                                    <div className="service-link" aria-label={t('hero.cta')}>
                                        <ArrowRightOutlined />
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* ===== POPULAR PRODUCTS ===== */}
            <section id="home-products" className="section products-section">
                <div className="container">
                    <div className="section-header-split reveal">
                        <div className="header-split-left">
                            <span className="section-label"><ShoppingOutlined /> Ürünlerimiz</span>
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 8 }}>{t('popularProducts.title')}</h2>
                            <p className="section-subtitle" style={{ textAlign: 'left', margin: 0, maxWidth: 500 }}>
                                {t('popularProducts.subtitle')}
                            </p>
                        </div>
                        <div className="header-split-right">
                            <Button type="default" size="large" onClick={() => navigate('/products')} className="view-all-btn">
                                {t('popularProducts.viewAll')} <ArrowRightOutlined />
                            </Button>
                        </div>
                    </div>

                    <div className="popular-products-slider reveal">
                        {products.map((product) => (
                            <div key={product.id} className="popular-product-slide">
                                <div className="premium-product-card" onClick={() => navigate('/products')}>
                                    <div className="premium-product-image">
                                        {product.image && <img src={product.image} alt={product.name} />}
                                        <div className="premium-product-badge">{t('popularProducts.topSeller')}</div>
                                    </div>
                                    <div className="premium-product-content">
                                        <div className="premium-product-category">{product.category}</div>
                                        <h3 className="premium-product-title">{product.name}</h3>
                                        <p className="premium-product-desc">{product.description}</p>
                                        <div className="premium-product-footer">
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

            {/* ===== REFERENCES / MILESTONES SECTION ===== */}
            <section id="home-milestones" className="section references-section">
                <div className="container">
                    <div className="reveal">
                        <span className="section-label"><ApartmentOutlined /> Referanslar</span>
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 8 }}>Önemli Kilometre Taşları</h2>
                        <p className="section-subtitle" style={{ textAlign: 'left', margin: '0 0 40px', maxWidth: 500 }}>
                            Ürün lansmanları, uluslararası açılışlar ve stratejik iş birlikleri
                        </p>
                    </div>
                    <div className="references-grid">
                        {milestones.map(m => (
                            <div className="milestone-card reveal" key={m.id}>
                                <div className="milestone-icon">{m.icon}</div>
                                <div className="milestone-year">{m.year}</div>
                                <div className="milestone-title">{m.title}</div>
                                <div className="milestone-desc">{m.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== NEWS SECTION ===== */}
            <section id="home-news" className="section news-section">
                <div className="container">
                    <div className="section-header-split reveal">
                        <div>
                            <span className="section-label"><FileTextOutlined /> Haberler</span>
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 8 }}>Son Gelişmeler</h2>
                            <p className="section-subtitle" style={{ textAlign: 'left', margin: 0, maxWidth: 500 }}>
                                Sektördeki en güncel haberler ve gelişmeler
                            </p>
                        </div>
                    </div>
                    <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
                        {newsItems.map(item => {
                            const Tag = item.url ? 'a' : 'div';
                            const linkProps = item.url ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' } : {};
                            return (
                                <Col xs={24} md={8} key={item.id}>
                                    <Tag {...linkProps} className="news-card reveal">
                                        <div className="news-card-inner">
                                            <span className="news-card-tag">{item.tag}</span>
                                            <div className="news-card-date">{item.date}</div>
                                            <h3 className="news-card-title">{item.title}</h3>
                                            <p className="news-card-desc">{item.desc}</p>
                                            {item.url && (
                                                <div className="news-card-arrow">
                                                    <ArrowRightOutlined /> Devamını Oku
                                                </div>
                                            )}
                                        </div>
                                    </Tag>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </section>

            {/* ===== BRANDS / REFERENCES ===== */}
            <section id="home-brands" className="section brands-section">
                <div className="container">
                    <div className="reveal">
                        <span className="section-label"><TeamOutlined /> Markalar & Referanslar</span>
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 8 }}>{t('brands.title')}</h2>
                        <p className="section-subtitle" style={{ textAlign: 'left', margin: '0 0 40px', maxWidth: 500 }}>
                            {t('brands.subtitle')}
                        </p>
                    </div>
                    <div className="brands-marquee-container reveal">
                        <div className="brands-marquee">
                            {allBrands.map((brand, index) => (
                                <div key={index} className="brand-logo-wrapper glass-card">
                                    <img src={brand.image} alt={brand.name} className="brand-logo" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
