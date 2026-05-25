import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { IOSBottomNav, AndroidBottomNav } from '../mini/BottomNavBar.jsx';
import iosStatusBar from '../assets/11status-bar-ios.svg';
import androidStatusBar from '../assets/11status-bar-android.svg';

// [8] white swatch added to end of PRIMARY palette
const PRIMARY = [
  { token: 'p50',   hex: '#EFF6FF' },
  { token: 'p100',  hex: '#DBEAFE' },
  { token: 'p200',  hex: '#BFDBFE' },
  { token: 'p300',  hex: '#93C5FD' },
  { token: 'p400',  hex: '#60A5FA' },
  { token: 'p500',  hex: '#3B82F6' },
  { token: 'p600',  hex: '#2563EB' },
  { token: 'p700',  hex: '#1D4ED8', star: true },
  { token: 'p800',  hex: '#1E3A8A' },
  { token: 'p900',  hex: '#1E2D6B' },
  { token: 'white', hex: '#FFFFFF' },
];

const SEMANTIC = [
  { name: 'success', hex: '#10B981' },
  { name: 'warning', hex: '#F59E0B' },
  { name: 'error',   hex: '#EF4444' },
];

const SURFACE = [
  { name: 'background', hex: '#F2F4F8' },
  { name: 'card',       hex: '#FFFFFF' },
  { name: 'darkCard',   hex: '#1B4FD8' },
];

const GRAY = [
  { name: 'g300', hex: '#D1D5DB' },
  { name: 'g400', hex: '#9CA3AF' },
  { name: 'g500', hex: '#6B7280' },
  { name: 'g900', hex: '#111827' },
];

// [5] App typography scale (replaces web display/h1/h2... scale)
const TYPE_SCALE = [
  { label: 'largeTitle', spec: '34px / Bold 700',     size: '34px', weight: 700, sample: '287,500원' },
  { label: 'appTitle',   spec: '22px / Bold 700',     size: '22px', weight: 700, sample: '강릉페이' },
  { label: 'xl',         spec: '20px / SemiBold 600', size: '20px', weight: 600, sample: '이번 달 캐시백' },
  { label: 'lg',         spec: '18px / SemiBold 600', size: '18px', weight: 600, sample: '충전이 완료됐어요' },
  { label: 'md',         spec: '17px / Medium 500',   size: '17px', weight: 500, sample: '잔액을 충전해 주세요' },
  { label: 'sm',         spec: '15px / Regular 400',  size: '15px', weight: 400, sample: '가맹점 찾기' },
  { label: 'xs',         spec: '13px / Regular 400',  size: '13px', weight: 400, sample: '2026.03 결제내역' },
  { label: 'xxs',        spec: '12px / SemiBold 600', size: '12px', weight: 600, sample: '캐시백 적립' },
  { label: 'nav',        spec: '11px / Medium 500',   size: '11px', weight: 500, sample: '홈' },
];

const SPACING = [4, 8, 12, 16, 20, 24, 32, 40, 48];

const RADII = [
  { name: 'Small',         value: '8px' },
  { name: 'Button-iOS',    value: '12px' },
  { name: 'Card',          value: '16px' },
  { name: 'Modal-iOS',     value: '20px' },
  { name: 'Modal-Android', value: '28px' },
  { name: 'Pill',          value: '999px' },
];

const SHADOWS = [
  { name: 'Card',         value: '0 2px 8px rgba(0,0,0,0.08)' },
  { name: 'Button (iOS)', value: '0 2px 6px rgba(29,78,216,0.25)' },
  { name: 'Modal',        value: '0 -4px 20px rgba(0,0,0,0.12)' },
];

