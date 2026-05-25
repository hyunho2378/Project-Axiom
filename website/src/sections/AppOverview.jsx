import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

export default function AppOverview() {
  const [ref, visible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="app-overview"
      style={{
        background: color.white,
        fontFamily: font.family,
        padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            maxWidth: 720,
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px',
          }}>
            OVERVIEW
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 32px',
          }}>
            강력한 혜택, 그러나 정착하지 못한 앱
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 400,
            lineHeight: t.lead.lh, color: color.inkMuted,
            margin: '0 0 20px',
          }}>
            강릉페이는 10% 캐시백이라는 강력한 혜택에도 불구하고 시민의 일상 결제 수단으로 정착하지 못하고 있었습니다.
          </p>
          <p style={{
            fontSize: t.lead.size, fontWeight: 400,
            lineHeight: t.lead.lh, color: color.inkMuted,
            margin: 0,
          }}>
            잔액 확인을 위해 앱을 실행해야 하는 구조, 충전과 환불 사이의 불균형한 위계, 캐시백과 잔액이 혼재된 정보 설계가 서비스 전반의 신뢰를 낮추고 있었습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
