import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Team DYT - Hidden Credits Page (Easter Egg)
 * 
 * "Dongdaemun Yupgi Tteokbokki" 
 * A serious code name for a legendary team.
 * 
 * DESIGN:
 * - Pure Black Background with glassmorphism cards
 * - High-end typography with Helvetica
 * - Minimal, elegant layout
 */

const TEAM_MEMBERS = [
    {
        name: "주현호",
        role: "PM · 프로덕트 디자이너",
        tasks: [
            "프로젝트 일정 수립 및 총괄 관리",
            "UX 전략 수립 및 정보 구조(IA) 설계",
            "UI 시스템 아키텍처 및 GUI 총괄 디렉션",
            "BX 가이드라인 수립",
            "풀스택 구현 (Antigravity 기반)",
            "3D 에셋 통합 및 배포 (Vercel)"
        ]
    },
    {
        name: "임지우",
        role: "플래너 · BX 디자이너",
        tasks: [
            "브랜드 네이밍, 세계관 및 페르소나 기획",
            "사용자 진단 알고리즘 설계",
            "웹 카피라이팅 및 스토리보드 기획",
            "BX 가이드라인 수립"
        ]
    },
    {
        name: "김지연",
        role: "아트 디렉터 · 3D 모션 디자이너",
        tasks: [
            "컬러 및 디자인 톤앤매너 정의",
            "메인 히어로 오브젝트 모델링 및 텍스처링",
            "시네마틱 3D 모션 그래픽 (인트로)"
        ]
    },
    {
        name: "윤현아",
        role: "3D 모델러 · 테크니컬 디자이너",
        tasks: [
            "데이터 기반 3D 모핑 로직 (셰이더)",
            "3D 모델 웹 최적화 연구·개발",
            "결과 그래프 및 서브 오브젝트 디자인",
            "제품 용기 모델링"
        ]
    },
    {
        name: "여동규",
        role: "3D 모델러 · 패키지 디자이너",
        tasks: [
            "인터랙티브 공간 디자인 및 모델링",
            "제품 패키지 모델링",
            "피부 타입별 텍스처 변형 디자인",
            "에셋 최적화"
        ]
    }
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

function MemberCard({ member, index }) {
    return (
        <motion.div
            variants={cardVariants}
            className="h-full"
        >
            <div className="h-full overflow-hidden bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15),0_8px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-300 hover:from-white/[0.12] hover:to-white/[0.02] hover:border-white/[0.15] group">
                {/* Number Badge */}
                <span className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] text-[#3C7795] bg-[#3C7795]/10 rounded-full uppercase">
                    {String(index + 1).padStart(2, '0')}
                </span>

                {/* Name */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#8AAEC0] transition-colors">
                    {member.name}
                </h3>

                {/* Role */}
                <p className="text-sm font-bold text-[#3C7795] uppercase tracking-wider mb-6">
                    {member.role}
                </p>

                {/* Divider */}
                <div className="w-12 h-px bg-[#8AAEC0]/20 mb-6" />

                {/* Tasks */}
                <ul className="space-y-2">
                    {member.tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="mt-2 w-1 h-1 bg-[#3C7795] rounded-full flex-shrink-0" />
                            <span className="text-sm text-[#8AAEC0]/70 leading-relaxed">
                                {task}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

export default function TeamPage() {
    return (
        <main className="min-h-screen bg-black pt-24 md:pt-32 pb-20">
            {/* Background Glow */}
            <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#3C7795]/5 rounded-full blur-[200px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    {/* Easter Egg Label */}
                    <p className="font-body text-[10px] font-bold tracking-[0.3em] text-[#3C7795] uppercase mb-6">
                        비밀 크레딧
                    </p>

                    {/* Team Name */}
                    <h1 className="font-title-en text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                        Team DYT
                    </h1>

                    {/* Full Name */}
                    <p className="font-body text-base md:text-lg text-[#8AAEC0]/40 italic mb-8">
                        "동대문 엽기 떡볶이"
                    </p>

                    {/* Tagline */}
                    <p className="font-body text-base text-[#8AAEC0] max-w-xl mx-auto leading-relaxed">
                        AXIOM을 설계한 사람들. 데이터와 열정으로 빚어낸 고정밀 뷰티 테크의 이면.
                    </p>
                </motion.div>

                {/* Team Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {TEAM_MEMBERS.map((member, index) => (
                        <MemberCard key={member.name} member={member} index={index} />
                    ))}
                </motion.div>

                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-20 text-center"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 font-body text-sm text-[#8AAEC0]/40 hover:text-[#8AAEC0] transition-colors duration-300"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        AXIOM으로 돌아가기
                    </Link>
                </motion.div>

                {/* Footer Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mt-16 text-center font-body text-xs text-[#8AAEC0]/30"
                >
                    당신이 우리를 찾아냈습니다. 이제 당신의 축을 정의하십시오.
                </motion.p>
            </div>
        </main>
    );
}
