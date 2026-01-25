import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { TVZoom } from '@/components/TVZoom';
import { TVIntro } from '@/components/TVIntro';
import { WelcomeSection } from '@/components/WelcomeSection';
import { PacmanTimeline } from '@/components/PacManTimeline';
import { CRTOverlay } from '@/components/CRTOverlay';
import Footer from '@/components/Footer';

const Index = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div
            ref={mainRef}
            className="relative w-full overflow-x-hidden bg-[#0D001A]"
        >
            {/* Main Background with Fixed Effect Fix for Mobile */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/retro-room-bg.jpg')] bg-cover bg-center" />
            
            <div className="relative z-10">
                <MainNavigation />
                <CRTOverlay />

                <main>
                    {/* Section 1: The Infinite TV Zoom (Hero) */}
                    <TVZoom>
                        <TVIntro />
                    </TVZoom>

                    {/* Section 2: Welcome to Aarunya (Standalone Section revealed after TV goes up) */}
                    <WelcomeSection />

                    {/* Section 3: The Pac-Man Timeline (Gamified Scroll) */}
                    <PacmanTimeline />

                    {/* Additional sections can be added here if needed */}
                </main>

                <Footer />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .glitch {
                    position: relative;
                }
                .glitch::before,
                .glitch::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                .glitch::before {
                    left: 2px;
                    text-shadow: -2px 0 #ff00c1;
                    clip: rect(44px, 450px, 56px, 0);
                    animation: glitch-anim 5s infinite linear alternate-reverse;
                }
                .glitch::after {
                    left: -2px;
                    text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
                    animation: glitch-anim2 1s infinite linear alternate-reverse;
                }
                @keyframes glitch-anim {
                    0% { clip: rect(31px, 9999px, 94px, 0); transform: skew(0.85deg); }
                    5% { clip: rect(70px, 9999px, 71px, 0); transform: skew(0.85deg); }
                    /* ... more steps if needed ... */
                    100% { clip: rect(67px, 9999px, 62px, 0); transform: skew(0.1deg); }
                }
                @keyframes glitch-anim2 {
                    0% { clip: rect(65px, 9999px, 100px, 0); transform: skew(0.15deg); }
                    100% { clip: rect(10px, 9999px, 20px, 0); transform: skew(0.15deg); }
                }
            `}} />
        </div>
    );
};

export default Index;
