import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, ExternalLink, AlertCircle, Check } from 'lucide-react';
import { validateApiKey } from '../services/geminiService';

/**
 * SettingsModal Component
 * Modal window for API key input
 */
const SettingsModal = ({ isOpen, onClose, apiKey, onSave, t }) => {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState(null); // null, 'valid', 'invalid'
  const [errorMessage, setErrorMessage] = useState('');

  // Update input when modal opens
  useEffect(() => {
    if (isOpen) {
      setInputKey(apiKey || '');
      setValidationStatus(null);
      setErrorMessage('');
    }
  }, [isOpen, apiKey]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  const handleSave = async () => {
    if (!inputKey.trim()) {
      onSave('');
      onClose();
      return;
    }

    setIsValidating(true);
    setValidationStatus(null);
    setErrorMessage('');

    try {
      const isValid = await validateApiKey(inputKey.trim());
      
      if (isValid) {
        setValidationStatus('valid');
        onSave(inputKey.trim());
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setValidationStatus('invalid');
        setErrorMessage(t('apiKeyInvalid'));
      }
    } catch (error) {
      setValidationStatus('invalid');
      setErrorMessage(t('apiKeyError'));
    } finally {
      setIsValidating(false);
    }
  };

  const handleClear = () => {
    setInputKey('');
    setValidationStatus(null);
    setErrorMessage('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal Container - Centered with flexbox */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md"
            >
              <div className="glass-card overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neon-cyan/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neon-cyan/10">
                      <Key className="w-5 h-5 text-neon-cyan" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-text-primary">{t('settingsTitle')}</h2>
                      <p className="text-xs text-text-muted">{t('settingsSubtitle')}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-deepSpace-card transition-colors"
                  >
                    <X className="w-5 h-5 text-text-muted hover:text-text-primary" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                  {/* API Key Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">
                      {t('apiKeyLabel')}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={inputKey}
                        onChange={(e) => {
                          setInputKey(e.target.value);
                          setValidationStatus(null);
                          setErrorMessage('');
                        }}
                        placeholder={t('apiKeyPlaceholder')}
                        className={`input-field pr-10 ${
                          validationStatus === 'valid' ? 'border-green-500 focus:border-green-500' : ''
                        } ${
                          validationStatus === 'invalid' ? 'border-red-500 focus:border-red-500' : ''
                        }`}
                      />
                      {validationStatus === 'valid' && (
                        <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                      {validationStatus === 'invalid' && (
                        <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    
                    {/* Status Messages */}
                    {validationStatus === 'valid' && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-green-400"
                      >
                        {t('apiKeyValid')}
                      </motion.p>
                    )}
                    {errorMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errorMessage}
                      </motion.p>
                    )}
                  </div>

                  {/* Info Card */}
                  <div className="p-4 rounded-lg bg-neon-cyan/5 border border-neon-cyan/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                      <div className="space-y-2">
                        <p className="text-sm text-text-secondary">
                          {t('apiKeyInfo')}
                        </p>
                        <a
                          href="https://aistudio.google.com/app/apikey"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-neon-cyan hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {t('getApiKey')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-neon-cyan/10">
                  <button
                    onClick={handleClear}
                    className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {t('clearButton')}
                  </button>
                  <button
                    onClick={onClose}
                    className="btn-secondary"
                  >
                    {t('cancelButton')}
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isValidating}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                  >
                    {isValidating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-deepSpace-bg border-t-transparent rounded-full animate-spin" />
                        <span>{t('validating')}</span>
                      </>
                    ) : (
                      <span>{t('saveButton')}</span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;