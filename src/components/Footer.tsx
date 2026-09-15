import React, { useState } from 'react';
import { Compass, Mail, Phone, MapPin, Send, Check, ShieldCheck, Award, MessageSquare, Lock } from 'lucide-react';

interface FooterProps {
  onNavigateTo: (sectionId: string) => void;
  onSelectRegion: (region: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTo, onSelectRegion, onOpenAdmin }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-stone-50 text-stone-700 pt-16 pb-12 border-t border-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-200">
          {/* Brand & Manifesto (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-600/30">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="block font-serif-display text-2xl tracking-wider uppercase font-bold text-emerald-950">
                  TRIPVORA <span className="text-emerald-600 font-normal">TRAVELS</span>
                </span>
                <span className="block text-[10px] tracking-[0.2em] text-emerald-800 font-semibold uppercase -mt-1">
                  Kashmir • Ladakh • Vaishno Devi Katra
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm">
              TripVora Travels is a premier Kashmir-based travel company headquartered in Srinagar. We specialize in handcrafted holiday packages, luxury Dal Lake heritage houseboats, adventurous Ladakh pass expeditions, and sacred Mata Vaishno Devi Katra pilgrimages.
            </p>

            {/* Direct Helpline Banner */}
            <div className="p-3.5 bg-white rounded-xl border border-emerald-200 flex items-center justify-between max-w-sm shadow-sm">
              <div>
                <span className="text-[11px] text-stone-500 font-medium block">Direct Kashmir Helpline</span>
                <a
                  href="tel:7006644364"
                  className="text-base font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span>7006644364</span>
                </a>
              </div>
              <a
                href="https://wa.me/917006644364?text=Hi%20TripVora%20Travels,%20I%20am%20interested%20in%20a%20tour%20package"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://instagram.com/tripvoratravels"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-xs"
              >
                <span>Instagram</span>
              </a>
            </div>

            {/* Accreditations Badges */}
            <div className="pt-1 flex flex-wrap gap-2.5 text-[11px] text-stone-700 font-medium">
              <div className="flex items-center space-x-1 bg-white px-2.5 py-1.5 rounded-lg border border-emerald-100 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>J&amp;K Tourism Compliant</span>
              </div>
              <div className="flex items-center space-x-1 bg-white px-2.5 py-1.5 rounded-lg border border-emerald-100 shadow-xs">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>Native Kashmir Team</span>
              </div>
              <div className="flex items-center space-x-1 bg-white px-2.5 py-1.5 rounded-lg border border-emerald-100 shadow-xs">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sanitized Private Cabs</span>
              </div>
            </div>
          </div>

          {/* Featured Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-950">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button
                  onClick={() => {
                    onSelectRegion('Kashmir');
                    onNavigateTo('tours-catalog');
                  }}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Kashmir Valley (Srinagar, Gulmarg, Pahalgam)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectRegion('Ladakh');
                    onNavigateTo('tours-catalog');
                  }}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Ladakh &amp; Pangong Tso Lake
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectRegion('Vaishno Devi Katra');
                    onNavigateTo('tours-catalog');
                  }}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Mata Vaishno Devi Katra &amp; Shivkhori
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectRegion('Combo Circuits');
                    onNavigateTo('tours-catalog');
                  }}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Srinagar to Leh Overland Circuit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('custom-planner')}
                  className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                >
                  Custom Trip Planner →
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('contact')}
                  className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                >
                  Inquiry &amp; Free Quote Form →
                </button>
              </li>
            </ul>
          </div>

          {/* Single Local Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-950">
              Office
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Office:</strong> Srinagar, Sopore, Jammu and Kashmir</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Email:</strong> peerhazim98@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Helpline:</strong> <a href="tel:7006644364" className="text-emerald-700 font-bold hover:underline">7006644364</a></span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Seasonal Offers (1 col) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-950">
              Seasonal Offers
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Subscribe to receive exclusive seasonal discounts for Kashmir snow seasons, Ladakh summer departures, and Navratri Katra yatras.
            </p>

            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg pl-3 pr-9 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1 text-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center space-x-1 text-xs text-emerald-700 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Thank you! We will email you our best holiday offers.</span>
                </div>
              )}
            </form>

            <div className="pt-2">
              <button
                onClick={() => onOpenAdmin && onOpenAdmin()}
                className="text-[11px] text-stone-500 hover:text-emerald-700 flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>TripVora Admin Login (Hazim)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} TripVora Travels. Kashmir Based Tour Operator (Regd. J&amp;K Tourism). All queries routed to peerhazim98@gmail.com &amp; 7006644364.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button onClick={() => onNavigateTo('contact')} className="hover:text-emerald-700 font-medium cursor-pointer">
              Direct Contact
            </button>
            <button onClick={() => onOpenAdmin && onOpenAdmin()} className="hover:text-emerald-700 font-medium cursor-pointer">
              Admin Portal
            </button>
            <a href="tel:7006644364" className="text-emerald-700 font-bold hover:underline">
              Call: 7006644364
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
