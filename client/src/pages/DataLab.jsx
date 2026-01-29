import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 🔥 FORCE REAL SERVER URL (Solves local proxy issues)
const API_URL = "https://project-axiom.onrender.com";

export default function DataLab() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch from the real Render server
                const response = await fetch(`${API_URL}/api/stats`);

                // Safety Check: Did we get HTML instead of JSON?
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

    // Loading State (Cyan Pulse)
    if (loading) return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center gap-4">
            <div className="w-8 h-8 border-2 border-[#3C7795] border-t-[#00E0FF] rounded-full animate-spin"></div>
            <p className="text-[#3C7795] text-xs tracking-widest animate-pulse">CONNECTING TO SATELLITE...</p>
        </div>
    );

    // Error State
    if (error) return (
        <div className="min-h-screen bg-black flex justify-center items-center">
            <div className="text-center p-8 border border-red-900/30 bg-red-900/10 rounded-xl">
                <p className="text-red-400 mb-2">CONNECTION INTERRUPTED</p>
                <p className="text-red-500/60 text-xs font-mono">{error}</p>
            </div>
        </div>
    );

    // Calculate "Most Common" type safely
    const mostCommon = stats?.typeDistribution?.length
        ? [...stats.typeDistribution].sort((a, b) => b.count - a.count)[0]
        : { skinType: 'N/A', count: 0 };

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-4 md:px-8 overflow-hidden font-sans">
            <div className="max-w-6xl mx-auto h-full flex flex-col">

                {/* 1. Header Section */}
                <div className="mb-6 flex items-end justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#3C7795] mb-1">Live Database</p>
                        <h1 className="text-2xl md:text-3xl font-bold text-white leading-none">AXIOM DATA LAB</h1>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="flex items-center justify-end gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E0FF] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E0FF]"></span>
                            </span>
                            <span className="text-[#00E0FF] text-[10px] font-mono">LIVE FEED</span>
                        </div>
                    </div>
                </div>

                {/* 2. Top Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {/* Total Users */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#8AAEC0]/5 border border-[#8AAEC0]/10 rounded-xl p-4">
                        <h3 className="text-[#8AAEC0] text-[10px] uppercase tracking-wider mb-1">Total Responses</h3>
                        <p className="text-3xl font-bold text-white">{stats.totalCount.toLocaleString()}</p>
                    </motion.div>

                    {/* Most Common Type */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="col-span-2 bg-[#8AAEC0]/5 border border-[#8AAEC0]/10 rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-[#8AAEC0] text-[10px] uppercase tracking-wider mb-1">Dominant Skin Type</h3>
                            <p className="text-xl font-bold text-[#00E0FF]">{mostCommon.skinType}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-white">{mostCommon.count}</p>
                            <p className="text-[#8AAEC0] text-[10px]">users</p>
                        </div>
                    </motion.div>

                    {/* Today's Count (Placeholder logic or derived) */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#8AAEC0]/5 border border-[#8AAEC0]/10 rounded-xl p-4">
                        <h3 className="text-[#8AAEC0] text-[10px] uppercase tracking-wider mb-1">Real-time Status</h3>
                        <p className="text-sm text-[#00E0FF] mt-2">● OPERATIONAL</p>
                    </motion.div>
                </div>

                {/* 3. Main Content Grid (Distribution & Feed) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">

                    {/* Left: Skin Type Distribution Bar Chart */}
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-[#8AAEC0]/5 border border-[#8AAEC0]/10 rounded-xl p-6 backdrop-blur-sm">
                        <h2 className="text-sm font-bold text-white mb-6 border-b border-[#8AAEC0]/10 pb-2">SKIN TYPE DISTRIBUTION</h2>
                        <div className="space-y-4">
                            {stats.typeDistribution.map((item, index) => {
                                const percentage = stats.totalCount > 0 ? (item.count / stats.totalCount) * 100 : 0;
                                return (
                                    <div key={item.skinType} className="group">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-[#8AAEC0] group-hover:text-white transition-colors">{item.skinType}</span>
                                            <span className="text-[#00E0FF] font-mono">{percentage.toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-[#8AAEC0]/10 h-1.5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-[#1E5672] to-[#00E0FF]"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Right: Recent Activity Feed */}
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-[#8AAEC0]/5 border border-[#8AAEC0]/10 rounded-xl p-6 backdrop-blur-sm flex flex-col">
                        <h2 className="text-sm font-bold text-white mb-4 border-b border-[#8AAEC0]/10 pb-2">RECENT SIGNALS</h2>
                        <div className="flex-grow overflow-y-auto space-y-3 custom-scrollbar pr-2" style={{ maxHeight: '300px' }}>
                            {stats.recentActivity.map((entry, index) => (
                                <div key={index} className="p-3 bg-black/40 rounded border border-[#8AAEC0]/10 hover:border-[#3C7795] transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[#00E0FF] text-xs font-bold">{entry.skinType}</span>
                                        <span className="text-[#8AAEC0]/50 text-[10px] font-mono">
                                            {new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] text-[#8AAEC0]">
                                        <span>{entry.gender === 'male' ? '남성' : entry.gender === 'female' ? '여성' : 'User'}</span>
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
