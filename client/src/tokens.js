/**
 * tokens.js — AXIOM Design System Tokens v2
 * 
 * 출처: 코드베이스 감사 실측값 기준
 * 규칙: 이 파일 외 색상·간격·폰트 하드코딩 전면 금지
 * 수정: 디자인 시스템 변경 시 이 파일만 수정
 */

// ─────────────────────────────────────────
// COLORS
// ─────────────────────────────────────────
export const colors = {

  // Void — 배경 계층 (깊이 순)
  void: {
    deepest:  '#000000',   // 절대 블랙 — Three.js 씬 배경
    deep:     '#03070a',   // 메인 페이지 배경
    base:     '#05080a',   // 표준 배경
    dark:     '#050505',   // Tailwind custom 'void'
    light:    '#0A0A0A',   // Tailwind custom 'void-light' — 카드 배경
    lighter:  '#121212',   // Tailwind custom 'void-lighter' — hover 배경
  },

  // Brand Blue — 브랜드 딥 블루 (3D blob 초기 ~ 중간 단계)
  brand: {
    900: '#082B35',   // blob Step 0~2, 글로우 기저
    800: '#0B3545',   // blob Step 3~4
    700: '#1E5672',   // blob Step 5~6, 브랜드 포인트
    600: '#2A6885',   // 주 액센트 — 버튼, 언더라인, 글로우
    500: '#3C7795',   // 보조 액센트
    400: '#5A9AB5',   // Mist — 보조 텍스트, 테두리, 네비게이션
    300: '#8AAEC0',   // 비활성 텍스트
    200: '#A0D4E8',   // blob Step 7~8 컬러
    100: '#C0F0FF',   // blob Step 9~10 컬러
  },

  // Neon — 최종 단계, 터미널, 강조
  neon: {
    cyan:      '#00D4FF',   // blob Step 10 emissive, Analysis 터미널, 주 글로우
    cyanBright:'#00E0FF',   // hover 강조, 선택 상태
  },

  // UI — 텍스트 & 테두리
  ui: {
    textPrimary:   '#FFFFFF',
    textSecondary: '#8AAEC0',   // brand.300
    textMuted:     '#5A9AB5',   // brand.400
    border:        '#222222',   // 기본 테두리 (YSL 기준: 아주 얇은 선)
    borderSubtle:  '#1E5672',   // brand.700 — 활성 테두리
    divider:       '#0B3545',   // brand.800
  },

  // Semantic
  semantic: {
    success: '#00D4FF',   // neon.cyan 재활용
    error:   '#FF4D4D',
    warning: '#FFB800',
  },
};

// ─────────────────────────────────────────
// TYPOGRAPHY
// ─────────────────────────────────────────
export const typography = {

  // 폰트 패밀리 — 2종 전용 (Playfair / 시스템폰트 전부 삭제)
  fontFamily: {
    titleEn: '"BentonModDisp", serif',            // 영문 타이틀 전용
    titleKo: '"Pretendard Variable", sans-serif', // 한글 타이틀 전용
    body:    '"Pretendard Variable", sans-serif', // 모든 본문 (영/한 공용)
    mono:    '"Pretendard Variable", sans-serif', // 코드 디스플레이도 Pretendard
  },

  // 폰트 웨이트
  weight: {
    regular:   400,   // 본문 (영문·한글 공통)
    semibold:  600,   // 타이틀 (영문·한글 공통)
  },

  // 행간 (line-height) — 4구간 분리
  // pt 환산 기준: 10pt→13 / 50pt→70 / 10pt→12 / 40pt→50
  lineHeight: {
    titleSmall: 1.3,    // 소형 타이틀 (~24px 이하)
    titleLarge: 1.4,    // 대형 타이틀 (32px 이상)
    bodySmall:  1.2,    // 소형 본문 (~14px 이하)
    bodyLarge:  1.25,   // 대형 본문 (16px 이상)
  },

  // 자간 (letter-spacing) — 전 사이즈 0
  letterSpacing: {
    title: '0em',
    body:  '0em',
  },

  // 사이즈 스케일 — Tailwind clamp 기준 (모바일 → 데스크탑)
  size: {
    display:  'clamp(80px, 12vw, 200px)',   // Hero AXIOM 로고타입
    h1:       'clamp(40px, 6vw, 80px)',
    h2:       'clamp(28px, 4vw, 56px)',
    h3:       'clamp(22px, 3vw, 40px)',
    h4:       'clamp(18px, 2.5vw, 28px)',
    bodyLg:   '18px',
    body:     '16px',
    bodySm:   '14px',
    caption:  '12px',
  },
};

