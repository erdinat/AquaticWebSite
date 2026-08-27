import { useState, useEffect, useRef } from 'react';
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
    BankOutlined,
    ProjectOutlined,
    CalendarOutlined,
    FileTextOutlined,
    AppstoreOutlined,
    LeftOutlined,
    RightOutlined,
} from '@ant-design/icons';
import productsData from '../data/products.json';
import { getCategoryIcon } from '../data/productCategoryVisuals';
import './HomePage.css';

/* Optimized images */
import imgDefence from '../assets/images/savunmasanayi.webp';
import imgElectronics from '../assets/images/elektrik.webp';
import imgMachinery from '../assets/images/makina.webp';
import imgMaritime from '../assets/images/denizcilik.webp';
// public/ — stable URL (not fingerprinted by Vite), so a ?v= query param is
// bumped by hand whenever the file's content changes to bust stale caches
// (browsers otherwise keep serving old bytes under the same URL indefinitely).
const imgHeroBg = '/hero.webp?v=2';
/* Hero-only photos — distinct from the ones reused on /services, so the
   rotating hero doesn't repeat imagery the visitor sees a scroll away. */
import imgHeroMaritime from '../assets/images/hero-denizcilik.webp';
import imgHeroDefence from '../assets/images/hero-savunma.webp';
import imgHeroMachinery from '../assets/images/hero-makina.webp';
import brandAslan from '../assets/images/brands/aslan-cimento.webp';
import brandBilgem from '../assets/images/brands/bilgem.webp';
import brandDalgakiran from '../assets/images/brands/dalgakiran.webp';
import brandEms from '../assets/images/brands/ems.webp';
import brandErve from '../assets/images/brands/erve.webp';
import brandGolcuk from '../assets/images/brands/golcuk-belediye.webp';
import brandTrc from '../assets/images/brands/trc.webp';
import brandTubitak from '../assets/images/brands/tubitak-sage.webp';
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
    { image: imgHeroMaritime, i18nKey: 'denizcilik' },
    { image: imgHeroDefence, i18nKey: 'savunma' },
    { image: imgHeroMachinery, i18nKey: 'makina' },
];
const HERO_SLIDE_INTERVAL = 6000;

