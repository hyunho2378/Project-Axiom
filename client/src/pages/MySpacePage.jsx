import { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Environment, Float, MeshTransmissionMaterial, Text, SpotLight } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * My Space - Personal 3D Showroom
 * 
 * A dark, moody virtual stage where 3 products stand in spotlights.
 * Users can click products to focus/enlarge them.
 * 
 * PRODUCTS:
 * 1. Serum Bottle (Tall, thin)
 * 2. Cream Jar (Short, wide)
 * 3. Toner Bottle (Medium height)
 */

// Product configuration
const PRODUCTS = [
    {
        id: 0,
        name: 'AXIOM Serum',
        nameKo: '엑시옴 세럼',
        position: [-3, 0, 0],
        args: [0.35, 0.35, 2.2, 32], // Tall, thin
        color: '#8AAEC0'
    },
    {
        id: 1,
        name: 'AXIOM Cream',
        nameKo: '엑시옴 크림',
        position: [0, 0, 0],
        args: [0.9, 0.9, 1, 32], // Short, wide
        color: '#3C7795'
    },
    {
        id: 2,
        name: 'AXIOM Toner',
        nameKo: '엑시옴 토너',
        position: [3, 0, 0],
        args: [0.45, 0.45, 1.8, 32], // Medium
        color: '#1E5672'
    }
];

// Individual Product Component with spring animation
function Product({ product, isActive, onClick, activeIndex }) {
    const meshRef = useRef();
    const { id, position, args, color, name } = product;

    // Spring animation for position, scale, and rotation
    const springs = useSpring({
        scale: isActive ? 1.4 : (activeIndex !== null && !isActive ? 0.85 : 1),
        posX: isActive ? 0 : position[0],
        posY: isActive ? 0.5 : position[1],
        posZ: isActive ? 2.5 : position[2],
        rotY: isActive ? Math.PI * 0.25 : 0,
        opacity: activeIndex !== null && !isActive ? 0.4 : 1,
        config: { mass: 1, tension: 170, friction: 26 }
    });

    // Slow rotation when active
    useFrame((state) => {
        if (meshRef.current && isActive) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <animated.group
            position-x={springs.posX}
            position-y={springs.posY}
            position-z={springs.posZ}
            scale={springs.scale}
        >
            <Float speed={1.5} rotationIntensity={isActive ? 0 : 0.2} floatIntensity={0.3}>
                <animated.mesh
                    ref={meshRef}
                    rotation-y={springs.rotY}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick(id);
                    }}
                    castShadow
                >
                    <cylinderGeometry args={args} />
                    <MeshTransmissionMaterial
                        color={color}
                        transmission={0.6}
                        thickness={2}
                        roughness={0.1}
                        metalness={0.2}
                        chromaticAberration={0.1}
                        anisotropy={0.5}
                        distortion={0.2}
                        distortionScale={0.3}
                        temporalDistortion={0.1}
                        backside
                    />
                </animated.mesh>

                {/* Cap (top) */}
                <animated.mesh position={[0, args[2] / 2 + 0.1, 0]} rotation-y={springs.rotY}>
                    <cylinderGeometry args={[args[0] * 0.7, args[0] * 0.7, 0.2, 32]} />
                    <meshStandardMaterial
                        color="#8AAEC0"
                        metalness={0.8}
                        roughness={0.2}
                    />
                </animated.mesh>
            </Float>
        </animated.group>
    );
}

// Scene lighting with spotlights
function Lighting({ activeIndex }) {
    return (
        <>
            <ambientLight intensity={0.3} />

            {/* Spotlight for each product position */}
            <SpotLight
                position={[-3, 5, 3]}
                angle={0.3}
                penumbra={0.8}
                intensity={activeIndex === 0 ? 3 : 1}
                color="#8AAEC0"
                castShadow
            />
            <SpotLight
                position={[0, 5, 3]}
                angle={0.3}
                penumbra={0.8}
                intensity={activeIndex === 1 ? 3 : 1}
                color="#3C7795"
                castShadow
            />
            <SpotLight
                position={[3, 5, 3]}
                angle={0.3}
                penumbra={0.8}
                intensity={activeIndex === 2 ? 3 : 1}
                color="#1E5672"
                castShadow
            />

            {/* Rim light from behind */}
            <pointLight position={[0, 3, -5]} intensity={0.5} color="#3C7795" />
        </>
    );
}

