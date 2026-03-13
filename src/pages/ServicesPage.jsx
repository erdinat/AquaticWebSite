import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BackgroundParticles from '../components/BackgroundParticles';
import { Tabs, Row, Col, Card } from 'antd';
import {
    RocketOutlined,
    ThunderboltOutlined,
    ToolOutlined,
    CompassOutlined,
    RadarChartOutlined,
    AudioOutlined,
    ApiOutlined,
    BuildOutlined,
    LayoutOutlined,
    ScissorOutlined,
    ControlOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import imgHero from '../assets/images/hizmetler.png';
import './ServicesPage.css';

/* Real images from aquatic.com.tr */
import imgDefence from '../assets/images/service-divers.jpg';
import imgElectronics from '../assets/images/service-cable.jpg';
import imgMachinery from '../assets/images/service-underwater.jpg';
import imgMaritime from '../assets/images/slider1.jpg';

const ServicesPage = () => {
    const { t } = useTranslation();

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

    /* Service item icons */
    const iconMap = {
        underwater: <RadarChartOutlined />,
        acoustic: <AudioOutlined />,
        torpedo: <ApiOutlined />,
        transformer: <BuildOutlined />,
        pcb: <LayoutOutlined />,
        design3d: <ScissorOutlined />,
        cnc: <ControlOutlined />,
        pipe: <SettingOutlined />,
        shipMachine: <ToolOutlined />,
    };

    /* Tab data for 4 service groups */
    const serviceGroups = [
        {
            key: 'defence',
            icon: <RocketOutlined />,
            color: '#0050b3',
            items: ['underwater', 'acoustic', 'torpedo'],
            image: imgDefence,
        },
        {
            key: 'electronics',
            icon: <ThunderboltOutlined />,
            color: '#00b4d8',
            items: ['transformer', 'pcb'],
            image: imgElectronics,
        },
        {
            key: 'machinery',
            icon: <ToolOutlined />,
            color: '#0077b6',
            items: ['design3d', 'cnc'],
            image: imgMachinery,
        },
        {
            key: 'maritime',
            icon: <CompassOutlined />,
            color: '#003a8c',
            items: ['pipe', 'shipMachine'],
            image: imgMaritime,
        },
    ];

    const tabItems = serviceGroups.map((group) => ({
        key: group.key,
        label: (
            <span className="service-tab-label">
                {group.icon} {t(`services.${group.key}.title`)}
            </span>
        ),
        children: (
            <div className="service-tab-content">
                {/* Banner image */}
                <div className="service-group-banner">
                    <img src={group.image} alt={t(`services.${group.key}.title`)} />
                    <div className="service-group-banner-overlay" style={{ background: `linear-gradient(135deg, ${group.color}CC, ${group.color}88)` }}>
                        <div className="service-group-icon">
                            {group.icon}
                        </div>
                        <h3 className="service-group-title">{t(`services.${group.key}.title`)}</h3>
                        <p className="service-group-desc">{t(`services.${group.key}.desc`)}</p>
                    </div>
                </div>

                {/* Service items */}
                <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
                    {group.items.map((item, idx) => (
                        <Col xs={24} sm={12} md={8} key={item}>
                            <Card
                                className="service-item-card"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                                hoverable
                            >
                                <div className="service-item-icon" style={{ color: group.color }}>
                                    {iconMap[item]}
                                </div>
                                <h4 className="service-item-title">
                                    {t(`services.${group.key}.items.${item}.title`)}
                                </h4>
                                <p className="service-item-desc">
                                    {t(`services.${group.key}.items.${item}.desc`)}
                                </p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        ),
    }));

    return (
        <div className="services-page">
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
                    <h1 className="page-hero-title animate-fadeInUp">{t('services.title')}</h1>
                    <p className="page-hero-subtitle animate-fadeInUp delay-1">{t('services.subtitle')}</p>
                </div>
                <div className="page-hero-wave" />
            </section>

            {/* Services Tabs */}
            <section className="section services-tabs-section">
                <div className="container">
                    <Tabs
                        defaultActiveKey="defence"
                        items={tabItems}
                        size="large"
                        centered
                        animated={{ inkBar: true, tabPane: true }}
                        className="services-tabs"
                    />
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
