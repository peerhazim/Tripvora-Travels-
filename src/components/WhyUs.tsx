import React from 'react';
import { 
  Users, Compass, ShieldCheck, HeartHandshake, Sparkles, MapPin, 
  Phone, CheckCircle2, XCircle, Award, Car, Clock, Shield 
} from 'lucide-react';
import { ChinarLeafIcon } from './ChinarLeafIcon';

interface DifferenceSection {
  id: string;
  pillarNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  guaranteeText: string;
  colorTheme: {
    accentGradient: string;
    cardBg: string;
    border: string;
    borderHover: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    iconBoxBg: string;
    iconColor: string;
    guaranteeBg: string;
    guaranteeText: string;
    checkColor: string;
    shadowHover: string;
  };
  icon: (className?: string) => React.ReactNode;
}

const DIFFERENCE_SECTIONS: DifferenceSection[] = [
  {
    id: 'native-experts',
    pillarNumber: '01',
    badge: 'KASHMIR EMERALD',
    title: 'Native Srinagar Team & Roots',
    subtitle: 'Born & Based in the Valley',
    description: 'Unlike distant booking websites, TripVora Travels is proudly headquartered in Srinagar. We personally know every Shikara chieftain, heritage houseboat family, and experienced alpine cab pilot.',
    features: [
      'Direct contracts with Dal Lake cedar houseboats',
      'Native certified Kashmiri mountain chauffeurs',
      'Zero third-party reseller markups or middlemen',
    ],
    guaranteeText: '100% Native Local Team',
    colorTheme: {
      accentGradient: 'from-emerald-500 via-emerald-600 to-teal-600',
      cardBg: 'bg-gradient-to-b from-emerald-50/90 via-white to-teal-50/40',
      border: 'border-emerald-300',
      borderHover: 'hover:border-emerald-500',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-900',
      badgeBorder: 'border-emerald-300',
      iconBoxBg: 'bg-emerald-600 text-white shadow-emerald-500/30',
      iconColor: 'text-white',
      guaranteeBg: 'bg-emerald-100/70',
      guaranteeText: 'text-emerald-800',
      checkColor: 'text-emerald-600',
      shadowHover: 'hover:shadow-emerald-900/10',
    },
    icon: (c = 'w-6 h-6') => <MapPin className={c} />,
  },
  {
    id: 'circuit-specialists',
    pillarNumber: '02',
    badge: 'SAPPHIRE AZURE',
    title: 'Kashmir, Ladakh & Katra Masters',
    subtitle: 'High-Passes & Sacred Yatras',
    description: 'Specialized coordination across every corner of J&K: Gulmarg Gondola slot booking, high-altitude Ladakh acclimatization with onboard medical oxygen, and sacred Katra Mata Vaishno Devi yatra guidance.',
    features: [
      'Gulmarg Gondola Phase 1 & 2 ticket assist',
      'Ladakh Khardung La & Pangong oxygen setups',
      'Katra RFID slip & helicopter booking support',
    ],
    guaranteeText: 'All-Terrain J&K Specialists',
    colorTheme: {
      accentGradient: 'from-sky-500 via-blue-600 to-indigo-600',
      cardBg: 'bg-gradient-to-b from-sky-50/90 via-white to-indigo-50/40',
      border: 'border-sky-300',
      borderHover: 'hover:border-sky-500',
      badgeBg: 'bg-sky-100',
      badgeText: 'text-sky-900',
      badgeBorder: 'border-sky-300',
      iconBoxBg: 'bg-sky-600 text-white shadow-sky-500/30',
      iconColor: 'text-white',
      guaranteeBg: 'bg-sky-100/70',
      guaranteeText: 'text-sky-800',
      checkColor: 'text-sky-600',
      shadowHover: 'hover:shadow-sky-900/10',
    },
    icon: (c = 'w-6 h-6') => <Compass className={c} />,
  },
  {
    id: 'ground-support',
    pillarNumber: '03',
    badge: 'SAFFRON GOLD',
    title: '24/7 Helpline: +91 7006644364',
    subtitle: 'Direct Human Care at Every Step',
    description: 'Never speak to an automated bot. Your dedicated trip coordinator is reachable directly by phone call and WhatsApp (+91 7006644364) from arrival at Srinagar Airport through your return flight.',
    features: [
      'Instant response on Call & WhatsApp +91 7006644364',
      'Daily morning weather & mountain pass status',
      'Immediate on-road driver & hotel coordination',
    ],
    guaranteeText: '24/7 Srinagar Trip Concierge',
    colorTheme: {
      accentGradient: 'from-amber-400 via-amber-500 to-orange-500',
      cardBg: 'bg-gradient-to-b from-amber-50/90 via-white to-orange-50/40',
      border: 'border-amber-300',
      borderHover: 'hover:border-amber-500',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-950',
      badgeBorder: 'border-amber-300',
      iconBoxBg: 'bg-amber-500 text-stone-950 shadow-amber-500/30',
      iconColor: 'text-stone-950',
      guaranteeBg: 'bg-amber-100/70',
      guaranteeText: 'text-amber-900',
      checkColor: 'text-amber-700',
      shadowHover: 'hover:shadow-amber-900/10',
    },
    icon: (c = 'w-6 h-6') => <Phone className={c} />,
  },
  {
    id: 'transparent-pricing',
    pillarNumber: '04',
    badge: 'CHINAR ROSE',
    title: '100% Transparent Fair Pricing',
    subtitle: 'Zero Hidden Surcharges',
    description: 'What you see is what you pay. We guarantee dedicated private sanitized vehicles (never crammed shared cabs), verified clean rooms, breakfast & dinner, and all state toll & green taxes included.',
    features: [
      'Private dedicated sanitized cabs (Innova / Sedan)',
      'All toll taxes, parking & green taxes included',
      'Tailored flexible plans for couples, families & groups',
    ],
    guaranteeText: 'Zero Hidden Charges Guarantee',
    colorTheme: {
      accentGradient: 'from-rose-500 via-rose-600 to-pink-600',
      cardBg: 'bg-gradient-to-b from-rose-50/90 via-white to-pink-50/40',
      border: 'border-rose-300',
      borderHover: 'hover:border-rose-500',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-900',
      badgeBorder: 'border-rose-300',
      iconBoxBg: 'bg-rose-600 text-white shadow-rose-500/30',
      iconColor: 'text-white',
      guaranteeBg: 'bg-rose-100/70',
      guaranteeText: 'text-rose-800',
      checkColor: 'text-rose-600',
      shadowHover: 'hover:shadow-rose-900/10',
    },
    icon: (c = 'w-6 h-6') => <HeartHandshake className={c} />,
  },
];

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-stone-100/80 border-t border-b border-stone-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Master Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>THE TRIPVORA DIFFERENCE</span>
            <ChinarLeafIcon className="w-3.5 h-3.5 text-emerald-700" />
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-light text-stone-900 tracking-tight">
            Why Discerning Travelers Choose <br />
            <span className="font-semibold text-emerald-900">TripVora Travels</span>
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            Every section of your journey is managed directly by our native Srinagar operations team. Explore the four colorful pillars that set TripVora apart from generic online booking portals.
          </p>
        </div>

        {/* 4 Multi-Colored Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENCE_SECTIONS.map((section) => (
            <div
              key={section.id}
              className={`rounded-3xl border-2 ${section.colorTheme.border} ${section.colorTheme.borderHover} ${section.colorTheme.cardBg} p-7 shadow-sm ${section.colorTheme.shadowHover} transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden group`}
            >
              {/* Colorful Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${section.colorTheme.accentGradient}`} />

              <div>
                {/* Header with Color Badge and Pillar Index */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl ${section.colorTheme.iconBoxBg} flex items-center justify-center transition-transform group-hover:scale-105 shadow-md`}>
                    {section.icon('w-6 h-6')}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${section.colorTheme.badgeBg} ${section.colorTheme.badgeText} ${section.colorTheme.badgeBorder}`}>
                    {section.badge}
                  </span>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                  Pillar {section.pillarNumber} • {section.subtitle}
                </div>

                <h3 className="font-serif-display text-xl font-bold text-stone-900 mb-3 leading-snug">
                  {section.title}
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-5">
                  {section.description}
                </p>

                {/* Specific Feature Highlights */}
                <ul className="space-y-2 mb-6">
                  {section.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-stone-700">
                      <CheckCircle2 className={`w-4 h-4 ${section.colorTheme.checkColor} shrink-0 mt-0.5`} />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Guarantee Banner with Color Matching */}
              <div className={`pt-3.5 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider ${section.colorTheme.guaranteeText}`}>
                <span className="flex items-center space-x-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{section.guaranteeText}</span>
                </span>
                <span>✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* The TripVora Difference Comparison Matrix (TripVora vs Generic Online Portals) */}
        <div className="mt-14 bg-white rounded-3xl border-2 border-stone-200 shadow-md p-6 sm:p-10 overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Transparent Comparison</span>
            </div>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
              TripVora Native Care vs. Generic Booking Portals
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Why 2,500+ families and couples trust TripVora Travels for their Kashmir vacation.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4 font-bold">Trip Experience Factor</th>
                  <th className="py-3 px-4 font-extrabold text-emerald-800 bg-emerald-50/80 rounded-t-xl">
                    ✓ TripVora Travels (Native Srinagar DMC)
                  </th>
                  <th className="py-3 px-4 font-bold text-stone-500">
                    ✕ Generic Online Portals / Distant Agencies
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50/50">
                  <td className="py-3.5 px-4 font-bold text-stone-800">Local Ground Office</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-800 bg-emerald-50/50 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Native Srinagar/Sopore office with on-ground managers</span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-500">
                    Outsourced to 3rd-party subcontractors with no accountability
                  </td>
                </tr>

                <tr className="hover:bg-stone-50/50">
                  <td className="py-3.5 px-4 font-bold text-stone-800">Transport & Vehicles</td>
                  <td className="py-3.5 px-4 font-semibold text-sky-800 bg-emerald-50/50 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Guaranteed private sanitized cab with courteous local driver</span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-500">
                    Shared cabs or unpredictable drivers assigned at the last minute
                  </td>
                </tr>

                <tr className="hover:bg-stone-50/50">
                  <td className="py-3.5 px-4 font-bold text-stone-800">Helpline & Emergency</td>
                  <td className="py-3.5 px-4 font-semibold text-amber-900 bg-emerald-50/50 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Direct Call & WhatsApp to Srinagar coordinator: +91 7006644364</span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-500">
                    Automated chatbot ticket systems with delayed email responses
                  </td>
                </tr>

                <tr className="hover:bg-stone-50/50">
                  <td className="py-3.5 px-4 font-bold text-stone-800">Houseboat & Stay Quality</td>
                  <td className="py-3.5 px-4 font-semibold text-rose-800 bg-emerald-50/50 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Hand-inspected carved cedar houseboats on Dal & Nigeen lake</span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-500">
                    Often assign substandard off-lake houseboats with misleading photos
                  </td>
                </tr>

                <tr className="hover:bg-stone-50/50">
                  <td className="py-3.5 px-4 font-bold text-stone-800">Price Transparency</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-800 bg-emerald-50/50 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>All toll taxes, parking & green taxes included upfront</span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-500">
                    Surprise surcharges for heater charges, night drivers, and local union cabs
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* On-ground Support Impact Banner in White & Emerald */}
        <div className="mt-12 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/70 text-stone-900 rounded-3xl p-8 sm:p-10 border-2 border-emerald-300 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8">
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
                href="tel:+917006644364"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
              >
                <Phone className="w-3.5 h-3.5 animate-pulse" />
                <span>Call Helpline: +91 7006644364</span>
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

