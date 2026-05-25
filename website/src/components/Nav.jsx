import { colors, font, layout } from '../tokens/web.js';

const LINKS = [
  { label: 'Overview',   href: '#overview' },
  { label: 'Research',   href: '#research' },
  { label: 'Strategy',   href: '#ux-strategy' },
  { label: 'BX',         href: '#bx' },
  { label: 'Data Logic', href: '#data-logic' },
  { label: 'Demo',       href: '#demo' },
];

export default function Nav() {
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
        <a
          href="#hero"
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
        </a>

        {/* 앵커 링크 */}
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
          {LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                style={{
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 500,
                  color: colors.inkMuted,
                  letterSpacing: '-0.01em',
                  transition: 'color 0.18s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.ink)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.inkMuted)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* GitHub 링크 */}
        <a
          href="https://github.com/hyunho2378/Gangneung-Pay"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: 100,
            color: colors.inkMuted,
            flexShrink: 0,
            transition: 'color 0.18s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = colors.ink)}
          onMouseLeave={(e) => (e.currentTarget.style.color = colors.inkMuted)}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
