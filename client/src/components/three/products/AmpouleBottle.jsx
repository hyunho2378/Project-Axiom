import { useMemo, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useBottleDrag }    from './utils/useBottleDrag';
import { useLabelAssets }   from './utils/useLabelAssets';
import { makeLabelCanvas, getProductTint, toTexture } from './utils/makeLabelTexture';

// 프로필 — 넓은 몸통 → 직각 어깨 → 가는 목
const PROFILE = [
  new THREE.Vector2(0.00, -1.12),
  new THREE.Vector2(0.45, -1.12),
  new THREE.Vector2(0.68, -1.06),
  new THREE.Vector2(0.78, -0.95),
  new THREE.Vector2(0.78,  1.00),
  new THREE.Vector2(0.78,  1.07),
  new THREE.Vector2(0.26,  1.07),
  new THREE.Vector2(0.26,  1.40),
];

export default function AmpouleBottle({ product, isDraggable = false }) {
  const groupRef = useBottleDrag(isDraggable);
  const { logoImg, fontsReady } = useLabelAssets();
  const { gl } = useThree();

  const labelTex = useMemo(() => {
    const canvas = makeLabelCanvas(product, 3072, 1400, logoImg, fontsReady);
    return toTexture(canvas, gl);
  }, [product, logoImg, fontsReady, gl]);

  useEffect(() => () => labelTex?.dispose(), [labelTex]);

  const tint = getProductTint(product);

  const bottleMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:              new THREE.Color(tint),
    metalness:          0.08,
    roughness:          0.05,
    clearcoat:          1.0,
    clearcoatRoughness: 0.02,
    transmission:       0.48,
    thickness:          1.8,
    ior:                1.45,
    envMapIntensity:    2.0,
    transparent:        true,
    opacity:            0.92,
  }), [tint]);

  const capMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:              0xFFFFFF,
    metalness:          0.06,
    roughness:          0.12,
    clearcoat:          1.0,
    clearcoatRoughness: 0.04,
  }), []);

  const bulbMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:              0xFFFFFF,
    metalness:          0.02,
    roughness:          0.20,
    clearcoat:          0.9,
    clearcoatRoughness: 0.08,
  }), []);

  return (
    <group ref={groupRef}>
      {/* 병 몸체 */}
      <mesh>
        <latheGeometry args={[PROFILE, 128]} />
        <primitive object={bottleMat} attach="material" />
      </mesh>

      {/* 라벨 */}
      <mesh position-y={-0.02}>
        <cylinderGeometry args={[0.785, 0.785, 1.50, 96, 1, true]} />
        <meshPhysicalMaterial
          map={labelTex}
          metalness={0}
          roughness={0.65}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>

      {/* 목 흰색 칼라 링 */}
      <mesh position-y={1.50}>
        <cylinderGeometry args={[0.34, 0.30, 0.20, 48]} />
        <primitive object={capMat} attach="material" />
      </mesh>

      {/* 고무 압축부 (bulb) */}
      <mesh position-y={1.80}>
        <sphereGeometry args={[0.32, 48, 32]} />
        <primitive object={bulbMat} attach="material" />
      </mesh>

      {/* 안쪽 스포이드 */}
      <mesh position-y={0.48}>
        <cylinderGeometry args={[0.036, 0.026, 0.90, 16]} />
        <meshPhysicalMaterial
          color={0x88BBCC}
          metalness={0.1}
          roughness={0.05}
          transparent
          opacity={0.28}
        />
      </mesh>
    </group>
  );
}
