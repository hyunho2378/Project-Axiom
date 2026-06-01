import { Link } from 'react-router-dom';
import { colors, font, type as t, layout } from '../tokens/web.js';

export default function NextPageCTA({ to, label, hint }) {
  return (
    <section
      style={{
        fontFamily: font.family,
        borderTop: `1px solid ${colors.line}`,
        padding: `clamp(64px,8vw,120px) clamp(20px,5vw,80px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Link
        to={to}
        className="btn-glow"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 16,
          padding: '18px 52px',
          borderRadius: layout.rLg,
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
