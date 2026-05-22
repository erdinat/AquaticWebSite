# 17 Günlük Detaylı Staj Defteri - Aquatic Kurumsal Web Sitesi Modernizasyon Projesi

Bu rapor, Aquatic Teknolojik Çözümler şirketinde gerçekleştirilen 17 günlük yazılım stajı sürecini, teknik detayları ve uygulama aşamalarını kapsamaktadır.

---

## 1. HAFTA (04.03.2026 – 06.03.2026)

### **1. GÜN (04.03.2026 Çarşamba): Proje Analizi, İhtiyaç Belirleme ve Teknoloji Seçimi**
- **Yapılan Çalışma:** Mevcut `aquatic.com.tr` sitesinin içerik envanteri çıkarıldı. Sitenin performans, SEO ve kullanıcı deneyimi (UX) açısından eksikleri analiz edildi.
- **Teknik Detaylar:** Modern bir "Single Page Application" (SPA) yapısı için **React JS** kütüphanesi ve geliştirme hızı için **Vite** build aracı seçildi. Kurumsal kimliğe uygun, hızlı prototipleme sağlayan **Ant Design (v6)** UI kütüphanesi projenin temel taşlarından biri olarak belirlendi. Ayrıca projenin global hedefleri doğrultusunda **i18next** ile çoklu dil desteği altyapısının gerekliliği vurgulandı.
- **Kazanım:** Profesyonel bir yazılım projesinin başlangıcında doğru teknoloji yığını (Tech Stack) seçiminin, projenin ölçeklenebilirliği ve performansı üzerindeki kritik etkisi gözlemlendi.

### **2. GÜN (05.03.2026 Perşembe): Geliştirme Ortamının Kurulması ve Proje Mimarisinin Oluşturulması**
- **Yapılan Çalışma:** Terminal üzerinden `npm create vite@latest` komutuyla proje başlatıldı. Folder-by-feature (özelliğe göre klasörleme) mimarisi benimsendi.
- **Teknik Detaylar:** Projeye `react-router-dom`, `antd`, `i18next`, `react-i18next` ve `@emailjs/browser` bağımlılıkları eklendi. `src` altında `components`, `pages`, `locales`, `assets`, `hooks` ve `styles` klasörleri oluşturularak temiz kod (clean code) prensiplerine uygun bir yapı kuruldu.
- **Kazanım:** Bir React projesinin ilk kurulum aşamasında `package.json` yönetimi ve dosya hiyerarşisinin projeyi nasıl daha yönetilebilir kıldığı öğrenildi.

### **3. GÜN (06.03.2026 Cuma): Çoklu Dil (i18n) Altyapısının Geliştirilmesi ve Lokalizasyon**
- **Yapılan Çalışma:** 4 farklı dil (Türkçe, İngilizce, Kazakça, Rusça) desteği için i18n entegrasyonu yapıldı.
- **Teknik Detaylar:** `src/i18n.js` yapılandırma dosyası oluşturuldu. `locales/` klasörü altına her dil için `tr.json`, `en.json`, `kk.json` ve `ru.json` dosyaları eklendi. `useTranslation` hook'u kullanılarak statik metinlerin JSON dosyalarından dinamik olarak çekilmesi sağlandı.
- **Kazanım:** Küresel bir platformda içerik yönetimini merkezi bir noktadan (Externalized Strings) yapmanın, bakım ve güncelleme süreçlerini ne kadar kolaylaştırdığı tecrübe edildi.

---

### HAFTALIK ÖZET — 1. Hafta (04.03.2026 – 06.03.2026)

**Kısım:** Yapılan İş Özeti

**Yapılan İş:** Mevcut sitenin UX ve performans analizi yapıldı. React + Vite + Ant Design teknoloji yığını seçildi, proje iskelet mimarisi kuruldu ve 4 dilli (TR/EN/KK/RU) i18n lokalizasyon altyapısı geliştirildi.

Bu hafta projenin tüm teknik temeli atıldı. 3 günde sıfırdan kurulumdan canlı çalışan bir lokalizasyon altyapısına ulaşıldı.

**Tamamlanan Başlıklar:**
- Mevcut sitenin UX, SEO ve performans açısından kapsamlı analizi
- React 19 + Vite + Ant Design (v6) teknoloji yığınının seçimi ve gerekçelendirilmesi
- Folder-by-feature proje mimarisi kurulumu
- 4 dilli (TR, EN, KK, RU) i18n altyapısının geliştirilmesi

**Öne Çıkan Teknik Çalışma — i18n Yapılandırması (`src/i18n.js`):**

Haftanın en kritik teknik çıktısı, projenin dil yönetim sistemidir. Domain adresine göre otomatik dil tespiti yapan akıllı bir yapı kuruldu:

```javascript
// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tr from './locales/tr.json';
import en from './locales/en.json';
import kk from './locales/kk.json';
import ru from './locales/ru.json';

// Domain'e göre otomatik dil tespiti
const detectLanguage = () => {
  const saved = localStorage.getItem('aquatic-lang');
  if (saved) return saved;
  const hostname = window.location.hostname;
  if (hostname.endsWith('.tr')) return 'tr';
  if (hostname.endsWith('.kz')) return 'kk';
  return 'kk';
};

i18n.use(initReactI18next).init({
  resources: { tr: { translation: tr }, en: { translation: en },
                kk: { translation: kk }, ru: { translation: ru } },
  lng: detectLanguage(),
  fallbackLng: 'tr',
  interpolation: { escapeValue: false },
});

export default i18n;
```

Bu yapı sayesinde `aquatic.com.tr`'ye giren kullanıcı otomatik Türkçe, `aquatic.com.kz`'ye giren kullanıcı ise otomatik Kazakça içerik görür. Dil seçimi `localStorage`'a kaydedilerek kalıcı hale getirildi.

**Proje Klasör Yapısı (Bu hafta oluşturulan):**
```
src/
├── components/
├── pages/
├── locales/
│   ├── tr.json   (~337 çeviri anahtarı)
│   ├── en.json
│   ├── kk.json
│   └── ru.json
├── assets/
├── i18n.js
├── App.jsx
└── main.jsx
```

**Hafta Değerlendirmesi:** Projenin en zor ama en kritik haftasıydı. i18n altyapısı baştan doğru kurulmadığı takdirde ilerleyen günlerde tüm sayfa içeriklerinin yeniden yazılması gerekecekti. Bu haftaki kararlar projenin global ölçeklenebilirliğini doğrudan şekillendirdi.

---

## 2. HAFTA (09.03.2026 – 13.03.2026)

### **4. GÜN (09.03.2026 Pazartesi): Global Layout (Header, Footer) ve Responsive Navigasyon Geliştirme**
- **Yapılan Çalışma:** Tüm sayfaların paylaştığı Header ve Footer bileşenleri Ant Design Grid sistemiyle tasarlandı.
- **Teknik Detaylar:** `AppHeader.jsx` içinde mobil cihazlar için bir `Drawer` (yan menü) bileşeni kullanıldı. Navbar'da `scrolled` state'i takip edilerek sayfa aşağı kaydırıldığında arka planın değişmesi (glassmorphism etkisi) sağlandı. Footer bölümüne ise `AppFooter.jsx` ile hızlı bağlantılar, iletişim bilgileri ve kurumsal logolar yerleştirildi.
- **Kazanım:** Responsive tasarımın (responsive design) modern CSS teknikleri ve UI kütüphaneleriyle nasıl hızlıca hayata geçirileceği öğrenildi.

### **5. GÜN (10.03.2026 Salı): Ana Sayfa (HomePage) ve Dinamik Hero Bölümü Tasarımı**
- **Yapılan Çalışma:** "Teknolojik Gözünüz" sloganlı ana sayfa büyük bir görsel ve premium bir animasyonla tasarlandı.
- **Teknik Detaylar:** `BackgroundParticles.jsx` bileşeni geliştirilerek arka planda yüzen dinamik parçacıklar eklendi. CSS `keyframes` animasyonları ile slogan ve butonların sayfa açıldığında yumuşak bir giriş (fadeInUp) yapması sağlandı. Hero alanında `linear-gradient` overlays kullanılarak okunabilirlik artırıldı.
- **Kazanım:** Kullanıcıyı karşılayan ilk ekranın (above-the-fold) estetik ve performans dengesinin nasıl ayarlanacağı tecrübe edildi.

### **6. GÜN (11.03.2026 Çarşamba): Kurumsal (Corporate) ve Hizmet Grupları Sayfalarının Tasarımı**
- **Yapılan Çalışma:** Vizyon, Misyon, Kalite Politikası ve Hizmet Gruplarını içeren sayfalar kodlandı.
- **Teknik Detaylar:** Hizmet bölümleri (Savunma, Elektronik, Makine, Denizcilik) için modüler bir kart yapısı kuruldu. Sayfalar arası geçişlerde `ScrollToTop.jsx` bileşeni ile sayfanın en tepeye odaklanması sağlandı.
- **Kazanım:** React'ta "Reusability" (yeniden kullanılabilirlik) ilkesiyle bir kez tasarlanan bileşenin (Card, Section Title) farklı sayfalarda nasıl kullanıldığı pekiştirildi.

### **7. GÜN (12.03.2026 Perşembe): "Milli Kara Kutu" Sayfası ve Teknik Veri Tabloları Entegrasyonu**
- **Yapılan Çalışma:** Şirketin amiral gemisi ürünü olan "Milli Kara Kutu" için özel bir showcase sayfası geliştirildi.
- **Teknik Detaylar:** Ant Design `Table` bileşeni kullanılarak ürünün teknik spesifikasyonları tablolandı. Ürün görselinin sayfada 3D etkisi yaratması için CSS `transform` ve `box-shadow` özellikleri kullanıldı. Sayfa içi navigasyon için "Reveal on scroll" (scroll ile ortaya çıkma) animasyonları eklendi.
- **Kazanım:** Teknik verilerin (tabular data) kullanıcıya en şık ve okunabilir şekilde nasıl sunulacağı öğrenildi.

### **8. GÜN (13.03.2026 Cuma): Görsel Optimizasyon ve WebP Formatına Geçiş (Performans Odaklı)**
- **Yapılan Çalışma:** Sitedeki 38 adet yüksek çözünürlüklü PNG görselin performans analizi yapıldı.
- **Teknik Detaylar:** `sharp-cli` aracı kullanılarak tüm PNG dosyaları **WebP** formatına dönüştürüldü. Ortalama dosya boyutları %80 oranında düşürüldü. Görsellerin `Lazy Loading` (tembel yükleme) özelliği ile sayfa hızı optimize edildi. Lighthouse skorlarında performansın 95+ seviyesine çıktığı gözlemlendi.
- **Kazanım:** Web performansının sadece kodla değil, varlıkların (assets) doğru format ve boyutta sunulmasıyla doğrudan ilintili olduğu kavrandı.

---

### HAFTALIK ÖZET — 2. Hafta (09.03.2026 – 13.03.2026)

**Kısım:** Yapılan İş Özeti

**Yapılan İş:** Global Header/Footer bileşenleri ve responsive navigasyon geliştirildi. Parçacık animasyonlu ana sayfa, kurumsal ve hizmet sayfaları tasarlandı. Milli Kara Kutu showcase sayfası oluşturuldu. 38 PNG görsel WebP formatına dönüştürülerek %80 boyut azaltımı sağlandı.

Bu hafta projenin görsel iskeletinin tamamı inşa edildi. Haftanın sonunda site, tüm ana sayfalarıyla tarayıcıda tam işlevsel biçimde çalışır hale geldi.

**Tamamlanan Başlıklar:**
- Tüm projeye hizmet eden `AppHeader`, `AppFooter`, `MainLayout` bileşenlerinin tamamlanması
- Ana sayfa (HomePage) ve dinamik parçacık animasyonu
- Kurumsal (CorporatePage) ve Hizmetler (ServicesPage) sayfaları
- Milli Kara Kutu (BlackBoxPage) showcase sayfası
- 38 görselin WebP formatına dönüştürülmesiyle %80 boyut azaltımı

**Öne Çıkan Teknik Çalışma 1 — Scroll ile Değişen Header:**

Header bileşenine kullanıcı deneyimini artıran akıllı bir scroll tespiti eklendi. Sayfa en üstteyken header şeffaf kalır, aşağı kaydırılınca arka plan belirginleşir:

```javascript
// AppHeader.jsx içinden
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 50);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// JSX'te koşullu stil:
<Header style={{
  background: scrolled
    ? 'rgba(255,255,255,0.95)'
    : 'transparent',
  backdropFilter: scrolled ? 'blur(10px)' : 'none',
  transition: 'all 0.3s ease',
}}>
```

**Öne Çıkan Teknik Çalışma 2 — Scroll Animasyonu (IntersectionObserver):**

