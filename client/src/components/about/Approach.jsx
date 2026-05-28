import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';

const APPROACH = [
    { title: 'Craft',           sub: '정교한 설계', desc: '모든 진단 단계는 피부과학 연구 기반으로 설계되었습니다.' },
    { title: 'Detail',          sub: '세밀한 분류', desc: '20가지 피부 타입을 세분화하여 정교한 매칭을 실현합니다.' },
    { title: 'Personalization', sub: '오직 당신만', desc: '당신의 피부는 세상에 하나뿐입니다. 솔루션도 마찬가지입니다.' },
    { title: 'Fact',            sub: '사실과 진실', desc: '느낌이나 추측이 아닌 데이터만으로 진단합니다.' },
    { title: 'One & Only',      sub: '단 한 사람',  desc: '모두가 아닌 당신 한 사람에게만 맞춤화됩니다.' },
    { title: 'Art',             sub: '미학적 경험', desc: '기술은 똑똑해야 하고, 결과물은 아름다워야 합니다.' },
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
            <h3 className="font-title-en text-2xl text-white">{item.title}</h3>
            <p className="font-body text-brand-400 text-xs tracking-wider mt-1">{item.sub}</p>
            <p className="font-body text-ui-textSecondary text-sm mt-3">{item.desc}</p>
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
