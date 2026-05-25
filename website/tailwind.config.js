/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:          '#040A12',
        bgDeep:      '#000000',
        bgCard:      '#0A1628',
        bgCardHover: '#0D1E38',

        brand:       '#00D4FF',
        brandStrong: '#00E0FF',
        brandPale:   '#C0F0FF',
        brandMid:    '#5A9AB5',
        brandDeep:   '#2A6885',
        brandVoid:   '#082B35',

        ink:         '#FFFFFF',
        inkMuted:    '#8AAEC0',
        inkFaint:    '#2A6885',

        labelBg1:    '#2E6A82',
        labelBg2:    '#357292',
        labelBg3:    '#28637E',

        line:        '#0D2438',
        warn:        '#FF8866',
        ok:          '#44CCBB',
      },
    },
  },
  plugins: [],
};
