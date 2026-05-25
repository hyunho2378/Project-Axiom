import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const ITEMS = [
  {
    label: '서비스 소개',
    content: '강릉시 지역 경제 활성화를 목적으로 운영되는 충전식 선불카드 기반의 로컬 금융·정책 앱',
  },
  {
    label: '핵심 타겟',
    content: '마트, 식당, 시장 등 생활 소비 지출이 일상적으로 활발한 30대~50대 강릉 시민 및 소상공인',
  },
  {
    label: '앱의 가치',
    content: '카드 발급, 충전, 결제, 캐시백 등 강릉 시민들의 실제 돈이 움직이는 가장 사용 빈도가 높은 필수 로컬 서비스',
  },
];

export default function ServiceAnalysis() {
  const [headRef, headVisible] = useReveal({ threshold: 0.1 });
  const [listRef, listVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="service"
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
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px',
          }}>
            LOCAL APP SELECTION
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: 0, maxWidth: '32ch',
          }}>
            강릉페이, 강릉 시민의 스마트한 일상 소비와 지역 상권을 잇는 모바일 지갑
          </h2>
        </div>

        <div ref={listRef}>
          {ITEMS.map(({ label, content }, i) => (
            <div
              key={label}
              style={{
                display: 'grid',
                gridTemplateColumns: 'clamp(100px,14vw,180px) 1fr',
                gap: '16px clamp(24px,3vw,48px)',
                padding: 'clamp(20px,2.5vw,28px) 0',
                borderTop: `1px solid ${color.line}`,
                opacity: listVisible ? 1 : 0,
                transform: listVisible ? 'none' : 'translateY(16px)',
                transition: `opacity 0.55s ease-out ${i * 0.1}s, transform 0.55s ease-out ${i * 0.1}s`,
              }}
            >
              <span style={{
                fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                color: color.inkFaint, paddingTop: 2,
              }}>
                {label}
              </span>
              <span style={{
                fontSize: t.lead.size, fontWeight: 400,
                lineHeight: t.lead.lh, color: color.ink,
              }}>
                {content}
              </span>
            </div>
          ))}
          <div style={{ height: 1, background: color.line }} />
        </div>

      </div>
    </section>
  );
}
