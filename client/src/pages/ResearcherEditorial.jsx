import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * AXIOM Researcher Editorial — High-End Digital Magazine
 *
 * Replaces the legacy Podcast/AuraStory concept.
 * Format: Sharp editorial grid with large typography, deep research insights.
 * Palette: #000, #1E5672, #3C7795, #8AAEC0. No icons. No emojis.
 */

const FEATURED = {
    issue: 'VOL. 04 · 2026',
    category: 'AXIOM RESEARCH INSIGHTS',
    title: 'The Epigenetic Skin:\nHow Stress Rewrites Your Barrier Code',
    author: 'Dr. Ji-Yeon Kwon · Senior Research Director, AXIOM Lab',
    date: '2026.04.12',
    excerpt: '피부 장벽은 단순한 물리적 구조물이 아닙니다. 최근 AXIOM 연구팀의 분석에 따르면, 만성 스트레스 노출 시 HPA 축 활성화로 인해 필라그린 유전자 발현이 최대 38% 억제되며, 이는 경피수분손실(TEWL) 수치를 급격히 상승시킵니다. 데이터가 보여주는 피부의 에피제네틱 진실.',
};

const ARTICLES = [
    {
        id: 1,
        category: 'FORMULATION SCIENCE',
        title: 'Niacinamide at the Tipping Point',
        subtitle: '농도와 효능의 역설 — 10%가 최선이 아닌 이유',
        author: 'Research Team · AXIOM Dermal Analytics',
        date: '2026.04.08',
        tag: 'INGREDIENT',
        excerpt: 'AXIOM의 12주 임상 데이터에서 니아신아마이드 10% 적용군은 5% 적용군 대비 홍조 부작용이 2.4배 높았습니다. 최적 농도의 과학.',
    },
    {
        id: 2,
        category: 'GLOBAL TRENDS',
        title: 'K-Beauty 3.0: The Data-Driven Turn',
        subtitle: '감성 마케팅의 시대가 끝나고, 데이터 처방의 시대가 시작된다',
        author: 'Global Intelligence Desk · AXIOM',
        date: '2026.04.05',
        tag: 'TREND',
        excerpt: '2026년 글로벌 뷰티 시장에서 AI 피부 진단 기반 제품 구매 비율이 전년 대비 340% 급증했습니다. 수치가 말하는 미래.',
    },
    {
        id: 3,
        category: 'CLINICAL REPORT',
        title: 'The Microbiome Shift After Age 35',
        subtitle: '피부 유익균 다양성 감소와 민감도 상관관계 분석',
        author: 'Dr. Seo Yun-hee · Microbiome Lab',
        date: '2026.04.01',
        tag: 'RESEARCH',
        excerpt: '35세 이후 피부 표면의 세균 다양성 지수(Shannon Index)가 평균 28% 감소하며, 이는 AXIOM 민감도 점수와 r=0.81의 강한 상관관계를 보입니다.',
    },
    {
        id: 4,
        category: 'INGREDIENT GENEALOGY',
        title: 'Ceramide NP vs. EOP: A Structural Analysis',
        subtitle: '두 세라마이드의 구조적 차이가 효능에 미치는 영향',
        author: 'Formulation Lab · AXIOM',
        date: '2026.03.28',
        tag: 'SCIENCE',
        excerpt: '세라마이드의 종류와 배합 비율이 피부 장벽 회복 속도에 미치는 영향을 12개월 임상 데이터로 분석합니다.',
    },
    {
        id: 5,
        category: 'AXIOM CASE STUDY',
        title: 'Zero to Balanced: A 90-Day Oily Skin Protocol',
        subtitle: '지성 피부 90일 처방 결과: 유분도 지수 평균 41% 감소',
        author: 'Clinical Analytics · AXIOM',
        date: '2026.03.20',
        tag: 'PROTOCOL',
        excerpt: 'AXIOM 지성 피부 처방 프로토콜을 적용한 1,240명의 90일 추적 조사. 피지 분비 억제와 수분 장벽 유지의 균형.',
    },
];

const TAG_COLORS = {
    INGREDIENT: '#8AAEC0',
    TREND: '#3C7795',
    RESEARCH: '#1E5672',
    SCIENCE: '#8AAEC0',
    PROTOCOL: '#3C7795',
};

