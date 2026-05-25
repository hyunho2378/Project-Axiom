import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import axiomData from '../data/axiom.json';

const { aiProcess } = axiomData;

const ORBS = [
  { file: 'axiom-crystal-v3', label: 'CrystalOrb' },
  { file: 'axiom-dna-helix',  label: 'DNAHelix' },
  { file: 'axiom-aurora-v2',  label: 'AuroraRing' },
  { file: 'axiom-nebula',     label: 'ParticleNebula' },
  { file: 'axiom-ribbon',     label: 'SilkRibbon' },
  { file: 'axiom-toner',      label: 'TonerBottle' },
  { file: 'axiom-ampoule',    label: 'AmpouleBottle' },
  { file: 'axiom-tube',       label: 'TubeCream' },
  { file: 'axiom-sunscreen',  label: 'SunscreenTube' },
  { file: 'axiom-jar',        label: 'JarCream' },
  { file: 'axiom-stage',      label: 'ProductStage' },
];

function reliabilityBadge(rel) {
  if (!rel) return null;
  const isStrong = rel.startsWith('강함');
  const isWeak   = rel.startsWith('약함');
  const icon  = isStrong ? '✅' : '⚠️';
  const color = isStrong ? colors.ok : colors.warn;
  const short = rel.split(' — ')[0];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color, fontWeight: 600 }}>
      {icon} {short}
    </span>
  );
}

export default function AIProcess() {
  const [why3dRef,  why3dVisible]  = useReveal({ threshold: 0.1 });
  const [gallRef,   gallVisible]   = useReveal({ threshold: 0.05 });
  const [collabRef, collabVisible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="ai-process"
      style={{ background: colors.bg, fontFamily: font.family, padding: `clamp(64px,8vw,120px) clamp(20px,6vw,100px)` }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="09 AI PROCESS"
          headline="3D + Claude Code 협업 구조"
          sub="왜 3D인가 · 오브제 갤러리 · AI와 사람의 역할 분담"
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
                borderTop: `2px solid ${colors.brand}`,
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
              <p style={{ margin: 0, fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: colors.brand }}>
                {item.stat}
              </p>
              <p style={{ margin: 0, fontSize: t.body.size, fontWeight: 500, color: colors.ink, lineHeight: 1.4, flex: 1 }}>
                {item.desc}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: colors.inkFaint, lineHeight: 1.4 }}>
                {item.source}
              </p>
              {reliabilityBadge(item.reliability)}
            </div>
          ))}
        </div>

        {/* ── 3D 오브제 갤러리 ── */}
        <div
          ref={gallRef}
          style={{ marginBottom: 'clamp(56px,7vw,96px)' }}
        >
          <p style={{ margin: '0 0 clamp(16px,2vw,24px)', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkFaint }}>
            3D 오브제 갤러리
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'clamp(8px,1.5vw,14px)',
              opacity: gallVisible ? 1 : 0,
              transition: 'opacity 0.7s ease',
            }}
            className="gallery-grid"
          >
            {ORBS.map((orb, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div
                  style={{
                    background: colors.bgDeep,
                    borderRadius: 'clamp(6px,0.8vw,10px)',
                    overflow: 'hidden',
                    border: `1px solid ${colors.line}`,
                    height: 'clamp(120px,16vw,200px)',
                  }}
                >
                  <iframe
                    src={`/3d-ref/${orb.file}.html`}
                    title={orb.label}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      pointerEvents: 'none',
                      display: 'block',
                    }}
                  />
                </div>
                <p style={{ margin: 0, fontSize: 12, color: colors.inkMuted, textAlign: 'center', lineHeight: 1.4 }}>
                  {orb.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── AI 협업 역할 구분 ── */}
        <div
          ref={collabRef}
          style={{ marginBottom: aiProcess.pending?.length ? 'clamp(32px,4vw,48px)' : 0 }}
        >
          <p style={{ margin: '0 0 clamp(16px,2vw,24px)', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkFaint }}>
            역할 분담 — AI vs Human
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
                borderLeft: `3px solid ${colors.brand}`,
                borderRadius: `0 clamp(8px,1vw,12px) clamp(8px,1vw,12px) 0`,
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
                borderLeft: `3px solid ${colors.ok}`,
                borderRadius: `0 clamp(8px,1vw,12px) clamp(8px,1vw,12px) 0`,
                padding: 'clamp(20px,2.5vw,32px)',
                opacity: collabVisible ? 1 : 0,
                transform: collabVisible ? 'none' : 'translateX(16px)',
                transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
              }}
            >
              <p style={{ margin: '0 0 16px', fontSize: t.body.size, fontWeight: 700, color: colors.ok }}>
                사람이 판단한 것
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {aiProcess.collaboration.human.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.ok, marginTop: 7, flexShrink: 0 }} />
                    <span style={{ fontSize: t.body.size, color: colors.ink, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Pending 박스 ── */}
        {aiProcess.pending?.length > 0 && (
          <div
            style={{
              marginTop: 'clamp(24px,3vw,40px)',
              padding: 'clamp(16px,2vw,24px)',
              background: `rgba(255,136,102,0.08)`,
              border: `1px solid ${colors.warn}`,
              borderRadius: 'clamp(8px,1vw,12px)',
            }}
          >
            <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: colors.warn }}>
              ⚠️ 확보 예정
            </p>
            {aiProcess.pending.map((p, i) => (
              <p key={i} style={{ margin: i < aiProcess.pending.length - 1 ? '0 0 6px' : 0, fontSize: 13, color: colors.inkMuted, lineHeight: 1.5 }}>
                {p.priority}. {p.task} — <span style={{ color: colors.warn }}>{p.status}</span>
              </p>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why3d-grid    { grid-template-columns: 1fr !important; }
          .collab-grid   { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .gallery-grid  { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
