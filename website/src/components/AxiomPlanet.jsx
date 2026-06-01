import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { colors, layout } from '../tokens/web.js';

// ── STAGES — 원본 axiom-planet.html STAGES 배열 1:1 복사 ─────────────
const STAGES = [
  { label:'분석 시작 전', scale:0.80, distort:0.10, speed:0.5, color:'#082B35', emissive:'#000000', ei:0.00, metal:0.30, rough:0.80 },
  { label:'분석 시작',    scale:0.88, distort:0.12, speed:0.7, color:'#082B35', emissive:'#061520', ei:0.05, metal:0.35, rough:0.76 },
  { label:'성별 선택',    scale:0.96, distort:0.15, speed:0.9, color:'#0B3545', emissive:'#0B3545', ei:0.08, metal:0.40, rough:0.72 },
  { label:'나이대 선택',  scale:1.02, distort:0.18, speed:1.1, color:'#0B3545', emissive:'#1E5672', ei:0.10, metal:0.45, rough:0.68 },
  { label:'질문 1',       scale:1.08, distort:0.20, speed:1.3, color:'#1E5672', emissive:'#1E5672', ei:0.15, metal:0.50, rough:0.60 },
  { label:'질문 2',       scale:1.15, distort:0.22, speed:1.6, color:'#1E5672', emissive:'#3C7795', ei:0.20, metal:0.50, rough:0.55 },
  { label:'질문 3',       scale:1.22, distort:0.24, speed:1.9, color:'#2A6885', emissive:'#3C7795', ei:0.28, metal:0.60, rough:0.48 },
  { label:'질문 4',       scale:1.30, distort:0.26, speed:2.2, color:'#3C7795', emissive:'#3C7795', ei:0.36, metal:0.62, rough:0.42 },
  { label:'질문 5',       scale:1.38, distort:0.28, speed:2.6, color:'#3C7795', emissive:'#5A9AB5', ei:0.44, metal:0.65, rough:0.36 },
  { label:'질문 6',       scale:1.46, distort:0.28, speed:3.0, color:'#5A9AB5', emissive:'#8AAEC0', ei:0.54, metal:0.68, rough:0.30 },
  { label:'질문 7',       scale:1.54, distort:0.28, speed:3.4, color:'#5A9AB5', emissive:'#8AAEC0', ei:0.64, metal:0.72, rough:0.26 },
  { label:'질문 8',       scale:1.62, distort:0.28, speed:3.8, color:'#8AAEC0', emissive:'#8AAEC0', ei:0.76, metal:0.76, rough:0.22 },
  { label:'질문 9',       scale:1.72, distort:0.28, speed:4.2, color:'#A0D4E8', emissive:'#00D4FF', ei:1.10, metal:0.82, rough:0.18 },
  { label:'질문 10',      scale:1.84, distort:0.28, speed:4.6, color:'#C0F0FF', emissive:'#00D4FF', ei:1.60, metal:0.88, rough:0.14 },
  { label:'최종 결과',    scale:2.00, distort:0.28, speed:5.2, color:'#C0F0FF', emissive:'#00E0FF', ei:2.20, metal:0.92, rough:0.10 },
];

