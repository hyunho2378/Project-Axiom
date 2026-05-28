import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllProducts, formatPrice } from '../data/products';
import ProductPreview from '../components/three/products/ProductPreview';

const TYPE_BASE  = { toner: 100, ampoule: 105, tube: 110, jar: 115, sunscreen: 120 };
const SKIN_INDEX = { '건성': 0, '중성': 1, '지성': 2, '수부지': 3, '복합성': 4 };
const CATEGORY_LABELS = { toner: '토너', ampoule: '앰플', tube: '튜브 크림', sunscreen: '선크림', jar: '원형 크림' };

function deriveId(p) {
    return (TYPE_BASE[p.productType] ?? 100) + (SKIN_INDEX[p.skinType] ?? 0);
}

export default function ProductDetail() {
    const { id } = useParams();
    const location = useLocation();
    const isShopRoute = location.pathname.startsWith('/shop');

    const product = getAllProducts().find(p => deriveId(p) === parseInt(id));

    if (!product) {
        return (
            <main className="min-h-screen bg-void-base flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-body text-2xl text-white mb-4">제품을 찾을 수 없습니다</h1>
                    <Link to={isShopRoute ? "/shop" : "/curations"} className="text-brand-500 hover:text-white font-body transition-colors">
                        ← 돌아가기
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
                    ← 컬렉션으로 돌아가기
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
                            <span className="chip chip-sm font-body">{CATEGORY_LABELS[product.productType]}</span>
                            <span className="chip chip-sm font-body">{product.skinType}</span>
                            {product.functional && (
                                <span className="chip chip-sm font-body">{product.functional}</span>
                            )}
                        </div>

                        {/* 제품명 */}
                        <div>
                            <h1 className="font-body text-3xl lg:text-3xl text-ui-textPrimary leading-title">
                                {product.nameKo}
                            </h1>
                            <p className="font-title-en text-brand-400 text-lg italic mt-2">
                                {product.nameEn}
                            </p>
                        </div>

                        {/* 가격 */}
                        <p className="font-body text-brand-300 text-2xl">
                            {formatPrice(product.price)}
                        </p>

                        <div className="border-t border-ui-border" />

                        {/* 설명 (line-clamp 없이 풀 텍스트) */}
                        <p className="font-body text-ui-textSecondary text-base leading-body" style={{ wordBreak: 'keep-all' }}>
                            {product.desc}
                        </p>

                        <div className="border-t border-ui-border" />

                        {/* 제품 상세 */}
                        <div className="space-y-4 font-body text-sm">
                            <div className="flex gap-4">
                                <span className="text-ui-textMuted w-16 flex-shrink-0">제형</span>
                                <span className="text-ui-textPrimary">{product.texture}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-ui-textMuted w-16 flex-shrink-0">성분</span>
                                <span className="text-brand-400">{product.ingredients}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-ui-textMuted w-16 flex-shrink-0">용량</span>
                                <span className="text-ui-textPrimary">{product.volume}</span>
                            </div>
                            {product.functional && (
                                <div className="flex gap-4">
                                    <span className="text-ui-textMuted w-16 flex-shrink-0">기능성</span>
                                    <span className="text-ui-textPrimary">{product.functional}</span>
                                </div>
                            )}
                            <div className="flex gap-4">
                                <span className="text-ui-textMuted w-16 flex-shrink-0">피부타입</span>
                                <span className="text-ui-textPrimary">{product.skinType}</span>
                            </div>
                        </div>

                        {/* 장바구니 버튼 */}
                        <button className="w-full py-4 rounded-2xl text-sm font-bold tracking-[0.1em] uppercase font-body
                                         bg-gradient-to-r from-[#1E5672] to-[#3C7795] text-white
                                         border border-white/15
                                         hover:brightness-110 transition-all duration-300
                                         shadow-lg hover:shadow-[0_8px_32px_rgba(60,119,149,0.40)] mt-2">
                            장바구니 담기
                        </button>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
