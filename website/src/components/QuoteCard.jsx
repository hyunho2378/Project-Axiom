import { colors, type as t } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

// quote: string  speaker: e.g. "P04"
export default function QuoteCard({ quote, speaker, delay = 0 }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      style={{
        padding: 'clamp(16px, 2vw, 28px)',
        borderRadius: 'clamp(8px, 1vw, 16px)',
        border: `1px solid ${colors.brand}`,
        background: 'rgba(0, 212, 255, 0.08)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <p style={{
        margin: '0 0 12px',
        fontSize: t.lead.size,
        lineHeight: t.lead.lh,
        color: colors.ink,
        fontStyle: 'normal',
        fontWeight: 500,
        wordBreak: 'keep-all',
      }}>
        &ldquo;{quote}&rdquo;
      </p>
      {speaker && (
        <p style={{
          margin: 0,
          fontSize: t.caption.size,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: colors.brand,
        }}>
          {speaker}
        </p>
      )}
    </div>
  );
}
