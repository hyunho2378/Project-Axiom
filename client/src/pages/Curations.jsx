import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ALL_PRODUCTS } from '../data/productsData';

/**
 * Curations Page - LUXURY TECH Aesthetic
 * 
 * STRICT PALETTE:
 * - Highlight: #3C7795 (Cyan)
 * - Mist: #8AAEC0 (Secondary text)
 * - Surface: #082B35 (Cards)
 * - Void: #000000 (Background)
 * - NO PURPLE
 */

const categories = ["전체 보기", ...new Set(ALL_PRODUCTS.map(p => p.category))];
const skinTypes = ["전체", "수부지", "지성", "민감성", "건성", "복합성"];
const ITEMS_PER_PAGE = 12;

export default function Curations() {
    const [activeCategory, setActiveCategory] = useState("전체 보기");
    const [activeSkinType, setActiveSkinType] = useState("전체");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = ALL_PRODUCTS.filter(p => {
        const categoryMatch = activeCategory === "전체 보기" || p.category === activeCategory;
        const skinTypeMatch = activeSkinType === "전체" || p.skinType === activeSkinType;
        return categoryMatch && skinTypeMatch;
    });

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    const handleSkinTypeChange = (type) => {
        setActiveSkinType(type);
        setCurrentPage(1);
    };

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <main className="min-h-screen bg-transparent pt-20 relative z-10">
            {/* Header Section */}
            <section className="py-12 md:py-16">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <p className="text-[11px] uppercase tracking-[0.3em] text-[#3C7795] font-sans mb-4">
                            Curated For You
                        </p>
                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#8AAEC0] leading-tight mb-4">
                            Rituals Designed<br />
                            <span className="text-gradient-cyan">For Your Skin</span>
                        </h1>
                        <p className="font-sans text-base text-[#8AAEC0] leading-relaxed" style={{ wordBreak: 'keep-all' }}>
                            전문적으로 큐레이션 된 50가지 컬렉션을 만나보세요. 당신의 피부 타입에 맞춰 설계된 리추얼입니다.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Skin Type Filter */}
            <section className="pb-4">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-wrap items-center gap-2 mb-4"
                    >
                        <span className="text-xs text-[#8AAEC0]/50 font-sans mr-2">피부 타입:</span>
                        {skinTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => handleSkinTypeChange(type)}
                                className={`
                                    px-3 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-300
                                    ${activeSkinType === type
                                        ? 'bg-gradient-to-r from-[#1E5672] to-[#3C7795] text-white border border-white/15'
                                        : 'bg-[#8AAEC0]/5 text-[#8AAEC0] hover:text-white hover:bg-[#8AAEC0]/10 border border-[#8AAEC0]/15'
                                    }
                                `}
                            >
                                {type}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Category Filter Bar */}
            <section className="pb-6">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap gap-2"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`
                                    px-4 py-2 rounded-full text-sm font-sans tracking-wide transition-all duration-300 border
                                    ${activeCategory === category
                                        ? 'bg-white text-black border-white font-medium'
                                        : 'bg-transparent text-[#8AAEC0] border-[#8AAEC0]/20 hover:border-[#3C7795]/50 hover:text-white'
                                    }
                                `}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Results Count */}
            <section className="pb-4">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
                    <p className="text-sm text-[#8AAEC0]/50 font-sans">
                        {filteredProducts.length}개의 제품 중 {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} 표시
                    </p>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-8">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {paginatedProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.03 }}
                            >
                                <Link
                                    to={`/curations/${product.id}`}
                                    className="group block"
                                >
                                    {/* Card - MIST GLASS STYLE */}
                                    <div className="relative rounded-3xl overflow-hidden
                                                    bg-[#8AAEC0]/5 backdrop-blur-md
                                                    border border-[#8AAEC0]/20 
                                                    hover:bg-[#8AAEC0]/10 hover:border-[#3C7795]/50
                                                    hover:shadow-[0_0_30px_-10px_rgba(60,119,149,0.30)]
                                                    transition-all duration-300">

                                        {/* Tag - Cyan Gradient Badge */}
                                        {product.tag && (
                                            <div className="absolute top-3 left-3 z-10">
                                                <span className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-sans
                                                               bg-gradient-to-r from-[#1E5672] to-[#3C7795] text-white rounded-full border border-white/15">
                                                    {product.tag}
                                                </span>
                                            </div>
                                        )}

                                        {/* Skin Type Badge */}
                                        <div className="absolute top-3 right-3 z-10">
                                            <span className="px-2 py-0.5 text-[9px] font-sans text-[#3C7795] bg-[#8AAEC0]/10 rounded-full border border-[#3C7795]/30">
                                                {product.skinType}
                                            </span>
                                        </div>

                                        {/* Image Area */}
                                        <div className={`aspect-[4/5] ${product.imageColor} relative overflow-hidden`}>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            {/* Category - Cyan */}
                                            <p className="text-[9px] uppercase tracking-[0.15em] text-[#3C7795] font-sans mb-1">
                                                {product.category}
                                            </p>

                                            {/* Name */}
                                            <h3 className="font-serif text-sm text-[#8AAEC0] mb-1 group-hover:text-[#3C7795] transition-colors line-clamp-1">
                                                {product.name}
                                            </h3>

                                            {/* Price - Mist */}
                                            <p className="font-sans text-xs text-[#8AAEC0] mb-2">
                                                {product.price}
                                            </p>

                                            {/* Description - Mist dimmed */}
                                            <p className="font-sans text-[11px] text-[#8AAEC0]/60 leading-relaxed line-clamp-2" style={{ wordBreak: 'keep-all' }}>
                                                {product.desc}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
                <section className="py-8 pb-24">
                    <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center justify-center gap-2"
                        >
                            {/* Previous Button */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                                    ${currentPage === 1
                                        ? 'text-[#8AAEC0]/20 cursor-not-allowed'
                                        : 'text-[#8AAEC0] hover:text-white hover:bg-[#8AAEC0]/10'
                                    }`}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>

                            {/* Page Numbers */}
                            {getPageNumbers().map((page, index) => (
                                <button
                                    key={index}
                                    onClick={() => typeof page === 'number' && setCurrentPage(page)}
                                    disabled={page === '...'}
                                    className={`min-w-[40px] h-10 rounded-full flex items-center justify-center font-sans text-sm transition-all duration-300
                                        ${page === currentPage
                                            ? 'bg-gradient-to-r from-[#1E5672] to-[#3C7795] text-white font-bold border border-white/15'
                                            : page === '...'
                                                ? 'text-[#8AAEC0]/40 cursor-default'
                                                : 'text-[#8AAEC0] hover:text-white hover:bg-[#8AAEC0]/10'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Next Button */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                                    ${currentPage === totalPages
                                        ? 'text-[#8AAEC0]/20 cursor-not-allowed'
                                        : 'text-[#8AAEC0] hover:text-white hover:bg-[#8AAEC0]/10'
                                    }`}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </motion.div>
                    </div>
                </section>
            )}
        </main>
    );
}
