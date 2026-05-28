import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ALL_PRODUCTS } from '../data/productsData';

/**
 * Product Detail Page - AXIOM Official
 * DESIGN SYSTEM ENFORCED:
 * - BentonModDisp (font-title-en) / Pretendard Variable (font-body, font-body)
 * - Strict Color Palette: Cyan / Slate / Black / White
 */

export default function CurationDetail() {
    const { id } = useParams();
    const product = ALL_PRODUCTS.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-24">
                <h1 className="text-2xl font-title-en mb-4 text-[#8AAEC0]">Product Not Found</h1>
                <Link to="/curations" className="text-[#00E0FF] font-body border-b border-[#00E0FF] pb-1 tracking-widest uppercase text-sm">Return to Collections</Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#00E0FF] selection:text-black pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-6">

                {/* Back Button */}
                <div className="mb-12">
                    <Link to="/curations" className="inline-flex items-center text-[#555] hover:text-[#00E0FF] text-xs font-body tracking-widest uppercase transition-colors">
                        ← Back to Collections
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">

                    {/* LEFT: Visual Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`w-full aspect-square md:aspect-[4/5] rounded-2xl ${product.imageColor} border border-[#222] relative overflow-hidden flex flex-col items-center justify-center shadow-2xl`}
                    >
                        <div className="text-[#8AAEC0]/20 font-title-en text-3xl uppercase tracking-widest border border-[#333] px-10 py-6 text-center">
                            AXIOM<br />
                            <span className="text-sm font-body tracking-widest mt-2 block text-[#00E0FF]/50">{product.category}</span>
                        </div>
                        <div className="absolute top-6 left-6 flex gap-2">
                            <span className="text-black text-[10px] font-body font-bold tracking-widest uppercase px-3 py-1.5 bg-[#00E0FF] rounded-2xl">
                                {product.skinType}
                            </span>
                        </div>
                    </motion.div>

                    {/* RIGHT: Product Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        {/* Tags */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[#00E0FF] font-body text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">
                                {product.tag}
                            </span>
                            <span className="w-1 h-1 rounded-2xl bg-[#333]"></span>
                            <span className="text-[#8AAEC0] font-body text-[10px] md:text-xs uppercase tracking-widest">
                                {product.category}
                            </span>
                        </div>

                        {/* Title: Korean is sans, English is serif */}
                        <h1 className="font-body text-3xl md:text-4xl font-bold mb-3 text-white leading-tight tracking-tight">
                            {product.nameKr}
                        </h1>
                        <p className="font-title-en text-[#8AAEC0] text-lg md:text-xl italic mb-10">
                            {product.name}
                        </p>

                        {/* Price */}
                        <div className="flex items-end gap-4 mb-10 pb-8 border-b border-[#222]">
                            <span className="text-3xl font-body font-bold text-white">
                                {product.price}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mb-12">
                            <p className="text-[#8AAEC0] text-[10px] uppercase tracking-[0.2em] font-body font-bold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-2xl bg-[#00E0FF]"></span> Formula Details
                            </p>
                            <p className="font-body text-[#E0E0E0] leading-[1.8] whitespace-pre-line text-sm md:text-base tracking-tight">
                                {product.fullDesc}
                            </p>
                        </div>

                        {/* Ingredients */}
                        <div className="mb-12">
                            <p className="text-[#8AAEC0] text-[10px] uppercase tracking-[0.2em] font-body font-bold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-2xl bg-[#333]"></span> Key Ingredients
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {product.ingredients.map((ingredient, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 text-xs font-body text-[#8AAEC0] bg-[#111] border border-[#222] rounded-2xl hover:border-[#00E0FF]/50 hover:text-white transition-colors"
                                    >
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button className="flex-1 bg-[#00E0FF] hover:bg-white text-black font-body font-bold uppercase tracking-widest text-sm py-5 rounded-2xl transition-colors shadow-[0_0_20px_rgba(0,224,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                                장바구니 담기
                            </button>
                            <button className="px-8 border border-[#333] hover:border-[#00E0FF] rounded-2xl flex items-center justify-center transition-colors group">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#8AAEC0] group-hover:text-[#00E0FF] transition-colors" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </button>
                        </div>

                    </motion.div>
                </div>
            </div>
        </main>
    );
}