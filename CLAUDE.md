# CLAUDE.md — Aquatic Elektronik Web Sitesi

> React 19 + Vite 7 + Ant Design 6 + i18next (TR/EN/KK/RU) + EmailJS  
> Son analiz: 6 Nisan 2026

---

## Proje Özeti

Kurumsal web sitesi. 7 sayfa, tek repo, FTP ile cPanel'e deploy.

| Alan | Detay |
|------|-------|
| Framework | React 19, Vite 7, React Router 7 |
| UI | Ant Design 6, CSS Custom Properties (design tokens) |
| i18n | i18next — TR, EN, KK, RU (`src/locales/*.json`) |
| Form | EmailJS (`@emailjs/browser`) — Contact + Careers |
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

## Bilinen Sorunlar & Öncelikler

### 🔴 HIGH — Hemen Yapılmalı

1. **`index.html`'de `<title>` yok** — SEO için kritik
2. **EmailJS key'leri hardcode** — `ContactPage.jsx:24-26`, `CareersPage.jsx:54-55` → `.env` dosyasına taşı
3. **CV upload — dosya tipi kontrolü yok** — `.exe` bile yüklenebilir (`CareersPage.jsx:229`)
4. **404 sayfası yok** — Tanımsız route'lar boş sayfa gösteriyor
5. **Error Boundary yok** — Herhangi render hatası beyaz ekran yapar

### 🟡 MEDIUM — Yakın Vadede

6. **DRY ihlali: IntersectionObserver** — 7 sayfada birebir aynı kod (`useRevealAnimation` hook çıkarılmalı)
7. **DRY ihlali: Page hero** — 6 sayfada birebir aynı JSX (`<PageHero>` bileşeni çıkarılmalı)
8. **DRY ihlali: `.reveal` CSS** — Her page CSS'inde tekrar var, sadece `index.css`'te yeterliydi
9. **`aquatic_deploy.zip` + `.DS_Store` git'te** — `.gitignore`'a ekle
10. **React.lazy() eksik** — Tüm sayfalar eager load
11. **`vite` ve `@vitejs/plugin-react` `dependencies`'te** — `devDependencies`'a taşı

### 🟢 LOW — İleride

12. ESLint + Prettier kur
13. Vitest + React Testing Library (şu an 0 test)
14. `react-helmet-async` — dinamik `<title>` ve meta tag
15. `will-change: transform` ekle marquee animasyonuna (`HomePage.css`)
16. `<img>` elemanlarına `width`/`height` ekle (CLS)
17. Hero görseli için `<link rel="preload">` (`index.html`)

---

## Deploy Prosedürü

```bash
# 1. Değişiklikleri test et
npm run dev

# 2. Production build al
npm run build

# 3. Zip oluştur (dist/ DIŞINDAN değil, İÇİNDEN!)
rm aquatic_deploy.zip
cd dist && zip -r ../aquatic_deploy.zip . && cd ..

# 4. Commit & push
git add . && git commit -m "..." && git push origin main

# 5. aquatic_deploy.zip'i cPanel'e yükle, public_html altına çıkar
```

> **Uyarı:** `zip -r aquatic_deploy.zip dist/` YANLIŞ — `dist/index.html` prefix'i oluşturur.  
> Doğrusu: `cd dist && zip -r ../aquatic_deploy.zip .`

---

## Kritik Dosya Referansları

| Dosya | Önemli Kısım |
|-------|-------------|
| `src/index.css` | Tüm design tokens (renkler, font scale, spacing, shadows) |
| `src/App.jsx` | Route tanımları |
| `src/i18n.js` | i18next config |
| `src/pages/ProductsPage.jsx` | expandedProduct state, toggleExpand, productSpecValues |
| `src/components/Layout/AppHeader.jsx` | Navigasyon, dil seçici, mobil menü |
| `src/components/BackgroundParticles.jsx` | Particle animasyonu (useMemo eksik) |
| `public/.htaccess` | SPA routing için rewrite kuralları |

---

## EmailJS Config (Güvenlik Notu)

Şu an hardcode, `.env`'ye taşınmalı:

```
VITE_EMAILJS_SERVICE_ID=service_16f5qja
VITE_EMAILJS_TEMPLATE_ID=template_d4i0t08
VITE_EMAILJS_PUBLIC_KEY=KTWen6neGfldnhB2D
```

ContactPage.jsx ve CareersPage.jsx'te `import.meta.env.VITE_EMAILJS_*` ile okunmalı.

---

## Genel Kod Kalitesi (Nisan 2026)

| Kriter | Puan |
|--------|:----:|
| Proje Yapısı | 5/10 |
| Kod Kalitesi (DRY/SOLID) | 5/10 |
| Error Handling | 3/10 |
| Performans | 6/10 |
| Güvenlik | 5/10 |
| Test Coverage | 0/10 |
| SEO | 4/10 |
| **Ortalama** | **4.4/10** |

Çalışan MVP düzeyi. Production-ready olmak için HIGH öncelikli maddeler çözülmeli.
