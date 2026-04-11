import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

/**
 * AXIOM Home — YSL Beauty Aesthetic
 *
 * Architecture: Natural single scroll
 * - Section 1: Full-viewport cinematic hero
 * - Section 2: Data Intelligence grid
 * - Section 3: Three-phase protocol
 * - Section 4: CTA finale
 * Footer follows naturally after Section 4.
 *
 * NO inner scroll container.
 * NO snap scroll.
 * Single window scroll — Header detects normally.
 */

const COPY = {
    ko: {
        label: 'AXIOM LABORATORY',
        headline: ['Define', 'Your Axis.'],
        sub: '데이터로 증명된, 당신만의\n흔들리지 않는 아름다움의 기준.',
        cta: '분석 시작',
        s2label: 'DATA INTELLIGENCE',
        s2head: 'The Precision\nof Pure Science.',
        s2body: '감각이나 유행이 아닌, 피부 타입과 컨디션,\n성분 반응 데이터를 기준으로 피부를 해석합니다.',
        s3label: 'AXIOM PROTOCOL',
        s3head: 'A Three-Phase\nDiagnosis System.',
        steps: [
            { num: '01', title: 'Capture', desc: '초정밀 AI 스캐닝으로 피부 텍스처와 빛 반응 데이터를 포착합니다.' },
            { num: '02', title: 'Analyze', desc: '6가지 핵심 지표를 분석해 당신만의 고유한 AXIOM 피부 타입을 결정합니다.' },
            { num: '03', title: 'Prescribe', desc: '데이터가 도출한 최적의 처방으로 당신의 축을 리셋합니다.' },
        ],
        s4head: 'Your Skin Has\na Truth.',
        s4body: '지금, 당신의 피부 중심축을 발견하십시오.',
        s4cta: 'Begin Analysis',
    },
    en: {
        label: 'AXIOM LABORATORY',
        headline: ['Define', 'Your Axis.'],
        sub: 'Data-driven beauty, precisely calibrated\nfor the singular individual.',
        cta: 'Start Analysis',
        s2label: 'DATA INTELLIGENCE',
        s2head: 'The Precision\nof Pure Science.',
        s2body: 'Not intuition. Not trends. AXIOM interprets your skin\nthrough biometric data, condition metrics, and ingredient response.',
        s3label: 'AXIOM PROTOCOL',
        s3head: 'A Three-Phase\nDiagnosis System.',
        steps: [
            { num: '01', title: 'Capture', desc: 'Hyper-precision AI scanning captures skin texture and light response at a cellular level.' },
            { num: '02', title: 'Analyze', desc: 'Six core biometric indices are measured to determine your unique AXIOM skin archetype.' },
            { num: '03', title: 'Prescribe', desc: 'The algorithm delivers a data-verified prescription, resetting your skin to its optimal axis.' },
        ],
        s4head: 'Your Skin Has\na Truth.',
        s4body: 'Discover your singular axis. Begin the AXIOM protocol.',
        s4cta: 'Begin Analysis',
    },
};

const DATA_METRICS = [
    { label: 'OIL BALANCE',  val: '78.4%', color: '#3C7795' },
    { label: 'SENSITIVITY',  val: '32.1%', color: '#8AAEC0' },
    { label: 'HYDRATION',    val: '61.9%', color: '#1E5672' },
    { label: 'BARRIER FX',   val: '89.2%', color: '#3C7795' },
    { label: 'ELASTICITY',   val: '54.7%', color: '#8AAEC0' },
    { label: 'PIGMENT IDX',  val: '12.3%', color: '#1E5672' },
];

