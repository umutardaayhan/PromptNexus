import { useState, useEffect, useCallback } from 'react';
import { translations, supportedLanguages, defaultLanguage } from '../i18n/translations';

const STORAGE_KEY = 'promptnexus_language';

/**
 * Custom hook for internationalization
 * Manages language state and provides translation function
 */
export const useLanguage = () => {
  // Initialize language from localStorage or default
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && translations[stored]) {
        return stored;
      }
    }
    return defaultLanguage;
  });

  // Persist language preference
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentLanguage);
  }, [currentLanguage]);

  /**
   * Get translation for a key
   * Supports nested keys using dot notation (e.g., 'toast.apiKeyRequired')
   * @param {string} key - Translation key
   * @param {object} params - Optional parameters for interpolation
   * @returns {string} Translated text
   */
  const t = useCallback((key, params = {}) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to default language
        value = translations[defaultLanguage];
        for (const fk of keys) {
          if (value && typeof value === 'object' && fk in value) {
            value = value[fk];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }

    if (typeof value === 'string') {
      // Simple interpolation
      return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
        return params[param] !== undefined ? params[param] : match;
      });
    }

    return value || key;
  }, [currentLanguage]);

  /**
   * Change current language
   * @param {string} langCode - Language code (e.g., 'en', 'tr')
   */
  const changeLanguage = useCallback((langCode) => {
    if (translations[langCode]) {
      setCurrentLanguage(langCode);
    }
  }, []);

  /**
   * Get current language info
   */
  const currentLanguageInfo = supportedLanguages.find(
    (lang) => lang.code === currentLanguage
  );

  return {
    t,
    currentLanguage,
    changeLanguage,
    currentLanguageInfo,
    supportedLanguages,
  };
};
