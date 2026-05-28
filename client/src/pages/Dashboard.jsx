import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AuroraRing from '../components/three/AuroraRing';

/**
 * Dashboard Page - Protected User Area
 * 
 * Personal control center with skin analysis results
 */
export default function Dashboard({ user, isLoggedIn }) {
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    // Mock user data (would come from API in real app)
    const mockData = {
        skinType: 'Hydra',
        skinScore: 78,
        lastAnalysis: '2026-01-08',
        recommendations: [
            { name: 'Aura Hydra Serum', match: 95 },
            { name: 'Calm Barrier Cream', match: 88 },
            { name: 'First Treatment Essence', match: 82 }
        ],
        savedProducts: [
            { id: 1, name: 'Night Repair Complex', price: 120000 },
            { id: 2, name: 'Vitamin C Brightening', price: 72000 }
        ],
        skinMetrics: [
            { label: 'Hydration', value: 72, color: 'bg-[#3C7795]' },
            { label: 'Elasticity', value: 85, color: 'bg-[#1E5672]' },
            { label: 'Pore Size', value: 68, color: 'bg-[#8AAEC0]' },
            { label: 'Brightness', value: 80, color: 'bg-[#3C7795]' }
        ]
    };

    if (!isLoggedIn) return null;

    return (
        <div className="min-h-screen bg-void pt-24 relative overflow-hidden">
            {/* AuroraRing background — absolute z-0, dashboard content z-10 */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <Suspense fallback={null}>
                    <AuroraRing />
                </Suspense>
            </div>
            <div className="relative z-10">
            {/* Header */}
            <section className="px-6 md:px-12 lg:px-24 pt-12 pb-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-sm uppercase tracking-[0.3em] text-white/50 mb-2">
                            Dashboard
                        </p>
                        <h1 className="font-title-en text-3xl md:text-3xl font-medium text-white">
                            Welcome back, {user?.name || 'User'}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="px-6 md:px-12 lg:px-24 py-8">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
                    {/* Skin Type Card - Large */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-[#1E5672]/10 via-[#3C7795]/5 to-transparent border border-white/[0.08]"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <p className="text-sm text-white/50 mb-2">Your Aura Type</p>
                                <h2 className="font-title-en text-4xl md:text-5xl font-medium text-white mb-2">
                                    {mockData.skinType}
                                </h2>
                                <p className="text-white/50">
                                    Last analyzed: {mockData.lastAnalysis}
                                </p>
                            </div>

                            {/* Score Circle */}
                            <div className="relative w-32 h-32">
                                <svg className="w-full h-full -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth="8"
                                        fill="none"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="url(#gradient)"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={`${mockData.skinScore * 3.52} 352`}
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#3C7795" />
                                            <stop offset="100%" stopColor="#8AAEC0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-3xl font-medium text-white">{mockData.skinScore}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/diagnosis')}
                            className="mt-6 inline-flex items-center gap-4 px-16 py-5 font-body font-semibold text-sm tracking-[0.22em] uppercase rounded-2xl btn-glow"
                        >
                            Take New Analysis
                        </button>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
                    >
                        <h3 className="text-sm uppercase tracking-wider text-white/50 mb-6">
                            Skin Metrics
                        </h3>
                        <div className="space-y-5">
                            {mockData.skinMetrics.map((metric) => (
                                <div key={metric.label}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white/70">{metric.label}</span>
                                        <span className="text-white">{metric.value}%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${metric.value}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className={`h-full ${metric.color} rounded-2xl`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recommended Products */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm uppercase tracking-wider text-white/50">
                                Recommended for You
                            </h3>
                            <a href="/shop" className="text-sm text-[#8AAEC0] hover:text-[#3C7795] transition-colors">
                                View All →
                            </a>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {mockData.recommendations.map((product, i) => (
                                <div
                                    key={product.name}
                                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors cursor-pointer"
                                >
                                    <div className="w-full h-24 rounded-2xl bg-gradient-to-br from-[#1E5672]/20 to-[#3C7795]/10 mb-4 flex items-center justify-center">
                                        <div className="w-8 h-14 rounded-2xl bg-white/10" />
                                    </div>
                                    <h4 className="text-sm font-medium text-white mb-1">{product.name}</h4>
                                    <p className="text-xs text-[#8AAEC0]">{product.match}% match</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Saved Products */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
                    >
                        <h3 className="text-sm uppercase tracking-wider text-white/50 mb-6">
                            Saved Products
                        </h3>
                        <div className="space-y-4">
                            {mockData.savedProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E5672]/20 to-[#3C7795]/10 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-white truncate">{product.name}</h4>
                                        <p className="text-xs text-white/50">
                                            {new Intl.NumberFormat('ko-KR').format(product.price)}원
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-3 text-sm text-white/60 hover:text-white border border-white/10 rounded-2xl hover:bg-white/5 transition-all">
                            View All Saved
                        </button>
                    </motion.div>
                </div>
            </section>
            </div>{/* /relative z-10 */}
        </div>
    );
}
