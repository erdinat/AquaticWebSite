# CLAUDE.md — Aquatic Elektronik Web Sitesi

> React 19 + Vite 7 + Ant Design 6 + i18next (TR/EN/KK/RU) + EmailJS  
> Son güncelleme: 6 Nisan 2026

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
| `/services` | `ServicesPage.jsx` | Savunma, elektronik, makina, denizcilik hizmetleri |
| `/products` | `ProductsPage.jsx` | 6 ürün kartı, expand panel (tüm ürünler için) |
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
│   │   └── PageSEO.jsx         ← Tüm sayfalara dinamik SEO sağlar
│   ├── Layout/
│   │   ├── MainLayout.jsx
│   │   └── AppHeader.jsx
│   ├── BackgroundParticles.jsx
│   ├── ErrorBoundary.jsx       ← App-level hata yakalayıcı
│   └── ScrollToTop.jsx
├── hooks/
│   └── useRevealAnimation.js   ← IntersectionObserver custom hook
├── pages/                      ← Tüm sayfalar React.lazy() ile yükleniyor
├── locales/                    ← tr.json, en.json, ru.json, kk.json
├── assets/
├── App.jsx                     ← Route tanımları + lazy imports + Suspense
├── main.jsx                    ← ErrorBoundary > HelmetProvider > BrowserRouter > App
├── i18n.js
└── index.css                   ← Global design tokens + .reveal animasyonu
```

---

## Design Tokens (src/index.css)

```css
--color-primary: #0050b3
--color-primary-hover: #003d8f
--color-text-secondary: #4a5568   /* WCAG AA uyumlu */
--color-text-muted: #6b7280       /* WCAG AA uyumlu */