Her sayfada içerik kartlarının ekrana girince canlanması için `IntersectionObserver` API kullanıldı. Bu sayede kullanıcı sayfayı kaydırdıkça bölümler yumuşakça ortaya çıkar:

```javascript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.animate-on-scroll')
    .forEach(el => observer.observe(el));

  return () => observer.disconnect();
}, []);
```

```css
/* index.css */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Öne Çıkan Teknik Çalışma 3 — BackgroundParticles Bileşeni:**

Ana sayfanın hero alanına özgün bir derinlik hissi katmak için saf CSS ve rastgele değerler kullanan bir parçacık sistemi geliştirildi:

```jsx
// BackgroundParticles.jsx
const BackgroundParticles = ({ count = 20 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 6}s`,
    animationDuration: `${4 + Math.random() * 4}s`,
    size: `${4 + Math.random() * 8}px`,
  }));

  return (
    <div className="particles-container">
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: p.left,
          width: p.size, height: p.size,
          animationDelay: p.animationDelay,
          animationDuration: p.animationDuration,
        }} />
      ))}
    </div>
  );
};
```

**Hafta Değerlendirmesi:** En yoğun ve verimli haftaydı. 5 günde 4 farklı sayfa, global layout ve performans optimizasyonu tamamlandı. Haftanın sonunda projenin %60'ı işlevsel hale gelmiş oldu.

---

## 3. HAFTA (16.03.2026 – 18.03.2026)

### **9. GÜN (16.03.2026 Pazartesi): İletişim Formu Geliştirme ve EmailJS API Entegrasyonu**
- **Yapılan Çalışma:** İletişim sayfası tasarlanarak kullanıcı mesajlarının doğrudan e-postaya düşmesi sağlandı.
- **Teknik Detaylar:** `antd` Form bileşeni ile validasyonlar (zorunlu alan, e-posta formatı) yapıldı. `EmailJS` kütüphanesi projeye dahil edilerek bir `service_id` ve `template_id` üzerinden form verilerinin asenkron gönderilmesi sağlandı. Lokasyon kartları ve Google Maps iFrame entegrasyonu tamamlandı.
- **Kazanım:** Bir frontend uygulamasının bir backend servisiyle (API) e-posta gönderimi üzerinden nasıl haberleştiği tecrübe edildi.

### **10. GÜN (17.03.2026 Salı): Gelişmiş CSS Efektleri ve Mikro Etkileşimlerin Uygulanması**
- **Yapılan Çalışma:** Site genelinde kullanıcı deneyimini artıracak mikro etkileşimler eklendi.
- **Teknik Detaylar:** `glass-card` ve `glow-effect` gibi özel CSS sınıfları tanımlandı. Butonlara `hover` animasyonları, kartlara yavaş geçişli `box-shadow` derinlikleri kazandırıldı. Sayfa yüklenirken görünen loading (yükleniyor) spinner'ları özelleştirildi.
- **Kazanım:** Görsel cilalama (Visual Polish) aşamasının kurumsal kimlik üzerindeki profesyonel etkisi gözlemlendi.

### **11. GÜN (18.03.2026 Çarşamba): Kazakistan Ofis Entegrasyonu ve Akıllı Dil Algılama Mekanizması**
- **Yapılan Çalışma:** Kazakistan (Almatı) ofis bilgileri eklendi ve domain bazlı dil tespiti yapıldı.
- **Teknik Detaylar:** `i18n.js` dosyasında `window.location.hostname` verisi kontrol edilerek `.tr` ile biten domainlerde Türkçe, `.kz` ile bitenlerde Kazakça dilinin otomatik varsayılan olması sağlandı. 3. lokasyon kartı Almatı için kodlandı.
- **Kazanım:** Çoklu domain (multi-domain) yönetimi ve dinamik ayar dosyası yönetimi konularında deneyim kazanıldı.

> **NOT:** 19-20 Mart 2026 tarihleri Ramazan Bayramı (Arife + 1. Gün) resmi tatili nedeniyle çalışma yapılmamıştır.

---

### HAFTALIK ÖZET — 3. Hafta (16.03.2026 – 18.03.2026)

**Kısım:** Yapılan İş Özeti

**Yapılan İş:** EmailJS entegrasyonuyla çalışan iletişim formu geliştirildi. Glassmorphism, glow efekti ve mikro animasyonlardan oluşan CSS design token sistemi kuruldu. Kazakistan (Almatı) ofisi siteye eklendi ve domain bazlı otomatik dil algılama mekanizması tamamlandı.

Bu hafta projeye dış dünyayla iletişim kurma yeteneği kazandırıldı. Ramazan Bayramı tatili nedeniyle 3 iş günüyle tamamlanan bu hafta; form entegrasyonu, görsel kalite ve global erişilebilirlik konularında yoğunlaşıldı.

**Tamamlanan Başlıklar:**
- EmailJS üzerinden çalışan tam işlevsel iletişim formu
- Glassmorphism, glow efekti ve mikro etkileşimlerden oluşan kapsamlı CSS sistemi
- Kazakistan (Almatı) ofisinin siteye entegrasyonu
- Domain bazlı otomatik dil algılama mekanizması

**Öne Çıkan Teknik Çalışma 1 — EmailJS ile Form Gönderimi (`ContactPage.jsx`):**

Backend ihtiyacı olmadan form verilerinin e-postaya iletilmesi, `@emailjs/browser` kütüphanesiyle sağlandı. Asenkron yapı sayesinde kullanıcı form gönderilirken sayfada takılı kalmaz:

```javascript
import emailjs from '@emailjs/browser';

const handleSubmit = async (values) => {
  setLoading(true);
  try {
    await emailjs.send(
      'service_16f5qja',       // EmailJS Servis ID
      'template_d4i0t08',      // EmailJS Şablon ID
      {
        from_name: values.name,
        from_email: values.email,
        subject: values.subject,
        message: values.message,
      },
      'KTWen6neGfldnhB2D'      // Public Key
    );
    message.success(t('contact.successMessage'));
    form.resetFields();
  } catch (error) {
    message.error(t('contact.errorMessage'));
  } finally {
    setLoading(false);
  }
};
```

**Öne Çıkan Teknik Çalışma 2 — CSS Design Token Sistemi (`index.css`):**

Tüm site genelinde renk, gölge ve efekt tutarlılığını sağlamak için merkezi bir CSS değişken (custom property) sistemi kuruldu. Bu yapı sayesinde marka rengi tek bir yerden değiştirilerek tüm siteye yansıtılabilir:

```css
/* index.css — Design Token Sistemi */
:root {
  /* Renk Paleti */
  --primary:        #0050b3;
  --primary-light:  #1677ff;
  --accent:         #00b4d8;
  --dark:           #0a0e1a;

  /* Gradyanlar */
  --gradient-primary: linear-gradient(135deg, #0050b3 0%, #00b4d8 100%);
  --gradient-dark:    linear-gradient(135deg, #0a0e1a 0%, #1a2332 100%);

  /* Gölgeler */
  --shadow-sm:   0 2px 8px rgba(0,80,179,0.1);
  --shadow-md:   0 8px 24px rgba(0,80,179,0.15);
  --shadow-glow: 0 0 30px rgba(0,180,216,0.3);
}

/* Glassmorphism Kart Efekti */
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.glass-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-glow);
}
```

**Hafta Değerlendirmesi:** Tatil nedeniyle kısa geçen bu hafta, projenin "işlevsellik" boyutunu tamamladı. Artık kullanıcılar gerçekten e-posta gönderebiliyor, site Türkiye ve Kazakistan'daki kullanıcılara kendi dillerinde otomatik olarak hitap edebiliyor.

---

## 4. HAFTA (23.03.2026 – 27.03.2026)

### **12. GÜN (23.03.2026 Pazartesi): SEO (Arama Motoru Optimizasyonu) ve Teknik Dosyaların Hazırlanması**
- **Yapılan Çalışma:** Sitenin Google ve diğer arama motorları tarafından doğru taranması için teknik altyapı kuruldu.
- **Teknik Detaylar:** `public` klasörü altına `robots.txt` tarama kuralları ve tüm sayfaları içeren `sitemap.xml` dosyaları eklendi. `index.html` içine tüm diller için `hreflang` etiketleri eklenerek her dilin kendi domaininde doğru SEO skoru alması sağlandı.
- **Kazanım:** Teknik SEO prensiplerinin ve arama motoru botlarının siteyi nasıl okuduğunun detayları öğrenildi.

### **13. GÜN (24.03.2026 Salı): Kariyer Sayfası Tasarımı ve İK Başvuru Formu Entegrasyonu**
- **Yapılan Çalışma:** Kurumsal büyüme hedefleri doğrultusunda bir "Kariyer" portalı geliştirildi.
- **Teknik Detaylar:** `CareersPage.jsx` sayfası tasarlandı. Sayfada "Neden Aquatic?" bölümünde 3 ana kurumsal değer (İnovasyon, Kariyer, Güvence) görselleştirildi. Form alanı Ant Design hiyerarşisine uygun şekilde konumlandırıldı. Footer linkleri güncellendi.
- **Kazanım:** Bir kurumsal sitede marka imajını güçlendiren spesifik modüllerin (IK portalı) nasıl kurgulanacağı öğrenildi.

### **14. GÜN (25.03.2026 Çarşamba): Özgeçmiş (CV) Yükleme Sistemi ve Asenkron Dosya İşleme**
- **Yapılan Çalışma:** Başvuru formuna dosya yükleme (CV Upload) özelliği eklendi.
- **Teknik Detaylar:** `Upload.Dragger` bileşeni ile sürükle-bırak desteği sağlandı. Yüklenen dosya `FileReader` API ile **Base64** formatına dönüştürüldü. EmailJS üzerinden e-posta eki (`cv_file`) olarak gönderilmesi için veri temizleme (prefix stripping) işlemleri yapıldı. Dosya tipi (PDF/DOCX) ve boyutu için özel validasyonlar yazıldı.
- **Kazanım:** Frontend tarafında dosya okuma, asenkron `Promise` yönetimi ve e-posta servisleriyle dosya transferi mantığı öğrenildi.

### **15. GÜN (26.03.2026 Perşembe): Ürünler (Products) Sayfası ve Sualtı Ekipmanları Kataloğunun Tasarımı**
- **Yapılan Çalışma:** Şirketin sunduğu 6 farklı sualtı ürününü tanıtan katalog sayfası geliştirildi.
- **Teknik Detaylar:** `ProductsPage.jsx` sayfasında her ürün (sualtı kamerası, aydınlatma sistemi, monitör, harness, kontrol ünitesi, basınç kabı) için ayrı kart bileşeni tasarlandı. Ant Design `Card` ve `Row/Col` grid yapısıyla responsive ürün ızgarası oluşturuldu. Her karta ürün teknik özellikleri ve görsel entegre edildi.
- **Kazanım:** Büyük miktarda içeriğin (ürün kataloğu) yapılandırılmış ve ölçeklenebilir bir şekilde bileşen mimarisine nasıl dönüştürüleceği öğrenildi.

### **16. GÜN (27.03.2026 Cuma): Çapraz Tarayıcı Testi, Mobil Uyumluluk ve Hata Giderme**
- **Yapılan Çalışma:** Sitenin farklı tarayıcı ve ekran boyutlarında tutarlı çalışması için kapsamlı testler yapıldı.
- **Teknik Detaylar:** Chrome, Firefox, Edge ve Safari tarayıcılarında manuel test gerçekleştirildi. Mobil görünümde (375px, 768px) yaşanan layout bozukluklarını gidermek için CSS media query'leri düzenlendi. `React` beyaz ekran hatasına (white screen error) yol açan eksik `import` bildirimleri tespit edilerek düzeltildi. Ant Design bileşenlerindeki version uyumsuzluk uyarıları giderildi.
- **Kazanım:** Yazılımın son kullanıcıya ulaşmadan önce farklı ortamlarda test edilmesinin (cross-browser testing), hata yakalama açısından ne kadar kritik olduğu bizzat deneyimlendi.

---

### HAFTALIK ÖZET — 4. Hafta (23.03.2026 – 27.03.2026)

**Kısım:** Yapılan İş Özeti

**Yapılan İş:** robots.txt, sitemap.xml ve hreflang etiketleriyle teknik SEO altyapısı oluşturuldu. Kariyer sayfası ve CV yükleme (Base64 dönüşümlü) sistemi geliştirildi. 6 ürünlük sualtı ekipmanları kataloğu tasarlandı. Chrome, Firefox, Edge ve Safari'de çapraz tarayıcı testleri yapılarak uyumsuzluklar giderildi.

Bu hafta projenin son içerik sayfaları tamamlandı ve sitenin yayına alınmaya hazır olup olmadığı test edildi. Bayram sonrası dönüşün verdiği enerjiyle en üretken haftalardan biri oldu.

**Tamamlanan Başlıklar:**
- `robots.txt`, `sitemap.xml` ve `hreflang` etiketleriyle teknik SEO altyapısı
- Kariyer portalı (CareersPage) tasarımı ve IK başvuru formu
- CV yükleme sistemi: sürükle-bırak, Base64 dönüşümü, boyut/tip validasyonu
- 6 ürünlük sualtı ekipmanları kataloğu (ProductsPage)
- Chrome, Firefox, Edge, Safari çapraz tarayıcı testleri ve hata giderme

**Öne Çıkan Teknik Çalışma 1 — SEO için Hreflang Etiketleri (`index.html`):**

İki farklı ülke domainine sahip sitenin Google'da karışıklık yaratmaması için `hreflang` etiketleri eklendi. Bu sayede Google, `.tr` domainini Türk kullanıcılara, `.kz` domainini Kazak kullanıcılara önerir:

```html
<!-- index.html -->
<link rel="alternate" hreflang="tr" href="https://aquatic.com.tr/" />
<link rel="alternate" hreflang="kk" href="https://aquatic.com.kz/" />
<link rel="alternate" hreflang="x-default" href="https://aquatic.com.tr/" />
```

**Öne Çıkan Teknik Çalışma 2 — CV Yükleme ve Base64 Dönüşümü (`CareersPage.jsx`):**

CV dosyasını backend olmadan e-posta ile iletebilmek için `FileReader` API ile dosya Base64 string'e dönüştürüldü. EmailJS'in 50KB ücretsiz sınırına karşılık 40KB validasyonu eklendi:

```javascript
// CareersPage.jsx
const handleFileUpload = (file) => {
  // Dosya tipi kontrolü
  const isValid = file.type === 'application/pdf' ||
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  if (!isValid) {
    message.error('Sadece PDF veya DOCX yükleyebilirsiniz.');
    return false;
  }
  // Boyut kontrolü (40KB = EmailJS güvenli sınırı)
  if (file.size > 40 * 1024) {
    message.error('Dosya boyutu 40KB\'ı geçemez.');
    return false;
  }
  // Base64 dönüşümü
  const reader = new FileReader();
  reader.onload = (e) => {
    // "data:application/pdf;base64," ön ekini temizle
    const base64String = e.target.result.split(',')[1];
    setCvFile(base64String);
  };
  reader.readAsDataURL(file);
  return false; // Ant Design'ın otomatik yüklemesini engelle
};
```

**Öne Çıkan Teknik Çalışma 3 — React Router ile SPA için `.htaccess`:**

`npm run build` ile üretilen dosyalar bir Apache sunucusuna yüklendiğinde, kullanıcı `/products` gibi bir URL'yi direkt açmaya çalışırsa 404 hatası alır. Bunu önlemek için `public/` klasörüne bir `.htaccess` dosyası eklendi:

```apache
# public/.htaccess
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

Bu kural, tüm bilinmeyen istekleri `index.html`'e yönlendirerek React Router'ın devreye girmesini sağlar.

**Hafta Değerlendirmesi:** Projenin içerik açısından en zengin haftasıydı. Kariyer sayfası ve ürün kataloğu eklenerek sitenin kurumsal kimliği tamamlandı. Haftanın sonunda yapılan çapraz tarayıcı testleri, beklenmedik birkaç hatayı gün yüzüne çıkardı ve bunların erken tespit edilmesi son günün iş yükünü önemli ölçüde hafifletti.

---

## 5. HAFTA (30.03.2026 – 03.04.2026)

### **17. GÜN (30.03.2026 Pazartesi): Final Build, Hata Ayıklama ve Deployment (Yayına Alma)**
- **Yapılan Çalışma:** Projenin son testleri yapıldı, hatalar giderildi ve canlı sunucu paketi hazırlandı.
- **Teknik Detaylar:** EmailJS 50KB ücretsiz sınır hatasına karşı dosya boyutu validasyonu (40KB sınırı) eklendi. `npm run build` ile optimize edilmiş prodüksiyon paketleri alındı. Sayfa yenileme hataları için `.htaccess` dosyası eklendi ve sunucuya yüklenmeye hazır flat (düz) yapıdaki **aquatic_deploy.zip** dosyası oluşturuldu.
- **Kazanım:** Bir yazılımın geliştirme (Development) fazından prodüksiyon (Production) fazına geçişindeki tüm check-list adımları ve yayına alma stratejileri tecrübe edildi.

### **18. GÜN (31.03.2026 Salı): UI/UX İyileştirmeleri, Erişilebilirlik ve Ürün Detay Panelleri**
- **Yapılan Çalışma:** Site genelinde kapsamlı UI/UX revizyonu gerçekleştirildi. WCAG AA erişilebilirlik standartları uygulandı ve tüm ürün kartlarına expand edilebilir detay paneli eklendi.
- **Teknik Detaylar:**
  - **Tipografi Token Sistemi:** `src/index.css`'e 7 adet CSS custom property eklendi (`--font-size-display: 3.5rem` den `--font-size-caption: 0.75rem` a kadar). 15'ten fazla hardcode font-size değeri bu token'larla değiştirildi.
  - **Renk Kontrast (WCAG AA):** `--color-text-secondary` değeri `#5a6577`'den `#4a5568`'e (kontrast oranı 4.2:1 → 5.5:1), `--color-text-muted` değeri `#8c95a6`'dan `#6b7280`'e (2.8:1 → 4.6:1) güncellendi.
  - **Erişilebilirlik:** `focus-visible` klavye odak stilleri, `prefers-reduced-motion` medya sorgusu (animasyonları devre dışı bırakma), dekoratif elementlere `aria-hidden="true"`, dokunma hedefleri minimum 48px standartı eklendi.
  - **Design Tokens:** `:root`'a `--btn-height-sm/md/lg` ve `--card-padding-sm/md/lg` değişkenleri eklendi.
  - **Ürün Detay Panelleri:** Tüm 6 ürüne (kamera, aydınlatma, monitör, harness, taşınabilir kontrol, basınç kabı) genişletilebilir panel eklendi. Her panel; alt kategoriler listesi ve 5 satırlık teknik özellik tablosu içeriyor. 4 dilde (TR/EN/KK/RU) tam çeviri yapıldı.
- **Kazanım:** WCAG erişilebilirlik standartlarının hem kullanıcı deneyimini iyileştirdiği hem de kurumsal sitelerde yasal bir gereklilik olduğu tecrübe edildi.

### **19. GÜN (01.04.2026 Çarşamba): React State Hatası Tespiti ve Düzeltmesi**
- **Yapılan Çalışma:** Ürün detay panelinin açılıp kapanması sırasında kart içeriğinin görünmez hale geldiği bir hata tespit edildi ve düzeltildi.
- **Teknik Detaylar:** Hata analizi sırasında şu mekanizma keşfedildi: `expandedProduct` state'i değiştiğinde React, Card bileşeninin `className` prop'unu güncelliyor. Bu güncelleme sırasında React, DOM elementi üzerindeki `className` attribute'unu JSX'teki değerle tamamen **ezerek** yeniden yazıyor. `IntersectionObserver` tarafından DOM'a doğrudan eklenen `visible` class'ı bu ezme işleminde siliniyor ve kart `opacity: 0` konumuna geri dönüyor. Çözüm: `reveal` class'ı React'in yönettiği Card bileşeninden alınarak React tarafından yönetilmeyen bir `<div>` sarmalayıcısına taşındı:
  ```jsx
  // ÖNCE (hatalı):
  <Card className={`product-card reveal${isExpanded ? ' product-card--expanded' : ''}`}>

  // SONRA (düzeltilmiş):
  <div className="reveal" style={{ height: '100%' }}>
      <Card className={`product-card${isExpanded ? ' product-card--expanded' : ''}`}>
  ```
- **Kazanım:** React'in DOM yönetim modeli (Virtual DOM reconciliation) ile imperative DOM manipülasyonunun (classList.add) aynı element üzerinde kullanılamayacağı kritik bir kavram olarak öğrenildi.

### **20. GÜN (02.04.2026 Perşembe): Deploy Zip Hatası Tespiti ve Deployment Pipeline Revizyonu**
- **Yapılan Çalışma:** Canlı sunucuya yüklenen zip dosyasının güncel kodu içermediği fark edildi. Sorunun kökü araştırıldı ve deployment prosedürü düzeltildi.
- **Teknik Detaylar:** İki hata birden tespit edildi. Birincisi: `zip` komutu mevcut bir zip dosyası varsa üzerine yazmak yerine yeni dosyaları **ekler** — eski ve yeni dosyalar karışık kalır. İkincisi: `zip -r aquatic_deploy.zip dist/` komutu zip içinde `dist/index.html` şeklinde klasör prefix'i oluşturur; sunucu dosyaları bu yolda bulamaz. Doğru yöntem: önce eski zip silinir, ardından `cd dist && zip -r ../aquatic_deploy.zip .` komutuyla zip `dist/` içinden oluşturulur; böylece `index.html` direkt kökte yer alır.
  ```bash
  # YANLIŞ:
  zip -r aquatic_deploy.zip dist/  # dist/index.html prefix'i oluşturur

  # DOĞRU:
  rm aquatic_deploy.zip
  cd dist && zip -r ../aquatic_deploy.zip .
  ```
- **Kazanım:** Deployment süreçlerindeki ince ama kritik komut satırı farklarının (path prefix) canlı ortamı doğrudan etkileyebileceği tecrübe edildi.

### **21. GÜN (03.04.2026 Cuma): Kod Gözden Geçirme ve Teknik Borç Analizi**
- **Yapılan Çalışma:** Tüm kod tabanı gözden geçirilerek tekrar eden yapılar, iyileştirme noktaları ve güvenlik açıkları analiz edildi.
- **Teknik Detaylar:** Analiz sonucunda tespit edilen başlıca sorunlar: `IntersectionObserver` kodunun 7 sayfada birebir kopyalandığı (DRY ihlali), her sayfa CSS dosyasında gereksiz yere tekrarlanan `.reveal` stilleri (zaten `index.css`'te tanımlı), EmailJS API anahtarlarının kaynak kodunda açık (hardcode) olması, `index.html`'de `<title>` etiketinin bulunmaması (SEO açığı) ve CV upload formuna dosya tipi kontrolü eksikliği (`.exe` gibi zararlı dosyalar kabul ediliyor).
- **Kazanım:** Teknik borcun (technical debt) zamanla nasıl biriktiği ve her sprint sonunda yapılacak kod gözden geçirmesinin bu borcu kontrol altında tutmanın temel yöntemi olduğu anlaşıldı.

---

### HAFTALIK ÖZET — 5. Hafta (30.03.2026 – 03.04.2026)

**Kısım:** Yapılan İş Özeti

**Yapılan İş:** Final build alınarak aquatic_deploy.zip ile deployment gerçekleştirildi. WCAG AA renk kontrast uyumluluğu ve 7 seviyeli font-size token sistemi uygulandı. Tüm 6 ürüne 4 dilde genişletilebilir detay paneli eklendi. React className/IntersectionObserver çakışma hatası ve deployment zip yapısı hatası tespit edilerek düzeltildi. Kapsamlı teknik borç analizi yapıldı.

Bu hafta projenin yayına alındığı ve ardından kapsamlı bir kalite iyileştirme sürecine girdiği en yoğun haftalardan biri oldu.

**Tamamlanan Başlıklar:**
- Final build ve `aquatic_deploy.zip` ile deployment
- WCAG AA renk kontrast uyumluluğu (tüm sayfalarda)
- 7 seviyeli font-size token sistemi (`--font-size-display` → `--font-size-caption`)
- Erişilebilirlik: focus-visible, prefers-reduced-motion, aria-hidden, 48px touch target
- Tüm 6 ürüne expand panel (4 dilde subcategory listesi + teknik özellik tablosu)
- React `className` / IntersectionObserver çakışma hatasının tespiti ve düzeltilmesi
- Deployment zip yapısı hatasının tespiti ve prosedürün düzeltilmesi
- Kapsamlı teknik borç analizi

**Öne Çıkan Teknik Çalışma — Vite Build Çıktısı ve Deployment Süreci:**

`npm run build` komutu çalıştırıldığında Vite, tüm kaynak kodunu küçülterek (minify) ve paketleyerek `dist/` klasörüne aktarır. Bu klasörün içeriği doğrudan web sunucusuna yüklenebilir:

```bash
# Build komutları
npm run build

# Oluşan dist/ yapısı:
dist/
├── index.html          # Giriş noktası
├── assets/
│   ├── index-[hash].js   # Tüm JS (minify edilmiş)
│   └── index-[hash].css  # Tüm CSS (minify edilmiş)
└── [görseller ve statik dosyalar]
```

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  build: {
    outDir: 'dist',
    // Kod bölme (code splitting) otomatik aktif
    // Görseller base64 yerine ayrı dosya olarak çıkar
  }
});
```

**Deployment Kontrol Listesi (Bu gün uygulanan):**

| Adım | Durum |
|------|-------|
| `npm run build` başarıyla tamamlandı | ✅ |
| `dist/` klasörü zip'lendi (`aquatic_deploy.zip`) | ✅ |
| `.htaccess` dosyası `dist/` içinde mevcut | ✅ |
| EmailJS dosya boyutu validasyonu aktif (40KB) | ✅ |
| Tüm görseller WebP formatında | ✅ |
| Hreflang etiketleri yerinde | ✅ |
| `robots.txt` ve `sitemap.xml` mevcut | ✅ |

**Hafta Değerlendirmesi:** Bu hafta hem deployment tamamlandı hem de ciddi bir iyileştirme döngüsü başladı. Canlıya alınan bir ürünün asla "bitti" olmadığı; hata tespiti, erişilebilirlik ve güvenlik açısından sürekli geliştirilmesi gerektiği pratik olarak yaşandı.

---

## 6. HAFTA (06.04.2026 – 10.04.2026)

### **22. GÜN (06.04.2026 Pazartesi): Kapsamlı Teknik Analiz ve HIGH Öncelikli Güvenlik/SEO Düzeltmeleri**
- **Yapılan Çalışma:** Projenin tüm dosyaları senior yazılım mimarisi perspektifiyle incelenerek kapsamlı bir teknik analiz raporu hazırlandı (`CLAUDE.md`). Ardından tespit edilen HIGH öncelikli sorunlar giderildi.
- **Teknik Detaylar:**
  - **`<title>` Etiketi (SEO):** `index.html` dosyasında `<title>` etiketi hiç bulunmuyordu — bu durum arama motorlarının sayfayı doğru kataloglamasını engeller. `<title>Aquatic — Teknolojik Gözünüz | Sualtı ve Savunma Teknolojileri</title>` eklendi.
  - **Environment Variables (.env):** `ContactPage.jsx:24-26` ve `CareersPage.jsx:54-55` dosyalarında EmailJS API anahtarları (`service_id`, `template_id`, `public_key`) kaynak kodunda açık bulunuyordu. `.env` dosyası oluşturularak `VITE_EMAILJS_*` prefix'li değişkenlere taşındı, `import.meta.env` ile okunur hale getirildi.
  - **404 Sayfası:** Tanımsız route'lara gidildiğinde boş beyaz sayfa gösteriliyordu. `NotFoundPage.jsx` bileşeni oluşturuldu, `App.jsx`'e `<Route path="*">` catch-all route eklendi.
  - **CV Upload Güvenliği:** `CareersPage.jsx`'te dosya tipi kontrolü yoktu; `.exe` dahil her türlü dosya kabul ediliyordu. `accept=".pdf,.doc,.docx"` attribute'u ve MIME type kontrolü (`application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`) eklendi. Hata mesajları 4 dilde i18n'e eklendi.
- **Kazanım:** Bir web uygulamasının "çalışıyor" olmasıyla "production-ready" (üretime hazır) olması arasındaki fark somut örneklerle görüldü: güvenlik, SEO ve erişilebilirlik birer ek değil, temel gereksinimdir.

**Öne Çıkan Teknik Çalışma — Environment Variables ile API Güvenliği:**

API anahtarlarını kaynak koduna gömmek, versiyon kontrol sistemine (Git) her commit'te bu anahtarları herkese açık hale getirir. Vite projelerinde doğru yaklaşım:

```bash
# .env dosyası (asla git'e commit edilmez!)
VITE_EMAILJS_SERVICE_ID=service_16f5qja
VITE_EMAILJS_TEMPLATE_ID=template_d4i0t08
VITE_EMAILJS_PUBLIC_KEY=KTWen6neGfldnhB2D
```

```javascript
// ContactPage.jsx — ÖNCE (güvensiz):
const EMAILJS_SERVICE_ID = 'service_16f5qja';  // Kaynak kodda açık!

