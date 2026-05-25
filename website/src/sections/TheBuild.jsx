import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useCountUp } from '../lib/useCountUp.js';
import { Bus, Coffee, Utensils, ShoppingBag, Smartphone } from 'lucide-react';
import PhoneFrame from '../mini/PhoneFrame.jsx';
import HomeCoachMini from '../mini/HomeCoachMini.jsx';
import RefundMini from '../mini/RefundMini.jsx';
import ChargeMini from '../mini/ChargeMini.jsx';

const CATEGORIES_12 = [
  '음식점', '카페', '편의점', '숙박', '관광', '마트',
  '의료', '미용', '교통', '생활', '교육', '기타',
];

const CASHBACK_LEVELS = [
  { Icon: Bus,         label: '대중교통' },
  { Icon: Coffee,      label: '커피 한 잔', confirmed: true },
  { Icon: Utensils,    label: '분식 한 끼' },
  { Icon: ShoppingBag, label: '마트 장보기' },
  { Icon: Smartphone,  label: '전자기기 악세사리' },
];

const SEC_PAD = `clamp(72px,9vw,120px) clamp(20px,5vw,80px)`;

// ── 공통: 번호 + 제목 헤더 ──
function StratNum({ num }) {
  return (
    <span style={{
      fontSize: 'clamp(64px,8vw,112px)',
      fontWeight: 800,
      lineHeight: 1,
      letterSpacing: '-0.05em',
      color: color.brand,
      opacity: 0.12,
      fontFamily: font.family,
      flexShrink: 0,
      userSelect: 'none',
    }}>
      {num}
    </span>
  );
}

function ImplBadge({ label }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 700,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      color: color.inkFaint,
      background: color.line,
      padding: '4px 10px', borderRadius: 100,
      fontFamily: font.family,
    }}>
      {label}
    </span>
  );
}

function UrBadge({ ur }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 700,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      color: color.brand, background: color.brandPale,
      padding: '4px 10px', borderRadius: 100,
      fontFamily: font.family,
    }}>
      {ur}
    </span>
  );
}

function FlowRow({ problem, solution }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      flexWrap: 'wrap',
      margin: 'clamp(16px,2vw,24px) 0',
    }}>
      <span style={{
        fontSize: 13, fontWeight: 600,
        color: color.warn, background: 'rgba(229,72,77,0.08)',
        padding: '5px 12px', borderRadius: 100,
        fontFamily: font.family, lineHeight: 1.5,
      }}>
        AS-IS: {problem}
      </span>
      <span style={{ color: color.inkFaint, fontSize: 14, marginTop: 4 }}>→</span>
      <span style={{
        fontSize: 13, fontWeight: 600,
        color: color.brand, background: color.brandPale,
        padding: '5px 12px', borderRadius: 100,
        fontFamily: font.family, lineHeight: 1.5,
      }}>
        TO-BE: {solution}
      </span>
    </div>
  );
}

