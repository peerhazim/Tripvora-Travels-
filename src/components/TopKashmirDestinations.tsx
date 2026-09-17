import React, { useState } from 'react';
import { 
  Mountain, MapPin, CheckCircle2, ArrowRight, Info, Compass, 
  Sparkles, Phone, Eye, ExternalLink
} from 'lucide-react';
import { ChinarLeafIcon } from './ChinarLeafIcon';

export interface DestinationItem {
  id: string;
  name: string;
  kashmiriName: string;
  badge: string;
  category: 'lakes' | 'meadows' | 'rivers' | 'offbeat';
  elevation: string;
  distanceFromSrinagar: string;
  idealDuration: string;
  bestMonths: string;
  image: string;
  fallbackImage: string;
  description: string;
  topHighlights: string[];
  insiderTip: string;
  filterKeyword: string;
}

export const TOP_DESTINATIONS: DestinationItem[] = [
  {
    id: 'srinagar-dal-lake',
    name: 'Srinagar & Dal Lake',
    kashmiriName: 'شہرِ خاص (Shehr-e-Khaas)',
    badge: 'Heart of Kashmir',
    category: 'lakes',
    elevation: '5,200 ft (1,585 m)',
    distanceFromSrinagar: '0 km (Srinagar Airport 12 km)',
    idealDuration: '2 to 3 Nights',
    bestMonths: 'Year-Round (March–Nov & Snowy Winters)',
    image: '/images/dal-lake-shikara-hero.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop',
    description: 'The poetic summer capital of Jammu & Kashmir, renowned worldwide for tranquil Dal Lake, hand-carved cedar heritage houseboats, and Mughal terraced gardens built by Emperor Jahangir.',
    topHighlights: [
      'Sunset Shikara Cruise to Char Chinar & Floating Gardens',
      'Overnight stay in a Super Deluxe Carved Cedar Houseboat',
      'Mughal Terraced Gardens: Shalimar Bagh, Nishat Bagh & Chashme Shahi',
      'Dawn Floating Vegetable & Flower Market (5:30 AM inner lake waterways)',
      'Historic Jamia Masjid & Shah-e-Hamdan wooden architecture in Old City',
    ],
    insiderTip: 'Book an early morning 5:30 AM Shikara ride to witness the vibrant floating vegetable and flower market in the inner waterways of Dal Lake.',
    filterKeyword: 'Dal Lake',
  },
  {
    id: 'gulmarg-meadow',
    name: 'Gulmarg (Meadow of Flowers)',
    kashmiriName: 'گلمرگ',
    badge: 'Asia’s Ski Capital',
    category: 'meadows',
    elevation: '8,694 ft – 13,780 ft (Mount Apharwat)',
    distanceFromSrinagar: '50 km (approx. 1.5 hrs drive)',
    idealDuration: '1 to 2 Nights',
    bestMonths: 'Dec–Mar (Snow Skiing) • May–Oct (Lush Meadows)',
    image: '/images/gulmarg-gondola-cable-car.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1566837945084-3159810a8db8?q=80&w=1200&auto=format&fit=crop',
    description: 'A world-famous alpine bowl surrounded by towering pine forests, housing the world’s second-highest operating cable car (Gulmarg Gondola) reaching 13,780 ft at Mount Apharwat Peak.',
    topHighlights: [
      'Gulmarg Gondola Phase 1 (Kongdoori) & Phase 2 (Apharwat Peak at 13,780 ft)',
      'World-class snow skiing, snowboarding, and snowmobiling (Dec to March)',
      'Strawberry Valley pony trails & historic Maharaja Hari Singh Palace',
      'Historic 1902 British-era St. Mary’s stone church nestled in pine woods',
      'Highest 18-hole green golf course in the world (8,690 ft)',
    ],
    insiderTip: 'Book Gondola Phase 2 tickets online 3 to 4 weeks in advance; Apharwat Peak tickets sell out rapidly during peak seasons.',
    filterKeyword: 'Gulmarg',
  },
  {
    id: 'pahalgam-valley',
    name: 'Pahalgam (Valley of Shepherds)',
    kashmiriName: 'پہلگام',
    badge: 'Lidder River Paradise',
    category: 'rivers',
    elevation: '7,200 ft (2,195 m)',
    distanceFromSrinagar: '90 km (approx. 2.5 hrs via Saffron Fields)',
    idealDuration: '2 Nights',
    bestMonths: 'April to October & Winter Snow Season',
    image: '/images/betaab-valley-pahalgam.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1200&auto=format&fit=crop',
    description: 'Nestled along the emerald turquoise waters of the Lidder River, Pahalgam is the quintessential pastoral paradise with pine-fringed valleys, trout fishing, and the gateway to the sacred Amarnath Yatra.',
    topHighlights: [
      'Betaab Valley (named after the Bollywood hit film) amidst dramatic cliffs',
      'Aru Valley & Overa-Aru Biosphere Reserve with alpine meadows',
      'Chandanwari – the snow point & commencement site of Amarnath Yatra',
      'Baisaran Valley ("Mini Switzerland") horse ride through pine-covered hills',
      'Whitewater river rafting in the gushing Lidder River (Level 2 to 3)',
    ],
    insiderTip: 'En route to Pahalgam from Srinagar, stop at Pampore to purchase authentic GI-tagged Kashmiri Saffron and pure walnut kernel.',
    filterKeyword: 'Pahalgam',
  },
  {
    id: 'sonamarg-glacier',
    name: 'Sonamarg (Meadow of Gold)',
    kashmiriName: 'سونا مرگ',
    badge: 'Gateway to Ladakh',
    category: 'meadows',
    elevation: '9,000 ft (2,740 m)',
    distanceFromSrinagar: '80 km (approx. 2 hrs drive)',
    idealDuration: '1 Night or Full Day Excursion',
    bestMonths: 'May to October & Winter Snow Tourism',
    image: '/images/sonamarg-valley-hero.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop',
    description: 'Surrounded by imposing jagged snow peaks and glistening glaciers along the roaring Sindh River, Sonamarg is the dramatic alpine gateway connecting green Kashmir to rugged Ladakh.',
    topHighlights: [
      'Thajiwas Glacier pony trek or sledge ride with year-round snow pockets',
      'Zero Point & Zoji La Pass (11,575 ft) high-altitude mountain crossing',
      'Whitewater rafting along the scenic Sindh River rapids',
      'Baltal valley base camp for the holy Amarnath pilgrimage',
      'Starting base for the world-renowned Great Lakes of Kashmir alpine trek',
    ],
    insiderTip: 'Even during mid-summer July and August, Thajiwas Glacier offers snow sledging and snowman building activities.',
    filterKeyword: 'Sonmarg',
  },
  {
    id: 'doodhpathri-meadow',
    name: 'Doodhpathri (Valley of Milk)',
    kashmiriName: 'دودھ پتھری',
    badge: 'Pristine Hidden Meadow',
    category: 'meadows',
    elevation: '8,957 ft (2,730 m)',
    distanceFromSrinagar: '42 km (approx. 1.5 hrs drive)',
    idealDuration: 'Day Trip Excursion',
    bestMonths: 'April to October',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
    fallbackImage: '/images/sonamarg-valley-hero.jpg',
    description: 'An untouched bowl of lush green rolling carpets, where crystal-white frothy river waters tumble over pebble-strewn riverbeds of the Shaliganga stream without heavy tourist commercialization.',
    topHighlights: [
      'Expansive emerald rolling meadows completely free from commercial clutter',
      'Shaliganga river bank walks and scenic riverside picnic spots',
      'Pony rides to Dikbal and Ashtar alpine meadows',
      'Dense fragrant Deodar pine and fir forests',
      'Authentic shepherd mud-brick Kothas with fresh mountain tea & milk',
    ],
    insiderTip: 'Pack a warm Kashmiri kehwa flask and picnic basket; Doodhpathri is one of the most serene, crowd-free valleys in Kashmir.',
    filterKeyword: 'Doodhpathri',
  },
  {
    id: 'gurez-valley',
    name: 'Gurez Valley (Dawar & Habba Khatoon)',
    kashmiriName: 'وادیء گوریز',
    badge: 'Offbeat Himalayan Jewel',
    category: 'offbeat',
    elevation: '8,000 ft (2,438 m)',
    distanceFromSrinagar: '125 km (approx. 4.5 hrs via Razdan Pass)',
    idealDuration: '2 Nights',
    bestMonths: 'June to September (Open in Summer)',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    fallbackImage: '/images/betaab-valley-pahalgam.jpg',
    description: 'An isolated, breath-taking valley along the turquoise Kishanganga River near the Line of Control, dominated by the pyramidal limestone Habba Khatoon Peak and ancestral wooden hamlet architecture.',
    topHighlights: [
      'Razdan Pass (11,672 ft) panoramic views of Mount Harmukh peak',
      'Majestic Habba Khatoon pyramid peak named after Kashmir’s poetess-queen',
      'Dawar hamlet wooden log architecture and indigenous Dardic culture',
      'Kishanganga riverbank trout angling and border tourism',
      'Stargazing with zero light pollution under crystal-clear Himalayan skies',
    ],
    insiderTip: 'Our native team arranges seamless tourist entry clearance at the checkposts; travel during late June to August for peak wildflowers.',
    filterKeyword: 'Gurez',
  },
];

