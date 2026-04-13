import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Result } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
            }}
        >
            <Helmet>
                <title>404 – Sayfa Bulunamadı | Aquatic</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <Result
                status="404"
                title="404"
                subTitle={t('notFound.message', 'Aradığınız sayfa bulunamadı.')}
                extra={
                    <Button
                        type="primary"
                        size="large"
                        icon={<HomeOutlined />}
                        onClick={() => navigate('/')}
                    >
                        {t('notFound.back', 'Ana Sayfaya Dön')}
                    </Button>
                }
            />
        </div>
    );
};

export default NotFoundPage;
