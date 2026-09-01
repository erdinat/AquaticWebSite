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
    FilePdfOutlined,
    DownloadOutlined,
    PictureOutlined,
    CloseOutlined,
    PlayCircleOutlined,
} from '@ant-design/icons';
import productsData from '../data/products.json';
import { getCategoryIcon } from '../data/productCategoryVisuals';
import { isKzDomain } from '../i18n/langRouting';
import './HomePage.css';

/* Optimized images */
import imgDefence from '../assets/images/savunmasanayi.webp';
import imgElectronics from '../assets/images/elektrik.webp';
import imgMachinery from '../assets/images/makina.webp';
import imgMaritime from '../assets/images/denizcilik.webp';
// public/ — stable URL (not fingerprinted by Vite), so a ?v= query param is
// bumped by hand whenever the file's content changes to bust stale caches
// (browsers otherwise keep serving old bytes under the same URL indefinitely).
const imgHeroBg = '/hero.webp?v=3';
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

/* Downloadable catalog PDFs — the connector + lighting catalogs only exist in
   Turkish, the lighting catalog also has an English edition used for every
   other site language (no separate RU/KK catalog editions exist yet). */
const CATALOGS = {
    tr: [
        { key: 'connectors', file: '/catalogs/aquatic-sualti-konnektorleri-katalogu-tr.pdf' },
        { key: 'lighting', file: '/catalogs/aquatic-sualti-aydinlatma-katalogu-tr.pdf' },
    ],
    other: [{ key: 'lighting', file: '/catalogs/aquatic-underwater-lighting-catalog-en.pdf' }],
};

/* Photo album — 22 marketing/product visuals supplied by the user (1 Eylül
   2026), optimized to webp and placed at public/images/gallery/. */
const GALLERY_IMAGES = Array.from(
    { length: 22 },
    (_, i) => `/images/gallery/gallery-${String(i + 1).padStart(2, '0')}.webp`
);

