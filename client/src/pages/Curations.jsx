import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CATEGORIES, getAllProducts, formatPrice } from '../data/products';
import ProductPreview from '../components/three/products/ProductPreview';
import SharedCanvas from '../components/three/products/SharedCanvas';
import { useLanguage } from '../context/LanguageContext';

const CATEGORY_LABELS = {
    toner:     { ko: '토너',     en: 'Toner' },
    ampoule:   { ko: '앰플',     en: 'Ampoule' },
    tube:      { ko: '튜브 크림', en: 'Tube Cream' },
    sunscreen: { ko: '선크림',   en: 'Sunscreen' },
    jar:       { ko: '원형 크림', en: 'Jar Cream' },
};
const SKIN_TYPES = ['건성', '중성', '지성', '수부지', '복합성'];
const SKIN_TYPE_LABELS = {
    ko: { '건성': '건성', '중성': '중성', '지성': '지성', '수부지': '수부지', '복합성': '복합성' },
    en: { '건성': 'Dry', '중성': 'Normal', '지성': 'Oily', '수부지': 'Combo-Dry', '복합성': 'Combination' },
};
const COPY = {
    ko: {
        desc: '피부 타입과 미세한 신호에 완벽하게 조율된 정밀 처방.\n오직 당신의 데이터를 바탕으로 설계된 포뮬러를 경험해 보세요.',
        emptyState: '해당 조건에 맞는 처방 솔루션이 없습니다.',
    },
    en: {
        desc: 'Precision formulas tuned to your skin type and its subtlest signals.\nExperience solutions designed exclusively from your data.',
        emptyState: 'No formulas match the selected criteria.',
    },
};

const TYPE_BASE  = { toner: 100, ampoule: 105, tube: 110, jar: 115, sunscreen: 120 };
const SKIN_INDEX = { '건성': 0, '중성': 1, '지성': 2, '수부지': 3, '복합성': 4 };
function deriveId(p) {
    return (TYPE_BASE[p.productType] ?? 100) + (SKIN_INDEX[p.skinType] ?? 0);
}

function ProductCard({ product, index }) {
    const { language } = useLanguage();
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
                        <span className="chip chip-sm font-body">{CATEGORY_LABELS[product.productType]?.[language] || CATEGORY_LABELS[product.productType]?.en}</span>
                        <span className="chip chip-sm font-body">{SKIN_TYPE_LABELS[language]?.[product.skinType] || product.skinType}</span>
                    </div>

                    {/* 제품명 */}
                    <div className="min-h-[56px] flex-shrink-0">
                        <h3 className="font-body text-ui-textPrimary text-lg leading-tight">{product.nameKo}</h3>
                        <p className="font-title-en text-brand-400 text-sm italic mt-1">{product.nameEn}</p>
                    </div>

                    {/* 설명 */}
                    <p className="font-body text-ui-textSecondary text-sm mt-3 line-clamp-2 min-h-[40px] flex-shrink-0">
                        {typeof product.desc === 'object' ? (product.desc[language] || product.desc.en) : product.desc}
                    </p>

                    {/* 제품 정보 */}
                    <div className="mt-3 space-y-1 text-xs text-ui-textMuted font-body flex-grow">
                        <p>{typeof product.texture === 'object' ? (product.texture[language] || product.texture.en) : product.texture}</p>
                        <p className="text-brand-400">{language === 'en' ? (product.ingredientsEn?.join(', ') || product.ingredients) : product.ingredients}</p>
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
    const { language } = useLanguage();
    const c = COPY[language] || COPY.en;
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
                        <p className="font-body text-ui-textSecondary text-sm md:text-lg max-w-2xl leading-body" style={{ whiteSpace: 'pre-line' }}>
                            {c.desc}
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
                                {typeof cat.label === 'object' ? (cat.label[language] || cat.label.en) : cat.label}
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
                                {SKIN_TYPE_LABELS[language]?.[skin] || skin}
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
                                {c.emptyState}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
        </>
    );
}