const PATTERNS = [
  {
    title: '입력 패턴',
    sub: '금액 칩 선택 → 직접 입력 → 확인 버튼 순서로 충전 화면 구성',
    steps: [
      '빠른금액 칩으로 프리셋 선택',
      '직접 입력 (iOS 둥근 테두리 / Android 회색+밑줄)',
      '하단 고정 주요 동작 버튼',
    ],
  },
  {
    title: '리스트 패턴',
    sub: 'MY 페이지·설정 화면의 메뉴·토글 행 구성',
    steps: [
      '섹션 헤더 (회색 배경, 굵은 글씨)',
      '메뉴 행: 라벨 + 화살표 + 값 (최소 44px)',
      '토글 행: 라벨 + 스위치 (최소 44px)',
    ],
  },
  {
    title: '인증 패턴',
    sub: '결제·환불 시 생체인증 오버레이 플로우',
    steps: [
      '바텀시트에서 "신청하기" 선택',
      '생체인증 오버레이 표시 (iOS 화면 중앙 / Android 화면 하단)',
      '인증 성공 → 결과 반영',
    ],
  },
  {
    title: '코치마크 패턴',
    sub: '첫 진입 시 기능 진입점을 단계별 안내',
    steps: [
      '이전에 봤는지 여부 확인 (세션 기반)',
      '스포트라이트 + 말풍선 순차 표시 (카드신청→충전→환불)',
      '다음/건너뛰기 → 완료 처리',
    ],
  },
  {
    title: '빈 상태 패턴',
    sub: '데이터 없음 상태에서 행동 유도',
    steps: [
      '일러스트 아이콘',
      '안내 메시지',
      '선택적 행동 유도 버튼',
    ],
  },
  {
    title: '피드백 패턴',
    sub: '액션 완료 후 결과 전달',
    steps: [
      'iOS: 전용 완료 화면 (체크 + 잔액 요약)',
      'Android: 하단 스낵바 "N원 환불이 완료됐어요" (2.8초)',
      'iOS에서 스낵바 호출해도 아무 반응 없음',
    ],
  },
];

const PLATFORM_SECTIONS = [
  {
    group: 'Button',
    rows: [
      { prop: '높이(lg)',        ios: '52px',               and: '48px' },
      { prop: 'radius',          ios: '12px',               and: '999px' },
      { prop: '그림자(filled)',   ios: '있음',               and: '없음' },
      { prop: 'touch target',    ios: '44px',               and: '48dp' },
    ],
  },
  {
    group: 'Header',
    rows: [
      { prop: '제목정렬',        ios: 'center',             and: 'left' },
      { prop: '폰트',            ios: 'Apple SD Gothic Neo', and: 'Noto Sans KR' },
    ],
  },
  {
    group: 'Bottom Sheet',
    rows: [
      { prop: '상단radius',      ios: '20px',               and: '28px' },
      { prop: 'overlay 불투명도', ios: 'rgba(0,0,0,0.5)',   and: 'rgba(0,0,0,0.32)' },
      { prop: '핸들너비',        ios: '40px',               and: '32px' },
      { prop: '핸들색',          ios: 'gray300',            and: 'gray400' },
    ],
  },
  {
    group: 'Filter Chip',
    rows: [
      { prop: 'radius',          ios: '999px',              and: '8px' },
      { prop: 'active 배경',     ios: 'primary700',         and: 'brandPale' },
      { prop: '체크마크',        ios: '없음',               and: '있음' },
    ],
  },
  {
    group: 'Bottom Navigation',
    rows: [
      { prop: 'active 표시',     ios: '색상만',             and: '56×28px pill' },
      { prop: '폰트',            ios: 'Apple',              and: 'Noto' },
    ],
  },
  {
    group: 'Search Input',
    rows: [
      { prop: 'radius',          ios: '999px',              and: '"8px 8px 0 0"' },
      { prop: '배경',            ios: 'white',              and: 'gray[100]' },
      { prop: '하단 border',     ios: '없음',               and: '있음' },
    ],
  },
  {
    group: 'Auth Overlay',
    rows: [
      { prop: '위치',            ios: '화면 중앙',          and: '화면 하단' },
      { prop: '배경',            ios: 'dark 원형',          and: 'transparent' },
      { prop: '텍스트',          ios: '없음',               and: '있음' },
    ],
  },
  {
    group: 'Status Bar',
    rows: [
      { prop: '높이',            ios: '41px',               and: '42px' },
      { prop: '폰트 크기',       ios: '17px',               and: '14px' },
    ],
  },
  {
    group: 'Snackbar',
    rows: [
      { prop: '표시 여부',       ios: '없음',               and: '있음' },
      { prop: '지속시간',        ios: '—',                  and: '2800ms' },
    ],
  },
];

const CONTRAST_PAIRS = [
  { name: '주요 본문',   fg: '#111827', bg: '#FFFFFF', ratio: '—',      pass: true  },
  { name: '보조 텍스트', fg: '#6B7280', bg: '#FFFFFF', ratio: '—',      pass: false },
  { name: 'CTA 버튼',   fg: '#FFFFFF', bg: '#1D4ED8', ratio: '8.59:1', pass: true  },
  { name: '비활성',      fg: '#9CA3AF', bg: '#FFFFFF', ratio: '—',      pass: false },
  { name: '다크카드',    fg: '#FFFFFF', bg: '#1B4FD8', ratio: '—',      pass: true  },
];

