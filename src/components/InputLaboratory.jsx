import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Target, Wand2, Globe, LayoutGrid, Shuffle, BookOpen, HelpCircle, X, FileText } from 'lucide-react';
import ComplexitySlider from './ComplexitySlider';

/**
 * InputLaboratory Component
 * User input card - Topic text area and Target AI selection
 */
const InputLaboratory = ({
  onGenerate,
  isLoading,
  onOpenTemplates,
  onRandomize,
  onClearTemplate,
  initialTopic = '',
  initialTargetAI = 'ChatGPT',
  initialComplexity = 5,
  initialOutputLanguage = 'English',
  initialSelectedTemplate = null,
  t
}) => {
  const [topic, setTopic] = useState(initialTopic);
  const [targetAI, setTargetAI] = useState(initialTargetAI);
  const [complexity, setComplexity] = useState(initialComplexity);
  const [outputLanguage, setOutputLanguage] = useState(initialOutputLanguage);
  const [notebookLMMode, setNotebookLMMode] = useState('deepResearch'); // 'deepResearch' | 'questionPrompts'
  const [selectedTemplate, setSelectedTemplate] = useState(initialSelectedTemplate); // Seçili şablonu takip et

  // Şablonu temizleme fonksiyonu
  const handleClearTemplate = () => {
    setSelectedTemplate(null);
    if (onClearTemplate) {
      onClearTemplate();
    }
  };

  const targetAIOptions = [
    { value: 'ChatGPT', label: t('targetAI.ChatGPT'), description: t('targetAIDescriptions.ChatGPT') },
    { value: 'Claude', label: t('targetAI.Claude'), description: t('targetAIDescriptions.Claude') },
    { value: 'Midjourney', label: t('targetAI.Midjourney'), description: t('targetAIDescriptions.Midjourney') },
    { value: 'DALL-E', label: t('targetAI.DALLE'), description: t('targetAIDescriptions.DALLE') },
    { value: 'Gemini', label: t('targetAI.Gemini'), description: t('targetAIDescriptions.Gemini') },
    { value: 'Cursor', label: t('targetAI.Cursor'), description: t('targetAIDescriptions.Cursor') },
    { value: 'Antigravity', label: t('targetAI.Antigravity'), description: t('targetAIDescriptions.Antigravity') },
    { value: 'KiloCode', label: t('targetAI.KiloCode'), description: t('targetAIDescriptions.KiloCode') },
    { value: 'GitHubCopilot', label: t('targetAI.GitHubCopilot'), description: t('targetAIDescriptions.GitHubCopilot') },
    { value: 'Windsurf', label: t('targetAI.Windsurf'), description: t('targetAIDescriptions.Windsurf') },
    { value: 'NotebookLM', label: t('targetAI.NotebookLM'), description: t('targetAIDescriptions.NotebookLM') },
  ];

  const outputLanguageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Türkçe', label: 'Türkçe' },
    { value: 'Deutsch', label: 'Deutsch' },
    { value: 'Español', label: 'Español' },
    { value: 'Français', label: 'Français' },
    { value: 'Italiano', label: 'Italiano' },
    { value: 'Português', label: 'Português' },
    { value: 'Русский', label: 'Русский' },
    { value: '中文', label: '中文' },
    { value: '日本語', label: '日本語' },
    { value: '한국어', label: '한국어' },
    { value: 'العربية', label: 'العربية' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    onGenerate({
      topic: topic.trim(),
      targetAI,
      complexity,
      outputLanguage,
      notebookLMMode: targetAI === 'NotebookLM' ? notebookLMMode : undefined
    });
  };

  const handleRandomize = () => {
    if (onRandomize) {
      // Eğer bir şablon seçiliyse, şablonun değerlerini kullan
      if (selectedTemplate) {
        onRandomize({
          topic: selectedTemplate.topic,
          targetAI: selectedTemplate.defaultTargetAI,
          complexity: selectedTemplate.defaultComplexity,
          outputLanguage: outputLanguage,
          notebookLMMode: selectedTemplate.defaultTargetAI === 'NotebookLM' ? notebookLMMode : undefined
        });
      } else {
        // Mevcut değerleri veya rastgele değerleri kullan
        const randomTargetAI = targetAI || targetAIOptions[Math.floor(Math.random() * targetAIOptions.length)].value;
        const randomComplexity = complexity || Math.floor(Math.random() * 10) + 1;
        const randomOutputLanguage = outputLanguage || outputLanguageOptions[Math.floor(Math.random() * outputLanguageOptions.length)].value;
        
        // Eğer konu boşsa, şablonlardan rastgele bir konu seç
        const randomTopic = topic.trim() || getRandomTemplateTopic();
        
        onRandomize({
          topic: randomTopic,
          targetAI: randomTargetAI,
          complexity: randomComplexity,
          outputLanguage: randomOutputLanguage,
          notebookLMMode: randomTargetAI === 'NotebookLM' ? notebookLMMode : undefined
        });
      }
    }
  };

  // Rastgele şablon konusu getir
  const getRandomTemplateTopic = () => {
    const randomTopics = [
      'yapay zeka ve etik',
      'sürdürülebilir enerji çözümleri',
      'uzay keşfi',
      'blok zincir teknolojisi',
      'sanal gerçeklik',
      'kripto para birimleri',
      'küresel iklim değişikliği',
      'otonom araçlar',
      'biyoteknoloji',
      'kuantum bilgisayarlar',
      '5G ve iletişim',
      'akıllı şehirler',
      'robotik otomasyon',
      'siber güvenlik',
      'büyük veri analizi'
    ];
    return randomTopics[Math.floor(Math.random() * randomTopics.length)];
  };

  const isNotebookLM = targetAI === 'NotebookLM';

  // useEffect ile initial değerleri güncelle
  useEffect(() => {
    setTopic(initialTopic);
    setTargetAI(initialTargetAI);
    setComplexity(initialComplexity);
    setOutputLanguage(initialOutputLanguage);
    setSelectedTemplate(initialSelectedTemplate);
  }, [initialTopic, initialTargetAI, initialComplexity, initialOutputLanguage, initialSelectedTemplate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass-card p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neon-cyan/10">
              <Wand2 className="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{t('inputLabTitle')}</h2>
              <p className="text-sm text-text-muted">{t('inputLabSubtitle')}</p>
            </div>
          </div>
          
          {/* Templates Button */}
          <motion.button
            onClick={onOpenTemplates}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-colors text-sm"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">{t('templates.title')}</span>
          </motion.button>
        </div>

        {/* Seçili Şablon Bilgisi */}
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm text-text-primary">
                  {t('templates.selected') || 'Selected Template'}: <span className="font-medium text-neon-cyan">{selectedTemplate.title}</span>
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearTemplate}
                className="p-1 rounded-md hover:bg-neon-cyan/20 text-text-muted hover:text-neon-cyan transition-colors"
                title={t('template.clear') || 'Clear template'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic Text Area */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <MessageSquare className="w-4 h-4 text-neon-cyan" />
              {t('topicLabel')}
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t('topicPlaceholder')}
              className="input-field"
              rows={4}
              disabled={isLoading}
            />
            <p className="text-xs text-text-muted">
              {t('topicHint')}
            </p>
          </div>

          {/* Target AI Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <Target className="w-4 h-4 text-neon-cyan" />
              {t('targetModelLabel')}
            </label>
            <select
              value={targetAI}
              onChange={(e) => setTargetAI(e.target.value)}
              className="input-field"
              disabled={isLoading}
            >
              {targetAIOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-text-muted">
              {targetAIOptions.find(opt => opt.value === targetAI)?.description}
            </p>
          </div>

          {/* Output Language Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <Globe className="w-4 h-4 text-neon-cyan" />
              {t('outputLanguageLabel')}
            </label>
            <select
              value={outputLanguage}
              onChange={(e) => setOutputLanguage(e.target.value)}
              className="input-field"
              disabled={isLoading}
            >
              {outputLanguageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-text-muted">
              {t('outputLanguageHint')}
            </p>
          </div>

          {/* Notebook LM Mode Tabs */}
          {isNotebookLM && (
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                <BookOpen className="w-4 h-4 text-neon-cyan" />
                Notebook LM Mode
              </label>
              <div className="flex gap-2 p-1 bg-deepSpace-card rounded-lg">
                <button
                  type="button"
                  onClick={() => setNotebookLMMode('deepResearch')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    notebookLMMode === 'deepResearch'
                      ? 'bg-neon-cyan/20 text-neon-cyan'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                  disabled={isLoading}
                >
                  <BookOpen className="w-4 h-4" />
                  {t('notebookLM.deepResearchTab')}
                </button>
                <button
                  type="button"
                  onClick={() => setNotebookLMMode('questionPrompts')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    notebookLMMode === 'questionPrompts'
                      ? 'bg-neon-cyan/20 text-neon-cyan'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                  disabled={isLoading}
                >
                  <HelpCircle className="w-4 h-4" />
                  {t('notebookLM.questionPromptsTab')}
                </button>
              </div>
              <p className="text-xs text-text-muted">
                {notebookLMMode === 'deepResearch' 
                  ? t('notebookLM.deepResearchDesc') 
                  : t('notebookLM.questionPromptsDesc')}
              </p>
            </div>
          )}

          {/* Complexity Slider */}
          <ComplexitySlider
            value={complexity}
            onChange={setComplexity}
            disabled={isLoading}
            t={t}
          />

          {/* Generate and Randomize Buttons */}
          <div className="flex gap-3">
            <motion.button
              type="submit"
              disabled={!topic.trim() || isLoading}
              whileHover={{ scale: topic.trim() && !isLoading ? 1.02 : 1 }}
              whileTap={{ scale: topic.trim() && !isLoading ? 0.98 : 1 }}
              className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-deepSpace-bg border-t-transparent rounded-full animate-spin" />
                  <span>{t('generatingButton')}</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  <span>{t('generateButton')}</span>
                </>
              )}
            </motion.button>
            
            <motion.button
              type="button"
              onClick={handleRandomize}
              disabled={isLoading}
              whileHover={{ scale: !isLoading ? 1.05 : 1 }}
              whileTap={{ scale: !isLoading ? 0.95 : 1 }}
              className="px-4 btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              title={t('randomizer.buttonTooltip')}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-deepSpace-bg border-t-transparent rounded-full animate-spin" />
              ) : (
                <Shuffle className="w-5 h-5" />
              )}
              <span className="hidden sm:inline">{t('randomizer.button')}</span>
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default InputLaboratory;