import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ALL_PRODUCTS } from '../data/productsData';

/**
 * Curations Page - AXIOM Official
 * DESIGN SYSTEM ENFORCED: 
 * - Serif names, Mono tags, Sans price/UI
 * - Strict max-w-7xl mx-auto px-6 margin
 */

const categories = ["전체 보기", ...new Set(ALL_PRODUCTS.map(p => p.category))];
const skinTypes = ["전체", "건성", "중성", "지성", "수부지", "복합성"];
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

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#3C7795] selection:text-black">

            {/* Header Area */}
            <section className="pt-32 pb-16 px-6 border-b border-[#222] bg-[#05080a]">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-white leading-title">Axiom Collections</h1>
                        <p className="font-sans text-[#8AAEC0] text-sm md:text-lg max-w-2xl leading-body tracking-normal">
                            피부 타입과 미세한 신호에 완벽하게 조율된 정밀 처방. <br className="hidden md:block" />
                            오직 당신의 데이터를 바탕으로 설계된 포뮬러를 경험해 보세요.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Section (Sticky) */}
            <section className="sticky top-[72px] z-40 bg-black/90 backdrop-blur-xl border-b border-[#222]">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                                className={`px-5 py-2 rounded-full font-sans text-[11px] md:text-xs tracking-widest uppercase transition-all duration-300 border
                                    ${activeCategory === cat
                                        ? 'bg-[#3C7795] text-black font-bold border-[#3C7795]'
                                        : 'bg-transparent text-[#8AAEC0] border-[#333] hover:border-[#3C7795]/50 hover:text-white'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <span className="text-[#8AAEC0] text-[10px] uppercase tracking-widest border-r border-[#333] pr-4 font-mono font-bold">Skin Type</span>
                        {skinTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => { setActiveSkinType(type); setCurrentPage(1); }}
                                className={`text-[11px] md:text-xs font-sans tracking-normal transition-colors pb-1 border-b-2
                                    ${activeSkinType === type
                                        ? 'text-white border-[#3C7795] font-bold'
                                        : 'text-[#555] border-transparent hover:text-white'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {currentProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 gap-y-20">
                            {currentProducts.map((product, index) => (
                                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: (index % 10) * 0.05 }} className="group cursor-pointer">
                                    <Link to={`/curations/${product.id}`} className="block">
                                        <div className={`relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 ${product.imageColor} border border-[#222] group-hover:border-[#3C7795]/50 transition-colors flex items-center justify-center shadow-xl`}>
                                            <div className="absolute top-4 left-4 bg-[#3C7795] text-black text-[10px] font-mono font-bold px-2 py-1 rounded-sm uppercase tracking-widest">{product.skinType}</div>
                                            <div className="w-1/2 h-1/2 border border-white/5 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                                        </div>

                                        <div className="space-y-2 px-1">
                                            <p className="text-[#3C7795] text-[10px] font-mono font-bold uppercase tracking-widest">{product.category}</p>
                                            <h3 className="font-serif font-bold text-white text-base md:text-lg leading-title group-hover:text-[#3C7795] transition-colors line-clamp-1">
                                                {product.nameKr}
                                            </h3>
                                            <p className="text-[#8AAEC0] text-[10px] md:text-xs font-serif italic truncate opacity-60 tracking-normal">{product.name}</p>

                                            {/* 🔥 불필요한 설명글 삭제 완료 */}

                                            <div className="pt-4 font-sans font-bold text-white text-sm md:text-base tracking-normal border-t border-[#222] mt-4 flex justify-between items-center">
                                                <span>{product.price}</span>
                                                <span className="text-[#333] group-hover:text-[#3C7795] transition-colors">→</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 border border-[#222] rounded-3xl bg-[#05080a]">
                            <p className="text-[#8AAEC0] font-sans text-sm md:text-base tracking-normal leading-body">해당 조건에 맞는 처방 솔루션이 없습니다.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}