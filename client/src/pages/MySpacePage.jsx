import Scene3D from '../components/Scene3D';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * My Space Page — AXIOM 3D Showroom
 * Palette: #000, #1E5672, #3C7795, #8AAEC0
 */
export default function MySpacePage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-hidden selection:bg-[#3C7795]/30 selection:text-white pt-[88px]">

            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center h-[calc(100vh-88px)] pb-12">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center w-full pt-6 pb-6 relative z-10"
                >
                    <p className="font-mono text-[#3C7795] text-[10px] tracking-[0.3em] uppercase mb-3">Your Digital Axis</p>
                    <h1 className="font-serif text-4xl md:text-5xl text-white">Personal Space</h1>
                </motion.div>

                {/* 3D Model Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="w-full flex-1 rounded-[3rem] bg-[#05080a] border border-[#222] relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-[#1E5672]/5 pointer-events-none z-10" />

                    <div className="absolute inset-0 z-0">
                        <Scene3D
                            modelUrl="/models/axiom-personal-space.glb"
                            height="100%"
                            scale={3.5}
                            rotation={[0, Math.PI / 2, 0]}
                            position={[0, -2, 0]}
                            isFixed={true}
                            cameraPos={[0, 0, 12]}
                            fov={25}
                        />
                    </div>

                    <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
                        <Link
                            to="/analysis"
                            className="bg-black/50 backdrop-blur-md border border-[#333] text-[#8AAEC0] font-sans text-xs tracking-widest uppercase px-8 py-4 rounded-full hover:bg-[#3C7795] hover:text-white hover:border-[#3C7795] transition-all duration-300"
                        >
                            Return to Analysis
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
