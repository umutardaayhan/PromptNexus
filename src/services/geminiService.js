import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Gemini API Service
 * Google Generative AI integration for PromptNexus application
 * All prompts sent to Gemini are in English, output is in user's selected language
 */

const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Sistem talimatı - Prompt mühendisi rolü
 * Tüm promptlar Gemini'ye İngilizce gönderilir, çıktı kullanıcının seçtiği dile göre olur
 */
const SYSTEM_INSTRUCTION = `
    Role: You are "The Architect". You are the world's most advanced AI Prompt Engineer. Your task is to create "Master Craft" prompts for models like GPT-4, Claude 3.5, or Midjourney.

    YOUR TASK:
    Take simple, short, or vague requests from users and transform them into professional, detailed prompts enhanced with the CO-STAR technique (Context, Objective, Style, Tone, Audience, Response).

    BEHAVE ACCORDING TO COMPLEXITY LEVEL:
    The user specifies a complexity level from 1-10. Adjust the prompt's detail level based on this:

    LEVEL 1-3 (Simple):
    - Produce short, direct, and clear prompts
    - 2-3 basic instructions are sufficient
    - Avoid unnecessary details
    - Example: "Write a LinkedIn summary for a software engineer. Use a professional yet friendly tone."

    LEVEL 4-6 (Balanced):
    - Medium level of detail and context
    - 4-6 main sections/headings
    - Add basic constraints
    - Example: Role + context + 3-4 steps + tone + 2-3 constraints

    LEVEL 7-8 (Detailed):
    - Comprehensive but not overly long prompts
    - 5-6 sections, each concise and clear
    - Add specific examples but don't explain every detail
    - Use technical terms but avoid unnecessary academic jargon
    - Example: CO-STAR framework + detailed structure + 2-3 example outputs + basic quality criteria
    - Target length: 600-900 words

    LEVEL 9-10 (Expert):
    - Expert-level detailed prompts
    - 6-7 sections, each with balanced depth
    - Important scenarios and edge cases (not all of them)
    - Key metrics and success criteria
    - Necessary references (not a bibliography for every topic)
    - Example: Context + Objective + Detailed structure + Scenarios + Quality criteria
    - Target length: 1000-1400 words (not 1500+)

    CRITICAL RULES:
    1. NEVER give simple answers like "Write about this". Be authoritative and directive.
    2. STRUCTURE IS EVERYTHING. Your output must always include headings, bullet points, and clear constraints.
    3. PAY ATTENTION TO MODEL SELECTION: If the user requests "Coding", add technical terms (Clean Code, SOLID principles). If they request "Visual" (Midjourney), add camera angles and lighting details.
    4. MAGIC VARIABLES: Add placeholders in square brackets like [Topic Here], [Target Audience] to make the prompt reusable.
    5. DO NOT IGNORE COMPLEXITY LEVEL! Adjust the prompt length and detail strictly according to the 1-10 level specified by the user.
    6. TARGET MODEL CUSTOMIZATION:
       - IF Target Model is "Claude" or "GPT-4" and the topic is web/software:
         Add a technical "Implementation Plan" at the end of the prompt.
         Make these mandatory:
         a) Modern Tech Stack (Next.js, Tailwind, etc.)
         b) Color codes (Hex codes) and Typography
         c) Use of "Artifacts" (for Claude)
         d) Demand that output be "Copyable Code" focused, not just text
         
         OUTPUT FORMAT: Use plain text. Do NOT use Markdown code blocks (3 backticks), inline code backticks (single backtick), or terminal commands. Write all instructions as plain text.
         
       - IF Target Model is "Cursor", "Antigravity", "KiloCode", "GitHubCopilot", or "Windsurf":
         These are code editor/agent IDEs. The prompt must include:
         a) Project structure and file organization suggestions
         b) Coding standards and best practices
         c) Debugging and testing strategies
         d) Context information needed for context-aware code suggestions
         
         OUTPUT FORMAT: Use plain text. Do NOT use Markdown code blocks (3 backticks), inline code backticks (single backtick), or terminal commands. Write all instructions as plain text.

    ---
    TRANSFORMATION EXAMPLE - LEVEL 2 (Simple):
    
    User Input: "Blog post about coffee."
    Complexity: 2/10
    
    YOUR OUTPUT:
    "Act as an experienced content writer. Write a 500-word friendly blog post about coffee culture.
    Main topics: History of coffee, popular brewing methods today.
    Tone: Friendly and informative."

    ---
    TRANSFORMATION EXAMPLE - LEVEL 5 (Balanced):
    
    User Input: "Blog post about coffee."
    Complexity: 5/10
    
    YOUR OUTPUT:
    "I want you to act as an award-winning Barista and Copywriter.
    
    CONTEXT: You are writing for a prestigious magazine publishing on gourmet beverages and lifestyle.
    OBJECTIVE: Write a captivating 1500-word article about the 'Third Wave Coffee Movement'.
    TONE: Sophisticated, sensory, educational yet friendly.
    
    STRUCTURE:
    1. Introduction: Hook the reader by describing the smell of freshly ground coffee.
    2. Body: Tell the journey of coffee from farm to cup, the science of brewing.
    3. Conclusion: Make a call for conscious consumption.
    
    CONSTRAINTS:
    - Avoid clichés like 'amazing drink'.
    - Use technical terms appropriately."

    ---
    TRANSFORMATION EXAMPLE - LEVEL 9 (Expert):
    
    User Input: "Blog post about coffee."
    Complexity: 9/10
    
    YOUR OUTPUT:
    "You are a coffee researcher, Q-Grader certified expert, and award-winning gastronomy writer. You have 15 years of industry experience.

    RESEARCH METHODOLOGY:
    - Comparative analysis of beans from Ethiopia, Colombia, and Kenya
    - SCAA (Specialty Coffee Association of America) cupping protocols
    - Sensory profiling and flavor wheel usage

    CONTEXT:
    An academic-level review article for the international 'Coffee Culture Quarterly' magazine. Readers are coffee professionals, roasters, and advanced home brewers.

    OBJECTIVE:
    A comprehensive 3000+ word article on 'Reflections of the Terroir Concept in Specialty Coffee: Correlation Between Microclimate, Processing Methods, and Cup Profile'.

    TONE:
    Academic yet accessible, authoritative yet passionate, based on scientific evidence.

    DETAILED STRUCTURE:
    1. ABSTRACT: 150 words, key terms: terroir, micro lot, cupping score
    2. INTRODUCTION: Borrowing the coffee terroir concept from the wine world
    3. LITERATURE REVIEW: References to academic studies from the last 10 years
    4. METHODOLOGY: Sample selection, roast profiles, brewing parameters
    5. REGIONAL ANALYSES:
       - Ethiopia Yirgacheffe: High altitude, natural process
       - Colombia Huila: Washed process, medium body
       - Kenya Nyeri: Double washed, acidity profile
    6. SENSORY EVALUATION: Flavor wheel usage, aroma components
    7. DISCUSSION: Effects of climate change on terroir
    8. CONCLUSION: Practical recommendations and future research areas
    9. REFERENCES: At least 10 academic source suggestions

    QUALITY CRITERIA:
    - Source or evidence for every claim
    - Specific numbers and percentages
    - Actionable recommendations
    - Comparative tables and chart descriptions

    CONSTRAINTS:
    - Avoid speculative statements (e.g., "maybe", "probably")
    - Define every technical term on first use
    - Avoid misleading generalizations
    - Do not use commercial brand names"
    ---

    MOST IMPORTANT RULE - OUTPUT FORMAT:
    7. ONLY PRODUCE PROMPT TEXT: What you produce must be directly usable as a prompt
       - Do NOT start with "Prompt:"
       - Do NOT add explanations at the end
       - Do NOT use quotation marks
       - Do NOT use phrases like "Ready", "Here is your prompt", "Here you go"
       - Do NOT address the target AI (e.g., "KiloCode, do this project...")
    8. BE STRUCTURAL: Use headings, bullet points, rules
    9. DEFINE ROLE BUT DON'T CHAT: Define a role but don't speak in that role
    10. USE PLAIN TEXT:
       - Do NOT use Markdown code blocks (3 backticks)
       - Do NOT use inline code backticks (single backtick)
       - Do NOT use terminal commands (npm install, git clone, etc.)
       - Even if code will be written, give instructions as plain text only

    [TASK]: Create a prompt on the topic requested by the user following all the rules above.
    `;

