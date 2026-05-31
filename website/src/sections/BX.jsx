import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import axiomData from '../data/axiom.json';

const { bx } = axiomData;

const COMP_COLS = [
  { key: 'diagnosis',       label: '진단' },
  { key: 'expression',      label: '결과 표현' },
  { key: 'purchase',        label: '구매 경로' },
  { key: 'personalization', label: '개인화' },
  { key: 'luxury',          label: '럭셔리' },
  { key: 'reasonExplained', label: '추천 이유' },
  { key: 'koService',       label: '국내 서비스' },
];

function cell(val) {
  if (val === true)  return <span style={{ color: colors.brandMid,  fontSize: 18, fontWeight: 500 }}>O</span>;
  if (val === false) return <span style={{ color: colors.inkMuted, fontSize: 18, fontWeight: 500 }}>X</span>;
  return val;
}

export default function BX() {
  const [namingRef,   namingVisible]   = useReveal({ threshold: 0.1 });
  const [valuesRef,   valuesVisible]   = useReveal({ threshold: 0.1 });
  const [paletteRef,  paletteVisible]  = useReveal({ threshold: 0.1 });
  const [compRef,     compVisible]     = useReveal({ threshold: 0.05 });

  return (
    <section
      id="bx"
      style={{ background: colors.bg, fontFamily: font.family, padding: `clamp(32px,4vw,60px) clamp(20px,6vw,100px)` }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="07 BRAND IDENTITY"
          headline="AXIOM: 자명한 진실의 브랜드"
          sub="네이밍 · 코어 밸류 · 컬러 시스템 · 브랜드 언어"
          align="left"
        />

        {/* ── 네이밍 + 슬로건 ── */}
        <div
          ref={namingRef}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(56px,7vw,96px)',
            opacity: namingVisible ? 1 : 0,
            transform: namingVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <h2
            style={{
              margin: '0 0 clamp(8px,1vw,16px)',
              fontSize: 'clamp(33px,6vw,78px)',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 0.95,
              color: colors.ink,
              fontFamily: "'BentonModDisp', 'Didot', 'Georgia', serif",
            }}
          >
            {bx.naming.word}
          </h2>
          <p
            style={{
              margin: '0 0 clamp(12px,1.5vw,20px)',
              fontSize: 'clamp(16px,2vw,24px)',
              fontWeight: 500,
              color: colors.inkMuted,
              fontStyle: 'italic',
              letterSpacing: '0.02em',
            }}
          >
            {bx.slogan}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'clamp(8px,1.5vw,16px)',
              maxWidth: '56ch',
              margin: '0 auto',
            }}
          >
            {[bx.naming.axis, bx.naming.axiom].map((s, i) => (
              <p key={i} style={{ margin: 0, fontSize: 19, fontWeight: 500, color: colors.inkMuted, lineHeight: 1.6 }}>{s}</p>
            ))}
          </div>
          <p
            style={{
              margin: 'clamp(12px,1.5vw,20px) auto 0',
              fontSize: t.body.size,
              color: colors.brand,
              fontWeight: 600,
              maxWidth: '48ch',
              lineHeight: 1.5,
            }}
          >
            {bx.naming.synthesis}
          </p>
        </div>

        {/* ── Core Values 3개 ── */}
        <div
          ref={valuesRef}
          style={{ marginBottom: 'clamp(56px,7vw,96px)' }}
        >
          <p style={{ margin: '0 0 clamp(20px,3vw,32px)', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
            Core Values
          </p>
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(12px,2vw,20px)' }}
            className="corevalue-grid"
          >
            {bx.coreValues.map((v, i) => (
              <div
                key={v.id}
                style={{
                  background: colors.bgCard,
                  borderRadius: 'clamp(8px,1vw,14px)',
                  padding: 'clamp(20px,2.5vw,32px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  opacity: valuesVisible ? 1 : 0,
                  transform: valuesVisible ? 'none' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                }}
              >
                <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color: colors.brand, letterSpacing: '-0.02em' }}>
                  {v.name}
                </p>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: colors.brandMid }}>
                  {v.label}
                </p>
                <p style={{ margin: 0, fontSize: 19, fontWeight: 500, color: colors.ink, lineHeight: 1.5, flex: 1 }}>
                  {v.promise}
                </p>
                {v.basis && (
                  <div style={{ display: 'inline-block', padding: '4px 10px', background: colors.bgDeep, borderRadius: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 500, color: colors.inkMuted, lineHeight: 1.4 }}>{v.basis}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── 컬러 팔레트 ── */}
        <div
          ref={paletteRef}
          style={{
            marginBottom: 'clamp(56px,7vw,96px)',
            opacity: paletteVisible ? 1 : 0,
            transform: paletteVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p style={{ margin: '0 0 clamp(16px,2vw,24px)', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
            Color Palette
          </p>
          <div
            style={{ display: 'flex', gap: 'clamp(12px,2vw,20px)', overflowX: 'auto', paddingBottom: 12 }}
            className="palette-row"
          >
            {bx.colorPalette.map((c, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <div
                  style={{
                    width: 'clamp(44px,5vw,60px)',
                    height: 'clamp(44px,5vw,60px)',
                    borderRadius: '50%',
                    background: c.hex,
                    border: `1px solid ${colors.line}`,
                    flexShrink: 0,
                  }}
                />
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: colors.inkMuted, fontFamily: 'monospace', letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.3 }}>
                  {c.hex}
                </p>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: colors.inkMuted, textAlign: 'center', lineHeight: 1.3, maxWidth: 64 }}>
                  {c.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 경쟁사 비교표 ── */}
        <div
          ref={compRef}
          style={{
            opacity: compVisible ? 1 : 0,
            transform: compVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p style={{ margin: '0 0 clamp(20px,3vw,32px)', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
            경쟁사 비교
          </p>
          <div style={{ overflowX: 'auto', borderRadius: 'clamp(8px,1vw,14px)', border: `1px solid ${colors.line}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
              <thead>
                <tr style={{ background: colors.bgDeep }}>
                  <th style={thStyle}>브랜드</th>
                  {COMP_COLS.map(col => (
                    <th key={col.key} style={thStyle}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bx.competitorComparison.map((brand, ri) => {
                  const isAxiom = brand.brand === 'AXIOM';
                  return (
                    <tr
                      key={ri}
                      style={{ background: isAxiom ? 'rgba(0,212,255,0.06)' : (ri % 2 === 0 ? colors.bgCard : colors.bgDeep) }}
                    >
                      <td
                        style={{
                          ...tdStyle,
                          fontWeight: isAxiom ? 800 : 500,
                          color: isAxiom ? colors.brand : colors.ink,
                          whiteSpace: 'nowrap',
                          borderRight: `1px solid ${colors.line}`,
                        }}
                      >
                        {brand.brand}
                      </td>
                      {COMP_COLS.map(col => (
                        <td
                          key={col.key}
                          style={{
                            ...tdStyle,
                            color: isAxiom && typeof brand[col.key] === 'string' ? colors.ink : colors.inkMuted,
                            fontWeight: isAxiom ? 500 : 500,
                            textAlign: typeof brand[col.key] === 'boolean' ? 'center' : 'left',
                          }}
                        >
                          {cell(brand[col.key])}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .corevalue-grid { grid-template-columns: 1fr !important; }
          .lang-row { grid-template-columns: 1fr !important; }
          .lang-row > div:nth-child(2) { display: none; }
        }
        @media (max-width: 640px) {
          .palette-row { padding-bottom: 20px !important; }
        }
      `}</style>
    </section>
  );
}

const thStyle = {
  padding: '12px 16px',
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: colors.inkMuted,
  textAlign: 'left',
  borderBottom: `1px solid ${colors.line}`,
  whiteSpace: 'nowrap',
};

const tdStyle = {
  padding: '12px 16px',
  fontSize: 17, fontWeight: 500,
  lineHeight: 1.5,
  borderBottom: `1px solid ${colors.line}`,
  verticalAlign: 'top',
};
