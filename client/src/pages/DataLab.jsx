import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { SKIN_TYPE_NAMES } from '../data/axiomData';
import AuroraRing from '../components/three/AuroraRing';

const API_URL = "https://project-axiom.onrender.com";

const COPY = {
    ko: {
        connecting: '위성 연결 중...',
        connError: '연결이 끊겼습니다',
        liveDb: '실시간 데이터베이스',
        title: 'AXIOM DATA LAB',
        liveFeed: '실시간',
        totalResponses: '총 응답',
        dominantType: '주요 피부 타입',
        users: '명',
        realtimeStatus: '실시간 상태',
        distribution: '피부 타입 분포',
        recentSignals: '최근 신호',
    },
    en: {
        connecting: 'CONNECTING TO SATELLITE...',
        connError: 'CONNECTION INTERRUPTED',
        liveDb: 'Live Database',
        title: 'AXIOM DATA LAB',
        liveFeed: 'LIVE FEED',
        totalResponses: 'Total Responses',
        dominantType: 'Dominant Skin Type',
        users: 'users',
        realtimeStatus: 'Real-time Status',
        distribution: 'SKIN TYPE DISTRIBUTION',
        recentSignals: 'RECENT SIGNALS',
    },
};

function displaySkinType(skinType, language) {
    if (!skinType || skinType === 'N/A') return skinType;
    return SKIN_TYPE_NAMES[skinType]?.[language] || skinType;
}

export default function DataLab() {
    const { language } = useLanguage();
    const c = COPY[language] || COPY.en;
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/stats`);
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Server connection failed (Received HTML). Check API URL.");
                }
                if (!response.ok) throw new Error(`Server Error: ${response.status}`);
                const data = await response.json();
                if (data.success) {
                    setStats(data.data);
                } else {
                    throw new Error(data.error || "Failed to load data");
                }
            } catch (err) {
                console.error("DataLab Fetch Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center">
            <div className="w-[400px] h-[400px]">
                <Suspense fallback={null}>
                    <AuroraRing />
                </Suspense>
            </div>
            <p className="text-[#8AAEC0] text-xs tracking-[0.2em] uppercase -mt-6">
                {c.connecting}
            </p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-black flex justify-center items-center">
            <div className="text-center p-8 border border-[#1E5672]/30 bg-[#082B35]/10 rounded-2xl">
                <p className="text-brand-400 mb-2">{c.connError}</p>
                <p className="text-[#8AAEC0]/60 text-xs font-body">{error}</p>
            </div>
        </div>
    );

    const mostCommon = stats?.typeDistribution?.length
        ? [...stats.typeDistribution].sort((a, b) => b.count - a.count)[0]
        : { skinType: 'N/A', count: 0 };

    return (
        <div className="min-h-screen bg-black text-white pt-24 overflow-hidden font-body">
            <div className="max-w-7xl mx-auto px-6 h-full flex flex-col">

                {/* 1. Header */}
                <div className="mb-6 flex items-end justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#3C7795] mb-1">{c.liveDb}</p>
                        <h1 className="text-2xl md:text-3xl font-bold text-white leading-none">{c.title}</h1>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="flex items-center justify-end gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-2xl bg-[#3C7795] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3C7795]"></span>
                            </span>
                            <span className="text-[#3C7795] text-[10px] font-body">{c.liveFeed}</span>
                        </div>
                    </div>
                </div>

                {/* 2. Top Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#8AAEC0]/5 border border-[#8AAEC0]/10 rounded-2xl p-4">
                        <h3 className="text-[#8AAEC0] text-[10px] uppercase tracking-wider mb-1">{c.totalResponses}</h3>
                        <p className="text-3xl font-bold text-white">{stats.totalCount.toLocaleString()}</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="col-span-2 bg-[#8AAEC0]/5 border border-[#8AAEC0]/10 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-[#8AAEC0] text-[10px] uppercase tracking-wider mb-1">{c.dominantType}</h3>
                            <p className="text-xl font-bold text-[#3C7795]">{displaySkinType(mostCommon.skinType, language)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-white">{mostCommon.count}</p>
                            <p className="text-[#8AAEC0] text-[10px]">{c.users}</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#8AAEC0]/5 border border-[#8AAEC0]/10 rounded-2xl p-4">
                        <h3 className="text-[#8AAEC0] text-[10px] uppercase tracking-wider mb-1">{c.realtimeStatus}</h3>
                        <p className="text-sm text-[#3C7795] mt-2">● OPERATIONAL</p>
                    </motion.div>
                </div>

                {/* 3. Distribution & Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">

                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-[#8AAEC0]/5 border border-[#8AAEC0]/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h2 className="text-sm font-bold text-white mb-6 border-b border-[#8AAEC0]/10 pb-2">{c.distribution}</h2>
                        <div className="space-y-4">
                            {stats.typeDistribution.map((item, index) => {
                                const percentage = stats.totalCount > 0 ? (item.count / stats.totalCount) * 100 : 0;
                                return (
                                    <div key={item.skinType} className="group">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-[#8AAEC0] group-hover:text-white transition-colors">{displaySkinType(item.skinType, language)}</span>
                                            <span className="text-[#3C7795] font-body">{percentage.toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-[#8AAEC0]/10 h-1.5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-[#1E5672] to-[#8AAEC0]"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-[#8AAEC0]/5 border border-[#8AAEC0]/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col">
                        <h2 className="text-sm font-bold text-white mb-4 border-b border-[#8AAEC0]/10 pb-2">{c.recentSignals}</h2>
                        <div className="flex-grow overflow-y-auto space-y-3 custom-scrollbar pr-2" style={{ maxHeight: '300px' }}>
                            {stats.recentActivity.map((entry, index) => (
                                <div key={index} className="p-3 bg-black/40 rounded border border-[#8AAEC0]/10 hover:border-[#3C7795] transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[#3C7795] text-xs font-bold">{displaySkinType(entry.skinType, language)}</span>
                                        <span className="text-[#8AAEC0]/50 text-[10px] font-body">
                                            {new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] text-[#8AAEC0]">
                                        <span>{entry.gender}</span>
                                        <span className="w-1 h-1 bg-[#8AAEC0]/30 rounded-full"></span>
                                        <span>{entry.age}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
