import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnalysisLoader from '../components/AnalysisLoader';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import EvolvingBlob, { EvolvingParticles, Starfield } from '../components/three/EvolvingBlob';
import { questions } from '../data/questions';
import { getRecommendedProducts, getSkinTypeData } from '../data/axiomData';

const API_URL = "https://project-axiom.onrender.com";

const GENDERS = [
    { value: '여성', ko: '여성', en: 'Female' },
    { value: '남성', ko: '남성', en: 'Male' },
];
const AGES = [
    { value: '10대', ko: '10대', en: 'Teens' },
    { value: '20대', ko: '20대', en: '20s' },
    { value: '30대', ko: '30대', en: '30s' },
    { value: '40대', ko: '40대', en: '40s' },
    { value: '50대 이상', ko: '50대 이상', en: '50s +' },
];
const COPY = {
    ko: {
        introDesc: '수백만 개의 데이터 포인트를 분석하여\n당신 피부만의 고유한 중심축을 찾아냅니다.',
        genderHeading: '정확한 데이터 분석을 위해\n성별을 선택해 주세요.',
        ageHeading: '연령대를 선택해 주세요.',
    },
    en: {
        introDesc: 'Millions of data points analyzed.\nDefining the singular axis of your skin.',
        genderHeading: 'For precision in your analysis,\nplease select your gender.',
        ageHeading: 'Please select your age group.',
    },
};

function analyzeSkin(answers, language = 'ko') {
    let oilScore = 0, sensScore = 0, oilMax = 0, sensMax = 0;
    questions.forEach(q => {
        const score = answers[q.id] ?? 0;
        if (q.type === 'oiliness') { oilScore += score; oilMax += 10; }
        else if (q.type === 'sensitivity') { sensScore += score; sensMax += 10; }
    });

    const oilPercent = oilMax > 0 ? Math.round((oilScore / oilMax) * 100) : 0;
    const sensPercent = sensMax > 0 ? Math.round((sensScore / sensMax) * 100) : 0;

    let mainType = "중성";
    if (oilPercent > 70) mainType = "지성";
    else if (oilPercent > 50 && sensPercent > 50) mainType = "수부지";
    else if (oilPercent > 40) mainType = "복합성";
    else if (oilPercent < 30) mainType = "건성";

    let subType = "비민감";
    if (sensPercent > 70) subType = "과민";
    else if (sensPercent > 50) subType = "민감";
    else if (sensPercent > 30) subType = "민감 주의";

    const finalType = `${mainType} · ${subType}`;
    const skinData = getSkinTypeData(finalType, language);

    return { titleKo: finalType, descriptionKo: skinData.description, characteristicKo: skinData.characteristic, careDirectionKo: skinData.careDirection, oilPercent, sensPercent };
}

