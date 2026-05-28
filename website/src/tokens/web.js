export const colors = {
  bg:           '#040A12',
  bgDeep:       '#000000',
  bgCard:       '#0A1628',
  bgCardHover:  '#0D1E38',

  brand:        '#00D4FF',
  brandStrong:  '#00E0FF',
  brandPale:    '#C0F0FF',
  brandMid:     '#5A9AB5',
  brandDeep:    '#2A6885',
  brandVoid:    '#082B35',

  ink:          '#FFFFFF',
  inkMuted:     '#8AAEC0',
  inkFaint:     '#2A6885',

  labelBg1:     '#2E6A82',
  labelBg2:     '#357292',
  labelBg3:     '#28637E',

  line:         '#0D2438',
  warn:         '#FF8866',
  ok:           '#44CCBB',

  white:        '#FFFFFF',
  black:        '#000000',
};

// backward-compat alias — existing components import { color }
export const color = colors;

export const font = {
  family: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', system-ui, sans-serif",
};

export const type = {
  display: { size: 'clamp(37px,5.4vw,80px)',   lh: 1.22, weight: 800, ls: '-0.04em' },
  h1:      { size: 'clamp(27px,3.75vw,53px)',  lh: 1.22, weight: 800, ls: '-0.03em' },
  h2:      { size: 'clamp(22px,2.67vw,40px)',  lh: 1.25, weight: 700, ls: '-0.02em' },
  h3:      { size: 'clamp(17px,1.58vw,23px)',  lh: 1.35, weight: 700, ls: '-0.01em' },
  lead:    { size: 'clamp(13px,1.17vw,17px)',  lh: 1.75, weight: 500 },
  body:    { size: 'clamp(11px,0.9vw,13px)',   lh: 1.78, weight: 500 },
  caption: { size: 'clamp(10px,0.76vw,11px)',  lh: 1.55, weight: 500 },
  eyebrow: { size: 'clamp(13px,1vw,16px)', lh: 1.4, weight: 800, ls: '0em', transform: 'uppercase' },
};

export const layout = {
  container: '1440px',
  gut:       'clamp(67px, 8.3vw, 133px)',
  sectionY:  'clamp(83px, 10.4vw, 167px)',
  rLg: 'clamp(12px, 1.5vw, 24px)',
  rMd: 'clamp(8px, 1vw, 16px)',
  rSm: 'clamp(4px, 0.5vw, 8px)',
};
