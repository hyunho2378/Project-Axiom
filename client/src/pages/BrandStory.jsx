import { motion } from 'framer-motion';

/**
 * Brand Story Page - AXIOM Brand Architecture
 * 
 * STRICT DESIGN SYSTEM:
 * - Consistent typography (SectionLabel, SectionTitle, BodyText)
 * - Standardized 2-column grid with optical alignment
 * - Unified spacing and margins across all sections
 * 
 * COLOR PALETTE:
 * - #000000 (Pure Black Background)
 * - #1E5672 (Deep Teal)
 * - #3C7795 (Cyan Highlight)
 * - #8AAEC0 (Mist Blue Text)
 */

// ============================================
// DESIGN SYSTEM COMPONENTS (Strict Typography)
// ============================================

const SectionLabel = ({ children }) => (
    <span className="block text-sm font-bold tracking-[0.2em] text-[#3C7795] uppercase mb-4">
        {children}
    </span>
);

const SectionTitle = ({ children, className = '' }) => (
    <h2 className={`text-4xl md:text-5xl font-bold text-white leading-tight mb-6 ${className}`}>
        {children}
    </h2>
);

const BodyText = ({ children, className = '', style = {} }) => (
    <p className={`text-lg text-[#8AAEC0] leading-relaxed ${className}`} style={style}>
        {children}
    </p>
);

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

// ============================================
// SECTION 1: NARRATIVE (The Hook - TOP)
// ============================================

