import { useState } from 'react';
import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import axiomData from '../data/axiom.json';

const { dataLogic } = axiomData;
const { overview, scoring, skinTypes, questions, products } = dataLogic;

const SHEET_PRODUCTS  = 'https://docs.google.com/spreadsheets/d/16LeDf6YsbA_lO7kAUuY_NcIPC2r45XBmyH014KsLVmI/edit?usp=sharing';
const SHEET_QUESTIONS = 'https://docs.google.com/spreadsheets/d/1RNVo3PTC3oB-XSsEtV08oUyd2rsM9-NgUDz3bmicfOE/edit?usp=sharing';

const CATEGORY_LABELS = {
  toner:     '토너',
  ampoule:   '앰플',
  tubeCream: '튜브형 크림',
  jarCream:  '원형 크림',
  sunscreen: '선크림',
};

const AXIS2_BORDER = ['ok', 'brand', 'warn', colors.brandMid];

function SystemDiagram({ visible }) {
  return (
    <div
      style={{
        marginBottom: 'clamp(48px,6vw,80px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto auto auto',
          gap: 'clamp(8px,1.5vw,16px)',
          alignItems: 'center',
          overflowX: 'auto',
          paddingBottom: 8,
          width: 'fit-content',
        }}
        className="diagram-row"
      >
        {/* Q1-Q6, Q7-Q10 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.5vw,14px)', flexShrink: 0 }}>
          <div style={{ padding: 'clamp(10px,1.2vw,16px) clamp(12px,1.5vw,18px)', background: 'rgba(90,154,181,0.12)', border: `1px solid ${colors.brandMid}`, borderRadius: 10 }}>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: colors.brandMid, letterSpacing: '0.04em' }}>Q1~Q6</p>
            <p style={{ margin: '2px 0 0', fontSize: 15, fontWeight: 600, color: colors.inkMuted }}>유수분 6문항</p>
          </div>
          <div style={{ padding: 'clamp(10px,1.2vw,16px) clamp(12px,1.5vw,18px)', background: 'rgba(90,154,181,0.12)', border: `1px solid ${colors.brandMid}`, borderRadius: 10 }}>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: colors.brandMid, letterSpacing: '0.04em' }}>Q7~Q10</p>
            <p style={{ margin: '2px 0 0', fontSize: 15, fontWeight: 600, color: colors.inkMuted }}>민감도 4문항</p>
          </div>
        </div>

        <svg width="32" height="80" viewBox="0 0 32 80" fill="none" style={{ flexShrink: 0 }}>
          <line x1="0" y1="20" x2="20" y2="20" stroke={colors.brand} strokeWidth="1.5" />
          <line x1="0" y1="60" x2="20" y2="60" stroke={colors.brandMid} strokeWidth="1.5" />
          <line x1="20" y1="20" x2="20" y2="60" stroke={colors.line} strokeWidth="1.5" />
          <line x1="20" y1="40" x2="32" y2="40" stroke={colors.brand} strokeWidth="1.5" />
          <polygon points="28,36 32,40 28,44" fill={colors.brand} />
        </svg>

        {/* 결과 박스들 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.5vw,14px)', flexShrink: 0 }}>
          <div style={{ padding: 'clamp(10px,1.2vw,16px) clamp(12px,1.5vw,18px)', background: colors.bgDeep, border: `1px solid ${colors.line}`, borderRadius: 10 }}>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: colors.ink }}>유수분 5타입</p>
            <p style={{ margin: '2px 0 0', fontSize: 15, fontWeight: 600, color: colors.inkMuted }}>0~60점 / 5구간</p>
          </div>
          <div style={{ padding: 'clamp(10px,1.2vw,16px) clamp(12px,1.5vw,18px)', background: colors.bgDeep, border: `1px solid ${colors.line}`, borderRadius: 10 }}>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: colors.ink }}>민감도 4등급</p>
            <p style={{ margin: '2px 0 0', fontSize: 15, fontWeight: 600, color: colors.inkMuted }}>0~40점 / 4구간</p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            flexShrink: 0,
            padding: '0 clamp(4px,1vw,12px)',
          }}
        >
          <span style={{ fontSize: 'clamp(20px,3vw,32px)', fontWeight: 800, color: colors.brand, lineHeight: 1 }}>×</span>
          <span style={{ fontSize: 15, fontWeight: 600, color: colors.inkMuted }}>조합</span>
        </div>

        {/* 최종 결과 */}
        <div
          style={{
            padding: 'clamp(16px,2vw,24px) clamp(16px,2vw,24px)',
            background: 'rgba(90,154,181,0.08)',
            border: `2px solid ${colors.brand}`,
            borderRadius: 12,
            textAlign: 'center',
            flexShrink: 0,
          }}
        >
          <p style={{ margin: '0 0 4px', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, color: colors.brand, letterSpacing: '-0.03em', lineHeight: 1 }}>20</p>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: colors.inkMuted, lineHeight: 1.4 }}>가지 피부 코드</p>
          <p style={{ margin: '4px 0 0', fontSize: 15, fontWeight: 600, color: colors.inkMuted }}>5 × 4 = 20</p>
        </div>
      </div>
    </div>
  );
}

