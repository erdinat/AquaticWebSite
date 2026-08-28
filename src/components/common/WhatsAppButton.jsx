import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WhatsAppOutlined, CloseOutlined } from '@ant-design/icons';

const WHATSAPP_NUMBER = '905335581283'; // +90 533 558 12 83

const WhatsAppButton = () => {
    const { t } = useTranslation();
    const [dismissed, setDismissed] = useState(false);
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('whatsapp.message'))}`;

    return (
        <div className="whatsapp-widget">
            {!dismissed && (
                <div className="whatsapp-bubble">
                    <button
                        type="button"
                        className="whatsapp-bubble-close"
                        aria-label={t('whatsapp.dismiss')}
                        onClick={() => setDismissed(true)}
                    >
                        <CloseOutlined />
                    </button>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                        {t('whatsapp.greeting')}
                    </a>
                </div>
            )}
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-float-btn"
                aria-label={t('whatsapp.ariaLabel')}
            >
                <WhatsAppOutlined />
            </a>
        </div>
    );
};

export default WhatsAppButton;
