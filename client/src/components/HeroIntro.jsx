import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CrystalOrb from './three/CrystalOrb';
import { useLanguage } from '../context/LanguageContext';

const CATEGORIES = ['Diagnosis', 'Curation', 'Ritual'];

export default function HeroIntro() {
    const { language } = useLanguage();
    const prefersReduced = useReducedMotion();

    const fadeIn = prefersReduced
        ? { initial: {}, animate: {} }
        : { initial: { opacity: 0 }, animate: { opacity: 1 } };

    return (
        <section className="relative bg-void-deep overflow-hidden flex flex-col min-h-screen md:block md:h-screen">
            {/* Grain overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
                style={{ backgroundImage: 'url(/images/grain.png)', backgroundSize: '200px' }}
            />

            {/* Crystal — mobile: flow top (relative), desktop: absolute background */}
            <div className="relative z-0 w-full h-[55vh] flex-shrink-0 md:absolute md:inset-0 md:h-auto">
                <CrystalOrb />
            </div>

            {/* Text — mobile: block centered below crystal, desktop: absolute left column */}
            <div className="relative z-20 px-6 py-10 pointer-events-auto text-center
                            md:absolute md:inset-0 md:flex md:items-center md:h-full
                            md:max-w-7xl md:mx-auto md:px-6 md:py-0 md:text-left md:pointer-events-none">
                <div className="max-w-sm mx-auto pointer-events-auto md:max-w-lg md:mx-0">
                    <motion.p
                        {...fadeIn}
                        transition={{ duration: 0.6 }}
                        className="font-body text-brand-600 text-[10px] tracking-[0.35em] uppercase mb-6 md:mb-10"
                    >
                        AXIOM LABORATORY
                    </motion.p>

                    <div className="overflow-hidden mb-2">
                        <motion.h1
                            initial={prefersReduced ? {} : { opacity: 0, y: 80 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="font-title-en text-3xl md:text-5xl lg:text-[clamp(3rem,10vw,9rem)] leading-none tracking-tight text-ui-textPrimary block"
                        >
                            AXIOM
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={prefersReduced ? {} : { scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="mx-auto w-8 h-[1px] bg-brand-600 my-6 origin-center md:origin-left md:mx-0"
                    />

                    <motion.p
                        initial={prefersReduced ? {} : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="font-body text-ui-textSecondary text-base md:text-lg leading-body-lg max-w-sm mx-auto mb-8 md:mb-10 md:mx-0"
                    >
                        {language === 'en'
                            ? <>Every skin is born<br />with its own center of balance.</>
                            : <>모든 피부는 태어나는 순간,<br />자신만의 고유한 중심축을 가집니다.</>}
                    </motion.p>

                    <div className="flex gap-6 mb-10 justify-center md:justify-start md:mb-12">
                        {CATEGORIES.map((cat, i) => (
                            <motion.span
                                key={cat}
                                initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.85 + i * 0.1 }}
                                className="font-title-en text-brand-400 text-sm tracking-widest uppercase"
                            >
                                {cat}
                            </motion.span>
                        ))}
                    </div>

                    <motion.div
                        initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        className="flex justify-center md:block"
                    >
                        <Link
                            to="/analysis"
                            className="inline-block px-5 py-3 md:px-8 md:py-4 font-body text-xs md:text-sm uppercase tracking-widest rounded-[14px] btn-glow"
                        >
                            BEGIN ANALYSIS →
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Left gradient — desktop only for text readability */}
            <div
                className="hidden md:block absolute inset-0 z-[1] pointer-events-none"
                style={{ background: 'linear-gradient(to right, #03070a 0%, #03070a 30%, transparent 65%)' }}
            />
        </section>
    );
}
