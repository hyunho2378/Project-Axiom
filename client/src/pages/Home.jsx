import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/**
 * Home Page - High-End Tech Style Landing
 * 
 * DESIGN REFERENCE: Dark SaaS aesthetic with Bento Grid, Glassmorphism
 * 
 * SECTIONS:
 * 1. HERO - "Define Your Axis" with 3D background
 * 2. ALGORITHM - Bento Grid (3 cards)
 * 3. PROCESS - "Capture. Analyze. Transform."
 * 4. TECHNOLOGY - "200+ Skin Data Points"
 * 5. FOOTER CTA - "Ready to find your standard?"
 * 
 * COLOR PALETTE:
 * - #000000 (Pure Black Background)
 * - #1E5672 (Deep Teal)
 * - #3C7795 (Cyan Highlight)
 * - #8AAEC0 (Mist Blue Text)
 */

// ============================================
// 3D BACKGROUND COMPONENTS
// ============================================

function TheOrb() {
    const meshRef = useRef();
    const glowRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
        }
        if (glowRef.current) {
            glowRef.current.material.emissiveIntensity = 1.2 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <group position={[0, 0, 0]}>
                <mesh ref={glowRef} scale={1.5}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial
                        color="#1E5672"
                        emissive="#3C7795"
                        emissiveIntensity={1.2}
                        transparent
                        opacity={0.5}
                    />
                </mesh>
                <mesh ref={meshRef} scale={1.8}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshPhysicalMaterial
                        color="#1E5672"
                        emissive="#3C7795"
                        emissiveIntensity={0.2}
                        roughness={0.1}
                        metalness={0.2}
                        transmission={0.8}
                        thickness={2}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            </group>
        </Float>
    );
}

function FloatingParticles({ count = 40 }) {
    const pointsRef = useRef();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const radius = 3 + Math.random() * 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.06} color="#8AAEC0" transparent opacity={0.6} sizeAttenuation />
        </points>
    );
}

function Background3D() {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            onCreated={({ gl }) => gl.setClearColor('#000000')}
        >
            <ambientLight intensity={1} />
            <spotLight position={[5, 10, 5]} angle={0.4} penumbra={1} intensity={3} color="#3C7795" />
            <pointLight position={[-5, 5, 5]} intensity={2} color="#3C7795" />
            <Environment preset="night" />
            <TheOrb />
            <FloatingParticles count={35} />
            <EffectComposer>
                <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1} />
            </EffectComposer>
        </Canvas>
    );
}

// ============================================
// ANIMATION VARIANTS
// ============================================

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

// ============================================
// SECTION 1: HERO
// ============================================

function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="relative w-full min-h-screen bg-black overflow-hidden">
            {/* 3D Background - Darkened */}
            <div className="absolute inset-0 z-0 opacity-70">
                <Background3D />
            </div>

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black" />

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12 text-center">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl mx-auto"
                    >
                        {/* Massive H1 */}
                        <motion.h1
                            variants={fadeInUp}
                            className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6 text-[#8AAEC0]"
                        >
                            Define Your<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3C7795] to-[#8AAEC0]">
                                Axis.
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={fadeInUp}
                            className="font-sans text-lg md:text-xl text-[#8AAEC0]/70 max-w-2xl mx-auto mb-10 leading-relaxed"
                        >
                            The precision of data. The art of beauty.<br className="hidden md:block" />
                            AXIOM creates your unique formula.
                        </motion.p>

                        {/* CTA Button - Pill with Cyan Glow */}
                        <motion.div variants={fadeInUp}>
                            <button
                                onClick={() => navigate('/analysis')}
                                className="relative inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 font-sans text-base md:text-lg font-semibold text-black bg-[#3C7795] rounded-full transition-all duration-300 hover:bg-[#8AAEC0] hover:scale-105 shadow-[0_0_40px_rgba(60,119,149,0.4)] hover:shadow-[0_0_60px_rgba(60,119,149,0.6)]"
                            >
                                Start Analysis
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#8AAEC0]/40 font-sans">Scroll</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-[#3C7795]/60 to-transparent" />
                </div>
            </motion.div>
        </section>
    );
}

// ============================================
// SECTION 2: ALGORITHM (Bento Grid)
// ============================================

