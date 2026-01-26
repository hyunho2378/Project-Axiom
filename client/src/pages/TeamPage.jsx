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
        name: "Hyunho Ju",
        role: "PM & Product Designer",
        tasks: [
            "Project Scheduling & Management",
            "UX Strategy & IA Design",
            "UI System Architecture & GUI Direction",
            "BX Guideline Formulation",
            "Full-Stack Implementation (Antigravity based)",
            "3D Asset Integration & Deployment (Vercel)"
        ]
    },
    {
        name: "Jiwoo Lim",
        role: "Planner & BX Designer",
        tasks: [
            "Brand Naming, Worldview & Persona",
            "User Diagnosis Algorithm Design",
            "Web Copywriting & Storyboard Planning",
            "BX Guideline Formulation"
        ]
    },
    {
        name: "Jiyeon Kim",
        role: "Art Director & 3D Motion Designer",
        tasks: [
            "Color & Design Tone-and-Manner",
            "Main Hero Object Modeling & Texturing",
            "Cinematic 3D Motion Graphics (Intro)"
        ]
    },
    {
        name: "Hyuna Yoon",
        role: "3D Modeler & Technical Designer",
        tasks: [
            "Data-Driven 3D Morphing Logic (Shader)",
            "Web-Optimization R&D for 3D Models",
            "Result Graphs & Sub-Object Design",
            "Product Container Modeling"
        ]
    },
    {
        name: "Donggyu Yeo",
        role: "3D Modeler & Package Designer",
        tasks: [
            "Interactive Space Design & Modeling",
            "Product Package Modeling",
            "Texture Variations by Skin Type",
            "Asset Optimization"
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

            <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    {/* Easter Egg Label */}
                    <p className="text-sm font-bold tracking-[0.3em] text-[#3C7795] uppercase mb-6">
                        Secret Credits
                    </p>

                    {/* Team Name */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                        Team DYT
                    </h1>

                    {/* Full Name (Treated Elegantly) */}
                    <p className="text-lg md:text-xl text-[#8AAEC0]/50 italic mb-8">
                        "Dongdaemun Yupgi Tteokbokki"
                    </p>

                    {/* Tagline */}
                    <p className="text-lg text-[#8AAEC0] max-w-xl mx-auto leading-relaxed">
                        The minds behind AXIOM. Data-driven beauty, designed with precision and passion.
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
                        className="inline-flex items-center gap-2 text-sm text-[#8AAEC0]/40 hover:text-[#8AAEC0] transition-colors duration-300"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Return to AXIOM
                    </Link>
                </motion.div>

                {/* Footer Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mt-16 text-center text-xs text-[#8AAEC0]/30"
                >
                    You found us. Now go define your axis.
                </motion.p>
            </div>
        </main>
    );
}
