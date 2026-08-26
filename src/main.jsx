import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './i18n';
import './index.css';

/* Ant Design theme customization - Deep Steel Navy */
const theme = {
    token: {
        colorPrimary: '#0a3d62',
        colorLink: '#0a3d62',
        colorLinkHover: '#2e6e96',
        borderRadius: 6,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 15,
        colorBgLayout: '#f4f7ff',
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
