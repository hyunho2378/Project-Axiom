import { colors, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

export default function SectionHeader({ eyebrow, headline, sub, align = 'left' }) {
  const [ref, visible] = useReveal();

  const textAlign = align === 'center' ? 'center' : 'left';

  return (
    <div
      ref={ref}
      style={{
        marginBottom: 'clamp(40px, 5vw, 72px)',
        textAlign,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {eyebrow && (
        <p style={{
          margin: '0 0 12px',
          fontSize: t.eyebrow.size,
          fontWeight: t.eyebrow.weight,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: colors.brand,
        }}>
          {eyebrow}
        </p>
      )}
      <h2 style={{
        margin: '0',
        fontSize: t.h1.size,
        fontWeight: t.h1.weight,
        lineHeight: t.h1.lh,
        letterSpacing: t.h1.ls,
        color: colors.ink,
      }}>
        {headline}
      </h2>
      {sub && (
        <p style={{
          margin: '16px 0 0',
          fontSize: t.lead.size,
          lineHeight: t.lead.lh,
          color: colors.inkMuted,
          maxWidth: align === 'center' ? '56ch' : '60ch',
          marginLeft: align === 'center' ? 'auto' : undefined,
          marginRight: align === 'center' ? 'auto' : undefined,
        }}>
          {sub}
        </p>
      )}
    </div>
  );
}
