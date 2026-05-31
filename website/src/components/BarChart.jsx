import { colors, type as t } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

// bars: [{ label, pct }]  — pct 0~100
export default function BarChart({ title, subtitle, bars = [], source }) {
  const [ref, visible] = useReveal();
  const max = Math.max(...bars.map((b) => b.pct), 1);

  return (
    <div ref={ref} style={{ width: '100%' }}>
      {title && (
        <p style={{
          margin: '0 0 4px',
          fontSize: t.h3.size,
          fontWeight: t.h3.weight,
          color: colors.ink,
        }}>
          {title}
        </p>
      )}
      {subtitle && (
        <p style={{
          margin: '0 0 20px',
          fontSize: t.caption.size,
          color: colors.inkMuted,
        }}>
          {subtitle}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {bars.map((bar, i) => (
          <div key={i}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}>
              <span style={{ fontSize: t.body.size, color: colors.inkMuted }}>{bar.label}</span>
              <span style={{
                fontSize: t.body.size,
                fontWeight: 700,
                color: colors.brand,
              }}>
                {bar.pct}%
              </span>
            </div>
            <div style={{
              height: 6,
              borderRadius: 999,
              background: colors.line,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                borderRadius: 999,
                width: visible ? `${(bar.pct / max) * 100}%` : '0%',
                background: i === 0
                  ? colors.brand
                  : i === 1
                    ? colors.brandMid
                    : colors.brandDeep,
                transition: `width 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms`,
              }} />
            </div>
          </div>
        ))}
      </div>

      {source && (
        <p style={{
          margin: '16px 0 0',
          fontSize: t.caption.size,
          color: colors.inkMuted,
        }}>
          {source}
        </p>
      )}
    </div>
  );
}
