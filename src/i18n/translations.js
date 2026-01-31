/**
 * Internationalization Translations
 * PromptNexus - Multi-language support
 */

export const translations = {
  en: {
    // Header
    appName: 'PromptNexus',
    settings: 'Settings',
    apiConnected: 'API Connected',
    apiRequired: 'API Required',

    // Hero Section
    heroBadge: 'Powered by Gemini 2.5 Flash',
    heroTitle1: 'Unlock Your',
    heroTitle2: 'AI Potential',
    heroSubtitle: 'Transform your ideas into professional, optimized AI commands.',
    featureFast: 'Fast',
    featureSmart: 'Smart',
    featureProfessional: 'Professional',

    // Input Laboratory
    inputLabTitle: 'Input Laboratory',
    inputLabSubtitle: 'Describe your idea in detail',
    topicLabel: 'Your Topic',
    topicPlaceholder: 'E.g., Write an effective LinkedIn profile summary for a software engineer...',
    topicHint: 'Briefly explain what you want to create',
    targetModelLabel: 'Target Model',
    outputLanguageLabel: 'Output Language',
    outputLanguageHint: 'Language of the prompt to be generated',
    creativeTemperature: 'Creative Temperature',
    generateButton: 'Generate Prompt',
    generatingButton: 'Generating...',

    // Target AI Options
    targetAI: {
      ChatGPT: 'ChatGPT (GPT-4)',
      Claude: 'Claude (Anthropic)',
      Midjourney: 'Midjourney',
      DALLE: 'DALL-E',
      Gemini: 'Gemini',
      Cursor: 'Cursor',
      Antigravity: 'Antigravity',
      KiloCode: 'Kilo Code',
      GitHubCopilot: 'GitHub Copilot',
      Windsurf: 'Windsurf',
      NotebookLM: 'Notebook LM',
    },

    targetAIDescriptions: {
      ChatGPT: 'General purpose chat and tasks',
      Claude: 'Long context and analysis',
      Midjourney: 'Image generation',
      DALLE: 'Image generation',
      Gemini: 'Google AI tasks',
      Cursor: 'AI-powered code editor',
      Antigravity: 'Agent IDE and development environment',
      KiloCode: 'AI software development assistant',
      GitHubCopilot: 'GitHub AI code assistant',
      Windsurf: 'AI code editor and agent',
      NotebookLM: 'Deep research and podcast generation',
    },

    // Project Types
    projectTypeLabel: 'Project Type',
    projectTypeHint: 'Select the type of project you are working on',
    projectTypes: {
      webApp: 'Web Application',
      webAppDesc: 'Web-based applications and websites',
      mobileGame: 'Mobile Game',
      mobileGameDesc: 'Mobile platform games',
      dataAnalysis: 'Data Analysis',
      dataAnalysisDesc: 'Data analysis and visualization',
      desktopApp: 'Desktop Application',
      desktopAppDesc: 'Applications for computers',
      api: 'API / Backend',
      apiDesc: 'API and backend services',
      aiMl: 'AI / Machine Learning',
      aiMlDesc: 'AI and ML projects',
      ecommerce: 'E-commerce',
      ecommerceDesc: 'Online sales platforms',
      iot: 'IoT / Embedded',
      iotDesc: 'Internet of Things projects',
      blockchain: 'Blockchain / Web3',
      blockchainDesc: 'Blockchain-based projects',
      contentPlatform: 'Content Platform',
      contentPlatformDesc: 'Blogs, social media, content sites',
      automation: 'Automation / Script',
      automationDesc: 'Automation and script projects',
      other: 'Other',
      otherDesc: 'Other project types',
    },

    notebookLM: {
      deepResearchTab: 'Deep Research',
      questionPromptsTab: 'Question Prompts',
      deepResearchDesc: 'Comprehensive research prompt for in-depth analysis',
      questionPromptsDesc: 'AI-generated questions for the topic',
    },

    randomizer: {
      button: 'Randomize',
      buttonTooltip: 'Generate a creative, unexpected prompt',
      generating: 'Randomizing...',
    },

    // Complexity Levels
    complexity: {
      simple: 'Simple',
      balanced: 'Balanced',
      detailed: 'Detailed',
      expert: 'Expert',
      simpleDesc: 'Direct and clear',
      balancedDesc: 'Medium level detail',
      detailedDesc: 'Comprehensive',
      expertDesc: 'Extremely detailed',
      minLabel: 'Simple',
      maxLabel: 'Expert',
    },

    // Result Terminal
    resultTerminal: 'result.terminal',
    resultPlaceholder: 'Result will appear here',
    resultHint: 'Start by filling out the form on the left',
    copyButton: 'Copy',
    copiedButton: 'Copied',
    downloadButton: 'Download',
    newPromptButton: 'New Prompt',
    generating: 'Generating prompt...',

    // Settings Modal
    settingsTitle: 'API Settings',
    settingsSubtitle: 'Enter your Gemini API key',
    apiKeyLabel: 'Gemini API Key',
    apiKeyPlaceholder: 'AIzaSy...',
    apiKeyValid: 'API key is valid! Saving...',
    apiKeyInvalid: 'Invalid API key. Please check.',
    apiKeyError: 'An error occurred during validation. Please try again.',
    apiKeyInfo: 'Your API key is stored locally in your browser and is only used to make direct requests to the Gemini API.',
    getApiKey: 'Get a free API key from Google AI Studio',
    clearButton: 'Clear',
    cancelButton: 'Cancel',
    saveButton: 'Save',
    validating: 'Validating...',

    // Toast Messages
    toast: {
      apiKeyRequired: 'Please enter your API key in settings first',
      promptGenerated: 'Prompt generated successfully!',
      readyForNew: 'Ready to generate a new prompt',
      apiKeySaved: 'API key saved',
      apiKeyCleared: 'API key cleared',
      copySuccess: 'Copied to clipboard!',
      copyError: 'Failed to copy',
      limitReached: 'Your limit is exhausted, try again tomorrow',
    },

    // Templates
    templates: {
      title: 'Prompt Templates',
      subtitle: 'Choose from ready-made templates',
      categories: {
        all: 'All',
        writing: 'Writing',
        coding: 'Coding',
        image: 'Image',
        business: 'Business',
        creative: 'Creative',
      },
      useTemplate: 'Use Template',
      selected: 'Selected Template',
      clear: 'Clear template',
      // Writing Templates
      items: {
        blogPost: {
          title: 'Blog Post',
          description: 'Create an engaging blog post on any topic',
          topic: 'Write a comprehensive blog post about [TOPIC]. Include an attention-grabbing headline, introduction that hooks the reader, main body with 3-5 key points, and a compelling conclusion with a call-to-action.',
        },
        linkedinPost: {
          title: 'LinkedIn Post',
          description: 'Professional LinkedIn content',
          topic: 'Create a professional LinkedIn post about [TOPIC]. Make it engaging, add relevant hashtags, include a hook in the first line, and end with a question to encourage engagement.',
        },
        emailCampaign: {
          title: 'Email Campaign',
          description: 'Marketing email sequence',
          topic: 'Write a 3-email marketing sequence for [PRODUCT/SERVICE]. Include subject lines, body copy, and calls-to-action. Make them persuasive and conversion-focused.',
        },
        productDescription: {
          title: 'Product Description',
          description: 'Compelling product copy',
          topic: 'Write a compelling product description for [PRODUCT]. Highlight key features, benefits, unique selling points, and include persuasive copy that drives conversions.',
        },
        essay: {
          title: 'Academic Essay',
          description: 'Structured academic writing',
          topic: 'Write a well-structured academic essay about [TOPIC]. Include a clear thesis statement, supporting arguments with evidence, counterarguments, and a strong conclusion.',
        },
        // Coding Templates
        codeExplanation: {
          title: 'Code Explanation',
          description: 'Explain code in detail',
          topic: 'Explain this code in detail: [CODE]. Break down what each section does, identify the programming patterns used, and suggest potential improvements or optimizations.',
        },
        codeReview: {
          title: 'Code Review',
          description: 'Professional code review',
          topic: 'Perform a thorough code review for: [CODE]. Identify bugs, security issues, performance bottlenecks, and suggest best practices and refactoring opportunities.',
        },
        apiDesign: {
          title: 'API Design',
          description: 'Design REST/GraphQL API',
          topic: 'Design a REST API for [FEATURE/SERVICE]. Include endpoints, HTTP methods, request/response schemas, authentication requirements, and error handling.',
        },
        databaseSchema: {
          title: 'Database Schema',
          description: 'Design database structure',
          topic: 'Design a database schema for [APPLICATION]. Include tables, columns, data types, primary/foreign keys, indexes, and relationships. Provide SQL for PostgreSQL.',
        },
        unitTests: {
          title: 'Unit Tests',
          description: 'Generate test cases',
          topic: 'Write comprehensive unit tests for: [CODE/FUNCTION]. Include edge cases, error scenarios, and use [TESTING_FRAMEWORK]. Aim for high code coverage.',
        },
        reactComponent: {
          title: 'React Component',
          description: 'Build React component',
          topic: 'Create a React component for [FEATURE]. Use functional components with hooks, TypeScript, proper prop types, and follow React best practices. Include styling with Tailwind CSS.',
        },
        fullStackApp: {
          title: 'Full-Stack App',
          description: 'Complete application architecture',
          topic: 'Design a full-stack application for [PROJECT]. Include frontend (React), backend (Node.js/Express), database schema, API endpoints, authentication, and deployment strategy.',
        },
        // Image Templates
        midjourneyPortrait: {
          title: 'Portrait Photo',
          description: 'Realistic portrait generation',
          topic: 'A stunning portrait of [SUBJECT], professional photography, soft natural lighting, shallow depth of field, bokeh background, 85mm lens, f/1.8, high resolution, detailed skin texture, cinematic color grading --ar 2:3 --v 6',
        },
        midjourneyLandscape: {
          title: 'Landscape',
          description: 'Breathtaking landscapes',
          topic: 'Breathtaking [LOCATION] landscape, golden hour lighting, dramatic clouds, reflection in water, ultra-wide angle, 16mm lens, long exposure, vibrant colors, national geographic style, 8k resolution --ar 16:9 --v 6',
        },
        midjourneyLogo: {
          title: 'Logo Design',
          description: 'Professional logo concepts',
          topic: 'Minimalist logo design for [BRAND], [STYLE] style, clean lines, geometric shapes, [COLOR] color palette, vector art, professional branding, isolated on white background --ar 1:1 --v 6',
        },
        midjourneyProduct: {
          title: 'Product Shot',
          description: 'Commercial product photography',
          topic: 'Professional product photography of [PRODUCT], studio lighting, clean background, soft shadows, high-end commercial style, sharp focus, detailed texture, advertising quality --ar 4:5 --v 6',
        },
        dalleIllustration: {
          title: 'Digital Illustration',
          description: 'Artistic illustrations',
          topic: 'Create a digital illustration of [SUBJECT] in [ART_STYLE] style. Use [COLOR_SCHEME] colors. The mood should be [MOOD]. High detail, professional quality, suitable for print.',
        },
        dalleConcept: {
          title: 'Concept Art',
          description: 'Game/film concept art',
          topic: 'Concept art for [GAME/FILM]: [SCENE_DESCRIPTION]. Show [KEY_ELEMENTS]. Atmospheric lighting, detailed environment, professional concept art style, artstation quality.',
        },
        // Business Templates
        businessPlan: {
          title: 'Business Plan',
          description: 'Comprehensive business strategy',
          topic: 'Create a comprehensive business plan for [BUSINESS_IDEA]. Include executive summary, market analysis, competitive landscape, revenue model, marketing strategy, operations plan, and financial projections.',
        },
        pitchDeck: {
          title: 'Pitch Deck',
          description: 'Investor presentation outline',
          topic: 'Create an outline for a pitch deck for [STARTUP]. Include slides for: Problem, Solution, Market Size, Business Model, Traction, Competition, Team, Financials, and Ask.',
        },
        marketingStrategy: {
          title: 'Marketing Strategy',
          description: 'Complete marketing plan',
          topic: 'Develop a comprehensive marketing strategy for [PRODUCT/SERVICE]. Include target audience personas, channel strategy, content calendar, budget allocation, KPIs, and growth tactics.',
        },
        swotAnalysis: {
          title: 'SWOT Analysis',
          description: 'Strategic business analysis',
          topic: 'Conduct a detailed SWOT analysis for [COMPANY/PROJECT]. Identify Strengths, Weaknesses, Opportunities, and Threats. Provide actionable insights for each category.',
        },
        jobDescription: {
          title: 'Job Description',
          description: 'Professional job posting',
          topic: 'Write a compelling job description for [ROLE]. Include company overview, responsibilities, requirements, nice-to-have skills, benefits, and company culture highlights.',
        },
        // Creative Templates
        storyPlot: {
          title: 'Story Plot',
          description: 'Fiction story outline',
          topic: 'Create a detailed plot outline for a [GENRE] story about [PREMISE]. Include 3-act structure, character arcs, major plot points, twists, and satisfying resolution.',
        },
        characterDesign: {
          title: 'Character Design',
          description: 'Detailed character profile',
          topic: 'Create a detailed character profile for [CHARACTER_NAME]. Include physical description, personality traits, backstory, motivations, flaws, relationships, and character arc.',
        },
        videoScript: {
          title: 'Video Script',
          description: 'YouTube/TikTok script',
          topic: 'Write a script for a [DURATION] [PLATFORM] video about [TOPIC]. Include hook, main content with timestamps, visual directions, and call-to-action. Make it engaging and fast-paced.',
        },
        podcastOutline: {
          title: 'Podcast Episode',
          description: 'Podcast structure and questions',
          topic: 'Create an outline for a podcast episode about [TOPIC]. Include intro hook, segment breakdown, key talking points, interview questions, and outro with CTAs.',
        },
        socialMedia: {
          title: 'Social Media Campaign',
          description: 'Multi-platform content plan',
          topic: 'Create a 7-day social media campaign for [BRAND/PRODUCT]. Include content for Instagram, Twitter/X, LinkedIn, and TikTok with captions, hashtags, and posting schedule.',
        },
        creativeWriting: {
          title: 'Creative Writing',
          description: 'Short story or poem',
          topic: 'Write a [FORM: short story/poem/flash fiction] about [THEME]. Use [TONE] tone. Include vivid imagery, emotional depth, and a memorable ending. Approximately [WORD_COUNT] words.',
        },
      },
    },

    // History
    history: {
      title: 'Prompt History',
      subtitle: 'Your previously generated prompts',
      empty: 'No history yet',
      clearAll: 'Clear All',
      load: 'Load',
      delete: 'Delete',
    },

    // Favorites
    favorites: {
      title: 'Favorites',
      subtitle: 'Your favorite prompts',
      empty: 'No favorites yet',
      add: 'Add to Favorites',
      remove: 'Remove from Favorites',
    },

    // Footer
    footer: {
      madeWith: 'Made with',
      getApiKey: 'Get API Key',
    },

    // Rate Limit
    rateLimit: {
      title: 'API Rate Limit Reached',
      description: 'You have used all {{maxRequests}} free requests for today.',
      resetsIn: 'The limit resets in {{time}}.',
      resetsAt: 'Resets at midnight UTC',
      usage: 'API Usage: {{count}}/{{max}}',
      remaining: '{{remaining}} requests remaining today',
      approachingLimit: 'You are approaching the daily limit. Consider using a different API key if you need more requests.',
    },
  },

  tr: {
    // Header
    appName: 'PromptNexus',
    settings: 'Ayarlar',
    apiConnected: 'API Bağlı',
    apiRequired: 'API Gerekli',

    // Hero Section
    heroBadge: 'Gemini 2.5 Flash Destekli',
    heroTitle1: "AI'nızın",
    heroTitle2: 'Potansiyelini Ortaya Çıkarın',
    heroSubtitle: "Fikirlerinizi profesyonel, optimize edilmiş yapay zeka komutlarına dönüştürün.",
    featureFast: 'Hızlı',
    featureSmart: 'Akıllı',
    featureProfessional: 'Profesyonel',

    // Input Laboratory
    inputLabTitle: 'Giriş Laboratuvarı',
    inputLabSubtitle: 'Fikrinizi detaylandırın',
    topicLabel: 'Konunuz',
    topicPlaceholder: 'Örn: Bir yazılım mühendisi için etkili bir LinkedIn profili özeti yaz...',
    topicHint: 'Ne oluşturmak istediğinizi kısaca açıklayın',
    targetModelLabel: 'Hedef Model',
    outputLanguageLabel: 'Çıktı Dili',
    outputLanguageHint: 'Oluşturulacak promptun dili',
    creativeTemperature: 'Yaratıcı Sıcaklık',
    generateButton: 'Prompt Oluştur',
    generatingButton: 'Oluşturuluyor...',

    // Target AI Options
    targetAI: {
      ChatGPT: 'ChatGPT (GPT-4)',
      Claude: 'Claude (Anthropic)',
      Midjourney: 'Midjourney',
      DALLE: 'DALL-E',
      Gemini: 'Gemini',
      Cursor: 'Cursor',
      Antigravity: 'Antigravity',
      KiloCode: 'Kilo Code',
      GitHubCopilot: 'GitHub Copilot',
      Windsurf: 'Windsurf',
      NotebookLM: 'Notebook LM',
    },

    targetAIDescriptions: {
      ChatGPT: 'Genel amaçlı sohbet ve görevler',
      Claude: 'Uzun bağlam ve analiz',
      Midjourney: 'Görsel oluşturma',
      DALLE: 'Görsel oluşturma',
      Gemini: 'Google AI görevleri',
      Cursor: 'AI destekli kod editörü',
      Antigravity: 'Agent IDE ve geliştirme ortamı',
      KiloCode: 'AI yazılım geliştirme asistanı',
      GitHubCopilot: 'GitHub AI kod asistanı',
      Windsurf: 'AI kod editörü ve agent',
      NotebookLM: 'Derin araştırma ve podcast oluşturma',
    },

    // Project Types
    projectTypeLabel: 'Proje Türü',
    projectTypeHint: 'Çalıştığınız proje türünü seçin',
    projectTypes: {
      webApp: 'Web Uygulaması',
      webAppDesc: 'Web tabanlı uygulamalar ve siteler',
      mobileGame: 'Mobil Oyun',
      mobileGameDesc: 'Mobil platform oyunları',
      dataAnalysis: 'Veri Analizi',
      dataAnalysisDesc: 'Veri analizi ve görselleştirme',
      desktopApp: 'Masaüstü Uygulaması',
      desktopAppDesc: 'Bilgisayar için uygulamalar',
      api: 'API / Backend',
      apiDesc: 'API ve backend servisleri',
      aiMl: 'AI / Makine Öğrenmesi',
      aiMlDesc: 'Yapay zeka ve ML projeleri',
      ecommerce: 'E-ticaret',
      ecommerceDesc: 'Online satış platformları',
      iot: 'IoT / Gömülü Sistem',
      iotDesc: 'Nesnelerin interneti projeleri',
      blockchain: 'Blockchain / Web3',
      blockchainDesc: 'Blok zinciri tabanlı projeler',
      contentPlatform: 'İçerik Platformu',
      contentPlatformDesc: 'Blog, sosyal medya, içerik siteleri',
      automation: 'Otomasyon / Script',
      automationDesc: 'Otomasyon ve script projeleri',
      other: 'Diğer',
      otherDesc: 'Diğer proje türleri',
    },

    notebookLM: {
      deepResearchTab: 'Derin Araştırma',
      questionPromptsTab: 'Soru Promptları',
      deepResearchDesc: 'Kapsamlı analiz için derin araştırma promptu',
      questionPromptsDesc: 'Konu hakkında AI tarafından oluşturulan sorular',
    },

    randomizer: {
      button: 'Rastgele',
      buttonTooltip: 'Yaratıcı, beklenmedik bir prompt oluştur',
      generating: 'Rastgeleştiriliyor...',
    },

    // Complexity Levels
    complexity: {
      simple: 'Basit',
      balanced: 'Dengeli',
      detailed: 'Detaylı',
      expert: 'Uzman',
      simpleDesc: 'Direkt ve net',
      balancedDesc: 'Orta seviye detay',
      detailedDesc: 'Kapsamlı',
      expertDesc: 'Son derece detaylı',
      minLabel: 'Basit',
      maxLabel: 'Uzman',
    },

    // Result Terminal
    resultTerminal: 'sonuc.terminal',
    resultPlaceholder: 'Sonuç burada görünecek',
    resultHint: 'Sol taraftaki formu doldurarak başlayın',
    copyButton: 'Kopyala',
    copiedButton: 'Kopyalandı',
    downloadButton: 'İndir',
    newPromptButton: 'Yeni Prompt',
    generating: 'Prompt oluşturuluyor...',

    // Settings Modal
    settingsTitle: 'API Ayarları',
    settingsSubtitle: 'Gemini API anahtarınızı girin',
    apiKeyLabel: 'Gemini API Anahtarı',
    apiKeyPlaceholder: 'AIzaSy...',
    apiKeyValid: 'API anahtarı geçerli! Kaydediliyor...',
    apiKeyInvalid: 'API anahtarı geçersiz. Lütfen kontrol edin.',
    apiKeyError: 'Doğrulama sırasında bir hata oluştu. Lütfen tekrar deneyin.',
    apiKeyInfo: 'API anahtarınız tarayıcınızda yerel olarak saklanır ve sadece Gemini API\'ye doğrudan istek yapmak için kullanılır.',
    getApiKey: 'Google AI Studio\'dan ücretsiz API anahtarı alın',
    clearButton: 'Temizle',
    cancelButton: 'İptal',
    saveButton: 'Kaydet',
    validating: 'Doğrulanıyor...',

    // Toast Messages
    toast: {
      apiKeyRequired: 'Lütfen önce API anahtarınızı ayarlardan girin',
      promptGenerated: 'Prompt başarıyla oluşturuldu!',
      readyForNew: 'Yeni bir prompt oluşturmaya hazırsınız',
      apiKeySaved: 'API anahtarı kaydedildi',
      apiKeyCleared: 'API anahtarı temizlendi',
      copySuccess: 'Panoya kopyalandı!',
      copyError: 'Kopyalama başarısız',
      limitReached: 'Limitiniz Tükendi, yarın tekrar deneyin',
    },

    // Templates
    templates: {
      title: 'Prompt Şablonları',
      subtitle: 'Hazır şablonlardan seçin',
      categories: {
        all: 'Tümü',
        writing: 'Yazı',
        coding: 'Kodlama',
        image: 'Görsel',
        business: 'İş',
        creative: 'Yaratıcı',
      },
      useTemplate: 'Şablonu Kullan',
      selected: 'Seçili Şablon',
      clear: 'Şablonu temizle',
      // Writing Templates
      items: {
        blogPost: {
          title: 'Blog Yazısı',
          description: 'Herhangi bir konuda etkileyici bir blog yazısı oluşturun',
          topic: '[KONU] hakkında kapsamlı bir blog yazısı yaz. Dikkat çekici bir başlık, okuyucuyu içine çeken bir giriş, 3-5 ana nokta içeren gövde bölümü ve etkili bir sonuç ile harekete geçirici mesaj ekle.',
        },
        linkedinPost: {
          title: 'LinkedIn Gönderisi',
          description: 'Profesyonel LinkedIn içeriği',
          topic: '[KONU] hakkında profesyonel bir LinkedIn gönderisi oluştur. Etkileyici olsun, ilgili hashtagler ekle, ilk satırda bir kanca kullan ve etkileşimi teşvik etmek için bir soruyla bitir.',
        },
        emailCampaign: {
          title: 'E-posta Kampanyası',
          description: 'Pazarlama e-posta dizisi',
          topic: '[ÜRÜN/HİZMET] için 3 e-postalık bir pazarlama dizisi yaz. Konu satırları, gövde metni ve harekete geçirici mesajlar içersin. İkna edici ve dönüşüm odaklı olsun.',
        },
        productDescription: {
          title: 'Ürün Açıklaması',
          description: 'İkna edici ürün metni',
          topic: '[ÜRÜN] için ikna edici bir ürün açıklaması yaz. Temel özellikleri, faydaları, benzersiz satış noktalarını vurgula ve dönüşüm sağlayan ikna edici metin ekle.',
        },
        essay: {
          title: 'Akademik Makale',
          description: 'Yapılandırılmış akademik yazı',
          topic: '[KONU] hakkında iyi yapılandırılmış bir akademik makale yaz. Açık bir tez ifadesi, kanıtlarla desteklenmiş argümanlar, karşı argümanlar ve güçlü bir sonuç içersin.',
        },
        // Coding Templates
        codeExplanation: {
          title: 'Kod Açıklaması',
          description: 'Kodu detaylı açıkla',
          topic: 'Bu kodu detaylı açıkla: [KOD]. Her bölümün ne yaptığını analiz et, kullanılan programlama desenlerini belirle ve potansiyel iyileştirme veya optimizasyon önerileri sun.',
        },
        codeReview: {
          title: 'Kod İncelemesi',
          description: 'Profesyonel kod incelemesi',
          topic: 'Şu kod için kapsamlı bir kod incelemesi yap: [KOD]. Hataları, güvenlik sorunlarını, performans darboğazlarını belirle ve en iyi uygulamalar ile refactoring fırsatları öner.',
        },
        apiDesign: {
          title: 'API Tasarımı',
          description: 'REST/GraphQL API tasarımı',
          topic: '[ÖZELLİK/HİZMET] için bir REST API tasarla. Endpointleri, HTTP metodlarını, istek/yanıt şemalarını, kimlik doğrulama gereksinimlerini ve hata yönetimini içersin.',
        },
        databaseSchema: {
          title: 'Veritabanı Şeması',
          description: 'Veritabanı yapısı tasarımı',
          topic: '[UYGULAMA] için bir veritabanı şeması tasarla. Tabloları, sütunları, veri tiplerini, birincil/yabancı anahtarları, indeksleri ve ilişkileri içersin. PostgreSQL için SQL sağla.',
        },
        unitTests: {
          title: 'Birim Testleri',
          description: 'Test senaryoları oluştur',
          topic: 'Şu kod/fonksiyon için kapsamlı birim testleri yaz: [KOD/FONKSİYON]. Kenar durumları, hata senaryoları içersin ve [TEST_FRAMEWORK] kullan. Yüksek kod kapsamayı hedefle.',
        },
        reactComponent: {
          title: 'React Bileşeni',
          description: 'React bileşeni oluştur',
          topic: '[ÖZELLİK] için bir React bileşeni oluştur. Hook kullanan fonksiyonel bileşenler, TypeScript, uygun prop tipleri ve React en iyi uygulamalarını takip et. Tailwind CSS ile stil ekle.',
        },
        fullStackApp: {
          title: 'Full-Stack Uygulama',
          description: 'Tam uygulama mimarisi',
          topic: '[PROJE] için full-stack bir uygulama tasarla. Frontend (React), backend (Node.js/Express), veritabanı şeması, API endpointleri, kimlik doğrulama ve deployment stratejisini içersin.',
        },
        // Image Templates
        midjourneyPortrait: {
          title: 'Portre Fotoğrafı',
          description: 'Gerçekçi portre oluşturma',
          topic: '[KONU]nun büyüleyici bir portresi, profesyonel fotoğrafçılık, yumuşak doğal aydınlatma, sığ alan derinliği, bokeh arka plan, 85mm lens, f/1.8, yüksek çözünürlük, detaylı cilt dokusu, sinematik renk ayarı --ar 2:3 --v 6',
        },
        midjourneyLandscape: {
          title: 'Manzara',
          description: 'Nefes kesen manzaralar',
          topic: 'Nefes kesen [KONUM] manzarası, altın saat aydınlatması, dramatik bulutlar, suda yansıma, ultra geniş açı, 16mm lens, uzun pozlama, canlı renkler, national geographic tarzı, 8k çözünürlük --ar 16:9 --v 6',
        },
        midjourneyLogo: {
          title: 'Logo Tasarımı',
          description: 'Profesyonel logo konseptleri',
          topic: '[MARKA] için minimalist logo tasarımı, [TARZ] tarzı, temiz çizgiler, geometrik şekiller, [RENK] renk paleti, vektör sanatı, profesyonel markalama, beyaz arka plan üzerinde izole --ar 1:1 --v 6',
        },
        midjourneyProduct: {
          title: 'Ürün Çekimi',
          description: 'Ticari ürün fotoğrafçılığı',
          topic: '[ÜRÜN]nün profesyonel ürün fotoğrafçılığı, stüdyo aydınlatması, temiz arka plan, yumuşak gölgeler, yüksek kaliteli ticari tarz, keskin odak, detaylı doku, reklam kalitesi --ar 4:5 --v 6',
        },
        dalleIllustration: {
          title: 'Dijital İllüstrasyon',
          description: 'Sanatsal illüstrasyonlar',
          topic: '[KONU]nun [SANAT_TARZI] tarzında bir dijital illüstrasyonunu oluştur. [RENK ŞEMASI] renkleri kullan. Hava [RÜYA] olsun. Yüksek detay, profesyonel kalite, baskıya uygun.',
        },
        dalleConcept: {
          title: 'Konsept Sanatı',
          description: 'Oyun/film konsept sanatı',
          topic: '[OYUN/FİLM] için konsept sanatı: [SAHNE_AÇIKLAMASI]. [ANA_UNSURLAR] göster. Atmosferik aydınlatma, detaylı ortam, profesyonel konsept sanatı tarzı, artstation kalitesi.',
        },
        // Business Templates
        businessPlan: {
          title: 'İş Planı',
          description: 'Kapsamlı iş stratejisi',
          topic: '[İŞ_FİKRİ] için kapsamlı bir iş planı oluştur. Yönetici özeti, pazar analizi, rekabet ortamı, gelir modeli, pazarlama stratejisi, operasyon planı ve finansal projeksiyonları içersin.',
        },
        pitchDeck: {
          title: 'Pitch Deck',
          description: 'Yatırımcı sunum taslağı',
          topic: '[STARTUP] için bir pitch deck taslağı oluştur. Problem, Çözüm, Pazar Büyüklüğü, İş Modeli, Traction, Rekabet, Ekip, Finansallar ve Talep için slaytları içersin.',
        },
        marketingStrategy: {
          title: 'Pazarlama Stratejisi',
          description: 'Tam pazarlama planı',
          topic: '[ÜRÜN/HİZMET] için kapsamlı bir pazarlama stratejisi geliştir. Hedef kitle personaaları, kanal stratejisi, içerik takvimi, bütçe dağılımı, KPIlar ve büyüme taktiklerini içersin.',
        },
        swotAnalysis: {
          title: 'SWOT Analizi',
          description: 'Stratejik iş analizi',
          topic: '[ŞİRKET/PROJE] için detaylı bir SWOT analizi yap. Güçlü Yönler, Zayıf Yönler, Fırsatlar ve Tehditleri belirle. Her kategori için uygulanabilir içgörüler sağla.',
        },
        jobDescription: {
          title: 'İş İlanı',
          description: 'Profesyonel iş ilanı',
          topic: '[ROL] için ikna edici bir iş ilanı yaz. Şirket tanıtımı, sorumluluklar, gereksinimler, tercih edilen beceriler, yan haklar ve şirket kültürü vurgularını içersin.',
        },
        // Creative Templates
        storyPlot: {
          title: 'Hikaye Kurgusu',
          description: 'Kurgu hikaye taslağı',
          topic: '[PREMİS] hakkında [TÜR] türünde bir hikaye için detaylı bir kurgu taslağı oluştur. 3 perde yapısı, karakter yayları, ana olay noktaları, sürprizler ve tatmin edici bir sonuç içersin.',
        },
        characterDesign: {
          title: 'Karakter Tasarımı',
          description: 'Detaylı karakter profili',
          topic: '[KARAKTER_ADI] için detaylı bir karakter profili oluştur. Fiziksel tanım, kişilik özellikleri, geçmiş, motivasyonlar, kusurlar, ilişkiler ve karakter yayı içersin.',
        },
        videoScript: {
          title: 'Video Senaryosu',
          description: 'YouTube/TikTok senaryosu',
          topic: '[KONU] hakkında [SÜRE] [PLATFORM] videosu için bir senaryo yaz. Kanca, zaman damgalarıyla ana içerik, görsel yönergeler ve harekete geçirici mesaj içersin. Etkileyici ve hızlı tempeli olsun.',
        },
        podcastOutline: {
          title: 'Podcast Bölümü',
          description: 'Podcast yapısı ve soruları',
          topic: '[KONU] hakkında bir podcast bölümü için bir taslaq oluştur. Giriş kancası, bölüm dökümü, ana konuşma noktaları, röportaj soruları ve harekete geçirici mesajlarla bitiş içersin.',
        },
        socialMedia: {
          title: 'Sosyal Medya Kampanyası',
          description: 'Çok platformlu içerik planı',
          topic: '[MARKA/ÜRÜN] için 7 günlük bir sosyal medya kampanyası oluştur. Instagram, Twitter/X, LinkedIn ve TikTok için başlıklar, hashtagler ve yayın takvimi içeren içerik içersin.',
        },
        creativeWriting: {
          title: 'Yaratıcı Yazı',
          description: 'Kısa hikaye veya şiir',
          topic: '[TEM] hakkında [FORM: kısa hikaye/şiir/flash fiction] yaz. [TON] ton kullan. Canlı imgeler, duygusal derinlik ve unutulmaz bir son içersin. Yaklaşık [KELİME_SAYISI] kelime.',
        },
      },
    },

    // History
    history: {
      title: 'Prompt Geçmişi',
      subtitle: 'Daha önce oluşturduğunuz promptlar',
      empty: 'Henüz geçmiş yok',
      clearAll: 'Tümünü Temizle',
      load: 'Yükle',
      delete: 'Sil',
    },

    // Favorites
    favorites: {
      title: 'Favoriler',
      subtitle: 'Favori promptlarınız',
      empty: 'Henüz favori yok',
      add: 'Favorilere Ekle',
      remove: 'Favorilerden Kaldır',
    },

    // Footer
    footer: {
      madeWith: 'ile yapıldı',
      getApiKey: 'API Anahtarı Al',
    },

    // Rate Limit
    rateLimit: {
      title: 'API Limitine Ulaşıldı',
      description: 'Bugün için {{maxRequests}} ücretsiz isteğin tamamını kullandınız.',
      resetsIn: 'Limit {{time}} sonra sıfırlanacak.',
      resetsAt: 'Gece yarısı UTC\'de sıfırlanır',
      usage: 'API Kullanımı: {{count}}/{{max}}',
      remaining: 'Bugün {{remaining}} istek kaldı',
      approachingLimit: 'Günlük limite yaklaşıyorsunuz. Daha fazla istek için farklı bir API anahtarı kullanmayı düşünün.',
    },
  },
};

export const supportedLanguages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
];

export const defaultLanguage = 'en';
