import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageHero from '../components/common/PageHero';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import PageSEO from '../components/common/PageSEO';
import { Row, Col, Form, Input, Button, Upload, message } from 'antd';
import {
    RocketOutlined,
    HeatMapOutlined,
    UserAddOutlined,
    SendOutlined,
    CheckCircleOutlined,
    TrophyOutlined,
    GlobalOutlined,
    FileTextOutlined,
    SolutionOutlined,
    TeamOutlined,
    StarOutlined,
    LoadingOutlined,
    InboxOutlined,
    PhoneOutlined,
    MailOutlined,
} from '@ant-design/icons';
import imgHero from '../assets/images/kariyer.webp';
import './CareersPage.css';

const CareersPage = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useRevealAnimation();

    const handleSubmit = async (values) => {
        // Honeypot: if bot fills hidden field, silently reject
        if (values.website) return;

        setLoading(true);
        try {
            let cvData = null;
            if (values.cv && values.cv[0]) {
                const file = values.cv[0].originFileObj;
                cvData = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result.split(',')[1]);
                    reader.onerror = (err) => reject(err);
                });
            }

            const emailjs = await import('@emailjs/browser');
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: values.name,
                    from_email: values.email,
                    phone: values.phone,
                    subject: 'Kariyer Başvurusu: ' + values.name,
                    message: `Pozisyon: ${values.position}\n\nMesaj: ${values.message}`,
                    cv_file: cvData,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            message.success(t('contact.success'));
            form.resetFields();
        } catch (error) {
            const errorMsg = error?.text || t('contact.error');
            message.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const benefits = [
        {
            num: '01',
            icon: <HeatMapOutlined />,
            title: t('corporate.values.innovation'),
            desc: t('corporate.values.innovationDesc'),
            color: '#0050b3',
        },
        {
            num: '02',
            icon: <TrophyOutlined />,
            title: t('corporate.values.expertise'),
            desc: t('corporate.values.expertiseDesc'),
            color: '#003a8c',
        },
        {
            num: '03',
            icon: <GlobalOutlined />,
            title: t('corporate.values.sustainability'),
            desc: t('corporate.values.sustainabilityDesc'),
            color: '#0077b6',
        },
    ];

    const steps = [
        { icon: <FileTextOutlined />, label: t('careers.steps.apply', 'Başvuru Formunu Doldur') },
        { icon: <InboxOutlined />,    label: t('careers.steps.cv',    'CV\'ni Yükle') },
        { icon: <SolutionOutlined />, label: t('careers.steps.review','Ön Değerlendirme') },
        { icon: <TeamOutlined />,     label: t('careers.steps.interview', 'Mülakat') },
    ];

    return (
        <div className="careers-page">
            <PageSEO
                titleKey="nav.careers"
                descriptionKey="careers.subtitle"
                path="/careers"
            />
            <PageHero
                title={t('careers.title')}
                subtitle={t('careers.subtitle')}
                bgImage={imgHero}
            />

            {/* ===== WHY JOIN ===== */}
            <section className="section careers-benefits-section">
                <div className="container">
                    <div className="careers-section-header reveal">
                        <span className="careers-label"><RocketOutlined /> {t('careers.whyJoin.title')}</span>
                        <h2 className="careers-title">{t('careers.whyJoin.title')}</h2>
                        <p className="careers-desc">{t('careers.whyJoin.desc')}</p>
                    </div>

                    <Row gutter={[28, 28]}>
                        {benefits.map((b, idx) => (
                            <Col xs={24} md={8} key={idx}>
                                <div
                                    className="benefit-card reveal"
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className="benefit-num">{b.num}</div>
                                    <div className="benefit-icon-wrap" style={{ background: b.color }}>
                                        {b.icon}
                                    </div>
                                    <h3 className="benefit-title">{b.title}</h3>
                                    <p className="benefit-desc">{b.desc}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* ===== APPLICATION FORM ===== */}
            <section className="careers-form-section">
                <div className="container">
                    <div className="careers-form-grid reveal">

                        {/* LEFT: Sidebar */}
                        <div className="careers-sidebar">
                            <div className="careers-sidebar-inner">
                                <span className="careers-sidebar-label"><UserAddOutlined /> {t('careers.application.title')}</span>
                                <h2 className="careers-sidebar-heading">{t('careers.application.title')}</h2>
                                <p className="careers-sidebar-desc">{t('careers.application.desc')}</p>

                                <div className="careers-steps">
                                    <div className="careers-steps-title">{t('careers.steps.title', 'Başvuru Süreci')}</div>
                                    {steps.map((step, idx) => (
                                        <div className="careers-step" key={idx}>
                                            <div className="careers-step-circle">
                                                <span className="careers-step-num">{idx + 1}</span>
                                            </div>
                                            {idx < steps.length - 1 && <div className="careers-step-line" />}
                                            <div className="careers-step-content">
                                                <div className="careers-step-icon">{step.icon}</div>
                                                <span className="careers-step-label">{step.label}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="careers-notice">
                                    <CheckCircleOutlined className="careers-notice-icon" />
                                    <p>{t('careers.form.notice')}</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Form */}
                        <div className="careers-form-panel">
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSubmit}
                                className="careers-form"
                            >
                                <Row gutter={20}>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label={t('contact.name')}
                                            name="name"
                                            rules={[{ required: true, message: t('contact.error') }]}
                                        >
                                            <Input
                                                placeholder={t('contact.name')}
                                                className="careers-input"
                                                prefix={<StarOutlined className="input-icon" />}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label={t('contact.email')}
                                            name="email"
                                            rules={[{ required: true, type: 'email', message: t('contact.error') }]}
                                        >
                                            <Input
                                                placeholder={t('contact.email')}
                                                className="careers-input"
                                                prefix={<MailOutlined className="input-icon" />}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={20}>
                                    <Col xs={24} sm={12}>
                                        <Form.Item label={t('contact.phone')} name="phone">
                                            <Input
                                                placeholder={t('contact.phone')}
                                                className="careers-input"
                                                prefix={<PhoneOutlined className="input-icon" />}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label={t('careers.form.position', 'Başvurulan Pozisyon')}
                                            name="position"
                                            rules={[{ required: true, message: t('contact.error') }]}
                                        >
                                            <Input
                                                placeholder={t('careers.form.position')}
                                                className="careers-input"
                                                prefix={<SolutionOutlined className="input-icon" />}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    label={t('contact.message')}
                                    name="message"
                                    rules={[{ required: true, message: t('contact.error') }]}
                                >
                                    <Input.TextArea
                                        rows={4}
                                        placeholder={t('contact.message')}
                                        className="careers-input"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="cv"
                                    label={t('careers.form.cv')}
                                    extra={t('careers.form.cvHint')}
                                    valuePropName="fileList"
                                    getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                                    rules={[{ required: true, message: t('careers.form.cvError') }]}
                                >
                                    <Upload.Dragger
                                        name="cv"
                                        action="/upload-dummy"
                                        maxCount={1}
                                        accept=".pdf,.doc,.docx"
                                        className="careers-dragger"
                                        beforeUpload={(file) => {
                                            const allowed = [
                                                'application/pdf',
                                                'application/msword',
                                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                            ];
                                            if (!allowed.includes(file.type)) {
                                                message.error(t('careers.form.cvTypeError'));
                                                return Upload.LIST_IGNORE;
                                            }
                                            if (file.size / 1024 >= 40) {
                                                message.error(t('careers.form.cvSizeError'));
                                                return Upload.LIST_IGNORE;
                                            }
                                            return false;
                                        }}
                                    >
                                        <div className="dragger-content">
                                            <div className="dragger-icon"><InboxOutlined /></div>
                                            <p className="dragger-text">{t('careers.form.cv')}</p>
                                            <p className="dragger-hint">PDF, DOC, DOCX · Maks. 40KB</p>
                                        </div>
                                    </Upload.Dragger>
                                </Form.Item>

                                {/* Honeypot field — hidden from real users, bots fill it */}
                                <Form.Item name="website" style={{ display: 'none' }} aria-hidden="true">
                                    <Input tabIndex={-1} autoComplete="off" />
                                </Form.Item>
                                <Form.Item style={{ marginBottom: 0, marginTop: 8 }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        icon={loading ? <LoadingOutlined /> : <SendOutlined />}
                                        loading={loading}
                                        block
                                        className="careers-submit-btn"
                                    >
                                        {loading ? t('contact.sending') : t('contact.send')}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CareersPage;
