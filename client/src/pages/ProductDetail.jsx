import { useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllProducts, formatPrice } from '../data/products';
import ProductPreview from '../components/three/products/ProductPreview';
import { useLanguage } from '../context/LanguageContext';
import { useCartStore } from '../store/useCartStore';

const TYPE_BASE  = { toner: 100, ampoule: 105, tube: 110, jar: 115, sunscreen: 120 };
const SKIN_INDEX = { '건성': 0, '중성': 1, '지성': 2, '수부지': 3, '복합성': 4 };
const SKIN_TYPE_LABELS = {
    ko: { '건성': '건성', '중성': '중성', '지성': '지성', '수부지': '수부지', '복합성': '복합성' },
    en: { '건성': 'Dry', '중성': 'Normal', '지성': 'Oily', '수부지': 'Combo-Dry', '복합성': 'Combination' },
};
const CATEGORY_LABELS = {
    toner:     { ko: '토너',     en: 'Toner' },
    ampoule:   { ko: '앰플',     en: 'Ampoule' },
    tube:      { ko: '튜브 크림', en: 'Tube Cream' },
    sunscreen: { ko: '선크림',   en: 'Sunscreen' },
    jar:       { ko: '원형 크림', en: 'Jar Cream' },
};
const COPY = {
    ko: {
        notFound: '제품을 찾을 수 없습니다', back: '← 돌아가기', backToCollection: '← 컬렉션으로 돌아가기',
        volume: '용량', functional: '기능성', skinType: '피부타입',
        addToCart: '장바구니 담기', added: '담김 ✓', buyNow: '바로 구매',
    },
    en: {
        notFound: 'Product not found', back: '← Go back', backToCollection: '← Back to Collection',
        volume: 'Volume', functional: 'Function', skinType: 'Skin Type',
        addToCart: 'Add to Cart', added: 'Added ✓', buyNow: 'Buy Now',
    },
};

function deriveId(p) {
    return (TYPE_BASE[p.productType] ?? 100) + (SKIN_INDEX[p.skinType] ?? 0);
}

export default function ProductDetail() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const { addItem, setBuyNow } = useCartStore();
    const [added, setAdded] = useState(false);
    const isShopRoute = location.pathname.startsWith('/shop');

    const product = getAllProducts().find(p => deriveId(p) === parseInt(id));
    const c = COPY[language] || COPY.en;

    if (!product) {
        return (
            <main className="min-h-screen bg-void-base flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-body text-2xl text-white mb-4">{c.notFound}</h1>
                    <Link to={isShopRoute ? "/shop" : "/curations"} className="text-brand-500 hover:text-white font-body transition-colors">
                        {c.back}
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-void-base text-white">
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 lg:pt-28 lg:pb-24">

                <Link
                    to={isShopRoute ? "/shop" : "/curations"}
                    className="inline-flex items-center gap-2 font-body text-sm text-ui-textMuted hover:text-brand-400 transition-colors mb-12"
                >
                    {c.backToCollection}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* 좌측: 3D 큰 뷰 */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-[500px] bg-[#0A1218] rounded-2xl overflow-hidden lg:sticky lg:top-24"
                    >
                        <ProductPreview product={product} size="large" />
                    </motion.div>

                    {/* 우측: 텍스트 정보 전부 */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col gap-6"
                    >
                        {/* 칩 */}
                        <div className="flex flex-wrap gap-2">
                            <span className="chip chip-sm font-body">{CATEGORY_LABELS[product.productType]?.[language] || CATEGORY_LABELS[product.productType]?.en}</span>
                            <span className="chip chip-sm font-body">{SKIN_TYPE_LABELS[language]?.[product.skinType] || product.skinType}</span>
                            {product.functional && (
                                <span className="chip chip-sm font-body">{product.functional}</span>
                            )}
                        </div>

                        {/* 제품명 */}
                        <div>
                            <h1 className="font-body text-3xl lg:text-3xl text-ui-textPrimary leading-title">
                                {language === 'en' ? product.nameEn : product.nameKo}
                            </h1>
                            <p className="font-title-en text-brand-400 text-lg italic mt-2">
                                {language === 'en' ? product.nameKo : product.nameEn}
                            </p>
                        </div>

                        {/* 가격 */}
                        <p className="font-body text-brand-300 text-2xl">
                            {formatPrice(product.price)}
                        </p>

                        <div className="border-t border-ui-border" />

                        {/* 설명 (line-clamp 없이 풀 텍스트) */}
                        <p className="font-body text-ui-textSecondary text-base leading-body" style={{ wordBreak: 'keep-all' }}>
                            {typeof product.desc === 'object' ? (product.desc[language] || product.desc.en) : product.desc}
                        </p>

                        <div className="border-t border-ui-border" />

                        {/* 제품 상세 */}
                        <div className="space-y-4 font-body text-sm">
                            <div className="flex gap-4">
                                <span className="text-ui-textMuted w-16 flex-shrink-0">{language === 'en' ? 'Texture' : '제형'}</span>
                                <span className="text-ui-textPrimary">{typeof product.texture === 'object' ? (product.texture[language] || product.texture.en) : product.texture}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-ui-textMuted w-16 flex-shrink-0">{language === 'en' ? 'Key Ingredients' : '성분'}</span>
                                <span className="text-brand-400">{language === 'en' ? (product.ingredientsEn?.join(', ') || product.ingredients) : product.ingredients}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-ui-textMuted w-16 flex-shrink-0">{c.volume}</span>
                                <span className="text-ui-textPrimary">{product.volume}</span>
                            </div>
                            {product.functional && (
                                <div className="flex gap-4">
                                    <span className="text-ui-textMuted w-16 flex-shrink-0">{c.functional}</span>
                                    <span className="text-ui-textPrimary">{product.functional}</span>
                                </div>
                            )}
                            <div className="flex gap-4">
                                <span className="text-ui-textMuted w-16 flex-shrink-0">{c.skinType}</span>
                                <span className="text-ui-textPrimary">{SKIN_TYPE_LABELS[language]?.[product.skinType] || product.skinType}</span>
                            </div>
                        </div>

                        {/* 장바구니 담기 + 바로 구매 */}
                        <div className="flex flex-col gap-3 mt-2">
                            <button
                                onClick={() => {
                                    addItem({
                                        id: deriveId(product),
                                        nameKo: product.nameKo,
                                        nameEn: product.nameEn,
                                        price: product.price,
                                        productType: product.productType,
                                        skinType: product.skinType,
                                    });
                                    setAdded(true);
                                    setTimeout(() => setAdded(false), 1500);
                                }}
                                className="w-full py-4 rounded-2xl text-sm font-bold tracking-[0.1em] uppercase font-body
                                           border border-[#3C7795]/60 text-[#8AAEC0]
                                           hover:border-[#8AAEC0] hover:text-white
                                           transition-all duration-300"
                            >
                                {added ? c.added : c.addToCart}
                            </button>
                            <button
                                onClick={() => {
                                    setBuyNow({
                                        id: deriveId(product),
                                        nameKo: product.nameKo,
                                        nameEn: product.nameEn,
                                        price: product.price,
                                        productType: product.productType,
                                        skinType: product.skinType,
                                    });
                                    navigate('/checkout?mode=buynow');
                                }}
                                className="btn-glow w-full py-4 rounded-2xl text-sm font-bold tracking-[0.1em] uppercase font-body"
                            >
                                {c.buyNow}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
