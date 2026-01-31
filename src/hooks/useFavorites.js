import { useState, useEffect, useCallback } from 'react';

const FAVORITES_STORAGE_KEY = 'promptnexus_favorites';
const MAX_FAVORITES = 100;

/**
 * Custom hook for managing favorite prompts
 * Stores favorite prompts in localStorage
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        console.error('Error loading favorites:', error);
        return [];
      }
    }
    return [];
  });

  // Persist favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  /**
   * Add a prompt to favorites
   * @param {object} promptData - Prompt data to save
   * @param {string} promptData.topic - Original topic
   * @param {string} promptData.result - Generated prompt result
   * @param {string} promptData.targetAI - Target AI model
   * @param {number} promptData.complexity - Complexity level
   * @param {string} promptData.outputLanguage - Output language
   * @param {string} promptData.note - Optional note/label
   * @returns {boolean} Success status
   */
  const addToFavorites = useCallback((promptData) => {
    // Check if already exists
    const exists = favorites.some(
      (fav) => fav.result === promptData.result
    );
    
    if (exists) {
      return false;
    }

    const newFavorite = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      ...promptData,
    };

    setFavorites((prev) => {
      // Add new favorite at the beginning and limit to MAX_FAVORITES
      const updated = [newFavorite, ...prev].slice(0, MAX_FAVORITES);
      return updated;
    });

    return true;
  }, [favorites]);

  /**
   * Remove a prompt from favorites
   * @param {string} id - Favorite ID to remove
   */
  const removeFromFavorites = useCallback((id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  }, []);

  /**
   * Check if a prompt is in favorites
   * @param {string} result - Prompt result to check
   * @returns {boolean} Is favorite
   */
  const isFavorite = useCallback((result) => {
    return favorites.some((fav) => fav.result === result);
  }, [favorites]);

  /**
   * Toggle favorite status
   * @param {object} promptData - Prompt data
   * @returns {boolean} New favorite status
   */
  const toggleFavorite = useCallback((promptData) => {
    const exists = favorites.some((fav) => fav.result === promptData.result);
    
    if (exists) {
      const favToRemove = favorites.find((fav) => fav.result === promptData.result);
      if (favToRemove) {
        removeFromFavorites(favToRemove.id);
      }
      return false;
    } else {
      addToFavorites(promptData);
      return true;
    }
  }, [favorites, addToFavorites, removeFromFavorites]);

  /**
   * Update a favorite's note
   * @param {string} id - Favorite ID
   * @param {string} note - New note
   */
  const updateFavoriteNote = useCallback((id, note) => {
    setFavorites((prev) =>
      prev.map((fav) =>
        fav.id === id ? { ...fav, note } : fav
      )
    );
  }, []);

  /**
   * Get a specific favorite by ID
   * @param {string} id - Favorite ID
   * @returns {object|null} Favorite object or null
   */
  const getFavorite = useCallback((id) => {
    return favorites.find((fav) => fav.id === id) || null;
  }, [favorites]);

  /**
   * Format timestamp to readable date
   * @param {number} timestamp - Unix timestamp
   * @returns {string} Formatted date string
   */
  const formatTimestamp = useCallback((timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    updateFavoriteNote,
    getFavorite,
    formatTimestamp,
    favoritesCount: favorites.length,
  };
};
