import { colors, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import DonutChart from '../components/DonutChart.jsx';
import BarChart from '../components/BarChart.jsx';
import QuoteCard from '../components/QuoteCard.jsx';
import researchData from '../data/userResearch.json';

const { survey, chartData, insights } = researchData;

function MetaBar({ visible }) {
  const items = [
    { label: '설문조사', value: `${survey.overview.n}명`, sub: survey.overview.period },
    { label: '인터뷰', value: `${survey.overview.interviewN ?? 12}명`, sub: '심층 인터뷰' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        gap: 'clamp(24px,4vw,48px)',
        marginBottom: 'clamp(24px,3vw,40px)',
        flexWrap: 'wrap',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p
            style={{
              margin: 0,
              fontSize: t.caption.size,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: colors.brand,
            }}
          >
            {item.label}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(20px,3vw,28px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: colors.ink,
            }}
          >
            {item.value}
          </p>
          <p style={{ margin: 0, fontSize: t.caption.size, color: colors.inkMuted }}>
            {item.sub}
          </p>
        </div>
      ))}
    </div>
  );
}

function StatCards({ cards, visible }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'clamp(12px,2vw,20px)',
        marginBottom: 'clamp(28px,3.5vw,44px)',
      }}
      className="research-stat-grid"
    >
      {cards.map((card, i) => (
        <div
          key={card.id}
          style={{
            background: colors.bgCard,
            borderRadius: 'clamp(8px,1vw,12px)',
            padding: 'clamp(20px,2.5vw,32px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
          }}
        >
          <p
            style={{
              margin: '0 0 8px',
              fontSize: 'clamp(36px,5vw,60px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: colors.brand,
            }}
          >
            {card.stat}
          </p>
          <p
            style={{
              margin: '0 0 6px',
              fontSize: t.body.size,
              fontWeight: 500,
              color: colors.ink,
              lineHeight: 1.4,
            }}
          >
            {card.label}
          </p>
          <p style={{ margin: 0, fontSize: t.caption.size, color: colors.inkMuted }}>
            {card.source}
          </p>
        </div>
      ))}
    </div>
  );
}

function InsightCard({ insight, index, visible }) {
  const qualArr = Array.isArray(insight.qualitative)
    ? insight.qualitative
    : [insight.qualitative];

  return (
    <div
      style={{
        background: colors.bgCard,
        borderRadius: 'clamp(10px,1.2vw,16px)',
        padding: 'clamp(16px,2vw,28px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
      }}
    >
      <div style={{ marginBottom: 'clamp(16px,2vw,24px)' }}>
        <p
          style={{
            margin: '0 0 6px',
            fontSize: t.caption.size,
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: colors.brand,
          }}
        >
          {insight.id.replace('_', ' ')}
        </p>
        <h3
          style={{
            margin: 0,
            fontSize: t.h3.size,
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: t.h3.ls,
            color: colors.ink,
          }}
        >
          {insight.title}
        </h3>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 'clamp(14px,2vw,20px)',
        }}
      >
        {insight.quantitative.map((q, i) => (
          <div
            key={i}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: 2,
              padding: '8px 14px',
              background: 'rgba(90,154,181,0.08)',
              border: `1px solid rgba(90,154,181,0.2)`,
              borderRadius: 8,
            }}
          >
            <span style={{ fontSize: 'clamp(16px,2vw,20px)', fontWeight: 800, color: colors.brand, letterSpacing: '-0.02em' }}>
              {q.stat}
            </span>
            <span style={{ fontSize: t.caption.size, color: colors.inkMuted, lineHeight: 1.3 }}>
              {q.desc}
            </span>
          </div>
        ))}
      </div>

      <p
        style={{
          margin: '0 0 clamp(14px,2vw,20px)',
          fontSize: t.body.size,
          lineHeight: t.body.lh,
          color: colors.inkMuted,
        }}
      >
        {insight.finding}
      </p>

      {qualArr.map((q, i) => (
        <QuoteCard key={i} quote={q.quote} speaker={q.speaker} delay={index * 120 + 200 + i * 80} />
      ))}

      <div
        style={{
          marginTop: 'clamp(14px,2vw,20px)',
          padding: 'clamp(12px,1.5vw,18px) clamp(14px,2vw,20px)',
          background: 'rgba(90,154,181,0.04)',
          borderRadius: 8,
        }}
      >
        <p style={{ margin: '0 0 4px', fontSize: t.caption.size, fontWeight: 700, letterSpacing: '0.08em', color: colors.brand }}>
          AXIOM RESPONSE
        </p>
        <p style={{ margin: 0, fontSize: t.body.size, lineHeight: t.body.lh, color: colors.inkMuted }}>
          {insight.axiomResponse}
        </p>
      </div>
    </div>
  );
}

export default function Research() {
  const [headerRef, headerVisible] = useReveal({ threshold: 0.1 });
  const [metaRef, metaVisible] = useReveal({ threshold: 0.15 });
  const [statsRef, statsVisible] = useReveal({ threshold: 0.1 });
  const [chartsRef, chartsVisible] = useReveal({ threshold: 0.1 });
  const [insightsRef, insightsVisible] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="research"
      style={{
        background: colors.bg,
        fontFamily: font.family,
        padding: `clamp(32px,4vw,60px) clamp(20px,6vw,100px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="04 RESEARCH"
            headline="사용자는 왜 진단 후 멈추는가"
            sub="설문 52명 + 인터뷰 12명을 통해 발견한 세 개의 인사이트"
            align="left"
          />
        </div>

        <div ref={metaRef}>
          <MetaBar visible={metaVisible} />
        </div>

        <div ref={statsRef}>
          <StatCards cards={chartData.countUpCards} visible={statsVisible} />
        </div>

        <div
          ref={chartsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(16px,3vw,40px)',
            marginBottom: 'clamp(28px,3.5vw,44px)',
            opacity: chartsVisible ? 1 : 0,
            transform: chartsVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
          className="charts-grid"
        >
          {chartData.donutCharts.map((d) => (
            <DonutChart
              key={d.id}
              title={d.title}
              subtitle={d.subtitle}
              segments={d.segments}
              source={d.source}
            />
          ))}
        </div>

        <div ref={insightsRef}>
          <p
            style={{
              margin: '0 0 clamp(20px,3vw,32px)',
              fontSize: t.caption.size,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colors.inkMuted,
            }}
          >
            핵심 인사이트
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(12px,1.5vw,18px)',
            }}
          >
            {insights.map((insight, i) => (
              <InsightCard key={insight.id} insight={insight} index={i} visible={insightsVisible} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .charts-grid {
            grid-template-columns: 1fr !important;
          }
          .research-stat-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
