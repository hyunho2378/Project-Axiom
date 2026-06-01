import { useState, useEffect, useRef, Suspense } from 'react';
import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import EvolvingBlob, { EvolvingParticles, Starfield } from '../components/EvolvingBlob.jsx';

const STAGE_LABELS = [
  '휴면', '자각', '각성', '상승', '맥동',
  '격동', '변형', '유동', '복사', '조명', '완전한 발광',
];

const OBJECTS = [
  /* ── 시그니처 / 이펙트 ── */
  { file: 'axiom-crystal-v3.html', name: 'crystal',       label: 'CRYSTAL',       ko: '브랜드 크리스탈', desc: '수천 개의 데이터가 하나의 결정으로 피어나는 순간',    interaction: 'rotate' },
  { file: 'axiom-planet.html',    name: 'planet',       label: 'AXIOM PLANET',  ko: '진단 행성',      desc: '분석이 진행될수록 선명해지는 진단의 형상',                            interaction: 'step'   },
  { file: 'axiom-dna-helix.html',  name: 'dna-helix',     label: 'DNA HELIX',     ko: 'DNA 헬릭스',     desc: '데이터가 나선으로 정렬되며 분석이 시작되는 순간',      interaction: 'none'   },
  { file: 'axiom-aurora-v2.html',  name: 'aurora-v2',     label: 'AURORA RING',   ko: '오로라 링',      desc: '흐르는 빛의 고리, 살아있는 데이터의 맥동',            interaction: 'rotate' },
  { file: 'axiom-nebula.html',     name: 'nebula',        label: 'NEBULA',        ko: '파티클 성운',    desc: '수천 개의 신호가 모여 형태를 찾아가는 과정',           interaction: 'click'  },
  { file: 'axiom-ribbon.html',     name: 'ribbon',        label: 'SILK RIBBON',   ko: '실크 리본',      desc: '피부 위를 흐르는 부드러운 결의 시각화',                interaction: 'none'   },
  { file: 'axiom-stage.html',      name: 'stage',         label: 'PRODUCT STAGE', ko: '제품 스테이지',  desc: '큐레이션된 제품이 놓이는 빛의 무대',                  interaction: 'none'   },
  /* ── 제품 오브제 ── */
  { file: 'axiom-toner.html',      name: 'toner',         label: 'TONER',         ko: '토너',           desc: '피부 결을 정돈하며 다음 단계의 흡수를 여는 첫 번째 레이어', interaction: 'rotate' },
  { file: 'axiom-ampoule.html',    name: 'ampoule',       label: 'AMPOULE',       ko: '앰플',           desc: '피부 가장 깊은 곳까지 유효 성분을 전하는 고농축 에센스',  interaction: 'rotate' },
  { file: 'axiom-jar.html',        name: 'jar',           label: 'CREAM',         ko: '크림',           desc: '피부 장벽을 봉인해 수분을 오래 머무르게 하는 보습의 완성',  interaction: 'rotate' },
  { file: 'axiom-sunscreen.html',  name: 'sunscreen',     label: 'SUNSCREEN',     ko: '선크림',         desc: '자외선으로부터 피부를 지키는 루틴의 마지막 완성',               interaction: 'rotate' },
  { file: 'axiom-tube.html',       name: 'tube',          label: 'TUBE',          ko: '튜브',           desc: '피부 타입에 맞춰 집중 케어하는 다목적 포뮬러',     interaction: 'rotate' },
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

function BlobSection() {
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div
        ref={wrapRef}
        style={{
          width: '100%',
          height: IFRAME_H,
          background: '#05080a',
          borderRadius: layout.rMd,
          overflow: 'hidden',
          border: `1px solid ${colors.line}`,
          flexShrink: 0,
        }}
      >
        <Canvas
          frameloop={inView ? 'always' : 'demand'}
          camera={{ position: [0, 0, 8], fov: 45 }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} intensity={1} color="#00E0FF" />
          <Suspense fallback={null}>
            <Starfield />
            <EvolvingBlob step={step} />
            <EvolvingParticles step={step} />
            <Environment preset="city" />
          </Suspense>
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
          </EffectComposer>
        </Canvas>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          style={{
            padding: '7px 18px',
            background: 'transparent',
            border: `1px solid ${step === 0 ? colors.line : colors.brandDeep}`,
            borderRadius: layout.rSm,
            color: step === 0 ? colors.inkFaint : colors.brand,
            fontFamily: font.display,
            fontSize: t.caption.size,
            fontWeight: 700,
            letterSpacing: '0.1em',
            cursor: step === 0 ? 'default' : 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
            flexShrink: 0,
          }}
        >
          ← PREV
        </button>

        <div style={{ flex: 1, textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: t.caption.size, fontWeight: 700, color: colors.brand, fontFamily: font.display, letterSpacing: '0.12em' }}>
            STEP {step} / 10
          </p>
          <p style={{ margin: '2px 0 0', fontSize: t.caption.size, fontWeight: 500, color: colors.inkMuted }}>
            {STAGE_LABELS[step]}
          </p>
        </div>

        <button
          onClick={() => setStep(s => Math.min(10, s + 1))}
          disabled={step === 10}
          style={{
            padding: '7px 18px',
            background: 'transparent',
            border: `1px solid ${step === 10 ? colors.line : colors.brandDeep}`,
            borderRadius: layout.rSm,
            color: step === 10 ? colors.inkFaint : colors.brand,
            fontFamily: font.display,
            fontSize: t.caption.size,
            fontWeight: 700,
            letterSpacing: '0.1em',
            cursor: step === 10 ? 'default' : 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
            flexShrink: 0,
          }}
        >
          NEXT →
        </button>
      </div>
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
    <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
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
            maxWidth: '100%',
            maxHeight: 400,
            overflowY: 'auto',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            fontFamily: "'SFMono-Regular', 'Consolas', 'Monaco', monospace",
            fontSize: 'clamp(9px, 1.8vw, 11px)',
            lineHeight: 1.65,
            color: colors.inkMuted,
            whiteSpace: 'pre',
            wordBreak: 'normal',
            boxSizing: 'border-box',
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
      {/* LEFT: 3D */}
      {obj.interaction === 'step'
        ? <BlobSection />
        : <LazyIframe src={`/3d-ref/${obj.file}`} title={obj.label} />}

      {/* RIGHT: info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2vw,24px)', paddingTop: 'clamp(8px,1vw,16px)' }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: colors.brand, fontFamily: font.display }}>
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
          <p style={{ margin: 0, fontSize: t.sublabel.size, fontWeight: 700, color: colors.brandPale, letterSpacing: '0.12em' }}>
            마우스로 자유롭게 돌려보세요
          </p>
        )}
        {obj.interaction === 'click' && (
          <p style={{ margin: 0, fontSize: t.sublabel.size, fontWeight: 700, color: colors.brandPale, letterSpacing: '0.12em' }}>
            마우스로 중앙을 눌러보세요
          </p>
        )}
        {obj.interaction === 'step' && (
          <p style={{ margin: 0, fontSize: t.sublabel.size, fontWeight: 700, color: colors.brandPale, letterSpacing: '0.12em' }}>
            버튼으로 진단 단계를 따라가 보세요
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
      style={{ background: colors.bgCard, fontFamily: font.family, padding: `clamp(32px,4vw,60px) clamp(20px,5vw,80px)` }}
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