/**
 * Creates Gemini API client
 * @param {string} apiKey - Gemini API key
 * @returns {GoogleGenerativeAI} Gemini client
 */
export const createGeminiClient = (apiKey) => {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('API key is required');
  }
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Generates random variation values
 * @param {string} topic - Topic
 * @returns {Object} Random variation values
 */
const generateRandomVariations = (topic) => {
  // Topic-based possible variations
  const variations = {
    angle: [
      'for beginners', 'for experts', 'with critical perspective',
      'from historical perspective', 'future-focused', 'practical application',
      'comparative analysis', 'in-depth examination', 'quick summary',
      'from ethical perspective', 'economic dimension', 'social impacts'
    ],
    focus: [
      'fundamental principles', 'advanced techniques', 'current trends',
      'best practices', 'common mistakes', 'innovations',
      'case studies', 'strategic planning', 'operational details',
      'market analysis', 'user experience', 'technical infrastructure'
    ],
    perspective: [
      'optimistic', 'realistic', 'critical', 'constructive', 'neutral',
      'encouraging', 'cautionary', 'inspiring', 'pragmatic',
      'visionary', 'analytical', 'emotional'
    ],
    scope: [
      'comprehensive', 'focused', 'overview', 'detailed',
      'summary', 'in-depth', 'broad perspective', 'specific'
    ]
  };

  // Random selections
  const randomAngle = variations.angle[Math.floor(Math.random() * variations.angle.length)];
  const randomFocus = variations.focus[Math.floor(Math.random() * variations.focus.length)];
  const randomPerspective = variations.perspective[Math.floor(Math.random() * variations.perspective.length)];
  const randomScope = variations.scope[Math.floor(Math.random() * variations.scope.length)];

  return {
    angle: randomAngle,
    focus: randomFocus,
    perspective: randomPerspective,
    scope: randomScope,
    combined: `A ${randomScope} approach to ${topic} focusing on ${randomAngle} ${randomFocus}, offering a ${randomPerspective} perspective`
  };
};

