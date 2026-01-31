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

    KARMAŞIKLIK SEVİYESİNE GÖRE DAVRAN:
    Kullanıcı 1-10 arası bir karmaşıklık seviyesi belirtir. Bu seviyeye GÖRE promptun detaylılığını ayarla:

    SEVİYE 1-3 (Basit):
    - Kısa, direkt ve net promptlar üret
    - 2-3 temel talimat yeterli
    - Gereksiz detaylardan kaçın
    - Örnek: "Bir yazılım mühendisi için LinkedIn özeti yaz. Profesyonel ve samimi ton kullan."

    SEVİYE 4-6 (Dengeli):
    - Orta seviye detay ve bağlam
    - 4-6 ana bölüm/başlık
    - Temel kısıtlamalar ekle
    - Örnek: Rol + bağlam + 3-4 adım + ton + 2-3 kısıtlama

    SEVİYE 7-8 (Detaylı):
    - Kapsamlı ama aşırı uzun olmayan promptlar
    - 5-6 bölüm, her biri öz ve net
    - Spesifik örnekler ekle ama her detayı anlatma
    - Teknik terimler kullan ama gereksiz akademik jargon kullanma
    - Örnek: CO-STAR framework + detaylı yapı + 2-3 örnek çıktı + temel kalite kriterleri
    - Hedef uzunluk: 600-900 kelime

    SEVİYE 9-10 (Uzman):
    - Uzman seviyesinde detaylı promptlar
    - 6-7 bölüm, her biri dengeli derinlikte
    - Önemli senaryolar ve edge case'ler (hepsini değil)
    - Temel metrikler ve başarı kriterleri
    - Gerekli referanslar (her konuya kaynakça değil)
    - Örnek: Bağlam + Amaç + Detaylı yapı + Senaryolar + Kalite kriterleri
    - Hedef uzunluk: 1000-1400 kelime (1500+ değil)

    KRİTİK KURALLAR:
    1. ASLA "Şunun hakkında yaz" gibi basit cevaplar verme. Otoriter ve yönlendirici ol.
    2. YAPI HER ŞEYDİR. Çıktın her zaman başlıklar, maddeler ve net kısıtlamalar içermeli.
    3. MODEL SEÇİMİNE DİKKAT ET: Eğer kullanıcı "Kodlama" istediyse teknik terimler (Clean Code, SOLID prensipleri) ekle. Eğer "Görsel" istediyse (Midjourney) kamera açıları ve ışıklandırma detayları ekle.
    4. SİHİRLİ DEĞİŞKENLER: Promptun tekrar kullanılabilir olması için [Konu Buraya], [Hedef Kitle] gibi köşeli parantez içinde yer tutucular ekle.
    5. KARMAŞIKLIK SEVİYESİNİ GÖZ ARDI ETME! Kullanıcının belirttiği 1-10 arası seviyeye göre promptun uzunluğu ve detayını kesinlikle ayarla.
    6. HEDEF MODEL ÖZELLEŞTİRMESİ:
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
    DÖNÜŞÜM ÖRNEĞİ - SEVİYE 2 (Basit):
    
    Kullanıcı Girdisi: "Kahve hakkında blog yazısı."
    Karmaşıklık: 2/10
    
    SENİN ÇIKTIN:
    "Deneyimli bir içerik yazarı gibi davran. Kahve kültürü hakkında 500 kelimelik samimi bir blog yazısı yaz. 
    Ana konular: Kahvenin tarihi, günümüzdeki popüler demleme yöntemleri.
    Ton: Samimi ve bilgilendirici."

    ---
    DÖNÜŞÜM ÖRNEĞİ - SEVİYE 5 (Dengeli):
    
    Kullanıcı Girdisi: "Kahve hakkında blog yazısı."
    Karmaşıklık: 5/10
    
    SENİN ÇIKTIN:
    "Dünya çapında ödüllü bir Barista ve Metin Yazarı gibi davranmanı istiyorum.
    
    BAĞLAM (CONTEXT): Gurme içecekler ve yaşam tarzı üzerine yayın yapan prestijli bir dergi için yazıyorsun.
    AMAÇ (OBJECTIVE): 'Üçüncü Dalga Kahve Akımı' hakkında okuyucuyu büyüleyen, 1500 kelimelik detaylı bir makale yazmak.
    TON (TONE): Sofistike, duyusal, eğitici ama samimi.
    
    YAPI:
    1. Giriş: Taze çekilmiş kahve kokusunu betimleyerek okuyucuyu yakala.
    2. Gelişme: Kahvenin tarladan fincana yolculuğunu, demleme bilimini anlat.
    3. Sonuç: Bilinçli tüketim için bir çağrı yap.
    
    KISITLAMALAR:
    - 'Harika bir içecek' gibi klişe laflardan kaçın.
    - Teknik terimleri yerinde kullan."

    ---
    DÖNÜŞÜM ÖRNEĞİ - SEVİYE 9 (Uzman):
    
    Kullanıcı Girdisi: "Kahve hakkında blog yazısı."
    Karmaşıklık: 9/10
    
    SENİN ÇIKTIN:
    "Sen bir kahve araştırmacısı, Q-Grader sertifikalı uzman ve ödüllü gastronomi yazarısın. 15 yıllık sektör deneyimin var.

    ARAŞTIRMA METODOLOJİSİ:
    - Etiyopya, Kolombiya ve Kenya menşeli çekirdeklerin karşılaştırmalı analizi
    - SCAA (Specialty Coffee Association of America) cupping protokolleri
    - Sensory profiling ve flavor wheel kullanımı

    BAĞLAM (CONTEXT):
    Uluslararası 'Coffee Culture Quarterly' dergisi için akademik düzeyde bir inceleme yazısı. Okuyucular kahve profesyonelleri, kavurmacılar ve ileri düzey ev demleyicileri.

    AMAÇ (OBJECTIVE):
    'Terroir Kavramının Özel Kahvedeki Yansımaları: Mikro İklim, İşleme Yöntemleri ve Bardak Profili Arasındaki Korelasyon'
    konulu 3000+ kelimelik kapsamlı bir makale.

    TON (TONE):
    Akademik ama erişilebilir, otoriter ama tutkulu, bilimsel kanıtlara dayalı.

    DETAYLI YAPI:
    1. ABSTRACT (Özet): 150 kelime, anahtar terimler: terroir, mikro lot, cupping score
    2. GİRİŞ: Kahve terroir kavramının şarap dünyasından ödünç alınması
    3. LİTERATÜR TARAMASI: Son 10 yılın akademik çalışmalarına atıf
    4. METODOLOJİ: Örneklem seçimi, kavurma profilleri, demleme parametreleri
    5. BÖLGESEL ANALİZLER:
       - Etiyopya Yirgacheffe: Yüksek rakım, doğal işlem
       - Kolombiya Huila: Yıkanmış işlem, orta gövde
       - Kenya Nyeri: Çift yıkanmış, asidite profili
    6. SENSORY EVALUATION: Flavor wheel kullanımı, aroma bileşenleri
    7. TARTIŞMA: İklim değişikliğinin terroir üzerindeki etkileri
    8. SONUÇ: Pratik öneriler ve gelecek araştırma alanları
    9. KAYNAKLAR: En az 10 akademik kaynak önerisi

    KALİTE KRİTERLERİ:
    - Her iddia için kaynak veya kanıt
    - Spesifik rakamlar ve yüzdeler
    - Uygulanabilir öneriler
    - Karşılaştırmalı tablolar ve grafik açıklamaları

    KISITLAMALAR:
    - Spekülatif ifadelerden kaçın (örn: "belki", "muhtemelen")
    - Her teknik terimin ilk kullanımında tanımı
    - Yanlış bilgilendirici genellemelerden kaçın
    - Ticari marka isimleri kullanma"
    ---

    EN ÖNEMLİ KURAL - ÇIKTI FORMATI:
    7. KESİNLİKLE SOHBET ETME: AI ile konuşur gibi cümleler kullanma
       - YASAK: "Hazır ol", "İşte promptun", "Buyur", "Şunu yapmanı istiyorum"
       - YASAK: "Bu promptu kullan", "Şimdi şunu yap"
       - YASAK: Hedef AI'ya hitap eden cümleler (örn: "KiloCode, bu projeyi yap...")
    8. SADECE PROMPT METNİ: Ürettiğin şey DOĞRUDAN kullanılabilir prompt olmalı
       - Başında "Prompt:" yazma
       - Sonunda açıklama yapma
       - Tırnak işaretleri kullanma
    9. YAPISAL OL: Başlıklar, maddeler, kurallar kullan
    10. ROL BELİRLE AMA SOHBET ETME: Rol tanımla ama o rolle konuşma

    ŞİMDİ: Kullanıcının isteği ve karmaşıklık seviyesine göre BU KALİTEDE bir prompt üret.
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
export const generatePrompt = async ({ apiKey, topic, complexity, targetAI, outputLanguage = 'Türkçe', notebookLMMode }) => {
  try {
    const genAI = createGeminiClient(apiKey);
    
    // Notebook LM için özel sistem talimatı
    const systemInstruction = targetAI === 'NotebookLM' 
      ? getNotebookLMInstruction(notebookLMMode)
      : SYSTEM_INSTRUCTION;
    
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      systemInstruction: systemInstruction
    });

    // Kullanıcı isteğini formatla
    const userPrompt = targetAI === 'NotebookLM'
      ? formatNotebookLMRequest(topic, complexity, notebookLMMode, outputLanguage)
      : formatUserRequest(topic, complexity, targetAI, outputLanguage);

    console.log('API isteği gönderiliyor...', { topic, complexity, targetAI });
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    });
    
    console.log('API yanıtı alındı:', result);
    
    const response = await result.response;
    let text = response.text();

    // Clean up the response - remove conversational phrases
    text = cleanPromptOutput(text, targetAI);

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
const formatUserRequest = (topic, complexity, targetAI, outputLanguage = 'English') => {
  const complexityDescription = getComplexityDescription(complexity);
  
  let complexityDirective = '';
  if (complexity <= 3) {
    complexityDirective = `
KARMAŞIKLIK SEVİYESİ 1-3 (BASİT) - BU ÇOK ÖNEMLİ:
- Prompt KISA ve ÖZ olmalı (maksimum 3-4 cümle)
- Sadece temel talimatlar ver
- Gereksiz detaylardan KAÇIN
- Basit bir yapı kullan: Rol + Görev + 1-2 kısıtlama
- Örnek uzunluk: 100-200 kelime`;
  } else if (complexity <= 6) {
    complexityDirective = `
KARMAŞIKLIK SEVİYESİ 4-6 (DENGELİ) - BU ÇOK ÖNEMLİ:
- Orta uzunlukta prompt (4-6 bölüm)
- CO-STAR framework'ünün temel elemanlarını kullan
- Bağlam, amaç, ton ve yapıyı belirt
- Birkaç spesifik kısıtlama ekle
- Örnek uzunluk: 300-600 kelime`;
  } else if (complexity <= 8) {
    complexityDirective = `
KARMAŞIKLIK SEVİYESİ 7-8 (DETAYLI) - BU ÇOK ÖNEMLİ:
- Kapsamlı ama aşırı uzun olmayan prompt (5-6 bölüm)
- CO-STAR framework'ünü uygula ama her bölümü uzatma
- Spesifik örnekler ekle ama her detayı anlatma
- Teknik terimler kullan ama gereksiz akademik jargon kullanma
- Temel kalite kriterleri belirt
- Örnek uzunluk: 600-900 kelime`;
  } else {
    complexityDirective = `
KARMAŞIKLIK SEVİYESİ 9-10 (UZMAN) - BU ÇOK ÖNEMLİ:
- Uzman seviyesinde detaylı prompt (6-7 bölüm)
- Her bölüm dengeli derinlikte olsun, aşırı uzun paragraflar yazma
- Önemli senaryolar ve edge case'ler (hepsini değil)
- Temel metrikler ve başarı kriterleri
- Gerekli referanslar (her konuya kaynakça değil)
- Örnek uzunluk: 1000-1400 kelime (1500+ değil)`;
  }
  
  return `Konu: ${topic}
Karmaşıklık: ${complexity}/10 - ${complexityDescription}
Hedef AI: ${targetAI}
Çıktı Dili: ${outputLanguage}

${complexityDirective}

Yukarıdaki bilgilere göre optimize edilmiş bir prompt oluşturun. 

KESİNLİKLE UYULMASI GEREKEN KURALLAR:
1. Kullanıcının belirttiği ${complexity}/10 karmaşıklık seviyesine GÖRE promptun uzunluğunu ve detayını ayarla. 
   - Eğer 1-3 ise KISA ve BASİT
   - Eğer 4-6 ise ORTA seviyede
   - Eğer 7-8 ise DETAYLI
   - Eğir 9-10 ise ÇOK DETAYLI ve AKADEMİK olsun.

2. KESİNLİKLE SOHBET ETME - BU ÇOK ÖNEMLİ:
   - Hedef AI'ya hitap ETME (örn: "KiloCode, bu projeyi yap...")
   - Emir kipi kullanma (örn: "Hazır ol", "Şunu yap", "İşte promptun")
   - Giriş/sonuç cümleleri ekleme
   - Sadece YAPISAL prompt içeriği üret

3. ÇIKTI SADECE PROMPT OLSUN:
   - Başında "Prompt:" yazma
   - Sonunda açıklama yapma
   - Tırnak işaretleri kullanma
   - Doğrudan kullanılabilir içerik üret

ÖNEMLİ: Oluşturacağın prompt MUTLAKA ${outputLanguage} dilinde olmalıdır.`;
};

