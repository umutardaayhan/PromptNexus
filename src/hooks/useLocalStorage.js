import { useState, useEffect } from 'react';

/**
 * localStorage hook'u
 * API anahtarı gibi verileri tarayıcıda saklamak için
 * @param {string} key - localStorage anahtarı
 * @param {*} initialValue - Varsayılan değer
 * @returns {[*, Function]} [değer, setDeğer]
 */
export const useLocalStorage = (key, initialValue) => {
  // Başlangıç değerini localStorage'dan al veya varsayılan değeri kullan
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`localStorage okuma hatası (${key}):`, error);
      return initialValue;
    }
  });

  // Değer değiştiğinde localStorage'a kaydet
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`localStorage yazma hatası (${key}):`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};