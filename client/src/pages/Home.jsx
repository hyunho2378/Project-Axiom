import { useEffect, useRef, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import HeroIntro from '../components/HeroIntro';
import ParticleNebula from '../components/three/ParticleNebula';

/**
 * AXIOM Home — YSL Beauty Standard
 *
 * Architecture: CSS Snap Scroll (5 sections, window-isolated)
 * - Mounts: document.body.overflow = 'hidden' (eliminates dual scrollbar)
 * - Unmounts: restores body overflow
 * - Scroll container: this component's root div (h-screen, overflow-y-scroll)
 * - Footer: integrated in Section 5 (HomeLayout excludes global Footer)
 */

const COPY = {
    ko: {
        s2label: 'DATA INTELLIGENCE',
        s2head1: 'The Precision',
        s2head2: 'of Pure Science.',
        s2body: '감각이나 유행이 아닌, 피부 타입과 컨디션,\n성분 반응 데이터를 기준으로 피부를 해석합니다.',
        s3label: 'AXIOM PROTOCOL',
        s3head1: 'A Three-Phase',
        s3head2: 'Diagnosis System.',
        steps: [
            { num: '01', title: 'Capture', desc: '초정밀 AI 스캐닝으로 피부 텍스처와 빛 반응 데이터를 포착합니다.' },
            { num: '02', title: 'Analyze', desc: '6가지 핵심 지표를 분석해 당신만의 고유한 AXIOM 피부 타입을 결정합니다.' },
            { num: '03', title: 'Prescribe', desc: '데이터가 도출한 최적의 처방으로 당신의 축을 리셋합니다.' },
        ],
        s4head1: 'Your Skin',
        s4head2: 'Has a Truth.',
        s4body: '지금, 당신의 피부 중심축을 발견하십시오.',
        s4cta: 'Begin Analysis',
        nav: ['Home', 'Brand', 'Analysis', 'Curations', 'Data Lab'],
    },
    en: {
        s2label: 'DATA INTELLIGENCE',
        s2head1: 'The Precision',
        s2head2: 'of Pure Science.',
        s2body: 'Not intuition. Not trends. AXIOM interprets your skin\nthrough biometric data and ingredient response.',
        s3label: 'AXIOM PROTOCOL',
        s3head1: 'A Three-Phase',
        s3head2: 'Diagnosis System.',
        steps: [
            { num: '01', title: 'Capture', desc: 'Hyper-precision AI scanning captures skin texture and light response at a cellular level.' },
            { num: '02', title: 'Analyze', desc: 'Six core biometric indices determine your unique AXIOM skin archetype.' },
            { num: '03', title: 'Prescribe', desc: 'The algorithm delivers a data-verified prescription, resetting your skin to its optimal axis.' },
        ],
        s4head1: 'Your Skin',
        s4head2: 'Has a Truth.',
        s4body: 'Discover your singular axis. Begin the AXIOM protocol.',
        s4cta: 'Begin Analysis',
        nav: ['Home', 'Brand', 'Analysis', 'Curations', 'Data Lab'],
    },
};

const DATA_METRICS = [
    { label: 'OIL BALANCE',  val: '78.4', unit: '%' },
    { label: 'SENSITIVITY',  val: '32.1', unit: '%' },
    { label: 'HYDRATION',    val: '61.9', unit: '%' },
    { label: 'BARRIER FX',   val: '89.2', unit: '%' },
    { label: 'ELASTICITY',   val: '54.7', unit: '%' },
    { label: 'PIGMENT IDX',  val: '12.3', unit: '%' },
];

export default function Home() {
    const { language } = useLanguage();
    const c = COPY[language] || COPY.ko;

    // Prevent body scroll while Home is mounted — eliminates dual scrollbar
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    // Section 4: toggle ParticleNebula gathered state based on visibility
    const s4Ref = useRef(null);
    const [s4Gathered, setS4Gathered] = useState(false);
    useEffect(() => {
        if (!s4Ref.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => setS4Gathered(entry.isIntersecting),
            { threshold: 0.3 }
        );
        obs.observe(s4Ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            className="h-screen overflow-y-scroll"
            style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}
        >

            {/* ══════════════════════════════════════════
                SECTION 1 — HERO INTRO
            ══════════════════════════════════════════ */}
            <HeroIntro />

            {/* ══════════════════════════════════════════
                SECTION 2 — DATA INTELLIGENCE
            ══════════════════════════════════════════ */}
            <section
                className="relative h-screen w-full bg-[#03070a] border-t border-[#0d0d0d] overflow-hidden flex items-center"
                style={{ scrollSnapAlign: 'start' }}
            >
                <div className="absolute left-0 top-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1E5672]/15 to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                        <div className="lg:col-span-5">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="font-body text-[#3C7795] text-[10px] tracking-[0.3em] uppercase mb-8"
                            >
                                {c.s2label}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9 }}
                            >
                                <h2 className="font-title-en text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-title block">{c.s2head1}</h2>
                                <h2 className="font-title-en text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-title block mb-8">{c.s2head2}</h2>
                            </motion.div>
                            <div className="w-8 h-[1px] bg-[#3C7795]/30 mb-8" />
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="font-body text-[#8AAEC0] text-sm md:text-base leading-body whitespace-pre-line"
                            >
                                {c.s2body}
                            </motion.p>
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-3">
                            {DATA_METRICS.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06 }}
                                    className="bg-black/40 border border-[#1a1a1a] hover:border-[#2a2a2a] rounded-2xl p-6 transition-colors group"
                                >
                                    <div className="font-body text-[9px] tracking-[0.25em] text-[#333] uppercase mb-4">{item.label}</div>
                                    <div className="font-body text-2xl md:text-3xl font-bold leading-none text-[#3C7795] group-hover:text-[#8AAEC0] transition-colors">
                                        {item.val}<span className="text-base opacity-60">{item.unit}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                SECTION 3 — THE PROTOCOL
            ══════════════════════════════════════════ */}
            <section
                className="relative h-screen w-full bg-black border-t border-[#0d0d0d] overflow-hidden flex items-center"
                style={{ scrollSnapAlign: 'start' }}
            >
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="font-body text-[#3C7795] text-[10px] tracking-[0.3em] uppercase mb-8"
                    >
                        {c.s3label}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-16"
                    >
                        <h2 className="font-title-en text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-title block">{c.s3head1}</h2>
                        <h2 className="font-title-en text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-title block">{c.s3head2}</h2>
                    </motion.div>

                    <div className="border-t border-[#1a1a1a]">
                        {c.steps.map((step, i) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="grid grid-cols-12 gap-6 py-10 border-b border-[#1a1a1a] group"
                            >
                                <div className="col-span-1">
                                    <span className="font-body text-[#3C7795] text-[10px] tracking-[0.2em]">{step.num}</span>
                                </div>
                                <div className="col-span-11 md:col-span-3">
                                    <h3 className="font-title-en text-xl md:text-2xl text-white leading-title group-hover:text-[#8AAEC0] transition-colors duration-300">{step.title}</h3>
                                </div>
                                <div className="col-span-11 col-start-2 md:col-span-8 md:col-start-auto">
                                    <p className="font-body text-[#8AAEC0]/70 text-sm leading-body">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                SECTION 4 — CTA FINALE
            ══════════════════════════════════════════ */}
            <section
                ref={s4Ref}
                className="relative h-screen w-full bg-[#03070a] border-t border-[#0d0d0d] overflow-hidden flex flex-col items-center justify-center text-center"
                style={{ scrollSnapAlign: 'start' }}
            >
                {/* ParticleNebula background — gathered toggles on section visibility */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Suspense fallback={null}>
                        <ParticleNebula gathered={s4Gathered} />
                    </Suspense>
                </div>

                {/* Dark overlay — improves text readability over nebula */}
                <div className="absolute inset-0 z-[1] pointer-events-none bg-[#03070a]/60" />

                <div className="relative z-10 max-w-7xl mx-auto px-6">

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-6 mb-14"
                    >
                        <div className="w-16 h-[1px] bg-[#3C7795]/25" />
                        <span className="font-body text-[#3C7795] text-[10px] tracking-[0.4em] uppercase">AXIOM</span>
                        <div className="w-16 h-[1px] bg-[#3C7795]/25" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-title-en text-[clamp(3rem,9vw,8rem)] text-white leading-none tracking-tight mb-3"
                    >
                        {c.s4head1}
                    </motion.h2>
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="font-title-en text-[clamp(3rem,9vw,8rem)] text-white leading-none tracking-tight mb-14"
                    >
                        {c.s4head2}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="font-body text-[#8AAEC0] text-base md:text-lg leading-body mb-14"
                    >
                        {c.s4body}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.45 }}
                    >
                        <Link
                            to="/diagnosis"
                            className="inline-flex items-center gap-4 px-16 py-5 font-body font-semibold text-sm tracking-[0.22em] uppercase rounded-full btn-glow"
                        >
                            {c.s4cta}
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                SECTION 5 — INTEGRATED FOOTER
            ══════════════════════════════════════════ */}
            <section
                className="relative h-screen w-full bg-black border-t border-[#0d0d0d] overflow-hidden flex flex-col"
                style={{ scrollSnapAlign: 'start' }}
            >
                <div className="flex-1 max-w-7xl mx-auto px-6 w-full grid grid-cols-2 md:grid-cols-4 gap-10 items-start pt-20 md:pt-32">

                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/">
                            <img src="/images/Axiom_logo.svg" alt="AXIOM" className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity mb-5" />
                        </Link>
                        <p className="font-body text-sm text-[#8AAEC0]/50 leading-relaxed max-w-[200px]" style={{ wordBreak: 'keep-all' }}>
                            데이터가 보여주는 가장 아름다운 진실
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <p className="font-body text-[10px] text-[#8AAEC0]/30 tracking-[0.25em] uppercase mb-6">Shop</p>
                        <ul className="space-y-4">
                            <li><Link to="/curations" className="font-body text-sm text-[#8AAEC0]/50 hover:text-[#3C7795] transition-colors">전체 상품</Link></li>
                            <li><Link to="/analysis" className="font-body text-sm text-[#8AAEC0]/50 hover:text-[#3C7795] transition-colors">AI 피부 진단</Link></li>
                            <li><Link to="/shop" className="font-body text-sm text-[#8AAEC0]/50 hover:text-[#3C7795] transition-colors">맞춤 처방</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <p className="font-body text-[10px] text-[#8AAEC0]/30 tracking-[0.25em] uppercase mb-6">Company</p>
                        <ul className="space-y-4">
                            <li><Link to="/brand" className="font-body text-sm text-[#8AAEC0]/50 hover:text-[#3C7795] transition-colors">브랜드 스토리</Link></li>
                            <li><Link to="/datalab" className="font-body text-sm text-[#8AAEC0]/50 hover:text-[#3C7795] transition-colors">데이터 랩</Link></li>
                            <li><Link to="/editorial" className="font-body text-sm text-[#8AAEC0]/50 hover:text-[#3C7795] transition-colors">리서처 에디토리얼</Link></li>
                            <li><Link to="/data-map" className="font-body text-sm text-[#8AAEC0]/50 hover:text-[#3C7795] transition-colors">글로벌 데이터 맵</Link></li>
                            <li><Link to="/team-dyt" className="font-body text-sm text-[#8AAEC0]/50 hover:text-[#3C7795] transition-colors">팀 소개</Link></li>
                        </ul>
                    </div>

                    {/* Follow */}
                    <div>
                        <p className="font-body text-[10px] text-[#8AAEC0]/30 tracking-[0.25em] uppercase mb-6">Follow</p>
                        <ul className="space-y-4">
                            <li>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-[#8AAEC0]/50 hover:text-[#8AAEC0] transition-colors inline-flex items-center gap-2.5">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-[#8AAEC0]/50 hover:text-[#8AAEC0] transition-colors inline-flex items-center gap-2.5">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
                                    YouTube
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="max-w-7xl mx-auto px-6 w-full py-10 border-t border-[#0d0d0d]">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="font-body text-xs text-[#8AAEC0]/25">
                            © 2026 AXIOM Inc. All rights reserved. Designed by{' '}
                            <Link to="/team-dyt" className="hover:text-[#8AAEC0]/60 transition-colors">Team DYT</Link>
                        </p>
                        <div className="flex items-center gap-6">
                            <Link to="/privacy" target="_blank" className="font-body text-xs text-[#8AAEC0]/25 hover:text-[#8AAEC0]/60 transition-colors">개인정보처리방침</Link>
                            <span className="font-body text-xs text-[#8AAEC0]/25">이용약관</span>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
