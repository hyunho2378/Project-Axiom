import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/**
 * Algorithm Page (/algorithm) - "AURA Lab"
 * 
 * Visualizing the tech: Data → Analysis → Sculpting
 */
export default function Algorithm() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <ParticleField />

                <motion.div
                    className="relative z-10 text-center px-6"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <p className="text-xs uppercase tracking-[0.4em] text-[#3C7795]/80 mb-6">
                        The Algorithm
                    </p>
                    <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.95]">
                        From Data
                        <br />
                        <span className="italic text-white/70">to Matter</span>
                    </h1>
                    <p className="mt-8 text-lg text-white/50 max-w-lg mx-auto">
                        How AURA transforms your unique skin data into personalized beauty solutions.
                    </p>
                </motion.div>

                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">Explore</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
                    </div>
                </motion.div>
            </section>

            {/* 3-Step Process */}
            <ProcessSteps />

            {/* Technical Stats */}
            <TechStats />
        </div>
    );
}

/**
 * Particle Field Component
 */
function ParticleField() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Create particles
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                hue: Math.random() * 30 + 185 // Teal to cyan range (AXIOM brand)
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.opacity})`;
                ctx.fill();

                // Draw connections
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(60, 119, 149, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 opacity-60"
        />
    );
}

/**
 * Process Steps with Motion Graphics
 */
function ProcessSteps() {
    const steps = [
        {
            number: "01",
            title: "Sensing",
            subtitle: "Data Capture",
            description: "Our AI scans millions of data points from your skin—texture, tone, moisture levels, and more.",
            color: "from-[#1E5672] to-[#3C7795]",
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="24" cy="24" r="2" fill="currentColor" />
                </svg>
            )
        },
        {
            number: "02",
            title: "Analyzing",
            subtitle: "Pattern Recognition",
            description: "Advanced neural networks decode your unique skin signature, identifying patterns invisible to the human eye.",
            color: "from-[#3C7795] to-[#8AAEC0]",
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                    <path d="M8 24h8l4-8 4 16 4-8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            number: "03",
            title: "Sculpting",
            subtitle: "Formula Creation",
            description: "Your data crystallizes into a personalized formula—ingredients precisely calibrated for your skin.",
            color: "from-[#8AAEC0] to-[#3C7795]",
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                    <path d="M24 8v8M24 32v8M8 24h8M32 24h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            )
        }
    ];

    return (
        <section className="py-32 px-6 md:px-12 lg:px-20">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">The Process</p>
                    <h2 className="font-serif text-4xl md:text-5xl font-medium text-white">
                        How It Works
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <StepCard key={step.number} step={step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StepCard({ step, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group"
        >
            <div className="relative p-8 rounded-3xl glass-card h-full">
                {/* Animated gradient border on hover */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${step.color} p-[1px]`}>
                    <div className="w-full h-full rounded-3xl bg-[#0a0f1a]" />
                </div>

                <div className="relative z-10">
                    {/* Number */}
                    <span className="text-sm text-white/30 font-medium">{step.number}</span>

                    {/* Icon with animation */}
                    <motion.div
                        className="my-8 text-white/60"
                        animate={isInView ? { opacity: [0.3, 1, 0.3] } : {}}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    >
                        {step.icon}
                    </motion.div>

                    {/* Content */}
                    <h3 className="font-serif text-2xl text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-[#8AAEC0]/80 mb-4">{step.subtitle}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>
            </div>
        </motion.div>
    );
}

/**
 * Tech Stats Section
 */
function TechStats() {
    const stats = [
        { value: "2.4M", label: "Data Points Analyzed Daily" },
        { value: "99.7%", label: "Accuracy Rate" },
        { value: "<50ms", label: "Analysis Time" },
        { value: "6", label: "Unique Aura Types" }
    ];

    return (
        <section className="py-32 px-6 md:px-12 lg:px-20 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-3">
                                {stat.value}
                            </div>
                            <p className="text-sm text-white/40">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
