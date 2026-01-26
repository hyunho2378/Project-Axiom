import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Campaigns Page (/campaigns) - "Editorial Gallery"
 * 
 * Digital art exhibition with parallax scroll-telling
 */
export default function Campaigns() {
    const containerRef = useRef(null);

    const campaigns = [
        {
            id: 1,
            title: "The Essence of Light",
            subtitle: "Spring 2026 Collection",
            description: "Where luminosity meets precision. A journey through the science of radiance.",
            color: "from-[#3C7795]/20 to-[#8AAEC0]/20"
        },
        {
            id: 2,
            title: "Hydra Depths",
            subtitle: "The Moisture Revolution",
            description: "Dive into the molecular architecture of perfect hydration.",
            color: "from-[#1E5672]/20 to-[#3C7795]/20"
        },
        {
            id: 3,
            title: "Midnight Ritual",
            subtitle: "Night Repair Series",
            description: "When the world sleeps, your skin transforms. The power of nocturnal regeneration.",
            color: "from-[#1E5672]/20 to-[#8AAEC0]/20"
        }
    ];

    return (
        <div ref={containerRef} className="min-h-screen">
            {/* Hero */}
            <section className="h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#3C7795]/10 blur-[150px]" />
                    <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#1E5672]/10 blur-[120px]" />
                </div>

                <motion.div
                    className="relative z-10 text-center px-6"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6">
                        Editorial
                    </p>
                    <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white">
                        Campaigns
                    </h1>
                    <p className="mt-6 text-lg text-white/50 max-w-md mx-auto">
                        Stories that illuminate the intersection of beauty and science.
                    </p>
                </motion.div>

                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">Scroll</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
                    </div>
                </motion.div>
            </section>

            {/* Campaign Cards with Parallax */}
            {campaigns.map((campaign, index) => (
                <CampaignSection key={campaign.id} campaign={campaign} index={index} />
            ))}

            {/* Footer CTA */}
            <section className="py-32 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-serif text-3xl md:text-4xl font-medium text-white mb-6">
                        Experience the Collection
                    </h2>
                    <a href="/shop" className="btn-primary inline-block">
                        <span>Shop Now</span>
                    </a>
                </motion.div>
            </section>
        </div>
    );
}

/**
 * Individual Campaign Section with Parallax
 */
function CampaignSection({ campaign, index }) {
    const sectionRef = useRef(null);
    const isEven = index % 2 === 0;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={sectionRef}
            className="min-h-screen py-32 px-6 md:px-12 lg:px-20 flex items-center"
        >
            <div className="max-w-7xl mx-auto w-full">
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                    {/* Image */}
                    <motion.div
                        className={`relative h-[500px] lg:h-[700px] ${isEven ? '' : 'lg:col-start-2'}`}
                        style={{ y: imageY }}
                    >
                        <div className={`absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br ${campaign.color}`}>
                            {/* Abstract Visual */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    className="w-48 h-64 md:w-56 md:h-72 rounded-2xl"
                                    style={{
                                        background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))`,
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                    whileHover={{ scale: 1.02, rotateY: 5 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-white/10 rounded-full" />
                            <div className="absolute bottom-1/3 left-1/4 w-32 h-32 border border-white/5 rounded-full" />
                        </div>

                        {/* Campaign Number */}
                        <div className="absolute -bottom-6 -right-6 md:bottom-6 md:right-6 font-serif text-[120px] md:text-[180px] text-white/5 leading-none pointer-events-none">
                            0{campaign.id}
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        className={`${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}
                        style={{ y: textY, opacity }}
                    >
                        <p className="text-xs uppercase tracking-[0.3em] text-[#8AAEC0]/80 mb-4">
                            {campaign.subtitle}
                        </p>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 leading-[1.1]">
                            {campaign.title}
                        </h2>
                        <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-8 max-w-lg">
                            {campaign.description}
                        </p>
                        <a
                            href={`/shop`}
                            className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                        >
                            <span className="text-sm uppercase tracking-wider">Explore Campaign</span>
                            <svg
                                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
