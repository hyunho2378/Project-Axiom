import { color, font, type as t } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

export default function UxConcept() {
  const [ref, visible] = useReveal({ threshold: 0.15 });

  return (
    <section
      id="concept"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        minHeight: 'clamp(480px,60vh,800px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        /* Photo placeholder — replace backgroundImage with url('/assets/photo/gangneung.jpg') */
        background: color.ink,
      }}
    >
      {/* Overlay — stays in place when real photo is set */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: color.photoOverlay,
          pointerEvents: 'none',
        }}
      />

      {/* Photo placeholder label */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'clamp(16px,2vw,24px)',
          right: 'clamp(16px,2vw,24px)',
          fontSize: 11, fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: color.whiteA50,
          fontFamily: font.family,
        }}
      >
        강릉 바다·하늘 사진 교체 예정
      </div>

      {/* Content */}
      <div
        ref={ref}
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: 'clamp(48px,8vw,120px) clamp(20px,5vw,80px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(32px)',
          transition: 'opacity 0.9s ease-out, transform 0.9s ease-out',
        }}
      >
        {/* Eyebrow */}
        <p style={{
          fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
          letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
          color: color.whiteA60,
          margin: '0 0 clamp(20px,3vw,36px)',
          fontFamily: font.family,
        }}>
          UX CONCEPT
        </p>

        {/* Main headline */}
        <h2 style={{
          fontSize: 'clamp(48px,8vw,120px)',
          fontWeight: 800,
          lineHeight: 1.22,
          letterSpacing: '-0.04em',
          color: color.white,
          margin: '0 0 clamp(20px,2.5vw,32px)',
          fontFamily: font.family,
        }}>
          내 돈이 내 편인 앱
        </h2>

        {/* Statement */}
        <p style={{
          fontSize: 'clamp(16px,1.6vw,22px)',
          fontWeight: 400,
          lineHeight: 1.75,
          color: color.whiteA60,
          margin: 0,
          maxWidth: '36ch',
          marginLeft: 'auto',
          marginRight: 'auto',
          fontFamily: font.family,
        }}>
          묻지 않아도 보이는, 헤매지 않는 금융 경험
        </p>
      </div>
    </section>
  );
}
