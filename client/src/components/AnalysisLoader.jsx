import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SilkRibbon from './three/SilkRibbon';

const PHASES = [
    { text: '피부 데이터를 수집하고 있습니다', duration: 1500 },
    { text: '고유 피부 축을 분석하고 있습니다', duration: 1500 },
    { text: '맞춤 솔루션을 구성하고 있습니다', duration: 1500 },
];

export default function AnalysisLoader({ onComplete }) {
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let elapsed = 0;
        const totalDuration = PHASES.reduce((acc, p) => acc + p.duration, 0);

        const progressInterval = setInterval(() => {
            elapsed += 50;
            setProgress(Math.min((elapsed / totalDuration) * 100, 100));
        }, 50);

        let phaseElapsed = 0;
        PHASES.forEach((phase, i) => {
            setTimeout(() => setPhaseIndex(i), phaseElapsed);
            phaseElapsed += phase.duration;
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
            {/* SilkRibbon — replaces spinner, 192×192px centered */}
            <div className="w-48 h-48 mb-8">
                <Suspense fallback={null}>
                    <SilkRibbon />
                </Suspense>
            </div>
            <AnimatePresence mode="wait">
                <motion.p
                    key={phaseIndex}
                    className="font-body text-sm text-[#8AAEC0] mb-8 tracking-widest uppercase"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {PHASES[phaseIndex].text}
                </motion.p>
            </AnimatePresence>

            <div className="w-64 h-px bg-void-lighter relative overflow-hidden">
                <motion.div
                    className="absolute inset-y-0 left-0 bg-[#00D4FF]"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.05 }}
                />
            </div>

            <p className="font-body text-xs text-[#5A9AB5] mt-3">
                {Math.round(progress)}%
            </p>
        </div>
    );
}
