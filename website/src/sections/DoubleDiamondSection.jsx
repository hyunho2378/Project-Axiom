import { useState, useEffect } from 'react';
import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

// Desktop viewBox: 980 × 490  (2 : 1)
// Diamond 1 vertices: (0,245) (243,0) (486,245) (243,490)
// Diamond 2 vertices: (494,245) (737,0) (980,245) (737,490)
// Gap between touching vertices: 8px  →  URQ dot at (490,245)
// Dashed center guides: x=243, x=737

const BRAND_FAINT = color.brandPale;

const PHASES = [
  {
    id: 'D1', label: 'Discover', pct: 12.4, diamond: 1,
    detail: '데스크 리서치 · 서비스 사파리 · 유저 리서치 · 앱스토어 리뷰 분석',
  },
  {
    id: 'D2', label: 'Define', pct: 37.2, diamond: 1,
    detail: '어피니티 다이어그램 · Key Insight · AS-IS 감사 · 페르소나 · 유저 저니맵',
  },
  {
    id: 'URQ', label: 'User Requirements', pct: 50, diamond: 0,
    detail: '리서치를 요구사항으로 수렴한 지점',
  },
  {
    id: 'D3', label: 'Develop', pct: 62.8, diamond: 2,
    detail: '디자인 디렉션 · UX 컨셉·전략 · 정보 위계 재설계 · 듀얼 디자인 시스템(HIG / Google Material 3)',
  },
  {
    id: 'D4', label: 'Deliver', pct: 87.6, diamond: 2,
    detail: '핵심 화면 · 유저 테스트 · 프로토타입 배포',
  },
];

function LabelBlock({ id, label, detail, size = 'md' }) {
  const isURQ = id === 'URQ';
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: size === 'sm' ? t.caption.size : t.h3.size,
        fontWeight: 800,
        color: color.brand,
        lineHeight: 1.2,
      }}>
        {id}
      </div>
      <div style={{
        fontSize: size === 'sm' ? '10px' : t.caption.size,
        fontWeight: 700,
        color: color.ink,
        marginTop: 2,
        marginBottom: isURQ ? 4 : 3,
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '10px',
        color: color.inkMuted,
        lineHeight: 1.65,
        wordBreak: 'keep-all',
      }}>
        {detail}
      </div>
    </div>
  );
}

function DesktopDiagram() {
  return (
    <div>
      {/* Aspect-ratio container: paddingBottom = (490/980)*100 = 50% */}
      <div style={{ position: 'relative', paddingBottom: '50%', overflow: 'visible' }}>
        <div style={{ position: 'absolute', inset: 0 }}>

          {/* SVG: shapes only, no text */}
          <svg
            viewBox="0 0 980 490"
            style={{ width: '100%', height: '100%', display: 'block' }}
            aria-hidden="true"
          >
            {/* Dashed center-phase guides */}
            <line x1={243} y1={0} x2={243} y2={490}
              stroke={BRAND_FAINT} strokeWidth={2} strokeDasharray="10 10" />
            <line x1={737} y1={0} x2={737} y2={490}
              stroke={BRAND_FAINT} strokeWidth={2} strokeDasharray="10 10" />

            {/* Diamond 1  — white fill, brand stroke */}
            <polygon
              points="0,245 243,0 486,245 243,490"
              fill={color.white}
              stroke={color.brand}
              strokeWidth={4}
            />
            {/* Diamond 2 */}
            <polygon
              points="494,245 737,0 980,245 737,490"
              fill={color.white}
              stroke={color.brand}
              strokeWidth={4}
            />
            {/* URQ waist dot */}
            <circle cx={490} cy={245} r={6} fill={color.brand} />
          </svg>

          {/* HTML label overlay — same coordinate space as SVG */}
          {PHASES.map(p => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${p.pct}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: p.id === 'URQ' ? '11%' : '19%',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              <LabelBlock id={p.id} label={p.label} detail={p.detail} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

function MobileDiagram() {
  const d1Phases = PHASES.filter(p => p.diamond === 1);
  const d2Phases = PHASES.filter(p => p.diamond === 2);
  const urq = PHASES.find(p => p.id === 'URQ');

  const singleDiamond = (phases) => (
    <div>
      {/* 1:1 aspect ratio for single diamond */}
      <div style={{ position: 'relative', paddingBottom: '100%' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <svg viewBox="0 0 490 490" style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden="true">
            <line x1={245} y1={0} x2={245} y2={490}
              stroke={BRAND_FAINT} strokeWidth={2} strokeDasharray="10 10" />
            <polygon
              points="0,245 245,0 490,245 245,490"
              fill={color.white}
              stroke={color.brand}
              strokeWidth={4}
            />
          </svg>
          {/* Labels overlay — D1 left half, D2 right half */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center',
          }}>
            {phases.map(p => (
              <div key={p.id} style={{ flex: 1, padding: '0 6px' }}>
                <LabelBlock id={p.id} label={p.label} detail={p.detail} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {singleDiamond(d1Phases)}

      {/* URQ waist */}
      <div style={{
        textAlign: 'center',
        padding: '20px 0',
        borderTop: `1px dashed ${color.brand}`,
        borderBottom: `1px dashed ${color.brand}`,
        margin: '12px 0',
      }}>
        <LabelBlock id={urq.id} label={urq.label} detail={urq.detail} size="sm" />
      </div>

      {singleDiamond(d2Phases)}
    </div>
  );
}

export default function DoubleDiamondSection() {
  const [mobile, setMobile] = useState(false);
  const [headRef, headVisible] = useReveal({ threshold: 0.1 });
  const [diagramRef, diagramVisible] = useReveal({ threshold: 0.05 });

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      id="double-diamond"
      style={{
        background: color.bg,
        fontFamily: font.family,
        padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={headRef}
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(48px,6vw,80px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px',
          }}>
            PROCESS
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px',
          }}>
            발산과 수렴을 두 번 반복했습니다
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 400,
            lineHeight: t.lead.lh, color: color.inkMuted, margin: 0,
          }}>
            더블 다이아몬드는 문제를 넓게 탐색해 정의하고, 해결안을 넓게 펼쳐 구현하는 디자인 프로세스입니다.
          </p>
        </div>

        {/* Diagram */}
        <div
          ref={diagramRef}
          style={{
            opacity: diagramVisible ? 1 : 0,
            transform: diagramVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            maxWidth: 980,
            margin: '0 auto',
          }}
        >
          {mobile ? <MobileDiagram /> : <DesktopDiagram />}
        </div>

      </div>
    </section>
  );
}
