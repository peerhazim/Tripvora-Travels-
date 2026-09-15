import React from 'react';

interface TripVoraLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  highlighted?: boolean;
  showText?: boolean;
  textColor?: 'dark' | 'light' | 'auto';
  variant?: 'emblem' | 'badge' | 'minimal';
}

export const TripVoraLogo: React.FC<TripVoraLogoProps> = ({
  className = '',
  size = 'md',
  highlighted = true,
  showText = false,
  textColor = 'auto',
  variant = 'emblem',
}) => {
  // Dimension presets
  const sizeMap = {
    sm: { box: 'w-9 h-9', icon: 36 },
    md: { box: 'w-12 h-12', icon: 48 },
    lg: { box: 'w-20 h-20', icon: 80 },
    xl: { box: 'w-28 h-28', icon: 112 },
    hero: { box: 'w-40 h-40', icon: 160 },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center space-x-3 ${className}`}>
      {/* Emblem SVG Container */}
      <div className={`relative ${currentSize.box} flex-shrink-0 flex items-center justify-center select-none`}>
        {/* Luminous Glow Halo if Highlighted */}
        {highlighted && (
          <>
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-400/50 via-emerald-500/40 to-amber-300/50 blur-md opacity-85 group-hover:opacity-100 transition-opacity animate-pulse" />
            <div className="absolute inset-0 rounded-full border-2 border-amber-400/60 pointer-events-none shadow-inner" />
          </>
        )}

        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="w-full h-full drop-shadow-lg relative z-10"
        >
          <defs>
            {/* Emerald Jewel Gradient */}
            <linearGradient id="tv_emerald_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#065F46" />
              <stop offset="40%" stopColor="#047857" />
              <stop offset="85%" stopColor="#022C22" />
              <stop offset="100%" stopColor="#011B14" />
            </linearGradient>

            {/* Inner Sky / Horizon Radial Gradient */}
            <radialGradient id="tv_sky_radial" cx="50%" cy="45%" r="48%">
              <stop offset="0%" stopColor="#0F766E" />
              <stop offset="50%" stopColor="#065F46" />
              <stop offset="100%" stopColor="#022C22" />
            </radialGradient>

            {/* Kashmir Saffron Gold Gradient */}
            <linearGradient id="tv_gold_gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="25%" stopColor="#D97706" />
              <stop offset="60%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>

            {/* Metallic Engraved Gold Border Gradient */}
            <linearGradient id="tv_bezel_gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="30%" stopColor="#D97706" />
              <stop offset="65%" stopColor="#F59E0B" />
              <stop offset="90%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>

            {/* Snow Peak White / Ice Gradient */}
            <linearGradient id="tv_snow_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>

            {/* Sun Rays Radial */}
            <radialGradient id="tv_sun_glow" cx="50%" cy="40%" r="35%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </radialGradient>

            {/* Engraved Text Drop Shadow Filter */}
            <filter id="tv_engrave_shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0.8" stdDeviation="0.4" floodColor="#000000" floodOpacity="0.9" />
            </filter>

            {/* Circular Path for Upper Engraved Text "TRIPVORA TRAVELS" */}
            <path id="tv_top_arch_path" d="M 13,50 A 37,37 0 0,1 87,50" fill="none" />

            {/* Circular Path for Lower Engraved Text "★ KASHMIR & LADAKH ★" */}
            <path id="tv_bottom_arch_path" d="M 15,50 A 36,36 0 0,0 85,50" fill="none" />
          </defs>

          {/* ================================================================= */}
          {/* 1. OUTER ENGRAVED MEDALLION BEZEL */}
          {/* ================================================================= */}
          {/* Outer Gold Rim with Coin-Edge Knurling */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="#011B14"
            stroke="url(#tv_bezel_gold)"
            strokeWidth="2.5"
          />

          {/* Outer Bezel Ring (Engraved Band for Text) */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="url(#tv_emerald_gradient)"
            stroke="url(#tv_gold_gradient)"
            strokeWidth="0.8"
          />

          {/* Decorative Inner Bezel Ring */}
          <circle
            cx="50"
            cy="50"
            r="33"
            fill="url(#tv_sky_radial)"
            stroke="url(#tv_gold_gradient)"
            strokeWidth="1.2"
          />

          {/* Dotted Heritage Filigree Accent between Rings */}
          <circle
            cx="50"
            cy="50"
            r="34.5"
            fill="none"
            stroke="url(#tv_gold_gradient)"
            strokeWidth="0.5"
            strokeDasharray="1.5 1.5"
            opacity="0.7"
          />

          {/* ================================================================= */}
          {/* 2. ENGRAVED CURVED TEXT ON MEDALLION BEZEL */}
          {/* ================================================================= */}
          {/* TOP ENGRAVED TEXT: "TRIPVORA TRAVELS" */}
          <text
            filter="url(#tv_engrave_shadow)"
            fill="url(#tv_gold_gradient)"
            stroke="#78350F"
            strokeWidth="0.3"
            fontSize="6.8"
            fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
            fontWeight="900"
            letterSpacing="1.8"
            textAnchor="middle"
          >
            <textPath
              href="#tv_top_arch_path"
              xlinkHref="#tv_top_arch_path"
              startOffset="50%"
            >
              TRIPVORA TRAVELS
            </textPath>
          </text>

          {/* BOTTOM ENGRAVED TEXT: "★ KASHMIR • LADAKH ★" */}
          <text
            filter="url(#tv_engrave_shadow)"
            fill="url(#tv_gold_gradient)"
            fontSize="4.4"
            fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
            fontWeight="800"
            letterSpacing="1.4"
            textAnchor="middle"
            opacity="0.95"
          >
            <textPath
              href="#tv_bottom_arch_path"
              xlinkHref="#tv_bottom_arch_path"
              startOffset="50%"
            >
              ★ KASHMIR • LADAKH ★
            </textPath>
          </text>

          {/* Small Gold Stars on Left & Right Flanks */}
          <circle cx="12" cy="50" r="1.4" fill="url(#tv_gold_gradient)" />
          <circle cx="88" cy="50" r="1.4" fill="url(#tv_gold_gradient)" />

          {/* ================================================================= */}
          {/* 3. INNER ARTWORK: GONDOLA, CHINAR LEAF & SNOW MOUNTAIN PEAK */}
          {/* ================================================================= */}
          {/* Rising Golden Sun behind Peak */}
          <circle cx="50" cy="38" r="16" fill="url(#tv_sun_glow)" />
          <circle cx="50" cy="38" r="8.5" fill="url(#tv_gold_gradient)" opacity="0.85" />

          {/* Majestic Himalayan Snow Mountain Peak (Apharwat / Pir Panjal) */}
          {/* Flanking Ridge - Left */}
          <polygon
            points="22,68 35,42 48,68"
            fill="#064E3B"
          />
          {/* Flanking Ridge - Right */}
          <polygon
            points="52,68 65,42 78,68"
            fill="#047857"
          />

          {/* Central Apharwat Snow Mountain Peak */}
          {/* Shaded Right Face */}
          <polygon
            points="50,26 50,68 74,68"
            fill="#065F46"
          />
          {/* Sunlit Left Face */}
          <polygon
            points="50,26 26,68 50,68"
            fill="#0D9488"
          />

          {/* Crisp Glacial Snow-Cap on the Peak */}
          <polygon
            points="50,26 42,39 46,37 50,42 53,38 57,41 50,26"
            fill="url(#tv_snow_gradient)"
            filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.35))"
          />
          <polygon
            points="35,42 31,49 34,47 35,50 37,47 39,49"
            fill="url(#tv_snow_gradient)"
          />
          <polygon
            points="65,42 61,49 63,47 65,50 67,47 69,49"
            fill="url(#tv_snow_gradient)"
          />

          {/* ------------------------------------------------------------- */}
          {/* GULMARG GONDOLA (Asia's Highest Cable Car ascending Peak) */}
          {/* ------------------------------------------------------------- */}
          {/* Gondola Cable Wire stretching across the mountain */}
          <line
            x1="28"
            y1="54"
            x2="74"
            y2="33"
            stroke="url(#tv_gold_gradient)"
            strokeWidth="1"
            strokeDasharray="none"
            opacity="0.9"
          />

          {/* Gondola Cable Pylon Wheel Pulley on the wire */}
          <circle cx="61" cy="39" r="1.4" fill="#FEF08A" stroke="#78350F" strokeWidth="0.4" />
          
          {/* Gondola Cabin Suspension Hanger Arm */}
          <path
            d="M 61,39 L 61,44 L 62.5,45.5"
            stroke="url(#tv_gold_gradient)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />

          {/* Gondola Cabin Body (Gulmarg Gold & Red Cabin) */}
          <g filter="url(#tv_engrave_shadow)">
            {/* Cabin Outer Shell */}
            <rect
              x="57.5"
              y="45.5"
              width="10"
              height="8.5"
              rx="2.2"
              fill="url(#tv_gold_gradient)"
              stroke="#78350F"
              strokeWidth="0.6"
            />
            {/* Panoramic Tinted Glass Window */}
            <rect
              x="58.8"
              y="46.8"
              width="7.4"
              height="4"
              rx="1.1"
              fill="#022C22"
            />
            {/* Window Glass Reflection Line */}
            <path
              d="M 59.5,49.8 L 61.5,47.3"
              stroke="#FEF08A"
              strokeWidth="0.6"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Cabin Door Line */}
            <line
              x1="62.5"
              y1="46.8"
              x2="62.5"
              y2="53"
              stroke="#78350F"
              strokeWidth="0.4"
            />
            {/* Cabin Under-chassis Base Accent */}
            <rect
              x="59"
              y="53.2"
              width="7"
              height="0.8"
              rx="0.4"
              fill="#78350F"
            />
          </g>

          {/* ------------------------------------------------------------- */}
          {/* ROYAL KASHMIRI CHINAR LEAF (Center-Left at base of Mountain) */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(42, 47) scale(0.46) translate(-12, -12)">
            <path
              d="M12 2C11.5 2 11 2.4 10.8 3L10 4.8C9.4 4.6 8.7 4.6 8 4.9C7.2 5.2 6.5 5.8 6.1 6.6L3.8 7C3.1 7.1 2.5 7.8 2.6 8.6C2.7 9.2 3 9.7 3.5 10.1L5.3 11.3C5 12.1 5 13 5.4 13.8C5.8 14.5 6.4 15 7.2 15.2L6.7 17.5C6.5 18.3 7 19.1 7.8 19.3C8.3 19.4 8.8 19.3 9.3 19L11.2 17.7V21.5C11.2 22.1 11.7 22.5 12.2 22.5C12.8 22.5 13.2 22.1 13.2 21.5V17.7L15.2 19C15.6 19.3 16.1 19.4 16.6 19.3C17.4 19.1 17.9 18.3 17.7 17.5L17.2 15.2C18 15 18.6 14.5 19 13.8C19.4 13 19.4 12.1 19.1 11.3L20.9 10.1C21.4 9.7 21.7 9.2 21.8 8.6C21.9 7.8 21.3 7.1 20.6 7L18.3 6.6C17.9 5.8 17.2 5.2 16.4 4.9C15.7 4.6 15 4.6 14.4 4.8L13.6 3C13.4 2.4 12.9 2 12.4 2H12Z"
              fill="url(#tv_gold_gradient)"
              stroke="#78350F"
              strokeWidth="0.7"
              filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.6))"
            />
          </g>

          {/* ------------------------------------------------------------- */}
          {/* WARM HOSPITALITY & TRUST HANDSHAKE (Below Chinar & Gondola) */}
          {/* ------------------------------------------------------------- */}
          <g id="tv_handshake_group" filter="url(#tv_engrave_shadow)">
            {/* Dark background contrast badge for clean legibility */}
            <path
              d="M 29,66 C 29,61.5 71,61.5 71,66 C 71,70.5 29,70.5 29,66 Z"
              fill="#011B14"
              opacity="0.85"
            />
            {/* Subtle Gold Outer Border for Handshake Plaque */}
            <path
              d="M 29,66 C 29,61.5 71,61.5 71,66 C 71,70.5 29,70.5 29,66 Z"
              fill="none"
              stroke="url(#tv_gold_gradient)"
              strokeWidth="0.6"
              opacity="0.75"
            />

            {/* Left Cuff (Traveler arriving in Kashmir) */}
            <path
              d="M 30.5,64.2 L 34.5,61.8 L 36.5,67.2 L 32.5,69.6 Z"
              fill="#064E3B"
              stroke="url(#tv_gold_gradient)"
              strokeWidth="0.6"
            />
            <line x1="32.5" y1="62.8" x2="34.5" y2="68.2" stroke="url(#tv_bezel_gold)" strokeWidth="0.5" />

            {/* Right Cuff (Native Kashmiri Host / Tour Guide) */}
            <path
              d="M 69.5,64.2 L 65.5,61.8 L 63.5,67.2 L 67.5,69.6 Z"
              fill="#064E3B"
              stroke="url(#tv_gold_gradient)"
              strokeWidth="0.6"
            />
            <line x1="67.5" y1="62.8" x2="65.5" y2="68.2" stroke="url(#tv_bezel_gold)" strokeWidth="0.5" />

            {/* Left Hand Body (Reaching from left to center) */}
            <path
              d="M 34.5,62.4 L 42.5,62.8 C 44.5,62.9 46.5,62.4 48,61.5 C 49.2,60.8 50.4,61.3 49.8,62.5 C 48.8,64.2 46.8,65.2 43.8,65.8 L 36.5,66.6 Z"
              fill="url(#tv_gold_gradient)"
              stroke="#78350F"
              strokeWidth="0.5"
            />

            {/* Right Hand Body (Reaching from right to center) */}
            <path
              d="M 65.5,62.4 L 57.5,62.8 C 55.5,62.9 53.5,62.4 52,61.5 C 50.8,60.8 49.6,61.3 50.2,62.5 C 51.2,64.2 53.2,65.2 56.2,65.8 L 63.5,66.6 Z"
              fill="url(#tv_gold_gradient)"
              stroke="#78350F"
              strokeWidth="0.5"
            />

            {/* Interlocked Finger Grips (4 fingers clasped firmly) */}
            {/* Finger 1 */}
            <rect x="45.5" y="64.5" width="2.2" height="4.4" rx="1.1" fill="url(#tv_gold_gradient)" stroke="#78350F" strokeWidth="0.35" />
            {/* Finger 2 */}
            <rect x="48" y="64.8" width="2.2" height="4.4" rx="1.1" fill="url(#tv_gold_gradient)" stroke="#78350F" strokeWidth="0.35" />
            {/* Finger 3 */}
            <rect x="50.5" y="64.8" width="2.2" height="4.4" rx="1.1" fill="url(#tv_gold_gradient)" stroke="#78350F" strokeWidth="0.35" />
            {/* Finger 4 */}
            <rect x="53" y="64.5" width="2.2" height="4.4" rx="1.1" fill="url(#tv_gold_gradient)" stroke="#78350F" strokeWidth="0.35" />

            {/* Left Thumb curved gently over the grip */}
            <path
              d="M 42.5,62.8 C 45,62.2 48,62 49.8,62.9 C 50.5,63.4 50,64.2 49.2,64.2 C 47.2,64.2 44.8,63.8 42.5,63.6 Z"
              fill="#FEF08A"
              stroke="#78350F"
              strokeWidth="0.4"
            />

            {/* Handshake Label Micro-Subtext (Mehmaan Nawazi & Trust) */}
            <circle cx="50" cy="62.5" r="0.6" fill="#78350F" />
          </g>

          {/* Dal Lake Shikara Crescent Hull Base */}
          <path
            d="M24 67 C36 73, 64 73, 76 67 C70 74, 30 74, 24 67 Z"
            fill="url(#tv_gold_gradient)"
            stroke="#92400E"
            strokeWidth="0.5"
          />

          {/* Dal Lake Water Ripples */}
          <path
            d="M28 71.5 C38 73.5, 62 73.5, 72 71.5"
            stroke="url(#tv_gold_gradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* ================================================================= */}
          {/* 4. ENGRAVED HORIZONTAL PLAQUE (Ensures Legibility at all sizes) */}
          {/* ================================================================= */}
          <g filter="url(#tv_engrave_shadow)">
            {/* Plaque Plate Background */}
            <rect
              x="16"
              y="74"
              width="68"
              height="11"
              rx="3"
              fill="#011B14"
              stroke="url(#tv_bezel_gold)"
              strokeWidth="0.9"
            />
            {/* Inner Plaque Inset */}
            <rect
              x="18"
              y="75.5"
              width="64"
              height="8"
              rx="2"
              fill="#047857"
              opacity="0.4"
            />
            {/* Direct Engraved Text */}
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#FFFFFF"
              stroke="#78350F"
              strokeWidth="0.25"
              fontSize="5.4"
              fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
              fontWeight="900"
              letterSpacing="1.2"
            >
              TRIPVORA TRAVELS
            </text>
          </g>
        </svg>
      </div>

      {/* Typography Lockup (Optional) */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center space-x-1.5">
            <span
              className={`font-serif-display font-black tracking-wider uppercase text-lg sm:text-xl leading-none ${
                textColor === 'light'
                  ? 'text-white'
                  : textColor === 'dark'
                  ? 'text-stone-900'
                  : 'text-stone-900 dark:text-white'
              }`}
            >
              TRIPVORA
            </span>
            <span className="text-emerald-700 font-bold tracking-widest text-xs uppercase">
              TRAVELS
            </span>
            {highlighted && (
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-tight">
                Engraved Seal
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-[0.22em] text-stone-500 font-semibold uppercase mt-1">
            Kashmir &amp; Ladakh Specialist
          </span>
        </div>
      )}
    </div>
  );
};
