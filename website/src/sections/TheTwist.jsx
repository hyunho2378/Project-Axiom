import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

export default function TheTwist() {
  const [ref, visible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="twist"
      style={{
        background: color.white,
        fontFamily: font.family,
        padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        ref={ref}
        style={{
          textAlign: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        }}
      >
        <p
          style={{
            fontSize: t.eyebrow.size,
            fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls,
            textTransform: t.eyebrow.transform,
            color: color.brand,
            margin: '0 0 32px',
          }}
        >
          The Twist
        </p>

        <h2
          style={{
            fontSize: t.h1.size,
            fontWeight: t.h1.weight,
            lineHeight: t.h1.lh,
            letterSpacing: t.h1.ls,
            color: color.ink,
            margin: '0 0 40px',
          }}
        >
          {'리서치 도중, 강릉페이 앱이'}
          <br />
          {'전면 '}
          <em style={{ color: color.brand, fontStyle: 'normal' }}>리뉴얼</em>
          {'됐습니다.'}
        </h2>

        <p
          style={{
            fontSize: t.lead.size,
            fontWeight: t.lead.weight,
            lineHeight: t.lead.lh,
            color: color.inkMuted,
            margin: 0,
            maxWidth: 560,
          }}
        >
          디자인으로 해결된 이슈는 덜어냈습니다.
          <br />
          화면이 바뀌었어도 끝까지 살아남은 진짜 문제만 선별했고,
          <br />
          이 과정에서 3가지 인사이트가 뚜렷해졌습니다.
        </p>
      </div>
    </section>
  );
}