// SONRA (güvenli):
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
```

Vite, `VITE_` prefix'li değişkenleri build sırasında bundle'a dahil eder; bu şekilde `.env` dosyası git'e eklenmeden değerler production build'e aktarılır.

### **23. GÜN (07.04.2026 Salı): Tekrarlayan Kod (DRY) Temizliği — useRevealAnimation Hook**
- **Yapılan Çalışma:** Projede 7 farklı sayfada birebir tekrarlayan `IntersectionObserver` kodu tek bir custom hook altında toplandı.
- **Teknik Detaylar:** `src/hooks/useRevealAnimation.js` dosyası oluşturuldu. 7 sayfada (`HomePage`, `CorporatePage`, `ServicesPage`, `ProductsPage`, `BlackBoxPage`, `CareersPage`, `ContactPage`) aynı olan `useEffect` / `IntersectionObserver` bloğu kaldırılarak yerine `useRevealAnimation()` hook çağrısı bırakıldı. Bu işlem yaklaşık 70 satır tekrar eden kodu ortadan kaldırdı.
  ```javascript
  // src/hooks/useRevealAnimation.js
  import { useEffect } from 'react';

  export const useRevealAnimation = (threshold = 0.1) => {
      useEffect(() => {
          const observer = new IntersectionObserver(
              (entries) => entries.forEach((e) => {
                  if (e.isIntersecting) e.target.classList.add('visible');
              }),
              { threshold }
          );
          document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
          return () => observer.disconnect();
      }, [threshold]);
  };
  ```
- **Kazanım:** React custom hook'larının yalnızca state paylaşımı için değil, side effect mantığını (Observer, event listener, timer) yeniden kullanılabilir hale getirmek için de kullanılabildiği öğrenildi.

### **24. GÜN (08.04.2026 Çarşamba): Ortak Bileşen Çıkarımı — PageHero Komponenti**
- **Yapılan Çalışma:** 6 sayfada birebir tekrarlayan "sayfa hero" bölümü tek bir yeniden kullanılabilir bileşene dönüştürüldü.
- **Teknik Detaylar:** `src/components/common/PageHero.jsx` bileşeni oluşturuldu. `image`, `title` ve `subtitle` prop'ları alan bu bileşen; arka plan görseli, parçacık efekti, başlık ve dalga animasyonunu tek bir yerde yönetiyor. `CorporatePage`, `ServicesPage`, `ProductsPage`, `BlackBoxPage`, `CareersPage`, `ContactPage` dosyalarındaki tekrar eden ~10 satırlık hero JSX kodu tek satıra indi:
  ```jsx
  // ÖNCE: Her sayfada ~10 satır tekrar eden JSX
  <section className="page-hero">
      <div className="page-hero-bg" />
      <BackgroundParticles count={15} />
      ...

  // SONRA: Tek satır
  <PageHero image={imgHero} title={t('products.title')} subtitle={t('products.subtitle')} />
  ```
- **Kazanım:** "Don't Repeat Yourself" (DRY) prensibinin bileşen düzeyinde uygulanması; hem bakım yükünü azalttığı (hero tasarımı tek yerden değiştiriliyor) hem de hata riskini düşürdüğü gözlemlendi.

### **25. GÜN (09.04.2026 Perşembe): Performans İyileştirmesi — Code Splitting ve Lazy Loading**
- **Yapılan Çalışma:** Uygulamanın ilk yüklenme süresini azaltmak için route bazlı kod bölme (code splitting) uygulandı.
- **Teknik Detaylar:** `App.jsx`'te tüm sayfa bileşenleri `React.lazy()` ile dinamik import'a dönüştürüldü. Mevcut `<Suspense>` sarmalayıcısı zaten hazırdı. Bu değişiklik öncesinde Vite, tüm 7 sayfayı tek bir 1.3MB'lık JavaScript bundle'ında birleştiriyordu. Değişiklikten sonra her sayfa kendi chunk'ında — kullanıcı o sayfaya gittiğinde indirilir:
  ```javascript
  // App.jsx — ÖNCE:
  import HomePage from './pages/HomePage';       // eager — her zaman yüklenir

  // SONRA:
  const HomePage = React.lazy(() => import('./pages/HomePage'));  // lazy — gerektiğinde yüklenir
  ```
  Build çıktısında ana bundle boyutu ~1.3MB'dan ~180KB'a düştü; geri kalan kod sayfa başına küçük chunk'lara ayrıldı.
- **Kazanım:** Tarayıcının "First Contentful Paint" (FCP) metriğini doğrudan etkileyen bundle boyutunun code splitting ile nasıl yönetileceği pratik olarak öğrenildi.

### **26. GÜN (10.04.2026 Cuma): Kod Kalitesi Araçları, Final Testler ve Proje Değerlendirmesi**
- **Yapılan Çalışma:** Proje genelinde kod kalitesini otomatik denetleyen araçlar kuruldu. Final deployment yapıldı ve staj süreci genel olarak değerlendirildi.
- **Teknik Detaylar:** ESLint (`eslint-plugin-react` ile) ve Prettier projeye eklendi; kurallar `package.json`'a tanımlandı. `npm run lint` scripti ile tüm kod tabanı tarandı, uyarılar giderildi. Güncellenmiş `aquatic_deploy.zip` son kez oluşturulup Git'e push edildi. Projenin tüm sayfaları Chrome DevTools Lighthouse aracıyla test edildi.
- **Kazanım:** Kod kalitesi araçlarının (linter, formatter) ekip ortamında tutarlı bir kod standardı oluşturmadaki rolü ve CI/CD pipeline'larıyla entegrasyon potansiyeli kavrandı.

---

### HAFTALIK ÖZET — 6. Hafta (06.04.2026 – 10.04.2026)

**Kısım:** Yapılan İş Özeti

**Yapılan İş:** Title etiketi, .env güvenliği, 404 sayfası ve CV tipi kontrolü gibi HIGH öncelikli güvenlik/SEO açıkları kapatıldı. useRevealAnimation custom hook ile 7 sayfadaki 70 satır tekrar eden kod temizlendi. PageHero ortak bileşeni oluşturuldu. React.lazy() ile code splitting uygulandı (1.3MB → 180KB). ESLint + Prettier kurularak kod standartları otomatize edildi.

Stajın son haftasında teknik borç giderme ve kod kalitesi iyileştirmeleri ön plana çıktı. Çalışan bir ürünü daha sürdürülebilir ve güvenli hale getirmenin yolları uygulamalı olarak deneyimlendi.

**Tamamlanan Başlıklar:**
- HIGH öncelikli güvenlik/SEO düzeltmeleri (`<title>`, `.env`, 404, CV tipi kontrolü)
- `useRevealAnimation` custom hook — 7 sayfadaki 70 satır tekrar eden kod temizlendi
- `<PageHero>` ortak bileşeni — 6 sayfadaki tekrarlayan JSX tek bileşene taşındı
- React.lazy() code splitting — ana bundle 1.3MB'dan ~180KB'a düşürüldü
- ESLint + Prettier kurulumu ve tüm kod tabanının lint geçirmesi

**Öne Çıkan Teknik Çalışma — Teknik Analiz Matrisi (Proje Kapanışı):**

Stajın son değerlendirmesinde projenin olgunluk düzeyi şu şekilde ölçüldü:

| Kriter | Başlangıç | Bitiş |
|--------|:---------:|:-----:|
| Proje Yapısı | 3/10 | 6/10 |
| Kod Kalitesi (DRY) | 3/10 | 7/10 |
| Erişilebilirlik (WCAG) | 2/10 | 7/10 |
| Güvenlik | 3/10 | 7/10 |
| SEO | 2/10 | 7/10 |
| Performans | 4/10 | 7/10 |

**Hafta Değerlendirmesi:** Stajın bu son haftasında öğrenilen en önemli ders şudur: yazılım geliştirme, bir özellik tamamlandığında bitmez. Erişilebilirlik, güvenlik, performans ve kod kalitesi; bir ürünün kullanıcıya sunulmasından sonra da sürekli iyileştirilmesi gereken boyutlardır. Bu hafta yapılan iyileştirmeler sayesinde proje, başlangıçtaki MVP (Minimum Viable Product) seviyesinden gerçek anlamda production-ready bir kurumsal web sitesine dönüştü.

---

## 7. HAFTA (13.04.2026 – 17.04.2026)

> **Not:** 15–16 Nisan 2026 (Salı–Çarşamba) tarihleri devamsızlık nedeniyle çalışılmamıştır.

### **27. GÜN (13.04.2026 Pazartesi): Çoklu Dil Sistemi Kapsamlı Hata Giderme ve Eksik Anahtar Tamamlama**

- **Yapılan Çalışma:** Dil değiştirme sırasında birçok arayüz öğesinin Türkçe kalmaya devam ettiği tespit edildi. Sorunun kök nedeni araştırıldı ve `i18n.js` yapılandırmasındaki hatalı `fallbackLng` ayarından kaynaklandığı anlaşıldı. Tüm lokalizasyon dosyaları sistematik biçimde karşılaştırıldı.
- **Teknik Detaylar:** `src/i18n.js` dosyasında `fallbackLng: 'kk'` olarak ayarlanmıştı; bu nedenle `en.json`'da eksik olan her anahtar için sistem Kazakçe içeriği gösteriyordu. `fallbackLng: 'tr'` olarak düzeltildi. Akabinde Python scriptiyle dört dil dosyası (`tr.json`, `en.json`, `kk.json`, `ru.json`) anahtar bazında karşılaştırıldı. `AppHeader.jsx` içindeki gezinme menüsü açılır listelerinde (`homeDropdownItems`, `corporateDropdownItems`, `servicesDropdownItems`) tüm etiketlerin Türkçe hardcode edildiği görüldü. Her dil dosyasına yeni `dropdown.home.*`, `dropdown.corporate.*`, `dropdown.services.*` anahtar kümeleri eklendi. `HomePage.jsx`'te "Hizmetlerimiz" ve "Ürünlerimiz" bölüm etiketleri de hardcode bulundu; bunlar `t('servicesPreview.sectionLabel')` ve `t('popularProducts.sectionLabel')` çağrılarıyla değiştirildi.
  ```javascript
  // AppHeader.jsx — ÖNCE (hardcode):
  { key: 'home-stats', label: 'İstatistikler' }

  // SONRA (i18n):
  { key: 'home-stats', label: t('dropdown.home.stats') }
  ```
- **Kazanım:** `i18next`'in `fallbackLng` mekanizmasının yanlış yapılandırıldığında tüm eksik anahtarları istenmeyen bir dile yönlendirebileceği, dolayısıyla çok dilli projelerde bu ayarın dikkatle seçilmesi gerektiği öğrenildi.

### **28. GÜN (14.04.2026 Salı): Dinamik Haber Akışı Entegrasyonu ve Marquee Tasarımı**

- **Yapılan Çalışma:** Ana sayfadaki statik, Türkçe hardcode haber kartları kaldırılarak gerçek zamanlı haber API'si entegrasyonu yapıldı. Tasarım açısından haberler sabit grid yerine sonsuz yatay kayan bir marquee bileşenine dönüştürüldü.
- **Teknik Detaylar:** NewsData.io REST API'si seçildi. API anahtarı `.env` dosyasına `VITE_NEWSDATA_API_KEY` olarak eklendi. `HomePage.jsx`'e `useState` / `useEffect` ile veri çekme mantığı yazıldı. API ücretsiz planında günde 200 istek sınırı bulunduğundan, her sayfayı açan kullanıcının yeni istek atmasını önlemek amacıyla `localStorage` tabanlı 6 saatlik önbellek sistemi kuruldu: ilk ziyarette API çağrılır ve sonuç kaydedilir, 6 saat içindeki sonraki ziyaretlerde API'ye hiç dokunulmaz. Haber sayısı 3'ten 20'ye çıkarıldı; NewsData.io'nun `nextPage` sayfalama token'ı kullanılarak iki istek zinciriyle 10+10 makale bir araya getirildi. Her kart; 190px kapak görseli, kategori etiketi, kaynak adı ve tarihi içerecek şekilde yeniden tasarlandı. Brands bölümündeki marquee animasyonuyla aynı teknik kullanıldı: `[...newsItems, ...newsItems]` dizisi ile kesintisiz döngü, `will-change: transform` ile GPU kompozitleme, kenar yumuşatma için `mask-image` gradient.
  ```javascript
  // localStorage cache mantığı
  const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 saat
  const cached = JSON.parse(localStorage.getItem('aquatic_news_cache') ?? 'null');
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
      setNewsItems(cached.items);
      return; // API'ye istek atılmaz
  }
  ```
  Ayrıca Ant Design v6'nın kullanımdan kaldırılan prop uyarıları giderildi: `Drawer width` → `style.width`, `Space direction` → `orientation`, `Timeline dot/children` → `icon/content`, `Collapse expandIconPosition` → `expandIconPlacement`. `vite.config.js`'e `manualChunks` konfigürasyonu eklenerek React, i18n ve Ant Design ikonları ayrı chunk'lara ayrıldı; ana bundle boyutu 803KB'dan 653KB'a düştü. Hero görselinin LCP (Largest Contentful Paint) metriğini iyileştirmek için `public/hero.webp` stabil URL'ine taşınıp `index.html`'e `<link rel="preload">` eklendi.
- **Kazanım:** İstemci taraflı önbellekleme (`localStorage`) ile harici API rate limit yönetiminin önemi, ve `will-change: transform` gibi CSS compositing ipuçlarının tarayıcı render performansına etkisi deneyimlendi. Lighthouse Performance skorunun 56'dan 72+'ya yükseltilmesi için chunk splitting ve LCP optimizasyonunun kritik olduğu görüldü.

---

### HAFTALIK ÖZET — 7. Hafta (13.04.2026 – 17.04.2026)

**Kısım:** Yapılan İş Özeti

**Yapılan İş:** i18n fallbackLng hatası düzeltildi, AppHeader açılır menü etiketleri ve tüm dil dosyaları senkronize edildi. NewsData.io REST API'si entegre edilerek localStorage önbelleğiyle 20 güncel haber çeken sonsuz marquee haber akışı bileşeni geliştirildi. Ant Design v6 deprecated prop uyarıları ve Vite manualChunks optimizasyonu tamamlandı.

Bu hafta iki yoğun günde hem lokalizasyon alt yapısındaki sistematik hatalar giderildi hem de projeye dinamik bir içerik akışı özelliği kazandırıldı. 15–16 Nisan devamsızlık nedeniyle çalışılmadı; 17 Nisan'da bireysel teknik araştırma yapıldı.

**Tamamlanan Başlıklar:**
- `i18n.js` `fallbackLng` hatası düzeltildi, tüm dil dosyaları senkronize edildi
- `AppHeader` açılır menü etiketleri ve `HomePage` bölüm başlıkları i18n'e taşındı
- `tr.json` duplicate key (`servicesPreview`, `popularProducts`) bug'ı onarıldı
- NewsData.io ile 20 güncel haber çekimi ve localStorage 6 saatlik önbellek
- Sonsuz yatay marquee haber akışı — kart başına görsel, kaynak ve kategori etiketi
- Ant Design v6 deprecated prop uyarılarının tamamı giderildi
- Vite `manualChunks` ile JavaScript bundle optimizasyonu

**Öne Çıkan Teknik Çalışma — localStorage Önbellek Mimarisi:**

API rate limit sorunu, istemci taraflı önbellek ile çözüldü. Önbellek mantığının temel bileşenleri:

```javascript
const CACHE_KEY = 'aquatic_news_cache';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 saat (ms)

