import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout, Menu, Button, Drawer, Dropdown, Space } from 'antd';
import LocalizedLink from '../common/LocalizedLink';
import { splitLangFromPath, localizePath, isKzDomain } from '../../i18n/langRouting';
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
    FileTextOutlined,
    TeamOutlined,
    HistoryOutlined,
    AimOutlined,
    TrophyOutlined,
    QuestionCircleOutlined,
    DownOutlined,
    PlayCircleOutlined,
    PictureOutlined,
} from '@ant-design/icons';
import { getActiveServiceGroups } from '../../data/serviceGroups';
import AquaticLogo from '../../assets/images/logo.webp';

const { Header } = Layout;

/* Language options with labels */
const languages = [
    { key: 'tr', label: '🇹🇷 Türkçe' },
    { key: 'en', label: '🇬🇧 English' },
    { key: 'kk', label: '🇰🇿 Қазақша' },
    { key: 'ru', label: '🇷🇺 Русский' },
    { key: 'zh', label: '🇨🇳 中文' },
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

    /* Scroll to section helper. When navigating from another page first,
       the target page is lazy-loaded (React.lazy) — a fixed setTimeout could
       fire before its chunk finishes loading and the section element exists,
       silently landing the user at the top of the page instead. Polling for
       the element (up to ~3s) is robust to that variable load time. */
    const scrollToSection = (path, hash) => {
        const tryScroll = (attemptsLeft) => {
            const el = document.getElementById(hash);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (attemptsLeft > 0) {
                setTimeout(() => tryScroll(attemptsLeft - 1), 150);
            }
        };
        if (barePath === path) {
            tryScroll(0);
        } else {
            navigate(localizePath(currentLang, path));
            setTimeout(() => tryScroll(20), 150);
        }
    };

    /* Home dropdown sections — kept in sync with HomePage.jsx's actual
       <section id="..."> ids (this list drifted stale before: catalogs and
       gallery sections existed on the page but were missing here). */
    const homeDropdownItems = [
        { key: 'home-stats', icon: <BarChartOutlined />, label: t('dropdown.home.stats') },
        {
            key: 'home-category-showcase',
            icon: <ShoppingOutlined />,
            label: t('dropdown.home.categoryShowcase'),
        },
        ...(isKzDomain()
            ? [
                  {
                      key: 'home-kz-video',
                      icon: <PlayCircleOutlined />,
                      label: t('dropdown.home.kzVideo'),
                  },
              ]
            : []),
        { key: 'home-catalogs', icon: <FileTextOutlined />, label: t('dropdown.home.catalogs') },
        { key: 'home-gallery', icon: <PictureOutlined />, label: t('dropdown.home.gallery') },
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

    /* Services dropdown — built directly from getActiveServiceGroups() (the
       same source ServicesPage.jsx/ServiceCategoryPage.jsx use), instead of
       a hand-maintained category list here that had already drifted out of
       sync once. aquatic.kz automatically gets its reshuffled 4-category
       list, everywhere else the full 6 categories — no separate branching
       needed here anymore.

       Each category now also lists its own items as a nested flyout (hover
       over "Sualtı Teknolojileri" to see its items) — antd doesn't reliably
       fire onClick on a SubMenu's own title, so a "view category" leaf is
       added at the top of each flyout as the guaranteed way to still reach
       the category page itself. */
    const servicesDropdownItems = getActiveServiceGroups().map((group) => {
        const groupTitleKey = group.titleKey || `services.${group.key}.title`;
        const goToCategory = ({ domEvent }) => {
            domEvent.stopPropagation();
            navigate(localizePath(currentLang, `/services/category/${group.key}`));
        };
        return {
            key: group.key,
            icon: group.icon,
            label: t(groupTitleKey),
            onClick: goToCategory,
            children: [
                {
                    key: `${group.key}-overview`,
                    label: <strong>{t('services.viewLabel')}</strong>,
                    onClick: goToCategory,
                },
                { type: 'divider' },
                ...group.items.map((item) => ({
                    key: item.slug,
                    icon: item.icon,
                    label: t(
                        item.titleKey ||
                            `services.${item.i18nCategoryKey || group.key}.items.${item.key}.title`
                    ),
                    onClick: ({ domEvent }) => {
                        domEvent.stopPropagation();
                        navigate(localizePath(currentLang, `/services/${item.slug}`));
                    },
                })),
            ],
        };
    });

    /* Navigation items — Contact and Black Box show directly again (no longer
       tucked under a "More" dropdown). Careers has no nav entry here — it's
       reachable via the footer's Quick Links (see AppFooter.jsx). */
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
        { key: '/contact', label: t('nav.contact'), icon: <MailOutlined /> },
        { key: '/blackbox', label: t('nav.blackbox'), icon: <SafetyCertificateOutlined /> },
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
                                // Services categories carry their own nested
                                // items (sub.children) — inline Menu supports
                                // arbitrary nesting natively, so a category
                                // becomes a second expandable level here too.
                                children: item.dropdown.map((sub) => {
                                    if (sub.type === 'divider') return sub;
                                    return {
                                        key: sub.key,
                                        icon: sub.icon,
                                        label: sub.label,
                                        onClick: sub.children
                                            ? undefined
                                            : (info) => {
                                                  sub.onClick(info);
                                                  setDrawerOpen(false);
                                              },
                                        children: sub.children?.map((leaf) => {
                                            if (leaf.type === 'divider') return leaf;
                                            return {
                                                key: leaf.key,
                                                icon: leaf.icon,
                                                label: leaf.label,
                                                onClick: (info) => {
                                                    leaf.onClick(info);
                                                    setDrawerOpen(false);
                                                },
                                            };
                                        }),
                                    };
                                }),
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
                    <Space wrap className="drawer-lang-switcher">
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

            {/* Responsive CSS for header.
                Breakpoint raised from 768px to 1300px (1 Eylül 2026): with
                6 direct nav items (İletişim + Kara Kutu moved back out of the
                old "Diğer" dropdown) + the language switcher, antd's
                horizontal <Menu> was silently collapsing the last couple of
                items into its own hidden "..." overflow submenu on anything
                narrower than roughly ~1300px — items weren't actually gone,
                just swept into an easy-to-miss indicator. Switching to the
                mobile drawer earlier avoids that half-broken "desktop" zone
                entirely, at the cost of the drawer appearing on some tablet
                widths that used to still get the horizontal menu. */}
            <style>{`
        /* Tighter item spacing buys extra safety margin against the same
           antd horizontal-Menu overflow-collapse issue, especially for
           languages whose nav labels run longer than Turkish (RU/KK). */
        .desktop-nav .ant-menu-item,
        .desktop-nav .ant-menu-submenu-title {
          padding-left: 14px !important;
          padding-right: 14px !important;
        }

        @media (max-width: 1300px) {
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
