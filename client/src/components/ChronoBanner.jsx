import { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * ChronoBanner — Time-Aware Dynamic Glassmorphism Banner
 *
 * Themes by local time:
 *   Morning  06–11 → Protection / Radiance
 *   Daytime  11–17 → Hydration / Sun-shield
 *   Night    17–06 → Repair / Regeneration
 *
 * Design: Glassmorphism — bg-white/5, backdrop-blur-xl, thin border
 */

const THEMES = {
    morning: {
        period: 'MORNING PROTOCOL',
        label: '06:00 — 11:00',
        headline: 'Protection & Radiance',
        body: '자외선 차단과 광채 강화 성분으로 하루의 피부 방어막을 구축할 시간입니다.',
        tag: 'UV DEFENSE · BRIGHTENING',
        dot: '#F4C06D',
        accent: 'rgba(244,192,109,0.15)',
        border: 'rgba(244,192,109,0.15)',
    },
    daytime: {
        period: 'AFTERNOON PROTOCOL',
        label: '11:00 — 17:00',
        headline: 'Hydration & Sun-Shield',
        body: '피부 수분 장벽을 유지하고 블루라이트·UV 복합 스트레스에 대응할 시간입니다.',
        tag: 'AQUA BARRIER · SPF BOOST',
        dot: '#8AAEC0',
        accent: 'rgba(60,119,149,0.15)',
        border: 'rgba(60,119,149,0.15)',
    },
    night: {
        period: 'NIGHT PROTOCOL',
        label: '17:00 — 06:00',
        headline: 'Repair & Regeneration',
        body: '세포 재생이 가장 활성화되는 시간. 심층 회복 포뮬러로 피부 중심축을 복원합니다.',
        tag: 'CELL RENEWAL · RECOVERY',
        dot: '#3C7795',
        accent: 'rgba(30,86,114,0.2)',
        border: 'rgba(30,86,114,0.2)',
    },
};

function getThemeKey() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 11) return 'morning';
    if (hour >= 11 && hour < 17) return 'daytime';
    return 'night';
}

export default function ChronoBanner({ className = '' }) {
    const theme = useMemo(() => THEMES[getThemeKey()], []);
    const now = useMemo(() => {
        const d = new Date();
        return d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full rounded-2xl overflow-hidden ${className}`}
            style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, ${theme.accent} 100%)`,
                border: `1px solid ${theme.border}`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
            }}
        >
            <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                {/* Left: Period + Headline */}
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
                            style={{ backgroundColor: theme.dot }}
                        />
                        <span className="font-mono text-[9px] tracking-[0.3em] uppercase"
                            style={{ color: theme.dot }}>
                            {theme.period}
                        </span>
                    </div>
                    <div className="w-[1px] h-3 bg-white/10 hidden sm:block" />
                    <div>
                        <span className="font-serif text-white text-sm md:text-base leading-tight">
                            {theme.headline}
                        </span>
                    </div>
                </div>

                {/* Right: Tag + Time */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase hidden md:block">
                        {theme.tag}
                    </span>
                    <div className="w-[1px] h-3 bg-white/10 hidden md:block" />
                    <span className="font-mono text-[10px] text-white/40 tracking-widest">
                        {now}
                    </span>
                </div>
            </div>

            {/* Hover-reveal: full body text */}
            <div className="px-6 pb-4">
                <p className="font-sans text-[11px] text-white/35 leading-relaxed max-w-xl">
                    {theme.body}
                </p>
            </div>
        </motion.div>
    );
}
