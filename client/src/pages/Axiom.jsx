import { Suspense, useRef, useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import AboutHero from '../components/about/AboutHero';
import Philosophy from '../components/about/Philosophy';
import Approach from '../components/about/Approach';
import Features from '../components/about/Features';
import DNAHelix from '../components/three/DNAHelix';

export default function Axiom() {
    const mainRef = useRef();
    const cursorX = useMotionValue(-1000);
    const cursorY = useMotionValue(-1000);
    const prefersReduced = useReducedMotion();

    useEffect(() => {
        if (prefersReduced) return;
        const handle = (e) => {
            if (!mainRef.current) return;
            const bottom = mainRef.current.getBoundingClientRect().bottom;
            if (e.clientY <= bottom) {
                cursorX.set(e.clientX);
                cursorY.set(e.clientY);
            } else {
                cursorX.set(-1000);
                cursorY.set(-1000);
            }
        };
        window.addEventListener('mousemove', handle);
        return () => window.removeEventListener('mousemove', handle);
    }, [prefersReduced]);

    return (
        <main ref={mainRef} className="bg-void-deepest min-h-screen">
            {!prefersReduced && (
                <motion.div
                    className="pointer-events-none fixed rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{
                        left: cursorX,
                        top: cursorY,
                        width: 600,
                        height: 600,
                        background: 'radial-gradient(circle, rgba(90,154,181,0.18) 0%, rgba(0,212,255,0.08) 35%, transparent 70%)',
                        filter: 'blur(60px)',
                        zIndex: 20,
                    }}
                />
            )}

            <AboutHero />

            {/* Philosophy — DNAHelix as absolute background, z-0 / text z-10 */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                    <Suspense fallback={null}>
                        <DNAHelix />
                    </Suspense>
                </div>
                <div className="relative z-10">
                    <Philosophy />
                </div>
            </div>

            <Approach />
            <Features />
        </main>
    );
}
