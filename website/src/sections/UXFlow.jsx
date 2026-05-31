import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import axiomData from '../data/axiom.json';

const { serviceFlow, interactionPrinciples } = axiomData.uxStrategy;

const EXISTING_STEPS = serviceFlow.existing.split(' → ');
const AXIOM_STEPS    = serviceFlow.axiom.split(' → ');

function FlowStep({ label, isAxiom, index, visible, isLast }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
      <div
        style={{
          padding: 'clamp(10px,1.2vw,14px) clamp(12px,1.5vw,18px)',
          background: colors.bgDeep,
          border: `1px solid ${isAxiom ? colors.brand : colors.inkMuted}`,
          borderRadius: 10,
          minWidth: 'clamp(80px,10vw,120px)',
          textAlign: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateX(-12px)',
          transition: `opacity 0.4s ease ${index * 60}ms, transform 0.4s ease ${index * 60}ms`,
        }}
      >
        <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: isAxiom ? colors.ink : colors.inkMuted, lineHeight: 1.4 }}>
          {label}
        </p>
      </div>
      {!isLast && (
        <svg width="28" height="12" viewBox="0 0 28 12" fill="none" style={{ flexShrink: 0 }}>
          <path d="M0 6h22M18 1l6 5-6 5" stroke={isAxiom ? colors.brand : colors.inkMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

export default function UXFlow() {
  const [flowRef,  flowVisible]  = useReveal({ threshold: 0.1 });
  const [princRef, princVisible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="ux-flow"
      style={{ background: colors.bgCard, fontFamily: font.family, padding: `clamp(32px,4vw,60px) clamp(20px,6vw,100px)` }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="10 UX FLOW"
          headline="진단부터 구매까지 단 하나의 흐름"
          sub="기존 플로우와의 비교 · 인터랙션 원칙"
          align="left"
        />

        {/* ── 플로우 비교 ── */}
        <div ref={flowRef} style={{ marginBottom: 'clamp(56px,7vw,96px)' }}>
          {/* 기존 플로우 */}
          <div style={{ marginBottom: 'clamp(20px,3vw,32px)' }}>
            <p style={{ margin: '0 0 clamp(10px,1.5vw,16px)', fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: colors.inkMuted }}>
              기존 — 이탈 유발 구조
            </p>
            <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', paddingBottom: 8, gap: 0 }} className="flow-scroll">
              {EXISTING_STEPS.map((step, i) => (
                <FlowStep
                  key={i}
                  label={step}
                  isAxiom={false}
                  index={i}
                  visible={flowVisible}
                  isLast={i === EXISTING_STEPS.length - 1}
                />
              ))}
            </div>
          </div>

          {/* AXIOM 플로우 */}
          <div>
            <p style={{ margin: '0 0 clamp(10px,1.5vw,16px)', fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: colors.brand }}>
              AXIOM — Zero Search, One Flow
            </p>
            <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', paddingBottom: 8, gap: 0 }} className="flow-scroll">
              {AXIOM_STEPS.map((step, i) => (
                <FlowStep
                  key={i}
                  label={step}
                  isAxiom={true}
                  index={i}
                  visible={flowVisible}
                  isLast={i === AXIOM_STEPS.length - 1}
                />
              ))}
            </div>
          </div>

          {/* 페이지별 상세 */}
          <div
            style={{
              marginTop: 'clamp(24px,3vw,40px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'clamp(8px,1.5vw,14px)',
            }}
            className="pages-grid"
          >
            {serviceFlow.pages.map((page, i) => (
              <div
                key={i}
                style={{
                  background: colors.bgDeep,
                  border: `1px solid ${colors.line}`,
                  borderRadius: 'clamp(6px,0.8vw,10px)',
                  padding: 'clamp(14px,1.8vw,20px)',
                  opacity: flowVisible ? 1 : 0,
                  transform: flowVisible ? 'none' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                }}
              >
                <p style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: colors.ink }}>{page.name}</p>
                <p style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 600, color: colors.brandMid }}>{page.purpose}</p>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: colors.inkMuted, lineHeight: 1.5 }}>{page.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 인터랙션 원칙 ── */}
        <div ref={princRef}>
          <p style={{ margin: '0 0 clamp(16px,2vw,24px)', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
            인터랙션 원칙
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'clamp(10px,1.5vw,16px)',
            }}
            className="principles-grid"
          >
            {interactionPrinciples.map((p, i) => (
              <div
                key={i}
                style={{
                  background: colors.bgDeep,
                  borderRadius: 'clamp(8px,1vw,12px)',
                  padding: 'clamp(16px,2vw,24px)',
                  opacity: princVisible ? 1 : 0,
                  transform: princVisible ? 'none' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.brand, marginBottom: 12 }} />
                <p style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: colors.ink, lineHeight: 1.4 }}>{p.rule}</p>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: colors.inkMuted, lineHeight: 1.5 }}>{p.apply}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pages-grid      { grid-template-columns: repeat(2, 1fr) !important; }
          .principles-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .flow-scroll { gap: 0 !important; }
        }
      `}</style>
    </section>
  );
}
