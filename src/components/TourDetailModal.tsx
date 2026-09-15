import React, { useState } from 'react';
import { 
  X, Star, MapPin, Calendar, Users, ShieldCheck, Check, 
  ChevronRight, ArrowRight, Heart, Utensils, Hotel, Sparkles, AlertCircle, Phone, MessageSquare 
} from 'lucide-react';
import { Tour, Currency, DepartureDate } from '../types';
import { formatPrice } from '../utils/format';

interface TourDetailModalProps {
  tour: Tour | null;
  isOpen?: boolean;
  onClose: () => void;
  currentCurrency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (tourId: string) => void;
  onBookTour: (tour: Tour, departure?: DepartureDate) => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  tour,
  isOpen,
  onClose,
  currentCurrency,
  isWishlisted,
  onToggleWishlist,
  onBookTour,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'inclusions' | 'departures'>('overview');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [expandedDays, setExpandedDays] = useState<number[]>([1, 2]);

  if (!tour) return null;

  const toggleDay = (dayNum: number) => {
    if (expandedDays.includes(dayNum)) {
      setExpandedDays(expandedDays.filter(d => d !== dayNum));
    } else {
      setExpandedDays([...expandedDays, dayNum]);
    }
  };

  const expandAllDays = () => {
    setExpandedDays(tour.itinerary.map(item => item.day));
  };

  const collapseAllDays = () => {
    setExpandedDays([]);
  };

