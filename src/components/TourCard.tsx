import React from 'react';
import { Heart, Clock, Users, Star, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { Tour, Currency } from '../types';
import { formatPrice } from '../utils/format';

interface TourCardProps {
  tour: Tour;
  currentCurrency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (tourId: string) => void;
  onSelectTour: (tour: Tour) => void;
  onBookTour: (tour: Tour) => void;
}

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  currentCurrency,
  isWishlisted,
  onToggleWishlist,
  onSelectTour,
  onBookTour,
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container with Badge and Wishlist */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={tour.image}
          alt={tour.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Safe fallback if any external image CDN experiences a temporary glitch
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop';
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
          {tour.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-md">
              {tour.badge}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-white/90 backdrop-blur-sm text-emerald-950 border border-emerald-200 shadow-sm">
            {tour.style}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${tour.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(tour.id);
          }}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all z-10 shadow-md ${
            isWishlisted
              ? 'bg-rose-500 text-white hover:bg-rose-600 scale-110'
              : 'bg-white/90 text-stone-700 hover:bg-white hover:text-emerald-700 hover:scale-110 border border-stone-200'
          }`}
          title={isWishlisted ? 'Remove from saved' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom Image Overlay: Country & Rating */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center space-x-1 font-semibold drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            <span>{tour.country}</span>
          </div>
          <div className="flex items-center space-x-1 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded text-emerald-900 font-bold border border-emerald-200 shadow-sm">
            <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
            <span>{tour.rating}</span>
            <span className="text-stone-500 text-[10px]">({tour.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3
            onClick={() => onSelectTour(tour)}
            className="font-serif-display text-xl font-bold text-stone-900 hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1 leading-snug"
            title={tour.title}
          >
            {tour.title}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {tour.subtitle}
          </p>

          {/* Spec Badges Bar */}
          <div className="mt-3.5 pt-3 border-t border-stone-100 grid grid-cols-3 gap-2 text-center text-stone-600">
            <div className="bg-stone-50 rounded-lg py-1.5 px-2">
              <span className="block text-[10px] uppercase font-semibold text-stone-400">Duration</span>
              <span className="font-bold text-stone-800 text-xs">{tour.durationDays} Days</span>
            </div>
            <div className="bg-stone-50 rounded-lg py-1.5 px-2">
              <span className="block text-[10px] uppercase font-semibold text-stone-400">Group Size</span>
              <span className="font-bold text-stone-800 text-xs">Max {tour.groupSizeMax}</span>
            </div>
            <div className="bg-stone-50 rounded-lg py-1.5 px-2">
              <span className="block text-[10px] uppercase font-semibold text-stone-400">Pace</span>
              <span className="font-bold text-stone-800 text-xs">{tour.difficulty}</span>
            </div>
          </div>

          {/* Key Highlights Snippet */}
          <ul className="mt-3.5 space-y-1.5 text-xs text-stone-600">
            {tour.highlights.slice(0, 2).map((hl, idx) => (
              <li key={idx} className="flex items-start space-x-1.5 line-clamp-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <span className="truncate">{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer with Price & Actions */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-stone-400">
              All-Inclusive From
            </span>
            <div className="flex items-baseline space-x-1">
              <span className="font-serif-display text-2xl font-bold text-stone-900">
                {formatPrice(tour.priceUSD, currentCurrency)}
              </span>
              <span className="text-[11px] text-stone-500">/ person</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id={`view-tour-btn-${tour.id}`}
              onClick={() => onSelectTour(tour)}
              className="px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              Itinerary
            </button>
            <button
              id={`book-tour-btn-${tour.id}`}
              onClick={() => onBookTour(tour)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm hover:shadow-emerald-600/20 transition-all cursor-pointer flex items-center space-x-1"
            >
              <span>Reserve</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
