import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Sparkles } from 'lucide-react';
import { useKashmirTheme } from '../context/ThemeContext';
import { KashmirThemeId } from '../types/theme';

interface KashmirThemeSelectorProps {
  compact?: boolean;
}

export const KashmirThemeSelector: React.FC<KashmirThemeSelectorProps> = ({ compact = false }) => {
  const { theme, setTheme, themeConfig, allThemes } = useKashmirTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: KashmirThemeId) => {
    setTheme(id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="kashmir-theme-selector-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1.5 rounded-full transition-all cursor-pointer border ${
          compact
            ? 'px-2.5 py-1 text-xs bg-white/95 border-stone-200 hover:border-stone-400 text-stone-800 shadow-xs'
            : 'px-3 py-1.5 text-xs font-semibold bg-white/95 border-stone-200 hover:border-stone-300 text-stone-800 shadow-xs backdrop-blur-sm'
        }`}
        title="Change Kashmir Theme Atmosphere"
        aria-label="Kashmir Theme Palette"
      >
        <span className="text-base leading-none">{themeConfig.icon}</span>
        <span className="font-semibold text-stone-800 hidden sm:inline">
          {themeConfig.name}
        </span>
        <ChevronDown className={`w-3 h-3 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          id="kashmir-theme-dropdown"
          className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white shadow-2xl border border-stone-200 p-2 z-50 text-stone-800 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-3 py-2 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Kashmir Theme Atmosphere</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
              4 Palettes
            </span>
          </div>

          <div className="py-1 space-y-1">
            {allThemes.map((t) => {
              const isActive = t.id === theme;
              return (
                <button
                  key={t.id}
                  id={`theme-opt-${t.id}`}
                  type="button"
                  onClick={() => handleSelect(t.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-start space-x-3 cursor-pointer ${
                    isActive
                      ? 'bg-stone-50 ring-1 ring-stone-300'
                      : 'hover:bg-stone-50'
                  }`}
                >
                  <span className="text-2xl mt-0.5">{t.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900 flex items-center space-x-1.5">
                        <span>{t.name}</span>
                        <span className="text-[10px] font-normal text-stone-500 italic">({t.nativeTitle})</span>
                      </span>
                      <div className="flex items-center space-x-1">
                        <span 
                          className="w-3 h-3 rounded-full border border-white shadow-xs" 
                          style={{ backgroundColor: t.primaryColor }}
                          title="Primary Hue"
                        />
                        <span 
                          className="w-3 h-3 rounded-full border border-white shadow-xs" 
                          style={{ backgroundColor: t.accentColor }}
                          title="Accent Hue"
                        />
                        {isActive && <Check className="w-3.5 h-3.5 text-stone-900 ml-1" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5">
                      {t.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="px-3 py-1.5 border-t border-stone-100 text-[10px] text-stone-500 text-center">
            Default: <strong className="text-stone-800">Chinar Autumn</strong> (Warm Rust &amp; Saffron)
          </div>
        </div>
      )}
    </div>
  );
};
