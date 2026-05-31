import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { formatPrice } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

const CATEGORY_LABELS = {
    toner:     { ko: '토너',     en: 'Toner' },
    ampoule:   { ko: '앰플',     en: 'Ampoule' },
    tube:      { ko: '튜브 크림', en: 'Tube Cream' },
    sunscreen: { ko: '선크림',   en: 'Sunscreen' },
    jar:       { ko: '원형 크림', en: 'Jar Cream' },
};

const COPY = {
    ko: {
        title: '장바구니',
        empty: '담긴 제품이 없습니다.',
        emptyBtn: '큐레이션 보러가기',
        remove: '삭제',
        subtotal: '합계',
        checkout: '결제하기',
        category: '카테고리',
        skin: '피부타입',
        clearAll: '전체 삭제',
    },
    en: {
        title: 'Cart',
        empty: 'Your cart is empty.',
        emptyBtn: 'Explore Curations',
        remove: 'Remove',
        subtotal: 'Subtotal',
        checkout: 'Checkout',
        category: 'Category',
        skin: 'Skin Type',
        clearAll: 'Clear All',
    },
};

export default function Cart() {
    const { language } = useLanguage();
    const c = COPY[language] || COPY.en;
    const navigate = useNavigate();
    const { items, removeItem, updateQty, clear, totalPrice } = useCartStore();

    return (
        <main className="min-h-screen bg-void-base text-white">
            <div className="max-w-3xl mx-auto px-6 pt-28 pb-24">

                <div className="flex items-center justify-between mb-10">
                    <h1 className="font-body text-2xl lg:text-3xl tracking-tight text-ui-textPrimary">
                        {c.title}
                    </h1>
                    {items.length > 0 && (
                        <button
                            onClick={clear}
                            className="font-body text-xs tracking-[0.1em] uppercase text-ui-textMuted hover:text-white/70 transition-colors"
                        >
                            {c.clearAll}
                        </button>
                    )}
                </div>

                {items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center gap-8 py-24"
                    >
                        <svg className="w-16 h-16 text-ui-border" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        <p className="font-body text-ui-textMuted text-base">{c.empty}</p>
                        <Link
                            to="/curations"
                            className="font-body text-sm tracking-[0.1em] uppercase px-8 py-3 rounded-2xl
                                       border border-[#3C7795]/60 text-[#8AAEC0]
                                       hover:border-[#8AAEC0] hover:text-white transition-all duration-300"
                        >
                            {c.emptyBtn}
                        </Link>
                    </motion.div>
                ) : (
                    <>
                        <div className="flex flex-col gap-4 mb-10">
                            <AnimatePresence initial={false}>
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex items-start gap-5 p-5 rounded-2xl bg-void-light border border-ui-border"
                                    >
                                        {/* 제품 정보 */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                <span className="font-body text-[10px] tracking-[0.12em] uppercase text-brand-400 border border-brand-400/30 rounded-full px-2 py-0.5">
                                                    {CATEGORY_LABELS[item.productType]?.[language] || item.productType}
                                                </span>
                                                <span className="font-body text-[10px] tracking-[0.12em] uppercase text-ui-textMuted border border-ui-border rounded-full px-2 py-0.5">
                                                    {item.skinType}
                                                </span>
                                            </div>
                                            <p className="font-body text-base text-ui-textPrimary leading-snug mb-1 truncate">
                                                {language === 'en' ? item.nameEn : item.nameKo}
                                            </p>
                                            <p className="font-body text-sm text-brand-300">
                                                {formatPrice(item.price)}
                                            </p>
                                        </div>

                                        {/* 수량 조절 */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => updateQty(item.id, item.qty - 1)}
                                                className="w-7 h-7 rounded-full border border-ui-border text-ui-textMuted hover:border-brand-400/60 hover:text-white transition-colors flex items-center justify-center font-body text-base"
                                                aria-label="감소"
                                            >
                                                −
                                            </button>
                                            <span className="w-6 text-center font-body text-sm text-ui-textPrimary tabular-nums">
                                                {item.qty}
                                            </span>
                                            <button
                                                onClick={() => updateQty(item.id, item.qty + 1)}
                                                className="w-7 h-7 rounded-full border border-ui-border text-ui-textMuted hover:border-brand-400/60 hover:text-white transition-colors flex items-center justify-center font-body text-base"
                                                aria-label="증가"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* 소계 + 삭제 */}
                                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                            <p className="font-body text-sm text-ui-textPrimary tabular-nums">
                                                {formatPrice(item.price * item.qty)}
                                            </p>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="font-body text-[10px] tracking-[0.08em] uppercase text-ui-textMuted hover:text-white/70 transition-colors"
                                                aria-label={c.remove}
                                            >
                                                {c.remove}
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* 합계 + 결제 */}
                        <div className="border-t border-ui-border pt-8 flex flex-col gap-5">
                            <div className="flex justify-between items-center">
                                <span className="font-body text-sm tracking-[0.08em] uppercase text-ui-textMuted">
                                    {c.subtotal}
                                </span>
                                <span className="font-body text-xl text-ui-textPrimary tabular-nums">
                                    {formatPrice(totalPrice())}
                                </span>
                            </div>
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full py-4 rounded-2xl text-sm font-bold tracking-[0.1em] uppercase font-body
                                           bg-gradient-to-r from-[#1E5672] to-[#3C7795] text-white
                                           border border-white/15
                                           hover:brightness-110 transition-all duration-300
                                           shadow-lg hover:shadow-[0_8px_32px_rgba(60,119,149,0.40)]"
                            >
                                {c.checkout} — {formatPrice(totalPrice())}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
