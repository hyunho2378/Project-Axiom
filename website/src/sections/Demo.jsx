import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import axiomData from '../data/axiom.json';

const { demo } = axiomData;

export default function Demo() {
  const [ref, visible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="demo"
      style={{
        background: colors.bgDeep,
        fontFamily: font.family,
        padding: `clamp(64px,8vw,120px) clamp(20px,6vw,100px)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 장식 iframe */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.25,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <iframe
          src="/3d-ref/axiom-crystal-v3.html"
          title=""
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </div>

      {/* 콘텐츠 */}
      <div
        style={{
          maxWidth: layout.container,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <SectionHeader
          eyebrow="11 DEMO"
          headline="AXIOM 라이브 서비스"
          sub="직접 체험하기"
          align="center"
        />

        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <a
            href={demo.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              padding: '20px 64px',
              borderRadius: 16,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontFamily: font.family,
              marginBottom: 16,
            }}
          >
            BEGIN ANALYSIS →
          </a>

          <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: colors.inkMuted, letterSpacing: '0.02em' }}>
            {demo.liveUrl}
          </p>
        </div>
      </div>
    </section>
  );
}
