import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BackgroundParticles from '../components/BackgroundParticles';
import { Row, Col, Form, Input, Button, Card, message } from 'antd';
import {
    SendOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import imgHero from '../assets/images/iletisim.webp';
import './ContactPage.css';

const { TextArea } = Input;

/**
 * ContactPage
 * Features a contact form (EmailJS-ready) and two location cards.
 * To activate EmailJS, replace the placeholder constants below.
 */

/* EmailJS Configuration */
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactPage = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

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

    /* Form submit handler */
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // EmailJS integration - Active
            const emailjs = await import('@emailjs/browser');
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                from_name: values.name,
                from_email: values.email,
                phone: values.phone,
                subject: values.subject,
                message: values.message,
            }, EMAILJS_PUBLIC_KEY);

            message.success(t('contact.success'));
            form.resetFields();
        } catch (error) {
            message.error(t('contact.error'));
        } finally {
            setLoading(false);
        }
    };

    /* Location data */
    const locations = [
        {
            key: 'kocaeli',
            icon: '🏢',
            title: t('contact.kocaeli.title'),
            address: t('contact.kocaeli.address'),
            phone: t('contact.kocaeli.phone'),
            email: t('contact.kocaeli.email'),
        },
        {
            key: 'istanbul',
            icon: '🏙️',
            title: t('contact.istanbul.title'),
            address: t('contact.istanbul.address'),
            phone: t('contact.istanbul.phone'),
            email: t('contact.istanbul.email'),
        },
        {
            key: 'almaty',
            icon: '🏔️',
            title: t('contact.almaty.title'),
            address: t('contact.almaty.address'),
            phone: t('contact.almaty.phone'),
            email: t('contact.almaty.email'),
        },
    ];

    return (
        <div className="contact-page">
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
                    <h1 className="page-hero-title animate-fadeInUp">{t('contact.title')}</h1>
                    <p className="page-hero-subtitle animate-fadeInUp delay-1">{t('contact.subtitle')}</p>
                </div>
                <div className="page-hero-wave" />
            </section>

            {/* Contact Content */}
            <section className="section contact-content-section">
                <div className="container">
                    <Row gutter={[48, 48]}>
                        {/* Contact Form */}
                        <Col xs={24} md={14}>
                            <div className="contact-form-wrapper glass-card reveal">
                                <h2 className="contact-form-title">{t('contact.formTitle')}</h2>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={handleSubmit}
                                    size="large"
                                    className="contact-form"
                                >
                                    <Row gutter={16}>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="name"
                                                rules={[{ required: true, message: t('contact.name') }]}
                                            >
                                                <Input
                                                    placeholder={t('contact.name')}
                                                    className="contact-input"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="email"
                                                rules={[
                                                    { required: true, message: t('contact.email') },
                                                    { type: 'email', message: 'Invalid email' },
                                                ]}
                                            >
                                                <Input
                                                    placeholder={t('contact.email')}
                                                    className="contact-input"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col xs={24} sm={12}>
                                            <Form.Item name="phone">
                                                <Input
                                                    placeholder={t('contact.phone')}
                                                    className="contact-input"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="subject"
                                                rules={[{ required: true, message: t('contact.subject') }]}
                                            >
                                                <Input
                                                    placeholder={t('contact.subject')}
                                                    className="contact-input"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item
                                        name="message"
                                        rules={[{ required: true, message: t('contact.message') }]}
                                    >
                                        <TextArea
                                            rows={5}
                                            placeholder={t('contact.message')}
                                            className="contact-input"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            icon={loading ? <LoadingOutlined /> : <SendOutlined />}
                                            loading={loading}
                                            block
                                            className="contact-submit-btn"
                                        >
                                            {loading ? t('contact.sending') : t('contact.send')}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Col>

                        {/* Locations & Map */}
                        <Col xs={24} md={10}>
                            <div className="contact-sidebar">
                                <h2 className="locations-title reveal">{t('contact.locationsTitle')}</h2>
                                {locations.map((loc, index) => (
                                    <Card
                                        key={loc.key}
                                        className={`location-card reveal`}
                                        style={{ animationDelay: `${index * 0.15}s`, marginBottom: 20 }}
                                    >
                                        <div className="location-header">
                                            <span className="location-emoji">{loc.icon}</span>
                                            <h3 className="location-title">{loc.title}</h3>
                                        </div>
                                        <div className="location-details">
                                            <div className="location-detail">
                                                <EnvironmentOutlined style={{ color: 'var(--color-primary)' }} />
                                                <span>{loc.address}</span>
                                            </div>
                                            <div className="location-detail">
                                                <PhoneOutlined style={{ color: 'var(--color-primary)' }} />
                                                <span>{loc.phone}</span>
                                            </div>
                                            <div className="location-detail">
                                                <MailOutlined style={{ color: 'var(--color-primary)' }} />
                                                <span>{loc.email}</span>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* ===== FULL WIDTH MAP SECTION ===== */}
            <section className="map-section reveal" style={{ marginTop: '0', paddingBottom: '0' }}>
                <div className="map-container-large">
                    <iframe
                        title="Aquatic Location Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.7712318461715!2d29.837330775670876!3d40.72299863693721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb4fe15affffff%3A0xcbbb012d9c0db04b!2sAquatic%20Elektronik%20Makina%20Otomasyon%20Sav.%20San.%20Tic.%20Ltd.%20%C5%9Eti.!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                        width="100%"
                        height="450"
                        style={{ border: 0, display: 'block' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
