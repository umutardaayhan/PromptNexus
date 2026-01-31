import { motion } from 'framer-motion';
import { Sparkles, Zap, Brain } from 'lucide-react';

/**
 * HeroSection Bileşeni
 * Ana sayfa kahraman bölümü - "AI'nızın Potansiyelini Ortaya Çıkarın"
 */
const HeroSection = () => {
  return (
    <section className="relative min-h-[40vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Arka plan efektleri */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-teal/5 rounded-full blur-3xl" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-neon-cyan/10 border border-neon-cyan/30"
        >
          <Sparkles className="w-4 h-4 text-neon-cyan" />
          <span className="text-sm font-medium text-neon-cyan">Gemini 1.5 Flash Destekli</span>
        </motion.div>

        {/* Başlık */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-text-primary">AI'nızın</span>{' '}
          <span className="gradient-text">Potansiyelini</span>
          <br />
          <span className="text-text-primary">Ortaya Çıkarın</span>
        </motion.h1>

        {/* Alt başlık */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
        >
          Fikirlerinizi profesyonel, optimize edilmiş AI komutlarına dönüştürün.
          <span className="text-neon-cyan"> PromptNexus</span> ile mükemmel sonuçlar elde edin.
        </motion.p>

        {/* Özellik kartları */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          <FeatureCard
            icon={<Zap className="w-5 h-5" />}
            text="Hızlı"
          />
          <FeatureCard
            icon={<Brain className="w-5 h-5" />}
            text="Akıllı"
          />
          <FeatureCard
            icon={<Sparkles className="w-5 h-5" />}
            text="Profesyonel"
          />
        </motion.div>
      </div>

      {/* Alt dekoratif çizgi */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
      />
    </section>
  );
};

/**
 * Özellik kartı bileşeni
 */
const FeatureCard = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-deepSpace-card/50 border border-neon-cyan/20">
    <span className="text-neon-cyan">{icon}</span>
    <span className="text-sm font-medium text-text-primary">{text}</span>
  </div>
);

export default HeroSection;