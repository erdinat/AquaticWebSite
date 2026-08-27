# CLAUDE.md — Aquatic Elektronik Web Sitesi

> React 19 + Vite 7 + Ant Design 6 + i18next (TR/EN/KK/RU) + EmailJS  
> Son güncelleme: 26 Ağustos 2026

---

## Proje Özeti

Kurumsal web sitesi. 8 sayfa (7 ana + 404), tek repo, FTP ile cPanel'e deploy.

| Alan | Detay |
|------|-------|
| Framework | React 19, Vite 7, React Router 7 |
| UI | Ant Design 6, CSS Custom Properties (design tokens) |
| i18n | i18next — TR, EN, KK, RU (`src/locales/*.json`) |
| Form | EmailJS (`@emailjs/browser`) — Contact + Careers |
| SEO | `react-helmet-async` + `PageSEO` component |
| Deploy | `npm run build` → `dist/` → `aquatic_deploy.zip` → cPanel/FTP |
| Repo | https://github.com/erdinat/AquaticWebSite |

### Sayfalar

| Route | Dosya | Açıklama |
|-------|-------|----------|
| `/` | `HomePage.jsx` | Hero, stats, services preview, products slider, brands marquee, CTA |
| `/corporate` | `CorporatePage.jsx` | Hakkımızda, değerler, banka bilgileri, SSS |
| `/services` | `ServicesPage.jsx` | 4 kategori (Denizcilik, Savunma Sanayi & Sualtı, Makina & Endüstri, Elektronik&Otomasyon), 27 hizmet, akordeon detay açma |
| `/products` | `ProductsPage.jsx` | 51 ürün (48 gerçek konnektör serisi + 3 kamera/ışık), 12 kategori, expand panel ile teknik özellik tablosu |
| `/blackbox` | `BlackBoxPage.jsx` | Kara Kutu ürün detay sayfası |
| `/careers` | `CareersPage.jsx` | Açık pozisyonlar, CV upload (EmailJS) |
| `/contact` | `ContactPage.jsx` | İletişim formu (EmailJS), harita |
| `*` | `NotFoundPage.jsx` | 404 hata sayfası (noindex) |

---

## Mimari Yapı

```
src/
├── components/
│   ├── common/
│   │   ├── PageHero.jsx        ← Tüm alt sayfa hero bölümlerini yönetir
│   │   ├── PageSEO.jsx         ← Tüm sayfalara dinamik SEO + JSON-LD sağlar
│   │   ├── LocalizedLink.jsx   ← <Link> sarmalayıcısı, `to`'yu URL diline göre prefiksler
│   │   └── HoneypotField.jsx   ← Contact/Careers formlarında paylaşılan spam-honeypot alanı
│   ├── Layout/
│   │   ├── MainLayout.jsx
│   │   ├── AppHeader.jsx
│   │   └── AppFooter.jsx
│   ├── BackgroundParticles.jsx
│   ├── ErrorBoundary.jsx       ← App-level hata yakalayıcı
│   ├── LangSync.jsx            ← URL'deki dili i18next ile senkron tutar (tek doğruluk kaynağı: URL)
│   └── ScrollToTop.jsx
├── hooks/
│   ├── useRevealAnimation.js   ← IntersectionObserver custom hook
│   └── useLocalizedNavigate.js ← useNavigate() sarmalayıcısı, path'leri URL diline göre prefiksler
├── i18n/
│   └── langRouting.js          ← SUPPORTED_LANGS, DEFAULT_LANG, splitLangFromPath(), localizePath()
├── pages/                      ← Tüm sayfalar React.lazy() ile yükleniyor
├── locales/                    ← tr.json, en.json, ru.json, kk.json
├── assets/
├── App.jsx                     ← Route tanımları (TR prefiksiz + /en,/ru,/kk) + lazy imports + Suspense
├── main.jsx                    ← ErrorBoundary > HelmetProvider > BrowserRouter > App
├── i18n.js
└── index.css                   ← Global design tokens + .reveal animasyonu
```

### Çok Dilli URL Routing (21 Ağustos 2026'da eklendi)

TR varsayılan/kanonik dil olup URL'de prefiks taşımaz (`/corporate`); EN/RU/KK sırasıyla `/en`, `/ru`, `/kk` altında sunulur (`/en/corporate`). URL tek doğruluk kaynağıdır — `LangSync` her route değişiminde i18next'i URL'deki dille senkronlar. İç navigasyon her zaman `useLocalizedNavigate()` / `<LocalizedLink>` üzerinden yapılmalı (çıplak `useNavigate()`/`<Link>` kullanımı dil prefiksini kaybeder).

---

## Design Tokens (src/index.css)

