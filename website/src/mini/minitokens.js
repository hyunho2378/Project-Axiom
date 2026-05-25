// Compatibility bridge for mini-render components
// Provides app-token interface backed by web.js values where they match

import { color, font } from '../tokens/web.js';

export const colors = {
  primary: {
    50:  '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: color.brand,       // #1D4ED8 — exact match
    800: '#1E3A8A',
    900: '#1E2D6B',
  },
  teal: {
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0D9488',
  },
  error:     '#EF4444',
  errorDark: '#DC2626',
  warning:   '#F59E0B',
  success:   color.ok,          // #10B981 — exact match
  gray: {
    50:  '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  surface: {
    background: color.bg,         // #F5F5F5
    card:       color.white,      // #FFFFFF — exact match
    darkCard:   color.brandStrong, // #1B4FD8 — exact match
    overlay:    'rgba(0,0,0,0.5)',
  },
  successBg:     '#F0FDF4',
  successBorder: '#BBF7D0',
  onDark: {
    primary:   '#FFFFFF',
    secondary: 'rgba(255,255,255,0.7)',
  },
};

export const typography = {
  fontFamily: font.family,
  size: {
    largeTitle:  '34px',
    balance:     '28px',
    balanceLarge:'36px',
    appTitle:    '22px',
    xl:  '20px',
    lg:  '18px',
    md:  '17px',
    sm:  '15px',
    xs:  '13px',
    xxs: '12px',
    nav: '11px',
  },
  weight: {
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
    black:    800,
  },
  lineHeight: {
    tight:  1.2,
    normal: 1.4,
    loose:  1.6,
  },
};

export const spacing = {
  1:  '4px',
  2:  '8px',
  3:  '12px',
  4:  '16px',
  5:  '20px',
  6:  '24px',
  8:  '32px',
  10: '40px',
  12: '48px',
};

export const layout = {
  columns:         4,
  gutter:          '8px',
  margin:          '16px',
  viewport:        '390px',
  topBarHeight:    '44px',
  bottomNavHeight: '83px',
  touchMin:        '44px',
  radiusCard:      '16px',
  radiusPill:      '999px',
  radiusChip:      '20px',
  radiusButton:    '12px',
  radiusModal:     '20px',
  radiusSmall:     '8px',
};

export const shadow = {
  card:   '0 2px 8px rgba(0,0,0,0.08)',
  modal:  '0 -4px 20px rgba(0,0,0,0.12)',
  button: '0 2px 6px rgba(29,78,216,0.25)',
  nav:    '0 -1px 0 rgba(0,0,0,0.08)',
};
