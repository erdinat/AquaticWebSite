import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import PageSEO from '../components/common/PageSEO';
import { Row, Col, Timeline, Collapse } from 'antd';
import {
    BulbOutlined,
    SafetyCertificateOutlined,
    TeamOutlined,
    GlobalOutlined,
    HistoryOutlined,
    EyeOutlined,
    AimOutlined,
    TrophyOutlined,
    BankOutlined,
    QuestionCircleOutlined,
    CopyOutlined,
    CheckOutlined,
    PlusOutlined,
    MinusOutlined,
} from '@ant-design/icons';
import imgHero from '../assets/images/kurumsal.webp';
import './CorporatePage.css';

const CorporatePage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [copiedIban, setCopiedIban] = useState(null);

    const copyIban = async (iban, id) => {
        try {
            await navigator.clipboard.writeText(iban.replace(/\s/g, ''));
            setCopiedIban(id);
            setTimeout(() => setCopiedIban(null), 2000);
        } catch {
            // Clipboard API not available (e.g. HTTP context)
        }
    };

    const bankAccounts = [
        {
            id: 'tl',
            currency: '₺',
            currencyLabel: t('corporate.bank.tlAccount'),
            bank: 'KUVEYT TÜRK',
            iban: 'TR00 0000 0000 0000 0000 0000 00',
            branchCode: '0000',
            branchName: 'GÖLCÜK / KOCAELİ',
            color: '#0050b3',
        },
        {
            id: 'eur',
            currency: '€',
            currencyLabel: t('corporate.bank.eurAccount'),
            bank: 'KUVEYT TÜRK',
            iban: 'TR00 0000 0000 0000 0000 0000 00',
            branchCode: '0000',
            branchName: 'GÖLCÜK / KOCAELİ',
            color: '#003a8c',
        },
        {
            id: 'usd',
            currency: '$',
            currencyLabel: t('corporate.bank.usdAccount'),
            bank: 'KUVEYT TÜRK',
            iban: 'TR00 0000 0000 0000 0000 0000 00',
            branchCode: '0000',
            branchName: 'GÖLCÜK / KOCAELİ',
            color: '#0077b6',
        },
    ];

    /* Scroll-triggered reveal animations */
    useRevealAnimation();

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
            <PageSEO
                titleKey="nav.corporate"
                descriptionKey="corporate.subtitle"
                path="/corporate"
            />
            <PageHero 
                title={t('corporate.title')} 
                subtitle={t('corporate.subtitle')} 
                bgImage={imgHero} 
            />

            {/* ===== ABOUT HISTORY ===== */}
            <section id="corp-history" className="section">
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
            <section id="corp-values" className="section">
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

            {/* ===== BANK ACCOUNTS ===== */}
            <section className="section bank-section" id="corp-bank-faq">
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
                        <span className="section-label"><BankOutlined /> {t('corporate.bank.title')}</span>
                        <h2 className="content-title" style={{ marginTop: 16 }}>{t('corporate.bank.subtitle')}</h2>
                        <p className="content-text" style={{ maxWidth: 560, margin: '0 auto' }}>
                            {t('corporate.bank.desc')}
                        </p>
                    </div>
                    <Row gutter={[24, 24]}>
                        {bankAccounts.map((acc, idx) => (
                            <Col xs={24} md={8} key={acc.id}>
                                <div className="bank-card-premium reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
                                    <div className="bank-card-header" style={{ background: acc.color }}>
                                        <div className="bank-currency-circle">{acc.currency}</div>
                                        <div>
                                            <div className="bank-currency-name">{acc.currencyLabel}</div>
                                            <div className="bank-name-text">{acc.bank}</div>
                                        </div>
                                    </div>
                                    <div className="bank-card-body">
                                        <p className="bank-company-name">
                                            AQUATİC ELEKTRONİK MAKİNA OTOMASYON SAVUNMA SANAYİ TİC. LTD. ŞTİ.
                                        </p>
                                        <div className="bank-iban-label">IBAN</div>
                                        <div className="bank-iban-row">
                                            <span className="bank-iban-number">{acc.iban}</span>
                                            <button
                                                className={`bank-copy-btn${copiedIban === acc.id ? ' copied' : ''}`}
                                                onClick={() => copyIban(acc.iban, acc.id)}
                                                title="IBAN Kopyala"
                                                aria-label="IBAN Kopyala"
                                            >
                                                {copiedIban === acc.id ? <CheckOutlined /> : <CopyOutlined />}
                                            </button>
                                        </div>
                                        {copiedIban === acc.id && (
                                            <p className="bank-copy-feedback">Kopyalandı!</p>
                                        )}
                                        <div className="bank-branch-row">
                                            <span>{t('corporate.bank.branchCode')}: <strong>{acc.branchCode}</strong></span>
                                            <span className="bank-dot">•</span>
                                            <span>{acc.branchName}</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* ===== FAQ ===== */}
            <section id="corp-faq" className="section faq-section">
                <div className="container">
                    <Row gutter={[64, 40]} align="top">
                        <Col xs={24} lg={8} className="reveal">
                            <span className="section-label"><QuestionCircleOutlined /> {t('corporate.faq.title')}</span>
                            <h2 className="content-title" style={{ marginTop: 16, textAlign: 'left' }}>
                                {t('corporate.faq.subtitle')}
                            </h2>
                            <p className="content-text">{t('corporate.faq.desc')}</p>
                        </Col>
                        <Col xs={24} lg={16} className="reveal" style={{ animationDelay: '0.15s' }}>
                            <Collapse
                                accordion
                                className="faq-collapse"
                                expandIcon={({ isActive }) =>
                                    isActive ? <MinusOutlined className="faq-expand-icon" /> : <PlusOutlined className="faq-expand-icon" />
                                }
                                expandIconPosition="end"
                                items={['1', '2', '3', '4'].map((key) => ({
                                    key,
                                    label: (
                                        <span className="faq-question">
                                            <span className="faq-num">{key.padStart(2, '0')}</span>
                                            {t(`corporate.faq.items.${key}.question`)}
                                        </span>
                                    ),
                                    children: (
                                        <p className="faq-answer">{t(`corporate.faq.items.${key}.answer`)}</p>
                                    ),
                                }))}
                            />
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    );
};

export default CorporatePage;
