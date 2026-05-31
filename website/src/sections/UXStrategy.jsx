import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import axiomData from '../data/axiom.json';

const { uxStrategy } = axiomData;
const { positioningMap, designPrinciples, hmw } = uxStrategy;

const MAP_W = 640;
const MAP_H = 400;
const LUXURY_X = { '낮음': 96, '중간': 320, '높음': 544 };
const PERSONAL_Y = { '낮음': 340, '중간': 200, '높음': 60 };

function PositioningMap({ visible }) {
  const competitors = positioningMap.competitors;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginBottom: 'clamp(48px,6vw,80px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <p
        style={{
          margin: '0 0 clamp(16px,2vw,24px)',
          fontSize: t.sublabel.size,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: colors.inkMuted,
          alignSelf: 'flex-start',
        }}
      >
        포지셔닝 맵
      </p>

      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        style={{ width: 'min(900px, 90vw)', height: 'auto', display: 'block' }}
      >
        <rect x="0" y="0" width={MAP_W} height={MAP_H} fill={colors.bgDeep} rx="12" />

        {/* Blue Ocean 영역 */}
        <rect x={MAP_W / 2} y="0" width={MAP_W / 2} height={MAP_H / 2} fill="rgba(90,154,181,0.05)" />
        <text x={MAP_W * 0.75} y={MAP_H * 0.18} textAnchor="middle" fontSize="10" fill={colors.brandPale} fontWeight="700" letterSpacing="2">
          BLUE OCEAN
        </text>

        {/* 축선 */}
        <line x1={MAP_W / 2} y1="16" x2={MAP_W / 2} y2={MAP_H - 16} stroke={colors.line} strokeWidth="1" />
        <line x1="16" y1={MAP_H / 2} x2={MAP_W - 16} y2={MAP_H / 2} stroke={colors.line} strokeWidth="1" />

        {/* 축 레이블 */}
        <text x={MAP_W - 10} y={MAP_H / 2 - 8} textAnchor="end" fontSize="10" fill={colors.inkMuted} fontWeight="600">고럭셔리</text>
        <text x="10" y={MAP_H / 2 - 8} textAnchor="start" fontSize="10" fill={colors.inkMuted} fontWeight="600">저럭셔리</text>
        <text x={MAP_W / 2} y="14" textAnchor="middle" fontSize="10" fill={colors.inkMuted} fontWeight="600">고개인화</text>
        <text x={MAP_W / 2} y={MAP_H - 4} textAnchor="middle" fontSize="10" fill={colors.inkMuted} fontWeight="600">저개인화</text>

        {/* 경쟁사 점 */}
        {competitors.filter(c => c.name !== 'AXIOM').map((c, i) => {
          const cx = LUXURY_X[c.luxury] ?? MAP_W / 2;
          const cy = PERSONAL_Y[c.personalization] ?? MAP_H / 2;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r="7" fill={colors.bgCard} stroke={colors.inkMuted} strokeWidth="1.5" />
              <text x={cx} y={cy - 12} textAnchor="middle" fontSize="10" fill={colors.inkMuted}>{c.name}</text>
            </g>
          );
        })}

        {/* AXIOM 점 — pulse */}
        {(() => {
          const axiomComp = competitors.find(c => c.name === 'AXIOM');
          if (!axiomComp) return null;
          const cx = LUXURY_X[axiomComp.luxury] ?? 544;
          const cy = PERSONAL_Y[axiomComp.personalization] ?? 60;
          return (
            <g>
              <circle cx={cx} cy={cy} r="18" fill="none" stroke={colors.brand} strokeWidth="1.5" strokeOpacity="0.6">
                <animate attributeName="r" values="14;30;14" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx={cx} cy={cy} r="22" fill={colors.brand} fillOpacity="0.1" />
              <circle cx={cx} cy={cy} r="12" fill={colors.brand} fillOpacity="0.25" />
              <circle cx={cx} cy={cy} r="6" fill={colors.brand} />
              <text x={cx} y={cy - 16} textAnchor="middle" fontSize="11" fill={colors.brand} fontWeight="800">AXIOM</text>
            </g>
          );
        })()}
      </svg>

      <p
        style={{
          marginTop: 16,
          fontSize: t.sublabel.size,
          fontWeight: 600,
          color: colors.inkMuted,
          textAlign: 'center',
          maxWidth: 480,
        }}
      >
        {positioningMap.vacantZone}
      </p>
    </div>
  );
}

