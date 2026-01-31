import { useState } from 'react';
import { motion } from 'framer-motion';

// Bileşenler
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InputLaboratory from './components/InputLaboratory';
import ResultTerminal from './components/ResultTerminal';
import SettingsModal from './components/SettingsModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

// Hooks & Services
import { useLocalStorage } from './hooks/useLocalStorage';
import { generatePrompt } from './services/geminiService';

/**
 * PromptNexus Ana Uygulama Bileşeni
 * Gemini destekli prompt oluşturucu
 */
function App() {
  // State
  const [apiKey, setApiKey] = useLocalStorage('gemini_api_key', '');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'info' });

  /**
   * Toast bildirimi gösterir
   */
  const showToast = (message, type = 'info') => {
    setToast({ isVisible: true, message, type });
  };

  /**
   * Toast bildirimini kapatır
   */
  const hideToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  /**
   * Prompt oluşturma işlemi
   */
  const handleGenerate = async ({ topic, targetAI, complexity, outputLanguage }) => {
    // API anahtarı kontrolü
    if (!apiKey) {
      showToast('Lütfen önce API anahtarınızı ayarlardan girin', 'error');
      setIsSettingsOpen(true);
      return;
    }

    setIsLoading(true);
    setResult('');

    try {
      const generatedPrompt = await generatePrompt({
        apiKey,
        topic,
        targetAI,
        complexity,
        outputLanguage
      });

      setResult(generatedPrompt);
      showToast('Prompt başarıyla oluşturuldu!', 'success');
    } catch (error) {
      console.error('Prompt oluşturma hatası:', error);
      showToast(error.message, 'error');
      
      // API anahtarı hatası varsa ayarları aç
      if (error.message.includes('API anahtarı') || error.message.includes('Geçersiz')) {
        setIsSettingsOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sonuçları sıfırla
   */
  const handleReset = () => {
    setResult('');
    showToast('Yeni bir prompt oluşturmaya hazırsınız', 'info');
  };

  /**
   * API anahtarını kaydet
   */
  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    if (newKey) {
      showToast('API anahtarı kaydedildi', 'success');
    } else {
      showToast('API anahtarı temizlendi', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-deepSpace-bg">
      {/* Header */}
      <Header 
        onSettingsClick={() => setIsSettingsOpen(true)} 
        hasApiKey={!!apiKey}
      />

      {/* Ana İçerik */}
      <main className="pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Bölümü */}
          <HeroSection />

          {/* İçerik Grid */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Sol Taraf - Giriş Formu */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <InputLaboratory 
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
            </motion.div>

            {/* Sağ Taraf - Sonuç Terminali */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ResultTerminal 
                result={result}
                isLoading={isLoading}
                onReset={handleReset}
              />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Ayarlar Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onSave={handleSaveApiKey}
      />

      {/* Toast Bildirim */}
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