import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import PhoneFrame from '../mini/PhoneFrame.jsx';
import RefundMini from '../mini/RefundMini.jsx';
import HomeCoachMini from '../mini/HomeCoachMini.jsx';
import ChargeMini from '../mini/ChargeMini.jsx';

const SCREENS = [
  {
    id: 'S2',
    strategy: 'S2',
    title: '환불 동등 위계',
    problem: '환불 메뉴를 찾지 못해 탐색 실패',
    solution: '잔액 카드에 충전·환불·QR결제 3슬롯 동일 위계 배치',
    tobeLabel: '환불 화면 — 잔액 카드 + 환불 내역',
  },
  {
    id: 'S3',
    strategy: 'S3',
    title: '캐시백 체감',
    problem: '"1,345원 적립" — 숫자만 보여줌',
    solution: '5단계 메시지로 캐시백을 일상 언어로 번역',
    tobeLabel: '홈 코치마크 — 충전 버튼 안내',
  },
  {
    id: 'S4',
    strategy: 'S4',
    title: '충전 3단계 압축',
    problem: '6단계 충전 플로우 — 귀찮아서 포기',
    solution: '금액 선택 → 확인 → 완료, 빠른금액 칩 1탭',
    tobeLabel: '충전 화면 Step 1 — 빠른금액 칩 + 숫자패드',
  },
];

function AsIsPlaceholder({ scale = 0.62, screenHeight = 600 }) {
  const LOGICAL_WIDTH = 390;
  const frameW = LOGICAL_WIDTH * scale;
  const frameH = screenHeight * scale;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: `20px 0` }}>
      <div style={{
        width: `${frameW + 16}px`,
        borderRadius: '36px',
        backgroundColor: color.line,
        padding: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        border: `1px solid ${color.line}`,
      }}>
        <div style={{
          width: `${frameW}px`,
          height: `${frameH}px`,
          borderRadius: '28px',
          overflow: 'hidden',
          backgroundColor: '#D1D5DB',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          <span style={{
            fontSize: 10, fontWeight: 800,
            letterSpacing: '0em', textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.3)', fontFamily: font.family,
            textAlign: 'center',
          }}>
            AS-IS
          </span>
          <span style={{
            fontSize: 10, color: 'rgba(0,0,0,0.25)',
            fontFamily: font.family, textAlign: 'center',
            padding: '0 16px',
          }}>
            스크린샷 교체 예정
          </span>
        </div>
      </div>
    </div>
  );
}

function ToBe({ id }) {
  if (id === 'S2') return <PhoneFrame scale={0.62} screenHeight={640}><RefundMini step="list" /></PhoneFrame>;
  if (id === 'S3') return <PhoneFrame scale={0.62} screenHeight={640}><HomeCoachMini variant="charge" /></PhoneFrame>;
  if (id === 'S4') return <PhoneFrame scale={0.62} screenHeight={640}><ChargeMini step={1} amount={50000} balance={120000} /></PhoneFrame>;
  return null;
}

function ScreenPair({ screen, visible, delay }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(32px)',
        transition: `opacity 0.65s ease-out ${delay}s, transform 0.65s ease-out ${delay}s`,
        marginBottom: 'clamp(72px,9vw,120px)',
      }}
    >
      {/* Section label */}
      <div style={{ marginBottom: 'clamp(24px,3vw,40px)' }}>
        <span style={{
          fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
          letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
          color: color.brand, fontFamily: font.family,
        }}>
          {screen.strategy}
        </span>
        <h3 style={{
          fontSize: t.h2.size, fontWeight: t.h2.weight,
          lineHeight: t.h2.lh, letterSpacing: t.h2.ls,
          color: color.ink, margin: '10px 0 0', fontFamily: font.family,
        }}>
          {screen.title}
        </h3>
      </div>

      {/* AS-IS / TO-BE pair */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(24px,4vw,64px)',
        alignItems: 'start',
      }}>

        {/* AS-IS */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 16,
          }}>
            <span style={{
              fontSize: 11, fontWeight: 800,
              letterSpacing: '0em', textTransform: 'uppercase',
              color: color.inkFaint, fontFamily: font.family,
            }}>AS-IS</span>
            <div style={{ flex: 1, height: 1, background: color.line }} />
          </div>
          <div style={{ filter: 'grayscale(1)', opacity: 0.7, transform: 'scale(0.9)', transformOrigin: 'top center' }}>
            <AsIsPlaceholder scale={0.62} screenHeight={640} />
          </div>
          <p style={{
            fontSize: t.caption.size, fontWeight: t.caption.weight,
            lineHeight: t.caption.lh, color: color.inkMuted,
            margin: '12px auto 0', textAlign: 'center',
            maxWidth: '28ch', fontFamily: font.family,
          }}>
            {screen.problem}
          </p>
        </div>

        {/* TO-BE */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 16,
          }}>
            <span style={{
              fontSize: 11, fontWeight: 800,
              letterSpacing: '0em', textTransform: 'uppercase',
              color: color.brand, fontFamily: font.family,
            }}>TO-BE</span>
            <div style={{ flex: 1, height: 1, background: color.brand, opacity: 0.3 }} />
          </div>
          <ToBe id={screen.id} />
          <p style={{
            fontSize: t.caption.size, fontWeight: t.caption.weight,
            lineHeight: t.caption.lh, color: color.inkMuted,
            margin: '12px auto 0', textAlign: 'center',
            maxWidth: '28ch', fontFamily: font.family,
          }}>
            {screen.solution}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function KeyScreens() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [bodyRef, bodyVisible] = useReveal({ threshold: 0.02 });

  return (
    <section
      id="key-screens"
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
            KEY SCREENS
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: 0, maxWidth: '22ch',
          }}>
            전략이 화면이 되는 순간
          </h2>
        </div>

        {/* Screen pairs */}
        <div ref={bodyRef}>
          {SCREENS.map((screen, i) => (
            <ScreenPair
              key={screen.id}
              screen={screen}
              visible={bodyVisible}
              delay={i * 0.1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
