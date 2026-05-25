import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const LINKS = [
  {
    label: 'iOS 버전',
    sub: 'iPhone · Face ID · HIG',
    href: 'https://gangneung-pay.vercel.app',
    accent: color.brand,
  },
  {
    label: 'Android 버전',
    sub: 'Galaxy · 지문인증 · MD3',
    href: 'https://gangneung-pay-android.vercel.app',
    accent: color.ok,
  },
];

export default function Prototype() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [ctaRef, ctaVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="prototype"
      style={{
        background: color.bg,
        fontFamily: font.family,
        padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={headRef}
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(56px,7vw,96px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px', fontFamily: font.family,
          }}>
            PROTOTYPE
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px', fontFamily: font.family,
          }}>
            직접 사용해보세요.
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 400,
            lineHeight: t.lead.lh, color: color.inkMuted,
            margin: 0, fontFamily: font.family,
          }}>
            iOS · Android 플랫폼별 실제 작동 프로토타입
          </p>
        </div>

        {/* CTA pair */}
        <div
          ref={ctaRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(20px,3vw,48px)',
          }}
        >
          {LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                textDecoration: 'none',
                opacity: ctaVisible ? 1 : 0,
                transform: ctaVisible ? 'none' : 'translateY(24px)',
                transition: `opacity 0.65s ease-out ${i * 0.1}s, transform 0.65s ease-out ${i * 0.1}s`,
              }}
            >
              <div style={{
                background: color.white,
                borderRadius: layout.rMd,
                padding: 'clamp(40px,5vw,72px) clamp(32px,4vw,56px)',
                boxShadow: '0 8px 40px rgba(29,78,216,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <p style={{
                  fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                  letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                  color: link.accent, margin: '0 0 16px', fontFamily: font.family,
                }}>
                  {link.sub}
                </p>
                <p style={{
                  fontSize: 'clamp(24px,2.8vw,40px)', fontWeight: 800,
                  lineHeight: 1.22, letterSpacing: '-0.02em',
                  color: color.ink, margin: '0 0 32px', fontFamily: font.family,
                }}>
                  {link.label}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  background: link.accent,
                  borderRadius: '999px',
                  color: color.white,
                  fontSize: 14, fontWeight: 700,
                  fontFamily: font.family,
                  letterSpacing: '0.04em',
                }}>
                  열어보기
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
