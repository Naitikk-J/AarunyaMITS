import { ReactNode, useRef } from "react";
import { InteractiveTVControls } from "./InteractiveTVControls";
import { cn } from "@/lib/utils";

interface TVFrameProps {
  children: ReactNode;
  className?: string;
}

const TVFrame = ({ children, className = "" }: TVFrameProps) => {
  const screenRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Antenna System */}
      <div className="antenna mb-[-20px] scale-75 md:scale-100 opacity-80">
        <div className="a1"></div>
        <div className="a1d"></div>
        <div className="a2"></div>
        <div className="a2d"></div>
        <div className="a_base"></div>
      </div>

      {/* TV Body */}
      <div className="tv w-full max-w-[800px] aspect-[4/3] flex-row p-4 md:p-6 shadow-[10px_10px_0_#BC13FE,0_20px_40px_rgba(0,0,0,0.8)] border-[12px] border-[#333]">
        {/* SVG Curve Overlay (Decorative) */}
        <div className="cruve">
          <svg
            viewBox="0 0 189.929 189.929"
            xmlns="http://www.w3.org/2000/svg"
            className="curve_svg"
          >
            <path d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z" />
          </svg>
        </div>

        {/* Main Screen Container */}
        <div className="display_div flex-1 h-full bg-black border-[6px] md:border-[8px] border-[#222] rounded-lg md:rounded-xl overflow-hidden relative">
          <div className="screen_out w-full h-full relative">
            <div className="screen w-full h-full flex items-center justify-center bg-radial-gradient(circle_at_center,_#1a0033_0%,_#000_100%)">
               <div ref={screenRef} className="w-full h-full relative z-0">
                  {children}
               </div>
            </div>
            <div className="screenM pointer-events-none" />
          </div>
        </div>

        {/* Integrated Control Panel Space (Right Side) */}
        <div className="buttons_div w-24 md:w-32 flex flex-col items-center justify-around py-2 relative">
          <InteractiveTVControls screenRef={screenRef} />
          
          {/* Speaker Grill area from Retro design */}
          <div className="speakers mt-2 w-3/4">
            <div className="g1">
              <div className="g11"></div>
              <div className="g12"></div>
              <div className="g13"></div>
            </div>
            <div className="g"></div>
            <div className="g"></div>
          </div>
        </div>
      </div>

      {/* Stand/Bottom Decoration */}
      <div className="bottom scale-75 md:scale-100">
        <div className="base1"></div>
        <div className="base2"></div>
        <div className="base3"></div>
      </div>
    </div>
  );
};

export default TVFrame;

