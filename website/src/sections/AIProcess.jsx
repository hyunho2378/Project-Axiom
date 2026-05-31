import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import axiomData from '../data/axiom.json';

const { aiProcess } = axiomData;


export default function AIProcess() {
  const [why3dRef, why3dVisible] = useReveal({ threshold: 0.1 });
  const [collabRef, collabVisible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="ai-process"
      style={{ background: colors.bg, fontFamily: font.family, padding: `clamp(32px,4vw,60px) clamp(20px,5vw,80px)` }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="09 AI PROCESS"
          headline="3D 프로그램 사용이 아닌 100% AI 디자인 과정"
          sub="3D 디자이너 없이도 AI로 100% 구현되는 그래픽"
          align="left"
        />

        {/* ── 왜 3D인가 ── */}
        <div
          ref={why3dRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(12px,2vw,20px)',
            marginBottom: 'clamp(56px,7vw,96px)',
          }}
          className="why3d-grid"
        >
          {aiProcess.why3D.map((item, i) => (
            <div
              key={i}
              style={{
                background: colors.bgCard,
                borderRadius: 'clamp(8px,1vw,14px)',
                padding: 'clamp(20px,2.5vw,32px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                opacity: why3dVisible ? 1 : 0,
                transform: why3dVisible ? 'none' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
              }}
            >
              <p style={{ margin: 0, fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: colors.brand, fontFamily: font.display }}>
                {item.stat}
              </p>
              <p style={{ margin: 0, fontSize: t.body.size, fontWeight: 500, color: colors.ink, lineHeight: 1.4, flex: 1 }}>
                {item.desc}
              </p>
              <p style={{ margin: '10px 0 0', fontSize: 'clamp(10px,0.76vw,11px)', fontWeight: 400, color: colors.inkMuted, lineHeight: 1.4 }}>
                출처: {item.source}
              </p>
            </div>
          ))}
        </div>

        {/* ── AI 협업 역할 구분 ── */}
        <div
          ref={collabRef}
          style={{ marginBottom: aiProcess.pending?.length ? 'clamp(32px,4vw,48px)' : 0 }}
        >
          <p style={{ margin: '0 0 clamp(16px,2vw,24px)', fontSize: t.sublabel.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
            역할 분담: AI vs Human
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(12px,2vw,20px)',
            }}
            className="collab-grid"
          >
            <div
              style={{
                background: colors.bgCard,
                borderRadius: 'clamp(8px,1vw,12px)',
                padding: 'clamp(20px,2.5vw,32px)',
                opacity: collabVisible ? 1 : 0,
                transform: collabVisible ? 'none' : 'translateX(-16px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              <p style={{ margin: '0 0 16px', fontSize: t.body.size, fontWeight: 700, color: colors.brand }}>
                AI가 한 것 (Claude Code)
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {aiProcess.collaboration.ai.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.brand, marginTop: 7, flexShrink: 0 }} />
                    <span style={{ fontSize: t.body.size, color: colors.ink, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: colors.bgCard,
                borderRadius: 'clamp(8px,1vw,12px)',
                padding: 'clamp(20px,2.5vw,32px)',
                opacity: collabVisible ? 1 : 0,
                transform: collabVisible ? 'none' : 'translateX(16px)',
                transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
              }}
            >
              <p style={{ margin: '0 0 16px', fontSize: t.body.size, fontWeight: 700, color: colors.brand }}>
                사람이 판단한 것
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {aiProcess.collaboration.human.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.brand, marginTop: 7, flexShrink: 0 }} />
                    <span style={{ fontSize: t.body.size, color: colors.ink, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .why3d-grid    { grid-template-columns: 1fr !important; }
          .collab-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
