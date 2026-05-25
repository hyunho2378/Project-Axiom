import { useMemo, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useBottleDrag }    from './utils/useBottleDrag';
import { useLabelAssets }   from './utils/useLabelAssets';
import { makeFrontLabelCanvas, makeBackLabelCanvas, getProductTint, toTexture } from './utils/makeLabelTexture';

// 치수 (HTML 원본과 동일)
const TOP_R  = 0.68;
const BOT_R  = 0.44;
const BODY_H = 3.0;
const CAP_H  = 0.52;
const C45    = Math.cos(Math.PI / 4);
const TW = TOP_R * C45;
const TZ = TOP_R * C45;
const BW = BOT_R * C45;
const BZ = BOT_R * C45;

function makeTrapezoidGeo(tw, bw, h, tz, bz, off, segs = 32) {
  const pos = [], uvArr = [], idx = [];
  for (let i = 0; i <= segs; i++) {
    const t  = i / segs;
    const y  = h / 2 - t * h;
    const hw = tw + (bw - tw) * t;
    const z  = tz + (bz - tz) * t + off;
    pos.push(-hw, y, z); uvArr.push(0, 1 - t);
    pos.push( hw, y, z); uvArr.push(1, 1 - t);
  }
  for (let i = 0; i < segs; i++) {
    const r = i * 2, n = (i + 1) * 2;
    idx.push(r, n, r + 1); idx.push(r + 1, n, n + 1);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos),   3));
  geo.setAttribute('uv',       new THREE.BufferAttribute(new Float32Array(uvArr), 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

function makeBackTrapezoidGeo(tw, bw, h, tz, bz, off, segs = 32) {
  const pos = [], uvArr = [], idx = [];
  for (let i = 0; i <= segs; i++) {
    const t  = i / segs;
    const y  = h / 2 - t * h;
    const hw = tw + (bw - tw) * t;
    const z  = -(tz + (bz - tz) * t) - off;
    pos.push( hw, y, z); uvArr.push(0, 1 - t);
    pos.push(-hw, y, z); uvArr.push(1, 1 - t);
  }
  for (let i = 0; i < segs; i++) {
    const r = i * 2, n = (i + 1) * 2;
    idx.push(r, n, r + 1); idx.push(r + 1, n, n + 1);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos),   3));
  geo.setAttribute('uv',       new THREE.BufferAttribute(new Float32Array(uvArr), 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

export default function TubeCream({ product, isDraggable = false }) {
  const groupRef = useBottleDrag(isDraggable);
  const { logoImg, fontsReady } = useLabelAssets();
  const { gl } = useThree();

  const frontLabelTex = useMemo(() => {
    const canvas = makeFrontLabelCanvas(product, 1024, 1800, logoImg, fontsReady);
    return toTexture(canvas, gl);
  }, [product, logoImg, fontsReady, gl]);

  const backLabelTex = useMemo(() => {
    const canvas = makeBackLabelCanvas(product, 1024, 1800, logoImg, fontsReady);
    return toTexture(canvas, gl);
  }, [product, logoImg, fontsReady, gl]);

  useEffect(() => () => frontLabelTex?.dispose(), [frontLabelTex]);
  useEffect(() => () => backLabelTex?.dispose(),  [backLabelTex]);

  const frontGeo = useMemo(() => makeTrapezoidGeo(TW, BW, BODY_H, TZ, BZ, 0.008), []);
  const backGeo  = useMemo(() => makeBackTrapezoidGeo(TW, BW, BODY_H, TZ, BZ, 0.008), []);
  useEffect(() => () => frontGeo.dispose(), [frontGeo]);
  useEffect(() => () => backGeo.dispose(),  [backGeo]);

  const tint = getProductTint(product);

  const bodyMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:              new THREE.Color(tint),
    metalness:          0.06,
    roughness:          0.35,
    clearcoat:          0.65,
    clearcoatRoughness: 0.15,
    envMapIntensity:    1.2,
  }), [tint]);

  const capMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:              0xFFFFFF,
    metalness:          0.05,
    roughness:          0.12,
    clearcoat:          1.0,
    clearcoatRoughness: 0.04,
  }), []);

  const capBotSize = BOT_R * Math.sqrt(2);

  return (
    <group ref={groupRef}>
      {/* 4각 프리즘 몸통 (rotation.y = PI/4) */}
      <mesh rotation-y={Math.PI / 4}>
        <cylinderGeometry args={[TOP_R, BOT_R, BODY_H, 4, 1, false]} />
        <primitive object={bodyMat} attach="material" />
      </mesh>

      {/* 앞면 라벨 */}
      <mesh>
        <primitive object={frontGeo} attach="geometry" />
        <meshPhysicalMaterial
          map={frontLabelTex}
          metalness={0}
          roughness={0.65}
          side={THREE.FrontSide}
          transparent
        />
      </mesh>

      {/* 뒷면 라벨 */}
      <mesh>
        <primitive object={backGeo} attach="geometry" />
        <meshPhysicalMaterial
          map={backLabelTex}
          metalness={0}
          roughness={0.65}
          side={THREE.FrontSide}
          transparent
        />
      </mesh>

      {/* 캡 */}
      <mesh rotation-y={Math.PI / 4} position-y={-(BODY_H / 2 + CAP_H / 2)}>
        <cylinderGeometry args={[BOT_R, BOT_R, CAP_H, 4, 1, false]} />
        <primitive object={capMat} attach="material" />
      </mesh>

      {/* 캡 하단 마감 */}
      <mesh
        rotation-x={Math.PI / 2}
        rotation-z={Math.PI / 4}
        position-y={-(BODY_H / 2 + CAP_H)}
      >
        <planeGeometry args={[capBotSize, capBotSize]} />
        <primitive object={capMat} attach="material" />
      </mesh>
    </group>
  );
}
