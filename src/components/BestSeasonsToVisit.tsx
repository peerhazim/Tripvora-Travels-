import React, { useState } from 'react';
import { 
  Sparkles, Sun, CloudSnow, Thermometer, CheckCircle2, 
  ShieldCheck, Phone, ArrowRight, Calendar, Info
} from 'lucide-react';
import { ChinarLeafIcon } from './ChinarLeafIcon';

export interface SeasonItem {
  id: string;
  seasonName: string;
  kashmiriName: string;
  period: string;
  tempRange: string;
  themeColor: {
    badge: string;
    border: string;
    gradient: string;
    iconColor: string;
    lightBg: string;
  };
  headline: string;
  sceneryDescription: string;
  keyHighlights: string[];
  whatToPack: string[];
  idealFor: string;
  icon: (className?: string) => React.ReactNode;
}

export const KASHMIR_SEASONS: SeasonItem[] = [
  {
    id: 'spring',
    seasonName: 'Spring (The Blossom Awakening)',
    kashmiriName: 'بہار (Bahaar)',
    period: 'March to May',
    tempRange: '10°C to 22°C (Pleasant days, crisp mountain evenings)',
    themeColor: {
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      border: 'border-emerald-400',
      gradient: 'from-emerald-500 via-emerald-600 to-teal-600',
      iconColor: 'text-emerald-600',
      lightBg: 'bg-emerald-50/80',
    },
    headline: 'Asia’s Largest Tulip Bloom, Almond Blossoms & Awakening Valleys',
    sceneryDescription: 'Spring transforms Kashmir into an opulent carpet of colors. The snows melt into roaring streams, millions of tulips bloom at the foothills of the Zabarwan mountains, and apple and almond orchards drape the valleys in fragrant white and pink petals.',
    keyHighlights: [
      'Indira Gandhi Memorial Tulip Garden (1.5+ million blooming tulips in April)',
      'Badamwari (Almond Blossom Garden) in Srinagar’s historic quarters',
      'Lush yellow mustard flower fields stretching across Anantnag and Pulwama',
      'Pleasant sightseeing without extreme cold or heavy monsoon rains',
      'Tranquil Shikara cruises on Dal Lake framed by snow-dusted ridges',
    ],
    whatToPack: [
      'Light woolens, cardigans & fleece jackets for mornings and evenings',
      'Comfortable walking shoes for exploring the terraced gardens',
      'Sunscreen & sunglasses for crisp alpine mountain sunlight',
      'Camera with extra memory cards for endless blossom photography',
    ],
    idealFor: 'Honeymooners, garden lovers, romantic couples, and nature photographers.',
    icon: (c = 'w-6 h-6') => <Sparkles className={c} />,
  },
  {
    id: 'summer',
    seasonName: 'Summer (The Emerald Green Escape)',
    kashmiriName: 'گریشم (Grisham)',
    period: 'June to August',
    tempRange: '15°C to 30°C (Warm sunny days, cool mountain nights)',
    themeColor: {
      badge: 'bg-sky-100 text-sky-900 border-sky-300',
      border: 'border-sky-400',
      gradient: 'from-sky-500 via-blue-600 to-indigo-600',
      iconColor: 'text-sky-600',
      lightBg: 'bg-sky-50/80',
    },
    headline: 'Cool Pine Breezes, High-Altitude Treks & River Adventures',
    sceneryDescription: 'When the plains of India swelter in scorching heat, Kashmir is a lush, breezy sanctuary. Verdant meadows, clear blue skies, gushing rivers for whitewater rafting, and open high mountain passes make summer the premier season for family holidays.',
    keyHighlights: [
      'Escape plains’ heat into refreshing 18°C–25°C mountain temperatures',
      'Whitewater river rafting in Pahalgam (Lidder) and Sonamarg (Sindh)',
      'Gulmarg Gondola rides to Apharwat Peak with summer snow patches',
      'High-altitude Himalayan trekking (Kashmir Great Lakes, Tarsar Marsar)',
      'Cool evening Shikara rides and open-deck houseboat dinners on Dal Lake',
    ],
    whatToPack: [
      'Breathable cotton shirts and pants for daytime tours',
      'One light jacket or woolen stole for high-altitude Gulmarg/Sonamarg',
      'Sturdy hiking sneakers or trekking shoes',
      'Umbrella or light raincoat for occasional brief mountain showers',
    ],
    idealFor: 'Families with children, summer school vacations, and adventure enthusiasts.',
    icon: (c = 'w-6 h-6') => <Sun className={c} />,
  },
  {
    id: 'autumn',
    seasonName: 'Autumn (The Golden Chinar Symphony)',
    kashmiriName: 'ہارُد (Harud)',
    period: 'September to November',
    tempRange: '6°C to 20°C (Crisp morning air, cool golden afternoons)',
    themeColor: {
      badge: 'bg-amber-100 text-amber-950 border-amber-300',
      border: 'border-amber-400',
      gradient: 'from-amber-500 via-orange-500 to-rose-600',
      iconColor: 'text-amber-600',
      lightBg: 'bg-amber-50/80',
    },
    headline: 'Flaming Ruby Chinars, Saffron Harvest & Crisp Mountain Skies',
    sceneryDescription: 'Known locally as "Harud", autumn is an ethereal poetic season. The iconic royal Chinar trees turn from green into fiery amber, gold, and ruby red. The air is remarkably crisp, saffron flowers blanket the fields of Pampore, and trees are laden with crisp Kashmiri apples.',
    keyHighlights: [
      'Naseem Bagh & Shalimar Bagh carpeted in golden and crimson Chinar leaves',
      'Saffron (Zafran) flower harvesting in Pampore during late October & November',
      'Fresh crisp Kashmiri apple, walnut, and almond orchards in full harvest',
      'Crystal-clear panoramic views of the Pir Panjal with zero summer haze',
      'Sipping hot saffron Kashmiri Kehwa amidst glowing autumn foliage',
    ],
    whatToPack: [
      'Medium woolens, sweaters, thermal base layer for late October/November',
      'Windproof jacket for mountain pass journeys',
      'Comfortable boots for strolling through leaves in Mughal gardens',
      'Lip balm and moisturizer for crisp mountain autumn air',
    ],
    idealFor: 'Photographers, peaceful holidaymakers, honeymooners, and cultural travelers.',
    icon: (c = 'w-6 h-6') => <ChinarLeafIcon className={c} fill="currentColor" />,
  },
  {
    id: 'winter',
    seasonName: 'Winter (The White Snow Wonderland)',
    kashmiriName: 'واندہ (Vandah / Chillai Kalan)',
    period: 'December to February',
    tempRange: '-4°C to 8°C (Sub-zero snow climate)',
    themeColor: {
      badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      border: 'border-indigo-400',
      gradient: 'from-blue-600 via-indigo-600 to-violet-700',
      iconColor: 'text-indigo-600',
      lightBg: 'bg-indigo-50/80',
    },
    headline: 'Deep Powder Snow, Gulmarg Skiing & Cozy Kangri Firesides',
    sceneryDescription: 'Kashmir transforms into an authentic fairy-tale snow kingdom. Gulmarg becomes Asia’s top powder skiing destination, snow caps the cedar wood houseboats, pine trees bend under heavy white blankets, and locals gather around warming traditional Kangri charcoal firepots.',
    keyHighlights: [
      'Gulmarg Gondola snow wonderland with world-class skiing & snowboarding',
      'Snowmobile rides, sledge sliding, and snow tube adventures in Apharwat',
      'Partially frozen edges of Dal Lake with misty morning landscapes',
      'Warm heated heritage houseboats with Bukhari wood heaters and electric blankets',
      'Traditional Kashmiri Harissa breakfast and steaming saffron Kehwa',
    ],
    whatToPack: [
      'Heavy woolens, thermals (top & bottom), padded down jackets',
      'Waterproof snow boots with good tread or rent boots in Tangmarg/Gulmarg',
      'Waterproof snow gloves, woolen beanies, and warm mufflers',
      'Thermal socks (multiple pairs) and thermal flasks for hot water',
    ],
    idealFor: 'Snow enthusiasts, winter honeymooners, skiers, and first-time snow seekers.',
    icon: (c = 'w-6 h-6') => <CloudSnow className={c} />,
  },
];

