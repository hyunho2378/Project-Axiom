import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import EvolvingBlob, { EvolvingParticles } from '../components/EvolvingBlob';
import Scene3D from '../components/Scene3D';
import { questions } from '../data/questions';

// 🔥 HARDCODED PRODUCTION URL
const API_URL = "https://project-axiom.onrender.com";

/**
 * AI Skin Analysis Page with Demographics Collection
 * Flow: intro → gender → age → quiz → result
 */

// Skin Types
const SKIN_TYPES = {
    OILY_SENSITIVE: { code: "OS", title: "Oily-Sensitive", titleKo: "지성-민감성", emoji: "💧", descriptionKo: "피지 분비가 많고 자극에 민감합니다.", color: "#FF7043" },
    OILY_RESILIENT: { code: "OR", title: "Oily-Resilient", titleKo: "지성-저항성", emoji: "💧", descriptionKo: "피지 분비가 많지만 피부가 튼튼합니다.", color: "#3C7795" },
    DRY_SENSITIVE: { code: "DS", title: "Dry-Sensitive", titleKo: "건성-민감성", emoji: "🌙", descriptionKo: "수분이 부족하고 쉽게 자극받습니다.", color: "#FFAB91" },
    DRY_RESILIENT: { code: "DR", title: "Dry-Resilient", titleKo: "건성-저항성", emoji: "🌙", descriptionKo: "수분이 부족하지만 피부가 안정적입니다.", color: "#8AAEC0" }
};

// Demographics Options
const GENDER_OPTIONS = [
    { value: 'male', label: '남성', labelEn: 'Male', icon: '👨' },
    { value: 'female', label: '여성', labelEn: 'Female', icon: '👩' },
    { value: 'other', label: '기타', labelEn: 'Other', icon: '🧑' }
];

const AGE_OPTIONS = [
    { value: '10s', label: '10대', labelEn: 'Teens', icon: '🌱' },
    { value: '20s', label: '20대', labelEn: '20s', icon: '✨' },
    { value: '30s', label: '30대', labelEn: '30s', icon: '💫' },
    { value: '40s', label: '40대', labelEn: '40s', icon: '🌟' },
    { value: '50+', label: '50대 이상', labelEn: '50+', icon: '⭐' }
];

// Analysis Engine
function analyzeSkin(answers) {
    let oilScore = 0, sensScore = 0, oilMax = 0, sensMax = 0;
    questions.forEach(q => {
        const score = answers[q.id] ?? 0;
        if (q.type === 'oiliness') { oilScore += score; oilMax += 10; }
        else if (q.type === 'sensitivity') { sensScore += score; sensMax += 10; }
    });
    const oilPercent = oilMax > 0 ? Math.round((oilScore / oilMax) * 100) : 0;
    const sensPercent = sensMax > 0 ? Math.round((sensScore / sensMax) * 100) : 0;
    const isOily = oilPercent > 50, isSensitive = sensPercent > 50;
    let skinType;
    if (isOily && isSensitive) skinType = SKIN_TYPES.OILY_SENSITIVE;
    else if (isOily) skinType = SKIN_TYPES.OILY_RESILIENT;
    else if (isSensitive) skinType = SKIN_TYPES.DRY_SENSITIVE;
    else skinType = SKIN_TYPES.DRY_RESILIENT;
    return { oilScore: oilPercent, sensScore: sensPercent, skinType, isOily, isSensitive };
}

// 3D Scene
function SphereScene({ step }) {
    return (
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: false }} onCreated={({ gl }) => gl.setClearColor('#000000')}>
            <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#3C7795" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#8AAEC0" />
                <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} color="#00E0FF" />
                <Environment preset="night" />
                <EvolvingBlob step={step} />
                <EvolvingParticles step={step} count={50} />
                <EffectComposer><Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.8 + (step / 10) * 0.6} mipmapBlur /></EffectComposer>
            </Suspense>
        </Canvas>
    );
}

