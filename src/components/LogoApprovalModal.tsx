import React, { useState } from 'react';
import { 
  X, Check, Sparkles, Shield, Eye, ThumbsUp, Palette, 
  Layers, ArrowRight, Award, Mountain, Sun, Compass
} from 'lucide-react';
import { TripVoraLogo } from './TripVoraLogo';
import { ChinarLeafIcon } from './ChinarLeafIcon';

interface LogoApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  isApproved: boolean;
  onApprove: () => void;
  onRevoke: () => void;
}

export const LogoApprovalModal: React.FC<LogoApprovalModalProps> = ({
  isOpen,
  onClose,
  isApproved,
  onApprove,
  onRevoke,
}) => {
  const [activePreviewBg, setActivePreviewBg] = useState<'light' | 'dark' | 'emerald' | 'cream'>('light');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border-2 border-amber-300 max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Luxury Kashmir Accent */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white flex items-center justify-between relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 pointer-events-none">
            <ChinarLeafIcon className="w-full h-full text-white" />
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif-display text-xl font-bold tracking-tight text-white">
                  TripVora Travels Brand Identity Review
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 uppercase tracking-wider">
                  New Concept
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                Review the custom luxury vector emblem before applying it to the live website.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close review"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-800">
          
          {/* Main Showcase Showcase Canvas */}
          <div className="rounded-2xl border border-stone-200 overflow-hidden shadow-inner">
            {/* Background Switcher Toolbar */}
            <div className="bg-stone-100 px-4 py-2.5 flex items-center justify-between border-b border-stone-200 text-xs">
              <span className="font-semibold text-stone-600 flex items-center space-x-1.5">
                <Palette className="w-3.5 h-3.5 text-emerald-700" />
                <span>Test on Different Canvas Backgrounds:</span>
              </span>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setActivePreviewBg('light')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    activePreviewBg === 'light'
                      ? 'bg-white text-stone-900 shadow-xs border border-stone-300 font-bold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Crisp White
                </button>
                <button
                  onClick={() => setActivePreviewBg('cream')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    activePreviewBg === 'cream'
                      ? 'bg-[#FDFBF7] text-stone-900 shadow-xs border border-amber-200 font-bold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Warm Linen
                </button>
                <button
                  onClick={() => setActivePreviewBg('emerald')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    activePreviewBg === 'emerald'
                      ? 'bg-emerald-900 text-white shadow-xs font-bold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Deep Pine
                </button>
                <button
                  onClick={() => setActivePreviewBg('dark')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    activePreviewBg === 'dark'
                      ? 'bg-stone-900 text-white shadow-xs font-bold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Midnight Black
                </button>
              </div>
            </div>

            {/* Canvas Area */}
            <div
              className={`p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-around gap-8 transition-colors duration-300 ${
                activePreviewBg === 'light'
                  ? 'bg-white'
                  : activePreviewBg === 'cream'
                  ? 'bg-[#FAF7F0]'
                  : activePreviewBg === 'emerald'
                  ? 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-950 text-white'
                  : 'bg-stone-950 text-white'
              }`}
            >
              {/* Standalone Emblem with Golden Halo */}
              <div className="flex flex-col items-center text-center space-y-3">
                <TripVoraLogo size="hero" highlighted={true} />
                <span className="text-[11px] font-bold tracking-wider uppercase opacity-75">
                  High-Resolution Vector Emblem
                </span>
              </div>

              {/* Full Brand Typography Lockup */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
                <div className="p-4 rounded-2xl border border-dashed border-stone-300/40 bg-white/10 backdrop-blur-xs">
                  <TripVoraLogo
                    size="lg"
                    showText={true}
                    highlighted={true}
                    textColor={activePreviewBg === 'emerald' || activePreviewBg === 'dark' ? 'light' : 'dark'}
                  />
                </div>
                <div className="text-xs space-y-1 opacity-80 max-w-xs">
                  <div className="font-bold">Website Header &amp; Documents Lockup</div>
                  <div>Scales cleanly across mobile headers, website watermarks, and official booking invoices.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Symbolism & Design Architecture */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-stone-900 flex items-center space-x-2">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>Engraved Craftsmanship &amp; Authentic Kashmir Symbolism</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300 flex items-start space-x-3 sm:col-span-2">
                <div className="w-8 h-8 rounded-lg bg-amber-200 text-amber-950 flex items-center justify-center flex-shrink-0 font-black text-xs">
                  ★
                </div>
                <div className="text-xs">
                  <span className="font-bold text-amber-950 block">Engraved &quot;TRIPVORA TRAVELS&quot; Circular Arch &amp; Plaque</span>
                  <span className="text-amber-900 font-medium">
                    Precision-engraved lettering etched along the upper golden medallion bezel curve and mirrored on the lower embossed heraldic plaque, with &quot;★ KASHMIR • LADAKH ★&quot; along the bottom.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                  🚡
                </div>
                <div className="text-xs">
                  <span className="font-bold text-emerald-950 block">Gulmarg Gondola Cable Car</span>
                  <span className="text-emerald-800">
                    Traversing across the mountain on a golden cable wire, featuring the iconic suspension arm, panoramic tinted cabin windows, and aerodynamic shell.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center flex-shrink-0">
                  <ChinarLeafIcon className="w-4 h-4 text-amber-800" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-emerald-950 block">Royal Kashmiri Chinar Leaf</span>
                  <span className="text-emerald-800">
                    A pure saffron-gold five-lobed Chinar leaf centered at the foot of the mountain, embodying the indigenous soul and cultural heritage of Kashmir.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <Mountain className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-stone-900 block">Apharwat Snow Mountain Peak</span>
                  <span className="text-stone-600">
                    Crisp, dual-faceted Himalayan peak with pristine white glacial snow-caps rising majestically into the emerald sky.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                  🤝
                </div>
                <div className="text-xs">
                  <span className="font-bold text-amber-950 block">Warm Hospitality Handshake</span>
                  <span className="text-amber-900">
                    Clasped golden hands set directly beneath the Chinar and Gondola, symbolizing trust, traditional Kashmiri hospitality (Mehmaan Nawazi), and reliable guidance.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-stone-900 block">Dal Lake Shikara &amp; Sun Dawn</span>
                  <span className="text-stone-600">
                    A graceful golden crescent hull gliding on water ripples with a radiant rising sun reflecting warm Kashmiri hospitality.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Approval Status Banner */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between ${
            isApproved 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                isApproved ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
              }`}>
                {isApproved ? <Check className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-xs font-bold block">
                  {isApproved 
                    ? 'Status: Approved & Active across TripVora Website' 
                    : 'Status: Awaiting Your Review & Approval'}
                </span>
                <span className="text-[11px] opacity-80">
                  {isApproved 
                    ? 'The logo is currently highlighted in the Navigation bar, Footer, and Admin Portal.'
                    : 'Click "Approve & Apply to Website" below to activate it, or review first.'}
                </span>
              </div>
            </div>

            {isApproved && (
              <button
                onClick={onRevoke}
                className="text-xs font-medium text-emerald-800 hover:text-emerald-950 underline ml-4 cursor-pointer"
              >
                Revert to original
              </button>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            TripVora Travels • Registered Tour Operator Kashmir
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 font-medium text-xs transition-colors cursor-pointer"
            >
              Close Window
            </button>

            {!isApproved ? (
              <button
                onClick={() => {
                  onApprove();
                  onClose();
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 border border-emerald-600 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Approve &amp; Apply to Website</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Logo is Approved</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
