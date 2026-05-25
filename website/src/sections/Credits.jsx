import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import axiomData from '../data/axiom.json';

const { credits, meta, hero, overview } = axiomData;

export default function Credits() {
  const [ref, visible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="credits"
      style={{
        background: colors.bgDeep,
        fontFamily: font.family,
        padding: `clamp(64px,8vw,120px) clamp(20px,6vw,100px)`,
        textAlign: 'center',
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: layout.container,
          margin: '0 auto',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        {/* 워드마크 */}
        <p
          style={{
            margin: '0 0 8px',
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: colors.brand,
            fontFamily: "'BentonModDisp', 'Didot', 'Georgia', serif",
          }}
        >
          {hero.wordmark}
        </p>

        <p
          style={{
            margin: '0 0 clamp(24px,3vw,40px)',
            fontSize: t.body.size,
            color: colors.inkMuted,
            fontStyle: 'italic',
            letterSpacing: '0.02em',
          }}
        >
          {hero.tagline}
        </p>

        {/* 구분선 */}
        <div style={{ width: 48, height: 1, background: colors.line, margin: '0 auto clamp(24px,3vw,40px)' }} />

        {/* 팀 정보 */}
        <p style={{ margin: '0 0 4px', fontSize: t.body.size, fontWeight: 600, color: colors.ink }}>
          {credits.team}
        </p>
        <p style={{ margin: '0 0 4px', fontSize: 14, color: colors.inkMuted }}>{credits.school}</p>
        <p style={{ margin: '0 0 clamp(24px,3vw,40px)', fontSize: 14, color: colors.inkFaint }}>{credits.category} · {meta.date}</p>

        {/* 구분선 */}
        <div style={{ width: 48, height: 1, background: colors.line, margin: '0 auto clamp(24px,3vw,40px)' }} />

        {/* 기술 스택 chips */}
        <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkFaint }}>
          Tech Stack
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 'clamp(24px,3vw,40px)' }}>
          {overview.techTags.map((tag, i) => (
            <span
              key={i}
              style={{
                padding: '5px 14px',
                background: colors.bgCard,
                border: `1px solid ${colors.line}`,
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 500,
                color: colors.inkMuted,
                letterSpacing: '0.02em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 구분선 */}
        <div style={{ width: 48, height: 1, background: colors.line, margin: '0 auto clamp(24px,3vw,40px)' }} />

        {/* 레퍼런스 */}
        <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkFaint }}>
          References
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(8px,1.5vw,16px)', marginBottom: 'clamp(40px,5vw,64px)' }}>
          {credits.references.map((ref, i) => (
            <p key={i} style={{ margin: 0, fontSize: 13, color: colors.inkFaint, lineHeight: 1.5 }}>
              {ref}
            </p>
          ))}
        </div>

        {/* Copyright */}
        <p style={{ margin: 0, fontSize: 12, color: colors.inkFaint, letterSpacing: '0.04em' }}>
          © 2026 {credits.team} · All rights reserved
        </p>
      </div>
    </section>
  );
}
