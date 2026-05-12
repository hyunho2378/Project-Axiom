import { Canvas } from '@react-three/fiber';
import { View, Preload } from '@react-three/drei';
import * as THREE from 'three';

export default function SharedCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 8], fov: 34 }}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.5,
      }}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      eventSource={document.getElementById('root')}
      eventPrefix="client"
    >
      <View.Port />
      <Preload all />
    </Canvas>
  );
}
