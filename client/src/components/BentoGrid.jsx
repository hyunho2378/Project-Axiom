import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * BentoGrid Section
 * 
 * Glass Bento box-style feature grid with hover effects.
 */
export default function BentoGrid({ language }) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const content = {
        ko: {
            title: "The Logic",
            subtitle: "과학과 감각의 융합",
            cards: [
                {
                    id: 'types',
                    title: "6 Aura Types",
                    description: "당신만의 고유한 피부 유형 분석",
                    size: "large"
                },
                {
                    id: 'ai',
                    title: "AI Analysis",
                    description: "실시간 딥러닝 진단",
                    size: "small"
                },
                {
                    id: 'formula',
                    title: "Custom Formula",
                    description: "1:1 맞춤 성분 배합",
                    size: "small"
                },
                {
                    id: 'sustain',
                    title: "Sustainability",
                    description: "지속 가능한 뷰티를 위한 약속",
                    size: "wide"
                }
            ]
        },
        en: {
            title: "The Logic",
            subtitle: "Fusion of Science and Sense",
            cards: [
                {
                    id: 'types',
                    title: "6 Aura Types",
                    description: "Your unique skin type analysis",
                    size: "large"
                },
                {
                    id: 'ai',
                    title: "AI Analysis",
                    description: "Real-time deep learning diagnosis",
                    size: "small"
                },
                {
                    id: 'formula',
                    title: "Custom Formula",
                    description: "1:1 personalized ingredients",
                    size: "small"
                },
                {
                    id: 'sustain',
                    title: "Sustainability",
                    description: "Our promise for sustainable beauty",
                    size: "wide"
                }
            ]
        },
        zh: {
            title: "The Logic",
            subtitle: "科学与感官的融合",
            cards: [
                {
                    id: 'types',
                    title: "6 Aura Types",
                    description: "您独特的皮肤类型分析",
                    size: "large"
                },
                {
                    id: 'ai',
                    title: "AI Analysis",
                    description: "实时深度学习诊断",
                    size: "small"
                },
                {
                    id: 'formula',
                    title: "Custom Formula",
                    description: "1:1定制成分配方",
                    size: "small"
                },
                {
                    id: 'sustain',
                    title: "Sustainability",
                    description: "可持续美丽的承诺",
                    size: "wide"
                }
            ]
        }
    };

    const t = content[language] || content.ko;

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
            }
        })
    };

    // Icons for cards
    const icons = {
        types: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
            </svg>
        ),
        ai: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
        formula: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 3h6v4l4 8H5l4-8V3z" />
                <path d="M9 3h6" />
                <circle cx="12" cy="17" r="4" />
            </svg>
        ),
        sustain: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22c4-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 4 8 8 12z" />
                <path d="M12 12v6" />
                <path d="M9 15l3-3 3 3" />
            </svg>
        )
    };

    return (
        <section
            ref={containerRef}
            className="relative py-32 px-6 md:px-12 lg:px-24 bg-void overflow-hidden"
            id="diagnosis"
        >
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

            {/* Section Header */}
            <motion.div
                className="max-w-7xl mx-auto mb-16 md:mb-24"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <h2 className="font-title-en text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4">
                    {t.title}
                </h2>
                <p className="text-lg text-white/50 font-body">
                    {t.subtitle}
                </p>
            </motion.div>

            {/* Bento Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {t.cards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className={`
              group relative p-8 md:p-10 rounded-3xl cursor-pointer
              bg-white/[0.03] backdrop-blur-xl
              border border-white/[0.08]
              transition-all duration-500
              hover:bg-white/[0.06] hover:border-white/[0.15]
              hover:shadow-[0_0_60px_-12px_rgba(168,85,247,0.3)]
              ${card.size === 'large' ? 'md:col-span-1 md:row-span-2 min-h-[280px] md:min-h-[400px]' : ''}
              ${card.size === 'wide' ? 'md:col-span-2 min-h-[180px]' : ''}
              ${card.size === 'small' ? 'min-h-[180px]' : ''}
            `}
                    >
                        {/* Gradient Border on Hover */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <div className="absolute inset-[-1px] rounded-3xl bg-gradient-to-br from-purple-500/30 via-transparent to-blue-500/30" style={{ padding: '1px' }}>
                                <div className="w-full h-full rounded-3xl bg-void" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col">
                            {/* Icon */}
                            <div className="text-white/40 group-hover:text-purple-400/80 transition-colors duration-300 mb-auto">
                                {icons[card.id]}
                            </div>

                            {/* Text */}
                            <div className="mt-8">
                                <h3 className="font-body text-xl md:text-2xl font-medium text-white mb-2 tracking-tight">
                                    {card.title}
                                </h3>
                                <p className="text-sm md:text-base text-white/40 group-hover:text-white/60 transition-colors duration-300">
                                    {card.description}
                                </p>
                            </div>

                            {/* Large Card Gradient Background */}
                            {card.size === 'large' && (
                                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                                    <div
                                        className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(236, 72, 153, 0.15) 100%)'
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
