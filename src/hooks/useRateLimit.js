import { useState, useEffect, useCallback } from 'react';

const RATE_LIMIT_KEY = 'promptnexus_rate_limit';
const MAX_REQUESTS_PER_DAY = 10; // Gemini free tier limit (20) / 2 for React Strict Mode double-render in development

/**
 * Custom hook for tracking API rate limits
 * Monitors daily request count for Gemini API free tier
 */
export const useRateLimit = () => {
  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(null);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load rate limit data from localStorage on mount
  useEffect(() => {
    const loadRateLimit = () => {
      try {
        const stored = localStorage.getItem(RATE_LIMIT_KEY);
        console.log('Rate limit loaded from localStorage:', stored);
        
        if (stored) {
          const data = JSON.parse(stored);
          const today = new Date().toDateString();
          
          console.log('Stored date:', data.date, 'Today:', today);
          
          // Reset if it's a new day
          if (data.date !== today) {
            console.log('New day detected, resetting rate limit');
            setRequestCount(0);
            setLastRequestTime(null);
            setIsLimitReached(false);
            localStorage.removeItem(RATE_LIMIT_KEY);
          } else {
            const count = data.count || 0;
            console.log('Setting request count to:', count);
            setRequestCount(count);
            setLastRequestTime(data.lastRequest || null);
            setIsLimitReached(count >= MAX_REQUESTS_PER_DAY);
          }
        } else {
          console.log('No stored rate limit found');
        }
      } catch (error) {
        console.error('Error loading rate limit:', error);
      }
    };

    loadRateLimit();
    // Mark as loaded after initial load
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!isLoaded) return; // Don't save until initial load is complete
    
    try {
      const data = {
        date: new Date().toDateString(),
        count: requestCount,
        lastRequest: lastRequestTime,
      };
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
      console.log('Rate limit saved to localStorage:', data);
    } catch (error) {
      console.error('Error saving rate limit:', error);
    }
  }, [requestCount, lastRequestTime, isLoaded]);
  
  // Update isLimitReached whenever requestCount changes
  useEffect(() => {
    setIsLimitReached(requestCount >= MAX_REQUESTS_PER_DAY);
  }, [requestCount]);

  /**
   * Increment request count
   * @returns {boolean} Whether the request is allowed
   */
  const incrementRequest = useCallback(() => {
    if (requestCount >= MAX_REQUESTS_PER_DAY) {
      return false;
    }
    
    setRequestCount((prev) => prev + 1);
    setLastRequestTime(Date.now());
    return true;
  }, [requestCount]);

  /**
   * Reset the rate limit counter
   */
  const resetLimit = useCallback(() => {
    setRequestCount(0);
    setLastRequestTime(null);
    setIsLimitReached(false);
    try {
      localStorage.removeItem(RATE_LIMIT_KEY);
    } catch (error) {
      console.error('Error resetting rate limit:', error);
    }
  }, []);

  /**
   * Get remaining requests
   * @returns {number} Remaining request count
   */
  const getRemainingRequests = useCallback(() => {
    return Math.max(0, MAX_REQUESTS_PER_DAY - requestCount);
  }, [requestCount]);

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
    maxRequests: MAX_REQUESTS_PER_DAY,
    remainingRequests: getRemainingRequests(),
    isLimitReached,
    lastRequestTime,
    incrementRequest,
    resetLimit,
    getTimeUntilReset: getTimeUntilReset(),
  };
};
