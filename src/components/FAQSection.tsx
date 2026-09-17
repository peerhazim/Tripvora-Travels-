import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { FAQS } from '../data/tours';
import { ChinarLeafIcon } from './ChinarLeafIcon';

interface FAQSectionProps {
  onOpenConsultation?: () => void;
}

// Distinct, vibrant Kashmir-inspired color schemes for each question and each answer
interface FAQColorScheme {
  id: string;
  themeName: string;
  // Question Colors
  cardBorder: string;
  qBg: string;
  qText: string;
  qHover: string;
  qBadgeBg: string;
  qBadgeText: string;
  qBadgeBorder: string;
  qIconColor: string;
  // Answer Colors (Distinctly different from question color)
  aBg: string;
  aBorderTop: string;
  aText: string;
  aBadgeBg: string;
  aBadgeText: string;
  aBadgeBorder: string;
  aIconColor: string;
  aAccentBar: string;
}

const FAQ_COLOR_SCHEMES: FAQColorScheme[] = [
  {
    id: 'saffron-indigo',
    themeName: 'Pampore Saffron × Apharwat Indigo',
    cardBorder: 'border-amber-300 hover:border-amber-400',
    qBg: 'bg-gradient-to-r from-amber-50 via-amber-50/70 to-amber-100/40',
    qText: 'text-amber-900 hover:text-amber-950',
    qHover: 'hover:bg-amber-100/60',
    qBadgeBg: 'bg-amber-500',
    qBadgeText: 'text-white',
    qBadgeBorder: 'border-amber-600',
    qIconColor: 'text-amber-700',
    // Answer in Deep Apharwat Indigo
    aBg: 'bg-indigo-50/80',
    aBorderTop: 'border-indigo-300',
    aText: 'text-indigo-950',
    aBadgeBg: 'bg-indigo-600 text-white',
    aBadgeText: 'text-indigo-100',
    aBadgeBorder: 'border-indigo-400',
    aIconColor: 'text-indigo-600',
    aAccentBar: 'bg-indigo-500',
  },
  {
    id: 'emerald-terracotta',
    themeName: 'Dal Lake Emerald × Shalimar Terracotta',
    cardBorder: 'border-emerald-300 hover:border-emerald-400',
    qBg: 'bg-gradient-to-r from-emerald-50 via-emerald-50/70 to-emerald-100/40',
    qText: 'text-emerald-950 hover:text-emerald-900',
    qHover: 'hover:bg-emerald-100/60',
    qBadgeBg: 'bg-emerald-600',
    qBadgeText: 'text-white',
    qBadgeBorder: 'border-emerald-700',
    qIconColor: 'text-emerald-700',
    // Answer in Warm Terracotta / Rust
    aBg: 'bg-orange-50/80',
    aBorderTop: 'border-orange-300',
    aText: 'text-orange-950',
    aBadgeBg: 'bg-orange-600 text-white',
    aBadgeText: 'text-orange-100',
    aBadgeBorder: 'border-orange-400',
    aIconColor: 'text-orange-600',
    aAccentBar: 'bg-orange-500',
  },
  {
    id: 'sapphire-saffron',
    themeName: 'Kashmir Royal Blue × Marigold Gold',
    cardBorder: 'border-blue-300 hover:border-blue-400',
    qBg: 'bg-gradient-to-r from-blue-50 via-blue-50/70 to-blue-100/40',
    qText: 'text-blue-950 hover:text-blue-900',
    qHover: 'hover:bg-blue-100/60',
    qBadgeBg: 'bg-blue-600',
    qBadgeText: 'text-white',
    qBadgeBorder: 'border-blue-700',
    qIconColor: 'text-blue-700',
    // Answer in Saffron Marigold Gold
    aBg: 'bg-amber-50/80',
    aBorderTop: 'border-amber-300',
    aText: 'text-amber-950',
    aBadgeBg: 'bg-amber-600 text-white',
    aBadgeText: 'text-amber-100',
    aBadgeBorder: 'border-amber-400',
    aIconColor: 'text-amber-600',
    aAccentBar: 'bg-amber-500',
  },
  {
    id: 'rose-teal',
    themeName: 'Kashmiri Rose Ruby × Lidder Teal',
    cardBorder: 'border-rose-300 hover:border-rose-400',
    qBg: 'bg-gradient-to-r from-rose-50 via-rose-50/70 to-rose-100/40',
    qText: 'text-rose-950 hover:text-rose-900',
    qHover: 'hover:bg-rose-100/60',
    qBadgeBg: 'bg-rose-600',
    qBadgeText: 'text-white',
    qBadgeBorder: 'border-rose-700',
    qIconColor: 'text-rose-700',
    // Answer in Lidder Glacial Teal
    aBg: 'bg-teal-50/80',
    aBorderTop: 'border-teal-300',
    aText: 'text-teal-950',
    aBadgeBg: 'bg-teal-600 text-white',
    aBadgeText: 'text-teal-100',
    aBadgeBorder: 'border-teal-400',
    aIconColor: 'text-teal-600',
    aAccentBar: 'bg-teal-500',
  },
  {
    id: 'amethyst-spring',
    themeName: 'Nishat Amethyst Purple × Spring Green',
    cardBorder: 'border-purple-300 hover:border-purple-400',
    qBg: 'bg-gradient-to-r from-purple-50 via-purple-50/70 to-purple-100/40',
    qText: 'text-purple-950 hover:text-purple-900',
    qHover: 'hover:bg-purple-100/60',
    qBadgeBg: 'bg-purple-600',
    qBadgeText: 'text-white',
    qBadgeBorder: 'border-purple-700',
    qIconColor: 'text-purple-700',
    // Answer in Spring Emerald Green
    aBg: 'bg-emerald-50/80',
    aBorderTop: 'border-emerald-300',
    aText: 'text-emerald-950',
    aBadgeBg: 'bg-emerald-600 text-white',
    aBadgeText: 'text-emerald-100',
    aBadgeBorder: 'border-emerald-400',
    aIconColor: 'text-emerald-600',
    aAccentBar: 'bg-emerald-500',
  },
  {
    id: 'cyan-plum',
    themeName: 'Pangong Cyan × Mulberry Plum',
    cardBorder: 'border-cyan-300 hover:border-cyan-400',
    qBg: 'bg-gradient-to-r from-cyan-50 via-cyan-50/70 to-cyan-100/40',
    qText: 'text-cyan-950 hover:text-cyan-900',
    qHover: 'hover:bg-cyan-100/60',
    qBadgeBg: 'bg-cyan-600',
    qBadgeText: 'text-white',
    qBadgeBorder: 'border-cyan-700',
    qIconColor: 'text-cyan-700',
    // Answer in Mulberry Plum
    aBg: 'bg-fuchsia-50/80',
    aBorderTop: 'border-fuchsia-300',
    aText: 'text-fuchsia-950',
    aBadgeBg: 'bg-fuchsia-600 text-white',
    aBadgeText: 'text-fuchsia-100',
    aBadgeBorder: 'border-fuchsia-400',
    aIconColor: 'text-fuchsia-600',
    aAccentBar: 'bg-fuchsia-500',
  },
  {
    id: 'chinar-sky',
    themeName: 'Autumn Chinar Terracotta × Himalayan Sky',
    cardBorder: 'border-orange-300 hover:border-orange-400',
    qBg: 'bg-gradient-to-r from-orange-50 via-orange-50/70 to-orange-100/40',
    qText: 'text-orange-950 hover:text-orange-900',
    qHover: 'hover:bg-orange-100/60',
    qBadgeBg: 'bg-orange-600',
    qBadgeText: 'text-white',
    qBadgeBorder: 'border-orange-700',
    qIconColor: 'text-orange-700',
    // Answer in Himalayan Sky Blue
    aBg: 'bg-sky-50/80',
    aBorderTop: 'border-sky-300',
    aText: 'text-sky-950',
    aBadgeBg: 'bg-sky-600 text-white',
    aBadgeText: 'text-sky-100',
    aBadgeBorder: 'border-sky-400',
    aIconColor: 'text-sky-600',
    aAccentBar: 'bg-sky-500',
  },
];

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenConsultation }) => {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Prominently Highlighted FAQ Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest mb-3 shadow-md bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-600 text-white border-2 border-white ring-4 ring-amber-400/20 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>HIGHLIGHTED • FREQUENTLY ASKED QUESTIONS</span>
            <ChinarLeafIcon className="w-3.5 h-3.5 text-white" />
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
          
          <div className="mt-3 inline-block px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-100 via-rose-100 to-emerald-100 border border-stone-200 text-xs sm:text-sm font-semibold text-stone-800 shadow-2xs">
            Every question and answer highlighted in distinct Kashmir palettes for effortless reading
          </div>

          <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Essential facts on weather seasons, Gulmarg Gondola Phase 1 &amp; 2 passes, Dal Lake deluxe houseboats, private sanitized cabs, and Mata Vaishno Devi Katra pilgrimage support.
          </p>
        </div>

        {/* FAQ Accordion List - Each Question with Different Color, Each Answer with Different Color */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            // Get color scheme for this index (cycling through predefined palettes)
            const scheme = FAQ_COLOR_SCHEMES[idx % FAQ_COLOR_SCHEMES.length];

            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 shadow-md ${scheme.cardBorder} ${
                  isOpen ? 'ring-2 ring-stone-900/10 shadow-lg' : 'hover:shadow-lg'
                }`}
              >
                {/* QUESTION HEADER - DISTINCT COLOR PER QUESTION */}
                <button
                  id={`faq-question-btn-${idx}`}
                  onClick={() => toggle(idx)}
                  className={`w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors cursor-pointer ${scheme.qBg} ${scheme.qHover}`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start space-x-3.5 pr-2">
                    {/* Unique Question Badge */}
                    <span 
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-xl font-bold text-xs shadow-sm flex-shrink-0 mt-0.5 border ${scheme.qBadgeBg} ${scheme.qBadgeText} ${scheme.qBadgeBorder}`}
                    >
                      Q{idx + 1}
                    </span>

                    {/* Question Title in Its Unique Color */}
                    <div>
                      <h3 className={`font-serif-display text-base sm:text-lg font-bold leading-snug tracking-tight ${scheme.qText}`}>
                        {faq.q}
                      </h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-75 inline-flex items-center space-x-1 mt-0.5" style={{ color: 'inherit' }}>
                        <span>•</span>
                        <span>{scheme.themeName}</span>
                      </span>
                    </div>
                  </div>

                  {/* Toggle Arrow */}
                  <div 
                    className={`w-8 h-8 rounded-full bg-white/80 border border-stone-200 flex items-center justify-center flex-shrink-0 transition-transform duration-300 shadow-2xs ${scheme.qIconColor} ${
                      isOpen ? 'rotate-180 bg-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* ANSWER CONTAINER - IN A DIFFERENT DISTINCT COLOR */}
                {isOpen && (
                  <div 
                    id={`faq-answer-box-${idx}`}
                    className={`p-5 text-xs sm:text-sm leading-relaxed border-t-2 ${scheme.aBorderTop} ${scheme.aBg} ${scheme.aText} transition-all duration-300`}
                  >
                    {/* Answer Header Pill with icon */}
                    <div className="flex items-center space-x-2 mb-2.5">
                      <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-2xs ${scheme.aBadgeBg} border ${scheme.aBadgeBorder}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>TripVora Verified Answer:</span>
                      </span>
                    </div>

                    {/* Answer Body Text */}
                    <p className="font-medium pl-1 leading-relaxed">
                      {faq.a}
                    </p>

                    {/* Direct Contact Prompt within Answer */}
                    <div className="mt-3 pt-2.5 border-t border-stone-200/50 flex flex-wrap items-center justify-between text-[11px] gap-2">
                      <span className="font-semibold opacity-90">
                        Need tailored guidance? Native team at:
                      </span>
                      <a
                        href="tel:+917006644364"
                        className="inline-flex items-center space-x-1 font-bold underline hover:opacity-80"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call +91 7006644364</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* On-Ground Help Callout Banner */}
        <div className="mt-12 p-6 bg-gradient-to-r from-amber-50 via-white to-emerald-50 border-2 border-emerald-300 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-lg">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center text-white shadow-md flex-shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-stone-900">
                Have a specific Kashmir, Ladakh or Katra question?
              </div>
              <div className="text-xs text-stone-600">
                Our native team in Srinagar, Sopore, Jammu and Kashmir is available 24/7.
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <a
              id="faq-helpline-call-btn"
              href="tel:+917006644364"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>+91 7006644364</span>
            </a>
            {onOpenConsultation && (
              <button
                id="faq-request-callback-btn"
                onClick={onOpenConsultation}
                className="px-4 py-2.5 bg-white hover:bg-stone-50 text-stone-900 border-2 border-stone-300 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Request Callback
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
