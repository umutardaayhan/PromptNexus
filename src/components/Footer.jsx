import { motion } from 'framer-motion';
import { Heart, ExternalLink } from 'lucide-react';

/**
 * Footer Bileşeni
 * Sayfa alt bilgisi
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full py-8 px-4 mt-16"
    >
      <div className="max-w-6xl mx-auto">
        <div className="divider mb-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Sol Taraf - Telif */}
          <div className="flex items-center gap-1 text-sm text-text-muted">
            <span>&copy; {currentYear} PromptNexus.</span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> ile yapıldı
            </span>
          </div>

          {/* Orta - Teknolojiler */}
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <span>React</span>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span>Vite</span>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span>Tailwind</span>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span>Gemini</span>
          </div>

          {/* Sağ Taraf - Linkler */}
          <div className="flex items-center gap-4">
            <a
              href="https://ai.google.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-text-muted hover:text-neon-cyan transition-colors"
            >
              Gemini API
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-text-muted hover:text-neon-cyan transition-colors"
            >
              API Anahtarı Al
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;