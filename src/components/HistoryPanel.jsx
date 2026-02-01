import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  History, 
  Trash2, 
  RotateCcw, 
  ChevronRight,
  Clock,
  Bot,
  Thermometer,
  Globe
} from 'lucide-react';

/**
 * HistoryPanel Component
 * Displays and manages prompt history
 */
const HistoryPanel = ({ 
  isOpen, 
  onClose, 
  history, 
  onLoadHistory, 
  onDeleteHistory, 
  onClearHistory,
  formatTimestamp,
  t 
}) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleLoad = (entry) => {
    onLoadHistory(entry);
    onClose();
  };

  const truncateText = (text, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (!isOpen) return null;

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

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col"
            >
              <div className="glass-card overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neon-cyan/10">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-neon-cyan/10">
                      <History className="w-4 h-4 sm:w-5 sm:h-5 text-neon-cyan" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-text-primary">
                        {t('history.title')}
                      </h2>
                      <p className="text-xs text-text-muted">
                        {t('history.subtitle')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    {history.length > 0 && (
                      <button
                        onClick={onClearHistory}
                        className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs font-medium rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{t('history.clearAll')}</span>
                      </button>
                    )}
                    <button
                      onClick={onClose}
                      className="p-1.5 sm:p-2 rounded-lg hover:bg-deepSpace-card transition-colors"
                    >
                      <X className="w-5 h-5 text-text-muted hover:text-text-primary" />
                    </button>
                  </div>
                </div>

                {/* History List */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-6">
                  {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-text-muted">
                      <History className="w-12 h-12 mb-4 opacity-30" />
                      <p>{t('history.empty')}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {history.map((entry, index) => (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group rounded-xl bg-deepSpace-card/50 border border-neon-cyan/10 hover:border-neon-cyan/30 transition-all overflow-hidden"
                        >
                          {/* Header Row */}
                          <div
                            className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 cursor-pointer"
                            onClick={() => setExpandedItem(expandedItem === entry.id ? null : entry.id)}
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-text-primary font-medium truncate">
                                {truncateText(entry.topic, 40)}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5">
                                <span className="flex items-center gap-1 text-xs text-text-muted">
                                  <Clock className="w-3 h-3" />
                                  {formatTimestamp(entry.timestamp)}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-text-muted hidden sm:flex">
                                  <Bot className="w-3 h-3" />
                                  {entry.targetAI}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-text-muted">
                                  <Thermometer className="w-3 h-3" />
                                  {entry.complexity}/10
                                </span>
                                <span className="flex items-center gap-1 text-xs text-text-muted hidden xs:flex">
                                  <Globe className="w-3 h-3" />
                                  {entry.outputLanguage}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLoad(entry);
                                }}
                                className="p-2 rounded-lg text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
                                title={t('history.load')}
                              >
                                <RotateCcw className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteHistory(entry.id);
                                }}
                                className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                                title={t('history.delete')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <ChevronRight 
                                className={`w-4 h-4 text-text-muted transition-transform ${
                                  expandedItem === entry.id ? 'rotate-90' : ''
                                }`}
                              />
                            </div>
                          </div>

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {expandedItem === entry.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-neon-cyan/10 bg-deepSpace-bg/50"
                              >
                                <div className="p-3 sm:p-4 space-y-3">
                                  <div>
                                    <p className="text-xs text-text-muted mb-1">Topic:</p>
                                    <p className="text-sm text-text-primary">{entry.topic}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-text-muted mb-1">Generated Prompt:</p>
                                    <pre className="text-xs text-text-secondary bg-deepSpace-card p-2 sm:p-3 rounded-lg overflow-x-auto whitespace-pre-wrap max-h-40 overflow-y-auto">
                                      {entry.result}
                                    </pre>
                                  </div>
                                  <button
                                    onClick={() => handleLoad(entry)}
                                    className="w-full btn-primary flex items-center justify-center gap-2 py-2 text-sm"
                                  >
                                    <RotateCcw className="w-4 h-4" />
                                    {t('history.load')}
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HistoryPanel;
