import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Row, Col, Space, Divider } from 'antd';
import {
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    RightOutlined,
} from '@ant-design/icons';
import AquaticLogo from '../../assets/images/logo.png';

const AppFooter = () => {
    const { t } = useTranslation();

    const quickLinks = [
        { label: t('nav.home'), path: '/' },
        { label: t('nav.corporate'), path: '/corporate' },
        { label: t('nav.services'), path: '/services' },
        { label: t('nav.blackbox'), path: '/blackbox' },
        { label: t('nav.contact'), path: '/contact' },
    ];

    return (
        <footer className="app-footer">
            <div className="container">
                <Row gutter={[48, 48]}>
                    {/* Brand Column */}
                    <Col xs={24} sm={24} md={8}>
                        <div style={{ marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                                <img
                                    src={AquaticLogo}
                                    alt="Aquatic Logo"
                                    style={{
                                        height: 40,
                                        objectFit: 'contain',
                                        filter: 'brightness(0) invert(1)',
                                    }}
                                />
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontSize: 14 }}>
                                {t('footer.description')}
                            </p>
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col xs={24} sm={12} md={8}>
                        <h4
                            style={{
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: 600,
                                marginBottom: 24,
                                fontFamily: 'var(--font-display)',
                            }}
                        >
                            {t('footer.quickLinks')}
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {quickLinks.map((link) => (
                                <li key={link.path} style={{ marginBottom: 12 }}>
                                    <Link
                                        to={link.path}
                                        style={{
                                            color: 'rgba(255,255,255,0.7)',
                                            textDecoration: 'none',
                                            fontSize: 14,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        <RightOutlined style={{ fontSize: 10 }} />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    {/* Contact Info */}
                    <Col xs={24} sm={12} md={8}>
                        <h4
                            style={{
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: 600,
                                marginBottom: 24,
                                fontFamily: 'var(--font-display)',
                            }}
                        >
                            {t('footer.contactInfo')}
                        </h4>
                        <Space direction="vertical" size={16}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
                                <EnvironmentOutlined style={{ marginTop: 3, color: 'var(--color-accent-light)' }} />
                                <span>{t('footer.address')}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
                                <PhoneOutlined style={{ color: 'var(--color-accent-light)' }} />
                                <span>+90 262 412 24 42</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
                                <MailOutlined style={{ color: 'var(--color-accent-light)' }} />
                                <span>bilgi@aquatic.com.tr</span>
                            </div>
                        </Space>
                    </Col>
                </Row>

                <Divider style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '40px 0 20px' }} />

                {/* Copyright */}
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
                    © {new Date().getFullYear()} Aquatic. {t('footer.rights')}
                </div>
            </div>
        </footer>
    );
};

export default AppFooter;
