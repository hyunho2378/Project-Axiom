import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ALL_PRODUCTS } from '../data/productsData';

/**
 * ProductDetail - LUXURY TECH Aesthetic
 * 
 * STRICT PALETTE:
 * - Highlight: #3C7795 (Cyan)
 * - Mist: #8AAEC0 (Text + Glass Cards)
 * - Void: #000000 (Background)
 * - NO PURPLE / NO #082B35
 * 
 * Layout preserved: max-w-screen-xl mx-auto px-6 lg:px-16
 */
export default function ProductDetail() {
    const { id } = useParams();
    const location = useLocation();

    const isShopRoute = location.pathname.startsWith('/shop');
    const mode = isShopRoute ? 'analysis' : 'curation';

    const product = ALL_PRODUCTS.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <main className="min-h-screen bg-transparent flex items-center justify-center relative z-10">
                <div className="text-center">
                    <h1 className="font-serif text-2xl text-white mb-4">제품을 찾을 수 없습니다</h1>
                    <Link to={isShopRoute ? "/shop" : "/curations"} className="text-[#3C7795] hover:text-white font-sans">
                        ← 돌아가기
                    </Link>
                </div>
            </main>
        );
    }

    const isAnalysisMode = mode === 'analysis';
    const matchRate = 85 + (product.id % 15);

    return (
        <main className="min-h-screen bg-transparent text-white flex items-center justify-center relative z-10">

            {/* CONTAINER: matches Header/Footer */}
            <div className="max-w-screen-xl w-full mx-auto px-6 lg:px-16">

                {/* GRID: 5:7 Ratio, Fixed 500px Height */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 h-auto md:h-[500px] items-start">

                    {/* LEFT: Image Section (col-span-5) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`md:col-span-5 w-full h-[400px] md:h-full rounded-2xl relative overflow-hidden 
                                    border border-[#8AAEC0]/20 shadow-2xl ${product.imageColor || 'bg-[#8AAEC0]/10'}`}
                    >
                        {/* Badge - Cyan Gradient */}
                        <div className="absolute top-4 left-4 px-3 py-1.5 
                                        bg-gradient-to-r from-[#1E5672] to-[#3C7795]
                                        text-[10px] font-bold tracking-[0.2em] uppercase text-white rounded-full z-10
                                        border border-white/15">
                            {isAnalysisMode ? 'Best Match' : product.tag}
                        </div>

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </motion.div>

                    {/* RIGHT: Content Section (col-span-7) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="md:col-span-7 flex flex-col h-auto md:h-full justify-between py-2"
                    >
                        {/* Top Info */}
                        <div>
                            {/* Category - Cyan */}
                            <p className="text-[#3C7795] font-medium tracking-[0.2em] text-xs mb-4 uppercase font-sans">
                                {product.category}
                            </p>

                            {/* Name - Stark White Serif */}
                            <h1 className="text-3xl lg:text-4xl font-serif mb-2 font-light text-white tracking-wide">
                                {product.name}
                            </h1>

                            {/* Price - White */}
                            <p className="text-lg lg:text-xl font-light text-white font-sans mb-6">
                                {product.price}
                            </p>

                            {/* Description - Mist */}
                            <p className="text-[#8AAEC0] text-sm leading-loose font-sans opacity-90 border-t border-[#8AAEC0]/15 pt-6 line-clamp-4" style={{ wordBreak: 'keep-all' }}>
                                {product.desc}
                            </p>

                            {/* Conditional Box - Luxury Tech */}
                            <div className="mt-6">
                                {isAnalysisMode ? (
                                    /* AI Match Score - Cyan glow */
                                    <div className="flex items-center gap-4 p-4 rounded-xl w-fit bg-[#8AAEC0]/5 backdrop-blur-md border border-[#3C7795]/50 shadow-[0_0_20px_-5px_rgba(60,119,149,0.25)]">
                                        <div className="text-[#3C7795] font-serif text-3xl font-light">{matchRate}%</div>
                                        <div className="text-xs text-[#8AAEC0] font-sans">AI Match Score</div>
                                    </div>
                                ) : (
                                    /* Recommendation Target */
                                    <div className="py-3 px-4 rounded-xl bg-[#8AAEC0]/5 backdrop-blur-md border border-[#8AAEC0]/20">
                                        <p className="text-[10px] text-[#3C7795] mb-1 uppercase tracking-wider font-sans">
                                            Recommended For
                                        </p>
                                        <p className="text-sm text-white font-sans" style={{ wordBreak: 'keep-all' }}>
                                            {product.recommendationTarget}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bottom Button Group */}
                        <div className="w-full mt-6 md:mt-0">
                            {/* Ingredients - Simple Pills */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {product.ingredients.slice(0, 4).map(ing => (
                                    <span
                                        key={ing}
                                        className="text-[10px] text-[#8AAEC0] uppercase tracking-wider 
                                                   bg-[#8AAEC0]/10 border border-[#8AAEC0]/20 
                                                   px-3 py-1.5 rounded-full font-sans"
                                    >
                                        {ing}
                                    </span>
                                ))}
                            </div>

                            {/* Button - Cyan Gradient */}
                            <button className="w-full py-4 rounded-full text-sm font-bold tracking-[0.1em] uppercase font-sans
                                             bg-gradient-to-r from-[#1E5672] to-[#3C7795] text-white
                                             border border-white/15
                                             hover:brightness-110 transition-all duration-300
                                             shadow-lg hover:shadow-[0_8px_32px_rgba(60,119,149,0.40)]">
                                장바구니 담기
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