export default function Analysis() {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const c = COPY[language] || COPY.en;
    const [quizPhase, setQuizPhase] = useState('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [userData, setUserData] = useState({ gender: null, age: null });
    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [resultData, setResultData] = useState(null);

    const submitQuiz = (newAnswers) => {
        const analysisResult = analyzeSkin(newAnswers, language);
        const products = getRecommendedProducts(analysisResult.titleKo);

        const finalAnswers = { ...newAnswers, gender: userData.gender, age: userData.age };
        fetch(`${API_URL}/api/surveys/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                answers: finalAnswers,
                skinType: analysisResult.titleKo,
                scores: { oil: analysisResult.oilPercent, sens: analysisResult.sensPercent }
            })
        }).catch(e => console.log("DB save error", e));

        setResultData({
            skinTypeStr: analysisResult.titleKo,
            description: analysisResult.descriptionKo,
            characteristic: analysisResult.characteristicKo,
            careDirection: analysisResult.careDirectionKo,
            products,
            oilPercent: analysisResult.oilPercent,
            sensPercent: analysisResult.sensPercent,
        });
        setQuizPhase('loading');
    };

    const handleOptionSelect = async (option, index) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setSelectedOption(index);
        const newAnswers = { ...answers, [questions[currentQuestion].id]: option.score };
        setAnswers(newAnswers);
        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedOption(null);
                setIsAnimating(false);
            } else {
                submitQuiz(newAnswers);
            }
        }, 500);
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
            setSelectedOption(null);
        } else {
            setQuizPhase('age');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#00E0FF] selection:text-black pt-[88px] pb-20">
            {quizPhase === 'loading' && (
                <AnalysisLoader onComplete={() => navigate('/result', { state: resultData })} />
            )}
            <div className="max-w-7xl mx-auto px-6 py-8 md:h-[calc(100vh-140px)] md:min-h-[600px] md:flex md:items-center">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 h-auto lg:h-full max-h-[800px]">
                    <div className="block relative rounded-2xl bg-[#05080a] border border-[#222] overflow-hidden h-[320px] md:h-[400px] lg:h-auto">
                        <div className="absolute inset-0 z-0">
                            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                                <ambientLight intensity={0.5} />
                                <spotLight position={[10, 10, 10]} intensity={1} color="#00E0FF" />
                                <Suspense fallback={null}>
                                    <Starfield />
                                    <EvolvingBlob step={
                                        quizPhase === 'intro' ? 0 :
                                        quizPhase === 'gender' ? 1 :
                                        quizPhase === 'age' ? 2 :
                                        quizPhase === 'quiz' ? Math.min(3 + Math.round((currentQuestion / Math.max(questions.length - 1, 1)) * 6), 9) :
                                        quizPhase === 'loading' ? 9 : 10
                                    } />
                                    <EvolvingParticles step={
                                        quizPhase === 'intro' ? 0 :
                                        quizPhase === 'quiz' ? Math.round((currentQuestion / Math.max(questions.length - 1, 1)) * 10) : 10
                                    } />
                                    <Environment preset="city" />
                                </Suspense>
                                <EffectComposer><Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} /></EffectComposer>
                            </Canvas>
                        </div>
                        <div className="absolute bottom-10 left-10 z-10 pointer-events-none">
                            <div className="text-[#00E0FF] text-[10px] tracking-widest font-body font-bold mb-2">SCANNING...</div>
                            <div className="text-white/40 text-xs font-body tracking-widest uppercase">
                                {quizPhase === 'intro' ? 'SYSTEM READY' : quizPhase === 'gender' ? 'DEMOGRAPHICS' : quizPhase === 'loading' ? 'ANALYZING' : `DATA POINT ${currentQuestion + 1}`}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center h-full">
                        {quizPhase === 'intro' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full">
                                <h1 className="text-4xl md:text-6xl font-title-en font-bold mb-6 leading-title">Discover Your Axis.</h1>
                                <p className="text-[#8AAEC0] text-lg font-body mb-12 leading-body tracking-normal" style={{ whiteSpace: 'pre-line' }}>
                                    {c.introDesc}
                                </p>
                                <button
                                    onClick={() => setQuizPhase('gender')}
                                    className="inline-flex items-center gap-4 px-16 py-5 font-body font-semibold text-sm tracking-[0.22em] uppercase rounded-[14px] btn-glow"
                                >
                                    BEGIN ANALYSIS
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </button>
                            </motion.div>
                        )}

                        {quizPhase === 'gender' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full">
                                <p className="text-[#8AAEC0] text-[10px] font-body tracking-widest uppercase mb-4">Step 01</p>
                                <h2 className="text-3xl font-body font-bold mb-10 leading-title" style={{ whiteSpace: 'pre-line' }}>{c.genderHeading}</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {GENDERS.map(g => (
                                        <button key={g.value} onClick={() => { setUserData(p => ({ ...p, gender: g.value })); setQuizPhase('age'); }} className="p-6 text-center bg-[#05080a] border border-[#222] hover:border-[#00E0FF] rounded-2xl font-body font-bold text-[#8AAEC0] hover:text-white transition-colors">{g[language] || g.en}</button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {quizPhase === 'age' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full">
                                <p className="text-[#8AAEC0] text-[10px] font-body tracking-widest uppercase mb-4">Step 02</p>
                                <h2 className="text-3xl font-body font-bold mb-10 leading-title">{c.ageHeading}</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {AGES.map(a => (
                                        <button key={a.value} onClick={() => { setUserData(p => ({ ...p, age: a.value })); setQuizPhase('quiz'); }} className="p-6 bg-[#05080a] border border-[#222] hover:border-[#00E0FF] rounded-2xl font-body font-bold text-[#8AAEC0] hover:text-white transition-colors text-center">{a[language] || a.en}</button>
                                    ))}
                                </div>
                                <button onClick={() => setQuizPhase('gender')} className="mt-8 text-sm text-[#555] hover:text-[#00E0FF] transition-colors font-body tracking-widest uppercase font-bold">← Back</button>
                            </motion.div>
                        )}

                        {quizPhase === 'quiz' && (
                            <div className="w-full">
                                <div className="mb-10">
                                    <div className="flex justify-between text-[10px] font-bold text-[#8AAEC0] font-body tracking-widest uppercase mb-4">
                                        <span>Phase 01</span>
                                        <span>{currentQuestion + 1} / {questions.length}</span>
                                    </div>
                                    <div className="h-1 w-full bg-[#222] rounded-full overflow-hidden">
                                        <motion.div className="h-full bg-[#00E0FF]" initial={{ width: 0 }} animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} transition={{ duration: 0.5 }} />
                                    </div>
                                </div>
                                <AnimatePresence mode="wait">
                                    <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mb-10">
                                        <h2 className="text-2xl font-body font-bold leading-body tracking-normal" style={{ wordBreak: 'keep-all' }}>{questions[currentQuestion].text[language] || questions[currentQuestion].text.en}</h2>
                                    </motion.div>
                                </AnimatePresence>
                                <div className="space-y-3">
                                    {questions[currentQuestion].options.map((opt, i) => (
                                        <button key={i} onClick={() => handleOptionSelect(opt, i)} disabled={isAnimating} className={`w-full p-5 text-left rounded-2xl transition-all font-body tracking-normal ${selectedOption === i ? 'bg-[#00E0FF]/10 border border-[#00E0FF] text-white font-bold' : 'bg-[#05080a] border border-[#222] text-[#8AAEC0] hover:border-[#00E0FF]/50 hover:text-white'}`}>{opt[language] || opt.en}</button>
                                    ))}
                                </div>
                                <button onClick={handleBack} className="mt-8 text-sm text-[#555] hover:text-[#00E0FF] transition-colors font-body tracking-widest uppercase font-bold">← Back</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
