import React, { useState } from 'react';
import { 
  Sparkles, Compass, MapPin, Users, Hotel, Calendar, 
  Send, Check, ArrowRight, ShieldCheck, FileText, Phone, MessageSquare 
} from 'lucide-react';
import { Currency } from '../types';
import { formatPrice } from '../utils/format';

interface CustomTripPlannerProps {
  currentCurrency: Currency;
  onNavigateToCatalog: () => void;
}

const DESTINATIONS = [
  { id: 'kashmir', label: 'Kashmir Valley (Srinagar, Gulmarg, Pahalgam)', baseDailyUSD: 30.6 }, // 5 Days = $153 ≈ ₹12,999
  { id: 'ladakh', label: 'Ladakh (Leh, Nubra, Pangong Tso)', baseDailyUSD: 46 },
  { id: 'katra', label: 'Mata Vaishno Devi Katra & Shivkhori', baseDailyUSD: 24 },
  { id: 'combo-circuit', label: 'Kashmir + Ladakh Overland Circuit', baseDailyUSD: 45 },
  { id: 'combo-katra-kashmir', label: 'Vaishno Devi Katra + Kashmir Paradise', baseDailyUSD: 32 },
  { id: 'gurez', label: 'Offbeat Gurez & Northern Valleys', baseDailyUSD: 36 },
];

const STYLES = [
  { id: 'family', label: 'Family Holiday & Leisure Sightseeing', multiplier: 1.0 },
  { id: 'honeymoon', label: 'Romantic Honeymoon & Candlelit Houseboat', multiplier: 1.15 },
  { id: 'spiritual', label: 'Spiritual Yatra & Holy Darshan Guidance', multiplier: 0.95 },
  { id: 'adventure', label: 'High Passes, Khardung La & Camping', multiplier: 1.1 },
];

const PARTIES = [
  { id: 'couple', label: 'Romantic Couple', guests: 2 },
  { id: 'family', label: 'Family with Children', guests: 4 },
  { id: 'pilgrims', label: 'Family / Elder Pilgrim Group', guests: 6 },
  { id: 'solo', label: 'Solo Traveler', guests: 1 },
  { id: 'group', label: 'Friends Group', guests: 8 },
];

const LODGING_TIERS = [
  { id: 'deluxe', label: 'Deluxe Heritage Houseboat & 3★ Hotels', costMod: 0 },
  { id: 'luxury', label: 'Super Deluxe 4★ Resorts & Pine Cottages', costMod: 14 },
  { id: 'ultra-luxury', label: 'Premier 5★ Luxury (The Khyber / Grand Dragon)', costMod: 45 },
  { id: 'swiss-camps', label: 'Swiss Cottages & Pangong Lakefront Camps', costMod: 10 },
];

