import React from 'react';
import { Star, CheckCircle, Quote, Sparkles } from 'lucide-react';
import { TRAVELER_REVIEWS } from '../data/tours';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Guest Reflections</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light text-stone-900 tracking-tight">
              Stories from the Trail
            </h2>
          </div>

          {/* Aggregate Rating Badge */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex items-center space-x-4 max-w-sm">
            <div className="text-center pr-4 border-r border-stone-200">
              <div className="font-serif-display text-3xl font-bold text-stone-900">4.96</div>
              <div className="flex items-center text-emerald-500 justify-center mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
            <div className="text-xs text-stone-600 leading-snug">
              <span className="font-bold text-stone-900 block">Exceptional Trust Score</span>
              Over 2,500 happy families, honeymooners, and pilgrims hosted across Kashmir &amp; Ladakh.
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAVELER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-stone-50/70 border border-stone-200/90 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md hover:border-emerald-500/30 transition-all relative"
            >
              <Quote className="w-8 h-8 text-stone-200 absolute top-4 right-4 -z-0" />
              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex items-center text-emerald-500 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Tour Title Tag */}
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-2 truncate" title={review.tourTitle}>
                  {review.tourTitle}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center space-x-3 relative z-10">
                <img
                  src={review.avatar}
                  alt={review.author}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-stone-300"
                />
                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-stone-900 truncate">{review.author}</span>
                    <span title="Verified Traveler" className="inline-flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 truncate">{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
