import { motion, useReducedMotion } from 'framer-motion';

const VOICES = [
    { quote: "처음으로 내 피부를 과학적으로 이해한 기분이었습니다.", name: "김지수", role: "스킨케어 애호가" },
    { quote: "매일 쓰던 제품이 왜 안 맞았는지 이제야 알았습니다.", name: "이민준", role: "남성 뷰티 유저" },
    { quote: "10단계 진단이 끝나고 나온 결과가 너무 정확해서 놀랐습니다.", name: "박서연", role: "피부과 방문 경험자" },
    { quote: "추천 제품을 써보니 피부 트러블이 확연히 줄었습니다.", name: "정하은", role: "민감성 피부 사용자" },
];

export default function Voices() {
    const prefersReduced = useReducedMotion();

    return (
        <section className="py-32 px-6 bg-void-deep border-t border-ui-border">
            <div className="max-w-7xl mx-auto">

                <div className="mb-16">
                    <p className="font-body text-brand-600 text-[10px] tracking-[0.3em] uppercase mb-4">Voices</p>
                    <h2 className="font-title-en text-[clamp(2rem,4vw,3.5rem)] text-ui-textPrimary leading-title-lg">
                        Real skin. Real results.
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {VOICES.map((v, i) => (
                        <motion.div
                            key={v.name}
                            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={prefersReduced ? {} : { y: -8, borderColor: '#2A6885', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
                            className="p-8 rounded-2xl border border-ui-border"
                            style={{ background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(12px)' }}
                        >
                            <p className="font-body text-ui-textSecondary text-base leading-body-lg mb-6">
                                &ldquo;{v.quote}&rdquo;
                            </p>
                            <div>
                                <p className="font-title-ko text-ui-textPrimary text-sm font-semibold">{v.name}</p>
                                <p className="font-body text-ui-textMuted text-xs mt-1">{v.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
