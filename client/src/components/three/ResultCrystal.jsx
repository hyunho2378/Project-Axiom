import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import EvolvingBlob, { EvolvingParticles, Starfield } from './EvolvingBlob';

const LIGHT_PRESETS = {
    '건성':   { key: '#7FC4E8', rim: '#00D4FF', fill: '#2A6885' },
    '중성':   { key: '#8FD0C4', rim: '#3FD8C0', fill: '#2A6858' },
    '지성':   { key: '#7B8FE0', rim: '#5566FF', fill: '#334488' },
    '수부지': { key: '#6FA8C8', rim: '#22B8E0', fill: '#2A6885' },
    '복합성': { key: '#6FCFB8', rim: '#2ED0B0', fill: '#2A6858' },
};

export default function ResultCrystal({ skinType }) {
    const mainType = skinType ? skinType.split(' · ')[0] : '건성';
    const preset = LIGHT_PRESETS[mainType] || LIGHT_PRESETS['건성'];

    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ toneMappingExposure: 1.15 }}
        >
            <ambientLight intensity={0.35} />
            <spotLight position={[10, 10, 10]} intensity={1.0} color={preset.key} />
            <pointLight position={[-10, -5, -5]} intensity={0.4} color={preset.fill} />
            <pointLight position={[5, -10, 5]} intensity={0.6} color={preset.rim} />
            <Suspense fallback={null}>
                <Starfield />
                <EvolvingBlob
                    step={10}
                    colorOverride={preset.key}
                    emissiveOverride={preset.rim}
                    emissiveIntensityOverride={0.85}
                />
                <EvolvingParticles step={10} colorOverride={preset.rim} />
                <Environment preset="city" intensity={0.4} />
            </Suspense>
            <EffectComposer>
                <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} height={300} intensity={1.0} />
            </EffectComposer>
        </Canvas>
    );
}