const LARGE_TEXT = [
  { token: 'largeTitle', base: '34px', large: '44px', rate: '+29%' },
  { token: 'lg',         base: '18px', large: '24px', rate: '+33%' },
  { token: 'md',         base: '17px', large: '22px', rate: '+29%' },
  { token: 'sm',         base: '15px', large: '20px', rate: '+33%' },
  { token: 'xs',         base: '13px', large: '17px', rate: '+31%' },
  { token: 'nav',        base: '11px', large: '14px', rate: '+27%' },
];

const CHECKLIST = [
  '최소 글자 크기 17px (md) 이상 권장',
  '터치 영역 48dp 이상 (Android)',
  '색상 대비 4.5:1 이상 (WCAG AA)',
  '큰글씨 모드 자동 대응 (약 1.29배)',
  '생체인증 대체 PIN 항상 제공',
];

const cardShadow = '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)';
const panelGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(4px,0.5vw,8px)' };
const eyebrowStyle = {
  fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
  letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
  color: color.brand, margin: '0 0 8px',
};
const subEyebrowStyle = { ...eyebrowStyle, color: color.inkFaint };
const h3Style = {
  fontSize: t.h3.size, fontWeight: t.h3.weight,
  lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
  color: color.ink, margin: '0 0 clamp(32px,4vw,56px)',
};
const sectionGap = { marginBottom: 'clamp(80px,10vw,140px)' };
const panelCard = {
  background: color.white, borderRadius: layout.rMd, padding: '20px',
  boxShadow: cardShadow,
};
const panelLabel = {
  fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
  letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
  color: color.inkFaint, marginBottom: 12,
};

