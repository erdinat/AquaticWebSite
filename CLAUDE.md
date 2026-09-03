# CLAUDE.md — Aquatic Elektronik Web Sitesi

> React 19 + Vite 7 + Ant Design 6 + i18next (TR/EN/KK/RU) + EmailJS  
> Son güncelleme: 27 Ağustos 2026

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

### 🖼️ Favicon yenilendi — eski marka öncesi gradyan yerine damla logosu (28 Ağustos 2026)

Kullanıcı iki görsel paylaştı: mavi bir su damlası + baloncuklar logosu, ve mevcut favicon'un tarayıcıda nasıl göründüğünü gösteren bir ekran görüntüsü ("Ana Sayfa" yanındaki mavi daire+"A"), ikincisinin birincisiyle değiştirilmesini istedi. Kök tespit: `public/favicon.svg` 21 Ağustos'taki marka yenilemesinden beri hiç güncellenmemişti — hâlâ eski `#0050b3→#00b4d8` (parlak mavi-camgöbeği gradyan) ile basit bir daire+"A" harfiydi, CLAUDE.md'nin "Marka Yenileme" bölümünün kurtulmaya çalıştığı tam da bu görünümdü.

**Yeni tasarım:** SVG olarak yeniden çizildi — yuvarlak su damlası (üstte sivri, altta yuvarlak), içinde beyaz yarı saydam bir "parlama" hilali, sağ üstte azalan boyutlarda 3 baloncuk. **Renk kararı:** kullanıcının referans görselindeki parlak gök mavisi yerine sitenin kendi marka lacivert gradyanı (`--color-primary` `#0a3d62` → `--color-primary-dark` `#041f33`, `--gradient-primary` ile aynı) kullanıldı — şekil referanstan alındı, renk sitenin geri kalanıyla tutarlı kalsın diye markanın kendi tonuna bağlandı (parlak mavi kullanmak, favicon'u düzeltirken tam da kurtulmaya çalıştığımız "jenerik parlak mavi" görünümüne geri dönmek olurdu). Kullanıcı orijinal referansın kendi mavisini isterse tek satır (`stop-color`) değişikliği yeterli.

**Doğrulama:** Ortamda SVG-render aracı olmadığı için macOS'un yerleşik `qlmanage -t` (Quick Look thumbnail) komutuyla PNG'ye çevrilip hem büyük hem gerçek favicon boyutunda (32×32) görsel olarak kontrol edildi — küçük boyutta da damla şekli net okunuyor.

**Düzeltme (aynı gün):** Kullanıcı "sım sıyah gözüküyor" dedi — haklıydı: `#0a3d62→#041f33` gradyanının ikisi de koyu lacivert/neredeyse siyah tonlarda, 32×32 gibi küçük bir favicon boyutunda ayrım kayboluyor, damla tamamen siyah bir blob gibi görünüyordu (gradyanlar zaten bu kadar küçük alanda pek fark edilmiyor, iki koyu ton arasındaki gradyan sadece "daha da koyu" okunuyor). Marka lacivertine bağlı kalma kararı bu yüzden geri alındı — gradyan `#5BA3E0 → #2E6E96` (açık-orta mavi) yapıldı, artık hem büyük hem gerçek boyutta net "açık mavi damla" olarak okunuyor.

### 🌍 aquatic.kz için domain'e özel hizmet kategorisi düzenlemesi (30 Ağustos – 1 Eylül 2026)

Kullanıcının müşterisi ertesi gün Dubai'de (ilgi alanı: makina), sonraki gün Kazakistan'da (ilgi alanı: borular & endüstri) görüşme yapacaktı. `aquatic.com.kz`'de — hem anasayfa hem `/services` ve alt sayfaları hem header'daki "Hizmetler" menüsünde — Denizcilik'in 7 maddesinin Endüstri'ye taşınması, Endüstri'nin 4 maddesinin (Konveyörler, Trafo Sanayi Üretim Ekipmanları, Bobin Sarım Makinaları, Bobin Sarım Manderelleri) Makina'nın **en önüne** taşınması, Savunma Sanayi ile Sualtı Teknolojileri kategorilerinin **birleştirilmesi**, ve "Gemi Boru Donatım Faaliyetleri"nin "Kompleks Boru Donatım Faaliyetleri" olarak yeniden adlandırılması istendi — **ama `aquatic.com.tr` olduğu gibi kalmalıydı**. (Bu son hâline, "sadece anasayfa mı yoksa her yerde mi" konusunda bir tur ileri-geri netleştirmeden sonra ulaşıldı — kullanıcı önce kapsamı sadece anasayfaya indirmemi istedi, sonra "savunma sanayi + sualtı teknolojileri birleşimi"ni de ekleyip tüm bu taşıma/birleştirme/yeniden adlandırmanın hem anasayfada hem `/services`'te görünmesini istediğini netleştirdi.)

**Kritik mimari gerçek (kullanıcıya açıkça belirtildi):** `.kz` ve `.com.tr` aynı build'i paylaşıyor (bkz. "Aquatic.kz — İkinci Domain Desteği"), sadece varsayılan dil hostname'e göre değişiyor — içerik tamamen ortak. Bu yüzden değişikliği doğrudan `SERVICE_GROUPS`'ta yapmak TR'yi de bozardı. Çözüm: `src/i18n/langRouting.js`'e `isKzDomain()` eklendi (hostname `.kz` ile bitiyor mu kontrolü), `src/data/serviceGroups.jsx`'e bu domain kontrolüne göre orijinal `SERVICE_GROUPS`'u **mutasyona uğratmadan** yeniden düzenleyen `getActiveServiceGroups()` fonksiyonu eklendi (`.filter`/`.map`/spread ile her zaman yeni diziler üretiliyor, orijinal referans hiç değişmiyor). `.kz`'de sonuç **4 kategori**: birleşik "Savunma Sanayi & Sualtı Teknolojileri" (7 madde), Makina (4 taşınan madde önde + orijinal 4 = 8 madde), Endüstri (Denizcilik'in 7 maddesi + kalan 2 orijinal madde = 9 madde), Elektronik & Otomasyon (3 madde, değişmedi) — toplam 27 madde, TR'deki ile aynı.

**Kapsam:** `/services` kategori ızgarası, `/services/category/*` detay sayfaları, header'daki "Hizmetler" alt menüsü ve ana sayfadaki Kategori Vitrini'nin hepsi `.kz`'de bu 4-kategori yapısını tutarlı şekilde gösteriyor (ana sayfa hâlâ sadece Endüstri+Makina'yı büyük kart olarak öne çıkarıyor, bkz. aşağıdaki "lansman/gösterim tasarımı" notu — birleşik Savunma Sanayi kategorisi ana sayfada gösterilmiyor, sadece `/services`'te). Taşınan/birleştirilen maddelerin i18n içeriği (`services.denizcilik.items.*`, `services.savunmaSanayi.items.*`, `services.sualtiTeknolojileri.items.*`) **hiç kopyalanmadı** — her madde nesnesine `i18nCategoryKey` alanı eklenerek orijinal içerik konumuna işaret etmesi sağlandı (render kodu `item.i18nCategoryKey || group.key` şeklinde fallback kullanıyor), böylece TR'deki metin tek kaynaktan besleniyor, .kz'de sadece hangi kategori başlığı altında göründüğü değişiyor. Birleşik "Savunma Sanayi & Sualtı Teknolojileri" kategorisinin kendi başlığı/açıklaması için de yeni bir grup-seviyeli `titleKey`/`descKey` deseni eklendi (`services.kzOverrides.savunmaSanayiSualti.*`, 5 dilde) — bu grubun `services.savunmaSanayiSualti.title` gibi doğal bir karşılığı olmadığından, `ServicesPage.jsx`/`ServiceCategoryPage.jsx`'teki kategori başlığı okumaları da `group.titleKey || services.${group.key}.title` fallback'ine geçirildi.

**Yeniden adlandırma (sadece .kz):** "Gemi Boru Donatım Faaliyetleri" → "Kompleks Boru Donatım Faaliyetleri" (kullanıcının yazdığı "Komplex" yerine doğru Türkçe yazımı kullanıldı) — 5 dilin hepsinde `services.kzOverrides.boruDonatim.title/desc` anahtarlarıyla eklendi, `KZ_ITEM_LABEL_OVERRIDES` map'i üzerinden hem kategori ızgarasında hem maddenin kendi detay sayfasında (`ServiceDetailPage.jsx`, teklif formu e-posta konusu dahil) tutarlı şekilde gösteriliyor. TR'deki orijinal `services.denizcilik.items.boruDonatim.*` içeriğine hiç dokunulmadı.

**6-kartlık bento CSS, 4 kart için de bozuktu:** `/services`'teki `.svc-category-grid` bento CSS'i (`nth-child(1)`/`nth-child(6)` ile tam 6 kart için sabit kodlanmış — 1. kart 2 satır sol, son kart 2 satır sağ) hem 2 hem 4 kartla asimetrik/boşluklu görünüyordu. `isKzDomain()` true ise ızgaraya `svc-category-grid--kz` class'ı ekleniyor — bu, `nth-child` kurallarını `auto`'ya resetleyip düz 2×2 (masaüstünde), eşit boyutlu, `320px` yükseklikte bir varyant uyguluyor. 6-kartlı `.com.tr` düzeni CSS'te aynen kaldı.

> ⚠️ **Bilinçli sınır:** `boru-donatim`'in kendi detay sayfasındaki "İlgili Hizmetler" bölümü hâlâ `DETAIL_DATA`'nın orijinal `categoryKey`'ine göre (denizcilik) grupluyor — yani .kz'de bu maddenin "ilgili hizmetler" kartları hâlâ diğer Denizcilik maddelerini gösteriyor, yeni Endüstri komşularını değil. Zaman kısıtı nedeniyle bilinçli olarak ertelendi, canlıda fark edilirse ayrıca düzeltilebilir. Ayrıca "Kompleks Boru Donatım" için sadece başlık/kısa açıklama çevrildi — detay sayfasındaki uzun paragraf (`detail`/`materialsBody`/`capabilityBody`) hâlâ orijinal "gemi" odaklı metni kullanıyor.

**Doğrulama:** `esbuild` ile `serviceGroups.jsx` bağımsız bir Node script'ine derlenip `window.location.hostname` sahte olarak `aquatic.kz` ve `aquatic.com.tr` yapılarak gerçek veri üzerinde test edildi — KZ'de 4 kategori (7/8/9/3 madde, doğru sırayla) doğru çıktı, TR'de orijinal 6 kategori referansının (`groups === SERVICE_GROUPS`) hiç değişmediği doğrulandı.

**Local'de `.kz` önizleme için dev-only kısayol:** `isKzDomain()` artık gerçek hostname kontrolüne ek olarak `?kz=1` query param'ını da kabul ediyor (`src/i18n/langRouting.js`) — `localhost:3000` hiçbir zaman `.kz` ile bitmediği için bu olmadan `.kz`'ye özel tasarımı local'de görmenin yolu yoktu. `http://localhost:3000/?kz=1` ile önizlenebiliyor, gerçek `.kz` domaininin davranışını etkilemiyor.

### 🎨 aquatic.kz anasayfası — lansman/gösterim tasarımı (1 Eylül 2026)

Kullanıcının müşterisi yaklaşan Dubai/Kazakistan görüşmeleri için "lansman ve gösterim olacağı için" `.kz` anasayfasındaki Kategori Vitrini'nin ürün karuseli kaldırılıp sadece 2 kategori (Endüstri, Makina) büyük ve etkileyici görünsün istedi.

**Anasayfa (`HomePage.jsx`):** "Kategori Vitrini" bölümü artık `isKzDomain()`'e göre iki ayrı JSX dalına ayrıldı. TR/EN/RU/KK/ZH (`.com.tr`) tarafı eskisi gibi banner+ürün-karuseli (`.cs-row`/`.cs-banner`/`.cs-carousel`) render etmeye devam ediyor — hiç dokunulmadı. `.kz` tarafı için yeni `.kz-showcase-grid` (2 kolonlu, `min-height:460px` büyük kartlar) eklendi: tam kart fotoğraf arka planlı, koyu gradyan overlay, büyük ikon rozeti, büyük başlık+açıklama+beyaz CTA butonu — ürün kartı/karusel hiç yok, sadece kategorinin kendisi tıklanabilir büyük bir "vitrin" kartı (`/services/category/<key>`'e gidiyor). `categoryShowcaseRows` (zaten `.kz`'de Endüstri+Makina'ya filtrelenmişti) doğrudan yeniden kullanıldı, yeni veri gerekmedi.

**Bölüm başlığı da .kz'ye göre düzeltildi:** Orijinal başlık "Hizmetlerimiz ve Ürünlerimiz" + alt yazı "Denizcilikten savunma sanayiine, sualtı teknolojilerinden endüstriyel üretime..." `.kz`'de yanlış oldu (artık ürün karuseli yok, ve o alt yazının bahsettiği kategoriler .kz'de anasayfada gösterilmiyor). `.kz`'ye özel `categoryShowcase.kzTitle`/`kzSubtitle` (5 dilde, "Endüstri ve Makina Çözümlerimiz" vb.) eklendi, `HomePage.jsx` `isKzDomain()`'e göre ikisi arasında seçim yapıyor.

**Local'de `.kz` önizleme için dev-only kısayol:** `isKzDomain()` artık gerçek hostname kontrolüne ek olarak `?kz=1` query param'ını da kabul ediyor (`src/i18n/langRouting.js`) — `localhost:3000` hiçbir zaman `.kz` ile bitmediği için bu olmadan `.kz`'ye özel tasarımı local'de görmenin yolu yoktu. `http://localhost:3000/?kz=1` ile önizlenebiliyor, gerçek `.kz` domaininin davranışını etkilemiyor.

**Doğrulama:** `npm run lint` ve `npm run build` hatasız geçti.

### 🖼️ Ana sayfaya "Foto Albüm" bölümü eklendi (1 Eylül 2026)

Kullanıcı masaüstündeki `anasayfaphotolar/` klasöründen 22 adet pazarlama/ürün görseli (JPEG, ürün altyapı bilgi grafikleri + markalı tanıtım render'ları — anlık fotoğraf değil, hepsi metin/logo gömülü tam sayfa kompozisyonlar) paylaşıp anasayfaya bir "foto albüm" bölümü eklenmesini istedi. Tüm domainlerde gösteriliyor (kullanıcı `.kz`'ye özel bir kısıtlama belirtmedi).

**Görseller:** `cwebp -q 82` ile optimize edilip (genişlik zaten 1600px altındaysa yeniden boyutlandırılmadı, üstündeyse 1600px'e küçültüldü — büyütme yok) `public/images/gallery/gallery-01.webp` … `gallery-22.webp` olarak kondu (toplam 4.9MB, dosya başına ort. ~220KB). Orijinal dosya adları anlamsız olduğu için (`Unknown.jpeg`, `Unknown-N.jpeg` — muhtemelen bir mesajlaşma uygulamasından kaydedilmiş) sıralı, anlamlı isimlere çevrildi.

**Kod:** `HomePage.jsx`'e yeni `#home-gallery` bölümü eklendi ("Kataloglarımız" ile "Güncel Haberler" arasına) — `GALLERY_IMAGES` (22 elemanlı, `Array.from` ile üretilen path listesi) bir `auto-fill` ızgarada (`.home-gallery-grid`, 4:3 thumbnail'ler) render ediliyor; herhangi bir karta tıklamak yeni `galleryIndex` state'i üzerinden tam ekran bir lightbox açıyor (kapatma butonu, önceki/sonraki oklar, `Escape`/`ArrowLeft`/`ArrowRight` klavye desteği, backdrop'a tıklayınca kapanma). Harici bir lightbox/galeri kütüphanesi eklenmedi — sitedeki diğer karusellerle (Kategori Vitrini, Haberler) aynı "elle yazılmış, bağımlılıksız" yaklaşım korundu.

### 🐞 Mobilde menü kutusu ekran kenarına yaslanmıyordu — muhtemelen deploy edilmemiş eski build (30 Ağustos 2026)

Kullanıcı raporu: mobil hamburger menüsü (Drawer) ekranın sağ kenarına tam yaslanmıyor, sağında bir boşluk kalıyor; ayrıca kart sıralarının mobilde alt alta dizilmediği/sayfayı esnettiği belirtildi. İnceleme: bu tarif, 27 Ağustos'ta zaten düzeltilmiş olan "CSS grid taşması" hatasının (`madde: sayfayı taşıran CSS grid hatası düzeltildi`) belirtileriyle birebir örtüşüyor — `git show HEAD` ile doğrulandı, düzeltme (`minmax(0, 1fr)`) zaten son commit'te (`fcec2a8`) mevcut, yani kod tarafı muhtemelen doğru ama kullanıcı hâlâ o commit'ten önceki eski build'i görüyor olabilir (GA4/Çince dil eklemesinden beri henüz yeniden deploy edilmedi). Sayfa `overflow-x` ile taştığında mobil tarayıcılarda `position:fixed` elemanların (sağdan sabitlenmiş Drawer gibi) gerçek ekran kenarına değil, taşan belge genişliğine göre konumlanması bilinen bir davranış — tek kök sebep her iki belirtiyi de açıklıyor.

**Ek önlem:** `overflow-x:hidden` daha önce sadece `body`'de vardı, artık `html`'e de eklendi — bazı mobil tarayıcılarda `body`'nin `overflow-x:hidden`'ı tek başına yetmeyip taşan içerik `html` üzerinden belgeyi genişletebiliyor; bu ek güvenlik katmanı, henüz keşfedilmemiş bir taşma kaynağı olsa bile fixed-position elemanların kaymasını engeller.

> ⚠️ Kesin doğrulama için siteyi yeniden deploy edip canlıda kontrol etmek gerekiyor — mevcut local build'de bu sorunun zaten çözülmüş olması bekleniyor.

### 🐞 Mobil menüdeki dil butonları farklı boyutlardaydı (30 Ağustos 2026)

Kullanıcı mobil ekran görüntüsü paylaştı: hamburger menüsündeki "Language" bölümünde aktif dil butonu (Türkçe) diğer üçünden (English, Қазақша, Русский) belirgin şekilde daha büyük/geniş görünüyordu. Kök sebep, çerez onayı butonlarında daha önce bulunanla birebir aynı: `AppHeader.jsx`'teki dil butonları aktif dilde `type="primary"`, diğerlerinde `type="default"` kullanıyor — `index.css`'teki global `.ant-btn-primary` kuralı (`height: 48px !important`) sadece aktif butonu etkiliyor, `default` tipindeki diğer üçü antd'nin küçük buton boyutunda (~24px) kalıyordu. `Space` sarmalayıcısına `drawer-lang-switcher` class'ı eklenip `index.css`'e tüm dil butonlarını (aktif/pasif fark etmeksizin) 32px'e sabitleyen bir kural eklendi.

### 🐞 Kategori banner'larındaki tekrar eden görseller + kart ızgarasındaki "kayıp" görseller düzeltildi (29 Ağustos 2026)

47 görsel eklendikten hemen sonra iki ayrı kullanıcı raporu:

1. **"Hizmetler sayfasında bazı hizmetlerin görselleri aynı"** — `/services` kategori ızgarasında (6 kart) iki çift kart birebir aynı fotoğrafı gösteriyordu. Kök sebep: `src/data/serviceGroups.jsx` ve `HomePage.jsx`'teki `CATEGORY_SHOWCASE`'de `sualtiTeknolojileri` ile `savunmaSanayi` aynı `imgDefence` importunu, `endustri` ile `makina` aynı `imgMachinery` importunu paylaşıyordu (21 Ağustos'taki 4→6 kategori ayrımından kalma, o zaman bu iki yeni kategori için "kendilerine özel fotoğraf yok" diye belgelenmiş bilinçli bir geçici karardı). Artık her ikisi de gerçek, kendi kategorisine ait bir fotoğrafla değiştirildi — `sualtiTeknolojileri` → `savunmaSanayi-konnektor.webp`, `endustri` → `makina-konveyorler.webp` (29 Ağustos'ta eklenen 27 madde fotoğrafından ödünç alındı, yeni bir görsel üretmeye gerek kalmadı). Bu değişiklik hem `serviceGroups.jsx`'i (ki `ServicesPage.jsx` + `ServiceCategoryPage.jsx` ikisi de oradan besleniyor) hem `HomePage.jsx`'in kendi ayrı `CATEGORY_SHOWCASE` dizisini kapsıyor — ikisi de aynı ikilemi bağımsız olarak taşıyordu. (Tüm 27×3=81 görsel dosyası arasında md5 ile tam eşleşme taraması yapıldı, başka byte-eşit kopya çıkmadı — sorun sadece bu 2 kategori-seviyesi görseldeydi.)
2. **"Hizmetler kategori içerisindeki bazılarının görselleri gözükmüyor"** — `ServiceCategoryPage.jsx`'teki alt-hizmet ızgarasında her 3. kart (`(idx+1) % 3 === 0`) bilinçli olarak "düz renk" (görselsiz) gösteriliyordu — bu, o zamanki "asimetrik kart tasarımı" isteğinin bir parçasıydı. 47 görsel eklenmeden önce zaten birçok kart görselsiz olduğu için bu kural fark edilmiyordu; şimdi **27 maddenin tamamında** gerçek fotoğraf olduğu için bu zorla-düz-kart kuralı "görsel eksik/bozuk" gibi görünmeye başladı. Kullanıcının en güncel geri bildirimi önceki tasarım isteğini geçersiz kıldığı için kural kaldırıldı — artık bir kart sadece gerçekten eksik/yüklenemeyen bir fotoğrafı varsa düz renge düşüyor (`isFlat = !heroImage || missingPhotos[item.slug]`), zorunlu ritim kuralı olmadan.

### 🖼️ Eksik 47 hizmet görseli tamamlandı — 27 maddenin tamamında artık gerçek fotoğraf var (29 Ağustos 2026)

Kullanıcı, daha önce yayınlanan "Hizmet Görsel Promptları" artifact'indeki 47 promptla ürettiği görselleri `~/Desktop/hizmetGörselPromtları/` klasörüne koyup webp'ye çevirip yerlerine koymamı istedi. 47 dosyanın 44'ü doğru isimlendirilmişti; 3 tanesi yanlış isimlendirilmiş bulundu (`quote:boru-donatim-capability.png`, `quote:sualti-kablosu-capability.png`, `quote:torpido-kablolari-capabilit.png` — muhtemelen kaynak path'teki `/` karakteri dosya adına kopyalanırken `:`'ye dönüşmüş, sonuncusunda ayrıca "capability" kelimesi "capabilit" olarak kesilmiş) — her üçü de içerik olarak doğrulanıp (görsel açılıp prompt'la karşılaştırılarak) doğru slug+tip'e eşlendi. Tamamı `cwebp -q 85 -resize 1200 0` (materials/capability, `public/images/services/quote/`) veya `-resize 960 0` (trafo hero, `public/images/services/detail/`) ile projenin mevcut kalite/genişlik kuralına uygun şekilde optimize edildi.

**Kod tarafında fark edilen eksik bağlantı:** Görseller diskte olsa bile `src/data/serviceDetailContent.js`'teki `DETAIL_DATA`'da sadece orijinal 4 Makina maddesinin `materialsImage`/`capabilityImage` alanları vardı — kalan 23 maddede bu alanlar hiç tanımlı değildi, yani dosyalar var olsa da `ServiceDetailPage.jsx` onları hiçbir zaman render etmeyecekti. `DETAIL_DATA`'daki 23 girdinin tamamına `materialsImage`/`capabilityImage` eklendi. Artık **27 hizmet maddesinin tamamında** materyal/kabiliyet fotoğrafı var — `.svcd-materials-grid--no-image` (görselsiz tek-kolonlu fallback) ve `trafo-ekipmanlari`'nin `.svcd-hero-image` gri fallback'i artık hiç tetiklenmiyor (madde 37/38'deki ilgili eksik-görsel notları bu görsel setiyle kapandı — hâlâ açık olan tek görsel borcu `/products` sayfasındaki 48 konnektör serisi, madde 37).

