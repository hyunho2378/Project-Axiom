import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const BODY = {
    ko: '감각이나 유행이 아닌, 피부 타입과 컨디션, 성분 반응 데이터를 기준으로 피부를 해석합니다. AXIOM은 수백만 개의 데이터 포인트를 분석하여 당신 피부만의 고유한 중심축을 정의합니다.',
    en: 'We interpret skin not through trends or sensation, but through skin type, condition, and ingredient response data. AXIOM analyzes millions of data points to define the singular, unwavering axis of your skin.',
};

export default function Philosophy() {
    const { language } = useLanguage();
    const body = BODY[language] || BODY.en;
    const words = body.split(' ');
    const prefersReduced = useReducedMotion();

    return (
        <section className="py-32 px-6 bg-void-deep border-t border-ui-border">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <motion.div
                    initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                >
                    <p className="font-body text-brand-600 text-[10px] tracking-[0.3em] uppercase mb-6">Philosophy</p>
                    <h2 className="font-title-en text-[clamp(2rem,4vw,3.5rem)] text-ui-textPrimary leading-title-lg">
                        Inspired by science.<br />Made for you.
                    </h2>
                </motion.div>

                <div className="font-body text-ui-textSecondary text-base md:text-lg leading-body-lg">
                    {prefersReduced ? (
                        <p>{body}</p>
                    ) : (
                        <p>
                            {words.map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0.15 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: i * 0.02 }}
                                    className="inline-block mr-1"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
}