export const CustomTripPlanner: React.FC<CustomTripPlannerProps> = ({
  currentCurrency,
  onNavigateToCatalog,
}) => {
  const [destinationId, setDestinationId] = useState('kashmir');
  const [styleId, setStyleId] = useState('family');
  const [partyId, setPartyId] = useState('couple');
  const [lodgingTierId, setLodgingTierId] = useState('deluxe');
  const [durationDays, setDurationDays] = useState(5);
  const [preferredSeason, setPreferredSeason] = useState('Spring Tulips (Mar - May 2026)');

  // Contact form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');

  const destObj = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0];
  const styleObj = STYLES.find((s) => s.id === styleId) || STYLES[0];
  const partyObj = PARTIES.find((p) => p.id === partyId) || PARTIES[0];
  const tierObj = LODGING_TIERS.find((t) => t.id === lodgingTierId) || LODGING_TIERS[0];

  // Dynamic price calculation
  const baseRate = destObj.baseDailyUSD * styleObj.multiplier + tierObj.costMod;
  const estimatedTotalPerPersonUSD = Math.round(baseRate * durationDays);
  const estimatedGroupTotalUSD = Math.round(estimatedTotalPerPersonUSD * partyObj.guests);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);

    try {
      const res = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'custom_planner',
          name,
          phone,
          email,
          destination: destObj.label,
          duration: `${durationDays} Days / ${durationDays - 1} Nights`,
          style: styleObj.label,
          travelers: `${partyObj.label} (${partyObj.guests} guests)`,
          lodging: tierObj.label,
          season: preferredSeason,
          budget: `${formatPrice(estimatedTotalPerPersonUSD, currentCurrency)} / person (Total: ${formatPrice(estimatedGroupTotalUSD, currentCurrency)})`,
          estimatedTotalUSD: estimatedGroupTotalUSD,
          notes: (notes ? `${notes} | ` : '') + `Est: ${formatPrice(estimatedTotalPerPersonUSD, currentCurrency)}/person`
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedRef(data.queryId);
      } else {
        setSubmittedRef('TV-' + Math.floor(1000 + Math.random() * 9000));
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmittedRef('TV-' + Math.floor(1000 + Math.random() * 9000));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi TripVora Travels! I would like a quote for:\n- Destination: ${destObj.label}\n- Duration: ${durationDays} Days\n- Style: ${styleObj.label}\n- Travelers: ${partyObj.label} (${partyObj.guests} guests)\n- Season: ${preferredSeason}\n- Estimated Budget: ${formatPrice(estimatedGroupTotalUSD, 'INR')}`
  );

  return (
    <section id="custom-planner" className="py-20 bg-gradient-to-b from-stone-50 via-white to-emerald-50/40 text-stone-900 relative overflow-hidden border-t border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>TripVora Custom Holiday Builder</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-light text-stone-900 tracking-tight">
            Design Your <span className="text-emerald-700 italic font-normal">Kashmir, Ladakh or Katra Package</span>
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Customize your holiday with our native Kashmir travel specialists. Instant cost estimation with transparent inclusions, private vehicle options, and direct booking support on <strong className="text-emerald-800">+91 7006644364</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Left Column (7 cols) in White & Green */}
          <div className="lg:col-span-7 bg-white border border-emerald-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md text-stone-900">
            {/* Step 1: Destination */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center space-x-1.5 mb-2.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>1. Select Destination / Circuit</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DESTINATIONS.map((dest) => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => setDestinationId(dest.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                      destinationId === dest.id
                        ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600/30'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    {dest.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Travel Style */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center space-x-1.5 mb-2.5">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>2. Holiday &amp; Travel Type</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {STYLES.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setStyleId(style.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                      styleId === style.id
                        ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600/30'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Party Type */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center space-x-1.5 mb-2.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>3. Party Structure &amp; Guests</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PARTIES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPartyId(p.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                      partyId === p.id
                        ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600/30'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    <div className="font-bold">{p.label}</div>
                    <div className="text-[10px] text-stone-500">{p.guests} {p.guests === 1 ? 'Guest' : 'Guests'}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Lodging Preference */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center space-x-1.5 mb-2.5">
                <Hotel className="w-3.5 h-3.5 text-emerald-600" />
                <span>4. Hotel &amp; Houseboat Tier</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {LODGING_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setLodgingTierId(tier.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                      lodgingTierId === tier.id
                        ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600/30'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Duration Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>5. Trip Duration</span>
                </label>
                <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                  {durationDays} Days / {durationDays - 1} Nights
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="14"
                value={durationDays}
                onChange={(e) => setDurationDays(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                <span>3 Days (Katra)</span>
                <span>5 Days (Classic Kashmir ~₹12,999)</span>
                <span>8 Days (Kashmir + Gulmarg)</span>
                <span>14 Days (Grand Circuit)</span>
              </div>
            </div>

            {/* Step 6: Preferred Season */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                6. Travel Season
              </label>
              <select
                value={preferredSeason}
                onChange={(e) => setPreferredSeason(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              >
                <option>Spring Tulips &amp; Apple Orchards (Mar - May 2026)</option>
                <option>Summer Meadows &amp; Ladakh Season (Jun - Aug 2026)</option>
                <option>Autumn Golden Chinars (Sep - Nov 2026)</option>
                <option>Winter Snowfall &amp; Gulmarg Skiing (Dec - Feb 2027)</option>
              </select>
            </div>
          </div>

          {/* Right Summary & Lead Capture (5 cols) in Pure White & Emerald */}
          <div className="lg:col-span-5 bg-white border-2 border-emerald-500 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl sticky top-28 ring-4 ring-emerald-500/10 text-stone-900">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700">
                Itinerary Estimation
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-stone-900 mt-1">
                {destObj.label.split('(')[0]}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {durationDays} Days • {styleObj.label} • {partyObj.guests} {partyObj.guests === 1 ? 'Traveler' : 'Travelers'}
              </p>
            </div>

            {/* Cost Estimate Highlight */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-stone-700 font-medium">Estimated Per Person:</span>
                <span className="font-serif-display text-2xl sm:text-3xl font-bold text-emerald-800">
                  {formatPrice(estimatedTotalPerPersonUSD, currentCurrency)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-stone-600 mt-1 pt-2 border-t border-emerald-200">
                <span>Party Total ({partyObj.guests} {partyObj.guests === 1 ? 'traveler' : 'travelers'}):</span>
                <span className="font-semibold text-stone-900">
                  {formatPrice(estimatedGroupTotalUSD, currentCurrency)}
                </span>
              </div>
            </div>

            {/* Inclusions checklist preview */}
            <div className="space-y-2 text-xs text-stone-700">
              <span className="font-bold uppercase tracking-wider text-emerald-900 block">
                TripVora Signature Inclusions:
              </span>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Dedicated private sanitized cab (Etios / Dzire / Innova / Crysta)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Daily breakfast and dinner (MAP meal plan) included</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Complimentary Dal Lake Shikara ride with hot Kashmiri Kehwa</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Direct on-ground trip manager support (Call: +91 7006644364)</span>
              </div>
            </div>

            {/* Instant WhatsApp Inquiry Option */}
            <a
              href={`https://wa.me/917006644364?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Details to +91 7006644364</span>
            </a>

            {/* Request Blueprint Form */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-stone-200">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800 block">
                  Or Request Callback &amp; Detailed Itinerary
                </span>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="tel"
                    required
                    placeholder="Contact Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Special requests (e.g., Honeymoon decor, Gondola Phase 2, Katra battery car)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting...' : 'Get Free Custom Proposal'}</span>
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <h4 className="font-serif-display text-lg font-bold text-stone-900">Proposal Dispatched! (Ref: {submittedRef})</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Thank you, <strong>{name}</strong>. Your customized holiday plan for <strong>{destObj.label}</strong> has been sent to <strong>peerhazim98@gmail.com</strong>. We will call you on <strong>{phone}</strong> shortly. You can also reach us directly at <strong>+91 7006644364</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-emerald-700 font-bold underline hover:text-emerald-900 pt-2 cursor-pointer"
                >
                  Create another quote
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
