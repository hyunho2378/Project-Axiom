import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const IOS_COLOR = color.brand;
const AND_COLOR = color.ok;

const ROWS = [
  {
    feature: 'StatusBar',
    ios: '44px · safe area 적용 · 흰 배경 · 검정 아이콘',
    android: '42px (Samsung One UI) · 투명 오버레이 · 흰 아이콘',
  },
  {
    feature: '헤더',
    ios: '제목 중앙 정렬 · 뒤로가기 <ChevronLeft> 좌상단',
    android: '제목 좌측 정렬 · <ArrowLeft> 좌측 · 더보기 우측',
  },
  {
    feature: '버튼',
    ios: 'radius 12px · height 52px · box-shadow · 4종 위계',
    android: 'full pill · height 48px · 그림자 없음 · 4종 위계',
  },
  {
    feature: '폰트',
    ios: 'Pretendard Variable',
    android: 'Noto Sans KR',
  },
  {
    feature: '생체인증',
    ios: 'Face ID — 중앙 Lottie · State Machine 19단계',
    android: '지문 인증 — 하단 고정 + 텍스트 fallback',
  },
  {
    feature: '바텀시트',
    ios: 'borderRadius 20px · 드래그 핸들 · 백드롭 없음',
    android: 'borderRadius 28px · scrim 전체 · 밀어올리기',
  },
  {
    feature: '스낵바',
    ios: '없음 (iOS HIG — 시스템 Alert·ActionSheet 사용)',
    android: '슬라이드업 2.8초 자동 소멸 · 실행취소 버튼',
  },
];

const CODE = `// platform 분기 — URL ?platform=android 또는 VITE_PLATFORM 환경변수
const getPlatform = () => {
  const param = new URLSearchParams(window.location.search).get('platform');
  if (param === 'android') return 'android';
  return import.meta.env.VITE_PLATFORM ?? 'ios';
};

// 사용 예
const platform = getPlatform();  // 'ios' | 'android'`;

export default function DualDesignSystem() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [tableRef, tableVisible] = useReveal({ threshold: 0.03 });
  const [codeRef, codeVisible] = useReveal({ threshold: 0.03 });

  return (
    <section
      id="dual-system"
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
            DUAL DESIGN SYSTEM
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px', fontFamily: font.family,
          }}>
            iOS HIG × Android MD3
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 400,
            lineHeight: t.lead.lh, color: color.inkMuted,
            margin: 0, fontFamily: font.family,
          }}>
            업계 최초 지역화폐 앱 듀얼 디자인 시스템
          </p>
        </div>

        {/* Comparison table */}
        <div
          ref={tableRef}
          style={{
            opacity: tableVisible ? 1 : 0,
            transform: tableVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(48px,6vw,80px)',
            overflowX: 'auto',
          }}
        >
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '140px 1fr 1fr',
            gap: 0,
            borderBottom: `2px solid ${color.line}`,
            paddingBottom: 12,
            marginBottom: 0,
            minWidth: 560,
          }}>
            <div />
            <div style={{
              padding: '0 24px',
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: IOS_COLOR, fontFamily: font.family,
            }}>
              iOS · HIG
            </div>
            <div style={{
              padding: '0 24px',
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: AND_COLOR, fontFamily: font.family,
            }}>
              Android · MD3
            </div>
          </div>

          {/* Rows */}
          {ROWS.map(({ feature, ios, android }, i) => (
            <div
              key={feature}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr 1fr',
                gap: 0,
                background: i % 2 === 0 ? color.white : 'transparent',
                borderBottom: `1px solid ${color.line}`,
                minWidth: 560,
                opacity: tableVisible ? 1 : 0,
                transform: tableVisible ? 'none' : 'translateY(10px)',
                transition: `opacity 0.5s ease-out ${i * 0.06}s, transform 0.5s ease-out ${i * 0.06}s`,
              }}
            >
              {/* Feature label */}
              <div style={{
                padding: 'clamp(14px,1.8vw,20px) 0',
                fontSize: 12, fontWeight: 700,
                letterSpacing: '0.04em', textTransform: 'uppercase',
                color: color.inkFaint, fontFamily: font.family,
                display: 'flex', alignItems: 'center',
              }}>
                {feature}
              </div>

              {/* iOS */}
              <div style={{
                padding: `clamp(14px,1.8vw,20px) 24px`,
                fontSize: t.body.size, lineHeight: t.body.lh,
                color: color.ink, fontFamily: font.family,
              }}>
                {ios}
              </div>

              {/* Android */}
              <div style={{
                padding: `clamp(14px,1.8vw,20px) 24px`,
                fontSize: t.body.size, lineHeight: t.body.lh,
                color: color.ink, fontFamily: font.family,
              }}>
                {android}
              </div>
            </div>
          ))}
        </div>

        {/* getPlatform() code snippet */}
        <div
          ref={codeRef}
          style={{
            opacity: codeVisible ? 1 : 0,
            transform: codeVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.inkFaint, margin: '0 0 12px', fontFamily: font.family,
          }}>
            PLATFORM DETECTION
          </p>
          <div style={{
            background: color.ink,
            borderRadius: layout.rMd,
            padding: 'clamp(20px,2.5vw,32px)',
            overflowX: 'auto',
          }}>
            <pre style={{
              margin: 0,
              fontFamily: "'SFMono-Regular', 'Consolas', 'Monaco', monospace",
              fontSize: 13,
              lineHeight: 1.75,
              color: color.white,
              whiteSpace: 'pre',
            }}>
              {CODE}
            </pre>
          </div>
          <p style={{
            margin: '12px 0 0',
            fontSize: t.caption.size, lineHeight: t.caption.lh,
            color: color.inkFaint, fontFamily: font.family,
          }}>
            지역화폐 앱은 SI 외주라 디자인시스템 부재 — iOS HIG + Android MD3 양 플랫폼 네이티브 동시 구현.
          </p>
        </div>

      </div>
    </section>
  );
}
