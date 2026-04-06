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

## GENEL PROJE ÖZETİ

| Hafta | Tarihler | Çalışılan Gün | Konu |
|-------|----------|--------------|------|
| 1. Hafta | 04.03 – 06.03 | 3 gün | Analiz, kurulum, i18n altyapısı |
| 2. Hafta | 09.03 – 13.03 | 5 gün | Layout, sayfalar, performans |
| 3. Hafta | 16.03 – 18.03 | 3 gün | Form, CSS efektleri, Kazakistan entegrasyonu |
| 4. Hafta | 23.03 – 27.03 | 5 gün | SEO, kariyer, CV, ürünler, testler |
| 5. Hafta | 30.03 – 03.04 | 5 gün | Deployment, UI/UX, erişilebilirlik, hata giderme |
| 6. Hafta | 06.04 – 10.04 | 5 gün | Güvenlik, DRY refactor, performans, kod kalitesi |
| **TOPLAM** | | **26 gün** | |

> **Not:** 19–20 Mart 2026 tarihleri Ramazan Bayramı resmi tatili, 21–22 Mart ve diğer hafta sonları çalışma dışı tutulmuştur.