// ── S1: 위젯 잔액 노출 (number left, phone right) ──
function S1Block({ visible }) {
  return (
    <div style={{
      background: color.bg,
      padding: SEC_PAD,
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(32px)',
      transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
    }}>
      <div style={{ maxWidth: layout.container, margin: '0 auto', display: 'flex', gap: 'clamp(32px,5vw,80px)', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
            <StratNum num="S1" />
            <p style={{ margin: 0, fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight, letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform, color: color.brand, fontFamily: font.family }}>
              THE BUILD 01
            </p>
          </div>
          <h3 style={{ margin: '0 0 6px', fontSize: t.h2.size, fontWeight: t.h2.weight, lineHeight: t.h2.lh, letterSpacing: t.h2.ls, color: color.ink, fontFamily: font.family }}>
            위젯 잔액 노출
          </h3>
          <p style={{ margin: '0 0 4px', fontSize: t.lead.size, fontWeight: 400, lineHeight: t.lead.lh, color: color.inkMuted, fontFamily: font.family }}>
            앱을 열지 않아도 잔액이 보입니다
          </p>
          <FlowRow problem="앱 실행해야만 잔액 확인" solution="홈 위젯·잠금화면 즉시 노출" />
          <div style={{ paddingLeft: 'clamp(12px,1.5vw,20px)', marginBottom: 20 }}>
            <p style={{ margin: '0 0 4px', fontSize: t.body.size, fontStyle: 'italic', lineHeight: t.body.lh, color: color.ink, fontFamily: font.family }}>
              &ldquo;식당 자리에서 먼저 확인하고 본 다음에 안심하고 갑니다&rdquo;
            </p>
            <span style={{ fontSize: 12, fontWeight: 600, color: color.inkFaint, fontFamily: font.family }}>— 인터뷰 A2</span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <ImplBadge label="HomeCoachMini · BalanceCardExpanded" />
            <UrBadge ur="UR-U01" />
          </div>
        </div>
        <div style={{ flexShrink: 0 }}>
          <PhoneFrame scale={0.55} screenHeight={660}><HomeCoachMini variant="charge" /></PhoneFrame>
        </div>
      </div>
    </div>
  );
}

// ── S2: 환불 동등 위계 (phone left, text right) ──
function S2Block({ visible }) {
  return (
    <div style={{
      background: color.white,
      padding: SEC_PAD,
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(32px)',
      transition: 'opacity 0.7s ease-out 0.05s, transform 0.7s ease-out 0.05s',
    }}>
      <div style={{ maxWidth: layout.container, margin: '0 auto', display: 'flex', gap: 'clamp(32px,5vw,80px)', alignItems: 'center', flexWrap: 'wrap-reverse' }}>
        <div style={{ flexShrink: 0 }}>
          <PhoneFrame scale={0.55} screenHeight={660}><RefundMini step="list" /></PhoneFrame>
        </div>
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
            <StratNum num="S2" />
            <p style={{ margin: 0, fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight, letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform, color: color.brand, fontFamily: font.family }}>
              THE BUILD 02
            </p>
          </div>
          <h3 style={{ margin: '0 0 6px', fontSize: t.h2.size, fontWeight: t.h2.weight, lineHeight: t.h2.lh, letterSpacing: t.h2.ls, color: color.ink, fontFamily: font.family }}>
            환불 동등 위계
          </h3>
          <p style={{ margin: '0 0 4px', fontSize: t.lead.size, fontWeight: 400, lineHeight: t.lead.lh, color: color.inkMuted, fontFamily: font.family }}>
            충전과 환불을 같은 자리에 뒀습니다
          </p>
          <FlowRow problem="관찰 4인 전원 환불 메뉴 탐색 실패" solution="잔액 카드 3슬롯 동일 크기" />
          <p style={{ margin: '0 0 20px', fontSize: t.body.size, lineHeight: t.body.lh, color: color.inkMuted, maxWidth: '40ch', fontFamily: font.family }}>
            잔액 카드에 [충전 / 환불 / QR결제] 3슬롯을 동일 크기로 배치. 환불은 권리입니다.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <ImplBadge label="RefundMini · BalanceCardExpanded" />
            <UrBadge ur="UR-U03" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── S3: 캐시백 체감 (full width cashback strip) ──
function S3Block({ visible }) {
  return (
    <div style={{
      background: color.bg,
      padding: SEC_PAD,
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(32px)',
      transition: 'opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s',
    }}>
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
          <StratNum num="S3" />
          <p style={{ margin: 0, fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight, letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform, color: color.brand, fontFamily: font.family }}>
            THE BUILD 03
          </p>
        </div>
        <h3 style={{ margin: '0 0 6px', fontSize: t.h2.size, fontWeight: t.h2.weight, lineHeight: t.h2.lh, letterSpacing: t.h2.ls, color: color.ink, fontFamily: font.family }}>
          캐시백 체감
        </h3>
        <FlowRow problem='"1,345원 적립" — 숫자만 표시, 감각 없음' solution="getCashbackIntuition() 5단계 직관 메시지" />

        {/* 5단계 아이콘 스트립 */}
        <div style={{
          display: 'flex',
          gap: 'clamp(8px,1.5vw,20px)',
          margin: 'clamp(24px,3vw,40px) 0',
          flexWrap: 'wrap',
        }}>
          {CASHBACK_LEVELS.map(({ Icon, label, confirmed }, i) => (
            <div
              key={i}
              style={{
                flex: '1 1 120px',
                background: confirmed ? color.brandPale : color.white,
                border: `1px solid ${confirmed ? color.brand : color.line}`,
                borderRadius: layout.rMd,
                padding: 'clamp(16px,2vw,24px) 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                position: 'relative',
              }}
            >
              {confirmed && (
                <span style={{
                  position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                  fontSize: 10, fontWeight: 800, letterSpacing: '0em', textTransform: 'uppercase',
                  color: color.white, background: color.brand,
                  padding: '3px 10px', borderRadius: 100,
                  fontFamily: font.family, whiteSpace: 'nowrap',
                }}>
                  실제 예시
                </span>
              )}
              <Icon size={28} color={confirmed ? color.brand : color.inkMuted} strokeWidth={1.6} />
              <span style={{
                fontSize: 13, fontWeight: 600,
                color: confirmed ? color.brand : color.inkMuted,
                textAlign: 'center', fontFamily: font.family,
              }}>
                {label}
              </span>
              {confirmed && (
                <span style={{
                  fontSize: 11, fontWeight: 500,
                  color: color.brand, textAlign: 'center',
                  fontFamily: font.family, lineHeight: 1.5,
                }}>
                  "커피 한 잔 값<br />아꼈어요"
                </span>
              )}
            </div>
          ))}
        </div>

        <p style={{ margin: '0 0 4px', fontSize: t.caption.size, lineHeight: t.caption.lh, color: color.inkFaint, fontFamily: font.family }}>
          확인된 예시: 1,345원 적립 → "커피 한 잔 값 아꼈어요" (Coffee 레벨)
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
          <ImplBadge label="getCashbackIntuition() · lucide 5종" />
          <UrBadge ur="UR-F03" />
        </div>
      </div>
    </div>
  );
}

// ── S4: 충전 3단계 압축 (text left, phone right) ──
function S4Block({ visible }) {
  return (
    <div style={{
      background: color.white,
      padding: SEC_PAD,
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(32px)',
      transition: 'opacity 0.7s ease-out 0.15s, transform 0.7s ease-out 0.15s',
    }}>
      <div style={{ maxWidth: layout.container, margin: '0 auto', display: 'flex', gap: 'clamp(32px,5vw,80px)', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
            <StratNum num="S4" />
            <p style={{ margin: 0, fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight, letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform, color: color.brand, fontFamily: font.family }}>
              THE BUILD 04
            </p>
          </div>
          <h3 style={{ margin: '0 0 6px', fontSize: t.h2.size, fontWeight: t.h2.weight, lineHeight: t.h2.lh, letterSpacing: t.h2.ls, color: color.ink, fontFamily: font.family }}>
            충전 3단계 압축
          </h3>
          <p style={{ margin: '0 0 4px', fontSize: t.lead.size, fontWeight: 400, lineHeight: t.lead.lh, color: color.inkMuted, fontFamily: font.family }}>
            충전 중 잔액 확인이 가능합니다
          </p>
          <FlowRow problem="6단계 충전 플로우" solution="금액 선택 → 확인 → 완료" />
          <div style={{ paddingLeft: 'clamp(12px,1.5vw,20px)', marginBottom: 20 }}>
            <p style={{ margin: '0 0 4px', fontSize: t.body.size, fontStyle: 'italic', lineHeight: t.body.lh, color: color.ink, fontFamily: font.family }}>
              &ldquo;충전해야 하는 방식이 가장 귀찮습니다&rdquo;
            </p>
            <span style={{ fontSize: 12, fontWeight: 600, color: color.inkFaint, fontFamily: font.family }}>— 인터뷰 B1</span>
          </div>
          <p style={{ margin: '0 0 20px', fontSize: t.body.size, lineHeight: t.body.lh, color: color.inkMuted, maxWidth: '38ch', fontFamily: font.family }}>
            빠른금액 칩 (+1만 / +5만 / +10만) 으로 반복 충전 시 1탭 완료.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <ImplBadge label="ChargeMini · StepIndicator" />
            <UrBadge ur="UR-U04" />
          </div>
        </div>
        <div style={{ flexShrink: 0 }}>
          <PhoneFrame scale={0.55} screenHeight={660}><ChargeMini step={1} amount={50000} balance={120000} /></PhoneFrame>
        </div>
      </div>
    </div>
  );
}

// ── S5: 잔액 부족 사전차단 (before/after cards) ──
function S5Block({ visible }) {
  return (
    <div style={{
      background: color.bg,
      padding: SEC_PAD,
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(32px)',
      transition: 'opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s',
    }}>
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
          <StratNum num="S5" />
          <p style={{ margin: 0, fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight, letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform, color: color.brand, fontFamily: font.family }}>
            THE BUILD 05
          </p>
        </div>
        <h3 style={{ margin: '0 0 6px', fontSize: t.h2.size, fontWeight: t.h2.weight, lineHeight: t.h2.lh, letterSpacing: t.h2.ls, color: color.ink, fontFamily: font.family }}>
          잔액 부족 사전 차단
        </h3>
        <FlowRow problem="한도 초과 입력 → 결제 실패까지 알 수 없음" solution="isOverLimit() → 버튼 disabled + 빨간 안내" />

        {/* Before/After 카드 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(12px,2vw,24px)', margin: 'clamp(24px,3vw,40px) 0' }}>
          {/* Before */}
          <div style={{ background: color.white, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,32px)', border: `1px solid ${color.line}` }}>
            <p style={{ margin: '0 0 16px', fontSize: 11, fontWeight: 800, letterSpacing: '0em', textTransform: 'uppercase', color: color.inkFaint, fontFamily: font.family }}>
              AS-IS
            </p>
            <div style={{ background: color.bg, borderRadius: layout.rSm, padding: '12px 16px', marginBottom: 12, fontFamily: font.family }}>
              <p style={{ margin: '0 0 4px', fontSize: 12, color: color.inkFaint }}>충전 금액</p>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color: color.ink, letterSpacing: '-0.02em' }}>200,000원</p>
            </div>
            <div style={{ background: color.bg, borderRadius: layout.rSm, padding: '8px 16px', marginBottom: 12, fontFamily: font.family }}>
              <p style={{ margin: 0, fontSize: 12, color: color.inkFaint }}>현재 잔액: <span style={{ color: color.ink, fontWeight: 600 }}>50,000원</span></p>
            </div>
            <div style={{
              width: '100%', height: 48, borderRadius: layout.rSm,
              background: color.brand, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: font.family, fontSize: 15, fontWeight: 600, color: color.white,
            }}>
              다음
            </div>
          </div>

          {/* After */}
          <div style={{ background: color.white, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,32px)', border: `1px solid ${color.brand}` }}>
            <p style={{ margin: '0 0 16px', fontSize: 11, fontWeight: 800, letterSpacing: '0em', textTransform: 'uppercase', color: color.brand, fontFamily: font.family }}>
              TO-BE
            </p>
            <div style={{ background: color.bg, borderRadius: layout.rSm, padding: '12px 16px', marginBottom: 12, border: `1px solid ${color.warn}`, fontFamily: font.family }}>
              <p style={{ margin: '0 0 4px', fontSize: 12, color: color.inkFaint }}>충전 금액</p>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color: color.ink, letterSpacing: '-0.02em' }}>200,000원</p>
            </div>
            <p style={{ margin: '0 0 10px', fontSize: 12, color: color.warn, fontFamily: font.family, fontWeight: 600 }}>
              잔액이 부족합니다. 현재 잔액: 50,000원
            </p>
            <div style={{
              width: '100%', height: 48, borderRadius: layout.rSm,
              background: color.line, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: font.family, fontSize: 15, fontWeight: 600, color: color.inkFaint,
            }}>
              다음
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 'clamp(32px,4vw,56px)', fontWeight: 800,
            letterSpacing: '-0.04em', color: color.brand, lineHeight: 1,
            fontFamily: font.family,
          }}>62.5%</span>
          <span style={{ fontSize: t.body.size, color: color.inkMuted, fontFamily: font.family }}>
            설문 68명 — 계산대 앞 잔액 부족 당황 경험
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ImplBadge label="isOverLimit() · inline 유효성 검사" />
          <UrBadge ur="UR-U05" />
        </div>
      </div>
    </div>
  );
}

// ── S6: 가맹점 실시간 신뢰 (giant countUp + categories) ──
function S6Block({ visible }) {
  const [countRef, count] = useCountUp(13021, 2400);

  return (
    <div style={{
      background: color.white,
      padding: SEC_PAD,
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(32px)',
      transition: 'opacity 0.7s ease-out 0.25s, transform 0.7s ease-out 0.25s',
    }}>
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        {/* Eyebrow + title */}
        <p style={{
          margin: '0 0 8px',
          fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
          letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
          color: color.brand, fontFamily: font.family,
        }}>
          THE BUILD 06
        </p>
        <h3 style={{
          margin: '0 0 clamp(32px,4vw,56px)',
          fontSize: t.h2.size, fontWeight: t.h2.weight,
          lineHeight: t.h2.lh, letterSpacing: t.h2.ls,
          color: color.ink, fontFamily: font.family,
        }}>
          가맹점 실시간 신뢰
        </h3>

        {/* Giant countUp */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(16px,2vw,24px)' }}>
          <span
            ref={countRef}
            style={{
              display: 'block',
              fontSize: 'clamp(80px,12vw,160px)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.05em',
              color: color.brand,
              fontFamily: font.family,
            }}
          >
            {count.toLocaleString('ko-KR')}개
          </span>
          <span style={{
            display: 'block',
            fontSize: 'clamp(16px,2vw,24px)',
            fontWeight: 500,
            color: color.inkMuted,
            marginTop: 8,
            fontFamily: font.family,
          }}>
            실제 가맹점 데이터
          </span>
        </div>

        {/* Quote */}
        <div style={{ paddingLeft: 'clamp(12px,1.5vw,20px)', marginBottom: 'clamp(32px,4vw,56px)', maxWidth: '56ch' }}>
          <p style={{ margin: '0 0 4px', fontSize: t.body.size, fontStyle: 'italic', lineHeight: t.body.lh, color: color.ink, fontFamily: font.family }}>
            &ldquo;가게 들어가서 여기 강릉페이 돼요? 라고 물어봐야 하는데&rdquo;
          </p>
          <span style={{ fontSize: 12, fontWeight: 600, color: color.inkFaint, fontFamily: font.family }}>— 인터뷰 A1</span>
        </div>

        {/* Google Maps 클러스터 이미지 자리 */}
        <div style={{
          width: '100%',
          aspectRatio: '16/7',
          background: color.bg,
          borderRadius: layout.rMd,
          border: `1px solid ${color.line}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 'clamp(28px,3.5vw,48px)',
        }}>
          <span style={{ fontSize: 'clamp(15px,1.8vw,20px)', fontWeight: 700, color: color.inkMuted, fontFamily: font.family }}>
            13,021개 가맹점 지도
          </span>
          <span style={{ fontSize: 13, color: color.inkFaint, fontFamily: font.family }}>
            배포 시 활성화
          </span>
        </div>

        {/* 12 카테고리 필터 칩 */}
        <div style={{ marginBottom: 24 }}>
          <p style={{
            margin: '0 0 12px',
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.inkFaint, fontFamily: font.family,
          }}>
            12카테고리 필터
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CATEGORIES_12.map((cat) => (
              <span
                key={cat}
                style={{
                  fontSize: 13, fontWeight: 600,
                  color: color.brand, background: color.brandPale,
                  padding: '6px 14px', borderRadius: 100,
                  fontFamily: font.family,
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ImplBadge label="StoreMapScreen · MarkerClusterer" />
          <ImplBadge label="QR 216개 매장" />
          <UrBadge ur="UR-U06" />
        </div>
      </div>
    </div>
  );
}

// ── S7: 코치마크 단계 안내 (text left, phone right) ──
function S7Block({ visible }) {
  return (
    <div style={{
      background: color.bg,
      padding: SEC_PAD,
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(32px)',
      transition: 'opacity 0.7s ease-out 0.3s, transform 0.7s ease-out 0.3s',
    }}>
      <div style={{ maxWidth: layout.container, margin: '0 auto', display: 'flex', gap: 'clamp(32px,5vw,80px)', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
            <StratNum num="S7" />
            <p style={{ margin: 0, fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight, letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform, color: color.brand, fontFamily: font.family }}>
              THE BUILD 07
            </p>
          </div>
          <h3 style={{ margin: '0 0 6px', fontSize: t.h2.size, fontWeight: t.h2.weight, lineHeight: t.h2.lh, letterSpacing: t.h2.ls, color: color.ink, fontFamily: font.family }}>
            코치마크 단계 안내
          </h3>
          <p style={{ margin: '0 0 4px', fontSize: t.lead.size, fontWeight: 400, lineHeight: t.lead.lh, color: color.inkMuted, fontFamily: font.family }}>
            첫 사용자도 혼자 완주할 수 있습니다
          </p>
          <FlowRow problem="카드 신청 과정 복잡해 포기" solution="카드 등록 직후 충전→환불 자동 안내" />
          <p style={{ margin: '0 0 20px', fontSize: t.body.size, lineHeight: t.body.lh, color: color.inkMuted, maxWidth: '40ch', fontFamily: font.family }}>
            ScreenContainer.getBoundingClientRect() 절대좌표 기반. 실제 버튼 위치에 말풍선이 정확히 얹힙니다.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <ImplBadge label="CoachMarkOverlay · getBoundingClientRect" />
            <UrBadge ur="UR-U03" />
          </div>
        </div>
        <div style={{ flexShrink: 0 }}>
          <PhoneFrame scale={0.55} screenHeight={660}><HomeCoachMini variant="cardApply" /></PhoneFrame>
        </div>
      </div>
    </div>
  );
}

const SCREENS_30 = [
  { name: '홈', path: '/', tag: '바텀탭' },
  { name: '결제매장', path: '/store', tag: '바텀탭' },
  { name: 'QR결제', path: '/qr', tag: '바텀탭' },
  { name: '이용내역', path: '/history', tag: '바텀탭' },
  { name: 'MY', path: '/my', tag: '바텀탭' },
  { name: '검색', path: '/search', tag: '신규' },
  { name: '카드신청', path: '/card-apply', tag: '신규' },
  { name: '충전', path: '/charge', tag: '결제' },
  { name: '캐시백', path: '/cashback', tag: '결제' },
  { name: '서비스편집', path: '/service-edit', tag: '안내' },
  { name: '카카오페이안내', path: '/kakao-guide', tag: '안내' },
  { name: '교통카드', path: '/transport-card', tag: '안내' },
  { name: '이용안내', path: '/usage-guide', tag: '안내' },
  { name: '설정', path: '/settings', tag: '설정' },
  { name: '알림', path: '/notification', tag: '설정' },
  { name: '고객센터', path: '/customer-center', tag: '설정' },
  { name: '챗봇', path: '/chatbot', tag: '설정' },
  { name: '카드분실', path: '/card-lost', tag: '설정' },
  { name: '쿠폰', path: '/coupon', tag: '설정' },
  { name: '지원금상세', path: '/support/:id', tag: '지원금' },
  { name: '지원금신청', path: '/support-wish', tag: '지원금' },
  { name: '맞춤정보', path: '/custom-info', tag: '지원금' },
  { name: '기부', path: '/donation', tag: '소통' },
  { name: '기부상세', path: '/donation/:id', tag: '소통' },
  { name: '기부내역', path: '/donation-history', tag: '소통' },
  { name: '뉴스', path: '/news', tag: '소통' },
  { name: '뉴스상세', path: '/news/:id', tag: '소통' },
  { name: '장소상세', path: '/place/:id', tag: '소통' },
  { name: '생활편의', path: '/life', tag: '숨김탭' },
  { name: '소통참여', path: '/community', tag: '숨김탭' },
];

const TAG_COLOR = {
  '바텀탭': { bg: color.brandPale, text: color.brand },
  '신규':   { bg: color.bg, text: color.ok },
  '결제':   { bg: color.bg, text: color.warn },
  '안내':   { bg: color.brandPale, text: color.inkMuted },
  '설정':   { bg: color.bg, text: color.inkMuted },
  '지원금': { bg: color.bg, text: color.ink },
  '소통':   { bg: color.brandPale, text: color.inkMuted },
  '숨김탭': { bg: color.bg, text: color.inkFaint },
};

const TECH_CHALLENGES = [
  { label: 'CoachMarkOverlay', desc: 'ScreenContainer.getBoundingClientRect() 절대좌표 기반 말풍선' },
  { label: 'MarkerClusterer', desc: 'konacard 13,021개 실데이터 + Google Maps 클러스터링' },
  { label: 'Face ID Lottie', desc: '@lottiefiles/dotlottie-react 디버깅 — 30분 추적' },
  { label: 'getCashbackIntuition()', desc: '5단계 직관 메시지 변환 함수 (금액 → 실생활 표현)' },
  { label: 'isOverLimit()', desc: '입력 시점 잔액 검증 — 버튼 disabled + 인라인 빨간 안내' },
];

// ── S_Features: 화면 목록 + 기술 과제 ──
function FeaturesBlock({ visible }) {
  return (
    <div style={{
      background: color.bg,
      padding: SEC_PAD,
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(32px)',
      transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
    }}>
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <p style={{
          margin: '0 0 8px',
          fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
          letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
          color: color.brand, fontFamily: font.family,
        }}>
          THE BUILD — FULL SCOPE
        </p>
        <h3 style={{
          margin: '0 0 clamp(32px,4vw,48px)',
          fontSize: t.h2.size, fontWeight: t.h2.weight,
          lineHeight: t.h2.lh, letterSpacing: t.h2.ls,
          color: color.ink, fontFamily: font.family,
        }}>
          30개 화면 · 7개 핵심 기능 · 5개 기술 과제
        </h3>

        {/* Screens grid */}
        <p style={{
          margin: '0 0 16px', fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
          letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
          color: color.inkFaint, fontFamily: font.family,
        }}>
          화면 목록 (ROUTES.md 기준)
        </p>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8,
          marginBottom: 'clamp(40px,5vw,64px)',
        }}>
          {SCREENS_30.map(({ name, path, tag }) => {
            const tc = TAG_COLOR[tag] || TAG_COLOR['설정'];
            return (
              <div
                key={path}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: color.white,
                  border: `1px solid ${color.line}`,
                  borderRadius: 100,
                  padding: '5px 12px',
                }}
              >
                <span style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.04em',
                  color: tc.text, background: tc.bg,
                  padding: '1px 6px', borderRadius: 100,
                  fontFamily: font.family, whiteSpace: 'nowrap',
                }}>
                  {tag}
                </span>
                <span style={{
                  fontSize: 13, fontWeight: 600,
                  color: color.ink, fontFamily: font.family,
                }}>
                  {name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Technical challenges */}
        <p style={{
          margin: '0 0 16px', fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
          letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
          color: color.inkFaint, fontFamily: font.family,
        }}>
          기술 과제
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 12,
        }}>
          {TECH_CHALLENGES.map(({ label, desc }) => (
            <div
              key={label}
              style={{
                background: color.white,
                border: `1px solid ${color.line}`,
                borderRadius: layout.rSm,
                padding: '16px 20px',
              }}
            >
              <p style={{
                margin: '0 0 6px',
                fontSize: 13, fontWeight: 800,
                color: color.brand,
                fontFamily: "'SFMono-Regular','Consolas','Monaco',monospace",
                letterSpacing: '-0.01em',
              }}>
                {label}
              </p>
              <p style={{
                margin: 0, fontSize: 13, lineHeight: 1.6,
                color: color.inkMuted, fontFamily: font.family,
              }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 메인 ──
export default function TheBuild() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [s1Ref, s1Visible] = useReveal({ threshold: 0.04 });
  const [s2Ref, s2Visible] = useReveal({ threshold: 0.04 });
  const [s3Ref, s3Visible] = useReveal({ threshold: 0.04 });
  const [s4Ref, s4Visible] = useReveal({ threshold: 0.04 });
  const [s5Ref, s5Visible] = useReveal({ threshold: 0.04 });
  const [s6Ref, s6Visible] = useReveal({ threshold: 0.04 });
  const [s7Ref, s7Visible] = useReveal({ threshold: 0.04 });
  const [sfRef, sfVisible] = useReveal({ threshold: 0.04 });

  return (
    <section id="build" style={{ background: color.bg, fontFamily: font.family }}>

      {/* Section header */}
      <div
        ref={headRef}
        style={{
          padding: `${layout.sectionY} clamp(20px,5vw,80px) clamp(48px,6vw,80px)`,
          maxWidth: layout.container,
          margin: '0 auto',
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        }}
      >
        <p style={{
          fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
          letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
          color: color.brand, margin: '0 0 24px', fontFamily: font.family,
        }}>
          THE BUILD
        </p>
        <h2 style={{
          fontSize: t.h1.size, fontWeight: t.h1.weight,
          lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
          color: color.ink, margin: 0, fontFamily: font.family,
        }}>
          7개의 전략이 실제로 작동합니다.
        </h2>
      </div>

      <div ref={s1Ref}><S1Block visible={s1Visible} /></div>
      <div ref={s2Ref}><S2Block visible={s2Visible} /></div>
      <div ref={s3Ref}><S3Block visible={s3Visible} /></div>
      <div ref={s4Ref}><S4Block visible={s4Visible} /></div>
      <div ref={s5Ref}><S5Block visible={s5Visible} /></div>
      <div ref={s6Ref}><S6Block visible={s6Visible} /></div>
      <div ref={s7Ref}><S7Block visible={s7Visible} /></div>
      <div ref={sfRef}><FeaturesBlock visible={sfVisible} /></div>

    </section>
  );
}