  const activePhoto = tour.gallery[activePhotoIdx] || tour.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
              {tour.country}
            </span>
            <span className="text-xs text-stone-500 font-medium">
              {tour.style} • {tour.durationDays} Days
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleWishlist(tour.id)}
              className={`p-2 rounded-full border transition-colors ${
                isWishlisted 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'bg-white border-stone-200 text-stone-600 hover:text-rose-600'
              }`}
              title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              id="tour-modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Main Gallery Showcase */}
          <div className="space-y-3">
            <div className="relative aspect-[21/9] sm:aspect-[24/10] w-full rounded-xl overflow-hidden bg-stone-900">
              <img
                src={activePhoto}
                alt={tour.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center space-x-2 text-xs text-emerald-300 font-semibold mb-1">
                  <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                  <span>{tour.rating} Rating ({tour.reviewCount} Verified Reviews)</span>
                </div>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white drop-shadow">
                  {tour.title}
                </h2>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {tour.gallery.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-1">
                {tour.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activePhotoIdx === idx ? 'border-emerald-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 text-center">
              <div className="text-[11px] uppercase font-semibold text-stone-400">Duration</div>
              <div className="text-base font-bold text-stone-800 mt-0.5">{tour.durationDays} Days / {tour.durationDays - 1} Nights</div>
            </div>
            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 text-center">
              <div className="text-[11px] uppercase font-semibold text-stone-400">Group Intimacy</div>
              <div className="text-base font-bold text-stone-800 mt-0.5">Max {tour.groupSizeMax} Travelers</div>
            </div>
            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 text-center">
              <div className="text-[11px] uppercase font-semibold text-stone-400">Activity Level</div>
              <div className="text-base font-bold text-stone-800 mt-0.5">{tour.difficulty}</div>
            </div>
            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 text-center">
              <div className="text-[11px] uppercase font-semibold text-stone-400">Local Support</div>
              <div className="text-base font-bold text-emerald-700 mt-0.5">Srinagar HQ</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-stone-200 space-x-6 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'overview'
                  ? 'border-emerald-600 text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Overview &amp; Highlights
            </button>
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'itinerary'
                  ? 'border-emerald-600 text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Day-by-Day Itinerary ({tour.itinerary.length} Days)
            </button>
            <button
              onClick={() => setActiveTab('inclusions')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'inclusions'
                  ? 'border-emerald-600 text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Inclusions &amp; Logistics
            </button>
            <button
              onClick={() => setActiveTab('departures')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'departures'
                  ? 'border-emerald-600 text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Available Departures ({tour.departures.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif-display text-xl font-bold text-stone-900 mb-2">The Experience</h4>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  {tour.overview}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="font-serif-display text-lg font-bold text-stone-900 mb-3">Trip Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {tour.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-200/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500">Detailed day-to-day journey through {tour.region}</span>
                <div className="space-x-3">
                  <button onClick={expandAllDays} className="text-emerald-700 hover:underline font-semibold cursor-pointer">
                    Expand All
                  </button>
                  <button onClick={collapseAllDays} className="text-stone-500 hover:underline cursor-pointer">
                    Collapse All
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {tour.itinerary.map((dayItem) => {
                  const isExpanded = expandedDays.includes(dayItem.day);
                  return (
                    <div key={dayItem.day} className="border border-stone-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleDay(dayItem.day)}
                        className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 transition-colors text-left"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                            D{dayItem.day}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-stone-900 block sm:inline">{dayItem.title}</span>
                            {dayItem.activityHighlight && (
                              <span className="text-[11px] text-stone-500 sm:ml-2">({dayItem.activityHighlight})</span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-stone-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>

                      {isExpanded && (
                        <div className="p-4 bg-white border-t border-stone-200 space-y-3 text-xs text-stone-700">
                          <p className="leading-relaxed">{dayItem.description}</p>
                          <div className="flex flex-wrap gap-4 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
                            {dayItem.lodging && (
                              <span className="flex items-center space-x-1">
                                <Hotel className="w-3.5 h-3.5 text-stone-400" />
                                <span>{dayItem.lodging}</span>
                              </span>
                            )}
                            <span className="flex items-center space-x-1">
                              <Utensils className="w-3.5 h-3.5 text-stone-400" />
                              <span>{dayItem.meals}</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-5">
                <h4 className="font-serif-display text-base font-bold text-emerald-950 mb-3 flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>Package Inclusions</span>
                </h4>
                <ul className="space-y-2 text-xs text-emerald-900">
                  {tour.included.map((inc, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/50 border border-rose-200/80 rounded-2xl p-5">
                <h4 className="font-serif-display text-base font-bold text-rose-950 mb-3 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Package Exclusions</span>
                </h4>
                <ul className="space-y-2 text-xs text-rose-900">
                  {tour.notIncluded.map((exc, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'departures' && (
            <div className="space-y-4">
              <div className="space-y-2">
                {tour.departures.map((dep) => (
                  <div
                    key={dep.id}
                    className="p-4 bg-white rounded-xl border border-stone-200 hover:border-emerald-500 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-stone-900 text-sm sm:text-base">
                          {dep.startDate} — {dep.endDate}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className={`px-2 py-0.5 rounded-full font-semibold ${
                          dep.spotsLeft <= 3 
                            ? 'bg-rose-100 text-rose-800' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {dep.spotsLeft} spots remaining
                        </span>
                        <span className="text-stone-400">•</span>
                        <span className="text-stone-600">{dep.status}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="block text-[10px] uppercase font-semibold text-stone-400">Per Person</span>
                        <span className="font-serif-display text-xl font-bold text-stone-900">
                          {formatPrice(dep.priceUSD, currentCurrency)}
                        </span>
                      </div>
                      <button
                        onClick={() => onBookTour(tour, dep)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Action Bar in White & Emerald */}
        <div className="p-4 sm:p-5 bg-white text-stone-900 flex flex-wrap items-center justify-between gap-4 border-t border-emerald-200 shadow-lg">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-stone-500 font-medium">All-Inclusive Package Rate</span>
            <div className="flex items-baseline space-x-2">
              <span className="font-serif-display text-2xl sm:text-3xl font-bold text-emerald-950">
                {formatPrice(tour.priceUSD, currentCurrency)}
              </span>
              <span className="text-xs text-stone-600 font-medium">/ person (Breakfast &amp; Dinner Included)</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="tel:7006644364"
              className="px-3.5 py-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Call 7006644364</span>
            </a>
            <button
              id="modal-reserve-btn"
              onClick={() => onBookTour(tour)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-emerald-600/30 transition-all cursor-pointer flex items-center space-x-2"
            >
              <span>Book Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
