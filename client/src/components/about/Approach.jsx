import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';

const APPROACH = [
    { title: 'Craft', desc: '모든 진단 단계는 피부과학 연구 기반으로 설계되었습니다.' },
    { title: 'Detail', desc: '20가지 피부 타입을 세분화하여 정교한 매칭을 실현합니다.' },
    { title: 'Personalization', desc: '당신의 피부는 세상에 하나뿐입니다. 솔루션도 마찬가지입니다.' },
    { title: 'Luxury', desc: '럭셔리는 가격이 아닌, 정밀함과 경험에서 나옵니다.' },
    { title: 'Science', desc: '성분과 피부 반응의 관계를 데이터로 추적합니다.' },
    { title: 'Trust', desc: '과장 없는 진단, 근거 있는 추천만 제공합니다.' },
];

function TiltCard({ item, index, prefersReduced }) {
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
            <p className="font-title-en text-neon-cyan text-xs tracking-widest uppercase mb-4">{item.title}</p>
            <p className="font-body text-ui-textSecondary text-sm leading-body-lg">{item.desc}</p>
        </motion.div>
    );
}

export default function Approach() {
    const prefersReduced = useReducedMotion();

    return (
        <section className="py-32 px-6 bg-void-deepest border-t border-ui-border overflow-hidden">
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