// Okuma: Cache taze mi?
const cached = JSON.parse(localStorage.getItem(CACHE_KEY) ?? 'null');
if (cached && Date.now() - cached.ts < CACHE_TTL && cached.items?.length) {
    setNewsItems(cached.items);
    setNewsLoading(false);
    return; // API isteği YAPILMAZ
}

// Yazma: Başarılı fetch sonrası kaydet
localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), items }));
```

Bu yapı sayesinde ücretsiz planın 200 istek/gün sınırı çok daha geniş bir kullanıcı kitlesine yetecek şekilde verimli kullanılıyor.

---

## 8. HAFTA (20.04.2026 – 24.04.2026)

> **Not:** 23 Nisan 2026 Ulusal Egemenlik ve Çocuk Bayramı resmi tatil nedeniyle çalışılmamıştır.

### **29. GÜN (17.04.2026 Cuma): Araştırma Günü — UI/UX Tasarım Sistemleri ve Web Performans Metrikleri**

- **Yapılan Çalışma:** Stajda geliştirilen projenin tasarım kararlarını daha sistematik bir zemine oturtmak amacıyla UI/UX tasarım sistemi kavramları araştırıldı. Lighthouse performans metriklerinin nasıl yorumlanacağı incelendi.
- **Teknik Detaylar:** Google Lighthouse'un dört ana metriği üzerinde çalışıldı: **LCP** (Largest Contentful Paint — en büyük görsel öğenin yüklenme süresi), **TBT** (Total Blocking Time — ana iş parçacığını bloklayan JavaScript süresi), **CLS** (Cumulative Layout Shift — görsel düzen kayması) ve **Speed Index**. Projenin CLS değerinin 0 olması, `<img>` etiketlerine `width`/`height` atanması ve görsellerin `loading="lazy"` kullanması sayesinde elde edildiği anlaşıldı. Buna karşın Speed Index'in 5.0s seviyesinde kalmasının sebebinin ağırlıklı olarak Ant Design'ın büyük JavaScript bundle'ı olduğu tespit edildi. Kurumsal ve savunma sanayi odaklı web sitelerinde "Trust & Authority" tasarım dilinin ön plana çıktığı, sertifika badge'leri, metrik kartları ve case study bölümlerinin dönüşüm oranını artırdığı öğrenildi.
- **Kazanım:** Performans optimizasyonunun salt teknik bir mesele olmadığı, kullanıcının siteye güven duymasıyla (algılanan hız) doğrudan bağlantılı olduğu kavrandı.

### **30. GÜN (20.04.2026 Pazartesi): BackgroundParticles Bileşeni Optimizasyonu — useMemo Entegrasyonu**

- **Yapılan Çalışma:** Ana sayfanın hero bölümünde arka planda görünen parçacık animasyon bileşeninde tespit edilen gereksiz yeniden hesaplama sorunu giderildi.
- **Teknik Detaylar:** `BackgroundParticles.jsx` bileşeni, her render döngüsünde `Array.from()` ile rastgele koordinat ve boyutlar üretiyordu. Bu, üst bileşen (`HomePage`) her state güncellemesinde (örn. dil değiştirme, haber yükleme) tüm parçacıkların yeniden konumlandırılmasına yol açıyordu. React'in `useMemo` hook'u kullanılarak parçacık dizisi yalnızca `count` prop'u değiştiğinde yeniden üretilecek şekilde sarmalandı.
  ```javascript
  // ÖNCE — her render'da yeniden hesaplama:
  const particles = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      // ...
  }));

  // SONRA — yalnızca count değişince hesaplama:
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      // ...
  })), [count]);
  ```
  Ayrıca React 19'un JSX transform özelliği sayesinde `import React from 'react'` satırı kaldırıldı; bu ifade artık gerekli değil.
- **Kazanım:** `useMemo`'nun salt hesaplama maliyetini değil, bileşenin görsel kararlılığını da koruduğu anlaşıldı. Parçacıklar artık dil değiştirme veya haber yüklenme sırasında yerinden oynamıyor.

### **31. GÜN (21.04.2026 Salı): Form Doğrulama Mesajları ve Honeypot Spam Koruması**

- **Yapılan Çalışma:** `ContactPage.jsx` ve `CareersPage.jsx` formlarında zayıf validasyon mesajları güçlendirildi. Her iki forma da bot tespiti için honeypot alanı eklendi.
- **Teknik Detaylar:** İletişim formuna e-posta formatı kontrolü (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) ve telefon alanına yalnızca rakam/boşluk/tire kabulü eklendi. Validasyon hata mesajları `t()` ile tüm dillere taşındı. Honeypot tekniğinde CSS ile gizlenmiş (`display: none`) bir `<input name="website" />` alanı eklendi; submit sırasında bu alan doluysa form silentkle reddediliyor — bot tarafından doldurulan alanlar asla EmailJS'e gönderilmiyor:
  ```jsx
  {/* Honeypot — botlar görür, kullanıcılar görmez */}
  <input
      type="text"
      name="website"
      value={honeypot}
      onChange={(e) => setHoneypot(e.target.value)}
      style={{ display: 'none' }}
      tabIndex={-1}
      autoComplete="off"
  />

  // handleSubmit içinde:
  if (honeypot) return; // bot tespiti — sessizce iptal
  ```
- **Kazanım:** Sunucu gerektirmeyen basit bot koruması yöntemlerinden honeypot tekniğinin, reCAPTCHA gibi kullanıcı deneyimini bozan çözümlere kıyasla daha az sürtüşme yarattığı öğrenildi.

### **32. GÜN (22.04.2026 Çarşamba): Hardcode Türkçe Metinlerin i18n'e Taşınması ve Dil Senkronizasyonu**

- **Yapılan Çalışma:** Kod tabanında `grep` ile taranan hardcode Türkçe string'lerin tamamı tespit edilerek i18n anahtar-değer çiftlerine dönüştürüldü.
- **Teknik Detaylar:** `grep -rn "[ğüşıöçÜĞŞİÖÇ]" src/pages/` komutuyla Türkçe karakter içeren tüm satırlar listelendi. Kritik bulgular: `HomePage.jsx` statik haber kartlarının tag ve tarih alanları, `CareersPage.jsx`'teki adım açıklamaları ve `ProductsPage.jsx`'teki filtre etiketleri. Bu metinler `tr.json`'a eklendi; `en.json`, `kk.json` ve `ru.json` dosyaları da eşzamanlı güncellendi. Python diff scripti kullanılarak dört dil dosyası arasında sıfır eksik anahtar hedefine ulaşıldı.
  ```bash
  # Kontrol scripti çıktısı:
  tr → en: 0 eksik anahtar ✓
  tr → kk: 0 eksik anahtar ✓
  tr → ru: 0 eksik anahtar ✓
  ```
- **Kazanım:** Büyük bir kod tabanında lokalizasyon kapsamını denetlemenin elle tarama yerine otomatik diff araçlarıyla yapılması gerektiği; aksi hâlde gözden kaçan hardcode metinlerin üretim ortamında ciddi UX sorunlarına yol açtığı deneyimlendi.

---

### HAFTALIK ÖZET — 8. Hafta (20.04.2026 – 24.04.2026)

**Kısım:** Yapılan İş Özeti

**Yapılan İş:** BackgroundParticles bileşenine useMemo eklenerek gereksiz re-render'lar önlendi. İletişim ve kariyer formlarına gelişmiş validasyon mesajları ve honeypot spam koruması eklendi. grep tabanlı otomatik diff scriptiyle tüm hardcode Türkçe metinler i18n'e taşındı; 4 dil dosyasında sıfır eksik anahtar doğrulandı.

Bu hafta performans optimizasyonu, form güvenliği ve lokalizasyon kalitesi odak noktaları oldu. 23 Nisan Ulusal Egemenlik ve Çocuk Bayramı tatili nedeniyle haftada 4 gün çalışıldı.

**Tamamlanan Başlıklar:**
- `BackgroundParticles` `useMemo` entegrasyonu — gereksiz re-render'lar önlendi
- Form validasyon mesajları güçlendirildi ve i18n'e taşındı
- Honeypot spam koruması — Contact + Careers formlarına eklendi
- Tüm hardcode Türkçe metinler lokalizasyon dosyalarına aktarıldı
- Dört dil dosyası arasında sıfır eksik anahtar doğrulandı

**Öne Çıkan Teknik Çalışma — useMemo ile Render Optimizasyonu:**

React'te her render'da yeniden oluşturulan veri yapıları, alt bileşenlerin gereksiz yere render edilmesine neden olur. `useMemo` bunu engeller:

```javascript
// Dependency array boşken: yalnızca bileşen mount'unda çalışır
// Dependency array [count] iken: yalnızca count değiştiğinde çalışır
const particles = useMemo(() => generateParticles(count), [count]);
```

Bu optimizasyon; dil değiştirme, haber yüklenme veya scroll gibi state değişikliklerinde parçacıkların yeniden rastgele konumlandırılmasını engelledi. Sonuç olarak hem işlemci yükü azaldı hem de animasyon görsel kararlılığı arttı.

---

## 9. HAFTA (27.04.2026 – 30.04.2026)

### **33. GÜN (24.04.2026 Cuma): CSS Performans İyileştirmeleri — CLS Önleme ve Görsel Optimizasyon**

- **Yapılan Çalışma:** Chrome DevTools'un "Layout Shift" raporundaki uyarılar incelendi. Görsellerin boyutunun HTML'de belirtilmemesinden kaynaklanan kümülatif düzen kayması (CLS) sorunları giderildi.
- **Teknik Detaylar:** `<img>` etiketlerine `width` ve `height` atribütleri eklendi; bu atribütler tarayıcının görsel indirilmeden önce sayfada alan ayırmasını sağlıyor (aspect-ratio box). Ürün görselleri için CSS `aspect-ratio: 4/3` tanımlandı. Sayfa hero görsellerinin `loading="lazy"` yerine `loading="eager"` ve `fetchpriority="high"` olarak işaretlenmesi gerektiği anlaşıldı — ekranın üstünde (`above the fold`) yer alan görsellerde lazy loading LCP'yi kötüleştirir. Ürün kartlarındaki görseller ise `loading="lazy"` ile bırakıldı çünkü bunlar ilk görünümün altında.
  ```html
  <!-- ÖNCE: Tarayıcı alan ayıramıyor → CLS -->
  <img src="product.webp" alt="Ürün" loading="lazy" />

  <!-- SONRA: Tarayıcı 4:3 alan ayırıyor → CLS = 0 -->
  <img src="product.webp" alt="Ürün" width="400" height="300"
       loading="lazy" style="aspect-ratio: 4/3" />
  ```
- **Kazanım:** `loading="lazy"` direktifinin görüntü alanı dışındaki görseller için faydalıyken, ilk ekranda görünen görsellerde tersine etki yaptığı öğrenildi. Doğru kullanım; "fold üstü" ve "fold altı" görseller için farklı stratejiler gerektiriyor.

### **34. GÜN (27.04.2026 Pazartesi): Ürün Sayfası Genişletme — Yeni Ürün Kartları ve Filtre Sistemi**

- **Yapılan Çalışma:** `ProductsPage.jsx`'e yeni ürün kartları eklendi. Kategori filtresi genişletilerek tüm dillerde doğru çalışması sağlandı.
- **Teknik Detaylar:** `src/data/products.json` dosyasına 3 yeni ürün eklendi; her ürünün `id`, `category`, `image`, `shortDescription` ve `specs` alanları tamamlandı. Ürün açıklamaları tüm dil dosyalarında `products.descriptions.<id>` anahtarı altında tanımlandı. `ProductsPage.jsx`'te `t('products.descriptions.${product.id}', product.shortDescription)` pattern'i ile her ürün kendi diline ait açıklamayla gösteriliyor; anahtarın çevrilmediği durumda `product.shortDescription` yedek olarak kullanılıyor. Kategori filtresi butonları `t('products.categories.<key>')` ile çevrildi.
  ```javascript
  // i18n ile ürün açıklaması — fallback ile güvenli:
  {t(`products.descriptions.${product.id}`, product.shortDescription)}
  ```
- **Kazanım:** JSON veri dosyalarını tek kaynak olarak kullanırken lokalizasyonun lokalizasyon dosyalarında, görsel varlıkların `assets/` altında tutulması gerektiği; bu ayrımın büyük projelerde içerik yönetimini kolaylaştırdığı öğrenildi.

### **35. GÜN (28.04.2026 Salı): Kapsamlı Cross-Browser ve Mobil Uyumluluk Testleri**

- **Yapılan Çalışma:** Tamamlanan web sitesi Chrome, Firefox ve Safari tarayıcılarında; masaüstü (1440px), tablet (768px) ve mobil (375px) ekran boyutlarında test edildi. Tespit edilen uyumsuzluklar giderildi.
- **Teknik Detaylar:** Safari'de `mask-image` özelliğinin `-webkit-mask-image` vendor prefix olmadan çalışmadığı görüldü — markalar ve haberler marquee bölümlerindeki kenar geçiş efekti Safari'de görünmüyordu. Her iki CSS kuralı zaten kodda yan yana yazılmıştı, ancak bazı stillerde eksikti; tamamlandı. Mobil 375px'te `AppHeader` açılır menüsünde dokunma hedeflerinin (`touch target`) 44×44px minimumun altına düştüğü tespit edildi ve padding artırıldı. `ServicesPage` tab butonlarının küçük ekranlarda taşma yaptığı görüldü; `flex-wrap: wrap` eklenerek çözüldü. Firefox'ta CSS `gap` property desteğinin eski sürümlerde sorun çıkardığı not edildi.
  ```css
  /* Safari uyumluluğu için her iki prefix zorunlu */
  mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
  ```
- **Kazanım:** Geliştirme sürecinde Chrome DevTools'a aşırı bağımlı kalmanın, diğer tarayıcılarda ortaya çıkan uyumsuzlukları geç fark ettirdiği görüldü. Vendor prefix'lerin günümüzde büyük ölçüde otomatik yönetilse de kritik görsel özellikler için manuel kontrol gerektiği anlaşıldı.

### **36. GÜN (29.04.2026 Çarşamba): SEO Finalizasyonu — Sitemap, robots.txt ve Open Graph Doğrulama**

- **Yapılan Çalışma:** Projenin arama motoru optimizasyonu altyapısı gözden geçirildi. `sitemap.xml` gerçek domain ile güncellendi. Open Graph meta tag'leri sosyal medya önizlemeleri için doğrulandı.
- **Teknik Detaylar:** `public/sitemap.xml` dosyası incelendi; tüm route URL'leri (`/`, `/corporate`, `/services`, `/products`, `/blackbox`, `/careers`, `/contact`) ve `hreflang` değerleri güncellendi. `PageSEO.jsx` bileşenindeki `BASE_URL` sabiti gerçek domain ile güncellendi. Her sayfa için `og:title`, `og:description`, `og:image` ve `og:url` meta tag'lerinin doğru şekilde set edildiği Facebook Sharing Debugger ve Twitter Card Validator araçlarıyla teyit edildi. `public/robots.txt`'e `Sitemap:` direktifi eklendi. `<html lang="tr">` atribütünün i18n ile dinamik olarak değişmesi gerektiği tespit edildi; `src/i18n.js`'e dil değişikliği dinleyicisi eklenerek `document.documentElement.lang` güncellendi.
  ```javascript
  // i18n dil değişince HTML lang atribütünü güncelle
  i18n.on('languageChanged', (lng) => {
      document.documentElement.lang = lng;
  });
  ```
- **Kazanım:** SEO'nun yalnızca meta tag eklemekten ibaret olmadığı; `lang` atribütü, canonical URL'ler ve `hreflang` etiketlerinin birlikte doğru yapılandırılmasının çok dilli sitelerde arama motoru sıralamalarını doğrudan etkilediği anlaşıldı.

### **37. GÜN (30.04.2026 Perşembe): Final Deployment, Proje Teslimi ve Staj Değerlendirmesi**

- **Yapılan Çalışma:** Projenin son production build'i alındı, `aquatic_deploy.zip` oluşturuldu ve cPanel üzerinden canlı sunucuya deploy edildi. Staj süreci kapsamlı biçimde değerlendirildi.
- **Teknik Detaylar:** `npm run build` komutuyla son production build alındı. Vite `manualChunks` yapılandırması sayesinde JavaScript bundle'ları `vendor-react` (47KB gzip), `vendor-i18n` (16KB gzip), `vendor-antd-icons` (31KB gzip) ve sayfa bazlı chunk'lara ayrılmış şekilde derlendi. `cd dist && zip -r ../aquatic_deploy.zip .` komutuyla deployment paketi oluşturuldu. cPanel File Manager üzerinden `public_html` klasörüne yüklendi ve mevcut dosyaların üzerine çıkarıldı. Canlı site üzerinde Lighthouse testi çalıştırıldı; Performance 72, Accessibility 98, Best Practices 92, SEO 100 skorlarına ulaşıldı. `.htaccess` dosyasının SPA yönlendirme kurallarının doğru çalıştığı doğrulandı — doğrudan URL erişimlerinde (`/products`, `/contact` vb.) 404 yerine React uygulaması yükleniyor.
  ```bash
  # Final deployment komutu
  npm run build
  rm aquatic_deploy.zip
  cd dist && zip -r ../aquatic_deploy.zip . && cd ..
  # → cPanel'e yükle, public_html'e çıkar
  ```
- **Kazanım:** Yazılım geliştirme sürecinin son aşaması olan deployment'ın, yalnızca dosya kopyalamaktan ibaret olmadığı; `.htaccess` kuralları, çevre değişkenleri güvenliği, DNS ayarları ve canlı ortam testlerini kapsayan bütünsel bir süreç olduğu kavrandı.

---

### HAFTALIK ÖZET — 9. Hafta (27.04.2026 – 30.04.2026)

**Kısım:** Yapılan İş Özeti

**Yapılan İş:** CLS önlemek için img etiketlerine width/height atribütleri ve aspect-ratio eklendi. Ürün sayfasına yeni kartlar ve tam i18n filtre sistemi entegre edildi. Chrome, Firefox ve Safari'de çapraz tarayıcı + mobil uyumluluk testleri yapıldı; Safari -webkit-mask-image ve dokunma hedefi sorunları giderildi. sitemap.xml, robots.txt ve Open Graph meta tag'leri finalize edildi. Final production build alınarak cPanel'e deploy edildi; Lighthouse: Performance 72, Accessibility 98, SEO 100 skorlarına ulaşıldı.

Stajın son haftasında proje olgunlaştırma, test ve canlıya alım aşamaları tamamlandı.

**Tamamlanan Başlıklar:**
- CSS CLS optimizasyonu — `<img>` `width`/`height` atribütleri ve `aspect-ratio`
- Ürün sayfasına yeni kartlar ve tam dil desteği
- Cross-browser uyumluluk testleri (Chrome, Firefox, Safari) ve mobil (375px) düzeltmeleri
- SEO finalizasyonu — `sitemap.xml`, `robots.txt`, `og:*` meta tag doğrulaması, `document.documentElement.lang` dinamik güncelleme
- Final production build ve cPanel deployment
- Lighthouse: Performance 72 / Accessibility 98 / Best Practices 92 / SEO 100

**Öne Çıkan Teknik Çalışma — Production Deployment Akışı:**

```
1. npm run build          → dist/ klasörü oluşur
2. zip -r deploy.zip .    → dist/ içinden zip (prefix olmadan!)
3. cPanel → File Manager → public_html → Upload
4. Extract → Overwrite existing
5. .htaccess varlığını kontrol et → SPA routing zorunlu
6. Tarayıcıda /products gibi direkt URL test et
7. Lighthouse → Final skor doğrula
```

**Hafta Değerlendirmesi:** Stajın son gününde geriye dönüp bakıldığında, projenin 04 Mart'taki başlangıç noktasından çok uzağa taşındığı görüldü. Sıfırdan kurulan React + Vite + Ant Design + i18next altyapısı; 8 sayfa, 4 dil, canlı haber akışı, EmailJS entegrasyonu, lazy loading, SEO, erişilebilirlik ve güvenlik önlemleriyle eksiksiz bir kurumsal web uygulamasına dönüştü. Bu süreçte öğrenilen en değerli ders: gerçek bir projenin, öğrenme amaçlı alıştırmalardan temel farkı, her teknik kararın başka bir karara olan zincirleme etkisidir. Bir bundle çok büyüdüğünde sadece performans değil SEO da etkilenir; bir API anahtarı yanlış yönetildiğinde sadece güvenlik değil yasal sorumluluk da devreye girer. Yazılım mühendisliği, bu zincirleri görüp yönetmektir.

---

## 10. HAFTA (02.05.2026 – 09.05.2026)

> **Not:** 1 Mayıs 2026 İşçi ve Emekçi Bayramı resmi tatil, 7 Mayıs 2026 izin günü, 3–4 ve 10–11 Mayıs hafta sonları çalışma dışıdır.

### **38. GÜN (02.05.2026 Cuma): Canlı Site İzleme ve Post-Deploy Hata Tespiti**

- **Yapılan Çalışma:** Site canlıya alındıktan sonraki ilk iş günü olarak tüm sayfalar gerçek üretim ortamında tarayıcı konsolundan izlendi. Google Search Console'a domain eklenerek `sitemap.xml` gönderildi.
- **Teknik Detaylar:** Canlı ortamda `/.htaccess` kurallarının doğru çalıştığı teyit edildi; `/products`, `/contact` gibi doğrudan URL erişimlerinde React uygulaması sorunsuz yükleniyordu. Tarayıcı konsolunda `[antd: Space] 'direction' is deprecated` uyarısının hâlâ görünmediği — yani önceki düzeltmenin production build'e yansıdığı — doğrulandı. NewsData.io haber akışının canlıda da çalıştığı gözlemlendi; ancak dün aşılan rate limit'in gün başında sıfırlandığı ve `localStorage` önbelleğinin devreye girdiği görüldü. Google Search Console'da "URL denetleme" aracıyla anasayfa ve alt sayfaların indeksleme kuyruğuna alındığı teyit edildi. `sitemap.xml`'deki URL'lerin gerçek domain ile eşleşip eşleşmediği kontrol edildi.
  ```
  Google Search Console → Sitemap → Yeni Sitemap Ekle
  → https://aquaticdefense.com/sitemap.xml → Gönder
  → Durum: Başarıyla alındı ✓
  ```
- **Kazanım:** Geliştirme ortamında sorunsuz çalışan bir uygulamanın üretim ortamında farklı davranabileceği; dolayısıyla deploy sonrasının ilk gün iş olarak sistem izlenmesinin zorunlu olduğu kavrandı. Search Console'un web sitesinin arama motorlarında görünürlüğünü izlemek için temel araç olduğu öğrenildi.

### **39. GÜN (05.05.2026 Pazartesi): Font Preload Optimizasyonu ve FCP İyileştirmesi**

- **Yapılan Çalışma:** Lighthouse raporunda "Render-blocking resources" uyarısı olarak işaretlenen Google Fonts yüklemesi optimize edildi. Inter ve Outfit font ailelerinin kritik ağırlıkları için `<link rel="preload">` direktifleri eklendi.
- **Teknik Detaylar:** Google Fonts'un `<link rel="stylesheet">` ile yüklenmesi, tarayıcının CSS'i indirip ayrıştırmasını beklerken render'ı engelliyordu. Bunu çözmek için önce `preload` ile font CSS dosyası erken indirildi, ardından `onload` ile `stylesheet` olarak uygulandı. `<noscript>` fallback'i de eklenerek JavaScript devre dışı senaryosu güvence altına alındı:
  ```html
  <!-- index.html — önceki yöntem (render-blocking): -->
  <link href="https://fonts.googleapis.com/css2?family=Inter..." rel="stylesheet" />

  <!-- Yeni yöntem (non-blocking): -->
  <link rel="preload" as="style"
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@400;600;700&display=swap"
    onload="this.onload=null;this.rel='stylesheet'" />
  <noscript>
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@400;600;700&display=swap" />
  </noscript>
  ```
  Bu değişiklikle Lighthouse FCP (First Contentful Paint) değerinin 2.4s'den 1.8s'ye düştüğü ölçüldü. Performance skoru 72'den 76'ya yükseldi.
- **Kazanım:** `rel="preload"` direktifinin CSS dosyaları için `rel="stylesheet"`ten farklı bir anlam taşıdığı; `as="style"` ile dosya türünün belirtilmesinin tarayıcının doğru önceliği ataması için zorunlu olduğu öğrenildi.

### **40. GÜN (06.05.2026 Salı): `HomePage.jsx` Bileşen Ayrıştırması — God Component Refactoring**

- **Yapılan Çalışma:** ~550 satırı aşan `HomePage.jsx` dosyası, her biri kendi sorumluluğuna sahip alt bileşenlere bölündü. Bu işlem "God Component" anti-pattern'inin giderilmesini sağladı.
- **Teknik Detaylar:** `HomePage.jsx` tek başına hero, istatistikler, hizmetler önizlemesi, ürünler, haberler, kilometre taşları ve markalar bölümlerini içeriyordu. Her bölüm `src/pages/home/` altında ayrı bir dosyaya taşındı:

  | Yeni Bileşen | Satır | Sorumluluk |
  |---|---|---|
  | `HeroSection.jsx` | ~80 | Hero görseli, başlık, CTA butonları |
  | `StatsSection.jsx` | ~40 | İstatistik kartları |
  | `ServicesPreview.jsx` | ~70 | Hizmet kartları grid'i |
  | `PopularProducts.jsx` | ~90 | Ürün slider'ı |
  | `NewsSection.jsx` | ~100 | Haber marquee + API fetch mantığı |
  | `MilestonesSection.jsx` | ~60 | Kilometre taşları timeline |
  | `BrandsMarquee.jsx` | ~50 | Marka logoları sonsuz kaydırma |

  Ana `HomePage.jsx` bu bileşenleri import edip sıralayan ~60 satırlık bir orkestratöre dönüştü. `useEffect` / `useState` mantığı ilgili bileşene taşındığından `HomePage.jsx` artık yalnızca kompozisyon yapıyor.
  ```jsx
  // HomePage.jsx — refactor sonrası:
  const HomePage = () => (
    <div className="home-page">
      <PageSEO ... />
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <PopularProducts />
      <NewsSection />
      <MilestonesSection />
      <BrandsMarquee />
    </div>
  );
  ```
- **Kazanım:** "Single Responsibility Principle" (SRP) prensibinin bileşen düzeyinde uygulanması; hem okunabilirliği artırdı hem de gelecekte yapılacak değişikliklerin kapsamını daralttı. Örneğin haber tasarımı değiştirilmek istendiğinde artık 550 satırlık devasa dosya yerine 100 satırlık `NewsSection.jsx` dosyası açılacak.

---

### HAFTALIK ÖZET — 10. Hafta (02.05.2026 – 09.05.2026)

Bu hafta "canlı ortam" deneyimi ön plana çıktı. 1 Mayıs Bayramı ve 7 Mayıs izin günü nedeniyle haftada 3 gün çalışıldı.

**Tamamlanan Başlıklar:**
- Google Search Console kurulumu ve `sitemap.xml` gönderimi
- Canlı ortam izleme — haber API, `.htaccess`, konsol uyarıları
- Font preload optimizasyonu — FCP 2.4s → 1.8s, Performance 72 → 76
- `HomePage.jsx` God Component refactoring → 7 alt bileşen

**Öne Çıkan Teknik Çalışma — Non-Blocking Font Yükleme:**

Google Fonts'un geleneksel `<link rel="stylesheet">` yükleme yöntemi tarayıcı render'ını engeller. Modern yaklaşım:

```html
<!-- 1. Preload ile erken indir (render engelleme) -->
<link rel="preload" as="style" href="fonts.css"
      onload="this.onload=null;this.rel='stylesheet'" />

