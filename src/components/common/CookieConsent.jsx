import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import LocalizedLink from './LocalizedLink';
import { loadAnalytics } from '../../utils/analytics';
import './CookieConsent.css';

const CONSENT_KEY = 'aquatic_cookie_consent';

/* KVKK-driven: analytics (GA4/Clarity) only ever loads after an explicit
   "accept" here — never on page load by default. A footer link dispatches
   'open-cookie-preferences' to let a visitor revisit their choice later.
   Anchored bottom-left (not full-width) so it never collides with the
   bottom-right WhatsApp button. */
const CookieConsent = () => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (stored === 'accepted') {
            loadAnalytics();
        } else if (stored !== 'rejected') {
            setVisible(true);
        }

        const openHandler = () => setVisible(true);
        window.addEventListener('open-cookie-preferences', openHandler);
        return () => window.removeEventListener('open-cookie-preferences', openHandler);
    }, []);

    const accept = () => {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        loadAnalytics();
        setVisible(false);
    };

    const reject = () => {
        localStorage.setItem(CONSENT_KEY, 'rejected');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="cookie-consent" role="dialog" aria-live="polite">
            <span className="cookie-consent-icon" aria-hidden="true">
                🍪
            </span>
            <p className="cookie-consent-text">
                {t('cookieConsent.text')}{' '}
                <LocalizedLink to="/privacy">{t('cookieConsent.link')}</LocalizedLink>
            </p>
            <div className="cookie-consent-actions">
                <Button block onClick={reject}>
                    {t('cookieConsent.reject')}
                </Button>
                <Button block type="primary" onClick={accept}>
                    {t('cookieConsent.accept')}
                </Button>
            </div>
        </div>
    );
};

export default CookieConsent;
