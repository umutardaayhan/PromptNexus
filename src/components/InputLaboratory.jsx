import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Target, Wand2, Globe } from 'lucide-react';
import ComplexitySlider from './ComplexitySlider';

/**
 * InputLaboratory Bileşeni
 * Kullanıcı giriş kartı - Konu metin alanı ve Hedef AI seçimi
 */
const InputLaboratory = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [targetAI, setTargetAI] = useState('ChatGPT');
  const [complexity, setComplexity] = useState(5);
  const [outputLanguage, setOutputLanguage] = useState('Türkçe');

  const targetAIOptions = [
    { value: 'ChatGPT', label: 'ChatGPT (GPT-4)', description: 'Genel amaçlı sohbet ve görevler' },
    { value: 'Claude', label: 'Claude (Anthropic)', description: 'Uzun bağlam ve analiz' },
    { value: 'Midjourney', label: 'Midjourney', description: 'Görsel oluşturma' },
    { value: 'DALL-E', label: 'DALL-E', description: 'Görsel oluşturma' },
    { value: 'Gemini', label: 'Gemini', description: 'Google AI görevleri' },
    { value: 'Cursor', label: 'Cursor', description: 'AI destekli kod editörü' },
    { value: 'Antigravity', label: 'Antigravity', description: 'Agent IDE ve geliştirme ortamı' },
    { value: 'KiloCode', label: 'Kilo Code', description: 'AI yazılım geliştirme asistanı' },
    { value: 'GitHubCopilot', label: 'GitHub Copilot', description: 'GitHub AI kod asistanı' },
    { value: 'Windsurf', label: 'Windsurf', description: 'AI kod editörü ve agent' },
  ];

  const outputLanguageOptions = [
    { value: 'Türkçe', label: 'Türkçe' },
    { value: 'English', label: 'English' },
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
      outputLanguage
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass-card p-6 md:p-8">
        {/* Başlık */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-neon-cyan/10">
            <Wand2 className="w-5 h-5 text-neon-cyan" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Giriş Laboratuvarı</h2>
            <p className="text-sm text-text-muted">Fikrinizi detaylandırın</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Konu Metin Alanı */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <MessageSquare className="w-4 h-4 text-neon-cyan" />
              Konunuz
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Örn: Bir yazılım mühendisi için etkili bir LinkedIn profili özeti yaz..."
              className="input-field"
              rows={4}
              disabled={isLoading}
            />
            <p className="text-xs text-text-muted">
              Ne oluşturmak istediğinizi kısaca açıklayın
            </p>
          </div>

          {/* Hedef AI Seçimi */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <Target className="w-4 h-4 text-neon-cyan" />
              Hedef Model
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

          {/* Çıktı Dili Seçimi */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <Globe className="w-4 h-4 text-neon-cyan" />
              Çıktı Dili
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
              Oluşturulacak promptun dili
            </p>
          </div>

          {/* Karmaşıklık Kaydırıcısı */}
          <ComplexitySlider
            value={complexity}
            onChange={setComplexity}
            disabled={isLoading}
          />

          {/* Oluştur Butonu */}
          <motion.button
            type="submit"
            disabled={!topic.trim() || isLoading}
            whileHover={{ scale: topic.trim() && !isLoading ? 1.02 : 1 }}
            whileTap={{ scale: topic.trim() && !isLoading ? 0.98 : 1 }}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-deepSpace-bg border-t-transparent rounded-full animate-spin" />
                <span>Oluşturuluyor...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Prompt Oluştur</span>
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default InputLaboratory;