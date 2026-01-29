import { useState, useEffect } from 'react';

/**
 * useIsDesktop Hook
 * @param {string} query - The media query to check against. 
 * Default is 1024px (standard desktop threshold).
 */
export const useIsDesktop = (query = '(min-width: 1024px)') => {
  // Initialize state with the current match
  const [isDesktop, setIsDesktop] = useState(() => {
    // Check if window is defined
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false; // Default for server-side
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    
    // Optimized listener function
    const listener = (event) => setIsDesktop(event.matches);

    // Modern API support
    mediaQueryList.addEventListener('change', listener);

    // Clean up
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return isDesktop;
};