### 🐞 Çerez butonlarının boy farkı, WhatsApp karşılama balonu, Kategori Vitrini'nde tek mavi ton (28 Ağustos 2026)

Üç ayrı istek:

1. **Çerez onayındaki "Kabul Et"/"Reddet" butonları farklı yükseklikteydi.** Kök sebep: `index.css`'teki global `.ant-btn-primary` kuralı (`height: var(--btn-height-md) !important` = 48px, sitedeki tüm birincil CTA butonları için bilinçli olarak var) sadece "Kabul Et"i (primary) etkiliyordu, "Reddet" (default tip) antd'nin kendi varsayılan yüksekliğinde kalıyordu. Global kural doğru ve başka yerlerde gerekli olduğu için dokunulmadı — bunun yerine `CookieConsent.css`'e `.cookie-consent-actions .ant-btn { height: 38px !important; ... }` gibi daha spesifik, iki butonu da eşitleyen bir kural eklendi.
2. **WhatsApp butonuna karşılama yazısı eklendi.** `WhatsAppButton.jsx` artık butonun solunda küçük, kapatılabilir bir konuşma balonu gösteriyor ("Merhaba! 👋 Size nasıl yardımcı olabilirim?" — `whatsapp.greeting`, 4 dilde), balona tıklamak da aynı WhatsApp linkini açıyor. Kapatma (×) durumu sadece component state'inde tutuluyor (sayfa yenilenince tekrar görünür — kalıcı "bir daha gösterme" tercihi istenmedi, basit tutuldu). CSS `position:fixed` artık yeni `.whatsapp-widget` sarmalayıcısında, buton kendisi statik flex item oldu.
3. **Ana sayfadaki Kategori Vitrini'nin 6 satırı farklı renklerdeydi** (lacivert/teal karışımı: `--color-primary-dark`, `--color-primary`, `--color-accent`, `#005f73`, `#0a9396`, `--color-accent-dark`) — kullanıcı hepsinin sitenin kendi mavi tonunda olmasını istedi. `HomePage.jsx`'teki `CATEGORY_SHOWCASE` dizisinde 6 satırın `color` alanı da `var(--color-primary)`'ye eşitlendi (banner degrade overlay'i, "İletişime Geç" buton rengi ve eksik-görsel placeholder ikon rengi hepsi bu tek tondan besleniyor).

### 🧹 Beş ayrı düzeltme: çerez bandı tasarımı, kataloglar ana sayfaya taşındı, TRC Marine logosu, haber karuseli (28 Ağustos 2026)

Kullanıcının tek mesajda verdiği 5 ayrı istek:

