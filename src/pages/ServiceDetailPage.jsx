import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Input, Upload, message } from 'antd';
import {
    ArrowRightOutlined,
    ArrowLeftOutlined,
    InboxOutlined,
    LoadingOutlined,
    SendOutlined,
} from '@ant-design/icons';
import PageSEO from '../components/common/PageSEO';
import HoneypotField from '../components/common/HoneypotField';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import LocalizedLink from '../components/common/LocalizedLink';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import { DETAIL_DATA, SLUGS } from '../data/serviceDetailContent';
import './ServiceDetailPage.css';

const { TextArea } = Input;

const ServiceDetailPage = () => {
    const { slug } = useParams();
    const { t } = useTranslation();
    const navigate = useLocalizedNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [missingImages, setMissingImages] = useState({});

    useRevealAnimation();

    const entry = DETAIL_DATA[slug];
    const markImageMissing = (key) =>
        setMissingImages((prev) => ({ ...prev, [key]: true }));

    const handleSubmit = async (values) => {
        if (values.website) return; // honeypot

        setLoading(true);
        try {
            let fileData = null;
            if (values.file && values.file[0]) {
                const file = values.file[0].originFileObj;
                fileData = await new Promise((resolve, reject) => {
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
                    subject: `${t(`services.${entry.categoryKey}.items.${entry.itemKey}.title`)}: ${values.subject}`,
                    message: values.description,
                    cv_file: fileData,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            message.success(t('services.serviceDetail.formSuccess'));
            form.resetFields();
        } catch (error) {
            message.error(error?.text || t('services.serviceDetail.formError'));
        } finally {
            setLoading(false);
        }
    };

    if (!entry) {
        return (
            <div className="service-detail-page">
                <div className="container" style={{ padding: '160px 0 100px', textAlign: 'center' }}>
                    <p>{t('notFound.title', 'Page not found')}</p>
                    <LocalizedLink to="/services">{t('services.serviceDetail.backToServices')}</LocalizedLink>
                </div>
            </div>
        );
    }

    const { itemKey, categoryKey } = entry;
    const titleKey = `services.${categoryKey}.items.${itemKey}.title`;
    const descKey = `services.${categoryKey}.items.${itemKey}.desc`;
    const title = t(titleKey);
    const desc = t(descKey);
    const detail = t(`services.${categoryKey}.items.${itemKey}.detail`);
    const materials = t(`services.detail.${slug}.materials`, { returnObjects: true });
    const materialsBody = t(`services.detail.${slug}.materialsBody`);
    const capabilityBody = t(`services.detail.${slug}.capabilityBody`);
    // Related = other items in the same category (falls back to any other
    // detail page if the category only has this one item, so the grid is
    // never empty).
    const sameCategory = SLUGS.filter((s) => s !== slug && DETAIL_DATA[s].categoryKey === categoryKey);
    const relatedSlugs = (sameCategory.length ? sameCategory : SLUGS.filter((s) => s !== slug)).slice(
        0,
        3
    );

    return (
        <div className="service-detail-page">
            <PageSEO titleKey={titleKey} descriptionKey={descKey} path={`/services/${slug}`} />

            <LocalizedLink to="/services" className="svcd-back-link">
                <ArrowLeftOutlined /> {t('services.serviceDetail.backToServices')}
            </LocalizedLink>

            {/* ── Hero: image right, overlapping white box left ── */}
            <section className="svcd-hero">
                <div className="container svcd-hero-grid">
                    <div className="svcd-hero-box reveal">
                        <h1 className="svcd-hero-title">{title}</h1>
                        <p className="svcd-hero-desc">{desc}</p>
                        <a href="#svcd-quote" className="svcd-btn">
                            {t('services.serviceDetail.heroBtn')} <ArrowRightOutlined />
                        </a>
                    </div>
                    <div className="svcd-hero-image">
                        {!missingImages.hero && (
                            <img
                                src={entry.heroImage}
                                alt={title}
                                width={1920}
                                height={1071}
                                onError={() => markImageMissing('hero')}
                            />
                        )}
                    </div>
                </div>
            </section>

            {/* ── Materials ── */}
            <section className="section svcd-materials-section">
                <div className="container">
                    <h2 className="svcd-materials-title reveal">
                        {t('services.serviceDetail.materialsTitle')}
                    </h2>
                    <div className="svcd-materials-chips reveal">
                        {Array.isArray(materials) &&
                            materials.map((m) => (
                                <span className="svcd-chip" key={m}>
                                    {m}
                                </span>
                            ))}
                    </div>
                    <div
                        className={`svcd-materials-grid reveal${
                            !entry.materialsImage || missingImages.materials
                                ? ' svcd-materials-grid--no-image'
                                : ''
                        }`}
                    >
                        {entry.materialsImage && !missingImages.materials && (
                            <img
                                className="svcd-materials-img"
                                src={entry.materialsImage}
                                alt=""
                                loading="lazy"
                                onError={() => markImageMissing('materials')}
                            />
                        )}
                        <p className="svcd-materials-body">{materialsBody}</p>
                    </div>
                </div>
            </section>

            {/* ── Production Capability: image right, overlapping white box left ── */}
            <section className="svcd-capability-section">
                <div className="container svcd-capability-grid reveal">
                    <div className="svcd-capability-box">
                        <h2 className="svcd-capability-title">
                            {t('services.serviceDetail.capabilityTitle')}
                        </h2>
                        <p className="svcd-capability-desc">{capabilityBody}</p>
                        <p className="svcd-capability-detail">{detail}</p>
                        <a href="#svcd-quote" className="svcd-btn">
                            {t('services.serviceDetail.capabilityBtn')} <ArrowRightOutlined />
                        </a>
                    </div>
                    <div className="svcd-capability-image">
                        {entry.capabilityImage && !missingImages.capability && (
                            <img
                                src={entry.capabilityImage}
                                alt=""
                                loading="lazy"
                                onError={() => markImageMissing('capability')}
                            />
                        )}
                    </div>
                </div>
            </section>

            {/* ── Related services ── */}
            <section className="section svcd-related-section">
                <div className="container">
                    <h2 className="svcd-related-title reveal">
                        {t('services.serviceDetail.relatedTitle')}
                    </h2>
                    <div className="svcd-related-grid">
                        {relatedSlugs.map((relSlug, idx) => {
                            const relEntry = DETAIL_DATA[relSlug];
                            const relTitle = t(
                                `services.${relEntry.categoryKey}.items.${relEntry.itemKey}.title`
                            );
                            return (
                                <button
                                    key={relSlug}
                                    className="svcd-related-card reveal"
                                    style={{ animationDelay: `${idx * 0.08}s` }}
                                    onClick={() => navigate(`/services/${relSlug}`)}
                                >
                                    <img src={relEntry.heroImage} alt="" loading="lazy" />
                                    <span className="svcd-related-card-overlay" aria-hidden="true" />
                                    <span className="svcd-related-card-title">{relTitle}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Quote form ── */}
            <section className="section svcd-quote-section" id="svcd-quote">
                <div className="container">
                    <div className="svcd-quote-wrap reveal">
                        <div className="svcd-quote-intro">
                            <h2 className="svcd-quote-title">{t('services.serviceDetail.quoteTitle')}</h2>
                            <p className="svcd-quote-subtitle">
                                {t('services.serviceDetail.quoteSubtitle')}
                            </p>
                        </div>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            size="large"
                            className="svcd-quote-form"
                        >
                            <div className="svcd-quote-form-row">
                                <Form.Item
                                    label={t('services.serviceDetail.formName')}
                                    name="name"
                                    rules={[{ required: true, message: t('contact.required') }]}
                                >
                                    <Input placeholder={t('services.serviceDetail.formName')} />
                                </Form.Item>
                                <Form.Item
                                    label={t('services.serviceDetail.formEmail')}
                                    name="email"
                                    rules={[
                                        { required: true, message: t('contact.required') },
                                        { type: 'email', message: t('contact.emailInvalid') },
                                    ]}
                                >
                                    <Input placeholder={t('services.serviceDetail.formEmail')} />
                                </Form.Item>
                            </div>
                            <Form.Item
                                label={t('services.serviceDetail.formSubject')}
                                name="subject"
                                rules={[{ required: true, message: t('contact.required') }]}
                            >
                                <Input placeholder={t('services.serviceDetail.formSubject')} />
                            </Form.Item>
                            <Form.Item
                                label={t('services.serviceDetail.formDescription')}
                                name="description"
                                rules={[{ required: true, message: t('contact.required') }]}
                            >
                                <TextArea rows={4} placeholder={t('services.serviceDetail.formDescription')} />
                            </Form.Item>
                            <Form.Item
                                name="file"
                                label={t('services.serviceDetail.formFile')}
                                extra={t('services.serviceDetail.formFileHint')}
                                valuePropName="fileList"
                                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                            >
                                <Upload.Dragger
                                    name="file"
                                    action="/upload-dummy"
                                    maxCount={1}
                                    accept=".pdf,.dwg,.step,.stp"
                                    className="svcd-dragger"
                                    beforeUpload={(file) => {
                                        const allowedExtensions = ['.pdf', '.dwg', '.step', '.stp'];
                                        const hasAllowedExtension = allowedExtensions.some((ext) =>
                                            file.name.toLowerCase().endsWith(ext)
                                        );
                                        if (!hasAllowedExtension) {
                                            message.error(t('services.serviceDetail.formFile'));
                                            return Upload.LIST_IGNORE;
                                        }
                                        if (file.size / 1024 >= 40) {
                                            message.error(t('services.serviceDetail.formFileHint'));
                                            return Upload.LIST_IGNORE;
                                        }
                                        return false;
                                    }}
                                >
                                    <div className="svcd-dragger-content">
                                        <InboxOutlined />
                                        <p>{t('services.serviceDetail.formFile')}</p>
                                    </div>
                                </Upload.Dragger>
                            </Form.Item>
                            <HoneypotField />
                            <button
                                type="submit"
                                className="svcd-btn svcd-btn--submit"
                                disabled={loading}
                            >
                                {loading ? <LoadingOutlined /> : <SendOutlined />}
                                {loading
                                    ? t('services.serviceDetail.formSubmitting')
                                    : t('services.serviceDetail.formSubmit')}
                            </button>
                        </Form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetailPage;
