import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import PageSEO from '../components/common/PageSEO';
import LocalizedLink from '../components/common/LocalizedLink';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import { SERVICE_GROUPS } from '../data/serviceGroups';
import { DETAIL_DATA } from '../data/serviceDetailContent';
import './ServiceCategoryPage.css';

const ServiceCategoryPage = () => {
    const { categoryKey } = useParams();
    const { t } = useTranslation();
    const navigate = useLocalizedNavigate();
    const [missingPhotos, setMissingPhotos] = useState({});

    useRevealAnimation();

    const group = SERVICE_GROUPS.find((g) => g.key === categoryKey);

    if (!group) {
        return (
            <div className="service-category-page">
                <div className="container" style={{ padding: '160px 0 100px', textAlign: 'center' }}>
                    <p>{t('notFound.title', 'Page not found')}</p>
                    <LocalizedLink to="/services">
                        {t('services.serviceDetail.backToServices')}
                    </LocalizedLink>
                </div>
            </div>
        );
    }

    return (
        <div className="service-category-page">
            <PageSEO
                titleKey={`services.${group.key}.title`}
                descriptionKey={`services.${group.key}.desc`}
                path={`/services/category/${group.key}`}
            />

            <div className="container">
                {/* ── Category header banner ── */}
                <div className="scp-banner reveal" style={{ '--scp-color': group.color }}>
                    <div className="scp-banner-left">
                        <span className="scp-banner-icon">{group.icon}</span>
                        <div className="scp-banner-text">
                            <h1 className="scp-banner-title">{t(`services.${group.key}.title`)}</h1>
                            <p className="scp-banner-desc">{t(`services.${group.key}.desc`)}</p>
                        </div>
                    </div>
                    <button className="scp-banner-cta" onClick={() => navigate('/contact')}>
                        {t('hero.ctaContact')} <ArrowRightOutlined />
                    </button>
                </div>

                {/* ── Sub-services grid — flat color is now only a fallback for a
                    genuinely missing/broken photo, not a forced design rhythm;
                    all 27 items have real photos as of the latest image batch. ── */}
                <div className="scp-grid">
                    {group.items.map((item, idx) => {
                        const heroImage = DETAIL_DATA[item.slug]?.heroImage;
                        const isFlat = !heroImage || missingPhotos[item.slug];
                        return (
                            <button
                                key={item.key}
                                className={`scp-card${isFlat ? ' scp-card--flat' : ''} reveal`}
                                style={{
                                    '--scp-color': group.color,
                                    animationDelay: `${idx * 0.06}s`,
                                }}
                                onClick={() => navigate(`/services/${item.slug}`)}
                            >
                                {!isFlat && (
                                    <>
                                        <img
                                            className="scp-card-img"
                                            src={heroImage}
                                            alt=""
                                            loading="lazy"
                                            onError={() =>
                                                setMissingPhotos((prev) => ({
                                                    ...prev,
                                                    [item.slug]: true,
                                                }))
                                            }
                                        />
                                        <span className="scp-card-overlay" aria-hidden="true" />
                                    </>
                                )}
                                <div className="scp-card-body">
                                    <h3 className="scp-card-title">
                                        {t(`services.${group.key}.items.${item.key}.title`)}
                                    </h3>
                                    <p className="scp-card-desc">
                                        {t(`services.${group.key}.items.${item.key}.desc`)}
                                    </p>
                                    <span className="scp-card-btn">
                                        {t('services.viewLabel')} <ArrowRightOutlined />
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ServiceCategoryPage;
