import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const FEATURES = [
    {
        title: 'Personalized Curation',
        desc: { ko: '20가지 피부 타입 분류 체계로 당신만의 루틴을 구성합니다.', en: '20 skin type classifications. One perfectly curated routine, built for you.' },
    },
    {
        title: 'Data-Driven Recommendation',
        desc: { ko: '질문 기반 진단 데이터를 통해 가장 적합한 제품을 매칭합니다.', en: 'Question-based diagnostic data matched to the most precisely suited formulas.' },
    },
    {
        title: 'Immersive 3D Experience',
        desc: { ko: '피부 분석 과정을 3D 시각화로 표현하여 진단 여정을 경험하게 합니다.', en: 'The analysis journey rendered in 3D — your skin story, made visible.' },
    },
];

export default function Features() {
    const { language } = useLanguage();
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
                        <motion.div
                            key={f.title}
                            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="py-8 border-b border-ui-border"
                        >
                            <h3 className="font-title-en text-xl md:text-2xl text-ui-textPrimary leading-title mb-2">
                                {f.title}
                            </h3>
                            <p className="font-body text-ui-textMuted text-sm leading-body-lg">{f.desc[language] || f.desc.en}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
