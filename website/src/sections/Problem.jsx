import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import QuoteCard from '../components/QuoteCard.jsx';
import axiomData from '../data/axiom.json';

const { problem } = axiomData;

function NarrativeFlow({ items, visible }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 0,
        marginBottom: 'clamp(48px,6vw,80px)',
        overflowX: 'auto',
        paddingBottom: 8,
      }}
      className="narrative-flow"
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 200,
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(20px)',
              transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: i === items.length - 1 ? colors.brand : 'transparent',
                border: `2px solid ${i === items.length - 1 ? colors.brand : colors.line}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 700,
                color: i === items.length - 1 ? colors.bgDeep : colors.inkMuted,
                marginBottom: 12,
                flexShrink: 0,
              }}
            >
              {String(item.step).padStart(2, '0')}
            </div>
            <p
              style={{
                margin: '0 0 6px',
                fontSize: t.body.size,
                fontWeight: 600,
                color: i === items.length - 1 ? colors.brand : colors.ink,
                textAlign: 'center',
                lineHeight: 1.4,
              }}
            >
              {item.text}
            </p>
            {item.stat && (
              <p
                style={{
                  margin: 0,
                  fontSize: t.caption.size,
                  color: colors.inkMuted,
                  textAlign: 'center',
                  lineHeight: 1.4,
                }}
              >
                {item.stat}
              </p>
            )}
          </div>
          {i < items.length - 1 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: 8,
                flexShrink: 0,
                opacity: visible ? 0.4 : 0,
                transition: `opacity 0.5s ease ${i * 100 + 200}ms`,
              }}
            >
              <svg width="32" height="16" viewBox="0 0 32 16" fill="none" style={{ margin: '0 8px' }}>
                <path d="M0 8h28M22 2l8 6-8 6" stroke={colors.brand} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function StatCards({ cards, visible }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'clamp(12px,2vw,20px)',
        marginBottom: 'clamp(48px,6vw,80px)',
      }}
      className="stat-cards-grid"
    >
      {cards.map((card, i) => (
        <div
          key={card.id}
          style={{
            background: colors.bgCard,
            borderTop: `2px solid ${colors.brand}`,
            borderRadius: 'clamp(8px,1vw,12px)',
            padding: 'clamp(20px,2.5vw,32px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
          }}
        >
          <p
            style={{
              margin: '0 0 8px',
              fontSize: 'clamp(32px,5vw,56px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: colors.brand,
            }}
          >
            {card.stat}
          </p>
          <p
            style={{
              margin: '0 0 6px',
              fontSize: t.body.size,
              fontWeight: 500,
              color: colors.ink,
              lineHeight: 1.4,
            }}
          >
            {card.label}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: t.caption.size,
              color: colors.inkMuted,
              lineHeight: 1.4,
            }}
          >
            {card.source}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Problem() {
  const [headerRef, headerVisible] = useReveal({ threshold: 0.1 });
  const [narrativeRef, narrativeVisible] = useReveal({ threshold: 0.1 });
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.1 });
  const [problemsRef, problemsVisible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="problem"
      style={{
        background: colors.bgDeep,
        fontFamily: font.family,
        padding: `clamp(64px,8vw,120px) clamp(20px,6vw,100px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="03 PROBLEM"
            headline="왜 사람들은 뷰티 앱을 쓰고도 제품을 못 사는가"
            sub="데스크 리서치와 유저 리서치에서 공통적으로 나타난 세 가지 핵심 문제"
            align="left"
          />
        </div>

        <div ref={narrativeRef}>
          <NarrativeFlow items={problem.narrative} visible={narrativeVisible} />
        </div>

        <div ref={cardsRef}>
          <StatCards cards={problem.cards} visible={cardsVisible} />
        </div>

        <div ref={problemsRef}>
          <p
            style={{
              margin: '0 0 clamp(24px,3vw,40px)',
              fontSize: t.caption.size,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colors.inkMuted,
            }}
          >
            문제 정의
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(32px,4vw,56px)',
            }}
          >
            {problem.problems.map((p, i) => (
              <div
                key={p.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'clamp(24px,4vw,64px)',
                  alignItems: 'start',
                  opacity: problemsVisible ? 1 : 0,
                  transform: problemsVisible ? 'none' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                  paddingBottom: 'clamp(32px,4vw,56px)',
                  borderBottom: i < problem.problems.length - 1 ? `1px solid ${colors.line}` : 'none',
                }}
                className="problem-definition-row"
              >
                <div>
                  <p
                    style={{
                      margin: '0 0 8px',
                      fontSize: t.caption.size,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: colors.brand,
                    }}
                  >
                    {p.stat} {p.statLabel}
                  </p>
                  <h3
                    style={{
                      margin: '0 0 clamp(12px,1.5vw,20px)',
                      fontSize: t.h2.size,
                      fontWeight: 700,
                      lineHeight: 1.3,
                      letterSpacing: t.h2.ls,
                      color: colors.ink,
                      wordBreak: 'keep-all',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: t.body.size,
                      lineHeight: t.body.lh,
                      color: colors.inkMuted,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
                <div style={{ paddingTop: 'clamp(0px,1vw,8px)' }}>
                  <QuoteCard quote={p.quote} speaker={p.quoteSource} delay={i * 120 + 200} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .problem-definition-row {
            grid-template-columns: 1fr !important;
          }
          .stat-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .narrative-flow {
            padding-bottom: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
