import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const CLUSTERS = [
  {
    letter: 'A',
    name: '잔액 불안과 계산대 수치심',
    desc: '계산대 앞 잔액 확인 실패 → 결제 포기, 민망 심리. 발화 집중도 최고.',
    accent: true,
  },
  {
    letter: 'B',
    name: '환불/충전 자금 통제 불능',
    desc: '4인 전원 환불 메뉴 탐색 실패. 충전은 복잡하고 환불은 더 어렵다.',
    accent: false,
  },
  {
    letter: 'C',
    name: '용어·IA 정보 위계 붕괴',
    desc: '"강릉머니" 등 사용자 비언어. 큰글씨모드에서만 환불 노출 = 다크 패턴.',
    accent: false,
  },
  {
    letter: 'D',
    name: 'B2C/B2B 인터페이스 충돌',
    desc: 'B2B 가맹점 관리 기능이 B2C 소비자 화면에 혼재.',
    accent: false,
  },
  {
    letter: 'E',
    name: '캐시백 단일 생존 의존 구조',
    desc: '캐시백 10% 외 사용 이유 없음. 혜택 감소 시 전 그룹 즉시 이탈.',
    accent: false,
  },
];

export default function AffinityDiagram() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [clustersRef, clustersVisible] = useReveal({ threshold: 0.03 });

  return (
    <section
      id="affinity"
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
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          <p
            style={{
              fontSize: t.eyebrow.size,
              fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls,
              textTransform: t.eyebrow.transform,
              color: color.brand,
              margin: '0 0 24px',
            }}
          >
            Affinity Diagram
          </p>
          <h2
            style={{
              fontSize: t.h1.size,
              fontWeight: t.h1.weight,
              lineHeight: t.h1.lh,
              letterSpacing: t.h1.ls,
              color: color.ink,
              margin: 0,
              maxWidth: '22ch',
            }}
          >
            87개 메모에서 5개의 패턴이 나왔습니다.
          </h2>
        </div>

        {/* Cluster list */}
        <div ref={clustersRef}>
          {CLUSTERS.map(({ letter, name, desc, accent }, i) => (
            <div
              key={letter}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'clamp(24px,3vw,48px)',
                padding: 'clamp(24px,3vw,40px) 0',
                opacity: clustersVisible ? 1 : 0,
                transform: clustersVisible ? 'none' : 'translateY(24px)',
                transition: `opacity 0.6s ease-out ${i * 0.08}s, transform 0.6s ease-out ${i * 0.08}s`,
              }}
            >
              {/* Letter */}
              <span
                style={{
                  fontSize: 'clamp(64px,8vw,100px)',
                  fontWeight: 800,
                  lineHeight: 1,
                  color: accent ? color.brand : color.line,
                  flexShrink: 0,
                  letterSpacing: '-0.04em',
                  fontFamily: font.family,
                  width: '1.1ch',
                }}
              >
                {letter}
              </span>

              {/* Content */}
              <div style={{ flex: 1, paddingTop: 'clamp(8px,1vw,16px)' }}>
                <h3
                  style={{
                    fontSize: t.h3.size,
                    fontWeight: accent ? 800 : t.h3.weight,
                    lineHeight: t.h3.lh,
                    letterSpacing: t.h3.ls,
                    color: accent ? color.brand : color.ink,
                    margin: '0 0 10px',
                  }}
                >
                  {name}
                </h3>
                <p
                  style={{
                    fontSize: t.caption.size,
                    fontWeight: t.caption.weight,
                    lineHeight: t.caption.lh,
                    color: color.inkMuted,
                    margin: 0,
                    maxWidth: '60ch',
                    fontFamily: font.family,
                  }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