function DesignPrinciples({ visible }) {
  return (
    <div style={{ marginBottom: 'clamp(48px,6vw,80px)' }}>
      <p
        style={{
          margin: '0 0 clamp(20px,3vw,32px)',
          fontSize: t.sublabel.size,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: colors.inkMuted,
        }}
      >
        Design Principles
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(12px,2vw,20px)',
        }}
        className="principles-grid"
      >
        {designPrinciples.map((p, i) => (
          <div
            key={p.id}
            style={{
              background: colors.bgDeep,
              borderRadius: 'clamp(10px,1.2vw,16px)',
              padding: 'clamp(28px,3.5vw,48px)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(20px)',
              transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}
          >
            <p
              style={{
                margin: '0 0 10px',
                fontSize: 'clamp(32px,4vw,48px)',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                lineHeight: 1,
                color: colors.brand,
              }}
            >
              {p.id}
            </p>
            <p
              style={{
                margin: '0 0 14px',
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: colors.brandMid,
              }}
            >
              {p.name}
            </p>
            <p
              style={{
                margin: '0 0 16px',
                fontSize: t.body.size,
                fontWeight: 600,
                lineHeight: 1.6,
                color: colors.ink,
              }}
            >
              {p.headline}
            </p>
            <p
              style={{
                margin: '0 0 14px',
                fontSize: 17, fontWeight: 500,
                lineHeight: 1.65,
                color: colors.inkMuted,
              }}
            >
              {p.apply}
            </p>
            <p style={{ margin: 0, fontSize: 'clamp(10px,0.76vw,11px)', fontWeight: 400, color: colors.inkFaint, lineHeight: 1.5 }}>
              근거: {p.basis}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HMWTable({ visible }) {
  return (
    <div>
      <p
        style={{
          margin: '0 0 clamp(20px,3vw,32px)',
          fontSize: t.sublabel.size,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: colors.inkMuted,
        }}
      >
        해결 질문 → 설계 결정
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3vw,32px)' }}>
        {hmw.map((group, gi) => (
          <div
            key={gi}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(16px)',
              transition: `opacity 0.5s ease ${gi * 80}ms, transform 0.5s ease ${gi * 80}ms`,
            }}
          >
            <p
              style={{
                margin: '0 0 10px',
                fontSize: t.sublabel.size,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: colors.brand,
              }}
            >
              {group.insight}
            </p>
            <div
              style={{
                background: colors.bgDeep,
                borderRadius: 'clamp(8px,1vw,12px)',
                overflow: 'hidden',
                border: `1px solid ${colors.line}`,
              }}
            >
              {group.items.map((item, ii) => (
                <div
                  key={ii}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    borderBottom: ii < group.items.length - 1 ? `1px solid ${colors.line}` : 'none',
                  }}
                  className="hmw-row"
                >
                  <div
                    style={{
                      padding: 'clamp(12px,1.5vw,18px) clamp(14px,2vw,20px)',
                      borderRight: `1px solid ${colors.line}`,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: t.body.size, lineHeight: 1.5, color: colors.inkMuted }}>
                      {item.question}
                    </p>
                  </div>
                  <div
                    style={{
                      padding: 'clamp(12px,1.5vw,18px) clamp(14px,2vw,20px)',
                      background: 'rgba(90,154,181,0.04)',
                    }}
                  >
                    <p style={{ margin: 0, fontSize: t.body.size, lineHeight: 1.5, color: colors.ink, fontWeight: 500 }}>
                      {item.decision}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UXStrategy() {
  const [mapRef, mapVisible] = useReveal({ threshold: 0.1 });
  const [principlesRef, principlesVisible] = useReveal({ threshold: 0.1 });
  const [hmwRef, hmwVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="ux-strategy"
      style={{
        background: colors.bgCard,
        fontFamily: font.family,
        padding: `clamp(32px,4vw,60px) clamp(20px,6vw,100px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="06 UX STRATEGY"
          headline="인사이트에서 설계 원칙으로"
          sub="포지셔닝 맵, Design Principles, 해결 질문 → 설계 결정"
          align="left"
        />

        <div ref={mapRef}>
          <PositioningMap visible={mapVisible} />
        </div>

        <div ref={principlesRef}>
          <DesignPrinciples visible={principlesVisible} />
        </div>

        <div ref={hmwRef}>
          <HMWTable visible={hmwVisible} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .principles-grid {
            grid-template-columns: 1fr !important;
          }
          .hmw-row {
            grid-template-columns: 1fr !important;
          }
          .hmw-row > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid ${colors.line};
          }
        }
      `}</style>
    </section>
  );
}