1. **Çerez onay bandı tasarımı kötüydü.** Kök sebep muhtemelen şuydu: eski tasarım tam genişlikte, koyu lacivert, sayfanın altına yapışık bir bant idi — sağ altta zaten sabit duran WhatsApp butonuyla (`z-index:999`, `bottom:24px`) çakışma riski taşıyordu. `CookieConsent.jsx`/`.css` yeniden tasarlandı: artık sol altta (WhatsApp'tan uzak), küçük, beyaz, yuvarlak köşeli, gölgeli bir kart (🍪 ikonu + kısa metin + "Kabul Et"/"Reddet" butonları), site genelinde zaten kullanılan kart dilini (beyaz + `box-shadow` + `border-radius`) takip ediyor. 480px altında tam genişlik alt sayfa (bottom sheet) haline geliyor.
2. **"Kataloglarımız" bölümü `/services`'ten ana sayfaya taşındı.** `ServicesPage.jsx`'teki `CATALOGS` verisi ve JSX'i tamamen kaldırılıp `HomePage.jsx`'e eklendi (Kategori Vitrini ile Haberler bölümü arasına — mantıken "ürün/hizmet" içeriğine en yakın yer). CSS `ServicesPage.css`'ten silinip yeni `.home-catalog-*` class'larıyla `HomePage.css`'e taşındı. `ServicesPage.jsx` artık sadece kategori seçim ızgarasından ibaret, çok daha sade (build çıktısında sayfanın JS chunk'ı ~3.2KB'tan ~1.6KB'a indi).
3. **Katalog kartlarındaki "11.6 MB" gibi dosya boyutu metni kaldırıldı** — kullanıcı gereksiz buldu. `catalog.size` alanı ve `.svc-catalog-meta`/`.home-catalog-meta` satırı tamamen kaldırıldı, sadece başlık/açıklama/indir butonu kaldı.
4. **Markalar bölümündeki "TRC Marine" logosu kötü görünüyordu** ("tac marine" olarak yazılmış, gerçek isim TRC Marine). Kök sebep: `trc.webp` dosyasının arka planı diğer marka logoları gibi temiz beyaz değil, hafif lavanta-beyaz bir gradyan içeriyordu — `.brand-logo-wrapper`'ın beyaz kart zemininde bu fark görünür bir leke gibi duruyordu. Python/Pillow ile yumuşak eşikleme uygulandı (gri ton ~180'in üzerindeki pikseller kademeli olarak saf beyaza çekildi, logo mürekkebi ~50'nin altında olduğu için hiç etkilenmedi) — arka plan artık diğer logolarla birebir aynı temiz beyaz. `marqueeBrands` dizisindeki görünen ad da `'TRC'` → `'TRC Marine'` olarak düzeltildi.
5. **"Haberleri durduramıyorum" — haber karuseli de Kategori Vitrini'yle aynı adım-adım kontrol desenine geçirildi.** Eskiden `.news-marquee-track` sonsuz `animation: scrollNews 45s linear infinite` ile kayıyordu, tek durdurma yolu hover'dı (dokunmatikte işe yaramaz). Artık `.cs-arrow` (Kategori Vitrini'nde zaten var olan aynı ok butonu class'ı, kod tekrarı önlemek için yeniden kullanıldı) ile adım adım kontrol ediliyor, `scroll-snap` ile hizalanıyor, kart listesi bir daha katlanmıyor (`[...newsItems, ...newsItems]` → `newsItems`). Yeni `newsCarouselRef` + `scrollNewsCarousel(direction)` `HomePage.jsx`'e eklendi.

### 🐞 Kök sebep: sitedeki açık gri ton aslında global bir token'dı — `--color-bg` beyaza çevrildi (28 Ağustos 2026)

Kullanıcı bir önceki düzeltmenin (hizmet detay sayfası) yeterli olmadığını, sorunun **birçok sayfada** tekrarlandığını ve muhtemelen global bir stil dosyasında olduğunu bildirdi — teşhisi doğruydu. Kök sebep: `src/index.css`'teki `--color-bg: #f4f7ff` token'ı `html`/`body`'ye (ve `MainLayout.jsx`'teki üst düzey `<Layout>` sarmalayıcısına inline `background: 'var(--color-bg)'` ile) uygulanıyordu — yani **her sayfanın temel arka planı** açık mavi-gri idi, beyaz değil. Buna ek olarak aynı `#f4f7ff` değeri, token'a referans vermeden 8 farklı sayfa CSS dosyasında (`HomePage`, `ServicesPage`, `ServiceCategoryPage`, `CorporatePage`, `BlackBoxPage`, `CareersPage`, `ContactPage`) toplam 17 ayrı bölüm arka planında hardcoded olarak tekrarlanmıştı (kopyala-yapıştır ile yayılmış, token'a bağlı değildi).

**Düzeltme:** `--color-bg` token değeri `#ffffff`'e çevrildi (tek satır, `html`/`body`/`MainLayout` otomatik güncellendi). 17 hardcoded `#f4f7ff` bölüm arka planı da `var(--color-bg)`'ye çevrildi — hem şimdi beyaz oldular hem de artık tek bir kaynaktan besleniyorlar, aynı hata (token'a bağlı olmayan kopya renk) bir daha bu şekilde sızamaz.

**Bilinçli olarak dokunulmayan 3 yer** (bunlar "sayfa arka planı" değil, küçük fonksiyonel UI elemanları, kullanıcının "body/main/genel kapsayıcı" tarifine uymuyor):
- `CorporatePage.css` → `.bank-iban-row` — IBAN kutusunun hafif vurgulu arka planı (artık beyaz sayfa üzerinde daha da belirgin bir "öne çıkan kutu" gibi okunuyor).
- `HomePage.css` → `.cs-card-image` — Kategori Vitrini kartlarındaki görsel yüklenmeden önceki/eksikken görünen arka fon.
- `HomePage.css` → `.skeleton-line` — haber bölümü yüklenirken gösterilen shimmer iskelet animasyonunun gradyanı; bunu beyaz yapmak yükleniyor göstergesini görünmez kılardı.

Ayrıca `CareersPage.css`/`ContactPage.css`'teki form input arka planları (`#fafbff` vb., `!important` ile), dosya yükleme kutusu ve tablo zebra-çizgileri gibi küçük, bağlama özgü UI vurguları da bilinçli olarak bırakıldı — bunlar kopyalanmış bir hata değil, standart form/tablo tasarım deseni.

### 🐞 Hizmet detay sayfalarındaki gri bantlar kaldırıldı — tüm arka planlar beyaz (28 Ağustos 2026)

Kullanıcı raporu: "hizmetler sayfasındaki her bir hizmet sayfasının arka planlarında hata var hepsi beyaz olmalı." `ServiceDetailPage.css`'te "Üretim Kabiliyeti" (`.svcd-capability-section`) ve teklif formu (`.svcd-quote-section`) bölümleri bilinçli olarak açık gri (`--svcd-gray: #f4f6f8`) bant olarak tasarlanmıştı (beyaz hero/malzemeler bölümleriyle almaşık — dergi sayfası hissi için) — 27 hizmet sayfasının tamamında bu iki bölüm gri görünüyordu. Kullanıcı bunu istemedi, ikisi de `#fff`'e çevrildi. İçindeki beyaz kartlar (`.svcd-capability-box`, `.svcd-quote-wrap`) artık beyaz zemin üzerinde sadece gölgeyle ayrışıyor — bu, sayfanın kendi hero bölümündeki (`.svcd-hero-box`) zaten var olan aynı desen (beyaz kart + gölge, beyaz zemin üzerinde) ile tutarlı, yeni bir çözüm icat edilmedi.

> Not: Malzeme/kabiliyet görseli eksik olan maddelerdeki görsel-yer-tutucu gri renkleri (`.svcd-hero-image`/`.svcd-capability-image` fallback) ve malzeme çip'lerinin (`.svcd-chip`) gri pill arka planı bilinçli olarak dokunulmadı — bunlar sayfa bölüm arka planı değil, küçük fonksiyonel UI elemanları (bkz. madde "Detay sayfa şablonu tüm 27 hizmet maddesine genişletildi" — eksik görsel notu hâlâ geçerli).

### 📊 Ziyaretçi Analitiği (Google Analytics 4 + Microsoft Clarity) + çerez onayı + gizlilik politikası (28 Ağustos 2026)

Müşteri "kimler ziyaret ediyor, nerelere bakıyorlar" görebileceği bir panel istedi. Statik/backend'siz bir sitede sıfırdan panel inşa etmek (kendi veritabanı + admin girişi + grafik arayüzü) ayrı, haftalarca sürecek bir proje olurdu — bunun yerine kullanıcıya seçenekler sunuldu (AskUserQuestion), **Google Analytics 4 + Microsoft Clarity** ikilisi seçildi: GA4 sayısal veriyi (ziyaretçi, sayfa, kaynak, coğrafya, cihaz) Google'ın kendi panelinde gösteriyor, Clarity ise "nerelere bakıyorlar" sorusuna GA4'ten daha iyi cevap veren gerçek tıklama/scroll ısı haritaları + oturum kayıtları sağlıyor. İkisi de ücretsiz, panel kod tarafında değil, ilgili servisin kendi web arayüzünde.

**KVKK uyumu (kullanıcı onaylı):** Sitede daha önce hiç çerez onay mekanizması/gizlilik politikası yoktu — kontrol edilip kullanıcıya bildirildi, ikisinin de eklenmesi istendi.

**Kod:**
- `src/utils/analytics.js` — `loadAnalytics()`: GA4 `gtag.js` + Clarity script'lerini dinamik olarak `<head>`'e ekliyor. **Sadece çağrıldığında** çalışıyor, sayfa yüklenince otomatik değil. ID'ler `.env`'den okunuyor (`VITE_GA4_MEASUREMENT_ID`, `VITE_CLARITY_PROJECT_ID`) — biri boşsa o araç atlanıyor (`popularProducts`/`NewsData` gibi projedeki mevcut "API key yoksa sessizce atla" deseniyle aynı).
- `src/components/common/CookieConsent.jsx` — `MainLayout.jsx`'e eklenen sabit alt banner. İlk ziyarette (localStorage'da karar yoksa) gösteriliyor; "Kabul Et" → `loadAnalytics()` çağrılıp karar `localStorage`'a yazılıyor, "Reddet" → hiçbir script yüklenmeden sadece karar kaydediliyor. `AppFooter.jsx`'teki yeni "Çerez Tercihleri" linki bir custom event (`open-cookie-preferences`) fırlatarak banner'ı tekrar açabiliyor — karar her zaman değiştirilebilir.
- `src/pages/PrivacyPolicyPage.jsx` + `.css` — yeni `/privacy` sayfası (çok dilli route mekanizmasıyla otomatik `/en/privacy` vb.), 7 bölümlük KVKK metni (veri sorumlusu, toplanan veriler, çerezler/analitik araçlar, işleme amacı, aktarım — Google/EmailJS, KVKK m.11 hakları, iletişim) — gerçek şirket bilgileriyle (`PageSEO.jsx`'teki JSON-LD'den alınan adres/e-posta/telefon). TR yazılıp EN/RU/KK'ya tam çevrildi (bu, marketing içeriği değil yasal metin olduğu için diğer bazı içerikler gibi "çeviri borcu" bırakılmadı). Footer'a ve `AppFooter.jsx`'e link eklendi.
- `public/.htaccess`'teki CSP güncellendi — `script-src`'e `googletagmanager.com`/`clarity.ms`, `connect-src`'e ayrıca `google-analytics.com` eklendi (yoksa onay verilse bile scriptler CSP tarafından sessizce engellenirdi).
- `public/sitemap.xml`'e `/privacy` 4 dilde eklendi (düşük öncelik, 0.30 — `/contact` gibi çekirdek sayfalarla aynı katmanda ama daha az önemli).

> ⚠️ **Bilinçli sınır:** GA4/Clarity ID'leri `.env`'de boş bırakıldı — müşteri kendi Google/Clarity hesabını oluşturup ID'leri paylaşana kadar hiçbir analitik veri toplanmıyor (kod hazır, sadece iki değer eksik). ID'leri nereden alacağı yukarıdaki "Analitik Config" bölümünde adım adım yazıyor.

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

### 💡 Sualtı Aydınlatma ürün ailesi eklendi (27 Ağustos 2026)

Kullanıcının paylaştığı "Aquatic Sualtı Aydınlatma Ürün Kataloğu 2026" (30 sayfa, konsept ürün kataloğu) PDF'i `/products` sayfasına işlendi. Katalog 15 gövde geometrisi × 2 malzeme seçeneği = 30 SKU içeriyor; kullanıcı kararıyla **15 ürün kartı** olarak eklendi (her kart iki malzeme seçeneğinin parça numarasını `specs.Parça Numaraları`'nda birlikte gösteriyor) — 30 ayrı kart yerine, çünkü PDF'te malzeme başına ayrı fotoğraf yok, sadece geometri başına 1 fotoğraf çifti var.

**Görsel çıkarma**: Bu PDF, `public/catalogs/aquatic-sualti-aydinlatma-katalogu-tr.pdf` altında zaten mevcuttu (önceki "Kataloglarımız" bölümü işiyle aynı dosya). Ortamda PDF-görsel çıkarma aracı yoktu (`pdftoppm`/`ImageMagick`/`ghostscript`/`mutool` hiçbiri kurulu değildi) — `pip install pymupdf` ile kuruldu, her ürün sayfası 200 DPI'da render edilip sabit bir kırpma kutusuyla (tüm 15 sayfada aynı şablon konumu) ürün fotoğrafı çıkarıldı, ikiye bölünüp (stüdyo + sahada) sadece stüdyo yarısı kullanıldı (site zaten ürün başına tek görsel gösteriyor, `product.images[0]`). `cwebp -q 85` ile optimize edilip `public/images/products/aq-*.webp` altına kondu (30-70KB/dosya).

