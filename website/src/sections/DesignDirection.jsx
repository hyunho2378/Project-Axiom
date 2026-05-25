import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const AXES = [
  {
    num: '01',
    title: '투명한 정보 노출',
    items: [
      '앱 진입 전에도 보이는 잔액',
      '충전과 환불의 동등한 위계',
      '혜택이 숫자가 아닌 감각으로',
    ],
  },
  {
    num: '02',
    title: '막힘없는 직진형 프로세스',
    items: [
      '충전 3단계 압축',
      '잔액 부족 사전 차단',
      '가맹점 실시간 신뢰',
    ],
  },
];

export default function DesignDirection() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [axisRef, axisVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="direction"
      style={{
        background: color.white,
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
            color: color.brand, margin: '0 0 24px',
          }}>
            DESIGN DIRECTION
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: 0, maxWidth: '22ch',
          }}>
            두 개의 축으로<br />방향을 잡았습니다.
          </h2>
        </div>

        {/* Two axes */}
        <div
          ref={axisRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(40px,7vw,120px)',
          }}
        >
          {AXES.map(({ num, title, items }, i) => (
            <div
              key={num}
              style={{
                opacity: axisVisible ? 1 : 0,
                transform: axisVisible ? 'none' : 'translateY(28px)',
                transition: `opacity 0.7s ease-out ${i * 0.18}s, transform 0.7s ease-out ${i * 0.18}s`,
              }}
            >
              {/* Large number */}
              <span style={{
                display: 'block',
                fontSize: 'clamp(72px,10vw,140px)',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                color: color.brand,
                marginBottom: 'clamp(16px,2vw,28px)',
                fontFamily: font.family,
              }}>
                {num}
              </span>

              {/* Axis title */}
              <h3 style={{
                fontSize: 'clamp(22px,2.6vw,38px)',
                fontWeight: 800,
                lineHeight: 1.22,
                letterSpacing: '-0.03em',
                color: color.ink,
                margin: '0 0 clamp(20px,2.5vw,32px)',
                fontFamily: font.family,
              }}>
                {title}
              </h3>

              {/* Accent bar */}
              <div style={{
                width: 'clamp(28px,3.5vw,48px)',
                height: 3,
                background: color.brand,
                borderRadius: 2,
                marginBottom: 'clamp(24px,3vw,36px)',
              }} />

              {/* Items */}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {items.map((item, j) => (
                  <li
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                      paddingBottom: 18,
                      marginBottom: j < items.length - 1 ? 18 : 0,
                      borderBottom: j < items.length - 1 ? `1px solid ${color.line}` : 'none',
                    }}
                  >
                    <span style={{
                      color: color.brand, fontWeight: 800,
                      fontSize: 14, flexShrink: 0,
                      lineHeight: 1.65, fontFamily: font.family,
                    }}>
                      —
                    </span>
                    <span style={{
                      fontSize: 'clamp(15px,1.4vw,18px)',
                      fontWeight: 500,
                      lineHeight: 1.65,
                      color: color.inkMuted,
                      fontFamily: font.family,
                    }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
