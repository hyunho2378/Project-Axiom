import { useState } from 'react';
import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import axiomData from '../data/axiom.json';

const { dataLogic } = axiomData;
const { overview, scoring, skinTypes, questions } = dataLogic;

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
        }}
        className="diagram-row"
      >
        {/* Q1-Q6, Q7-Q10 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.5vw,14px)', flexShrink: 0 }}>
          <div style={{ padding: 'clamp(10px,1.2vw,16px) clamp(12px,1.5vw,18px)', background: 'rgba(0,212,255,0.12)', border: `1px solid ${colors.brand}`, borderRadius: 10 }}>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: colors.brand, letterSpacing: '0.04em' }}>Q1~Q6</p>
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
            background: 'rgba(0,212,255,0.08)',
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
      <p style={{ margin: '0 0 clamp(16px,2vw,24px)', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
        AXIS 1 — 유수분 타입 {scoring.axis1.range}
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
  const borderColors = [colors.ok, colors.brand, colors.warn, colors.brandMid];
  return (
    <div style={{ marginBottom: 'clamp(40px,5vw,64px)' }}>
      <p style={{ margin: '0 0 clamp(16px,2vw,24px)', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
        AXIS 2 — 민감도 등급 {scoring.axis2.range}
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
      <p style={{ margin: '0 0 clamp(16px,2vw,24px)', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
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
            background: 'rgba(0,212,255,0.08)',
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
      <p style={{ margin: '0 0 clamp(16px,2vw,24px)', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
        Q1~Q10 진단 질문
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {questions.map((q, i) => {
          const isOpen = openIdx === i;
          const axisColor = q.axis === 1 ? colors.brand : colors.brandMid;
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
                          background: 'rgba(0,212,255,0.1)',
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

export default function DataLogic() {
  const [diagramRef,  diagramVisible]  = useReveal({ threshold: 0.1 });
  const [axis1Ref,    axis1Visible]    = useReveal({ threshold: 0.1 });
  const [axis2Ref,    axis2Visible]    = useReveal({ threshold: 0.1 });
  const [exampleRef,  exampleVisible]  = useReveal({ threshold: 0.1 });

  return (
    <section
      id="data-logic"
      style={{ background: colors.bgCard, fontFamily: font.family, padding: `clamp(32px,4vw,60px) clamp(20px,6vw,100px)` }}
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
      </div>

      <style>{`
        @media (max-width: 768px) {
          .axis2-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .example-row { flex-direction: column !important; }
          .example-row > span { transform: rotate(90deg); }
        }
        @media (max-width: 640px) {
          .axis1-row { gap: 10px !important; }
          .diagram-row { gap: 8px !important; }
        }
      `}</style>
    </section>
  );
}