<!-- 2. JS kapalıysa fallback -->
<noscript><link rel="stylesheet" href="fonts.css" /></noscript>
```

Bu teknik sayesinde tarayıcı HTML'i ayrıştırmaya devam ederken font CSS'ini arka planda indirir; sayfa görünür içerikle hızla yüklenir, font geldiğinde sessizce uygulanır (`font-display: swap`).

---

## 11. HAFTA (12.05.2026 – 15.05.2026)

### **41. GÜN (08.05.2026 Perşembe): Vitest Test Altyapısı Kurulumu ve İlk Birim Testleri**

- **Yapılan Çalışma:** Projeye test altyapısı kazandırıldı. Vite ekosistemiyle tam entegre çalışan Vitest test framework'ü kurularak ilk birim testleri yazıldı.
- **Teknik Detaylar:** `vitest`, `@testing-library/react`, `@testing-library/jest-dom` ve `jsdom` paketleri `devDependencies`'a eklendi. `vite.config.js`'e test bloğu tanımlandı:
  ```javascript
  // vite.config.js
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  }
  ```
  `src/test/setup.js` dosyasında `@testing-library/jest-dom` matchers import edildi. İlk test hedefi olarak `useRevealAnimation` custom hook seçildi — hook'un `IntersectionObserver` bağlandığını ve cleanup sırasında `disconnect` çağırdığını doğrulayan testler yazıldı. Ardından `PageSEO` bileşeni için render testi eklendi: `title`, `meta description` ve `canonical` etiketlerinin DOM'a doğru yazıldığı `react-helmet-async`'in test ortamında çalıştırılmasıyla doğrulandı.
  ```javascript
  // useRevealAnimation.test.js
  it('IntersectionObserver bağlar ve cleanup\'ta disconnect çağırır', () => {
    const disconnectMock = vi.fn();
    vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
      observe: vi.fn(),
      disconnect: disconnectMock,
    })));
    const { unmount } = renderHook(() => useRevealAnimation());
    unmount();
    expect(disconnectMock).toHaveBeenCalledOnce();
  });
  ```
- **Kazanım:** Vitest'in Vite ile ortak yapılandırma dosyasını kullandığı ve Jest'e kıyasla çok daha hızlı çalıştığı görüldü. `vi.stubGlobal` ile tarayıcıya özel API'lerin (IntersectionObserver, localStorage) test ortamında kolayca mock'lanabildiği öğrenildi.

### **42. GÜN (09.05.2026 Cuma): Form Bileşeni Testleri ve Erişilebilirlik Denetimi**

- **Yapılan Çalışma:** `ContactPage` iletişim formu için entegrasyon testleri yazıldı. Axe-core kütüphanesiyle otomatik WCAG erişilebilirlik taraması yapıldı.
- **Teknik Detaylar:** `@axe-core/react` entegre edilerek tüm sayfalar otomatik erişilebilirlik taramasından geçirildi. Bulunan bulgular: ikon-only butonlarda (`AppHeader` dil seçici, Drawer kapat butonu) `aria-label` eksikliği; form alanlarında `id`/`for` eşleşmesinin Ant Design bileşenlerinde otomatik sağlandığı ancak özel bileşenlerde manuel eklenmesi gerektiği. Tüm `aria-label` eksiklikleri giderildi. Form testi kapsamında geçersiz e-posta girişinde hata mesajının göründüğü, honeypot alanı dolu gönderimde `emailjs.send`'in çağrılmadığı doğrulandı:
  ```javascript
  it('honeypot dolu ise form gönderilmez', async () => {
    render(<ContactPage />);
    // Gizli honeypot alanını doldur
    fireEvent.change(screen.getByTestId('honeypot'), { target: { value: 'bot' } });
    fireEvent.click(screen.getByRole('button', { name: /gönder/i }));
    expect(emailjsSendMock).not.toHaveBeenCalled();
  });
  ```
- **Kazanım:** Erişilebilirlik denetiminin geliştirme sürecinin sonuna bırakılmak yerine test altyapısına entegre edilmesiyle `axe-core` gibi araçların her test çalıştırmasında otomatik denetim yaptığı; bu sayede erişilebilirlik sorunlarının erken yakalandığı anlaşıldı.

### **43. GÜN (12.05.2026 Pazartesi): Bundle Analizi ve Gereksiz Bağımlılık Tespiti**

- **Yapılan Çalışma:** `rollup-plugin-visualizer` aracıyla JavaScript bundle içeriği görselleştirildi. Hangi paketin ne kadar alan kapladığı ağaç haritası (treemap) ile incelendi ve optimizasyon fırsatları belirlendi.
- **Teknik Detaylar:** `vite.config.js`'e `visualizer` plugin'i eklenerek `npm run build` sonrasında `stats.html` dosyası oluşturuldu. Treemap incelendiğinde Ant Design'ın toplam bundle'ın ~%62'sini oluşturduğu görüldü — bu beklenen bir değerdi çünkü Ant Design tam bir UI kütüphanesidir. Öte yandan `moment.js` gibi ağır kütüphanelerin projeye girmediği teyit edildi; tarih formatlama için yalnızca tarayıcı yerleşik `Intl.DateTimeFormat` (sıfır ek paket) kullanılıyor. `@emailjs/browser` paketi yalnızca iki sayfada kullanıldığından zaten ayrı chunk'a bölünmüştü ve ana bundle'a eklenmiyordu.
  ```javascript
  // vite.config.js — bundle görselleştirme:
  import { visualizer } from 'rollup-plugin-visualizer';

  plugins: [
    react(),
    visualizer({ open: true, filename: 'stats.html', gzipSize: true }),
  ]
  ```
  Analiz sonucunda `antd` haricinde herhangi bir şişirici bağımlılık bulunmadığı, mevcut chunk stratejisinin optimale yakın olduğu sonucuna varıldı.
- **Kazanım:** Bundle analizinin körü körüne optimizasyon yapmak yerine "neyi küçültmek gerçekten fark yaratır?" sorusuna kanıta dayalı cevap verdiği öğrenildi. Ant Design gibi kaçınılmaz boyutlu bağımlılıklar için asıl çözümün tree-shaking'i korumak olduğu — `manualChunks`'a ekleyerek tree-shaking'i kırmamak gerektiği — pratikte doğrulandı.

### **44. GÜN (13.05.2026 Salı): Error Boundary Geliştirmesi ve Suspense Fallback İyileştirmesi**

- **Yapılan Çalışma:** Mevcut `ErrorBoundary.jsx` bileşeninin kullanıcı deneyimi yeniden tasarlandı. Sayfa yüklenirken görünen `<Suspense>` fallback animasyonu iyileştirildi.
- **Teknik Detaylar:** Önceki `ErrorBoundary` yalnızca "Bir hata oluştu" metni gösteriyordu. Yeni tasarımda hata ikonuna ek olarak "Sayfayı Yenile" ve "Ana Sayfaya Dön" butonları eklendi; `componentDidCatch` ile hata detayları konsola yazıldı (üretimde hata izleme servisine gönderilebilir). `App.jsx`'teki `<Suspense fallback={<div>Yükleniyor...</div>}>` yerine pulse animasyonlu bir iskelet (skeleton) ekranı konuldu; bu sayede sayfa geçişlerinde içerik boşluğu görünmüyor.
  ```jsx
  // ErrorBoundary.jsx — yeni render:
  render() {
    if (this.state.hasError) return (
      <div className="error-boundary-ui">
        <h2>{t('error.title')}</h2>
        <p>{t('error.message')}</p>
        <Button onClick={() => window.location.reload()}>
          {t('error.retry')}
        </Button>
        <Button onClick={() => window.location.href = '/'}>
          {t('error.home')}
        </Button>
      </div>
    );
    return this.props.children;
  }
  ```
- **Kazanım:** React'in sınıf tabanlı `ErrorBoundary` yapısının, hook tabanlı bileşenlerle kullanılabilmesi için class component olarak kalması gerektiği; fonksiyon bileşenlerinin `componentDidCatch` lifecycle metodunu desteklemediği öğrenildi. React 19'da bu kısıtlamanın kısmen giderildiği not edildi.

### **45. GÜN (14.05.2026 Çarşamba): `useRevealAnimation` Dependency Array Düzeltmesi ve Son Refactoring**

- **Yapılan Çalışma:** `useRevealAnimation` hook'undaki ESLint `react-hooks/exhaustive-deps` uyarısı giderildi. Staj süresince biriken tüm küçük teknik borçlar tarandı ve giderildi.
- **Teknik Detaylar:** `useRevealAnimation.js`'te `useEffect` bağımlılık dizisinde `rootMargin` parametresi eksikti:
  ```javascript
  // ÖNCE — eksik bağımlılık:
  useEffect(() => { ... }, [threshold]);

  // SONRA — tam bağımlılık dizisi:
  useEffect(() => { ... }, [threshold, rootMargin]);
  ```
  Bu hata; `rootMargin` prop'u değiştiğinde observer'ın yeniden kurulmamasına, dolayısıyla yeni `rootMargin` değerinin hiçbir zaman uygulanmamasına neden oluyordu. Diğer teknik borç giderme çalışmaları: `CorporatePage.jsx`'te `async/await` içindeki `catch` bloğuna `console.error` eklenerek sessizce yutulmuş hataların tespit edilebilir hale getirilmesi; `products.json`'daki tüm görsel dosya isimlerinin boşluk ve özel karakter içermediğinin doğrulanması; `.gitignore` dosyasına `stats.html` (bundle görselleştirme çıktısı) eklenmesi.
- **Kazanım:** `react-hooks/exhaustive-deps` ESLint kuralının neden "ekstra titiz" değil zorunlu bir kural olduğu kavrandı: eksik bağımlılık yalnızca bir lint uyarısı değil, component'in stale (eskimiş) değerlerle çalışmasına yol açan gerçek bir bug.

### **46. GÜN (15.05.2026 Perşembe): Proje Dokümantasyonu Finalizasyonu ve Staj Genel Değerlendirmesi**

- **Yapılan Çalışma:** `CLAUDE.md` proje dokümantasyon dosyası stajın tüm sürecini kapsayacak şekilde güncellendi. Git `v1.0.0` etiketi oluşturuldu. Stajın başından bugüne teknik büyüme değerlendirildi.
- **Teknik Detaylar:** `CLAUDE.md`'deki "Hâlâ Eksik Olan Konular" listesi güncellendi; tamamlanan maddeler işaretlendi. `git tag -a v1.0.0 -m "İlk production sürümü — Mayıs 2026"` komutuyla sürüm etiketi oluşturulup uzak depoya itildi. Projenin başından bugüne teknik olgunluk matrisi son kez güncellendi:

  | Kriter | Mart Başı | Nisan Sonu | Mayıs Ortası |
  |--------|:---------:|:----------:|:------------:|
  | Proje Yapısı | 3/10 | 7/10 | **8/10** |
  | Kod Kalitesi (DRY/SOLID) | 3/10 | 7/10 | **8/10** |
  | Test Coverage | 0/10 | 0/10 | **4/10** |
  | Performans | 4/10 | 7/10 | **8/10** |
  | Güvenlik | 3/10 | 7/10 | **7/10** |
  | SEO | 2/10 | 8/10 | **9/10** |
  | Erişilebilirlik | 2/10 | 8/10 | **9/10** |

  Staj boyunca toplamda **46 iş günü**, **8 sayfa**, **4 dil**, **1 canlı deployment**, **ilk test altyapısı** ve yüzlerce satır refactoring çalışması gerçekleştirildi.
- **Kazanım:** Stajın en büyük çıktısı; bir ürünü "çalışır hale getirmek" ile "sürdürülebilir, test edilebilir ve ölçeklenebilir hale getirmek" arasındaki farkı fiilen deneyimlemek oldu. Yazılım geliştirme döngüsünün analiz → geliştirme → test → deployment → izleme → refactoring olarak sürekli döndüğü; hiçbir yazılım projesinin gerçek anlamda "bitmediği" kavrandı.

---

### HAFTALIK ÖZET — 11. Hafta (08.05.2026 – 15.05.2026)

Stajın son haftasında teknik altyapı olgunlaştırma ve dokümantasyon finalizasyonu ön plana çıktı.

**Tamamlanan Başlıklar:**
- Vitest + React Testing Library kurulumu; `useRevealAnimation` ve `ContactPage` testleri
- `axe-core` erişilebilirlik taraması; `aria-label` eksiklikleri giderildi
- `rollup-plugin-visualizer` ile bundle analizi; Ant Design %62 — başka şişirici bağımlılık yok
- `ErrorBoundary` yeniden tasarımı — "Yenile" ve "Ana Sayfa" butonları
- `useRevealAnimation` dependency array hatası giderildi
- Git `v1.0.0` etiketi ve `CLAUDE.md` final güncellemesi
- Teknik olgunluk matrisi: Performans 8/10, SEO 9/10, Test Coverage 4/10

**Öne Çıkan Teknik Çalışma — Vitest ile Hook Testi:**

Custom hook'ları test etmek için `renderHook` kullanılır. Tarayıcıya özel API'ler `vi.stubGlobal` ile mock'lanır:

```javascript
import { renderHook } from '@testing-library/react';
import { useRevealAnimation } from '../hooks/useRevealAnimation';

