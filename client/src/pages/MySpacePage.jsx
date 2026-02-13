import React from 'react';
import Scene3D from '../components/Scene3D';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * My Space Page - AXIOM Official
 * 가짜 원기둥 코드를 삭제하고 진짜 GLB 모델을 정면으로 로드합니다.
 */

export default function MySpacePage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-hidden selection:bg-[#00E0FF] selection:text-black pt-[88px]">

            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center h-[calc(100vh-88px)] pb-12">

                {/* 헤더 텍스트 */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                    className="text-center w-full pt-6 pb-6 relative z-10"
                >
                    <p className="text-[#00E0FF] text-[10px] tracking-[0.3em] uppercase font-bold mb-3 font-sans">Your Digital Axis</p>
                    <h1 className="font-serif text-4xl md:text-5xl text-white">Personal Space</h1>
                </motion.div>

                {/* 3D Model Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
                    className="w-full flex-1 rounded-[3rem] bg-[#05080a] border border-[#222] relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-[#00E0FF]/5 pointer-events-none z-10"></div>

                    {/* 🔥 진짜 3D 모델 로드 & 정면 회전(Y축 Math.PI/2) 강제 */}
                    <div className="absolute inset-0 z-0">
                        <Scene3D
                            modelUrl="/models/axiom-personal-space.glb"
                            height="100%"
                            scale={3.5}
                            // X축 기울기는 두고, Y축만 돌려서 정면을 보게 만듦
                            rotation={[0, Math.PI / 2, 0]}
                            position={[0, -2, 0]}
                            isFixed={true}
                            cameraPos={[0, 0, 12]}
                            fov={25}
                        />
                    </div>

                    {/* 뒤로가기 버튼 */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
                        <Link
                            to="/analysis"
                            className="bg-black/50 backdrop-blur-md border border-[#333] text-[#8AAEC0] font-sans text-xs tracking-widest uppercase px-8 py-4 rounded-full hover:bg-[#00E0FF] hover:text-black hover:border-[#00E0FF] transition-all"
                        >
                            Return to Analysis
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}