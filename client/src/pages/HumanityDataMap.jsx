import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * AXIOM Humanity Data Map — Global Skin Intelligence
 *
 * Visualizes global skin concern distribution.
 * Pulls real DB stats from /api/stats, augmented with mock regional nodes.
 * Design: Research archive aesthetic, dark grid, animated nodes.
 */

const API_URL = "https://project-axiom.onrender.com";

const REGIONS = [
    { id: 'kr',  name: 'Korea',         x: 78, y: 28, concern: '지성 · 민감',   users: 4820 },
    { id: 'jp',  name: 'Japan',          x: 81, y: 30, concern: '건성 · 민감 주의', users: 3240 },
    { id: 'cn',  name: 'China',          x: 74, y: 30, concern: '복합성 · 비민감', users: 6110 },
    { id: 'us',  name: 'USA',            x: 16, y: 30, concern: '지성 · 과민',   users: 5530 },
    { id: 'fr',  name: 'France',         x: 47, y: 24, concern: '중성 · 민감 주의', users: 2180 },
    { id: 'de',  name: 'Germany',        x: 50, y: 22, concern: '건성 · 비민감', users: 1940 },
    { id: 'br',  name: 'Brazil',         x: 30, y: 58, concern: '지성 · 비민감', users: 3870 },
    { id: 'au',  name: 'Australia',      x: 82, y: 68, concern: '수부지 · 민감', users: 1560 },
    { id: 'in',  name: 'India',          x: 67, y: 38, concern: '지성 · 과민',   users: 7290 },
    { id: 'sg',  name: 'Singapore',      x: 75, y: 46, concern: '수부지 · 민감', users: 980  },
    { id: 'uk',  name: 'UK',             x: 45, y: 20, concern: '건성 · 민감',   users: 2340 },
    { id: 'mx',  name: 'Mexico',         x: 14, y: 38, concern: '복합성 · 민감 주의', users: 2890 },
];

const CONCERN_COLORS = {
    '지성 · 민감':      '#3C7795',
    '지성 · 과민':      '#1E5672',
    '지성 · 비민감':    '#5A9AB5',
    '건성 · 민감 주의': '#8AAEC0',
    '건성 · 비민감':    '#6B9FB8',
    '건성 · 민감':      '#8AAEC0',
    '복합성 · 비민감':  '#4A8BA5',
    '복합성 · 민감 주의': '#3C7795',
    '중성 · 민감 주의': '#5A9AB5',
    '수부지 · 민감':    '#8AAEC0',
};

function NodeDot({ region, onClick, isActive }) {
    return (
        <motion.button
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
            onClick={() => onClick(region)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * REGIONS.indexOf(region), duration: 0.4 }}
        >
            {/* Pulse ring */}
            <span
                className="absolute inset-0 rounded-full animate-ping opacity-40"
                style={{
                    backgroundColor: CONCERN_COLORS[region.concern] || '#3C7795',
                    animationDuration: `${1.5 + Math.random() * 1}s`,
                }}
            />
            {/* Core dot */}
            <span
                className="relative flex w-2.5 h-2.5 rounded-full transition-all duration-300 group-hover:scale-150"
                style={{
                    backgroundColor: isActive
                        ? '#ffffff'
                        : (CONCERN_COLORS[region.concern] || '#3C7795'),
                    boxShadow: isActive
                        ? `0 0 12px rgba(255,255,255,0.6)`
                        : `0 0 8px ${CONCERN_COLORS[region.concern] || '#3C7795'}80`,
                }}
            />
        </motion.button>
    );
}

