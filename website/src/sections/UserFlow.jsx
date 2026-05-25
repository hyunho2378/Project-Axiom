import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const FLOWS = [
  {
    num: '①',
    label: '신규 사용자 온보딩',
    nodes: [
      '스플래시',
      '홈\n(카드신청 스포트라이트)',
      '카드신청',
      '신청완료',
      '배송알림',
      '카드등록',
      '등록완료\n(충전 코치마크)',
    ],
  },
  {
    num: '②',
    label: '결제',
    nodes: ['홈', 'QR결제', '카메라 스캔', '결제완료'],
    tag: { index: 3, text: '캐시백 자동적립' },
  },
  {
    num: '③',
    label: '충전 · 잔액확인',
    nodes: ['홈\n(잔액카드)', '충전', '금액선택', '충전완료\n(잔액반영)'],
    branch: [
      '카드 SVG 클릭',
      'Face ID (HIG)\n지문 (Google Material 3)',
      '카드뒷면\n(CVC)',
    ],
  },
  {
    num: '④',
    label: '환불',
    nodes: ['이용내역', '거래기록', '환불버튼', '환불가능\n충전내역', '환불완료'],
  },
];

function Node({ text, dashed = false }) {
  return (
    <div
      style={{
        padding: '8px 14px',
        borderRadius: 12,
        background: color.white,
        border: `2px ${dashed ? 'dashed' : 'solid'} ${color.brand}`,
        fontSize: t.caption.size,
        fontWeight: 600,
        color: dashed ? color.inkMuted : color.ink,
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        minWidth: 80,
        maxWidth: 140,
        lineHeight: 1.4,
        flexShrink: 0,
        wordBreak: 'keep-all',
      }}
    >
      {text}
    </div>
  );
}

function SolidArrow() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        width: 28,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 2,
          background: color.brand,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -1,
            top: -4,
            width: 0,
            height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: `7px solid ${color.brand}`,
          }}
        />
      </div>
    </div>
  );
}

function DashedArrow() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        width: 28,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 0,
          borderTop: `2px dashed ${color.brand}`,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -1,
            top: -4,
            width: 0,
            height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: `7px solid ${color.brand}`,
          }}
        />
      </div>
    </div>
  );
}

function FlowRow({ flow, visible, delay }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
        marginBottom: 'clamp(24px,3vw,40px)',
      }}
    >
      {/* Label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontSize: t.caption.size,
            fontWeight: 800,
            color: color.brand,
            letterSpacing: '0.02em',
          }}
        >
          {flow.num}
        </span>
        <span
          style={{
            fontSize: t.caption.size,
            fontWeight: 700,
            color: color.inkMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {flow.label}
        </span>
      </div>

      {/* Main flow nodes */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          overflowX: 'auto',
          paddingBottom: flow.branch ? 0 : 4,
        }}
      >
        {flow.nodes.map((node, i) => (
          <div
            key={i}
            style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
          >
            <div style={{ position: 'relative' }}>
              <Node text={node} />
              {flow.tag?.index === i && (
                <div
                  style={{
                    position: 'absolute',
                    top: -22,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: color.ok,
                    color: color.white,
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 4,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {flow.tag.text}
                </div>
              )}
            </div>
            {i < flow.nodes.length - 1 && <SolidArrow />}
          </div>
        ))}
      </div>

      {/* Branch (dashed, starts below first node) */}
      {flow.branch && (
        <div style={{ paddingLeft: 2, marginTop: 0 }}>
          {/* Vertical dashed connector from first node */}
          <div
            style={{
              height: 16,
              borderLeft: `2px dashed ${color.brand}`,
              marginLeft: 46,
              marginBottom: 2,
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              overflowX: 'auto',
              paddingBottom: 4,
            }}
          >
            {flow.branch.map((node, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <Node text={node} dashed />
                {i < flow.branch.length - 1 && <DashedArrow />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function UserFlow() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [flowRef, flowVisible] = useReveal({ threshold: 0.03 });

  return (
    <section
      id="user-flow"
      style={{
        background: color.white,
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
            marginBottom: 'clamp(48px,6vw,80px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px',
          }}>
            USER FLOW
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px',
          }}>
            네 갈래의 핵심 흐름을 다시 그렸습니다
          </h2>
          <p style={{
            fontSize: t.lead.size, fontWeight: 400,
            lineHeight: t.lead.lh, color: color.inkMuted,
            margin: 0,
          }}>
            온보딩, 결제, 충전, 환불. 사용자가 실제로 거치는 경로를 재설계했습니다.
          </p>
        </div>

        <div ref={flowRef}>
          {FLOWS.map((flow, i) => (
            <FlowRow
              key={flow.num}
              flow={flow}
              visible={flowVisible}
              delay={i * 0.12}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