const HomePage = () => {
    const { t, i18n } = useTranslation();
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

    /* Photo album carousel — same step-by-step pattern as the one above. */
    const galleryTrackRef = useRef(null);
    const scrollGalleryTrack = (direction) => {
        const el = galleryTrackRef.current;
        if (!el) return;
        const card = el.querySelector('.home-gallery-card');
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
    // aquatic.kz avoids the literal "Savunma Sanayi" (Defense Industry)
    // wording in the hero rotation — same background photo, different
    // slogan/subtitle text (see CLAUDE.md).
    const heroSlideI18nKey =
        activeSlideKey === 'savunma' && isKzDomain() ? 'savunmaKz' : activeSlideKey;
    const heroSlogan =
        heroSlideI18nKey === 'default'
            ? t('hero.slogan')
            : t(`hero.slides.${heroSlideI18nKey}.slogan`);
    const heroSubtitle =
        heroSlideI18nKey === 'default'
            ? t('hero.subtitle')
            : t(`hero.slides.${heroSlideI18nKey}.subtitle`);

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
            color: 'var(--color-primary)',
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
            color: 'var(--color-primary)',
            image: '/images/services/detail/savunmaSanayi-konnektor.webp',
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
            color: 'var(--color-primary)',
            image: imgMachinery,
            productCategoryIds: ['dusuk-profilli', 'yag-dolgulu'],
        },
        {
            key: 'endustri',
            icon: <BankOutlined />,
            color: 'var(--color-primary)',
            image: '/images/services/detail/makina-konveyorler.webp',
            productCategoryIds: ['rm-lpm-serisi'],
        },
        {
            key: 'elektronikOtomasyon',
            icon: <ThunderboltOutlined />,
            color: 'var(--color-primary)',
            image: imgElectronics,
            productCategoryIds: ['fiber-optik'],
        },
    ];

    // Client request (30 Ağustos 2026): aquatic.kz's homepage should only
    // showcase Makina + Endüstri (their Dubai/Kazakhstan meeting focus) —
    // aquatic.com.tr keeps showing all 6 rows, unchanged.
    const activeCategoryShowcase = isKzDomain()
        ? CATEGORY_SHOWCASE.filter((row) => row.key === 'makina' || row.key === 'endustri')
        : CATEGORY_SHOWCASE;

    const categoryShowcaseRows = activeCategoryShowcase.map((row) => {
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

    const activeCatalogs = i18n.language === 'tr' ? CATALOGS.tr : CATALOGS.other;

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
        { name: 'TRC Marine', image: brandTrc },
        { name: 'TÜBİTAK SAGE', image: brandTubitak },
        { name: 'Reference 1', image: brandRef1 },
        { name: 'Reference 3', image: brandRef3 },
        { name: 'Reference 4', image: brandRef4 },
        { name: 'Reference 5', image: brandRef5 },
        { name: 'Reference 7', image: brandRef7 },
    ];

    /* aquatic.kz intro video — poster until clicked, then swaps to <video>.
       Only Kazakh and Turkish voiceover versions exist (no per-language dub
       for EN/RU/ZH), so Turkish plays for the 'tr' UI language and Kazakh
       plays for everyone else (including the .kz default 'kk'). */
    const [kzVideoPlaying, setKzVideoPlaying] = useState(false);
    const kzVideoLang = i18n.language === 'tr' ? 'tr' : 'kk';
    const kzVideoSrc = `/videos/aquatic-kazakhstan-${kzVideoLang}.mp4`;
    const kzVideoPoster = `/videos/aquatic-kazakhstan-${kzVideoLang}-poster.webp`;

    /* Photo album lightbox — null when closed, otherwise the open index */
    const [galleryIndex, setGalleryIndex] = useState(null);

    useEffect(() => {
        if (galleryIndex === null) return undefined;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setGalleryIndex(null);
            if (e.key === 'ArrowRight') {
                setGalleryIndex((i) => (i + 1) % GALLERY_IMAGES.length);
            }
            if (e.key === 'ArrowLeft') {
                setGalleryIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [galleryIndex]);

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

    /* Featured + list split for the news section (see CLAUDE.md "Güncel
       Haberler tasarımı" note) — first article is the large featured story,
       the next up to 4 render as a compact list beside it. */
    const featuredNewsItem = newsItems[0] || null;
    const listNewsItems = newsItems.slice(1, 5);

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

            {/* ===== KAZAKHSTAN INTRO VIDEO (aquatic.kz only) ===== */}
            {isKzDomain() && (
                <section className="section kz-video-section">
                    <div className="container">
                        <span className="section-label reveal">
                            <PlayCircleOutlined /> {t('kzVideo.sectionLabel')}
                        </span>
                        <h2
                            className="section-title reveal"
                            style={{ textAlign: 'left', marginBottom: 8 }}
                        >
                            {t('kzVideo.title')}
                        </h2>
                        <p
                            className="section-subtitle reveal"
                            style={{ textAlign: 'left', margin: '0 0 32px' }}
                        >
                            {t('kzVideo.subtitle')}
                        </p>
                        <div className="kz-video-wrap reveal">
                            {kzVideoPlaying ? (
                                <video
                                    key={kzVideoSrc}
                                    className="kz-video-player"
                                    src={kzVideoSrc}
                                    poster={kzVideoPoster}
                                    controls
                                    autoPlay
                                />
                            ) : (
                                <button
                                    type="button"
                                    className="kz-video-poster"
                                    style={{
                                        backgroundImage: `url(${kzVideoPoster})`,
                                    }}
                                    onClick={() => setKzVideoPlaying(true)}
                                    aria-label={t('kzVideo.playLabel')}
                                >
                                    <span className="kz-video-poster-overlay" aria-hidden="true" />
                                    <span className="kz-video-play-btn">
                                        <PlayCircleOutlined />
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            )}

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
                                {t(
                                    isKzDomain()
                                        ? 'categoryShowcase.kzTitle'
                                        : 'categoryShowcase.title'
                                )}
                            </h2>
                            <p
                                className="section-subtitle"
                                style={{ textAlign: 'left', margin: 0, maxWidth: 560 }}
                            >
                                {t(
                                    isKzDomain()
                                        ? 'categoryShowcase.kzSubtitle'
                                        : 'categoryShowcase.subtitle'
                                )}
                            </p>
                        </div>
                    </div>

                    {isKzDomain() ? (
                        /* Launch/demo treatment for aquatic.kz (30 Ağustos 2026):
                           no product carousel, just the 2 categories themselves
                           as large, full-width, editorial showcase cards. */
                        <div className="kz-showcase-grid">
                            {categoryShowcaseRows.map((row, rowIdx) => (
                                <button
                                    key={row.key}
                                    className="kz-showcase-card reveal"
                                    style={{
                                        backgroundImage: `url(${row.image})`,
                                        animationDelay: `${rowIdx * 0.1}s`,
                                    }}
                                    onClick={() => navigate(`/services/category/${row.key}`)}
                                >
                                    <span className="kz-showcase-overlay" aria-hidden="true" />
                                    <span className="kz-showcase-icon">{row.icon}</span>
                                    <span className="kz-showcase-body">
                                        <span className="kz-showcase-title">
                                            {t(`services.${row.key}.title`)}
                                        </span>
                                        <span className="kz-showcase-desc">
                                            {t(`services.${row.key}.desc`)}
                                        </span>
                                        <span className="kz-showcase-btn">
                                            {t('categoryShowcase.ctaLabel')}{' '}
                                            <ArrowRightOutlined />
                                        </span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    ) : (
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
                    )}
                </div>
            </section>

            {/* ===== CATALOG DOWNLOADS ===== */}
            <section id="home-catalogs" className="section home-catalogs-section">
                <div className="container">
                    <span className="section-label reveal">
                        <FilePdfOutlined /> {t('services.catalogs.sectionLabel')}
                    </span>
                    <h2
                        className="section-title reveal"
                        style={{ textAlign: 'left', marginBottom: 8 }}
                    >
                        {t('services.catalogs.title')}
                    </h2>
                    <p
                        className="section-subtitle reveal"
                        style={{ textAlign: 'left', margin: '0 0 40px' }}
                    >
                        {t('services.catalogs.subtitle')}
                    </p>
                    <div className="home-catalogs-grid reveal">
                        {activeCatalogs.map((catalog) => (
                            <a
                                key={catalog.key}
                                href={catalog.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="home-catalog-card"
                            >
                                <div className="home-catalog-icon">
                                    <FilePdfOutlined />
                                </div>
                                <div className="home-catalog-body">
                                    <h4 className="home-catalog-title">
                                        {t(`services.catalogs.items.${catalog.key}.title`)}
                                    </h4>
                                    <p className="home-catalog-desc">
                                        {t(`services.catalogs.items.${catalog.key}.desc`)}
                                    </p>
                                </div>
                                <div className="home-catalog-download">
                                    <DownloadOutlined />
                                    <span>{t('services.catalogs.downloadLabel')}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PHOTO ALBUM ===== */}
            <section id="home-gallery" className="section home-gallery-section">
                <div className="container">
                    <span className="section-label reveal">
                        <PictureOutlined /> {t('gallery.sectionLabel')}
                    </span>
                    <h2 className="section-title reveal" style={{ textAlign: 'left', marginBottom: 8 }}>
                        {t('gallery.title')}
                    </h2>
                    <p className="section-subtitle reveal" style={{ textAlign: 'left', margin: '0 0 40px' }}>
                        {t('gallery.subtitle')}
                    </p>
                    <div className="home-gallery-carousel-wrap reveal">
                        <button
                            type="button"
                            className="cs-arrow cs-arrow--prev"
                            aria-label={t('categoryShowcase.prev')}
                            onClick={() => scrollGalleryTrack(-1)}
                        >
                            <LeftOutlined />
                        </button>
                        <button
                            type="button"
                            className="cs-arrow cs-arrow--next"
                            aria-label={t('categoryShowcase.next')}
                            onClick={() => scrollGalleryTrack(1)}
                        >
                            <RightOutlined />
                        </button>
                        <div className="home-gallery-track" ref={galleryTrackRef}>
                            {GALLERY_IMAGES.map((src, idx) => (
                                <button
                                    key={src}
                                    className="home-gallery-card"
                                    onClick={() => setGalleryIndex(idx)}
                                    aria-label={t('gallery.openLabel', { index: idx + 1 })}
                                >
                                    <img src={src} alt="" loading="lazy" />
                                </button>
                            ))}
                        </div>
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
                    <div
                        className={`news-featured-layout reveal${
                            !newsLoading && listNewsItems.length === 0
                                ? ' news-featured-layout--single'
                                : ''
                        }`}
                        style={{ marginTop: 40 }}
                    >
                        {newsLoading ? (
                            <>
                                <div className="news-skeleton-featured">
                                    <div className="skeleton-line news-skeleton-featured-image" />
                                    <div className="skeleton-line skeleton-title" />
                                    <div
                                        className="skeleton-line skeleton-date"
                                        style={{ width: '40%' }}
                                    />
                                    <div className="skeleton-line skeleton-desc" />
                                    <div className="skeleton-line skeleton-desc-short" />
                                </div>
                                <div className="news-list">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div className="news-skeleton-list-item" key={i}>
                                            <div className="skeleton-line news-skeleton-list-thumb" />
                                            <div className="news-skeleton-list-lines">
                                                <div
                                                    className="skeleton-line skeleton-date"
                                                    style={{ width: '50%' }}
                                                />
                                                <div className="skeleton-line skeleton-title-short" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : newsError || !featuredNewsItem ? (
                            <p style={{ color: 'var(--color-text-muted)' }}>{t('news.error')}</p>
                        ) : (
                            <>
                                {(() => {
                                    const FeaturedTag = featuredNewsItem.url ? 'a' : 'div';
                                    const featuredLinkProps = featuredNewsItem.url
                                        ? {
                                              href: featuredNewsItem.url,
                                              target: '_blank',
                                              rel: 'noopener noreferrer',
                                          }
                                        : {};
                                    return (
                                        <FeaturedTag
                                            {...featuredLinkProps}
                                            className="news-featured-card"
                                        >
                                            {featuredNewsItem.image && (
                                                <div className="news-featured-image">
                                                    <img
                                                        src={featuredNewsItem.image}
                                                        alt={featuredNewsItem.title}
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.target.closest(
                                                                '.news-featured-image'
                                                            ).style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <div className="news-featured-body">
                                                <h3 className="news-featured-title">
                                                    {featuredNewsItem.title}
                                                </h3>
                                                <div className="news-featured-meta">
                                                    {featuredNewsItem.source && (
                                                        <span>{featuredNewsItem.source}</span>
                                                    )}
                                                    {featuredNewsItem.date && (
                                                        <span>{featuredNewsItem.date}</span>
                                                    )}
                                                    {featuredNewsItem.tag && (
                                                        <span className="news-featured-tag">
                                                            {featuredNewsItem.tag}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="news-featured-desc">
                                                    {featuredNewsItem.desc}
                                                </p>
                                                {featuredNewsItem.url && (
                                                    <div className="news-featured-arrow">
                                                        <ArrowRightOutlined /> {t('news.readMore')}
                                                    </div>
                                                )}
                                            </div>
                                        </FeaturedTag>
                                    );
                                })()}

                                {listNewsItems.length > 0 && (
                                    <div className="news-list">
                                        {listNewsItems.map((item) => {
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
                                                    className="news-list-item"
                                                    key={item.id}
                                                >
                                                    <div className="news-list-thumb">
                                                        {item.image ? (
                                                            <img
                                                                src={item.image}
                                                                alt=""
                                                                loading="lazy"
                                                                onError={(e) => {
                                                                    e.target.closest(
                                                                        '.news-list-thumb'
                                                                    ).classList.add(
                                                                        'news-list-thumb--empty'
                                                                    );
                                                                    e.target.remove();
                                                                }}
                                                            />
                                                        ) : (
                                                            <FileTextOutlined />
                                                        )}
                                                    </div>
                                                    <div className="news-list-body">
                                                        <div className="news-list-date">
                                                            {item.date}
                                                        </div>
                                                        <h4 className="news-list-title">
                                                            {item.title}
                                                        </h4>
                                                    </div>
                                                </Tag>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
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

            {/* ===== PHOTO ALBUM LIGHTBOX ===== */}
            {galleryIndex !== null && (
                <div
                    className="home-gallery-lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label={t('gallery.title')}
                    onClick={() => setGalleryIndex(null)}
                >
                    <button
                        type="button"
                        className="home-gallery-lightbox-close"
                        aria-label={t('gallery.closeLabel')}
                        onClick={() => setGalleryIndex(null)}
                    >
                        <CloseOutlined />
                    </button>
                    <button
                        type="button"
                        className="home-gallery-lightbox-arrow home-gallery-lightbox-arrow--prev"
                        aria-label={t('categoryShowcase.prev')}
                        onClick={(e) => {
                            e.stopPropagation();
                            setGalleryIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
                        }}
                    >
                        <LeftOutlined />
                    </button>
                    <img
                        src={GALLERY_IMAGES[galleryIndex]}
                        alt=""
                        className="home-gallery-lightbox-img"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        type="button"
                        className="home-gallery-lightbox-arrow home-gallery-lightbox-arrow--next"
                        aria-label={t('categoryShowcase.next')}
                        onClick={(e) => {
                            e.stopPropagation();
                            setGalleryIndex((i) => (i + 1) % GALLERY_IMAGES.length);
                        }}
                    >
                        <RightOutlined />
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
