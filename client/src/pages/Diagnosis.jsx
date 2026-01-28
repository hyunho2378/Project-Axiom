import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import EvolvingBlob, { EvolvingParticles } from '../components/EvolvingBlob';
import { QUESTIONS, generateResult } from '../data/questions';
import { API_URL } from '../config/api';

/**
 * Diagnosis Page - Split Screen Layout with Evolving 3D Blob
 * 
 * LAYOUT:
 * - Desktop: Left (50% sticky 3D) | Right (50% scrollable UI)
 * - Mobile: Stacked (Top 3D, Bottom UI)
 * 
 * 3D EVOLUTION:
 * - Blob evolves through 11 stages (0-10) as questions are answered
 * - Uses procedural MeshDistortMaterial (no external models)
 * 
 * COLORS:
 * - #000000 (Black Background)
 * - #8AAEC0 (Mist Text)
 * - #3C7795 (Cyan Accent)
 */

// 3D Scene with Evolving Blob
function BlobScene({ step }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            onCreated={({ gl }) => gl.setClearColor('#000000')}
        >
            <Suspense fallback={null}>
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#3C7795" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#8AAEC0" />
                <spotLight
                    position={[0, 10, 0]}
                    angle={0.5}
                    penumbra={1}
                    intensity={2}
                    color="#00E0FF"
                    castShadow={false}
                />

                {/* Environment for reflections */}
                <Environment preset="night" />

                {/* The Evolving Blob */}
                <EvolvingBlob step={step} />

                {/* Orbiting Particles */}
                <EvolvingParticles step={step} count={60} />

                {/* Post-processing bloom */}
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                        intensity={0.8 + (step / 10) * 0.8}
                        mipmapBlur
                    />
                </EffectComposer>
            </Suspense>
        </Canvas>
    );
}

