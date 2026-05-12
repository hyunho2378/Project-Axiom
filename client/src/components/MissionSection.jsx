import { motion } from 'framer-motion';
import { contentData } from '../data/contentData';

/**
 * MissionSection - STRICT 4-COLOR PALETTE
 * - #000000 (Background)
 * - #8AAEC0 (Text)
 */
export default function MissionSection() {
    const { mission } = contentData;

    return (
        <section className="relative py-24 md:py-32 bg-black overflow-hidden">
            <div className="relative max-w-screen-xl mx-auto px-6 lg:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    {/* Title - #8AAEC0 */}
                    <h2 className="font-title-en text-3xl md:text-4xl lg:text-5xl text-[#8AAEC0] leading-tight mb-8">
                        {mission.title}
                    </h2>

                    {/* Description - #8AAEC0 */}
                    <p className="font-body text-base md:text-lg text-[#8AAEC0]/70 leading-relaxed whitespace-pre-line">
                        {mission.description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
