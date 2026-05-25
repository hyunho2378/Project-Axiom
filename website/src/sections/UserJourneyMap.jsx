import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

export default function UserJourneyMap() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [mapRef, mapVisible] = useReveal({ threshold: 0.03 });

  return (
    <section
      id="journey"
      style={{
        background: color.bg,
        fontFamily: font.family,
        padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>

        <div
          ref={headRef}
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(48px,6vw,80px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px',
          }}>
            USER JOURNEY MAP
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: 0, maxWidth: '28ch',
          }}>
            사용자가 겪는 5단계 여정과 마찰점
          </h2>
        </div>

        <div
          ref={mapRef}
          style={{
            opacity: mapVisible ? 1 : 0,
            transform: mapVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <img
            src="/cjm.svg"
            alt="강릉페이 사용자 여정 지도"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

      </div>
    </section>
  );
}
