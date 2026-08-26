import { useState, useEffect } from 'react';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import PageSEO from '../components/common/PageSEO';
import { useTranslation } from 'react-i18next';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
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
const imgHeroBg = '/hero.webp'; // public/ — stable URL, preloaded in index.html
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

/* Hero background rotates through real facility/product photos — text
   changes with it (see HERO_SLIDES usage below), not just the image. */
const HERO_SLIDES = [
    { image: imgHeroBg, i18nKey: 'default' },
    { image: imgMaritime, i18nKey: 'denizcilik' },
    { image: imgDefence, i18nKey: 'savunma' },
    { image: imgMachinery, i18nKey: 'makina' },
];
const HERO_SLIDE_INTERVAL = 6000;

const HomePage = () => {
    const { t } = useTranslation();
    const navigate = useLocalizedNavigate();

    /* Intersection observer for animations */
    useRevealAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    /* Rotating hero background + copy */
    const [heroSlide, setHeroSlide] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, HERO_SLIDE_INTERVAL);
        return () => clearInterval(id);
    }, []);
    const activeSlideKey = HERO_SLIDES[heroSlide].i18nKey;
    const heroSlogan =
        activeSlideKey === 'default' ? t('hero.slogan') : t(`hero.slides.${activeSlideKey}.slogan`);
    const heroSubtitle =
        activeSlideKey === 'default'
            ? t('hero.subtitle')
            : t(`hero.slides.${activeSlideKey}.subtitle`);

    /* Services preview data */
    const services = [
        {
            key: 'denizcilik',
            icon: <CompassOutlined />,
            title: t('servicesPreview.denizcilik.title'),
            desc: t('servicesPreview.denizcilik.desc'),
            color: 'var(--color-primary-dark)',
            image: imgMaritime,
        },
        {
            key: 'savunmaSanayi',
            icon: <RocketOutlined />,
            title: t('servicesPreview.savunmaSanayi.title'),
            desc: t('servicesPreview.savunmaSanayi.desc'),
            color: 'var(--color-primary)',
            image: imgDefence,
        },
        {
            key: 'makina',
            icon: <ToolOutlined />,
            title: t('servicesPreview.makina.title'),
            desc: t('servicesPreview.makina.desc'),
            color: 'var(--color-accent-dark)',
            image: imgMachinery,
        },
        {
            key: 'elektronikOtomasyon',
            icon: <ThunderboltOutlined />,
            title: t('servicesPreview.elektronikOtomasyon.title'),
            desc: t('servicesPreview.elektronikOtomasyon.desc'),
            color: 'var(--color-accent)',
            image: imgElectronics,
        },
    ];

    /* Stats data */
    const stats = [
        { icon: <CalendarOutlined />, value: '6+', label: t('stats.experience') },
        { icon: <ProjectOutlined />, value: '150+', label: t('stats.projects') },
        { icon: <TeamOutlined />, value: '50+', label: t('stats.clients') },
        { icon: <GlobalOutlined />, value: '5+', label: t('stats.countries') },
    ];

    /* Popular products (static demo data) — names/descriptions come from i18n */
    const products = [
        { id: 1, image: prodPressureVessel },
        { id: 2, image: prodPortableUnit },
        { id: 3, image: prodPortableUnit2 },
        { id: 4, image: prodCamera },
        { id: 5, image: prodLight },
        { id: 6, image: prodMonitor },
        { id: 7, image: prodHarness },
    ].map((p) => ({
        ...p,
        name: t(`popularProducts.items.${p.id}.name`),
        category: t(`popularProducts.items.${p.id}.category`),
        description: t(`popularProducts.items.${p.id}.description`),
    }));

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
        { name: 'Reference 7', image: brandRef7 },
    ];

    /* News — fetched from NewsData.io */
    const [newsItems, setNewsItems] = useState([]);
    const [newsLoading, setNewsLoading] = useState(true);
    const [newsError, setNewsError] = useState(false);

    useEffect(() => {
        const CACHE_KEY = 'aquatic_news_cache_v2'; // bumped when the news query changes, to invalidate stale caches
        const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

        // Serve from cache if still fresh
        try {
            const cached = JSON.parse(localStorage.getItem(CACHE_KEY) ?? 'null');
            if (cached && Date.now() - cached.ts < CACHE_TTL && cached.items?.length) {
                setNewsItems(cached.items);
                setNewsLoading(false);
                return;
            }
        } catch {
            // corrupt cache — ignore
        }

        const apiKey = (import.meta.env.VITE_NEWSDATA_API_KEY ?? '').trim();
        if (!apiKey) {
            setNewsLoading(false);
            setNewsError(true);
            return;
        }

        // NewsData's free-tier `q` caps at 100 chars and its OR matching is loose
        // (e.g. plain "defense"/"naval" pulled in unrelated war/politics/sports
        // coverage in testing) — so this query only casts a wide-enough net to
        // find candidates; RELEVANCE_REGEX below does the real filtering.
        const NEWS_QUERY =
            'underwater OR subsea OR offshore OR shipbuilding OR naval OR maritime OR AUV OR ROV OR submarine';
        const baseUrl = (page) =>
            `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(NEWS_QUERY)}&language=en&size=10${page ? `&page=${page}` : ''}`;

        // Strict client-side relevance filter, scoped to Aquatic's actual business
        // lines (maritime, underwater/defense tech, industrial machinery,
        // electronics & automation) — guarantees only genuinely on-topic articles
        // are shown, regardless of how loose the API's own matching is. Some bare
        // words were tested live and dropped for being false-positive magnets:
        // "underwater" (mortgage idiom, drowning stories), "naval" (Navy sports
        // sponsorships, general politics), "submarine" (a video-game weapon),
        // "sonar" (robot pool vacuums), "pcb" (cricket board, the chemical) — kept
        // only as part of more specific compound phrases instead.
        const RELEVANCE_TERMS = [
            'subsea',
            'offshore',
            'shipbuilding',
            'shipyard',
            'maritime',
            'rov',
            'auv',
            'hydrophone',
            'torpedo',
            'defense industry',
            'defence industry',
            'industrial automation',
            'electronics manufacturing',
            'pcb design',
            'pcb manufacturing',
            'circuit board',
            'underwater robot',
            'underwater drone',
            'underwater vehicle',
            'underwater technology',
            'underwater connector',
            'underwater camera',
            'underwater cable',
            'naval architecture',
            'naval shipbuilding',
            'naval defense',
            'naval defence',
            'submarine cable',
            'submarine technology',
            'marine technology',
            'marine engineering',
            'marine supply chain',
            'offshore engineering',
            'offshore wind',
            'offshore vessel',
            'offshore construction',
        ];
        const RELEVANCE_REGEX = new RegExp(
            `\\b(${RELEVANCE_TERMS.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
            'i'
        );
        const isRelevant = (article) =>
            RELEVANCE_REGEX.test(`${article.title ?? ''} ${article.description ?? ''}`);

        const toCard = (article, i) => ({
            id: `nd-${i}`,
            tag: article.category?.[0] ?? 'technology',
            date: article.pubDate
                ? new Date(article.pubDate).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                  })
                : '',
            title: article.title ?? '',
            desc: article.description ?? '',
            url: article.link ?? null,
            image: article.image_url ?? null,
            source: article.source_name ?? null,
        });

        fetch(baseUrl())
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(async (data) => {
                if (!data.results?.length) throw new Error('no results');
                let all = [...data.results];
                if (data.nextPage) {
                    try {
                        const res2 = await fetch(baseUrl(data.nextPage));
                        if (res2.ok) {
                            const data2 = await res2.json();
                            if (data2.results?.length) all = [...all, ...data2.results];
                        }
                    } catch {
                        // page 2 failed — continue with page 1
                    }
                }
                const items = all.filter(isRelevant).map(toCard);
                // Save to cache
                try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), items }));
                } catch {
                    // localStorage full — skip caching
                }
                setNewsItems(items);
            })
            .catch(() => setNewsError(true))
            .finally(() => setNewsLoading(false));
    }, []);

    /* Milestones / references */
    const milestones = [
        { id: '1', icon: <GlobalOutlined />, year: '2025' },
        { id: '2', icon: <TrophyOutlined />, year: '2025' },
        { id: '3', icon: <RocketOutlined />, year: '2024' },
        { id: '4', icon: <SafetyCertificateOutlined />, year: '2023' },
        { id: '5', icon: <FileTextOutlined />, year: '2023' },
        { id: '6', icon: <StarOutlined />, year: '2022' },
    ];

    return (
        <div className="home-page">
            <PageSEO titleKey="nav.home" descriptionKey="hero.subtitle" path="/" />
            <section className="hero-section">
                {/* Real facility/product photos, not decorative gradients — rotates every few seconds */}
                <div className="hero-bg">
                    {HERO_SLIDES.map((slide, i) => (
                        <div
                            key={slide.i18nKey}
                            className={`hero-bg-image${i === heroSlide ? ' active' : ''}`}
                            style={{ backgroundImage: `url(${slide.image})` }}
                        />
                    ))}
                    <div className="hero-scrim" aria-hidden="true" />
                </div>

                <div className="hero-content container">
                    <h1 key={`slogan-${heroSlide}`} className="hero-slogan hero-text-in delay-2">
                        {heroSlogan}
                    </h1>
                    <p key={`subtitle-${heroSlide}`} className="hero-subtitle hero-text-in delay-3">
                        {heroSubtitle}
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
                                <div
                                    className={`stat-card reveal`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
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
                            <span className="section-label">
                                <AppstoreOutlined /> {t('servicesPreview.sectionLabel')}
                            </span>
                            <h2
                                className="section-title"
                                style={{ textAlign: 'left', marginBottom: 8 }}
                            >
                                {t('servicesPreview.title')}
                            </h2>
                            <p
                                className="section-subtitle"
                                style={{ textAlign: 'left', margin: 0, maxWidth: 500 }}
                            >
                                {t('servicesPreview.subtitle')}
                            </p>
                        </div>
                    </div>
                    <Row gutter={[24, 24]}>
                        {services.map((service, index) => (
                            <Col xs={24} sm={12} md={6} key={service.key}>
                                <div
                                    className={`service-preview-card reveal`}
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        '--card-accent': service.color,
                                    }}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => navigate(`/services#${service.key}`)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            navigate(`/services#${service.key}`);
                                        }
                                    }}
                                >
                                    <img
                                        className="service-card-photo"
                                        src={service.image}
                                        alt=""
                                        width={1920}
                                        height={1071}
                                        loading="lazy"
                                    />
                                    <div className="service-card-scrim" aria-hidden="true" />
                                    <div className="service-card-content">
                                        <div
                                            className="service-icon-wrapper"
                                            style={{ background: service.color }}
                                        >
                                            {service.icon}
                                        </div>
                                        <h3 className="service-preview-title">{service.title}</h3>
                                        <p className="service-preview-desc">{service.desc}</p>
                                        <div className="service-link" aria-label={t('hero.cta')}>
                                            <ArrowRightOutlined />
                                        </div>
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
                            <span className="section-label">
                                <ShoppingOutlined /> {t('popularProducts.sectionLabel')}
                            </span>
                            <h2
                                className="section-title"
                                style={{ textAlign: 'left', marginBottom: 8 }}
                            >
                                {t('popularProducts.title')}
                            </h2>
                            <p
                                className="section-subtitle"
                                style={{ textAlign: 'left', margin: 0, maxWidth: 500 }}
                            >
                                {t('popularProducts.subtitle')}
                            </p>
                        </div>
                        <div className="header-split-right">
                            <Button
                                type="default"
                                size="large"
                                onClick={() => navigate('/products')}
                                className="view-all-btn"
                            >
                                {t('popularProducts.viewAll')} <ArrowRightOutlined />
                            </Button>
                        </div>
                    </div>

                    <div className="popular-products-slider reveal">
                        {products.map((product) => (
                            <div key={product.id} className="popular-product-slide">
                                <div
                                    className="premium-product-card"
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => navigate('/products')}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            navigate('/products');
                                        }
                                    }}
                                >
                                    <div className="premium-product-image">
                                        {product.image && (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                width={360}
                                                height={300}
                                            />
                                        )}
                                        <div className="premium-product-badge">
                                            {t('popularProducts.topSeller')}
                                        </div>
                                    </div>
                                    <div className="premium-product-content">
                                        <div className="premium-product-category">
                                            {product.category}
                                        </div>
                                        <h3 className="premium-product-title">{product.name}</h3>
                                        <p className="premium-product-desc">
                                            {product.description}
                                        </p>
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
                        <span className="section-label">
                            <ApartmentOutlined /> {t('milestones.sectionLabel')}
                        </span>
                        <h2
                            className="section-title"
                            style={{ textAlign: 'left', marginBottom: 8 }}
                        >
                            {t('milestones.title')}
                        </h2>
                        <p
                            className="section-subtitle"
                            style={{ textAlign: 'left', margin: '0 0 40px', maxWidth: 500 }}
                        >
                            {t('milestones.subtitle')}
                        </p>
                    </div>
                    <div className="references-grid">
                        {milestones.map((m) => (
                            <div className="milestone-card reveal" key={m.id}>
                                <div className="milestone-icon">{m.icon}</div>
                                <div className="milestone-year">{m.year}</div>
                                <div className="milestone-title">{t(`milestones.items.${m.id}.title`)}</div>
                                <div className="milestone-desc">{t(`milestones.items.${m.id}.desc`)}</div>
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
                            <span className="section-label">
                                <FileTextOutlined /> {t('news.sectionLabel')}
                            </span>
                            <h2
                                className="section-title"
                                style={{ textAlign: 'left', marginBottom: 8 }}
                            >
                                {t('news.title')}
                            </h2>
                            <p
                                className="section-subtitle"
                                style={{ textAlign: 'left', margin: 0, maxWidth: 500 }}
                            >
                                {t('news.subtitle')}
                            </p>
                        </div>
                    </div>
                    <div className="news-marquee-container" style={{ marginTop: 40 }}>
                        {newsLoading ? (
                            <div className="news-marquee-track">
                                {[0, 1, 2, 3].map((i) => (
                                    <div className="news-skeleton" key={i}>
                                        <div className="skeleton-line skeleton-tag" />
                                        <div className="skeleton-line skeleton-date" />
                                        <div className="skeleton-line skeleton-title" />
                                        <div className="skeleton-line skeleton-title-short" />
                                        <div className="skeleton-line skeleton-desc" />
                                        <div className="skeleton-line skeleton-desc-short" />
                                    </div>
                                ))}
                            </div>
                        ) : newsError || newsItems.length === 0 ? (
                            <p style={{ color: 'var(--color-text-muted)' }}>{t('news.error')}</p>
                        ) : (
                            <div className="news-marquee-track">
                                {[...newsItems, ...newsItems].map((item, idx) => {
                                    const Tag = item.url ? 'a' : 'div';
                                    const linkProps = item.url
                                        ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
                                        : {};
                                    return (
                                        <Tag {...linkProps} className="news-card" key={`${item.id}-${idx}`}>
                                            {item.image && (
                                                <div className="news-card-image">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.target.closest('.news-card-image').style.display = 'none';
                                                        }}
                                                    />
                                                    <div className="news-card-image-overlay" />
                                                    <span className="news-card-tag">{item.tag}</span>
                                                </div>
                                            )}
                                            <div className="news-card-inner">
                                                {!item.image && (
                                                    <span className="news-card-tag">{item.tag}</span>
                                                )}
                                                {item.source && (
                                                    <div className="news-card-source">{item.source}</div>
                                                )}
                                                <div className="news-card-date">{item.date}</div>
                                                <h3 className="news-card-title">{item.title}</h3>
                                                <p className="news-card-desc">{item.desc}</p>
                                                {item.url && (
                                                    <div className="news-card-arrow">
                                                        <ArrowRightOutlined /> {t('news.readMore')}
                                                    </div>
                                                )}
                                            </div>
                                        </Tag>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ===== BRANDS / REFERENCES ===== */}
            <section id="home-brands" className="section brands-section">
                <div className="container">
                    <div className="reveal">
                        <span className="section-label">
                            <TeamOutlined /> {t('brands.sectionLabel')}
                        </span>
                        <h2
                            className="section-title"
                            style={{ textAlign: 'left', marginBottom: 8 }}
                        >
                            {t('brands.title')}
                        </h2>
                        <p
                            className="section-subtitle"
                            style={{ textAlign: 'left', margin: '0 0 40px', maxWidth: 500 }}
                        >
                            {t('brands.subtitle')}
                        </p>
                    </div>
                    <div className="brands-grid reveal">
                        {marqueeBrands.map((brand) => (
                            <div key={brand.name} className="brand-logo-wrapper glass-card">
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="brand-logo"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
