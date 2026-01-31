# Proje Türü Özelliği - Uygulama Planı

## Özet
Kullanıcıların prompt oluştururken "Proje Türü" seçebileceği yeni bir parametre eklenmesi. Bu parametre, Target AI ve Complexity gibi bir dropdown menü olacak ve AI'ın yanıtını etkileyecek.

## Proje Türü Seçenekleri

| ID | Değer | İngilizce Etiket | Türkçe Etiket | Açıklama |
|----|-------|------------------|---------------|----------|
| 1 | webApp | Web Application | Web Uygulaması | Web tabanlı uygulamalar ve siteler |
| 2 | mobileGame | Mobile Game | Mobil Oyun | Mobil platform oyunları |
| 3 | dataAnalysis | Data Analysis | Veri Analizi | Veri analizi ve görselleştirme |
| 4 | desktopApp | Desktop Application | Masaüstü Uygulaması | Bilgisayar için uygulamalar |
| 5 | api | API / Backend | API / Backend | API ve backend servisleri |
| 6 | aiMl | AI / Machine Learning | AI / Makine Öğrenmesi | Yapay zeka ve ML projeleri |
| 7 | ecommerce | E-commerce | E-ticaret | Online satış platformları |
| 8 | iot | IoT / Embedded | IoT / Gömülü Sistem | Nesnelerin interneti projeleri |
| 9 | blockchain | Blockchain / Web3 | Blockchain / Web3 | Blok zinciri tabanlı projeler |
| 10 | contentPlatform | Content Platform | İçerik Platformu | Blog, sosyal medya, içerik siteleri |
| 11 | automation | Automation / Script | Otomasyon / Script | Otomasyon ve script projeleri |
| 12 | other | Other | Diğer | Diğer proje türleri |

## Uygulama Adımları

### 1. Veri Dosyası Oluşturma (src/data/projectTypes.js)
```javascript
export const projectTypes = [
  {
    id: 'webApp',
    value: 'webApp',
    labelKey: 'projectTypes.webApp',
    descriptionKey: 'projectTypes.webAppDesc',
    icon: 'Globe',
  },
  // ... diğer türler
];
```

### 2. Çeviri Dosyası Güncellemesi (src/i18n/translations.js)
İngilizce ve Türkçe çeviriler eklenecek:
- projectTypes.webApp, projectTypes.webAppDesc, vb.
- projectTypeLabel, projectTypeHint

### 3. InputLaboratory Bileşeni Güncellemesi (src/components/InputLaboratory.jsx)
- Proje türü state'i ekle: `const [projectType, setProjectType] = useState(initialProjectType)`
- Dropdown bileşeni ekle (Target AI ve Output Language ile aynı stilde)
- İkon: Briefcase veya Layers
- handleSubmit ve handleRandomize fonksiyonlarına projectType ekle

### 4. App.jsx Güncellemesi
- inputState'e projectType ekle
- handleGenerate ve handleRandomize fonksiyonlarına projectType parametresi ekle
- handleSelectTemplate fonksiyonuna varsayılan proje türü ekle

### 5. Gemini Servis Güncellemesi (src/services/geminiService.js)
- generatePrompt fonksiyonuna projectType parametresi ekle
- formatUserRequest fonksiyonuna proje türü bilgisi ekle
- Sistem talimatına proje türüne göre özelleştirme ekle

### 6. Şablonlar Güncellemesi (src/data/promptTemplates.js)
- Her şablona varsayılan proje türü ekle (örn: blogPost → contentPlatform, reactComponent → webApp)

## UI Yerleşimi

InputLaboratory formunda şu sıralama olacak:
1. Topic (metin alanı)
2. Target AI (dropdown)
3. **Project Type (dropdown) - YENİ**
4. Output Language (dropdown)
5. Notebook LM Mode (tab - sadece NotebookLM seçiliyse)
6. Complexity Slider
7. Generate/Randomize butonları

## Gemini Prompt Entegrasyonu

Proje türü, Gemini'ye şu şekilde iletilecek:

```
Konu: [Kullanıcı konusu]
Proje Türü: [Seçilen proje türü adı]
Karmaşıklık: [1-10]
Hedef AI: [AI adı]
...
```

Sistem talimatında proje türüne göre şu yönlendirmeler eklenecek:
- webApp: Modern web teknolojileri, responsive tasarım, SEO
- mobileGame: Oyun mekaniği, UX/UI, performans optimizasyonu
- dataAnalysis: Veri işleme, görselleştirme, istatistiksel analiz
- vb.

## Dosya Değişiklikleri

| Dosya | Değişiklik Türü | Açıklama |
|-------|-----------------|----------|
| src/data/projectTypes.js | Yeni | Proje türü verileri |
| src/i18n/translations.js | Güncelleme | Çeviri metinleri |
| src/components/InputLaboratory.jsx | Güncelleme | Dropdown UI |
| src/App.jsx | Güncelleme | State yönetimi |
| src/services/geminiService.js | Güncelleme | API entegrasyonu |
| src/data/promptTemplates.js | Güncelleme | Varsayılan değerler |

## Bağımlılıklar

Yeni ikonlar için lucide-react'ten import edilecek:
- Briefcase (Proje Türü için ana ikon)
- Globe, Gamepad2, BarChart3, Monitor, Server, Brain, ShoppingCart, Cpu, Link, FileText, Zap, Box (Seçenek ikonları)
