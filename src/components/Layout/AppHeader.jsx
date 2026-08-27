import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout, Menu, Button, Drawer, Dropdown, Space } from 'antd';
import LocalizedLink from '../common/LocalizedLink';
import { splitLangFromPath, localizePath } from '../../i18n/langRouting';
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
    BarChartOutlined,
    ToolOutlined,
    FileTextOutlined,
    TeamOutlined,
    HistoryOutlined,
    AimOutlined,
    TrophyOutlined,
    QuestionCircleOutlined,
    DownOutlined,
    RocketOutlined,
    CompassOutlined,
    ThunderboltOutlined,
    EllipsisOutlined,
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

    /* Current URL language + bare (unprefixed) path */
    const { lang: currentLang, barePath } = splitLangFromPath(location.pathname);

    /* Change language: navigate to the localized equivalent of the current page.
       i18n itself is kept in sync by <LangSync/> reacting to the URL change. */
    const changeLanguage = (lang) => {
        navigate(localizePath(lang, barePath));
    };

    /* Scroll to section helper */
    const scrollToSection = (path, hash) => {
        if (barePath === path) {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            navigate(localizePath(currentLang, path));
            setTimeout(() => {
                const el = document.getElementById(hash);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400);
        }
    };

    /* Home dropdown sections */
    const homeDropdownItems = [
        { key: 'home-stats', icon: <BarChartOutlined />, label: t('dropdown.home.stats') },
        {
            key: 'home-category-showcase',
            icon: <ShoppingOutlined />,
            label: t('dropdown.home.categoryShowcase'),
        },
        { key: 'home-news', icon: <FileTextOutlined />, label: t('dropdown.home.news') },
        { key: 'home-brands', icon: <TeamOutlined />, label: t('dropdown.home.brands') },
    ].map((item) => ({
        ...item,
        // Dropdown popups are React-portaled to document.body, so a click still
        // bubbles up the *React* tree to the parent nav item's onClick unless
        // stopped here — see the "Hizmetler altmenü" fix for the full story.
        onClick: ({ domEvent }) => {
            domEvent.stopPropagation();
            scrollToSection('/', item.key);
        },
    }));

    /* Corporate dropdown sections */
    const corporateDropdownItems = [
        { key: 'corp-history', icon: <HistoryOutlined />, label: t('dropdown.corporate.history') },
        { key: 'corp-vision', icon: <AimOutlined />, label: t('dropdown.corporate.vision') },
        { key: 'corp-values', icon: <TrophyOutlined />, label: t('dropdown.corporate.values') },
        { key: 'corp-bank-faq', icon: <BankOutlined />, label: t('dropdown.corporate.bank') },
        { key: 'corp-faq', icon: <QuestionCircleOutlined />, label: t('dropdown.corporate.faq') },
    ].map((item) => ({
        ...item,
        onClick: ({ domEvent }) => {
            domEvent.stopPropagation();
            scrollToSection('/corporate', item.key);
        },
    }));

    /* Services dropdown */
    const servicesDropdownItems = [
        { key: 'denizcilik', icon: <CompassOutlined />, label: t('dropdown.services.denizcilik') },
        {
            key: 'savunmaSanayi',
            icon: <RocketOutlined />,
            label: t('dropdown.services.savunmaSanayi'),
        },
        {
            key: 'sualtiTeknolojileri',
            icon: <GlobalOutlined />,
            label: t('dropdown.services.sualtiTeknolojileri'),
        },
        { key: 'makina', icon: <ToolOutlined />, label: t('dropdown.services.makina') },
        { key: 'endustri', icon: <BankOutlined />, label: t('dropdown.services.endustri') },
        {
            key: 'elektronikOtomasyon',
            icon: <ThunderboltOutlined />,
            label: t('dropdown.services.elektronikOtomasyon'),
        },
    ].map((item) => ({
        ...item,
        onClick: ({ domEvent }) => {
            domEvent.stopPropagation();
            navigate(localizePath(currentLang, `/services/category/${item.key}`));
        },
    }));

    /* "More" dropdown — secondary pages tucked behind a single nav entry
       (contact, careers, blackbox) so the primary nav stays to 4 items */
    const moreDropdownItems = [
        { key: 'more-contact', path: '/contact', icon: <MailOutlined />, label: t('nav.contact') },
        { key: 'more-careers', path: '/careers', icon: <TeamOutlined />, label: t('nav.careers') },
        {
            key: 'more-blackbox',
            path: '/blackbox',
            icon: <SafetyCertificateOutlined />,
            label: t('nav.blackbox'),
        },
    ].map((item) => ({
        ...item,
        onClick: ({ domEvent }) => {
            domEvent.stopPropagation();
            navigate(localizePath(currentLang, item.path));
        },
    }));

    /* Navigation items — only Home/Corporate/Services/Products show directly;
       Contact/Careers/BlackBox live under the "More" dropdown (dropdownOnly:
       true means the parent item itself isn't a real page, so clicking it
       shouldn't navigate — it only opens the flyout). */
    const navItems = [
        { key: '/', label: t('nav.home'), icon: <HomeOutlined />, dropdown: homeDropdownItems },
        {
            key: '/corporate',
            label: t('nav.corporate'),
            icon: <BankOutlined />,
            dropdown: corporateDropdownItems,
        },
        {
            key: '/services',
            label: t('nav.services'),
            icon: <AppstoreOutlined />,
            dropdown: servicesDropdownItems,
        },
        { key: '/products', label: t('nav.products'), icon: <ShoppingOutlined /> },
        {
            key: 'more',
            label: t('nav.more'),
            icon: <EllipsisOutlined />,
            dropdown: moreDropdownItems,
            dropdownOnly: true,
        },
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
    const isHome = barePath === '/';
    const isTransparent = !scrolled && isHome;
    const headerBg = scrolled || !isHome ? 'rgba(255, 255, 255, 0.97)' : 'transparent';
    const textColor = scrolled || !isHome ? 'var(--color-dark)' : '#fff';

    return (
        <>
            <Header
                className={`app-header ${scrolled ? 'scrolled' : ''}${isTransparent ? ' transparent' : ''}`}
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
                <LocalizedLink
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
                        width={162}
                        height={48}
                        style={{
                            height: 48,
                            objectFit: 'contain',
                        }}
                    />
                </LocalizedLink>

                {/* Desktop Navigation */}
                <div
                    className="desktop-nav"
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                    <Menu
                        mode="horizontal"
                        selectedKeys={[barePath]}
                        items={navItems.map((item) => {
                            if (item.dropdown) {
                                return {
                                    key: item.key,
                                    onClick: item.dropdownOnly
                                        ? undefined
                                        : () => navigate(localizePath(currentLang, item.key)),
                                    label: (
                                        <Dropdown
                                            menu={{ items: item.dropdown }}
                                            placement="bottomLeft"
                                            arrow
                                        >
                                            <span
                                                style={{
                                                    color: textColor,
                                                    transition: 'color 0.3s',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 4,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {item.label}
                                                <DownOutlined
                                                    style={{ fontSize: 10, opacity: 0.7 }}
                                                />
                                            </span>
                                        </Dropdown>
                                    ),
                                };
                            }
                            return {
                                key: item.key,
                                label: (
                                    <LocalizedLink
                                        to={item.key}
                                        style={{ color: textColor, transition: 'color 0.3s' }}
                                    >
                                        {item.label}
                                    </LocalizedLink>
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
                    <span
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20 }}
                    >
                        AQUATIC
                    </span>
                }
                placement="right"
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                style={{ width: 300 }}
                closeIcon={<CloseOutlined />}
                styles={{ body: { padding: 0 } }}
            >
                <Menu
                    mode="inline"
                    selectedKeys={[barePath]}
                    items={navItems.map((item) => {
                        if (item.dropdown) {
                            return {
                                key: item.key,
                                icon: item.icon,
                                label: item.label,
                                children: item.dropdown.map((sub) => ({
                                    key: sub.key,
                                    icon: sub.icon,
                                    label: sub.label,
                                    onClick: (info) => {
                                        sub.onClick(info);
                                        setDrawerOpen(false);
                                    },
                                })),
                            };
                        }
                        return {
                            key: item.key,
                            icon: item.icon,
                            label: item.label,
                            onClick: () => {
                                navigate(localizePath(currentLang, item.key));
                                setDrawerOpen(false);
                            },
                        };
                    })}
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
