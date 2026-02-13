import React from 'react';
import { motion } from 'framer-motion';

// SVG Icons
const QuoteIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="#00E0FF" className="opacity-80 mb-8">
        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
    </svg>
);

const LineDivider = () => <div className="border-t border-[#333] w-full my-12" />;

export default function About() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#00E0FF] selection:text-black">

            {/* 1. HERO QUOTE SECTION */}
            <section className="h-screen flex flex-col justify-center items-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                >
                    <QuoteIcon />
                    <h2 className="font-serif font-semibold text-3xl md:text-5xl lg:text-6xl leading-title tracking-normal mb-10 whitespace-nowrap hidden md:block">
                        모든 피부는 태어나는 순간, 자신만의 고유한 중심축을 가집니다.
                    </h2>
                    <h2 className="font-serif font-semibold text-3xl md:hidden leading-title tracking-normal mb-10 text-white">
                        모든 피부는 태어나는 순간,<br />자신만의 고유한 중심축을 가집니다.
                    </h2>
                    <p className="font-sans font-normal text-[#8AAEC0] text-base md:text-lg leading-body tracking-normal max-w-2xl mx-auto">
                        환경과 생활 습관, 시간의 흐름 속에서 피부는 다양한 신호를 남기며<br className="hidden md:block" />
                        점차 본래의 균형에서 벗어나게 됩니다.
                    </p>
                </motion.div>
            </section>

            {/* 2. RESEARCH GRID SECTION */}
            <section className="max-w-7xl mx-auto px-6 pb-40">
                <LineDivider />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">

                    {/* Sidebar Title (Research Report Style) */}
                    <div className="md:col-span-3 sticky top-32 h-fit">
                        <h3 className="font-serif font-semibold text-2xl text-white mb-3 leading-title">Research<br />Background</h3>
                        <p className="font-mono text-[10px] text-[#00E0FF] uppercase tracking-[0.2em] font-bold">Axiom Philosophy v2.6</p>
                    </div>

                    {/* Main Content Sections */}
                    <div className="md:col-span-9 space-y-32">

                        {/* Block 1: SIGNAL & ANALYSIS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                                <h4 className="font-mono text-xs text-[#00E0FF] tracking-[0.2em] mb-4 font-bold">KEYWORD 01: SIGNAL</h4>
                                <p className="font-sans text-[#8AAEC0] text-sm md:text-base leading-body">
                                    Axiom은 피부 깊은 곳에 남아 있는 미세한 신호와 일상의 패턴 데이터를 분석해 피부 상태의 변화를 읽어냅니다.
                                </p>
                            </motion.div>
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                                <h4 className="font-mono text-xs text-white/50 tracking-[0.2em] mb-4 font-bold">KEYWORD 02: ANALYSIS</h4>
                                <p className="font-sans text-[#8AAEC0] text-sm md:text-base leading-body">
                                    감각이나 유행이 아닌, 피부 타입과 컨디션, 성분 반응 데이터를 기준으로 피부를 해석합니다. 가장 필요한 스킨케어만을 정확하게 제안합니다.
                                </p>
                            </motion.div>
                        </div>

                        {/* Block 2: ART & VISUALIZATION (Highlight Box) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#05080a] border border-[#222] p-8 md:p-16 rounded-sm"
                        >
                            <h4 className="font-serif text-[#00E0FF] text-2xl mb-8">Pure Science & Art</h4>
                            <p className="font-sans text-white text-xl md:text-2xl font-light leading-title mb-8 tracking-tight">
                                "당신이라는 존재를 증명하는<br className="md:hidden" /> 유일무이한 디지털 예술"
                            </p>
                            <p className="font-sans text-[#8AAEC0] text-sm md:text-base leading-body max-w-xl mb-12">
                                딥블루의 고요한 가상 공간 속에서 실시간으로 피어나는 당신의 데이터 오브제를 마주해 보세요. 그것은 당신의 피부를 위한 가장 완벽한 해답입니다.
                            </p>
                            <div className="h-[1px] bg-gradient-to-r from-[#00E0FF] to-transparent w-full opacity-30" />
                        </motion.div>

                        {/* Block 3: RESET */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="max-w-2xl"
                        >
                            <h4 className="font-mono text-[#00E0FF] text-xs tracking-[0.2em] mb-6 font-bold uppercase">Final Step: Reset</h4>
                            <h5 className="font-serif text-3xl text-white mb-6 leading-title">흩어진 정보를 하나의 질서로 정리하고,<br />흐려진 피부의 중심축을 다시 세우는 것.</h5>
                            <p className="font-sans text-[#8AAEC0] text-base leading-body">
                                Axiom은 복잡한 피부 고민 속에서 당신에게 가장 정확하고 본질적인 답을 제공합니다. 데이터가 도출한 최적의 처방으로 당신의 축을 리셋하세요.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Footer Branding */}
            <section className="py-24 border-t border-[#111] text-center">
                <span className="font-serif text-white/20 text-8xl md:text-[12rem] tracking-tighter select-none">AXIOM</span>
            </section>
        </div>
    );
}