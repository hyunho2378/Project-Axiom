import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const POINTS = [
  {
    num: '01',
    title: 'IA 구조 — B2C/B2B 혼재',
    body: '소비자 화면에 가맹점 포탈·정산 메뉴가 혼재. 타깃이 다른 두 인터페이스가 하나의 앱에서 충돌하며 소비자 탐색 경로를 방해합니다.',
    heuristic: 'Nielsen #4 일관성 · Shneiderman #3 단순성',
  },
  {
    num: '02',
    title: '큰글씨 모드 다크패턴 — 환불 선택적 노출',
    body: '환불 메뉴가 큰글씨 접근성 모드에서만 노출됩니다. 권리 기능을 특정 모드에서만 보이게 한 구조적 다크패턴.',
    heuristic: 'Nielsen #6 인식 보조 · Nielsen #10 도움말',
  },
  {
    num: '03',
    title: "용어 체계 붕괴 — '강릉머니' 0명 인지",
    body: "서비스 명칭 '강릉머니'를 관찰 참여자 4인 전원이 인지하지 못했습니다. 사용자 언어와 시스템 언어의 단절.",
    heuristic: 'Nielsen #2 사용자 언어 · Shneiderman #8 단순 오류',
  },
];

const VIOLATIONS = [
  { code: 'N#2', label: '사용자 언어' },
  { code: 'N#4', label: '일관성' },
  { code: 'N#6', label: '인식 보조' },
  { code: 'N#10', label: '도움말' },
  { code: 'S#3', label: '단순성' },
  { code: 'S#8', label: '단순 오류' },
];

export default function AsIsAudit() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [bodyRef, bodyVisible] = useReveal({ threshold: 0.05 });
  const [violRef, violVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="audit"
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
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px',
          }}>
            AS-IS AUDIT
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: 0, maxWidth: '28ch',
          }}>
            리뉴얼 이후에도<br />살아남은 구조적 결함
          </h2>
        </div>

        {/* Left screenshot + Right points */}
        <div
          ref={bodyRef}
          style={{
            opacity: bodyVisible ? 1 : 0,
            transform: bodyVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            display: 'flex',
            gap: 'clamp(32px,5vw,80px)',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            marginBottom: 'clamp(48px,6vw,80px)',
          }}
        >
          {/* Screenshot placeholder */}
          <div style={{ flex: '0 0 clamp(160px,26%,320px)' }}>
            <div
              style={{
                background: color.line,
                borderRadius: layout.rMd,
                aspectRatio: '9/16',
                filter: 'grayscale(1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: color.inkFaint,
                fontFamily: font.family,
              }}>
                AS-IS 스크린샷
              </span>
              <span style={{
                fontSize: 11, color: color.inkFaint, fontFamily: font.family,
              }}>
                이미지 교체 예정
              </span>
            </div>
          </div>

          {/* Points */}
          <div style={{ flex: 1, minWidth: 280 }}>
            {POINTS.map(({ num, title, body, heuristic }, i) => (
              <div
                key={num}
                style={{
                  paddingBottom: 'clamp(24px,3vw,40px)',
                  marginBottom: 'clamp(24px,3vw,40px)',
                  borderBottom: i < POINTS.length - 1 ? `1px solid ${color.line}` : 'none',
                  opacity: bodyVisible ? 1 : 0,
                  transform: bodyVisible ? 'none' : 'translateY(20px)',
                  transition: `opacity 0.6s ease-out ${0.1 + i * 0.1}s, transform 0.6s ease-out ${0.1 + i * 0.1}s`,
                }}
              >
                <p style={{
                  fontSize: 14, fontWeight: 800,
                  letterSpacing: '0em', textTransform: 'uppercase',
                  color: color.brand, margin: '0 0 10px',
                  fontFamily: font.family,
                }}>
                  POINT {num}
                </p>
                <h3 style={{
                  fontSize: t.h3.size, fontWeight: t.h3.weight,
                  lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
                  color: color.ink, margin: '0 0 10px',
                }}>
                  {title}
                </h3>
                <p style={{
                  fontSize: t.body.size, lineHeight: t.body.lh,
                  color: color.inkMuted, margin: '0 0 12px',
                  maxWidth: '52ch', fontFamily: font.family,
                }}>
                  {body}
                </p>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                  color: color.warn, textTransform: 'uppercase',
                  fontFamily: font.family,
                }}>
                  {heuristic}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Heuristic violations */}
        <div
          ref={violRef}
          style={{
            opacity: violVisible ? 1 : 0,
            transform: violVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.inkFaint, margin: '0 0 16px',
          }}>
            HEURISTIC VIOLATIONS — 6건
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {VIOLATIONS.map(({ code, label }) => (
              <div
                key={code}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: color.white, borderRadius: layout.rSm,
                  padding: '8px 14px',
                  border: `1px solid ${color.line}`,
                }}
              >
                <span style={{
                  fontSize: 11, fontWeight: 800,
                  color: color.warn, fontFamily: font.family,
                  letterSpacing: '0.04em',
                }}>
                  {code}
                </span>
                <span style={{
                  fontSize: 12, fontWeight: 500,
                  color: color.inkMuted, fontFamily: font.family,
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