function NarrativeSection() {
    return (
        <section className="py-32 border-b border-white/5">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="max-w-3xl"
                >
                    <SectionLabel>Narrative</SectionLabel>
                    <SectionTitle>Lost & Found</SectionTitle>

                    <div className="space-y-6">
                        <BodyText style={{ wordBreak: 'keep-all' }}>
                            모든 생명은 탄생의 순간, 자신만의 고유한 중심축(Axis)을 부여받습니다.
                            그러나 복잡한 환경과 무수한 시간의 소음 속에서 그 축은 점차 방향을 잃고 희미해집니다.
                        </BodyText>

                        <BodyText style={{ wordBreak: 'keep-all' }}>
                            AXIOM(엑시옴)은 당신의 피부 깊은 곳에 숨겨진 미세한 신호, 일상의 정교한 패턴,
                            그리고 누구도 읽어내지 못한 내밀한 취향의 데이터를 추적합니다.
                        </BodyText>

                        <BodyText className="text-white font-medium" style={{ wordBreak: 'keep-all' }}>
                            우리는 흩어진 정보들을 모아 당신을 정의하는 단 하나의 자명한 진실(Axiom)을 다시 세웁니다.
                        </BodyText>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 2: IDENTITY (Definitions)
// ============================================

function IdentitySection() {
    return (
        <section className="py-32 border-b border-white/5">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
                {/* LEFT: Title */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <SectionLabel>Identity</SectionLabel>
                    <SectionTitle>AXIOM</SectionTitle>
                    <BodyText>The Self-Evident Axis of Beauty</BodyText>
                </motion.div>

                {/* RIGHT: Definitions - Offset to align with "AXIOM" title */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="space-y-8 md:mt-14"
                >
                    {/* Axis Definition */}
                    <div className="border-l-2 border-[#3C7795]/40 pl-6">
                        <p className="text-sm text-[#3C7795] uppercase tracking-wider font-bold mb-2">
                            Axis (축)
                        </p>
                        <BodyText style={{ wordBreak: 'keep-all' }}>
                            남들이 아닌, 나를 중심으로 하는 흔들리지 않는 기준.
                        </BodyText>
                    </div>

                    {/* Axiom Definition */}
                    <div className="border-l-2 border-[#3C7795]/40 pl-6">
                        <p className="text-sm text-[#3C7795] uppercase tracking-wider font-bold mb-2">
                            Axiom (자명한 이치)
                        </p>
                        <BodyText style={{ wordBreak: 'keep-all' }}>
                            증명할 필요 없이 그 자체로 확실한 정답.
                        </BodyText>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 3: PHILOSOPHY (The Truth in Data)
// ============================================

function PhilosophySection() {
    return (
        <section className="py-32 border-b border-white/5">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
                {/* LEFT: Title */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <SectionLabel>Philosophy</SectionLabel>
                    <SectionTitle>
                        The Truth<br />
                        <span className="text-[#8AAEC0]">in Data</span>
                    </SectionTitle>
                </motion.div>

                {/* RIGHT: Content - OFFSET FIX with md:mt-14 */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="md:mt-14"
                >
                    <BodyText className="mb-12" style={{ wordBreak: 'keep-all' }}>
                        우리는 아름다움이 막연한 추측이 아닌, 명확한 데이터 속에 존재한다고 믿습니다.
                    </BodyText>

                    {/* Cards: Utility & Artistry */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Utility Card */}
                        <div className="bg-[#8AAEC0]/5 border border-[#8AAEC0]/15 rounded-2xl p-6 transition-all duration-300 hover:border-[#3C7795]/40 hover:bg-[#1E5672]/10">
                            <p className="text-sm text-[#3C7795] uppercase tracking-wider font-bold mb-3">
                                Utility
                            </p>
                            <BodyText className="text-base" style={{ wordBreak: 'keep-all' }}>
                                피부 고민을 해결하는 맞춤형 화장품과 웰니스 솔루션.
                            </BodyText>
                        </div>

                        {/* Artistry Card */}
                        <div className="bg-[#8AAEC0]/5 border border-[#8AAEC0]/15 rounded-2xl p-6 transition-all duration-300 hover:border-[#3C7795]/40 hover:bg-[#1E5672]/10">
                            <p className="text-sm text-[#3C7795] uppercase tracking-wider font-bold mb-3">
                                Artistry
                            </p>
                            <BodyText className="text-base" style={{ wordBreak: 'keep-all' }}>
                                나의 데이터가 만들어낸 유일무이한 3D 오브제를 감상하고 소유하는 경험.
                            </BodyText>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 4: DIRECTION (Vision & Mission)
// ============================================

function DirectionSection() {
    return (
        <section className="py-32 border-b border-white/5">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mb-16"
                >
                    <SectionLabel>Direction</SectionLabel>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Vision Card */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="h-full"
                    >
                        <div className="h-full bg-[#1E5672]/10 border border-[#8AAEC0]/15 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-[#3C7795]/40">
                            <p className="text-sm text-[#3C7795] uppercase tracking-wider font-bold mb-4">
                                Vision
                            </p>
                            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-6" style={{ wordBreak: 'keep-all' }}>
                                누구나 자신만의 자명한 기준(Axiom)을 가진 세상
                            </h3>
                            <BodyText style={{ wordBreak: 'keep-all' }}>
                                유행을 좇아 남들과 똑같아지는 것이 아니라, 데이터 분석을 통해 찾은 '나만의 고유한 아름다움'을 확신하고 소유하는 세상을 만듭니다.
                            </BodyText>
                        </div>
                    </motion.div>

                    {/* Mission Card */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="h-full"
                    >
                        <div className="h-full bg-[#1E5672]/10 border border-[#8AAEC0]/15 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-[#3C7795]/40">
                            <p className="text-sm text-[#3C7795] uppercase tracking-wider font-bold mb-4">
                                Mission
                            </p>
                            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-6" style={{ wordBreak: 'keep-all' }}>
                                데이터를 가장 자명한 예술로 시각화하다
                            </h3>
                            <BodyText style={{ wordBreak: 'keep-all' }}>
                                우리는 보이지 않는 내면과 피부의 복잡한 데이터를 정교하게 분석하여, 누구나 소장하고 싶은 시각적 예술 작품으로 치환합니다.
                            </BodyText>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 5: CORE VALUES (What We Believe)
// ============================================

function CoreValuesSection() {
    const values = [
        {
            id: '01',
            title: 'Fact',
            titleKR: '압도적 진실',
            tagline: "우리의 기준은 '감'이 아닌 '데이터'입니다.",
            desc: '0.1%의 오차도 허용하지 않는 정교한 분석을 통해, 사용자의 상태를 거짓 없이 투명하게 보여줍니다.'
        },
        {
            id: '02',
            title: 'One & Only',
            titleKR: '초개인화',
            tagline: '대중(Mass)이 아닌 개인(Individual)이 우리의 우주입니다.',
            desc: '70억 인구에게는 70억 개의 서로 다른 정답(Axis)을 제공해야 합니다.'
        },
        {
            id: '03',
            title: 'Art',
            titleKR: '미학적 경험',
            tagline: '기술은 똑똑해야 하지만, 결과물은 아름다워야 합니다.',
            desc: '분석 결과가 갤러리에 걸린 작품처럼, 바라보는 것만으로도 만족감을 주는 예술적 경험을 만듭니다.'
        }
    ];

    return (
        <section className="py-32">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mb-16"
                >
                    <SectionLabel>Core Values</SectionLabel>
                    <SectionTitle>What We Believe</SectionTitle>
                </motion.div>

                {/* Values Grid - 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
                            }}
                            className="h-full"
                        >
                            <div className="h-full bg-[#8AAEC0]/5 border border-[#8AAEC0]/15 rounded-2xl p-8 transition-all duration-300 hover:border-[#3C7795]/40 hover:bg-[#1E5672]/10">
                                {/* Number */}
                                <span className="text-sm text-[#3C7795]/50 uppercase tracking-wider mb-4 block">
                                    {value.id}
                                </span>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-white mb-1">
                                    {value.title}
                                </h3>

                                {/* Korean Title */}
                                <p className="text-sm text-[#3C7795] font-bold mb-4">
                                    {value.titleKR}
                                </p>

                                {/* Tagline */}
                                <BodyText className="mb-4" style={{ wordBreak: 'keep-all' }}>
                                    {value.tagline}
                                </BodyText>

                                {/* Description */}
                                <BodyText className="text-[#8AAEC0]/50 text-base" style={{ wordBreak: 'keep-all' }}>
                                    {value.desc}
                                </BodyText>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// MAIN BRAND STORY COMPONENT
// ============================================

export default function BrandStory() {
    return (
        <main className="bg-black min-h-screen pt-20 md:pt-24">
            <NarrativeSection />
            <IdentitySection />
            <PhilosophySection />
            <DirectionSection />
            <CoreValuesSection />

            {/* Bottom Spacing */}
            <div className="pb-20" />
        </main>
    );
}
