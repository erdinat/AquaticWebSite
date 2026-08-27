import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Card, Layout, Menu, Empty, Pagination } from 'antd';
import { DownOutlined, UpOutlined, AppstoreOutlined, InfoCircleOutlined } from '@ant-design/icons';
import PageHero from '../components/common/PageHero';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import PageSEO from '../components/common/PageSEO';
import imgHero from '../assets/images/products.webp';
import './ProductsPage.css';

import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { categoryColors, getCategoryIcon } from '../data/productCategoryVisuals';

const { Sider, Content } = Layout;

const ProductsPage = () => {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedProduct, setExpandedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 6;

    useRevealAnimation();

    const toggleExpand = (id) => {
        setExpandedProduct((prev) => (prev === id ? null : id));
    };

    const handleMenuClick = (e) => {
        setActiveCategory(e.key);
        setExpandedProduct(null);
        setCurrentPage(1);
    };

    const getCategoryName = (categoryId) => {
        const cat = categoriesData.find((c) => c.id === categoryId);
        return cat ? t(cat.nameKey, cat.id) : categoryId;
    };

    const menuItems = [
        {
            key: 'all',
            icon: <AppstoreOutlined />,
            label: (
                <span className="menu-item-label">
                    <span>{t('products.categories.all', 'All Products')}</span>
                    <span className="menu-item-count">{productsData.length}</span>
                </span>
            ),
        },
        ...categoriesData.map((cat) => {
            const count = productsData.filter((p) => p.categoryId === cat.id).length;
            return {
                key: cat.id,
                icon: getCategoryIcon(cat.id),
                label: (
                    <span className="menu-item-label">
                        <span>{t(cat.nameKey, cat.id)}</span>
                        <span className="menu-item-count">{count}</span>
                    </span>
                ),
            };
        }),
    ];

    const filteredProducts =
        activeCategory === 'all'
            ? productsData
            : productsData.filter((p) => p.categoryId === activeCategory);

    const pagedProducts = filteredProducts.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    return (
        <div className="products-page">
            <PageSEO titleKey="nav.products" descriptionKey="products.subtitle" path="/products" />
            <PageHero
                title={t('products.title')}
                subtitle={t('products.subtitle')}
                bgImage={imgHero}
            />

            <section className="section products-section">
                <div className="container">
                    <Layout className="products-layout" style={{ background: 'transparent' }}>
                        <Sider
                            width={260}
                            breakpoint="lg"
                            collapsedWidth="0"
                            className="products-sider reveal"
                            theme="light"
                        >
                            <h3 className="sider-title">
                                {t('products.filterTitle', 'Categories')}
                            </h3>
                            <Menu
                                mode="inline"
                                selectedKeys={[activeCategory]}
                                onClick={handleMenuClick}
                                items={menuItems}
                                className="products-menu"
                            />
                        </Sider>

                        <Content className="products-content">
                            {activeCategory === 'subsea-lights-lasers' && (
                                <div className="products-concept-note reveal">
                                    <InfoCircleOutlined />
                                    <span>{t('products.conceptNote')}</span>
                                </div>
                            )}
                            {filteredProducts.length === 0 ? (
                                <Empty
                                    description={t(
                                        'products.noProducts',
                                        'No products found in this category.'
                                    )}
                                    className="reveal"
                                />
                            ) : (
                                <>
                                    <Row gutter={[28, 28]}>
                                        {pagedProducts.map((product) => {
                                            const isExpanded = expandedProduct === product.id;
                                            const accentColor =
                                                categoryColors[product.categoryId] ||
                                                'var(--color-primary)';

                                            return (
                                                <Col xs={24} lg={12} key={product.id}>
                                                    <div
                                                        className="reveal"
                                                        style={{ height: '100%' }}
                                                    >
                                                        <Card
                                                            hoverable
                                                            className={`product-card${isExpanded ? ' product-card--expanded' : ''}`}
                                                            cover={
                                                                <div className="product-image-wrapper">
                                                                    {product.images?.[0] ? (
                                                                        <img
                                                                            alt={product.name}
                                                                            src={product.images[0]}
                                                                            loading="lazy"
                                                                        />
                                                                    ) : (
                                                                        <div
                                                                            className="product-image-placeholder"
                                                                            style={{
                                                                                color:
                                                                                    categoryColors[
                                                                                        product
                                                                                            .categoryId
                                                                                    ] ||
                                                                                    'var(--color-primary)',
                                                                            }}
                                                                            aria-hidden="true"
                                                                        >
                                                                            {getCategoryIcon(
                                                                                product.categoryId
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    {product.isPremium && (
                                                                        <div className="product-premium-badge">
                                                                            Premium
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            }
                                                        >
                                                            <div className="product-category-label">
                                                                <span
                                                                    className="product-category-dot"
                                                                    style={{
                                                                        background: accentColor,
                                                                    }}
                                                                />
                                                                {getCategoryName(
                                                                    product.categoryId
                                                                )}
                                                            </div>

                                                            <div className="product-header">
                                                                <h3 className="product-title">
                                                                    {product.name}
                                                                </h3>
                                                            </div>

                                                            <p className="product-desc">
                                                                {t(
                                                                    `products.descriptions.${product.id}`,
                                                                    product.shortDescription
                                                                )}
                                                            </p>

                                                            <button
                                                                className="harness-toggle-btn"
                                                                onClick={() =>
                                                                    toggleExpand(product.id)
                                                                }
                                                                aria-expanded={isExpanded}
                                                            >
                                                                {isExpanded
                                                                    ? t(
                                                                          'products.viewLess',
                                                                          'View Less'
                                                                      )
                                                                    : t(
                                                                          'products.viewMore',
                                                                          'View Details'
                                                                      )}
                                                                {isExpanded ? (
                                                                    <UpOutlined />
                                                                ) : (
                                                                    <DownOutlined />
                                                                )}
                                                            </button>

                                                            {isExpanded && (
                                                                <div className="harness-detail-panel">
                                                                    <h5 className="harness-specs-title">
                                                                        {t(
                                                                            'products.specsTitle',
                                                                            'Technical Specifications'
                                                                        )}
                                                                    </h5>
                                                                    <table className="harness-specs-table">
                                                                        <tbody>
                                                                            {Object.entries(
                                                                                product.specs || {}
                                                                            ).map(
                                                                                ([key, value]) => (
                                                                                    <tr key={key}>
                                                                                        <td className="harness-spec-label">
                                                                                            {key}
                                                                                        </td>
                                                                                        <td className="harness-spec-value">
                                                                                            {value}
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            )}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )}
                                                        </Card>
                                                    </div>
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                    {filteredProducts.length > PAGE_SIZE && (
                                        <div className="products-pagination">
                                            <Pagination
                                                current={currentPage}
                                                pageSize={PAGE_SIZE}
                                                total={filteredProducts.length}
                                                onChange={(page) => {
                                                    setCurrentPage(page);
                                                    setExpandedProduct(null);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                showSizeChanger={false}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </Content>
                    </Layout>
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;
