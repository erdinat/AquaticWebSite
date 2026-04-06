import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Result } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
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
