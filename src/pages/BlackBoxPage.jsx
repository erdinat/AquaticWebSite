import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Table, Button, Tag } from 'antd';
import {
    SafetyCertificateOutlined,
    FireOutlined,
    ExperimentOutlined,
    ThunderboltOutlined,
    ClockCircleOutlined,
    RadarChartOutlined,
    FileProtectOutlined,
    CheckCircleOutlined,
    ArrowRightOutlined,
} from '@ant-design/icons';
import './BlackBoxPage.css';

const BlackBoxPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    /* Reveal animations */
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

    /* Specs icon mapping */
    const specIcons = {
        temperature: <FireOutlined style={{ color: '#ff4d4f' }} />,
        pressure: <ExperimentOutlined style={{ color: '#0050b3' }} />,
        impact: <ThunderboltOutlined style={{ color: '#faad14' }} />,
        recording: <ClockCircleOutlined style={{ color: '#52c41a' }} />,
        beacon: <RadarChartOutlined style={{ color: '#1890ff' }} />,
        standard: <FileProtectOutlined style={{ color: '#722ed1' }} />,
    };

    /* Table data for specs */
    const specKeys = ['temperature', 'pressure', 'impact', 'recording', 'beacon', 'standard'];
    const tableData = specKeys.map((key, index) => ({
        key: index,
        icon: specIcons[key],
        spec: t(`blackbox.specs.${key}.label`),
        value: t(`blackbox.specs.${key}.value`),
        description: t(`blackbox.specs.${key}.desc`),
    }));

    const columns = [
        {
            title: '',
            dataIndex: 'icon',
            key: 'icon',
            width: 50,
            render: (icon) => <span style={{ fontSize: 20 }}>{icon}</span>,
        },
        {
            title: t('blackbox.specTitle'),
            dataIndex: 'spec',
            key: 'spec',
            render: (text) => <span style={{ fontWeight: 600, color: 'var(--color-dark)' }}>{text}</span>,
        },
        {
            title: '',
            dataIndex: 'value',
            key: 'value',
            render: (text) => (
                <Tag
                    color="blue"
                    style={{
                        fontSize: 14,
                        padding: '4px 16px',
                        fontWeight: 700,
                        borderRadius: 6,
                    }}
                >
                    {text}
                </Tag>
            ),
        },
        {
            title: '',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <span style={{ color: 'var(--color-text-secondary)' }}>{text}</span>,
        },
    ];

    /* Features list */
    const features = t('blackbox.features.list', { returnObjects: true }) || [];

    return (
        <div className="blackbox-page">
            {/* Page Hero - Special showcase style */}
            <section className="blackbox-hero">
                <div className="blackbox-hero-bg" />
                <div className="blackbox-hero-glow" />
                <div className="container blackbox-hero-content">
                    <div className="blackbox-badge animate-fadeInDown">
                        <SafetyCertificateOutlined /> {t('blackbox.subtitle')}
                    </div>
                    <h1 className="blackbox-hero-title animate-fadeInUp delay-1">
                        {t('blackbox.title')}
                    </h1>
                    <p className="blackbox-hero-subtitle animate-fadeInUp delay-2">
                        {t('blackbox.description')}
                    </p>
                </div>

                {/* 3D-like black box visualization */}
                <div className="blackbox-visual animate-scaleIn delay-3">
                    <div className="blackbox-3d">
                        <div className="blackbox-face front">
                            <div className="blackbox-label">AQUATIC</div>
                            <div className="blackbox-sublabel">FDR / CVR</div>
                        </div>
                        <div className="blackbox-face top" />
                        <div className="blackbox-face right" />
                    </div>
                </div>
            </section>

            {/* Specs Table Section */}
            <section className="section blackbox-specs-section">
                <div className="container">
                    <h2 className="section-title reveal">{t('blackbox.specTitle')}</h2>
                    <p className="section-subtitle reveal">
                        {t('blackbox.description')}
                    </p>
                    <div className="specs-table-wrapper reveal">
                        <Table
                            columns={columns}
                            dataSource={tableData}
                            pagination={false}
                            showHeader={false}
                            className="specs-table"
                            size="large"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section features-section">
                <div className="container">
                    <Row gutter={[48, 32]} align="middle">
                        <Col xs={24} md={12}>
                            <h2 className="content-title reveal">{t('blackbox.features.title')}</h2>
                            <ul className="features-list">
                                {features.map((feature, index) => (
                                    <li key={index} className="feature-item reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <CheckCircleOutlined style={{ color: 'var(--color-primary)', fontSize: 18 }} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col xs={24} md={12}>
                            <div className="specs-highlight-grid reveal">
                                {specKeys.slice(0, 4).map((key) => (
                                    <div className="spec-highlight-card" key={key}>
                                        <div className="spec-highlight-icon">{specIcons[key]}</div>
                                        <div className="spec-highlight-value">{t(`blackbox.specs.${key}.value`)}</div>
                                        <div className="spec-highlight-label">{t(`blackbox.specs.${key}.label`)}</div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* CTA */}
            <section className="blackbox-cta-section">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="cta-title reveal">{t('blackbox.cta')}</h2>
                    <div className="reveal" style={{ animationDelay: '0.2s' }}>
                        <Button
                            type="primary"
                            size="large"
                            icon={<ArrowRightOutlined />}
                            onClick={() => navigate('/contact')}
                        >
                            {t('hero.ctaContact')}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlackBoxPage;
