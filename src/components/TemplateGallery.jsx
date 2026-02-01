import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  FileText, 
  Linkedin, 
  Mail, 
  ShoppingBag, 
  GraduationCap,
  Code,
  GitPullRequest,
  Server,
  Database,
  TestTube,
  Component,
  Layers,
  User,
  Mountain,
  Hexagon,
  Camera,
  Palette,
  Sparkles,
  Briefcase,
  Presentation,
  TrendingUp,
  Target,
  Users,
  BookOpen,
  UserCircle,
  Video,
  Mic,
  Share2,
  Feather,
  ChevronRight,
  Wand2
} from 'lucide-react';
import { templateCategories, getTemplatesByCategory } from '../data/promptTemplates';

// Icon mapping
const iconMap = {
  FileText,
  Linkedin,
  Mail,
  ShoppingBag,
  GraduationCap,
  Code,
  GitPullRequest,
  Server,
  Database,
  TestTube,
  Component,
  Layers,
  User,
  Mountain,
  Hexagon,
  Camera,
  Palette,
  Sparkles,
  Briefcase,
  Presentation,
  TrendingUp,
  Target,
  Users,
  BookOpen,
  UserCircle,
  Video,
  Mic,
  Share2,
  Feather,
};

/**
 * TemplateGallery Component
 * Modal for browsing and selecting prompt templates
 */
const TemplateGallery = ({ isOpen, onClose, onSelectTemplate, t }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = getTemplatesByCategory(selectedCategory).filter(
    (template) =>
      t(template.titleKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(template.descriptionKey).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTemplate = (template) => {
    // Get localized template data
    const localizedTemplate = {
      ...template,
      title: t(template.titleKey),
      description: t(template.descriptionKey),
      topic: t(template.topicKey),
    };
    onSelectTemplate(localizedTemplate);
    onClose();
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
              className="w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] flex flex-col"
            >
              <div className="glass-card overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neon-cyan/10">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-text-primary flex items-center gap-2">
                      <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 text-neon-cyan" />
                      {t('templates.title')}
                    </h2>
                    <p className="text-xs sm:text-sm text-text-muted mt-1">
                      {t('templates.subtitle')}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-deepSpace-card transition-colors"
                  >
                    <X className="w-5 h-5 text-text-muted hover:text-text-primary" />
                  </button>
                </div>

                {/* Search and Filters */}
                <div className="p-3 sm:p-4 border-b border-neon-cyan/10 space-y-3 sm:space-y-4">
                  {/* Search */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search templates..."
                    className="input-field"
                  />

                  {/* Category Tabs */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {templateCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                          selectedCategory === category.id
                            ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                            : 'bg-deepSpace-card text-text-muted hover:text-text-primary border border-transparent'
                        }`}
                      >
                        {t(category.labelKey)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Templates Grid */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {filteredTemplates.map((template) => {
                      const IconComponent = iconMap[template.icon] || FileText;
                      
                      return (
                        <motion.button
                            key={template.id}
                            onClick={() => handleSelectTemplate(template)}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="text-left p-3 sm:p-4 rounded-xl bg-deepSpace-card/50 border border-neon-cyan/10 hover:border-neon-cyan/30 transition-all group"
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="p-1.5 sm:p-2 rounded-lg bg-neon-cyan/10 text-neon-cyan group-hover:bg-neon-cyan/20 transition-colors flex-shrink-0">
                                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-text-primary text-sm sm:text-base truncate">
                                  {t(template.titleKey)}
                                </h3>
                                <p className="text-xs text-text-muted mt-1 line-clamp-2">
                                  {t(template.descriptionKey)}
                                </p>
                                <div className="flex items-center gap-2 mt-2 sm:mt-3">
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-deepSpace-bg text-text-muted">
                                    {template.defaultTargetAI}
                                  </span>
                                  <ChevronRight className="w-4 h-4 text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                                </div>
                              </div>
                            </div>
                          </motion.button>
                      );
                    })}
                  </div>

                  {filteredTemplates.length === 0 && (
                    <div className="text-center py-12 text-text-muted">
                      <p>No templates found matching your search.</p>
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

export default TemplateGallery;
