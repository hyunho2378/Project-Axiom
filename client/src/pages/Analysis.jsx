import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import EvolvingBlob, { EvolvingParticles } from '../components/EvolvingBlob';
import { questions } from '../data/questions';
import { getRecommendedProducts, getSkinDescription } from '../data/axiomData';

const API_URL = "https://project-axiom.onrender.com";

function analyzeSkin(answers) {
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
    const desc = getSkinDescription(finalType);

    return { titleKo: finalType, descriptionKo: desc, oilPercent, sensPercent };
}

export default function Analysis() {
    const navigate = useNavigate();
    const [quizPhase, setQuizPhase] = useState('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [userData, setUserData] = useState({ gender: null, age: null });
    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [aiResult, setAiResult] = useState(null);
    const [finalSkinType, setFinalSkinType] = useState("");

    const submitQuiz = async (newAnswers) => {
        setQuizPhase('loading');
        try {
            const analysisResult = analyzeSkin(newAnswers);
            setFinalSkinType(analysisResult.titleKo);
            const finalAnswers = { ...newAnswers, gender: userData.gender, age: userData.age };

            try {
                await fetch(`${API_URL}/api/surveys/submit`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        answers: finalAnswers,
                        skinType: analysisResult.titleKo,
                        scores: { oil: analysisResult.oilPercent, sens: analysisResult.sensPercent }
                    })
                });
            } catch (e) { console.log("DB save error", e); }

            const aiResponse = await fetch(`${API_URL}/api/analyze`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    skinType: analysisResult.titleKo,
                    description: analysisResult.descriptionKo,
                    oilScore: analysisResult.oilPercent,
                    sensScore: analysisResult.sensPercent
                })
            });
            const aiData = await aiResponse.json();

            if (aiData.success && aiData.advice) {
                setAiResult(aiData.advice);
            } else {
                setAiResult({ headline: "AXIOM Diagnosis", advice: analysisResult.descriptionKo, glossary: [] });
            }
            setTimeout(() => setQuizPhase('result'), 2000);
        } catch (error) {
            const fallbackResult = analyzeSkin(newAnswers);
            setFinalSkinType(fallbackResult.titleKo);
            setAiResult({ headline: "AXIOM Diagnosis", advice: fallbackResult.descriptionKo, glossary: [] });
            setTimeout(() => setQuizPhase('result'), 1500);
        }
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

    if (quizPhase === 'result') {
        const { headline = "AXIOM Diagnosis", advice = "", glossary = [] } = aiResult || {};
        const realProducts = getRecommendedProducts(finalSkinType);

        return (
            <div className="min-h-screen bg-black pt-32 pb-40 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}
                        className="h-[50vh] md:h-[60vh] bg-[#05080a] rounded-[2rem] border border-[#222] overflow-hidden relative flex items-center justify-center shadow-2xl"
                    >
                        <div className="absolute top-6 left-8 z-10">
                            <span className="text-[#00E0FF] font-mono text-[10px] tracking-widest uppercase">Data Object</span>
                        </div>
                        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#00E0FF]/20 to-transparent blur-2xl absolute animate-pulse"></div>
                        <div className="w-40 h-40 rounded-full border border-[#00E0FF]/30 shadow-[0_0_50px_rgba(0,224,255,0.2)]"></div>
                    </motion.div>

                    <div className="flex flex-col justify-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                            <p className="font-mono text-[#8AAEC0] text-[10px] tracking-widest uppercase mb-4 font-bold">Diagnosis Complete</p>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-title">{finalSkinType}</h2>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
                            <div className="bg-[#05080a] p-8 md:p-10 rounded-3xl border border-[#222]">
                                <h3 className="font-serif font-bold text-[#00E0FF] text-lg md:text-xl mb-4 leading-title">{headline}</h3>
                                <p className="font-sans text-[#E0E0E0] text-sm md:text-base leading-body tracking-normal whitespace-pre-line">{advice}</p>
                            </div>
                        </motion.div>

                        {glossary.length > 0 && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-12">
                                <div className="border-l-2 border-[#00E0FF] pl-6 py-2">
                                    <h4 className="font-mono font-bold text-[#00E0FF] text-[11px] tracking-widest uppercase mb-3">Axiom Glossary</h4>
                                    {glossary.map((item, idx) => (
                                        <p key={idx} className="font-sans text-[#8AAEC0] text-xs md:text-sm leading-body mb-2">
                                            <span className="text-white font-bold">{item.term}</span> : {item.definition}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#222]">
                            <Link to="/my-space" className="flex-1 text-center py-5 bg-[#00E0FF] text-black font-sans font-bold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-colors">Enter My Space</Link>
                            <a href="#products" className="flex-1 text-center py-5 border border-[#333] text-white font-sans font-bold text-xs tracking-widest uppercase rounded-full hover:border-[#00E0FF] hover:text-[#00E0FF] transition-colors">View Solutions</a>
                        </motion.div>
                    </div>
                </div>

                <div id="products" className="max-w-7xl mx-auto pt-24 border-t border-[#222]">
                    <div className="mb-16">
                        <h3 className="font-serif text-3xl font-bold text-white mb-3 leading-title">Prescribed Solutions</h3>
                        <p className="font-sans text-[#8AAEC0] text-sm tracking-normal">{finalSkinType} 피부를 위한 정밀 처방 매칭 결과입니다.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {realProducts.slice(0, 4).map((product, index) => (
                            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="group">
                                <Link to={`/curations/${product.id}`} className="block bg-[#05080a] border border-[#222] rounded-3xl overflow-hidden hover:border-[#00E0FF]/50 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(0,224,255,0.1)]">
                                    <div className={`relative aspect-[4/5] ${product.imageColor} flex flex-col justify-end p-6 border-b border-[#222]`}>
                                        <div className="absolute top-4 left-4 bg-[#00E0FF] text-black text-[10px] font-mono px-2 py-1 rounded-sm uppercase tracking-widest">{product.category}</div>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-white font-serif font-bold text-lg truncate mb-4 leading-title">{product.nameKr}</h4>
                                        <div className="flex justify-between items-center pt-4 border-t border-[#222]">
                                            <span className="text-[#00E0FF] font-sans font-bold text-sm">{product.price}</span>
                                            <span className="text-[#333] text-lg group-hover:text-[#00E0FF] transition-colors">→</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#00E0FF] selection:text-black pt-[88px] pb-20">
            <div className="max-w-7xl mx-auto px-6 h-[calc(100vh-140px)] min-h-[600px] flex items-center">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 h-full max-h-[800px]">
                    <div className="hidden lg:block relative rounded-3xl bg-[#05080a] border border-[#222] overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                                <ambientLight intensity={0.5} />
                                <spotLight position={[10, 10, 10]} intensity={1} color="#00E0FF" />
                                <Suspense fallback={null}>
                                    <EvolvingBlob progress={(currentQuestion + 1) / questions.length} />
                                    <EvolvingParticles />
                                    <Environment preset="city" />
                                </Suspense>
                                <EffectComposer><Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} /></EffectComposer>
                            </Canvas>
                        </div>
                        <div className="absolute bottom-10 left-10 z-10 pointer-events-none">
                            <div className="text-[#00E0FF] text-[10px] tracking-widest font-mono font-bold mb-2">SCANNING...</div>
                            <div className="text-white/40 text-xs font-mono tracking-widest uppercase">
                                {quizPhase === 'intro' ? 'SYSTEM READY' : quizPhase === 'gender' ? 'DEMOGRAPHICS' : quizPhase === 'loading' ? 'ANALYZING' : `DATA POINT ${currentQuestion + 1}`}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center h-full">
                        {quizPhase === 'intro' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full">
                                <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-title">Discover Your Axis.</h1>
                                <p className="text-[#8AAEC0] text-lg font-sans mb-12 leading-body tracking-normal">
                                    수백만 개의 데이터 포인트를 분석하여<br />당신 피부만의 고유한 중심축을 찾아냅니다.
                                </p>
                                <button onClick={() => setQuizPhase('gender')} className="px-10 py-5 bg-[#00E0FF] text-black font-sans font-bold text-sm tracking-widest uppercase rounded-full hover:bg-white transition-colors">Begin Analysis</button>
                            </motion.div>
                        )}

                        {quizPhase === 'gender' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full">
                                <p className="text-[#8AAEC0] text-[10px] font-mono tracking-widest uppercase mb-4">Step 01</p>
                                <h2 className="text-3xl font-sans font-bold mb-10 leading-title">정확한 데이터 분석을 위해<br />성별을 선택해 주세요.</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {['여성', '남성'].map(g => (
                                        <button key={g} onClick={() => { setUserData(p => ({ ...p, gender: g })); setQuizPhase('age'); }} className="p-6 text-center bg-[#05080a] border border-[#222] hover:border-[#00E0FF] rounded-2xl font-sans font-bold text-[#8AAEC0] hover:text-white transition-colors">{g}</button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {quizPhase === 'age' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full">
                                <p className="text-[#8AAEC0] text-[10px] font-mono tracking-widest uppercase mb-4">Step 02</p>
                                <h2 className="text-3xl font-sans font-bold mb-10 leading-title">연령대를 선택해 주세요.</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {['10대', '20대', '30대', '40대', '50대 이상'].map(a => (
                                        <button key={a} onClick={() => { setUserData(p => ({ ...p, age: a })); setQuizPhase('quiz'); }} className="p-6 bg-[#05080a] border border-[#222] hover:border-[#00E0FF] rounded-2xl font-sans font-bold text-[#8AAEC0] hover:text-white transition-colors text-center">{a}</button>
                                    ))}
                                </div>
                                <button onClick={() => setQuizPhase('gender')} className="mt-8 text-sm text-[#555] hover:text-[#00E0FF] transition-colors font-sans tracking-widest uppercase font-bold">← Back</button>
                            </motion.div>
                        )}

                        {quizPhase === 'quiz' && (
                            <div className="w-full">
                                <div className="mb-10">
                                    <div className="flex justify-between text-[10px] font-bold text-[#8AAEC0] font-mono tracking-widest uppercase mb-4">
                                        <span>Phase 01</span>
                                        <span>{currentQuestion + 1} / {questions.length}</span>
                                    </div>
                                    <div className="h-1 w-full bg-[#222] rounded-full overflow-hidden">
                                        <motion.div className="h-full bg-[#00E0FF]" initial={{ width: 0 }} animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} transition={{ duration: 0.5 }} />
                                    </div>
                                </div>
                                <AnimatePresence mode="wait">
                                    <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mb-10">
                                        <h2 className="text-2xl font-sans font-bold leading-body tracking-normal" style={{ wordBreak: 'keep-all' }}>{questions[currentQuestion].text}</h2>
                                    </motion.div>
                                </AnimatePresence>
                                <div className="space-y-3">
                                    {questions[currentQuestion].options.map((opt, i) => (
                                        <button key={i} onClick={() => handleOptionSelect(opt, i)} disabled={isAnimating} className={`w-full p-5 text-left rounded-2xl transition-all font-sans tracking-normal ${selectedOption === i ? 'bg-[#00E0FF]/10 border border-[#00E0FF] text-white font-bold' : 'bg-[#05080a] border border-[#222] text-[#8AAEC0] hover:border-[#00E0FF]/50 hover:text-white'}`}>{opt.text}</button>
                                    ))}
                                </div>
                                <button onClick={handleBack} className="mt-8 text-sm text-[#555] hover:text-[#00E0FF] transition-colors font-sans tracking-widest uppercase font-bold">← Back</button>
                            </div>
                        )}

                        {quizPhase === 'loading' && (
                            <div className="w-full text-center py-20">
                                <div className="w-20 h-20 border-t-2 border-[#00E0FF] rounded-full animate-spin mx-auto mb-8"></div>
                                <h2 className="text-2xl font-serif tracking-widest mb-4 leading-title">Analyzing Data</h2>
                                <p className="text-[#8AAEC0] font-sans tracking-normal">수백만 개의 데이터 포인트를 분석 중입니다...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}