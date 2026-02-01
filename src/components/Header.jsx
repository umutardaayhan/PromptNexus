import { motion } from 'framer-motion';
import { Settings, Github, Sparkles, History, Heart } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

/**
 * Header Component
 * Top navigation with settings, language selector, and feature buttons
 */
const Header = ({ 
  onSettingsClick, 
  hasApiKey, 
  onHistoryClick, 
  onFavoritesClick,
  onLanguageChange,
  currentLanguage,
  historyCount,
  favoritesCount,
  t 
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 px-2 sm:px-4 py-2 sm:py-4"
    >
      <div className="max-w-6xl mx-auto">
        <nav className="glass-card px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-cyan/20 blur-lg rounded-full" />
              <Sparkles className="relative w-5 h-5 sm:w-6 sm:h-6 text-neon-cyan" />
            </div>
            <span className="text-lg sm:text-xl font-bold gradient-text">{t('appName')}</span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
            {/* API Status Indicator */}
            <div className="hidden md:flex items-center gap-2 mr-2">
              <div className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
              <span className="text-xs text-text-muted">
                {hasApiKey ? t('apiConnected') : t('apiRequired')}
              </span>
            </div>

            {/* History Button */}
            <motion.button
              onClick={onHistoryClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-1.5 sm:p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-deepSpace-card transition-colors"
              title={t('history.title')}
            >
              <History className="w-4 h-4 sm:w-5 sm:h-5" />
              {historyCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-neon-cyan text-deepSpace-bg text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center">
                  {historyCount > 9 ? '9+' : historyCount}
                </span>
              )}
            </motion.button>

            {/* Favorites Button */}
            <motion.button
              onClick={onFavoritesClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-1.5 sm:p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-deepSpace-card transition-colors"
              title={t('favorites.title')}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-400 text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center">
                  {favoritesCount > 9 ? '9+' : favoritesCount}
                </span>
              )}
            </motion.button>

            {/* Language Selector */}
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />

            {/* GitHub Link */}
            <a
              href="https://github.com/umutardaayhan/PromptNexus"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-deepSpace-card transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Settings Button */}
            <motion.button
              onClick={onSettingsClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline text-xs sm:text-sm font-medium">{t('settings')}</span>
            </motion.button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;