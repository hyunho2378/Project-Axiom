import { useState } from 'react';
import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const DOCS = [
  {
    name: 'CLAUDE.md', desc: '행동지침·금지규칙',
    preview: `# CLAUDE.md\n## 1. Think Before Coding\nState assumptions explicitly.\nIf multiple interpretations exist,\npresent them — don't pick silently.\n## 2. Simplicity First\nMinimum code that solves the problem.\nNo features beyond what was asked.`,
  },
  {
    name: 'AGENTS.md', desc: '에이전트 역할·경계',
    preview: `# AGENTS.md — 에이전트 실행 구조\nPHASE 0  초기 세팅    (1개 에이전트)\nPHASE 1  병렬 구현    (3개 동시 실행)\nPHASE 2  검증 및 연동 (1개, PHASE 1 후)\n---\n실행 원칙: 명세를 벗어나는 결정\n스스로 내리지 않는다.`,
  },
  {
    name: 'DESIGN.md', desc: '토큰·컴포넌트 계약',
    preview: `# DESIGN.md — 강릉페이 Phase 2\nUX Concept: "내 돈이 내 편인 앱"\n두 축:\n  1. 투명한 정보 노출\n  2. 막힘없는 직진형 프로세스\n7대 전략: S1 ~ S7`,
  },
  {
    name: 'IA.md', desc: '라우트·화면 계층',
    preview: `# IA.md — 강릉페이 Phase 2 IA\n바텀 탭 (5개):\n  [홈][결제매장][QR결제][이용내역][MY]\n핵심 변경:\n  - 햄버거 메뉴 완전 삭제 → MY 탭\n  - QR결제를 중앙 강조 위치로`,
  },
  {
    name: 'COMPONENTS.md', desc: '33개 컴포넌트 스펙',
    preview: `# COMPONENTS.md — 강릉페이 스펙\n총 33개 | Phase 1 AS-IS 복제 기준\nL01 TopAppBar.jsx\nL04 BottomNavBar.jsx\nL06 ScreenContainer.jsx\nH03 BalanceCard.jsx\nH04 BalanceCardExpanded.jsx`,
  },
  {
    name: 'ROUTES.md', desc: '30개 화면 목록',
    preview: `# ROUTES.md — 라우팅 구조\nPhase 3 | React Router v6\n/         → HomePage\n/store    → StorePage\n/qr       → QRPage\n/history  → HistoryPage\n/my       → MyPage`,
  },
  {
    name: 'PROGRESS.md', desc: '진행 상태·완료 목록',
    preview: `# PROGRESS.md\nPhase 1 완료\nPhase 2 완료\nPhase 3 완료`,
  },
  {
    name: 'DESIGN_WEB.md', desc: '웹 포트폴리오 계약',
    preview: `# DESIGN_WEB.md\n강릉페이 포트폴리오 웹사이트\n토큰: website/src/tokens/web.js\nJSX only · 인라인 스타일\nlocalStorage 금지\n색·간격·폰트 하드코딩 금지`,
  },
];

const AGENTS = [
  { id: 'BN', label: '검색·발견', desc: '상점 검색, 지도, 카테고리 필터', color: color.brand },
  { id: 'MY', label: 'MY·카드', desc: 'MY 탭, 카드 관리, 설정 플로우', color: color.brand },
  { id: 'FX', label: '버그·지도·내역', desc: '버그 수정, 지도 통합, 거래 내역', color: color.brand },
  { id: 'VR', label: '검증 — 44항목', desc: '빌드·토큰·접근성·로직 전수 검사', color: color.warn },
];

const MODELS = [
  {
    name: 'Sonnet',
    uses: ['단순 매핑', '컴포넌트 교체', '스타일 수정', '반복 작업'],
    note: '속도 우선 — 결과 예측 가능',
  },
  {
    name: 'Opus',
    uses: ['아키텍처 설계', '디버깅', '검증 에이전트', '트레이드오프 판단'],
    note: '정확도 우선 — 복잡한 의존성',
  },
];

const CHECKS = [
  { label: '빌드 오류', target: '0건' },
  { label: 'localStorage 사용', target: '0건' },
  { label: '하드코딩 색상', target: '0건' },
  { label: 'TypeScript 오류', target: '0건' },
  { label: '이모지 사용', target: '0건' },
  { label: '명시 외 수정', target: '0건' },
];

