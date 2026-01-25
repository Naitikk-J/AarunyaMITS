import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MainNavigation } from '@/components/ui/MainNavigation';

// ... inside useEffect
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

        // Sync ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        const updateLenis = (time: number) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateLenis);

        gsap.ticker.lagSmoothing(0);

        return () => {
          lenis.destroy();
          gsap.ticker.remove(updateLenis);
        };
    }, []);

    return (
        <div 
            ref={mainRef} 
            className="relative w-full overflow-x-hidden bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/retro-room-bg.jpg')] bg-fixed bg-cover bg-center"
        >
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
                  <Footer />
              </main>

              <style dangerouslySetInnerHTML={{ __html: `
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
