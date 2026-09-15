import React, { useState } from 'react';
import { 
  Compass, Search, Calendar, MapPin, Users, Sparkles, Award, ShieldCheck, 
  Phone, MessageSquare, Send, CheckCircle2, Car, Clock, ArrowRight, Hotel, Heart 
} from 'lucide-react';
import { Region, TravelStyle } from '../types';
import { ChinarLeafIcon } from './ChinarLeafIcon';
import { useKashmirTheme } from '../context/ThemeContext';

interface HeroProps {
  selectedRegion: Region;
  onRegionChange: (r: Region) => void;
  selectedStyle: TravelStyle;
  onStyleChange: (s: TravelStyle) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  onSearchSubmit: () => void;
  onOpenPlanner: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedRegion,
  onRegionChange,
  selectedStyle,
  onStyleChange,
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
  onOpenPlanner,
}) => {
  // Hero Form Filling State
  const [heroName, setHeroName] = useState('');
  const [heroPhone, setHeroPhone] = useState('');
  const [heroEmail, setHeroEmail] = useState('');
  const [heroDestination, setHeroDestination] = useState('Kashmir Valley (Srinagar, Gulmarg, Pahalgam)');
  const [heroTravelDate, setHeroTravelDate] = useState('');
  const [heroDuration, setHeroDuration] = useState('6 Days / 5 Nights');
  const [heroTravelers, setHeroTravelers] = useState('Couple (2 Adults)');
  const [heroCab, setHeroCab] = useState('Innova Crysta');
  const [heroHotelType, setHeroHotelType] = useState('Deluxe 4-Star with Dal Lake Houseboat');
  const [heroNotes, setHeroNotes] = useState('');
  const [submittingHero, setSubmittingHero] = useState(false);
  const [heroSubmitted, setHeroSubmitted] = useState<{ id: string; whatsappUrl: string } | null>(null);
  const [heroError, setHeroError] = useState('');

  // Quick preset template filler
  const applyPreset = (preset: {
    dest: string;
    dur: string;
    travelers: string;
    cab: string;
    hotel: string;
  }) => {
    setHeroDestination(preset.dest);
    setHeroDuration(preset.dur);
    setHeroTravelers(preset.travelers);
    setHeroCab(preset.cab);
    setHeroHotelType(preset.hotel);
  };

  // Dynamic estimated package calculation for form filling (calibrated around ₹12,999 per person)
  const getEstimatedPrice = () => {
    let basePerPerson = 12999;

    if (heroDuration.includes('4 Days')) {
      basePerPerson = 10999;
    } else if (heroDuration.includes('5 Days')) {
      basePerPerson = 12999; // Classic 5D/4N Package at ₹12,999
    } else if (heroDuration.includes('6 Days')) {
      basePerPerson = 12999; // Special Promotional 6D Package at ₹12,999
    } else if (heroDuration.includes('7 Days')) {
      basePerPerson = 15999;
    } else if (heroDuration.includes('8+ Days')) {
      basePerPerson = 19999;
    }

    if (heroDestination.includes('Katra')) {
      basePerPerson = Math.round(basePerPerson * 0.75);
    } else if (heroDestination.includes('Ladakh')) {
      basePerPerson = Math.round(basePerPerson * 1.55);
    } else if (heroDestination.includes('Combo')) {
      basePerPerson = Math.round(basePerPerson * 1.35);
    }

    let guests = 2;
    if (heroTravelers.includes('Couple') || heroTravelers.includes('2 Adults')) guests = 2;
    else if (heroTravelers.includes('Kids')) guests = 3;
    else if (heroTravelers.includes('3-4')) guests = 4;
    else if (heroTravelers.includes('5-6')) guests = 6;
    else if (heroTravelers.includes('7+')) guests = 8;
    else if (heroTravelers.includes('Solo')) guests = 1;

    return { perPerson: basePerPerson, total: basePerPerson * guests, guests };
  };

  const currentEstimate = getEstimatedPrice();

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroName || !heroPhone) {
      setHeroError('Please enter your Name and Mobile/WhatsApp number.');
      return;
    }
    setHeroError('');
    setSubmittingHero(true);

    try {
      const res = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'hero_form',
          name: heroName,
          phone: heroPhone,
          email: heroEmail,
          destination: heroDestination,
          travelDate: heroTravelDate,
          duration: heroDuration,
          travelers: heroTravelers,
          cabType: heroCab,
          hotelType: heroHotelType,
          budget: `₹${currentEstimate.perPerson.toLocaleString('en-IN')} / person (Est. Total: ₹${currentEstimate.total.toLocaleString('en-IN')})`,
          notes: (heroNotes ? `${heroNotes} | ` : '') + `Est. Price: ₹${currentEstimate.perPerson.toLocaleString('en-IN')}/person`
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setHeroSubmitted({ id: data.queryId, whatsappUrl: data.whatsappUrl });
      } else {
        setHeroError(data.error || 'Failed to submit quote request. Call 7006644364.');
      }
    } catch (err) {
      console.error(err);
      // Direct WhatsApp fallback
      const fallbackMsg = `Hi TripVora Travels! I would like a quote for:\nDestination: ${heroDestination}\nDuration: ${heroDuration}\nTravelers: ${heroTravelers}\nCab: ${heroCab}\nHotel: ${heroHotelType}\nEstimated: ₹${currentEstimate.perPerson.toLocaleString('en-IN')}/person\nName: ${heroName}\nPhone: ${heroPhone}`;
      setHeroSubmitted({
        id: 'TV-' + Math.floor(1000 + Math.random() * 9000),
        whatsappUrl: `https://wa.me/917006644364?text=${encodeURIComponent(fallbackMsg)}`
      });
    } finally {
      setSubmittingHero(false);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-emerald-950">
      {/* Background Image: Iconic Dal Lake with Traditional Shikara and Himalayan Mountains */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2400&auto=format&fit=crop"
          alt="Dal Lake Kashmir with traditional carved wooden Shikara boat and misty Himalayas"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-100 filter brightness-90 contrast-105"
        />
        {/* Artistic, rich gradient layers integrating Dal Lake into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/30 to-emerald-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/70 via-transparent to-stone-950/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-2">
        
        {/* Top Hotline & Location Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-white/95 border border-emerald-300 text-xs font-semibold tracking-wider shadow-md backdrop-blur-md">
            <span className="text-emerald-800 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Srinagar HQ • Kashmir, Ladakh &amp; Katra</span>
            </span>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <a
              href="tel:7006644364"
              className="text-emerald-700 hover:text-emerald-900 flex items-center space-x-1 font-bold transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-600 animate-pulse" />
              <span>Helpline: 7006644364</span>
            </a>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <a
              href="https://wa.me/917006644364?text=Hi%20TripVora%20Travels,%20I%20am%20interested%20in%20a%20tour%20package"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-900 flex items-center space-x-1 underline decoration-emerald-500/50 font-bold"
            >
              <MessageSquare className="w-3 h-3 text-emerald-600" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Dual-Column Layout: Left Narrative & Right Form Filling Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10">
          
          {/* Left Column: Heading, Trust Markers & Quick CTAs (6 cols) */}
          <div className="lg:col-span-6 text-left space-y-5">
            <div 
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-md"
              style={{
                backgroundColor: 'rgba(20, 10, 5, 0.75)',
                border: '1px solid var(--theme-primary-border)',
                color: 'var(--theme-accent-light)'
              }}
            >
              <ChinarLeafIcon className="w-3.5 h-3.5" fill="var(--theme-accent)" />
              <span>TripVora Travels • Kashmir Local DMC</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.1] drop-shadow-md">
              Discover Paradise. <br />
              <span className="italic font-normal" style={{ color: 'var(--theme-accent)' }}>
                Kashmir, Ladakh &amp; Vaishno Devi Katra.
              </span>
            </h1>

            <p className="text-stone-100 text-sm sm:text-base font-normal leading-relaxed max-w-xl drop-shadow-sm">
              Native Srinagar travel company providing handpicked Dal Lake heritage houseboats, private sanitized cabs, Gulmarg Gondola Phase 1 &amp; 2 passes, and sacred Mata Vaishno Devi yatras with 24/7 on-ground assistance at <strong className="font-bold" style={{ color: 'var(--theme-accent)' }}>7006644364</strong>.
            </p>

            {/* Quick Feature Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-stone-100 max-w-lg">
              <div className="flex items-center space-x-2 bg-stone-900/70 border border-emerald-500/30 px-3 py-2 rounded-xl backdrop-blur-md shadow-xs">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-medium text-stone-100">Srinagar, Sopore, J&amp;K</span>
              </div>
              <div className="flex items-center space-x-2 bg-stone-900/70 border border-emerald-500/30 px-3 py-2 rounded-xl backdrop-blur-md shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-medium text-stone-100">Sanitized Cabs</span>
              </div>
              <div className="flex items-center space-x-2 bg-stone-900/70 border border-emerald-500/30 px-3 py-2 rounded-xl backdrop-blur-md shadow-xs">
                <Hotel className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-medium text-stone-100">Deluxe Houseboats</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:7006644364"
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hotline: 7006644364</span>
              </a>
              <button
                onClick={onOpenPlanner}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/40 font-bold text-xs uppercase tracking-wider rounded-xl backdrop-blur-md transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-300" />
                <span>Custom Trip Builder →</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Form Filling Section in Crisp Pure White & Green (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-white border-2 border-emerald-500 rounded-2xl p-5 sm:p-6 shadow-2xl text-left relative ring-4 ring-emerald-500/10">
              
              {!heroSubmitted ? (
                <div>
                  {/* Form Header */}
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-3">
                    <div>
                      <div className="flex items-center space-x-1.5 text-[11px] uppercase font-bold tracking-wider text-emerald-700">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>Instant Form Filling &amp; Free Quote</span>
                      </div>
                      <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900">
                        Plan Your Kashmir Holiday
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
                      Best Rates Guaranteed
                    </span>
                  </div>

                  {/* 1-Tap Quick Fill Presets */}
                  <div className="mb-3.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                      1-Tap Quick Fill:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => applyPreset({
                          dest: 'Kashmir Valley (Srinagar, Gulmarg, Pahalgam)',
                          dur: '6 Days / 5 Nights',
                          travelers: 'Family (2 Adults + Kids)',
                          cab: 'Innova Crysta',
                          hotel: 'Deluxe 4-Star with Dal Lake Houseboat'
                        })}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-semibold text-emerald-900 transition-colors cursor-pointer"
                      >
                        🏔️ Family Kashmir (6D)
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset({
                          dest: 'Kashmir Romantic Honeymoon Special',
                          dur: '5 Days / 4 Nights',
                          travelers: 'Couple (2 Adults)',
                          cab: 'Private Sedan (Dzire)',
                          hotel: 'Deluxe 4-Star with Dal Lake Houseboat'
                        })}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-semibold text-emerald-900 transition-colors cursor-pointer"
                      >
                        🌹 Honeymoon (5D)
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset({
                          dest: 'Enchanting Kashmir Budget (TripVora Classic)',
                          dur: '5 Days / 4 Nights',
                          travelers: 'Couple (2 Adults)',
                          cab: 'Private Sedan (Dzire)',
                          hotel: 'Standard 3-Star Budget Hotel'
                        })}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-semibold text-emerald-900 transition-colors cursor-pointer"
                      >
                        ⭐ TripVora Classic (₹12,999)
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset({
                          dest: 'Mata Vaishno Devi Katra & Shivkhori',
                          dur: '4 Days / 3 Nights',
                          travelers: 'Family (2 Adults + Kids)',
                          cab: 'Innova Crysta',
                          hotel: 'Pure Veg Hotel near Katra Base'
                        })}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-semibold text-emerald-900 transition-colors cursor-pointer"
                      >
                        🙏 Vaishno Devi Katra (4D)
                      </button>
                    </div>
                  </div>

                  {heroError && (
                    <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                      {heroError}
                    </div>
                  )}

                  <form onSubmit={handleHeroSubmit} className="space-y-2.5">
                    {/* Destination Sector */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-0.5">
                        Choose Destination / Sector *
                      </label>
                      <select
                        value={heroDestination}
                        onChange={(e) => setHeroDestination(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:bg-white"
                      >
                        <option>Kashmir Valley (Srinagar, Gulmarg, Pahalgam)</option>
                        <option>Enchanting Kashmir Budget (TripVora Classic)</option>
                        <option>Kashmir Winter Wonderland Snow &amp; Ski Special</option>
                        <option>Kashmir Romantic Honeymoon Special</option>
                        <option>Offbeat Gurez Valley &amp; Kishanganga River</option>
                        <option>Offbeat Doodhpathri &amp; Yusmarg Meadows</option>
                        <option>Kashmir Spring Tulip Festival Special</option>
                        <option>Mata Vaishno Devi Katra &amp; Shivkhori</option>
                        <option>Katra Vaishno Devi Express &amp; Patnitop Pines</option>
                        <option>Vaishno Devi Katra + Kashmir Paradise Combo</option>
                        <option>Ladakh Moonland, Nubra &amp; Pangong Tso</option>
                        <option>Grand Kashmir to Ladakh Overland Circuit</option>
                      </select>
                    </div>

                    {/* Travel Dates & Duration Grid */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-0.5">
                          Travel Dates / Month
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. May 2026 / Next Week"
                          value={heroTravelDate}
                          onChange={(e) => setHeroTravelDate(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-0.5">
                          Duration
                        </label>
                        <select
                          value={heroDuration}
                          onChange={(e) => setHeroDuration(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        >
                          <option>4 Days / 3 Nights</option>
                          <option>5 Days / 4 Nights (Kashmir Port Popular)</option>
                          <option>6 Days / 5 Nights (Recommended)</option>
                          <option>7 Days / 6 Nights</option>
                          <option>8+ Days Grand Circuit</option>
                        </select>
                      </div>
                    </div>

                    {/* Travelers & Cab Grid */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-0.5">
                          Guests / Travelers
                        </label>
                        <select
                          value={heroTravelers}
                          onChange={(e) => setHeroTravelers(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        >
                          <option>Couple (2 Adults)</option>
                          <option>Family (2 Adults + Kids)</option>
                          <option>Family (3-4 Adults)</option>
                          <option>Group of 5-6 Adults</option>
                          <option>Group of 7+ Adults</option>
                          <option>Solo Traveler</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-0.5">
                          Dedicated Cab
                        </label>
                        <select
                          value={heroCab}
                          onChange={(e) => setHeroCab(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        >
                          <option>Innova Crysta</option>
                          <option>Private Sedan (Dzire / Etios)</option>
                          <option>4x4 Scorpio / Bolero (Snow/Offbeat)</option>
                          <option>12-Seater Tempo Traveller</option>
                        </select>
                      </div>
                    </div>

                    {/* Live Dynamic Price Estimation Box in Form Filling */}
                    <div className="p-3 bg-gradient-to-r from-emerald-50 via-emerald-50/70 to-emerald-100/50 border border-emerald-300 rounded-xl flex items-center justify-between shadow-xs">
                      <div>
                        <div className="flex items-center space-x-1.5 text-[10px] uppercase font-bold tracking-wider text-emerald-800">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Estimated Per Person Price</span>
                        </div>
                        <div className="text-[11px] text-stone-600 font-medium">
                          All-inclusive: Cab + Hotel/Houseboat + Meals + Shikara
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-serif-display text-xl sm:text-2xl font-extrabold text-emerald-950">
                          ₹{currentEstimate.perPerson.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 block -mt-0.5">
                          / person • Est. Total: ₹{currentEstimate.total.toLocaleString('en-IN')} ({currentEstimate.guests} {currentEstimate.guests === 1 ? 'Guest' : 'Guests'})
                        </span>
                      </div>
                    </div>

                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-0.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Hazim Peer / Rahul"
                          value={heroName}
                          onChange={(e) => setHeroName(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-0.5">
                          Mobile / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 7006644364"
                          value={heroPhone}
                          onChange={(e) => setHeroPhone(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Optional Email & Notes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-0.5">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          placeholder="yourname@gmail.com"
                          value={heroEmail}
                          onChange={(e) => setHeroEmail(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-0.5">
                          Special Requirements (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Gondola Pass, Houseboat"
                          value={heroNotes}
                          onChange={(e) => setHeroNotes(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Submit Button in Rich Emerald */}
                    <button
                      type="submit"
                      disabled={submittingHero}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
                    >
                      {submittingHero ? (
                        <span>Submitting Your Inquiry...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Get Free Itinerary &amp; Discount Quote</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-[10px] text-stone-500 pt-0.5 font-medium">
                      <span className="flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Direct local Srinagar operator</span>
                      </span>
                      <span>Dispatched to peerhazim98@gmail.com</span>
                    </div>
                  </form>
                </div>
              ) : (
                /* Hero Form Submission Success State */
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800">
                      Inquiry Logged #{heroSubmitted.id}
                    </span>
                    <h4 className="font-serif-display text-xl font-bold text-stone-900 mt-0.5">
                      Thank You, {heroName}!
                    </h4>
                    <p className="text-stone-600 text-xs mt-1 leading-relaxed">
                      We have notified our Srinagar team at <strong className="text-emerald-800">peerhazim98@gmail.com</strong> for your <strong>{heroDestination}</strong> trip.
                    </p>
                  </div>

                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                    <span className="text-[11px] text-emerald-900 block font-medium">
                      Send your inquiry directly to WhatsApp for instant 5-minute response:
                    </span>
                    <a
                      href={heroSubmitted.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-1.5 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Send to WhatsApp (7006644364)</span>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setHeroSubmitted(null);
                      setHeroName('');
                      setHeroPhone('');
                      setHeroEmail('');
                      setHeroNotes('');
                    }}
                    className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold underline cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Floating Discovery & Filter Box in Pristine White & Emerald */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-xl text-left max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Sector */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider uppercase text-stone-700 flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>Sector</span>
              </label>
              <select
                id="hero-select-region"
                value={selectedRegion}
                onChange={(e) => onRegionChange(e.target.value as Region)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
              >
                <option value="All">All Sectors (Kashmir Main Highlight + Katra Below)</option>
                <option value="Kashmir">★ Normal Kashmir Packages (Main Highlight)</option>
                <option value="Vaishno Devi Katra">🛕 Vaishno Devi Katra (Held Under Kashmir)</option>
                <option value="Ladakh">Ladakh (Leh, Nubra, Pangong Tso)</option>
                <option value="Combo Circuits">Combo Circuits (Srinagar-Leh &amp; Katra)</option>
              </select>
            </div>

            {/* Travel Style */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider uppercase text-stone-700 flex items-center space-x-1">
                <Compass className="w-3 h-3 text-emerald-600" />
                <span>Package Type</span>
              </label>
              <select
                id="hero-select-style"
                value={selectedStyle}
                onChange={(e) => onStyleChange(e.target.value as TravelStyle)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
              >
                <option value="All">All Package Types</option>
                <option value="Family & Honeymoon">Family &amp; Honeymoon</option>
                <option value="Houseboats & Shikara">Houseboats &amp; Shikara</option>
                <option value="Spiritual & Pilgrimage">Spiritual &amp; Pilgrimage (Yatra)</option>
                <option value="Adventure & High Passes">Adventure &amp; High Passes</option>
                <option value="Offbeat Valleys">Offbeat Valleys (Gurez &amp; Doodhpathri)</option>
              </select>
            </div>

            {/* Search Keyword */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider uppercase text-stone-700 flex items-center space-x-1">
                <Search className="w-3 h-3 text-emerald-600" />
                <span>Search</span>
              </label>
              <input
                id="hero-input-keyword"
                type="text"
                placeholder="e.g. Kashmir Port, Gulmarg, Katra..."
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
              />
            </div>

            {/* Search Button */}
            <div className="flex flex-col justify-end">
              <button
                id="hero-search-btn"
                onClick={onSearchSubmit}
                className="w-full h-[36px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center space-x-2 shadow-md transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Explore Packages</span>
              </button>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
            <div className="flex items-center space-x-2">
              <span className="text-stone-800 font-bold">Quick Searches:</span>
              <button
                onClick={() => {
                  onSearchQueryChange('Kashmir Port');
                  onSearchSubmit();
                }}
                className="hover:text-emerald-800 underline decoration-emerald-600 underline-offset-2 transition-colors text-emerald-700 font-semibold cursor-pointer"
              >
                Kashmir Port
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  onSearchQueryChange('Gulmarg');
                  onSearchSubmit();
                }}
                className="hover:text-emerald-700 underline decoration-stone-400 underline-offset-2 transition-colors cursor-pointer"
              >
                Gulmarg Snow
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  onSearchQueryChange('Pangong');
                  onSearchSubmit();
                }}
                className="hover:text-emerald-700 underline decoration-stone-400 underline-offset-2 transition-colors cursor-pointer"
              >
                Pangong Tso
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  onSearchQueryChange('Vaishno');
                  onSearchSubmit();
                }}
                className="hover:text-emerald-700 underline decoration-stone-400 underline-offset-2 transition-colors cursor-pointer"
              >
                Vaishno Devi Katra
              </button>
            </div>

            <button
              id="hero-custom-planner-cta"
              onClick={onOpenPlanner}
              className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center space-x-1 cursor-pointer"
            >
              <span>Need customized package?</span>
              <span className="underline">Custom Planner →</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
