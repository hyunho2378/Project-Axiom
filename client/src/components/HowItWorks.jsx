import { motion } from 'framer-motion';
import { contentData } from '../data/contentData';

/**
 * Icons for process steps - #3C7795 (Cyan Highlight)
 */
const icons = {
    Camera: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    ),
    Activity: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M12 18v-6" />
            <path d="M8 18v-1" />
            <path d="M16 18v-3" />
        </svg>
    ),
    Sparkles: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        </svg>
    ),
    RefreshCw: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
        </svg>
    )
};

/**
 * HowItWorks - MIST GLASS CARDS
 * - #000000 (Background)
 * - #8AAEC0 (Mist Glass Cards)
 * - #3C7795 (Accents/Icons)
 */
export default function HowItWorks() {
    const { processSteps } = contentData;

    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-black">
            <div className="relative max-w-screen-xl mx-auto px-6 lg:px-16">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="text-left mb-16 md:mb-20"
                >
                    {/* Label - #3C7795 */}
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#3C7795] font-body mb-4">
                        How It Works
                    </p>
                    <h2 className="font-title-en text-3xl md:text-4xl lg:text-5xl text-[#8AAEC0] leading-tight">
                        Your Journey to<br />
                        <span className="text-gradient-cyan">Define Your Axis</span>
                    </h2>
                </motion.div>

                {/* Process Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {processSteps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative rounded-2xl p-8 md:p-10 min-h-[320px] md:min-h-[360px]
                                       bg-[#8AAEC0]/5 backdrop-blur-md
                                       border border-[#8AAEC0]/10 
                                       hover:bg-[#8AAEC0]/10 hover:border-[#3C7795]/40
                                       transition-all duration-500 cursor-default"
                        >
                            {/* Step Number & Icon */}
                            <div className="flex items-start justify-between mb-8">
                                {/* Number - #3C7795 */}
                                <span className="text-[11px] font-body text-[#3C7795] tracking-[0.15em]">
                                    {String(step.id).padStart(2, '0')}
                                </span>
                                {/* Icon - #8AAEC0 to #3C7795 on hover */}
                                <div className="text-[#8AAEC0]/40 group-hover:text-[#3C7795] transition-colors duration-500">
                                    {icons[step.icon]}
                                </div>
                            </div>

                            {/* Title - #8AAEC0 */}
                            <h3 className="font-title-en text-xl md:text-2xl text-[#8AAEC0] mb-6 leading-tight">
                                {step.title}
                            </h3>

                            {/* Description - Fade in on hover */}
                            <p className="font-body text-sm text-[#8AAEC0]/0 leading-relaxed
                                          group-hover:text-[#8AAEC0]/70
                                          transition-all duration-500 ease-out"
                                style={{ wordBreak: 'keep-all' }}>
                                {step.descKR}
                            </p>

                            {/* Decorative Line - #3C7795 */}
                            <div className="absolute bottom-8 left-8 right-8 h-[1px] 
                                            bg-gradient-to-r from-[#3C7795]/0 via-[#3C7795]/40 to-[#3C7795]/0 
                                            scale-x-0 group-hover:scale-x-100
                                            transition-transform duration-500 origin-left" />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <a
                        href="/analysis"
                        className="btn-primary inline-flex items-center gap-3"
                    >
                        <span className="font-body text-sm tracking-wide">Start Your Analysis</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