/**
 * Cleans up the generated prompt by removing conversational phrases
 * @param {string} text - Raw generated text
 * @param {string} targetAI - Target AI model name
 * @returns {string} Cleaned prompt
 */
const cleanPromptOutput = (text, targetAI) => {
  if (!text) return text;

  let cleaned = text;

  // Remove common conversational phrases at the beginning
  const openingPatterns = [
    /^(Here is|Here's|İşte|Below is|Aşağıda|Presenting|Sunulan)[\s\w]+prompt[:.]?\s*/i,
    /^(This is|Bu)[\s\w]+prompt[:.]?\s*/i,
    /^(Prompt|Prompt)[\s:]+/i,
    /^["']+/, // Remove leading quotes
  ];

  // Remove conversational phrases at the end
  const closingPatterns = [
    /\s*(Hope this helps|Umarım bu yardımcı olur)[!.]?\s*$/i,
    /\s*(Let me know|Bana bildirin)[\s\w]*[!.]?\s*$/i,
    /\s*(Good luck|İyi şanslar)[!.]?\s*$/i,
    /\s*(Ready when you are|Hazırım)[!.]?\s*$/i,
    /\s*["']+$/, // Remove trailing quotes
  ];

  // Remove AI-directed closing phrases
  const aiDirectedPatterns = [
    new RegExp(`\\s*${targetAI}[^.]*(?:hazır|ready|waiting|bekliyor)[^.]*[.!]?\\s*$`, 'i'),
    new RegExp(`\\s*${targetAI}[^.]*(?:yapmalısın|should|needs? to)[^.]*[.!]?\\s*$`, 'i'),
    /\s*(?:This will be your masterpiece|Bu senin başyapıtın olacak)[^.]*[.!]?\s*$/i,
    /\s*(?:Go ahead|Devam et|Proceed)[^.]*[.!]?\s*$/i,
  ];

  // Apply opening patterns
  openingPatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '');
  });

  // Apply closing patterns
  closingPatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '');
  });

  // Apply AI-directed patterns
  aiDirectedPatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '');
  });

  // Remove lines that are clearly conversational
  const lines = cleaned.split('\n');
  const filteredLines = lines.filter(line => {
    const trimmed = line.trim();
    // Skip empty lines
    if (!trimmed) return true;
    
    // Skip lines that look like conversational endings
    if (/^(Hazır ol|Ready|Buyur|Here you go|İşte|Go ahead|Devam)/i.test(trimmed)) {
      return false;
    }
    
    // Skip lines that directly address the AI at the end
    if (new RegExp(`^${targetAI}[^,]*[,!.]$`, 'i').test(trimmed) && trimmed.length < 100) {
      return false;
    }
    
    return true;
  });

  cleaned = filteredLines.join('\n');

  // Final cleanup
  cleaned = cleaned
    .replace(/^\s+/, '') // Remove leading whitespace
    .replace(/\s+$/, '') // Remove trailing whitespace
    .replace(/\n{3,}/g, '\n\n'); // Max 2 consecutive newlines

  return cleaned;
};

