import { useState, useEffect } from 'react';

// 폰트 + 로고 로드 상태 (컴포넌트별 독립 호출 가능 — 브라우저 캐시로 중복 비용 없음)
export function useLabelAssets() {
  const [logoImg,    setLogoImg]    = useState(null);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload  = () => setLogoImg(img);
    img.onerror = () => setLogoImg(null);
    img.src = '/images/Axiom_logo.svg';

    Promise.all([
      new FontFace(
        'PretendardVar',
        'url(https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.woff2) format("woff2")'
      ).load().catch(() => null),
      document.fonts.ready,
    ]).then(([pf]) => {
      if (pf) document.fonts.add(pf);
      setFontsReady(true);
    });
  }, []);

  return { logoImg, fontsReady };
}
