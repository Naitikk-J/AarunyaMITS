import { ReactNode } from "react";

interface TVFrameProps {
  children: ReactNode;
  className?: string;
}

const TVFrame = ({ children, className = "" }: TVFrameProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* TV Body */}
      <div className="crt-frame">
        {/* Control knobs */}
        <div className="absolute -right-2 top-1/4 flex flex-col gap-4">
          <div className="w-6 h-6 rounded-full bg-crt-black border-2 border-electric-yellow shadow-glow-yellow" />
          <div className="w-6 h-6 rounded-full bg-crt-black border-2 border-lime-green shadow-glow-green" />
        </div>

        {/* VU Meters decoration */}
        <div className="absolute -left-3 top-8 w-8 h-20 bg-cyber-blue/20 border-2 border-cyber-blue rounded-sm overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-cyber-blue to-transparent animate-pulse" />
        </div>

        {/* Screen area */}
        <div className="crt-screen aspect-video relative overflow-hidden">
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50 pointer-events-none z-10" />
          
          {/* Content */}
          <div className="relative z-0 w-full h-full flex items-center justify-center">
            {children}
          </div>

          {/* Corner vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)'
          }} />
        </div>

        {/* TV Label */}
        <div className="mt-3 flex items-center justify-between px-2">
          <div className="font-pixel text-[8px] text-crt-black">AARUNYA TV</div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-lime-green animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-radical-red" />
          </div>
        </div>
      </div>

      {/* Speaker grille decoration */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1/2 h-6 bg-hot-pink rounded-full opacity-50" 
           style={{
             background: 'repeating-linear-gradient(90deg, hsl(var(--hot-pink)), hsl(var(--hot-pink)) 2px, transparent 2px, transparent 6px)'
           }} />
    </div>
  );
};

export default TVFrame;