function Axis1Cards({ visible }) {
  const types = scoring.axis1.types;
  return (
    <div style={{ marginBottom: 'clamp(40px,5vw,64px)' }}>
      <p style={{ margin: '0 0 clamp(16px,2vw,24px)', fontSize: t.sublabel.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
        AXIS 1: 유수분 타입 {scoring.axis1.range}
      </p>
      <div
        style={{ display: 'flex', gap: 'clamp(8px,1.5vw,14px)', overflowX: 'auto', paddingBottom: 8 }}
        className="axis1-row"
      >
        {types.map((tp, i) => {
          const skin = skinTypes[tp.code];
          return (
            <div
              key={tp.code}
              style={{
                background: colors.bgDeep,
                border: `1px solid ${colors.line}`,
                borderRadius: 'clamp(8px,1vw,12px)',
                padding: 'clamp(16px,2vw,24px)',
                minWidth: 'clamp(140px,18vw,180px)',
                flexShrink: 0,
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(16px)',
                transition: `opacity 0.5s ease ${i * 70}ms, transform 0.5s ease ${i * 70}ms`,
              }}
            >
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                {skin?.lighting && (
                  <>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: skin.lighting.key, border: `1px solid ${colors.line}`, flexShrink: 0 }} />
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: skin.lighting.rim, border: `1px solid ${colors.line}`, flexShrink: 0 }} />
                  </>
                )}
              </div>
              <p style={{ margin: '0 0 4px', fontSize: t.body.size, fontWeight: 700, color: colors.ink }}>{tp.type}</p>
              <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, fontFamily: 'monospace', color: colors.brand, letterSpacing: '0.04em' }}>{tp.code}</p>
              <p style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 500, color: colors.inkMuted }}>{tp.min}~{tp.max}점</p>
              {skin && (
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: colors.inkMuted, fontStyle: 'italic', lineHeight: 1.4 }}>
                  {skin.texture.split(' — ')[1] ?? skin.texture}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Axis2Cards({ visible }) {
  const grades = scoring.axis2.grades;
  const borderColors = [colors.brand, colors.brandStrong, colors.warn, colors.brandMid];
  return (
    <div style={{ marginBottom: 'clamp(40px,5vw,64px)' }}>
      <p style={{ margin: '0 0 clamp(16px,2vw,24px)', fontSize: t.sublabel.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
        AXIS 2: 민감도 등급 {scoring.axis2.range}
      </p>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(8px,1.5vw,14px)' }}
        className="axis2-grid"
      >
        {grades.map((g, i) => (
          <div
            key={g.code}
            style={{
              background: colors.bgDeep,
              borderRadius: 'clamp(8px,1vw,12px)',
              padding: 'clamp(14px,1.8vw,22px)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(16px)',
              transition: `opacity 0.5s ease ${i * 70}ms, transform 0.5s ease ${i * 70}ms`,
            }}
          >
            <p style={{ margin: '0 0 4px', fontSize: t.body.size, fontWeight: 700, color: colors.ink }}>{g.grade}</p>
            <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, fontFamily: 'monospace', color: borderColors[i], letterSpacing: '0.04em' }}>{g.code}</p>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: colors.inkMuted }}>{g.min}~{g.max}점</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExampleCase({ visible }) {
  return (
    <div
      style={{
        marginBottom: 'clamp(48px,6vw,80px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <p style={{ margin: '0 0 clamp(16px,2vw,24px)', fontSize: t.sublabel.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
        결과 예시
      </p>
      <div
        style={{ display: 'flex', gap: 'clamp(10px,2vw,20px)', alignItems: 'center', flexWrap: 'wrap' }}
        className="example-row"
      >
        <div style={{ padding: 'clamp(16px,2vw,24px)', background: colors.bgDeep, border: `1px solid ${colors.brand}`, borderRadius: 12, flex: 1, minWidth: 140 }}>
          <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', color: colors.brand }}>AXIS 1</p>
          <p style={{ margin: '0 0 2px', fontSize: t.body.size, fontWeight: 600, color: colors.ink }}>유수분 합계 15점</p>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: colors.inkMuted }}>→ 중성 (TYPE_AXIS) · 13~25점</p>
        </div>
        <span style={{ fontSize: 24, fontWeight: 700, color: colors.brand, flexShrink: 0 }}>+</span>
        <div style={{ padding: 'clamp(16px,2vw,24px)', background: colors.bgDeep, border: `1px solid ${colors.brandMid}`, borderRadius: 12, flex: 1, minWidth: 140 }}>
          <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', color: colors.brandMid }}>AXIS 2</p>
          <p style={{ margin: '0 0 2px', fontSize: t.body.size, fontWeight: 600, color: colors.ink }}>민감도 합계 35점</p>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: colors.inkMuted }}>→ 과민/경보 (ST-ALERT) · 31~40점</p>
        </div>
        <span style={{ fontSize: 24, fontWeight: 700, color: colors.brand, flexShrink: 0 }}>=</span>
        <div
          style={{
            padding: 'clamp(16px,2vw,24px)',
            background: 'rgba(90,154,181,0.08)',
            border: `2px solid ${colors.brand}`,
            borderRadius: 12,
            flex: 1,
            minWidth: 140,
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', color: colors.brand }}>피부 코드</p>
          <p style={{ margin: '0 0 2px', fontSize: 'clamp(18px,3vw,26px)', fontWeight: 800, color: colors.brand, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            과민 중성
          </p>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 600, fontFamily: 'monospace', color: colors.inkMuted }}>TYPE_AXIS + ST-ALERT</p>
        </div>
      </div>
    </div>
  );
}

function Accordion() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div>
      <p style={{ margin: '0 0 clamp(16px,2vw,24px)', fontSize: t.sublabel.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
        Q1~Q10 진단 질문
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {questions.map((q, i) => {
          const isOpen = openIdx === i;
          const axisColor = colors.brandMid;
          return (
            <div
              key={q.q}
              style={{
                background: colors.bgDeep,
                border: `1px solid ${isOpen ? colors.brand : colors.line}`,
                borderRadius: 'clamp(8px,1vw,12px)',
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(10px,1.5vw,16px)',
                  padding: 'clamp(14px,1.8vw,20px) clamp(16px,2vw,24px)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: font.family,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, fontFamily: 'monospace', color: axisColor, flexShrink: 0, minWidth: 28 }}>{q.q}</span>
                <span style={{ fontSize: 15, fontWeight: 600, padding: '2px 8px', border: `1px solid ${axisColor}`, borderRadius: 9999, color: axisColor, flexShrink: 0 }}>{q.measure}</span>
                <span style={{ flex: 1, fontSize: t.body.size, color: colors.inkMuted, lineHeight: 1.4 }}>{q.question}</span>
                <span
                  style={{
                    fontSize: 18, fontWeight: 500,
                    color: colors.brand,
                    flexShrink: 0,
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <div style={{ borderTop: `1px solid ${colors.line}`, padding: 'clamp(12px,1.5vw,18px) clamp(16px,2vw,24px)' }}>
                  {q.answers.map((ans, ai) => (
                    <div
                      key={ai}
                      style={{
                        display: 'flex',
                        gap: 'clamp(10px,1.5vw,16px)',
                        alignItems: 'flex-start',
                        padding: '8px 0',
                        borderBottom: ai < q.answers.length - 1 ? `1px solid ${colors.line}` : 'none',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: colors.brand,
                          flexShrink: 0,
                          background: 'rgba(90,154,181,0.08)',
                          padding: '2px 8px',
                          borderRadius: 4,
                          fontFamily: 'monospace',
                        }}
                      >
                        +{ans.score}점
                      </span>
                      <span style={{ fontSize: 15, fontWeight: 600, color: colors.inkMuted, flexShrink: 0, paddingTop: 2 }}>{ans.code}</span>
                      <span style={{ fontSize: t.body.size, color: colors.inkMuted, lineHeight: 1.5 }}>{ans.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SheetLink({ href, label }) {
  return (
    <div style={{ marginTop: 'clamp(24px,3vw,40px)', display: 'flex', justifyContent: 'center' }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-glow"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '18px 52px',
          borderRadius: 12,
          fontSize: t.lead.size,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontFamily: font.family,
          color: colors.ink,
          textDecoration: 'none',
        }}
      >
        {label} →
      </a>
    </div>
  );
}

const SKIN_TYPE_ORDER = ['건성', '중성', '지성', '수부지', '복합성'];
const CAT_KEYS = ['toner', 'ampoule', 'tubeCream', 'jarCream', 'sunscreen'];

function ProductMapping({ visible }) {
  const thBase = {
    padding: '8px 12px',
    fontSize: t.caption.size,
    fontWeight: 700,
    letterSpacing: '0.06em',
    background: colors.bgDeep,
    borderBottom: `1px solid ${colors.line}`,
    borderRight: `1px solid ${colors.line}`,
    fontFamily: font.family,
    whiteSpace: 'nowrap',
  };
  const tdBase = {
    padding: '8px 12px',
    fontSize: 14,
    fontWeight: 500,
    color: colors.inkMuted,
    borderBottom: `1px solid ${colors.line}`,
    borderRight: `1px solid ${colors.line}`,
    lineHeight: 1.45,
    fontFamily: font.family,
  };

  return (
    <div
      style={{
        marginBottom: 'clamp(48px,6vw,80px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <p style={{ margin: '0 0 clamp(16px,2vw,24px)', fontSize: t.sublabel.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
        제품 매칭: 피부 타입별 25개 제품
      </p>

      <div style={{ overflowX: 'auto', borderRadius: layout.rMd, border: `1px solid ${colors.line}` }}>
        <table style={{ borderCollapse: 'collapse', minWidth: 640, width: '100%' }}>
          <thead>
            <tr>
              <th style={{ ...thBase, textAlign: 'left', color: colors.inkMuted, minWidth: 64 }}>피부타입</th>
              {CAT_KEYS.map(cat => (
                <th key={cat} style={{ ...thBase, textAlign: 'center', color: colors.brand }}>{CATEGORY_LABELS[cat]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SKIN_TYPE_ORDER.map((skin, ri) => (
              <tr key={skin}>
                <td style={{ ...thBase, color: colors.brand, background: colors.bgDeep, fontWeight: 700 }}>{skin}</td>
                {CAT_KEYS.map(cat => (
                  <td key={cat} style={{ ...tdBase, background: ri % 2 === 0 ? 'transparent' : colors.bgDeep }}>
                    {products[cat]?.[ri]?.nameKo ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SheetLink href={SHEET_PRODUCTS} label="전체 화장품 정보 보러가기" />
    </div>
  );
}

const AI_FLOW = ['진단 응답', '2축 분류', 'Gemini API', '맞춤 해석'];

const AI_NODES = [
  {
    tier: '분류 엔진',
    stack: 'Rule-based Classifier',
    desc: '유수분과 민감도 두 축으로 20가지 피부 코드를 나누고, 개인의 응답 점수로 코드를 결정합니다.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <circle cx="6" cy="15" r="2" />
        <circle cx="18" cy="15" r="2" />
        <path d="M10 11l-2 2M14 11l2 2" />
      </svg>
    ),
  },
  {
    tier: 'AI 생성',
    stack: 'Google Gemini API',
    desc: '응답 맥락으로 프롬프트를 구성하고, 피부 코드에 맞는 해석 문장을 실시간으로 생성합니다.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
        <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" />
      </svg>
    ),
  },
  {
    tier: '전달',
    stack: 'Explainability Copy',
    desc: '정량 수치 대신 2~3줄의 해석 문장으로 결과를 전하고, 사용자의 신뢰를 확보합니다.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
];

function AiInterpretation({ visible }) {
  return (
    <div
      style={{
        marginTop: 'clamp(56px,7vw,96px)',
        paddingTop: 'clamp(40px,5vw,64px)',
        borderTop: `1px solid ${colors.line}`,
      }}
    >
      <div style={{ marginBottom: 'clamp(32px,4vw,52px)' }}>
        <p
          style={{
            margin: '0 0 12px',
            fontSize: t.eyebrow.size,
            fontWeight: t.eyebrow.weight,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: colors.brand,
            fontFamily: font.display,
          }}
        >
          AI INTERPRETATION
        </p>
        <h2
          style={{
            margin: '0 0 16px',
            fontSize: 'clamp(21px,3.75vw,47px)',
            fontWeight: t.h1.weight,
            lineHeight: t.h1.lh,
            letterSpacing: t.h1.ls,
            color: colors.ink,
            fontFamily: font.family,
            wordBreak: 'keep-all',
          }}
        >
          Gemini API로 전달하는 진단 결과
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: t.lead.size,
            fontWeight: 400,
            lineHeight: t.lead.lh,
            color: colors.inkMuted,
            maxWidth: '56ch',
            wordBreak: 'keep-all',
            fontFamily: font.family,
          }}
        >
          20가지 결과 분류 이후 개인의 응답 맥락을 읽어 Gemini가 맞춤 해석 문장을 생성합니다.
        </p>
      </div>

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            overflowX: 'auto',
            paddingBottom: 12,
            marginBottom: 'clamp(32px,4vw,52px)',
          }}
          className="flow-ai"
        >
          {AI_FLOW.map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div
                style={{
                  padding: 'clamp(10px,1.2vw,14px) clamp(14px,1.8vw,22px)',
                  background: i === 0
                    ? 'rgba(90,154,181,0.12)'
                    : i === AI_FLOW.length - 1
                      ? 'rgba(90,154,181,0.16)'
                      : colors.bgDeep,
                  border: `1px solid ${i === 0 || i === AI_FLOW.length - 1 ? colors.brand : colors.line}`,
                  borderRadius: 10,
                  textAlign: 'center',
                  minWidth: 'clamp(72px,9vw,110px)',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 'clamp(11px,1.1vw,14px)',
                    fontWeight: 700,
                    color: i === 0 || i === AI_FLOW.length - 1 ? colors.brand : colors.inkMuted,
                    fontFamily: font.family,
                    letterSpacing: '0.02em',
                    lineHeight: 1.3,
                  }}
                >
                  {label}
                </p>
              </div>
              {i < AI_FLOW.length - 1 && (
                <svg width="28" height="12" viewBox="0 0 28 12" fill="none" style={{ flexShrink: 0, marginLeft: -1 }}>
                  <path d="M0 6h22M18 1l6 5-6 5" stroke={colors.brand} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(10px,1.5vw,18px)',
          }}
          className="ai-stack-grid"
        >
          {AI_NODES.map((node, i) => (
            <div
              key={i}
              style={{
                background: colors.bgDeep,
                border: `1px solid ${colors.line}`,
                borderRadius: 'clamp(10px,1.2vw,16px)',
                padding: 'clamp(20px,2.5vw,32px)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(16px)',
                transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
              }}
            >
              <div style={{ color: colors.brand, marginBottom: 14 }}>{node.icon}</div>
              <p style={{ margin: '0 0 4px', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkFaint, fontFamily: font.family }}>
                {node.tier}
              </p>
              <p style={{ margin: '0 0 10px', fontSize: 'clamp(14px,1.6vw,18px)', fontWeight: 700, color: colors.ink, fontFamily: font.family, letterSpacing: '0.01em' }}>
                {node.stack}
              </p>
              <p style={{ margin: 0, fontSize: t.body.size, fontWeight: 400, color: colors.inkMuted, lineHeight: 1.5, fontFamily: font.family }}>
                {node.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DataLogic() {
  const [diagramRef,  diagramVisible]  = useReveal({ threshold: 0.1 });
  const [axis1Ref,    axis1Visible]    = useReveal({ threshold: 0.1 });
  const [axis2Ref,    axis2Visible]    = useReveal({ threshold: 0.1 });
  const [exampleRef,  exampleVisible]  = useReveal({ threshold: 0.1 });
  const [productRef,  productVisible]  = useReveal({ threshold: 0.1 });
  const [aiRef,       aiVisible]       = useReveal({ threshold: 0.08 });

  return (
    <section
      id="data-logic"
      style={{ background: colors.bgCard, fontFamily: font.family, padding: `clamp(32px,4vw,60px) clamp(20px,5vw,80px)` }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="08 DATA LOGIC"
          headline="유분·민감도 두 기준으로 분석 → 20가지 피부 타입"
          sub={`${overview.axis1} · ${overview.axis2}`}
          align="left"
        />

        <div ref={diagramRef}>
          <SystemDiagram visible={diagramVisible} />
        </div>

        <div ref={axis1Ref}>
          <Axis1Cards visible={axis1Visible} />
        </div>

        <div ref={axis2Ref}>
          <Axis2Cards visible={axis2Visible} />
        </div>

        <div ref={exampleRef}>
          <ExampleCase visible={exampleVisible} />
        </div>

        <Accordion />
        <SheetLink href={SHEET_QUESTIONS} label="전체 질문 데이터 로직 보러가기" />

        <div ref={productRef}>
          <ProductMapping visible={productVisible} />
        </div>

        <div ref={aiRef}>
          <AiInterpretation visible={aiVisible} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .axis2-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .example-row { flex-direction: column !important; }
          .example-row > span { transform: rotate(90deg); }
          .ai-stack-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .axis1-row { gap: 10px !important; }
          .diagram-row { gap: 8px !important; }
          .flow-ai { gap: 0 !important; }
        }
        @media (max-width: 900px) {
          .product-row { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .highlight-grid { grid-template-columns: 1fr !important; }
          .product-row { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
