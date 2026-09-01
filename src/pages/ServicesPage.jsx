import { useTranslation } from 'react-i18next';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import PageHero from '../components/common/PageHero';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import PageSEO from '../components/common/PageSEO';
import { ArrowRightOutlined } from '@ant-design/icons';
import imgHero from '../assets/images/hizmetler.webp';
import { getActiveServiceGroups } from '../data/serviceGroups';
import { isKzDomain } from '../i18n/langRouting';
import './ServicesPage.css';

const ServicesPage = () => {
    const { t } = useTranslation();
    const navigate = useLocalizedNavigate();

    useRevealAnimation();

    const serviceGroups = getActiveServiceGroups();
    /* .svc-category-grid's bento layout (nth-child(1)/(6) tall bookends) is
       hard-coded for exactly 6 cards — on aquatic.kz there are only 4, so it
       renders lopsided. This modifier swaps in a plain, equal 2-up grid. */
    const isKzGrid = isKzDomain();

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
                    <div
                        className={`svc-category-grid reveal${isKzGrid ? ' svc-category-grid--kz' : ''}`}
                    >
                        {serviceGroups.map((group) => (
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
                                        {t(group.titleKey || `services.${group.key}.title`)}
                                    </span>
                                    <span className="svc-category-card-desc">
                                        {t(group.descKey || `services.${group.key}.desc`)}
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
        </div>
    );
};

export default ServicesPage;
