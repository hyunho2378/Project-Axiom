import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import * as THREE from 'three';
import ProductStage    from './ProductStage';
import TonerBottle     from './TonerBottle';
import AmpouleBottle   from './AmpouleBottle';
import TubeCream       from './TubeCream';
import SunscreenTube   from './SunscreenTube';
import JarCream        from './JarCream';

const BOTTLE_MAP = {
  toner:     TonerBottle,
  ampoule:   AmpouleBottle,
  tube:      TubeCream,
  sunscreen: SunscreenTube,
  jar:       JarCream,
};

export default function ProductPreview({ product, size = 'small' }) {
  const trackRef = useRef();
  const [mounted, setMounted] = useState(false);
  const Bottle = BOTTLE_MAP[product?.productType];

  useEffect(() => {
    if (size === 'large') return;
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [size]);

  if (!Bottle) return null;

  // 상세 페이지(size=large) — Canvas 단독 사용 (카드 1개뿐이라 컨텍스트 한도 무관)
  if (size === 'large') {
    return (
      <div style={{ height: 500, width: '100%' }}>
        <Canvas
          camera={{ position: [0, 0.2, 8], fov: 34 }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
          gl={{
            alpha:               true,
            antialias:           true,
            toneMapping:         THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.5,
          }}
        >
          <Suspense fallback={null}>
            <ProductStage skinType={product?.skinType} />
            <Bottle product={product} isDraggable={true} />
          </Suspense>
        </Canvas>
      </div>
    );
  }

  // 그리드 카드(size=small) — SharedCanvas의 View 포털로 렌더링
  // IntersectionObserver: 화면 진입 전까지 View 마운트 안 함 (useFrame 비용 제거)
  return (
    <div ref={trackRef} style={{ width: '100%', height: '100%' }}>
      {mounted && (
        <View track={trackRef} style={{ width: '100%', height: '100%' }}>
          <Suspense fallback={null}>
            <ProductStage skinType={product?.skinType} />
            <Bottle product={product} isDraggable={false} />
          </Suspense>
        </View>
      )}
    </div>
  );
}
