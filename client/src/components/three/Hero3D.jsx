import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

/**
 * STRICT 4-COLOR PALETTE FOR 3D:
 * - #000000 (Background)
 * - #1E5672 (Orb/Particles Color)
 * - #3C7795 (Emissive Glow)
 * - #8AAEC0 (Lights)
 */

/**
 * TheOrb - Glowing Glass Sphere using ONLY allowed colors
 */
function TheOrb() {
    const meshRef = useRef();
    const glowRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
        }
        if (glowRef.current) {
            glowRef.current.material.emissiveIntensity = 1.5 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <group position={[0, 0, 0]}>
                {/* Inner Glow Core - #3C7795 */}
                <mesh ref={glowRef} scale={1.8}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial
                        color="#1E5672"
                        emissive="#3C7795"
                        emissiveIntensity={1.5}
                        transparent
                        opacity={0.6}
                    />
                </mesh>

                {/* Outer Glass Shell - #1E5672 */}
                <mesh ref={meshRef} scale={2.2}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshPhysicalMaterial
                        color="#1E5672"
                        emissive="#3C7795"
                        emissiveIntensity={0.3}
                        roughness={0.1}
                        metalness={0.2}
                        transmission={0.8}
                        thickness={2}
                        transparent
                        opacity={0.7}
                        envMapIntensity={1}
                    />
                </mesh>
            </group>
        </Float>
    );
}

/**
 * TheAxis - Glowing Vertical Line - #3C7795
 */
function TheAxis() {
    const glowRef = useRef();

    useFrame((state) => {
        if (glowRef.current) {
            glowRef.current.material.emissiveIntensity = 2 + Math.sin(state.clock.getElapsedTime() * 2) * 0.5;
        }
    });

    return (
        <group position={[0, 0, -2]}>
            {/* Main Axis Line - #3C7795 */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 10, 16]} />
                <meshStandardMaterial
                    color="#3C7795"
                    emissive="#3C7795"
                    emissiveIntensity={3}
                />
            </mesh>

            {/* Glow Layer */}
            <mesh ref={glowRef} position={[0, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 10, 16]} />
                <meshStandardMaterial
                    color="#3C7795"
                    emissive="#3C7795"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.4}
                />
            </mesh>
        </group>
    );
}

/**
 * Floating Particles - #8AAEC0
 */
function FloatingParticles({ count = 60 }) {
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const radius = 4 + Math.random() * 6;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = radius * Math.cos(phi);
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
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
                size={0.08}
                color="#8AAEC0"
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

/**
 * AXIOM Scene - ONLY 4 COLORS
 */
function AxiomScene() {
    return (
        <>
            {/* Lighting - #8AAEC0 and #3C7795 */}
            <ambientLight intensity={1.5} />
            <spotLight
                position={[5, 10, 5]}
                angle={0.4}
                penumbra={1}
                intensity={5}
                color="#3C7795"
            />
            <pointLight position={[-5, 5, 5]} intensity={3} color="#3C7795" />
            <pointLight position={[0, -5, 0]} intensity={2} color="#8AAEC0" />

            {/* Environment */}
            <Environment preset="night" />

            {/* The Axis */}
            <TheAxis />

            {/* The Orb */}
            <TheOrb />

            {/* Floating Particles */}
            <FloatingParticles count={50} />

            {/* Bloom Effect */}
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.1}
                    luminanceSmoothing={0.9}
                    intensity={1.5}
                />
            </EffectComposer>
        </>
    );
}

/**
 * Hero3D - AXIOM "Define Your Axis"
 * STRICT 4-COLOR: #000000, #1E5672, #3C7795, #8AAEC0
 */
export default function Hero3D() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.5 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
        }
    };

    return (
        <section className="relative w-full min-h-screen bg-black">
            {/* 3D Canvas */}
            <div className="absolute inset-0 z-0">
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 45 }}
                    dpr={[1, 2]}
                    gl={{
                        antialias: true,
                        alpha: false,
                        powerPreference: 'high-performance'
                    }}
                    onCreated={({ gl }) => {
                        gl.setClearColor('#000000');
                    }}
                >
                    <AxiomScene />
                </Canvas>
            </div>

            {/* Text Overlay - ALL TEXT #8AAEC0 */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12 w-full">
                    <motion.div
                        className="max-w-2xl pointer-events-none"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Title - #8AAEC0 with gradient - Mobile-first responsive */}
                        <motion.h1
                            variants={itemVariants}
                            className="font-title-en text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-[#8AAEC0] break-words"
                        >
                            Define Your<br />
                            <span className="text-gradient-cyan">Axis.</span>
                        </motion.h1>

                        {/* Subtitle - #8AAEC0 - Responsive body text */}
                        <motion.p
                            variants={itemVariants}
                            className="font-body text-base md:text-lg text-[#8AAEC0] max-w-xl mb-8 md:mb-10 leading-relaxed"
                            style={{ wordBreak: 'keep-all' }}
                        >
                            데이터로 증명된, 당신만의 흔들리지 않는 아름다움의 기준.
                        </motion.p>

                        {/* CTA Button - Touch-optimized */}
                        <motion.div variants={itemVariants} className="flex gap-4 pointer-events-auto">
                            <button
                                onClick={() => navigate('/analysis')}
                                className="btn-glass rounded-full px-6 py-3 md:px-8 md:py-4 text-base md:text-lg"
                            >
                                <span>Explore AXIOM</span>
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator - #8AAEC0 */}
            <motion.div
                className="absolute bottom-8 z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 left-0 right-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-gradient-to-r from-[#3C7795]/60 to-transparent" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#8AAEC0]/50 font-body">
                        Scroll to explore
                    </span>
                </div>
            </motion.div>
        </section>
    );
}
