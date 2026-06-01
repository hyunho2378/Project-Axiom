import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';

const CLIENT_DATALAB = 'https://project-axiom-puce.vercel.app/datalab';

// 정적 예시 데이터 (실시간 아님)
const SNAPSHOT_DATA = [
  { label: '지성',   pct: 32, code: 'ST-OIL' },
  { label: '중성',   pct: 28, code: 'ST-NORM' },
  { label: '건성',   pct: 18, code: 'ST-DRY' },
  { label: '수부지', pct: 13, code: 'ST-COMB' },
  { label: '복합성', pct:  9, code: 'ST-MISC' },
];

const STACK_NODES = [
  {
    tier: 'Frontend',
    stack: 'Vercel · React',
    desc: '진단 설문 화면을 보여주고, 결과를 실시간으로 시각화합니다',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    tier: 'Backend',
    stack: 'Render · Express · Prisma',
    desc: '응답을 집계해 피부타입 분포를 계산하고 전달합니다',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
        <circle cx="6" cy="18" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    tier: 'Database',
    stack: 'NeonDB · Postgres',
    desc: '설문 응답을 영구 저장하고, 집계 쿼리를 처리합니다',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 5v14c0 1.66-4.03 3-9 3S3 20.66 3 19V5" />
        <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
      </svg>
    ),
  },
];

function ArchFlow({ visible }) {
  const FLOW = ['사용자 진단', 'Vercel', 'Render API', 'NeonDB', '시각화'];

  return (
    <div
      style={{
        marginBottom: 'clamp(48px,6vw,80px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {/* 흐름 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          overflowX: 'auto',
          paddingBottom: 12,
          marginBottom: 'clamp(32px,4vw,52px)',
        }}
        className="flow-arch"
      >
        {FLOW.map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <div
              style={{
                padding: 'clamp(10px,1.2vw,14px) clamp(14px,1.8vw,22px)',
                background: i === 0
                  ? 'rgba(90,154,181,0.12)'
                  : i === FLOW.length - 1
                    ? 'rgba(90,154,181,0.16)'
                    : colors.bgDeep,
                border: `1px solid ${i === 0 || i === FLOW.length - 1 ? colors.brand : colors.line}`,
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
                  color: i === 0 || i === FLOW.length - 1 ? colors.brand : colors.inkMuted,
                  fontFamily: font.family,
                  letterSpacing: '0.02em',
                  lineHeight: 1.3,
                }}
              >
                {label}
              </p>
            </div>
            {i < FLOW.length - 1 && (
              <svg width="28" height="12" viewBox="0 0 28 12" fill="none" style={{ flexShrink: 0, marginLeft: -1 }}>
                <path d="M0 6h22M18 1l6 5-6 5" stroke={colors.brand} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* 스택 카드 3개 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(10px,1.5vw,18px)',
        }}
        className="stack-grid"
      >
        {STACK_NODES.map((node, i) => (
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
            <p style={{ margin: '0 0 4px', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkFaint }}>
              {node.tier}
            </p>
            <p style={{ margin: '0 0 10px', fontSize: 'clamp(14px,1.6vw,18px)', fontWeight: 700, color: colors.ink, fontFamily: font.family, letterSpacing: '0.01em' }}>
              {node.stack}
            </p>
            <p style={{ margin: 0, fontSize: t.body.size, fontWeight: 400, color: colors.inkMuted, lineHeight: 1.5 }}>
              {node.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StaticSnapshot({ visible }) {
  const maxPct = Math.max(...SNAPSHOT_DATA.map(d => d.pct));

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
          display: 'flex',
          alignItems: 'flex-end',
          gap: 4,
          marginBottom: 'clamp(16px,2vw,24px)',
        }}
      >
        <p style={{ margin: 0, fontSize: t.sublabel.size, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.inkMuted }}>
          피부타입 분포
        </p>
        <span
          style={{
            marginLeft: 10,
            padding: '3px 10px',
            border: `1px solid ${colors.line}`,
            borderRadius: 9999,
            fontSize: t.caption.size,
            fontWeight: 600,
            color: colors.inkFaint,
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
          }}
        >
          예시 데이터
        </span>
      </div>

      <div
        style={{
          background: colors.bgDeep,
          border: `1px solid ${colors.line}`,
          borderRadius: 'clamp(10px,1.2vw,16px)',
          padding: 'clamp(20px,2.5vw,36px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {SNAPSHOT_DATA.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px,1.5vw,16px)' }}>
              <div style={{ width: 'clamp(52px,6vw,72px)', flexShrink: 0, textAlign: 'right' }}>
                <span style={{ fontSize: t.body.size, fontWeight: 600, color: colors.ink }}>{d.label}</span>
              </div>
              <div style={{ flex: 1, height: 'clamp(22px,2.5vw,30px)', background: 'rgba(90,154,181,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${(d.pct / maxPct) * 100}%`,
                    background: `linear-gradient(90deg, ${colors.brandStrong}, ${colors.brand})`,
                    borderRadius: 4,
                    transition: 'width 0.8s ease',
                  }}
                />
              </div>
              <div style={{ width: 'clamp(40px,4vw,52px)', flexShrink: 0 }}>
                <span style={{ fontSize: t.body.size, fontWeight: 700, color: colors.brand, fontFamily: font.family }}>{d.pct}%</span>
              </div>
            </div>
          ))}
        </div>

        <p style={{ margin: 'clamp(16px,2vw,24px) 0 0', fontSize: t.caption.size, fontWeight: 500, color: colors.inkFaint, lineHeight: 1.5 }}>
          위 데이터는 예시입니다. 실시간 집계와 최신 분포는 아래 라이브 페이지에서 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

function LiveCTA({ visible }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(12px,1.5vw,18px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
      }}
    >
      <p style={{ margin: 0, fontSize: t.body.size, fontWeight: 500, color: colors.inkMuted, textAlign: 'center', lineHeight: 1.6 }}>
        실시간 피부 진단 데이터는 라이브 페이지에서
      </p>
      <a
        href={CLIENT_DATALAB}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-glow"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: 'clamp(16px,2vw,20px) clamp(40px,5vw,64px)',
          borderRadius: 12,
          fontSize: 'clamp(14px,1.4vw,17px)',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: font.family,
          color: colors.ink,
          textDecoration: 'none',
        }}
      >
        DATA LAB 라이브로 보기 →
      </a>
    </div>
  );
}

export default function LivingData() {
  const [archRef,  archVisible]  = useReveal({ threshold: 0.08 });
  const [snapRef,  snapVisible]  = useReveal({ threshold: 0.08 });
  const [ctaRef,   ctaVisible]   = useReveal({ threshold: 0.15 });

  return (
    <section
      id="living-data"
      style={{ background: colors.bg, fontFamily: font.family, padding: `clamp(32px,4vw,60px) clamp(20px,5vw,80px)` }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="LIVING DATA"
          headline="데이터가 쌓일수록 서비스가 나아집니다"
          sub="사용자가 진단을 마치면 응답이 데이터베이스에 쌓이고, 이 데이터를 집계해 서비스를 개선합니다"
          align="left"
        />

        <div ref={archRef}>
          <ArchFlow visible={archVisible} />
        </div>

        <div ref={snapRef}>
          <StaticSnapshot visible={snapVisible} />
        </div>

        <div ref={ctaRef}>
          <LiveCTA visible={ctaVisible} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stack-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .flow-arch { gap: 0 !important; }
        }
      `}</style>
    </section>
  );
}