const METRICS = [
  { value: '199건', label: 'spacing 자동검증' },
  { value: '13,643 → 13,021', label: '불필요 코드 제거' },
  { value: '30분', label: 'Face ID 디버깅' },
];

const QUOTE =
  'AI는 How를 잘한다. 사람은 Why를 결정한다. 핵심 결정(시니어 우선·환불 동등위계·캐시백 직관메시지·13,000개 전부 등록)은 사람이 했다. AI는 그 의도를 정확히 구현하는 파트너였다.';

const CLAUDE_TOOLS = [
  { abbr: 'R',  name: 'Read',          desc: '파일 읽기' },
  { abbr: 'W',  name: 'Write',         desc: '파일 생성' },
  { abbr: 'E',  name: 'Edit',          desc: '정밀 편집' },
  { abbr: '>_', name: 'Bash',          desc: '터미널 실행' },
  { abbr: 'A',  name: 'Agent',         desc: '병렬 에이전트' },
  { abbr: 'WS', name: 'WebSearch',     desc: '웹 검색' },
  { abbr: 'WF', name: 'WebFetch',      desc: 'URL 불러오기' },
  { abbr: 'T',  name: 'TodoWrite',     desc: '작업 관리' },
  { abbr: 'SK', name: 'ScheduleWakeup',desc: '루프 제어' },
  { abbr: 'M',  name: 'Monitor',       desc: '프로세스 감시' },
  { abbr: 'TS', name: 'ToolSearch',    desc: '도구 스키마 조회' },
  { abbr: 'EP', name: 'ExitPlanMode',  desc: '계획 승인' },
];

