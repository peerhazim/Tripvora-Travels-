import React, { useState } from 'react';
import { X, Calendar, Phone, Check, Clock, User, ShieldCheck, MessageSquare } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destinationFocus, setDestinationFocus] = useState('Kashmir Valley & Houseboat');
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 - 13:00 IST)');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setSubmitting(true);

    try {
      await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'consultation',
          name: fullName,
          phone,
          email,
          destination: destinationFocus,
          notes: `Callback requested for: ${preferredTime}`
        })
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-800 to-emerald-700 text-white border-b border-emerald-600">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-200">
              TripVora Travel Advisory
            </span>
            <h3 className="font-serif-display text-xl font-bold text-white">
              Plan with Srinagar Specialists
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Quick Call Header Banner */}
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-2 text-stone-800 text-xs">
              <Phone className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>Direct Hotline: <strong className="text-stone-900">7006644364</strong></span>
            </div>
            <a
              href="tel:7006644364"
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition-colors"
            >
              Call Now
            </a>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                Connect directly with our local team in Srinagar for personalized routing, cab selection, houseboat bookings, and VIP Vaishno Devi Katra darshan guidance.
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="7006644364"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Destination Focus
                  </label>
                  <select
                    value={destinationFocus}
                    onChange={(e) => setDestinationFocus(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800"
                  >
                    <option>Kashmir Valley &amp; Houseboat</option>
                    <option>Ladakh &amp; Pangong Tso</option>
                    <option>Vaishno Devi Katra Holy Yatra</option>
                    <option>Kashmir + Ladakh Overland Circuit</option>
                    <option>Vaishno Devi + Kashmir Combo</option>
                    <option>Offbeat Gurez &amp; Doodhpathri</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Preferred Callback Time
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800"
                  >
                    <option>Morning (10:00 - 13:00 IST)</option>
                    <option>Afternoon (13:00 - 17:00 IST)</option>
                    <option>Evening (17:00 - 21:00 IST)</option>
                    <option>Immediate WhatsApp Chat</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Connecting...' : 'Request Specialist Callback'}
                </button>
              </div>

              <div className="flex items-center space-x-1.5 text-[11px] text-stone-500 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero service charges. Dispatched to peerhazim98@gmail.com</span>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="font-serif-display text-xl font-bold text-stone-900">
                Callback Scheduled
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you, {fullName}. A native holiday designer from TripVora Travels will call you on <strong>{phone}</strong> around {preferredTime}.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/917006644364?text=${encodeURIComponent(`Hi TripVora Travels, I requested a callback for ${destinationFocus}. My phone is ${phone}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start WhatsApp Chat (7006644364)</span>
                </a>
              </div>
              <div>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
