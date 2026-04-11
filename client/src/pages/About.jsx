import { motion } from 'framer-motion';

/**
 * About — AXIOM Brand Philosophy
 * "Luxury Research Archive" aesthetic
 *
 * Design principles:
 * - Full-viewport cinematic serif hero
 * - Thin dividers (#111, #222) — no generic icons
 * - font-mono labels, font-serif titles, font-sans body
 * - AXIOM 4-color palette only: #000, #1E5672, #3C7795, #8AAEC0
 * - max-w-7xl mx-auto px-6 container strictly enforced
 */

const PHILOSOPHY_DATA = [
    {
        index: '01',
        keyword: 'SIGNAL',
        title: '신호',
        body: 'AXIOM은 피부 깊은 곳에 남아 있는 미세한 신호와 일상의 패턴 데이터를 분석해 피부 상태의 변화를 읽어냅니다. 감지되지 않은 신호 안에 당신의 피부 진실이 있습니다.',
    },
    {
        index: '02',
        keyword: 'ANALYSIS',
        title: '분석',
        body: '감각이나 유행이 아닌, 피부 타입과 컨디션, 성분 반응 데이터를 기준으로 피부를 해석합니다. 가장 필요한 스킨케어만을 정확하게 제안합니다.',
    },
    {
        index: '03',
        keyword: 'RESET',
        title: '리셋',
        body: '흩어진 정보를 하나의 질서로 정리하고, 흐려진 피부의 중심축을 다시 세우는 것. AXIOM은 복잡한 피부 고민 속에서 당신에게 가장 정확하고 본질적인 답을 제공합니다.',
    },
];

const PRINCIPLES = [
    { label: 'METHODOLOGY', value: 'Biometric Data Analysis' },
    { label: 'PRECISION TIER', value: 'Clinical Grade' },
    { label: 'DATA POINTS', value: '2,400,000+' },
    { label: 'SKIN ARCHETYPES', value: '20 Defined Types' },
    { label: 'FORMULATION', value: 'Algorithm-Driven' },
    { label: 'VERSION', value: 'AXIOM v2.6' },
];

const LineDivider = () => <div className="border-t border-[#1a1a1a] w-full" />;

export default function About() {
    return (
        <div className="min-h-screen bg-black text-white">

            {/* ── HERO: CINEMATIC QUOTE ── */}
            <section className="relative min-h-screen flex flex-col justify-end pb-24 border-b border-[#111] overflow-hidden">

                {/* Atmospheric depth glow */}
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#1E5672]/6 blur-[200px] pointer-events-none" />

                {/* Vertical index mark */}
                <div className="absolute left-6 top-40 bottom-24 w-[1px] bg-gradient-to-b from-transparent via-[#3C7795]/20 to-transparent hidden lg:block" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="font-mono text-[10px] text-[#3C7795] tracking-[0.35em] uppercase mb-16"
                    >
                        BRAND PHILOSOPHY · AXIOM v2.6
                    </motion.p>

                    {/* Primary quote — large serif */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif text-[clamp(2.2rem,4.5vw,4.5rem)] text-white leading-title mb-12 max-w-4xl"
                    >
                        모든 피부는 태어나는 순간,<br />
                        자신만의 고유한 중심축을<br />
                        가집니다.
                    </motion.h1>

                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="origin-left w-20 h-[1px] bg-[#3C7795]/40 mb-10"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.9, delay: 1.0 }}
                        className="font-sans text-[#8AAEC0] text-base md:text-lg leading-body max-w-lg"
                    >
                        환경과 생활 습관, 시간의 흐름 속에서 피부는 다양한 신호를 남기며
                        점차 본래의 균형에서 벗어나게 됩니다.
                    </motion.p>
                </div>
            </section>

            {/* ── RESEARCH ARCHIVE GRID ── */}
            <section className="max-w-7xl mx-auto px-6 py-40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Sticky sidebar */}
                    <div className="lg:col-span-3">
                        <div className="lg:sticky lg:top-32">
                            <p className="font-mono text-[10px] text-[#3C7795] tracking-[0.25em] uppercase mb-6">Research Background</p>
                            <h2 className="font-serif text-2xl text-white leading-title mb-8">
                                Philosophy<br />Archive
                            </h2>
                            <div className="space-y-4">
                                {PHILOSOPHY_DATA.map(s => (
                                    <a
                                        key={s.index}
                                        href={`#section-${s.index}`}
                                        className="block font-mono text-[11px] text-[#3a3a3a] hover:text-[#8AAEC0] tracking-[0.15em] uppercase transition-colors py-1"
                                    >
                                        {s.index} — {s.keyword}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main body */}
                    <div className="lg:col-span-9">
                        <LineDivider />
                        <div className="space-y-0">
                            {PHILOSOPHY_DATA.map((item, i) => (
                                <motion.div
                                    key={item.index}
                                    id={`section-${item.index}`}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: i * 0.06 }}
                                    className="py-16 border-b border-[#1a1a1a]"
                                >
                                    <div className="flex items-start gap-12">
                                        <span className="font-mono text-[10px] text-[#3C7795] tracking-[0.2em] mt-2 flex-shrink-0 w-8">{item.index}</span>
                                        <div className="flex-1">
                                            <p className="font-mono text-[10px] text-[#3C7795] tracking-[0.2em] uppercase mb-4">{item.keyword}</p>
                                            <h3 className="font-serif text-3xl md:text-4xl text-white leading-title mb-8">{item.title}</h3>
                                            <p className="font-sans text-[#8AAEC0] text-base leading-body max-w-2xl">{item.body}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MANIFESTO BLOCK ── */}
            <section className="border-t border-[#111] py-40">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                        className="bg-[#05080a] border border-[#1a1a1a] rounded-sm p-12 md:p-20"
                    >
                        <p className="font-mono text-[10px] text-[#3C7795] tracking-[0.3em] uppercase mb-10">AXIOM Manifesto</p>
                        <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-title mb-10 max-w-3xl">
                            "당신이라는 존재를 증명하는<br />유일무이한 데이터 오브제."
                        </blockquote>
                        <div className="w-12 h-[1px] bg-[#3C7795]/40 mb-10" />
                        <p className="font-sans text-[#8AAEC0] text-base leading-body max-w-xl">
                            딥블루의 고요한 가상 공간 속에서 실시간으로 피어나는 당신의 데이터 오브제를 마주해 보십시오.
                            그것은 당신의 피부를 위한 가장 완벽한 해답입니다.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── SPECIFICATION TABLE ── */}
            <section className="border-t border-[#111] py-40">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="font-mono text-[10px] text-[#3C7795] tracking-[0.3em] uppercase mb-16"
                    >
                        System Specifications
                    </motion.p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-t border-l border-[#1a1a1a]">
                        {PRINCIPLES.map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="border-r border-b border-[#1a1a1a] p-8 md:p-10"
                            >
                                <p className="font-mono text-[9px] text-[#333] tracking-[0.25em] uppercase mb-3">{item.label}</p>
                                <p className="font-sans text-sm text-[#8AAEC0]">{item.value}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FOOTER STAMP ── */}
            <section className="py-32 border-t border-[#111] text-center overflow-hidden">
                <span className="font-serif text-white/[0.04] text-[10rem] md:text-[16rem] leading-none tracking-tighter select-none">
                    AXIOM
                </span>
            </section>

        </div>
    );
}
