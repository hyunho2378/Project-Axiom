import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CATEGORIES, getAllProducts, formatPrice } from '../data/products';
import ProductPreview from '../components/three/products/ProductPreview';
import SharedCanvas from '../components/three/products/SharedCanvas';

const CATEGORY_LABELS = { toner: '토너', ampoule: '앰플', tube: '튜브 크림', sunscreen: '선크림', jar: '원형 크림' };
const SKIN_TYPES = ['건성', '중성', '지성', '수부지', '복합성'];

const TYPE_BASE  = { toner: 100, ampoule: 105, tube: 110, jar: 115, sunscreen: 120 };
const SKIN_INDEX = { '건성': 0, '중성': 1, '지성': 2, '수부지': 3, '복합성': 4 };
function deriveId(p) {
    return (TYPE_BASE[p.productType] ?? 100) + (SKIN_INDEX[p.skinType] ?? 0);
}

function ProductCard({ product, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
            className="h-full"
        >
            <Link
                to={`/curations/${deriveId(product)}`}
                className="block bg-[#080E14] border border-ui-border rounded-2xl overflow-hidden
                           hover:border-brand-600 transition-colors duration-300 flex flex-col h-full"
            >
                {/* 3D 프리뷰 — 고정 높이 */}
                <div className="h-[220px] w-full bg-[#0A1218] flex-shrink-0">
                    <ProductPreview product={product} size="small" />
                </div>

                {/* 텍스트 영역 */}
                <div className="p-5 flex flex-col flex-grow">

                    {/* 칩 */}
                    <div className="flex gap-2 mb-3 flex-shrink-0">
                        <span className="chip chip-sm font-body">{CATEGORY_LABELS[product.productType]}</span>
                        <span className="chip chip-sm font-body">{product.skinType}</span>
                    </div>

                    {/* 제품명 */}
                    <div className="min-h-[56px] flex-shrink-0">
                        <h3 className="font-body text-ui-textPrimary text-lg leading-tight">{product.nameKo}</h3>
                        <p className="font-title-en text-brand-400 text-sm italic mt-1">{product.nameEn}</p>
                    </div>

                    {/* 설명 */}
                    <p className="font-body text-ui-textSecondary text-sm mt-3 line-clamp-2 min-h-[40px] flex-shrink-0">
                        {product.desc}
                    </p>

                    {/* 제품 정보 */}
                    <div className="mt-3 space-y-1 text-xs text-ui-textMuted font-body flex-grow">
                        <p>{product.texture}</p>
                        <p className="text-brand-400">{product.ingredients}</p>
                        <p>{product.volume}{product.functional ? ' · ' + product.functional : ''}</p>
                    </div>

                    {/* 가격 */}
                    <p className="font-body text-brand-300 text-xl mt-4 flex-shrink-0">
                        {formatPrice(product.price)}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}

export default function Curations() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeSkin, setActiveSkin] = useState(null);

    const filtered = getAllProducts().filter(p => {
        if (activeCategory !== 'all' && p.productType !== activeCategory) return false;
        if (activeSkin && p.skinType !== activeSkin) return false;
        return true;
    });

    return (
        <>
        <SharedCanvas />
        <main className="min-h-screen bg-black text-white">

            <section className="pt-24 pb-16 border-b border-ui-border bg-void-base">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="font-title-en text-3xl md:text-5xl font-bold mb-4 text-white leading-title">
                            Axiom Collections
                        </h1>
                        <p className="font-body text-ui-textSecondary text-sm md:text-lg max-w-2xl leading-body">
                            피부 타입과 미세한 신호에 완벽하게 조율된 정밀 처방.<br className="hidden md:block" />
                            오직 당신의 데이터를 바탕으로 설계된 포뮬러를 경험해 보세요.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="sticky top-[72px] z-40 bg-black/90 backdrop-blur-xl border-b border-ui-border">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.key}
                                onClick={() => setActiveCategory(cat.key)}
                                className={`chip ${activeCategory === cat.key ? 'chip-active' : ''}`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="font-body text-ui-textMuted text-[10px] uppercase tracking-widest border-r border-ui-border pr-4">
                            Skin Type
                        </span>
                        {SKIN_TYPES.map(skin => (
                            <button
                                key={skin}
                                onClick={() => setActiveSkin(activeSkin === skin ? null : skin)}
                                className={`chip ${activeSkin === skin ? 'chip-active' : ''}`}
                            >
                                {skin}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((p, i) => (
                                <ProductCard
                                    key={`${p.productType}-${p.skinType}`}
                                    product={p}
                                    index={i}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 border border-ui-border rounded-2xl">
                            <p className="font-body text-ui-textSecondary text-sm">
                                해당 조건에 맞는 처방 솔루션이 없습니다.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
        </>
    );
}
