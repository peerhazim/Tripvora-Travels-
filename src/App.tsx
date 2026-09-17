import React, { useState, useMemo, useEffect } from 'react';
import { TOURS_DATA } from './data/tours';
import { Tour, Region, TravelStyle, Currency, DepartureDate } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { TourCard } from './components/TourCard';
import { TourDetailModal } from './components/TourDetailModal';
import { BookingModal } from './components/BookingModal';
import { CustomTripPlanner } from './components/CustomTripPlanner';
import { WishlistDrawer } from './components/WishlistDrawer';
import { WhyUs } from './components/WhyUs';
import { TopKashmirDestinations } from './components/TopKashmirDestinations';
import { BestSeasonsToVisit } from './components/BestSeasonsToVisit';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { QuickInquirySection } from './components/QuickInquirySection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { LogoApprovalModal } from './components/LogoApprovalModal';
import { FloatingActionMenu } from './components/FloatingActionMenu';
import { AlertCircle, Phone, Sparkles, ShieldCheck, CheckCircle2, ArrowDown } from 'lucide-react';
import { ThemeProvider, useKashmirTheme } from './context/ThemeContext';
import { ChinarLeafIcon } from './components/ChinarLeafIcon';

function TripVoraContent() {
  const { themeConfig } = useKashmirTheme();

  // Global Currency State (Default to INR for Kashmir/Indian packages)
  const [currency, setCurrency] = useState<Currency>('INR');

  // Wishlist state (persisted in localStorage)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tripvora_wishlist');
      return saved ? JSON.parse(saved) : ['kashmir-paradise-luxury', 'vaishnodevi-katra-darshan'];
    } catch {
      return ['kashmir-paradise-luxury', 'vaishnodevi-katra-darshan'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tripvora_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Filters State
  const [selectedRegion, setSelectedRegion] = useState<Region>('All');
  const [selectedStyle, setSelectedStyle] = useState<TravelStyle>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'duration'>('recommended');

  // Modals & Drawers State
  const [activeTourDetail, setActiveTourDetail] = useState<Tour | null>(null);
  const [bookingModalState, setBookingModalState] = useState<{ tour: Tour; departure?: DepartureDate } | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Logo Review & Approval State
  const [isLogoApproved, setIsLogoApproved] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tripvora_logo_approved') === 'true';
    } catch {
      return false;
    }
  });
  const [isLogoReviewOpen, setIsLogoReviewOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tripvora_logo_approved') !== 'true';
    } catch {
      return true;
    }
  });

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle Wishlist
  const toggleWishlist = (tourId: string) => {
    setWishlist(prev => 
      prev.includes(tourId) ? prev.filter(id => id !== tourId) : [...prev, tourId]
    );
  };

  // Filtered & Sorted Tours
  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      // Region check
      if (selectedRegion !== 'All' && tour.region !== selectedRegion) {
        return false;
      }
      // Style check
      if (selectedStyle !== 'All' && tour.style !== selectedStyle) {
        return false;
      }
      // Search keyword
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = tour.title.toLowerCase().includes(q);
        const matchesCountry = tour.country.toLowerCase().includes(q);
        const matchesSubtitle = tour.subtitle.toLowerCase().includes(q);
        const matchesHighlights = tour.highlights.some(h => h.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCountry && !matchesSubtitle && !matchesHighlights) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
      if (sortBy === 'duration') return b.durationDays - a.durationDays;
      // Default: recommended / rating
      return b.rating - a.rating;
    });
  }, [selectedRegion, selectedStyle, searchQuery, sortBy]);

  const wishlistedTours = useMemo(() => {
    return TOURS_DATA.filter(t => wishlist.includes(t.id));
  }, [wishlist]);

  const handleHeroSearchSubmit = () => {
    scrollToSection('tours-catalog');
  };

  const handleResetFilters = () => {
    setSelectedRegion('All');
    setSelectedStyle('All');
    setSearchQuery('');
    setSortBy('recommended');
  };

  // Split filtered tours to hold Katra packages under the Normal Kashmir packages section (Main Highlight)
  const { normalKashmirTours, katraTours, ladakhTours, comboTours } = useMemo(() => {
    const kashmir: Tour[] = [];
    const katra: Tour[] = [];
    const ladakh: Tour[] = [];
    const combo: Tour[] = [];

    filteredTours.forEach((tour) => {
      if (tour.region === 'Kashmir') {
        kashmir.push(tour);
      } else if (
        tour.region === 'Vaishno Devi Katra' ||
        tour.title.toLowerCase().includes('katra') ||
        tour.subtitle.toLowerCase().includes('katra')
      ) {
        katra.push(tour);
      } else if (tour.region === 'Ladakh') {
        ladakh.push(tour);
      } else {
        combo.push(tour);
      }
    });

    return { normalKashmirTours: kashmir, katraTours: katra, ladakhTours: ladakh, comboTours: combo };
  }, [filteredTours]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 transition-colors duration-300">
      {/* Interactive Top Notification Banner for New Logo Approval */}
      {!isLogoApproved && (
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-950 text-white text-xs py-2 px-4 shadow-md border-b border-amber-400/50 sticky top-0 z-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse flex-shrink-0" />
              <span className="text-[11px] sm:text-xs">
                <strong className="font-bold text-amber-300">New Brand Identity Created:</strong> A unique vector logo for TripVora Travels is ready for your review.
              </span>
            </div>
            <button
              onClick={() => setIsLogoReviewOpen(true)}
              className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-3 py-1 rounded-full text-[11px] shadow-sm transition-all cursor-pointer flex items-center space-x-1 shrink-0"
            >
              <span>Review &amp; Approve Logo</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation with Kashmir Theme & Admin Access */}
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenPlanner={() => scrollToSection('custom-planner')}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateTo={scrollToSection}
        isLogoApproved={isLogoApproved}
        onOpenLogoReview={() => setIsLogoReviewOpen(true)}
      />

      {/* Hero Section with Dual-Column Lead Capture Form */}
      <main className="flex-1">
        <Hero
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearchSubmit={handleHeroSearchSubmit}
          onOpenPlanner={() => scrollToSection('custom-planner')}
        />

        {/* Curated Expeditions Catalog - Prominently Highlighted */}
        <section id="tours-catalog" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Prominently Highlighted Master Header Card */}
          <div 
            className="relative rounded-3xl p-6 sm:p-10 mb-10 overflow-hidden text-center shadow-xl border-2"
            style={{
              background: 'linear-gradient(135deg, #fffdfa 0%, #fef3c7 35%, #ecfdf5 100%)',
              borderColor: 'var(--theme-primary-border)',
            }}
          >
            {/* Background Aesthetic Rings */}
            <div 
              className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full opacity-20 pointer-events-none blur-xl"
              style={{ backgroundColor: 'var(--theme-accent)' }} 
            />
            <div 
              className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full opacity-20 pointer-events-none blur-xl"
              style={{ backgroundColor: 'var(--theme-primary)' }} 
            />

            {/* Glowing Featured Badge */}
            <div 
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest mb-4 shadow-md border-2 border-white ring-4 ring-amber-400/25"
              style={{
                background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent), var(--theme-primary-dark))',
                color: '#ffffff',
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" style={{ animationDuration: '6s' }} />
              <span>HIGHLIGHTED • NATIVE CURATED HOLIDAY PACKAGES</span>
              <ChinarLeafIcon className="w-4 h-4 text-white" />
            </div>

            {/* Highlighted Headline */}
            <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-950 max-w-4xl mx-auto leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10 px-2 text-stone-900 drop-shadow-xs">
                  Kashmir, Ladakh &amp; Katra Holiday Packages
                </span>
                <span 
                  className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-3 sm:h-5 -z-0 opacity-40 rounded-full"
                  style={{ backgroundColor: 'var(--theme-accent)' }}
                />
              </span>
            </h2>

            <p className="mt-4 text-stone-700 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium">
              Handcrafted all-inclusive itineraries featuring dedicated sanitized private cabs, heritage Dal Lake houseboats, Gulmarg Gondola Phase 1 &amp; 2 passes, high-altitude Ladakh mountain passes, and Mata Vaishno Devi Katra yatra support. Direct native on-ground assistance at{' '}
              <a 
                href="tel:+917006644364" 
                className="font-bold underline hover:opacity-80 transition-opacity" 
                style={{ color: 'var(--theme-primary)' }}
              >
                +91 7006644364
              </a>.
            </p>

            {/* 3 Prominently Highlighted Destination Filter Pills */}
            <div className="mt-6 pt-6 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-4xl mx-auto text-left">
              <button
                type="button"
                id="highlight-filter-kashmir"
                onClick={() => setSelectedRegion('Kashmir')}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer shadow-sm ${
                  selectedRegion === 'Kashmir'
                    ? 'bg-emerald-900 text-white border-emerald-950 ring-4 ring-emerald-500/40 shadow-lg scale-[1.02]'
                    : 'bg-white/90 hover:bg-emerald-50/80 border-emerald-300 text-stone-900 hover:border-emerald-500 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider flex items-center space-x-1">
                    <span>🏔️</span>
                    <span>Normal Kashmir Packages</span>
                  </span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${selectedRegion === 'Kashmir' ? 'bg-amber-400 text-stone-950' : 'bg-amber-100 text-amber-900 border border-amber-300'}`}>
                    ★ Main Highlight
                  </span>
                </div>
                <div className={`text-xs mt-1.5 font-medium leading-snug ${selectedRegion === 'Kashmir' ? 'text-emerald-100' : 'text-stone-600'}`}>
                  Gulmarg Gondola • Dal Lake Houseboat • Pahalgam Lidder • Sonmarg Snow
                </div>
              </button>

              <button
                type="button"
                id="highlight-filter-katra"
                onClick={() => setSelectedRegion('Vaishno Devi Katra')}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer shadow-sm ${
                  selectedRegion === 'Vaishno Devi Katra'
                    ? 'bg-amber-900 text-white border-amber-950 ring-4 ring-amber-500/40 shadow-lg scale-[1.02]'
                    : 'bg-white/90 hover:bg-amber-50/80 border-amber-300 text-stone-900 hover:border-amber-500 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider flex items-center space-x-1">
                    <span>🛕</span>
                    <span>Katra Packages</span>
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedRegion === 'Vaishno Devi Katra' ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800'}`}>
                    Held Under Kashmir
                  </span>
                </div>
                <div className={`text-xs mt-1.5 font-medium leading-snug ${selectedRegion === 'Vaishno Devi Katra' ? 'text-amber-100' : 'text-stone-600'}`}>
                  Sacred Holy Cave Darshan • Helicopter Booking Assist • Battery Car • Jammu Pickup
                </div>
              </button>

              <button
                type="button"
                id="highlight-filter-ladakh"
                onClick={() => setSelectedRegion('Ladakh')}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer shadow-sm ${
                  selectedRegion === 'Ladakh'
                    ? 'bg-blue-900 text-white border-blue-950 ring-4 ring-blue-500/40 shadow-lg scale-[1.02]'
                    : 'bg-white/90 hover:bg-blue-50/80 border-blue-300 text-stone-900 hover:border-blue-500 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider flex items-center space-x-1">
                    <span>🏍️</span>
                    <span>Ladakh Expeditions</span>
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedRegion === 'Ladakh' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-800'}`}>
                    High Altitude
                  </span>
                </div>
                <div className={`text-xs mt-1.5 font-medium leading-snug ${selectedRegion === 'Ladakh' ? 'text-blue-100' : 'text-stone-600'}`}>
                  Pangong Tso Blue • Nubra Sand Dunes • Khardung La (18,380 ft) • Leh Monasteries
                </div>
              </button>
            </div>
          </div>

          {/* Interactive Filter & Sorting Bar */}
          <FilterBar
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            selectedStyle={selectedStyle}
            onStyleChange={setSelectedStyle}
            sortBy={sortBy}
            onSortChange={setSortBy}
            currentCurrency={currency}
            matchingCount={filteredTours.length}
            onResetFilters={handleResetFilters}
          />

          {/* Tour Packages Rendering Hierarchy */}
          {filteredTours.length > 0 ? (
            <div>
              {/* Scenario 1: Default / All Sectors View - Kashmir is Main Highlight, Katra held underneath */}
              {selectedRegion === 'All' && (
                <div className="space-y-16">
                  {/* MAIN HIGHLIGHT: Normal Kashmir Holiday Packages */}
                  {normalKashmirTours.length > 0 && (
                    <div>
                      <div className="mb-8 p-6 sm:p-7 rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 via-emerald-50/70 to-amber-50 shadow-md">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-600 text-white shadow-xs mb-2">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>THE MAIN HIGHLIGHT • SIGNATURE KASHMIR HOLIDAYS</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-serif-display font-black text-stone-900 tracking-tight">
                              Normal Kashmir Holiday Packages
                            </h3>
                            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl font-medium">
                              Srinagar Dal Lake Houseboats • Gulmarg Gondola Apharwat • Pahalgam Lidder River • Sonmarg Glaciers • Gurez Valley
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 bg-white/90 border border-amber-300 px-4 py-2.5 rounded-xl shrink-0 self-start sm:self-auto shadow-2xs">
                            <ChinarLeafIcon className="w-4 h-4 text-amber-600" />
                            <span>{normalKashmirTours.length} Signature Packages</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {normalKashmirTours.map((tour) => (
                          <TourCard
                            key={tour.id}
                            tour={tour}
                            currentCurrency={currency}
                            isWishlisted={wishlist.includes(tour.id)}
                            onToggleWishlist={toggleWishlist}
                            onSelectTour={(t) => setActiveTourDetail(t)}
                            onBookTour={(t) => setBookingModalState({ tour: t })}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* HELD UNDER KASHMIR: Mata Vaishno Devi Katra Packages */}
                  {katraTours.length > 0 && (
                    <div id="katra-held-packages-section" className="pt-12 border-t-2 border-dashed border-amber-300">
                      {/* Sub-section Header */}
                      <div className="mb-8 p-6 sm:p-8 rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 via-orange-50/60 to-white shadow-lg relative overflow-hidden">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          <div>
                            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-700 text-white shadow-xs mb-3">
                              <span>🛕 HELD UNDER NORMAL KASHMIR PACKAGES SECTION</span>
                            </div>
                            <h3 className="text-2xl sm:text-4xl font-serif-display font-black text-stone-900 tracking-tight">
                              Mata Vaishno Devi Katra Holiday Packages
                            </h3>
                            <p className="text-xs sm:text-base text-stone-700 mt-2 max-w-3xl leading-relaxed font-medium">
                              Sacred yatra packages held seamlessly under our Jammu &amp; Kashmir network. Featuring Jammu railway station / airport pickup, Katra pure vegetarian hotel stays, RFID yatra registration support, helicopter ticket booking assistance (Katra – Sanjichhat), and onward connecting travel to Srinagar &amp; Dal Lake.
                            </p>
                          </div>
                          
                          {/* Katra Support Box */}
                          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-amber-200 shadow-sm shrink-0 lg:max-w-xs space-y-2.5">
                            <div className="text-[11px] font-black uppercase tracking-wider text-amber-900 flex items-center space-x-1.5">
                              <ShieldCheck className="w-4 h-4 text-emerald-600" />
                              <span>Katra Yatra Support Included</span>
                            </div>
                            <ul className="text-xs text-stone-600 space-y-1.5">
                              <li className="flex items-center space-x-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span>RFID Slip &amp; VIP Darshan Guidance</span>
                              </li>
                              <li className="flex items-center space-x-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span>Helicopter Ticket Booking Support</span>
                              </li>
                              <li className="flex items-center space-x-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span>Direct Jammu – Katra – Srinagar Cabs</span>
                              </li>
                            </ul>
                            <div className="pt-1 border-t border-stone-100 text-[11px] text-stone-600">
                              Katra Helpdesk:{' '}
                              <a href="tel:+917006644364" className="font-bold text-amber-700 hover:underline">
                                +91 7006644364
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Katra Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {katraTours.map((tour) => (
                          <TourCard
                            key={tour.id}
                            tour={tour}
                            currentCurrency={currency}
                            isWishlisted={wishlist.includes(tour.id)}
                            onToggleWishlist={toggleWishlist}
                            onSelectTour={(t) => setActiveTourDetail(t)}
                            onBookTour={(t) => setBookingModalState({ tour: t })}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ladakh Expeditions (if any) */}
                  {ladakhTours.length > 0 && (
                    <div className="pt-12 border-t border-stone-200">
                      <div className="mb-8 p-6 rounded-2xl border border-blue-200 bg-blue-50/70 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                            🏍️ High-Altitude Mountain Expeditions
                          </span>
                          <h3 className="text-2xl font-serif-display font-bold text-stone-900 mt-2">
                            Ladakh Mountain Circuit Packages
                          </h3>
                          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                            Leh Palace • Pangong Tso Blue Waters • Nubra Valley Double Hump Camels • Khardung La (18,380 ft)
                          </p>
                        </div>
                        <span className="text-xs font-bold text-blue-900 bg-white px-3 py-1.5 rounded-lg border border-blue-200 self-start sm:self-auto">
                          {ladakhTours.length} Expeditions
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ladakhTours.map((tour) => (
                          <TourCard
                            key={tour.id}
                            tour={tour}
                            currentCurrency={currency}
                            isWishlisted={wishlist.includes(tour.id)}
                            onToggleWishlist={toggleWishlist}
                            onSelectTour={(t) => setActiveTourDetail(t)}
                            onBookTour={(t) => setBookingModalState({ tour: t })}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Scenario 2: Explicitly Selected Kashmir (Main Highlight) */}
              {selectedRegion === 'Kashmir' && (
                <div>
                  <div className="mb-8 p-6 sm:p-7 rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 via-emerald-50/70 to-amber-50 shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-600 text-white shadow-xs mb-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>THE MAIN HIGHLIGHT • SIGNATURE KASHMIR HOLIDAYS</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif-display font-black text-stone-900 tracking-tight">
                          Normal Kashmir Holiday Packages
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl font-medium">
                          Srinagar Dal Lake Houseboats • Gulmarg Gondola Apharwat • Pahalgam Lidder River • Sonmarg Glaciers • Gurez Valley
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 bg-white/90 border border-amber-300 px-4 py-2.5 rounded-xl shrink-0 self-start sm:self-auto shadow-2xs">
                        <ChinarLeafIcon className="w-4 h-4 text-amber-600" />
                        <span>{normalKashmirTours.length} Signature Packages</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {normalKashmirTours.map((tour) => (
                      <TourCard
                        key={tour.id}
                        tour={tour}
                        currentCurrency={currency}
                        isWishlisted={wishlist.includes(tour.id)}
                        onToggleWishlist={toggleWishlist}
                        onSelectTour={(t) => setActiveTourDetail(t)}
                        onBookTour={(t) => setBookingModalState({ tour: t })}
                      />
                    ))}
                  </div>

                  {/* Transition Box to Katra Packages Held Below */}
                  <div className="mt-12 p-6 rounded-2xl bg-amber-50 border-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center space-x-1.5 justify-center sm:justify-start">
                        <span>🛕 Combined Spiritual &amp; Scenic Vacation?</span>
                      </div>
                      <h4 className="text-base font-bold text-stone-900 mt-0.5">
                        Mata Vaishno Devi Katra packages are held under our Kashmir network
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 max-w-xl">
                        Seamlessly add Katra holy cave darshan with Jammu pickup, helicopter booking assist, and onward Dal Lake transfer.
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedRegion('Vaishno Devi Katra')}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 transition-colors shadow-sm shrink-0 cursor-pointer"
                    >
                      View Katra Packages Held Below &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* Scenario 3: Explicitly Selected Katra Packages */}
              {selectedRegion === 'Vaishno Devi Katra' && (
                <div>
                  <div className="mb-8 p-6 sm:p-7 rounded-2xl border-2 border-amber-400 bg-amber-50/80 shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-200 text-amber-950 mb-2">
                          <span>🛕 HELD UNDER NORMAL KASHMIR PACKAGES SECTION</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif-display font-black text-stone-900 tracking-tight">
                          Mata Vaishno Devi Katra Holiday Packages
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl font-medium">
                          Sacred Maa Vaishno Devi Bhawan Darshan • Katra Hotels • Helicopter Ticket Assist • Onward Kashmir Transit
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedRegion('Kashmir')}
                        className="text-xs font-bold text-emerald-800 bg-white border border-emerald-300 px-4 py-2 rounded-xl hover:bg-emerald-50 transition-colors shrink-0 self-start sm:self-auto cursor-pointer"
                      >
                        &larr; Switch to Normal Kashmir Packages (Main Highlight)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {katraTours.map((tour) => (
                      <TourCard
                        key={tour.id}
                        tour={tour}
                        currentCurrency={currency}
                        isWishlisted={wishlist.includes(tour.id)}
                        onToggleWishlist={toggleWishlist}
                        onSelectTour={(t) => setActiveTourDetail(t)}
                        onBookTour={(t) => setBookingModalState({ tour: t })}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Scenario 4: Explicitly Selected Ladakh Packages */}
              {selectedRegion === 'Ladakh' && (
                <div>
                  <div className="mb-8 p-6 sm:p-7 rounded-2xl border-2 border-sky-300 bg-gradient-to-r from-sky-50 via-blue-50/60 to-indigo-50/40 shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-sky-700 text-white shadow-xs mb-2">
                          <span>🏔️ LAND OF HIGH PASSES • LADAKH EXPEDITIONS</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif-display font-black text-stone-900 tracking-tight">
                          Ladakh Himalayan Circuit Packages
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl font-medium">
                          Pangong Tso Blue Waters • Nubra Valley Hunder Dunes • Khardung La Pass (18,380 ft) • Hanle Dark Sky Reserve • Tso Moriri Lake • Zanskar Valley 4x4
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 text-xs font-bold text-sky-900 bg-white/95 border border-sky-300 px-4 py-2.5 rounded-xl shrink-0 self-start sm:self-auto shadow-2xs">
                        <span>{filteredTours.length} Ladakh Packages</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTours.map((tour) => (
                      <TourCard
                        key={tour.id}
                        tour={tour}
                        currentCurrency={currency}
                        isWishlisted={wishlist.includes(tour.id)}
                        onToggleWishlist={toggleWishlist}
                        onSelectTour={(t) => setActiveTourDetail(t)}
                        onBookTour={(t) => setBookingModalState({ tour: t })}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Scenario 5: Combo Circuits */}
              {selectedRegion === 'Combo Circuits' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTours.map((tour) => (
                    <TourCard
                      key={tour.id}
                      tour={tour}
                      currentCurrency={currency}
                      isWishlisted={wishlist.includes(tour.id)}
                      onToggleWishlist={toggleWishlist}
                      onSelectTour={(t) => setActiveTourDetail(t)}
                      onBookTour={(t) => setBookingModalState({ tour: t })}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                style={{
                  backgroundColor: 'var(--theme-primary-light)',
                  color: 'var(--theme-primary)',
                }}
              >
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-stone-900">
                No matching tour packages found
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                Try adjusting your budget or clearing filters to view all available Kashmir, Ladakh and Katra itineraries.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer hover:opacity-90"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* Dedicated Section 1: Top Kashmir Destinations */}
        <TopKashmirDestinations
          onSelectDestination={(keyword) => {
            setSearchQuery(keyword);
            setSelectedRegion('All');
            scrollToSection('tours-catalog');
          }}
          onOpenPlanner={() => scrollToSection('custom-planner')}
        />

        {/* Dedicated Section 2: Best Seasons to Visit Kashmir */}
        <BestSeasonsToVisit
          onOpenPlanner={() => scrollToSection('custom-planner')}
        />

        {/* Custom Tailor-Made Itinerary Builder */}
        <CustomTripPlanner
          currentCurrency={currency}
          onNavigateToCatalog={() => scrollToSection('tours-catalog')}
        />

        {/* Why Us / Native Kashmir Advantage */}
        <WhyUs />

        {/* Reviews Section with Real Traveler Stories */}
        <ReviewsSection />

        {/* Detailed FAQ Section */}
        <FAQSection />

        {/* Quick Inquiry / Lead Section */}
        <QuickInquirySection />
      </main>

      {/* Footer */}
      <Footer 
        onNavigateTo={scrollToSection} 
        onOpenAdmin={() => setIsAdminOpen(true)}
        isLogoApproved={isLogoApproved}
        onOpenLogoReview={() => setIsLogoReviewOpen(true)}
      />

      {/* Floating Action Menu for 1-Click WhatsApp & Call */}
      <FloatingActionMenu onOpenInquiry={() => scrollToSection('contact')} />

      {/* Logo Approval & Brand Identity Modal */}
      <LogoApprovalModal
        isOpen={isLogoReviewOpen}
        onClose={() => setIsLogoReviewOpen(false)}
        isApproved={isLogoApproved}
        onApprove={() => {
          setIsLogoApproved(true);
          try {
            localStorage.setItem('tripvora_logo_approved', 'true');
          } catch {}
        }}
        onRevoke={() => {
          setIsLogoApproved(false);
          try {
            localStorage.removeItem('tripvora_logo_approved');
          } catch {}
        }}
      />

      {/* Admin Portal Modal (Passcode Protected for Hazim) */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Modal: Tour Detail View */}
      {activeTourDetail && (
        <TourDetailModal
          tour={activeTourDetail}
          currentCurrency={currency}
          isOpen={!!activeTourDetail}
          onClose={() => setActiveTourDetail(null)}
          onBookTour={(tour, departure) => {
            setActiveTourDetail(null);
            setBookingModalState({ tour, departure });
          }}
          isWishlisted={wishlist.includes(activeTourDetail.id)}
          onToggleWishlist={toggleWishlist}
        />
      )}

      {/* Modal: Booking / Quote Flow */}
      {bookingModalState && (
        <BookingModal
          tour={bookingModalState.tour}
          departure={bookingModalState.departure}
          currentCurrency={currency}
          isOpen={!!bookingModalState}
          onClose={() => setBookingModalState(null)}
        />
      )}

      {/* Wishlist Slide-Over Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedTours={wishlistedTours}
        currentCurrency={currency}
        onRemoveFromWishlist={toggleWishlist}
        onSelectTour={(t) => {
          setActiveTourDetail(t);
          setIsWishlistOpen(false);
        }}
        onBookTour={(t) => {
          setBookingModalState({ tour: t });
          setIsWishlistOpen(false);
        }}
      />

      {/* Modal: Specialist Consultation */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TripVoraContent />
    </ThemeProvider>
  );
}