/**
 * Karmaşıklık seviyesine göre açıklama döndürür
 * @param {number} complexity - Karmaşıklık seviyesi (1-10)
 * @returns {string} Açıklama
 */
const getComplexityDescription = (complexity) => {
  if (complexity <= 3) {
    return 'Simple, direct and concise prompt (100-200 words)';
  } else if (complexity <= 6) {
    return 'Balanced detail and context (300-600 words)';
  } else if (complexity <= 8) {
    return 'Detailed but not excessive (600-900 words)';
  } else {
    return 'Expert-level, well-balanced detail (1000-1400 words)';
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
    return new Error('Invalid API key. Please get a free API key from Google AI Studio.');
  }
  
    // Rate limit / Quota exceeded - 429 Too Many Requests
    if (errorMessage.includes('429') || 
        errorMessage.includes('Too Many Requests') ||
        errorMessage.includes('quota') ||
        errorMessage.includes('exceeded your current quota') ||
        errorMessage.includes('rate limit')) {
      return new Error(
        'API rate limit exceeded. The free tier allows 10 requests per day (adjusted for development mode). ' +
        'Please try again tomorrow or use a different API key. ' +
        'Visit https://ai.google.dev/gemini-api/docs/rate-limits for more info.'
      );
    }
  
  // Ağ hataları
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return new Error('Connection error. Please check your internet connection.');
  }
  
  // Genel hata
  return new Error('An error occurred while generating the prompt. Please try again.');
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

