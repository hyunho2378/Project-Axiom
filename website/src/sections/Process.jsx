import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const PHASES = [
  {
    num: '01',
    label: 'Phase 1',
    title: '리서치',
    period: '2026.03.29 – 04.06',
    items: [
      '설문 68명',
      'IDI 심층인터뷰 6인',
      '현장 관찰 4인',
      '어피니티 다이어그램 5클러스터',
      '3대 핵심 인사이트 도출',
    ],
  },
  {
    num: '02',
    label: 'Phase 2',
    title: '설계',
    period: '04.06 – 05.01',
    items: [
      'AS-IS 휴리스틱 감사',
      '29개 이슈 → 전부 해결',
      '7대 UX 전략',
      'UR 14개 정의',
      '듀얼 디자인 시스템',
    ],
    highlight: '29개 이슈 → 전부 해결',
  },
  {
    num: '03',
    label: 'Phase 3',
    title: '구현',
    period: '05.01 – 05.31',
    items: [
      '30페이지 화면 구현',
      '70+ 컴포넌트',
      '상점 13,021개 등록',
      'AI 하네스 병렬 구현',
      '발표 및 케이스스터디',
    ],
  },
];

const VIOLATIONS = [
  {
    code: 'N#2',
    label: '사용자 언어',
    before: "'강릉머니' — 4인 전원 미인지",
    after: '메뉴명 사용자 언어 통일',
    ur: 'UR-N02',
  },
  {
    code: 'N#4',
    label: '일관성',
    before: 'B2C에 B2B 메뉴 혼재',
    after: 'B2C / B2B 완전 분리',
    ur: 'UR-F02',
  },
  {
    code: 'N#6',
    label: '인식 보조',
    before: '환불이 큰글씨 모드에서만 노출',
    after: '잔액카드 3슬롯 동등 위계',
    ur: 'UR-U03',
  },
  {
    code: 'N#10',
    label: '도움말',
    before: '충전·환불 절차 안내 없음',
    after: '코치마크 단계별 자동 안내',
    ur: 'UR-U03',
  },
  {
    code: 'S#3',
    label: '단순성',
    before: 'B2C/B2B 혼재로 탐색 복잡',
    after: 'B2C 전용 단순 구조',
    ur: 'UR-F02',
  },
  {
    code: 'S#8',
    label: '단순 오류',
    before: "'강릉머니' — 내부 용어 사용",
    after: '일관된 브랜드 언어 적용',
    ur: 'UR-N02',
  },
];

