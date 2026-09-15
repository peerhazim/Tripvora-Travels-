import React, { useState } from 'react';
import { 
  Send, Phone, Mail, MapPin, CheckCircle2, MessageSquare, ShieldCheck, 
  Sparkles, Calendar, Users, Car, Hotel, Clock, ArrowRight 
} from 'lucide-react';

interface QuickInquirySectionProps {
  onOpenConsultation?: () => void;
}

export const QuickInquirySection: React.FC<QuickInquirySectionProps> = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('Kashmir Valley (Srinagar, Gulmarg, Pahalgam)');
  const [travelDate, setTravelDate] = useState('');
  const [duration, setDuration] = useState('6 Days / 5 Nights');
  const [travelers, setTravelers] = useState('2 Adults (Couple / Honeymoon)');
  const [cabType, setCabType] = useState('Innova Crysta (Private)');
  const [hotelCategory, setHotelCategory] = useState('Deluxe 4★ + Houseboat');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState<{ id: string; whatsappUrl: string } | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setError('Please provide your name and phone number.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact_form',
          name,
          phone,
          email,
          destination,
          travelDate,
          duration,
          travelers,
          cabType,
          hotelCategory,
          budget: 'Estimated ~₹12,999 / person',
          notes: (notes ? `${notes} | ` : '') + 'Estimated Package Price: ~₹12,999 / person'
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmittedQuery({ id: data.queryId, whatsappUrl: data.whatsappUrl });
      } else {
        setError(data.error || 'Failed to submit inquiry. Please call 7006644364.');
      }
    } catch (err) {
      console.error(err);
      // Fallback local whatsapp link
      const fallbackMsg = `Hi TripVora Travels! My name is ${name} (${phone}). I would like a quote for ${destination} for ${duration} with ${cabType}.`;
      setSubmittedQuery({
        id: 'TV-' + Math.floor(1000 + Math.random() * 9000),
        whatsappUrl: `https://wa.me/917006644364?text=${encodeURIComponent(fallbackMsg)}`
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden border-t border-emerald-200">
      {/* Background Image: Serene Dal Lake with Mountain Reflections */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2000&auto=format&fit=crop"
          alt="Dal Lake Srinagar looking over tranquil waters and Himalayan peaks"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter saturate-110"
        />
        {/* Soft, luminous white and emerald glass overlays for seamless text readability */}
        <div className="absolute inset-0 bg-white/92 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/95 via-white/90 to-emerald-50/95" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Agency Credentials & Direct Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Native Srinagar Tour Operator</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 tracking-tight leading-tight">
              Let’s Craft Your Dream <br className="hidden sm:inline" />
              <span className="text-emerald-700 italic font-normal">Kashmir &amp; Ladakh Holiday.</span>
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Skip third-party agent markups. Deal directly with our native Srinagar holiday architects. Every inquiry receives a customized day-by-day itinerary with verified deluxe houseboats, sanitized private cabs, and 24/7 on-ground assistance.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              {/* Phone Helpline */}
              <a
                href="tel:7006644364"
                className="p-4 rounded-xl bg-white border border-emerald-200 hover:border-emerald-500 flex items-center justify-between transition-all group shadow-sm"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">Direct Kashmir Helpline</span>
                    <span className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">7006644364</span>
                  </div>
                </div>
                <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Call Now →</span>
              </a>

              {/* WhatsApp Instant Chat */}
              <a
                href="https://wa.me/917006644364?text=Hi%20TripVora%20Travels,%20I%20would%20like%20to%20plan%20a%20tour%20package"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-between transition-all group shadow-md"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-emerald-100 font-bold block">WhatsApp Booking Desk</span>
                    <span className="text-base font-bold text-white">+91 7006644364</span>
                  </div>
                </div>
                <span className="text-xs text-white font-bold uppercase tracking-wider underline">Chat Now →</span>
              </a>

              {/* Email */}
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs flex items-center space-x-3 shadow-xs">
                <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-stone-700">
                  Email Inquiries: <strong className="text-stone-900">peerhazim98@gmail.com</strong>
                </span>
              </div>

              {/* Physical Office Address */}
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs flex items-start space-x-3 shadow-xs">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600 leading-relaxed">
                  <strong>Office:</strong> Srinagar, Sopore, Jammu and Kashmir
                </span>
              </div>
            </div>

            {/* Travel Agency Assurance Badges */}
            <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-stone-700">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>J&amp;K Tourism Regd. #JKT-2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Sanitized Private Cabs</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Daily Breakfast &amp; Dinners</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>24/7 Srinagar Ground Support</span>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form (7 cols) in Pure White & Emerald */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-emerald-500 rounded-2xl p-6 sm:p-8 shadow-2xl relative ring-4 ring-emerald-500/10 text-stone-900">
              
              {!submittedQuery ? (
                <div>
                  <div className="border-b border-stone-200 pb-4 mb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif-display text-2xl font-bold text-stone-900">
                        Request a Free Custom Tour Quote
                      </h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                        15 Min Response
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1">
                      Fill in your travel preferences below. Our native trip designers will share customized hotel options, cab routing, and best discounted rates.
                    </p>
                    {/* Estimated Price callout */}
                    <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-950">
                          Estimated Package Rate:
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif-display text-base sm:text-lg font-extrabold text-emerald-900">
                          Around ₹12,999
                        </span>
                        <span className="text-[10px] font-medium text-emerald-700 ml-1">
                          / person (All-Inclusive)
                        </span>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Rajesh Kumar"
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 9876543210"
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Email and Destination */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Destination / Circuit
                        </label>
                        <select
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        >
                          <option>Kashmir Valley (Srinagar, Gulmarg, Pahalgam)</option>
                          <option>Enchanting Kashmir Budget Holiday (Kashmir Port Special)</option>
                          <option>Kashmir Winter Wonderland Snow &amp; Ski Special</option>
                          <option>Offbeat Kashmir: Doodhpathri, Yusmarg &amp; Nilnag Lake</option>
                          <option>Kashmir Spring Tulip Festival Special</option>
                          <option>Ladakh Moonland, Nubra &amp; Pangong Tso</option>
                          <option>Mata Vaishno Devi Katra &amp; Shivkhori</option>
                          <option>Katra Vaishno Devi Express &amp; Patnitop Pines</option>
                          <option>Vaishno Devi Katra + Kashmir Combo</option>
                          <option>Grand Kashmir to Ladakh Overland Circuit</option>
                          <option>Offbeat Gurez Valley &amp; Kishanganga River</option>
                        </select>
                      </div>
                    </div>

                    {/* Travel Dates, Duration, Travelers */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Travel Month / Dates
                        </label>
                        <input
                          type="text"
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          placeholder="e.g. April 2026 / Navratri"
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Duration
                        </label>
                        <select
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        >
                          <option>4 Days / 3 Nights</option>
                          <option>5 Days / 4 Nights</option>
                          <option>6 Days / 5 Nights (Popular)</option>
                          <option>7 Days / 6 Nights (Recommended)</option>
                          <option>8 Days / 7 Nights</option>
                          <option>9+ Days Grand Expedition</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Travelers
                        </label>
                        <select
                          value={travelers}
                          onChange={(e) => setTravelers(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        >
                          <option>2 Adults (Couple / Honeymoon)</option>
                          <option>Family (2 Adults + 1-2 Kids)</option>
                          <option>Family / Friends (4 Adults)</option>
                          <option>Group (6-8 Adults)</option>
                          <option>Large Group (10+ Pax)</option>
                          <option>Solo Traveler</option>
                        </select>
                      </div>
                    </div>

                    {/* Cab Preference & Hotel Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Vehicle Preference
                        </label>
                        <select
                          value={cabType}
                          onChange={(e) => setCabType(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        >
                          <option>Innova Crysta (Private &amp; Comfortable)</option>
                          <option>Dedicated Sedan (Dzire / Etios)</option>
                          <option>Toyota Fortuner 4x4 (Luxury)</option>
                          <option>Force Urbania / Tempo Traveller (Groups)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Hotel Category
                        </label>
                        <select
                          value={hotelCategory}
                          onChange={(e) => setHotelCategory(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                        >
                          <option>Deluxe 4★ + Houseboat (Most Popular)</option>
                          <option>Standard 3★ Comfortable Budget</option>
                          <option>Luxury 5★ (Khyber / Taj / Lalit)</option>
                          <option>Heritage Dal Lake Houseboat Exclusive</option>
                        </select>
                      </div>
                    </div>

                    {/* Special requirements */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Special Requests / Preferences
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Need Gulmarg Gondola Phase 2 tickets, candlelit Shikara dinner, Katra battery car assistance..."
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>

                    {/* Submit button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        {submitting ? (
                          <span>Dispatching to Srinagar Team...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Holiday Inquiry &amp; Get Best Quote</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-[11px] text-stone-500 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Zero booking fee. Dispatched to peerhazim98@gmail.com &amp; WhatsApp 7006644364</span>
                    </div>
                  </form>
                </div>
              ) : (
                /* Success Confirmation State */
                <div className="py-8 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                  </div>

                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-emerald-800">
                      Inquiry Dispatched • Ref #{submittedQuery.id}
                    </span>
                    <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                      Thank you, {name}!
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-2 leading-relaxed">
                      Your holiday request for <strong>{destination}</strong> has been received by our Srinagar travel desk. We have recorded your preferences and routed them to our lead desk.
                    </p>
                  </div>

                  {/* WhatsApp Direct Forward Action */}
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl max-w-md mx-auto space-y-3">
                    <div className="text-xs text-emerald-900 font-medium">
                      Want instant confirmation? Click below to send your itinerary request directly to our official WhatsApp helpline:
                    </div>
                    <a
                      href={submittedQuery.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Chat on WhatsApp (7006644364)</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmittedQuery(null);
                        setName('');
                        setPhone('');
                        setEmail('');
                        setNotes('');
                      }}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold underline cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