const HomePage = () => {
    const { t } = useTranslation();
    const navigate = useLocalizedNavigate();

    /* Intersection observer for animations */
    useRevealAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    /* Category showcase carousels — step-by-step via prev/next buttons
       (scroll-snap does the alignment), one ref per row keyed by category. */
    const csCarouselRefs = useRef({});
    const scrollCsCarousel = (key, direction) => {
        const el = csCarouselRefs.current[key];
        if (!el) return;
        const card = el.querySelector('.cs-card');
        const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
        el.scrollBy({ left: direction * step, behavior: 'smooth' });
    };

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

    /* Category Showcase — combines services + products in one row per
       category. Which content a row shows depends on what actually has real
       photography: only underwater-cameras/subsea-lights-lasers in
       products.json have photos (the other 48 connector-series products are
       still imageless, see CLAUDE.md item 37) — cards for those fall back to
       a category-icon placeholder (same pattern ProductsPage.jsx already
       uses), rather than the row disappearing or repurposing a service item
       as a stand-in "product". */
    const CATEGORY_SHOWCASE = [
        {
            key: 'denizcilik',
            icon: <CompassOutlined />,
            color: 'var(--color-primary-dark)',
            image: imgMaritime,
            productCategoryIds: ['standart-dairesel', 'ethernet-koaksiyel'],
        },
        {
            key: 'savunmaSanayi',
            icon: <RocketOutlined />,
            color: 'var(--color-primary)',
            image: imgDefence,
            productCategoryIds: ['metal-govdeli', 'guc-serileri'],
        },
        {
            key: 'sualtiTeknolojileri',
            icon: <GlobalOutlined />,
            color: 'var(--color-accent)',
            image: imgDefence,
            productCategoryIds: [
                'underwater-cameras',
                'subsea-lights-lasers',
                'konnektor-aksesuarlari',
                'kucuk-mikro-dairesel',
            ],
        },
        {
            key: 'makina',
            icon: <ToolOutlined />,
            color: '#005f73',
            image: imgMachinery,
            productCategoryIds: ['dusuk-profilli', 'yag-dolgulu'],
        },
        {
            key: 'endustri',
            icon: <BankOutlined />,
            color: '#0a9396',
            image: imgMachinery,
            productCategoryIds: ['rm-lpm-serisi'],
        },
        {
            key: 'elektronikOtomasyon',
            icon: <ThunderboltOutlined />,
            color: 'var(--color-accent-dark)',
            image: imgElectronics,
            productCategoryIds: ['fiber-optik'],
        },
    ];

    const categoryShowcaseRows = CATEGORY_SHOWCASE.map((row) => {
        const cards = productsData
            .filter((p) => row.productCategoryIds.includes(p.categoryId))
            .slice(0, 9)
            .map((p) => ({
                key: p.id,
                image: p.images?.[0],
                categoryId: p.categoryId,
                title: p.name,
                onClick: () => navigate('/products'),
            }));
        return { ...row, cards };
    });

    /* Stats data */
    const stats = [
        { icon: <CalendarOutlined />, value: '6+', label: t('stats.experience') },
        { icon: <ProjectOutlined />, value: '150+', label: t('stats.projects') },
        { icon: <TeamOutlined />, value: '50+', label: t('stats.clients') },
        { icon: <GlobalOutlined />, value: '5+', label: t('stats.countries') },
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
                    <h1 key={`slogan-${heroSlide}`} className="hero-slogan hero-focus-in delay-2">
                        {heroSlogan}
                    </h1>
                    <p
                        key={`subtitle-${heroSlide}`}
                        className="hero-subtitle hero-focus-in delay-3"
                    >
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

            {/* ===== CATEGORY SHOWCASE (services + products combined) ===== */}
            <section id="home-category-showcase" className="section category-showcase-section">
                <div className="container">
                    <div className="section-header-split reveal">
                        <div>
                            <span className="section-label">
                                <AppstoreOutlined /> {t('categoryShowcase.sectionLabel')}
                            </span>
                            <h2
                                className="section-title"
                                style={{ textAlign: 'left', marginBottom: 8 }}
                            >
                                {t('categoryShowcase.title')}
                            </h2>
                            <p
                                className="section-subtitle"
                                style={{ textAlign: 'left', margin: 0, maxWidth: 560 }}
                            >
                                {t('categoryShowcase.subtitle')}
                            </p>
                        </div>
                    </div>

                    <div className="cs-rows">
                        {categoryShowcaseRows.map((row, rowIdx) => {
                            if (!row.cards.length) return null;
                            return (
                                <div
                                    className="cs-row reveal"
                                    key={row.key}
                                    style={{ animationDelay: `${rowIdx * 0.08}s` }}
                                >
                                    <button
                                        className="cs-banner"
                                        style={{
                                            backgroundImage: `url(${row.image})`,
                                            '--cs-color': row.color,
                                        }}
                                        onClick={() => navigate(`/services/category/${row.key}`)}
                                    >
                                        <span className="cs-banner-overlay" aria-hidden="true" />
                                        <span className="cs-banner-icon">{row.icon}</span>
                                        <span className="cs-banner-body">
                                            <span className="cs-banner-title">
                                                {t(`services.${row.key}.title`)}
                                            </span>
                                            <span className="cs-banner-cta">
                                                {t('categoryShowcase.ctaLabel')}{' '}
                                                <ArrowRightOutlined />
                                            </span>
                                        </span>
                                    </button>

                                    <div className="cs-carousel-wrap">
                                        <button
                                            type="button"
                                            className="cs-arrow cs-arrow--prev"
                                            aria-label={t('categoryShowcase.prev')}
                                            onClick={() => scrollCsCarousel(row.key, -1)}
                                        >
                                            <LeftOutlined />
                                        </button>
                                        <button
                                            type="button"
                                            className="cs-arrow cs-arrow--next"
                                            aria-label={t('categoryShowcase.next')}
                                            onClick={() => scrollCsCarousel(row.key, 1)}
                                        >
                                            <RightOutlined />
                                        </button>

                                        <div
                                            className="cs-carousel"
                                            ref={(el) => {
                                                csCarouselRefs.current[row.key] = el;
                                            }}
                                        >
                                            {row.cards.map((card) => (
                                                <button
                                                    key={card.key}
                                                    className="cs-card"
                                                    onClick={card.onClick}
                                                >
                                                    <div className="cs-card-image">
                                                        {card.image ? (
                                                            <img
                                                                src={card.image}
                                                                alt={card.title}
                                                                loading="lazy"
                                                            />
                                                        ) : (
                                                            <div
                                                                className="cs-card-image-placeholder"
                                                                style={{ color: row.color }}
                                                                aria-hidden="true"
                                                            >
                                                                {getCategoryIcon(card.categoryId)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="cs-card-body">
                                                        <h4 className="cs-card-title">
                                                            {card.title}
                                                        </h4>
                                                        <span className="cs-card-quote-btn">
                                                            {t('categoryShowcase.quoteButton')}
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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
                                        ? {
                                              href: item.url,
                                              target: '_blank',
                                              rel: 'noopener noreferrer',
                                          }
                                        : {};
                                    return (
                                        <Tag
                                            {...linkProps}
                                            className="news-card"
                                            key={`${item.id}-${idx}`}
                                        >
                                            {item.image && (
                                                <div className="news-card-image">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.target.closest(
                                                                '.news-card-image'
                                                            ).style.display = 'none';
                                                        }}
                                                    />
                                                    <div className="news-card-image-overlay" />
                                                    <span className="news-card-tag">
                                                        {item.tag}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="news-card-inner">
                                                {!item.image && (
                                                    <span className="news-card-tag">
                                                        {item.tag}
                                                    </span>
                                                )}
                                                {item.source && (
                                                    <div className="news-card-source">
                                                        {item.source}
                                                    </div>
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