--font-size-display: 3.5rem
--font-size-h1: 2.5rem
--font-size-h2: 1.75rem
--font-size-h3: 1.25rem
--font-size-body: 1rem
--font-size-body-sm: 0.875rem
--font-size-caption: 0.75rem
```

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
| 6 | IntersectionObserver 7 sayfada kopyalanmıştı | `useRevealAnimation` custom hook oluşturuldu | 6 Nis 2026 |
| 7 | Page Hero JSX 6 sayfada tekrarlanıyordu | `PageHero` common component çıkarıldı | 6 Nis 2026 |
| 8 | `.reveal` CSS her sayfada tekrarlanıyordu | Tüm sayfa bazlı kopyalar silindi, sadece `index.css`'te kaldı | 6 Nis 2026 |
| 10 | React.lazy() yoktu, tüm sayfalar eager load | Route-level code splitting uygulandı (`App.jsx`) | 6 Nis 2026 |
| 14 | Dinamik `<title>` ve meta tag yoktu | `react-helmet-async` + `PageSEO` component — 8 sayfada aktif | 6 Nis 2026 |

---

## ⚠️ Hâlâ Eksik Olan Konular

### 🟡 MEDIUM — Yakın Vadede

| # | Sorun | Açıklama |
|---|-------|----------|
| 9 | `aquatic_deploy.zip` + `.DS_Store` git'te | `.gitignore`'a ekle |
| 11 | `vite` ve `@vitejs/plugin-react` `dependencies`'te | `devDependencies`'a taşı |
| 18 | Formlara spam koruması yok | reCAPTCHA veya honeypot field ekle (Contact + Careers) |
| 19 | EmailJS CV boyut limiti (40KB) | Backend API veya AWS S3 ile kalıcı çözüm gerekli |

### 🟢 LOW — İleride

| # | Sorun | Açıklama |
|---|-------|----------|
| 12 | ESLint + Prettier yok | Kod standardı ve otomatik formatlama |
| 13 | Test altyapısı yok | Vitest + React Testing Library (şu an 0 test) |
| 15 | `will-change: transform` eksik | Marquee animasyonuna performans ipucu (`HomePage.css`) |
| 16 | `<img>` elemanlarında `width`/`height` yok | CLS (Cumulative Layout Shift) sorunu |
| 17 | Hero görseli için `<link rel="preload">` yok | LCP (Largest Contentful Paint) iyileştirmesi |
| 20 | `BackgroundParticles.jsx`'te `useMemo` eksik | Her render'da gereksiz yeniden hesaplama |

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

`PageSEO.jsx` içindeki `BASE_URL` değişkeni gerçek domain ile güncellenmelidir:

```js
const BASE_URL = 'https://aquaticdefense.com'; // ← gerçek domain ile değiştir
```

Her sayfa otomatik olarak şunları set eder:
- `<title>` — sayfa adı + site adı
- `<meta description>` — sayfa açıklaması (i18n'den)
- `<link canonical>` — tekil URL
- Open Graph + Twitter Card meta tag'leri
- `hreflang` — tr, en, ru, kk, x-default

---

## Kritik Dosya Referansları

| Dosya | Önemli Kısım |
|-------|-------------|
| `src/index.css` | Tüm design tokens + global `.reveal` animasyonu |
| `src/App.jsx` | Route tanımları + React.lazy() + Suspense |
| `src/main.jsx` | ErrorBoundary > HelmetProvider > BrowserRouter > App |
| `src/hooks/useRevealAnimation.js` | IntersectionObserver custom hook |
| `src/components/common/PageHero.jsx` | Ortak sayfa hero component'i |
| `src/components/common/PageSEO.jsx` | Dinamik SEO yönetimi |
| `src/components/ErrorBoundary.jsx` | App-level hata yakalayıcı |
| `src/i18n.js` | i18next config |
| `src/components/Layout/AppHeader.jsx` | Navigasyon, dil seçici, mobil menü |
| `public/.htaccess` | SPA routing için rewrite kuralları |

---

## Teknik Değerlendirme (12 Nisan 2026)

| Kriter | 6 Nis | 12 Nis | Not |
|--------|:-----:|:------:|-----|
| Proje Yapısı | 7/10 | **7/10** | İyi organize, .gitignore eksikleri düzeltildi |
| Kod Kalitesi (DRY/SOLID) | 8/10 | **6/10** | DRY ihlalleri, dead code, hardcoded string'ler tespit edildi |
| Teknik Eksiksizlik | 7/10 | **5/10** | Validation zayıf, error handling yetersiz |
| Performans | 8/10 | **6/10** | 7.8MB PNG, memoization eksikleri, God Component |
| Güvenlik | 7/10 | **5/10** | Spam koruması yok, API key client-side'da |
| Test Coverage | 0/10 | **0/10** | Hâlâ test yok |
| SEO | 8/10 | **8/10** | Dinamik title, meta, OG, hreflang |
| Dependency | — | **7/10** | Güncel ama devDep karışık |
| **Ortalama** | **6.4/10** | **5.5/10** | Daha detaylı analiz ile düşüş |

### Tamamlanan HIGH Aksiyonlar (12 Nisan 2026)

- [x] `.gitignore` — `.env`, `*.zip`, `.DS_Store` eklendi
- [x] `main.png` (7.8MB) silindi — webp zaten mevcut
- [x] `vite` + `@vitejs/plugin-react` → `devDependencies`'e taşındı
- [x] Honeypot spam koruması — Contact + Careers formlarına eklendi
- [x] GNews API key client-side'dan kaldırıldı — static haberlerle devam
- [x] `HomePage.jsx` dead code temizlendi (`brands` array, `statsRef`)
- [x] `CorporatePage.jsx` clipboard try/catch eklendi
- [x] GNews fetch'e HTTP status kontrolü eklendi

### Kalan MEDIUM/LOW Aksiyonlar

| # | Sorun | Öncelik |
|---|-------|---------|
| 1 | Hardcoded Türkçe string'leri i18n'e taşı | MEDIUM |
| 2 | `BackgroundParticles`'a `useMemo` ekle | MEDIUM |
| 3 | Form validation mesajlarını düzelt | MEDIUM |
| 4 | Product image dosya isimlerini normalize et | MEDIUM |
| 5 | `.htaccess` duplikat satır sil | MEDIUM |
| 6 | `useRevealAnimation` dependency array fix | MEDIUM |
| 7 | `HomePage.jsx`'i alt component'lere böl | MEDIUM |
| 8 | ESLint + Prettier kur | MEDIUM |
| 9 | Marquee `will-change: transform` | LOW |
| 10 | Image `width`/`height` attribute'ları | LOW |
| 11 | Hero görseli `<link rel="preload">` | LOW |
| 12 | Font preload (Inter, Outfit) | LOW |
| 13 | Vitest + ilk test'ler | LOW |
