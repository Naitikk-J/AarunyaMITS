import { PixelStar, PixelCoin } from "./PixelDecorations";

const WelcomeSection = () => {
  return (
    <section className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden bg-transparent">
      {/* Floating decorations */}
      <PixelStar className="absolute top-10 left-8 w-12 h-12 animate-float" color="electric-yellow" />
      <PixelStar className="absolute top-1/4 right-12 w-10 h-10 animate-float" color="lime-green" />
      <PixelCoin className="absolute bottom-32 left-16 w-10 h-10 animate-float" />
      <PixelCoin className="absolute bottom-40 right-20 w-8 h-8 animate-float" />
      <PixelStar className="absolute bottom-20 left-1/3 w-8 h-8 animate-float" color="neon-magenta" />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Welcome card */}
        <div className="glass-card p-8 md:p-12 text-center">
          {/* Main heading */}
          <h2 className="font-pixel text-3xl md:text-5xl lg:text-6xl text-electric-yellow mb-6 glow-yellow tracking-wider">
            WELCOME TO
          </h2>
          <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl mb-8 tracking-widest" 
              style={{
                background: 'linear-gradient(135deg, hsl(var(--electric-yellow)), hsl(var(--lime-green)), hsl(var(--neon-magenta)))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(176, 255, 87, 0.5)',
              }}>
            AARUNYA 2026
          </h1>

          {/* Tagline */}
          <p className="font-pixel text-lg md:text-2xl text-electric-yellow mb-8 tracking-wide">
            THE FIRST RAYS OF A NEW DAWN
          </p>

          {/* Description */}
          <div className="space-y-4 mb-8">
            <p className="text-foreground text-sm md:text-base leading-relaxed">
              Step into the electrifying world of AARUNYA 2026, where creativity meets chaos,
              passion ignites stages, and memories are forged in the neon glow of innovation.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              MITS Gwalior's most awaited annual cultural festival is back with a bang.
              Four days of non-stop entertainment, mind-bending competitions, and unforgettable performances.
            </p>
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="h-1 flex-1" style={{
              background: 'linear-gradient(to right, transparent, hsl(var(--electric-yellow)), transparent)'
            }}></div>
            <div className="font-pixel text-electric-yellow text-sm">★ ★ ★</div>
            <div className="h-1 flex-1" style={{
              background: 'linear-gradient(to right, transparent, hsl(var(--electric-yellow)), transparent)'
            }}></div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 border-4 border-electric-yellow/50 bg-radical-red/10 hover:bg-radical-red/20 transition-all duration-300">
              <div className="font-pixel text-electric-yellow text-lg mb-2">4 DAYS</div>
              <p className="text-foreground text-sm">Non-stop entertainment and performances</p>
            </div>
            <div className="p-6 border-4 border-lime-green/50 bg-lime-green/10 hover:bg-lime-green/20 transition-all duration-300">
              <div className="font-pixel text-lime-green text-lg mb-2">1000+</div>
              <p className="text-foreground text-sm">Participants from across the nation</p>
            </div>
            <div className="p-6 border-4 border-neon-magenta/50 bg-neon-magenta/10 hover:bg-neon-magenta/20 transition-all duration-300">
              <div className="font-pixel text-neon-magenta text-lg mb-2">∞ FUN</div>
              <p className="text-foreground text-sm">Unforgettable memories await</p>
            </div>
          </div>

          {/* CTA Text */}
          <p className="font-pixel text-electric-yellow text-sm md:text-base mt-12 tracking-wider animate-pulse">
            ↓ SCROLL TO EXPLORE THE TIMELINE ↓
          </p>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
           style={{
             background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3))'
           }}></div>
    </section>
  );
};

export default WelcomeSection;
