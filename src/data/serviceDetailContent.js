/* Shared by ServiceDetailPage.jsx and any page that needs to link to / preview
   a service item (e.g. HomePage's category showcase) without pulling in
   ServiceDetailPage's own heavy deps (antd Form/Upload) into their bundle.

   heroImage reuses the photo already generated for the accordion detail
   panel — those files were named before the 4→6 category split, so a few
   still carry their old category prefix (savunmaSanayi-* covers today's
   savunmaSanayi AND sualtiTeknolojileri; makina-* covers today's makina AND
   endustri). materialsImage/capabilityImage exist for all 27 items now. */
export const DETAIL_DATA = {
    // Denizcilik
    'gemi-elektrik': {
        categoryKey: 'denizcilik',
        itemKey: 'gemiElektrik',
        heroImage: '/images/services/detail/denizcilik-gemiElektrik.webp',
        materialsImage: '/images/services/quote/gemi-elektrik-materials.webp',
        capabilityImage: '/images/services/quote/gemi-elektrik-capability.webp',
    },
    'gemi-makine': {
        categoryKey: 'denizcilik',
        itemKey: 'gemiMakine',
        heroImage: '/images/services/detail/denizcilik-gemiMakine.webp',
        materialsImage: '/images/services/quote/gemi-makine-materials.webp',
        capabilityImage: '/images/services/quote/gemi-makine-capability.webp',
    },
    'hidrolik-pnomatik': {
        categoryKey: 'denizcilik',
        itemKey: 'hidrolikPnomatik',
        heroImage: '/images/services/detail/denizcilik-hidrolikPnomatik.webp',
        materialsImage: '/images/services/quote/hidrolik-pnomatik-materials.webp',
        capabilityImage: '/images/services/quote/hidrolik-pnomatik-capability.webp',
    },
    'pnomatik-merdiven': {
        categoryKey: 'denizcilik',
        itemKey: 'pnomatikMerdiven',
        heroImage: '/images/services/detail/denizcilik-pnomatikMerdiven.webp',
        materialsImage: '/images/services/quote/pnomatik-merdiven-materials.webp',
        capabilityImage: '/images/services/quote/pnomatik-merdiven-capability.webp',
    },
    'komple-bakim-onarim': {
        categoryKey: 'denizcilik',
        itemKey: 'komplebakimOnarim',
        heroImage: '/images/services/detail/denizcilik-komplebakimOnarim.webp',
        materialsImage: '/images/services/quote/komple-bakim-onarim-materials.webp',
        capabilityImage: '/images/services/quote/komple-bakim-onarim-capability.webp',
    },
    'teciz-montaj-onarim': {
        categoryKey: 'denizcilik',
        itemKey: 'tecizMontajOnarim',
        heroImage: '/images/services/detail/denizcilik-tecizMontajOnarim.webp',
        materialsImage: '/images/services/quote/teciz-montaj-onarim-materials.webp',
        capabilityImage: '/images/services/quote/teciz-montaj-onarim-capability.webp',
    },
    'boru-donatim': {
        categoryKey: 'denizcilik',
        itemKey: 'boruDonatim',
        heroImage: '/images/services/detail/denizcilik-boruDonatim.webp',
        materialsImage: '/images/services/quote/boru-donatim-materials.webp',
        capabilityImage: '/images/services/quote/boru-donatim-capability.webp',
    },
    // Savunma Sanayi
    'ozel-konnektorler': {
        categoryKey: 'savunmaSanayi',
        itemKey: 'ozelKonnektorler',
        heroImage: '/images/services/detail/savunmaSanayi-ozelKonnektorler.webp',
        materialsImage: '/images/services/quote/ozel-konnektorler-materials.webp',
        capabilityImage: '/images/services/quote/ozel-konnektorler-capability.webp',
    },
    'sonar-kablolari': {
        categoryKey: 'savunmaSanayi',
        itemKey: 'sonarKablolari',
        heroImage: '/images/services/detail/savunmaSanayi-sonarKablolari.webp',
        materialsImage: '/images/services/quote/sonar-kablolari-materials.webp',
        capabilityImage: '/images/services/quote/sonar-kablolari-capability.webp',
    },
    'torpido-kablolari': {
        categoryKey: 'savunmaSanayi',
        itemKey: 'torpidoKablolari',
        heroImage: '/images/services/detail/savunmaSanayi-torpidoKablolari.webp',
        materialsImage: '/images/services/quote/torpido-kablolari-materials.webp',
        capabilityImage: '/images/services/quote/torpido-kablolari-capability.webp',
    },
    // Sualtı Teknolojileri
    'sualti-akustik': {
        categoryKey: 'sualtiTeknolojileri',
        itemKey: 'sualtiAkustik',
        heroImage: '/images/services/detail/savunmaSanayi-sualtiAkustik.webp',
        materialsImage: '/images/services/quote/sualti-akustik-materials.webp',
        capabilityImage: '/images/services/quote/sualti-akustik-capability.webp',
    },
    'sualti-kablosu': {
        categoryKey: 'sualtiTeknolojileri',
        itemKey: 'sualtiKablosu',
        heroImage: '/images/services/detail/savunmaSanayi-sualtiKablosu.webp',
        materialsImage: '/images/services/quote/sualti-kablosu-materials.webp',
        capabilityImage: '/images/services/quote/sualti-kablosu-capability.webp',
    },
    kamera: {
        categoryKey: 'sualtiTeknolojileri',
        itemKey: 'kamera',
        heroImage: '/images/services/detail/savunmaSanayi-kamera.webp',
        materialsImage: '/images/services/quote/kamera-materials.webp',
        capabilityImage: '/images/services/quote/kamera-capability.webp',
    },
    konnektor: {
        categoryKey: 'sualtiTeknolojileri',
        itemKey: 'konnektor',
        heroImage: '/images/services/detail/savunmaSanayi-konnektor.webp',
        materialsImage: '/images/services/quote/konnektor-materials.webp',
        capabilityImage: '/images/services/quote/konnektor-capability.webp',
    },
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
    konveyorler: {
        categoryKey: 'endustri',
        itemKey: 'konveyorler',
        heroImage: '/images/services/detail/makina-konveyorler.webp',
        materialsImage: '/images/services/quote/konveyorler-materials.webp',
        capabilityImage: '/images/services/quote/konveyorler-capability.webp',
    },
    'trafo-ekipmanlari': {
        categoryKey: 'endustri',
        itemKey: 'trafoEkipmanlari',
        heroImage: '/images/services/detail/makina-trafoEkipmanlari.webp',
        materialsImage: '/images/services/quote/trafo-ekipmanlari-materials.webp',
        capabilityImage: '/images/services/quote/trafo-ekipmanlari-capability.webp',
    },
    'bobin-sarim-makinalari': {
        categoryKey: 'endustri',
        itemKey: 'bobinSarimMakinalari',
        heroImage: '/images/services/detail/makina-bobinSarimMakinalari.webp',
        materialsImage: '/images/services/quote/bobin-sarim-makinalari-materials.webp',
        capabilityImage: '/images/services/quote/bobin-sarim-makinalari-capability.webp',
    },
    'bobin-sarim-manderelleri': {
        categoryKey: 'endustri',
        itemKey: 'bobinSarimManderelleri',
        heroImage: '/images/services/detail/makina-bobinSarimManderelleri.webp?v=2',
        materialsImage: '/images/services/quote/bobin-sarim-manderelleri-materials.webp',
        capabilityImage: '/images/services/quote/bobin-sarim-manderelleri-capability.webp',
    },
    'tesis-boru-donatim': {
        categoryKey: 'endustri',
        itemKey: 'tesisBoruDonatim',
        heroImage: '/images/services/detail/makina-tesisBoruDonatim.webp',
        materialsImage: '/images/services/quote/tesis-boru-donatim-materials.webp',
        capabilityImage: '/images/services/quote/tesis-boru-donatim-capability.webp',
    },
    'tesis-fabrika-kurulumu': {
        categoryKey: 'endustri',
        itemKey: 'tesisFabrikaKurulumu',
        heroImage: '/images/services/detail/makina-tesisFabrikaKurulumu.webp',
        materialsImage: '/images/services/quote/tesis-fabrika-kurulumu-materials.webp',
        capabilityImage: '/images/services/quote/tesis-fabrika-kurulumu-capability.webp',
    },
    // Elektronik ve Otomasyon
    'pcb-tasarim': {
        categoryKey: 'elektronikOtomasyon',
        itemKey: 'pcbTasarim',
        heroImage: '/images/services/detail/elektronikOtomasyon-pcbTasarim.webp',
        materialsImage: '/images/services/quote/pcb-tasarim-materials.webp',
        capabilityImage: '/images/services/quote/pcb-tasarim-capability.webp',
    },
    'elektronik-tasarim': {
        categoryKey: 'elektronikOtomasyon',
        itemKey: 'elektronikTasarim',
        heroImage: '/images/services/detail/elektronikOtomasyon-elektronikTasarim.webp',
        materialsImage: '/images/services/quote/elektronik-tasarim-materials.webp',
        capabilityImage: '/images/services/quote/elektronik-tasarim-capability.webp',
    },
    'otomasyon-entegrasyon': {
        categoryKey: 'elektronikOtomasyon',
        itemKey: 'otomasyonEntegrasyon',
        heroImage: '/images/services/detail/elektronikOtomasyon-otomasyonEntegrasyon.webp',
        materialsImage: '/images/services/quote/otomasyon-entegrasyon-materials.webp',
        capabilityImage: '/images/services/quote/otomasyon-entegrasyon-capability.webp',
    },
};

export const SLUGS = Object.keys(DETAIL_DATA);
