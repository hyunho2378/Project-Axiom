import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import heroData from '../data/axiom.json';

const { hero, meta } = heroData;

export default function Hero() {
  const [textRef, textVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="hero"
      style={{
        minHeight: '100svh',
        background: colors.bgDeep,
        fontFamily: font.family,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 본문 레이아웃 */}
      <div
        style={{
          maxWidth: layout.container,
          width: '100%',
          margin: '0 auto',
          padding: `clamp(80px,10vw,140px) clamp(20px,6vw,100px)`,
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) min(480px,50vw)',
          gap: 'clamp(32px,4vw,80px)',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* LEFT: 텍스트 */}
        <div
          ref={textRef}
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'none' : 'translateY(32px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          {/* eyebrow */}
          <p
            style={{
              margin: '0 0 clamp(16px,2vw,28px)',
              fontSize: t.eyebrow.size,
              fontWeight: t.eyebrow.weight,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: colors.brand,
            }}
          >
            {meta.team} · {meta.purpose}
          </p>

          {/* 워드마크 */}
          <h1
            style={{
              margin: '0 0 clamp(12px,1.5vw,20px)',
              fontSize: 'clamp(64px,12vw,160px)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: colors.ink,
              fontFamily: "'BentonModDisp', 'Didot', 'Georgia', serif",
            }}
          >
            {hero.wordmark}
          </h1>

          {/* slogan */}
          <p
            style={{
              margin: '0 0 clamp(20px,3vw,40px)',
              fontSize: 'clamp(16px,2vw,24px)',
              fontWeight: 400,
              letterSpacing: '0.02em',
              color: colors.inkMuted,
            }}
          >
            {hero.tagline}
          </p>

          {/* description */}
          <p
            style={{
              margin: '0 0 clamp(28px,4vw,48px)',
              fontSize: t.lead.size,
              lineHeight: t.lead.lh,
              color: colors.inkFaint,
              maxWidth: '44ch',
            }}
          >
            {hero.definition}
          </p>

          {/* CTA */}
          <a
            href={meta.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: 'clamp(12px,1.2vw,16px) clamp(24px,2.5vw,36px)',
              borderRadius: 9999,
              background: colors.brand,
              color: colors.bgDeep,
              fontSize: t.lead.size,
              fontWeight: 700,
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              fontFamily: font.family,
              transition: 'background 0.18s, transform 0.18s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.brandStrong;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.brand;
              e.currentTarget.style.transform = 'none';
            }}
          >
            {hero.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* RIGHT: 3D iframe */}
        <div
          aria-hidden="true"
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: 'clamp(12px,1.5vw,24px)',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <iframe
            src="/3d-ref/axiom-crystal-v3.html"
            title="AXIOM Crystal Orb"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              pointerEvents: 'none',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* 하단 스크롤 힌트 */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: 0.4,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: colors.inkMuted }}>
          scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: `linear-gradient(to bottom, ${colors.inkFaint}, transparent)`,
          }}
        />
      </div>

      {/* 모바일 반응형 스타일 */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-grid > div:last-child {
            width: 100% !important;
            height: 280px !important;
            aspect-ratio: unset !important;
          }
        }
      `}</style>
    </section>
  );
}
