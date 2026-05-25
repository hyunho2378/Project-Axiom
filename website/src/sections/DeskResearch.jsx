import { Fragment } from 'react';
import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';

const TABLE = {
  headers: ['항목', '강릉페이', '삼성페이', '토스', '카카오페이'],
  rows: [
    ['결제방식', '실물카드(+바코드)', 'MST/NFC 탭', '앱 바코드', '앱 바코드'],
    ['캐시백', '10% (강력)', '카드사별', '일부', '일부'],
    ['사용범위', '강릉시 한정', '전국', '전국', '전국'],
    ['UI완성도', '공공앱 수준', '네이티브 최적화', '핀테크 최고', '핀테크 최고'],
  ],
};

const TIMELINE = [
  { label: '카카오페이 도입', date: '3/23', accent: false },
  { label: '네이버페이', date: '4/13', accent: false },
  { label: '삼성페이 예정', date: '7~8월', accent: true },
];

const COL = '1.2fr 1.5fr 1fr 1fr 1fr';

export default function DeskResearch() {
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [tableRef, tableVisible] = useReveal({ threshold: 0.05 });
  const [tlRef, tlVisible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="research"
      style={{
        background: color.bg,
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
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          <p
            style={{
              fontSize: t.eyebrow.size,
              fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls,
              textTransform: t.eyebrow.transform,
              color: color.brand,
              margin: '0 0 24px',
            }}
          >
            Desk Research
          </p>
          <h2
            style={{
              fontSize: t.h1.size,
              fontWeight: t.h1.weight,
              lineHeight: t.h1.lh,
              letterSpacing: t.h1.ls,
              color: color.ink,
              margin: 0,
              maxWidth: '22ch',
            }}
          >
            10% 캐시백, 강력한 혜택. 그런데 왜 안 쓸까?
          </h2>
        </div>

        {/* Comparison table */}
        <div
          ref={tableRef}
          style={{
            opacity: tableVisible ? 1 : 0,
            transform: tableVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(48px,5vw,80px)',
          }}
        >
          <div
            style={{
              borderRadius: layout.rLg,
              border: `1px solid ${color.line}`,
              overflow: 'hidden',
            }}
          >
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: COL }}>
              {TABLE.headers.map((h, i) => (
                <div
                  key={h}
                  style={{
                    padding: '14px 20px',
                    background: i === 1 ? color.brand : color.bg,
                    color: i === 1 ? color.white : color.inkFaint,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0em',
                    textTransform: 'uppercase',
                    borderRight: i < TABLE.headers.length - 1 ? `1px solid ${color.line}` : 'none',
                    fontFamily: font.family,
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {TABLE.rows.map((row, ri) => (
              <div
                key={ri}
                style={{
                  display: 'grid',
                  gridTemplateColumns: COL,
                }}
              >
                {row.map((cell, ci) => (
                  <div
                    key={ci}
                    style={{
                      padding: '16px 20px',
                      background: ci === 1 ? color.brandPale : color.white,
                      color: ci === 0 ? color.inkMuted : ci === 1 ? color.brand : color.ink,
                      fontSize: ci === 0 ? 14 : 14,
                      fontWeight: ci === 0 ? 700 : ci === 1 ? 700 : 400,
                      letterSpacing: ci === 0 ? '0em' : '-0.01em',
                      textTransform: ci === 0 ? 'uppercase' : 'none',
                      borderRight: ci < row.length - 1 ? `1px solid ${color.line}` : 'none',
                      fontFamily: font.family,
                      lineHeight: 1.5,
                    }}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div
          ref={tlRef}
          style={{
            opacity: tlVisible ? 1 : 0,
            transform: tlVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {TIMELINE.map((item, i) => (
              <Fragment key={item.label}>
                {i > 0 && (
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background: color.line,
                      marginTop: 5,
                      minWidth: 32,
                    }}
                  />
                )}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: item.accent ? color.brand : color.inkFaint,
                      marginBottom: 10,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: item.accent ? 700 : 500,
                      color: item.accent ? color.brand : color.ink,
                      letterSpacing: '-0.01em',
                      marginBottom: 4,
                      textAlign: 'center',
                      fontFamily: font.family,
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: item.accent ? color.brandAlt : color.inkFaint,
                      letterSpacing: '0.02em',
                      fontFamily: font.family,
                    }}
                  >
                    {item.date}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
