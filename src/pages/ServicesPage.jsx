import { useTranslation } from 'react-i18next';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import PageHero from '../components/common/PageHero';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import PageSEO from '../components/common/PageSEO';
import { ArrowRightOutlined, FilePdfOutlined, DownloadOutlined } from '@ant-design/icons';
import imgHero from '../assets/images/hizmetler.webp';
import { SERVICE_GROUPS } from '../data/serviceGroups';
import './ServicesPage.css';

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
    const navigate = useLocalizedNavigate();

    const activeCatalogs = i18n.language === 'tr' ? CATALOGS.tr : CATALOGS.other;

    useRevealAnimation();

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
                    {/* ── Category Grid — each card routes to its own Category Detail page ── */}
                    <div className="svc-category-grid reveal">
                        {SERVICE_GROUPS.map((group) => (
                            <button
                                key={group.key}
                                className="svc-category-card"
                                style={{
                                    backgroundImage: `url(${group.image})`,
                                    '--card-color': group.color,
                                }}
                                onClick={() => navigate(`/services/category/${group.key}`)}
                            >
                                <span className="svc-category-card-overlay" aria-hidden="true" />
                                <span className="svc-category-card-icon">{group.icon}</span>
                                <span className="svc-category-card-body">
                                    <span className="svc-category-card-title">
                                        {t(`services.${group.key}.title`)}
                                    </span>
                                    <span className="svc-category-card-desc">
                                        {t(`services.${group.key}.desc`)}
                                    </span>
                                    <span className="svc-category-card-btn">
                                        {t('services.viewLabel')} <ArrowRightOutlined />
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
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
