import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Heart, 
  Trash2, 
  RotateCcw, 
  ChevronRight,
  Bot,
  Thermometer,
  Globe,
  Edit2,
  Check,
  Star
} from 'lucide-react';

/**
 * FavoritesPanel Component
 * Displays and manages favorite prompts
 */
const FavoritesPanel = ({ 
  isOpen, 
  onClose, 
  favorites, 
  onLoadFavorite, 
  onRemoveFavorite, 
  onUpdateNote,
  formatTimestamp,
  t 
}) => {
  const [expandedItem, setExpandedItem] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState('');

  const handleLoad = (favorite) => {
    onLoadFavorite(favorite);
    onClose();
  };

  const handleEditNote = (favorite) => {
    setEditingNote(favorite.id);
    setNoteText(favorite.note || '');
  };

  const handleSaveNote = (id) => {
    onUpdateNote(id, noteText);
    setEditingNote(null);
    setNoteText('');
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl max-h-[85vh] flex flex-col"
            >
              <div className="glass-card overflow-hidden flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neon-cyan/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-500/10">
                      <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-text-primary">
                        {t('favorites.title')}
                      </h2>
                      <p className="text-xs text-text-muted">
                        {t('favorites.subtitle')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-deepSpace-card transition-colors"
                  >
                    <X className="w-5 h-5 text-text-muted hover:text-text-primary" />
                  </button>
                </div>

                {/* Favorites List */}
                <div className="flex-1 overflow-y-auto p-6">
                  {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-text-muted">
                      <Heart className="w-12 h-12 mb-4 opacity-30" />
                      <p>{t('favorites.empty')}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {favorites.map((favorite, index) => (
                        <motion.div
                          key={favorite.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group rounded-xl bg-deepSpace-card/50 border border-neon-cyan/10 hover:border-neon-cyan/30 transition-all overflow-hidden"
                        >
                          {/* Header Row */}
                          <div 
                            className="flex items-center gap-3 p-4 cursor-pointer"
                            onClick={() => setExpandedItem(expandedItem === favorite.id ? null : favorite.id)}
                          >
                            <div className="flex-1 min-w-0">
                              {favorite.note && (
                                <div className="flex items-center gap-1 mb-1">
                                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                  <span className="text-xs text-yellow-400">{favorite.note}</span>
                                </div>
                              )}
                              <p className="text-sm text-text-primary font-medium truncate">
                                {truncateText(favorite.topic, 50)}
                              </p>
                              <div className="flex items-center gap-3 mt-1.5">
                                <span className="flex items-center gap-1 text-xs text-text-muted">
                                  <Bot className="w-3 h-3" />
                                  {favorite.targetAI}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-text-muted">
                                  <Thermometer className="w-3 h-3" />
                                  {favorite.complexity}/10
                                </span>
                                <span className="flex items-center gap-1 text-xs text-text-muted">
                                  <Globe className="w-3 h-3" />
                                  {favorite.outputLanguage}
                                </span>
                                <span className="text-xs text-text-muted">
                                  {formatTimestamp(favorite.timestamp)}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLoad(favorite);
                                }}
                                className="p-2 rounded-lg text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
                                title="Load"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onRemoveFavorite(favorite.id);
                                }}
                                className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                                title={t('favorites.remove')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <ChevronRight 
                                className={`w-4 h-4 text-text-muted transition-transform ${
                                  expandedItem === favorite.id ? 'rotate-90' : ''
                                }`}
                              />
                            </div>
                          </div>

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {expandedItem === favorite.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-neon-cyan/10 bg-deepSpace-bg/50"
                              >
                                <div className="p-4 space-y-3">
                                  {/* Note Editor */}
                                  <div>
                                    <div className="flex items-center justify-between mb-1">
                                      <p className="text-xs text-text-muted">Note:</p>
                                      {editingNote === favorite.id ? (
                                        <button
                                          onClick={() => handleSaveNote(favorite.id)}
                                          className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300"
                                        >
                                          <Check className="w-3 h-3" />
                                          Save
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => handleEditNote(favorite)}
                                          className="flex items-center gap-1 text-xs text-neon-cyan hover:text-neon-cyan/80"
                                        >
                                          <Edit2 className="w-3 h-3" />
                                          {favorite.note ? 'Edit' : 'Add Note'}
                                        </button>
                                      )}
                                    </div>
                                    {editingNote === favorite.id ? (
                                      <input
                                        type="text"
                                        value={noteText}
                                        onChange={(e) => setNoteText(e.target.value)}
                                        placeholder="Add a note..."
                                        className="input-field text-sm"
                                        autoFocus
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') handleSaveNote(favorite.id);
                                          if (e.key === 'Escape') setEditingNote(null);
                                        }}
                                      />
                                    ) : (
                                      <p className="text-sm text-text-secondary">
                                        {favorite.note || 'No note added'}
                                      </p>
                                    )}
                                  </div>

                                  <div>
                                    <p className="text-xs text-text-muted mb-1">Topic:</p>
                                    <p className="text-sm text-text-primary">{favorite.topic}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-text-muted mb-1">Generated Prompt:</p>
                                    <pre className="text-xs text-text-secondary bg-deepSpace-card p-3 rounded-lg overflow-x-auto whitespace-pre-wrap max-h-40 overflow-y-auto">
                                      {favorite.result}
                                    </pre>
                                  </div>
                                  <button
                                    onClick={() => handleLoad(favorite)}
                                    className="w-full btn-primary flex items-center justify-center gap-2 py-2"
                                  >
                                    <RotateCcw className="w-4 h-4" />
                                    Load Prompt
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

export default FavoritesPanel;
