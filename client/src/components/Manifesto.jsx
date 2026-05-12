import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Manifesto Section
 * 
 * Apple Vision Pro-style sticky text parallax effect.
 * Three text blocks fade in/out sequentially as user scrolls.
 */
export default function Manifesto({ language }) {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const text = {
        ko: [
            "피부는 데이터다.",
            "표면 너머를 보다.",
            "당신의 아름다움을 조각하다."
        ],
        en: [
            "Skin is Data.",
            "Beyond the Surface.",
            "Sculpt Your Beauty."
        ],
        zh: [
            "肌肤即数据。",
            "超越表面。",
            "雕刻你的美丽。"
        ]
    };

    const t = text[language] || text.ko;

    // Transform values for each text block
    // Text 1: 0 - 0.33
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.33], [0, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.33], [60, 0, 0, -60]);
    const scale1 = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.33], [0.9, 1, 1, 0.95]);

    // Text 2: 0.33 - 0.66
    const opacity2 = useTransform(scrollYProgress, [0.28, 0.38, 0.55, 0.66], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.28, 0.38, 0.55, 0.66], [60, 0, 0, -60]);
    const scale2 = useTransform(scrollYProgress, [0.28, 0.38, 0.55, 0.66], [0.9, 1, 1, 0.95]);

    // Text 3: 0.66 - 1.0
    const opacity3 = useTransform(scrollYProgress, [0.6, 0.72, 0.88, 1], [0, 1, 1, 0.8]);
    const y3 = useTransform(scrollYProgress, [0.6, 0.72, 0.88, 1], [60, 0, 0, 0]);
    const scale3 = useTransform(scrollYProgress, [0.6, 0.72, 0.88, 1], [0.9, 1, 1, 1]);

    // Ambient glow animation
    const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.25, 0.15]);
    const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1.1]);

    return (
        <section
            ref={containerRef}
            className="relative h-[300vh] bg-void"
            id="manifesto"
        >
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {/* Ambient Glow */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: glowOpacity }}
                >
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                        style={{
                            scale: glowScale,
                            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%)'
                        }}
                    />
                </motion.div>

                {/* Text Block 1 */}
                <motion.h2
                    className="absolute font-title-en text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[7rem] font-medium text-white text-center leading-tight tracking-tight px-6"
                    style={{ opacity: opacity1, y: y1, scale: scale1 }}
                >
                    {t[0]}
                </motion.h2>

                {/* Text Block 2 */}
                <motion.h2
                    className="absolute font-title-en text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[7rem] font-medium text-white text-center leading-tight tracking-tight px-6"
                    style={{ opacity: opacity2, y: y2, scale: scale2 }}
                >
                    {t[1]}
                </motion.h2>

                {/* Text Block 3 */}
                <motion.h2
                    className="absolute font-title-en text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[7rem] font-medium text-white text-center leading-tight tracking-tight px-6 italic"
                    style={{ opacity: opacity3, y: y3, scale: scale3 }}
                >
                    {t[2]}
                </motion.h2>

                {/* Progress Indicator */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-[2px] h-8 bg-white/20 rounded-full overflow-hidden"
                        >
                            <motion.div
                                className="w-full bg-white/60 rounded-full origin-top"
                                style={{
                                    height: useTransform(
                                        scrollYProgress,
                                        [i * 0.33, (i + 1) * 0.33],
                                        ['0%', '100%']
                                    )
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
