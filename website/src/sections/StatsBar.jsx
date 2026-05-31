import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useCountUp } from '../lib/useCountUp.js';
import axiomData from '../data/axiom.json';

const { stats } = axiomData;

function StatCard({ item, index, visible }) {
  const [countRef, value] = useCountUp(item.value, 1400);

  return (
    <div
      ref={countRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'clamp(24px,3vw,40px) clamp(16px,2vw,32px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
      }}
    >
      {/* 수치 */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
        <span
          style={{
            fontSize: 'clamp(40px,6vw,72px)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: colors.brand,
            fontFamily: font.display,
          }}
        >
          {value.toLocaleString()}
        </span>
        <span
          style={{
            fontSize: 'clamp(20px,3vw,36px)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: colors.brand,
            fontFamily: font.display,
          }}
        >
          {item.unit}
        </span>
      </div>

      {/* label */}
      <p
        style={{
          margin: '0 0 6px',
          fontSize: 14,
          fontWeight: 500,
          color: colors.inkMuted,
          lineHeight: 1.4,
        }}
      >
        {item.label}
      </p>

      {/* source */}
      <p
        style={{
          margin: 0,
          fontSize: 12,
          color: colors.inkMuted,
          lineHeight: 1.4,
        }}
      >
        {item.source}
      </p>
    </div>
  );
}

export default function StatsBar() {
  const [ref, visible] = useReveal({ threshold: 0.2 });

  return (
    <section
      id="stats"
      ref={ref}
      style={{
        background: colors.bgCard,
        fontFamily: font.family,
        padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,80px)',
      }}
    >
      <div
        style={{
          maxWidth: layout.container,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          position: 'relative',
        }}
        className="stats-grid"
      >
        {stats.map((item, i) => (
          <div key={i} style={{ position: 'relative' }}>
            {/* 세로 구분선 (첫 번째 카드 제외) */}
            {i > 0 && (
              <div
                className="stats-divider"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '20%',
                  height: '60%',
                  width: 1,
                  background: colors.line,
                }}
              />
            )}
            <StatCard item={item} index={i} visible={visible} />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-divider {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
