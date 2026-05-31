import { Link, useLocation } from 'react-router-dom';
import { colors, font, layout } from '../tokens/web.js';

const LINKS = [
  { label: 'Overview',   to: '/' },
  { label: 'Research',   to: '/research' },
  { label: 'Strategy',   to: '/strategy' },
  { label: 'BX',         to: '/bx' },
  { label: 'Data Logic', to: '/data-logic' },
  { label: '3D GALLERY', to: '/demo' },
];

export default function Nav() {
  const { pathname } = useLocation();

  const isActive = (to) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(4,10,18,0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.line}`,
        fontFamily: font.family,
      }}
    >
      <div
        style={{
          maxWidth: layout.container,
          margin: '0 auto',
          padding: '0 clamp(20px,5vw,80px)',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        {/* 워드마크 */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            flexShrink: 0,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: colors.brand,
            fontFamily: "'BentonModDisp', 'Didot', 'Georgia', serif",
          }}
        >
          AXIOM
        </Link>

        {/* 네비게이션 링크 */}
        <ul
          style={{
            display: 'flex',
            gap: 'clamp(12px,2vw,32px)',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="nav-links"
        >
          {LINKS.map(({ label, to }) => {
            const active = isActive(to);
            return (
              <li key={to}>
                <Link
                  to={to}
                  style={{
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: active ? 700 : 500,
                    color: active ? colors.brand : colors.inkMuted,
                    letterSpacing: '-0.01em',
                    transition: 'color 0.18s',
                    borderBottom: active ? `1px solid ${colors.brand}` : '1px solid transparent',
                    paddingBottom: 2,
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = colors.ink; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = colors.inkMuted; }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>


      </div>

      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
