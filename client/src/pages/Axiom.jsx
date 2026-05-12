import { Suspense } from 'react';
import AboutHero from '../components/about/AboutHero';
import Philosophy from '../components/about/Philosophy';
import Voices from '../components/about/Voices';
import Approach from '../components/about/Approach';
import Features from '../components/about/Features';
import AboutCTA from '../components/about/AboutCTA';
import DNAHelix from '../components/three/DNAHelix';

export default function Axiom() {
    return (
        <main className="bg-void-deepest min-h-screen">
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

            <Voices />
            <Approach />
            <Features />
            <AboutCTA />
        </main>
    );
}