// Progress Bar
function ProgressBar({ current, total }) {
    return (
        <div className="w-full mb-6">
            <div className="flex justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest text-[#3C7795] font-sans">Progress</span>
                <span className="text-xs text-[#8AAEC0]/60 font-sans">{current + 1}/{total}</span>
            </div>
            <div className="w-full h-[2px] bg-[#8AAEC0]/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-[#1E5672] to-[#00E0FF]" initial={{ width: 0 }} animate={{ width: `${((current + 1) / total) * 100}%` }} transition={{ duration: 0.4 }} />
            </div>
        </div>
    );
}

// Loading Screen
function LoadingScreen() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 flex items-center justify-center">
            <div className="text-center">
                <motion.div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-[#3C7795]/30 border-t-[#00E0FF]" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                <p className="text-sm text-[#8AAEC0]/70 font-sans">AI 분석 중...</p>
            </div>
        </div>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function Analysis() {
    const navigate = useNavigate();

    // 🔥 PHASE CONTROL: intro → gender → age → quiz → result
    const [quizPhase, setQuizPhase] = useState('intro');

    // 🔥 USER DEMOGRAPHICS
    const [userInfo, setUserInfo] = useState({ gender: null, age: null });

    // Quiz States
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [aiAdvice, setAiAdvice] = useState(null);

    // Defensive check
    if (!questions || questions.length === 0) {
        return <div className="min-h-screen bg-black text-white pt-32 text-center font-sans">데이터 로딩 중...</div>;
    }

    const totalQuestions = questions.length;
    const safeIndex = Math.max(0, Math.min(currentQuestion, totalQuestions - 1));
    const currentQ = questions[safeIndex];

    // 🔥 HANDLE DEMOGRAPHIC SELECTION
    const handleDemographic = (key, value) => {
        console.log(`📝 Setting ${key}:`, value);
        setUserInfo(prev => ({ ...prev, [key]: value }));

        // Auto-advance to next phase
        setTimeout(() => {
            if (key === 'gender') setQuizPhase('age');
            if (key === 'age') setQuizPhase('quiz');
        }, 300);
    };

    // 🔥 SAVE TO DATABASE (Merges demographics into answers)
    const saveToDatabase = async (analysisResult, surveyAnswers) => {
        // CRITICAL: Merge userInfo into answers
        const finalData = { ...userInfo, ...surveyAnswers };

        const SUBMIT_URL = `${API_URL}/api/surveys/submit`;
        console.log("🔥🔥🔥 SAVING TO:", SUBMIT_URL);
        console.log("📦 Full Payload (with demographics):", finalData);

        try {
            const saveResponse = await fetch(SUBMIT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    answers: finalData,
                    skinType: analysisResult.skinType.title,
                    scores: { oil: analysisResult.oilScore, sens: analysisResult.sensScore }
                })
            });
            const saveData = await saveResponse.json();
            console.log("✅ DB SAVE RESPONSE:", saveData);

            // Get AI Advice
            const aiResponse = await fetch(`${API_URL}/api/analyze`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oilScore: analysisResult.oilScore,
                    sensScore: analysisResult.sensScore,
                    skinType: analysisResult.skinType.title
                })
            });
            const aiData = await aiResponse.json();
            return aiData.success ? aiData.advice : { headline: "피부 관리 팁", advice: "피부 타입에 맞는 제품을 사용하세요." };

        } catch (error) {
            console.error("❌ API ERROR:", error);
            return { headline: "피부 관리 팁", advice: "피부 타입에 맞는 제품을 사용하세요." };
        }
    };

    // Handle Quiz Option Select
    const handleOptionSelect = async (option, index) => {
        if (isAnimating) return;
        setSelectedOption(index);
        setIsAnimating(true);
        const newAnswers = { ...answers, [currentQ.id]: option.score };
        setAnswers(newAnswers);

        setTimeout(async () => {
            if (safeIndex < totalQuestions - 1) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedOption(null);
            } else {
                setIsLoading(true);
                const analysisResult = analyzeSkin(newAnswers);
                setResult(analysisResult);

                console.log("🏁 Quiz Finished. Saving with demographics:", userInfo);
                const advice = await saveToDatabase(analysisResult, newAnswers);
                setAiAdvice(advice);

                setQuizPhase('result');
                setIsLoading(false);
            }
            setIsAnimating(false);
        }, 400);
    };

    const handleRestart = () => {
        setQuizPhase('intro');
        setUserInfo({ gender: null, age: null });
        setCurrentQuestion(0);
        setAnswers({});
        setSelectedOption(null);
        setResult(null);
        setAiAdvice(null);
    };

    // 🔥 UNIVERSAL BACK HANDLER
    const handleBack = () => {
        if (quizPhase === 'age') setQuizPhase('gender');
        else if (quizPhase === 'gender') setQuizPhase('intro');
        else if (quizPhase === 'quiz') {
            if (currentQuestion > 0) setCurrentQuestion(prev => prev - 1);
            else setQuizPhase('age'); // Q1 goes back to Age
        }
    };

    // ============================================
    // RENDER: INTRO PHASE
    // ============================================
    if (quizPhase === 'intro') {
        return (
            <div className="min-h-screen bg-black text-white pt-32">
                <div className="flex flex-col md:flex-row min-h-[calc(100vh-128px)]">
                    <div className="h-[35vh] md:h-auto md:w-1/2 flex items-center justify-center p-4">
                        <div className="w-full h-full max-w-[80%] max-h-[50vh]"><SphereScene step={0} /></div>
                    </div>
                    <div className="flex-1 md:w-1/2 flex items-center justify-center px-6 py-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md text-center md:text-left">
                            <p className="text-[10px] uppercase tracking-widest text-[#3C7795] mb-4 font-sans">AI Skin Analysis</p>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-sans">Decode Your <span className="text-[#3C7795]">Skin</span></h1>
                            <p className="text-base text-[#8AAEC0]/70 mb-8 font-sans" style={{ wordBreak: 'keep-all' }}>몇 가지 질문으로 피부 타입을 분석하고 맞춤 조언을 받으세요.</p>
                            <motion.button
                                onClick={() => setQuizPhase('gender')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-3 text-sm font-semibold text-black bg-gradient-to-r from-[#3C7795] to-[#8AAEC0] rounded-full font-sans"
                            >
                                분석 시작
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>
        );
    }

    // ============================================
    // RENDER: GENDER SELECTION PHASE (Matches Quiz UI)
    // ============================================
    if (quizPhase === 'gender') {
        return (
            <div className="min-h-screen bg-black pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-80px)]">
                    <div className="relative flex items-center justify-center">
                        <SphereScene step={0} />
                    </div>
                    <div className="flex flex-col justify-center px-6 md:px-12">
                        <div className="max-w-lg mx-auto w-full">
                            <p className="text-[11px] uppercase tracking-[0.3em] text-[#3C7795] font-sans mb-4">
                                Step 1 of 2
                            </p>

                            <h2 className="text-3xl font-bold text-white mb-8 leading-snug">
                                성별을 선택해주세요
                            </h2>

                            <div className="space-y-3">
                                {['남성', '여성'].map((genderOption, i) => (
                                    <motion.button
                                        key={genderOption}
                                        onClick={() => handleDemographic('gender', genderOption)}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08, duration: 0.3 }}
                                        whileHover={{ scale: 1.01, backgroundColor: 'rgba(30, 86, 114, 0.1)', borderColor: 'rgba(60, 119, 149, 0.3)' }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full p-5 text-left rounded-2xl border transition-all duration-300 bg-[#8AAEC0]/5 border-[#8AAEC0]/15 group"
                                    >
                                        <span className="text-[#8AAEC0] group-hover:text-white transition-colors font-sans">
                                            {genderOption}
                                        </span>
                                    </motion.button>
                                ))}
                            </div>

                            <button
                                onClick={handleBack}
                                className="mt-8 text-sm text-[#8AAEC0]/40 hover:text-[#8AAEC0] transition-colors font-sans flex items-center gap-2"
                            >
                                ← 이전으로
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ============================================
    // RENDER: AGE SELECTION PHASE (Matches Quiz UI)
    // ============================================
    if (quizPhase === 'age') {
        const ageOptions = ['10대', '20대', '30대', '40대', '50대 이상'];

        return (
            <div className="min-h-screen bg-black pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-80px)]">
                    <div className="relative flex items-center justify-center">
                        <SphereScene step={1} />
                    </div>
                    <div className="flex flex-col justify-center px-6 md:px-12">
                        <div className="max-w-lg mx-auto w-full">
                            <p className="text-[11px] uppercase tracking-[0.3em] text-[#3C7795] font-sans mb-4">
                                Step 2 of 2
                            </p>

                            <h2 className="text-3xl font-bold text-white mb-8 leading-snug">
                                연령대를 선택해주세요
                            </h2>

                            <div className="grid grid-cols-1 gap-3">
                                {ageOptions.map((ageOption, i) => (
                                    <motion.button
                                        key={ageOption}
                                        onClick={() => handleDemographic('age', ageOption)}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08, duration: 0.3 }}
                                        whileHover={{ scale: 1.01, backgroundColor: 'rgba(30, 86, 114, 0.1)', borderColor: 'rgba(60, 119, 149, 0.3)' }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full p-5 text-left rounded-2xl border transition-all duration-300 bg-[#8AAEC0]/5 border-[#8AAEC0]/15 group"
                                    >
                                        <span className="text-[#8AAEC0] group-hover:text-white transition-colors font-sans">
                                            {ageOption}
                                        </span>
                                    </motion.button>
                                ))}
                            </div>

                            <button
                                onClick={handleBack}
                                className="mt-8 text-sm text-[#8AAEC0]/40 hover:text-[#8AAEC0] transition-colors font-sans flex items-center gap-2"
                            >
                                ← 이전으로
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ============================================
    // RENDER: LOADING
    // ============================================
    if (isLoading) return <LoadingScreen />;

    // ============================================
    // RENDER: RESULT PHASE
    // ============================================
    if (quizPhase === 'result' && result && aiAdvice) {
        // Mock recommended products with marketing elements
        const recommendedProducts = [
            { id: 1, name: '시카 진정 토너', brand: 'AXIOM', price: 28000, originalPrice: 31000, likes: 2847, isHit: true, image: '/images/product-toner.jpg' },
            { id: 2, name: '히알루론산 수분 세럼', brand: 'AXIOM', price: 35000, originalPrice: 39000, likes: 4102, isHit: true, image: '/images/product-serum.jpg' },
            { id: 3, name: '저자극 클렌징 폼', brand: 'AXIOM', price: 18000, originalPrice: 20000, likes: 1523, isHit: false, image: '/images/product-cleanser.jpg' },
            { id: 4, name: '세라마이드 장벽 크림', brand: 'AXIOM', price: 42000, originalPrice: 47000, likes: 3289, isHit: true, image: '/images/product-cream.jpg' },
        ];

        return (
            <div className="min-h-screen bg-black text-white pt-20 pb-16">
                {/* 🔥 TOP: 3D PERSONAL SPACE MODEL - BIG AND FRONT-FACING */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-[50vh] md:h-[60vh] mb-8"
                >
                    <Scene3D
                        modelUrl="/models/axiom-personal-space.glb"
                        height="100%"
                        scale={3.5}
                        position={[0, -0.5, 0]}
                        rotation={[0, 0, 0]}
                        isFixed={true}
                        cameraPos={[0, 0, 8]}
                        fov={30}
                    />
                </motion.div>

                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    {/* Header Section with Skin Type */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mb-8"
                    >
                        <p className="text-[10px] uppercase tracking-widest text-[#3C7795] mb-3 font-sans">Analysis Complete</p>
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div
                                className="w-14 h-14 rounded-full flex items-center justify-center border shrink-0"
                                style={{ borderColor: result.skinType.color, background: `linear-gradient(135deg, ${result.skinType.color}30, transparent)` }}
                            >
                                <span className="text-2xl">{result.skinType.emoji}</span>
                            </div>
                            <div className="text-left">
                                <h1 className="text-2xl md:text-3xl font-bold font-sans">{result.skinType.titleKo}</h1>
                                <p className="text-sm text-[#8AAEC0]/60 font-sans">{result.skinType.title}</p>
                            </div>
                        </div>
                        <p className="text-sm text-[#8AAEC0]/70 font-sans max-w-md mx-auto" style={{ wordBreak: 'keep-all' }}>
                            {result.skinType.descriptionKo}
                        </p>
                    </motion.div>

                    {/* Score Bars */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 mb-6 max-w-md mx-auto"
                    >
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <div className="flex justify-between text-xs mb-1.5 font-sans">
                                    <span className="text-[#8AAEC0]/50">유분도</span>
                                    <span className="text-[#8AAEC0]">{result.oilScore}%</span>
                                </div>
                                <div className="h-1.5 bg-[#8AAEC0]/20 rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-[#3C7795] rounded-full" initial={{ width: 0 }} animate={{ width: `${result.oilScore}%` }} transition={{ duration: 0.8 }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1.5 font-sans">
                                    <span className="text-[#8AAEC0]/50">민감도</span>
                                    <span className="text-[#8AAEC0]">{result.sensScore}%</span>
                                </div>
                                <div className="h-1.5 bg-[#8AAEC0]/20 rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-[#FF7043] rounded-full" initial={{ width: 0 }} animate={{ width: `${result.sensScore}%` }} transition={{ duration: 0.8, delay: 0.2 }} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* AI Advice Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#1E5672]/20 border border-[#3C7795]/30 rounded-2xl p-5 mb-10 max-w-2xl mx-auto"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#3C7795] to-[#00E0FF] flex items-center justify-center text-xs">💡</div>
                            <p className="text-[10px] uppercase tracking-widest text-[#3C7795] font-sans">AI 맞춤 조언</p>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 font-sans" style={{ wordBreak: 'keep-all' }}>{aiAdvice.headline}</h3>
                        <p className="text-sm text-[#8AAEC0]/80 font-sans leading-relaxed" style={{ wordBreak: 'keep-all' }}>{aiAdvice.advice}</p>
                    </motion.div>

                    {/* 🔥 MUSINSA-STYLE PRODUCT GRID */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-12"
                    >
                        <h2 className="text-xl font-bold mb-6 font-sans text-center">
                            <span className="text-[#3C7795]">{result.skinType.titleKo}</span>를 위한 추천 제품
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            {recommendedProducts.map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + idx * 0.1 }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group cursor-pointer hover:border-[#3C7795]/50 transition-all"
                                >
                                    {/* Product Image */}
                                    <div className="relative aspect-square bg-gradient-to-br from-[#1E5672]/30 to-[#3C7795]/10">
                                        {/* Badges */}
                                        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                                            <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded">
                                                10% OFF
                                            </span>
                                            {product.isHit && (
                                                <span className="px-2 py-0.5 text-[10px] font-bold text-black bg-[#00E0FF] rounded">
                                                    2025 Hit
                                                </span>
                                            )}
                                        </div>
                                        {/* Like Button */}
                                        <div className="absolute top-2 right-2 z-10">
                                            <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white/70 hover:text-red-400 transition-colors">
                                                ♥
                                            </div>
                                        </div>
                                        {/* Placeholder Image */}
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-4xl opacity-30">📦</span>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-3">
                                        <p className="text-[10px] text-[#8AAEC0]/50 font-sans mb-0.5">{product.brand}</p>
                                        <h3 className="text-sm font-medium text-white/90 font-sans mb-2 line-clamp-2 group-hover:text-[#00E0FF] transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="text-sm font-bold text-[#00E0FF] font-sans">
                                                {product.price.toLocaleString()}원
                                            </span>
                                            <span className="text-xs text-[#8AAEC0]/40 line-through font-sans">
                                                {product.originalPrice.toLocaleString()}원
                                            </span>
                                        </div>
                                        <div className="flex items-center text-[10px] text-[#8AAEC0]/50 font-sans">
                                            <span className="text-red-400 mr-1">♥</span>
                                            {product.likes.toLocaleString()}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 🔥 GLOSSARY SECTION */}
                    {aiAdvice.glossary && aiAdvice.glossary.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="mb-10 max-w-2xl mx-auto"
                        >
                            <div className="border-t border-[#8AAEC0]/10 pt-6">
                                <h3 className="text-sm font-semibold text-[#8AAEC0]/70 mb-4 font-sans flex items-center gap-2">
                                    <span>📖</span> 성분 용어 설명
                                </h3>
                                <div className="space-y-3">
                                    {aiAdvice.glossary.map((item, idx) => (
                                        <div key={idx} className="flex gap-3 text-sm">
                                            <span className="text-[#3C7795] font-medium font-sans whitespace-nowrap">
                                                {item.term}
                                            </span>
                                            <span className="text-[#8AAEC0]/60 font-sans">
                                                {item.definition}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="max-w-md mx-auto space-y-3"
                    >
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/shop')}
                                className="flex-1 py-3 text-sm font-semibold text-black bg-gradient-to-r from-[#3C7795] to-[#8AAEC0] rounded-full font-sans hover:opacity-90 transition-opacity"
                            >
                                전체 상품 보기
                            </button>
                            <button
                                onClick={handleRestart}
                                className="flex-1 py-3 text-sm font-medium text-[#8AAEC0] bg-[#8AAEC0]/10 border border-[#8AAEC0]/30 rounded-full font-sans hover:bg-[#8AAEC0]/20 transition-colors"
                            >
                                다시하기
                            </button>
                        </div>
                        <button
                            onClick={() => navigate('/my-space', { state: { skinType: result.skinType } })}
                            className="w-full py-3 text-sm font-semibold text-white bg-[#1E5672]/40 border border-[#8AAEC0]/30 rounded-full font-sans hover:bg-[#1E5672]/60 transition-colors"
                        >
                            나만의 공간 보러가기 →
                        </button>
                    </motion.div>
                </div>
            </div>
        );
    }

    // ============================================
    // RENDER: QUIZ PHASE
    // ============================================
    return (
        <div className="min-h-screen bg-black text-white pt-32">
            <div className="flex flex-col md:flex-row min-h-[calc(100vh-128px)]">
                <div className="h-[30vh] md:h-auto md:w-1/2 flex items-center justify-center p-4">
                    <div className="w-full h-full max-w-[80%] max-h-[50vh]"><SphereScene step={safeIndex + 3} /></div>
                </div>
                <div className="flex-1 md:w-1/2 flex flex-col justify-center px-6 py-8">
                    <div className="max-w-lg mx-auto w-full">
                        <ProgressBar current={safeIndex} total={totalQuestions} />
                        <AnimatePresence mode="wait">
                            <motion.div key={safeIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mb-6">
                                <p className="text-[10px] uppercase tracking-widest text-[#3C7795] mb-3 font-sans">{currentQ.type === 'oiliness' ? '유분 분석' : '민감도 분석'}</p>
                                <h2 className="text-xl md:text-2xl font-bold font-sans leading-relaxed" style={{ wordBreak: 'keep-all' }}>{currentQ.question}</h2>
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                            <motion.div key={`opts-${safeIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                                {currentQ.options.map((opt, i) => (
                                    <motion.button key={i} onClick={() => handleOptionSelect(opt, i)} disabled={isAnimating} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                                        className={`w-full p-4 text-left rounded-xl transition-all font-sans ${selectedOption === i ? 'bg-gradient-to-r from-[#1E5672] to-[#3C7795] border border-[#3C7795]' : 'bg-white/5 border border-white/10 hover:bg-[#1E5672]/20'}`}>
                                        <span className="text-sm text-[#8AAEC0]" style={{ wordBreak: 'keep-all' }}>{opt.text}</span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                        {/* 🔥 BACK BUTTON - Goes to previous question or Age screen */}
                        <button
                            onClick={handleBack}
                            className="mt-8 text-sm text-[#8AAEC0]/40 hover:text-[#8AAEC0] transition-colors font-sans flex items-center gap-2"
                        >
                            ← 이전으로
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
