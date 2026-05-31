import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import QuoteCard from '../components/QuoteCard.jsx';
import researchData from '../data/userResearch.json';

const { personas } = researchData.interview;

function PersonaCard({ persona, delay, visible }) {
  const speakers = persona.representativeQuote.speakers.join(' / ');

  return (
    <div
      style={{
        background: colors.bgCard,
        borderRadius: 'clamp(12px,1.5vw,20px)',
        padding: 'clamp(24px,3vw,40px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(16px,2vw,24px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {/* 헤더: 코드 chip + 기본 정보 */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span
            style={{
              padding: '3px 10px',
              background: colors.brand,
              color: colors.bgDeep,
              borderRadius: 9999,
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: '0.08em',
            }}
          >
            {persona.code}
          </span>
          <span
            style={{
              fontSize: 'clamp(16px,2vw,20px)',
              fontWeight: 700,
              color: colors.ink,
              letterSpacing: '-0.01em',
            }}
          >
            {persona.name}
          </span>
        </div>
        <p style={{ margin: '0 0 10px', fontSize: t.body.size, color: colors.inkMuted, lineHeight: 1.5 }}>
          {persona.age}세 · {persona.gender} · {persona.job}
        </p>
        <span
          style={{
            display: 'inline-block',
            padding: '3px 10px',
            border: `1px solid ${colors.line}`,
            borderRadius: 9999,
            fontSize: t.caption.size,
            color: colors.inkMuted,
          }}
        >
          {persona.skinType}
        </span>
      </div>

      {/* 탐색 루트 */}
      <div>
        <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: colors.inkMuted }}>
          탐색 루트
        </p>
        <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: colors.inkMuted, lineHeight: 1.6 }}>
          {persona.searchRoute}
        </p>
      </div>

      {/* 목표 + 불만 2열 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(12px,2vw,24px)',
        }}
        className="persona-inner-grid"
      >
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: colors.inkMuted }}>
            목표
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {persona.goals.map((g, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: colors.ok, fontWeight: 700, flexShrink: 0, lineHeight: 1.5 }}>—</span>
                <span style={{ fontSize: t.body.size, color: colors.ink, lineHeight: 1.5 }}>{g}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: colors.inkMuted }}>
            불만
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {persona.pains.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: colors.warn, fontWeight: 700, flexShrink: 0, lineHeight: 1.5 }}>—</span>
                <span style={{ fontSize: t.body.size, color: colors.inkMuted, lineHeight: 1.5 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AXIOM 접점 */}
      <div
        style={{
          padding: 'clamp(12px,1.5vw,16px) clamp(14px,2vw,20px)',
          background: colors.bgDeep,
          borderRadius: 8,
        }}
      >
        <span style={{ fontSize: t.caption.size, fontWeight: 700, color: colors.brand }}>
          AXIOM의 해결: {persona.axiomTouchpoint}
        </span>
      </div>

      {/* 대표 발화 */}
      <QuoteCard
        quote={persona.representativeQuote.text}
        speaker={speakers}
        delay={delay + 200}
      />
    </div>
  );
}

export default function Persona() {
  const [ref, visible] = useReveal({ threshold: 0.08 });

  return (
    <section
      id="persona"
      style={{
        background: colors.bg,
        fontFamily: font.family,
        padding: `clamp(32px,4vw,60px) clamp(20px,6vw,100px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="05 PERSONA"
          headline="리서치가 보여준 두 명의 사용자"
          sub="52명의 데이터와 12명의 인터뷰에서 발견한 핵심 페르소나"
          align="left"
        />

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(16px,2.5vw,32px)',
          }}
          className="persona-grid"
        >
          {personas.map((persona, i) => (
            <PersonaCard key={persona.code} persona={persona} delay={i * 150} visible={visible} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .persona-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .persona-inner-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
