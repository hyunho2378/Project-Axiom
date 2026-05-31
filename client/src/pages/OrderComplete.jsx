import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { formatPrice } from '../data/products';

const COPY = {
    ko: {
        eyebrow: 'AXIOM LABORATORY',
        headline: '당신의 큐레이션이 준비되었습니다',
        sub: '분석된 피부 데이터를 바탕으로, 당신에게 최적화된 포뮬러가 곧 도착합니다.',
        orderNum: '주문 번호',
        orderSummary: '주문 내역',
        subtotal: '합계',
        delivery: '배송 안내',
        deliveryNote: '주문 접수 후 2~3 영업일 내 발송됩니다.',
        qty: '수량',
        more: '큐레이션 더 보기',
        home: '홈으로',
        empty: '주문 내역이 없습니다.',
        emptyBack: '큐레이션 보러가기',
    },
    en: {
        eyebrow: 'AXIOM LABORATORY',
        headline: 'Your curation is on its way',
        sub: 'Based on your skin analysis, your optimized formula is being prepared.',
        orderNum: 'Order Number',
        orderSummary: 'Order Summary',
        subtotal: 'Subtotal',
        delivery: 'Delivery',
        deliveryNote: 'Dispatched within 2–3 business days after order confirmation.',
        qty: 'Qty',
        more: 'Explore More',
        home: 'Return Home',
        empty: 'No order found.',
        emptyBack: 'Go to Curations',
    },
};

export default function OrderComplete() {
    const location = useLocation();
    const { language } = useLanguage();
    const c = COPY[language] || COPY.en;

    const state = location.state;
    const orderItems = state?.orderItems;
    const total = state?.total;

    const [orderNumber] = useState(() => {
        const d = new Date();
        const date = d.toISOString().slice(0, 10).replace(/-/g, '');
        const rand = Math.floor(1000 + Math.random() * 9000);
        return `AXIOM-${date}-${rand}`;
    });

    if (!orderItems || orderItems.length === 0) {
        return (
            <main className="min-h-screen bg-void-base text-white flex items-center justify-center">
                <div className="text-center flex flex-col gap-6">
                    <p className="font-body text-ui-textMuted">{c.empty}</p>
                    <Link
                        to="/curations"
                        className="btn-glow px-8 py-3 rounded-2xl font-body text-sm tracking-[0.1em] uppercase"
                    >
                        {c.emptyBack}
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-void-base text-white">
            <div className="max-w-2xl mx-auto px-6 pt-28 pb-24">

                {/* 성공 아이콘 + 헤드라인 */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <div className="w-16 h-16 rounded-full border border-[#2A6885]/50 flex items-center justify-center mx-auto mb-8">
                        <svg className="w-7 h-7 text-[#3C7795]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <p className="font-body text-[10px] tracking-[0.22em] uppercase text-brand-400 mb-4">
                        {c.eyebrow}
                    </p>
                    <h1 className="font-title-en text-2xl lg:text-3xl italic text-ui-textPrimary leading-snug mb-4">
                        {c.headline}
                    </h1>
                    <p className="font-body text-sm text-ui-textMuted leading-relaxed max-w-sm mx-auto">
                        {c.sub}
                    </p>
                    <div className="w-16 h-[1px] bg-[#2A6885]/40 mx-auto mt-8" />
                </motion.div>

                {/* 주문 번호 */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="p-6 rounded-2xl bg-void-light border border-ui-border mb-5"
                >
                    <p className="font-body text-[10px] tracking-[0.18em] uppercase text-ui-textMuted mb-2">
                        {c.orderNum}
                    </p>
                    <p className="font-body text-base text-brand-400 tracking-widest tabular-nums">
                        {orderNumber}
                    </p>
                </motion.div>

                {/* 주문 내역 */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="p-6 rounded-2xl bg-void-light border border-ui-border mb-5"
                >
                    <p className="font-body text-[10px] tracking-[0.18em] uppercase text-ui-textMuted mb-5">
                        {c.orderSummary}
                    </p>
                    <div className="flex flex-col gap-3">
                        {orderItems.map((item, idx) => (
                            <div key={item.id ?? idx} className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <p className="font-body text-sm text-ui-textPrimary leading-snug truncate">
                                        {language === 'en' ? item.nameEn : item.nameKo}
                                    </p>
                                    {item.skinType && (
                                        <p className="font-body text-[11px] text-ui-textMuted mt-0.5">
                                            {item.skinType}
                                            {item.qty > 1 && <span> · {c.qty} {item.qty}</span>}
                                        </p>
                                    )}
                                </div>
                                <p className="font-body text-sm text-ui-textPrimary tabular-nums flex-shrink-0">
                                    {formatPrice(item.price * item.qty)}
                                </p>
                            </div>
                        ))}
                    </div>
                    {total != null && (
                        <div className="border-t border-ui-border pt-4 mt-4 flex justify-between items-center">
                            <span className="font-body text-[10px] tracking-[0.1em] uppercase text-ui-textMuted">
                                {c.subtotal}
                            </span>
                            <span className="font-body text-lg text-ui-textPrimary tabular-nums">
                                {formatPrice(total)}
                            </span>
                        </div>
                    )}
                </motion.div>

                {/* 배송 안내 */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="p-5 rounded-2xl border border-[#2A6885]/20 bg-[#2A6885]/5 mb-10"
                >
                    <p className="font-body text-[10px] tracking-[0.18em] uppercase text-brand-400 mb-1.5">
                        {c.delivery}
                    </p>
                    <p className="font-body text-sm text-ui-textMuted leading-relaxed">
                        {c.deliveryNote}
                    </p>
                </motion.div>

                {/* 버튼 */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="flex flex-col sm:flex-row gap-3"
                >
                    <Link
                        to="/curations"
                        className="btn-glow flex-1 py-4 rounded-2xl font-body text-sm font-bold tracking-[0.1em] uppercase text-center"
                    >
                        {c.more}
                    </Link>
                    <Link
                        to="/"
                        className="flex-1 py-4 rounded-2xl font-body text-sm tracking-[0.1em] uppercase text-center border border-ui-border text-ui-textMuted hover:border-[#2A6885]/60 hover:text-white/70 transition-colors duration-300"
                    >
                        {c.home}
                    </Link>
                </motion.div>

            </div>
        </main>
    );
}