// ─────────────────────────────────────────
// SPACING — 4pt 배수 시스템
// ─────────────────────────────────────────
export const spacing = {
  1:   '4px',
  2:   '8px',
  3:   '12px',
  4:   '16px',
  5:   '20px',
  6:   '24px',
  8:   '32px',
  10:  '40px',
  12:  '48px',
  16:  '64px',
  20:  '80px',
  24:  '96px',
  32:  '128px',
};

// ─────────────────────────────────────────
// LAYOUT
// ─────────────────────────────────────────
export const layout = {
  // 컨텐츠 컨테이너 (Hero 섹션 제외 전 페이지 적용)
  maxWidth:         '80rem',    // max-w-7xl (1280px)
  containerPadding: '1.5rem',  // px-6

  // 브레이크포인트
  breakpoints: {
    xs:  '320px',
    sm:  '390px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
    '2xl': '1440px',
    '3xl': '1920px',
    '4xl': '2560px',
  },

  // 그리드
  grid: {
    mobile:  { columns: 4,  margin: '16px', gutter: '8px' },
    tablet:  { columns: 8,  margin: '24px', gutter: '16px' },
    desktop: { columns: 12, maxContent: '1280px' },
    wide:    { columns: 12, maxContent: '1440px' },
  },

  // Home 스냅 스크롤 (Home 페이지 전용)
  snapScroll: {
    type: 'CSS scroll-snap',
    sections: 5,
    behavior: 'window-isolated',
  },
};

// ─────────────────────────────────────────
// SHADOW & GLOW
// ─────────────────────────────────────────
export const shadow = {
  // 글래스모피즘 카드
  glass: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05)',

  // 상품 카드 Hover 글로우
  productHover: '0 0 24px rgba(0, 212, 255, 0.15)',

  // 버튼 글로우 (primary)
  btnGlow: '0 0 20px rgba(42, 104, 133, 0.4)',

  // 네온 강조
  neonCyan: '0 0 32px rgba(0, 212, 255, 0.3)',

  // 3D blob 배경 글로우
  blobGlow: '0 0 80px rgba(8, 43, 53, 0.8)',
};

// ─────────────────────────────────────────
// ANIMATION
// ─────────────────────────────────────────
export const animation = {
  // 전환 기본값
  transition: {
    fast:    '150ms ease',
    default: '250ms ease',
    slow:    '400ms ease',
  },

  // 분석 로더 단계별 duration
  analysisLoader: {
    phase1: 1500,   // '피부 데이터를 수집하고 있습니다'
    phase2: 1500,   // '고유 피부 축을 분석하고 있습니다'
    phase3: 1500,   // '맞춤 솔루션을 구성하고 있습니다'
    total:  4500,   // 합계 4.5초
  },

  // 3D blob 진화 단계 (Step 0 = 초기, Step 10 = Final)
  blobEvolution: {
    steps: 10,
    colorStart:    '#082B35',
    colorMid:      '#1E5672',
    colorEnd:      '#00D4FF',
    emissiveStart: '#000000',
    emissiveEnd:   '#00D4FF',
    scaleStart:    1.0,
    scaleEnd:      3.5,    // 실측값 (CLAUDE.md 4.8과 불일치 — 실측 우선)
  },

  // Framer Motion / GSAP 공통 easing
  easing: {
    smooth: [0.25, 0.46, 0.45, 0.94],
    sharp:  [0.4, 0, 0.2, 1],
    spring: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

// ─────────────────────────────────────────
// GLASSMORPHISM — 재사용 스타일 템플릿
// ─────────────────────────────────────────
export const glass = {
  // 기본 글래스 카드
  card: {
    background:   'rgba(10, 10, 10, 0.6)',
    backdropBlur: '12px',
    border:       '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    shadow:       shadow.glass,
  },

  // 네비게이션 바
  nav: {
    background:   'rgba(3, 7, 10, 0.85)',
    backdropBlur: '20px',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  },
};