import { PixelStar, PixelCoin } from "./PixelDecorations";

const WelcomeSection = () => {
  return (
    <section className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden bg-transparent">
      {/* Floating decorations */}
      <PixelStar className="absolute top-20 left-10 w-16 h-16 animate-float" color="electric-yellow" />
      <PixelStar className="absolute top-1/3 right-16 w-12 h-12 animate-float" color="lime-green" style={{ animationDelay: '1s' }} />
      <PixelCoin className="absolute bottom-40 left-20 w-12 h-12 animate-float" style={{ animationDelay: '0.5s' }} />
      <PixelCoin className="absolute bottom-48 right-24 w-10 h-10 animate-float" style={{ animationDelay: '1.5s' }} />
      <PixelStar className="absolute bottom-24 left-1/4 w-10 h-10 animate-float" color="neon-magenta" style={{ animationDelay: '2s' }} />

      {/* Main content - No Card, just themed elements */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <div className="flex flex-col items-center">
          {/* Main heading section with a "Pixel Window" header style */}
          <div className="relative mb-12 text-center group">
            <div className="absolute -inset-4 border-4 border-dashed border-electric-yellow/30 animate-pulse group-hover:border-electric-yellow/60 transition-colors" />
            
            <h2 className="font-pixel text-2xl md:text-4xl text-electric-yellow mb-2 glow-yellow tracking-[0.2em] uppercase">
              LEVEL 01: WELCOME
            </h2>
            <div className="h-1 w-48 bg-electric-yellow mx-auto mb-6 shadow-[0_0_10px_#FFD633]" />
            
            <h1 className="font-pixel text-5xl md:text-8xl lg:text-9xl mb-4 tracking-tighter" 
                style={{
                  color: 'white',
                  textShadow: '8px 8px 0px hsl(var(--neon-magenta)), -4px -4px 0px hsl(var(--electric-yellow))',
                }}>
              AARUNYA 2026
            </h1>

            <div className="flex items-center justify-center gap-4 py-2">
              <div className="h-1 w-12 bg-lime-green" />
              <p className="font-pixel text-lg md:text-3xl text-lime-green tracking-[0.15em] glow-green uppercase">
                THE FIRST RAYS OF A NEW DAWN
              </p>
              <div className="h-1 w-12 bg-lime-green" />
            </div>
          </div>

          {/* Description blocks like "Quest Log" */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 w-full max-w-5xl">
            <div className="p-8 border-4 border-electric-yellow bg-black/60 shadow-[8px_8px_0px_#FFD633] hover:translate-x-1 hover:-translate-y-1 transition-transform">
              <div className="font-pixel text-electric-yellow text-xl mb-4 border-b-2 border-electric-yellow pb-2 inline-block">
                MISSION_BRIEF.TXT
              </div>
              <p className="font-rajdhani text-lg text-white leading-relaxed">
                Step into the electrifying world of AARUNYA 2026, where creativity meets chaos,
                passion ignites stages, and memories are forged in the neon glow of innovation.
              </p>
            </div>
            
            <div className="p-8 border-4 border-neon-magenta bg-black/60 shadow-[8px_8px_0px_#FF66B2] hover:-translate-x-1 hover:-translate-y-1 transition-transform">
              <div className="font-pixel text-neon-magenta text-xl mb-4 border-b-2 border-neon-magenta pb-2 inline-block">
                OBJECTIVES.EXE
              </div>
              <p className="font-rajdhani text-lg text-white leading-relaxed">
                MITS Gwalior's most awaited annual cultural festival is back with a bang.
                Four days of non-stop entertainment, mind-bending competitions, and unforgettable performances.
              </p>
            </div>
          </div>

          {/* Stats/Highlights section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { label: 'DURATION', value: '4 DAYS', color: 'electric-yellow', shadow: '#FFD633' },
              { label: 'CAPACITY', value: '1000+', color: 'lime-green', shadow: '#B0FF57' },
              { label: 'ENERGY', value: '∞ FUN', color: 'neon-magenta', shadow: '#FF66B2' }
            ].map((stat, i) => (
              <div 
                key={i}
                className="group relative p-6 flex flex-col items-center justify-center border-4 border-white bg-black/40 overflow-hidden hover:scale-105 transition-all duration-300"
                style={{ boxShadow: `10px 10px 0px ${stat.shadow}` }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-white group-hover:bg-transparent transition-colors" />
                <span className="font-pixel text-xs text-white/60 mb-2">{stat.label}</span>
                <span 
                  className="font-pixel text-3xl md:text-4xl" 
                  style={{ color: `hsl(var(--${stat.color}))`, filter: `drop-shadow(0 0 5px ${stat.shadow})` }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Prompt */}
          <div className="mt-20 flex flex-col items-center">
             <div className="font-pixel text-electric-yellow text-sm md:text-base tracking-widest animate-pulse flex items-center gap-4">
               <span className="text-2xl">≫</span>
               PRESS [SCROLL] TO CONTINUE
               <span className="text-2xl">≪</span>
             </div>
             <div className="mt-4 flex gap-1">
               {[...Array(5)].map((_, i) => (
                 <div key={i} className="w-2 h-2 bg-electric-yellow animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
               ))}
             </div>
          </div>
        </div>
      </div>

      {/* Grid Floor Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none opacity-20">
        <div className="w-full h-full bg-[linear-gradient(transparent_0%,hsl(var(--electric-yellow))_100%)] [mask-image:radial-gradient(ellipse_at_bottom,black,transparent_70%)]" />
      </div>
    </section>
  );
};

export default WelcomeSection;