function ColorSwatchCard({ title, items }) {
  return (
    <div style={{ background: color.white, borderRadius: layout.rMd, padding: 24, boxShadow: cardShadow }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map(item => (
          <div key={item.hex} style={{ flex: '1 1 80px' }}>
            <div style={{
              height: 56, borderRadius: layout.rSm, background: item.hex,
              border: (item.hex === '#FFFFFF' || item.hex === '#F2F4F8') ? `1px solid ${color.line}` : 'none',
              marginBottom: 6,
            }} />
            <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: color.ink }}>{item.name}</p>
            <p style={{ margin: 0, fontSize: t.caption.size, color: color.inkFaint }}>{item.hex}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DesignSystem() {
  const [headRef, headVisible] = useReveal({ threshold: 0.03 });
  const [foundRef, foundVisible] = useReveal({ threshold: 0.03 });
  const [compRef, compVisible] = useReveal({ threshold: 0.03 });
  const [patternRef, patternVisible] = useReveal({ threshold: 0.03 });
  const [platformRef, platformVisible] = useReveal({ threshold: 0.03 });
  const [a11yRef, a11yVisible] = useReveal({ threshold: 0.03 });

  return (
    <section
      id="design-system"
      style={{
        background: color.bg,
        fontFamily: font.family,
        padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>

        <div
          ref={headRef}
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(56px,7vw,96px)',
          }}
        >
          <p style={eyebrowStyle}>DESIGN SYSTEM</p>
          <h2 style={{ fontSize: t.h2.size, fontWeight: t.h2.weight, lineHeight: t.h2.lh, letterSpacing: t.h2.ls, color: color.ink, margin: '0 0 16px' }}>
            듀얼 디자인 시스템
          </h2>
          <p style={{ fontSize: t.lead.size, lineHeight: t.lead.lh, color: color.inkMuted, margin: 0 }}>
            HIG (iOS) · Google Material 3 (Android) · tokens.js 단일 출처
          </p>
        </div>

        {/* 01 FOUNDATION */}
        <div
          ref={foundRef}
          style={{
            opacity: foundVisible ? 1 : 0,
            transform: foundVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            ...sectionGap,
          }}
        >
          <p style={subEyebrowStyle}>01 FOUNDATION</p>
          <h3 style={h3Style}>기반 토큰</h3>

          {/* COLOR */}
          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>COLOR</p>

          {/* [4] paddingTop/Bottom added to give outlineOffset:2 on p700 breathing room */}
          <div style={{ overflowX: 'auto', marginBottom: 24 }}>
            <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 6, minWidth: 'max-content', paddingTop: 6, paddingBottom: 6 }}>
              {PRIMARY.map(item => (
                <div key={item.token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 'clamp(52px,6vw,80px)',
                    height: 'clamp(80px,10vw,120px)',
                    minWidth: 60,
                    background: item.hex,
                    borderRadius: layout.rSm,
                    outline: item.star ? `2px solid ${color.brand}` : 'none',
                    outlineOffset: item.star ? 2 : 0,
                    border: (item.hex === '#EFF6FF' || item.hex === '#FFFFFF') ? `1px solid ${color.line}` : 'none',
                  }} />
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: color.inkFaint, textAlign: 'center' }}>{item.token}</p>
                  <p style={{ margin: 0, fontSize: 10, color: color.inkFaint, textAlign: 'center' }}>{item.hex}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(8px,1.5vw,16px)', marginBottom: 'clamp(40px,5vw,64px)' }}>
            <ColorSwatchCard title="SEMANTIC" items={SEMANTIC} />
            <ColorSwatchCard title="SURFACE"  items={SURFACE} />
            <ColorSwatchCard title="GRAY"     items={GRAY} />
          </div>

          {/* [5][6] TYPOGRAPHY + SPACING side by side in 2-col grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px,2vw,32px)', marginBottom: 'clamp(40px,5vw,64px)', alignItems: 'start' }}>

            {/* Left: TYPOGRAPHY */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>TYPOGRAPHY</p>
              <div>
                {TYPE_SCALE.map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 12,
                      padding: 'clamp(10px,1.2vw,16px) 0',
                      borderBottom: `1px solid ${color.line}`,
                    }}
                  >
                    <div style={{ minWidth: 80, flexShrink: 0 }}>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: color.ink }}>{row.label}</p>
                      <p style={{ margin: 0, fontSize: 10, color: color.inkFaint, lineHeight: 1.5 }}>{row.spec}</p>
                    </div>
                    <span style={{
                      flex: 1,
                      fontSize: row.size,
                      fontWeight: row.weight,
                      lineHeight: 1.3,
                      color: color.ink,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      minWidth: 0,
                    }}>
                      {row.sample}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: SPACING */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>SPACING</p>
              <div>
                {SPACING.map(val => (
                  <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
                    <span style={{ fontSize: t.caption.size, fontWeight: 600, color: color.inkMuted, minWidth: 80 }}>spacing[{val}]</span>
                    <div style={{ height: 8, width: val, background: color.brand, borderRadius: 4, flexShrink: 0 }} />
                    <span style={{ fontSize: t.caption.size, color: color.inkFaint }}>{val}px</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BORDER RADIUS */}
          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>BORDER RADIUS</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(8px,1.5vw,16px)', marginBottom: 'clamp(40px,5vw,64px)' }}>
            {RADII.map(item => (
              <div key={item.name} style={{ background: color.white, borderRadius: layout.rMd, padding: 20, boxShadow: cardShadow, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 56, height: 36, background: color.brandPale, borderRadius: item.value }} />
                <p style={{ margin: 0, fontSize: t.caption.size, fontWeight: 600, color: color.ink }}>{item.name}</p>
                <p style={{ margin: 0, fontSize: t.caption.size, color: color.inkFaint, fontFamily: 'monospace' }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* ELEVATION / SHADOW */}
          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>ELEVATION / SHADOW</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(8px,1.5vw,16px)' }}>
            {SHADOWS.map(item => (
              <div key={item.name} style={{ background: color.white, borderRadius: layout.rMd, padding: 20, boxShadow: cardShadow }}>
                <div style={{ width: '100%', height: 48, background: color.white, borderRadius: layout.rSm, boxShadow: item.value, marginBottom: 12 }} />
                <p style={{ margin: '0 0 6px', fontSize: t.caption.size, fontWeight: 600, color: color.ink }}>{item.name}</p>
                <p style={{ margin: 0, fontSize: 11, color: color.inkFaint, fontFamily: 'monospace', wordBreak: 'break-all' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 02 COMPONENTS */}
        <div
          ref={compRef}
          style={{
            opacity: compVisible ? 1 : 0,
            transform: compVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            ...sectionGap,
          }}
        >
          <p style={subEyebrowStyle}>02 COMPONENTS</p>
          <h3 style={h3Style}>컴포넌트</h3>

          {/* BUTTON - [7] AND_TINT → color.bg, AND_GREEN → color.inkFaint, [9] label update */}
          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>BUTTON</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(4px,0.5vw,8px)', marginBottom: 'clamp(32px,4vw,48px)' }}>
            <div style={{ background: color.white, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,36px)', border: `1px solid ${color.line}`, boxShadow: cardShadow }}>
              <p style={{ ...panelLabel, fontSize: '13px', fontWeight: 700, color: color.brand }}>HIG</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <button style={{ background: color.brand, color: '#fff', borderRadius: 12, height: 52, padding: '0 24px', fontSize: 17, fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 2px 6px rgba(29,78,216,0.25)', fontFamily: font.family }}>간편 신청하기</button>
                <button style={{ background: color.brandPale, color: color.brand, borderRadius: 12, height: 52, padding: '0 24px', fontSize: 17, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: font.family }}>캐시백 충전</button>
                <button style={{ background: 'transparent', color: color.brand, borderRadius: 12, height: 52, padding: '0 24px', fontSize: 17, fontWeight: 600, border: `1px solid ${color.brand}`, cursor: 'pointer', fontFamily: font.family }}>환불</button>
                <button style={{ background: 'transparent', color: color.brand, borderRadius: 12, height: 52, padding: '0 24px', fontSize: 17, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: font.family }}>다음에 하기</button>
              </div>
            </div>
            <div style={{ background: color.bg, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,36px)', border: `1px solid ${color.line}`, boxShadow: cardShadow }}>
              <p style={{ ...panelLabel, fontSize: '13px', fontWeight: 700, color: color.brand }}>Google Material 3</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <button style={{ background: color.brand, color: '#fff', borderRadius: 999, height: 48, padding: '0 24px', fontSize: 16, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: "'Noto Sans KR', sans-serif" }}>간편 신청하기</button>
                <button style={{ background: color.brandPale, color: color.brand, borderRadius: 999, height: 48, padding: '0 24px', fontSize: 16, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: "'Noto Sans KR', sans-serif" }}>캐시백 충전</button>
                <button style={{ background: 'transparent', color: color.brand, borderRadius: 999, height: 48, padding: '0 24px', fontSize: 16, fontWeight: 600, border: `1px solid ${color.brand}`, cursor: 'pointer', fontFamily: "'Noto Sans KR', sans-serif" }}>환불</button>
                <button style={{ background: 'transparent', color: color.brand, borderRadius: 999, height: 48, padding: '0 24px', fontSize: 16, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: "'Noto Sans KR', sans-serif" }}>다음에 하기</button>
              </div>
            </div>
          </div>

          {/* STATUS BAR - [1] SVG heights increased, [7] android card bg, [9] labels */}
          {console.log('[DesignSystem] iosStatusBar:', iosStatusBar, '| androidStatusBar:', androidStatusBar)}
          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>STATUS BAR</p>
          <div style={{ ...panelGrid, marginBottom: 'clamp(32px,4vw,48px)' }}>
            <div style={panelCard}>
              <p style={panelLabel}>HIG — 41px</p>
              <img src={iosStatusBar} alt="" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div style={panelCard}>
              <p style={panelLabel}>Google Material 3 — 42px</p>
              <img src={androidStatusBar} alt="" style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>

          {/* TOP APP BAR - [7] android card + inner bg, [9] labels, [10] visibility fix */}
          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>TOP APP BAR</p>
          <div style={{ ...panelGrid, marginBottom: 'clamp(32px,4vw,48px)' }}>
            <div style={panelCard}>
              <p style={panelLabel}>HIG</p>
              <div style={{ height: 44, borderRadius: 12, background: color.white, border: `1px solid ${color.line}`, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                <span style={{ width: 44, fontSize: 17, color: color.brand }}>←</span>
                <span style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 17 }}>강릉페이</span>
                <span style={{ width: 44 }} />
              </div>
            </div>
            <div style={panelCard}>
              <p style={panelLabel}>Google Material 3</p>
              <div style={{ height: 44, borderRadius: 12, background: color.bg, border: `1px solid ${color.line}`, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                <span style={{ width: 44, fontSize: 17, color: color.brand }}>←</span>
                <span style={{ flex: 1, textAlign: 'left', fontWeight: 700, fontSize: 17, fontFamily: "'Noto Sans KR', sans-serif" }}>강릉페이</span>
              </div>
            </div>
          </div>

          {/* BOTTOM NAVIGATION - [2] use mini components */}
          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>BOTTOM NAVIGATION</p>
          <div style={{ ...panelGrid, marginBottom: 'clamp(32px,4vw,48px)' }}>
            <div style={panelCard}>
              <p style={panelLabel}>HIG</p>
              <IOSBottomNav activeIndex={0} />
            </div>
            <div style={panelCard}>
              <p style={panelLabel}>Google Material 3</p>
              <AndroidBottomNav activeIndex={0} />
            </div>
          </div>

          {/* BOTTOM SHEET - [7] android card + inner bg, [9] labels */}
          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>BOTTOM SHEET</p>
          <div style={{ ...panelGrid, marginBottom: 'clamp(32px,4vw,48px)' }}>
            <div style={panelCard}>
              <p style={panelLabel}>HIG</p>
              <div style={{ background: color.white, borderRadius: '20px 20px 0 0', padding: '12px 20px 20px', border: `1px solid ${color.line}` }}>
                <div style={{ width: 40, height: 4, background: color.line, borderRadius: 999, margin: '0 auto 12px' }} />
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>환불 금액을 확인해주세요</p>
              </div>
            </div>
            <div style={panelCard}>
              <p style={panelLabel}>Google Material 3</p>
              <div style={{ background: color.bg, borderRadius: '28px 28px 0 0', padding: '12px 20px 20px', border: `1px solid ${color.line}` }}>
                <div style={{ width: 32, height: 4, background: '#9CA3AF', borderRadius: 999, margin: '0 auto 12px' }} />
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, fontFamily: "'Noto Sans KR', sans-serif" }}>환불 금액을 확인해주세요</p>
              </div>
            </div>
          </div>

          {/* SEARCH INPUT - [7] android card bg, [9] labels */}
          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>SEARCH INPUT</p>
          <div style={{ ...panelGrid, marginBottom: 'clamp(32px,4vw,48px)' }}>
            <div style={panelCard}>
              <p style={panelLabel}>HIG</p>
              <div style={{ background: color.white, borderRadius: 999, border: `1px solid ${color.line}`, height: 44, display: 'flex', alignItems: 'center', paddingLeft: 14, gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="6.5" cy="6.5" r="5" stroke={color.inkFaint} strokeWidth="1.5" />
                  <line x1="10.5" y1="10.5" x2="14" y2="14" stroke={color.inkFaint} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span style={{ color: color.inkFaint, fontSize: 16 }}>검색</span>
              </div>
            </div>
            <div style={panelCard}>
              <p style={panelLabel}>Google Material 3</p>
              <div style={{ background: '#F3F4F6', borderRadius: '8px 8px 0 0', borderBottom: `2px solid ${color.brand}`, height: 44, display: 'flex', alignItems: 'center', paddingLeft: 14, gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="6.5" cy="6.5" r="5" stroke={color.inkFaint} strokeWidth="1.5" />
                  <line x1="10.5" y1="10.5" x2="14" y2="14" stroke={color.inkFaint} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span style={{ color: color.inkFaint, fontSize: 16, fontFamily: "'Noto Sans KR', sans-serif" }}>검색</span>
              </div>
            </div>
          </div>

          {/* FILTER CHIP - [7] android card bg, [9] labels */}
          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>FILTER CHIP</p>
          <div style={{ ...panelGrid, marginBottom: 'clamp(32px,4vw,48px)' }}>
            <div style={panelCard}>
              <p style={panelLabel}>HIG</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['전체', '충전', '환불', '결제'].map((chip, i) => (
                  <span key={chip} style={{
                    padding: '6px 16px', borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    background: i === 0 ? color.brand : color.white,
                    color: i === 0 ? '#fff' : color.inkMuted,
                    border: i === 0 ? 'none' : `1px solid ${color.line}`,
                  }}>{chip}</span>
                ))}
              </div>
            </div>
            <div style={panelCard}>
              <p style={panelLabel}>Google Material 3</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['전체', '충전', '환불', '결제'].map((chip, i) => (
                  <span key={chip} style={{
                    padding: '6px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    background: i === 0 ? color.brandPale : color.white,
                    color: i === 0 ? color.brand : color.inkMuted,
                    border: i === 0 ? 'none' : `1px solid ${color.line}`,
                    fontFamily: "'Noto Sans KR', sans-serif",
                  }}>{i === 0 ? '✓ ' + chip : chip}</span>
                ))}
              </div>
            </div>
          </div>

          {/* SNACKBAR - [7] android card bg, [9] labels */}
          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>SNACKBAR</p>
          <div style={{ ...panelGrid, marginBottom: 'clamp(32px,4vw,48px)' }}>
            <div style={panelCard}>
              <p style={panelLabel}>HIG</p>
              <p style={{ margin: 0, color: color.inkFaint, fontStyle: 'italic', fontSize: 14, textAlign: 'center', padding: '12px 0' }}>iOS에서는 완료 화면으로 피드백을 제공합니다</p>
            </div>
            <div style={panelCard}>
              <p style={panelLabel}>Google Material 3</p>
              <div style={{ background: '#111827', borderRadius: 8, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontSize: 14, fontFamily: "'Noto Sans KR', sans-serif" }}>50,000원 환불이 완료됐어요</span>
                <span style={{ color: '#93C5FD', fontWeight: 700, fontSize: 14, fontFamily: "'Noto Sans KR', sans-serif", cursor: 'pointer' }}>확인</span>
              </div>
            </div>
          </div>

          {/* COACH MARK - [7] android card bg, [9] labels */}
          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>COACH MARK</p>
          <div style={{ ...panelGrid, marginBottom: 'clamp(32px,4vw,48px)' }}>
            {[
              { label: 'HIG', isIos: true },
              { label: 'Google Material 3', isIos: false },
            ].map(p => (
              <div key={p.label} style={panelCard}>
                <p style={panelLabel}>{p.label}</p>
                <div style={{ background: color.white, borderRadius: 14, padding: 14, boxShadow: cardShadow }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    {[0, 1].map(d => (
                      <div key={d} style={{ width: 8, height: 8, borderRadius: 999, background: d === 0 ? color.brand : color.line }} />
                    ))}
                    <span style={{ fontSize: 12, color: color.inkFaint, marginLeft: 4 }}>1/2</span>
                  </div>
                  <p style={{ margin: '0 0 12px', fontSize: 13, lineHeight: 1.6, color: color.ink }}>충전 버튼을 눌러 강릉페이 잔액을 충전할 수 있습니다.</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: color.inkFaint, cursor: 'pointer' }}>건너뛰기</span>
                    <button style={{
                      background: color.brand, color: '#fff', border: 'none', cursor: 'pointer',
                      borderRadius: p.isIos ? 12 : 999, padding: '6px 16px', fontSize: 13, fontWeight: 600,
                    }}>다음</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AUTH (BIOMETRIC) - [3] iOS → face-id-ios.json, [9] labels */}
          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>AUTH (BIOMETRIC)</p>
          <div style={panelGrid}>
            <div style={{ background: '#111111', borderRadius: layout.rMd, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 120, gap: 8, boxShadow: cardShadow }}>
              <DotLottieReact src="/lottie/face-id-ios.json" autoplay loop style={{ width: 80, height: 80 }} />
              <span style={{ color: '#fff', fontSize: 12, opacity: 0.7 }}>HIG — Face ID</span>
            </div>
            <div style={{ background: '#111111', borderRadius: layout.rMd, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', minHeight: 120, gap: 12, boxShadow: cardShadow }}>
              <DotLottieReact src="/lottie/fingerprint.json" autoplay loop style={{ width: 64, height: 64 }} />
              <span style={{ color: '#fff', fontSize: 13, fontFamily: "'Noto Sans KR', sans-serif" }}>지문을 인식해주세요</span>
            </div>
          </div>
        </div>

        {/* 03 PATTERNS */}
        <div
          ref={patternRef}
          style={{
            opacity: patternVisible ? 1 : 0,
            transform: patternVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            ...sectionGap,
          }}
        >
          <p style={subEyebrowStyle}>03 PATTERNS</p>
          <h3 style={h3Style}>패턴</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(8px,1.5vw,20px)' }}>
            {PATTERNS.map((p, i) => (
              <div key={i} style={{ background: color.white, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,32px)', boxShadow: cardShadow }}>
                <p style={{ margin: '0 0 8px', fontSize: t.caption.size, fontWeight: 800, color: color.brand, letterSpacing: '0em', textTransform: 'uppercase' }}>{String(i + 1).padStart(2, '0')}</p>
                <p style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: color.ink }}>{p.title}</p>
                <p style={{ margin: '0 0 16px', fontSize: t.caption.size, lineHeight: 1.6, color: color.inkMuted }}>{p.sub}</p>
                <ol style={{ margin: 0, paddingLeft: 18 }}>
                  {p.steps.map((step, si) => (
                    <li key={si} style={{ fontSize: t.caption.size, lineHeight: 1.7, color: color.inkMuted, marginBottom: 4 }}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* 04 PLATFORM COMPARISON - [7] table row alternating bg, [9] table headers */}
        <div
          ref={platformRef}
          style={{
            opacity: platformVisible ? 1 : 0,
            transform: platformVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            ...sectionGap,
          }}
        >
          <p style={subEyebrowStyle}>04 PLATFORM COMPARISON</p>
          <h3 style={h3Style}>플랫폼 비교</h3>
          <div style={{ borderRadius: layout.rMd, overflow: 'hidden', boxShadow: cardShadow }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: color.ink }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 13 }}>컴포넌트·속성</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 13 }}>HIG</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 13 }}>Google Material 3</th>
                </tr>
              </thead>
              <tbody>
                {PLATFORM_SECTIONS.map((sec, si) => (
                  <>
                    <tr key={`g-${si}`} style={{ background: color.brandPale }}>
                      <td colSpan={3} style={{ padding: '8px 16px', color: color.brand, fontSize: 11, fontWeight: 800, letterSpacing: '0em', textTransform: 'uppercase' }}>{sec.group}</td>
                    </tr>
                    {sec.rows.map((row, ri) => (
                      <tr key={`r-${si}-${ri}`} style={{ background: ri % 2 === 0 ? color.white : color.bg }}>
                        <td style={{ padding: '10px 16px', color: color.inkMuted, fontSize: 13 }}>{row.prop}</td>
                        <td style={{ padding: '10px 16px', color: color.ink, fontSize: 13 }}>{row.ios}</td>
                        <td style={{ padding: '10px 16px', color: color.ink, fontSize: 13, fontFamily: "'Noto Sans KR', sans-serif" }}>{row.and}</td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 05 ACCESSIBILITY - [7] android card bg, [9] labels */}
        <div
          ref={a11yRef}
          style={{
            opacity: a11yVisible ? 1 : 0,
            transform: a11yVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <p style={subEyebrowStyle}>05 ACCESSIBILITY</p>
          <h3 style={h3Style}>접근성</h3>

          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>TOUCH TARGET</p>
          <div style={{ ...panelGrid, marginBottom: 'clamp(32px,4vw,48px)' }}>
            <div style={panelCard}>
              <p style={panelLabel}>HIG — 44×44pt</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, height: 44, background: color.brandPale, borderRadius: layout.rSm, flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: t.caption.size, color: color.inkMuted }}>44pt × 44pt 최소 터치 영역</p>
              </div>
            </div>
            <div style={panelCard}>
              <p style={panelLabel}>Google Material 3 — 48×48dp</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, background: color.brandPale, borderRadius: layout.rSm, flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: t.caption.size, color: color.inkMuted, fontFamily: "'Noto Sans KR', sans-serif" }}>48dp × 48dp 최소 터치 영역</p>
              </div>
            </div>
          </div>

          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>COLOR CONTRAST</p>
          <div style={{ borderRadius: layout.rMd, overflow: 'hidden', boxShadow: cardShadow, marginBottom: 'clamp(32px,4vw,48px)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: color.ink }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 13 }}>용도</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 13 }}>색상</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 13 }}>비율</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 13 }}>WCAG AA</th>
                </tr>
              </thead>
              <tbody>
                {CONTRAST_PAIRS.map((pair, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? color.white : color.bg }}>
                    <td style={{ padding: '10px 16px', color: color.ink, fontSize: 13 }}>{pair.name}</td>
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 40, height: 24, borderRadius: 4, background: pair.bg, border: `1px solid ${color.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 10, color: pair.fg, fontWeight: 700 }}>Aa</span>
                        </div>
                        <span style={{ fontSize: 12, color: color.inkFaint, fontFamily: 'monospace' }}>{pair.fg} on {pair.bg}</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 16px', color: color.ink, fontSize: 13, fontFamily: 'monospace' }}>{pair.ratio}</td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: pair.pass ? color.ok : color.inkFaint }}>{pair.pass ? 'PASS' : '—'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>LARGE TEXT SCALE</p>
          <div style={{ borderRadius: layout.rMd, overflow: 'hidden', boxShadow: cardShadow, marginBottom: 'clamp(32px,4vw,48px)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: color.ink }}>
                  {['토큰', '기본', '큰글씨', '증가율'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 13 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LARGE_TEXT.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? color.white : color.bg }}>
                    <td style={{ padding: '10px 16px', color: color.ink, fontSize: 13, fontFamily: 'monospace' }}>{row.token}</td>
                    <td style={{ padding: '10px 16px', color: color.inkMuted, fontSize: 13 }}>{row.base}</td>
                    <td style={{ padding: '10px 16px', color: color.ok, fontSize: 13, fontWeight: 600 }}>{row.large}</td>
                    <td style={{ padding: '10px 16px', color: color.brand, fontSize: 13, fontWeight: 700 }}>{row.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: 11, fontWeight: 700, color: color.inkFaint, margin: '0 0 12px', letterSpacing: '0em', textTransform: 'uppercase' }}>SENIOR ACCESSIBILITY CHECKLIST</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CHECKLIST.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: color.white, borderRadius: layout.rSm, padding: '12px 16px', boxShadow: cardShadow }}>
                <div style={{ width: 24, height: 24, borderRadius: 999, background: color.ok, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontSize: 14, color: color.ink }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
