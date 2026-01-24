import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TVFrame from "./TVFrame";
import InsertCoin from "./InsertCoin";
import { PixelStar, PixelHeart, PixelMusicNote, PixelGhost, PixelController } from "./PixelDecorations";
import InteractiveTVControls from "./InteractiveTVControls";

const AarunyaLogo = "/aarunya-logo.svg";
const retroRoomBg = "/retro-room-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const tvRef = useRef<HTMLDivElement>(null);
    const roomRef = useRef<HTMLDivElement>(null);
    const screenContentRef = useRef<HTMLDivElement>(null);
    const innerScreenRef = useRef<HTMLDivElement>(null);
    const [isPowered, setIsPowered] = useState(true);

    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      const section = sectionRef.current;
      const tv = tvRef.current;
      const room = roomRef.current;
      const innerScreen = innerScreenRef.current;
      const scrollIndicator = scrollIndicatorRef.current;

      if (!section || !tv || !room || !innerScreen || !scrollIndicator) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=500%", // Very long pin to ensure zoom is the only focus
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            pinSpacing: true,
          },
        });

        // Phase 1: Fade out indicators and start zoom
        tl.to(scrollIndicator, {
          opacity: 0,
          duration: 0.1,
        })
        .to(tv, {
          scale: 60, // Deepest zoom to completely pass through the screen
          duration: 1.5,
          ease: "power2.in",
        }, 0)
        .to(room, {
          opacity: 0,
          scale: 1.8,
          duration: 0.7,
          ease: "power1.inOut"
        }, 0.2)
        .to(innerScreen, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        }, 0.8);
      });

      return () => {
        ctx.revert();
      };
    }, []);

    return (
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background"
        style={{ perspective: '1000px' }}
      >
        {/* Background room with generated image */}
        <div 
          ref={roomRef}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${retroRoomBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            imageRendering: 'pixelated',
          }}
        >
          {/* Pixel art floating decorations */}
          <PixelStar className="absolute top-24 left-12 w-10 h-10 animate-float" color="electric-yellow" />
          <PixelHeart className="absolute top-36 right-24 w-8 h-8 animate-float" color="radical-red" />
          <PixelMusicNote className="absolute bottom-44 left-24 w-8 h-10 animate-float" color="neon-magenta" />
          <PixelGhost className="absolute bottom-36 right-20 w-10 h-12 animate-float" color="cyber-blue" />
          <PixelController className="absolute top-1/3 left-8 w-16 h-10 animate-float hidden lg:block" />
          <PixelStar className="absolute top-1/2 right-8 w-6 h-6 animate-float" color="lime-green" />
        </div>

        {/* CRT TV Container */}
        <div ref={tvRef} className="relative z-10 w-[90vw] max-w-2xl overflow-visible" style={{ transformOrigin: 'center center' }}>
          <TVFrame>
            {/* Initial Insert Coin screen */}
            <div
              ref={screenContentRef}
              className={`w-full h-full relative transition-opacity duration-300 ${isPowered ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundImage: 'url(/Loadingscreen.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: 'hsl(var(--crt-black))',
              }}
            >
              {/* Wrapper for content that SHOULD fade */}
              <div 
                ref={innerScreenRef}
                className="w-full h-full flex flex-col items-center justify-center p-8"
              >
                <img
                  src={AarunyaLogo}
                  alt="Aarunya 2026"
                  className="w-48 md:w-64 mb-8 animate-pulse-glow transition-opacity duration-500"
                  style={{
                    filter: "drop-shadow(0 0 20px hsl(var(--neon-magenta)))",
                    imageRendering: 'pixelated',
                  } as React.CSSProperties}
                />
                <div className="transition-opacity duration-500">
                  <InsertCoin />
                </div>
              </div>
            </div>
          </TVFrame>

          {/* Interactive Controls */}
          <InteractiveTVControls 
            screenRef={screenContentRef} 
            onPowerToggle={setIsPowered}
          />
        </div>

        {/* Scroll indicator */}
        <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
          <span className="font-pixel text-[8px] text-muted-foreground tracking-widest">SCROLL</span>
          <div className="w-6 h-10 border-4 border-electric-yellow p-1" style={{ imageRendering: 'pixelated' }}>
            <div className="w-2 h-2 bg-electric-yellow mx-auto animate-bounce" />
          </div>
        </div>
      </section>
    );
  };

export default HeroSection;
