import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { TVZoom } from '@/components/TVZoom';
import { TVIntro } from '@/components/TVIntro';
import { WelcomeSection } from '@/components/WelcomeSection';

import { PacmanTimeline } from '@/components/PacManTimeline';
import { CRTOverlay } from '@/components/CRTOverlay';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
            window.innerWidth <= 768;

        const lenis = new Lenis({
            duration: isMobile ? 2.0 : 1.2, // Slower on mobile for better smoothness
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: isMobile ? 0.4 : 1, // Further reduced wheel sensitivity on mobile
            touchMultiplier: isMobile ? 0.8 : 2, // Significantly reduced touch sensitivity on mobile
            infinite: false,
            syncTouch: true,
            lerp: isMobile ? 0.1 : 0.05, // More smoothing on mobile
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div
            ref={mainRef}
            className="relative w-full overflow-x-hidden min-h-screen"
        >
            {/* Background Image - Scrolls with content */}
            <div
                className="absolute top-0 left-0 w-full min-h-full bg-black z-0"
                style={{
                    backgroundImage: 'url(/retro-room-bg.avif)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            <div className="relative z-10">
                <MainNavigation />
                <CRTOverlay />

                <main>
                    {/* Section 1: The Infinite TV Zoom (Hero) */}


                    <TVZoom>

                        <TVIntro />

                    </TVZoom>

                    {/* Section 2: Welcome to Aarunya (Zoom effect as you scroll) */}
                    <WelcomeSection />



                    {/* Section 4: The Pac-Man Timeline (Appears after WelcomeSection zoom) */}
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
