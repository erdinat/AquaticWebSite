import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import PageHero from '../components/common/PageHero';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import PageSEO from '../components/common/PageSEO';
import { Row, Col } from 'antd';
import {
    RocketOutlined,
    ThunderboltOutlined,
    ToolOutlined,
    CompassOutlined,
    RadarChartOutlined,
    AudioOutlined,
    ApiOutlined,
    BuildOutlined,
    LayoutOutlined,
    ScissorOutlined,
    ControlOutlined,
    SettingOutlined,
    ArrowRightOutlined,
    DownOutlined,
    DashboardOutlined,
    DeploymentUnitOutlined,
    BulbOutlined,
    SafetyCertificateOutlined,
    GlobalOutlined,
    BankOutlined,
    CameraOutlined,
    FilePdfOutlined,
    DownloadOutlined,
} from '@ant-design/icons';
import imgHero from '../assets/images/hizmetler.webp';
import './ServicesPage.css';

import imgDefence from '../assets/images/savunmasanayi.webp';
import imgElectronics from '../assets/images/elektrik.webp';
import imgMachinery from '../assets/images/makina.webp';
import imgMaritime from '../assets/images/denizcilik.webp';

const SERVICE_GROUPS = [
    {
        key: 'denizcilik',
        icon: <CompassOutlined />,
        color: 'var(--color-primary-dark)',
        gradient: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
        image: imgMaritime,
        items: [
            { key: 'gemiElektrik', icon: <BulbOutlined /> },
            { key: 'gemiMakine', icon: <SettingOutlined /> },
            { key: 'hidrolikPnomatik', icon: <ControlOutlined /> },
            { key: 'pnomatikMerdiven', icon: <DeploymentUnitOutlined /> },
            { key: 'komplebakimOnarim', icon: <SafetyCertificateOutlined /> },
            { key: 'tecizMontajOnarim', icon: <BuildOutlined /> },
            { key: 'boruDonatim', icon: <ApiOutlined /> },
        ],
    },
    {
        key: 'savunmaSanayi',
        icon: <RocketOutlined />,
        color: 'var(--color-primary)',
        gradient: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
        image: imgDefence,
        items: [
            { key: 'ozelKonnektorler', icon: <ApiOutlined /> },
            { key: 'sonarKablolari', icon: <AudioOutlined /> },
            { key: 'torpidoKablolari', icon: <RadarChartOutlined /> },
            { key: 'sualtiAkustik', icon: <DashboardOutlined /> },
            { key: 'sualtiKablosu', icon: <DeploymentUnitOutlined /> },
            { key: 'kamera', icon: <CameraOutlined /> },
            { key: 'konnektor', icon: <GlobalOutlined /> },
        ],
    },
    {
        key: 'makina',
        icon: <ToolOutlined />,
        color: '#005f73',
        gradient: 'linear-gradient(135deg, #005f73, #0a9396)',
        image: imgMachinery,
        items: [
            { key: 'kaynakliImalat', icon: <ScissorOutlined /> },
            { key: 'konveyorler', icon: <DeploymentUnitOutlined /> },
            { key: 'ozelImalatMakinalar', icon: <SettingOutlined /> },
            { key: 'tasarim3d', icon: <LayoutOutlined /> },
            { key: 'talasliImalat', icon: <ControlOutlined /> },
            { key: 'trafoEkipmanlari', icon: <BuildOutlined /> },
            { key: 'bobinSarimMakinalari', icon: <ToolOutlined /> },
            { key: 'bobinSarimManderelleri', icon: <DashboardOutlined /> },
            { key: 'tesisBoruDonatim', icon: <ApiOutlined /> },
            { key: 'tesisFabrikaKurulumu', icon: <BankOutlined /> },
        ],
    },
    {
        key: 'elektronikOtomasyon',
        icon: <ThunderboltOutlined />,
        color: 'var(--color-accent-dark)',
        gradient: 'linear-gradient(135deg, var(--color-accent-dark), var(--color-accent))',
        image: imgElectronics,
        items: [
            { key: 'pcbTasarim', icon: <LayoutOutlined /> },
            { key: 'elektronikTasarim', icon: <ThunderboltOutlined /> },
            { key: 'otomasyonEntegrasyon', icon: <DashboardOutlined /> },
        ],
    },
];

const VALID_KEYS = SERVICE_GROUPS.map((g) => g.key);

/* Downloadable catalog PDFs — the connector + lighting catalogs only exist in
   Turkish, the lighting catalog also has an English edition used for every
   other site language (no separate RU/KK catalog editions exist yet). */
const CATALOGS = {
    tr: [
        {
            key: 'connectors',
            file: '/catalogs/aquatic-sualti-konnektorleri-katalogu-tr.pdf',
            size: '11.6 MB',
        },
        {
            key: 'lighting',
            file: '/catalogs/aquatic-sualti-aydinlatma-katalogu-tr.pdf',
            size: '5.6 MB',
        },
    ],
    other: [
        {
            key: 'lighting',
            file: '/catalogs/aquatic-underwater-lighting-catalog-en.pdf',
            size: '5.6 MB',
        },
    ],
};

