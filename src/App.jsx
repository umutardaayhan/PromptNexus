import { useState } from 'react';
import { motion } from 'framer-motion';

// Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InputLaboratory from './components/InputLaboratory';
import ResultTerminal from './components/ResultTerminal';
import SettingsModal from './components/SettingsModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import TemplateGallery from './components/TemplateGallery';
import HistoryPanel from './components/HistoryPanel';
import FavoritesPanel from './components/FavoritesPanel';


// Hooks & Services
import { useLocalStorage } from './hooks/useLocalStorage';
import { useLanguage } from './hooks/useLanguage';
import { usePromptHistory } from './hooks/usePromptHistory';
import { useFavorites } from './hooks/useFavorites';
import { useRateLimit } from './hooks/useRateLimit';
import { generatePrompt, generateRandomPrompt } from './services/geminiService';

/**
 * PromptNexus Main Application Component
 * Gemini-powered prompt generator with i18n support
 */
function App() {
  // Language hook
  const { t, currentLanguage, changeLanguage } = useLanguage();

  // History and Favorites hooks
  const {
    history,
    addToHistory,
    deleteFromHistory,
    clearHistory,
    formatTimestamp: formatHistoryTimestamp,
  } = usePromptHistory();

  const {
    favorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    updateFavoriteNote,
    formatTimestamp: formatFavoriteTimestamp,
  } = useFavorites();


  // State
  const [apiKey, setApiKey] = useLocalStorage('gemini_api_key', '');
  
  // Rate limit hook - API anahtarına göre ayrı count tutar
  const {
    incrementRequest,
  } = useRateLimit(apiKey);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTemplateGalleryOpen, setIsTemplateGalleryOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPromptData, setCurrentPromptData] = useState(null);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'info' });

  // Input state for template loading
  const [inputState, setInputState] = useState({
    topic: '',
    targetAI: 'ChatGPT',
    complexity: 5,
    outputLanguage: currentLanguage === 'tr' ? 'Türkçe' : 'English',
    selectedTemplate: null,
    projectType: 'webApp',
  });

  /**
   * Show toast notification
   */
  const showToast = (message, type = 'info') => {
    setToast({ isVisible: true, message, type });
  };

  /**
   * Hide toast notification
   */
  const hideToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  /**
   * Handle random prompt generation
   */
  const handleRandomize = async ({ topic, targetAI, complexity, outputLanguage, projectType, notebookLMMode }) => {
    // Check API key
    if (!apiKey) {
      showToast(t('toast.apiKeyRequired'), 'error');
      setIsSettingsOpen(true);
      return;
    }

    // Increment request count - sadece limit aşıldığında false döner
    if (!incrementRequest()) {
      showToast(t('toast.limitReached'), 'error');
      return;
    }

    setIsLoading(true);
    setResult('');
    setCurrentPromptData({ topic, targetAI, complexity, outputLanguage, projectType });

    // Input alanlarını güncelle
    setInputState({
      topic,
      targetAI,
      complexity,
      outputLanguage,
      projectType,
    });

    try {
      // Rastgele butonu için generateRandomPrompt kullan, ama topic ve targetAI bilgilerini de gönder
      const generatedPrompt = targetAI === 'NotebookLM'
        ? await generatePrompt({
            apiKey,
            topic,
            targetAI,
            complexity,
            outputLanguage,
            projectType,
            notebookLMMode
          })
        : await generateRandomPrompt({
            apiKey,
            topic,
            targetAI,
            complexity,
            outputLanguage,
            projectType
          });

      setResult(generatedPrompt);
      
      // Add to history
      addToHistory({
        topic,
        result: generatedPrompt,
        targetAI,
        complexity,
        outputLanguage,
        projectType,
      });

      showToast(t('toast.promptGenerated'), 'success');
    } catch (error) {
      console.error('Random prompt generation error:', error);
      showToast(error.message, 'error');

      // Open settings if API key error
      if (error.message.includes('API') || error.message.includes('Invalid')) {
        setIsSettingsOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle prompt generation
   */
  const handleGenerate = async ({ topic, targetAI, complexity, outputLanguage, projectType, notebookLMMode }) => {
    // Check API key
    if (!apiKey) {
      showToast(t('toast.apiKeyRequired'), 'error');
      setIsSettingsOpen(true);
      return;
    }

    // Increment request count - sadece limit aşıldığında false döner
    if (!incrementRequest()) {
      showToast(t('toast.limitReached'), 'error');
      return;
    }

    setIsLoading(true);
    setResult('');
    setCurrentPromptData({ topic, targetAI, complexity, outputLanguage, projectType });

    try {
      const generatedPrompt = await generatePrompt({
        apiKey,
        topic,
        targetAI,
        complexity,
        outputLanguage,
        projectType,
        notebookLMMode
      });

      setResult(generatedPrompt);

      // Add to history
      addToHistory({
        topic,
        result: generatedPrompt,
        targetAI,
        complexity,
        outputLanguage,
        projectType,
      });

      showToast(t('toast.promptGenerated'), 'success');
    } catch (error) {
      console.error('Prompt generation error:', error);
      showToast(error.message, 'error');
      
      // Open settings if API key error
      if (error.message.includes('API') || error.message.includes('Invalid')) {
        setIsSettingsOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset results
   */
  const handleReset = () => {
    setResult('');
    setCurrentPromptData(null);
    showToast(t('toast.readyForNew'), 'info');
  };

  /**
   * Save API key
   */
  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    if (newKey) {
      showToast(t('toast.apiKeySaved'), 'success');
    } else {
      showToast(t('toast.apiKeyCleared'), 'info');
    }
  };

  /**
   * Handle template selection
   */
  const handleSelectTemplate = (template) => {
    setInputState({
      topic: template.topic,
      targetAI: template.defaultTargetAI,
      complexity: template.defaultComplexity,
      outputLanguage: currentLanguage === 'tr' ? 'Türkçe' : 'English',
      selectedTemplate: template, // Şablon bilgisini de sakla
      projectType: template.defaultProjectType || 'webApp',
    });
  };

  /**
   * Handle clearing selected template
   */
  const handleClearTemplate = () => {
    setInputState((prev) => ({
      ...prev,
      selectedTemplate: null,
    }));
  };

  /**
   * Handle loading from history
   */
  const handleLoadHistory = (entry) => {
    setInputState({
      topic: entry.topic,
      targetAI: entry.targetAI,
      complexity: entry.complexity,
      outputLanguage: entry.outputLanguage,
      projectType: entry.projectType || 'webApp',
    });
    setResult(entry.result);
    setCurrentPromptData({
      topic: entry.topic,
      targetAI: entry.targetAI,
      complexity: entry.complexity,
      outputLanguage: entry.outputLanguage,
      projectType: entry.projectType || 'webApp',
    });
  };

  /**
   * Handle loading from favorites
   */
  const handleLoadFavorite = (favorite) => {
    setInputState({
      topic: favorite.topic,
      targetAI: favorite.targetAI,
      complexity: favorite.complexity,
      outputLanguage: favorite.outputLanguage,
      projectType: favorite.projectType || 'webApp',
    });
    setResult(favorite.result);
    setCurrentPromptData({
      topic: favorite.topic,
      targetAI: favorite.targetAI,
      complexity: favorite.complexity,
      outputLanguage: favorite.outputLanguage,
      projectType: favorite.projectType || 'webApp',
    });
  };

  /**
   * Handle toggle favorite
   */
  const handleToggleFavorite = () => {
    if (!result || !currentPromptData) return;

    const promptData = {
      topic: currentPromptData.topic,
      result,
      targetAI: currentPromptData.targetAI,
      complexity: currentPromptData.complexity,
      outputLanguage: currentPromptData.outputLanguage,
    };

    const isNowFavorite = toggleFavorite(promptData);
    showToast(
      isNowFavorite ? t('favorites.add') : t('favorites.remove'),
      isNowFavorite ? 'success' : 'info'
    );
  };

  return (
    <div className="min-h-screen bg-deepSpace-bg">
      {/* Header */}
      <Header 
        onSettingsClick={() => setIsSettingsOpen(true)} 
        hasApiKey={!!apiKey}
        onHistoryClick={() => setIsHistoryOpen(true)}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
        onLanguageChange={changeLanguage}
        currentLanguage={currentLanguage}
        historyCount={history.length}
        favoritesCount={favorites.length}
        t={t}
      />

      {/* Main Content */}
      <main className="pt-20 sm:pt-24 pb-6 sm:pb-8 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <HeroSection t={t} />

          {/* Content Grid */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Left Side - Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <InputLaboratory
                onGenerate={handleGenerate}
                onRandomize={handleRandomize}
                isLoading={isLoading}
                onOpenTemplates={() => setIsTemplateGalleryOpen(true)}
                onClearTemplate={handleClearTemplate}
                initialTopic={inputState.topic}
                initialTargetAI={inputState.targetAI}
                initialComplexity={inputState.complexity}
                initialOutputLanguage={inputState.outputLanguage}
                initialSelectedTemplate={inputState.selectedTemplate}
                initialProjectType={inputState.projectType}
                t={t}
              />
            </motion.div>

            {/* Right Side - Result Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ResultTerminal 
                result={result}
                isLoading={isLoading}
                onReset={handleReset}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={isFavorite(result)}
                t={t}
              />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer t={t} />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onSave={handleSaveApiKey}
        t={t}
      />

      {/* Template Gallery */}
      <TemplateGallery
        isOpen={isTemplateGalleryOpen}
        onClose={() => setIsTemplateGalleryOpen(false)}
        onSelectTemplate={handleSelectTemplate}
        t={t}
      />

      {/* History Panel */}
      <HistoryPanel
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onLoadHistory={handleLoadHistory}
        onDeleteHistory={deleteFromHistory}
        onClearHistory={clearHistory}
        formatTimestamp={formatHistoryTimestamp}
        t={t}
      />

      {/* Favorites Panel */}
      <FavoritesPanel
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onLoadFavorite={handleLoadFavorite}
        onRemoveFavorite={removeFromFavorites}
        onUpdateNote={updateFavoriteNote}
        formatTimestamp={formatFavoriteTimestamp}
        t={t}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}

export default App;
