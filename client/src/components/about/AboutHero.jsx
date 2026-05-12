import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

function MagneticButton({ to, label }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const prefersReduced = useReducedMotion();

    const handleMouse = (e) => {
        if (prefersReduced) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
    };
    const handleLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            style={{ x, y }}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <Link
                to={to}
                className="inline-block px-8 py-4 border border-brand-600 text-ui-textPrimary font-body text-sm uppercase tracking-widest hover:bg-brand-600 transition-colors duration-300"
            >
                {label}
            </Link>
        </motion.div>
    );
}

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
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center bg-void-deepest overflow-hidden px-6">

            {/* Radial orb */}
            {!prefersReduced && (
                <motion.div
                    className="pointer-events-none fixed w-[500px] h-[500px] rounded-full -translate-x-1/2 -translate-y-1/2"
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
                        className="font-title-en text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-tight text-ui-textPrimary"
                    >
                        We craft personal<br />beauty axioms.
                    </motion.h1>
                </div>

                <motion.p
                    initial={prefersReduced ? {} : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="font-body text-ui-textSecondary text-base md:text-lg leading-body-lg max-w-xl mx-auto mb-12"
                >
                    과학과 데이터가 만나는 지점에서,<br />우리는 당신만의 아름다움 기준을 설계합니다.
                </motion.p>

                <motion.div
                    initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.85 }}
                >
                    <MagneticButton to="/analysis" label="Begin Analysis →" />
                </motion.div>
            </div>
        </section>
    );
}
