import { useRef, useState, Suspense } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductFeedCard from '../components/ProductFeedCard';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import html2canvas from 'html2canvas';
import EvolvingBlob, { EvolvingParticles, Starfield } from '../components/three/EvolvingBlob';

export default function Result() {
    const { state } = useLocation();
    const receiptRef = useRef(null);
    const [isSavingReceipt, setIsSavingReceipt] = useState(false);

    if (!state?.skinTypeStr) {
        return <Navigate to="/analysis" replace />;
    }

    const { skinTypeStr, description, products } = state;
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
        <div className="min-h-screen bg-black pt-32 pb-40 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">

                {/* LEFT: Persistent Step-10 3D Sphere */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="h-[50vh] md:h-[60vh] bg-[#05080a] rounded-[2rem] border border-[#222] overflow-hidden relative shadow-2xl"
                >
                    <div className="absolute top-6 left-8 z-10">
                        <span className="text-[#00E0FF] font-body text-[10px] tracking-widest uppercase">Data Object · Final Stage</span>
                    </div>
                    <div className="absolute inset-0 z-0">
                        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <spotLight position={[10, 10, 10]} intensity={1.2} color="#00E0FF" />
                            <pointLight position={[-10, -5, -5]} intensity={0.4} color="#3C7795" />
                            <Suspense fallback={null}>
                                <Starfield />
                                <EvolvingBlob step={10} />
                                <EvolvingParticles step={10} />
                                <Environment preset="city" />
                            </Suspense>
                            <EffectComposer>
                                <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                            </EffectComposer>
                        </Canvas>
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
                        <h2 className="font-title-ko text-4xl md:text-5xl font-bold text-white leading-title">{skinTypeStr}</h2>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
                        <div className="bg-[#05080a] p-8 md:p-10 rounded-3xl border border-[#222]">
                            <h3 className="font-title-en font-bold text-[#00E0FF] text-lg md:text-xl mb-4 leading-title">AXIOM Diagnosis</h3>
                            <p className="font-body text-[#E0E0E0] text-sm md:text-base leading-body tracking-normal whitespace-pre-line">{description}</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#222]">
                        <a href="#products" className="flex-1 text-center py-4 bg-[#00E0FF] text-black font-body font-bold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-colors">맞춤 상품 보기</a>
                        <button
                            onClick={saveReceipt}
                            disabled={isSavingReceipt}
                            className="flex-1 py-4 border border-[#1E5672] text-[#8AAEC0] font-body font-bold text-xs tracking-widest uppercase rounded-full hover:bg-[#1E5672]/20 transition-colors disabled:opacity-40"
                        >
                            {isSavingReceipt ? 'Saving…' : 'Save Card'}
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* AXIOM RECEIPT CARD */}
            <div className="max-w-7xl mx-auto mb-24 flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="w-full max-w-sm"
                >
                    <p className="font-body text-[9px] text-[#333] tracking-[0.3em] uppercase mb-4 text-center">
                        AXIOM Analysis Card · Save for Instagram
                    </p>

                    <div
                        ref={receiptRef}
                        style={{
                            background: '#000000',
                            width: '360px',
                            minHeight: '640px',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '40px 32px',
                            border: '1px solid #1a1a1a',
                            borderRadius: '16px',
                            fontFamily: 'monospace',
                        }}
                    >
                        <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '20px', marginBottom: '24px' }}>
                            <p style={{ color: '#3C7795', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '6px' }}>
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
                                <span key={i} style={{ color: '#222', fontSize: '10px' }}>·</span>
                            ))}
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <p style={{ color: '#3C7795', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '8px' }}>
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
                                <span style={{ color: '#3C7795', fontSize: '8px', letterSpacing: '0.1em' }}>Clinical Grade</span>
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
            </div>

            {/* PRESCRIBED SOLUTIONS */}
            <div id="products" className="max-w-7xl mx-auto pt-24 border-t border-[#222]">
                <div className="flex items-baseline gap-3 mb-8">
                    <h3 className="font-title-en text-3xl font-bold text-white leading-title">Prescribed Solutions</h3>
                    <span className="text-xs font-body text-ui-textMuted uppercase tracking-widest">
                        {skinTypeStr} 맞춤
                    </span>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {products?.map((product) => (
                        <Link key={product.id} to={`/curations/${product.id}`} className="snap-start flex-shrink-0">
                            <ProductFeedCard product={product} />
                        </Link>
                    ))}
                </div>
                <p className="text-xs font-body text-ui-textMuted mt-2 text-right">스와이프하여 더 보기 →</p>
            </div>
        </div>
    );
}
