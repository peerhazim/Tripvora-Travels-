import React from 'react';
import { Filter, ArrowUpDown, Compass, Check, Sparkles } from 'lucide-react';
import { Region, TravelStyle, Currency } from '../types';

interface FilterBarProps {
  selectedRegion: Region;
  onRegionChange: (r: Region) => void;
  selectedStyle: TravelStyle;
  onStyleChange: (s: TravelStyle) => void;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'duration';
  onSortChange: (sort: 'recommended' | 'price-asc' | 'price-desc' | 'duration') => void;
  currentCurrency: Currency;
  matchingCount: number;
  onResetFilters: () => void;
}

const REGIONS: Region[] = ['All', 'Kashmir', 'Ladakh', 'Vaishno Devi Katra', 'Combo Circuits'];
const STYLES: TravelStyle[] = [
  'All',
  'Family & Honeymoon',
  'Houseboats & Shikara',
  'Spiritual & Pilgrimage',
  'Adventure & High Passes',
  'Offbeat Valleys',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedRegion,
  onRegionChange,
  selectedStyle,
  onStyleChange,
  sortBy,
  onSortChange,
  currentCurrency,
  matchingCount,
  onResetFilters,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm mb-8">
      {/* Destination Sector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {REGIONS.map((region) => {
            const isSelected = selectedRegion === region;
            let label: string = region;
            if (region === 'All') label = 'All Packages';
            else if (region === 'Kashmir') label = '★ Normal Kashmir Packages (Main Highlight)';
            else if (region === 'Vaishno Devi Katra') label = '🛕 Katra Packages (Held Under Kashmir)';

            return (
              <button
                key={region}
                id={`filter-region-${region.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onRegionChange(region)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500/50'
                    : region === 'Kashmir'
                    ? 'bg-amber-100/80 text-amber-950 hover:bg-amber-200/90 border border-amber-300'
                    : 'bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center space-x-3 text-xs text-stone-500">
          <span>Showing <strong className="text-stone-900 font-semibold">{matchingCount}</strong> available packages</span>
          {(selectedRegion !== 'All' || selectedStyle !== 'All') && (
            <button
              onClick={onResetFilters}
              className="text-emerald-700 hover:text-emerald-900 underline font-semibold cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Secondary Controls: Package Style Selector & Sort By */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 items-center">
        {/* Package Style Selector */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1 flex items-center space-x-1">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Filter by Travel Theme / Style</span>
          </label>
          <select
            id="filter-select-style"
            value={selectedStyle}
            onChange={(e) => onStyleChange(e.target.value as TravelStyle)}
            className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {STYLES.map((style) => (
              <option key={style} value={style}>
                {style === 'All' ? 'All Themes (Honeymoon, Snow, Yatra, Houseboat, Offbeat)' : style}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1 flex items-center space-x-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sort Packages</span>
          </label>
          <select
            id="filter-select-sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="recommended">Featured &amp; Recommended</option>
            <option value="price-asc">Price: Low to High (Budget First)</option>
            <option value="price-desc">Price: High to Low (Luxury First)</option>
            <option value="duration">Trip Duration</option>
          </select>
        </div>
      </div>
    </div>
  );
};
