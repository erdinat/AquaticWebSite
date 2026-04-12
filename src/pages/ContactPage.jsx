import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageHero from '../components/common/PageHero';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import PageSEO from '../components/common/PageSEO';
import { Row, Col, Form, Input, Button, message } from 'antd';
import {
    SendOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    LoadingOutlined,
    BuildOutlined,
    HomeOutlined,
    GlobalOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons';
import imgHero from '../assets/images/iletisim.webp';
import './ContactPage.css';

const { TextArea } = Input;

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactPage = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useRevealAnimation();

    const handleSubmit = async (values) => {
        // Honeypot: if bot fills hidden field, silently reject
        if (values.website) return;

        setLoading(true);
        try {
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

    const locations = [
        {
            key: 'kocaeli',
            icon: <BuildOutlined />,
            color: '#0050b3',
            title: t('contact.kocaeli.title'),
            address: t('contact.kocaeli.address'),
            phone: t('contact.kocaeli.phone'),
            email: t('contact.kocaeli.email'),
        },
        {
            key: 'istanbul',
            icon: <HomeOutlined />,
            color: '#003a8c',
            title: t('contact.istanbul.title'),
            address: t('contact.istanbul.address'),
            phone: t('contact.istanbul.phone'),
            email: t('contact.istanbul.email'),
        },
        {
            key: 'almaty',
            icon: <GlobalOutlined />,
            color: '#0077b6',
            title: t('contact.almaty.title'),
            address: t('contact.almaty.address'),
            phone: t('contact.almaty.phone'),
            email: t('contact.almaty.email'),
        },
    ];

    return (
        <div className="contact-page">
            <PageSEO
                titleKey="nav.contact"
                descriptionKey="contact.subtitle"
                path="/contact"
            />
            <PageHero
                title={t('contact.title')}
                subtitle={t('contact.subtitle')}
                bgImage={imgHero}
            />

            {/* ===== MAIN CONTACT SECTION ===== */}
            <section className="contact-main-section">
                <div className="container">
                    <div className="contact-main-grid reveal">

                        {/* LEFT: Dark sidebar */}
                        <div className="contact-sidebar-panel">
                            <div className="contact-sidebar-inner">
                                <span className="contact-sidebar-label">{t('contact.title')}</span>
                                <h2 className="contact-sidebar-heading">{t('contact.formTitle')}</h2>
                                <p className="contact-sidebar-desc">{t('contact.subtitle')}</p>

                                <div className="contact-info-list">
                                    <a href={`tel:${t('contact.kocaeli.phone')}`} className="contact-info-item">
                                        <div className="contact-info-icon"><PhoneOutlined /></div>
                                        <div>
                                            <div className="contact-info-label">{t('contact.phone')}</div>
                                            <div className="contact-info-value">{t('contact.kocaeli.phone')}</div>
                                        </div>
                                    </a>
                                    <a href={`mailto:${t('contact.kocaeli.email')}`} className="contact-info-item">
                                        <div className="contact-info-icon"><MailOutlined /></div>
                                        <div>
                                            <div className="contact-info-label">{t('contact.email')}</div>
                                            <div className="contact-info-value">{t('contact.kocaeli.email')}</div>
                                        </div>
                                    </a>
                                    <div className="contact-info-item">
                                        <div className="contact-info-icon"><EnvironmentOutlined /></div>
                                        <div>
                                            <div className="contact-info-label">{t('contact.address', 'Adres')}</div>
                                            <div className="contact-info-value">{t('contact.kocaeli.address')}</div>
                                        </div>
                                    </div>
                                    <div className="contact-info-item">
                                        <div className="contact-info-icon"><ClockCircleOutlined /></div>
                                        <div>
                                            <div className="contact-info-label">{t('contact.hours', 'Çalışma Saatleri')}</div>
                                            <div className="contact-info-value">Pzt – Cuma, 09:00 – 18:00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Form */}
                        <div className="contact-form-panel">
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSubmit}
                                size="large"
                                className="contact-form"
                            >
                                <Row gutter={20}>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label={t('contact.name')}
                                            name="name"
                                            rules={[{ required: true, message: t('contact.name') }]}
                                        >
                                            <Input
                                                placeholder={t('contact.name')}
                                                className="contact-input"
                                                prefix={<span className="input-prefix-icon">👤</span>}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label={t('contact.email')}
                                            name="email"
                                            rules={[
                                                { required: true, message: t('contact.email') },
                                                { type: 'email', message: 'Geçersiz e-posta' },
                                            ]}
                                        >
                                            <Input
                                                placeholder={t('contact.email')}
                                                className="contact-input"
                                                prefix={<MailOutlined className="input-prefix-icon" />}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12}>
                                        <Form.Item label={t('contact.phone')} name="phone">
                                            <Input
                                                placeholder={t('contact.phone')}
                                                className="contact-input"
                                                prefix={<PhoneOutlined className="input-prefix-icon" />}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label={t('contact.subject')}
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
                                    label={t('contact.message')}
                                    name="message"
                                    rules={[{ required: true, message: t('contact.message') }]}
                                >
                                    <TextArea
                                        rows={5}
                                        placeholder={t('contact.message')}
                                        className="contact-input"
                                    />
                                </Form.Item>
                                {/* Honeypot field — hidden from real users, bots fill it */}
                                <Form.Item name="website" style={{ display: 'none' }} aria-hidden="true">
                                    <Input tabIndex={-1} autoComplete="off" />
                                </Form.Item>
                                <Form.Item style={{ marginBottom: 0 }}>
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
                    </div>
                </div>
            </section>

            {/* ===== OFFICES SECTION ===== */}
            <section className="offices-section">
                <div className="container">
                    <div className="offices-header reveal">
                        <span className="section-label"><EnvironmentOutlined /> {t('contact.locationsTitle')}</span>
                    </div>
                    <Row gutter={[24, 24]}>
                        {locations.map((loc, idx) => (
                            <Col xs={24} md={8} key={loc.key}>
                                <div className="office-card reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
                                    <div className="office-card-top">
                                        <div className="office-icon-wrap" style={{ background: loc.color }}>
                                            {loc.icon}
                                        </div>
                                        <h3 className="office-title">{loc.title}</h3>
                                    </div>
                                    <div className="office-details">
                                        <div className="office-detail">
                                            <EnvironmentOutlined className="office-detail-icon" />
                                            <span>{loc.address}</span>
                                        </div>
                                        <div className="office-detail">
                                            <PhoneOutlined className="office-detail-icon" />
                                            <a href={`tel:${loc.phone}`} className="office-link">{loc.phone}</a>
                                        </div>
                                        <div className="office-detail">
                                            <MailOutlined className="office-detail-icon" />
                                            <a href={`mailto:${loc.email}`} className="office-link">{loc.email}</a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* ===== MAP ===== */}
            <section className="map-section reveal">
                <div className="container">
                    <div className="map-wrapper">
                        <iframe
                            title="Aquatic Location Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.7712318461715!2d29.837330775670876!3d40.72299863693721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb4fe15affffff%3A0xcbbb012d9c0db04b!2sAquatic%20Elektronik%20Makina%20Otomasyon%20Sav.%20San.%20Tic.%20Ltd.%20%C5%9Eti.!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                            width="100%"
                            height="420"
                            style={{ border: 0, display: 'block' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