**"Konsept" uyarısı**: Katalog açıkça "KONSEPT ÜRÜN KATALOĞU" ve son sayfada "güç, lümen, ölçü, çalışma derinliği ve IP68 ifadeleri konsept tasarım hedefidir; sertifikasyon beyanı değildir" diyor. Kullanıcı kararıyla `/products` sayfasında bu kategori (`subsea-lights-lasers`) seçiliyken kısa bir uyarı notu gösteriliyor (`products.conceptNote`, 4 dilde, `.products-concept-note` — amber bilgi kutusu).

**Kategori**: Mevcut `subsea-lights-lasers` kategorisine eklendi (`products.categories.subseaLights` = "Sualtı Aydınlatma ve Lazer") — bu kategoride zaten 1 eski ürün (`lhl-401`) vardı, şimdi 16 ürün var. Spec alan adları connector kataloğu entegrasyonundaki gibi Türkçe (aynı bilinen çeviri borcu, madde 38'e ek).

### 🐞 "Diğer" butonu (ve sağdaki dil seçici) ana sayfada görünmez oluyordu (27 Ağustos 2026)

Kullanıcı raporu: "Diğer" butonu bembeyaz, hiçbir şey görünmüyor. Kök sebep: ana sayfada header şeffaf (sadece scroll sonrası beyaza dönüyor) ve altındaki hero fotoğrafının kendi scrim'i (bkz. yukarıdaki "Hero metni sola alındı" notu) **sağa doğru neredeyse tamamen saydamlaşıyor** (sol taraftaki büyük sloganın okunabilirliği için bilinçli olarak böyle ayarlanmıştı). Header'ın en sağındaki öğeler (dil seçici, ve şimdi "Diğer") tam bu az-karartılmış bölgeye denk geliyor — özellikle parlak fabrika/atölye günışığı içeren yeni "makina" hero fotoğrafı aktifken beyaz metin neredeyse tamamen kayboluyor.

Düzeltme: `.app-header`'a (sadece şeffaf/scroll edilmemiş halde) kendi sabit koyu gradyanı eklendi (`::before`, `z-index:-1` — nav metninin arkasında ama header'ın kendi arka planının önünde kalacak şekilde konumlandı) — artık hangi hero fotoğrafı/slaytı aktif olursa olsun, header'daki metinler (özellikle sağ taraf) her zaman yeterli kontrastla okunabiliyor.

