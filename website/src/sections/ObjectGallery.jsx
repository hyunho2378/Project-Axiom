import { useState, useEffect, useRef } from 'react';
import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';

const OBJECTS = [
  /* ── 시그니처 / 이펙트 ── */
  { file: 'axiom-crystal-v3.html', name: 'crystal',       label: 'CRYSTAL',       ko: '브랜드 크리스탈', desc: '수천 개의 데이터가 하나의 결정으로 피어나는 순간.',    interaction: 'rotate' },
  { file: 'axiom-dna-helix.html',  name: 'dna-helix',     label: 'DNA HELIX',     ko: 'DNA 헬릭스',     desc: '데이터가 나선으로 정렬되며 분석이 시작되는 순간.',      interaction: 'none'   },
  { file: 'axiom-aurora-v2.html',  name: 'aurora-v2',     label: 'AURORA RING',   ko: '오로라 링',      desc: '흐르는 빛의 고리, 살아있는 데이터의 맥동.',            interaction: 'rotate' },
  { file: 'axiom-nebula.html',     name: 'nebula',        label: 'NEBULA',        ko: '파티클 성운',    desc: '수천 개의 신호가 모여 형태를 찾아가는 과정.',           interaction: 'click'  },
  { file: 'axiom-ribbon.html',     name: 'ribbon',        label: 'SILK RIBBON',   ko: '실크 리본',      desc: '피부 위를 흐르는 부드러운 결의 시각화.',                interaction: 'none'   },
  { file: 'axiom-stage.html',      name: 'stage',         label: 'PRODUCT STAGE', ko: '제품 스테이지',  desc: '큐레이션된 제품이 놓이는 빛의 무대.',                  interaction: 'none'   },
  /* ── 제품 오브제 ── */
  { file: 'axiom-toner.html',      name: 'toner',         label: 'TONER',         ko: '토너',           desc: '피부 결을 정돈하는 첫 번째 레이어. 수분 공급과 유효 성분 흡수력 강화.', interaction: 'rotate' },
  { file: 'axiom-ampoule.html',    name: 'ampoule',       label: 'AMPOULE',       ko: '앰플',           desc: '고농축 에센스. 피부 깊은 곳까지 유효 성분을 직접 전달.',  interaction: 'rotate' },
  { file: 'axiom-jar.html',        name: 'jar',           label: 'CREAM',         ko: '크림',           desc: '보습의 완성. 피부 장벽을 봉인하고 수분을 장시간 유지.',  interaction: 'rotate' },
  { file: 'axiom-sunscreen.html',  name: 'sunscreen',     label: 'SUNSCREEN',     ko: '선크림',         desc: 'UV 차단. 피부 보호 루틴의 마지막 단계.',               interaction: 'rotate' },
  { file: 'axiom-tube.html',       name: 'tube',          label: 'TUBE',          ko: '튜브',           desc: '다목적 포뮬러. 피부 타입에 따른 맞춤형 집중 케어.',     interaction: 'rotate' },
];

const IFRAME_H = 480;

function LazyIframe({ src, title }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setLoaded(true); },
      { rootMargin: '300px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: IFRAME_H,
        background: colors.bg,
        borderRadius: layout.rMd,
        overflow: 'hidden',
        border: `1px solid ${colors.line}`,
        flexShrink: 0,
      }}
    >
      {loaded ? (
        <iframe
          src={src}
          title={title}
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          loading="lazy"
        />
      ) : (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: colors.line, fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            LOADING
          </span>
        </div>
      )}
    </div>
  );
}

