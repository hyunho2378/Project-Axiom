import { useMemo, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useBottleDrag }    from './utils/useBottleDrag';
import { useLabelAssets }   from './utils/useLabelAssets';
import { makeLabelCanvas, makeTopLabelCanvas, getProductTint, toTexture } from './utils/makeLabelTexture';

// jar 프로필 (HTML 원본과 동일)
const PROFILE = [
  new THREE.Vector2(0.00, -0.72),
  new THREE.Vector2(0.90, -0.72),
  new THREE.Vector2(1.15, -0.66),
  new THREE.Vector2(1.28, -0.55),
  new THREE.Vector2(1.30, -0.42),
  new THREE.Vector2(1.30,  0.30),
  new THREE.Vector2(1.28,  0.42),
  new THREE.Vector2(1.20,  0.52),
  new THREE.Vector2(1.12,  0.57),
];

export default function JarCream({ product, isDraggable = false }) {
  const groupRef = useBottleDrag(isDraggable);
  const { logoImg, fontsReady } = useLabelAssets();
  const { gl } = useThree();

  // jar: 측면 라벨 (가로로 넓고 짧음)
  const sideTex = useMemo(() => {
    const canvas = makeLabelCanvas(product, 3072, 700, logoImg, fontsReady);
    return toTexture(canvas, gl);
  }, [product, logoImg, fontsReady, gl]);

  // jar: 뚜껑 상단 라벨
  const topTex = useMemo(() => {
    const canvas = makeTopLabelCanvas(logoImg);
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16;
    return tex;
  }, [logoImg]);

  useEffect(() => () => { sideTex?.dispose(); topTex?.dispose(); }, [sideTex, topTex]);

  const tint = getProductTint(product);

  const bottleMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:              new THREE.Color(tint),
    metalness:          0.08,
    roughness:          0.05,
    clearcoat:          1.0,
    clearcoatRoughness: 0.02,
    transmission:       0.45,
    thickness:          1.8,
    ior:                1.45,
    envMapIntensity:    2.0,
    transparent:        true,
    opacity:            0.92,
  }), [tint]);

  const capMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:              0xFFFFFF,
    metalness:          0.05,
    roughness:          0.10,
    clearcoat:          1.0,
    clearcoatRoughness: 0.04,
  }), []);

  return (
    <group ref={groupRef}>
      {/* 병 몸체 */}
      <mesh>
        <latheGeometry args={[PROFILE, 128]} />
        <primitive object={bottleMat} attach="material" />
      </mesh>

      {/* 측면 라벨 */}
      <mesh position-y={-0.10}>
        <cylinderGeometry args={[1.305, 1.305, 0.92, 96, 1, true]} />
        <meshPhysicalMaterial
          map={sideTex}
          metalness={0}
          roughness={0.65}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>

      {/* 뚜껑 */}
      <mesh position-y={0.76}>
        <cylinderGeometry args={[1.34, 1.30, 0.38, 96]} />
        <primitive object={capMat} attach="material" />
      </mesh>

      {/* 뚜껑 상단 (로고 라벨) */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.951}>
        <circleGeometry args={[1.33, 96]} />
        <meshPhysicalMaterial
          map={topTex}
          color={0xFFFFFF}
          metalness={0.05}
          roughness={0.10}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
          transparent
        />
      </mesh>

      {/* 뚜껑 홈 (장식 링) */}
      <mesh rotation-x={Math.PI / 2} position-y={0.58}>
        <torusGeometry args={[1.32, 0.012, 8, 96]} />
        <meshPhysicalMaterial color={0xEEEEEE} metalness={0.15} roughness={0.25} />
      </mesh>
    </group>
  );
}