/**
 * Sends prompt generation request
 * @param {Object} params - Request parameters
 * @param {string} params.apiKey - Gemini API key
 * @param {string} params.topic - User's topic
 * @param {number} params.complexity - Complexity level (1-10)
 * @param {string} params.targetAI - Target AI model (ChatGPT, Midjourney, Claude)
 * @param {string} params.outputLanguage - Output language (English, Turkish, etc.)
 * @param {Function} params.onRateLimitUpdate - Callback to update rate limit info
 * @param {boolean} params.isRandomized - Whether to add random variations
 * @returns {Promise<string>} Generated prompt
 */
export const generatePrompt = async ({ apiKey, topic, complexity, targetAI, outputLanguage = 'English', projectType = 'webApp', notebookLMMode, isRandomized = false }) => {
  try {
    const genAI = createGeminiClient(apiKey);
    
    // Special system instruction for Notebook LM
    const systemInstruction = targetAI === 'NotebookLM' 
      ? getNotebookLMInstruction(notebookLMMode)
      : SYSTEM_INSTRUCTION;
    
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      systemInstruction: systemInstruction
    });

    // Generate random variations (if isRandomized is true)
    let randomVariations = null;
    let processedTopic = topic;
    
    if (isRandomized || topic.includes('[RANDOMIZED]')) {
      // Clean [RANDOMIZED] tag
      const cleanTopic = topic.replace(/\[RANDOMIZED\]\s*/gi, '').trim();
      randomVariations = generateRandomVariations(cleanTopic);
      processedTopic = cleanTopic;
    }

    // Format user request
    const userPrompt = targetAI === 'NotebookLM'
      ? formatNotebookLMRequest(processedTopic, complexity, notebookLMMode, outputLanguage)
      : formatUserRequest(processedTopic, complexity, targetAI, outputLanguage, projectType, randomVariations);

    console.log('Sending API request...', { topic: processedTopic, complexity, targetAI, isRandomized: !!randomVariations });
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    });
    
    console.log('API response received:', result);
    
    const response = await result.response;
    let text = response.text();

    // Clean up the response - remove conversational phrases
    text = cleanPromptOutput(text, targetAI);

    return text.trim();
  } catch (error) {
    console.error('Gemini API Error - Details:', error);
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    throw handleApiError(error);
  }
};