/**
 * Notebook LM için sistem talimatı
 * @param {string} mode - 'deepResearch' veya 'questionPrompts'
 * @returns {string} Sistem talimatı
 */
const getNotebookLMInstruction = (mode) => {
  if (mode === 'questionPrompts') {
    return `
    Rolün: Sen bir Eğitim İçerik Uzmanı ve Soru Tasarımcısısın. Notebook LM için etkili soru promptları oluşturuyorsun.

    GÖREVİN:
    Verilen konu hakkında, öğrenme ve anlama sürecini destekleyen, düşündürücü ve kapsamlı sorular oluştur.

    KARMAŞIKLIK SEVİYESİNE GÖRE SORU SAYISI:
    - Seviye 1-3: 3-5 temel soru
    - Seviye 4-6: 6-10 çeşitli soru (açık uçlu ve yönlendirici)
    - Seviye 7-8: 10-15 derinlemesine soru (analiz ve sentez düzeyinde)
    - Seviye 9-10: 15-25 uzman seviyesi soru (eleştirel düşünme ve değerlendirme)

    SORU TİPLERİ:
    1. Anlama Soruları: Temel kavramları kavramayı test eden
    2. Analiz Soruları: Bilgiyi parçalara ayırıp ilişkileri kuran
    3. Uygulama Soruları: Bilgiyi pratik senaryolarda kullanan
    4. Sentez Soruları: Farklı kaynakları birleştiren
    5. Değerlendirme Soruları: Eleştirel düşünmeyi gerektiren

    ÇIKTI FORMATI:
    - Her soru net ve anlaşılır olmalı
    - Sorular konuyla doğrudan ilgili olmalı
    - Farklı zorluk seviyelerinde sorular içermeli
    - Sadece soruları listele, ekstra açıklama yapma
    `;
  }

  // Deep Research (default) - Revize edilmiş versiyon
  return `
  Rolün: Sen bir Araştırma Promptu Oluşturma Uzmanısın. Notebook LM için kullanıcının girdiği konuya göre detaylı araştırma cümleleri/promptları oluşturuyorsun.

  GÖREVİN:
  Kullanıcının girdiği konuyu analiz et ve bu konu hakkında Notebook LM'de detaylı bir araştırma yapılmasını sağlayacak kapsamlı bir prompt oluştur.

  ÖRNEK:
  Konu: "Harry Potter evrenindeki karakterler"
  Oluşturulan Prompt: "Harry Potter evrenindeki karakterleri detaylı bir şekilde araştır. Her karakterin adı, soyadı, doğum tarihi, ailesi, yetenekleri, rolü ve hikayedeki önemi hakkında kapsamlı bilgiler ver. Ayrıca karakterlerin aralarındaki ilişkileri ve evrenin tarihçesi hakkında da detaylı bilgiler ver."

  KARMAŞIKLIK SEVİYESİNE GÖRE:
  - Seviye 1-3: Temel bilgiler, ana kavramlar ve genel bakış
  - Seviye 4-6: Orta düzey detay, önemli alt konular, temel ilişkiler
  - Seviye 7-8: Detaylı analiz, derinlemesine bilgiler, karşılaştırmalar
  - Seviye 9-10: Kapsamlı akademik düzeyde, tüm yönleriyle detaylı araştırma

  PROMPT OLUŞTURMA KURALLARI:
  1. Konuyu analiz et ve en önemli araştırma alanlarını belirle
  2. Spesifik detaylar iste (isimler, tarihler, özellikler, ilişkiler vb.)
  3. Konunun farklı yönlerini kapsa (tarihçe, önemli noktalar, ilişkiler, etkiler)
  4. Araştırmanın derinliğini karmaşıklık seviyesine göre ayarla
  5. Notebook LM'in araştırma yapmasını sağlayacak şekilde yönlendirici ol

  ÇIKTI FORMATI:
  - Sadece oluşturulan araştırma promptunu/cümlesini ver
  - Başında "Prompt:" veya benzeri ifadeler kullanma
  - Doğrudan Notebook LM'e girilebilecek şekilde net ve anlaşılır ol
  - Ekstra açıklama, giriş veya sonuç cümlesi ekleme
  `;
};

