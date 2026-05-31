import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
        headline: '당신의 선택이 곧 도착합니다',
        orderSummary: '주문 요약',
        qty: '수량',
        subtotal: '합계',
        delivery: '배송 정보',
        name: '이름',
        namePlaceholder: '홍길동',
        address: '배송지',
        addressPlaceholder: '서울특별시 강남구 테헤란로 00길 0',
        phone: '연락처',
        phonePlaceholder: '010-0000-0000',
        payMethod: '결제 수단',
        card: '신용 / 체크카드',
        simplePay: '간편결제',
        checkout: '결제하기',
        processing: '결제 중...',
        back: '← 장바구니로',
        demoNote: '전시용 체험 결제입니다. 실제 청구가 발생하지 않습니다.',
    },
    en: {
        headline: 'Your selection is on its way',
        orderSummary: 'Order Summary',
        qty: 'Qty',
        subtotal: 'Subtotal',
        delivery: 'Delivery',
        name: 'Name',
        namePlaceholder: 'Jane Doe',
        address: 'Address',
        addressPlaceholder: '123 Axiom Street, Seoul',
        phone: 'Phone',
        phonePlaceholder: '+82 10-0000-0000',
        payMethod: 'Payment Method',
        card: 'Credit / Debit Card',
        simplePay: 'Quick Pay',
        checkout: 'Complete Order',
        processing: 'Processing...',
        back: '← Back to Cart',
        demoNote: 'This is a demonstration checkout. No charge will occur.',
    },
};

