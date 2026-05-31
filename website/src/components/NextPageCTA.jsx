import { Link } from 'react-router-dom';
import { colors, font, type as t, layout } from '../tokens/web.js';

export default function NextPageCTA({ to, label, hint }) {
  return (
    <section
      style={{
        fontFamily: font.family,
        borderTop: `1px solid ${colors.line}`,
        padding: `clamp(64px,8vw,120px) clamp(20px,6vw,100px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}
    >
      {hint && (
        <p style={{
          margin: 0,
          fontSize: t.caption.size,
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: colors.inkMuted,
        }}>
          {hint}
        </p>
      )}
      <Link
        to={to}
        className="btn-glow"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 16,
          padding: '18px 52px',
          borderRadius: 12,
          fontSize: t.lead.size,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          fontFamily: font.family,
          color: colors.ink,
        }}
      >
        {label} →
      </Link>
    </section>
  );
}
