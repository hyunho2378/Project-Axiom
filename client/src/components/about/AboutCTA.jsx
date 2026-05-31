import { useRef } from 'react';
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
                className="inline-block px-8 py-4 border border-brand-600 text-ui-textPrimary font-body text-sm uppercase tracking-widest rounded-[14px] hover:bg-brand-600 transition-colors duration-300"
            >
                {label}
            </Link>
        </motion.div>
    );
}

export default function AboutCTA() {
    const prefersReduced = useReducedMotion();

    return (
        <section className="py-32 px-6 bg-void-deepest border-t border-ui-border text-center">
            <div className="max-w-3xl mx-auto">

                <div className="flex items-center justify-center gap-6 mb-14">
                    <div className="w-16 h-[1px] bg-brand-600/25" />
                    <span className="font-body text-brand-600 text-[10px] tracking-[0.4em] uppercase">AXIOM</span>
                    <div className="w-16 h-[1px] bg-brand-600/25" />
                </div>

                <motion.h2
                    initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="font-title-en text-[clamp(2rem,5vw,4rem)] text-ui-textPrimary leading-none tracking-tight mb-8"
                >
                    Ready to find<br />your axiom?
                </motion.h2>

                <motion.p
                    initial={prefersReduced ? {} : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="font-body text-ui-textSecondary text-base md:text-lg leading-body-lg mb-12"
                >
                    지금, 당신의 피부 중심축을 발견하십시오.
                </motion.p>

                <motion.div
                    initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45 }}
                >
                    <MagneticButton to="/analysis" label="Begin Analysis →" />
                </motion.div>

            </div>
        </section>
    );
}
