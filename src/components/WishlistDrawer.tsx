import React, { useState } from 'react';
import { X, Trash2, ArrowRight, Share2, Check, Heart, MapPin } from 'lucide-react';
import { Tour, Currency } from '../types';
import { formatPrice } from '../utils/format';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedTours: Tour[];
  currentCurrency: Currency;
  onRemoveFromWishlist: (tourId: string) => void;
  onSelectTour: (tour: Tour) => void;
  onBookTour: (tour: Tour) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistedTours,
  currentCurrency,
  onRemoveFromWishlist,
  onSelectTour,
  onBookTour,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalEstimatedUSD = wishlistedTours.reduce((sum, t) => sum + t.priceUSD, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 bg-gradient-to-r from-emerald-800 to-emerald-700 text-white flex items-center justify-between border-b border-emerald-600">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 fill-emerald-300 text-emerald-300" />
              <div>
                <h3 className="font-serif-display text-lg font-bold">Saved Holidays</h3>
                <span className="text-xs text-emerald-100">{wishlistedTours.length} {wishlistedTours.length === 1 ? 'Package' : 'Packages'} Bookmarked</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {wishlistedTours.length > 0 && (
                <button
                  onClick={handleShare}
                  className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
                  title="Share Wishlist"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
                </button>
              )}
              <button
                id="wishlist-drawer-close-btn"
                onClick={onClose}
                className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistedTours.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="font-serif-display text-lg font-bold text-stone-800">Your wishlist is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the heart icon on any Kashmir, Ladakh, or Katra package to save your favorites and compare itineraries.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {wishlistedTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="flex space-x-3 p-3 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div 
                      onClick={() => {
                        onSelectTour(tour);
                        onClose();
                      }}
                      className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                    >
                      <img
                        src={tour.image}
                        alt={tour.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                            {tour.country}
                          </span>
                          <button
                            onClick={() => onRemoveFromWishlist(tour.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h5
                          onClick={() => {
                            onSelectTour(tour);
                            onClose();
                          }}
                          className="font-serif-display text-sm font-bold text-stone-900 truncate hover:text-amber-700 cursor-pointer"
                        >
                          {tour.title}
                        </h5>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {tour.durationDays} Days • Max {tour.groupSizeMax} Guests
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="font-bold text-xs text-stone-900">
                          {formatPrice(tour.priceUSD, currentCurrency)}
                        </span>
                        <div className="flex space-x-1.5">
                          <button
                            onClick={() => {
                              onSelectTour(tour);
                              onClose();
                            }}
                            className="px-2 py-1 text-[11px] font-medium text-stone-700 hover:text-stone-950 bg-white border border-stone-200 rounded hover:bg-stone-50"
                          >
                            Itinerary
                          </button>
                          <button
                            onClick={() => {
                              onBookTour(tour);
                              onClose();
                            }}
                            className="px-2.5 py-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded shadow-xs"
                          >
                            Reserve
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {wishlistedTours.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="flex justify-between items-baseline text-xs text-stone-600">
                <span>Total Estimated Package Cost:</span>
                <span className="font-serif-display text-lg font-bold text-emerald-950">
                  {formatPrice(totalEstimatedUSD, currentCurrency)}
                </span>
              </div>
              <button
                onClick={() => {
                  onSelectTour(wishlistedTours[0]);
                  onClose();
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>View First Saved Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
