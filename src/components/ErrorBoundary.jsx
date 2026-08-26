import React from 'react';
import { Button, Result } from 'antd';
import { ReloadOutlined, HomeOutlined } from '@ant-design/icons';

/**
 * ErrorBoundary
 * Class component that catches runtime errors in the React component tree.
 * Prevents the entire app from crashing with a "White Screen of Death".
 * Renders a user-friendly error UI instead.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        // Burada Sentry veya benzeri bir logging servisi entegre edilebilir
        console.error('[ErrorBoundary] Caught error:', error, info.componentStack);
    }

    handleReload = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    handleGoHome = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        padding: '24px',
                        background: 'linear-gradient(135deg, #001529 0%, #041f33 100%)',
                    }}
                >
                    <Result
                        status="500"
                        title={
                            <span style={{ color: '#fff', fontSize: '2rem', fontWeight: 700 }}>
                                Teknik Bir Hata Oluştu
                            </span>
                        }
                        subTitle={
                            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem' }}>
                                Üzgünüz, beklenmedik bir sorun meydana geldi.
                                <br />
                                Sayfayı yenileyerek tekrar deneyebilirsiniz.
                            </span>
                        }
                        extra={[
                            <Button
                                key="reload"
                                type="primary"
                                size="large"
                                icon={<ReloadOutlined />}
                                onClick={this.handleReload}
                                style={{ marginRight: 12 }}
                            >
                                Sayfayı Yenile
                            </Button>,
                            <Button
                                key="home"
                                size="large"
                                ghost
                                icon={<HomeOutlined />}
                                onClick={this.handleGoHome}
                                style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
                            >
                                Ana Sayfaya Dön
                            </Button>,
                        ]}
                    />
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