// Floor/Stage
function Stage() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial
                color="#050505"
                metalness={0.8}
                roughness={0.3}
            />
        </mesh>
    );
}

// Main 3D Scene
function Scene({ activeIndex, setActiveIndex }) {
    return (
        <>
            <Lighting activeIndex={activeIndex} />
            <Stage />

            {/* Products */}
            <group position={[0, -0.5, 0]}>
                {PRODUCTS.map((product) => (
                    <Product
                        key={product.id}
                        product={product}
                        isActive={activeIndex === product.id}
                        activeIndex={activeIndex}
                        onClick={(id) => setActiveIndex(activeIndex === id ? null : id)}
                    />
                ))}
            </group>

            {/* Environment for reflections */}
            <Environment preset="night" />

            {/* Post-processing */}
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.3}
                    luminanceSmoothing={0.9}
                    intensity={0.8}
                    mipmapBlur
                />
            </EffectComposer>
        </>
    );
}

export default function MySpacePage() {
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Get skin type from navigation state (if passed from Analysis page)
    const skinType = location.state?.skinType;

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3C7795]/10 rounded-full blur-[200px] pointer-events-none" />

            {/* UI Overlay - Top */}
            <div className="absolute top-0 left-0 right-0 z-20 pt-24 px-6 md:px-12">
                <div className="max-w-screen-xl mx-auto">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-[#8AAEC0]/60 hover:text-[#8AAEC0] text-sm uppercase tracking-widest transition-colors mb-6"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        돌아가기
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="text-sm font-bold tracking-[0.2em] text-[#3C7795] uppercase mb-2">
                            Your Private Curations
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                            나만의 공간
                        </h1>
                        {skinType && (
                            <p className="text-lg text-[#8AAEC0]/70">
                                {skinType.aura_keyword} 타입을 위한 맞춤 추천
                            </p>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [0, 1, 8], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: false }}
                onCreated={({ gl }) => gl.setClearColor('#000000')}
                shadows
            >
                <Suspense fallback={null}>
                    <Scene activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                </Suspense>
            </Canvas>

            {/* Product Info Overlay - Bottom */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-0 left-0 right-0 z-20 pb-8 px-6 md:px-12"
            >
                <div className="max-w-screen-xl mx-auto">
                    {/* Product Pills */}
                    <div className="flex justify-center gap-4 mb-6">
                        {PRODUCTS.map((product, index) => (
                            <button
                                key={product.id}
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeIndex === index
                                        ? 'bg-[#3C7795] text-white shadow-[0_0_20px_rgba(60,119,149,0.5)]'
                                        : 'bg-[#8AAEC0]/10 text-[#8AAEC0]/70 hover:bg-[#8AAEC0]/20 hover:text-[#8AAEC0]'
                                    }`}
                            >
                                {product.nameKo}
                            </button>
                        ))}
                    </div>

                    {/* Hint Text */}
                    <p className="text-center text-sm text-[#8AAEC0]/40">
                        제품을 클릭하여 자세히 보기
                    </p>
                </div>
            </motion.div>

            {/* Active Product Detail Card */}
            {activeIndex !== null && (
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20"
                >
                    <div className="bg-[#1E5672]/20 backdrop-blur-xl border border-[#8AAEC0]/20 rounded-2xl p-6 max-w-xs">
                        <p className="text-sm text-[#3C7795] uppercase tracking-wider font-bold mb-2">
                            {PRODUCTS[activeIndex].name}
                        </p>
                        <h3 className="text-2xl font-bold text-white mb-4">
                            {PRODUCTS[activeIndex].nameKo}
                        </h3>
                        <p className="text-sm text-[#8AAEC0]/70 leading-relaxed mb-6">
                            당신의 피부 타입에 맞춤 설계된 프리미엄 제품입니다.
                        </p>
                        <button
                            onClick={() => navigate('/shop')}
                            className="w-full px-6 py-3 bg-gradient-to-r from-[#3C7795] to-[#8AAEC0] text-black font-semibold rounded-full hover:shadow-[0_0_20px_rgba(60,119,149,0.5)] transition-all"
                        >
                            상품 보기
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
