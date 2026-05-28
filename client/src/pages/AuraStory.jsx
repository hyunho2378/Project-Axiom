import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * AuraStory Page (/aura)
 * 
 * Editorial-style brand philosophy page with emotional storytelling
 */
export default function AuraStory() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

    return (
        <div ref={containerRef} className="min-h-screen bg-void">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Ambient Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-2xl bg-purple-500/10 blur-[180px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-2xl bg-blue-500/8 blur-[150px]" />
                </div>

                <motion.div
                    className="relative z-10 text-center px-6"
                    style={{ opacity: heroOpacity, y: heroY }}
                >
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-xs uppercase tracking-[0.4em] text-white/40 mb-8"
                    >
                        The Philosophy
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.1 }}
                        className="font-title-en text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[8rem] font-medium text-white leading-[0.9] tracking-tight"
                    >
                        Light &
                        <br />
                        <span className="italic text-white/80">Data</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-20 left-1/2 -translate-x-1/2"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">Discover</span>
                            <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Story Section 1: The Vision */}
            <section className="py-40 px-6 md:px-12 lg:px-20">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid lg:grid-cols-2 gap-20 items-center"
                    >
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-purple-400/80 mb-6">
                                Chapter 01
                            </p>
                            <h2 className="font-title-en text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-8 leading-[1.1]">
                                Every Face
                                <br />
                                <span className="italic text-white/70">Tells a Story</span>
                            </h2>
                            <div className="space-y-6 text-white/50 text-lg leading-relaxed">
                                <p>
                                    Your skin is more than a surface—it's a living map of your journey.
                                    Every line, every tone, every texture tells a story that's uniquely yours.
                                </p>
                                <p>
                                    At AURA, we don't believe in masking that story.
                                    We believe in <span className="text-white/80">understanding it</span>.
                                </p>
                            </div>
                        </div>

                        {/* Visual Block */}
                        <div className="relative h-[500px] lg:h-[600px]">
                            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-blue-500/10 to-transparent" />
                                <div className="absolute inset-0 backdrop-blur-3xl" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-40 h-56 md:w-48 md:h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-32 px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <blockquote className="font-title-en text-3xl md:text-3xl lg:text-4xl text-white leading-relaxed italic">
                        "We don't chase trends.
                        <br />
                        <span className="text-white/60">We decode you."</span>
                    </blockquote>
                </motion.div>
            </section>

            {/* Story Section 2: The Science */}
            <section className="py-40 px-6 md:px-12 lg:px-20 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <p className="text-xs uppercase tracking-[0.3em] text-blue-400/80 mb-6">
                            Chapter 02
                        </p>
                        <h2 className="font-title-en text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-16 leading-[1.1]">
                            Where Science
                            <br />
                            <span className="italic text-white/70">Meets Individuality</span>
                        </h2>
                    </motion.div>

                    {/* Data Points Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { number: "6", label: "Aura Types", desc: "Unique skin profiles we've identified through research" },
                            { number: "47", label: "Data Points", desc: "Metrics analyzed in every diagnosis" },
                            { number: "∞", label: "Combinations", desc: "Because no two faces are the same" }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-10 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                            >
                                <span className="font-title-en text-5xl md:text-6xl text-white/90 block mb-4">
                                    {stat.number}
                                </span>
                                <h3 className="font-body text-lg font-medium text-white mb-2">
                                    {stat.label}
                                </h3>
                                <p className="text-sm text-white/40">
                                    {stat.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section 3: The Promise */}
            <section className="py-40 px-6 md:px-12 lg:px-20">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid lg:grid-cols-2 gap-20 items-center"
                    >
                        {/* Visual Block */}
                        <div className="relative h-[400px] lg:h-[500px] order-2 lg:order-1">
                            <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-blue-500/10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <p className="text-xs uppercase tracking-[0.3em] text-pink-400/80 mb-6">
                                Chapter 03
                            </p>
                            <h2 className="font-title-en text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-8 leading-[1.1]">
                                A Promise
                                <br />
                                <span className="italic text-white/70">to You</span>
                            </h2>
                            <div className="space-y-6 text-white/50 text-lg leading-relaxed">
                                <p>
                                    We promise to never give you a one-size-fits-all solution.
                                </p>
                                <p>
                                    Every product we recommend, every routine we create, is
                                    <span className="text-white/80"> designed specifically for you</span>—
                                    based on your data, your lifestyle, your goals.
                                </p>
                                <p>
                                    This is beauty, reimagined.
                                </p>
                            </div>

                            <div className="mt-10">
                                <a href="/diagnosis" className="inline-flex items-center gap-4 px-16 py-5 font-body font-semibold text-sm tracking-[0.22em] uppercase rounded-2xl btn-glow">
                                    Begin Your Journey
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 px-6 text-center border-t border-white/5">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-title-en text-3xl md:text-3xl lg:text-4xl font-medium text-white mb-6">
                        Ready to discover your Aura?
                    </h2>
                    <p className="text-white/50 mb-10 max-w-md mx-auto">
                        Take our AI-powered diagnosis and unlock personalized beauty insights.
                    </p>
                    <a href="/diagnosis" className="inline-flex items-center gap-4 px-16 py-5 font-body font-semibold text-sm tracking-[0.22em] uppercase rounded-2xl btn-glow">
                        Start Diagnosis
                    </a>
                </motion.div>
            </section>
        </div>
    );
}
