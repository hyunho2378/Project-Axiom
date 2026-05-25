import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useCountUp } from '../lib/useCountUp.js';
import researchData from '../data/research.json';
import surveyData from '../data/survey.json';

const {
  project, why, segments, methods, missions,
  observation_results,
  segment_priority, needs, conclusion,
} = researchData;
const sq = surveyData['집계'];

const SEC_PAD = `clamp(64px,8vw,112px) clamp(20px,5vw,80px)`;
const cardShadow = '0 2px 12px rgba(0,0,0,0.06)';

const eyebrowStyle = (clr = color.brand) => ({
  fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
  letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
  color: clr, margin: 0, fontFamily: font.family,
});

function HBar({ items, note }) {
  const max = Math.max(...items.map(([, v]) => v));
  return (
    <div>
      {note && (
        <p style={{ fontSize: 11, color: color.inkFaint, margin: '0 0 12px', fontFamily: font.family }}>{note}</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map(([k, v]) => (
          <div key={k}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 12, lineHeight: 1.4, color: color.inkMuted, fontFamily: font.family }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: color.brand, flexShrink: 0, fontFamily: font.family }}>{v}</span>
            </div>
            <div style={{ height: 6, background: color.line, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: color.brand, borderRadius: 3, width: `${(v / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UserResearch() {
  const [ref0, vis0] = useReveal({ threshold: 0.05 });
  const [ref1, vis1] = useReveal({ threshold: 0.05 });
  const [ref2, vis2] = useReveal({ threshold: 0.05 });
  const [ref3, vis3] = useReveal({ threshold: 0.05 });
  const [ref4, vis4] = useReveal({ threshold: 0.05 });
  const [ref5, vis5] = useReveal({ threshold: 0.05 });
  const [ref6, vis6] = useReveal({ threshold: 0.03 });
  const [ref7, vis7] = useReveal({ threshold: 0.03 });
  const [ref8, vis8] = useReveal({ threshold: 0.05 });

  const [cRef70, c70] = useCountUp(70, 1500);
  const [cRef34, c34] = useCountUp(34, 1500);
  const [cRef9,  c9]  = useCountUp(9,  1200);
  const [cRef0,  c0]  = useCountUp(0,   800);

  const [mRef70, m70] = useCountUp(70, 1500);
  const [mRef6,  m6]  = useCountUp(6,  1200);
  const [mRef4,  m4]  = useCountUp(4,  1000);

  const methodCounters = [[mRef70, m70], [mRef6, m6], [mRef4, m4], [null, null]];

  const ageItems      = Object.entries(sq.Q1_연령대.응답);
  const deviceItems   = Object.entries(sq.Q3_기기.응답);
  const paymentItems  = Object.entries(sq.Q2_결제수단.응답);
  const awarenessItems = Object.entries(sq.Q4_인지.응답);

  const reveal = (vis) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'none' : 'translateY(24px)',
    transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
  });

  return (
    <section id="user-research" style={{ background: color.white, fontFamily: font.family }}>

      {/* ── Header ── */}
      <div style={{ background: color.white, padding: SEC_PAD }}>
        <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
          <div ref={ref0} style={reveal(vis0)}>
            <p style={{ ...eyebrowStyle(), margin: '0 0 24px' }}>USER RESEARCH</p>
            <h2 style={{
              fontSize: t.h1.size, fontWeight: t.h1.weight,
              lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
              color: color.ink, margin: '0 0 16px', maxWidth: '22ch',
            }}>
              사용자의 실제 행동에서 출발했습니다
            </h2>
            <p style={{ fontSize: t.lead.size, lineHeight: t.lead.lh, color: color.inkMuted, margin: 0 }}>
              {project.period} · {project.scope}
            </p>
          </div>
        </div>
      </div>

      {/* ── 01 Background + Purposes ── */}
      <div style={{ background: color.bg, padding: SEC_PAD }}>
        <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
          <div ref={ref1} style={reveal(vis1)}>
            <p style={{ ...eyebrowStyle(color.inkFaint), margin: '0 0 20px' }}>01 RESEARCH BACKGROUND</p>
            <p style={{
              fontSize: t.lead.size, lineHeight: 1.75,
              color: color.ink, margin: '0 0 clamp(32px,4vw,56px)',
              maxWidth: '60ch', fontFamily: font.family,
            }}>
              {why.background}
            </p>
            <p style={{ ...eyebrowStyle(color.inkFaint), margin: '0 0 16px' }}>조사 목적</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {why.purposes.map((p, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 16, padding: '14px 20px',
                  background: color.white, borderRadius: layout.rMd,
                }}>
                  <span style={{
                    fontSize: 12, fontWeight: 800, color: color.brand,
                    flexShrink: 0, lineHeight: 1.5, fontFamily: font.family,
                  }}>
                    0{i + 1}
                  </span>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: color.ink, fontFamily: font.family }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 02 Research Goals ── */}
      <div style={{ background: color.white, padding: SEC_PAD }}>
        <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
          <div ref={ref2} style={reveal(vis2)}>
            <p style={{ ...eyebrowStyle(color.inkFaint), margin: '0 0 20px' }}>02 RESEARCH GOALS</p>
            <div style={{ borderRadius: layout.rMd, overflow: 'hidden', boxShadow: cardShadow }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: color.ink }}>
                    <th style={{ padding: '12px 20px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 13, width: 48 }}>No</th>
                    <th style={{ padding: '12px 20px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 13 }}>연구 목표</th>
                    <th style={{ padding: '12px 20px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 13 }}>기대 성과</th>
                  </tr>
                </thead>
                <tbody>
                  {why.goals.map((g, i) => (
                    <tr key={g.no} style={{ background: i % 2 === 0 ? color.white : color.bg }}>
                      <td style={{ padding: '14px 20px', color: color.brand, fontWeight: 800, fontSize: 13 }}>{g.no}</td>
                      <td style={{ padding: '14px 20px', color: color.ink, fontSize: 14, lineHeight: 1.5 }}>{g.goal}</td>
                      <td style={{ padding: '14px 20px', color: color.inkMuted, fontSize: 13, lineHeight: 1.6 }}>{g.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── 03 Segments ── */}
      <div style={{ background: color.bg, padding: SEC_PAD }}>
        <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
          <div ref={ref3} style={reveal(vis3)}>
            <p style={{ ...eyebrowStyle(color.inkFaint), margin: '0 0 20px' }}>03 SEGMENTS</p>
            <h3 style={{
              fontSize: t.h2.size, fontWeight: t.h2.weight,
              lineHeight: t.h2.lh, letterSpacing: t.h2.ls,
              color: color.ink, margin: '0 0 clamp(24px,3vw,40px)',
            }}>
              4개 세그먼트를 조사했습니다
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))',
              gap: 'clamp(12px,1.5vw,20px)',
            }}>
              {segments.map((s, i) => (
                <div key={i} style={{
                  background: color.white, borderRadius: layout.rMd,
                  padding: 'clamp(20px,2.5vw,32px)', boxShadow: cardShadow,
                }}>
                  <p style={{
                    fontSize: 11, fontWeight: 800, color: color.brand,
                    margin: '0 0 8px', letterSpacing: '0em', textTransform: 'uppercase',
                    fontFamily: font.family,
                  }}>
                    {s.group}
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: color.ink, margin: '0 0 12px', fontFamily: font.family }}>{s.trait}</p>
                  <p style={{ fontSize: 13, color: color.inkMuted, margin: '0 0 8px', fontFamily: font.family }}>
                    <span style={{ fontWeight: 600, color: color.inkFaint }}>사용 목적: </span>{s.goal}
                  </p>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: color.inkFaint,
                    background: color.bg, padding: '3px 10px', borderRadius: 100,
                    fontFamily: font.family,
                  }}>
                    {s.method}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 04 Methods ── */}
      <div style={{ background: color.white, padding: SEC_PAD }}>
        <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
          <div ref={ref4} style={reveal(vis4)}>
            <p style={{ ...eyebrowStyle(color.inkFaint), margin: '0 0 20px' }}>04 RESEARCH METHODS</p>
            <h3 style={{
              fontSize: t.h2.size, fontWeight: t.h2.weight,
              lineHeight: t.h2.lh, letterSpacing: t.h2.ls,
              color: color.ink, margin: '0 0 clamp(24px,3vw,40px)',
            }}>
              4가지 방법으로 데이터를 수집했습니다
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))',
              gap: 'clamp(12px,1.5vw,20px)',
            }}>
              {methods.map((m, i) => {
                const [nRef, nVal] = methodCounters[i];
                return (
                  <div key={i} style={{ background: color.bg, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,32px)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 700, color: color.ink, margin: '0 0 6px', fontFamily: font.family }}>{m.name}</p>
                        <span style={{
                          fontSize: 11, fontWeight: 700, color: color.brand,
                          background: color.brandPale, padding: '3px 10px',
                          borderRadius: 100, fontFamily: font.family,
                        }}>
                          {m.type}
                        </span>
                      </div>
                      {nRef ? (
                        <div ref={nRef} style={{ textAlign: 'right' }}>
                          <span style={{
                            display: 'block',
                            fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800,
                            letterSpacing: '-0.04em', color: color.brand,
                            lineHeight: 1, fontFamily: font.family,
                          }}>
                            {nVal}
                          </span>
                          <span style={{ fontSize: 11, color: color.inkFaint, fontFamily: font.family }}>n</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: 11, color: color.inkFaint, fontFamily: font.family }}>보조</span>
                      )}
                    </div>
                    <p style={{
                      fontSize: 11, fontWeight: 800, color: color.brand,
                      margin: '0 0 4px', letterSpacing: '0em', textTransform: 'uppercase',
                      fontFamily: font.family,
                    }}>
                      WHY
                    </p>
                    <p style={{ fontSize: 13, lineHeight: 1.6, color: color.inkMuted, margin: '0 0 14px', fontFamily: font.family }}>{m.purpose}</p>
                    <p style={{
                      fontSize: 11, fontWeight: 800, color: color.inkFaint,
                      margin: '0 0 4px', letterSpacing: '0em', textTransform: 'uppercase',
                      fontFamily: font.family,
                    }}>
                      HOW
                    </p>
                    <p style={{ fontSize: 13, lineHeight: 1.6, color: color.inkMuted, margin: 0, fontFamily: font.family }}>{m.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── 05 Observation Missions ── */}
      <div style={{ background: color.bg, padding: SEC_PAD }}>
        <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
          <div ref={ref5} style={reveal(vis5)}>
            <p style={{ ...eyebrowStyle(color.inkFaint), margin: '0 0 20px' }}>05 OBSERVATION MISSIONS</p>
            <h3 style={{
              fontSize: t.h2.size, fontWeight: t.h2.weight,
              lineHeight: t.h2.lh, letterSpacing: t.h2.ls,
              color: color.ink, margin: '0 0 clamp(24px,3vw,40px)',
            }}>
              3개 미션으로 행동 데이터를 포착했습니다
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.5vw,20px)' }}>
              {missions.map((m, i) => (
                <div key={i} style={{
                  background: color.white, borderRadius: layout.rMd,
                  padding: 'clamp(20px,2.5vw,32px)', boxShadow: cardShadow,
                }}>
                  <div style={{ display: 'flex', gap: 'clamp(16px,2vw,32px)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    <span style={{
                      fontSize: 'clamp(32px,4vw,48px)', fontWeight: 800,
                      letterSpacing: '-0.04em', color: color.brand,
                      opacity: 0.15, fontFamily: font.family, lineHeight: 1,
                      flexShrink: 0,
                    }}>
                      0{m.no}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 16, fontWeight: 700, color: color.ink, margin: '0 0 16px', fontFamily: font.family }}>{m.title}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 'clamp(12px,1.5vw,20px)' }}>
                        <div>
                          <p style={{
                            fontSize: 11, fontWeight: 800, color: color.brand,
                            margin: '0 0 6px', letterSpacing: '0em', textTransform: 'uppercase',
                            fontFamily: font.family,
                          }}>
                            시나리오
                          </p>
                          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: color.inkMuted, fontFamily: font.family }}>{m.scenario}</p>
                        </div>
                        <div>
                          <p style={{
                            fontSize: 11, fontWeight: 800, color: color.inkFaint,
                            margin: '0 0 6px', letterSpacing: '0em', textTransform: 'uppercase',
                            fontFamily: font.family,
                          }}>
                            관찰 포인트
                          </p>
                          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: color.inkMuted, fontFamily: font.family }}>{m.observe}</p>
                        </div>
                        <div>
                          <p style={{
                            fontSize: 11, fontWeight: 800, color: color.inkFaint,
                            margin: '0 0 6px', letterSpacing: '0em', textTransform: 'uppercase',
                            fontFamily: font.family,
                          }}>
                            측정 지표
                          </p>
                          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: color.inkMuted, fontFamily: font.family }}>{m.metric}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 06 Survey Results ── */}
      <div style={{ background: color.white, padding: SEC_PAD }}>
        <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
          <div ref={ref6} style={reveal(vis6)}>
            <p style={{ ...eyebrowStyle(color.inkFaint), margin: '0 0 20px' }}>06 SURVEY RESULTS</p>
            <h3 style={{
              fontSize: t.h2.size, fontWeight: t.h2.weight,
              lineHeight: t.h2.lh, letterSpacing: t.h2.ls,
              color: color.ink, margin: '0 0 clamp(24px,3vw,40px)',
            }}>
              설문 70명의 실제 데이터
            </h3>

            {/* Key numbers */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))',
              gap: 'clamp(16px,2vw,32px)',
              marginBottom: 'clamp(40px,5vw,64px)',
              padding: 'clamp(24px,3vw,40px)',
              background: color.bg, borderRadius: layout.rMd,
            }}>
              <div style={{ textAlign: 'center' }}>
                <span ref={cRef70} style={{
                  display: 'block', fontSize: 'clamp(40px,5vw,64px)', fontWeight: 800,
                  letterSpacing: '-0.04em', color: color.brand, fontFamily: font.family, lineHeight: 1, marginBottom: 6,
                }}>
                  {c70}명
                </span>
                <span style={{ fontSize: 13, color: color.inkMuted, fontFamily: font.family }}>총 응답자</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span ref={cRef34} style={{
                  display: 'block', fontSize: 'clamp(40px,5vw,64px)', fontWeight: 800,
                  letterSpacing: '-0.04em', color: color.warn, fontFamily: font.family, lineHeight: 1, marginBottom: 6,
                }}>
                  {c34}명
                </span>
                <span style={{ fontSize: 13, color: color.inkMuted, fontFamily: font.family }}>전혀 몰랐다 (48.6%)</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span ref={cRef9} style={{
                  display: 'block', fontSize: 'clamp(40px,5vw,64px)', fontWeight: 800,
                  letterSpacing: '-0.04em', color: color.brand, fontFamily: font.family, lineHeight: 1, marginBottom: 6,
                }}>
                  {c9}명
                </span>
                <span style={{ fontSize: 13, color: color.inkMuted, fontFamily: font.family }}>강릉페이 실사용</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span ref={cRef0} style={{
                  display: 'block', fontSize: 'clamp(40px,5vw,64px)', fontWeight: 800,
                  letterSpacing: '-0.04em', color: color.ink, fontFamily: font.family, lineHeight: 1, marginBottom: 6,
                }}>
                  {c0}명
                </span>
                <span style={{ fontSize: 13, color: color.inkMuted, fontFamily: font.family }}>강릉머니 용어 인지</span>
              </div>
            </div>

            {/* Charts 2x2 */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(16px,2vw,32px)',
              marginBottom: 'clamp(24px,3vw,40px)',
            }}>
              <div style={{ background: color.bg, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,32px)' }}>
                <p style={{
                  fontSize: 11, fontWeight: 800, color: color.inkFaint,
                  margin: '0 0 16px', letterSpacing: '0em', textTransform: 'uppercase', fontFamily: font.family,
                }}>
                  연령대 분포
                </p>
                <HBar items={ageItems} note="n=70 단일 응답" />
              </div>
              <div style={{ background: color.bg, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,32px)' }}>
                <p style={{
                  fontSize: 11, fontWeight: 800, color: color.inkFaint,
                  margin: '0 0 16px', letterSpacing: '0em', textTransform: 'uppercase', fontFamily: font.family,
                }}>
                  사용 기기
                </p>
                <HBar items={deviceItems} note="n=70 단일 응답" />
              </div>
              <div style={{ background: color.bg, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,32px)' }}>
                <p style={{
                  fontSize: 11, fontWeight: 800, color: color.inkFaint,
                  margin: '0 0 16px', letterSpacing: '0em', textTransform: 'uppercase', fontFamily: font.family,
                }}>
                  결제 수단
                </p>
                <HBar items={paymentItems} note="n=70 복수 응답" />
              </div>
              <div style={{ background: color.bg, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,32px)' }}>
                <p style={{
                  fontSize: 11, fontWeight: 800, color: color.inkFaint,
                  margin: '0 0 16px', letterSpacing: '0em', textTransform: 'uppercase', fontFamily: font.family,
                }}>
                  강릉페이 인지도
                </p>
                <HBar items={awarenessItems} note="n=70 단일 응답" />
              </div>
            </div>

            {/* Observation results */}
            <div style={{ background: color.bg, borderRadius: layout.rMd, padding: 'clamp(20px,2.5vw,32px)' }}>
              <p style={{
                fontSize: 11, fontWeight: 800, color: color.inkFaint,
                margin: '0 0 16px', letterSpacing: '0em', textTransform: 'uppercase', fontFamily: font.family,
              }}>
                맥락적 관찰 핵심 결과 (n=4)
              </p>
              {Object.entries(observation_results)
                .filter(([k]) => k !== '_note')
                .map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: color.brand, flexShrink: 0, lineHeight: 1.5, fontFamily: font.family }}>→</span>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: color.inkMuted, fontFamily: font.family }}>{v}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 07 Segment Priority + Needs ── */}
      <div style={{ background: color.bg, padding: SEC_PAD }}>
        <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
          <div ref={ref7} style={reveal(vis7)}>
            <p style={{ ...eyebrowStyle(color.inkFaint), margin: '0 0 20px' }}>07 SEGMENT PRIORITY</p>
            <div style={{
              borderRadius: layout.rMd, overflow: 'hidden',
              boxShadow: cardShadow, marginBottom: 'clamp(40px,5vw,64px)',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: color.ink }}>
                    <th style={{ padding: '12px 20px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 13 }}>세그먼트</th>
                    <th style={{ padding: '12px 20px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 13 }}>1순위 개선</th>
                    <th style={{ padding: '12px 20px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 13 }}>2순위 개선</th>
                  </tr>
                </thead>
                <tbody>
                  {segment_priority.map((s, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? color.white : color.bg }}>
                      <td style={{ padding: '12px 20px', color: color.brand, fontWeight: 700, fontSize: 13 }}>{s.segment}</td>
                      <td style={{ padding: '12px 20px', color: color.ink, fontSize: 13, lineHeight: 1.5 }}>{s.p1}</td>
                      <td style={{ padding: '12px 20px', color: color.inkMuted, fontSize: 13, lineHeight: 1.5 }}>{s.p2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ ...eyebrowStyle(color.inkFaint), margin: '0 0 20px' }}>사용자 니즈 종합</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {needs.map((n, i) => (
                <div key={i} style={{
                  background: color.white, borderRadius: layout.rMd,
                  padding: '16px 20px',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(100px,1fr) minmax(140px,1.5fr) minmax(140px,1.5fr)',
                  gap: 'clamp(12px,1.5vw,24px)',
                  alignItems: 'start',
                  boxShadow: cardShadow,
                }}>
                  <div>
                    <p style={{
                      fontSize: 11, fontWeight: 800, color: color.brand,
                      margin: '0 0 4px', letterSpacing: '0em', textTransform: 'uppercase', fontFamily: font.family,
                    }}>니즈</p>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: color.ink, fontFamily: font.family }}>{n.need}</p>
                  </div>
                  <div>
                    <p style={{
                      fontSize: 11, fontWeight: 800, color: color.warn,
                      margin: '0 0 4px', letterSpacing: '0em', textTransform: 'uppercase', fontFamily: font.family,
                    }}>문제</p>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: color.inkMuted, fontFamily: font.family }}>{n.problem}</p>
                  </div>
                  <div>
                    <p style={{
                      fontSize: 11, fontWeight: 800, color: color.inkFaint,
                      margin: '0 0 4px', letterSpacing: '0em', textTransform: 'uppercase', fontFamily: font.family,
                    }}>방향</p>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: color.inkMuted, fontFamily: font.family }}>{n.direction}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 08 Research Conclusion ── */}
      <div style={{ background: color.white, padding: SEC_PAD }}>
        <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
          <div ref={ref8} style={reveal(vis8)}>
            <p style={{ ...eyebrowStyle(), margin: '0 0 24px' }}>RESEARCH CONCLUSION</p>
            <p style={{
              fontSize: 'clamp(18px,2.2vw,28px)', fontWeight: 700,
              lineHeight: 1.6, letterSpacing: '-0.02em',
              color: color.ink, margin: 0,
              maxWidth: '44ch', fontFamily: font.family, fontStyle: 'italic',
            }}>
              &ldquo;{conclusion}&rdquo;
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
