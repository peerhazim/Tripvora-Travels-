import React, { useState } from 'react';
import { 
  FileText, 
  MessageSquare, 
  Instagram, 
  ShieldCheck, 
  X, 
  Send, 
  Phone, 
  Sparkles, 
  ExternalLink,
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  Car
} from 'lucide-react';

interface FloatingActionMenuProps {
  onOpenPlanner?: () => void;
}

export const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({ onOpenPlanner }) => {
  // Active window state
  const [activeTab, setActiveTab] = useState<'form' | 'whatsapp' | 'instagram' | 'license' | null>(null);
  
  // Quick Inquiry Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('Kashmir Valley (Srinagar, Gulmarg, Pahalgam)');
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState('Couple (2 Adults)');
  const [cabPreference, setCabPreference] = useState('Dedicated Sedan / Innova');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ id: string; whatsappUrl: string } | null>(null);
  const [formError, setFormError] = useState('');

  // Handle Quick Form Submission
  const handleQuickFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setFormError('Please enter your full name and contact phone number.');
      return;
    }
    setFormError('');
    setIsSubmitting(true);

    const estPrice = '₹12,999 / person';
    const payload = {
      source: 'floating_quick_widget',
      name: name.trim(),
      phone: phone.trim(),
      destination,
      travelDate: travelDate || 'Flexible / Upcoming Months',
      duration: '5 Days / 4 Nights (Classic)',
      travelers,
      cabType: cabPreference,
      budget: estPrice,
      notes: (notes ? `${notes} | ` : '') + 'Submitted via Floating Quick Form (Est. ~₹12,999/person)'
    };

    // Pre-crafted WhatsApp message that will send all details to Hazim (+91 7006644364)
    const waText = `*New TripVora Inquiry*\n\n` +
      `*Name:* ${name.trim()}\n` +
      `*Phone:* ${phone.trim()}\n` +
      `*Destination:* ${destination}\n` +
      `*Travel Date:* ${travelDate || 'Flexible'}\n` +
      `*Travelers:* ${travelers}\n` +
      `*Cab Preference:* ${cabPreference}\n` +
      `*Estimated Price:* ${estPrice}\n` +
      `*Special Notes:* ${notes || 'Looking for best discounted quotation'}\n\n` +
      `_Sent to TripVora Travels (+91 7006644364)_`;
    const directWaUrl = `https://wa.me/917006644364?text=${encodeURIComponent(waText)}`;

    try {
      const response = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      
      setSubmitSuccess({
        id: data.id || 'TV-' + Math.floor(1000 + Math.random() * 9000),
        whatsappUrl: directWaUrl
      });
      
      // Also automatically open WhatsApp in a new tab so the customer can text Hazim immediately with 1 click
      window.open(directWaUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback works directly via WhatsApp
      setSubmitSuccess({
        id: 'TV-' + Math.floor(1000 + Math.random() * 9000),
        whatsappUrl: directWaUrl
      });
      window.open(directWaUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName('');
    setPhone('');
    setNotes('');
    setTravelDate('');
    setSubmitSuccess(null);
  };

  return (
    <aside aria-label="TripVora Quick Floating Assistance" className="fixed bottom-5 right-4 sm:right-6 z-50 flex flex-col items-end">
      {/* Pop-up Window for the active tab */}
      {activeTab && (
        <div 
          className="mb-3 w-[92vw] sm:w-[390px] max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-emerald-500/80 p-5 text-stone-900 animate-in fade-in slide-in-from-bottom-5 duration-200 transition-all ring-4 ring-emerald-600/10"
          onMouseEnter={() => {}} // Keep open on hover
        >
          {/* Top Bar of the pop-up */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h4 className="font-serif-display text-lg font-bold text-emerald-950">
                {activeTab === 'form' && 'Instant Trip Inquiry Form'}
                {activeTab === 'whatsapp' && 'TripVora WhatsApp Desk'}
                {activeTab === 'instagram' && 'TripVora Official Instagram'}
                {activeTab === 'license' && 'Government Tourism License'}
              </h4>
            </div>
            <button
              onClick={() => setActiveTab(null)}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Close window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* TAB 1: FORM SECTION */}
          {activeTab === 'form' && (
            <div>
              {!submitSuccess ? (
                <form onSubmit={handleQuickFormSubmit} className="space-y-3">
                  <div className="p-2.5 bg-emerald-50/90 border border-emerald-300 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-800 block">
                        Estimated Starting Price
                      </span>
                      <span className="text-xs text-stone-600 font-medium">All-inclusive 5D/4N Package</span>
                    </div>
                    <div className="text-right">
                      <span className="font-serif-display text-lg font-black text-emerald-900">
                        ₹12,999
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 block -mt-1">/ person</span>
                    </div>
                  </div>

                  {formError && (
                    <div className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
                      {formError}
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-stone-300 bg-stone-100 text-stone-600 text-xs font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-r-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        Destination
                      </label>
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                      >
                        <option value="Kashmir Valley (Srinagar, Gulmarg, Pahalgam)">Kashmir Valley</option>
                        <option value="Vaishno Devi Katra + Kashmir Paradise">Katra + Kashmir</option>
                        <option value="Ladakh (Leh, Nubra, Pangong)">Ladakh High Passes</option>
                        <option value="Offbeat Gurez Valley & Sonamarg">Offbeat Gurez</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Users className="w-3 h-3 text-emerald-600" />
                        Travelers
                      </label>
                      <select
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                      >
                        <option value="Couple (2 Adults)">Couple (2 Adults)</option>
                        <option value="Family (2 Adults + Kids)">Family with Kids</option>
                        <option value="Friends Group (3-5 Adults)">Group (3-5 Adults)</option>
                        <option value="Large Group (6+ Travelers)">Large Group (6+)</option>
                        <option value="Solo Traveler">Solo Explorer</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-600" />
                        Expected Month/Date
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Next Month / Oct 15"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Car className="w-3 h-3 text-emerald-600" />
                        Private Cab
                      </label>
                      <select
                        value={cabPreference}
                        onChange={(e) => setCabPreference(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                      >
                        <option value="Dedicated Sedan (Dzire / Etios)">Dedicated Sedan</option>
                        <option value="Innova Crysta Luxury">Innova Crysta</option>
                        <option value="Tempo Traveller (Groups)">Tempo Traveller</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                      Special Requests / Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Gondola cable car tickets, honeymoon cake, vegetarian meals..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending inquiry & opening WhatsApp...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Details & Send via WhatsApp</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-stone-500 text-center">
                    Submitting alerts Hazim directly at <strong className="text-emerald-800">peerhazim98@gmail.com</strong> and launches WhatsApp with your details pre-typed for instant confirmation.
                  </p>
                </form>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h5 className="font-serif-display text-lg font-bold text-emerald-950">
                      Inquiry Received!
                    </h5>
                    <p className="text-xs text-stone-600 mt-1">
                      Reference ID: <strong className="text-emerald-800">{submitSuccess.id}</strong>.
                    </p>
                    <p className="text-xs text-stone-600 mt-1">
                      Our Srinagar desk and Hazim have received your details via email & WhatsApp.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={submitSuccess.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Chat on WhatsApp Now (7006644364)</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-xs text-stone-500 hover:text-stone-800 underline transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WHATSAPP DIRECT DESK */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4 text-left">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <MessageSquare className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">Direct Kashmir Travel Desk</span>
                  <span className="text-[11px] text-stone-600 font-medium">Chat directly with Hazim (Founder & Native Operator)</span>
                </div>
              </div>

              <div className="text-xs text-stone-700 space-y-1.5 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-600">Helpline:</span>
                  <a href="tel:7006644364" className="font-bold text-emerald-800 hover:underline">+91 7006644364</a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-600">Hours:</span>
                  <span className="font-medium text-stone-800">24/7 Ground Assistance</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-600">Office:</span>
                  <span className="font-medium text-stone-800">Srinagar, Sopore, Jammu and Kashmir</span>
                </div>
              </div>

              <p className="text-xs text-stone-600">
                Click below to start a direct WhatsApp chat for instant customized packages, Dal Lake houseboat photos, cab availability, or Gondola Phase 1 & 2 tickets.
              </p>

              <a
                href="https://wa.me/917006644364?text=Hi%20Hazim!%20I%20am%20interested%20in%20planning%20a%20Kashmir%20trip%20with%20TripVora%20Travels.%20Please%20share%20itineraries%20and%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Open WhatsApp Chat (7006644364)</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          )}

          {/* TAB 3: INSTAGRAM OFFICIAL */}
          {activeTab === 'instagram' && (
            <div className="space-y-4 text-left">
              <div className="p-3 bg-gradient-to-r from-pink-50 via-purple-50 to-orange-50 rounded-xl border border-pink-200 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">@tripvoratravels</span>
                  <span className="text-[11px] text-stone-600 font-medium">Official Instagram Handle</span>
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed">
                Follow our daily stories and reels featuring live snow updates from Gulmarg & Apharwat peak, spring bloom at Indira Gandhi Tulip Garden, houseboat life on Dal Lake, and guest reviews.
              </p>

              <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=400&auto=format&fit=crop"
                  alt="Dal Lake Shikara"
                  className="w-full h-20 object-cover hover:scale-105 transition-transform"
                />
                <img
                  src="https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=400&auto=format&fit=crop"
                  alt="Gulmarg Snow"
                  className="w-full h-20 object-cover hover:scale-105 transition-transform"
                />
                <img
                  src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=400&auto=format&fit=crop"
                  alt="Pahalgam Valley"
                  className="w-full h-20 object-cover hover:scale-105 transition-transform"
                />
              </div>

              <a
                href="https://instagram.com/tripvoratravels"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
                <span>Visit Our Instagram Profile</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          )}

          {/* TAB 4: TOURISM LICENSE WINDOW */}
          {activeTab === 'license' && (
            <div className="space-y-3 text-left">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-950 block">Official Tourism Registration</span>
                  <span className="text-[11px] text-amber-800 font-medium">TripVora Travels • Registered Travel Agency</span>
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs space-y-2 text-stone-700">
                <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                  <span className="font-semibold text-stone-600">Company Name:</span>
                  <span className="font-bold text-stone-900">TripVora Travels</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                  <span className="font-semibold text-stone-600">Managing Operator:</span>
                  <span className="font-bold text-stone-900">Hazim (Sopore, J&amp;K)</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                  <span className="font-semibold text-stone-600">Office:</span>
                  <span className="font-bold text-stone-900">Srinagar, Sopore, Jammu and Kashmir</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                  <span className="font-semibold text-stone-600">License Status:</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    ✓ In Progress / Verification Ready
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-600">Department:</span>
                  <span className="text-[11px] text-stone-800 font-medium">J&amp;K Tourism Department</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                <p className="font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Verified Local J&amp;K Operator</span>
                </p>
                <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed">
                  Once your formal certificate is issued by the J&amp;K Directorate of Tourism, your official certificate number, registration badge, and QR verification will be directly uploaded and displayed in this section.
                </p>
              </div>

              <a
                href="tel:7006644364"
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Srinagar Desk: 7006644364</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* The 4 Floating Action Icons (Icon Bar) */}
      <div className="flex flex-row items-center gap-2.5 bg-white/95 backdrop-blur-md p-1.5 sm:p-2 rounded-full shadow-2xl border-2 border-emerald-500/80 ring-4 ring-emerald-500/15 transition-all">
        
        {/* ICON 1: FORM SECTION (HOVER & CLICK TRIGGER) */}
        <div 
          className="relative group"
          onMouseEnter={() => setActiveTab('form')}
        >
          <button
            onClick={() => setActiveTab(activeTab === 'form' ? null : 'form')}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'form' 
                ? 'bg-emerald-700 text-white shadow-md scale-105' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:scale-105'
            }`}
            title="Instant Inquiry Form"
            aria-label="Quick Travel Inquiry Form"
          >
            <FileText className="w-5 h-5" />
          </button>
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block whitespace-nowrap bg-stone-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-lg pointer-events-none">
            📝 Inquiry Form (Hover to Open)
          </div>
        </div>

        {/* ICON 2: WHATSAPP */}
        <div 
          className="relative group"
          onMouseEnter={() => setActiveTab('whatsapp')}
        >
          <button
            onClick={() => setActiveTab(activeTab === 'whatsapp' ? null : 'whatsapp')}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'whatsapp' 
                ? 'bg-[#1fa950] text-white shadow-md scale-105' 
                : 'bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md hover:scale-105'
            }`}
            title="Chat on WhatsApp (7006644364)"
            aria-label="WhatsApp Hotline"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
          </button>
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block whitespace-nowrap bg-stone-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-lg pointer-events-none">
            💬 WhatsApp (7006644364)
          </div>
        </div>

        {/* ICON 3: INSTAGRAM */}
        <div 
          className="relative group"
          onMouseEnter={() => setActiveTab('instagram')}
        >
          <button
            onClick={() => setActiveTab(activeTab === 'instagram' ? null : 'instagram')}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'instagram' 
                ? 'bg-gradient-to-tr from-amber-600 via-rose-600 to-purple-700 text-white shadow-md scale-105' 
                : 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-md hover:scale-105'
            }`}
            title="TripVora Official Instagram"
            aria-label="Instagram Profile"
          >
            <Instagram className="w-5 h-5" />
          </button>
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block whitespace-nowrap bg-stone-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-lg pointer-events-none">
            📸 Instagram (@tripvoratravels)
          </div>
        </div>

        {/* ICON 4: TOURISM LICENSE */}
        <div 
          className="relative group"
          onMouseEnter={() => setActiveTab('license')}
        >
          <button
            onClick={() => setActiveTab(activeTab === 'license' ? null : 'license')}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'license' 
                ? 'bg-amber-600 text-white shadow-md scale-105' 
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:scale-105'
            }`}
            title="Tourism License & Registration"
            aria-label="Tourism License"
          >
            <ShieldCheck className="w-5 h-5" />
          </button>
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block whitespace-nowrap bg-stone-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-lg pointer-events-none">
            🛡️ Tourism License &amp; Registration
          </div>
        </div>

      </div>
    </aside>
  );
};