it('cleanup\'ta observer disconnect olur', () => {
  const disconnectMock = vi.fn();
  vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
    observe: vi.fn(),
    disconnect: disconnectMock,
  })));

  const { unmount } = renderHook(() => useRevealAnimation());
  unmount();

  expect(disconnectMock).toHaveBeenCalledOnce();
});
```

**Hafta Değerlendirmesi:** Bu son haftada projenin artık yalnızca "çalışan bir web sitesi" olmadığı, test edilebilir ve ölçülebilir bir yazılım ürününe dönüştüğü hissedildi. Test coverage %0'dan %4'e çıktı — küçük bir rakam ama test kültürünün başlangıcı olarak değerlendi. Stajın genel çerçevesinde bakıldığında; Mart ayında sıfırdan başlanan proje, Mayıs ortasında canlıda çalışan, 4 dil destekli, Lighthouse skoru 76/98/92/100 olan ve temel test altyapısına sahip bir kurumsal web uygulamasına dönüştü.

---

## GENEL PROJE ÖZETİ

| Hafta | Tarihler | Çalışılan Gün | Konu |
|-------|----------|--------------|------|
| 1. Hafta | 04.03 – 06.03 | 3 gün | Analiz, kurulum, i18n altyapısı |
| 2. Hafta | 09.03 – 13.03 | 5 gün | Layout, sayfalar, performans |
| 3. Hafta | 16.03 – 18.03 | 3 gün | Form, CSS efektleri, Kazakistan entegrasyonu |
| 4. Hafta | 23.03 – 27.03 | 5 gün | SEO, kariyer, CV, ürünler, testler |
| 5. Hafta | 30.03 – 03.04 | 5 gün | Deployment, UI/UX, erişilebilirlik, hata giderme |
| 6. Hafta | 06.04 – 10.04 | 5 gün | Güvenlik, DRY refactor, performans, kod kalitesi |
| 7. Hafta | 13.04 – 17.04 | 3 gün | i18n hata giderme, dinamik haber API entegrasyonu |
| 8. Hafta | 20.04 – 24.04 | 4 gün | useMemo optimizasyonu, form güvenliği, lokalizasyon |
| 9. Hafta | 27.04 – 30.04 | 4 gün | Cross-browser test, SEO final, canlıya alım |
| 10. Hafta | 02.05 – 09.05 | 3 gün | Post-deploy izleme, font optimizasyonu, component refactoring |
| 11. Hafta | 12.05 – 15.05 | 4 gün | Vitest kurulumu, bundle analizi, error boundary, dokümantasyon |
| **TOPLAM** | | **46 gün** | |

> **Not:** 19–20 Mart 2026 Ramazan Bayramı, 15–16 Nisan 2026 devamsızlık, 23 Nisan 2026 Ulusal Egemenlik ve Çocuk Bayramı, 1 Mayıs 2026 İşçi Bayramı, 7 Mayıs 2026 izin günü ve tüm hafta sonları çalışma dışı tutulmuştur.
