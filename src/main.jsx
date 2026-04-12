import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './i18n';
import './index.css';

/* Ant Design theme customization - Corporate Blue */
const theme = {
    token: {
        colorPrimary: '#0050b3',
        colorLink: '#0050b3',
        colorLinkHover: '#1890ff',
        borderRadius: 8,
        fontFamily: "'Inter', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 15,
        colorBgLayout: '#f5f7fa',
    },
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary>
            <HelmetProvider>
                <BrowserRouter>
                    <ConfigProvider theme={theme}>
                        <App />
                    </ConfigProvider>
                </BrowserRouter>
            </HelmetProvider>
        </ErrorBoundary>
    </React.StrictMode>
);
