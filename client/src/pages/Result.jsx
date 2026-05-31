import { useRef, useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import ResultCrystal from '../components/three/ResultCrystal';
import SharedCanvas from '../components/three/products/SharedCanvas';
import ProductPreview from '../components/three/products/ProductPreview';
import { getRecommendedProducts, getSkinTypeData } from '../data/axiomData';
import { PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

const CARD_COLORS = {
    '건성':   '#7FC4E8',
    '중성':   '#3FD8C0',
    '지성':   '#5566FF',
    '수부지': '#22B8E0',
    '복합성': '#2ED0B0',
};

const CATEGORY_TO_TYPE = {
    '토너': 'toner',
    '앰플': 'ampoule',
    '튜브형 크림': 'tube',
    '튜브형크림': 'tube',
    '선크림': 'sunscreen',
    '원형 크림': 'jar',
    '원형크림': 'jar',
};

const COPY = {
    ko: {
        charLabel: '피부 특성',
        careLabel: '관리 방향',
        viewProducts: '맞춤 상품 보기',
        viewCard: '카드 보기',
        curationTitle: '당신을 위한 큐레이션',
        curationSub: (t) => `${t}에 맞춘 5가지`,
        whyLabel: '당신에게 맞는 이유',
        formulatedFor: (t) => `${t} 피부 처방 ·`,
    },
    en: {
        charLabel: 'Skin Profile',
        careLabel: 'Care Direction',
        viewProducts: 'View Recommendations',
        viewCard: 'View Card',
        curationTitle: 'Curated For You',
        curationSub: (t) => `Five Essentials · ${t}`,
        whyLabel: 'Why It Works',
        formulatedFor: (t) => `Formulated for ${t} ·`,
    },
};

function to3DProduct(product) {
    const productType = CATEGORY_TO_TYPE[product.category] || 'toner';
    const list = PRODUCTS[productType] || [];
    const match = list.find(p => p.skinType === product.skinType);
    return match ? { ...match, productType } : { ...product, productType, nameKo: product.nameKr, nameEn: product.name };
}

export default function Result() {
    const { state } = useLocation();
    const { language } = useLanguage();
    const navigate = useNavigate();
    const c = COPY[language] || COPY.en;
    const receiptRef = useRef(null);
    const [isSavingReceipt, setIsSavingReceipt] = useState(false);
    const [cardOpen, setCardOpen] = useState(false);

    if (!state?.skinTypeStr) {
        return <Navigate to="/analysis" replace />;
    }

    const { skinTypeStr, products } = state;
    const accentColor = CARD_COLORS[skinTypeStr.split(' · ')[0]] || '#00D4FF';
    const { description, characteristic, careDirection } = getSkinTypeData(skinTypeStr, language);
    const displayProducts = (products?.length > 0) ? products : getRecommendedProducts(skinTypeStr);
    const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });

    const saveReceipt = async () => {
        if (!receiptRef.current || isSavingReceipt) return;
        setIsSavingReceipt(true);
        try {
            const canvas = await html2canvas(receiptRef.current, {
                backgroundColor: '#000000',
                scale: 2,
                useCORS: true,
                logging: false,
            });
            const link = document.createElement('a');
            link.download = `axiom-${skinTypeStr.replace(/\s·\s/g, '-').replace(/\s/g, '_')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (e) {
            console.error('Receipt save failed:', e);
        } finally {
            setIsSavingReceipt(false);
        }
    };

    return (
        <>
            <SharedCanvas />
            <div className="min-h-screen bg-black pt-32 pb-40 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">

                {/* LEFT: Persistent Step-10 3D Sphere */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="h-[50vh] md:h-[60vh] bg-[#05080a] rounded-2xl border border-[#222] overflow-hidden relative shadow-2xl"
                >
                    <div className="absolute top-6 left-8 z-10">
                        <span className="text-[#00E0FF] font-body text-[10px] tracking-widest uppercase">Data Object · Final Stage</span>
                    </div>
                    <div className="absolute inset-0 z-0">
                        <ResultCrystal skinType={skinTypeStr} />
                    </div>
                    <div className="absolute bottom-8 left-8 z-10 pointer-events-none">
                        <div className="text-[#00E0FF] text-[10px] tracking-widest font-body font-bold mb-1">ANALYSIS COMPLETE</div>
                        <div className="text-white/30 text-[9px] font-body tracking-widest uppercase">STAGE 10 · FULL RADIANCE</div>
                    </div>
                </motion.div>

                {/* RIGHT: Diagnosis */}
                <div className="flex flex-col justify-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                        <p className="font-body text-[#8AAEC0] text-[10px] tracking-widest uppercase mb-4 font-bold">Diagnosis Complete</p>
                        <h2 className="font-title-ko text-3xl md:text-4xl font-bold text-white leading-title">{skinTypeStr}</h2>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
                        <div className="bg-[#05080a] p-8 md:p-10 rounded-2xl border border-[#222]">
                            <h3 className="font-title-en font-bold text-[#00E0FF] text-lg md:text-xl mb-4 leading-title">AXIOM Diagnosis</h3>
                            <p className="font-body text-[#E0E0E0] text-sm md:text-base leading-body tracking-normal whitespace-pre-line">{description}</p>

                            {characteristic && (
                                <>
                                    <hr className="border-[#1E5672] my-5" />
                                    <p className="font-body text-[10px] text-[#3C7795] uppercase tracking-widest mb-2">{c.charLabel}</p>
                                    <p className="font-body text-[#8AAEC0] text-sm leading-body whitespace-pre-line">{characteristic}</p>
                                </>
                            )}

                            {careDirection && (
                                <>
                                    <hr className="border-[#1E5672] my-5" />
                                    <p className="font-body text-[10px] text-[#3C7795] uppercase tracking-widest mb-2">{c.careLabel}</p>
                                    <p className="font-body text-[#8AAEC0] text-sm leading-body whitespace-pre-line">{careDirection}</p>
                                </>
                            )}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#222]">
                        <button
                            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                            className="flex-1 text-center py-4 font-body font-bold text-xs tracking-widest uppercase rounded-[14px] btn-glow"
                        >{c.viewProducts}</button>
                        <button
                            onClick={() => setCardOpen(true)}
                            className="flex-1 py-4 border border-[#1E5672] text-[#8AAEC0] font-body font-bold text-xs tracking-widest uppercase rounded-[14px] hover:bg-[#1E5672]/20 transition-colors"
                        >
                            {c.viewCard}
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* 당신을 위한 큐레이션 */}
            <div id="products" className="max-w-7xl mx-auto pt-24 border-t border-[#222]">
                <div className="mb-10">
                    <h3 className="font-title-ko text-3xl font-bold text-white leading-title">{c.curationTitle}</h3>
                    <p className="font-body text-sm text-[#5A9AB5] mt-2">{c.curationSub(skinTypeStr)}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {displayProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ borderColor: 'rgba(90, 154, 181, 0.55)', boxShadow: '0 4px 32px rgba(90, 154, 181, 0.1)' }}
                            onClick={() => navigate(`/curations/${product.id}`)}
                            style={{
                                background: 'rgba(8, 30, 50, 0.4)',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: 'rgba(90, 154, 181, 0.2)',
                                borderRadius: '14px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                            }}
                        >
                            {/* 3D ProductPreview 영역 */}
                            <div style={{ height: 220, flexShrink: 0, background: '#040c14' }}>
                                <ProductPreview product={to3DProduct(product)} size="small" />
                            </div>

                            {/* 본문 */}
                            <div className="p-5 flex flex-col flex-grow gap-0">
                                <p className="font-title-ko text-white text-base font-semibold leading-tight">{product.nameKr}</p>
                                <p className="font-title-en text-[#5A9AB5] text-xs italic mt-1">{product.name}</p>
                                <p className="font-body text-[#8AAEC0] text-xs leading-relaxed mt-3 line-clamp-2">{typeof product.desc === 'object' ? (product.desc[language] || product.desc.en) : product.desc}</p>

                                {/* 왜 당신에게 맞는 이유 */}
                                <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(30, 86, 114, 0.4)' }}>
                                    <p className="font-body text-[9px] text-[#3C7795] uppercase tracking-widest mb-1.5">{c.whyLabel}</p>
                                    <p className="font-body text-xs text-[#5A9AB5] leading-relaxed">
                                        {c.formulatedFor(product.skinType)} {(language === 'en' ? (product.ingredientsEn || product.ingredients) : product.ingredients)?.slice(0, 2).join(' · ')}
                                    </p>
                                </div>

                                <p className="font-body text-[#00E0FF] text-base font-semibold mt-auto pt-4">{product.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

        {/* AXIOM RECEIPT CARD — 모달 */}
        <AnimatePresence>
        {cardOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setCardOpen(false)}
                style={{
                    position: 'fixed', inset: 0, zIndex: 100,
                    background: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '20px', overflowY: 'auto',
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    onClick={e => e.stopPropagation()}
                    style={{ position: 'relative', maxWidth: '400px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
                >
                    <button
                        onClick={() => setCardOpen(false)}
                        style={{
                            position: 'absolute', top: -14, right: -14, zIndex: 10,
                            width: 30, height: 30, borderRadius: '50%',
                            background: '#0A0A0A', border: '1px solid #333',
                            color: '#8AAEC0', fontSize: '13px',
                            cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                        }}
                    >✕</button>

                    <p className="font-body text-[9px] text-[#333] tracking-[0.3em] uppercase mb-4 text-center">
                        AXIOM Analysis Card · Save for Instagram
                    </p>

                    <div
                        ref={receiptRef}
                        style={{
                            background: `radial-gradient(circle at 50% 18%, ${accentColor}1a 0%, transparent 58%), #000000`,
                            width: '100%',
                            minHeight: '640px',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '40px 32px',
                            border: `1px solid ${accentColor}4d`,
                            borderRadius: '16px',
                            fontFamily: 'monospace',
                        }}
                    >
                        <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '20px', marginBottom: '24px' }}>
                            <p style={{ color: accentColor, fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '6px' }}>
                                AXIOM LABORATORY
                            </p>
                            <p style={{ color: '#222', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                                Skin Analysis Receipt
                            </p>
                        </div>

                        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                            <p style={{ color: '#333', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '12px' }}>
                                Diagnosed Type
                            </p>
                            <p style={{ color: '#ffffff', fontSize: '28px', fontWeight: 'bold', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                                {skinTypeStr}
                            </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '32px' }}>
                            {[0,1,2,3,4,5,6,7,8].map(i => (
                                <span key={i} style={{ color: accentColor, fontSize: '10px', opacity: 0.4 }}>·</span>
                            ))}
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <p style={{ color: accentColor, fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '8px' }}>
                                AXIOM Prescription
                            </p>
                            <p style={{ color: '#8AAEC0', fontSize: '11px', lineHeight: 1.6, letterSpacing: '0.02em' }}>
                                {description?.slice(0, 120)}{description?.length > 120 ? '…' : ''}
                            </p>
                        </div>

                        <div style={{ flex: 1 }} />

                        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ color: '#333', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Date</span>
                                <span style={{ color: '#444', fontSize: '8px', letterSpacing: '0.1em' }}>{today}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ color: '#333', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>System</span>
                                <span style={{ color: '#444', fontSize: '8px', letterSpacing: '0.1em' }}>AXIOM v2.6</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#333', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Precision</span>
                                <span style={{ color: accentColor, fontSize: '8px', letterSpacing: '0.1em' }}>Clinical Grade</span>
                            </div>
                            <p style={{ color: '#1a1a1a', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: '16px', textAlign: 'center' }}>
                                axiom.studio · Define Your Axis
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={saveReceipt}
                        disabled={isSavingReceipt}
                        className="w-full mt-4 py-3 bg-[#05080a] border border-[#222] text-[#8AAEC0] font-body text-[10px] tracking-widest uppercase rounded-2xl hover:border-[#3C7795] hover:text-white transition-all disabled:opacity-40"
                    >
                        {isSavingReceipt ? '· SAVING ·' : '↓ SAVE ANALYSIS CARD'}
                    </button>
                </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
        </>
    );
}