const LABEL_CLS = 'font-body text-[10px] tracking-[0.14em] uppercase text-ui-textMuted mb-1.5 block';
const INPUT_CLS = 'w-full px-4 py-3 rounded-xl bg-void-light border border-ui-border text-ui-textPrimary font-body text-sm placeholder:text-ui-textMuted/50 focus:outline-none focus:border-[#2A6885] transition-colors';

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const c = COPY[language] || COPY.en;

    const { items, buyNowItem, clear, clearBuyNow } = useCartStore();

    const params = new URLSearchParams(location.search);
    const isBuyNow = params.get('mode') === 'buynow';
    const orderItems = isBuyNow
        ? (buyNowItem ? [buyNowItem] : [])
        : items;

    const [payMethod, setPayMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    const total = orderItems.reduce((s, i) => s + i.price * i.qty, 0);

    const handleCheckout = () => {
        if (isProcessing) return;
        setIsProcessing(true);
        const snapshot = { orderItems, total };
        setTimeout(() => {
            if (isBuyNow) {
                clearBuyNow();
            } else {
                clear();
            }
            navigate('/order-complete', { state: snapshot });
        }, 1000);
    };

    if (orderItems.length === 0) {
        return (
            <main className="min-h-screen bg-void-base text-white flex items-center justify-center">
                <div className="text-center flex flex-col gap-6">
                    <p className="font-body text-ui-textMuted">주문할 제품이 없습니다.</p>
                    <Link to="/curations" className="btn-glow px-8 py-3 rounded-2xl font-body text-sm tracking-[0.1em] uppercase">
                        큐레이션 보러가기
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-void-base text-white">
            <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">

                {/* 상단 헤드라인 */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <p className="font-body text-[10px] tracking-[0.22em] uppercase text-brand-400 mb-3">
                        AXIOM LABORATORY
                    </p>
                    <h1 className="font-title-en text-2xl lg:text-3xl italic text-ui-textPrimary leading-snug">
                        {c.headline}
                    </h1>
                    <div className="w-16 h-[1px] bg-[#2A6885]/40 mx-auto mt-6" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-14 items-start">

                    {/* 좌측: 배송 + 결제수단 */}
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col gap-8"
                    >
                        {/* 배송 정보 */}
                        <section className="p-6 rounded-2xl bg-void-light border border-ui-border">
                            <p className="font-body text-sm font-bold tracking-[0.1em] uppercase text-brand-400 mb-5">
                                {c.delivery}
                            </p>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className={LABEL_CLS}>{c.name}</label>
                                    <input
                                        type="text"
                                        placeholder={c.namePlaceholder}
                                        autoComplete="off"
                                        className={INPUT_CLS}
                                    />
                                </div>
                                <div>
                                    <label className={LABEL_CLS}>{c.address}</label>
                                    <input
                                        type="text"
                                        placeholder={c.addressPlaceholder}
                                        autoComplete="off"
                                        className={INPUT_CLS}
                                    />
                                </div>
                                <div>
                                    <label className={LABEL_CLS}>{c.phone}</label>
                                    <input
                                        type="text"
                                        placeholder={c.phonePlaceholder}
                                        autoComplete="off"
                                        className={INPUT_CLS}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* 결제 수단 */}
                        <section className="p-6 rounded-2xl bg-void-light border border-ui-border">
                            <p className="font-body text-sm font-bold tracking-[0.1em] uppercase text-brand-400 mb-5">
                                {c.payMethod}
                            </p>
                            <div className="flex flex-col gap-3">
                                {[
                                    { id: 'card', label: c.card },
                                    { id: 'simple', label: c.simplePay },
                                ].map((method) => (
                                    <label
                                        key={method.id}
                                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer transition-colors ${
                                            payMethod === method.id
                                                ? 'border-[#2A6885] bg-[#2A6885]/10'
                                                : 'border-ui-border hover:border-[#2A6885]/50'
                                        }`}
                                    >
                                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                                            payMethod === method.id ? 'border-brand-400' : 'border-ui-border'
                                        }`}>
                                            {payMethod === method.id && (
                                                <span className="w-2 h-2 rounded-full bg-brand-400" />
                                            )}
                                        </span>
                                        <input
                                            type="radio"
                                            name="payMethod"
                                            value={method.id}
                                            checked={payMethod === method.id}
                                            onChange={() => setPayMethod(method.id)}
                                            className="sr-only"
                                        />
                                        <span className="font-body text-sm text-ui-textPrimary">{method.label}</span>
                                    </label>
                                ))}
                            </div>
                        </section>
                    </motion.div>

                    {/* 우측: 주문 요약 + 결제 버튼 */}
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col gap-5 lg:sticky lg:top-28"
                    >
                        <section className="p-6 rounded-2xl bg-void-light border border-ui-border">
                            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-ui-textMuted mb-5">
                                {c.orderSummary}
                            </p>

                            <div className="flex flex-col gap-3 mb-5">
                                {orderItems.map((item) => (
                                    <div key={item.id} className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-body text-sm text-ui-textPrimary leading-snug truncate">
                                                {language === 'en' ? item.nameEn : item.nameKo}
                                            </p>
                                            <p className="font-body text-[11px] text-ui-textMuted mt-0.5">
                                                {CATEGORY_LABELS[item.productType]?.[language] || item.productType} · {item.skinType}
                                            </p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-body text-sm text-ui-textPrimary tabular-nums">
                                                {formatPrice(item.price * item.qty)}
                                            </p>
                                            {item.qty > 1 && (
                                                <p className="font-body text-[11px] text-ui-textMuted">
                                                    {c.qty} {item.qty}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-ui-border pt-4 flex justify-between items-center mb-6">
                                <span className="font-body text-[10px] tracking-[0.1em] uppercase text-ui-textMuted">
                                    {c.subtotal}
                                </span>
                                <span className="font-body text-lg text-ui-textPrimary tabular-nums">
                                    {formatPrice(total)}
                                </span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isProcessing}
                                className={`btn-glow w-full py-4 rounded-2xl font-body text-sm font-bold tracking-[0.1em] uppercase transition-opacity ${isProcessing ? 'opacity-70' : ''}`}
                            >
                                {isProcessing ? (
                                    <span className="flex items-center justify-center gap-2.5">
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                                            className="w-4 h-4 rounded-full border border-white/20 border-t-white"
                                            style={{ display: 'block', flexShrink: 0 }}
                                        />
                                        {c.processing}
                                    </span>
                                ) : (
                                    `${c.checkout} — ${formatPrice(total)}`
                                )}
                            </button>

                            <p className="font-body text-[10px] text-ui-textMuted/60 text-center mt-4 leading-relaxed">
                                {c.demoNote}
                            </p>
                        </section>

                        <Link
                            to={isBuyNow ? '/shop' : '/cart'}
                            className="font-body text-xs tracking-[0.08em] text-ui-textMuted hover:text-white/70 transition-colors text-center"
                        >
                            {c.back}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