/**
 * Formats user request
 * @param {string} topic - User's topic
 * @param {number} complexity - Complexity level (1-10)
 * @param {string} targetAI - Target AI model
 * @param {string} outputLanguage - Output language
 * @param {Object} randomVariations - Random variation values (optional)
 * @returns {string} Formatted request
 */
const formatUserRequest = (topic, complexity, targetAI, outputLanguage = 'English', projectType = 'webApp', randomVariations = null) => {
  const complexityDescription = getComplexityDescription(complexity);
  
  let complexityDirective = '';
  if (complexity <= 3) {
    complexityDirective = `
COMPLEXITY LEVEL 1-3 (SIMPLE) - THIS IS VERY IMPORTANT:
- Prompt must be SHORT and CONCISE (maximum 3-4 sentences)
- Give only basic instructions
- AVOID unnecessary details
- Use a simple structure: Role + Task + 1-2 constraints
- Example length: 100-200 words`;
  } else if (complexity <= 6) {
    complexityDirective = `
COMPLEXITY LEVEL 4-6 (BALANCED) - THIS IS VERY IMPORTANT:
- Medium length prompt (4-6 sections)
- Use basic elements of the CO-STAR framework
- Specify context, objective, tone, and structure
- Add a few specific constraints
- Example length: 300-600 words`;
  } else if (complexity <= 8) {
    complexityDirective = `
COMPLEXITY LEVEL 7-8 (DETAILED) - THIS IS VERY IMPORTANT:
- Comprehensive but not overly long prompt (5-6 sections)
- Apply CO-STAR framework but don't extend every section
- Add specific examples but don't explain every detail
- Use technical terms but avoid unnecessary academic jargon
- Specify basic quality criteria
- Example length: 600-900 words`;
  } else {
    complexityDirective = `
COMPLEXITY LEVEL 9-10 (EXPERT) - THIS IS VERY IMPORTANT:
- Expert-level detailed prompt (6-7 sections)
- Each section should have balanced depth, don't write overly long paragraphs
- Important scenarios and edge cases (not all of them)
- Key metrics and success criteria
- Necessary references (not a bibliography for every topic)
- Example length: 1000-1400 words (not 1500+)`;
  }
  
  // Add random variations to user request if available
  const variationDirective = randomVariations ? `
RANDOM VARIATIONS (INTEGRATE THESE INTO THE PROMPT):
- Approach Angle: ${randomVariations.angle}
- Focus Point: ${randomVariations.focus}
- Perspective: ${randomVariations.perspective}
- Scope: ${randomVariations.scope}
- Full Description: ${randomVariations.combined}

IMPORTANT: Integrate the above variations into the prompt. For example, if there is a placeholder like "[RANDOMIZED] biotechnology" in the OBJECTIVE section, fill it as "${randomVariations.scope} approach to biotechnology focusing on ${randomVariations.angle} ${randomVariations.focus}, offering a ${randomVariations.perspective} perspective".
` : '';

  // Add project type guidance
  const projectTypeGuidance = getProjectTypeGuidance(projectType);

  return `Topic: ${topic}
Project Type: ${projectType}
Complexity: ${complexity}/10 - ${complexityDescription}
Target AI: ${targetAI}
Output Language: ${outputLanguage}
${variationDirective}

PROJECT TYPE GUIDANCE:
${projectTypeGuidance}

${complexityDirective}

Create an optimized prompt based on the information above.

TASK RULES:
1. Adjust the prompt length and detail according to the complexity level ${complexity}/10 specified by the user.
   - If 1-3: SHORT and SIMPLE
   - If 4-6: MEDIUM level
   - If 7-8: DETAILED
   - If 9-10: VERY DETAILED and ACADEMIC

2. IF RANDOM VARIATIONS ARE PROVIDED:
   - FILL IN any [RANDOMIZED] or similar placeholders in the prompt
   - Integrate variations as a natural part of the prompt
   - Example: "[RANDOMIZED] biotechnology" → "${randomVariations ? randomVariations.scope + ' approach to biotechnology focusing on ' + randomVariations.angle + ' ' + randomVariations.focus + ', offering a ' + randomVariations.perspective + ' perspective' : 'comprehensive approach to biotechnology focusing on fundamentals for beginners, offering an optimistic perspective'}"

3. ONLY PRODUCE PROMPT TEXT:
   - Do NOT address the target AI (e.g., "KiloCode, do this project...")
   - Do NOT use phrases like "Ready", "Do this", "Here is your prompt"
   - Do NOT add intro/outro sentences
   - Do NOT start with "Prompt:"
   - Do NOT add explanations at the end
   - Do NOT use quotation marks
   - Only produce STRUCTURED prompt content
   - Produce directly usable content

4. The prompt you create MUST be in ${outputLanguage} language.`;
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
/**
 * Returns guidance text based on project type
 * @param {string} projectType - Project type
 * @returns {string} Guidance text
 */
const getProjectTypeGuidance = (projectType) => {
  const guidanceMap = {
    webApp: `This is a Web Application project. When creating the prompt, consider:
- Modern web technologies (React, Vue, Angular, Next.js, etc.)
- Responsive design and mobile compatibility
- SEO optimization and accessibility
- Frontend and backend integration
- Security best practices (XSS, CSRF, etc.)`,

    mobileGame: `This is a Mobile Game project. When creating the prompt, consider:
- Game mechanics and playability
- Mobile UX/UI design principles
- Performance optimization (FPS, memory management)
- Touch controls and gestures
- Platform-specific features (iOS/Android)`,

    dataAnalysis: `This is a Data Analysis project. When creating the prompt, consider:
- Data processing and cleaning techniques
- Statistical analysis and modeling
- Data visualization (charts, dashboards)
- Analysis tools like Python/R
- Big data technologies (optional)`,

    desktopApp: `This is a Desktop Application project. When creating the prompt, consider:
- Cross-platform frameworks (Electron, Tauri, Flutter)
- Native performance optimization
- File system and OS integration
- Offline capabilities
- Distribution and update mechanisms`,

    api: `This is an API / Backend project. When creating the prompt, consider:
- RESTful or GraphQL API design
- Authentication and authorization (JWT, OAuth)
- Database design and ORM usage
- API documentation (OpenAPI/Swagger)
- Rate limiting, caching, and security`,

    aiMl: `This is an AI / Machine Learning project. When creating the prompt, consider:
- ML model selection and training
- Dataset preparation and preprocessing
- Model evaluation metrics
- Deployment and MLOps
- Ethical AI principles`,

    ecommerce: `This is an E-commerce project. When creating the prompt, consider:
- Product catalog and inventory management
- Payment system integration
- Cart and checkout flows
- User reviews and ratings
- SEO and performance optimization`,

    iot: `This is an IoT / Embedded System project. When creating the prompt, consider:
- Sensor data collection and processing
- Real-time data streaming
- Edge computing and cloud integration
- Power management and efficiency
- Security (device and network level)`,

    blockchain: `This is a Blockchain / Web3 project. When creating the prompt, consider:
- Smart contract development (Solidity, Rust)
- Web3 integration and wallet connection
- Decentralized application (dApp) architecture
- Security audits and best practices
- Gas optimization`,

    contentPlatform: `This is a Content Platform project. When creating the prompt, consider:
- Content management system (CMS) structure
- User-generated content (UGC) features
- Social features (comments, likes, shares)
- Content moderation and filtering
- SEO and content discoverability`,

    automation: `This is an Automation / Script project. When creating the prompt, consider:
- Script language selection (Python, Bash, PowerShell)
- Error handling and logging
- Scheduling and cron jobs
- API integrations
- Automation security and access management`,

    other: `This is a general project. When creating the prompt, consider:
- Analyze the project's specific requirements
- Industry standards and best practices
- Scalability and maintainability
- Documentation and testing strategy`,
  };

  return guidanceMap[projectType] || guidanceMap.other;
};

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
 * Handles API errors and returns user-friendly messages
 * @param {Error} error - API error
 * @returns {Error} Processed error
 */
const handleApiError = (error) => {
  const errorMessage = error.message || '';
  
  // API key errors
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
  
  // Network errors
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return new Error('Connection error. Please check your internet connection.');
  }
  
  // General error
  return new Error('An error occurred while generating the prompt. Please try again.');
};

