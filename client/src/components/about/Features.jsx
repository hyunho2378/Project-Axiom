import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const FEATURES = [
    {
        title: 'Personalized Curation',
        desc: '20가지 피부 타입 분류 체계로 당신만의 루틴을 구성합니다.',
        preview: '/images/feature-curation.jpg',
    },
    {
        title: 'Data-Driven Recommendation',
        desc: '질문 기반 진단 데이터를 통해 가장 적합한 제품을 매칭합니다.',
        preview: '/images/feature-data.jpg',
    },
    {
        title: 'Immersive 3D Experience',
        desc: '피부 분석 과정을 3D 시각화로 표현하여 진단 여정을 경험하게 합니다.',
        preview: '/images/feature-3d.jpg',
    },
];

export default function Features() {
    const [activeIndex, setActiveIndex] = useState(null);
    const prefersReduced = useReducedMotion();

    return (
        <section className="py-32 px-6 bg-void-deep border-t border-ui-border">
            <div className="max-w-7xl mx-auto">

                <div className="mb-16">
                    <p className="font-body text-brand-600 text-[10px] tracking-[0.3em] uppercase mb-4">Features</p>
                    <h2 className="font-title-en text-[clamp(2rem,4vw,3.5rem)] text-ui-textPrimary leading-title-lg">
                        Built different.
                    </h2>
                </div>

                <div className="space-y-4">
                    {FEATURES.map((f, i) => (
                        <div key={f.title}>
                            <motion.div
                                initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex items-start justify-between gap-8 py-8 border-b border-ui-border cursor-pointer group"
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                            >
                                <div className="flex-1">
                                    <h3 className="font-title-en text-xl md:text-2xl text-ui-textPrimary leading-title mb-2 group-hover:text-neon-cyan transition-colors duration-300">
                                        {f.title}
                                    </h3>
                                    <p className="font-body text-ui-textMuted text-sm leading-body-lg">{f.desc}</p>
                                </div>
                                <motion.span
                                    animate={{ rotate: activeIndex === i ? 45 : 0 }}
                                    transition={{ duration: prefersReduced ? 0 : 0.2 }}
                                    className="font-body text-brand-600 text-2xl leading-none mt-1 flex-shrink-0"
                                >
                                    +
                                </motion.span>
                            </motion.div>

                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        layoutId={`feature-preview-${i}`}
                                        initial={prefersReduced ? {} : { opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={prefersReduced ? {} : { opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="py-6">
                                            <div className="w-full h-48 bg-void-lighter rounded-2xl border border-ui-border flex items-center justify-center">
                                                <img
                                                    src={f.preview}
                                                    alt={f.title}
                                                    className="w-full h-full object-cover rounded-2xl"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                                <span className="font-body text-ui-textMuted text-xs tracking-widest uppercase absolute">Preview</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
