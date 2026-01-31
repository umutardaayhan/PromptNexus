import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Gemini API Servisi
 * PromptNexus uygulaması için Google Generative AI entegrasyonu
 */

const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Sistem talimatı - Prompt mühendisi rolü
 */
const SYSTEM_INSTRUCTION = `
    Rolün: Sen "Mimar"sın. Dünyanın en gelişmiş Yapay Zeka Prompt Mühendisisin. Görevin, GPT-4, Claude 3.5 veya Midjourney gibi modeller için "Usta İşi" promptlar hazırlamak.

    GÖREVİN:
    Kullanıcıdan gelen basit, kısa veya üstünkörü istekleri al; bunları CO-STAR tekniği (Bağlam, Amaç, Stil, Ton, Hedef Kitle, Yanıt) ile donatılmış, profesyonel ve detaylı promptlara dönüştür.

    KRİTİK KURALLAR:
    1. ASLA "Şunun hakkında yaz" gibi basit cevaplar verme. Otoriter ve yönlendirici ol.
    2. YAPI HER ŞEYDİR. Çıktın her zaman başlıklar, maddeler ve net kısıtlamalar içermeli.
    3. MODEL SEÇİMİNE DİKKAT ET: Eğer kullanıcı "Kodlama" istediyse teknik terimler (Clean Code, SOLID prensipleri) ekle. Eğer "Görsel" istediyse (Midjourney) kamera açıları ve ışıklandırma detayları ekle.
    4. SİHİRLİ DEĞİŞKENLER: Promptun tekrar kullanılabilir olması için [Konu Buraya], [Hedef Kitle] gibi köşeli parantez içinde yer tutucular ekle.
    5. HEDEF MODEL ÖZELLEŞTİRMESİ:
       - EĞER Hedef Model "Claude" veya "GPT-4" ise ve konu web/yazılım ise:
         Promptun sonuna MUTLAKA teknik bir "Implementation Plan" (Uygulama Planı) ekle.
         Şunları zorunlu kıl: 
         a) Modern Tech Stack (Next.js, Tailwind, vb.)
         b) Renk kodları (Hex codes) ve Tipografi.
         c) "Artifact" kullanımı (Claude için) veya tam kod blokları.
         d) Çıktının sadece metin değil, "Kopyalanabilir Kod" odaklı olmasını emret.
       - EĞER Hedef Model "Cursor", "Antigravity", "KiloCode", "GitHubCopilot" veya "Windsurf" ise:
         Bu araçlar kod editörü/agent IDE'lerdir. Prompt şunları içermeli:
         a) Proje yapısı ve dosya organizasyonu önerileri
         b) Kodlama standartları ve best practices
         c) Terminal komutları ve kurulum talimatları
         d) Debugging ve test stratejileri
         e) Context-aware kod önerileri için gerekli bağlam bilgisi

    ---
    DÖNÜŞÜM ÖRNEĞİ (Bunu Referans Al):
    
    Kullanıcı Girdisi: "Kahve hakkında blog yazısı."
    
    SENİN ÇIKTIN (Üretilecek Prompt):
    "Dünya çapında ödüllü bir Barista ve Metin Yazarı gibi davranmanı istiyorum.
    
    BAĞLAM (CONTEXT): Gurme içecekler ve yaşam tarzı üzerine yayın yapan prestijli bir dergi için yazıyorsun.
    AMAÇ (OBJECTIVE): 'Üçüncü Dalga Kahve Akımı' hakkında okuyucuyu büyüleyen, 1500 kelimelik detaylı bir makale yazmak.
    TON (TONE): Sofistike, duyusal, eğitici ama samimi.
    
    YAPI:
    1. Giriş: Taze çekilmiş kahve kokusunu betimleyerek okuyucuyu yakala.
    2. Gelişme: Kahvenin tarladan fincana yolculuğunu, demleme bilimini (Extraction Yield) anlat.
    3. Sonuç: Bilinçli tüketim için bir çağrı yap.
    
    KISITLAMALAR:
    - 'Harika bir içecek' gibi klişe laflardan kaçın.
    - 'Roast profile', 'Single origin' gibi teknik terimleri yerinde kullan."
    ---

    ŞİMDİ: Kullanıcının isteği için bu kalitede bir prompt üret.
    ÇIKTI FORMATI: Sadece ve sadece ürettiğin prompt metnini ver. Sohbet etme, giriş cümlesi (İşte promptunuz vb.) yazma.
    `;

/**
 * Gemini API istemcisini oluşturur
 * @param {string} apiKey - Gemini API anahtarı
 * @returns {GoogleGenerativeAI} Gemini istemcisi
 */