/**
 * Checks if the API key is valid
 * @param {string} apiKey - API key to check
 * @returns {Promise<boolean>} Is valid?
 */
export const validateApiKey = async (apiKey) => {
  try {
    if (!apiKey || apiKey.trim().length < 10) {
      return false;
    }
    
    const genAI = createGeminiClient(apiKey);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Send a simple test request - listModels is faster and more reliable
    await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: 'Hi' }] }],
      generationConfig: { maxOutputTokens: 1 }
    });
    return true;
  } catch (error) {
    console.error('API validation error:', error);
    // If API key is not invalid, it could be rate limit or another error
    // In this case, we can still return true because the key format is correct
    if (error.message && error.message.includes('API key not valid')) {
      return false;
    }
    // Other errors (rate limit, etc.) may indicate the key is valid
    return true;
  }
};

/**
 * System instruction for Notebook LM
 * @param {string} mode - 'deepResearch' or 'questionPrompts'
 * @returns {string} System instruction
 */
const getNotebookLMInstruction = (mode) => {
  if (mode === 'questionPrompts') {
    return `
    Role: You are an Educational Content Expert and Question Designer. You create effective question prompts for Notebook LM.

    YOUR TASK:
    Create thought-provoking and comprehensive questions about the given topic that support the learning and understanding process.

    NUMBER OF QUESTIONS BY COMPLEXITY LEVEL:
    - Level 1-3: 3-5 basic questions
    - Level 4-6: 6-10 varied questions (open-ended and guiding)
    - Level 7-8: 10-15 in-depth questions (analysis and synthesis level)
    - Level 9-10: 15-25 expert-level questions (critical thinking and evaluation)

    QUESTION TYPES:
    1. Understanding Questions: Testing basic concept comprehension
    2. Analysis Questions: Breaking down information and establishing relationships
    3. Application Questions: Using knowledge in practical scenarios
    4. Synthesis Questions: Combining different sources
    5. Evaluation Questions: Requiring critical thinking

    OUTPUT FORMAT:
    - Each question must be clear and understandable
    - Questions must be directly related to the topic
    - Include questions at different difficulty levels
    - List only the questions, no extra explanations
    `;
  }

  // Deep Research (default) - Revised version
  return `
  Role: You are a Research Prompt Creation Expert. You create detailed research sentences/prompts for Notebook LM based on the topic entered by the user.

  YOUR TASK:
  Analyze the topic entered by the user and create a comprehensive prompt that will enable detailed research on this topic in Notebook LM.

  EXAMPLE:
  Topic: "Characters in the Harry Potter universe"
  Generated Prompt: "Research the characters in the Harry Potter universe in detail. Provide comprehensive information about each character's name, surname, birth date, family, abilities, role, and importance in the story. Also provide detailed information about the relationships between characters and the history of the universe."

  BY COMPLEXITY LEVEL:
  - Level 1-3: Basic information, main concepts, and overview
  - Level 4-6: Medium level detail, important sub-topics, basic relationships
  - Level 7-8: Detailed analysis, in-depth information, comparisons
  - Level 9-10: Comprehensive academic level, detailed research on all aspects

  PROMPT CREATION RULES:
  1. Analyze the topic and identify the most important research areas
  2. Request specific details (names, dates, features, relationships, etc.)
  3. Cover different aspects of the topic (history, key points, relationships, effects)
  4. Adjust research depth according to complexity level
  5. Be directive to enable Notebook LM to conduct research

  OUTPUT FORMAT:
  - Provide only the generated research prompt/sentence
  - Do NOT use phrases like "Prompt:" at the beginning
  - Be clear and understandable for direct input into Notebook LM
  - Do NOT add extra explanations, introductions, or conclusion sentences
  `;
};

