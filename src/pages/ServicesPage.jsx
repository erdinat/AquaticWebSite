import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import PageSEO from '../components/common/PageSEO';
import { Row, Col } from 'antd';
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
    ArrowRightOutlined,
    DashboardOutlined,
    DeploymentUnitOutlined,
    BulbOutlined,
} from '@ant-design/icons';
import imgHero from '../assets/images/hizmetler.webp';
import './ServicesPage.css';

import imgDefence from '../assets/images/savunmasanayi.webp';
import imgElectronics from '../assets/images/elektrik.webp';
import imgMachinery from '../assets/images/makina.webp';
import imgMaritime from '../assets/images/denizcilik.webp';

const ServicesPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('defence');

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        const validKeys = ['defence', 'electronics', 'machinery', 'maritime'];
        if (validKeys.includes(hash)) setActiveTab(hash);
    }, [location.hash]);

    useRevealAnimation();

    const iconMap = {
        underwater: <RadarChartOutlined />,
        acoustic: <AudioOutlined />,
        torpedo: <ApiOutlined />,
        transformer: <BuildOutlined />,
        pcb: <LayoutOutlined />,
        automation: <DashboardOutlined />,
        design3d: <ScissorOutlined />,
        cnc: <ControlOutlined />,
        welding: <DeploymentUnitOutlined />,
        pipe: <SettingOutlined />,
        shipMachine: <ToolOutlined />,
        shipElectrical: <BulbOutlined />,
    };

    const serviceGroups = [
        {
            key: 'defence',
            icon: <RocketOutlined />,
            color: '#0050b3',
            gradient: 'linear-gradient(135deg, #0050b3, #003a8c)',
            items: ['underwater', 'acoustic', 'torpedo'],
            image: imgDefence,
        },
        {
            key: 'electronics',
            icon: <ThunderboltOutlined />,
            color: '#0077b6',
            gradient: 'linear-gradient(135deg, #0077b6, #00b4d8)',
            items: ['transformer', 'pcb', 'automation'],
            image: imgElectronics,
        },
        {
            key: 'machinery',
            icon: <ToolOutlined />,
            color: '#005f73',
            gradient: 'linear-gradient(135deg, #005f73, #0a9396)',
            items: ['design3d', 'cnc', 'welding'],
            image: imgMachinery,
        },
        {
            key: 'maritime',
            icon: <CompassOutlined />,
            color: '#003a8c',
            gradient: 'linear-gradient(135deg, #003a8c, #0050b3)',
            items: ['pipe', 'shipMachine', 'shipElectrical'],
            image: imgMaritime,
        },
    ];

    const activeGroup = serviceGroups.find(g => g.key === activeTab);

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

                    {/* ── Tab Selector ── */}
                    <div className="svc-tab-selector reveal">
                        {serviceGroups.map(group => (
                            <button
                                key={group.key}
                                className={`svc-tab-btn${activeTab === group.key ? ' active' : ''}`}
                                style={{ '--tab-color': group.color }}
                                onClick={() => setActiveTab(group.key)}
                            >
                                <span className="svc-tab-icon">{group.icon}</span>
                                <span className="svc-tab-text">{t(`services.${group.key}.title`)}</span>
                            </button>
                        ))}
                    </div>

                    {/* ── Content Panel ── */}
                    {activeGroup && (
                        <div className="svc-content reveal">
                            <Row gutter={[40, 40]} align="stretch">

                                {/* Left: Info card */}
                                <Col xs={24} lg={10}>
                                    <div
                                        className="svc-info-panel"
                                        style={{ '--panel-color': activeGroup.color, '--panel-gradient': activeGroup.gradient }}
                                    >
                                        <div className="svc-info-image">
                                            <img src={activeGroup.image} alt={t(`services.${activeGroup.key}.title`)} loading="lazy" />
                                            <div className="svc-info-overlay" />
                                        </div>
                                        <div className="svc-info-body">
                                            <div className="svc-info-icon-badge">
                                                {activeGroup.icon}
                                            </div>
                                            <h3 className="svc-info-title">
                                                {t(`services.${activeGroup.key}.title`)}
                                            </h3>
                                            <p className="svc-info-desc">
                                                {t(`services.${activeGroup.key}.desc`)}
                                            </p>
                                            <button
                                                className="svc-info-cta"
                                                onClick={() => navigate('/contact')}
                                            >
                                                İletişime Geç <ArrowRightOutlined />
                                            </button>
                                        </div>
                                    </div>
                                </Col>

                                {/* Right: Service item rows */}
                                <Col xs={24} lg={14}>
                                    <div className="svc-items-list">
                                        {activeGroup.items.map((item, idx) => (
                                            <div
                                                className="svc-item-row"
                                                key={item}
                                                style={{
                                                    '--item-color': activeGroup.color,
                                                    animationDelay: `${idx * 0.08}s`,
                                                }}
                                            >
                                                <div className="svc-item-num">
                                                    {String(idx + 1).padStart(2, '0')}
                                                </div>
                                                <div className="svc-item-icon-box">
                                                    {iconMap[item]}
                                                </div>
                                                <div className="svc-item-body">
                                                    <h4 className="svc-item-title">
                                                        {t(`services.${activeGroup.key}.items.${item}.title`)}
                                                    </h4>
                                                    <p className="svc-item-desc">
                                                        {t(`services.${activeGroup.key}.items.${item}.desc`)}
                                                    </p>
                                                </div>
                                                <div className="svc-item-arrow">
                                                    <ArrowRightOutlined />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
