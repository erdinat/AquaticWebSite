import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BackgroundParticles from '../components/BackgroundParticles';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card, Timeline, Collapse } from 'antd';
import {
    BulbOutlined,
    SafetyCertificateOutlined,
    TeamOutlined,
    GlobalOutlined,
    HistoryOutlined,
    EyeOutlined,
    AimOutlined,
    TrophyOutlined,
    ClockCircleOutlined,
    BankOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import imgHero from '../assets/images/kurumsal.webp';
import './CorporatePage.css';

const CorporatePage = () => {
    const { t } = useTranslation();
    const location = useLocation();

    /* Scroll-triggered reveal animations */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);



    /* Scroll to section based on hash (from header dropdown) */
    useEffect(() => {
        if (!location.hash) return;
        const map = {
            '#hakkimizda': 'corp-history',
            '#misyonumuz': 'corp-vision',
            '#sikca-sorulan-sorular': 'corp-bank-faq',
            '#banka-hesaplari': 'corp-bank-faq',
        };
        const targetId = map[location.hash];
        if (!targetId) return;
        const el = document.getElementById(targetId);
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 0);
        }
    }, [location]);

    return (
        <div className="corporate-page">
            {/* Page Hero - Premium Look */}
            <section className="page-hero">
                <div className="page-hero-bg" />
                <BackgroundParticles count={15} />
                <div
                    className="page-hero-overlay"
                    style={{ backgroundImage: `url(${imgHero})` }}
                />
                <div className="page-hero-glow" />
                <div className="container page-hero-content">
                    <h1 className="page-hero-title animate-fadeInUp">{t('corporate.title')}</h1>
                    <p className="page-hero-subtitle animate-fadeInUp delay-1">{t('corporate.subtitle')}</p>
                </div>
                <div className="page-hero-wave" />
            </section>

            {/* ===== ABOUT HISTORY ===== */}
            <section id="corp-history" className="section bg-white">
                <div className="container">
                    <Row gutter={[64, 40]} align="middle">
                        <Col xs={24} lg={12} className="reveal">
                            <span className="section-label"><HistoryOutlined /> {t('corporate.history.title')}</span>
                            <h2 className="content-title" style={{ fontSize: '2.4rem', lineHeight: '1.2' }}>{t('corporate.history.subtitle')}</h2>
                            <p className="content-text" style={{ fontSize: '1.1rem', marginBottom: 24 }}>
                                {t('corporate.history.p1')}
                            </p>
                            <p className="content-text">
                                {t('corporate.history.p2')}
                            </p>
                            <div className="premium-stats-row">
                                <div className="premium-stat-item">
                                    <span className="stat-num">2019</span>
                                    <span className="stat-label">{t('corporate.history.founded')}</span>
                                </div>
                                <div className="premium-stat-item">
                                    <span className="stat-num">50+</span>
                                    <span className="stat-label">{t('corporate.history.projects')}</span>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} lg={12} className="reveal delay-1">
                            <div className="premium-timeline-wrapper">
                                <Timeline
                                    mode="alternate"
                                    items={['2019', '2020', '2021', '2022', '2023', '2024', '2025'].map((year, index, arr) => ({
                                        color: index === arr.length - 1 ? 'var(--color-primary)' : 'var(--color-border)',
                                        dot: <div className={`timeline-dot ${index === arr.length - 1 ? 'active' : ''}`} />,
                                        children: (
                                            <div className="premium-timeline-card">
                                                <h4 className="timeline-year">{year}</h4>
                                                <p className="timeline-text">{t(`corporate.history.timeline.${year}`)}</p>
                                            </div>
                                        ),
                                    }))}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* ===== VISION & MISSION ===== */}
            <section id="corp-vision" className="section vision-mission-section">
                <div className="container">
                    <div className="section-header-split reveal">
                        <div className="header-split-left">
                            <span className="section-label"><AimOutlined /> {t('corporate.visionMission.title')}</span>
                            <h2 className="content-title" style={{ textAlign: 'left', marginBottom: 8 }}>{t('corporate.visionMission.subtitle')}</h2>
                            <p className="content-text" style={{ textAlign: 'left', margin: 0, maxWidth: 600 }}>
                                {t('corporate.visionMission.desc')}
                            </p>
                        </div>
                    </div>

                    <Row gutter={[32, 32]} className="reveal">
                        <Col xs={24} md={12}>
                            <div className="premium-vm-card">
                                <div className="vm-icon-wrapper" style={{ background: 'var(--gradient-primary)' }}>
                                    <EyeOutlined />
                                </div>
                                <h3 className="vm-premium-title">{t('corporate.visionMission.visionTitle')}</h3>
                                <p className="vm-premium-text">{t('corporate.visionMission.visionText')}</p>
                            </div>
                        </Col>
                        <Col xs={24} md={12}>
                            <div className="premium-vm-card">
                                <div className="vm-icon-wrapper" style={{ background: 'var(--gradient-dark)' }}>
                                    <AimOutlined />
                                </div>
                                <h3 className="vm-premium-title">{t('corporate.visionMission.missionTitle')}</h3>
                                <p className="vm-premium-text">{t('corporate.visionMission.missionText')}</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* ===== QUALITY VALUES ===== */}
            <section className="section bg-white">
                <div className="container">
                    <div className="section-header-split reveal">
                        <div className="header-split-left">
                            <span className="section-label"><TrophyOutlined /> {t('corporate.values.title')}</span>
                            <h2 className="content-title" style={{ textAlign: 'left', marginBottom: 8 }}>{t('corporate.values.subtitle')}</h2>
                        </div>
                    </div>
                    <Row gutter={[24, 24]}>
                        {[
                            {
                                icon: <BulbOutlined />,
                                title: t('corporate.values.innovation'),
                                desc: t('corporate.values.innovationDesc'),
                                color: '#005f73',
                            },
                            {
                                icon: <SafetyCertificateOutlined />,
                                title: t('corporate.values.reliability'),
                                desc: t('corporate.values.reliabilityDesc'),
                                color: '#0a9396',
                            },
                            {
                                icon: <TeamOutlined />,
                                title: t('corporate.values.expertise'),
                                desc: t('corporate.values.expertiseDesc'),
                                color: '#94d2bd',
                            },
                            {
                                icon: <GlobalOutlined />,
                                title: t('corporate.values.sustainability'),
                                desc: t('corporate.values.sustainabilityDesc'),
                                color: '#001219',
                            },
                        ].map((val, idx) => (
                            <Col xs={24} sm={12} lg={6} key={idx}>
                                <div
                                    className="premium-value-card reveal"
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className="value-icon-floating" style={{ color: val.color, background: `${val.color}15` }}>
                                        {val.icon}
                                    </div>
                                    <h4 className="value-premium-title">{val.title}</h4>
                                    <p className="value-premium-desc">{val.desc}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* Bank Accounts & FAQ */}
            <section className="section" id="corp-bank-faq" style={{ background: 'var(--color-bg-light)' }}>
                <div className="container">
                    <Row gutter={[32, 32]}>
                        {/* Bank accounts */}
                        <Col span={24}>
                            <div className="reveal">
                                <div className="section-label">
                                    <BankOutlined /> {t('corporate.bank.title')}
                                </div>
                                <h2 className="content-title">{t('corporate.bank.subtitle')}</h2>
                                <p className="content-text" style={{ marginBottom: 24 }}>
                                    {t('corporate.bank.desc')}
                                </p>
                                <div className="bank-card glass-card">
                                    <h4 className="bank-title">{t('corporate.bank.tlAccount')}</h4>
                                    <p className="bank-text">
                                        KUVEYT TÜRK TL, AQUATIC ELEKTRONİK MAKİNA OTOMASYON SAVUNMA SANAYİ TİC. LTD. ŞTİ.<br />
                                        <span className="bank-label">IBAN:</span> <span className="bank-iban">TR00 0000 0000 0000 0000 0000 00</span><br />
                                        <span className="bank-label">{t('corporate.bank.branchCode')}:</span> 0000 / <span className="bank-label">{t('corporate.bank.branchName')}:</span> GÖLCÜK / KOCAELİ
                                    </p>
                                </div>
                                <div className="bank-card glass-card">
                                    <h4 className="bank-title">{t('corporate.bank.eurAccount')}</h4>
                                    <p className="bank-text">
                                        KUVEYT TÜRK EURO, AQUATIC ELEKTRONİK MAKİNA OTOMASYON SAVUNMA SANAYİ TİC. LTD. ŞTİ.<br />
                                        <span className="bank-label">IBAN:</span> <span className="bank-iban">TR00 0000 0000 0000 0000 0000 00</span><br />
                                        <span className="bank-label">{t('corporate.bank.branchCode')}:</span> 0000 / <span className="bank-label">{t('corporate.bank.branchName')}:</span> GÖLCÜK / KOCAELİ
                                    </p>
                                </div>
                                <div className="bank-card glass-card">
                                    <h4 className="bank-title">{t('corporate.bank.usdAccount')}</h4>
                                    <p className="bank-text">
                                        KUVEYT TÜRK USD, AQUATIC ELEKTRONİK MAKİNA OTOMASYON SAVUNMA SANAYİ TİC. LTD. ŞTİ.<br />
                                        <span className="bank-label">IBAN:</span> <span className="bank-iban">TR00 0000 0000 0000 0000 0000 00</span><br />
                                        <span className="bank-label">{t('corporate.bank.branchCode')}:</span> 0000 / <span className="bank-label">{t('corporate.bank.branchName')}:</span> GÖLCÜK / KOCAELİ
                                    </p>
                                </div>
                            </div>
                        </Col>

                        {/* FAQ */}
                        <Col span={24}>
                            <div className="reveal" style={{ animationDelay: '0.2s' }}>
                                <div className="section-label">
                                    <QuestionCircleOutlined /> {t('corporate.faq.title')}
                                </div>
                                <h2 className="content-title">{t('corporate.faq.subtitle')}</h2>
                                <p className="content-text" style={{ marginBottom: 24 }}>
                                    {t('corporate.faq.desc')}
                                </p>
                                <Collapse
                                    accordion
                                    className="faq-collapse"
                                    items={['1', '2', '3', '4'].map((key) => ({
                                        key: key,
                                        label: t(`corporate.faq.items.${key}.question`),
                                        children: <p className="faq-answer">{t(`corporate.faq.items.${key}.answer`)}</p>,
                                    }))}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    );
};

export default CorporatePage;