function AlgorithmSection() {
    return (
        <section className="relative py-24 md:py-32 bg-black overflow-hidden">
            <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#3C7795] font-sans mb-4">
                        The Algorithm
                    </p>
                    <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-[#8AAEC0]">
                        Precision.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3C7795] to-[#8AAEC0]">
                            Personalized.
                        </span>
                    </h2>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 - Large (spans 2 columns on desktop) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-2 group"
                    >
                        <div className="relative h-full min-h-[320px] md:min-h-[400px] overflow-hidden bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 md:p-10 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15),0_8px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-500 hover:from-white/[0.12] hover:to-white/[0.02] hover:border-white/[0.15]">
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3C7795]/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative z-10">
                                <span className="text-[10px] uppercase tracking-[0.25em] text-[#3C7795] font-sans mb-4 block">
                                    01
                                </span>
                                <h3 className="font-sans text-2xl md:text-3xl font-bold text-[#8AAEC0] mb-4">
                                    Hyper-Personalized
                                </h3>
                                <p className="font-sans text-base text-[#8AAEC0]/60 leading-relaxed max-w-md">
                                    고정밀 AI 스캐닝으로 피부의 보이지 않는 층까지 분석합니다.
                                    0.1%의 차이까지 반영한 나만의 결과.
                                </p>
                            </div>

                            {/* Visual - Abstract Grid Lines */}
                            <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 opacity-30">
                                <svg viewBox="0 0 200 200" className="w-full h-full">
                                    <defs>
                                        <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#3C7795" stopOpacity="0.6" />
                                            <stop offset="100%" stopColor="#1E5672" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    {[...Array(8)].map((_, i) => (
                                        <line key={i} x1={25 * i} y1="0" x2={25 * i} y2="200" stroke="url(#gridGrad)" strokeWidth="0.5" />
                                    ))}
                                    {[...Array(8)].map((_, i) => (
                                        <line key={`h${i}`} x1="0" y1={25 * i} x2="200" y2={25 * i} stroke="url(#gridGrad)" strokeWidth="0.5" />
                                    ))}
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2 - Small */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="group"
                    >
                        <div className="relative h-full min-h-[200px] md:min-h-[400px] overflow-hidden bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15),0_8px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-500 hover:from-white/[0.12] hover:to-white/[0.02] hover:border-white/[0.15] flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.25em] text-[#3C7795] font-sans mb-4 block">
                                    02
                                </span>
                                <h3 className="font-sans text-xl md:text-2xl font-bold text-[#8AAEC0] mb-3">
                                    AI Driven
                                </h3>
                                <p className="font-sans text-sm text-[#8AAEC0]/60 leading-relaxed">
                                    신경망 기반 딥러닝으로 수백만 데이터 포인트를 학습.
                                </p>
                            </div>

                            {/* AI Icon */}
                            <div className="mt-6 flex justify-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#3C7795]/20 border border-[#3C7795]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3C7795" strokeWidth="1.5">
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3 - Small (on mobile, 2 cards side by side) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="group"
                    >
                        <div className="relative h-full min-h-[200px] overflow-hidden bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15),0_8px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-500 hover:from-white/[0.12] hover:to-white/[0.02] hover:border-white/[0.15]">
                            <span className="text-[10px] uppercase tracking-[0.25em] text-[#3C7795] font-sans mb-4 block">
                                03
                            </span>
                            <h3 className="font-sans text-xl md:text-2xl font-bold text-[#8AAEC0] mb-3">
                                Pure Science
                            </h3>
                            <p className="font-sans text-sm text-[#8AAEC0]/60 leading-relaxed">
                                느낌이 아닌 오직 데이터. 과학적 근거 기반의 처방.
                            </p>

                            {/* Molecule Icon */}
                            <div className="absolute bottom-6 right-6 opacity-40 group-hover:opacity-70 transition-opacity">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3C7795" strokeWidth="1">
                                    <circle cx="12" cy="12" r="2" />
                                    <circle cx="6" cy="6" r="1.5" />
                                    <circle cx="18" cy="6" r="1.5" />
                                    <circle cx="6" cy="18" r="1.5" />
                                    <circle cx="18" cy="18" r="1.5" />
                                    <line x1="10" y1="10" x2="7" y2="7" />
                                    <line x1="14" y1="10" x2="17" y2="7" />
                                    <line x1="10" y1="14" x2="7" y2="17" />
                                    <line x1="14" y1="14" x2="17" y2="17" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 4 - Wide on desktop */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="md:col-span-2 group"
                    >
                        <div className="relative h-full min-h-[200px] overflow-hidden bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15),0_8px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-500 hover:from-white/[0.12] hover:to-white/[0.02] hover:border-white/[0.15]">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#3C7795] font-sans mb-4 block">
                                        04
                                    </span>
                                    <h3 className="font-sans text-xl md:text-2xl font-bold text-[#8AAEC0] mb-3">
                                        Visual Art
                                    </h3>
                                    <p className="font-sans text-sm text-[#8AAEC0]/60 leading-relaxed max-w-md">
                                        복잡한 데이터를 갤러리에 걸린 작품처럼 시각화합니다.
                                        분석 결과가 하나의 예술 작품이 됩니다.
                                    </p>
                                </div>

                                {/* Abstract Art Visual */}
                                <div className="flex gap-2">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="w-12 h-24 md:w-16 md:h-32 rounded-lg bg-gradient-to-b from-[#3C7795]/40 to-[#1E5672]/20 border border-[#3C7795]/30"
                                            style={{ transform: `rotate(${(i - 2) * 5}deg)` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 3: PROCESS
// ============================================

function ProcessSection() {
    const steps = [
        { id: '01', title: 'Capture', desc: '초정밀 AI 스캐닝으로 피부 텍스처를 포착' },
        { id: '02', title: 'Analyze', desc: '6가지 핵심 지표를 분석해 AXIOM 타입 결정' },
        { id: '03', title: 'Transform', desc: '개인화된 처방 루틴 제안 및 변화 추적' }
    ];

    return (
        <section className="relative py-24 md:py-32 bg-black overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3C7795]/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#3C7795] font-sans mb-4">
                        The Process
                    </p>
                    <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold text-[#8AAEC0] leading-[1.1]">
                        Capture.<br />
                        Analyze.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3C7795] to-[#8AAEC0]">
                            Transform.
                        </span>
                    </h2>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="relative"
                        >
                            {/* Connecting Line (hidden on mobile) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-8 left-full w-full h-[1px] bg-gradient-to-r from-[#3C7795]/60 to-transparent" />
                            )}

                            <div className="relative">
                                <span className="font-sans text-6xl md:text-7xl font-bold text-[#1E5672]/30 mb-2 block">
                                    {step.id}
                                </span>
                                <h3 className="font-sans text-2xl md:text-3xl font-bold text-[#8AAEC0] mb-3 -mt-6 md:-mt-8">
                                    {step.title}
                                </h3>
                                <p className="font-sans text-base text-[#8AAEC0]/60 leading-relaxed" style={{ wordBreak: 'keep-all' }}>
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 4: TECHNOLOGY
// ============================================

function TechnologySection() {
    return (
        <section className="relative py-24 md:py-40 bg-black overflow-hidden">
            <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#3C7795] font-sans mb-6">
                        Technology
                    </p>

                    {/* Massive Number */}
                    <div className="relative inline-block mb-8">
                        <span className="font-sans text-8xl md:text-[12rem] lg:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#3C7795] to-[#1E5672]/50 leading-none">
                            200+
                        </span>
                        {/* Glow */}
                        <div className="absolute inset-0 blur-[80px] bg-[#3C7795]/30 -z-10" />
                    </div>

                    <h2 className="font-sans text-2xl md:text-4xl font-bold text-[#8AAEC0] mb-4">
                        Skin Data Points
                    </h2>
                    <p className="font-sans text-base md:text-lg text-[#8AAEC0]/60 max-w-xl mx-auto leading-relaxed" style={{ wordBreak: 'keep-all' }}>
                        수백 개의 피부 데이터 포인트를 분석하여<br className="hidden md:block" />
                        과학적으로 검증된 개인화 처방을 제공합니다.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 5: FOOTER CTA
// ============================================

function FooterCTA() {
    const navigate = useNavigate();

    return (
        <section className="relative py-24 md:py-32 bg-black overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E5672]/10 to-transparent pointer-events-none" />

            {/* Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#3C7795]/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#3C7795] font-sans mb-6">
                        Start Now
                    </p>
                    <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-[#8AAEC0] mb-6 leading-tight">
                        Ready to find<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3C7795] to-[#8AAEC0]">
                            your standard?
                        </span>
                    </h2>
                    <p className="font-sans text-base md:text-lg text-[#8AAEC0]/60 mb-10 max-w-md mx-auto" style={{ wordBreak: 'keep-all' }}>
                        지금 바로 AXIOM 여정을 시작하세요.
                    </p>

                    {/* Large CTA Button with Strong Glow */}
                    <button
                        onClick={() => navigate('/analysis')}
                        className="relative inline-flex items-center justify-center px-12 py-5 md:px-16 md:py-6 font-sans text-lg md:text-xl font-bold text-black bg-gradient-to-r from-[#3C7795] to-[#8AAEC0] rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_60px_rgba(60,119,149,0.5)] hover:shadow-[0_0_100px_rgba(60,119,149,0.7)]"
                    >
                        Begin Journey
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// MAIN HOME COMPONENT
// ============================================

export default function Home() {
    return (
        <main className="bg-black min-h-screen">
            <HeroSection />
            <AlgorithmSection />
            <ProcessSection />
            <TechnologySection />
            <FooterCTA />
        </main>
    );
}