export default function Process() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [timelineRef, timelineVisible] = useReveal({ threshold: 0.03 });
  const [tableRef, tableVisible] = useReveal({ threshold: 0.03 });

  return (
    <section
      id="process"
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
            marginBottom: 'clamp(48px,6vw,80px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px', fontFamily: font.family,
          }}>
            PROCESS
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px', fontFamily: font.family,
          }}>
            리서치 → 설계 → 구현
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 400,
            lineHeight: t.lead.lh, color: color.inkMuted,
            margin: 0, fontFamily: font.family,
          }}>
            3개 Phase, 29개 이슈, 전부 해결
          </p>
        </div>

        {/* Phase timeline */}
        <div
          ref={timelineRef}
          style={{
            opacity: timelineVisible ? 1 : 0,
            transform: timelineVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(64px,8vw,112px)',
          }}
        >
          {/* Connector line */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 'clamp(16px,2.5vw,40px)',
            position: 'relative',
          }}>
            {/* Background connector */}
            <div style={{
              position: 'absolute',
              top: 28,
              left: '16.67%',
              right: '16.67%',
              height: 2,
              background: color.line,
              zIndex: 0,
            }} />

            {PHASES.map((phase, i) => (
              <div
                key={phase.num}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  opacity: timelineVisible ? 1 : 0,
                  transform: timelineVisible ? 'none' : 'translateY(16px)',
                  transition: `opacity 0.55s ease-out ${i * 0.12}s, transform 0.55s ease-out ${i * 0.12}s`,
                }}
              >
                {/* Node */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{
                    width: 56, height: 56,
                    borderRadius: '50%',
                    background: color.brand,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{
                      fontSize: 14, fontWeight: 800,
                      color: color.white, fontFamily: font.family,
                      letterSpacing: '0.04em',
                    }}>
                      {phase.num}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div style={{
                  background: color.white,
                  borderRadius: layout.rMd,
                  padding: 'clamp(20px,2.5vw,32px)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                }}>
                  <p style={{
                    fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                    letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                    color: color.brand, margin: '0 0 8px', fontFamily: font.family,
                  }}>
                    {phase.label}
                  </p>
                  <h3 style={{
                    fontSize: t.h3.size, fontWeight: t.h3.weight,
                    lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
                    color: color.ink, margin: '0 0 6px', fontFamily: font.family,
                  }}>
                    {phase.title}
                  </h3>
                  <p style={{
                    fontSize: t.caption.size, lineHeight: t.caption.lh,
                    color: color.inkFaint, fontFamily: font.family,
                    margin: '0 0 16px',
                  }}>
                    {phase.period}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {phase.items.map((item) => (
                      <div
                        key={item}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: 8,
                        }}
                      >
                        <div style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: phase.highlight === item ? color.warn : color.brand,
                          flexShrink: 0, marginTop: 7,
                        }} />
                        <span style={{
                          fontSize: t.caption.size, lineHeight: 1.6,
                          color: phase.highlight === item ? color.warn : color.ink,
                          fontWeight: phase.highlight === item ? 700 : 400,
                          fontFamily: font.family,
                        }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heuristic violations table */}
        <div
          ref={tableRef}
          style={{
            opacity: tableVisible ? 1 : 0,
            transform: tableVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.inkFaint, margin: '0 0 20px', fontFamily: font.family,
          }}>
            HEURISTIC VIOLATIONS — BEFORE / AFTER
          </p>

          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '72px 96px 1fr 1fr 72px',
            gap: 0,
            borderBottom: `2px solid ${color.line}`,
            paddingBottom: 10,
            marginBottom: 0,
            minWidth: 600,
          }}>
            {['코드', '원칙', 'BEFORE', 'AFTER', 'UR'].map((h) => (
              <div key={h} style={{
                padding: '0 12px',
                fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
                letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
                color: color.inkFaint, fontFamily: font.family,
              }}>
                {h}
              </div>
            ))}
          </div>

          <div style={{ overflowX: 'auto' }}>
            {VIOLATIONS.map(({ code, label, before, after, ur }, i) => (
              <div
                key={code}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '72px 96px 1fr 1fr 72px',
                  gap: 0,
                  background: i % 2 === 0 ? color.white : 'transparent',
                  borderBottom: `1px solid ${color.line}`,
                  minWidth: 600,
                  opacity: tableVisible ? 1 : 0,
                  transform: tableVisible ? 'none' : 'translateY(8px)',
                  transition: `opacity 0.5s ease-out ${i * 0.06}s, transform 0.5s ease-out ${i * 0.06}s`,
                }}
              >
                <div style={{
                  padding: 'clamp(12px,1.5vw,16px) 12px',
                  fontSize: 12, fontWeight: 800,
                  letterSpacing: '0.06em',
                  color: color.warn, fontFamily: font.family,
                  display: 'flex', alignItems: 'center',
                }}>
                  {code}
                </div>
                <div style={{
                  padding: 'clamp(12px,1.5vw,16px) 12px',
                  fontSize: t.caption.size, lineHeight: t.caption.lh,
                  color: color.inkMuted, fontFamily: font.family,
                  display: 'flex', alignItems: 'center',
                }}>
                  {label}
                </div>
                <div style={{
                  padding: 'clamp(12px,1.5vw,16px) 12px',
                  fontSize: t.caption.size, lineHeight: t.caption.lh,
                  color: color.inkMuted, fontFamily: font.family,
                }}>
                  {before}
                </div>
                <div style={{
                  padding: 'clamp(12px,1.5vw,16px) 12px',
                  fontSize: t.caption.size, lineHeight: t.caption.lh,
                  color: color.ink, fontFamily: font.family,
                  fontWeight: 600,
                }}>
                  {after}
                </div>
                <div style={{
                  padding: 'clamp(12px,1.5vw,16px) 12px',
                  fontSize: 13, fontWeight: 700,
                  color: color.brand, fontFamily: font.family,
                  display: 'flex', alignItems: 'center',
                  letterSpacing: '0.04em',
                }}>
                  {ur}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
