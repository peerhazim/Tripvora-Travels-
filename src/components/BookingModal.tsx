import React, { useState } from 'react';
import { 
  X, Check, Calendar, Users, ShieldCheck, Tag, Download, Sparkles, 
  ArrowRight, Phone, MessageSquare, Car, Hotel, Compass 
} from 'lucide-react';
import { Tour, DepartureDate, Currency } from '../types';
import { formatPrice } from '../utils/format';

interface BookingModalProps {
  tour: Tour;
  selectedDeparture?: DepartureDate;
  departure?: DepartureDate;
  currentCurrency: Currency;
  isOpen?: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  tour,
  selectedDeparture,
  departure,
  currentCurrency,
  isOpen,
  onClose,
}) => {
  const defaultDep = selectedDeparture || departure || (tour.departures.length > 0 ? tour.departures[0] : undefined);
  const [departureId, setDepartureId] = useState<string>(defaultDep ? defaultDep.id : '');

  // Party Count
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Add-ons
  const [gondolaAddon, setGondolaAddon] = useState(true);
  const [shikaraDinnerAddon, setShikaraDinnerAddon] = useState(false);
  const [katraAddon, setKatraAddon] = useState(false);

  // Traveler details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Promo Code
  const [promoInput, setPromoInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  // Confirmation state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const currentDep = tour.departures.find(d => d.id === departureId) || defaultDep;
  const basePricePerPerson = currentDep ? currentDep.priceUSD : tour.priceUSD;

  // Add-on costs
  const gondolaCost = gondolaAddon ? 25 * (adults + children) : 0;
  const shikaraDinnerCost = shikaraDinnerAddon ? 35 : 0;
  const katraCost = katraAddon ? 20 * (adults + children) : 0;

  const subtotalUSD = (basePricePerPerson * adults) + (basePricePerPerson * 0.75 * children) + gondolaCost + shikaraDinnerCost + katraCost;
  const discountAmountUSD = appliedDiscount ? Math.round(subtotalUSD * (appliedDiscount.percent / 100)) : 0;
  const totalUSD = subtotalUSD - discountAmountUSD;
  const depositDueUSD = Math.round(totalUSD * 0.20); // 20% advance token deposit

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (code === 'TRIPVORA10' || code === 'KASHMIR10') {
      setAppliedDiscount({ code: 'TRIPVORA10', percent: 10 });
    } else if (code === 'YATRA5' || code === 'LADAKH5') {
      setAppliedDiscount({ code: code, percent: 5 });
    } else {
      setPromoError('Invalid promo code. Try TRIPVORA10');
    }
  };

  const generateBookingRef = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'TV-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setSubmitting(true);
    const ref = generateBookingRef();

    try {
      await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'booking_modal',
          name: fullName,
          phone,
          email,
          destination: `${tour.title} (${tour.region})`,
          travelDate: currentDep ? `${currentDep.startDate} to ${currentDep.endDate}` : 'Flexible',
          duration: `${tour.durationDays} Days`,
          travelers: `${adults} Adults${children > 0 ? `, ${children} Children` : ''}`,
          budget: formatPrice(totalUSD, 'INR'),
          notes: `Booking Ref: ${ref} | Deposit Due: ${formatPrice(depositDueUSD, 'INR')} | Special: ${specialRequests}`
        })
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
      setBookingRef(ref);
      setIsSubmitted(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const bookingWhatsAppUrl = `https://wa.me/917006644364?text=${encodeURIComponent(
    `Hi Hazim! I placed a booking request for ${tour.title}. Booking Ref: ${bookingRef}, Name: ${fullName}, Phone: ${phone}. Total: ${formatPrice(totalUSD, 'INR')}.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/85 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-800 to-emerald-700 text-white border-b border-emerald-600">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-200">
              Trip Reservation
            </span>
            <h3 className="font-serif-display text-xl font-bold text-white">
              {tour.title}
            </h3>
            <p className="text-xs text-emerald-100 mt-0.5">
              {tour.durationDays} Days • {tour.region} • Srinagar Headquartered
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Select Departure */}
              {tour.departures.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                    Select Departure Window
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tour.departures.map((dep) => (
                      <button
                        key={dep.id}
                        type="button"
                        onClick={() => setDepartureId(dep.id)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          departureId === dep.id
                            ? 'bg-emerald-50 border-emerald-500 text-stone-950 ring-1 ring-emerald-500'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-stone-900">{dep.status}</span>
                          <span className="text-emerald-700 font-semibold">{formatPrice(dep.priceUSD, currentCurrency)}</span>
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {dep.startDate} – {dep.endDate}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Party Size */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Number of Guests
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <div>
                      <span className="text-xs font-bold text-stone-800 block">Adults</span>
                      <span className="text-[10px] text-stone-500">Age 12+</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-7 h-7 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-sm font-bold text-stone-700 hover:bg-stone-100"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-bold">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-sm font-bold text-stone-700 hover:bg-stone-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <div>
                      <span className="text-xs font-bold text-stone-800 block">Children</span>
                      <span className="text-[10px] text-stone-500">Age 3–11 (25% off)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-7 h-7 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-sm font-bold text-stone-700 hover:bg-stone-100"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-bold">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-sm font-bold text-stone-700 hover:bg-stone-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Optional Experience Enhancements */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Optional Enhancements &amp; Activities
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-100/80">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={gondolaAddon}
                        onChange={(e) => setGondolaAddon(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                      <div>
                        <span className="text-xs font-bold text-stone-800 block">Gulmarg Gondola Phase 1 &amp; Phase 2 Priority Pass</span>
                        <span className="text-[10px] text-stone-500">Skip the ticket queue with confirmed boardings</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-stone-700">+{formatPrice(25, currentCurrency)}/person</span>
                  </label>

                  <label className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-100/80">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={shikaraDinnerAddon}
                        onChange={(e) => setShikaraDinnerAddon(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                      <div>
                        <span className="text-xs font-bold text-stone-800 block">Candlelit Shikara Dinner on Dal Lake</span>
                        <span className="text-[10px] text-stone-500">Authentic 4-course Wazwan or Jain dinner while cruising at sunset</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-stone-700">+{formatPrice(35, currentCurrency)} total</span>
                  </label>

                  <label className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-100/80">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={katraAddon}
                        onChange={(e) => setKatraAddon(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                      <div>
                        <span className="text-xs font-bold text-stone-800 block">Mata Vaishno Devi Battery Car &amp; VIP Darshan Slip</span>
                        <span className="text-[10px] text-stone-500">Himkoti track battery car arrangement + Katra guide</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-stone-700">+{formatPrice(20, currentCurrency)}/person</span>
                  </label>
                </div>
              </div>

              {/* Lead Traveler Details */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Lead Traveler Contact
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp (e.g. 9876543210) *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Dietary requests / Room preferences"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Promo Code Entry */}
              <div className="pt-2">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Promo code (try TRIPVORA10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs uppercase text-stone-800"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount && (
                  <p className="text-xs text-emerald-700 font-medium mt-1">
                    ✓ Promo code {appliedDiscount.code} applied ({appliedDiscount.percent}% off total)
                  </p>
                )}
                {promoError && (
                  <p className="text-xs text-rose-600 mt-1">{promoError}</p>
                )}
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-stone-100 rounded-xl p-4 space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Base rate ({adults} Adults {children > 0 ? `+ ${children} Children` : ''}):</span>
                  <span>{formatPrice((basePricePerPerson * adults) + (basePricePerPerson * 0.75 * children), currentCurrency)}</span>
                </div>
                {(gondolaAddon || shikaraDinnerAddon || katraAddon) && (
                  <div className="flex justify-between">
                    <span>Selected Enhancements:</span>
                    <span>+{formatPrice(gondolaCost + shikaraDinnerCost + katraCost, currentCurrency)}</span>
                  </div>
                )}
                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Savings ({appliedDiscount.code}):</span>
                    <span>-{formatPrice(discountAmountUSD, currentCurrency)}</span>
                  </div>
                )}
                <div className="border-t border-stone-200 pt-2 flex justify-between items-baseline font-bold text-stone-900 text-sm">
                  <span>Total Package Price:</span>
                  <span className="font-serif-display text-xl text-stone-900">
                    {formatPrice(totalUSD, currentCurrency)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-900 font-semibold bg-emerald-50 p-2 rounded-lg mt-2">
                  <span>Advance Token Amount (20%):</span>
                  <span>{formatPrice(depositDueUSD, currentCurrency)}</span>
                </div>
              </div>

              {/* Guarantee Note */}
              <div className="flex items-start space-x-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  No cancellation charges up to 15 days prior to arrival. TripVora on-ground manager will assist with cab, hotel check-ins, and passes.
                </span>
              </div>

              {/* Submit CTA */}
              <button
                id="booking-confirm-submit-btn"
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{submitting ? 'Confirming with Srinagar Team...' : 'Confirm Holiday Booking Request'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Booking Confirmation Screen */
            <div className="text-center py-6 px-4 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
                  Booking Request Dispatched
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
                  Welcome to Kashmir, {fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  Your booking reference is <strong className="text-stone-900 font-mono bg-stone-100 px-2 py-0.5 rounded">{bookingRef}</strong>.
                  A TripVora specialist will call you on <strong>{phone}</strong> and email the detailed hotel voucher to <strong>{email}</strong>.
                </p>
                <p className="text-xs text-emerald-700 font-medium pt-1">
                  Inquiry logged and routed to <strong>peerhazim98@gmail.com</strong>.
                </p>
              </div>

              {/* WhatsApp Fast Track Button */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl max-w-md mx-auto space-y-2 text-stone-900">
                <div className="text-xs text-emerald-900 font-medium">
                  Forward this booking to our official WhatsApp helpline for instant token payment &amp; voucher:
                </div>
                <a
                  href={bookingWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Send to WhatsApp (7006644364)</span>
                </a>
              </div>

              {/* Summary Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Package:</span>
                  <span className="font-bold text-stone-900">{tour.title}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Travel Dates:</span>
                  <span className="font-bold text-stone-900">{currentDep?.startDate} - {currentDep?.endDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Travelers:</span>
                  <span className="font-bold text-stone-900">{adults} Adults {children > 0 ? `, ${children} Children` : ''}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Total Amount:</span>
                  <span className="font-bold text-stone-900">{formatPrice(totalUSD, currentCurrency)}</span>
                </div>
                <div className="flex justify-between py-1 text-emerald-700 font-semibold">
                  <span>Status:</span>
                  <span>Provisional Hold (TripVora Team Calling Shortly)</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-stone-600" />
                  <span>Download / Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Return to Journeys
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
