import React from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import WhatsAppButton from '../common/WhatsAppButton';
import CookieConsent from '../common/CookieConsent';

const { Content } = Layout;

/**
 * MainLayout wraps all pages with the sticky header and footer.
 * Uses Ant Design's Layout component for structured page layout.
 */
const MainLayout = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
            <AppHeader />
            <Content style={{ marginTop: 0 }}>
                <div className="page-enter">{children}</div>
            </Content>
            <AppFooter />
            <WhatsAppButton />
            <CookieConsent />
        </Layout>
    );
};

export default MainLayout;
