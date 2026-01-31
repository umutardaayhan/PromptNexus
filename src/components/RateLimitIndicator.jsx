import { motion } from 'framer-motion';
import { Zap, AlertTriangle, Clock, Wifi } from 'lucide-react';

/**
 * RateLimitIndicator Component
 * Shows API usage status and warnings
 * Supports both dynamic (from API headers) and manual tracking
 */
const RateLimitIndicator = ({
  requestCount,
  maxRequests,
  remainingRequests,
  isLimitReached,
  getTimeUntilReset,
  t,
  dynamicLimit,
  dynamicRemaining
}) => {
  // Dinamik limit bilgisi varsa onu kullan, yoksa manuel sayacı kullan
  const effectiveMaxRequests = dynamicLimit || maxRequests;
  const effectiveRemaining = dynamicRemaining !== null ? dynamicRemaining : remainingRequests;
  const effectiveUsed = effectiveMaxRequests - effectiveRemaining;
  const usagePercentage = (effectiveUsed / effectiveMaxRequests) * 100;
  
  // Dinamik veri var mı?
  const hasDynamicData = dynamicLimit !== null && dynamicRemaining !== null;
   
  // Determine status color
  let statusColor = 'text-green-400';
  let bgColor = 'bg-green-400/10';
  let borderColor = 'border-green-400/20';
  let Icon = hasDynamicData ? Wifi : Zap;
  
  if (usagePercentage >= 90 || isLimitReached) {
    statusColor = 'text-red-400';
    bgColor = 'bg-red-400/10';
    borderColor = 'border-red-400/20';
    Icon = AlertTriangle;
  } else if (usagePercentage >= 70) {
    statusColor = 'text-yellow-400';
    bgColor = 'bg-yellow-400/10';
    borderColor = 'border-yellow-400/20';
    Icon = AlertTriangle;
  }

  if (isLimitReached) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto mb-4"
      >
        <div className="glass-card p-4 border-red-400/30 bg-red-400/5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-400/10">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-400 mb-1">
                {t('rateLimit.title')}
              </h3>
              <p className="text-sm text-text-secondary mb-2">
                {t('rateLimit.description', { maxRequests })} {t('rateLimit.resetsIn', { time: getTimeUntilReset })}
              </p>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Clock className="w-3.5 h-3.5" />
                <span>{t('rateLimit.resetsAt')}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto mb-4"
    >
      <div className={`glass-card p-3 ${borderColor} ${bgColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg ${bgColor}`}>
              <Icon className={`w-4 h-4 ${statusColor}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {hasDynamicData ? (
                  <>API: {effectiveUsed}/{effectiveMaxRequests}</>
                ) : (
                  t('rateLimit.usage', { count: requestCount, max: maxRequests })
                )}
              </p>
              <p className="text-xs text-text-muted">
                {hasDynamicData ? (
                  <>Gerçek zamanlı: {effectiveRemaining} kaldı</>
                ) : (
                  t('rateLimit.remaining', { remaining: remainingRequests })
                )}
              </p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-24 h-2 bg-deepSpace-card rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${usagePercentage}%` }}
              className={`h-full rounded-full ${
                usagePercentage >= 90 ? 'bg-red-400' : 
                usagePercentage >= 70 ? 'bg-yellow-400' : 'bg-green-400'
              }`}
            />
          </div>
        </div>
        
        {usagePercentage >= 70 && (
          <p className="mt-2 text-xs text-text-muted">
            {t('rateLimit.approachingLimit')}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default RateLimitIndicator;
