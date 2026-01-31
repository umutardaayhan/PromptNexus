import { motion } from 'framer-motion';
import { Settings, Github, Sparkles } from 'lucide-react';

/**
 * Header Bileşeni
 * Üst navigasyon ve ayarlar butonu
 */
const Header = ({ onSettingsClick, hasApiKey }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 px-4 py-4"
    >
      <div className="max-w-6xl mx-auto">
        <nav className="glass-card px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-cyan/20 blur-lg rounded-full" />
              <Sparkles className="relative w-6 h-6 text-neon-cyan" />
            </div>
            <span className="text-xl font-bold gradient-text">PromptNexus</span>
          </div>

          {/* Sağ Taraf */}
          <div className="flex items-center gap-2">
            {/* API Durum Göstergesi */}
            <div className="hidden sm:flex items-center gap-2 mr-4">
              <div className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
              <span className="text-xs text-text-muted">
                {hasApiKey ? 'API Bağlı' : 'API Gerekli'}
              </span>
            </div>

            {/* GitHub Link */}
            <a
              href="#"
              target="https://github.com/umutardaayhan/promptnexus"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-deepSpace-card transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Ayarlar Butonu */}
            <motion.button
              onClick={onSettingsClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Ayarlar</span>
            </motion.button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;