**Düzeltme (aynı gün, ikinci tur):** Kullanıcı raporu: "sayfaların en üst tarafında bir gölge var kötü duruyor" — koyu gradyan TÜM sayfalarda (sadece ana sayfada değil) görünüyordu. Sebep: CSS seçici `.app-header:not(.scrolled)` kullanıyordu, ama `scrolled` class'ı sadece gerçek scroll pozisyonuna bağlı (`window.scrollY>50`) — header'ın opak beyaz olduğu diğer sayfalarda (`!isHome`) sayfa henüz scroll edilmemişse `scrolled` class'ı da yok, dolayısıyla gradyan orada da render oluyordu; `z-index:-1` bunu header'ın **kendi arka plan rengi üzerine** çizdi (CSS stacking sırasına göre negatif z-index'li elemanlar, stacking context kökünün kendi arka planının ÜSTÜNDE, normal-flow içeriğin ALTINDA render olur) — sonuç: her sayfanın üstünde koyu bir leke. Düzeltme: `AppHeader.jsx`'e gerçek şeffaflık durumunu yansıtan ayrı bir `isTransparent` (`!scrolled && isHome`) hesaplanıp `transparent` class'ı olarak eklendi; CSS seçici `.app-header.transparent::before`'a çevrildi — artık sadece gerçekten şeffaf olduğu an (ana sayfa, scroll edilmemiş) render oluyor.

### 🐞 Kullanıcı detay sayfalarına ulaşamıyordu (UX, kod hatası değil) (27 Ağustos 2026)

Kullanıcı raporu: "hizmetler sayfasında bu sayfalara gidemiyorum." Route/kod tarafı doğrulandı (`/services/:slug` kayıtlı, sayfa hatasız derleniyor) — gerçek sorun kod değil akıştı: kullanıcı büyük kategori kartına (örn. "Aquatic Makina") tıklıyordu, ama o kart sadece kategoriyi seçip altındaki madde listesini açıyor (diğer 5 kategoriyle tutarlı olsun diye böyle bırakılmıştı) — asıl detay sayfası linkleri o listenin İÇİNDEki 4 madde satırı. Kart tıklanınca liste görünüme girse de sayfa pozisyonu değişmediği için bu adım fark edilmiyordu. Düzeltme: kategori kartına tıklamak artık içerik panelini otomatik olarak görünüme kaydırıyor (`contentRef` + `scrollIntoView`) — hash ile gelen (`/services#makina` gibi) ziyaretlerde bu ek kaydırma tetiklenmiyor, sadece doğrudan kart tıklamasında.

### 🏭 Özel imalat maddeleri için ayrı detay sayfası + teklif formu (27 Ağustos 2026)

Kullanıcı bir rakip sitenin (mucif.com/ozel_uretim) detaylı bir ekran görüntüsünü paylaşıp benzer bir yapı istedi: hero + malzemeler + üretim kabiliyeti + ilgili hizmetler + teklif formu bölümlerinden oluşan, minimalist beyaz/gri/**turuncu** renk paletli bir sayfa şablonu. Kapsam netleştirildi: **sadece Makina kategorisindeki 4 imalat maddesi** (Talaşlı İmalat, Kaynaklı İmalat, Özel İmalat Makinaları, 3D Tasarım) ve **gerçek ayrı URL'ler** (`/services/:slug`, örn. `/services/talasli-imalat`).

**Yeni dosyalar:** `src/pages/ServiceDetailPage.jsx` + `.css` — `App.jsx`'e `{ path: 'services/:slug', ... }` route'u eklendi (mevcut çok-dilli route üretim mekanizması sayesinde otomatik olarak `/en/services/:slug` vb. de çalışıyor). `ServicesPage.jsx`'te Makina kategorisinin 4 maddesine `slug` alanı eklendi — bu maddelere tıklamak artık akordeonu açmak yerine detay sayfasına yönlendiriyor (`ArrowRightOutlined` ok ikonuyla belirtiliyor), diğer 23 madde eskisi gibi akordeon davranışında kaldı.

**İçerik:** Her madde için "İşlediğimiz Malzemeler" listesi + iki paragraf (malzeme/kabiliyet) 4 dilde yazıldı (`services.detail.<slug>.*`), genel arayüz metinleri (`services.serviceDetail.*`) de 4 dilde eklendi. Hero görseli olarak zaten var olan `public/images/services/detail/makina-*.webp` fotoğrafları yeniden kullanıldı.

**Teklif formu:** Contact/Careers'daki EmailJS deseni tekrar kullanıldı (aynı servis/template ID, `cv_file` parametresi teknik dosya eki için yeniden kullanıldı — proje tek bir paylaşılan EmailJS template'i kullanıyor). Dosya yükleme PDF/DWG/STEP kabul ediyor.

> ⚠️ **Bilinçli sınır:** CV yüklemesinde zaten belgelenen 40 KB EmailJS eki sınırı burada da geçerli — ama gerçek DWG/STEP dosyaları neredeyse her zaman bundan çok daha büyük olur, yani bu form pratikte çoğu gerçek teknik dosya için işe yaramayacak. Arayüzde bu limit dürüstçe belirtiliyor ("Maks. 40 KB — daha büyük dosyalar için e-posta ile iletin") ama kalıcı çözüm bir backend/S3 katmanı gerektirir (CV yüklemesiyle aynı mimari kısıt, madde 19b).

**Görseller tamamlandı (aynı gün):** Kullanıcı verilen 8 prompt'la ürettiği görselleri (`~/Desktop/hizmetlerr/`, PNG) sağladı — hepsi doğrulanıp `cwebp` ile optimize edilerek (1200px genişlik, kalite 85) `public/images/services/quote/<slug>-materials.webp` / `-capability.webp` altına kondu.

### 🎨 Hizmetler sayfası kart-ızgara (bento) tasarımına geçti + 4→6 kategori (27 Ağustos 2026)

Kullanıcı bir rakip sitenin (mucif.com) "Özel İmalat" bölümünden ekran görüntüsü paylaştı — 6 kategorinin her biri arka plan fotoğraflı, üstte ikon rozeti, altta başlık/açıklama/"İncele" butonlu büyük kartlar halinde, asimetrik bir ızgarada (1. ve son kart 2 satır yüksekliğinde, ortadaki 4 kart 2x2) gösteriliyordu. Kullanıcı bu tasarımı Hizmetler sayfasına uygulamamı **ve** 21 Ağustos'ta 6'dan 4'e indirdiğimiz kategorileri tekrar 6'ya ayırmamı istedi.

**Kategori ayrımı:** `savunmaSanayi` (7 madde) → `savunmaSanayi` (3 madde: özel konnektörler, sonar kabloları, torpido kabloları — doğrudan savunma/askeri) + yeni `sualtiTeknolojileri` (4 madde: sualtı akustik, sualtı kablosu, kamera, konnektör — genel/çift-kullanımlı sualtı teknolojisi). `makina` (10 madde) → `makina` (4 madde: kaynaklı imalat, özel imalat makinaları, 3D tasarım, talaşlı imalat — çekirdek işleme/imalat) + yeni `endustri` (6 madde: konveyörler, trafo ekipmanları, bobin sarım makinaları/manderelleri, tesis boru donatım, tesis/fabrika kurulumu — endüstriyel altyapı/ekipman). **Not:** 21 Ağustos'taki orijinal birleştirmeden önceki madde-kategori eşlemesi hiçbir yerde ayrı kayıtlı değildi (sadece kategori isimleri CLAUDE.md'de geçiyordu) — bu ayrım içerik anlamına göre tarafımca yeniden oluşturuldu, birebir eski hali değil.

**Tasarım:** `.svc-tab-selector` (küçük hap-buton sıra) → `.svc-category-grid` (6 kart, `nth-child` ile CSS Grid'de asimetrik 4-kolon/2-satır yerleşim: 1. ve 6. kart `grid-row:1/3`, 992px altında 2 kolona, 560px altında 1 kolona düşüyor). Sol taraftaki büyük `.svc-info-panel` (fotoğraf+açıklama+CTA) kaldırıldı — artık aynı bilgiyi kart zaten taşıyor; yerine ince bir `.svc-content-header` çubuğu (ikon+başlık+açıklama+"İletişime Geç" CTA) kondu, madde listesi tam genişliğe çıktı. `dropdown.services.*` (AppHeader "Hizmetler" alt menüsü) ve `SERVICE_GROUPS`/i18n `services.*` 6 kategoriyi yansıtacak şekilde güncellendi (`services.viewLabel` = "İncele" yeni anahtar, 4 dilde).

> ⚠️ **Bilinçli sınır:** Yeni `sualtiTeknolojileri` ve `endustri` kategorileri için ayrı fotoğraf yok — geçici olarak ebeveynleriyle aynı görseli kullanıyorlar (`sualtiTeknolojileri` → `savunmasanayi.webp`, `endustri` → `makina.webp`). Kendilerine özel fotoğraf sağlanırsa `ServicesPage.jsx`'teki `SERVICE_GROUPS`'a bağlanmalı.

### 🏭 Detay sayfa şablonu tüm 27 hizmet maddesine genişletildi (27 Ağustos 2026)

Kullanıcı isteği: "diğer tüm hizmetler içinde yapalım bunun aynısını" — yukarıdaki "Özel imalat maddeleri için ayrı detay sayfası" özelliği (o zaman sadece Makina kategorisinin 4 imalat maddesine uygulanmıştı) artık **6 kategorideki tüm 27 madde** için geçerli.

**Kod:** `ServiceDetailPage.jsx`'teki `DETAIL_DATA` 4 girdiden 27 girdiye çıkarıldı, her biri `categoryKey`+`itemKey` taşıyor; bileşen içindeki tüm hardcoded `services.makina.items.*` referansları (EmailJS konu satırı, başlık/açıklama/detay okuma, ilgili-hizmet kartı başlığı) `services.${categoryKey}.items.${itemKey}` şeklinde dinamikleştirildi. "İlgili hizmetler" artık aynı kategoriden rastgele 3 madde seçiyor (tek maddelik kategori kalırsa herhangi 3 maddeye düşüyor). `ServicesPage.jsx`'teki `SERVICE_GROUPS`'ta kalan 23 maddeye de `slug` alanı eklendi — artık **27 maddenin tamamı** tıklanınca akordeon yerine kendi detay sayfasına (`/services/<slug>`) gidiyor.

**İçerik:** Kalan 23 madde için "İşlediğimiz Malzemeler" listesi + malzeme/kabiliyet paragrafları TR yazılıp EN/RU/KK'ya çevrildi (`services.detail.<slug>.*`, toplam 27 madde × 4 dil).

> ⚠️ **Bilinçli sınır — eksik görseller:** Yeni 23 maddenin **hiçbirinde** `materialsImage`/`capabilityImage` yok (sadece orijinal 4 Makina maddesinde var) — bileşen bunu zaten zarifçe atlıyordu (`entry.materialsImage &&` koruması, `.svcd-materials-grid--no-image` tek-kolonlu fallback stili), yeni maddeler bu haliyle malzeme bölümünde sadece metin gösteriyor, görsel yok. Ayrıca `makina-trafoEkipmanlari.webp` hero görseli hâlâ diskte yok — `missingImages.hero` state'i + `.svcd-hero-image` gri fallback arka planı bunu görünmez şekilde karşılıyor. Gerçek fotoğraflar sağlanınca 46 (23×2 malzeme/kabiliyet) + 1 (trafo hero) görsel eklenmeli.

### 🗂️ Hizmetler kategorileri artık gerçek ayrı sayfaya yönlendiriyor — "Kategori Detay" sayfası (27 Ağustos 2026)

Kullanıcı isteği: Hem ana sayfadaki Kategori Vitrini banner'ına hem `/services` sayfasındaki 6 ana kategori kartına tıklamak artık sadece aynı sayfada aşağı kaydırmamalı/sekme değiştirmemeli — gerçek bir routing ile ayrı bir "Kategori Detay" sayfasına gitmeli. Sayfa iki bölümden oluşuyor: üstte beyaz/yuvarlak/gölgeli bir başlık şeridi (ikon+isim+açıklama sol, koyu turkuaz "İletişime Geç ->" butonu sağ), altında 3'lü asimetrik bir alt-hizmet ızgarası (bazı kartlar fotoğraf+degrade overlay, bazıları düz koyu turkuaz/yeşil dolgu).

**Yeni route:** `/services/category/:categoryKey` — `App.jsx`'in `PAGES` dizisine `services/:slug`'dan önce eklendi (React Router segment sayısına göre eşleştiği için `/services/category/denizcilik` ile `/services/talasli-imalat` zaten çakışmıyordu, ama daha spesifik route'u önce koymak yine de doğru pratik). Mevcut çok-dilli route üretimi sayesinde `/en/services/category/...` vb. otomatik çalışıyor.

**Yeni dosyalar:** `src/pages/ServiceCategoryPage.jsx` + `.css`. `SERVICE_GROUPS` (6 kategori × 27 madde × ikon ataması) daha önce sadece `ServicesPage.jsx` içinde tanımlıydı, artık `serviceDetailContent.js`/`productCategoryVisuals.jsx` ile aynı gerekçeyle `src/data/serviceGroups.jsx`'e çıkarıldı — hem `ServicesPage.jsx` hem yeni sayfa oradan import ediyor, tek kaynaktan besleniyorlar. Madde görselleri (kart fotoğrafları) `serviceDetailContent.js`'teki `DETAIL_DATA`'dan (zaten var olan `heroImage` alanı) geliyor, ayrı bir görsel seti gerekmedi.

**Asimetrik kart kuralı:** Her 3. kart (`(idx+1) % 3 === 0`) bilinçli olarak "düz renk" varyanta düşürülüyor (2 fotoğraf, 1 düz — tekrar eden bir ritim); ayrıca görseli olmayan (`trafo-ekipmanlari`) veya yüklenemeyen (`onError`) kartlar da otomatik olarak düz varyanta düşüyor — üçüncü bir "ikon placeholder" durumu eklenmedi, spesifikasyon sadece iki kart tipinden bahsettiği için.

**Renk kararı:** "Koyu turkuaz/yeşil" için yeni bir hex icat etmek yerine sitede zaten tanımlı `--color-accent-dark: #2e4f54` token'ı kullanıldı (hem "İletişime Geç" butonu hem düz kartların arka planı) — tüm kategorilerde sabit/tutarlı, kategoriye göre değişmiyor (spesifikasyon tekil bir renk tarif ediyordu, kategori bazlı vurgu değil).

**Basitleşen `ServicesPage.jsx`:** Artık sadece kategori seçim ızgarası + katalog indirme bölümünden oluşuyor. Eskiden orada duran `activeTab`/`contentRef`/hash-okuma state'i ve mantığı (madde listesini aynı sayfada açan) tamamen kaldırıldı — kategori kartına tıklamak artık doğrudan `navigate('/services/category/<key>')` çağırıyor. `AppHeader.jsx`'teki "Hizmetler" alt menüsü de (`servicesDropdownItems`) eskiden `/services#<key>` hash'ine gidiyordu, artık aynı yeni route'a gidiyor.

> ⚠️ **Bilinçli sınır:** Yeni `/services/category/:categoryKey` sayfaları `public/sitemap.xml`'e eklenmedi — `/services/:slug` madde detay sayfaları da (27 tanesi) daha önce hiç eklenmemişti, bu tutarlı bir önceki karar/boşluk (sitemap sadece 7 ana sayfa × 4 dil = 28 URL içeriyor).

### 🐞 Kategori Vitrini satır başına 3 karta indirildi + sayfayı taşıran CSS grid hatası düzeltildi (27 Ağustos 2026)

Kullanıcı raporu: "sayfayı doldurmuşsun ... sayfada hata var." İki ayrı sorun vardı:

1. **İçerik yoğunluğu:** Her satır `products.json`'dan `.slice(0, 12)` ile en fazla 12 kart alıyordu — `HomePage.jsx`'te `.slice(0, 3)`'e indirildi, kullanıcının istediği gibi.

   **Düzeltme (aynı gün, yanlış yorumlanmıştı):** Kullanıcı "çubukları tıklayınca bir sonraki ürün çıkmıyor" diye bildirdi. Sebep: `.slice(0, 3)` satır başına toplam kart sayısını 3'e sabitlemişti, ama 3 kart (220px + 20px boşluk) masaüstünde karusel'in görünür genişliğine (~780px) zaten tam sığıyor — gösterilecek "sonraki" kart kalmıyordu, ok butonları kaymak için hiçbir şeye sahip değildi. "En üç tane olsun" isteği aslında "aynı anda ~3 tane görünsün" anlamına geliyormuş (3 kart genişliği zaten bunu doğal olarak sağlıyor), "toplamda sadece 3 tane olsun" değil. `.slice(0, 9)`'a çıkarıldı — 6 satırdan 5'i artık gerçekten kaydırılabilir durumda; `elektronikOtomasyon` (`fiber-optik` kategorisi) hâlâ kaymıyor çünkü o kategoride gerçekten sadece 3 ürün var — bu kod hatası değil, katalogdaki gerçek ürün sayısı sınırı.
2. **Gerçek CSS hatası (sayfayı taşıran):** `.cs-row` (banner + karusel'i yan yana koyan CSS Grid) ikinci kolonu düz `1fr` olarak tanımlıyordu. CSS Grid'de bir track'in örtük minimum genişliği "auto" (içeriğine göre) olduğundan, sabit genişlikli (220px) kartlardan oluşan flex karusel satırı **küçülmeyi reddediyordu** — track, tüm kartları yan yana sığdıracak kadar genişliyor, bu da satırı (ve sayfayı) container'ın dışına taşırıyordu. Sayfa genelindeki `overflow-x:hidden` (`index.css`) bu taşmayı görünmez kılıyordu ama karusel bu yüzden aslında hiç kaymıyordu — kartlar sığmadıkları için sayfanın görünmeyen kısmına gömülü kalıyorlardı, ok butonları da bu yüzden görünürde bir şey yapmıyor gibi duruyordu (gerçekte scroll container'ı hiç oluşmamıştı). Düzeltme: `grid-template-columns: minmax(240px, 30%) minmax(0, 1fr);` — track'in örtük minimumu `0`'a sabitlendi, bu standart "grid blowout" düzeltmesi. Artık `.cs-carousel` gerçekten container genişliğine sıkışıyor ve `overflow-x:auto` + `scroll-snap` beklendiği gibi çalışıyor.

### ⏮️⏭️ Kategori Vitrini karuseli otomatik kaymaktan adım-adım kontrole geçti (27 Ağustos 2026)

Kullanıcı isteği: ürünler kendi kendine sürekli kaymasın; bunun yerine kullanıcı sağ/sol ok butonlarıyla (veya mobilde parmakla) birer kart adım atsın. Önceki `csScroll` sonsuz-marquee animasyonu (`animation: ... infinite linear` + hover'da duraklatma + kart listesini ikiye katlayıp sorunsuz döngü sağlama tekniği) tamamen kaldırıldı.

**Yeni davranış:** `.cs-carousel` artık doğrudan scroll-snap konteyneri (`overflow-x:auto; scroll-snap-type:x mandatory;`), kart listesi bir daha katlanmıyor (döngü olmadığı için gerek kalmadı). Her satırın sağ/sol kenarında yarı-saydam beyaz, gölgeli, dairesel `.cs-arrow` butonları eklendi (`LeftOutlined`/`RightOutlined`) — tıklanınca `scrollCsCarousel(rowKey, ±1)` çalışıyor, bu da `csCarouselRefs` ile o satırın DOM elemanını bulup `scrollBy({ left: ±(kartGenişliği+gap), behavior:'smooth' })` çağırıyor; `scroll-snap` sayesinde kart tam hizada durur. 6 satırın her biri kendi ref'ine sahip olduğu için (`useRef({})`, satır anahtarına göre map), oklar birbirini etkilemiyor.

**Mobil (768px altı):** Oklar `display:none` ile gizleniyor (dokunmatik ekranda zaten parmakla kaydırılabiliyor, oklar sadece görsel gürültü olurdu) — `scroll-snap` davranışı masaüstüyle aynı kaldığı için ayrı bir mobil CSS bloğuna gerek kalmadı, tek `.cs-carousel` kuralı her ekran boyutunda geçerli.

### 🗑️ "Önemli Kilometre Taşları" bölümü ana sayfadan kaldırıldı (27 Ağustos 2026)

Kullanıcı isteğiyle `HomePage.jsx`'teki `home-milestones` bölümü (6 kart: yıl rozeti + ikon + başlık/açıklama) tamamen silindi — `milestones` veri dizisi, JSX bölümü ve `.references-section`/`.references-grid`/`.milestone-*` CSS kuralları kaldırıldı. Artık kullanılmayan `TrophyOutlined`/`SafetyCertificateOutlined`/`StarOutlined`/`ApartmentOutlined` import'ları da temizlendi (`FileTextOutlined` haberler bölümünde hâlâ kullanıldığı için kaldırılmadı). `milestones.*` i18n anahtarları 4 dil dosyasında bırakıldı (madde 39'daki gibi belgelenen ölü içerik).

**Fark edilen ek sorun (aynı geçişte düzeltildi):** `AppHeader.jsx`'teki "Ana Sayfa" dropdown menüsü (`homeDropdownItems`) hâlâ bir önceki "Kategori Vitrini" işinden kalma **üç** kırık anchor içeriyordu — `home-services` ve `home-products` (bir önceki turda `home-category-showcase` olarak birleştirilmişti, o sırada bu dropdown güncellenmemişti) ve şimdi silinen `home-milestones`. Üçü tek bir `home-category-showcase` girdisiyle değiştirildi (yeni `dropdown.home.categoryShowcase` i18n anahtarı, 4 dilde eklendi), böylece dropdown artık gerçekte var olan 4 bölümü (`home-stats`, `home-category-showcase`, `home-news`, `home-brands`) doğru şekilde listeliyor.

### 🛍️ Ana sayfaya "Kategori Vitrini" bölümü eklendi (27 Ağustos 2026)

Kullanıcı isteği: ana sayfadaki "Hizmet Alanlarımız" (4 kart) ve "Kayan Ürünler Vitrini" bölümlerinin yerine, her kategori için sol tarafta sabit banner (%30) + sağ tarafta otomatik kayan yatay ürün/hizmet karuseli (%70) olan yeni bir "Kategori Vitrini" bölümü. Karusel: sayfa yüklenince kendi kendine yavaşça kayıyor, mouse üzerine gelince duruyor (`animation-play-state: paused`); mobilde banner üstte, altında parmakla kaydırılan (`scroll-snap`) kart listesi.

**Netleştirilen 2 karar (kullanıcıya AskUserQuestion ile soruldu):** (1) Sitede fiyat/sepet sistemi yok — istenen "SEÇENEKLER" butonu yerine fiyatsız "TEKLİF AL" butonu kullanıldı (tıklanınca ilgili ürün/hizmetin sayfasına gider). (2) İki eski bölüm tamamen kaldırılıp bu tek bölümle değiştirildi.

**Fark edilen veri kısıtı (kullanıcıya sorulmadan, kod incelemesiyle tespit edilip mantıklı şekilde çözüldü):** `products.json`'daki 66 üründen sadece 18'inde (2 kamera + 16 sualtı aydınlatma) gerçek fotoğraf var — 48 konnektör serisi hâlâ görselsiz (madde 37). Bu yüzden "ürün" kartı sadece **Sualtı Teknolojileri** satırında gerçek `products.json` verisiyle dolduruldu (`underwater-cameras` + `subsea-lights-lasers` kategorileri, fotoğrafı olan ürünler). Diğer 5 satır (Denizcilik, Savunma Sanayi, Makina, Endüstri, Elektronik&Otomasyon) o kategorinin **kendi hizmet maddelerini** kart olarak gösteriyor (gerçek detay-sayfası fotoğrafları zaten var, tıklanınca `/services/<slug>` detay+teklif sayfasına gidiyor) — konnektör ürünlerini görselsiz veya yanlış kategoriye zorla eşleyip göstermek yerine bu tercih edildi. Kullanıcı isteğindeki "hizmet ve ürünleri birleştiren" ifadesiyle tutarlı: bazı satırlar ürün, bazıları hizmet gösteriyor, hangisinin gösterileceği o kategoride gerçekten fotoğraflı içerik olup olmamasına göre belirleniyor.

**Kod:** `HomePage.jsx`'teki `CATEGORY_SHOWCASE` dizisi her satır için `source: 'products' | 'services'` taşıyor; `categoryShowcaseRows` bu kaynağa göre `products.json`'dan veya `DETAIL_DATA`'dan kart listesi üretiyor. Karusel CSS'i sitede zaten var olan haber marquee tekniğiyle aynı (`display:flex; width:max-content; animation: ... infinite linear;` + `:hover{animation-play-state:paused}` + kenar `mask-image`), sadece 768px altında `animation:none` + `overflow-x:auto; scroll-snap-type:x` ile mobil swipe'a dönüyor. Banner tasarımı `ServicesPage.jsx`'teki `.svc-category-card` ile aynı görsel dili paylaşıyor (fotoğraf arka plan + degrade overlay + ikon rozeti), CTA metni yeni `categoryShowcase.ctaLabel` ("TIKLA!") anahtarından geliyor. Kart butonu turuncu çerçeveli (`#f5821f` — `ServiceDetailPage.css`'teki `--svcd-orange` ile aynı ton, bilinçli marka-dışı vurgu, WhatsApp yeşili istisnasıyla aynı mantık).

**Düzeltme (27 Ağustos 2026):** Kullanıcı "TEKLİF AL" butonundaki bu turuncuyu istemedi — `.cs-card-quote-btn` `var(--color-primary)` (site marka mavisi) kullanacak şekilde değiştirildi.

**Kapsam genişletildi (aynı gün):** Kullanıcı "sayfalarda hala sarı/turuncu renkler var, hemen hepsini düzelt" dedi — bu, `ServiceDetailPage.css`'teki `--svcd-orange` paletinin (madde "Özel imalat maddeleri için ayrı detay sayfası" — o zaman kullanıcının kendi isteğiyle, bir rakip site referansından bilinçli olarak eklenmişti) artık **istenmediği** anlamına geliyor; o karar bu mesajla geçersiz kılındı. Kod genelinde `orange|amber|gold|yellow` + bilinen turuncu hex kodları için tam tarama yapıldı, bulunan 3 yer maviye çevrildi:
- `ServiceDetailPage.css`: `--svcd-orange`/`--svcd-orange-dark` değişkenleri `--svcd-accent`/`--svcd-accent-dark` olarak yeniden adlandırıldı (isim artık rengi yanlış tanıtmasın diye) ve değerleri `var(--color-primary)`/`var(--color-primary-hover)`'a çevrildi; `.svcd-btn:hover`'daki elle yazılmış `rgba(245, 130, 31, 0.35)` gölge rengi de `rgba(10, 61, 98, 0.35)`'e güncellendi (CSS custom property değişince otomatik güncellenmeyen tek yer buydu). `ServiceDetailPage.jsx`'teki artık anlamsız/etkisiz `svcd-btn--orange` class'ı (zaten kendi CSS kuralı yoktu, sadece `.svcd-btn` üzerinden renk geliyordu) 3 kullanım yerinden de kaldırıldı.
- `ProductsPage.css`: `.products-concept-note` (aydınlatma "konsept ürün" uyarı kutusu) amber (`#fff8ec`/`#f0d9a8`/`#8a6314`) yerine site mavisi tonlarına (`var(--color-primary-bg)`/mavi border/`var(--color-primary-dark)`) çevrildi; `.product-premium-badge` ("Premium" rozeti) turuncu-altın gradyanı (`#f59e0b→#d97706`) yerine `var(--gradient-primary)` (sitenin mevcut lacivert gradyanı, `--stat-value` vb.'de zaten kullanılıyor) kullanıyor.

**Bir yandaki bundling düzeltmesi:** Bu iş sırasında `ServicesPage.jsx`'in bir önceki turda `DETAIL_DATA`'yı doğrudan `ServiceDetailPage.jsx`'ten import ettiği fark edildi — bu, `ServicesPage`'in lazy-load chunk'ının `ServiceDetailPage`'in ağır Antd `Form`/`Upload` bağımlılıklarını da içine çekmesine (code-splitting'i kısmen geçersiz kılmasına) neden oluyordu. `DETAIL_DATA`/`SLUGS` bağımsız bir `src/data/serviceDetailContent.js` dosyasına taşındı, hem `ServiceDetailPage.jsx` hem `ServicesPage.jsx` hem yeni `HomePage.jsx` oradan import ediyor — `npm run build` çıktısı bunu doğruladı (`serviceDetailContent-*.js` artık 4.4KB'lık ayrı, bağımsız bir chunk).

**Kaldırılan eski kod:** `HomePage.jsx`'teki eski statik "popüler ürünler" demo dizisi (7 sabit ürün, `popularProducts.items.*` i18n anahtarlarına bağlıydı) ve eski `services` önizleme dizisi (sadece 4 kategori, `servicesPreview.*`'a bağlıydı) silindi; bu iki i18n namespace (`popularProducts.*`, `servicesPreview.*`) artık kodda kullanılmıyor ama 4 dil dosyasından silinmedi (madde 39'daki gibi belgelenen ölü içerik — riskli toplu JSON düzenlemesi yerine bilinçli olarak bırakıldı).

> ⚠️ **Bilinçli sınır:** "Ürün" kartlarında fiyat yok (sitede fiyat/sepet altyapısı yok, madde 19b/29 ile aynı mimari sınır).

**Düzeltme (aynı gün):** Kullanıcı yukarıdaki "hizmet-kaynaklı satır" tercihini istemedi: "hizmetleri ekleme sadece ürünler olsun ama ürünler sayfasındaki hizmetlere uygun kategorideki ürünleri koy." Tüm satırlar `products.json`'a bağlandı — her hizmet kategorisi, `categories.json`'daki en yakın kavramsal ürün kategorisi/kategorileriyle eşleştirildi (örn. `savunmaSanayi` → `metal-govdeli`+`guc-serileri`; `elektronikOtomasyon` → `fiber-optik`; tam eşleme listesi `HomePage.jsx`'teki `CATEGORY_SHOWCASE`'de) — 12 ürün kategorisinin tamamı bir satıra dağıtıldı, hiçbiri açıkta kalmadı. Görseli olmayan ürünler (madde 37 — 66 üründen 48'i hâlâ görselsiz) artık satırdan atılmıyor; `ProductsPage.jsx`'teki mevcut "kategori ikonlu placeholder" deseni yeniden kullanıldı (`.cs-card-image-placeholder`). Bu deseni iki sayfada tutarlı tutmak için `categoryColors`/`getCategoryIcon` `ProductsPage.jsx`'ten `src/data/productCategoryVisuals.jsx`'e çıkarıldı (yukarıdaki `serviceDetailContent.js` ile aynı gerekçe: paylaşılan veri, sayfa bileşeninin ağır bağımlılıklarını lazy-chunk'lar arasında sızdırmasın diye). Artık hiçbir satır hizmet maddesi göstermiyor; hizmetlere geri dönmek istenirse bu not ve önceki paragraf referans alınmalı.

### 🖼️ Hizmet madde listesi de fotoğraf kartına dönüştürüldü (27 Ağustos 2026)

Kullanıcı geri bildirimi: madde listesi (kategori kartının altındaki 27 maddelik liste) düz beyaz satırlar halindeydi, "görsellerle olsun hizmetlerin kendilerinin tasarımı gibi" istendi — yani üstteki kategori kartlarıyla (fotoğraf arka plan + overlay + ikon rozeti + başlık/açıklama/buton) aynı görsel dil.

**Önkoşul (fark edilen fırsat):** Az önceki "tüm 27 maddeye detay sayfası" işiyle artık `SERVICE_GROUPS`'taki **her** maddede bir `slug` var — yani eski akordeon aç/kapa mantığı (`expandedItem`/`toggleItem` state'i, madde tıklanınca detay panelini açma) tamamen ölü koddu (hiçbir zaman tetiklenmiyordu). Bu state ve ilgili dallanma kaldırıldı, artık her madde her zaman kendi `/services/<slug>` sayfasına gidiyor.

**Kod:** `svc-items-list` (dikey satır listesi) → `svc-items-grid` (responsive `auto-fill` kart ızgarası, `.svc-item-card` — kategori kartıyla birebir aynı yapıda: `<img>` arka plan + gradyan overlay + köşe ikon rozeti + alt bantta başlık/açıklama/"İncele" butonu). Görsel kaynağı olarak `ServiceDetailPage.jsx`'teki `DETAIL_DATA` (artık `export` edildi) yeniden kullanıldı — madde fotoğrafı zaten detay sayfasının hero görseliyle birebir aynı, ayrı bir path hesaplama gerekmedi. Bu ayrıca gizli bir hatayı da düzeltti: eski kod `${activeGroup.key}-${item.key}` şeklinde path hesaplıyordu, ama `sualtiTeknolojileri`/`endustri` kategorileri 21 Ağustos'taki 4→6 ayrımından sonra eklendiği için dosya adları hâlâ eski `savunmaSanayi-`/`makina-` önekini taşıyor — bu iki kategorideki tüm maddelerin thumbnail'i sessizce "eksik" görünüyordu. `DETAIL_DATA`'nın doğru (eski önekli) path'leri kullanılmasıyla bu artık düzeldi.

> ⚠️ `makina-trafoEkipmanlari.webp` hâlâ diskte yok (bkz. yukarıdaki not) — o kart görselsiz, sadece `--item-color` düz renk arka planla render oluyor (`.svc-item-card`'ın kendi `background` fallback'i).

### 🧭 Üst menü sadeleştirildi — "Diğer" dropdown'ı eklendi (27 Ağustos 2026)

Kullanıcı isteği: üst menüde sadece Ana Sayfa, Kurumsal, Hizmetler, Ürünler direkt görünsün; İletişim/Kariyer/Milli Kara Kutu bir butonun arkasına gizlensin. `AppHeader.jsx`'e yeni bir "Diğer" (`nav.more`, 4 dilde) nav öğesi eklendi — kendi sayfası olmayan, sadece `moreDropdownItems` (İletişim/Kariyer/Kara Kutu) açan bir dropdown. Bu üç sayfa `navItems`'tan çıkarıldı. Yeni `dropdownOnly: true` bayrağı eklendi: normalde dropdown'lı nav öğelerine tıklamak o öğenin kendi sayfasına gider (Ana Sayfa/Kurumsal/Hizmetler için doğru), ama "Diğer"in kendi sayfası olmadığı için `dropdownOnly` bu davranışı bastırıyor (tıklama sadece flyout'u açıyor, hiçbir yere navigate etmiyor). Mobil Drawer'da zaten ek bir değişiklik gerekmedi — dropdown'lı öğeler orada zaten expand/collapse SubMenu olarak render ediliyor, üst öğeye tıklamak zaten navigate tetiklemiyordu.

### 🧭 Ana Sayfa/Hizmetler dropdown menüleri düzeltildi — güncel bölümler + iç içe alt-menü (2 Eylül 2026)

Kullanıcı iki ayrı sorun bildirdi: (1) "Ana Sayfa" dropdown'ında tıklayınca gitmiyor ve yazılar anasayfanın bölümleriyle eşleşmiyor, (2) "Hizmetler" dropdown'ında bir kategorinin (örn. Sualtı Teknolojileri) üzerine gelince onun maddelerinin açılması gerekiyor.

**Sorun 1 kök sebebi — "Ana Sayfa" dropdown'ı gerçekten eskimişti:** `AppHeader.jsx`'teki `homeDropdownItems` elle tutulan bir liste (`home-stats`, `home-category-showcase`, `home-news`, `home-brands`) — ama `HomePage.jsx`'e sonradan eklenen `home-catalogs` (Kataloglarımız) ve `home-gallery` (Foto Albüm) bölümleri bu listeye hiç eklenmemişti, `.kz`'ye özel `home-kz-video` bölümünün de hiç `id`'si yoktu. İkisi de eklendi (`isKzDomain()` ile `home-kz-video` sadece `.kz`'de listede). Ayrıca `scrollToSection` fonksiyonu başka bir sayfadan anasayfaya geçerken sabit `setTimeout(400ms)` kullanıyordu — `HomePage` `React.lazy()` ile kod-bölünmüş olduğu için bu süre bazen chunk yüklenmeden dolabiliyor, hedef eleman DOM'da henüz yokken `scrollIntoView` sessizce hiçbir şey yapmadan geçiyordu (kullanıcıya "tıklama işe yaramadı" gibi görünüyor). Sabit gecikme yerine elemanın varlığını 150ms aralıklarla ~3 saniyeye kadar yoklayan (`tryScroll`) bir mekanizmaya çevrildi.

**Sorun 2 çözümü — Hizmetler dropdown'ı artık `getActiveServiceGroups()`'tan besleniyor, elle tutulan ayrı bir kategori listesi yok:** Önceki kod `.kz`/`.tr` için iki ayrı elle yazılmış kategori dizisi tutuyordu (bu da az önceki "Ana Sayfa" sorunuyla aynı "elle senkron tutulan liste zamanla eskir" hatasına açıktı). Artık `ServicesPage.jsx`/`ServiceCategoryPage.jsx` ile **aynı kaynaktan** (`serviceGroups.jsx`'in `getActiveServiceGroups()`'u) besleniyor — kategori sayısı/sırası/isimleri hiçbir yerde ayrıca tutulmuyor. Her kategori artık kendi maddelerini `children` (antd'nin iç içe SubMenu deseni) olarak taşıyor — üzerine gelince madde listesi yan tarafta açılıyor. antd'nin SubMenu başlığında `onClick` güvenilir şekilde tetiklenmediği için (bilinen bir kısıt), her alt-menünün en üstüne kalın yazılmış bir "İncele" (`services.viewLabel`, zaten var olan anahtar) satırı + ayırıcı eklendi — kategori sayfasına gitmenin garantili yolu bu.

**Mobil Drawer'a da yansıtıldı:** Drawer'ın `Menu`'sü zaten `mode="inline"`, iç içe `children` desteğini native olarak destekliyor — dropdown eşlemesi artık bir alt-öğenin KENDİ `children`'ı varsa (yani bir hizmet kategorisiyse) onu da bir sonraki genişleyebilir seviyeye çeviriyor (Hizmetler → Kategori → Madde, 3 seviye), `{type:'divider'}` girdilerini de olduğu gibi geçiriyor.

**Kod temizliği:** `RocketOutlined`/`CompassOutlined`/`ThunderboltOutlined`/`ToolOutlined` gibi sadece elle yazılmış kategori listesinde kullanılan ikon import'ları kaldırıldı (artık `group.icon` veri katmanından geliyor).

### 🖼️ Konnektör ürün görselleri tamamlandı — 48 üründen 47'si artık gerçek fotoğraflı (2 Eylül 2026)

Kullanıcı `~/Desktop/productsaquatic/` klasörüne 48 ürün görseli koydu (madde 37'de belgelenen, 21 Ağustos'taki PDF entegrasyonundan beri görselsiz kalan konnektör serileri için). Dosya adları `products.json`'daki ürün `id`'leriyle **birebir eşleşiyordu** (örn. `kucuk-dairesel-2-6.jpg` → id `kucuk-dairesel-2-6`) — Python'la karşılaştırma yapılıp 47/48 tam eşleşme doğrulandı, sadece `standart-dusuk-profilli-13` için klasörde dosya yoktu (kullanıcıya ayrıca soruldu, hâlâ eksik).

**İşlem:** Her görsel `cwebp -q 85` ile optimize edildi — kaynak genişlik 900px'i geçiyorsa `-resize 900 0` ile küçültüldü, altındaysa (örn. 784px olan bir dosya) büyütülmedi (projenin "yukarı ölçeklendirme yok" kuralı). Çıktılar `public/images/products/<id>.webp` olarak kondu (toplam 1.9MB, dosya başına ort. ~40KB — mevcut `aq-uwl-*` ürün görselleriyle aynı boyut aralığında). `products.json`'daki ilgili 47 ürünün `images` alanı bu path'lere güncellendi.

**Doğrulama:** Birkaç görsel açılıp ürün adıyla içeriğin eşleştiği teyit edildi (örn. `metal-govdeli-55-39.webp` → 39 kontaklı metal konnektör, `anahtarlar-kilitleme-kovanlari.jpeg` → 2 anahtar + 2 kilitleme kovanı). Script sonunda tüm `images` path'lerinin diskte gerçekten var olduğu ayrıca doğrulandı (`os.path.exists` taraması, 0 eksik).

> ⚠️ **Kalan:** `standart-dusuk-profilli-13` (Standart Düşük Profilli Seri, 13 Kontak) hâlâ görselsiz — kullanıcı bu ürünün fotoğrafını ayrıca sağlarsa aynı isimlendirme kuralıyla (`standart-dusuk-profilli-13.webp`) eklenebilir. Ayrıca madde 38 (bu 48 ürünün açıklama/özellik metinleri sadece Türkçe) hâlâ açık — bu iş sadece görselleri kapsadı.

### 📍 İletişim bilgileri güncellendi — Merkez Ofis/Ar-Ge/Fabrika 3 lokasyona geçildi (1 Eylül 2026)

Kullanıcı güncel resmi iletişim bilgilerini verdi: 3 gerçek Kocaeli-bölgesi adresi (Merkez Ofis, Ar-Ge Ofisi, Fabrika), 4 telefon numarası (2 Tel&Faks + 2 Mobil), ve `.kz` için ayrı bir e-posta (`bilgi@aquatic.com.kz`). Eskiden sitede Kocaeli/İstanbul/Almatı (Kazakistan) olmak üzere 3 farklı şehir/ofis vardı — kullanıcı sadece 3 yeni Kocaeli adresini verdiği için İstanbul ve Almatı ofisleri de kaldırılmıştı, ama bu **yanlış bir varsayımdı**: kullanıcı Almatı adresini kaldırmamı istememişti, sadece yeni Kocaeli bilgilerini eklettirmişti. Aynı gün fark edilip düzeltildi (bkz. aşağıdaki "Almatı adresi geri eklendi" notu) — İstanbul kaldırılmış olarak kaldı (kullanıcı sadece Almatı'yı geri istedi), Almatı artık **tam adresle** (bina/daire/posta kodu dahil) 4. kart olarak her iki domainde de duruyor.

**Telefon-ofis eşleşmesi netleştirildi (kullanıcıya soruldu):** 4 numaranın hangi ofise ait olduğu belirtilmediği için, 3 ofis kartı sadece isim+adres gösterecek, 4 numaranın hepsi + e-posta ayrı, ofise özel olmayan tek bir "Bize Ulaşın" bloğunda (İletişim sayfasının sol panelinde) listelenecek şekilde karar verildi.

**Değişen dosyalar:**
- `src/locales/*.json` (5 dil): `contact.kocaeli/istanbul/almaty` kaldırıldı → `contact.headOffice/rdOffice/factory` (sadece başlık+adres) eklendi; `contact.telFax`/`contact.mobile` (2'şer elemanlı diziler, numaralar tüm dillerde aynı — telefon numarası çevrilmez) + `telFaxLabel`/`mobileLabel` eklendi; `footer.address` yeni Merkez Ofis adresine güncellendi; `privacyPolicy.sections[0].body` (KVKK veri sorumlusu adresi) yeni adrese güncellendi (telefon/e-posta bilinçli olarak değişmedi — bunlar TR tüzel kişiliğin kanonik iletişim bilgisi, .kz e-posta farkı sadece "bize ulaşın" kolaylığı, yasal metin değil).
- `ContactPage.jsx`: 3 ofis kartı (`headOffice`/`rdOffice`/`factory`, ikonlar `BuildOutlined`/`ExperimentOutlined`/`ToolOutlined`) artık sadece adres gösteriyor, telefon/e-posta satırları kaldırıldı. Sol paneldeki "Bize Ulaşın" bloğuna Tel&Faks (2 numara) ve Mobil (2 numara) için ayrı satırlar eklendi — her numara kendi `tel:` linkine sahip ayrı bir `<a>` (satırın tamamı artık tek link değil, çünkü birden fazla hedefi var). E-posta `isKzDomain()` ile `.kz`'de `bilgi@aquatic.com.kz`, diğer her yerde `bilgi@aquatic.com.tr` gösteriyor.
- `AppFooter.jsx`: telefon satırı iki Tel&Faks numarasını " / " ile gösteriyor (mobil numaralar footer'da yok, kompakt tutmak için — tam liste İletişim sayfasında); e-posta aynı `isKzDomain()` mantığıyla domain'e göre değişiyor.
- `PageSEO.jsx`: JSON-LD `Organization.address.streetAddress` yeni Merkez Ofis adresine güncellendi (telefon/e-posta değişmedi, tek-değerli SEO alanları için zaten var olan kanonik TR iletişim bilgisi kullanılmaya devam ediyor).

**🐞 Aynı gün düzeltme — Almatı adresi geri eklendi:** Kullanıcı "Kazakistan adresini niye sildin, her iki sitede olsun" dedi — haklıydı, kaldırılması istenmemişti. `contact.almaty` (5 dilde) yeniden eklendi, bu sefer kullanıcının verdiği **tam adresle** (bina/daire/posta kodu dahil: "Медеуский район, Микрорайон Самал-2, дом 58, кв. 96, почтовый индекс 050000"). `ContactPage.jsx`'teki `locations` dizisine `almaty` (ikon `GlobalOutlined`) 4. kart olarak eklendi — `isKzDomain()` gibi bir domain kısıtı **yok**, her iki sitede de (`.tr` ve `.kz`) aynı 4 kart gösteriliyor (kullanıcının "her iki sitede olsun" isteğiyle tutarlı). Kart ızgarası 3'lü (`md={8}`) yerine 4'lü (`md={6}`, tablette 2'li `sm={12}`) düzene geçirildi.

**🗺️ Harita güncellendi — Fabrika adresini gösteriyor:** Kullanıcı sayfadaki gömülü Google Haritası'nın "Karadenizliler Mah. İlim Sok. No:15/1 Başiskele/Kocaeli" (Fabrika) konumunu göstermesini istedi. Eski `<iframe>` src'i belirli bir Google Maps Place ID'sine sabitlenmişti (muhtemelen eski/farklı bir adrese ait); yerine API key gerektirmeyen adres-bazlı embed deseni (`google.com/maps?q=<adres>&output=embed`) kullanıldı — Google adresi kendi çözümleyip en yakın eşleşen konumu gösteriyor, elle koordinat/place-ID aramaya gerek kalmadı. URL `curl -sL` ile 200 döndüğü doğrulandı.

### 🖼️ "Bobin Sarım Manderelleri" gerçek fotoğrafla değiştirildi (1 Eylül 2026)

Kullanıcı `~/Downloads/mandralAquatic.jpeg` sağladı — Aquatic'in kendi atölyesinde büyük mandrel/bobin sarım yapılarının montajını gösteren gerçek bir fabrika fotoğrafı (AI-üretimi değil). `cwebp -q 82 -resize 960 0` ile aynı klasördeki diğer `makina-*.webp` dosyalarıyla birebir aynı kurala göre optimize edilip, **aynı dosya adıyla** `public/images/services/detail/makina-bobinSarimManderelleri.webp` üzerine yazıldı — kod tarafında hiçbir değişiklik gerekmedi (kart görseli + detay sayfası hero görseli + .kz'nin Endüstri kategorisindeki aynı madde, hepsi tek `DETAIL_DATA` kaydından besleniyor). Dosya adı aynı kaldığı için (`hero.webp` önbellek sorunuyla aynı risk, bkz. ilgili not) `heroImage` alanına `?v=2` cache-bust eklendi.

### 🎬 aquatic.kz'ye tanıtım videosu eklendi (1 Eylül 2026)

Müşterinin Kazakistan hakkında bir tanıtım videosu ekletmek istemesi üzerine, kullanıcının masaüstünden `AQUATIC_KazDrill_3min_Kazakh_Female_Text_Between_Title_Web.mp4` sağlandı — 3 dakika, 1920×1080, H.264/AAC, Kazakça kadın seslendirmeli, 36 slaytlık anlatı temelli bir kurumsal video (kamera çekimi değil, altyazı/başlık geçişleri olan bir sunum videosu — "Ortak Tamır. Ortak Bolashaq." başlığıyla açılıyor, Türkiye-Kazakistan ortaklığını anlatıyor).

**Yerleşim:** Ana sayfanın hero bölümünün hemen altına, istatistikler bölümünden önce yeni bir video bölümü eklendi — `isKzDomain()` ile sadece `.kz`'de gösteriliyor, `aquatic.com.tr`'de bu bölüm hiç render edilmiyor.

**Uygulama:** Video 3 dakika ve sesli anlatım içerdiği için (arka plan/otomatik oynatan sessiz döngü değil) tıkla-oynat deseni kullanıldı — kapalıyken video'nun açılış karesinden alınmış bir poster + ortada büyük oynat butonu gösteriliyor, tıklanınca `<video controls autoPlay>` ile değiştiriliyor. Video dosyaları `ffmpeg -movflags +faststart` ile web için yeniden mux'landı (tarayıcı tam dosyayı indirmeden oynatmaya başlayabilsin diye, moov atomu dosya başına taşındı — kalite/boyut değişmedi).

**Türkçe versiyon eklendi (aynı gün):** Kullanıcı ardından aynı videonun Türkçe seslendirmeli halini de sağladı (`AQUATIC_KazDrill_3min_Turkish_Female_Text_Between_Title_Web.mp4` — aynı 36 slayt, aynı süre/çözünürlük, sadece seslendirme dili farklı). Sadece 2 dilde seslendirme olduğu için (Kazakça + Türkçe, EN/RU/ZH için ayrı dublaj yok), `HomePage.jsx`'te `i18n.language === 'tr'` kontrolüyle iki dosya arasında seçim yapılıyor: `tr` ise Türkçe video (`aquatic-kazakhstan-tr.mp4`/`-tr-poster.webp`), diğer tüm diller (kk, en, ru, zh) için Kazakça video (`aquatic-kazakhstan-kk.mp4`/`-kk-poster.webp`) gösteriliyor — `.kz`'nin varsayılan dili zaten kk olduğu için bu, "eşleşen dublaj varsa onu, yoksa domain'in ana dilini" mantığına denk geliyor. `<video>` elementine `key={kzVideoSrc}` eklendi — kullanıcı video oynarken dil değiştirirse (örn. TR→EN) React'in elementi yeniden mount edip yeni `src`'i düzgün yüklemesi için (aksi halde tarayıcı `src` değişse bile eski videoyu göstermeye devam edebilir).

> ⚠️ **Bilinçli sınır:** EN/RU/ZH dillerinde gezinen bir `.kz` ziyaretçisi Kazakça seslendirmeli videoyu görür (kendi dilinde dublaj yok). Bölüm başlığı/açıklaması yine de 5 dilde çevrildi (`kzVideo.*`).

### 🚫 aquatic.kz'de "Savunma Sanayi" kelimesi kaldırıldı (1 Eylül 2026)

Kullanıcı: "kz kısmında savunma sanayı kısmı yani bu kelime geçmesin olmasın!" Kapsam netleştirildi (AskUserQuestion): sadece kategori/başlık seviyesi — özel-konnektörler/sonar-kabloları/torpido-kabloları gibi maddelerin TR ile ortak olan kendi detay sayfası metinlerine dokunulmadı.

**İki yerde düzeltme gerekti:**
1. **Birleşik kategori başlığı/açıklaması** (`services.kzOverrides.savunmaSanayiSualti.*`, 5 dilde) ve **header "Hizmetler" dropdown etiketi** (`dropdown.services.savunmaSanayiSualti`, 5 dilde) — "Savunma Sanayi & Sualtı Teknolojileri" → sade "Sualtı Teknolojileri" oldu (açıklamadaki "savunma sanayii ve" ifadesi de çıkarıldı). İçerdiği maddeler (özel konnektörler, sonar/torpido kabloları) aynı kaldı, sadece kategori adı değişti.
2. **Ana sayfa hero rotasyonu — asıl fark edilmeyen ama en görünür kaynak:** `HERO_SLIDES`'daki 3 slayt (denizcilik/savunma/makina) **domain'den bağımsız**, tüm siteler dahil `.kz`'de de dönüyor — "savunma" slaytının sloganı tam olarak "Savunma Sanayiinde Hassasiyet" idi, ana sayfanın en büyük/en görünür metniydi. `HomePage.jsx`'e `isKzDomain()` kontrolü eklendi: `.kz`'de bu slayt artık `hero.slides.savunmaKz.slogan` ("Sualtı Teknolojilerinde Hassasiyet", 5 dilde) kullanıyor — aynı arka plan fotoğrafı (denizaltı/ROV görseli) korunuyor, sadece metin değişiyor. Alt yazı zaten "savunma sanayi" ifadesini içermiyordu (sadece "denizaltı" geçiyordu), değiştirilmedi.

> Not: `savunmaSanayiSualti` iç anahtar/değişken adı (`serviceGroups.jsx`, i18n key adı) kod içinde "savunmaSanayi" geçirmeye devam ediyor — bu kullanıcıya görünen bir metin değil, sadece kod tarafı bir tanımlayıcı, bilinçli olarak değiştirilmedi (yeniden adlandırmak birçok dosyaya dokunmayı gerektirirdi, hiçbir görünür fayda sağlamaz).

### 🧭 "Diğer" dropdown'ı kaldırıldı — İletişim/Kara Kutu tekrar direkt görünüyor, Kariyer Hızlı Bağlantılar'a taşındı (1 Eylül 2026)

Kullanıcı 27 Ağustos'taki "Diğer" dropdown kararını geri aldı: "diğerdeki iletişim ve karakutuyu çıkar gözüksün" — İletişim ve Kara Kutu tekrar üst menüde direkt görünsün istedi. Kariyer için önce "sadece ana sayfanın en altındaki butondan gider" dedi (bu yönde bir CTA bölümü eklendi), sonra fikrini değiştirip "anasayfadaki kariyer bölümü sil ve hızlı bağlantılara koy" dedi — CTA bölümü kaldırıldı, Kariyer bunun yerine footer'ın "Hızlı Bağlantılar" listesine eklendi (eskiden zaten oradaydı, 27 Ağustos'ta "Diğer" dropdown'ı eklenirken oradan da çıkarılmıştı).

**`AppHeader.jsx`:** `moreDropdownItems`/`dropdownOnly`/"Diğer" nav öğesi tamamen kaldırıldı. `navItems` artık 6 direkt öğe: Ana Sayfa, Kurumsal, Hizmetler, Ürünler, İletişim, Kara Kutu (Kariyer üst menüde hiç yok, sadece footer'da). Masaüstü `Menu` ve mobil `Drawer` ikisi de aynı `navItems`'tan beslendiği için tek bir değişiklik her ikisini de kapsadı.

**`AppFooter.jsx`:** `quickLinks`'e Kariyer satırı geri eklendi.

**🐞 Aynı gün fark edilen hata: İletişim/Kara Kutu masaüstünde görünmüyordu.** Kullanıcı "ana menülerde niye gözükmüyor" diye bildirdi. Kök sebep: antd'nin `<Menu mode="horizontal">` bileşeni, öğeler mevcut genişliğe sığmadığında fazlalık öğeleri **sessizce kendi gizli "..." taşma alt menüsüne** topluyor — öğeler kod tarafında doğru render ediliyordu ama ~1300px altındaki masaüstü genişliklerinde (yaygın 1280/1366px dizüstü çözünürlükleri dahil) 6 öğe + dil değiştirici + logo header'a sığmıyor, en sondaki öğeler (İletişim, Kara Kutu — dizinin sonunda oldukları için ilk taşanlar onlar oluyor) bu görünmez "..." içine düşüyordu. Önceki eşik (`.desktop-nav`'ın mobil hamburger'e döndüğü nokta) `768px` idi — 5 öğeli "Diğer" dönemi için yeterliydi ama 6 direkt öğe için yetersiz kaldı. Çözüm: eşik `1300px`'e yükseltildi (bu genişliğin altında artık mobil Drawer açılıyor, antd'nin taşma davranışı hiç tetiklenmiyor) + ekstra güvenlik payı için masaüstü menü öğelerinin yatay padding'i sıkılaştırıldı (`.ant-menu-item` `padding: 0 14px !important`) — RU/KK gibi Türkçe'den daha uzun menü etiketleri olan diller için de pay bırakıldı.

> ⚠️ **Açık soru:** Kullanıcı hemen ardından "navbar'daki üç nokta ('...') ikonuna ait dropdown'ın görünümü/hizalaması kötü, düzelt" dedi — ama bu session'daki hiçbir değişiklik henüz deploy edilmedi, dolayısıyla canlı sitede (`aquatic.com.tr`) hâlâ 27 Ağustos'taki eski "Diğer" (⋯) dropdown'ı duruyor olmalı. Kullanıcının bahsettiği "..." canlıdaki o eski dropdown mu, yoksa yukarıdaki antd otomatik-taşma "..." menüsü mü (ki 1300px eşiğinin üstünde artık hiç tetiklenmemesi gerekiyor) belirsiz — netleştirilmedi, henüz dokunulmadı.

> Not: `nav.more` i18n anahtarı artık kodda kullanılmıyor (projedeki diğer "ölü içerik" örnekleriyle — bkz. madde 39 — aynı gerekçeyle 5 dil dosyasında bilinçli olarak bırakıldı). `HomePage.css`'teki `.cta-section`/`.cta-title`/`.cta-subtitle` de yine kullanılmıyor (bu turda kısa süreliğine kariyer CTA'sı için görevlendirilmişti, CTA fikri geri alınınca tekrar dead code'a döndü).

### 🐞 `hero.webp` güncellemesi tarayıcıda görünmüyordu (önbellek) + efekt geri alındı (27 Ağustos 2026)

**Önbellek sorunu:** Kullanıcı `public/hero.webp`'i eski fotoğrafa geri döndürdükten sonra local'de hâlâ yeni (liman/ROV) fotoğrafı gördüğünü bildirdi. Sebep: `/hero.webp` Vite tarafından hash'lenmeyen sabit bir URL (`public/`'tan servis ediliyor) — dosya içeriği değişse bile tarayıcı aynı URL altında eski baytları önbellekten sunmaya devam edebiliyor. Düzeltme: URL'e elle bir sürüm parametresi eklendi (`/hero.webp?v=2`, hem `index.html`'deki `<link rel="preload">` hem `HomePage.jsx`'teki `imgHeroBg` sabitinde) — **bundan sonra bu dosyanın içeriği her değiştiğinde `?v=` numarası da elle artırılmalı**, aksi halde aynı önbellek sorunu tekrarlar.

**Efekt geri alındı:** Bir önceki notta eklenen "perde açılışı" (renkli panel kayarak metni açığa çıkarma) efekti kullanıcı tarafından beğenilmedi ("çok kötü"). Slogan/alt yazı sitenin geri kalanında zaten kullanılan standart `.animate-fadeInUp`'a geri döndürüldü — eyebrow rozeti (kategori etiketi + nokta) ve slogan'daki ince `text-shadow` (önceki turda eklenen, ayrıca eleştirilmemişti) korundu.

### 🖼️ Hero'ya kendine özgü 3 fotoğraf + eyebrow etiket efekti (27 Ağustos 2026)

Kullanıcı fark etti: rotasyondaki 3 slayt (denizcilik/savunma/makina) `/services` sayfasındaki görsellerle birebir aynıydı. Kullanıcıya bu 3 slayt için farklı, hero'ya özel kompozisyonlu prompt'lar verildi (geniş tersane manzarası, ROV kontrol istasyonu, geniş atölye planı — mevcut Services görsellerinin yakın-plan kadrajlarından bilinçli olarak farklı), kullanıcı bu prompt'larla üretilmiş 3 fotoğrafı `heroFotoAquatic` klasörüne koydu, dosya adları önerilen isimlendirmeyle birebir eşleşiyordu (`hero-denizcilik/savunma/makina.webp`) — içerik doğrulandı (her biri istenen kompozisyonla eşleşiyor). `src/assets/images/`'e ayrı dosyalar olarak eklendi (mevcut `denizcilik.webp`/`savunmasanayi.webp`/`makina.webp` — Services sayfasında hâlâ kullanılıyor — değiştirilmedi, sadece hero artık kendi ayrı importlarını kullanıyor: `imgHeroMaritime`/`imgHeroDefence`/`imgHeroMachinery`).

Aynı zamanda kullanıcı "yazılara profesyonel görünmesi/ilgi çekmesi için efekt" istedi. Eklenenler: her slaytın üstünde küçük, kategori rengiyle noktalı bir "eyebrow" etiket (`.hero-eyebrow` — `servicesPreview.<kategori>.title`'dan otomatik alınıyor, "default" slaytta "AQUATIC" yazıyor), slogan metnine ince çok katmanlı `text-shadow` (fotoğraf üzerinde okunabilirlik/derinlik için). Bilinçli olarak parlak glow/gradyan efekti kullanılmadı — marka yenilemesinin "AI-jenerik SaaS" görünümünden kaçınma hedefiyle tutarlı kalması için.

### ⚠️ "Teknolojik Gözünüz" hero fotoğrafı bilinçli olarak eski (sahte etiketli) görsele geri döndürüldü (27 Ağustos 2026)

Kullanıcı `public/hero.webp`'i (rotasyondaki "Teknolojik Gözünüz" slaytının fotoğrafı) 21 Ağustos'taki marka yenilemesinde kullanılmaya başlanan yeni liman/ROV fotoğrafından, ondan önceki (git geçmişinde `886b90f`) eski fotoğrafa döndürmemi istedi. **Bu eski fotoğrafın üzerinde gerçek olmayan/uydurma ürün etiketleri var** ("DEEPSEAL™ E-SERIES 2.4kV", "AURA FIBER | D-COM/SUBSEA" — Aquatic'in gerçek bir ürünü değil, muhtemelen eski bir AI-stok görsel) — bu tam da 21 Ağustos'taki marka yenilemesinin kurtulmaya çalıştığı türden bir görsel. Kullanıcıya bu net biçimde iki kez soruldu, ikisinde de aynı fotoğrafı istediğini teyit etti — **bilinçli kullanıcı kararı olarak uygulandı**, hata değil.

Yeni (liman/ROV) fotoğraf koddan silinmedi, sadece `public/hero.webp` içeriği eskisiyle değiştirildi — yeni görsel hâlâ git geçmişinde (`f85f2b6` commit'i) duruyor, istenirse geri getirilebilir. Bu değişiklik henüz commit edilmedi.

> 💡 Gelecekte bu görseli "düzeltmeye" kalkışmadan önce bu notu oku — bilinçli bir geri alma, unutulmuş bir hata değil.

**Karar tersine döndü (aynı gün, canlıya alındıktan sonra):** Bu commit edilip deploy edildikten sonra kullanıcı "ben onu hiç beğenmiyorum" diyerek fikrini değiştirdi. `public/hero.webp` tekrar `f85f2b6` commit'indeki liman/ROV fotoğrafına döndürüldü (git geçmişinden `git show f85f2b6:public/hero.webp` ile çıkarılıp kopyalandı — sahte etiketli eski fotoğraf artık hiçbir yerde kullanılmıyor, sadece git geçmişinde duruyor). Önbellek sorunu tekrarlamasın diye `?v=2` → `?v=3`'e çıkarıldı (`index.html` preload + `HomePage.jsx`'teki `imgHeroBg`). Yukarıdaki not artık güncel değil — bu görsel konusu iki kez el değiştirdi, gelecekte tekrar sorulmadan hiçbir yöne "düzeltilmeye" çalışılmamalı.

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
| ~~37~~ | ~~`/products`'taki 48 yeni konnektör serisi görselsiz~~ | **Düzeltildi (2 Eylül 2026)** — bkz. aşağıdaki "Konnektör ürün görselleri tamamlandı" notu |
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

## Analitik Config (Google Analytics 4 + Microsoft Clarity)

`.env` dosyasında saklı, ikisi de opsiyonel (boşsa o araç hiç yüklenmez):

```
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_CLARITY_PROJECT_ID=xxxxxxxxxx
```

`src/utils/analytics.js`'teki `loadAnalytics()` fonksiyonu okuyor. **Sadece kullanıcı çerez bandında "Kabul Et"e bastığında çağrılıyor** — KVKK gereği hiçbir analitik script varsayılan olarak yüklenmiyor (bkz. aşağıdaki "Ziyaretçi Analitiği" bölümü). ID'leri almak için: GA4 → analytics.google.com'da yeni bir "Web" veri akışı oluştur, "Ölçüm Kimliği" (G- ile başlar) buraya kopyalanır. Clarity → clarity.microsoft.com'da yeni proje oluştur, Ayarlar → Kurulum'daki "Project ID" buraya kopyalanır.

> ⚠️ ID'ler girildikten sonra `public/.htaccess`'teki CSP zaten `googletagmanager.com`/`clarity.ms`'e izin veriyor — ek bir değişiklik gerekmiyor.

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
