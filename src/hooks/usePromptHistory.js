import { useState, useEffect, useCallback } from 'react';

const HISTORY_STORAGE_KEY = 'promptnexus_history';
const MAX_HISTORY_ITEMS = 50;

/**
 * Custom hook for managing prompt history
 * Stores generated prompts in localStorage
 */
export const usePromptHistory = () => {
  const [history, setHistory] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        console.error('Error loading history:', error);
        return [];
      }
    }
    return [];
  });

  // Persist history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  }, [history]);

  /**
   * Add a new prompt to history
   * @param {object} promptData - Prompt data to save
   * @param {string} promptData.topic - Original topic
   * @param {string} promptData.result - Generated prompt result
   * @param {string} promptData.targetAI - Target AI model
   * @param {number} promptData.complexity - Complexity level
   * @param {string} promptData.outputLanguage - Output language
   */
  const addToHistory = useCallback((promptData) => {
    const newEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      ...promptData,
    };

    setHistory((prev) => {
      // Add new entry at the beginning and limit to MAX_HISTORY_ITEMS
      const updated = [newEntry, ...prev].slice(0, MAX_HISTORY_ITEMS);
      return updated;
    });
  }, []);

  /**
   * Delete a specific history entry
   * @param {string} id - Entry ID to delete
   */
  const deleteFromHistory = useCallback((id) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  /**
   * Clear all history
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  /**
   * Get a specific history entry by ID
   * @param {string} id - Entry ID
   * @returns {object|null} History entry or null
   */
  const getHistoryEntry = useCallback((id) => {
    return history.find((entry) => entry.id === id) || null;
  }, [history]);

  /**
   * Format timestamp to readable date
   * @param {number} timestamp - Unix timestamp
   * @returns {string} Formatted date string
   */
  const formatTimestamp = useCallback((timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  }, []);

  return {
    history,
    addToHistory,
    deleteFromHistory,
    clearHistory,
    getHistoryEntry,
    formatTimestamp,
    historyCount: history.length,
  };
};
