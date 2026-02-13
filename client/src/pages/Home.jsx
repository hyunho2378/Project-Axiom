import React from 'react';
import Scene3D from '../components/Scene3D';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#00E0FF] selection:text-black">

            {/* 📍 SECTION 1: HERO (Header Integration Fixed) */}
            <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-black">

                {/* 🔥 CRITICAL FIX: 'top-[72px]' 적용.
                    1. 디폴트: 헤더 높이(72px)만큼 띄우고 시작. (헤더 침범 안 함)
                    2. 스크롤: section이 통째로 위로 올라가므로, 자연스럽게 고정된 헤더 밑으로 깔려 들어감.
                */}
                <div className="absolute top-[72px] bottom-0 left-0 right-0 z-0 overflow-hidden">
                    <Scene3D
                        modelUrl="/models/axiom-main-banner.glb"
                        height="100%"
                        scale={3.0}
                        rotation={[-Math.PI / 2, 0, 0]}
                        // 컨테이너가 잘렸으므로 모델 위치는 원래대로 예쁘게 복구 (-3.8 -> -1.8)
                        position={[0, -1.8, 0]}
                        isFixed={true}
                        cameraPos={[0, 0, 10]}
                        fov={25}
                    />
                </div>

                {/* CONTENT LAYER: 텍스트도 72px 내려간 배경에 맞춰 중앙 정렬 보정 (pt-20) */}
                <div className="relative z-10 container mx-auto px-6 md:px-12 pointer-events-none flex flex-col h-full justify-center pt-20">
                    <div className="pointer-events-auto">
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
                            className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-6 leading-tight text-left mix-blend-difference"
                        >
                            Define Your <br />
                            <span className="text-[#3C7795]">Axis.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                            className="text-[#8AAEC0] text-lg md:text-xl mb-8 max-w-md text-left leading-relaxed mix-blend-difference"
                        >
                            The precision of data. The art of beauty. <br />
                            AXIOM creates your unique formula.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                            <Link
                                to="/diagnosis"
                                className="px-10 py-4 bg-[#3C7795] hover:bg-[#00E0FF] text-white rounded-full font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(60,119,149,0.5)] inline-block"
                            >
                                Start Analysis
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 📍 SECTION 2: MIDDLE SECTION (Bento Grid) */}
            <section className="py-24 bg-black border-t border-[#222]">
                <div className="container mx-auto px-6 max-w-7xl">

                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Personalized.</h2>
                        <p className="text-[#8AAEC0] text-sm tracking-widest uppercase">The Axiom Standard</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                        {/* Card 01: Hyper-Personalized */}
                        <div className="md:col-span-8 bg-[#0a1014] border border-[#222] rounded-3xl p-10 flex flex-col justify-between group hover:border-[#00E0FF]/30 transition-colors">
                            <span className="text-[#00E0FF] text-xs font-mono mb-2">01</span>
                            <div>
                                <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-[#00E0FF] transition-colors">Hyper-Personalized</h3>
                                <p className="text-[#8AAEC0] leading-relaxed max-w-md">
                                    고정밀 AI 스캐닝으로 피부의 보이지 않는 층까지 분석합니다.
                                    0.1%의 차이까지 반영한 나만의 결과.
                                </p>
                            </div>
                        </div>

                        {/* Card 02: AI Driven */}
                        <div className="md:col-span-4 bg-[#0a1014] border border-[#222] rounded-3xl p-10 flex flex-col justify-between group hover:border-[#00E0FF]/30 transition-colors relative overflow-hidden">
                            <span className="text-[#00E0FF] text-xs font-mono mb-2 z-10 relative">02</span>
                            <div className="z-10 relative">
                                <h3 className="font-serif text-2xl text-white mb-4">AI Driven</h3>
                                <p className="text-[#8AAEC0] leading-relaxed">
                                    신경망 기반 딥러닝으로 수백만 데이터 포인트를 학습.
                                </p>
                            </div>
                            <div className="absolute bottom-10 right-10">
                                <div className="w-4 h-4 bg-[#00E0FF] rounded-full animate-ping absolute opacity-75"></div>
                                <div className="w-4 h-4 bg-[#00E0FF] rounded-full relative"></div>
                            </div>
                        </div>

                        {/* Card 03: Pure Science */}
                        <div className="md:col-span-4 bg-[#0a1014] border border-[#222] rounded-3xl p-10 flex flex-col justify-between group hover:border-white/30 transition-colors">
                            <span className="text-white/50 text-xs font-mono mb-2">03</span>
                            <div>
                                <h3 className="font-serif text-2xl text-white mb-4">Pure Science</h3>
                                <p className="text-[#8AAEC0] leading-relaxed">
                                    느낌이 아닌 오직 데이터. <br />과학적 근거 기반의 처방.
                                </p>
                            </div>
                        </div>

                        {/* Card 04: Visual Art */}
                        <div className="md:col-span-8 bg-[#0a1014] border border-[#222] rounded-3xl p-10 flex flex-col justify-between group hover:border-[#00E0FF]/30 transition-colors">
                            <span className="text-white/50 text-xs font-mono mb-2">04</span>
                            <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                                <div>
                                    <h3 className="font-serif text-2xl text-white mb-4">Visual Art</h3>
                                    <p className="text-[#8AAEC0] leading-relaxed max-w-md">
                                        복잡한 데이터를 갤러리에 걸린 작품처럼 시각화합니다.
                                        분석 결과가 하나의 예술 작품이 됩니다.
                                    </p>
                                </div>
                                <div className="flex gap-2 opacity-50">
                                    <div className="w-6 h-12 border border-white/20 rounded-sm"></div>
                                    <div className="w-6 h-12 border border-white/40 rounded-sm -mt-4"></div>
                                    <div className="w-6 h-12 border border-white/20 rounded-sm"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 📍 SECTION 3: BOTTOM SHOWCASE */}
            <section className="py-24 bg-black relative border-t border-[#333]">
                <div className="container mx-auto px-6">
                    <div className="w-full max-w-7xl mx-auto h-[600px] bg-[#050505] rounded-3xl overflow-hidden border border-[#222] relative">
                        <Scene3D
                            modelUrl="/models/axiom-main-bottom-section.glb"
                            height="100%"
                            scale={2.8}
                            position={[0, -2.8, 0]}
                            rotation={[0, 0, 0]}
                            isFixed={true}
                            cameraPos={[0, 0, 12]}
                            fov={25}
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}