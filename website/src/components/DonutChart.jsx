import { colors, type as t } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const AXIOM_PALETTE = ['#00D4FF', '#2A6885', '#5A9AB5', '#082B35'];

// segments: [{ label, pct, color? }]
export default function DonutChart({ title, subtitle, segments = [], source }) {
  const [ref, visible] = useReveal();
  const size = 160;
  const stroke = 22;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;

  // Build arc offsets
  let offset = 0;
  const arcs = segments.map((seg, i) => {
    const dasharray = (seg.pct / 100) * circ;
    const arc = {
      dasharray,
      dashoffset: circ - offset * circ / 100,
      color: seg.color || AXIOM_PALETTE[i % AXIOM_PALETTE.length],
      pct: seg.pct,
      label: seg.label,
    };
    offset += seg.pct;
    return arc;
  });

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
      {title && (
        <div>
          <p style={{ margin: '0 0 4px', fontSize: t.h3.size, fontWeight: t.h3.weight, color: colors.ink }}>{title}</p>
          {subtitle && <p style={{ margin: 0, fontSize: t.caption.size, color: colors.inkMuted }}>{subtitle}</p>}
        </div>
      )}

      <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* SVG donut */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ flexShrink: 0, transform: 'rotate(-90deg)' }}
        >
          {/* track */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={colors.line}
            strokeWidth={stroke}
          />
          {/* segments */}
          {visible && (() => {
            let cumulativePct = 0;
            return segments.map((seg, i) => {
              const dasharray = (seg.pct / 100) * circ;
              const dashoffset = circ - (cumulativePct / 100) * circ;
              cumulativePct += seg.pct;
              return (
                <circle
                  key={i}
                  cx={size / 2} cy={size / 2} r={r}
                  fill="none"
                  stroke={seg.color || AXIOM_PALETTE[i % AXIOM_PALETTE.length]}
                  strokeWidth={stroke}
                  strokeDasharray={`${dasharray} ${circ - dasharray}`}
                  strokeDashoffset={dashoffset}
                  style={{ transition: `stroke-dasharray 0.8s ease ${i * 120}ms` }}
                />
              );
            });
          })()}
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {segments.map((seg, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 10, height: 10, borderRadius: 2,
                background: seg.color || AXIOM_PALETTE[i % AXIOM_PALETTE.length],
                flexShrink: 0,
              }} />
              <span style={{ fontSize: t.body.size, color: colors.inkMuted }}>{seg.label}</span>
              <span style={{ fontSize: t.body.size, fontWeight: 700, color: colors.ink, marginLeft: 'auto', paddingLeft: 12 }}>
                {seg.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {source && (
        <p style={{ margin: 0, fontSize: t.caption.size, color: colors.inkMuted }}>{source}</p>
      )}
    </div>
  );
}
