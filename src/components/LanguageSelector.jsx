import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { supportedLanguages } from '../i18n/translations';

/**
 * LanguageSelector Component
 * Dropdown for selecting application language
 */
const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = supportedLanguages.find(
    (lang) => lang.code === currentLanguage
  );

  const handleSelect = (langCode) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-deepSpace-card transition-colors"
        title="Select Language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline text-xs sm:text-sm font-medium">
          {currentLang?.flag} {currentLang?.label}
        </span>
        <span className="sm:hidden text-sm">{currentLang?.flag}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-44 sm:w-48 py-2 rounded-lg bg-deepSpace-card border border-neon-cyan/20 shadow-xl z-50 max-h-[70vh] overflow-y-auto"
          >
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 text-xs sm:text-sm transition-colors ${
                  currentLanguage === lang.code
                    ? 'text-neon-cyan bg-neon-cyan/10'
                    : 'text-text-primary hover:bg-deepSpace-bg'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </span>
                {currentLanguage === lang.code && (
                  <Check className="w-4 h-4" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