/**
 * Notebook LM isteğini formatlar
 * @param {string} topic - Konu
 * @param {number} complexity - Karmaşıklık seviyesi
 * @param {string} mode - 'deepResearch' veya 'questionPrompts'
 * @param {string} outputLanguage - Çıktı dili
 * @returns {string} Formatlanmış istek
 */
const formatNotebookLMRequest = (topic, complexity, mode, outputLanguage = 'English') => {
  const questionCount = getQuestionCountByComplexity(complexity);
  
  if (mode === 'questionPrompts') {
    return `Konu: ${topic}
Karmaşıklık: ${complexity}/10
Mod: Soru Promptları
Hedef Soru Sayısı: ${questionCount.min}-${questionCount.max}
Çıktı Dili: ${outputLanguage}

Yukarıdaki konu hakkında ${questionCount.min}-${questionCount.max} adet soru oluştur.
Sorular farklı düşünme seviyelerini (Bloom Taksonomisi) kapsamalı.
Sadece soruları listele, başka açıklama yapma.`;
  }

  // Deep Research - Kullanıcının girdiği konuya göre araştırma promptu oluştur
  return `KONU: "${topic}"

Yukarıdaki konu hakkında Notebook LM'de kullanılmak üzere detaylı bir araştırma promptu oluştur.

KARMAŞIKLIK SEVİYESİ: ${complexity}/10

GÖREV:
1. Konuyu analiz et ve en önemli araştırma alanlarını belirle
2. Konu hakkında detaylı bilgiler iste (isimler, tarihler, özellikler, ilişkiler, tarihçe vb.)
3. Karmaşıklık seviyesine göre detay derinliğini ayarla
4. Notebook LM'in bu konuyu araştırmasını sağlayacak şekilde kapsamlı bir prompt oluştur

ÖRNEK ÇIKTI FORMATI:
"[Konu] hakkında detaylı bir şekilde araştırma yap. [Spesifik detaylar, alt konular, ilişkiler ve tarihçe hakkında kapsamlı bilgiler iste.]"

NOT: Sadece oluşturulan araştırma cümlesini/promptunu ver. Başka açıklama yapma.`;
};