const MONTHLY_MATRIX = [
  { month: 'January', temp: '-2°C to 5°C', weather: 'Heavy Snowfall', bestPlace: 'Gulmarg & Apharwat', attire: 'Heavy Woolens & Thermals', badge: 'Winter Wonderland' },
  { month: 'February', temp: '0°C to 8°C', weather: 'Snow Sports Peak', bestPlace: 'Gulmarg Ski Resort', attire: 'Snow Boots & Parka', badge: 'Skiing & Snow' },
  { month: 'March', temp: '5°C to 15°C', weather: 'Melting Snow & Kehwa', bestPlace: 'Srinagar & Badamwari', attire: 'Medium Woolens', badge: 'Spring Awakening' },
  { month: 'April', temp: '10°C to 20°C', weather: 'Tulip Bloom & Sunshine', bestPlace: 'Indira Gandhi Tulip Garden', attire: 'Light Woolens', badge: 'Tulip Festival' },
  { month: 'May', temp: '14°C to 25°C', weather: 'Pleasant & Flowery', bestPlace: 'Pahalgam & Betaab Valley', attire: 'Light Cottons / Cardigan', badge: 'Valley Blossoms' },
  { month: 'June', temp: '16°C to 28°C', weather: 'Warm & Green Meadows', bestPlace: 'Sonamarg & Gurez Valley', attire: 'Cottons & Sunglasses', badge: 'Summer Escape' },
  { month: 'July', temp: '18°C to 30°C', weather: 'Sunny Mountain Days', bestPlace: 'Doodhpathri & Great Lakes', attire: 'Breathable Cottons', badge: 'Family Vacations' },
  { month: 'August', temp: '17°C to 28°C', weather: 'Lush Pine Valleys', bestPlace: 'Lidder River Pahalgam', attire: 'Light Cottons & Umbrella', badge: 'Rafting Season' },
  { month: 'September', temp: '12°C to 24°C', weather: 'Crisp Skies & Apples', bestPlace: 'Naseem Bagh & Orchards', attire: 'Light Jacket for Eve', badge: 'Harvest Season' },
  { month: 'October', temp: '6°C to 18°C', weather: 'Golden Chinar & Saffron', bestPlace: 'Pampore & Mughal Gardens', attire: 'Sweaters & Woolens', badge: 'Golden Autumn' },
  { month: 'November', temp: '2°C to 12°C', weather: 'Crisp Early Frost', bestPlace: 'Dal Lake & Houseboats', attire: 'Warm Jackets & Thermals', badge: 'Ruby Chinar' },
  { month: 'December', temp: '-2°C to 8°C', weather: 'First Snowfall of Season', bestPlace: 'Gulmarg & Pahalgam Snow', attire: 'Down Jackets & Gloves', badge: 'Winter Onset' },
];

