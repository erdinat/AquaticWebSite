import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageHero from '../components/common/PageHero';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import PageSEO from '../components/common/PageSEO';
import HoneypotField from '../components/common/HoneypotField';
import { Row, Col, Form, Input, Button, message } from 'antd';
import {
    SendOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    LoadingOutlined,
    BuildOutlined,
    ExperimentOutlined,
    ToolOutlined,
    GlobalOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons';
import { isKzDomain } from '../i18n/langRouting';
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
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: values.name,
                    from_email: values.email,
                    phone: values.phone,
                    subject: values.subject,
                    message: values.message,
                },
                EMAILJS_PUBLIC_KEY
            );
            message.success(t('contact.success'));
            form.resetFields();
        } catch (error) {
            message.error(error?.text || t('contact.error'));
        } finally {
            setLoading(false);
        }
    };

    /* Office cards show name+address only — phone numbers aren't tied to a
       specific office, they're shown once as a shared block in the sidebar
       (see contact.telFax/contact.mobile below). */
    const locations = [
        {
            key: 'headOffice',
            icon: <BuildOutlined />,
            color: 'var(--color-primary)',
            title: t('contact.headOffice.title'),
            address: t('contact.headOffice.address'),
        },
        {
            key: 'rdOffice',
            icon: <ExperimentOutlined />,
            color: 'var(--color-primary-dark)',
            title: t('contact.rdOffice.title'),
            address: t('contact.rdOffice.address'),
        },
        {
            key: 'factory',
            icon: <ToolOutlined />,
            color: 'var(--color-accent-dark)',
            title: t('contact.factory.title'),
            address: t('contact.factory.address'),
        },
        {
            key: 'almaty',
            icon: <GlobalOutlined />,
            color: 'var(--color-accent)',
            title: t('contact.almaty.title'),
            address: t('contact.almaty.address'),
        },
    ];

    /* aquatic.kz shows the Kazakhstan email instead of the TR one. */
    const contactEmail = isKzDomain() ? 'bilgi@aquatic.com.kz' : 'bilgi@aquatic.com.tr';

    return (
        <div className="contact-page">
            <PageSEO titleKey="nav.contact" descriptionKey="contact.subtitle" path="/contact" />
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
                                <h2 className="contact-sidebar-heading">
                                    {t('contact.formTitle')}
                                </h2>
                                <p className="contact-sidebar-desc">{t('contact.subtitle')}</p>

                                <div className="contact-info-list">
                                    <div className="contact-info-item">
                                        <div className="contact-info-icon">
                                            <PhoneOutlined />
                                        </div>
                                        <div>
                                            <div className="contact-info-label">
                                                {t('contact.telFaxLabel')}
                                            </div>
                                            <div className="contact-info-value">
                                                {t('contact.telFax', {
                                                    returnObjects: true,
                                                }).map((num, i) => (
                                                    <span key={num}>
                                                        {i > 0 && ' / '}
                                                        <a
                                                            href={`tel:${num.replace(/\s/g, '')}`}
                                                            className="contact-info-link"
                                                        >
                                                            {num}
                                                        </a>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contact-info-item">
                                        <div className="contact-info-icon">
                                            <PhoneOutlined />
                                        </div>
                                        <div>
                                            <div className="contact-info-label">
                                                {t('contact.mobileLabel')}
                                            </div>
                                            <div className="contact-info-value">
                                                {t('contact.mobile', {
                                                    returnObjects: true,
                                                }).map((num, i) => (
                                                    <span key={num}>
                                                        {i > 0 && ' / '}
                                                        <a
                                                            href={`tel:${num.replace(/\s/g, '')}`}
                                                            className="contact-info-link"
                                                        >
                                                            {num}
                                                        </a>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        href={`mailto:${contactEmail}`}
                                        className="contact-info-item"
                                    >
                                        <div className="contact-info-icon">
                                            <MailOutlined />
                                        </div>
                                        <div>
                                            <div className="contact-info-label">
                                                {t('contact.email')}
                                            </div>
                                            <div className="contact-info-value">
                                                {contactEmail}
                                            </div>
                                        </div>
                                    </a>
                                    <div className="contact-info-item">
                                        <div className="contact-info-icon">
                                            <EnvironmentOutlined />
                                        </div>
                                        <div>
                                            <div className="contact-info-label">
                                                {t('contact.address')}
                                            </div>
                                            <div className="contact-info-value">
                                                {t('contact.headOffice.address')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contact-info-item">
                                        <div className="contact-info-icon">
                                            <ClockCircleOutlined />
                                        </div>
                                        <div>
                                            <div className="contact-info-label">
                                                {t('contact.hours')}
                                            </div>
                                            <div className="contact-info-value">
                                                {t('contact.hoursValue')}
                                            </div>
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
                                            rules={[
                                                { required: true, message: t('contact.required') },
                                            ]}
                                        >
                                            <Input
                                                placeholder={t('contact.name')}
                                                className="contact-input"
                                                prefix={
                                                    <span className="input-prefix-icon">👤</span>
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label={t('contact.email')}
                                            name="email"
                                            rules={[
                                                { required: true, message: t('contact.required') },
                                                {
                                                    type: 'email',
                                                    message: t('contact.emailInvalid'),
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder={t('contact.email')}
                                                className="contact-input"
                                                prefix={
                                                    <MailOutlined className="input-prefix-icon" />
                                                }
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
                                                prefix={
                                                    <PhoneOutlined className="input-prefix-icon" />
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label={t('contact.subject')}
                                            name="subject"
                                            rules={[
                                                { required: true, message: t('contact.required') },
                                            ]}
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
                                    rules={[{ required: true, message: t('contact.required') }]}
                                >
                                    <TextArea
                                        rows={5}
                                        placeholder={t('contact.message')}
                                        className="contact-input"
                                    />
                                </Form.Item>
                                <HoneypotField />
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
                        <span className="section-label">
                            <EnvironmentOutlined /> {t('contact.locationsTitle')}
                        </span>
                    </div>
                    <Row gutter={[24, 24]}>
                        {locations.map((loc, idx) => (
                            <Col xs={24} sm={12} md={6} key={loc.key}>
                                <div
                                    className="office-card reveal"
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className="office-card-top">
                                        <div
                                            className="office-icon-wrap"
                                            style={{ background: loc.color }}
                                        >
                                            {loc.icon}
                                        </div>
                                        <h3 className="office-title">{loc.title}</h3>
                                    </div>
                                    <div className="office-details">
                                        <div className="office-detail">
                                            <EnvironmentOutlined className="office-detail-icon" />
                                            <span>{loc.address}</span>
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
                            src="https://www.google.com/maps?q=Karadenizliler+Mah.+%C4%B0lim+Sok.+No%3A15%2F1+Ba%C5%9Fiskele%2FKocaeli&output=embed"
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