function makeGlowTex(inner, outer, size = 256) {
  const c2 = document.createElement('canvas');
  c2.width = c2.height = size;
  const ctx = c2.getContext('2d');
  const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  g.addColorStop(0,    inner);
  g.addColorStop(0.2,  inner.replace('1)', '0.5)'));
  g.addColorStop(0.55, outer.replace('1)', '0.2)'));
  g.addColorStop(1,    'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c2);
}

export default function AxiomPlanet({ step = 0, height = 480 }) {
  const containerRef = useRef(null);
  const stepRef = useRef(step);

  // step prop 변경 → ref 동기화 (애니메이션 루프가 읽음)
  useEffect(() => {
    stepRef.current = Math.max(0, Math.min(14, step));
  }, [step]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── RENDERER ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // ── SCENE + CAMERA ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5.5);
    camera.lookAt(0, 0, 0);

    // ── GLOW TEXTURES ─────────────────────────────────────────────────────
    const gTexCore  = makeGlowTex('rgba(192,240,255,1)', 'rgba(0,180,220,1)', 512);
    const gTexOuter = makeGlowTex('rgba(0,150,200,1)',   'rgba(8,43,70,1)',   512);

    function makeSprite(tex, size, opacity, color) {
      const m = new THREE.SpriteMaterial({
        map: tex,
        color: new THREE.Color(color),
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const s = new THREE.Sprite(m);
      s.scale.set(size, size, 1);
      return s;
    }

    // ── PLANET GROUP ──────────────────────────────────────────────────────
    const group = new THREE.Group();
    scene.add(group);

    // 구체 + distortion
    const geo = new THREE.SphereGeometry(1, 128, 128);
    const origPos = Float32Array.from(geo.attributes.position.array);

    const mat = new THREE.MeshPhysicalMaterial({
      color:              new THREE.Color('#082B35'),
      emissive:           new THREE.Color('#000000'),
      emissiveIntensity:  0.0,
      metalness:          0.30,
      roughness:          0.80,
      clearcoat:          0.8,
      clearcoatRoughness: 0.2,
    });
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);

    // 글로우 스프라이트 2장
    const glow1 = makeSprite(gTexCore,  2.0, 0.0, 0xC0F0FF);
    const glow2 = makeSprite(gTexOuter, 5.0, 0.0, 0x2A6885);
    group.add(glow1);
    group.add(glow2);

    // ── 별 (큰 별 300) ────────────────────────────────────────────────────
    const BIG_COUNT = 300;
    const bigGeo = new THREE.BufferGeometry();
    const bigPos = new Float32Array(BIG_COUNT * 3);
    for (let i = 0; i < BIG_COUNT; i++) {
      const r = 2.8 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      bigPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      bigPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      bigPos[i*3+2] = r * Math.cos(phi);
    }
    bigGeo.setAttribute('position', new THREE.BufferAttribute(bigPos, 3));
    const bigMat = new THREE.PointsMaterial({
      color: 0x00D4FF, size: 0.055,
      transparent: true, opacity: 0.0,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const bigStars = new THREE.Points(bigGeo, bigMat);
    group.add(bigStars);

    // ── 별 (작은 별 1200) ─────────────────────────────────────────────────
    const SMALL_COUNT = 1200;
    const smallGeo = new THREE.BufferGeometry();
    const smallPos = new Float32Array(SMALL_COUNT * 3);
    for (let i = 0; i < SMALL_COUNT; i++) {
      const r = 5.0 + Math.random() * 10.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      smallPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      smallPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      smallPos[i*3+2] = r * Math.cos(phi);
    }
    smallGeo.setAttribute('position', new THREE.BufferAttribute(smallPos, 3));
    const smallMat = new THREE.PointsMaterial({
      color: 0x5A9AB5, size: 0.022,
      transparent: true, opacity: 0.45,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const smallStars = new THREE.Points(smallGeo, smallMat);
    scene.add(smallStars);

    // ── 조명 ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x040C14, 1.2));
    const keyLight = new THREE.PointLight(0x8AAEC0, 8, 18, 1.8);
    keyLight.position.set(-3.5, 4.5, 3.5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x1E5672, 12, 15, 1.6);
    rimLight.position.set(2.5, -2, -5);
    scene.add(rimLight);
    const coreLight = new THREE.PointLight(0x00D4FF, 0, 6, 2.2);
    coreLight.position.set(0, 0, 0);
    group.add(coreLight);

    // ── LERP 상태 ─────────────────────────────────────────────────────────
    const cur = {
      scale: 0.8, ei: 0.0, distort: 0.1, speed: 0.5,
      metal: 0.3, rough: 0.8,
      gOp1: 0.0, gOp2: 0.0,
      bigOp: 0.0, coreInt: 0, keyInt: 8,
      floatAmp: 0.05,
      color:   new THREE.Color('#082B35'),
      emissive: new THREE.Color('#000000'),
    };

    // ── 드래그 회전 ───────────────────────────────────────────────────────
    let dragging = false, lx = 0, ly = 0, vx = 0, vy = 0;
    let autoRotY = 0, manualRotY = 0, manualRotX = 0;

    const cvs = renderer.domElement;
    const onMouseDown = e => { dragging = true; lx = e.clientX; ly = e.clientY; vx = 0; vy = 0; };
    const onMouseMove = e => {
      if (!dragging) return;
      vx = (e.clientX - lx) * 0.008; vy = (e.clientY - ly) * 0.006;
      manualRotY += vx * 1.5;
      manualRotX = Math.max(-1.0, Math.min(1.0, manualRotX + vy * 1.5));
      lx = e.clientX; ly = e.clientY;
    };
    const onMouseUp = () => { dragging = false; };
    const onTouchStart = e => { dragging = true; lx = e.touches[0].clientX; ly = e.touches[0].clientY; };
    const onTouchMove = e => {
      if (!dragging) return;
      vx = (e.touches[0].clientX - lx) * 0.008; vy = (e.touches[0].clientY - ly) * 0.006;
      manualRotY += vx * 1.5;
      manualRotX = Math.max(-1, Math.min(1, manualRotX + vy * 1.5));
      lx = e.touches[0].clientX; ly = e.touches[0].clientY;
    };
    cvs.addEventListener('mousedown',  onMouseDown);
    cvs.addEventListener('mousemove',  onMouseMove);
    cvs.addEventListener('mouseup',    onMouseUp);
    cvs.addEventListener('mouseleave', onMouseUp);
    cvs.addEventListener('touchstart', onTouchStart, { passive: true });
    cvs.addEventListener('touchmove',  onTouchMove,  { passive: true });
    cvs.addEventListener('touchend',   onMouseUp);

    // ── ANIMATE ───────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    const L = (a, b, t) => a + (b - a) * t;
    let animId;
    let isVisible = true;

    function animate() {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const tt = clock.getElapsedTime();
      const targetStep = stepRef.current;
      const tgt = STAGES[targetStep];
      const st = targetStep / 14;
      const sp = 0.045;

      // lerp 숫자
      cur.scale    = L(cur.scale,    tgt.scale,   sp);
      cur.ei       = L(cur.ei,       tgt.ei,      sp);
      cur.distort  = L(cur.distort,  tgt.distort, sp * 0.4);
      cur.speed    = L(cur.speed,    tgt.speed,   sp * 0.3);
      cur.metal    = L(cur.metal,    tgt.metal,   sp);
      cur.rough    = L(cur.rough,    tgt.rough,   sp);
      cur.gOp1     = L(cur.gOp1,     st * 0.85,   sp);
      cur.gOp2     = L(cur.gOp2,     st * 0.45,   sp);
      cur.bigOp    = L(cur.bigOp,    targetStep < 2 ? 0 : Math.min(0.90, (targetStep - 1) / 7), sp * 0.5);
      cur.coreInt  = L(cur.coreInt,  st * 25,     sp);
      cur.keyInt   = L(cur.keyInt,   8 + st * 22, sp);
      cur.floatAmp = L(cur.floatAmp, 0.05 + st * 0.15, sp);

      // 색상 lerp
      cur.color.lerp(new THREE.Color(tgt.color), sp);
      cur.emissive.lerp(new THREE.Color(tgt.emissive), sp);

      // 머티리얼
      mat.color.copy(cur.color);
      mat.emissive.copy(cur.emissive);
      mat.emissiveIntensity = cur.ei * (0.92 + Math.sin(tt * 0.9) * 0.08);
      mat.metalness = cur.metal;
      mat.roughness = cur.rough;

      // 표면 distortion (radial — 구형 실루엣 유지)
      const posArr = geo.attributes.position.array;
      const d   = cur.distort * 0.22;
      const sp2 = cur.speed;
      for (let i = 0; i < posArr.length; i += 3) {
        const ox = origPos[i], oy = origPos[i+1], oz = origPos[i+2];
        const noise =
          Math.sin(tt * sp2 * 0.4 + oy * 3.5 + oz * 2.8) * 0.5 +
          Math.sin(tt * sp2 * 0.3 + ox * 2.8 + oz * 3.5) * 0.3 +
          Math.sin(tt * sp2 * 0.5 + ox * 3.5 + oy * 2.5) * 0.2;
        const r = 1.0 + noise * d;
        posArr[i]   = ox * r;
        posArr[i+1] = oy * r;
        posArr[i+2] = oz * r;
      }
      geo.attributes.position.needsUpdate = true;
      geo.computeVertexNormals();

      // 회전
      if (!dragging) {
        autoRotY += 0.15 * (0.003 + st * 0.02);
        vx *= 0.92; vy *= 0.92;
        manualRotY += vx; manualRotX += vy;
      }
      group.rotation.y = autoRotY + manualRotY;
      group.rotation.x = Math.sin(tt * 0.3) * 0.08 + manualRotX;

      // 스케일 + float
      const breathe = 1 + Math.sin(tt * 0.7) * 0.008;
      group.scale.setScalar(cur.scale * breathe);
      group.position.y = Math.sin(tt * 0.55) * cur.floatAmp;

      // 글로우
      const gp = 0.92 + Math.sin(tt * 0.85) * 0.08;
      glow1.material.opacity = cur.gOp1 * gp;
      glow2.material.opacity = cur.gOp2;
      glow1.scale.setScalar(cur.scale * (2.2 + st * 0.8) * gp);
      glow2.scale.setScalar(cur.scale * (5.5 + st * 2.0));

      // 큰 별 (Step 2부터 등장)
      bigMat.opacity = cur.bigOp * (0.85 + Math.sin(tt * 0.4) * 0.15);
      bigMat.color.set(new THREE.Color(tgt.emissive === '#000000' ? '#5A9AB5' : tgt.emissive));
      bigStars.rotation.y = tt * 0.04;
      bigStars.rotation.x = Math.sin(tt * 0.2) * 0.08;

      // 작은 별 (항상 보임)
      smallStars.rotation.y = tt * 0.012;
      smallStars.rotation.x = Math.sin(tt * 0.008) * 0.12;

      // 조명
      keyLight.intensity = cur.keyInt * (1 + Math.sin(tt * 0.22) * 0.06);
      coreLight.intensity = cur.coreInt * (0.9 + Math.sin(tt * 0.85) * 0.12);
      rimLight.intensity = 12 + st * 18;
      keyLight.position.x = -3.5 + Math.sin(tt * 0.10) * 0.6;
      keyLight.position.z =  3.5 + Math.cos(tt * 0.10) * 0.6;

      renderer.render(scene, camera);
    }
    animate();

    // ── IntersectionObserver — 화면 밖이면 렌더 중단 ─────────────────────
    const intersectObs = new IntersectionObserver(
      ([e]) => { isVisible = e.isIntersecting; },
      { threshold: 0 }
    );
    intersectObs.observe(container);

    // ── ResizeObserver — 컨테이너 크기 추종 ──────────────────────────────
    const resizeObs = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObs.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      intersectObs.disconnect();
      resizeObs.disconnect();
      cvs.removeEventListener('mousedown',  onMouseDown);
      cvs.removeEventListener('mousemove',  onMouseMove);
      cvs.removeEventListener('mouseup',    onMouseUp);
      cvs.removeEventListener('mouseleave', onMouseUp);
      cvs.removeEventListener('touchstart', onTouchStart);
      cvs.removeEventListener('touchmove',  onTouchMove);
      cvs.removeEventListener('touchend',   onMouseUp);
      geo.dispose();
      mat.dispose();
      bigGeo.dispose();
      bigMat.dispose();
      smallGeo.dispose();
      smallMat.dispose();
      gTexCore.dispose();
      gTexOuter.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []); // mount once

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height,
        background: '#000000',
        borderRadius: layout.rMd,
        overflow: 'hidden',
        border: `1px solid ${colors.line}`,
        flexShrink: 0,
      }}
    />
  );
}
