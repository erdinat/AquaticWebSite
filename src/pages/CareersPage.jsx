import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BackgroundParticles from '../components/BackgroundParticles';
import { Row, Col, Card, Form, Input, Button, Upload, message } from 'antd';
import {
    RocketOutlined,
    HeatMapOutlined,
    UserAddOutlined,
    SendOutlined,
    CheckCircleOutlined,
    TrophyOutlined,
} from '@ant-design/icons';
import './CareersPage.css';

const CareersPage = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            let cvData = null;
            if (values.cv && values.cv[0]) {
                const file = values.cv[0].originFileObj;
                cvData = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        // EmailJS attachments usually expect the base64 string without the data:URL prefix
                        const base64String = reader.result.split(',')[1];
                        resolve(base64String);
                    };
                    reader.onerror = (err) => reject(err);
                });
            }

            // EmailJS integration
            const emailjs = await import('@emailjs/browser');
            await emailjs.send(
                'service_16f5qja',
                'template_d4i0t08',
                {
                    from_name: values.name,
                    from_email: values.email,
                    phone: values.phone,
                    subject: 'Kariyer Başvurusu: ' + values.name,
                    message: `Pozisyon: ${values.position}\n\nMesaj: ${values.message}`,
                    cv_file: cvData,
                },
                'KTWen6neGfldnhB2D'
            );

            message.success(t('contact.success'));
            form.resetFields();
        } catch (error) {
            console.error('Submission Detailed Error:', error);
            // If the error has a text property (EmailJS error message), show it
            const errorMsg = error?.text || t('contact.error');
            message.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="careers-page">
            {/* Page Hero */}
            <section className="page-hero">
                <div className="page-hero-bg" />
                <BackgroundParticles count={15} />
                <div className="page-hero-overlay careers-hero-overlay" />
                <div className="page-hero-glow" />
                <div className="container page-hero-content">
                    <h1 className="page-hero-title animate-fadeInUp">{t('careers.title')}</h1>
                    <p className="page-hero-subtitle animate-fadeInUp delay-1">{t('careers.subtitle')}</p>
                </div>
                <div className="page-hero-wave" />
            </section>

            {/* Why Aquatic Section */}
            <section className="section bg-white">
                <div className="container">
                    <div className="section-header reveal text-center">
                        <span className="section-label"><RocketOutlined /> {t('careers.whyJoin.title')}</span>
                        <h2 className="content-title">{t('careers.whyJoin.title')}</h2>
                        <p className="content-text max-800 centered">
                            {t('careers.whyJoin.desc')}
                        </p>
                    </div>

                    <Row gutter={[24, 24]} className="reveal">
                        {[
                            {
                                icon: <HeatMapOutlined />,
                                title: t('corporate.values.innovation'),
                                desc: t('corporate.values.innovationDesc'),
                                color: '#005f73'
                            },
                            {
                                icon: <TrophyOutlined />,
                                title: t('corporate.values.expertise'),
                                desc: t('corporate.values.expertiseDesc'),
                                color: '#0a9396'
                            },
                            {
                                icon: <CheckCircleOutlined />,
                                title: t('corporate.values.reliability'),
                                desc: t('corporate.values.reliabilityDesc'),
                                color: '#94d2bd'
                            }
                        ].map((item, idx) => (
                            <Col xs={24} md={8} key={idx}>
                                <Card className="premium-careers-card">
                                    <div className="career-card-icon" style={{ color: item.color, background: `${item.color}15` }}>
                                        {item.icon}
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* Application Form Section */}
            <section className="section bg-light-gradient application-section">
                <div className="container">
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} lg={10} className="reveal">
                            <span className="section-label"><UserAddOutlined /> {t('careers.application.title')}</span>
                            <h2 className="content-title">{t('careers.application.title')}</h2>
                            <p className="content-text" style={{ marginBottom: 32 }}>
                                {t('careers.application.desc')}
                            </p>
                            <div className="application-info-box">
                                <CheckCircleOutlined className="info-icon" />
                                <p>{t('careers.form.notice')}</p>
                            </div>
                        </Col>

                        <Col xs={24} lg={14} className="reveal delay-1">
                            <div className="application-form-wrapper glass-card">
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={handleSubmit}
                                    className="premium-form"
                                >
                                    <Row gutter={16}>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="name"
                                                label={t('contact.name')}
                                                rules={[{ required: true, message: t('contact.error') }]}
                                            >
                                                <Input placeholder={t('contact.name')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="email"
                                                label={t('contact.email')}
                                                rules={[
                                                    { required: true, type: 'email', message: t('contact.error') }
                                                ]}
                                            >
                                                <Input placeholder={t('contact.email')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="phone"
                                                label={t('contact.phone')}
                                            >
                                                <Input placeholder={t('contact.phone')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="position"
                                                label={t('nav.careers')}
                                                rules={[{ required: true }]}
                                            >
                                                <Input placeholder={t('careers.form.position')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item
                                        name="message"
                                        label={t('contact.message')}
                                        rules={[{ required: true }]}
                                    >
                                        <Input.TextArea rows={4} placeholder={t('contact.message')} />
                                    </Form.Item>

                                    <Form.Item
                                        name="cv"
                                        label={t('careers.form.cv')}
                                        extra={t('careers.form.cvHint')}
                                        valuePropName="fileList"
                                        getValueFromEvent={(e) => {
                                            if (Array.isArray(e)) return e;
                                            return e && e.fileList;
                                        }}
                                        rules={[{ required: true, message: t('careers.form.cvError') }]}
                                    >
                                        <Upload.Dragger 
                                            name="cv" 
                                            action="/upload-dummy" 
                                            maxCount={1}
                                            beforeUpload={(file) => {
                                                const isLt40K = file.size / 1024 < 40;
                                                if (!isLt40K) {
                                                    message.error("EmailJS ücretsiz sürüm sınırı nedeniyle dosya 40KB'dan küçük olmalıdır. (Daha büyük dosyalar için ücretli plan veya farklı depolama gerekir)");
                                                }
                                                return false; // Prevent auto upload
                                            }}
                                        >
                                            <p className="ant-upload-drag-icon">
                                                <UserAddOutlined />
                                            </p>
                                            <p className="ant-upload-text">{t('careers.form.cv')}</p>
                                        </Upload.Dragger>
                                    </Form.Item>

                                    <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            icon={<SendOutlined />}
                                            loading={loading}
                                            className="premium-submit-btn"
                                            block
                                        >
                                            {t('contact.send')}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    );
};

export default CareersPage;
