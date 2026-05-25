import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import axiomData from '../data/axiom.json';

const { overview, meta } = axiomData;

export default function Overview() {
  const [leftRef, leftVisible] = useReveal({ threshold: 0.1 });
  const [rightRef, rightVisible] = useReveal({ threshold: 0.1 });
  const [stackRef, stackVisible] = useReveal({ threshold: 0.2 });

  return (
    <section
      id="overview"
      style={{
        background: colors.bg,
        fontFamily: font.family,
        padding: `clamp(64px,8vw,120px) clamp(20px,6vw,100px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <SectionHeader eyebrow="OVERVIEW" headline={meta.title} align="left" />

        {/* 2열 본문 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(32px,5vw,80px)',
            marginBottom: 'clamp(48px,6vw,80px)',
          }}
          className="overview-grid"
        >
          {/* 좌측: headline + description */}
          <div
            ref={leftRef}
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <h2
              style={{
                margin: '0 0 clamp(16px,2vw,28px)',
                fontSize: t.h2.size,
                fontWeight: t.h2.weight,
                lineHeight: 1.3,
                letterSpacing: t.h2.ls,
                color: colors.ink,
                whiteSpace: 'pre-line',
              }}
            >
              {overview.headline}
            </h2>
            <p
              style={{
                margin: '0 0 clamp(16px,2vw,24px)',
                fontSize: t.lead.size,
                lineHeight: t.lead.lh,
                color: colors.inkMuted,
              }}
            >
              {overview.description}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: t.body.size,
                lineHeight: t.body.lh,
                color: colors.inkFaint,
                fontStyle: 'italic',
              }}
            >
              {overview.previousFailure}
            </p>
          </div>

          {/* 우측: roles 카드 4개 */}
          <div
            ref={rightRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
            }}
          >
            {overview.roles.map((role, i) => (
              <div
                key={i}
                style={{
                  background: colors.bgCard,
                  borderLeft: `2px solid ${colors.brand}`,
                  borderRadius: `0 clamp(8px,1vw,12px) clamp(8px,1vw,12px) 0`,
                  padding: 'clamp(14px,1.5vw,20px) clamp(16px,2vw,24px)',
                  opacity: rightVisible ? 1 : 0,
                  transform: rightVisible ? 'none' : 'translateX(16px)',
                  transition: `opacity 0.5s ease ${0.1 + i * 80}ms, transform 0.5s ease ${0.1 + i * 80}ms`,
                }}
              >
                <p
                  style={{
                    margin: '0 0 4px',
                    fontSize: t.body.size,
                    fontWeight: 700,
                    color: colors.ink,
                    letterSpacing: '0.02em',
                  }}
                >
                  {role.label}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: t.caption.size,
                    lineHeight: 1.6,
                    color: colors.inkMuted,
                  }}
                >
                  {role.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 하단: 기술 스택 태그 */}
        <div
          ref={stackRef}
          style={{
            opacity: stackVisible ? 1 : 0,
            transform: stackVisible ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p
            style={{
              margin: '0 0 12px',
              fontSize: t.caption.size,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colors.inkFaint,
            }}
          >
            Tech Stack
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {overview.techTags.map((tag, i) => (
              <span
                key={i}
                style={{
                  padding: '5px 14px',
                  border: `1px solid ${colors.line}`,
                  borderRadius: 9999,
                  fontSize: t.caption.size,
                  fontWeight: 500,
                  color: colors.inkMuted,
                  letterSpacing: '0.02em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .overview-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