function CodeAccordion({ file }) {
  const [open, setOpen]       = useState(false);
  const [code, setCode]       = useState('');
  const [fetching, setFetching] = useState(false);

  const toggle = () => {
    const next = !open;
    if (next && !code) {
      setFetching(true);
      fetch(`/3d-ref/${file}`)
        .then(r => r.text())
        .then(text => { setCode(text); setFetching(false); })
        .catch(() => { setCode('// 파일을 불러올 수 없습니다.'); setFetching(false); });
    }
    setOpen(next);
  };

  return (
    <div>
      <button
        onClick={toggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: colors.bgDeep,
          border: `1px solid ${open ? colors.brandDeep : colors.line}`,
          borderRadius: open ? `${layout.rSm} ${layout.rSm} 0 0` : layout.rSm,
          cursor: 'pointer',
          fontFamily: font.family,
          color: open ? colors.brand : colors.inkMuted,
          fontSize: t.caption.size,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          transition: 'border-color 0.2s, color 0.2s',
        }}
      >
        <span>원본 코드 보기</span>
        <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block' }}>▾</span>
      </button>
      {open && (
        <pre
          style={{
            margin: 0,
            padding: 20,
            background: '#05080a',
            border: `1px solid ${colors.brandDeep}`,
            borderTop: 'none',
            borderRadius: `0 0 ${layout.rSm} ${layout.rSm}`,
            maxHeight: 400,
            overflowY: 'auto',
            overflowX: 'auto',
            fontFamily: "'SFMono-Regular', 'Consolas', 'Monaco', monospace",
            fontSize: 11,
            lineHeight: 1.65,
            color: colors.inkMuted,
            whiteSpace: 'pre',
          }}
        >
          <code>{fetching ? '// 로딩 중...' : code}</code>
        </pre>
      )}
    </div>
  );
}

function ObjectCard({ obj, isLast }) {
  const [ref, visible] = useReveal({ threshold: 0.05 });

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(24px,3vw,48px)',
        alignItems: 'start',
        paddingBottom: isLast ? 0 : 'clamp(48px,6vw,80px)',
        marginBottom: isLast ? 0 : 'clamp(48px,6vw,80px)',
        borderBottom: isLast ? 'none' : `1px solid ${colors.line}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
      className="obj-card"
    >
      {/* LEFT: 3D iframe */}
      <LazyIframe src={`/3d-ref/${obj.file}`} title={obj.label} />

      {/* RIGHT: info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2vw,24px)', paddingTop: 'clamp(8px,1vw,16px)' }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: colors.brand }}>
            {obj.label}
          </p>
          <p style={{ margin: '0 0 12px', fontSize: t.h3.size, fontWeight: t.h3.weight, color: colors.ink, letterSpacing: t.h3.ls, lineHeight: t.h3.lh }}>
            {obj.ko}
          </p>
          <p style={{ margin: 0, fontSize: t.lead.size, fontWeight: 400, color: colors.inkMuted, lineHeight: t.lead.lh }}>
            {obj.desc}
          </p>
        </div>

        {obj.interaction === 'rotate' && (
          <p style={{ margin: 0, fontSize: t.caption.size, color: colors.inkFaint, letterSpacing: '0.12em' }}>
            마우스로 자유롭게 돌려보세요
          </p>
        )}
        {obj.interaction === 'click' && (
          <p style={{ margin: 0, fontSize: t.caption.size, color: colors.inkFaint, letterSpacing: '0.12em' }}>
            마우스로 중앙을 눌러보세요
          </p>
        )}

        <CodeAccordion file={obj.file} />

        <a
          href={`/3d-ref/${obj.file}`}
          download={`axiom-${obj.name}.html`}
          style={{ textDecoration: 'none' }}
        >
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              background: 'transparent',
              border: `1px solid ${colors.brandDeep}`,
              borderRadius: layout.rSm,
              cursor: 'pointer',
              fontFamily: font.family,
              fontSize: t.caption.size,
              fontWeight: 700,
              color: colors.brand,
              letterSpacing: '0.08em',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = colors.brand; e.currentTarget.style.color = colors.brandStrong; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = colors.brandDeep; e.currentTarget.style.color = colors.brand; }}
          >
            ↓ HTML 다운로드
          </button>
        </a>
      </div>
    </div>
  );
}

export default function ObjectGallery() {
  return (
    <section
      id="object-gallery"
      style={{ background: colors.bgCard, fontFamily: font.family, padding: `clamp(32px,4vw,60px) clamp(20px,6vw,100px)` }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="3D OBJECT GALLERY"
          headline="제품 오브제 갤러리"
          sub="각 오브제를 마우스로 드래그해 360도 자유롭게 조작하세요"
          align="left"
        />

        {OBJECTS.map((obj, i) => (
          <ObjectCard key={obj.file} obj={obj} isLast={i === OBJECTS.length - 1} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .obj-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
