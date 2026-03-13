import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout, Menu, Button, Drawer, Dropdown, Space } from 'antd';
import {
    MenuOutlined,
    CloseOutlined,
    GlobalOutlined,
    HomeOutlined,
    BankOutlined,
    AppstoreOutlined,
    ShoppingOutlined,
    SafetyCertificateOutlined,
    MailOutlined,
} from '@ant-design/icons';
import AquaticLogo from '../../assets/images/logo.webp';

const { Header } = Layout;

/* Language options with labels */
const languages = [
    { key: 'tr', label: '🇹🇷 Türkçe' },
    { key: 'en', label: '🇬🇧 English' },
    { key: 'kk', label: '🇰🇿 Қазақша' },
    { key: 'ru', label: '🇷🇺 Русский' },
];

const AppHeader = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    /* Detect scroll for header background */
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* Change language and persist */
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('aquatic-lang', lang);
    };

    /* Navigation items */
    const navItems = [
        { key: '/', label: t('nav.home'), icon: <HomeOutlined /> },
        { key: '/corporate', label: t('nav.corporate'), icon: <BankOutlined /> },
        { key: '/services', label: t('nav.services'), icon: <AppstoreOutlined /> },
        { key: '/products', label: t('nav.products'), icon: <ShoppingOutlined /> },
        { key: '/blackbox', label: t('nav.blackbox'), icon: <SafetyCertificateOutlined /> },
        { key: '/contact', label: t('nav.contact'), icon: <MailOutlined /> },
    ];



    /* Language dropdown items */
    const langMenuItems = languages.map((lang) => ({
        key: lang.key,
        label: lang.label,
        onClick: () => changeLanguage(lang.key),
    }));

    /* Current language label */
    const currentLangLabel = languages.find((l) => l.key === i18n.language)?.label || '🇹🇷 Türkçe';

    /* Determine if hero page (transparent header) */
    const isHome = location.pathname === '/';
    const headerBg = scrolled || !isHome ? 'rgba(255, 255, 255, 0.97)' : 'transparent';
    const textColor = scrolled || !isHome ? 'var(--color-dark)' : '#fff';

    return (
        <>
            <Header
                className={`app-header ${scrolled ? 'scrolled' : ''}`}
                style={{
                    background: headerBg,
                    padding: '0 40px',
                    height: 72,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backdropFilter: scrolled || !isHome ? 'blur(20px)' : 'none',
                }}
            >
                {/* Logo image only */}
                <Link
                    to="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        zIndex: 10,
                    }}
                >
                    <img
                        src={AquaticLogo}
                        alt="Aquatic Logo"
                        style={{
                            height: 40,
                            objectFit: 'contain',
                        }}
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        items={navItems.map((item) => {


                            return {
                                key: item.key,
                                label: (
                                    <Link to={item.key} style={{ color: textColor, transition: 'color 0.3s' }}>
                                        {item.label}
                                    </Link>
                                ),
                            };
                        })}
                        style={{
                            background: 'transparent',
                            borderBottom: 'none',
                            minWidth: 500,
                        }}
                    />

                    {/* Language Dropdown */}
                    <Dropdown menu={{ items: langMenuItems }} placement="bottomRight">
                        <Button
                            type="text"
                            icon={<GlobalOutlined />}
                            style={{
                                color: textColor,
                                fontWeight: 500,
                                fontSize: 14,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                            }}
                        >
                            {currentLangLabel.split(' ')[0]}
                        </Button>
                    </Dropdown>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    className="mobile-menu-btn"
                    type="text"
                    aria-label="Toggle mobile menu"
                    icon={<MenuOutlined style={{ fontSize: 22, color: textColor }} />}
                    onClick={() => setDrawerOpen(true)}
                    style={{ display: 'none' }}
                />
            </Header>

            {/* Mobile Drawer */}
            <Drawer
                title={
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20 }}>
                        AQUATIC
                    </span>
                }
                placement="right"
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                width={300}
                closeIcon={<CloseOutlined />}
                styles={{ body: { padding: 0 } }}
            >
                <Menu
                    mode="vertical"
                    selectedKeys={[location.pathname]}
                    items={navItems.map((item) => ({
                        key: item.key,
                        icon: item.icon,
                        label: item.label,
                        onClick: () => {
                            navigate(item.key);
                            setDrawerOpen(false);
                        },
                    }))}
                    style={{ border: 'none', fontSize: 16 }}
                />
                <div style={{ padding: '20px 24px', borderTop: '1px solid var(--color-border)' }}>
                    <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 12 }}>
                        <GlobalOutlined /> Language
                    </p>
                    <Space wrap>
                        {languages.map((lang) => (
                            <Button
                                key={lang.key}
                                type={i18n.language === lang.key ? 'primary' : 'default'}
                                size="small"
                                onClick={() => {
                                    changeLanguage(lang.key);
                                    setDrawerOpen(false);
                                }}
                            >
                                {lang.label}
                            </Button>
                        ))}
                    </Space>
                </div>
            </Drawer>

            {/* Responsive CSS for header */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
        </>
    );
};

export default AppHeader;
