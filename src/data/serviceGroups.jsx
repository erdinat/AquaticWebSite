/* Shared by ServicesPage.jsx (category picker grid) and
   ServiceCategoryPage.jsx (a single category's own page) so the 6
   categories × 27 items × icon assignments live in exactly one place. */
import {
    RocketOutlined,
    ThunderboltOutlined,
    ToolOutlined,
    CompassOutlined,
    RadarChartOutlined,
    AudioOutlined,
    ApiOutlined,
    BuildOutlined,
    LayoutOutlined,
    ScissorOutlined,
    ControlOutlined,
    SettingOutlined,
    DashboardOutlined,
    DeploymentUnitOutlined,
    BulbOutlined,
    SafetyCertificateOutlined,
    GlobalOutlined,
    BankOutlined,
    CameraOutlined,
} from '@ant-design/icons';

import imgDefence from '../assets/images/savunmasanayi.webp';
import imgElectronics from '../assets/images/elektrik.webp';
import imgMachinery from '../assets/images/makina.webp';
import imgMaritime from '../assets/images/denizcilik.webp';

export const SERVICE_GROUPS = [
    {
        key: 'denizcilik',
        icon: <CompassOutlined />,
        color: 'var(--color-primary-dark)',
        gradient: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
        image: imgMaritime,
        items: [
            { key: 'gemiElektrik', icon: <BulbOutlined />, slug: 'gemi-elektrik' },
            { key: 'gemiMakine', icon: <SettingOutlined />, slug: 'gemi-makine' },
            { key: 'hidrolikPnomatik', icon: <ControlOutlined />, slug: 'hidrolik-pnomatik' },
            { key: 'pnomatikMerdiven', icon: <DeploymentUnitOutlined />, slug: 'pnomatik-merdiven' },
            { key: 'komplebakimOnarim', icon: <SafetyCertificateOutlined />, slug: 'komple-bakim-onarim' },
            { key: 'tecizMontajOnarim', icon: <BuildOutlined />, slug: 'teciz-montaj-onarim' },
            { key: 'boruDonatim', icon: <ApiOutlined />, slug: 'boru-donatim' },
        ],
    },
    {
        key: 'savunmaSanayi',
        icon: <RocketOutlined />,
        color: 'var(--color-primary)',
        gradient: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
        image: imgDefence,
        items: [
            { key: 'ozelKonnektorler', icon: <ApiOutlined />, slug: 'ozel-konnektorler' },
            { key: 'sonarKablolari', icon: <AudioOutlined />, slug: 'sonar-kablolari' },
            { key: 'torpidoKablolari', icon: <RadarChartOutlined />, slug: 'torpido-kablolari' },
        ],
    },
    {
        key: 'sualtiTeknolojileri',
        icon: <GlobalOutlined />,
        color: 'var(--color-accent)',
        gradient: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
        image: '/images/services/detail/savunmaSanayi-konnektor.webp',
        items: [
            { key: 'sualtiAkustik', icon: <DashboardOutlined />, slug: 'sualti-akustik' },
            { key: 'sualtiKablosu', icon: <DeploymentUnitOutlined />, slug: 'sualti-kablosu' },
            { key: 'kamera', icon: <CameraOutlined />, slug: 'kamera' },
            { key: 'konnektor', icon: <ApiOutlined />, slug: 'konnektor' },
        ],
    },
    {
        key: 'makina',
        icon: <ToolOutlined />,
        color: '#005f73',
        gradient: 'linear-gradient(135deg, #005f73, #0a9396)',
        image: imgMachinery,
        items: [
            { key: 'kaynakliImalat', icon: <ScissorOutlined />, slug: 'kaynakli-imalat' },
            { key: 'ozelImalatMakinalar', icon: <SettingOutlined />, slug: 'ozel-imalat-makinalari' },
            { key: 'tasarim3d', icon: <LayoutOutlined />, slug: '3d-tasarim' },
            { key: 'talasliImalat', icon: <ControlOutlined />, slug: 'talasli-imalat' },
        ],
    },
    {
        key: 'endustri',
        icon: <BankOutlined />,
        color: '#0a9396',
        gradient: 'linear-gradient(135deg, #0a9396, #005f73)',
        image: '/images/services/detail/makina-konveyorler.webp',
        items: [
            { key: 'konveyorler', icon: <DeploymentUnitOutlined />, slug: 'konveyorler' },
            { key: 'trafoEkipmanlari', icon: <BuildOutlined />, slug: 'trafo-ekipmanlari' },
            { key: 'bobinSarimMakinalari', icon: <ToolOutlined />, slug: 'bobin-sarim-makinalari' },
            { key: 'bobinSarimManderelleri', icon: <DashboardOutlined />, slug: 'bobin-sarim-manderelleri' },
            { key: 'tesisBoruDonatim', icon: <ApiOutlined />, slug: 'tesis-boru-donatim' },
            { key: 'tesisFabrikaKurulumu', icon: <BankOutlined />, slug: 'tesis-fabrika-kurulumu' },
        ],
    },
    {
        key: 'elektronikOtomasyon',
        icon: <ThunderboltOutlined />,
        color: 'var(--color-accent-dark)',
        gradient: 'linear-gradient(135deg, var(--color-accent-dark), var(--color-accent))',
        image: imgElectronics,
        items: [
            { key: 'pcbTasarim', icon: <LayoutOutlined />, slug: 'pcb-tasarim' },
            { key: 'elektronikTasarim', icon: <ThunderboltOutlined />, slug: 'elektronik-tasarim' },
            { key: 'otomasyonEntegrasyon', icon: <DashboardOutlined />, slug: 'otomasyon-entegrasyon' },
        ],
    },
];

export const VALID_SERVICE_KEYS = SERVICE_GROUPS.map((g) => g.key);
