import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import iaSvg from '../assets/ia.svg';

export default function InformationArchitecture() {
  const [headRef, headVisible] = useReveal({ threshold: 0.1 });
  const [imgRef, imgVisible] = useReveal({ threshold: 0.03 });

  return (
    <section
      id="ia"
      style={{
        background: color.bg,
        fontFamily: font.family,
        padding: `${layout.sectionY} 0`,
      }}
    >
      {/* Scrollbar style — targets the scroll container by id */}
      <style>{`
        #ia-scroll::-webkit-scrollbar { height: 4px; }
        #ia-scroll::-webkit-scrollbar-track { background: ${color.brandPale}; }
        #ia-scroll::-webkit-scrollbar-thumb { background: ${color.brand}; border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div
        ref={headRef}
        style={{
          padding: `0 clamp(20px,5vw,80px)`,
          maxWidth: layout.container,
          margin: `0 auto clamp(40px,5vw,64px)`,
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        }}
      >
        <p style={{
          fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
          letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
          color: color.brand, margin: '0 0 24px',
        }}>
          INFORMATION ARCHITECTURE
        </p>
        <h2 style={{
          fontSize: t.h1.size, fontWeight: t.h1.weight,
          lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
          color: color.ink, margin: '0 0 16px',
        }}>
          정보를 다시 배열했습니다
        </h2>
        <p style={{
          fontSize: t.lead.size, fontWeight: 400,
          lineHeight: t.lead.lh, color: color.inkMuted,
          margin: 0,
        }}>
          햄버거 메뉴를 걷어내고 바텀 네비게이션 5개로 재편했습니다.
        </p>
      </div>

      {/* Horizontally scrollable SVG — original size preserved */}
      <div
        id="ia-scroll"
        ref={imgRef}
        style={{
          overflowX: 'auto',
          paddingLeft: 'clamp(20px,5vw,80px)',
          paddingRight: 'clamp(20px,5vw,80px)',
          paddingBottom: 8,
          scrollbarWidth: 'thin',
          scrollbarColor: `${color.brand} ${color.brandPale}`,
          opacity: imgVisible ? 1 : 0,
          transform: imgVisible ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        }}
      >
        <img
          src={iaSvg}
          alt="강릉페이 정보 구조도"
          style={{ width: 1764, height: 563, display: 'block' }}
        />
      </div>
    </section>
  );
}
