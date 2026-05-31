import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import EvolvingBlob, { EvolvingParticles, Starfield } from './EvolvingBlob';

const LIGHT_PRESETS = {
    '건성':   { key: '#D8EEFF', rim: '#00D4FF', fill: '#2A6885' },
    '중성':   { key: '#E8E0D8', rim: '#88CCAA', fill: '#3A7868' },
    '지성':   { key: '#E0E8FF', rim: '#6688FF', fill: '#334488' },
    '수부지': { key: '#E8E0D0', rim: '#88AABB', fill: '#446680' },
    '복합성': { key: '#E0F0E8', rim: '#44CCBB', fill: '#2A6858' },
};

export default function ResultCrystal({ skinType }) {
    const mainType = skinType ? skinType.split(' · ')[0] : '건성';
    const preset = LIGHT_PRESETS[mainType] || LIGHT_PRESETS['건성'];

    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} intensity={1.2} color={preset.key} />
            <pointLight position={[-10, -5, -5]} intensity={0.4} color={preset.fill} />
            <pointLight position={[5, -10, 5]} intensity={0.3} color={preset.rim} />
            <Suspense fallback={null}>
                <Starfield />
                <EvolvingBlob step={10} colorOverride={preset.key} emissiveOverride={preset.rim} />
                <EvolvingParticles step={10} colorOverride={preset.rim} />
                <Environment preset="city" />
            </Suspense>
            <EffectComposer>
                <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} intensity={1.5} />
            </EffectComposer>
        </Canvas>
    );
}
