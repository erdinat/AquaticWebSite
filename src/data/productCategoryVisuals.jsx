/* Shared by ProductsPage.jsx and any page that needs a product-category
   color/icon (e.g. HomePage's category showcase) without pulling in
   ProductsPage's own heavy deps (antd Table/Card/Menu/Pagination) into
   their bundle. */
import {
    AppstoreOutlined,
    SettingOutlined,
    CameraOutlined,
    BulbOutlined,
    ApiOutlined,
    ThunderboltOutlined,
    ExperimentOutlined,
    GlobalOutlined,
    ControlOutlined,
    CompressOutlined,
    SafetyOutlined,
    NodeIndexOutlined,
    ToolOutlined,
} from '@ant-design/icons';

export const categoryColors = {
    'kucuk-mikro-dairesel': 'var(--color-primary)',
    'standart-dairesel': 'var(--color-primary-dark)',
    'guc-serileri': 'var(--color-accent-dark)',
    'yag-dolgulu': 'var(--color-accent)',
    'ethernet-koaksiyel': 'var(--color-primary-light)',
    'rm-lpm-serisi': 'var(--color-primary)',
    'dusuk-profilli': 'var(--color-accent-dark)',
    'metal-govdeli': 'var(--color-primary-dark)',
    'fiber-optik': 'var(--color-accent)',
    'konnektor-aksesuarlari': 'var(--color-text-muted)',
    'underwater-cameras': 'var(--color-primary)',
    'subsea-lights-lasers': '#0096c7',
};

export const getCategoryIcon = (id) => {
    switch (id) {
        case 'kucuk-mikro-dairesel':
            return <SettingOutlined />;
        case 'standart-dairesel':
            return <ApiOutlined />;
        case 'guc-serileri':
            return <ThunderboltOutlined />;
        case 'yag-dolgulu':
            return <ExperimentOutlined />;
        case 'ethernet-koaksiyel':
            return <GlobalOutlined />;
        case 'rm-lpm-serisi':
            return <ControlOutlined />;
        case 'dusuk-profilli':
            return <CompressOutlined />;
        case 'metal-govdeli':
            return <SafetyOutlined />;
        case 'fiber-optik':
            return <NodeIndexOutlined />;
        case 'konnektor-aksesuarlari':
            return <ToolOutlined />;
        case 'underwater-cameras':
            return <CameraOutlined />;
        case 'subsea-lights-lasers':
            return <BulbOutlined />;
        default:
            return <AppstoreOutlined />;
    }
};
