import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import axiomData from '../data/axiom.json';

const { hero } = axiomData;

export default function Credits() {
  const [ref, visible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="credits"
      style={{
        background: colors.bgDeep,
        fontFamily: font.family,
        padding: `clamp(32px,4vw,60px) clamp(20px,6vw,100px)`,
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

        {/* Copyright */}
        <p style={{ margin: 0, fontSize: 12, color: colors.inkMuted, letterSpacing: '0.04em' }}>
          © 2026 AXIOM Inc. All rights reserved.
        </p>
      </div>
    </section>
  );
}
