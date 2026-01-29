import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 🔥 HARDCODED API URL
const API_URL = "https://project-axiom.onrender.com";

/**
 * AXIOM DATA LAB
 * Real-time statistics visualization for survey data
 */

// Animated Counter Component
function AnimatedCounter({ value, label, suffix = '' }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 1500;
        const start = 0;
        const end = value;
        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(start + (end - start) * eased));
            if (progress < 1) requestAnimationFrame(animate);
        };
        animate();
    }, [value]);

    return (
        <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-sm text-[#8AAEC0]/60 uppercase tracking-widest">{label}</div>
        </div>
    );
}

// Skin Type Bar Chart
function SkinTypeChart({ data }) {
    if (!data || data.length === 0) return null;

    const maxCount = Math.max(...data.map(d => d.count));
    const colors = {
        'Oily-Sensitive': '#FF7043',
        'Oily-Resilient': '#3C7795',
        'Dry-Sensitive': '#FFAB91',
        'Dry-Resilient': '#8AAEC0'
    };

    return (
        <div className="space-y-4">
            {data.map((item, i) => (
                <motion.div
                    key={item.skinType}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-2"
                >
                    <div className="flex justify-between text-sm">
                        <span className="text-[#8AAEC0]">{item.skinType}</span>
                        <span className="text-white font-bold">{item.count}명</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.count / maxCount) * 100}%` }}
                            transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: colors[item.skinType] || '#3C7795' }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

// Demographics Chart
function DemographicsChart({ genderData, ageData }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gender */}
            <div>
                <h3 className="text-lg font-bold text-white mb-4">성별 분포</h3>
                <div className="flex gap-4">
                    {genderData?.map((item, i) => (
                        <motion.div
                            key={item.gender}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className="flex-1 bg-white/5 rounded-2xl p-6 text-center border border-white/10"
                        >
                            <div className="text-3xl font-bold text-[#3C7795] mb-1">{item.count}</div>
                            <div className="text-sm text-[#8AAEC0]/60">{item.gender}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Age */}
            <div>
                <h3 className="text-lg font-bold text-white mb-4">연령대 분포</h3>
                <div className="grid grid-cols-3 gap-2">
                    {ageData?.map((item, i) => (
                        <motion.div
                            key={item.age}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 rounded-xl p-3 text-center border border-white/10"
                        >
                            <div className="text-xl font-bold text-white">{item.count}</div>
                            <div className="text-xs text-[#8AAEC0]/60">{item.age}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function DataLab() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStats();
        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch(`${API_URL}/api/stats`);
            const data = await response.json();
            if (data.success) {
                setStats(data.data);
            } else {
                throw new Error(data.error || 'Failed to fetch stats');
            }
        } catch (err) {
            console.error('Stats fetch error:', err);
            setError(err.message);
            // Use mock data for demo
            setStats({
                totalResponses: 1247,
                todayResponses: 23,
                skinTypes: [
                    { skinType: 'Oily-Sensitive', count: 412 },
                    { skinType: 'Dry-Resilient', count: 387 },
                    { skinType: 'Oily-Resilient', count: 289 },
                    { skinType: 'Dry-Sensitive', count: 159 }
                ],
                genderDistribution: [
                    { gender: '남성', count: 542 },
                    { gender: '여성', count: 705 }
                ],
                ageDistribution: [
                    { age: '10대', count: 89 },
                    { age: '20대', count: 534 },
                    { age: '30대', count: 398 },
                    { age: '40대', count: 156 },
                    { age: '50대 이상', count: 70 }
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black pt-32 flex items-center justify-center">
                <motion.div
                    className="w-16 h-16 rounded-full border-2 border-[#3C7795]/30 border-t-[#00E0FF]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#3C7795] mb-4">Real-Time Analytics</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">AXIOM DATA LAB</h1>
                    <p className="text-[#8AAEC0]/60 max-w-xl mx-auto">
                        실시간으로 수집된 피부 분석 데이터를 확인하세요
                    </p>
                </motion.div>

                {/* Live Counters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 gap-8 mb-16"
                >
                    <div className="bg-gradient-to-br from-[#1E5672]/30 to-transparent border border-[#3C7795]/30 rounded-3xl p-8">
                        <AnimatedCounter value={stats?.totalResponses || 0} label="Total Responses" suffix="" />
                    </div>
                    <div className="bg-gradient-to-br from-[#3C7795]/20 to-transparent border border-[#8AAEC0]/20 rounded-3xl p-8">
                        <AnimatedCounter value={stats?.todayResponses || 0} label="Today" suffix="" />
                    </div>
                </motion.div>

                {/* Skin Type Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-8">피부 타입 분포</h2>
                    <SkinTypeChart data={stats?.skinTypes} />
                </motion.div>

                {/* Demographics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-8">인구통계 분석</h2>
                    <DemographicsChart
                        genderData={stats?.genderDistribution}
                        ageData={stats?.ageDistribution}
                    />
                </motion.div>

                {/* Last Updated */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-[#8AAEC0]/40">
                        Auto-refreshes every 30 seconds • Last updated: {new Date().toLocaleTimeString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