const ServicesPage = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useLocalizedNavigate();
    const [activeTab, setActiveTab] = useState('denizcilik');
    const [expandedItem, setExpandedItem] = useState(null);
    const [missingPhotos, setMissingPhotos] = useState({});

    const activeCatalogs = i18n.language === 'tr' ? CATALOGS.tr : CATALOGS.other;

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (VALID_KEYS.includes(hash)) {
            setActiveTab(hash);
            // The hash here selects a tab (no matching DOM anchor), so unlike
            // CorporatePage's hashes it isn't a scroll target — ScrollToTop
            // skips scrolling whenever a hash is present, so this page must
            // take charge of landing at the top itself.
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
    }, [location.hash]);

    useRevealAnimation();

    const activeGroup = SERVICE_GROUPS.find((g) => g.key === activeTab);

    const toggleItem = (key) => {
        setExpandedItem((prev) => (prev === key ? null : key));
    };

    return (
        <div className="services-page">
            <PageSEO
                titleKey="nav.services"
                descriptionKey="servicesPreview.subtitle"
                path="/services"
            />
            <PageHero
                title={t('services.title')}
                subtitle={t('services.subtitle')}
                bgImage={imgHero}
            />

            <section className="section services-tabs-section">
                <div className="container">
                    {/* ── Tab Selector ── */}
                    <div className="svc-tab-selector reveal">
                        {SERVICE_GROUPS.map((group) => (
                            <button
                                key={group.key}
                                className={`svc-tab-btn${activeTab === group.key ? ' active' : ''}`}
                                style={{ '--tab-color': group.color }}
                                onClick={() => setActiveTab(group.key)}
                            >
                                <span className="svc-tab-icon">{group.icon}</span>
                                <span className="svc-tab-text">
                                    {t(`services.${group.key}.title`)}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* ── Content Panel ── */}
                    {activeGroup && (
                        <div className="svc-content reveal">
                            <Row gutter={[40, 40]} align="stretch">
                                {/* Left: Info card */}
                                <Col xs={24} lg={10}>
                                    <div
                                        className="svc-info-panel"
                                        style={{
                                            '--panel-color': activeGroup.color,
                                            '--panel-gradient': activeGroup.gradient,
                                        }}
                                    >
                                        <div className="svc-info-image">
                                            <img
                                                src={activeGroup.image}
                                                alt={t(`services.${activeGroup.key}.title`)}
                                                width={1920}
                                                height={1071}
                                                loading="lazy"
                                            />
                                            <div className="svc-info-overlay" />
                                        </div>
                                        <div className="svc-info-body">
                                            <div className="svc-info-icon-badge">
                                                {activeGroup.icon}
                                            </div>
                                            <h3 className="svc-info-title">
                                                {t(`services.${activeGroup.key}.title`)}
                                            </h3>
                                            <p className="svc-info-desc">
                                                {t(`services.${activeGroup.key}.desc`)}
                                            </p>
                                            <button
                                                className="svc-info-cta"
                                                onClick={() => navigate('/contact')}
                                            >
                                                {t('hero.ctaContact')} <ArrowRightOutlined />
                                            </button>
                                        </div>
                                    </div>
                                </Col>

                                {/* Right: Service item rows */}
                                <Col xs={24} lg={14}>
                                    <div className="svc-items-list">
                                        {activeGroup.items.map((item, idx) => {
                                            const itemKey = `${activeGroup.key}.${item.key}`;
                                            const isOpen = expandedItem === itemKey;
                                            const photoKey = `${activeGroup.key}-${item.key}`;
                                            const hasPhoto = !missingPhotos[photoKey];
                                            const markPhotoMissing = () =>
                                                setMissingPhotos((prev) => ({
                                                    ...prev,
                                                    [photoKey]: true,
                                                }));
                                            return (
                                                <div
                                                    className={`svc-item-row${isOpen ? ' svc-item-row--open' : ''}`}
                                                    key={item.key}
                                                    style={{
                                                        '--item-color': activeGroup.color,
                                                        animationDelay: `${idx * 0.08}s`,
                                                    }}
                                                >
                                                    <button
                                                        className="svc-item-header"
                                                        onClick={() => toggleItem(itemKey)}
                                                        aria-expanded={isOpen}
                                                    >
                                                        <div className="svc-item-num">
                                                            {String(idx + 1).padStart(2, '0')}
                                                        </div>
                                                        <div className="svc-item-icon-box">
                                                            {item.icon}
                                                        </div>
                                                        <div className="svc-item-body">
                                                            <h4 className="svc-item-title">
                                                                {t(
                                                                    `services.${activeGroup.key}.items.${item.key}.title`
                                                                )}
                                                            </h4>
                                                            <p className="svc-item-desc">
                                                                {t(
                                                                    `services.${activeGroup.key}.items.${item.key}.desc`
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="svc-item-arrow">
                                                            <DownOutlined />
                                                        </div>
                                                    </button>
                                                    {isOpen && (
                                                        <div className="svc-item-detail">
                                                            {hasPhoto && (
                                                                <img
                                                                    className="svc-item-detail-img"
                                                                    src={`/images/services/detail/${photoKey}.webp`}
                                                                    alt=""
                                                                    loading="lazy"
                                                                    onError={markPhotoMissing}
                                                                />
                                                            )}
                                                            <p>
                                                                {t(
                                                                    `services.${activeGroup.key}.items.${item.key}.detail`
                                                                )}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Catalog Downloads ── */}
            <section className="section svc-catalogs-section">
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
                    <div className="svc-catalogs-grid reveal">
                        {activeCatalogs.map((catalog) => (
                            <a
                                key={catalog.key}
                                href={catalog.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="svc-catalog-card"
                            >
                                <div className="svc-catalog-icon">
                                    <FilePdfOutlined />
                                </div>
                                <div className="svc-catalog-body">
                                    <h4 className="svc-catalog-title">
                                        {t(`services.catalogs.items.${catalog.key}.title`)}
                                    </h4>
                                    <p className="svc-catalog-desc">
                                        {t(`services.catalogs.items.${catalog.key}.desc`)}
                                    </p>
                                    <span className="svc-catalog-meta">PDF · {catalog.size}</span>
                                </div>
                                <div className="svc-catalog-download">
                                    <DownloadOutlined />
                                    <span>{t('services.catalogs.downloadLabel')}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
