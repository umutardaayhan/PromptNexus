import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Terminal, RefreshCw, Download, Heart } from 'lucide-react';

/**
 * ResultTerminal Component
 * Code block style result display - Copy feature
 */
const ResultTerminal = ({ 
  result, 
  isLoading, 
  onReset, 
  onToggleFavorite,
  isFavorite,
  t 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy error:', err);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass-card overflow-hidden">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="flex items-center gap-2">
            <div className="terminal-dot red" />
            <div className="terminal-dot yellow" />
            <div className="terminal-dot green" />
          </div>
          <div className="flex items-center gap-2 ml-4 text-text-muted">
            <Terminal className="w-4 h-4" />
            <span className="text-sm font-mono">{t('resultTerminal')}</span>
          </div>
          
          {/* Action Buttons */}
          <div className="ml-auto flex items-center gap-2">
            {result && (
              <>
                <motion.button
                  onClick={onToggleFavorite}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    isFavorite 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-deepSpace-card text-text-secondary hover:text-red-400'
                  }`}
                  title={isFavorite ? t('favorites.remove') : t('favorites.add')}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                </motion.button>

                <motion.button
                  onClick={handleCopy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        {t('copiedButton')}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-1.5"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {t('copyButton')}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
                
                <motion.button
                  onClick={handleDownload}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-deepSpace-card text-text-secondary hover:text-text-primary transition-colors"
                  title={t('downloadButton')}
                >
                  <Download className="w-3.5 h-3.5" />
                </motion.button>

                <motion.button
                  onClick={onReset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-deepSpace-card text-text-secondary hover:text-text-primary transition-colors"
                  title={t('newPromptButton')}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* Terminal Content */}
        <div className="terminal-body min-h-[200px] max-h-[500px] overflow-y-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-[200px] gap-4"
              >
                <div className="spinner" />
                <p className="text-text-muted text-sm animate-pulse">
                  {t('generating')}
                </p>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <pre className="text-text-primary font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
                  <TypewriterText text={result} />
                </pre>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-[200px] gap-3 text-text-muted"
              >
                <Terminal className="w-10 h-10 opacity-30" />
                <p className="text-sm">{t('resultPlaceholder')}</p>
                <p className="text-xs opacity-60">
                  {t('resultHint')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Typewriter effect component
 * Displays text character by character
 */
const TypewriterText = ({ text }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.span>
  );
};

export default ResultTerminal;