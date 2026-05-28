import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const DUST_COUNT = 250;

const VERT = `
  varying vec3 vW;
  void main(){
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vW = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;
const FRAG = `
  uniform vec3 topColor, midColor, bottomColor;
  varying vec3 vW;
  void main(){
    float h = normalize(vW).y;
    vec3 col;
    if (h > 0.0) col = mix(midColor, topColor, smoothstep(0.0, 0.7, h));
    else         col = mix(midColor, bottomColor, smoothstep(0.0, 0.7, -h));
    gl_FragColor = vec4(col, 1.0);
  }
`;

const LIGHT_PRESETS = {
  '건성': {
    key: '#D8EEFF',
    rim: '#00D4FF',
    fill: '#2A6885',
    accent: '#4488CC',
    ambientIntensity: 1.0,
    keyIntensity: 48,
  },
  '중성': {
    key: '#E8E0D8',
    rim: '#88CCAA',
    fill: '#3A7868',
    accent: '#66AA88',
    ambientIntensity: 1.1,
    keyIntensity: 45,
  },
  '지성': {
    key: '#E0E8FF',
    rim: '#6688FF',
    fill: '#334488',
    accent: '#5566CC',
    ambientIntensity: 0.9,
    keyIntensity: 50,
  },
  '수부지': {
    key: '#E8E0D0',
    rim: '#88AABB',
    fill: '#446680',
    accent: '#5A9AB5',
    ambientIntensity: 1.0,
    keyIntensity: 44,
  },
  '복합성': {
    key: '#E0F0E8',
    rim: '#44CCBB',
    fill: '#2A6858',
    accent: '#55AA88',
    ambientIntensity: 1.0,
    keyIntensity: 46,
  },
};

export default function ProductStage({ skinType }) {
  const preset = LIGHT_PRESETS[skinType] || LIGHT_PRESETS['건성'];
  const dustRef    = useRef();
  const keyRef     = useRef();
  const { scene }  = useThree();

  const [spotTarget] = useState(() => new THREE.Object3D());
  useEffect(() => {
    scene.add(spotTarget);
    return () => scene.remove(spotTarget);
  }, [scene, spotTarget]);

  const bgMat = useMemo(() => new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: {
      topColor:    { value: new THREE.Color('#0B2838') },
      midColor:    { value: new THREE.Color('#040A12') },
      bottomColor: { value: new THREE.Color('#06121A') },
    },
    vertexShader:   VERT,
    fragmentShader: FRAG,
  }), []);

  const floorMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:             0x040A12,
    metalness:         0.9,
    roughness:         0.25,
    envMapIntensity:   1.2,
  }), []);

  const glowTex = useMemo(() => {
    const cv = document.createElement('canvas');
    cv.width = cv.height = 512;
    const ctx = cv.getContext('2d');
    const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grad.addColorStop(0,   'rgba(138,174,192,0.55)');
    grad.addColorStop(0.5, 'rgba(42,104,133,0.15)');
    grad.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
    return new THREE.CanvasTexture(cv);
  }, []);

  const { dustGeo, dustVel } = useMemo(() => {
    const pos = new Float32Array(DUST_COUNT * 3);
    const vel = new Float32Array(DUST_COUNT);
    for (let i = 0; i < DUST_COUNT; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 14;
      pos[i*3+1] = (Math.random() - 0.5) * 10;
      pos[i*3+2] = (Math.random() - 0.5) * 8;
      vel[i] = 0.0004 + Math.random() * 0.0008;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { dustGeo: geo, dustVel: vel };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 먼지 파티클 이동
    if (dustRef.current) {
      const arr = dustRef.current.geometry.attributes.position.array;
      for (let i = 0; i < DUST_COUNT; i++) {
        arr[i*3+1] += dustVel[i];
        if (arr[i*3+1] > 5) arr[i*3+1] = -5;
        arr[i*3] += Math.sin(t * 0.3 + i) * 0.0008;
      }
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 키라이트 미세 흔들림
    if (keyRef.current) {
      keyRef.current.intensity = preset.keyIntensity + Math.sin(t * 0.3) * 1.5;
      keyRef.current.position.x = Math.sin(t * 0.08) * 0.4;
    }
  });

  return (
    <>
      {/* 배경 구체 */}
      <mesh>
        <sphereGeometry args={[40, 32, 32]} />
        <primitive object={bgMat} attach="material" />
      </mesh>

      {/* 바닥 반사면 */}
      <mesh rotation-x={-Math.PI / 2} position-y={-2.0}>
        <circleGeometry args={[8, 64]} />
        <primitive object={floorMat} attach="material" />
      </mesh>

      {/* 바닥 글로우 */}
      <sprite position={[0, -1.95, 0]} scale={[6, 2.5, 1]}>
        <spriteMaterial
          map={glowTex}
          color={0x8AAEC0}
          transparent
          opacity={0.30}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      {/* 먼지 파티클 */}
      <points ref={dustRef}>
        <primitive object={dustGeo} attach="geometry" />
        <pointsMaterial
          color={0xC0D8E0}
          size={0.018}
          transparent
          opacity={0.4}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 조명 */}
      <ambientLight color={0x0A1E2A} intensity={preset.ambientIntensity} />

      {/* 천장 키라이트 */}
      <spotLight
        ref={keyRef}
        color={preset.key}
        intensity={preset.keyIntensity}
        distance={24}
        angle={Math.PI / 5}
        penumbra={0.4}
        decay={1.4}
        position={[0, 9, 4]}
        target={spotTarget}
      />
      <primitive object={spotTarget} />

      {/* 좌측 필 */}
      <pointLight color={preset.fill}   intensity={14} distance={16} decay={2} position={[-5, 2, 4]} />
      {/* 우측 림 */}
      <pointLight color={preset.rim}    intensity={20} distance={16} decay={2} position={[5, 1, -3]} />
      {/* 업라이트 */}
      <pointLight color={preset.accent} intensity={10} distance={8}  decay={2} position={[0, -1.9, 0]} />
    </>
  );
}
