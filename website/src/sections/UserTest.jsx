import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

export default function UserTest() {
  const [ref, visible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="user-test"
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
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px', fontFamily: font.family,
          }}>
            USER TEST
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px', fontFamily: font.family,
          }}>
            사용성 평가를 진행할 예정입니다.
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 400,
            lineHeight: t.lead.lh, color: color.inkMuted,
            margin: '0 0 clamp(48px,6vw,80px)', fontFamily: font.family,
          }}>
            평가 완료 후 결과를 업데이트합니다.
          </p>

          {/* Placeholder area */}
          <div style={{
            border: `2px dashed ${color.line}`,
            borderRadius: layout.rMd,
            padding: 'clamp(64px,10vw,120px) clamp(32px,5vw,80px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            background: color.bg,
          }}>
            <p style={{
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: color.inkFaint, margin: 0, fontFamily: font.family,
            }}>
              COMING SOON
            </p>
            <p style={{
              fontSize: t.body.size, lineHeight: t.body.lh,
              color: color.inkFaint, margin: 0, fontFamily: font.family,
              textAlign: 'center', maxWidth: '40ch',
            }}>
              사용성 테스트 결과 — 과업 성공률 · 오류 빈도 · SUS 점수 — 평가 완료 후 채움
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
