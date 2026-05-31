import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const APPROACH = [
    { title: 'Craft',           sub: { ko: '정교한 설계', en: 'Precision Design' },         desc: { ko: '모든 진단 단계는 피부과학 연구 기반으로 설계되었습니다.',          en: 'Every diagnostic step is grounded in dermatological science.' } },
    { title: 'Detail',          sub: { ko: '세밀한 분류', en: 'Meticulous Classification' }, desc: { ko: '20가지 피부 타입을 세분화하여 정교한 매칭을 실현합니다.',          en: 'Twenty skin types, each mapped with precision for the most exact match.' } },
    { title: 'Personalization', sub: { ko: '오직 당신만', en: 'You, Only You' },             desc: { ko: '당신의 피부는 세상에 하나뿐입니다. 솔루션도 마찬가지입니다.',      en: 'Your skin is one of a kind. So is every solution we create.' } },
    { title: 'Fact',            sub: { ko: '사실과 진실', en: 'Truth Above All' },           desc: { ko: '느낌이나 추측이 아닌 데이터만으로 진단합니다.',                    en: 'Not intuition. Not trend. Data alone shapes every diagnosis.' } },
    { title: 'One & Only',      sub: { ko: '단 한 사람',  en: 'One Person' },               desc: { ko: '모두가 아닌 당신 한 사람에게만 맞춤화됩니다.',                    en: 'Formulated for one — you — and no one else.' } },
    { title: 'Art',             sub: { ko: '미학적 경험', en: 'Aesthetic Experience' },      desc: { ko: '기술은 똑똑해야 하고, 결과물은 아름다워야 합니다.',              en: 'Intelligent technology must produce beautiful results.' } },
];

function TiltCard({ item, index, prefersReduced }) {
    const { language } = useLanguage();
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const rotateX = useTransform(mouseY, [0, 1], [10, -10]);
    const rotateY = useTransform(mouseX, [0, 1], [-10, 10]);

    const handleMouse = (e) => {
        if (prefersReduced || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };
    const handleLeave = () => { mouseX.set(0.5); mouseY.set(0.5); };

    return (
        <motion.div
            ref={cardRef}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            style={prefersReduced ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            className="flex-shrink-0 w-64 md:w-auto p-8 rounded-2xl border border-ui-border snap-start cursor-default"
            whileHover={prefersReduced ? {} : { borderColor: '#2A6885' }}
        >
            <h3 className="font-title-en text-2xl text-white">{item.title}</h3>
            <p className="font-body text-brand-400 text-xs tracking-wider mt-1">{item.sub[language] || item.sub.en}</p>
            <p className="font-body text-ui-textSecondary text-sm mt-3">{item.desc[language] || item.desc.en}</p>
        </motion.div>
    );
}

export default function Approach() {
    const prefersReduced = useReducedMotion();

    return (
        <section className="py-32 px-6 bg-void-deepest overflow-hidden">
            <div className="max-w-7xl mx-auto">

                <div className="mb-16">
                    <p className="font-body text-brand-600 text-[10px] tracking-[0.3em] uppercase mb-4">Approach</p>
                    <h2 className="font-title-en text-[clamp(2rem,4vw,3.5rem)] text-ui-textPrimary leading-title-lg">
                        Core values.
                    </h2>
                </div>

                {/* Mobile: horizontal scroll / Desktop: 3-col grid */}
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:overflow-x-visible" style={{ scrollbarWidth: 'none' }}>
                    {APPROACH.map((item, i) => (
                        <TiltCard key={item.title} item={item} index={i} prefersReduced={prefersReduced} />
                    ))}
                </div>

            </div>
        </section>
    );
}