export default function AiHarness() {
  const [openDoc, setOpenDoc] = useState(null);
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [metricsRef, metricsVisible] = useReveal({ threshold: 0.05 });
  const [blocksRef, blocksVisible] = useReveal({ threshold: 0.03 });
  const [toolsRef, toolsVisible] = useReveal({ threshold: 0.05 });
  const [quoteRef, quoteVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="ai-harness"
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
            marginBottom: 'clamp(48px,6vw,80px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px', fontFamily: font.family,
          }}>
            AI HARNESS
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px', fontFamily: font.family,
          }}>
            AI는 How를 잘한다.<br />사람은 Why를 결정한다.
          </h2>
        </div>

        {/* Metrics strip */}
        <div
          ref={metricsRef}
          style={{
            opacity: metricsVisible ? 1 : 0,
            transform: metricsVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(16px,2vw,32px)',
            marginBottom: 'clamp(64px,8vw,112px)',
            padding: 'clamp(24px,3vw,40px)',
            background: color.bg,
            borderRadius: layout.rMd,
          }}
        >
          {METRICS.map((m, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: 'clamp(16px,2vw,24px) 0',
                opacity: metricsVisible ? 1 : 0,
                transition: `opacity 0.5s ease-out ${i * 0.1}s`,
              }}
            >
              <div style={{
                fontSize: 'clamp(20px,2.4vw,32px)', fontWeight: 800,
                letterSpacing: '-0.03em', color: color.brand,
                fontFamily: font.family, marginBottom: 8,
              }}>
                {m.value}
              </div>
              <div style={{
                fontSize: t.caption.size, lineHeight: t.caption.lh,
                color: color.inkMuted, fontFamily: font.family,
              }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* 4 blocks 2x2 */}
        <div
          ref={blocksRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(20px,2.5vw,40px)',
            marginBottom: 'clamp(64px,8vw,112px)',
          }}
        >

          {/* Block 1 — 문서 기반 컨텍스트 주입 */}
          <div
            style={{
              opacity: blocksVisible ? 1 : 0,
              transform: blocksVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.65s ease-out 0s, transform 0.65s ease-out 0s',
              background: color.bg,
              borderRadius: layout.rMd,
              padding: 'clamp(24px,3vw,40px)',
            }}
          >
            <p style={{
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: color.brand, margin: '0 0 12px', fontFamily: font.family,
            }}>
              01
            </p>
            <h3 style={{
              fontSize: t.h3.size, fontWeight: t.h3.weight,
              lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
              color: color.ink, margin: '0 0 24px', fontFamily: font.family,
            }}>
              문서 기반 컨텍스트 주입
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {DOCS.map((doc) => {
                const isOpen = openDoc === doc.name;
                return (
                  <div key={doc.name}>
                    <button
                      onClick={() => setOpenDoc(isOpen ? null : doc.name)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        width: '100%', gap: 12, padding: '8px 12px',
                        background: color.white, borderRadius: isOpen ? `${layout.rSm} ${layout.rSm} 0 0` : layout.rSm,
                        border: 'none', cursor: 'pointer', textAlign: 'left',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                        <span style={{
                          fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                          color: color.brand, fontFamily: "'SFMono-Regular','Consolas','Monaco',monospace",
                          flexShrink: 0,
                        }}>
                          {doc.name}
                        </span>
                        <span style={{
                          fontSize: t.caption.size, lineHeight: t.caption.lh,
                          color: color.inkMuted, fontFamily: font.family,
                        }}>
                          {doc.desc}
                        </span>
                      </span>
                      <span style={{
                        fontSize: 16, fontWeight: 300, color: color.brand, flexShrink: 0,
                        transition: 'transform 0.25s ease-out',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        display: 'inline-block',
                      }}>
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <pre style={{
                        margin: 0, padding: '12px 14px',
                        background: '#1E1E1E',
                        borderRadius: `0 0 ${layout.rSm} ${layout.rSm}`,
                        fontSize: 11, lineHeight: 1.75,
                        color: '#D4D4D4',
                        fontFamily: "'SFMono-Regular','Consolas','Monaco',monospace",
                        overflowX: 'auto', whiteSpace: 'pre',
                      }}>
                        {doc.preview}
                      </pre>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Block 2 — 병렬 에이전트 */}
          <div
            style={{
              opacity: blocksVisible ? 1 : 0,
              transform: blocksVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.65s ease-out 0.1s, transform 0.65s ease-out 0.1s',
              background: color.bg,
              borderRadius: layout.rMd,
              padding: 'clamp(24px,3vw,40px)',
            }}
          >
            <p style={{
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: color.brand, margin: '0 0 12px', fontFamily: font.family,
            }}>
              02
            </p>
            <h3 style={{
              fontSize: t.h3.size, fontWeight: t.h3.weight,
              lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
              color: color.ink, margin: '0 0 24px', fontFamily: font.family,
            }}>
              병렬 에이전트
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* BN / MY / FX row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {AGENTS.slice(0, 3).map((ag) => (
                  <div
                    key={ag.id}
                    style={{
                      padding: '12px',
                      background: color.white,
                      borderRadius: layout.rSm,
                      boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{
                      fontSize: 16, fontWeight: 800,
                      color: ag.color, fontFamily: font.family, marginBottom: 4,
                    }}>
                      {ag.id}
                    </div>
                    <div style={{
                      fontSize: 13, fontWeight: 700,
                      color: color.ink, fontFamily: font.family, marginBottom: 4,
                    }}>
                      {ag.label}
                    </div>
                    <div style={{
                      fontSize: 13, lineHeight: 1.5,
                      color: color.inkMuted, fontFamily: font.family,
                    }}>
                      {ag.desc}
                    </div>
                  </div>
                ))}
              </div>
              {/* Arrow */}
              <div style={{
                textAlign: 'center',
                fontSize: 18, color: color.inkFaint,
              }}>
                ↓
              </div>
              {/* VR row */}
              <div
                style={{
                  padding: '14px 16px',
                  background: color.white,
                  borderRadius: layout.rSm,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span style={{
                  fontSize: 16, fontWeight: 800,
                  color: AGENTS[3].color, fontFamily: font.family,
                }}>
                  VR
                </span>
                <div>
                  <div style={{
                    fontSize: 13, fontWeight: 700,
                    color: color.ink, fontFamily: font.family, marginBottom: 2,
                  }}>
                    {AGENTS[3].label}
                  </div>
                  <div style={{
                    fontSize: 13, color: color.inkMuted, fontFamily: font.family,
                  }}>
                    {AGENTS[3].desc}
                  </div>
                </div>
              </div>
            </div>
            <p style={{
              margin: '16px 0 0',
              fontSize: t.caption.size, lineHeight: t.caption.lh,
              color: color.brand, fontFamily: font.family, fontWeight: 700,
            }}>
              1일치 작업을 반나절에
            </p>
          </div>

          {/* Block 3 — 모델 선택 기준 */}
          <div
            style={{
              opacity: blocksVisible ? 1 : 0,
              transform: blocksVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.65s ease-out 0.2s, transform 0.65s ease-out 0.2s',
              background: color.bg,
              borderRadius: layout.rMd,
              padding: 'clamp(24px,3vw,40px)',
            }}
          >
            <p style={{
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: color.brand, margin: '0 0 12px', fontFamily: font.family,
            }}>
              03
            </p>
            <h3 style={{
              fontSize: t.h3.size, fontWeight: t.h3.weight,
              lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
              color: color.ink, margin: '0 0 24px', fontFamily: font.family,
            }}>
              모델 선택 기준
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {MODELS.map((m) => (
                <div
                  key={m.name}
                  style={{
                    padding: '16px',
                    background: color.white,
                    borderRadius: layout.rSm,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{
                    fontSize: 15, fontWeight: 800,
                    color: color.brand, fontFamily: font.family, marginBottom: 12,
                  }}>
                    {m.name}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                    {m.uses.map((u) => (
                      <div
                        key={u}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                        }}
                      >
                        <div style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: color.brand, flexShrink: 0,
                        }} />
                        <span style={{
                          fontSize: 12, color: color.ink,
                          fontFamily: font.family, lineHeight: 1.5,
                        }}>
                          {u}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p style={{
                    fontSize: 13, color: color.inkMuted,
                    fontFamily: font.family, margin: 0,
                    paddingTop: 8,
                  }}>
                    {m.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Block 4 — 자기검증 의무 */}
          <div
            style={{
              opacity: blocksVisible ? 1 : 0,
              transform: blocksVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.65s ease-out 0.3s, transform 0.65s ease-out 0.3s',
              background: color.bg,
              borderRadius: layout.rMd,
              padding: 'clamp(24px,3vw,40px)',
            }}
          >
            <p style={{
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: color.brand, margin: '0 0 12px', fontFamily: font.family,
            }}>
              04
            </p>
            <h3 style={{
              fontSize: t.h3.size, fontWeight: t.h3.weight,
              lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
              color: color.ink, margin: '0 0 24px', fontFamily: font.family,
            }}>
              자기검증 의무
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CHECKS.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: color.white,
                    borderRadius: layout.rSm,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 18, height: 18,
                      borderRadius: '50%',
                      background: color.ok,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <div style={{
                        width: 8, height: 5,
                        borderLeft: `2px solid ${color.white}`,
                        borderBottom: `2px solid ${color.white}`,
                        transform: 'rotate(-45deg) translateY(-1px)',
                      }} />
                    </div>
                    <span style={{
                      fontSize: t.body.size, lineHeight: t.body.lh,
                      color: color.ink, fontFamily: font.family,
                    }}>
                      {c.label}
                    </span>
                  </div>
                  <span style={{
                    fontSize: 13, fontWeight: 800,
                    color: color.ok, fontFamily: font.family,
                    letterSpacing: '0.04em',
                  }}>
                    {c.target}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tool grid */}
        <div
          ref={toolsRef}
          style={{
            opacity: toolsVisible ? 1 : 0,
            transform: toolsVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(64px,8vw,112px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 20px', fontFamily: font.family,
          }}>
            CLAUDE CODE — 12개 툴
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 10,
          }}>
            {CLAUDE_TOOLS.map((tool, i) => (
              <div
                key={tool.name}
                style={{
                  background: color.bg,
                  borderRadius: layout.rSm,
                  padding: '14px 16px',
                  opacity: toolsVisible ? 1 : 0,
                  transition: `opacity 0.45s ease-out ${i * 0.04}s`,
                }}
              >
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 32, borderRadius: layout.rSm,
                  background: color.brand, marginBottom: 10,
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 800, color: color.white,
                    fontFamily: "'SFMono-Regular','Consolas','Monaco',monospace",
                    letterSpacing: '-0.02em',
                  }}>
                    {tool.abbr}
                  </span>
                </div>
                <p style={{
                  margin: '0 0 2px', fontSize: 13, fontWeight: 700,
                  color: color.ink, fontFamily: font.family,
                }}>
                  {tool.name}
                </p>
                <p style={{
                  margin: 0, fontSize: 11, lineHeight: 1.5,
                  color: color.inkMuted, fontFamily: font.family,
                }}>
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing quote */}
        <div
          ref={quoteRef}
          style={{
            opacity: quoteVisible ? 1 : 0,
            transform: quoteVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <p style={{
            fontSize: t.lead.size, lineHeight: t.lead.lh,
            color: color.ink, fontFamily: font.family,
            margin: 0, fontStyle: 'normal',
          }}>
            {QUOTE}
          </p>
        </div>

      </div>
    </section>
  );
}
