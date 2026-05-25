import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const META = [
  { label: 'TEAM', value: '마카모예' },
  { label: 'PERIOD', value: '2026.03.29 — 04.06' },
  { label: 'PRESENTED', value: '2026.05.31' },
];

export default function ProjectOverview() {
  const [ref, visible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="overview"
      style={{
        background: color.white,
        fontFamily: font.family,
        padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <p
            style={{
              fontSize: t.eyebrow.size,
              fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls,
              textTransform: t.eyebrow.transform,
              color: color.brand,
              margin: '0 0 24px',
            }}
          >
            Project Overview
          </p>

          <h2
            style={{
              fontSize: 'clamp(40px,5vw,80px)',
              fontWeight: 800,
              lineHeight: 1.22,
              letterSpacing: '-0.035em',
              color: color.ink,
              margin: '0 0 24px',
              maxWidth: '14ch',
            }}
          >
            We Rebuild the Local Currency Experience
          </h2>

          <p
            style={{
              fontSize: t.lead.size,
              fontWeight: t.lead.weight,
              lineHeight: t.lead.lh,
              color: color.inkMuted,
              margin: '0 0 56px',
              maxWidth: 540,
            }}
          >
            강릉시 지역화폐 강릉페이를 처음부터 다시 설계했습니다.
          </p>

          <div style={{ display: 'flex', gap: 'clamp(24px,4vw,56px)', flexWrap: 'wrap' }}>
            {META.map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0em',
                    textTransform: 'uppercase',
                    color: color.inkFaint,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: color.inkMuted,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
