import { useState, useEffect, useCallback } from 'react';

const RATE_LIMIT_KEY = 'promptnexus_rate_limit';
const DEFAULT_DAILY_LIMIT = 10; // Gemini 2.5 Flash free tier: 20 istek/gün, sitemiz her sorgu için 2 istek kullandığı için günlük limit = 10

/**
 * Custom hook for tracking API rate limits
 * Monitors daily request count for Gemini API per API key
 *
 * NOT: Gemini 2.5 Flash free tier günlük limiti 20 istektir.
 * Sitemiz her sorgu için 2 istek kullandığı için günlük limitimiz 10'dur.
 * Her API anahtarı için ayrı count tutulur.
 * Bu limit aşıldığında kullanıcıya bilgi verilir.
 *
 * SADECE limit aşıldığında kontrol eder, öncesinde herhangi bir sorgu yapmaz.
 */
export const useRateLimit = (apiKey) => {
  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(null);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentApiKey, setCurrentApiKey] = useState(apiKey);

  // API anahtarının ilk 8 karakterini unique identifier olarak kullan
  const getApiKeyId = useCallback((key) => {
    if (!key) return 'no-api-key';
    return key.substring(0, 8);
  }, []);

  // Load rate limit data from localStorage on mount or when apiKey changes
  useEffect(() => {
    const loadRateLimit = () => {
      try {
        const stored = localStorage.getItem(RATE_LIMIT_KEY);
        const apiKeyId = getApiKeyId(apiKey);
        const today = new Date().toDateString();
        
        if (stored) {
          const data = JSON.parse(stored);
          
          // Reset if it's a new day
          if (data.date !== today) {
            // Yeni gün - tüm API anahtarları için sıfırla
            setRequestCount(0);
            setLastRequestTime(null);
            setIsLimitReached(false);
            localStorage.removeItem(RATE_LIMIT_KEY);
          } else {
            // Aynı gün - bu API anahtarı için count'u al
            const apiCounts = data.apiCounts || {};
            const count = apiCounts[apiKeyId]?.count || 0;
            const lastReq = apiCounts[apiKeyId]?.lastRequest || null;
            
            setRequestCount(count);
            setLastRequestTime(lastReq);
            setIsLimitReached(count >= DEFAULT_DAILY_LIMIT);
          }
        } else {
          // LocalStorage boş - yeni başla
          setRequestCount(0);
          setLastRequestTime(null);
          setIsLimitReached(false);
        }
        
        setCurrentApiKey(apiKey);
      } catch (error) {
        console.error('Error loading rate limit:', error);
      }
    };

    loadRateLimit();
    // Mark as loaded after initial load
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [apiKey, getApiKeyId]);

  // Persist rate limit data
  useEffect(() => {
    if (!isLoaded) return; // Don't save until initial load is complete
    
    try {
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      const apiKeyId = getApiKeyId(currentApiKey);
      const today = new Date().toDateString();
      
      let data = { date: today, apiCounts: {} };
      
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.date === today) {
          data.apiCounts = parsed.apiCounts || {};
        }
      }
      
      // Bu API anahtarı için count'u güncelle
      data.apiCounts[apiKeyId] = {
        count: requestCount,
        lastRequest: lastRequestTime,
      };
      
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving rate limit:', error);
    }
  }, [requestCount, lastRequestTime, isLoaded, currentApiKey, getApiKeyId]);
  
  // Update isLimitReached whenever requestCount changes
  useEffect(() => {
    setIsLimitReached(requestCount >= DEFAULT_DAILY_LIMIT);
  }, [requestCount]);

  /**
   * Check if the request can be made
   * SADECE limit aşıldığında false döner
   * @returns {boolean} Whether the request is allowed
   */
  const canMakeRequest = useCallback(() => {
    return requestCount < DEFAULT_DAILY_LIMIT;
  }, [requestCount]);

  /**
   * Increment request count
   * @returns {boolean} Whether the request is allowed
   */
  const incrementRequest = useCallback(() => {
    if (requestCount >= DEFAULT_DAILY_LIMIT) {
      return false;
    }
    
    setRequestCount((prev) => prev + 1);
    setLastRequestTime(Date.now());
    return true;
  }, [requestCount]);

  /**
   * Reset the rate limit counter for current API key
   */
  const resetLimit = useCallback(() => {
    setRequestCount(0);
    setLastRequestTime(null);
    setIsLimitReached(false);
    
    try {
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      const apiKeyId = getApiKeyId(currentApiKey);
      const today = new Date().toDateString();
      
      if (stored) {
        const data = JSON.parse(stored);
        if (data.date === today && data.apiCounts) {
          delete data.apiCounts[apiKeyId];
          localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
        }
      }
    } catch (error) {
      console.error('Error resetting rate limit:', error);
    }
  }, [currentApiKey, getApiKeyId]);

  /**
   * Get remaining requests
   * @returns {number} Remaining request count
   */
  const getRemainingRequests = useCallback(() => {
    return Math.max(0, DEFAULT_DAILY_LIMIT - requestCount);
  }, [requestCount]);

  /**
   * Get max requests
   * @returns {number} Max request limit
   */
  const getMaxRequests = useCallback(() => {
    return DEFAULT_DAILY_LIMIT;
  }, []);

  /**
   * Get time until reset (midnight)
   * @returns {string} Formatted time string
   */
  const getTimeUntilReset = useCallback(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diffMs = tomorrow - now;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m`;
  }, []);

  return {
    requestCount,
    maxRequests: getMaxRequests(),
    remainingRequests: getRemainingRequests(),
    isLimitReached,
    lastRequestTime,
    canMakeRequest,
    incrementRequest,
    resetLimit,
    getTimeUntilReset: getTimeUntilReset(),
  };
};
