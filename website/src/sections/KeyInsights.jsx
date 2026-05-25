import researchData from '../data/research.json';
import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const BG_CYCLE = [color.bg, color.white, color.bg, color.white, color.bg];

export default function KeyInsights() {
  const [r0, v0] = useReveal({ threshold: 0.05 });
  const [r1, v1] = useReveal({ threshold: 0.05 });
  const [r2, v2] = useReveal({ threshold: 0.05 });
  const [r3, v3] = useReveal({ threshold: 0.05 });
  const [r4, v4] = useReveal({ threshold: 0.05 });

  const revealPairs = [[r0, v0], [r1, v1], [r2, v2], [r3, v3], [r4, v4]];

  return (
    <section id="insights">
      {researchData.insights.map(({ no, title, body }, i) => {
        const [ref, vis] = revealPairs[i];
        return (
          <div
            key={no}
            style={{
              background: BG_CYCLE[i],
              overflow: 'hidden',
              padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
            }}
          >
            <div
              style={{
                maxWidth: layout.container,
                margin: '0 auto',
                position: 'relative',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-0.1em',
                  left: '-0.05em',
                  fontSize: 'clamp(100px,14vw,200px)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.05em',
                  color: color.brand,
                  opacity: 0.08,
                  zIndex: 0,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  fontFamily: font.family,
                }}
              >
                {no}
              </span>

              <div
                ref={ref}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  opacity: vis ? 1 : 0,
                  transform: vis ? 'none' : 'translateY(28px)',
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
                    fontFamily: font.family,
                  }}
                >
                  KEY INSIGHT {no}
                </p>

                <h2
                  style={{
                    fontSize: 'clamp(32px,4vw,60px)',
                    fontWeight: 800,
                    lineHeight: 1.22,
                    letterSpacing: '-0.03em',
                    color: color.ink,
                    margin: '0 0 28px',
                    fontFamily: font.family,
                  }}
                >
                  {title}
                </h2>

                <p
                  style={{
                    fontSize: t.body.size,
                    fontWeight: t.body.weight,
                    lineHeight: t.body.lh,
                    color: color.inkMuted,
                    margin: 0,
                    maxWidth: 560,
                    fontFamily: font.family,
                  }}
                >
                  {body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
