import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';

export default function AboutHero() {
    const cursorX = useMotionValue(-200);
    const cursorY = useMotionValue(-200);
    const prefersReduced = useReducedMotion();

    useEffect(() => {
        if (prefersReduced) return;
        const handle = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
        window.addEventListener('mousemove', handle);
        return () => window.removeEventListener('mousemove', handle);
    }, [prefersReduced]);

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-start text-left bg-void-deepest overflow-hidden px-6">

            {/* Radial orb */}
            {!prefersReduced && (
                <motion.div
                    className="pointer-events-none fixed w-[500px] h-[500px] rounded-2xl -translate-x-1/2 -translate-y-1/2"
                    style={{
                        left: cursorX,
                        top: cursorY,
                        background: 'radial-gradient(circle, rgba(42,104,133,0.5) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />
            )}

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.p
                    initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-body text-brand-600 text-[10px] tracking-[0.35em] uppercase mb-12"
                >
                    AXIOM BRAND STORY
                </motion.p>

                <div className="overflow-hidden mb-8">
                    <motion.h1
                        initial={prefersReduced ? {} : { opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-title-en text-[clamp(2rem,5vw,4rem)] leading-none tracking-tight text-ui-textPrimary"
                    >
                        The Self-Evident<br />Axis of Beauty.
                    </motion.h1>
                </div>

                <motion.div
                    initial={prefersReduced ? {} : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="font-body text-sm mb-8 space-y-2"
                >
                    <div className="flex gap-3 items-baseline">
                        <span className="text-brand-600 text-[10px] tracking-widest uppercase w-36 flex-shrink-0">Axis (축)</span>
                        <span className="text-ui-textSecondary">흔들리지 않는 나만의 중심</span>
                    </div>
                    <div className="flex gap-3 items-baseline">
                        <span className="text-brand-600 text-[10px] tracking-widest uppercase w-36 flex-shrink-0">Axiom (자명한 진리)</span>
                        <span className="text-ui-textSecondary">증명할 필요 없이 그 자체로 확실한 정답</span>
                    </div>
                </motion.div>

                <motion.p
                    initial={prefersReduced ? {} : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="font-body text-ui-textMuted text-sm leading-body-lg"
                >
                    데이터로 증명된, 당신만의 흔들리지 않는 아름다움의 기준
                </motion.p>

            </div>
        </section>
    );
}