export default function ResearcherEditorial() {
    return (
        <main className="min-h-screen bg-black text-white">

            {/* ── MASTHEAD ── */}
            <section className="border-b border-[#111] pt-36 pb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <p className="font-body text-[9px] tracking-[0.4em] text-[#3C7795] uppercase mb-3">
                                {FEATURED.issue}
                            </p>
                            <h1 className="font-title-en text-3xl md:text-3xl text-white leading-title">
                                AXIOM Editorial
                            </h1>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="font-body text-[9px] text-[#333] tracking-widest uppercase hidden md:block"
                        >
                            Research · Science · Beauty Intelligence
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* ── FEATURED ARTICLE (Full-Bleed Lead) ── */}
            <section className="border-b border-[#111]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[70vh]">

                        {/* Left: Image Placeholder */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="lg:col-span-5 bg-[#05080a] border-r border-[#111] relative overflow-hidden min-h-[40vh] lg:min-h-0 flex items-center justify-center"
                        >
                            {/* Atmospheric depth — researcher lab aesthetic */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1E5672]/20 via-transparent to-black" />
                            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-2xl bg-[#3C7795]/10 blur-[80px]" />

                            <div className="relative z-10 text-center px-12">
                                <div className="w-px h-20 bg-gradient-to-b from-transparent to-[#3C7795]/40 mx-auto mb-8" />
                                <p className="font-body text-[9px] text-[#3C7795]/60 tracking-[0.3em] uppercase mb-3">
                                    AXIOM Laboratory
                                </p>
                                <p className="font-body text-[#8AAEC0]/30 text-xs tracking-normal leading-relaxed max-w-[200px] mx-auto">
                                    AI-Generated researcher imagery — coming in v3.0
                                </p>
                                <div className="w-px h-20 bg-gradient-to-b from-[#3C7795]/40 to-transparent mx-auto mt-8" />
                            </div>

                            {/* Lab data overlay */}
                            <div className="absolute bottom-8 left-8">
                                <p className="font-body text-[8px] text-[#3C7795]/40 tracking-widest uppercase">
                                    AXIOM SKIN RESEARCH LAB · SEOUL
                                </p>
                            </div>
                        </motion.div>

                        {/* Right: Featured Article Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, delay: 0.2 }}
                            className="lg:col-span-7 flex flex-col justify-center py-16 lg:pl-16"
                        >
                            <p className="font-body text-[9px] tracking-[0.3em] text-[#3C7795] uppercase mb-8">
                                {FEATURED.category} · COVER STORY
                            </p>

                            <h2 className="font-title-en text-3xl md:text-3xl lg:text-4xl text-white leading-title mb-8 whitespace-pre-line">
                                {FEATURED.title}
                            </h2>

                            <div className="w-12 h-[1px] bg-[#3C7795]/30 mb-8" />

                            <p className="font-body text-[#8AAEC0] text-base leading-body mb-10 max-w-xl">
                                {FEATURED.excerpt}
                            </p>

                            <div className="flex items-center justify-between border-t border-[#1a1a1a] pt-8">
                                <div>
                                    <p className="font-body text-[9px] text-[#444] tracking-[0.2em] uppercase mb-1">Author</p>
                                    <p className="font-body text-[#8AAEC0] text-xs">{FEATURED.author}</p>
                                </div>
                                <p className="font-body text-[9px] text-[#333] tracking-widest">{FEATURED.date}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── ARTICLE GRID ── */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="flex items-center gap-6 mb-16">
                        <p className="font-body text-[9px] text-[#3C7795] tracking-[0.3em] uppercase">
                            Research Archive
                        </p>
                        <div className="flex-1 h-[1px] bg-[#111]" />
                        <p className="font-body text-[9px] text-[#333] tracking-widest hidden md:block">
                            {ARTICLES.length} Reports
                        </p>
                    </div>

                    {/* Primary 2-column articles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-[#111] mb-0">
                        {ARTICLES.slice(0, 2).map((article, i) => (
                            <motion.article
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.08 }}
                                className={`py-12 px-0 border-b border-[#111] group cursor-pointer
                                    ${i === 0 ? 'md:border-r md:pr-12' : 'md:pl-12'}`}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <span
                                        className="font-body text-[8px] tracking-[0.25em] uppercase px-2 py-1 rounded-2xl"
                                        style={{
                                            color: TAG_COLORS[article.tag],
                                            border: `1px solid ${TAG_COLORS[article.tag]}30`,
                                            backgroundColor: `${TAG_COLORS[article.tag]}08`,
                                        }}
                                    >
                                        {article.tag}
                                    </span>
                                    <span className="font-body text-[8px] text-[#333] tracking-widest">{article.date}</span>
                                </div>

                                <p className="font-body text-[9px] text-[#3C7795] tracking-[0.2em] uppercase mb-4">
                                    {article.category}
                                </p>
                                <h3 className="font-title-en text-xl md:text-2xl text-white leading-title mb-3 group-hover:text-[#8AAEC0] transition-colors duration-300">
                                    {article.title}
                                </h3>
                                <p className="font-title-en italic text-[#8AAEC0]/50 text-sm mb-5 leading-title">
                                    {article.subtitle}
                                </p>
                                <p className="font-body text-[#8AAEC0]/60 text-xs leading-body mb-8">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <p className="font-body text-[9px] text-[#444] tracking-widest">{article.author}</p>
                                    <span className="text-[#333] group-hover:text-[#3C7795] transition-colors">→</span>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* Secondary 3-column articles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-[#111]">
                        {ARTICLES.slice(2).map((article, i) => (
                            <motion.article
                                key={article.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.06 }}
                                className={`py-12 border-b md:border-b-0 border-[#111] group cursor-pointer
                                    ${i < 2 ? 'md:border-r md:pr-10' : ''}
                                    ${i > 0 ? 'md:pl-10' : ''}`}
                            >
                                <div className="flex items-center gap-3 mb-5">
                                    <span
                                        className="font-body text-[8px] tracking-[0.25em] uppercase px-2 py-1 rounded-2xl"
                                        style={{
                                            color: TAG_COLORS[article.tag],
                                            border: `1px solid ${TAG_COLORS[article.tag]}30`,
                                            backgroundColor: `${TAG_COLORS[article.tag]}08`,
                                        }}
                                    >
                                        {article.tag}
                                    </span>
                                </div>

                                <p className="font-body text-[9px] text-[#3C7795] tracking-[0.2em] uppercase mb-3">
                                    {article.category}
                                </p>
                                <h3 className="font-title-en text-lg text-white leading-title mb-2 group-hover:text-[#8AAEC0] transition-colors duration-300">
                                    {article.title}
                                </h3>
                                <p className="font-title-en italic text-[#8AAEC0]/40 text-xs mb-4 leading-title">
                                    {article.subtitle}
                                </p>
                                <p className="font-body text-[#8AAEC0]/50 text-xs leading-body mb-6">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <p className="font-body text-[8px] text-[#333] tracking-widest">{article.date}</p>
                                    <span className="text-[#333] group-hover:text-[#3C7795] transition-colors">→</span>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SUBSCRIPTION CTA ── */}
            <section className="border-t border-[#111] py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
                    >
                        <div className="lg:col-span-7">
                            <p className="font-body text-[9px] text-[#3C7795] tracking-[0.3em] uppercase mb-6">
                                AXIOM Research Intelligence
                            </p>
                            <h2 className="font-title-en text-3xl md:text-3xl text-white leading-title mb-6">
                                피부 과학의 최전선,<br />AXIOM이 먼저 읽습니다.
                            </h2>
                            <p className="font-body text-[#8AAEC0] text-base leading-body max-w-lg">
                                세계 주요 피부 연구 저널과 임상 데이터를 바탕으로, AXIOM 연구팀이 선별한 핵심 인사이트를 정기적으로 아카이빙합니다.
                            </p>
                        </div>
                        <div className="lg:col-span-5 flex flex-col gap-4">
                            <Link
                                to="/analysis"
                                className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#3C7795] hover:bg-[#8AAEC0] text-white font-body font-semibold text-xs tracking-[0.2em] uppercase rounded-2xl transition-all duration-300"
                            >
                                Begin Your Analysis →
                            </Link>
                            <Link
                                to="/axiom"
                                className="inline-flex items-center justify-center gap-4 px-10 py-5 border border-[#222] text-[#8AAEC0]/60 hover:border-[#3C7795] hover:text-[#8AAEC0] font-body text-xs tracking-[0.2em] uppercase rounded-2xl transition-all duration-300"
                            >
                                Brand Philosophy
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── WORDMARK ── */}
            <div className="border-t border-[#0a0a0a] py-16 text-center">
                <span className="font-body text-[#222] text-[10px] tracking-[0.4em] uppercase">
                    © 2026 AXIOM Inc. — Research · Intelligence · Precision
                </span>
            </div>

        </main>
    );
}
