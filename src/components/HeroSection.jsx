import { motion } from 'framer-motion';
import { Sparkles, Zap, Brain } from 'lucide-react';

/**
 * HeroSection Component
 * Main page hero section - "Unlock Your AI Potential"
 */
const HeroSection = ({ t }) => {
  return (
    <section className="relative min-h-[35vh] sm:min-h-[40vh] flex flex-col items-center justify-center px-4 py-8 sm:py-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-teal/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-2 sm:px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-4 sm:mb-6 rounded-full bg-neon-cyan/10 border border-neon-cyan/30"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon-cyan" />
          <span className="text-xs sm:text-sm font-medium text-neon-cyan">{t('heroBadge')}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6"
        >
          <span className="text-text-primary">{t('heroTitle1')}</span>{' '}
          <span className="gradient-text">{t('heroTitle2')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-6 sm:mb-10 px-2"
        >
          {t('heroSubtitle')}
        </motion.p>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8"
        >
          <FeatureCard
            icon={<Zap className="w-5 h-5" />}
            text={t('featureFast')}
          />
          <FeatureCard
            icon={<Brain className="w-5 h-5" />}
            text={t('featureSmart')}
          />
          <FeatureCard
            icon={<Sparkles className="w-5 h-5" />}
            text={t('featureProfessional')}
          />
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
      />
    </section>
  );
};

/**
 * Feature card component
 */
const FeatureCard = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-deepSpace-card/50 border border-neon-cyan/20">
    <span className="text-neon-cyan">{icon}</span>
    <span className="text-xs sm:text-sm font-medium text-text-primary">{text}</span>
  </div>
);

export default HeroSection;