/**
 * Karmaşıklık seviyesine göre soru sayısı döndürür
 * @param {number} complexity - Karmaşıklık seviyesi
 * @returns {Object} Min ve max soru sayısı
 */
const getQuestionCountByComplexity = (complexity) => {
  if (complexity <= 3) {
    return { min: 3, max: 5 };
  } else if (complexity <= 6) {
    return { min: 6, max: 10 };
  } else if (complexity <= 8) {
    return { min: 10, max: 15 };
  } else {
    return { min: 15, max: 25 };
  }
};

/**
 * Rastgele prompt oluşturur
 * @param {Object} params - Parametreler
 * @param {string} params.apiKey - API anahtarı
 * @param {number} params.complexity - Karmaşıklık seviyesi
 * @param {string} params.outputLanguage - Çıktı dili
 * @returns {Promise<string>} Oluşturulan rastgele prompt
 */
export const generateRandomPrompt = async ({ apiKey, topic, complexity, targetAI, outputLanguage = 'English' }) => {
  try {
    const genAI = createGeminiClient(apiKey);
    
    console.log('generateRandomPrompt çağrıldı:', { topic, complexity, targetAI, outputLanguage });
    
    // Eğer konu varsa, normal generatePrompt kullan ama yaratıcı varyasyonlar ekle
    if (topic && topic.trim()) {
      console.log('Konu var, normal generatePrompt kullanılıyor:', topic);
      return await generatePrompt({
        apiKey,
        topic: `[RANDOMIZED] ${topic}`,
        complexity,
        targetAI: targetAI || 'ChatGPT',
        outputLanguage
      });
    }
    
    const randomInstruction = `
    Rolün: Sen yaratıcı ve beklenmedik fikirler üreten bir Prompt İnovatörüsün.

    GÖREVİN:
    Kullanıcı "Randomize" butonuna bastığında, tamamen rastgele, yaratıcı, akla gelmeyecek ve ilginç bir prompt oluştur.

    RASTGELELİK KRİTERLERİ:
    - Konu tamamen rastgele seçilmeli (teknoloji, sanat, bilim, felsefe, günlük yaşam, hayali senaryolar)
    - Beklenmedik kombinasyonlar kullan (örn: "Bir kahve makinesiyle uzay gemisi nasıl tamir edilir")
    - Farklı türler karıştırılabilir (bilim kurgu + tarih, romantik komedi + korku)
    - Absürt ama mantıklı senaryolar oluştur

    KARMAŞIKLIK SEVİYESİNE GÖRE:
    - Seviye 1-3: Basit, eğlenceli ve hızlı rastgele promptlar
    - Seviye 4-6: Orta düzey yaratıcılık, ilginç senaryolar
    - Seviye 7-8: Detaylı, karmaşık ve çok katmanlı rastgele promptlar
    - Seviye 9-10: Uzman seviyesi, derinlemesine ve son derece yaratıcı promptlar

    ÇIKTI FORMATI:
    - Sadece prompt metnini ver
    - "İşte rastgele promptun" gibi girişler yapma
    - Doğrudan kullanılabilir, yapılandırılmış bir prompt olsun
    `;
    
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      systemInstruction: randomInstruction
    });

    const userPrompt = `Karmaşıklık: ${complexity}/10
Hedef AI: ${targetAI || 'ChatGPT'}
Çıktı Dili: ${outputLanguage}

Yukarıdaki karmaşıklık seviyesine göre tamamen rastgele, yaratıcı ve beklenmedik bir prompt oluştur.
Konu, senaryo ve yaklaşım tamamen rastgele seçilmeli.
Sadece prompt metnini ver, ekstra açıklama yapma.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    });
    
    const response = await result.response;
    let text = response.text();

    // Clean up the response
    text = cleanPromptOutput(text, 'Random');

    return text.trim();
  } catch (error) {
    console.error('Random Prompt Generation Error:', error);
    throw handleApiError(error);
  }
};