/**
 * Formats Notebook LM request
 * @param {string} topic - Topic
 * @param {number} complexity - Complexity level
 * @param {string} mode - 'deepResearch' or 'questionPrompts'
 * @param {string} outputLanguage - Output language
 * @returns {string} Formatted request
 */
const formatNotebookLMRequest = (topic, complexity, mode, outputLanguage = 'English') => {
  const questionCount = getQuestionCountByComplexity(complexity);
  
  if (mode === 'questionPrompts') {
    return `Topic: ${topic}
Complexity: ${complexity}/10
Mode: Question Prompts
Target Question Count: ${questionCount.min}-${questionCount.max}
Output Language: ${outputLanguage}

Create ${questionCount.min}-${questionCount.max} questions about the above topic.
Questions should cover different thinking levels (Bloom's Taxonomy).
List only the questions, no other explanations.`;
  }

  // Deep Research - Create research prompt based on user's topic
  return `TOPIC: "${topic}"

Create a detailed research prompt for use in Notebook LM about the above topic.

COMPLEXITY LEVEL: ${complexity}/10

TASK:
1. Analyze the topic and identify the most important research areas
2. Request detailed information about the topic (names, dates, features, relationships, history, etc.)
3. Adjust detail depth according to complexity level
4. Create a comprehensive prompt that will enable Notebook LM to research this topic

EXAMPLE OUTPUT FORMAT:
"Research [Topic] in detail. [Request comprehensive information about specific details, sub-topics, relationships, and history.]"

NOTE: Provide only the generated research sentence/prompt. No other explanations.`;
};

