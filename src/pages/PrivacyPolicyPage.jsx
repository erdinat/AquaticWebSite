import { useTranslation } from 'react-i18next';
import PageHero from '../components/common/PageHero';
import PageSEO from '../components/common/PageSEO';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import './PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
    const { t } = useTranslation();
    useRevealAnimation();

    const sections = t('privacyPolicy.sections', { returnObjects: true });

    return (
        <div className="privacy-policy-page">
            <PageSEO
                titleKey="privacyPolicy.title"
                descriptionKey="privacyPolicy.subtitle"
                path="/privacy"
            />
            <PageHero title={t('privacyPolicy.title')} subtitle={t('privacyPolicy.subtitle')} />

            <section className="section">
                <div className="container privacy-policy-content">
                    <p className="privacy-policy-updated reveal">
                        {t('privacyPolicy.updatedLabel')}: {t('privacyPolicy.updatedDate')}
                    </p>
                    {Array.isArray(sections) &&
                        sections.map((s, idx) => (
                            <div className="privacy-policy-section reveal" key={idx}>
                                <h2>{s.title}</h2>
                                <p>{s.body}</p>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;