> **21 Ağustos 2026 — marka yenileme:** Eski palet (`#0050b3` mavi → `#00b4d8` cyan gradient, Inter+Outfit) "AI-üretimi/jenerik SaaS" izlenimi verdiği için değiştirildi. Yeni palet: tek-tonlu koyu çelik lacivert (otorite/mühendislik hissi), vurgu rengi doygunluğu düşürüldü. Başlık fontu Outfit → IBM Plex Sans (Inter body'de kaldı). Detaylar için bkz. "✅ Tamamlanan İyileştirmeler › Marka Yenileme".

```css
--color-primary: #0a3d62        /* eski: #0050b3 */
--color-primary-hover: #072b45
--color-primary-dark: #041f33
--color-accent: #4a7c82         /* eski: #00b4d8 (parlak cyan) */
--color-text-secondary: #4a5568   /* WCAG AA uyumlu */
--color-text-muted: #6b7280       /* WCAG AA uyumlu */

--font-display: 'IBM Plex Sans', 'Inter', sans-serif   /* eski: 'Outfit' */
--font-primary: 'Inter', ...                            /* değişmedi */

--font-size-display: 3.5rem
--font-size-h1: 2.5rem
--font-size-h2: 1.75rem
--font-size-h3: 1.25rem
--font-size-body: 1rem
--font-size-body-sm: 0.875rem
--font-size-caption: 0.75rem
```

Tüm sayfalardaki hardcoded `#0050b3`/`#00b4d8`/`#0077b6`/`#003a8c` hex değerleri (13 dosya) `var(--color-primary)` vb. token referanslarına çevrildi — artık marka rengi tek yerden (`index.css`) değişebiliyor.

---

## ✅ Tamamlanan İyileştirmeler

### 🔴 HIGH — Çözüldü

| # | Sorun | Çözüm | Tarih |
|---|-------|-------|-------|
| 1 | `index.html`'de `<title>` yoktu | `<title>` tag eklendi | 6 Nis 2026 |
| 2 | EmailJS key'leri hardcode idi | `.env` dosyasına taşındı, `import.meta.env.VITE_EMAILJS_*` kullanılıyor | 6 Nis 2026 |
| 3 | CV upload'da dosya tipi kontrolü yoktu | `beforeUpload` ile MIME type + boyut validasyonu eklendi | 6 Nis 2026 |
| 4 | 404 sayfası yoktu | `NotFoundPage.jsx` oluşturuldu, `App.jsx`'te `path="*"` ile catch-all route | 6 Nis 2026 |
| 5 | Error Boundary yoktu | `ErrorBoundary.jsx` class component — beyaz ekran yerine zarif hata UI'ı | 6 Nis 2026 |

### 🟡 MEDIUM — Çözüldü

| # | Sorun | Çözüm | Tarih |
|---|-------|-------|-------|
| 6 | IntersectionObserver 7 sayfada kopyalanmıştı | `useRevealAnimation` custom hook oluşturuldu, dependency array (`[threshold, rootMargin]`) doğru | 6 Nis 2026 |
| 7 | Page Hero JSX 6 sayfada tekrarlanıyordu | `PageHero` common component çıkarıldı (h1 dahil) | 6 Nis 2026 |
| 8 | `.reveal` CSS her sayfada tekrarlanıyordu | Tüm sayfa bazlı kopyalar silindi, sadece `index.css`'te kaldı | 6 Nis 2026 |
| 10 | React.lazy() yoktu, tüm sayfalar eager load | Route-level code splitting uygulandı (`App.jsx`), `Suspense` fallback mevcut | 6 Nis 2026 |
| 14 | Dinamik `<title>` ve meta tag yoktu | `react-helmet-async` + `PageSEO` component — 8 sayfada aktif | 6 Nis 2026 |
| — | `.gitignore` eksikti | `.env`, `*.zip`, `.DS_Store` eklendi | 12 Nis 2026 |
| — | Formlara spam koruması yoktu | Honeypot (gizli `website` alanı) — Contact + Careers'da doğrulandı | 12 Nis 2026 |
| — | `vite`/`@vitejs/plugin-react` `dependencies`'teydi | `devDependencies`'e taşındı | 12 Nis 2026 |
| — | `BackgroundParticles.jsx`'te `useMemo` eksikti | `useMemo([count])` ile particle listesi memoize edildi | 21 Ağu 2026 |
| — | ESLint + Prettier yoktu | İkisi de kuruldu, `npm run lint`/`npm run format` script'leri mevcut, `no-unused-vars` temiz | 21 Ağu 2026 |
| — | Marquee `will-change: transform` eksikti | `HomePage.css` — `.brands-marquee`, `.news-marquee-track` üzerinde mevcut | 21 Ağu 2026 |
| — | Ant Design 6 deprecated prop'lar (`visible`, `bodyStyle` vb.) | Grep ile doğrulandı, temiz | 21 Ağu 2026 |
| — | Dış linklerde `target="_blank"` reverse-tabnabbing riski | Tüm kullanımlar `rel="noopener noreferrer"` içeriyor | 21 Ağu 2026 |

### 🔴 KRİTİK (21 Ağustos 2026 denetimi) — Çözüldü

| # | Sorun | Çözüm |
|---|-------|-------|
| 1 | `BASE_URL` yanlış domain | `PageSEO.jsx` → `https://aquatic.com.tr` (kanonik domain) |
| 2-3 | Hreflang gerçek route'a uymuyordu, dil URL'e yansımıyordu | Gerçek URL bazlı çok dilli routing kuruldu (`/en`, `/ru`, `/kk` + TR prefiksiz) — bkz. yukarıdaki "Çok Dilli URL Routing" |
| 4 | JSON-LD yoktu | `PageSEO.jsx`'e gerçek Kocaeli ofis verisiyle `Organization` structured data eklendi |
| 5 | HomePage'de h1 yoktu | `hero-slogan` artık `<h1>` |
| 6 | Tıklanabilir kartlar klavye ile erişilemiyordu | `service-preview-card`/`premium-product-card`'a `role="button"`, `tabIndex`, `onKeyDown` eklendi |
| 7 | `--color-primary-hover` tanımsızdı | `index.css`'e eklendi (`#003d8f`) |
| 8 | Güvenlik header'ları yoktu | `public/.htaccess`'e CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy eklendi (NewsData.io için `connect-src` izni dahil, bkz. not) |

> ⚠️ **#9 (NewsData.io API key sızıntısı) çözülmedi — kullanıcı kararıyla geri alındı.** Önce statik içeriğe geçilmişti, ardından kullanıcı canlı haber akışını geri getirmeyi tercih etti (21 Ağu 2026). `HomePage.jsx` hâlâ `VITE_NEWSDATA_API_KEY`'i client bundle'a gömüyor — bilinçli olarak kabul edilmiş bir risk. Detay ve öneri için bkz. "Hâlâ Eksik Olan Konular › Kabul Edilen Riskler".

### 🟡 ÖNEMLİ (21 Ağustos 2026 denetimi) — Çözüldü

| # | Sorun | Çözüm |
|---|-------|-------|
| 10 | Contact/Careers honeypot kod tekrarı | `HoneypotField.jsx` ortak component'e çıkarıldı |
| 12 | Ürün kartı metinleri hardcoded Türkçe'ydi | `popularProducts.items.*` anahtarlarıyla 4 dile taşındı |
| 13-14 | Ölü + duplicate asset'ler | 21 dosya silindi (ölü görseller, `main.png` 7.8MB dahil, kullanılmayan kopyalar); `camera.webp` bilinçli olarak iki yerde kalmaya devam ediyor (ikisi de aktif kullanımda) |
| 15 | `<img>` width/height eksikti | `HomePage.jsx`, `ServicesPage.jsx`'teki statik görsellere gerçek intrinsic boyutlar eklendi (`ProductsPage.jsx` zaten sabit yükseklikli container kullanıyor, CLS riski yoktu) |
| 17-18 | sitemap.xml eksikti, NotFoundPage PageSEO kullanmıyordu | sitemap.xml 28 URL + hreflang ile yeniden üretildi (`/careers` dahil); `robots.txt` `.tr` domaine güncellendi; `NotFoundPage` artık `PageSEO noindex` kullanıyor |
| 19 | CV upload sadece MIME kontrolü yapıyordu | Uzantı kontrolü de eklendi (yine de client-side — gerçek çözüm backend gerektirir) |
| 20 | `npm audit`: 10 açık | `npm audit fix` çalıştırıldı, **0 açık** kaldı |
| 22 | ContactPage generic hata mesajı veriyordu | CareersPage'deki `error?.text` deseni uygulandı |
| 23 | AppHeader menu klavye ile tetiklenmiyordu | Dropdown'lı menü item'larında `onClick` iç `<span>`'den üst item seviyesine taşındı |
| 24 (kısmi) | CSS breakpoint 991≠992 tutarsızlığı | `CareersPage.css`, `ContactPage.css`, `ProductsPage.css`'te `991px` → `992px` |

### 🛠️ Hizmetler Sayfası İçerik Entegrasyonu (21 Ağustos 2026)

Kullanıcının paylaştığı "AQUATIC — Hizmetler Sayfası İçerik Dokümanı" `/services` sayfasına işlendi:

- **Hizmet maddesi sayısı 12'den 27'ye çıktı**, her biri gerçek kısa tanım + detaylı açıklama ile (`services.<kategori>.items.<madde>.title/desc/detail`).
- **Kategori sayısı önce 6'ya çıkarıldı, sonra kullanıcı geri bildirimiyle 4'e indirildi** ("çok fazla kategori yorucu"): `Aquatic Underwater` → `savunmaSanayi` kategorisine birleştirildi (başlık: "Savunma Sanayi & Sualtı Teknolojileri", 7 madde); `Aquatic Endüstri` → `makina` kategorisine birleştirildi (başlık: "Aquatic Makina & Endüstri", 10 madde). Son yapı: `denizcilik` (7), `savunmaSanayi` (7), `makina` (10), `elektronikOtomasyon` (3) — toplam 27 madde, 4 kategori.
- `ServicesPage.jsx`: Sekme (tab) yapısı korundu, her hizmet satırı **akordeon** — tıklanınca detaylı açıklama açılıyor (`svc-item-header` + `svc-item-detail`, ok ikonu 180° dönüyor). `AppHeader.jsx`'teki "Hizmetler" dropdown'ı da 4 kategoriye güncellendi.
- **Çeviri durumu**: TR ve EN tam çevrildi (4 kategori × 27 madde, kısa+detaylı). RU/KK'da eski (artık uyumsuz) `services` bloğu tamamen kaldırıldı — i18next `fallbackLng: 'tr'` sayesinde RU/KK görünümünde bu sayfa **Türkçe içerik gösterir** (kırık değil, ama çevrilmemiş). Kalıcı çözüm için RU/KK çevirisi eklenmeli.
- **Düzeltme (22 Ağustos 2026):** İki kullanıcı raporu ele alındı:
  1. *"İkon hizalama/taşma sorunu"* — `.svc-tab-text`'te `white-space: nowrap` vardı; birleştirilmiş uzun başlıklar ("Savunma Sanayi & Sualtı Teknolojileri") sekme butonlarını taşırıyordu. `white-space: normal` yapıldı, `.svc-tab-btn` `flex: 1 1 200px` ile yeniden ayarlandı. Ayrıca `.svc-item-header` (`<div>`'den `<button>`'a çevrilmişti) için `font: inherit`, `appearance: none` gibi tam buton reset'leri eklendi.
  2. *HomePage'deki "Hizmet Alanlarımız" önizlemesi eskiydi ve kartlar `/services`'e hash olmadan gidiyordu* — bu yüzden hangi karta tıklarsan tıkla hep aynı (ilk) sekmeye düşülüyordu, "yanlış sayfaya yönlendiriyor" hissi veriyordu. `HomePage.jsx`'teki `services` dizisi yeni 4 kategoriyle (`denizcilik/savunmaSanayi/makina/elektronikOtomasyon`) eşleştirildi, kart tıklaması artık `/services#<kategori>` şeklinde doğru sekmeye gidiyor. `servicesPreview.*` içeriği 4 dilde güncellendi, dropdown etiketleri de (`Savunma Sanayi & Sualtı`, `Makina & Endüstri`) birleşmiş isimlerle eşleştirildi.
  3. *"Ana sayfadaki hizmetleri tıklayınca alt sayfaya (aşağı kaydırılmış konuma) yönlendiriyor"* — `ScrollToTop.jsx` hash'li her navigasyonda kaydırmayı bilinçli olarak atlıyor ("sayfalarda manuel yönetiliyor" varsayımıyla, örn. `CorporatePage`'in kendi scroll-to-section mantığı var). Ama `ServicesPage`'in hash'i bir DOM anchor'a değil, sadece bir state'e (`activeTab`) karşılık geliyordu — hiçbir scroll mantığı yoktu. Sonuç: HomePage'den `/services#savunmaSanayi`'e gidince eski scroll pozisyonu (HomePage'de hizmetler bölümünün olduğu, sayfanın ortası/altı) korunuyordu. `ServicesPage.jsx`'in hash-okuma `useEffect`'ine `window.scrollTo({top:0, behavior:'instant'})` eklendi — artık sayfa kendi kendini yukarı alıyor.

### 📦 Ürün Kataloğu Entegrasyonu (21 Ağustos 2026)

Kullanıcının paylaştığı gerçek "Sualtı Konnektörleri Kataloğu" (2026, 60 sayfa) PDF'i `/products` sayfasına işlendi:

- `src/data/products.json`: Eski 8 jenerik/yer tutucu konnektör kaydı silindi, yerine katalogdaki **48 gerçek seri** eklendi (Küçük/Mikro/Standart Dairesel, Güç, Yağ Dolgulu, Ethernet/Koaksiyel, RM/LPM, Düşük Profilli, Metal Gövdeli 55/66/MSS ailesi, Fiber Optik, aksesuarlar) — her biri gerçek parça numaraları ve teknik özellik tablosuyla (kontak sayısı, elektriksel değerler, malzeme, derinlik kapasitesi vb.). 3 eski kamera/ışık kaydı (`lhc-370`, `lhc-350`, `lhl-401`) farklı bir ürün hattı olduğu için korundu.
- `src/data/categories.json`: 12 kategoriye güncellendi (eski `subsea-connectors`/`rov-accessories` kaldırıldı).
- `src/pages/ProductsPage.jsx`: Yeni kategori renkleri/ikonları eklendi; **görseli olmayan ürünler için** (`images: []`) kart görselinin yerine kategori ikonlu bir placeholder (`.product-image-placeholder`) render ediliyor.
- **Bilinçli sınır:** PDF'ten gerçek ürün fotoğrafları/teknik çizimleri dosya olarak çıkarılamadı (araç yok) — 48 yeni ürün şu an görselsiz. Kullanıcı gerçek görselleri ayrıca paylaşırsa `public/images/products/` altına eklenip her ürünün `images` alanına bağlanmalı.
- **Çeviri borcu:** Yeni 48 ürünün `shortDescription`'ı ve teknik özellik alan adları (`Kontak Sayısı`, `Parça Numaraları` vb.) şu an sadece Türkçe. Kategori isimleri 4 dile çevrildi, ama ürün açıklamaları EN/RU/KK görünümünde Türkçe'ye düşüyor (`t('products.descriptions.<id>', shortDescription)` fallback deseni) — bkz. "Hâlâ Eksik Olan Konular".

### 🐞 Header'daki "Hizmetler" (ve Ana Sayfa/Kurumsal) altmenüleri çalışmıyordu (22 Ağustos 2026)

Kullanıcı raporu: "Hizmetler altmenüleri çalışmıyor." Sebep: `AppHeader.jsx`'teki masaüstü `Menu`'de dropdown'lı üst öğeler (`/`, `/corporate`, `/services`) hem kendi `onClick`'ine (üst sayfaya git) hem de içlerine gömülü bir `<Dropdown>` flyout'una sahip. Antd'nin `Dropdown` popup'ı `document.body`'ye **React portal** ile render ediliyor — DOM ağacında `<li>`'nin dışında ama **React ağacında hâlâ içinde**. React'in portal-aware event bubbling'i yüzünden bir altmenü öğesine tıklanınca olay hem kendi `onClick`'ini (`/services#savunmaSanayi`) hem de üst `<li>`'nin `onClick`'ini (`/services`, hash'siz) sırayla tetikliyordu — ikincisi hash'i eziyordu, sonuç: hangi altmenüye tıklarsan tıkla hep aynı varsayılan sekmeye düşülüyordu. Düzeltme: her altmenü `onClick`'inde `domEvent.stopPropagation()` çağrılarak olayın üst öğeye yayılması durduruldu (React dokümantasyonunun portal'lar için önerdiği standart çözüm). Mobil `Drawer` menüsündeki çağrı noktası da yeni `{domEvent}` imzasına uyacak şekilde güncellendi.

### 💬 WhatsApp Destek Butonu (26 Ağustos 2026)

Kullanıcı isteğiyle sağ alt köşede tüm sayfalarda sabit duran bir WhatsApp float butonu eklendi (`src/components/common/WhatsAppButton.jsx`, `MainLayout.jsx`'e eklendi). `@ant-design/icons`'un `WhatsAppOutlined` ikonu kullanıldı, `wa.me/905335581283?text=...` linkine gidiyor, ön dolgulu mesaj `whatsapp.message` i18n anahtarından (4 dilde) geliyor. Buton stili (`.whatsapp-float-btn`, `src/index.css`) marka rengi yerine tanınabilirlik için resmi WhatsApp yeşilini (`#25d366`) kullanıyor — bu bilinçli bir istisna, üçüncü taraf marka işareti olduğu için site paletine bağlı değil.

### 🖼️ Hizmet Maddesi Görselleri (26 Ağustos 2026)

27 hizmet maddesinin her biri için AI ile üretilen görseller "Hizmet Görselleri" prompt rehberi kullanılarak hazırlandı, kullanıcı 26/27'sini teslim etti (eksik: `makina-trafoEkipmanlari` — Trafo Sanayi Üretim Ekipmanları; sağlanınca aynı isimle klasöre eklenmesi yeterli, kodda değişiklik gerekmiyor). Görseller `dwebp`+`cwebp` (kalite 82, 960px genişlik) ile optimize edilip `public/images/services/detail/` altına kondu. Dosya adları kategori-madde anahtarına birebir eşleniyor (`${activeGroup.key}-${item.key}.webp`), `ServicesPage.jsx` sabit bir eşleme listesi tutmadan path'i doğrudan hesaplıyor; eksik/hatalı bir görsel varsa `onError` ile o maddenin ikon kutusuna otomatik geri dönülüyor (`missingPhotos` state'i).

**Düzeltme (aynı gün):** İlk denemede satır başlığındaki ikonun yerine 48×48 küçük fotoğraf konmuştu — kullanıcı "kötü görünüyor" dedi. Sebep: temiz, tek renkli ikon listesiyle küçük boyutta ayrıntılı/renkli fotoğraf dokusu çakışıyordu. Küçük resim tamamen kaldırıldı (satır başlığında yine eski ikon kutusu var), büyük fotoğraf sadece madde **açıldığında** (akordeon detay panelinde) gösterilmeye devam ediyor — fotoğraflar sadece yeterince büyük gösterilebildiği yerde kullanılıyor. Kullanılmayan `public/images/services/thumb/` klasörü silindi.

### 📄 Ürün/Hizmet Katalogları (26 Ağustos 2026)

Kullanıcı 3 PDF katalog sağladı (`public/catalogs/`): 2'si Türkçe (Sualtı Konnektörleri Kataloğu — 60 sayfa, Sualtı Aydınlatma Ürün Kataloğu), 1'i İngilizce (Underwater Lighting Product Catalog — aydınlatma kataloğunun EN edisyonu, konnektör kataloğunun EN edisyonu yok). Kullanıcının talebiyle kategori bazlı değil, **dil bazlı** gösterim yapıldı: `ServicesPage.jsx`'in altına eklenen "Kataloglarımız" bölümü, aktif site dili `tr` ise 2 Türkçe kataloğu, diğer tüm dillerde (en/ru/kk) tek İngilizce kataloğu listeliyor (`CATALOGS.tr` / `CATALOGS.other`, `i18n.language` ile seçiliyor). Kartlar `target="_blank"` ile yeni sekmede açılıyor (`download` attribute'u bilinçli olarak eklenmedi — hem görüntüleme hem indirme istendiği için tarayıcının yerleşik PDF görüntüleyicisi + oradaki indir butonu kullanılıyor). i18n anahtarları: `services.catalogs.*` (4 dilde).

### ⚠️ "Teknolojik Gözünüz" hero fotoğrafı bilinçli olarak eski (sahte etiketli) görsele geri döndürüldü (27 Ağustos 2026)

Kullanıcı `public/hero.webp`'i (rotasyondaki "Teknolojik Gözünüz" slaytının fotoğrafı) 21 Ağustos'taki marka yenilemesinde kullanılmaya başlanan yeni liman/ROV fotoğrafından, ondan önceki (git geçmişinde `886b90f`) eski fotoğrafa döndürmemi istedi. **Bu eski fotoğrafın üzerinde gerçek olmayan/uydurma ürün etiketleri var** ("DEEPSEAL™ E-SERIES 2.4kV", "AURA FIBER | D-COM/SUBSEA" — Aquatic'in gerçek bir ürünü değil, muhtemelen eski bir AI-stok görsel) — bu tam da 21 Ağustos'taki marka yenilemesinin kurtulmaya çalıştığı türden bir görsel. Kullanıcıya bu net biçimde iki kez soruldu, ikisinde de aynı fotoğrafı istediğini teyit etti — **bilinçli kullanıcı kararı olarak uygulandı**, hata değil.

Yeni (liman/ROV) fotoğraf koddan silinmedi, sadece `public/hero.webp` içeriği eskisiyle değiştirildi — yeni görsel hâlâ git geçmişinde (`f85f2b6` commit'i) duruyor, istenirse geri getirilebilir. Bu değişiklik henüz commit edilmedi.

> 💡 Gelecekte bu görseli "düzeltmeye" kalkışmadan önce bu notu oku — bilinçli bir geri alma, unutulmuş bir hata değil.

### 🎞️ Hero metni sola alındı + büyütüldü (26 Ağustos 2026)

Kullanıcı geri bildirimi: "yazılar tam ortada kötü gözüküyor, sol taraftan büyük ve değişik ilgi çekici bir şekilde çıksalar." Değişiklikler:
- `.hero-content` artık `text-align:left`, sabit 800px genişlik yerine tam genişlik (metin `.container`'ın — 1200px — sol kenarından başlıyor).
- `.hero-slogan` `clamp(2.25rem, 2rem + 2vw, var(--font-size-display))` ile akışkan/büyük boyutlandırıldı (önceki sabit `--font-size-h2`), `max-width:17ch` + `text-wrap:balance` ile büyük başlık 2-3 satıra dengeli kırılıyor (dergi manşeti hissi).
- Rotasyondaki slogan/alt yazı artık genel `.animate-fadeInUp` yerine kendi `.hero-text-in` animasyonuyla soldan kayarak giriyor (`translateX(-48px)→0`, `cubic-bezier(0.16,1,0.3,1)`) — hero'yu sitenin geri kalanından görsel olarak ayırmak için bilinçli olarak farklı bir hareket dili.
- `.hero-scrim` dikey kararmadan, sola doğru koyulaşan (soldan sağa `100deg` gradyan, metnin okunabilirliği için) + hafif dikey vinyet kombinasyonuna çevrildi — artık fotoğrafın sağ tarafı daha görünür.
- Mobilde sabit küçük font override'ları (`.hero-slogan` 1.3rem/1.1rem) kaldırıldı, `clamp()` her ekranda kendi kendine ölçekleniyor; `.hero-actions` mobilde de sola hizalandı.

### 🎨 "Hizmet Alanlarımız" kartları editoryal tasarıma geçti (26 Ağustos 2026)

Kullanıcı geri bildirimi: "hiç beğenmedim, çok basit duruyor." Eski tasarım: küçük (180px) fotoğraf + ayrı beyaz kart gövdesinde başlık/açıklama. Kullanıcıya 3 yön sunuldu (büyük editoryal kart / asimetrik bento grid / yatay liste satırları), **"Daha büyük, editoryal kartlar"** seçildi. Yeni tasarım: fotoğraf artık kartın tamamını kaplıyor (min-height 440px), koyu bir scrim (gerçek fotoğraf üzerinde okunabilirlik için — dekoratif gradyan değil, hero'daki `.hero-scrim` ile aynı mantık) altta biriken şekilde uygulanıyor, başlık/açıklama/ok rozeti doğrudan fotoğrafın üstünde beyaz metinle duruyor (dergi kapağı hissi). Kategori rengi artık alt çizgi yerine hover'da ok rozetinin arka planında beliriyor.

### 🎞️ Ana sayfa hero'su artık dönen fotoğraf+metin (26 Ağustos 2026)

Kullanıcı isteği: "en az 3 foto olsun ve değişsin, yazıları da aynı şekilde." `HomePage.jsx`'teki tek statik hero görseli, 4 slaytlık bir döngüye çevrildi (`HERO_SLIDES` — mevcut `hero.webp` + zaten projede bulunan `denizcilik.webp`/`savunmasanayi.webp`/`makina.webp`, yeni foto istenmedi), her 6 saniyede bir `setInterval` ile ilerliyor. Görseller CSS `opacity` crossfade ile geçiş yapıyor (`.hero-bg-image.active`, `prefers-reduced-motion`'da geçiş kapatılıyor). Slogan/alt yazı da slayta göre değişiyor — her dile `hero.slides.{denizcilik,savunma,makina}.{slogan,subtitle}` eklendi (varsayılan slayt mevcut `hero.slogan`/`hero.subtitle`'ı kullanmaya devam ediyor). Metin değişimini görsel olarak da hissettirmek için `h1`/`p`'ye slayt index'i `key` yapıldı — React her slaytta bu elemanları yeniden mount edip mevcut `animate-fadeInUp` animasyonunu tekrar tetikliyor.

Aynı istekte ayrıca hero'daki **"Bizimle İletişime Geçin" (ghost) butonu kaldırıldı** — sadece ana sayfada; `hero.ctaContact` i18n anahtarı `BlackBoxPage`/`ServicesPage`'de hâlâ kullanıldığı için silinmedi, sadece `HomePage.jsx`'teki kullanımı kaldırıldı.

### 🖼️ Header logosu büyütüldü (26 Ağustos 2026)

Kullanıcı raporu: logo küçük kalıyor. `AppHeader.jsx`'teki logo `height:40` → `height:48` (width orantılı 135→162, gerçek intrinsic oran 351:104 korunarak). Header yüksekliği 72px olduğu için hâlâ rahat sığıyor.

### 🐞 "Güncel Haberler" alakasız içerik gösteriyordu (26 Ağustos 2026)

Kullanıcı raporu: "güncel haberlerde sadece bizim ilgilendiğim alanlardaki haberler olsa" — canlı haber akışı (NewsData.io) Aquatic'in iş alanlarıyla (denizcilik, savunma sanayi & sualtı, makina & endüstri, elektronik & otomasyon) alakasız başlıklar gösteriyordu.

**Araştırma:** Gerçek API key ile canlı sorgular çalıştırılarak kök sebep doğrulandı — eski sorgu (`q=defense+OR+military+OR+maritime+OR+naval`) ve denenen daha geniş varyantlar, NewsData.io'nun ücretsiz katmanındaki gevşek/OR-ağırlıklı eşleştirme yüzünden sistematik olarak alakasız sonuçlar getiriyordu: "naval" kelimesi spor haberlerinde ("Navy athletics") ve politika haberlerinde ("US Navy... Pentagon") eşleşiyor, "submarine" bir video oyunu başlığında ("Final Fantasy VII... Submarine Combat") eşleşiyor, "underwater" bir boğulma haberinde ve "ipotekte batık (underwater mortgage)" deyiminde eşleşiyor, "sonar" bir robot havuz süpürgesi incelemesinde eşleşiyor. `category=technology` parametresi de yardımcı olmadı (aynı alakasız sonuçlar "technology" kategorisine etiketlenmiş durumda).

**Düzeltme:** İki katmanlı yaklaşım uygulandı — (1) API sorgusu 100 karakter sınırına sığacak şekilde sadeleştirildi (`underwater OR subsea OR offshore OR shipbuilding OR naval OR maritime OR AUV OR ROV OR submarine`), (2) API'den dönen sonuçlar üzerinde **istemci tarafında sıkı bir alaka filtresi** (`RELEVANCE_REGEX`) uygulanıyor — sadece başlık/açıklamada gerçekten belirli terimler (`subsea`, `shipbuilding`, `AUV`, `"underwater robot"`, `"naval architecture"`, `"industrial automation"` vb.) geçen makaleler gösteriliyor; tek başına yanıltıcı çıkan kelimeler (`underwater`, `naval`, `submarine`, `sonar`, `pcb`) filtreden çıkarıldı, bunun yerine daha spesifik bileşik ifadeler (`"naval shipbuilding"`, `"submarine cable"` vb.) kullanılıyor. Cache anahtarı da (`aquatic_news_cache_v2`) değiştirilerek eski/gevşek sorgudan kalan önbelleğin geçersiz kılınması sağlandı.

> ⚠️ **Bilinçli sınır — tam çözülemedi:** Canlı testlerde tekrar tekrar doğrulandı: bu niş konu (sualtı konnektör/savunma sanayii/endüstriyel makina) için genel haber API'lerinde 6 saatlik pencerede yeterli hacimde gerçekten alakalı içerik **yok** — bu bir sorgu/regex ayarlama sorunu değil, veri kaynağının kendisinin sınırı. Sonuç: haber bölümü artık hiçbir zaman tamamen alakasız/mahcup edici başlık göstermeyecek (kalite garantisi var), ama bunun bedeli sıklıkla az sayıda haber veya mevcut "haber yok" yedek mesajını (`news.error`) göstermesi. Kalıcı/hacimli çözüm için genel haber toplayıcısı yerine sektöre özgü kaynaklara (örn. Maritime Executive, Offshore Engineer, Naval News RSS akışları) geçilmesi gerekir — bu, farklı bir veri formatı (RSS/XML) ve CORS uygunluğunun doğrulanmasını gerektiren ayrı bir iş kalemi, bu pass'te yapılmadı.

### 🐞 Katalog bölümü site tasarımıyla tutarsızdı (26 Ağustos 2026)

Kullanıcı raporu: kataloglar bölümünün arka planı ve başlık stili diğer sayfa bölümleriyle uyuşmuyordu. Sebep: `.svc-catalogs-section` özel bir beyaz arka plan (`#fff`) ve kendi başlık class'larını (`.svc-catalogs-title` vb.) kullanıyordu — oysa site genelinde (HomePage, BlackBoxPage) standart bir kalıp var: bölüm arka planı `#f4f7ff` (sayfa temel rengiyle aynı), başlıklar ortak `.section-label`/`.section-title`/`.section-subtitle` class'ları, kartlar bu zemin üzerinde beyaz. Düzeltme: bölüm arka planı `#f4f7ff`'e çevrildi, özel başlık class'ları kaldırılıp ortak `section-*` class'larına geçildi (bir de `services.catalogs.sectionLabel` eyebrow etiketi eklendi, 4 dilde), katalog kartlarının arka planı da artık beyaz (önceden bölümle aynı renkteydi, kartlar zeminle görsel olarak ayrışmıyordu).

### 🌐 Aquatic.kz — İkinci (Kazakistan) Domain Desteği (26 Ağustos 2026)

Kullanıcı Kazakistan pazarı için ayrı bir domain (`aquatic.kz`) satın aldığını belirtti. Seçilen mimari: **aynı kod tabanı, aynı `dist/` build'i her iki domaine de deploy edilir** ("Aynı site, iki domain"), sunucu tarafı yok — hangi dilin path'siz gösterileceği tamamen istemci tarafında hostname'e göre belirleniyor.

- `src/i18n/langRouting.js`: `getDomainDefaultLang()` eklendi — `window.location.hostname` `.kz` ile bitiyorsa varsayılan dil `kk`, aksi halde `tr`. `splitLangFromPath()`/`localizePath()` artık sabit `DEFAULT_LANG` yerine bu fonksiyonu kullanıyor; böylece `aquatic.kz`'de path'siz URL'ler (`/`, `/corporate`) Kazakça, `/tr/*` ise Türkçe gösteriliyor — `aquatic.com.tr`'deki davranış (path'siz = TR) değişmedi.
- `src/App.jsx`: Route tablosu artık `getDomainDefaultLang()`'a göre üretiliyor — hangi 3 dilin prefiksli (`/en`, `/ru`, `/kk` ya da `/tr`, `/en`, `/ru`) kayıtlı olacağı çalışma zamanında hostname'e göre belirleniyor (build-time'da sabit değil).
- `src/i18n.js`: Eski, ayrı/tutarsız `.tr`/`.kz` hostname kontrolü kaldırıldı, `getDomainDefaultLang()`'a devredildi (tek doğruluk kaynağı).
- `src/components/common/PageSEO.jsx`: Yeni `canonicalUrl(lang, path)` helper'ı (`langRouting.js`) eklendi — her dilin canonical/hreflang URL'i, sayfayı hangi domain sunuyorsa ondan bağımsız olarak **o dilin "ev" domainine** işaret ediyor (`LANG_DOMAINS`: kk → `aquatic.kz`, tr/en/ru → `aquatic.com.tr`). Böylece `aquatic.kz` üzerinden EN sayfası açılsa bile hreflang doğru şekilde `aquatic.com.tr/en`'i işaret ediyor — iki domainde aynı içeriğin "duplicate content" olarak görünmesi yerine, her dilin tek bir yetkili adresi oluyor.

**Bilinçli olarak dokunulmadı (statik dosya kısıtı):** `public/sitemap.xml`, `public/robots.txt` ve `index.html`'deki statik `<link rel="alternate" hreflang>` bloğu hâlâ tamamen `aquatic.com.tr`'ye sabit — bunlar PageSEO gibi çalışma zamanında render edilmiyor, **aynı statik dosya olarak iki domaine de aynen kopyalanıyor**, dolayısıyla "kk → aquatic.kz" kuralını bu dosyalara gömmek bir domain için doğru, diğeri için yanlış sonuç üretir (örn. `aquatic.kz/robots.txt`'nin `Sitemap:` satırı `aquatic.com.tr` domainini göstermesi Google için geçersiz/işlenmeyen bir bildirim olur). `aquatic.kz` gerçekten yayına alınmadan önce bu üç dosya için ayrı bir çözüm (iki ayrı sitemap + Search Console'a domain bazlı elle gönderim, ya da build sırasında hedef domaine göre üretilen ayrı `public/` çıktısı) kararlaştırılmalı — kod-only bir pass'te tahmin yürütülmedi.

### 🐞 Overscroll'da beyaz şerit (22 Ağustos 2026)

Kullanıcı raporu: "Ana sayfada haberler bölümü civarında, sayfanın altına doğru açık mavi-gri arka plan aniden kesilip beyaza dönüyor." Sebep: `html` elementinde hiç `background` tanımlı değildi, sadece `body`'de vardı. macOS/iOS Safari'nin (ve bazı trackpad'lerin) "rubber-band" elastik kaydırma efekti sayfa sonunda `body`'nin sınırlarının dışına taşıyor ve altındaki `html`'in tanımsız (tarayıcı varsayılanı beyaz) arka planını gösteriyordu. `src/index.css`'te `html { background: var(--color-bg); }` ve `body { min-height: 100vh; }` eklendi.

### 🎨 Marka Yenileme — "AI-üretimi" izlenimini kırma (21 Ağustos 2026)

Kullanıcı isteğiyle yapılan tasarım eleştirisi sonrası uygulanan değişiklikler:

| Alan | Önce | Sonra |
|---|---|---|
| Renk paleti | `#0050b3`→`#00b4d8` mavi-cyan gradient (klişe "AI SaaS" gradienti) | Tek-tonlu koyu çelik lacivert (`#0a3d62`/`#041f33`), doygunluğu düşürülmüş slate-teal accent (`#4a7c82`) — tüm 13 dosyadaki hardcoded hex, `var(--color-primary)` vb. token'lara çevrildi |
| Hero (HomePage + tüm alt sayfa `PageHero`) | Gradient + `BackgroundParticles` (yüzen noktacık) + 3 katmanlı animasyonlu dalga + shimmer metin | Particle/dalga/shimmer tamamen kaldırıldı (`BackgroundParticles.jsx` silindi); gerçek arkaplan fotoğrafı opacity artırılıp (0.15→0.55) görünür kılındı, okunabilirlik için sade bir koyu scrim eklendi |
| Tipografi | Inter + **Outfit** (en yaygın "AI landing page" font ikilisi) | Inter + **IBM Plex Sans** (başlıklarda) — daha kurumsal/mühendislik hissi |
| Marka logosu şeridi | Sonsuz kayan marquee (duplicate edilmiş liste) | Statik responsive grid |
| Kopya (hero, servis alt başlığı, stats) | Jenerik "geniş yelpazede yenilikçi çözümler" / "Mutlu Müşteri" kalıpları | Somut/sektöre özgü ifadeler (gerçek ürün örnekleri: sualtı robotu, torpido konnektörü, yerli kara kutu); "Mutlu Müşteri" → "Kurumsal Ortak" |

**Ertelenen/yapılmayan** (kapsam dışı bırakıldı, gerekçeli): özel çizilmiş sektöre özgü ikon seti (SVG asset üretimi gerektirir), tamamen özgün mikro-etkileşim imzası (örn. tarama çizgisi/chamfered corner — tasarım iterasyonu ve görsel test gerektirir, bu ortamda ekran görüntüsü alma imkanı yok).

---

## ⚠️ Hâlâ Eksik Olan Konular

> 21 Ağustos 2026 denetiminde tespit edilen Kritik + Önemli maddelerin büyük kısmı aynı gün koda yansıtıldı (bkz. yukarıdaki "✅ Tamamlanan İyileştirmeler"). Aşağıda kalanlar — kullanıcı kararıyla kabul edilen riskler, bilinçli olarak ertelenenler (gerekçeli) ve mimari kısıtlar nedeniyle bu proje kapsamında tam çözülemeyecek olanlar.

### 🔴 Kabul Edilen Riskler (kullanıcı kararı)

| # | Sorun | Durum |
|---|-------|-------|
| 9 | NewsData.io API key client bundle'a gömülü (`HomePage.jsx`) | Önce statik içeriğe geçilmişti (güvenlik açığı kapanıyordu), kullanıcı canlı haber akışını tercih ettiği için **21 Ağu 2026'da geri alındı**. Key hâlâ tarayıcıda açıkta. **Öneri:** NewsData.io hesabından bu key için allowed-origin/referrer kısıtlaması eklenmeli — aksi halde key kopyalanıp başka bir sitede kullanılabilir. `.htaccess` CSP'sinde `connect-src`'e `https://newsdata.io` izni verildi (canlı akış çalışsın diye), bu güvenlik açığını kapatmaz, sadece CSP'nin akışı bloke etmesini önler |

### 🟡 ÖNEMLİ — Bilinçli olarak ertelendi

| # | Sorun | Neden ertelendi |
|---|-------|------------------|
| 11 | `HomePage.jsx` God Component (~600 satır) | Saf refaktör, davranış değişmiyor; routing/SEO/asset değişiklikleriyle aynı pass'te yapmak regresyon riskini artırırdı |
| 16 | `React.memo` taraması yapılmadı | Ölçülmüş bir performans sorunu yok; spekülatif optimizasyon eklenmedi |
| 21 | Hata raporlama servisi (Sentry vb.) yok | 3. parti hesap/DSN gerektirir, kullanıcı kimlik bilgisi sağlamadan yapılamaz |
| 24 (kalan kısım) | `HomePage.css`'teki ek `600px`/`576px` breakpoint'leri | Görsel test aracı olmadan bu sayfaya özgü ince ayarlı kırılım noktalarına dokunmak regresyon riski taşıyor |
| 25 | Typography hardcoded değer taraması yapılmadı | Kozmetik, geniş kapsamlı, görsel regresyon riski yüksek |
| 26 | Ortak `Button` component'i yok | Geniş kapsamlı görsel refaktör, düşük risk/kazanç oranı |
| — | Sektöre özgü özel ikon seti (jenerik Ant Design ikonları hâlâ kullanılıyor) | Gerçek SVG asset tasarımı/üretimi gerektirir, kod-only bir pass'te yapılamaz |
| — | Özgün mikro-etkileşim imzası (marka kartı hover'ı zaten iyi, ama kart hover'ları hâlâ genel `translateY+shadow` formülü) | Tasarım iterasyonu + görsel test gerektirir, bu ortamda ekran görüntüsü alınamıyor |

### 🟡 ÖNEMLİ — Mimari kısıt (statik/backend'siz yapı nedeniyle tam çözülemiyor)

| # | Sorun | Kısıt |
|---|-------|-------|
| 19b | EmailJS CV boyut limiti (40KB), CV upload'un tam sunucu taraflı doğrulaması | Backend yok, statik cPanel/FTP hosting — gerçek çözüm bir API/S3 katmanı gerektirir |
| — | SPA'da gerçek HTTP 404 status kodu dönmüyor | Client-side routing + statik hosting doğası gereği (server config ile client routing çakışıyor) |
| — | `.env`'deki `VITE_NEWSDATA_API_KEY` satırı hâlâ orada | Kod artık bu değişkeni kullanmıyor (statik içeriğe geçildi) ama `.env` git'te olmadığından elle silinmesi/rotasyonu kullanıcıya kalıyor |

### 🟢 İYİLEŞTİRME

| # | Sorun | Açıklama |
|---|-------|----------|
| 27 | Tutarsız dosya isimlendirme | Ölü/duplicate dosyalar temizlendi ama kalan görsellerde TR/EN karışık isimlendirme tam normalize edilmedi |
| 28 | Font yükleme optimize değil | preload+onload swap tekniği veya self-host ile FCP iyileştirilebilir |
| 29 | Telefon alanında validasyon yok | Contact/Careers formlarında `required` bile değil |
| 30 | Retry mekanizması yok | EmailJS gönderiminde |
| 31 | Form hata mesajları screen reader'a bağlı değil | `aria-live`/`aria-describedby` eksik |
| 32 | `--color-text-muted` kontrastı sınırda | ~4.83:1 — AA eşiğini (4.5:1) az geçiyor, AAA'ya (7:1) uymuyor |
| 33 | Ana menü `<nav>` landmark'ı ile sarmalanmamış | Screen reader navigasyonunda "navigation" bölgesi eksik |
| 34 | Spacing tutarsız | `--card-padding-*` token'ları tanımlı ama çoğu yerde kullanılmıyor |
| 35 | Test altyapısı yok | Vitest + React Testing Library (şu an 0 test) — çok dilli routing için özellikle değerli olurdu |
| 36 | EN/RU/KK ürün kartı çevirileri (`popularProducts.items.*`) makine kalitesinde | 21 Ağu 2026'da eklendi, yerel dil uzmanınca gözden geçirilmesi önerilir |
| 37 | `/products`'taki 48 yeni konnektör serisi görselsiz | PDF'ten görsel çıkarılamadı; gerçek fotoğraf/çizimler sağlanınca `products.json`'daki `images` alanlarına eklenmeli |
| 38 | `/products`'taki 48 yeni konnektör serisinin açıklama/özellik metinleri sadece Türkçe | EN/RU/KK görünümünde Türkçe'ye düşüyor (kategori isimleri hariç, onlar çevrildi) |
| 39 | `products.items.*` (camera/light/monitor/harness/portableUnit/pressureVessel) i18n anahtarları kullanılmıyor | Kod tabanında hiçbir yerde referans edilmiyor (`grep` ile doğrulandı) — eski bir kart sisteminden kalma ölü içerik, temizlenebilir |
| ~~40~~ | ~~`/services` sayfası RU/KK'da Türkçe gösteriliyor~~ | **Düzeltildi (26 Ağustos 2026)** — `services` bloğu (4 kategori × 27 madde, grup title/desc + madde title/desc/detail) RU ve KK'ya tam çevrildi, `src/locales/{ru,kk}.json`'a eklendi. Çeviri LLM tarafından yapıldı; teknik terminoloji ve akıcılık için **yerel dil uzmanınca gözden geçirilmesi önerilir** (bkz. madde 36'daki benzer not) |
| — | ~~`servicesPreview.*` eski kategorileri gösteriyor~~ | **Düzeltildi (22 Ağu 2026)** — bkz. yukarıdaki "Hizmetler Sayfası İçerik Entegrasyonu" notu |

---

## Deploy Prosedürü

```bash
# 1. Değişiklikleri test et
npm run dev

# 2. Production build al
npm run build

# 3. Zip oluştur (dist/ İÇİNDEN!)
rm aquatic_deploy.zip
cd dist && zip -r ../aquatic_deploy.zip . && cd ..

# 4. Commit & push
git add . && git commit -m "..." && git push origin main

# 5. aquatic_deploy.zip'i cPanel'e yükle, public_html altına çıkar
```

> **Uyarı:** `zip -r aquatic_deploy.zip dist/` YANLIŞ — `dist/index.html` prefix'i oluşturur.  
> Doğrusu: `cd dist && zip -r ../aquatic_deploy.zip .`

---

## EmailJS Config

`.env` dosyasında saklı (kaynak kodda YOK):

```
VITE_EMAILJS_SERVICE_ID=service_*****
VITE_EMAILJS_TEMPLATE_ID=template_*****
VITE_EMAILJS_PUBLIC_KEY=*****
```

`ContactPage.jsx` ve `CareersPage.jsx`'te `import.meta.env.VITE_EMAILJS_*` ile okunuyor.

> ⚠️ `.env` dosyası `.gitignore`'da olmalı — asla repo'ya push'lanmamalı.

---

## SEO Config

✅ **Düzeltildi (21 Ağu 2026):** `PageSEO.jsx` içindeki `BASE_URL` artık kanonik domaine işaret ediyor:

```js
const BASE_URL = 'https://aquatic.com.tr';
```

Her sayfa otomatik olarak şunları set eder:
- `<title>` — sayfa adı + site adı
- `<meta description>` — sayfa açıklaması (i18n'den)
- `<link canonical>` — aktif dile göre gerçek URL (`localizePath` ile üretilir)
- Open Graph + Twitter Card meta tag'leri
- `hreflang` — tr, en, ru, kk, x-default (gerçek `/en`, `/ru`, `/kk` route'larına işaret eder)
- JSON-LD `Organization` structured data (Kocaeli ofis verisiyle)
- `noindex` prop'u verilirse `robots: noindex, nofollow` (bkz. `NotFoundPage.jsx`)

---

## Kritik Dosya Referansları

| Dosya | Önemli Kısım |
|-------|-------------|
| `src/index.css` | Tüm design tokens + global `.reveal` animasyonu |
| `src/App.jsx` | Route tanımları + React.lazy() + Suspense |
| `src/main.jsx` | ErrorBoundary > HelmetProvider > BrowserRouter > App |
| `src/hooks/useRevealAnimation.js` | IntersectionObserver custom hook |
| `src/components/common/PageHero.jsx` | Ortak sayfa hero component'i |
| `src/components/common/PageSEO.jsx` | Dinamik SEO + JSON-LD yönetimi |
| `src/components/ErrorBoundary.jsx` | App-level hata yakalayıcı |
| `src/i18n.js` | i18next config |
| `src/i18n/langRouting.js` | Çok dilli URL routing yardımcıları (`SUPPORTED_LANGS`, `splitLangFromPath`, `localizePath`) |
| `src/components/LangSync.jsx` | URL ↔ i18next dil senkronizasyonu |
| `src/hooks/useLocalizedNavigate.js` / `src/components/common/LocalizedLink.jsx` | Dil-prefiksli navigasyon — iç linklerde çıplak `useNavigate`/`Link` yerine kullanılmalı |
| `src/components/Layout/AppHeader.jsx` | Navigasyon, dil seçici, mobil menü |
| `public/.htaccess` | SPA routing kuralları + güvenlik header'ları (CSP vb.) |

---

## Teknik Değerlendirme (21 Ağustos 2026 — düzeltmeler sonrası)

| Kriter | 6 Nis | 12 Nis | 21 Ağu (denetim) | 21 Ağu (düzeltme sonrası) | Not |
|--------|:-----:|:------:|:-----------------:|:--------------------------:|-----|
| Proje Yapısı | 7/10 | 7/10 | 7/10 | **7/10** | Değişmedi |
| Kod Kalitesi (DRY/SOLID) | 8/10 | 6/10 | 6/10 | **7/10** | Honeypot ortaklandı, ölü/duplicate asset'ler (21 dosya) temizlendi, ürün metinleri i18n'e taşındı; God Component bilinçli olarak ertelendi |
| Teknik Eksiksizlik | 7/10 | 5/10 | 5/10 | **6/10** | CV upload uzantı kontrolü eklendi (backend hâlâ yok), ContactPage hata mesajı iyileşti; hata raporlama servisi hâlâ yok |
| Performans | 8/10 | 6/10 | 6/10 | **7/10** | img width/height eklendi, duplicate asset'ler temizlendi; React.memo bilinçli olarak eklenmedi |
| Güvenlik | 7/10 | 5/10 | 4/10 | **6/10** | CSP + güvenlik header'ları eklendi, `npm audit`: **0 açık**; ancak NewsData.io API key sızıntısı kullanıcı kararıyla geri alındı (bkz. "Kabul Edilen Riskler") — bu madde hâlâ açık |
| Erişilebilirlik (a11y) | — | — | 5/10 | **8/10** | HomePage'de h1 eklendi, tıklanabilir kartlar klavye ile erişilebilir, menü klavye ile tetikleniyor |
| Test Coverage | 0/10 | 0/10 | 0/10 | **0/10** | Hâlâ test yok |
| SEO | 8/10 | 8/10 | 4/10 | **8/10** | BASE_URL düzeltildi, gerçek URL bazlı çok dilli routing + hreflang kuruldu, JSON-LD eklendi, sitemap 28 URL ile yeniden üretildi |
| Dependency | — | 7/10 | 6/10 | **9/10** | `npm audit fix` ile 0 açık |
| **Ortalama** | **6.4/10** | **5.5/10** | **5.2/10** | **6.4/10** | Kritik + Önemli maddelerin çoğu kapatıldı; NewsData.io key riski kullanıcı kararıyla kabul edildi, kalanlar bilinçli erteleme veya mimari kısıt (bkz. "Hâlâ Eksik Olan Konular") |

### Tamamlanan HIGH Aksiyonlar (12 Nisan 2026)

- [x] `.gitignore` — `.env`, `*.zip`, `.DS_Store` eklendi
- [x] `vite` + `@vitejs/plugin-react` → `devDependencies`'e taşındı
- [x] Honeypot spam koruması — Contact + Careers formlarına eklendi
- [x] `HomePage.jsx` dead code temizlendi (`brands` array, `statsRef`)
- [x] `CorporatePage.jsx` clipboard try/catch eklendi
- [x] Haber fetch'ine HTTP status kontrolü eklendi (NewsData.io API'sine canlı bağlanmaya devam ediyor — bkz. aşağı)

### 21 Ağustos 2026 — Denetim + Aynı Gün Düzeltme

Sabah yapılan 7 boyutlu denetimde (kod kalitesi, a11y, SEO, performans, güvenlik, form/hata yönetimi, responsive) bulunan sorunların çoğu **aynı gün** koda yansıtıldı. Ayrıca eski bir kayıt yanlış çıktı ve düzeltildi:
- ~~"`main.png` (7.8MB) silindi"~~ — yanlıştı, dosya hâlâ duruyordu; şimdi gerçekten silindi.

Haberler özelliği için iki aşamalı bir karar süreci yaşandı: CLAUDE.md'nin eski "GNews API key kaldırıldı, statik haberlerle devam" notu da yanlış çıkmıştı (kod hâlâ NewsData.io'ya canlı bağlanıyordu) — önce bu gerçekten statik içeriğe çevrildi, ardından kullanıcı canlı haber akışını tercih ettiğini belirtince **aynı gün geri NewsData.io'ya döndürüldü**. Güncel durum: canlı API + açık key riski bilinçli olarak kabul edildi (bkz. "Hâlâ Eksik Olan Konular › Kabul Edilen Riskler").

Tamamlanan tüm maddeler için bkz. yukarıdaki "✅ Tamamlanan İyileştirmeler" bölümü. Kalan (bilinçli ertelenen veya mimari kısıt taşıyan) maddeler için bkz. **"⚠️ Hâlâ Eksik Olan Konular"**.
