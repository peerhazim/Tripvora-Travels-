import React, { useState, useEffect } from 'react';
import { 
  Heart, Menu, X, ChevronDown, Calendar, ShieldCheck, Globe, 
  Phone, MessageSquare, Lock, Mail, Sparkles 
} from 'lucide-react';
import { Currency } from '../types';
import { CURRENCY_CONFIGS } from '../data/tours';
import { ChinarLeafIcon } from './ChinarLeafIcon';
import { TripVoraLogo } from './TripVoraLogo';
import { KashmirThemeSelector } from './KashmirThemeSelector';
import { useKashmirTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenPlanner: () => void;
  onOpenAdmin: () => void;
  onNavigateTo: (sectionId: string) => void;
  isLogoApproved?: boolean;
  onOpenLogoReview?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  wishlistCount,
  onOpenWishlist,
  onOpenPlanner,
  onOpenAdmin,
  onNavigateTo,
  isLogoApproved = false,
  onOpenLogoReview,
}) => {
  const { themeConfig, theme, setTheme, allThemes } = useKashmirTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigateTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md text-stone-900'
          : 'bg-white/95 backdrop-blur-sm text-stone-900 shadow-xs'
      }`}
      style={{ borderBottom: `1px solid var(--theme-primary-border)` }}
    >
      {/* Top Direct Contact Bar */}
      <div 
        className="hidden sm:block text-[11px] py-1 border-b"
        style={{ 
          backgroundColor: 'var(--theme-primary-dark)', 
          color: '#ffffff',
          borderColor: 'rgba(255, 255, 255, 0.15)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1 font-medium text-stone-200">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Srinagar HQ, Sopore, Kashmir • Native Tour Operator (Govt. Regd.)</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="tel:+917006644364" 
              className="flex items-center space-x-1 font-bold text-amber-300 hover:text-white transition-colors"
              title="Call TripVora Travels Contact Number"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Contact: +91 7006644364</span>
            </a>
            <span className="text-white/40">|</span>
            <a 
              href="https://wa.me/917006644364?text=Hi%20TripVora%20Travels,%20I%20am%20interested%20in%20a%20tour%20package"
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-1 font-bold text-emerald-300 hover:text-white transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp: +91 7006644364</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Kashmir Theme Emblem */}
          <div className="flex items-center space-x-2">
            <button
              id="nav-brand-logo-btn"
              onClick={() => handleNavClick('hero')}
              className="flex items-center space-x-2.5 text-left group focus:outline-none cursor-pointer"
            >
              {isLogoApproved ? (
                <TripVoraLogo size="md" highlighted={true} />
              ) : (
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, var(--theme-primary), var(--theme-primary-dark))`
                  }}
                >
                  <ChinarLeafIcon className="w-5 h-5 text-white drop-shadow-xs" />
                </div>
              )}
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="block font-serif-display text-xl sm:text-2xl tracking-wider uppercase font-bold text-stone-900">
                    TRIPVORA <span className="font-normal" style={{ color: 'var(--theme-primary)' }}>TRAVELS</span>
                  </span>
                  {isLogoApproved && (
                    <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      ★ ORIGINAL
                    </span>
                  )}
                </div>
                <span 
                  className="block text-[9px] sm:text-[10px] tracking-[0.2em] font-semibold uppercase -mt-1"
                  style={{ color: 'var(--theme-primary-dark)' }}
                >
                  Kashmir • Ladakh • Vaishno Devi
                </span>
              </div>
            </button>

            {onOpenLogoReview && (
              <button
                onClick={onOpenLogoReview}
                className={`hidden md:inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                  isLogoApproved
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-400 shadow-xs'
                }`}
                title="Preview and Inspect New Logo Concept"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{isLogoApproved ? "Logo Active" : "Review New Logo"}</span>
              </button>
            )}
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium tracking-wide">
            <button
              id="nav-link-journeys"
              onClick={() => handleNavClick('tours-catalog')}
              className="px-3 py-1.5 rounded-full font-bold text-xs tracking-wide transition-all focus:outline-none cursor-pointer flex items-center space-x-1.5 shadow-2xs border"
              style={{
                backgroundColor: 'var(--theme-primary-light)',
                color: 'var(--theme-primary-dark)',
                borderColor: 'var(--theme-primary-border)',
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--theme-accent)' }} />
              <span>Kashmir, Ladakh &amp; Katra Packages</span>
            </button>
            <button
              id="nav-link-destinations"
              onClick={() => handleNavClick('kashmir-destinations')}
              className="text-stone-700 hover:text-stone-900 transition-colors focus:outline-none cursor-pointer font-medium hover:underline decoration-2 flex items-center space-x-1"
              style={{ textUnderlineOffset: '6px', textDecorationColor: 'var(--theme-primary)' }}
            >
              <span>Top Destinations</span>
            </button>
            <button
              id="nav-link-seasons"
              onClick={() => handleNavClick('kashmir-seasons')}
              className="text-stone-700 hover:text-stone-900 transition-colors focus:outline-none cursor-pointer font-medium hover:underline decoration-2 flex items-center space-x-1"
              style={{ textUnderlineOffset: '6px', textDecorationColor: 'var(--theme-primary)' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Best Seasons</span>
            </button>
            <button
              id="nav-link-planner"
              onClick={() => handleNavClick('custom-planner')}
              className="text-stone-700 hover:text-stone-900 transition-colors focus:outline-none cursor-pointer font-medium hover:underline decoration-2"
              style={{ textUnderlineOffset: '6px', textDecorationColor: 'var(--theme-primary)' }}
            >
              Custom Planner
            </button>
            <button
              id="nav-link-philosophy"
              onClick={() => handleNavClick('why-us')}
              className="text-stone-700 hover:text-stone-900 transition-colors focus:outline-none cursor-pointer font-medium hover:underline decoration-2"
              style={{ textUnderlineOffset: '6px', textDecorationColor: 'var(--theme-primary)' }}
            >
              Why TripVora
            </button>
            <button
              id="nav-link-reviews"
              onClick={() => handleNavClick('reviews')}
              className="text-stone-700 hover:text-stone-900 transition-colors focus:outline-none cursor-pointer font-medium hover:underline decoration-2"
              style={{ textUnderlineOffset: '6px', textDecorationColor: 'var(--theme-primary)' }}
            >
              Reviews
            </button>
            <button
              id="nav-link-faqs"
              onClick={() => handleNavClick('faqs')}
              className="text-stone-700 hover:text-stone-900 transition-colors focus:outline-none cursor-pointer font-medium hover:underline decoration-2"
              style={{ textUnderlineOffset: '6px', textDecorationColor: 'var(--theme-primary)' }}
            >
              Yatra FAQs
            </button>
            <button
              id="nav-link-contact"
              onClick={() => handleNavClick('contact')}
              className="font-bold cursor-pointer transition-colors focus:outline-none"
              style={{ color: 'var(--theme-primary)' }}
            >
              Contact &amp; Quotes
            </button>
          </nav>

          {/* Right Action Utilities & Contact Helpline */}
          <div className="hidden md:flex items-center space-x-2.5">
            {/* Kashmir Theme Selector Dropdown */}
            <KashmirThemeSelector />

            {/* Direct Phone Helpline */}
            <a
              id="nav-phone-call-btn"
              href="tel:+917006644364"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all text-xs font-bold shadow-xs cursor-pointer"
              style={{
                backgroundColor: 'var(--theme-primary-light)',
                border: '1px solid var(--theme-primary-border)',
                color: 'var(--theme-primary-dark)',
              }}
              title="Call TripVora Travels Kashmir Helpline: +91 7006644364"
            >
              <Phone className="w-3.5 h-3.5 animate-pulse" style={{ color: 'var(--theme-primary)' }} />
              <span>+91 7006644364</span>
            </a>

            {/* Currency Selector */}
            <div className="relative">
              <button
                id="currency-selector-btn"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold tracking-wider transition-colors border border-stone-200 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-stone-600" />
                <span>{currentCurrency} ({CURRENCY_CONFIGS[currentCurrency].symbol})</span>
                <ChevronDown className="w-3 h-3 text-stone-500" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-stone-200 rounded-lg shadow-xl py-1 z-50 text-xs">
                  {(Object.keys(CURRENCY_CONFIGS) as Currency[]).map((c) => (
                    <button
                      key={c}
                      id={`currency-opt-${c}`}
                      onClick={() => {
                        onCurrencyChange(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-stone-100 transition-colors cursor-pointer"
                      style={currentCurrency === c ? { color: 'var(--theme-primary)', fontWeight: 'bold' } : { color: '#44403c' }}
                    >
                      <span>{c}</span>
                      <span className="text-stone-500">{CURRENCY_CONFIGS[c].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              id="nav-wishlist-btn"
              onClick={onOpenWishlist}
              className="relative p-2 rounded-md hover:bg-stone-100 transition-colors text-stone-600 hover:text-stone-900 focus:outline-none cursor-pointer"
              title="Saved Packages"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: 'var(--theme-primary)' }}
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Admin Login Button */}
            <button
              id="nav-admin-btn"
              onClick={onOpenAdmin}
              className="p-2 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Admin Portal (Hazim)"
            >
              <Lock className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden xl:inline text-[11px] font-semibold">Admin</span>
            </button>

            {/* Custom Trip CTA */}
            <button
              id="nav-plan-trip-cta"
              onClick={onOpenPlanner}
              className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white rounded-md shadow-sm transition-all cursor-pointer hover:opacity-95"
              style={{
                backgroundColor: 'var(--theme-primary)'
              }}
            >
              Plan Trip
            </button>
          </div>

          {/* Mobile Menu & Wishlist Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <KashmirThemeSelector compact />
            
            <a
              href="tel:+917006644364"
              className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: 'var(--theme-primary-light)',
                color: 'var(--theme-primary-dark)',
                border: '1px solid var(--theme-primary-border)',
              }}
              title="Call +91 7006644364"
            >
              <Phone className="w-3 h-3" style={{ color: 'var(--theme-primary)' }} />
              <span>+91 7006644364</span>
            </a>
            <button
              id="mobile-admin-btn"
              onClick={onOpenAdmin}
              className="p-1.5 rounded-md hover:bg-stone-100 text-stone-600"
              title="Admin"
            >
              <Lock className="w-4 h-4" />
            </button>
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-stone-700 hover:bg-stone-100 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-stone-200 pb-4 space-y-2.5 bg-white">
            <div 
              className="p-3 rounded-xl flex items-center justify-between"
              style={{
                backgroundColor: 'var(--theme-primary-light)',
                border: '1px solid var(--theme-primary-border)',
              }}
            >
              <div>
                <div className="text-xs text-stone-600">Direct Kashmir Support</div>
                <div 
                  className="text-sm font-bold flex items-center space-x-1.5"
                  style={{ color: 'var(--theme-primary-dark)' }}
                >
                  <Phone className="w-3.5 h-3.5" style={{ color: 'var(--theme-primary)' }} />
                  <a href="tel:+917006644364">+91 7006644364</a>
                </div>
              </div>
              <a
                href="https://wa.me/917006644364?text=Hi%20TripVora%20Travels,%20I%20am%20interested%20in%20a%20tour%20package"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-white rounded-lg text-xs font-semibold shadow-xs"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              >
                WhatsApp Us
              </a>
            </div>

            {/* Mobile Kashmir Theme Atmosphere Row */}
            <div className="px-3 py-2 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-[11px] font-bold text-stone-700 mb-1.5 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Kashmir Atmosphere Theme:</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {allThemes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`px-2 py-1.5 rounded-lg text-left text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
                      theme === t.id
                        ? 'border-stone-900 bg-white shadow-xs text-stone-900 font-bold'
                        : 'border-stone-200 bg-stone-100/70 text-stone-600'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span className="truncate">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleNavClick('tours-catalog')}
              className="w-full text-left py-2.5 px-3.5 rounded-xl font-bold border flex items-center justify-between shadow-2xs"
              style={{
                backgroundColor: 'var(--theme-primary-light)',
                color: 'var(--theme-primary-dark)',
                borderColor: 'var(--theme-primary-border)',
              }}
            >
              <span>Kashmir, Ladakh &amp; Katra Packages</span>
              <span 
                className="text-[10px] uppercase px-2 py-0.5 rounded-full text-white font-black"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              >
                ★ Featured
              </span>
            </button>
            <button
              onClick={() => handleNavClick('kashmir-destinations')}
              className="block w-full text-left py-2 px-3 rounded text-stone-800 hover:bg-stone-100 font-semibold flex items-center space-x-2"
            >
              <span>🏔️</span>
              <span>Top Kashmir Destinations</span>
            </button>
            <button
              onClick={() => handleNavClick('kashmir-seasons')}
              className="block w-full text-left py-2 px-3 rounded text-stone-800 hover:bg-stone-100 font-semibold flex items-center space-x-2"
            >
              <span>🌸</span>
              <span>Best Seasons to Visit</span>
            </button>
            <button
              onClick={() => handleNavClick('custom-planner')}
              className="block w-full text-left py-2 px-3 rounded text-stone-700 hover:bg-stone-100 font-medium"
            >
              Bespoke Trip Planner
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="block w-full text-left py-2 px-3 rounded font-bold hover:bg-stone-100"
              style={{ color: 'var(--theme-primary)' }}
            >
              Request Quick Quote / Inquiry Form
            </button>
            <button
              onClick={() => handleNavClick('why-us')}
              className="block w-full text-left py-2 px-3 rounded text-stone-700 hover:bg-stone-100 font-medium"
            >
              Why TripVora Travels
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="block w-full text-left py-2 px-3 rounded text-stone-700 hover:bg-stone-100 font-medium"
            >
              Traveler Reviews &amp; Testimonials
            </button>
            <button
              onClick={() => handleNavClick('faqs')}
              className="block w-full text-left py-2 px-3 rounded text-stone-700 hover:bg-stone-100 font-medium"
            >
              Travel Guide &amp; Yatra FAQs
            </button>

            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded text-stone-700 hover:bg-stone-100 flex items-center space-x-2"
            >
              <Lock className="w-3.5 h-3.5" style={{ color: 'var(--theme-primary)' }} />
              <span>Admin Portal (Hazim)</span>
            </button>

            <div className="pt-2 border-t border-stone-200 flex items-center justify-between px-3">
              <span className="text-xs text-stone-600">Currency:</span>
              <div className="flex space-x-1">
                {(Object.keys(CURRENCY_CONFIGS) as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => onCurrencyChange(c)}
                    className={`px-2 py-1 rounded text-xs ${
                      currentCurrency === c ? 'text-white font-bold' : 'bg-stone-100 text-stone-700'
                    }`}
                    style={currentCurrency === c ? { backgroundColor: 'var(--theme-primary)' } : {}}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onOpenPlanner();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white rounded-md shadow-xs cursor-pointer"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            >
              Customize Your Holiday Package
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
