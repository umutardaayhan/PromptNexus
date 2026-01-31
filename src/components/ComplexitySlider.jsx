import { motion } from 'framer-motion';
import { Thermometer, Snowflake, Flame } from 'lucide-react';

/**
 * ComplexitySlider Component
 * "Creative Temperature" slider - Complexity level selection
 */
const ComplexitySlider = ({ value, onChange, disabled, t }) => {
  // Determine label and color based on complexity level
  const getComplexityInfo = (level) => {
    if (level <= 3) {
      return {
        label: t('complexity.simple'),
        description: t('complexity.simpleDesc'),
        icon: <Snowflake className="w-4 h-4" />,
        color: 'text-blue-400',
        gradient: 'from-blue-500 to-cyan-500'
      };
    } else if (level <= 6) {
      return {
        label: t('complexity.balanced'),
        description: t('complexity.balancedDesc'),
        icon: <Thermometer className="w-4 h-4" />,
        color: 'text-neon-cyan',
        gradient: 'from-cyan-500 to-teal-500'
      };
    } else if (level <= 8) {
      return {
        label: t('complexity.detailed'),
        description: t('complexity.detailedDesc'),
        icon: <Flame className="w-4 h-4" />,
        color: 'text-orange-400',
        gradient: 'from-teal-500 to-orange-500'
      };
    } else {
      return {
        label: t('complexity.expert'),
        description: t('complexity.expertDesc'),
        icon: <Flame className="w-4 h-4" />,
        color: 'text-red-400',
        gradient: 'from-orange-500 to-red-500'
      };
    }
  };

  const info = getComplexityInfo(value);

  return (
    <div className="space-y-3">
      {/* Label and Value */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
          <Thermometer className="w-4 h-4 text-neon-cyan" />
          {t('creativeTemperature')}
        </label>
        <motion.div
          key={info.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex items-center gap-1.5 text-sm font-semibold ${info.color}`}
        >
          {info.icon}
          <span>{info.label}</span>
          <span className="text-text-muted font-normal">({value}/10)</span>
        </motion.div>
      </div>

      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          disabled={disabled}
          className="w-full h-2 bg-deepSpace-card rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed"
          style={{
            background: `linear-gradient(to right, #66FCF1 0%, #45A29E ${(value - 1) * 11.11}%, #1F2833 ${(value - 1) * 11.11}%, #1F2833 100%)`
          }}
        />
        
        {/* Markers */}
        <div className="flex justify-between mt-2 px-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <div
              key={num}
              className={`w-1 h-1 rounded-full transition-colors duration-200 ${
                num <= value ? 'bg-neon-cyan' : 'bg-text-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <motion.p
        key={info.description}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs text-text-muted"
      >
        {info.description}
      </motion.p>

      {/* Seviye göstergeleri */}
      <div className="flex justify-between text-xs text-text-muted pt-1">
        <span>{t('complexity.minLabel')}</span>
        <span>{t('complexity.maxLabel')}</span>
      </div>
    </div>
  );
};

export default ComplexitySlider;