export default function HumanityDataMap() {
    const [stats, setStats] = useState(null);
    const [activeRegion, setActiveRegion] = useState(null);
    const [totalNodes] = useState(REGIONS.reduce((s, r) => s + r.users, 0));

    useEffect(() => {
        fetch(`${API_URL}/api/stats`)
            .then(r => r.json())
            .then(d => { if (d.success) setStats(d.data); })
            .catch(() => {});
    }, []);

    const handleNodeClick = (region) => {
        setActiveRegion(prev => prev?.id === region.id ? null : region);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* ── HEADER ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mb-12"
                >
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="font-body text-[9px] tracking-[0.35em] text-[#3C7795] uppercase mb-3">
                                AXIOM Global Intelligence Network
                            </p>
                            <h1 className="font-title-en text-3xl md:text-4xl text-white leading-title">
                                Humanity Data Map
                            </h1>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3C7795] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3C7795]" />
                            </span>
                            <span className="font-body text-[9px] text-[#3C7795] tracking-widest uppercase">Live Feed</span>
                        </div>
                    </div>
                </motion.div>

                {/* ── STAT ROW ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: 'Global Nodes', val: REGIONS.length, unit: ' regions' },
                        { label: 'Total Users',  val: (stats?.totalCount || totalNodes).toLocaleString(), unit: '' },
                        { label: 'Dominant Type', val: stats?.typeDistribution?.[0]?.skinType || 'Loading…', unit: '' },
                        { label: 'Data Points',  val: '2.4M+', unit: '' },
                    ].map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="bg-[#05080a] border border-[#111] rounded-2xl p-4"
                        >
                            <p className="font-body text-[8px] text-[#333] tracking-[0.25em] uppercase mb-2">{s.label}</p>
                            <p className="font-body text-xl text-[#3C7795]">{s.val}<span className="text-xs text-[#444]">{s.unit}</span></p>
                        </motion.div>
                    ))}
                </div>

                {/* ── MAP AREA ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="lg:col-span-2 bg-[#02050a] border border-[#111] rounded-2xl overflow-hidden relative"
                        style={{ aspectRatio: '16/9' }}
                    >
                        {/* Grid overlay */}
                        <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage: `
                                    linear-gradient(#3C7795 1px, transparent 1px),
                                    linear-gradient(90deg, #3C7795 1px, transparent 1px)
                                `,
                                backgroundSize: '8% 11.1%',
                            }}
                        />

                        {/* Latitude lines */}
                        {[20, 40, 60, 80].map(y => (
                            <div
                                key={y}
                                className="absolute left-0 right-0 h-[1px] opacity-[0.06]"
                                style={{ top: `${y}%`, backgroundColor: '#3C7795' }}
                            />
                        ))}

                        {/* Equator line */}
                        <div className="absolute left-0 right-0 h-[1px] bg-[#3C7795]/10" style={{ top: '50%' }} />

                        {/* Glow center */}
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                            <div className="w-[60%] h-[60%] rounded-full bg-[#1E5672]/5 blur-[80px]" />
                        </div>

                        {/* Nodes */}
                        {REGIONS.map(region => (
                            <NodeDot
                                key={region.id}
                                region={region}
                                onClick={handleNodeClick}
                                isActive={activeRegion?.id === region.id}
                            />
                        ))}

                        {/* Labels */}
                        <div className="absolute bottom-4 left-6">
                            <p className="font-body text-[8px] text-[#333] tracking-[0.3em] uppercase">
                                AXIOM Global Network · {REGIONS.length} Active Nodes
                            </p>
                        </div>
                        <div className="absolute top-4 right-6">
                            <p className="font-body text-[8px] text-[#3C7795]/40 tracking-widest uppercase">
                                Real + Modeled Data
                            </p>
                        </div>
                    </motion.div>

                    {/* Side Panel */}
                    <div className="flex flex-col gap-4">

                        {/* Active node info */}
                        <motion.div
                            className="bg-[#05080a] border border-[#111] rounded-2xl p-6 flex-shrink-0"
                            layout
                        >
                            {activeRegion ? (
                                <motion.div
                                    key={activeRegion.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <p className="font-body text-[8px] text-[#3C7795] tracking-[0.3em] uppercase mb-4">
                                        Selected Node
                                    </p>
                                    <h3 className="font-title-en text-2xl text-white mb-2 leading-title">{activeRegion.name}</h3>
                                    <p className="font-body text-[10px] text-[#3C7795] tracking-widest mb-5">{activeRegion.concern}</p>
                                    <div className="grid grid-cols-2 gap-4 border-t border-[#111] pt-5">
                                        <div>
                                            <p className="font-body text-[8px] text-[#333] tracking-widest uppercase mb-1">Users</p>
                                            <p className="font-body text-xl text-[#8AAEC0]">{activeRegion.users.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="font-body text-[8px] text-[#333] tracking-widest uppercase mb-1">Share</p>
                                            <p className="font-body text-xl text-[#8AAEC0]">
                                                {((activeRegion.users / totalNodes) * 100).toFixed(1)}%
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="font-body text-[8px] text-[#333] tracking-[0.3em] uppercase mb-3">Node Detail</p>
                                    <p className="font-body text-[#444] text-xs">지도의 노드를 클릭하면 상세 데이터가 표시됩니다.</p>
                                </div>
                            )}
                        </motion.div>

                        {/* DB Skin Distribution */}
                        {stats?.typeDistribution?.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-[#05080a] border border-[#111] rounded-2xl p-6 flex-1"
                            >
                                <p className="font-body text-[8px] text-[#3C7795] tracking-[0.3em] uppercase mb-5">
                                    Live DB Distribution
                                </p>
                                <div className="space-y-3">
                                    {stats.typeDistribution.slice(0, 5).map((item) => {
                                        const pct = stats.totalCount > 0
                                            ? (item.count / stats.totalCount) * 100
                                            : 0;
                                        return (
                                            <div key={item.skinType}>
                                                <div className="flex justify-between text-[9px] mb-1">
                                                    <span className="font-body text-[#8AAEC0]">{item.skinType}</span>
                                                    <span className="font-body text-[#3C7795]">{pct.toFixed(1)}%</span>
                                                </div>
                                                <div className="w-full bg-[#111] h-[2px] rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-[#1E5672] to-[#8AAEC0]"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${pct}%` }}
                                                        transition={{ duration: 1 }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* ── REGIONAL TABLE ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border border-[#111] rounded-2xl overflow-hidden mb-24"
                >
                    <div className="border-b border-[#111] px-6 py-4 flex items-center justify-between">
                        <p className="font-body text-[9px] text-[#3C7795] tracking-[0.25em] uppercase">Regional Signal Index</p>
                        <p className="font-body text-[8px] text-[#333] tracking-widest">{REGIONS.length} regions · 2026.04</p>
                    </div>
                    <div className="divide-y divide-[#0a0a0a]">
                        {REGIONS.sort((a, b) => b.users - a.users).map((region, i) => (
                            <motion.div
                                key={region.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.03 }}
                                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#03050a] transition-colors group"
                            >
                                <div className="col-span-1 flex items-center">
                                    <span className="font-body text-[9px] text-[#333] tracking-widest">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <div className="col-span-3 flex items-center">
                                    <span
                                        className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                                        style={{ backgroundColor: CONCERN_COLORS[region.concern] || '#3C7795' }}
                                    />
                                    <span className="font-body text-sm text-white group-hover:text-[#8AAEC0] transition-colors">
                                        {region.name}
                                    </span>
                                </div>
                                <div className="col-span-4 flex items-center">
                                    <span className="font-body text-[10px] text-[#3C7795] tracking-widest">
                                        {region.concern}
                                    </span>
                                </div>
                                <div className="col-span-2 flex items-center justify-end">
                                    <span className="font-body text-[10px] text-[#8AAEC0]">
                                        {region.users.toLocaleString()}
                                    </span>
                                </div>
                                <div className="col-span-2 flex items-center">
                                    <div className="w-full bg-[#0a0a0a] h-[2px] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#1E5672] to-[#8AAEC0]"
                                            style={{ width: `${(region.users / REGIONS[0].users) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