// Progress indicator component
function ProgressBar({ current, total }) {
    const progress = ((current + 1) / total) * 100;

    return (
        <div className="w-full mb-8">
            <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#3C7795] font-sans">
                    Progress
                </span>
                <span className="text-sm text-[#8AAEC0]/60 font-sans">
                    {current + 1} / {total}
                </span>
            </div>
            <div className="w-full h-[2px] bg-[#8AAEC0]/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-[#1E5672] via-[#3C7795] to-[#00E0FF]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
}

export default function Diagnosis() {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({}); // { q1: score, q2: score, ... }
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [resultType, setResultType] = useState(null);
    const [isStarted, setIsStarted] = useState(false);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    const totalQuestions = QUESTIONS.length;

    // Calculate Result using new 20-type engine
    const calculateResult = () => {
        return generateResult(answers);
    };

    // Save result to API (Guest Survey - No Login Required)
    const saveResultToAPI = async (result, surveyAnswers) => {
        setIsSaving(true);
        try {
            // Save to Guest Survey endpoint (Supabase persistence)
            const surveyResponse = await fetch(`${API_URL}/api/surveys/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    answers: surveyAnswers,
                    skinType: result.title,
                    scores: result.scores
                })
            });
            const surveyData = await surveyResponse.json();
            if (surveyData.success) {
                console.log('✅ Survey saved permanently:', surveyData.data.id);
            }

            // Also call diagnosis endpoint for recommendations
            const response = await fetch(`${API_URL}/api/diagnosis`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    resultType: result.title,
                    auraKeyword: result.aura_keyword,
                    axis: result.axis.code,
                    sensitivity: result.sensitivity.code,
                    scores: result.scores
                })
            });
            const data = await response.json();
            if (data.success && data.data.recommendedProducts) {
                setRecommendedProducts(data.data.recommendedProducts);
            }
        } catch (error) {
            console.error('Failed to save diagnosis result:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleOptionSelect = (option, index) => {
        if (isAnimating) return;
        setSelectedOption(index);
        setIsAnimating(true);

        const currentQ = QUESTIONS[currentQuestion];

        // Store answer with score
        setAnswers(prev => ({
            ...prev,
            [currentQ.id]: option.score
        }));

        setTimeout(() => {
            if (currentQuestion < totalQuestions - 1) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedOption(null);
            } else {
                // Calculate final result using new engine
                const updatedAnswers = { ...answers, [currentQ.id]: option.score };
                const result = generateResult(updatedAnswers);
                setResultType(result);
                setShowResult(true);
                saveResultToAPI(result, updatedAnswers);
            }
            setIsAnimating(false);
        }, 600);
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setSelectedOption(null);
        setShowResult(false);
        setResultType(null);
        setIsStarted(false);
        setRecommendedProducts([]);
    };

    // ========================================
    // INTRO SCREEN - Split Layout
    // ========================================
    if (!isStarted) {
        return (
            <div className="min-h-screen bg-black pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
                    {/* Left: 3D Blob (Stage 0 - Dormant) - Seamless, No Borders */}
                    <div className="relative h-[50vh] lg:h-[calc(100vh-80px)] flex items-center justify-center">
                        <BlobScene step={0} />
                        {/* Overlay gradient for mobile */}
                        <div className="lg:hidden absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
                    </div>

                    {/* Right: Intro Content */}
                    <div className="flex items-center justify-center px-6 md:px-12 py-16 lg:py-0">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-md"
                        >
                            <p className="text-[11px] uppercase tracking-[0.4em] text-[#3C7795] font-sans mb-6">
                                AI Skin Analysis
                            </p>
                            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                                Discover<br />
                                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3C7795] to-[#8AAEC0]">Axis</span>
                            </h1>
                            <p className="font-sans text-lg text-[#8AAEC0]/70 leading-relaxed mb-10" style={{ wordBreak: 'keep-all' }}>
                                10가지 질문을 통해 당신만의 피부 타입과 맞춤형 케어 솔루션을 찾아보세요.
                                AI가 분석한 결과를 3D로 시각화합니다.
                            </p>

                            <motion.button
                                onClick={() => setIsStarted(true)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center px-10 py-4 font-sans text-base font-semibold text-black bg-gradient-to-r from-[#3C7795] to-[#8AAEC0] rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(60,119,149,0.5)]"
                            >
                                Start Analysis
                            </motion.button>

                            <p className="font-sans text-sm text-[#8AAEC0]/40 mt-6">
                                약 2-3분 소요
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        );
    }

    // ========================================
    // RESULT SCREEN - Split Layout with Final Evolution
    // ========================================
    if (showResult && resultType) {
        return (
            <div className="min-h-screen bg-black pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
                    {/* Left: 3D Blob (Stage 10 - Full Evolution) - Seamless, No Borders */}
                    <div className="relative h-[50vh] lg:h-[calc(100vh-80px)] flex items-center justify-center">
                        <BlobScene step={10} />
                        <div className="lg:hidden absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
                    </div>

                    {/* Right: Result Content */}
                    <div className="flex items-start justify-center px-6 md:px-12 py-16 lg:py-24 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="max-w-md w-full"
                        >
                            <p className="text-[11px] uppercase tracking-[0.4em] text-[#3C7795] font-sans mb-4">
                                Your Skin Axis
                            </p>

                            {/* Aura Badge */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.8, delay: 0.5 }}
                                className="relative w-24 h-24 mb-8"
                            >
                                <div
                                    className="absolute inset-0 rounded-full blur-xl"
                                    style={{ background: 'radial-gradient(circle, rgba(0,224,255,0.3) 0%, transparent 70%)' }}
                                />
                                <div className="relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-[#1E5672] to-[#3C7795] border border-[#3C7795]">
                                    <span className="text-2xl font-bold text-white">
                                        {resultType.aura_keyword.charAt(0)}
                                    </span>
                                </div>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="font-sans text-3xl md:text-4xl font-bold text-white mb-2"
                            >
                                {resultType.title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9 }}
                                className="font-sans text-lg text-[#3C7795] mb-6"
                            >
                                {resultType.titleKo}
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.1 }}
                                className="font-sans text-base text-[#8AAEC0]/70 leading-relaxed mb-8"
                                style={{ wordBreak: 'keep-all' }}
                            >
                                {resultType.description}
                            </motion.p>

                            {/* Score Display - Axis & Sensitivity */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.3 }}
                                className="bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 mb-8 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15)]"
                            >
                                <p className="text-[10px] uppercase tracking-[0.25em] text-[#3C7795] font-sans mb-4">
                                    Analysis Breakdown
                                </p>
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Axis Score */}
                                    <div>
                                        <p className="text-[10px] text-[#8AAEC0]/50 uppercase mb-2">Skin Type (Axis)</p>
                                        <p className="text-xl font-bold text-white mb-1">{resultType.axis.label}</p>
                                        <div className="w-full h-1 bg-[#8AAEC0]/20 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#3C7795] rounded-full"
                                                style={{ width: `${(resultType.scores.axisScore / resultType.scores.axisMax) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    {/* Sensitivity Score */}
                                    <div>
                                        <p className="text-[10px] text-[#8AAEC0]/50 uppercase mb-2">Sensitivity</p>
                                        <p className={`text-xl font-bold mb-1 ${resultType.sensitivity.pulse ? 'text-[#FF7043]' : 'text-white'}`}>
                                            {resultType.sensitivity.prefix}
                                        </p>
                                        <div className="w-full h-1 bg-[#8AAEC0]/20 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${resultType.sensitivity.pulse ? 'bg-[#FF7043]' : 'bg-[#8AAEC0]'}`}
                                                style={{ width: `${(resultType.scores.sensScore / resultType.scores.sensMax) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Recommended Products */}
                            {recommendedProducts.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.4 }}
                                    className="mb-10"
                                >
                                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#3C7795] font-sans mb-4">
                                        Curated For You
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {recommendedProducts.map((product, index) => (
                                            <motion.button
                                                key={product.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 1.5 + index * 0.1 }}
                                                onClick={() => navigate(`/shop/${product.id}`)}
                                                className="bg-[#8AAEC0]/5 backdrop-blur-md border border-[#8AAEC0]/15 rounded-xl p-4 text-left hover:bg-[#1E5672]/20 hover:border-[#3C7795]/50 transition-all"
                                            >
                                                <div className="w-full h-16 bg-[#8AAEC0]/10 rounded-lg mb-3 flex items-center justify-center">
                                                    <span className="text-xl">✨</span>
                                                </div>
                                                <p className="text-sm font-medium text-[#8AAEC0] truncate">
                                                    {product.nameKo || product.name}
                                                </p>
                                                <p className="text-xs text-[#8AAEC0]/50 mt-1">
                                                    ₩{product.price?.toLocaleString()}
                                                </p>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {isSaving && (
                                <p className="font-sans text-sm text-[#8AAEC0]/50 mb-4">
                                    분석 결과 저장 중...
                                </p>
                            )}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="space-y-4"
                            >
                                {/* Primary Buttons Row */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => navigate('/shop')}
                                        className="flex-1 px-8 py-4 font-sans text-base font-semibold text-black bg-gradient-to-r from-[#3C7795] to-[#8AAEC0] rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(60,119,149,0.4)]"
                                    >
                                        맞춤 상품 보러가기
                                    </button>
                                    <button
                                        onClick={handleRestart}
                                        className="flex-1 px-8 py-4 font-sans text-base font-medium text-[#8AAEC0] bg-[#8AAEC0]/10 border border-[#8AAEC0]/30 rounded-full transition-all duration-300 hover:bg-[#8AAEC0]/20"
                                    >
                                        다시하기
                                    </button>
                                </div>

                                {/* My Space CTA - Premium Full Width */}
                                <button
                                    onClick={() => navigate('/my-space', { state: { skinType: resultType } })}
                                    className="w-full px-8 py-4 font-sans text-base font-semibold text-white bg-gradient-to-r from-[#1E5672] via-[#3C7795] to-[#1E5672] border border-[#8AAEC0]/40 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(60,119,149,0.5)] hover:border-[#8AAEC0] group"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        나만의 공간 보러가기
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        );
    }

    // ========================================
    // QUIZ SCREEN - Split Layout with Evolving Blob
    // ========================================
    const currentQ = QUESTIONS[currentQuestion];

    return (
        <div className="min-h-screen bg-black pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
                {/* Left: 3D Blob (Evolution based on currentQuestion) - Seamless, No Borders */}
                <div className="relative h-[40vh] lg:h-[calc(100vh-80px)] flex items-center justify-center">
                    <BlobScene step={currentQuestion} />
                    {/* Mobile gradient overlay */}
                    <div className="lg:hidden absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent" />

                    {/* Stage indicator (desktop only) */}
                    <div className="hidden lg:block absolute bottom-8 left-8">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#8AAEC0]/40 font-sans mb-2">
                            Evolution Stage
                        </p>
                        <p className="text-2xl font-bold text-[#3C7795]">
                            {currentQuestion + 1}<span className="text-[#8AAEC0]/30">/10</span>
                        </p>
                    </div>
                </div>

                {/* Right: Question UI */}
                <div className="flex flex-col justify-center px-6 md:px-12 py-12 lg:py-24">
                    <div className="max-w-lg mx-auto w-full">
                        {/* Progress Bar */}
                        <ProgressBar current={currentQuestion} total={totalQuestions} />

                        {/* Question */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.4 }}
                                className="mb-10"
                            >
                                <h2 className="font-sans text-2xl md:text-3xl font-bold text-white leading-relaxed" style={{ wordBreak: 'keep-all' }}>
                                    {currentQ.question}
                                </h2>
                            </motion.div>
                        </AnimatePresence>

                        {/* Options */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`options-${currentQuestion}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {currentQ.options.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleOptionSelect(option, index)}
                                        disabled={isAnimating}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className={`
                                            w-full p-5 text-left rounded-2xl transition-all duration-300
                                            ${selectedOption === index
                                                ? 'bg-gradient-to-r from-[#1E5672] to-[#3C7795] border border-[#3C7795]'
                                                : 'bg-[#8AAEC0]/5 backdrop-blur-md border border-[#8AAEC0]/15 hover:bg-[#1E5672]/20 hover:border-[#3C7795]/40'
                                            }
                                        `}
                                    >
                                        <span className="font-sans text-base text-[#8AAEC0]" style={{ wordBreak: 'keep-all' }}>
                                            {option.text}
                                        </span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Restart Link */}
                        <div className="mt-10 text-center">
                            <button
                                onClick={handleRestart}
                                className="font-sans text-sm text-[#8AAEC0]/30 hover:text-[#8AAEC0]/60 transition-colors"
                            >
                                처음부터 다시 시작
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
