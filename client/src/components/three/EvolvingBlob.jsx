import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * EvolvingBlob - Procedurally Generated 3D Blob
 * 
 * Evolves through 11 stages (0-10) based on quiz progress.
 * Uses MeshDistortMaterial for organic deformation.
 * 
 * COLOR PALETTE:
 * - Stage 0-3: Dark dormant state (#082B35 → #1E5672)
 * - Stage 4-7: Awakening turbulence (#3C7795)
 * - Stage 8-10: Full radiance (#00E0FF with glow)
 */

// 11 Evolution Stages Configuration
const STAGES = [
    // Stage 0: Dormant - Small, dark, almost still
    { scale: 0.8, distort: 0.1, speed: 0.5, color: '#082B35', emissive: '#000000', emissiveIntensity: 0, metalness: 0.3, roughness: 0.8 },
    // Stage 1: Stirring
    { scale: 0.9, distort: 0.2, speed: 0.8, color: '#0B3545', emissive: '#1E5672', emissiveIntensity: 0.1, metalness: 0.4, roughness: 0.7 },
    // Stage 2: Awakening
    { scale: 1.0, distort: 0.25, speed: 1.0, color: '#1E5672', emissive: '#1E5672', emissiveIntensity: 0.15, metalness: 0.5, roughness: 0.6 },
    // Stage 3: Rising
    { scale: 1.1, distort: 0.3, speed: 1.2, color: '#1E5672', emissive: '#3C7795', emissiveIntensity: 0.2, metalness: 0.5, roughness: 0.5 },
    // Stage 4: Pulse begins
    { scale: 1.2, distort: 0.4, speed: 1.5, color: '#2A6885', emissive: '#3C7795', emissiveIntensity: 0.3, metalness: 0.6, roughness: 0.4 },
    // Stage 5: Turbulence
    { scale: 1.3, distort: 0.5, speed: 2.0, color: '#3C7795', emissive: '#3C7795', emissiveIntensity: 0.4, metalness: 0.6, roughness: 0.35 },
    // Stage 6: Morphing
    { scale: 1.4, distort: 0.55, speed: 2.5, color: '#3C7795', emissive: '#5A9AB5', emissiveIntensity: 0.5, metalness: 0.7, roughness: 0.3 },
    // Stage 7: Liquid state
    { scale: 1.5, distort: 0.6, speed: 3.0, color: '#5A9AB5', emissive: '#8AAEC0', emissiveIntensity: 0.6, metalness: 0.7, roughness: 0.25 },
    // Stage 8: Radiating
    { scale: 1.6, distort: 0.65, speed: 3.5, color: '#8AAEC0', emissive: '#8AAEC0', emissiveIntensity: 0.8, metalness: 0.8, roughness: 0.2 },
    // Stage 9: Illumination
    { scale: 1.75, distort: 0.75, speed: 4.0, color: '#A0D4E8', emissive: '#00D4FF', emissiveIntensity: 1.2, metalness: 0.85, roughness: 0.15 },
    // Stage 10: Full radiance - Complete evolution
    { scale: 2.0, distort: 0.85, speed: 5.0, color: '#C0F0FF', emissive: '#00E0FF', emissiveIntensity: 2.0, metalness: 0.9, roughness: 0.1 },
];

// Smooth linear interpolation
function lerp(start, end, t) {
    return start + (end - start) * t;
}


export default function EvolvingBlob({ step = 0, colorOverride = null, emissiveOverride = null }) {
    const meshRef = useRef();
    const materialRef = useRef();

    // Current animated values
    const animatedValues = useRef({
        scale: STAGES[0].scale,
        distort: STAGES[0].distort,
        speed: STAGES[0].speed,
        color: new THREE.Color(STAGES[0].color),
        emissive: new THREE.Color(STAGES[0].emissive),
        emissiveIntensity: STAGES[0].emissiveIntensity,
        metalness: STAGES[0].metalness,
        roughness: STAGES[0].roughness,
    });

    // Target stage (clamped to valid range)
    const targetStage = useMemo(() => {
        const stage = STAGES[Math.min(Math.max(step, 0), 10)];
        if (colorOverride || emissiveOverride) {
            return { ...stage, color: colorOverride || stage.color, emissive: emissiveOverride || stage.emissive };
        }
        return stage;
    }, [step, colorOverride, emissiveOverride]);

    // Animate values in useFrame for smooth transitions
    useFrame((state, delta) => {
        if (!meshRef.current || !materialRef.current) return;

        const av = animatedValues.current;
        const lerpSpeed = 2.5 * delta; // Smooth transition speed

        // Lerp numeric values
        av.scale = lerp(av.scale, targetStage.scale, lerpSpeed);
        av.distort = lerp(av.distort, targetStage.distort, lerpSpeed);
        av.speed = lerp(av.speed, targetStage.speed, lerpSpeed);
        av.emissiveIntensity = lerp(av.emissiveIntensity, targetStage.emissiveIntensity, lerpSpeed);
        av.metalness = lerp(av.metalness, targetStage.metalness, lerpSpeed);
        av.roughness = lerp(av.roughness, targetStage.roughness, lerpSpeed);

        // Lerp colors
        const targetColor = new THREE.Color(targetStage.color);
        const targetEmissive = new THREE.Color(targetStage.emissive);
        av.color.lerp(targetColor, lerpSpeed);
        av.emissive.lerp(targetEmissive, lerpSpeed);

        // Apply to mesh
        meshRef.current.scale.setScalar(av.scale);

        // Gentle rotation
        meshRef.current.rotation.y += delta * 0.15;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;

        // Apply to material
        if (materialRef.current) {
            materialRef.current.distort = av.distort;
            materialRef.current.speed = av.speed;
            materialRef.current.color = av.color;
            materialRef.current.emissive = av.emissive;
            materialRef.current.emissiveIntensity = av.emissiveIntensity;
            materialRef.current.metalness = av.metalness;
            materialRef.current.roughness = av.roughness;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[1, 128, 128]} />
                <MeshDistortMaterial
                    ref={materialRef}
                    color={STAGES[0].color}
                    emissive={STAGES[0].emissive}
                    emissiveIntensity={STAGES[0].emissiveIntensity}
                    distort={STAGES[0].distort}
                    speed={STAGES[0].speed}
                    metalness={STAGES[0].metalness}
                    roughness={STAGES[0].roughness}
                    envMapIntensity={1.5}
                />
            </mesh>
        </Float>
    );
}

/**
 * Starfield — Continuous flowing star particle background
 * 1200 points distributed in a deep-space sphere around the blob.
 * Slowly rotates on all axes for a living atmosphere.
 */
export function Starfield({ count = 1200 }) {
    const ref = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 8 + Math.random() * 12;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.elapsedTime;
        ref.current.rotation.y = t * 0.012;
        ref.current.rotation.x = Math.sin(t * 0.008) * 0.15;
        ref.current.rotation.z = Math.cos(t * 0.006) * 0.08;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.018}
                color="#8AAEC0"
                transparent
                opacity={0.45}
                sizeAttenuation
            />
        </points>
    );
}

// Orbiting particles that also evolve with stage
export function EvolvingParticles({ step = 0, count = 50, colorOverride = null }) {
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const radius = 2 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = radius * Math.cos(phi);
        }
        return pos;
    }, [count]);

    // Particle opacity and size based on step
    const intensity = useMemo(() => {
        return 0.2 + (step / 10) * 0.6;
    }, [step]);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
            pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03 + (step / 10) * 0.04}
                color={colorOverride || (step >= 7 ? '#00E0FF' : '#8AAEC0')}
                transparent
                opacity={intensity}
                sizeAttenuation
            />
        </points>
    );
}
