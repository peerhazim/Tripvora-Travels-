import React from 'react';
import { Users, Compass, ShieldCheck, HeartHandshake, Sparkles, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { COMPANY_PILLARS } from '../data/tours';

export const WhyUs: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Users: <Users className="w-6 h-6 text-emerald-600" />,
    Compass: <Compass className="w-6 h-6 text-emerald-600" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-emerald-600" />,
  };

  return (
    <section id="why-us" className="py-24 bg-stone-100/70 border-t border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>The TripVora Difference</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-light text-stone-900 tracking-tight">
            Born &amp; Based in the Heart of Kashmir
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            Unlike distant booking aggregators, TripVora Travels is proudly headquartered in Srinagar. We own our relationships with local shikara owners, luxury houseboats, experienced mountain cab pilots, and Katra yatra facilitators.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANY_PILLARS.map((pillar, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-5">
                  {iconMap[pillar.iconName] || <ShieldCheck className="w-6 h-6 text-emerald-600" />}
                </div>
                <h3 className="font-serif-display text-xl font-bold text-stone-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] font-semibold uppercase tracking-wider text-emerald-700 flex items-center space-x-1">
                <span>TripVora Guarantee</span>
                <span>✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* On-ground Support Impact Banner in White & Emerald */}
        <div className="mt-14 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 text-stone-900 rounded-2xl p-8 sm:p-10 border-2 border-emerald-300 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Office • Srinagar, Sopore, Jammu and Kashmir</span>
            </div>
            <h4 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
              24/7 On-Ground Assistance Throughout Your Holiday
            </h4>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              From the moment you touch down at Sheikh ul-Alam Airport (Srinagar), Kushok Bakula Rimpochee Airport (Leh), or Jammu Tawi station, our trip managers are with you every step.
            </p>
            <div className="pt-2">
              <a
                href="tel:7006644364"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Helpline: 7006644364</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 sm:gap-8 text-center border-t lg:border-t-0 lg:border-l border-emerald-200 pt-6 lg:pt-0 lg:pl-10">
            <div>
              <div className="font-serif-display text-2xl sm:text-3xl font-bold text-emerald-700">100%</div>
              <div className="text-[11px] text-stone-600 font-medium uppercase tracking-wider mt-1">Local Team</div>
            </div>
            <div>
              <div className="font-serif-display text-2xl sm:text-3xl font-bold text-emerald-700">2,500+</div>
              <div className="text-[11px] text-stone-600 font-medium uppercase tracking-wider mt-1">Happy Guests</div>
            </div>
            <div>
              <div className="font-serif-display text-2xl sm:text-3xl font-bold text-emerald-700">24/7</div>
              <div className="text-[11px] text-stone-600 font-medium uppercase tracking-wider mt-1">Ground Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
