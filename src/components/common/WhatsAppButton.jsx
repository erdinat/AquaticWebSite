import React from 'react';
import { useTranslation } from 'react-i18next';
import { WhatsAppOutlined } from '@ant-design/icons';

const WHATSAPP_NUMBER = '905335581283'; // +90 533 558 12 83

const WhatsAppButton = () => {
    const { t } = useTranslation();
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('whatsapp.message'))}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float-btn"
            aria-label={t('whatsapp.ariaLabel')}
        >
            <WhatsAppOutlined />
        </a>
    );
};

export default WhatsAppButton;
