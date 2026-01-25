import { ReactNode } from "react";

interface TVFrameProps {
  children: ReactNode;
  className?: string;
}

const TVFrame = ({ children, className = "" }: TVFrameProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* TV Body */}
      <div className="bg-[#1A1A1A] border-[12px] border-[#0A0A0A] rounded-xl shadow-2xl relative overflow-visible">
        {/* Main Screen Container */}
        <div className="flex">
          {/* Screen area */}
          <div className="flex-1 crt-screen aspect-video relative overflow-hidden bg-black rounded-sm m-2">
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

          {/* Integrated Control Panel Space (Right Side) */}
          <div className="w-24 bg-[#111111] border-l-4 border-[#0A0A0A] flex flex-col items-center py-8 gap-8 relative">
            {/* These will be filled by InteractiveTVControls via absolute positioning or we can pass them as props */}
            {/* Small indicator lights at the bottom of panel */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-lime-green animate-pulse shadow-[0_0_5px_rgba(57,255,20,0.8)]" />
              <div className="w-1.5 h-1.5 rounded-full bg-radical-red shadow-[0_0_5px_rgba(255,0,153,0.8)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Stand/Bottom Decoration */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-[#0A0A0A] rounded-b-xl" />
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-1/2 h-8 border-x-[20px] border-b-[8px] border-[#0A0A0A] opacity-80" />
    </div>
  );
};

export default TVFrame;