export default function Home() {
    const { language } = useLanguage();
    const c = COPY[language] || COPY.ko;

    return (
        <div className="bg-black">

            {/* ── SECTION 1: CINEMATIC HERO ── */}
            <section className="relative min-h-screen w-full flex flex-col justify-center bg-black overflow-hidden">

                {/* Atmospheric depth glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#1E5672]/8 blur-[200px] pointer-events-none" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#3C7795]/5 blur-[100px] pointer-events-none" />

                {/* Thin vertical rule — right edge accent */}
                <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#3C7795]/15 to-transparent hidden lg:block" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28 pb-20">

                    {/* Section label */}
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-mono text-[#3C7795] text-[10px] tracking-[0.35em] uppercase mb-10"
                    >
                        {c.label}
                    </motion.p>

                    {/* Cinematic headline — stagger */}
                    <div className="overflow-hidden mb-10">
                        {c.headline.map((line, i) => (
                            <motion.h1
                                key={i}
                                initial={{ opacity: 0, y: 80 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.0, delay: 0.1 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                                className="font-serif text-[clamp(4rem,11vw,10rem)] leading-none tracking-tight text-white block"
                            >
                                {line}
                            </motion.h1>
                        ))}
                    </div>

                    {/* Thin rule under headline */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="origin-left w-24 h-[1px] bg-[#3C7795]/40 mb-10"
                    />

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.7 }}
                        className="font-sans text-[#8AAEC0] text-base md:text-lg leading-body max-w-sm mb-14 whitespace-pre-line"
                    >
                        {c.sub}
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                    >
                        <Link
                            to="/diagnosis"
                            className="inline-flex items-center gap-4 px-12 py-4 bg-[#3C7795] hover:bg-[#8AAEC0] text-white text-sm font-sans font-semibold tracking-[0.18em] uppercase rounded-full transition-all duration-300 shadow-[0_0_28px_rgba(60,119,149,0.35)] hover:shadow-[0_0_44px_rgba(60,119,149,0.5)]"
                        >
                            {c.cta}
                            <span className="text-base leading-none">→</span>
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <div className="w-[1px] h-14 bg-gradient-to-b from-transparent to-[#3C7795]/40" />
                    <span className="font-mono text-[#3C7795]/40 text-[9px] tracking-[0.35em] uppercase">Scroll</span>
                </motion.div>
            </section>

            {/* ── SECTION 2: DATA INTELLIGENCE ── */}
            <section className="relative py-40 bg-[#03070a] border-t border-[#111] overflow-hidden">

                {/* Subtle horizontal rule */}
                <div className="absolute left-0 top-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1E5672]/20 to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

                        {/* Left: Copy */}
                        <div className="lg:col-span-5 lg:sticky lg:top-32">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="font-mono text-[#3C7795] text-[10px] tracking-[0.3em] uppercase mb-8"
                            >
                                {c.s2label}
                            </motion.p>
                            <motion.h2
                                initial={{ opacity: 0, x: -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-title whitespace-pre-line mb-8"
                            >
                                {c.s2head}
                            </motion.h2>
                            <div className="w-8 h-[1px] bg-[#3C7795]/40 mb-8" />
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="font-sans text-[#8AAEC0] text-base leading-body whitespace-pre-line"
                            >
                                {c.s2body}
                            </motion.p>
                        </div>

                        {/* Right: Data metric grid */}
                        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4">
                            {DATA_METRICS.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07 }}
                                    className="bg-[#05080a] border border-[#1a1a1a] hover:border-[#222] rounded-2xl p-6 transition-colors"
                                >
                                    <div className="font-mono text-[9px] tracking-[0.25em] text-[#3a3a3a] uppercase mb-4">{item.label}</div>
                                    <div
                                        className="font-mono text-2xl md:text-3xl font-bold leading-none"
                                        style={{ color: item.color }}
                                    >
                                        {item.val}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 3: THE PROTOCOL ── */}
            <section className="relative py-40 bg-black border-t border-[#111]">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="mb-20">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="font-mono text-[#3C7795] text-[10px] tracking-[0.3em] uppercase mb-8"
                        >
                            {c.s3label}
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-title whitespace-pre-line"
                        >
                            {c.s3head}
                        </motion.h2>
                    </div>

                    {/* Three steps — full-width divided columns */}
                    <div className="border-t border-[#222]">
                        {c.steps.map((step, i) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.1 }}
                                className="grid grid-cols-12 gap-8 py-12 border-b border-[#222] group"
                            >
                                <div className="col-span-1 md:col-span-1">
                                    <span className="font-mono text-[#3C7795] text-[10px] tracking-[0.2em]">{step.num}</span>
                                </div>
                                <div className="col-span-11 md:col-span-4">
                                    <h3 className="font-serif text-2xl md:text-3xl text-white leading-title group-hover:text-[#8AAEC0] transition-colors duration-300">{step.title}</h3>
                                </div>
                                <div className="col-span-11 col-start-2 md:col-span-7 md:col-start-auto">
                                    <p className="font-sans text-[#8AAEC0] text-sm md:text-base leading-body max-w-xl">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 4: CTA FINALE ── */}
            <section className="relative py-48 bg-[#03070a] border-t border-[#111] overflow-hidden text-center">

                {/* Atmospheric glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[600px] h-[600px] rounded-full bg-[#1E5672]/10 blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-6 mb-12"
                    >
                        <div className="w-16 h-[1px] bg-[#3C7795]/30" />
                        <span className="font-mono text-[#3C7795] text-[10px] tracking-[0.35em] uppercase">AXIOM</span>
                        <div className="w-16 h-[1px] bg-[#3C7795]/30" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif text-5xl md:text-7xl lg:text-[6rem] text-white leading-none whitespace-pre-line mb-10 tracking-tight"
                    >
                        {c.s4head}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 }}
                        className="font-sans text-[#8AAEC0] text-base md:text-lg leading-body mb-16"
                    >
                        {c.s4body}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link
                            to="/diagnosis"
                            className="inline-flex items-center gap-4 px-16 py-5 border border-[#3C7795] text-[#8AAEC0] hover:bg-[#3C7795] hover:text-white font-sans font-semibold text-sm tracking-[0.22em] uppercase rounded-full transition-all duration-300"
                        >
                            {c.s4cta}
                        </Link>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
