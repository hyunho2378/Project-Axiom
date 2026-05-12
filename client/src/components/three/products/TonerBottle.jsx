import { useMemo, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useBottleDrag }    from './utils/useBottleDrag';
import { useLabelAssets }   from './utils/useLabelAssets';
import { makeLabelCanvas, getProductTint, toTexture } from './utils/makeLabelTexture';

// 프로필 — 넥 없는 라운드 실린더, 직각 어깨
const PROFILE = [
  new THREE.Vector2(0.00, -1.60),
  new THREE.Vector2(0.62, -1.60),
  new THREE.Vector2(0.82, -1.54),
  new THREE.Vector2(0.89, -1.42),
  new THREE.Vector2(0.89,  1.22),
  new THREE.Vector2(0.89,  1.27),
  new THREE.Vector2(0.46,  1.27),
  new THREE.Vector2(0.46,  1.42),
];

export default function TonerBottle({ product, isDraggable = false }) {
  const groupRef = useBottleDrag(isDraggable);
  const { logoImg, fontsReady } = useLabelAssets();
  const { gl } = useThree();

  const labelTex = useMemo(() => {
    const canvas = makeLabelCanvas(product, 3072, 1600, logoImg, fontsReady);
    return toTexture(canvas, gl);
  }, [product, logoImg, fontsReady, gl]);

  useEffect(() => () => labelTex?.dispose(), [labelTex]);

  const tint = getProductTint(product);

  const bottleMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:               new THREE.Color(tint),
    metalness:           0.08,
    roughness:           0.05,
    clearcoat:           1.0,
    clearcoatRoughness:  0.02,
    transmission:        0.45,
    thickness:           2.0,
    ior:                 1.45,
    envMapIntensity:     2.0,
    transparent:         true,
    opacity:             0.92,
  }), [tint]);

  const capMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:              0xFFFFFF,
    metalness:          0.05,
    roughness:          0.12,
    clearcoat:          1.0,
    clearcoatRoughness: 0.05,
  }), []);

  return (
    <group ref={groupRef}>
      {/* 병 몸체 */}
      <mesh>
        <latheGeometry args={[PROFILE, 128]} />
        <primitive object={bottleMat} attach="material" />
      </mesh>

      {/* 라벨 */}
      <mesh position-y={-0.40}>
        <cylinderGeometry args={[0.895, 0.895, 2.10, 96, 1, true]} />
        <meshPhysicalMaterial
          map={labelTex}
          metalness={0}
          roughness={0.65}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>

      {/* 캡 */}
      <mesh position-y={1.64}>
        <cylinderGeometry args={[0.52, 0.48, 0.46, 64]} />
        <primitive object={capMat} attach="material" />
      </mesh>

      {/* 캡 상단 디스크 */}
      <mesh rotation-x={-Math.PI / 2} position-y={1.87}>
        <circleGeometry args={[0.52, 64]} />
        <primitive object={capMat} attach="material" />
      </mesh>
    </group>
  );
}
