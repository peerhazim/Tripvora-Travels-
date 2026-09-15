import React, { createContext, useContext, useState, useEffect } from 'react';
import { KashmirThemeId, KashmirThemeConfig, KASHMIR_THEMES } from '../types/theme';

interface ThemeContextType {
  theme: KashmirThemeId;
  setTheme: (theme: KashmirThemeId) => void;
  themeConfig: KashmirThemeConfig;
  allThemes: KashmirThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'tripvora_kashmir_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<KashmirThemeId>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && saved in KASHMIR_THEMES) {
        return saved as KashmirThemeId;
      }
    } catch {
      // ignore
    }
    return 'chinar'; // Default to Chinar (Royal Autumn of Kashmir)
  });

  const setTheme = (newTheme: KashmirThemeId) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-kashmir-theme', theme);
  }, [theme]);

  const themeConfig = KASHMIR_THEMES[theme];
  const allThemes = Object.values(KASHMIR_THEMES);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeConfig, allThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useKashmirTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useKashmirTheme must be used within a ThemeProvider');
  }
  return context;
};
