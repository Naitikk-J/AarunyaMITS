import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TVFrame from "./TVFrame";
import InsertCoin from "./InsertCoin";
import PixelButton from "./PixelButton";
import { PixelStar, PixelHeart, PixelMusicNote, PixelGhost, PixelController } from "./PixelDecorations";
import InteractiveTVControls from "./InteractiveTVControls";

const AarunyaLogo = "/aarunya-logo.svg";
const retroRoomBg = "/retro-room-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tvRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const screenContentRef = useRef<HTMLDivElement>(null);
  const [isPowered, setIsPowered] = useState(true);

  useEffect(() => {
    if (!sectionRef.current || !tvRef.current || !contentRef.current || !roomRef.current || !screenContentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=60%",
        scrub: 1,
        pin: true,
      },
    });

    // Clean, direct zoom into TV screen starting immediately
    tl.to(tvRef.current, {
      scale: 6,
      z: 500,
      duration: 1,
      ease: "power1.in",
    })
    .to(screenContentRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    }, 0)
    .to(roomRef.current, {
      opacity: 0,
      scale: 1.2,
      duration: 0.5,
    }, 0.1)
    .to(contentRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      pointerEvents: "auto",
    }, 0.6);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      style={{ perspective: '1000px' }}
    >
      {/* Background room with generated image */}
      <div 
        ref={roomRef}
        className="absolute inset-0"
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
      <div ref={tvRef} className="relative z-10 w-[90vw] max-w-2xl overflow-visible" style={{ transformOrigin: 'center' }}>
        <TVFrame>
          {/* Initial Insert Coin screen */}
          <div
            ref={screenContentRef}
            className={`w-full h-full flex flex-col items-center justify-center p-8 transition-opacity duration-300 ${isPowered ? 'opacity-100' : 'opacity-0'}`}
            style={{
              background: 'radial-gradient(ellipse at center, hsl(var(--crt-black)) 0%, hsl(0 0% 0%) 100%)',
            }}
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
        </TVFrame>

        {/* Interactive Controls */}
        <InteractiveTVControls 
          screenRef={screenContentRef} 
          onPowerToggle={setIsPowered}
        />
      </div>

      {/* Content revealed after zoom */}
      <div 
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 scale-90 pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <div className="text-center px-4">
          <h1 
            className="font-pixel text-3xl md:text-5xl lg:text-6xl text-electric-yellow mb-6 glitch glow-yellow" 
            data-text="AARUNYA 2026"
          >
            AARUNYA 2026
          </h1>
          <p className="font-pixel text-sm md:text-lg text-foreground mb-2 tracking-wider">
            THE FIRST RAYS OF A NEW DAWN
          </p>
          <p className="text-muted-foreground text-base mb-8">
            MITS Gwalior's Annual Cultural Festival
          </p>
          <PixelButton variant="primary" size="lg">
            ENTER THE GAME
          </PixelButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
        <span className="font-pixel text-[8px] text-muted-foreground tracking-widest">SCROLL</span>
        <div className="w-6 h-10 border-4 border-electric-yellow p-1" style={{ imageRendering: 'pixelated' }}>
          <div className="w-2 h-2 bg-electric-yellow mx-auto animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
