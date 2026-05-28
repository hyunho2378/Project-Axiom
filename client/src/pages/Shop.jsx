import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ALL_PRODUCTS } from '../data/productsData';

/**
 * Shop Page - LUXURY TECH Aesthetic
 * 
 * STRICT PALETTE:
 * - Highlight: #3C7795 (Cyan)
 * - Mist: #8AAEC0 (Text + Glass Cards)
 * - Void: #000000 (Background)
 * - NO PURPLE / NO #082B35
 */
export default function Shop() {
    const userSkinType = "수부지";
    const userName = "게스트";

    const recommendedProducts = ALL_PRODUCTS.filter(p => p.skinType === userSkinType);

    return (
        <main className="min-h-screen bg-transparent relative z-10">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Label - Cyan */}
                    <p className="text-[#3C7795] font-bold tracking-widest text-xs mb-3 uppercase font-body">
                        AI Personalized
                    </p>

                    {/* Title - #8AAEC0 */}
                    <h1 className="text-3xl md:text-4xl font-title-en text-[#8AAEC0] mb-4 leading-tight">
                        <span className="text-[#8AAEC0]">{userName}</span>님을 위한<br />
                        <span className="text-gradient-cyan">맞춤 처방</span>
                    </h1>

                    {/* Description - Mist */}
                    <p className="text-[#8AAEC0] text-base md:text-lg mb-6 font-body whitespace-nowrap overflow-hidden text-ellipsis"
                        style={{ wordBreak: 'keep-all' }}>
                        {userName}님의 피부 타입 분석 결과에 기반한 최적의 솔루션입니다. AI가 분석한 <span className="text-[#3C7795] font-bold">{userSkinType}</span> 피부에 맞는 제품을 추천해 드립니다.
                    </p>

                    {/* Divider */}
                    <div className="w-full h-px bg-[#8AAEC0]/15 mb-8" />
                </motion.div>

                {/* Skin Type Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <div className="px-4 py-2 bg-gradient-to-r from-[#1E5672]/30 to-[#3C7795]/30 border border-[#3C7795]/30 rounded-2xl">
                        <span className="text-sm font-body text-[#8AAEC0]">
                            피부 타입: <span className="font-bold text-[#8AAEC0]">{userSkinType}</span>
                        </span>
                    </div>
                    <span className="text-sm text-[#8AAEC0]/50 font-body">
                        {recommendedProducts.length}개의 맞춤 제품
                    </span>
                </motion.div>

                {/* 3-COLUMN GRID */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {recommendedProducts.map((product, index) => {
                        const matchRate = 85 + (product.id % 15);

                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                            >
                                <Link
                                    to={`/shop/${product.id}`}
                                    className="group block"
                                >
                                    {/* Card - MIST GLASS STYLE */}
                                    <div className="relative rounded-2xl overflow-hidden
                                                    bg-[#8AAEC0]/5 backdrop-blur-md
                                                    border border-[#8AAEC0]/20 
                                                    hover:bg-[#8AAEC0]/10 hover:border-[#3C7795]/50
                                                    hover:shadow-[0_0_30px_-10px_rgba(60,119,149,0.30)]
                                                    transition-all duration-300">

                                        {/* Match Score Badge - Cyan Gradient */}
                                        <div className="absolute top-3 left-3 z-10">
                                            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider font-body
                                                           bg-gradient-to-r from-[#1E5672] to-[#3C7795] 
                                                           text-white rounded-2xl border border-white/15">
                                                {matchRate}% Match
                                            </span>
                                        </div>

                                        {/* Tag */}
                                        {product.tag && (
                                            <div className="absolute top-3 right-3 z-10">
                                                <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-body
                                                               bg-[#8AAEC0]/10 text-[#8AAEC0] rounded-2xl border border-[#8AAEC0]/20">
                                                    {product.tag}
                                                </span>
                                            </div>
                                        )}

                                        {/* Image Area */}
                                        <div className={`aspect-[4/5] ${product.imageColor} relative overflow-hidden`}>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            {/* Category - Cyan */}
                                            <p className="text-[10px] uppercase tracking-[0.15em] text-[#3C7795] font-body mb-1">
                                                {product.category}
                                            </p>

                                            {/* Name */}
                                            <h3 className="font-title-en text-base text-[#8AAEC0] mb-1 group-hover:text-[#3C7795] transition-colors">
                                                {product.name}
                                            </h3>

                                            {/* Price - Mist */}
                                            <p className="font-body text-sm text-[#8AAEC0] mb-3">
                                                {product.price}
                                            </p>

                                            {/* Description - Mist dimmed */}
                                            <p className="font-body text-xs text-[#8AAEC0]/60 leading-relaxed line-clamp-2" style={{ wordBreak: 'keep-all' }}>
                                                {product.desc}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            <div className="pb-16" />
        </main>
    );
}