interface TopKashmirDestinationsProps {
  onSelectDestination?: (keyword: string) => void;
  onOpenPlanner?: () => void;
}

export const TopKashmirDestinations: React.FC<TopKashmirDestinationsProps> = ({
  onSelectDestination,
  onOpenPlanner,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'lakes' | 'meadows' | 'rivers' | 'offbeat'>('all');

  const filteredDestinations = selectedCategory === 'all'
    ? TOP_DESTINATIONS
    : TOP_DESTINATIONS.filter(d => d.category === selectedCategory);

  return (
    <section id="kashmir-destinations" className="py-24 bg-stone-50/90 border-t border-b border-stone-200/90 relative overflow-hidden">
      
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-widest mb-3 shadow-xs">
            <Mountain className="w-4 h-4 text-emerald-700" />
            <span>TOP KASHMIR DESTINATIONS • ICONIC VALLEYS</span>
            <ChinarLeafIcon className="w-3.5 h-3.5 text-emerald-800" />
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Top Kashmir Destinations &amp; Valleys
          </h2>

          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            From the serene cedar houseboats of Dal Lake to Asia&apos;s highest cable car at Mount Apharwat, explore the most celebrated valleys of Jammu &amp; Kashmir curated with native local ground guidance.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs text-center">
              <div className="text-xl font-serif-display font-extrabold text-emerald-800">6 Valleys</div>
              <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Prime Destinations</div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs text-center">
              <div className="text-xl font-serif-display font-extrabold text-sky-800">13,780 ft</div>
              <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Gulmarg Summit</div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs text-center">
              <div className="text-xl font-serif-display font-extrabold text-amber-800">Private Cabs</div>
              <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Sanitized Vehicles</div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs text-center">
              <div className="text-lg sm:text-xl font-serif-display font-extrabold text-rose-800">+91 7006644364</div>
              <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Native Helpline</div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Destinations (6)' },
            { id: 'lakes', label: 'Lakes & Houseboats' },
            { id: 'meadows', label: 'Alpine Meadows (Gulmarg, Sonamarg)' },
            { id: 'rivers', label: 'River Valleys (Pahalgam)' },
            { id: 'offbeat', label: 'Offbeat Jewels (Gurez)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 6 Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => {
            return (
              <div
                key={dest.id}
                className="bg-white rounded-3xl border border-stone-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Destination Image with Badge Overlays */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={dest.image}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== dest.fallbackImage) {
                          target.src = dest.fallbackImage;
                        }
                      }}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-stone-900 backdrop-blur-md shadow-sm">
                        {dest.badge}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-900/90 text-white backdrop-blur-md">
                        {dest.elevation}
                      </span>
                    </div>

                    {/* Bottom Title inside Image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] text-amber-300 font-semibold">{dest.kashmiriName}</div>
                      <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white drop-shadow-sm">
                        {dest.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {dest.description}
                    </p>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-stone-50 p-3 rounded-2xl border border-stone-200/70">
                      <div>
                        <span className="text-stone-400 block font-semibold">Distance from Srinagar:</span>
                        <span className="font-bold text-stone-800">{dest.distanceFromSrinagar}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block font-semibold">Recommended Stay:</span>
                        <span className="font-bold text-emerald-800">{dest.idealDuration}</span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-stone-200/60">
                        <span className="text-stone-400 block font-semibold">Best Visiting Months:</span>
                        <span className="font-bold text-stone-800">{dest.bestMonths}</span>
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-800">
                        Must-Experience Highlights:
                      </div>
                      <ul className="space-y-1 text-xs text-stone-600">
                        {dest.topHighlights.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Native Insider Tip */}
                    <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 flex items-start space-x-2">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">TripVora Tip:</strong> {dest.insiderTip}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      if (onSelectDestination) {
                        onSelectDestination(dest.filterKeyword);
                      } else {
                        const el = document.getElementById('tours-catalog');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <span>Browse {dest.name.split('(')[0]} Tour Packages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Custom Advice Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-white rounded-3xl border-2 border-emerald-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif-display text-lg font-bold text-stone-900">
              Want to combine these destinations in one seamless itinerary?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600">
              Our native team creates custom routes with private cabs, Dal Lake houseboats, and hotel vouchers.
            </p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <a
              href="tel:+917006644364"
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Call +91 7006644364</span>
            </a>
            {onOpenPlanner && (
              <button
                onClick={onOpenPlanner}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
              >
                Plan Custom Route
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