export const createGeminiClient = (apiKey) => {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('API anahtarı gereklidir');
  }
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Prompt oluşturma isteği gönderir
 * @param {Object} params - İstek parametreleri
 * @param {string} params.apiKey - Gemini API anahtarı
 * @param {string} params.topic - Kullanıcının konusu
 * @param {number} params.complexity - Karmaşıklık seviyesi (1-10)
 * @param {string} params.targetAI - Hedef AI modeli (ChatGPT, Midjourney, Claude)
 * @param {string} params.outputLanguage - Çıktı dili (Türkçe, English, vb.)
 * @returns {Promise<string>} Oluşturulan prompt
 */
export const generatePrompt = async ({ apiKey, topic, complexity, targetAI, outputLanguage = 'Türkçe' }) => {
  try {
    const genAI = createGeminiClient(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      systemInstruction: SYSTEM_INSTRUCTION
    });

    // Kullanıcı isteğini formatla
    const userPrompt = formatUserRequest(topic, complexity, targetAI, outputLanguage);

    console.log('API isteği gönderiliyor...', { topic, complexity, targetAI });
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    });
    
    console.log('API yanıtı alındı:', result);
    
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error('Gemini API Hatası - Detaylar:', error);
    console.error('Hata tipi:', error.name);
    console.error('Hata mesajı:', error.message);
    throw handleApiError(error);
  }
};

/**
 * Kullanıcı isteğini formatlar
 * @param {string} topic - Kullanıcının konusu
 * @param {number} complexity - Karmaşıklık seviyesi (1-10)
 * @param {string} targetAI - Hedef AI modeli
 * @param {string} outputLanguage - Çıktı dili
 * @returns {string} Formatlanmış istek
 */
const formatUserRequest = (topic, complexity, targetAI, outputLanguage = 'Türkçe') => {
  const complexityDescription = getComplexityDescription(complexity);
  
  return `Konu: ${topic}
Karmaşıklık: ${complexity}/10 - ${complexityDescription}
Hedef AI: ${targetAI}
Çıktı Dili: ${outputLanguage}

Yukarıdaki bilgilere göre optimize edilmiş bir prompt oluşturun. 

ÖNEMLİ: Oluşturacağın prompt MUTLAKA ${outputLanguage} dilinde olmalıdır. Eğer çıktı dili 'English' ise tüm prompt İngilizce, 'Türkçe' ise Türkçe olmalıdır.`;
};

/**
 * Karmaşıklık seviyesine göre açıklama döndürür
 * @param {number} complexity - Karmaşıklık seviyesi (1-10)
 * @returns {string} Açıklama
 */
const getComplexityDescription = (complexity) => {
  if (complexity <= 3) {
    return 'Basit, direkt ve net bir prompt';
  } else if (complexity <= 6) {
    return 'Orta seviye detay ve bağlam içeren prompt';
  } else if (complexity <= 8) {
    return 'Detaylı, çok yönlü ve kapsamlı prompt';
  } else {
    return 'Son derece detaylı, uzman seviyesinde prompt';
  }
};

/**
 * API hatalarını işler ve kullanıcı dostu mesajlar döndürür
 * @param {Error} error - API hatası
 * @returns {Error} İşlenmiş hata
 */
const handleApiError = (error) => {
  const errorMessage = error.message || '';
  
  // API anahtarı hataları
  if (errorMessage.includes('API key') || errorMessage.includes('api key')) {
    return new Error('Geçersiz API anahtarı. Lütfen Google AI Studio\'dan ücretsiz bir API anahtarı alın.');
  }
  
  // Rate limit hataları
  if (errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
    return new Error('API kullanım limiti aşıldı. Lütfen daha sonra tekrar deneyin.');
  }
  
  // Ağ hataları
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return new Error('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.');
  }
  
  // Genel hata
  return new Error('Prompt oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
};

/**
 * API anahtarının geçerli olup olmadığını kontrol eder
 * @param {string} apiKey - Kontrol edilecek API anahtarı
 * @returns {Promise<boolean>} Geçerli mi?
 */
export const validateApiKey = async (apiKey) => {
  try {
    if (!apiKey || apiKey.trim().length < 10) {
      return false;
    }
    
    const genAI = createGeminiClient(apiKey);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Basit bir test isteği gönder - listModels daha hızlı ve güvenilir
    await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: 'Hi' }] }],
      generationConfig: { maxOutputTokens: 1 }
    });
    return true;
  } catch (error) {
    console.error('API doğrulama hatası:', error);
    // API key geçersiz değilse, rate limit veya başka bir hata olabilir
    // Bu durumda yine de true döndürebiliriz çünkü anahtar formatı doğrudur
    if (error.message && error.message.includes('API key not valid')) {
      return false;
    }
    // Diğer hatalar (rate limit vb.) anahtarın geçerli olduğunu gösterebilir
    return true;
  }
};