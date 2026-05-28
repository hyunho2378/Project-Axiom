import { useMemo, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useBottleDrag }    from './utils/useBottleDrag';
import { useLabelAssets }   from './utils/useLabelAssets';
import { getProductTint, toTexture } from './utils/makeLabelTexture';

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

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function makeLabel(product, w, h, logoImg, fontsReady) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');

  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0,   '#2E6A82');
  g.addColorStop(0.5, '#357292');
  g.addColorStop(1,   '#28637E');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.015})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
  }

  const KR = fontsReady ? 'PretendardVar,Noto Sans KR,sans-serif' : 'Noto Sans KR,sans-serif';
  const EN = 'Cormorant Garamond,Georgia,serif';
  ctx.textAlign = 'center';
  const FC = w / 4;      // 앞면 중심 (좌 절반 중앙)
  const BC = w * 3 / 4; // 뒷면 중심 (우 절반 중앙)

  // ── 앞면 ──
  const lw = Math.min(w * 0.09, 290);
  const lh = lw * (108 / 290);
  if (logoImg) {
    ctx.save();
    ctx.filter = 'brightness(0) invert(1)';
    ctx.drawImage(logoImg, FC - lw / 2, h * 0.058, lw, lh);
    ctx.restore();
  } else {
    ctx.fillStyle = '#FFF';
    ctx.font = `italic 300 ${Math.round(h * 0.053)}px ${EN}`;
    ctx.fillText('Axiom', FC, h * 0.125);
    ctx.fillStyle = '#8AAEC0';
    ctx.beginPath();
    ctx.arc(FC + 10, h * 0.093, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  const enFS = Math.round(h * 0.028);
  ctx.fillStyle = 'rgba(255,255,255,.88)';
  ctx.font = `italic 300 ${enFS}px ${EN}`;
  const enLines = product.nameEn.split('\n');
  const enY = h * 0.20;
  enLines.forEach((l, i) => ctx.fillText(l, FC, enY + i * enFS * 1.35));

  const lt = enY + enLines.length * enFS * 1.35 + h * 0.04;
  ctx.strokeStyle = 'rgba(255,255,255,.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(FC, lt);
  ctx.lineTo(FC, lt + h * 0.18);
  ctx.stroke();

  if (Array.isArray(product.ingredientsEn) && product.ingredientsEn.length) {
    ctx.fillStyle = 'rgba(255,255,255,.8)';
    ctx.font = `italic 300 ${Math.round(h * 0.019)}px ${EN}`;
    product.ingredientsEn.forEach((ing, i) =>
      ctx.fillText(ing, FC, lt + h * 0.22 + i * h * 0.028)
    );
  }

  // ── 뒷면 (BC 기준, 1번만) ──
  ctx.font = `300 ${Math.round(h * 0.022)}px ${KR}`;
  const descLines = typeof product.desc === 'string'
    ? wrapText(ctx, product.desc, w * 0.12)
    : product.desc;

  const lnH = h * 0.022;
  const dh  = descLines.length * lnH;
  const fh  = product.functional ? h * 0.030 : 0;
  const total =
    h * 0.036 + h * 0.028 + h * 0.026 + dh +
    h * 0.020 + h * 0.026 + fh + h * 0.028 +
    h * 0.026 + h * 0.020 + h * 0.020 + h * 0.062;
  let by = Math.round((h - total) / 2);

  ctx.fillStyle = '#FFF';
  ctx.font = `300 ${Math.round(h * 0.024)}px ${KR}`;
  ctx.fillText(product.nameKo, BC, by); by += h * 0.036;

  ctx.fillStyle = 'rgba(255,255,255,.65)';
  ctx.font = `300 italic ${Math.round(h * 0.017)}px ${EN}`;
  ctx.fillText(product.nameEn.replace(/\n/g, ' '), BC, by); by += h * 0.028;

  ctx.strokeStyle = 'rgba(255,255,255,.38)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(BC - w * 0.036, by);
  ctx.lineTo(BC + w * 0.036, by);
  ctx.stroke();
  by += h * 0.026;

  ctx.fillStyle = '#FFF';
  ctx.font = `300 ${Math.round(h * 0.017)}px ${KR}`;
  descLines.forEach(l => { ctx.fillText(l, BC, by); by += lnH; });
  by += h * 0.020;

  ctx.fillStyle = 'rgba(255,255,255,.72)';
  ctx.font = `300 ${Math.round(h * 0.015)}px ${KR}`;
  ctx.fillText(product.texture, BC, by); by += h * 0.026;

  if (product.functional) {
    ctx.fillStyle = 'rgba(255,255,255,.88)';
    ctx.font = `400 ${Math.round(h * 0.014)}px ${KR}`;
    ctx.fillText(product.functional, BC, by); by += h * 0.030;
  }

  ctx.fillStyle = '#FFF';
  ctx.font = `300 ${Math.round(h * 0.015)}px ${KR}`;
  ctx.fillText(product.ingredients, BC, by); by += h * 0.028;

  ctx.fillStyle = 'rgba(255,255,255,.72)';
  ctx.font = `300 ${Math.round(h * 0.014)}px ${KR}`;
  ctx.fillText(product.volume, BC, by); by += h * 0.026;

  ctx.fillStyle = 'rgba(255,255,255,.55)';
  ctx.font = `300 ${Math.round(h * 0.012)}px ${KR}`;
  ctx.fillText('제조판매업자 Axiom  www.axiom.co.kr', BC, by); by += h * 0.020;
  ctx.fillText('제조업자 (주) Axiom', BC, by); by += h * 0.020;
  ctx.fillText('MADE IN KOREA', BC, by); by += h * 0.062;

  if (logoImg) {
    const bw = w * 0.068;
    const bh = bw * (86 / 230);
    ctx.save();
    ctx.filter = 'brightness(0) invert(0.9)';
    ctx.drawImage(logoImg, BC - bw / 2, by, bw, bh);
    ctx.restore();
  }

  return c;
}

export default function AmpouleBottle({ product, isDraggable = false }) {
  const groupRef = useBottleDrag(isDraggable);
  const { logoImg, fontsReady } = useLabelAssets();
  const { gl } = useThree();

  const labelTex = useMemo(() => {
    const canvas = makeLabel(product, 3072, 1400, logoImg, fontsReady);
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
