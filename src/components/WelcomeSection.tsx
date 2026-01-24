import { useEffect, useRef } from "react";
import { PixelStar, PixelCoin } from "./PixelDecorations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WelcomeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      // Animate children on scroll
      const items = contentRef.current?.querySelectorAll('.scroll-item');
      if (items) {
        items.forEach((item) => {
          gsap.fromTo(item, 
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden bg-transparent">
      {/* Floating decorations */}
      <PixelStar className="absolute top-20 left-10 w-16 h-16 animate-float" color="primary" />
      <PixelStar className="absolute top-1/3 right-16 w-12 h-12 animate-float" color="accent" style={{ animationDelay: '1s' }} />
      <PixelCoin className="absolute bottom-40 left-20 w-12 h-12 animate-float" style={{ animationDelay: '0.5s' }} />
      <PixelCoin className="absolute bottom-48 right-24 w-10 h-10 animate-float" style={{ animationDelay: '1.5s' }} />
      <PixelStar className="absolute bottom-24 left-1/4 w-10 h-10 animate-float" color="secondary" style={{ animationDelay: '2s' }} />

      {/* Main content */}
      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <div className="flex flex-col items-center">
          <div className="scroll-item relative mb-12 text-center group">
            <div className="absolute -inset-4 border-4 border-dashed border-primary/30 animate-pulse group-hover:border-primary/60 transition-colors" />
            
            <h2 className="font-pixel text-2xl md:text-4xl text-primary mb-2 glow-pink tracking-[0.2em] uppercase">
              LEVEL 01: WELCOME
            </h2>
            <div className="h-1 w-48 bg-primary mx-auto mb-6 shadow-neon" />
            
            <h1 className="font-pixel text-5xl md:text-8xl lg:text-9xl mb-4 tracking-tighter" 
                style={{
                  color: 'white',
                  textShadow: '8px 8px 0px hsl(var(--secondary)), -4px -4px 0px hsl(var(--primary))',
                }}>
              AARUNYA 2026
            </h1>

            <div className="flex items-center justify-center gap-4 py-2">
              <div className="h-1 w-12 bg-accent" />
              <p className="font-pixel text-lg md:text-3xl text-accent tracking-[0.15em] glow-blue uppercase">
                THE FIRST RAYS OF A NEW DAWN
              </p>
              <div className="h-1 w-12 bg-accent" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 w-full max-w-5xl">
            <div 
              className="scroll-item p-8 border-4 border-primary bg-black/60 shadow-[8px_8px_0px_hsl(var(--primary))] hover:translate-x-1 hover:-translate-y-1 transition-all"
            >
              <div className="font-pixel text-primary text-xl mb-4 border-b-2 border-primary pb-2 inline-block">
                MISSION_BRIEF.TXT
              </div>
              <p className="font-orbitron text-lg text-white leading-relaxed">
                Step into the electrifying world of AARUNYA 2026, where creativity meets chaos,
                passion ignites stages, and memories are forged in the neon glow of innovation.
              </p>
            </div>
            
            <div 
              className="scroll-item p-8 border-4 border-secondary bg-black/60 shadow-[8px_8px_0px_hsl(var(--secondary))] hover:-translate-x-1 hover:-translate-y-1 transition-all"
            >
              <div className="font-pixel text-secondary text-xl mb-4 border-b-2 border-secondary pb-2 inline-block">
                OBJECTIVES.EXE
              </div>
              <p className="font-orbitron text-lg text-white leading-relaxed">
                MITS Gwalior's most awaited annual cultural festival is back with a bang.
                Four days of non-stop entertainment, mind-bending competitions, and unforgettable performances.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { label: 'DURATION', value: '4 DAYS', color: 'primary', shadow: 'hsl(var(--primary))' },
              { label: 'CAPACITY', value: '1000+', color: 'accent', shadow: 'hsl(var(--accent))' },
              { label: 'ENERGY', value: '∞ FUN', color: 'secondary', shadow: 'hsl(var(--secondary))' }
            ].map((stat, i) => (
              <div 
                key={i}
                className="scroll-item group relative p-6 flex flex-col items-center justify-center border-4 border-white bg-black/40 overflow-hidden hover:scale-105 transition-all duration-300"
                style={{ boxShadow: `10px 10px 0px ${stat.shadow}` }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-white group-hover:bg-transparent transition-colors" />
                <span className="font-pixel text-xs text-white/60 mb-2">{stat.label}</span>
                <span 
                  className="font-pixel text-3xl md:text-4xl" 
                  style={{ color: stat.shadow, filter: `drop-shadow(0 0 5px ${stat.shadow})` }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <div className="scroll-item mt-20 flex flex-col items-center">
             <div className="font-pixel text-primary text-sm md:text-base tracking-widest animate-pulse flex items-center gap-4">
               <span className="text-2xl">≫</span>
               PRESS [SCROLL] TO CONTINUE
               <span className="text-2xl">≪</span>
             </div>
             <div className="mt-4 flex gap-1">
               {[...Array(5)].map((_, i) => (
                 <div key={i} className="w-2 h-2 bg-primary animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
               ))}
             </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none opacity-20">
        <div className="w-full h-full bg-[linear-gradient(transparent_0%,hsl(var(--primary))_100%)] [mask-image:radial-gradient(ellipse_at_bottom,black,transparent_70%)]" />
      </div>
    </section>
  );
};

export default WelcomeSection;
