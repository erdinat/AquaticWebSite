/* Shared by ServiceDetailPage.jsx and any page that needs to link to / preview
   a service item (e.g. HomePage's category showcase) without pulling in
   ServiceDetailPage's own heavy deps (antd Form/Upload) into their bundle.

   heroImage reuses the photo already generated for the accordion detail
   panel — those files were named before the 4→6 category split, so a few
   still carry their old category prefix (savunmaSanayi-* covers today's
   savunmaSanayi AND sualtiTeknolojileri; makina-* covers today's makina AND
   endustri). */
export const DETAIL_DATA = {
    // Denizcilik
    'gemi-elektrik': { categoryKey: 'denizcilik', itemKey: 'gemiElektrik', heroImage: '/images/services/detail/denizcilik-gemiElektrik.webp' },
    'gemi-makine': { categoryKey: 'denizcilik', itemKey: 'gemiMakine', heroImage: '/images/services/detail/denizcilik-gemiMakine.webp' },
    'hidrolik-pnomatik': { categoryKey: 'denizcilik', itemKey: 'hidrolikPnomatik', heroImage: '/images/services/detail/denizcilik-hidrolikPnomatik.webp' },
    'pnomatik-merdiven': { categoryKey: 'denizcilik', itemKey: 'pnomatikMerdiven', heroImage: '/images/services/detail/denizcilik-pnomatikMerdiven.webp' },
    'komple-bakim-onarim': { categoryKey: 'denizcilik', itemKey: 'komplebakimOnarim', heroImage: '/images/services/detail/denizcilik-komplebakimOnarim.webp' },
    'teciz-montaj-onarim': { categoryKey: 'denizcilik', itemKey: 'tecizMontajOnarim', heroImage: '/images/services/detail/denizcilik-tecizMontajOnarim.webp' },
    'boru-donatim': { categoryKey: 'denizcilik', itemKey: 'boruDonatim', heroImage: '/images/services/detail/denizcilik-boruDonatim.webp' },
    // Savunma Sanayi
    'ozel-konnektorler': { categoryKey: 'savunmaSanayi', itemKey: 'ozelKonnektorler', heroImage: '/images/services/detail/savunmaSanayi-ozelKonnektorler.webp' },
    'sonar-kablolari': { categoryKey: 'savunmaSanayi', itemKey: 'sonarKablolari', heroImage: '/images/services/detail/savunmaSanayi-sonarKablolari.webp' },
    'torpido-kablolari': { categoryKey: 'savunmaSanayi', itemKey: 'torpidoKablolari', heroImage: '/images/services/detail/savunmaSanayi-torpidoKablolari.webp' },
    // Sualtı Teknolojileri
    'sualti-akustik': { categoryKey: 'sualtiTeknolojileri', itemKey: 'sualtiAkustik', heroImage: '/images/services/detail/savunmaSanayi-sualtiAkustik.webp' },
    'sualti-kablosu': { categoryKey: 'sualtiTeknolojileri', itemKey: 'sualtiKablosu', heroImage: '/images/services/detail/savunmaSanayi-sualtiKablosu.webp' },
    kamera: { categoryKey: 'sualtiTeknolojileri', itemKey: 'kamera', heroImage: '/images/services/detail/savunmaSanayi-kamera.webp' },
    konnektor: { categoryKey: 'sualtiTeknolojileri', itemKey: 'konnektor', heroImage: '/images/services/detail/savunmaSanayi-konnektor.webp' },
    // Aquatic Makina
    'talasli-imalat': {
        categoryKey: 'makina',
        itemKey: 'talasliImalat',
        heroImage: '/images/services/detail/makina-talasliImalat.webp',
        materialsImage: '/images/services/quote/talasli-imalat-materials.webp',
        capabilityImage: '/images/services/quote/talasli-imalat-capability.webp',
    },
    'kaynakli-imalat': {
        categoryKey: 'makina',
        itemKey: 'kaynakliImalat',
        heroImage: '/images/services/detail/makina-kaynakliImalat.webp',
        materialsImage: '/images/services/quote/kaynakli-imalat-materials.webp',
        capabilityImage: '/images/services/quote/kaynakli-imalat-capability.webp',
    },
    'ozel-imalat-makinalari': {
        categoryKey: 'makina',
        itemKey: 'ozelImalatMakinalar',
        heroImage: '/images/services/detail/makina-ozelImalatMakinalar.webp',
        materialsImage: '/images/services/quote/ozel-imalat-makinalari-materials.webp',
        capabilityImage: '/images/services/quote/ozel-imalat-makinalari-capability.webp',
    },
    '3d-tasarim': {
        categoryKey: 'makina',
        itemKey: 'tasarim3d',
        heroImage: '/images/services/detail/makina-tasarim3d.webp',
        materialsImage: '/images/services/quote/3d-tasarim-materials.webp',
        capabilityImage: '/images/services/quote/3d-tasarim-capability.webp',
    },
    // Aquatic Endüstri
    konveyorler: { categoryKey: 'endustri', itemKey: 'konveyorler', heroImage: '/images/services/detail/makina-konveyorler.webp' },
    'trafo-ekipmanlari': { categoryKey: 'endustri', itemKey: 'trafoEkipmanlari', heroImage: '/images/services/detail/makina-trafoEkipmanlari.webp' },
    'bobin-sarim-makinalari': { categoryKey: 'endustri', itemKey: 'bobinSarimMakinalari', heroImage: '/images/services/detail/makina-bobinSarimMakinalari.webp' },
    'bobin-sarim-manderelleri': { categoryKey: 'endustri', itemKey: 'bobinSarimManderelleri', heroImage: '/images/services/detail/makina-bobinSarimManderelleri.webp' },
    'tesis-boru-donatim': { categoryKey: 'endustri', itemKey: 'tesisBoruDonatim', heroImage: '/images/services/detail/makina-tesisBoruDonatim.webp' },
    'tesis-fabrika-kurulumu': { categoryKey: 'endustri', itemKey: 'tesisFabrikaKurulumu', heroImage: '/images/services/detail/makina-tesisFabrikaKurulumu.webp' },
    // Elektronik ve Otomasyon
    'pcb-tasarim': { categoryKey: 'elektronikOtomasyon', itemKey: 'pcbTasarim', heroImage: '/images/services/detail/elektronikOtomasyon-pcbTasarim.webp' },
    'elektronik-tasarim': { categoryKey: 'elektronikOtomasyon', itemKey: 'elektronikTasarim', heroImage: '/images/services/detail/elektronikOtomasyon-elektronikTasarim.webp' },
    'otomasyon-entegrasyon': { categoryKey: 'elektronikOtomasyon', itemKey: 'otomasyonEntegrasyon', heroImage: '/images/services/detail/elektronikOtomasyon-otomasyonEntegrasyon.webp' },
};

export const SLUGS = Object.keys(DETAIL_DATA);
