import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Curations Section
 * 
 * Horizontal scroll section showing product cards.
 * Scrolls left-to-right as user scrolls down.
 */
export default function Curations({ language }) {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Transform vertical scroll to horizontal movement
    const x = useTransform(scrollYProgress, [0.1, 0.9], ["5%", "-55%"]);

    const content = {
        ko: {
            title: "Curations",
            subtitle: "당신을 위해 선별된 프로덕트",
            products: [
                { id: 1, name: "Aura Serum", category: "세럼", description: "피부 깊숙이 수분 공급", color: "from-purple-500/20 to-blue-500/20" },
                { id: 2, name: "Glow Essence", category: "에센스", description: "빛나는 광채 피부", color: "from-pink-500/20 to-purple-500/20" },
                { id: 3, name: "Calm Cream", category: "크림", description: "민감한 피부 진정", color: "from-blue-500/20 to-teal-500/20" },
                { id: 4, name: "Pure Cleanser", category: "클렌저", description: "순수한 첫 단계", color: "from-teal-500/20 to-green-500/20" },
                { id: 5, name: "Night Repair", category: "나이트 케어", description: "수면 중 피부 재생", color: "from-indigo-500/20 to-purple-500/20" }
            ]
        },
        en: {
            title: "Curations",
            subtitle: "Products curated just for you",
            products: [
                { id: 1, name: "Aura Serum", category: "Serum", description: "Deep hydration for your skin", color: "from-purple-500/20 to-blue-500/20" },
                { id: 2, name: "Glow Essence", category: "Essence", description: "Radiant, glowing skin", color: "from-pink-500/20 to-purple-500/20" },
                { id: 3, name: "Calm Cream", category: "Cream", description: "Soothe sensitive skin", color: "from-blue-500/20 to-teal-500/20" },
                { id: 4, name: "Pure Cleanser", category: "Cleanser", description: "The pure first step", color: "from-teal-500/20 to-green-500/20" },
                { id: 5, name: "Night Repair", category: "Night Care", description: "Overnight skin renewal", color: "from-indigo-500/20 to-purple-500/20" }
            ]
        },
        zh: {
            title: "Curations",
            subtitle: "为您精选的产品",
            products: [
                { id: 1, name: "Aura Serum", category: "精华液", description: "深层补水", color: "from-purple-500/20 to-blue-500/20" },
                { id: 2, name: "Glow Essence", category: "精华", description: "焕发肌肤光彩", color: "from-pink-500/20 to-purple-500/20" },
                { id: 3, name: "Calm Cream", category: "面霜", description: "舒缓敏感肌肤", color: "from-blue-500/20 to-teal-500/20" },
                { id: 4, name: "Pure Cleanser", category: "洁面乳", description: "纯净第一步", color: "from-teal-500/20 to-green-500/20" },
                { id: 5, name: "Night Repair", category: "夜间护理", description: "睡眠中修复肌肤", color: "from-indigo-500/20 to-purple-500/20" }
            ]
        }
    };

    const t = content[language] || content.ko;

    return (
        <section
            ref={containerRef}
            className="relative h-[200vh] bg-void"
            id="curations"
        >
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                {/* Section Header */}
                <div className="px-6 md:px-12 lg:px-24 mb-12">
                    <motion.h2
                        className="font-title-en text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-3"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        {t.title}
                    </motion.h2>
                    <motion.p
                        className="text-lg text-white/50"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        {t.subtitle}
                    </motion.p>
                </div>

                {/* Horizontal Scroll Track */}
                <motion.div
                    className="flex gap-6 md:gap-8 pl-6 md:pl-12 lg:pl-24"
                    style={{ x }}
                >
                    {t.products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="flex-shrink-0 w-[320px] md:w-[380px] lg:w-[420px] group cursor-pointer"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Product Card */}
                            <div className="relative h-[400px] md:h-[480px] rounded-3xl overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] transition-all duration-500 group-hover:border-white/[0.15] group-hover:bg-white/[0.05]">
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />

                                {/* Product Image Placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-48 md:w-40 md:h-56 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                        <span className="text-white/30 text-4xl font-title-en">{product.id}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                    <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider text-white/60 bg-white/10 rounded-full mb-3">
                                        {product.category}
                                    </span>
                                    <h3 className="font-body text-xl md:text-2xl font-medium text-white mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Hover Arrow */}
                                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* View All Card */}
                    <div className="flex-shrink-0 w-[200px] md:w-[250px] h-[400px] md:h-[480px] flex items-center justify-center">
                        <button className="flex flex-col items-center gap-4 text-white/40 hover:text-white/80 transition-colors duration-300 group">
                            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                            <span className="text-sm uppercase tracking-wider">View All</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