interface BestSeasonsToVisitProps {
  onOpenPlanner?: () => void;
}

export const BestSeasonsToVisit: React.FC<BestSeasonsToVisitProps> = ({
  onOpenPlanner,
}) => {
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>('spring');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const activeSeason = KASHMIR_SEASONS.find(s => s.id === selectedSeasonId) || KASHMIR_SEASONS[0];

  return (
    <section id="kashmir-seasons" className="py-24 bg-stone-100/80 border-t border-b border-stone-200/90 relative overflow-hidden">
      
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl pointer-events-none -mr-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-950 text-xs font-black uppercase tracking-widest mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>4-SEASON TRAVEL GUIDE • CLIMATE &amp; EXPERIENCES</span>
            <ChinarLeafIcon className="w-3.5 h-3.5 text-amber-700" />
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Best Seasons to Visit Kashmir
          </h2>

          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Every season in Kashmir tells an unforgettable story: springtime tulip blossoms, lush summer river escapes, golden autumn Chinar symphonies, and powdery winter snowscapes.
          </p>
        </div>

        {/* 4 Season Selector Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {KASHMIR_SEASONS.map((season) => {
            const isSelected = season.id === selectedSeasonId;
            return (
              <button
                key={season.id}
                onClick={() => setSelectedSeasonId(season.id)}
                className={`p-4 sm:p-5 rounded-3xl text-left border-2 transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? `bg-white ${season.themeColor.border} shadow-lg ring-4 ring-emerald-500/10 scale-[1.02]`
                    : 'bg-white/80 border-stone-200 hover:border-stone-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-2xl ${season.themeColor.lightBg}`}>
                    {season.icon(`w-5 h-5 ${season.themeColor.iconColor}`)}
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${season.themeColor.badge}`}>
                    {season.period}
                  </span>
                </div>

                <div className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider mb-0.5">
                  {season.kashmiriName}
                </div>
                <div className="font-serif-display font-extrabold text-stone-900 text-base sm:text-lg leading-tight">
                  {season.seasonName.split('(')[0]}
                </div>
                <div className="text-xs text-stone-500 font-medium mt-1">
                  {season.tempRange.split('(')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Season Deep-Dive Card */}
        <div className={`bg-white rounded-3xl border-2 ${activeSeason.themeColor.border} shadow-xl p-6 sm:p-10 relative overflow-hidden mb-12`}>
          <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${activeSeason.themeColor.gradient}`} />

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${activeSeason.themeColor.badge}`}>
                  {activeSeason.period}
                </span>
                <span className="text-xs font-bold text-stone-600 flex items-center space-x-1">
                  <Thermometer className="w-3.5 h-3.5 text-stone-600" />
                  <span>{activeSeason.tempRange}</span>
                </span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                {activeSeason.seasonName}
              </h3>

              <p className="text-sm sm:text-base font-semibold text-emerald-900">
                {activeSeason.headline}
              </p>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
                {activeSeason.sceneryDescription}
              </p>
            </div>

            {/* Ideal For Box */}
            <div className={`p-5 rounded-2xl ${activeSeason.themeColor.lightBg} border ${activeSeason.themeColor.border} max-w-sm shrink-0 space-y-2`}>
              <div className="text-xs font-black uppercase tracking-wider text-stone-800 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Best Suited For</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                {activeSeason.idealFor}
              </p>
              <div className="pt-2 border-t border-stone-200/70 text-[11px] text-stone-600">
                Plan custom dates with native coordinators at{' '}
                <a href="tel:7006644364" className="font-bold text-emerald-800 underline">
                  7006644364
                </a>
              </div>
            </div>
          </div>

          {/* Two Column Breakdown: Key Experiences & What to Pack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-200">
            {/* Experiences */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-stone-900 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Seasonal Highlights &amp; Must-Do Experiences</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {activeSeason.keyHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Pack */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-stone-900 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>What to Pack &amp; Clothing Essentials</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {activeSeason.whatToPack.map((wp, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                    <span>{wp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Strip */}
          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-600 text-center sm:text-left">
              Planning to visit in <strong>{activeSeason.seasonName.split('(')[0]}</strong>? We arrange seasonal private vehicles, heated houseboats, and hotel vouchers in advance.
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <a
                href="https://wa.me/917006644364?text=Hi%20TripVora%20Travels,%20I%20am%20planning%20to%20visit%20Kashmir%20during%20the%20season%20of%20"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>WhatsApp Helpline</span>
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('tours-catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Browse Season Tours</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 12-Month Month-by-Month Weather & Activity Matrix */}
        <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-md p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Year-Round Planning Guide</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
                12-Month Kashmir Weather &amp; Activity Matrix
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Month-by-month temperature, weather conditions, top places to visit, and recommended clothing.
              </p>
            </div>

            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
            >
              {showCalendar ? 'Collapse Matrix' : 'View All 12 Months'}
            </button>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all ${
            showCalendar ? 'block' : 'grid'
          }`}>
            {(showCalendar ? MONTHLY_MATRIX : MONTHLY_MATRIX.slice(0, 6)).map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif-display font-extrabold text-base text-stone-900">{m.month}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                      {m.badge}
                    </span>
                  </div>
                  <div className="text-xs text-stone-600 space-y-1">
                    <div className="flex items-center space-x-1.5 text-stone-800 font-semibold">
                      <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                      <span>{m.temp} • {m.weather}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 font-medium">Top Destination:</span>{' '}
                      <strong className="text-emerald-900">{m.bestPlace}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 font-medium">Clothing:</span> {m.attire}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!showCalendar && (
            <div className="text-center pt-2">
              <button
                onClick={() => setShowCalendar(true)}
                className="text-xs font-bold text-emerald-800 hover:underline inline-flex items-center space-x-1 cursor-pointer"
              >
                <span>Show remaining 6 months (July to December)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Bottom Chat Assistant CTA */}
          <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-700">
              <strong>Need personal dates consultation?</strong> Tell our native trip planners when you want to travel, and we will advise the best itinerary, pass conditions, and clothing.
            </div>
            <a
              href="https://wa.me/917006644364?text=Hi%20TripVora%20Travels,%20can%20you%20advise%20the%20best%20season%20and%20itinerary%20for%20my%20Kashmir%20trip?"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm shrink-0"
            >
              Chat on WhatsApp (7006644364)
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