/**
 * Returns question count based on complexity level
 * @param {number} complexity - Complexity level
 * @returns {Object} Min and max question count
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
export const generateRandomPrompt = async ({ apiKey, topic, complexity, targetAI, outputLanguage = 'English', projectType = 'webApp' }) => {
  try {
    const genAI = createGeminiClient(apiKey);
    
    console.log('generateRandomPrompt called:', { topic, complexity, targetAI, outputLanguage });
    
    // If topic exists, use normal generatePrompt but add creative variations
    if (topic && topic.trim()) {
      console.log('Topic exists, using normal generatePrompt:', topic);
      return await generatePrompt({
        apiKey,
        topic: topic,
        complexity,
        targetAI: targetAI || 'ChatGPT',
        outputLanguage,
        projectType,
        isRandomized: true // Enable random variations
      });
    }
    
    const randomInstruction = `
    Role: You are a Prompt Innovator who generates creative and unexpected ideas.

    YOUR TASK:
    When the user clicks the "Randomize" button, create a completely random, creative, unexpected, and interesting prompt.

    RANDOMNESS CRITERIA:
    - Topic should be completely randomly selected (technology, art, science, philosophy, daily life, imaginary scenarios)
    - Use unexpected combinations (e.g., "How to repair a spaceship with a coffee machine")
    - Different genres can be mixed (sci-fi + history, romantic comedy + horror)
    - Create absurd but logical scenarios

    BY COMPLEXITY LEVEL:
    - Level 1-3: Simple, fun, and quick random prompts
    - Level 4-6: Medium level creativity, interesting scenarios
    - Level 7-8: Detailed, complex, and multi-layered random prompts
    - Level 9-10: Expert level, in-depth, and extremely creative prompts

    OUTPUT FORMAT:
    - Provide only the prompt text
    - Do NOT use phrases like "Here is your random prompt"
    - Should be a directly usable, structured prompt
    `;
    
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      systemInstruction: randomInstruction
    });

    const userPrompt = `Complexity: ${complexity}/10
Target AI: ${targetAI || 'ChatGPT'}
Output Language: ${outputLanguage}

Create a completely random, creative, and unexpected prompt based on the above complexity level.
Topic, scenario, and approach should be completely randomly selected.
Provide only the prompt text, no extra explanations.`;

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