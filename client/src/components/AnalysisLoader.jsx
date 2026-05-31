import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DNAHelix from './three/DNAHelix';
import { useLanguage } from '../context/LanguageContext';

const PHASE_DURATIONS = [1500, 1500, 1500];
const PHASE_TEXT = {
    ko: ['피부 데이터를 수집하고 있습니다', '고유 피부 축을 분석하고 있습니다', '맞춤 솔루션을 구성하고 있습니다'],
    en: ['Collecting skin data', 'Analyzing your unique skin axis', 'Composing your custom solution'],
};

export default function AnalysisLoader({ onComplete }) {
    const { language } = useLanguage();
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let elapsed = 0;
        const totalDuration = PHASE_DURATIONS.reduce((acc, d) => acc + d, 0);

        const progressInterval = setInterval(() => {
            elapsed += 50;
            setProgress(Math.min((elapsed / totalDuration) * 100, 100));
        }, 50);

        let phaseElapsed = 0;
        PHASE_DURATIONS.forEach((duration, i) => {
            setTimeout(() => setPhaseIndex(i), phaseElapsed);
            phaseElapsed += duration;
        });

        const completeTimer = setTimeout(() => {
            clearInterval(progressInterval);
            onComplete?.();
        }, totalDuration);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void">
            {/* DNAHelix — 분석 대기 비주얼, 288×288px centered */}
            <div className="w-72 h-72 mb-8">
                <Suspense fallback={null}>
                    <DNAHelix />
                </Suspense>
            </div>
            <AnimatePresence mode="wait">
                <motion.p
                    key={phaseIndex}
                    className="font-body text-[14px] text-[#8AAEC0] mb-8 tracking-widest uppercase"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {(PHASE_TEXT[language] || PHASE_TEXT.en)[phaseIndex]}
                </motion.p>
            </AnimatePresence>

            <div className="w-64 h-px bg-void-lighter relative overflow-hidden">
                <motion.div
                    className="absolute inset-y-0 left-0 bg-[#00D4FF]"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.05 }}
                />
            </div>

            <p className="font-body text-[12px] text-[#5A9AB5] mt-3">
                {Math.round(progress)}%
            </p>
        </div>
    );
}
