import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

/**
 * Toast Component
 * Toast messages for user notifications
 */
const Toast = ({ message, type = 'info', isVisible, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-neon-cyan" />,
  };

  const borderColors = {
    success: 'border-l-green-400',
    error: 'border-l-red-400',
    info: 'border-l-neon-cyan',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 max-w-[calc(100vw-1.5rem)] sm:max-w-md w-auto`}
        >
          <div className={`toast ${borderColors[type]}`}>
            <div className="flex items-start gap-2 sm:gap-3">
              {icons[type]}
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-text-primary break-words">{message}</p>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-deepSpace-card transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-text-muted hover:text-text-primary" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;