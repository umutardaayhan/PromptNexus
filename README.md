# PromptNexus v1.1 ⚡

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

🌐 **Live Demo / Canlı Site:** [https://prompt-nexus-one.vercel.app] 

> <div align="center">
  <h3>
    <a href="#-english">🇬🇧 English</a> | 
    <a href="#-türkçe">🇹🇷 Türkçe</a>
  </h3>
</div>

---

## 🇬🇧 English

**Gemini-Powered AI Prompt Generator**

PromptNexus is a modern web application that transforms your ideas into professional, optimized AI commands. It uses Google's Gemini 2.5 Flash model to generate high-quality prompts.

### 🚀 v1.1 Features

- 🤖 **Gemini 2.5 Flash Integration** - Powerful Google AI model support
- 🎨 **Deep Space Theme** - Modern, dark theme with easy-on-the-eyes interface
- ⚡ **Fast & Responsive** - Instant prompt generation
- 🎯 **Multi-AI Support** - Optimized for ChatGPT, Claude, Midjourney, DALL-E, Gemini, and Notebook LM
- 💻 **IDE Agent Support** - Special support for Cursor, KiloCode, GitHub Copilot, Windsurf, and Antigravity
- 🌡️ **Creativity Temperature** - Adjust complexity level (1-10)
- 🌍 **Multi-Language Output** - Generate prompts in 12 different languages
- 📚 **29 Prompt Templates** - Ready-made templates with i18n support (English & Turkish)
- 🎲 **Random Prompt Generator** - Generate creative, unexpected prompts based on your inputs
- 📋 **Template Selection Indicator** - See and clear selected templates with one click
- 💾 **Secure API Management** - Your API key is stored locally in your browser
- 📊 **Rate Limit Tracking** - Daily API usage counter with localStorage persistence
- 📋 **Easy Copy** - One-click prompt copying
- 💫 **Framer Motion Animations** - Smooth user experience
- 📥 **Download Prompts** - Save prompts as text files
- 🌐 **Full i18n Support** - Complete Turkish and English localization

### 🆕 What's New in v1.1

- **Dynamic Prompt Templates** - All 29 templates now support i18n (English & Turkish)
- **Template Selection UI** - Visual indicator for selected templates with clear button
- **Rate Limit Persistence** - API usage counter now persists across page refreshes
- **Improved Notebook LM** - Deep Research mode now generates research sentences based on user input
- **Random Button Fix** - Randomize button now respects selected templates and user inputs

### 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Library |
| Vite | 5.4.11 | Build Tool |
| Tailwind CSS | 3.4.17 | Styling Framework |
| Framer Motion | 11.15.0 | Animations |
| Google Generative AI | 0.21.0 | Gemini API Integration |
| Lucide React | 0.469.0 | Icons |

### 🎨 Theme Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| Background | `#0B0C10` | Main background |
| Card | `#1F2833` | Card backgrounds |
| Neon Cyan | `#66FCF1` | Accent color |
| Dark Cyan | `#45A29E` | Secondary accent |
| Primary Text | `#C5C6C7` | Headings and text |

### 🚀 Getting Started

#### Prerequisites

- Node.js 18+
- Google AI Studio API Key (Free)

#### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/umutardaayhan/PromptNexus.git
   cd PromptNexus
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

#### Getting an API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key" button
3. Generate a new API key
4. Paste it in the "Settings" section of the PromptNexus app

### 📁 Project Structure

```
PromptNexus/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Top navigation
│   │   ├── HeroSection.jsx  # Hero section
│   │   ├── InputLaboratory.jsx  # Input form
│   │   ├── ComplexitySlider.jsx # Complexity slider
│   │   ├── ResultTerminal.jsx   # Result terminal
│   │   ├── SettingsModal.jsx    # Settings modal
│   │   ├── TemplateGallery.jsx  # Template browser
│   │   ├── HistoryPanel.jsx     # Prompt history
│   │   ├── FavoritesPanel.jsx   # Favorite prompts
│   │   ├── RateLimitIndicator.jsx # API usage display
│   │   ├── Toast.jsx        # Notifications
│   │   └── Footer.jsx       # Footer
│   ├── hooks/
│   │   ├── useLocalStorage.js   # localStorage hook
│   │   ├── useLanguage.js       # i18n hook
│   │   ├── usePromptHistory.js  # History management
│   │   ├── useFavorites.js      # Favorites management
│   │   └── useRateLimit.js      # Rate limit tracking
│   ├── services/
│   │   └── geminiService.js     # Gemini API service
│   ├── data/
│   │   └── promptTemplates.js   # Template definitions
│   ├── i18n/
│   │   └── translations.js      # Language translations
│   ├── App.jsx              # Main application
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

### 🔒 Security

- Your API key is stored **only** in your browser's `localStorage`
- The key is never sent to any server; requests go directly to the Gemini API
- No API keys are hardcoded in the code

### 📝 Usage

1. **Enter API Key:** Click the "Settings" button in the top right to enter your API key
2. **Write Your Topic:** Describe what you want to create a prompt about
3. **Select Target AI:** Choose which AI model to optimize for
4. **Adjust Temperature:** Set the complexity level (1-10)
5. **Select Output Language:** Choose the language for the generated prompt
6. **Use Templates (Optional):** Click "Templates" to choose from 29 ready-made templates
7. **Generate:** Click the "Generate Prompt" button
8. **Copy:** Copy the result with one click or download as a file

### 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss changes.

---

## 🇹🇷 Türkçe

**Gemini Destekli AI Prompt Oluşturucu**

PromptNexus, fikirlerinizi profesyonel, optimize edilmiş AI komutlarına dönüştüren modern bir web uygulamasıdır. Google'ın Gemini 2.5 Flash modelini kullanarak yüksek kaliteli promptlar oluşturur.

### 🚀 v1.1 Özellikleri

- 🤖 **Gemini 2.5 Flash Entegrasyonu** - Güçlü Google AI modeli desteği
- 🎨 **Derin Uzay Teması** - Modern, koyu tema ile göz yormayan arayüz
- ⚡ **Hızlı ve Duyarlı** - Anında prompt oluşturma
- 🎯 **Çoklu AI Desteği** - ChatGPT, Claude, Midjourney, DALL-E, Gemini ve Notebook LM için optimize
- 💻 **IDE Agent Desteği** - Cursor, KiloCode, GitHub Copilot, Windsurf ve Antigravity için özel destek
- 🌡️ **Yaratıcı Sıcaklık** - Karmaşıklık seviyesini ayarlama (1-10)
- 🌍 **Çoklu Dil Çıktısı** - 12 farklı dilde prompt oluşturma
- 📚 **29 Prompt Şablonu** - i18n destekli hazır şablonlar (İngilizce & Türkçe)
- 🎲 **Rastgele Prompt Oluşturucu** - Girdilerinize göre yaratıcı, beklenmedik promptlar
- 📋 **Şablon Seçim Göstergesi** - Seçili şablonları görüntüleme ve tek tıkla temizleme
- 💾 **Güvenli API Yönetimi** - API anahtarınız tarayıcınızda yerel saklanır
- 📊 **Limit Takibi** - localStorage ile günlük API kullanım sayacı
- 📋 **Kolay Kopyalama** - Tek tıkla prompt kopyalama
- 💫 **Framer Motion Animasyonları** - Akıcı kullanıcı deneyimi
- 📥 **Prompt İndirme** - Promptları metin dosyası olarak kaydetme
- 🌐 **Tam i18n Desteği** - Tam Türkçe ve İngilizce yerelleştirme

### 🆕 v1.1'de Yenilikler

- **Dinamik Prompt Şablonları** - Tüm 29 şablon artık i18n destekliyor (İngilizce & Türkçe)
- **Şablon Seçim Arayüzü** - Seçili şablonlar için görsel gösterge ve temizleme butonu
- **Limit Kalıcılığı** - API kullanım sayacı artık sayfa yenilemelerinde korunuyor
- **Geliştirilmiş Notebook LM** - Deep Research modu artık kullanıcı girdisine göre araştırma cümleleri oluşturuyor
- **Rastgele Buton Düzeltmesi** - Rastgele butonu artık seçili şablonlara ve kullanıcı girdilerine saygı gösteriyor

### 🛠️ Teknolojiler

| Teknoloji | Versiyon | Amaç |
|-----------|----------|------|
| React | 18.3.1 | UI Kütüphanesi |
| Vite | 5.4.11 | Build Aracı |
| Tailwind CSS | 3.4.17 | Stil Framework'ü |
| Framer Motion | 11.15.0 | Animasyonlar |
| Google Generative AI | 0.21.0 | Gemini API Entegrasyonu |
| Lucide React | 0.469.0 | İkonlar |

### 🎨 Tema Renkleri

| Renk | Hex Kodu | Kullanım |
|------|----------|----------|
| Arka Plan | `#0B0C10` | Ana arka plan |
| Kart | `#1F2833` | Kart arka planları |
| Neon Camgöbeği | `#66FCF1` | Vurgu rengi |
| Koyu Camgöbeği | `#45A29E` | İkincil vurgu |
| Ana Metin | `#C5C6C7` | Başlıklar ve metin |

### 🚀 Başlangıç

#### Gereksinimler

- Node.js 18+
- Google AI Studio API Anahtarı (Ücretsiz)

#### Kurulum

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/umutardaayhan/PromptNexus.git
   cd PromptNexus
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

4. **Tarayıcıda açın:**
   ```
   http://localhost:3000
   ```

#### API Anahtarı Alma

1. [Google AI Studio](https://aistudio.google.com/app/apikey)'ya gidin
2. "Create API Key" butonuna tıklayın
3. Yeni bir API anahtarı oluşturun
4. PromptNexus uygulamasında "Ayarlar" bölümüne yapıştırın

### 📁 Proje Yapısı

```
PromptNexus/
├── src/
│   ├── components/          # React bileşenleri
│   │   ├── Header.jsx       # Üst navigasyon
│   │   ├── HeroSection.jsx  # Kahraman bölümü
│   │   ├── InputLaboratory.jsx  # Giriş formu
│   │   ├── ComplexitySlider.jsx # Karmaşıklık kaydırıcısı
│   │   ├── ResultTerminal.jsx   # Sonuç terminali
│   │   ├── SettingsModal.jsx    # Ayarlar modalı
│   │   ├── TemplateGallery.jsx  # Şablon tarayıcı
│   │   ├── HistoryPanel.jsx     # Prompt geçmişi
│   │   ├── FavoritesPanel.jsx   # Favori promptlar
│   │   ├── RateLimitIndicator.jsx # API kullanım gösterimi
│   │   ├── Toast.jsx        # Bildirimler
│   │   └── Footer.jsx       # Alt bilgi
│   ├── hooks/
│   │   ├── useLocalStorage.js   # localStorage hook'u
│   │   ├── useLanguage.js       # i18n hook'u
│   │   ├── usePromptHistory.js  # Geçmiş yönetimi
│   │   ├── useFavorites.js      # Favoriler yönetimi
│   │   └── useRateLimit.js      # Limit takibi
│   ├── services/
│   │   └── geminiService.js     # Gemini API servisi
│   ├── data/
│   │   └── promptTemplates.js   # Şablon tanımları
│   ├── i18n/
│   │   └── translations.js      # Dil çevirileri
│   ├── App.jsx              # Ana uygulama
│   ├── main.jsx             # Giriş noktası
│   └── index.css            # Global stiller
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

### 🔒 Güvenlik

- API anahtarınız **sadece** tarayıcınızın `localStorage`'ında saklanır
- Anahtar hiçbir sunucuya gönderilmez, doğrudan Gemini API'ye istek yapılır
- Hiçbir API anahtarı kodda sabit olarak yazılmamıştır

### 📝 Kullanım

1. **API Anahtarı Girin:** Sağ üstteki "Ayarlar" butonuna tıklayarak API anahtarınızı girin
2. **Konunuzu Yazın:** Ne hakkında prompt oluşturmak istediğinizi açıklayın
3. **Hedef AI Seçin:** Hangi AI modeli için optimize edileceğini seçin
4. **Sıcaklık Ayarlayın:** Karmaşıklık seviyesini (1-10) ayarlayın
5. **Çıktı Dilini Seçin:** Oluşturulan promptun dilini seçin
6. **Şablon Kullanın (İsteğe Bağlı):** "Şablonlar" butonuna tıklayarak 29 hazır şablondan seçim yapın
7. **Oluşturun:** "Prompt Oluştur" butonuna tıklayın
8. **Kopyalayın:** Sonucu tek tıkla kopyalayın veya dosya olarak indirin

### 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen önce bir issue açarak değişiklikleri tartışın.

---

## 📄 License / Lisans

This project is licensed under the MIT License. / Bu proje MIT lisansı altında lisanslanmıştır.

---

## 📝 Changelog / Değişiklik Günlüğü

### v1.1 (2026-01-31)
- ✨ Added dynamic prompt templates with i18n support (29 templates)
- ✨ Added template selection indicator with clear button
- ✨ Added rate limit persistence across page refreshes
- ✨ Improved Notebook LM Deep Research mode
- ✨ Fixed randomize button to respect templates and inputs
- 🌐 Full Turkish and English localization
- 🐛 Various bug fixes and improvements

### v1.0 (2025)
- 🎉 Initial release
- 🤖 Gemini 2.5 Flash integration
- 🎯 Multi-AI support
- 🌡️ Complexity slider
- 🌍 Multi-language output
- 💾 Secure API management

---

<p align="center">
  <sub>Made with ❤️ by <a href="https://github.com/umutardaayhan">@umutardaayhan</a></sub>
</p>
<p align="center">
  <sub>PromptNexus ⚡ 2025</sub>
</p>
