export type KashmirThemeId = 'chinar' | 'dal' | 'gulmarg' | 'pahalgam';

export interface KashmirThemeConfig {
  id: KashmirThemeId;
  name: string;
  nativeTitle: string;
  tagline: string;
  icon: string;
  primaryColor: string;
  accentColor: string;
  description: string;
}

export const KASHMIR_THEMES: Record<KashmirThemeId, KashmirThemeConfig> = {
  chinar: {
    id: 'chinar',
    name: 'Chinar Autumn',
    nativeTitle: 'Royal Bööyñ',
    tagline: 'Warm Terracotta Rust, Saffron Amber & Cedar Wood',
    icon: '🍁',
    primaryColor: '#c2410c', // Terracotta Rust
    accentColor: '#d97706', // Saffron Amber
    description: 'Inspired by the majestic autumn Chinar trees of Naseem Bagh & Char Chinar.',
  },
  dal: {
    id: 'dal',
    name: 'Dal Lake',
    nativeTitle: 'Jewel of Srinagar',
    tagline: 'Serene Emerald Waters, Cedar Houseboats & Lotus Blooms',
    icon: '🛶',
    primaryColor: '#047857', // Emerald water
    accentColor: '#b45309', // Cedar wood
    description: 'Inspired by tranquil Dal Lake waters, handcrafted Shikaras, and floating gardens.',
  },
  gulmarg: {
    id: 'gulmarg',
    name: 'Gulmarg Gondola',
    nativeTitle: 'Meadow of Flowers',
    tagline: 'Alpine Evergreen Pine, Apharwat Snow & Gondola Gold',
    icon: '🚠',
    primaryColor: '#15803d', // Alpine pine
    accentColor: '#ca8a04', // Gondola gold
    description: 'Inspired by snow-draped pine slopes, Apharwat Peak, and the famous Gondola cable car.',
  },
  pahalgam: {
    id: 'pahalgam',
    name: 'Pahalgam Lidder',
    nativeTitle: 'Valley of Shepherds',
    tagline: 'Glacial Lidder Turquoise, Deodar Fir & Mountain Mist',
    icon: '🌲',
    primaryColor: '#0e7490', // Glacier turquoise
    accentColor: '#166534', // Deodar fir
    description: 'Inspired by the rushing azure Lidder River, Betaab Valley, and Baisaran pine glades.',
  },
};
