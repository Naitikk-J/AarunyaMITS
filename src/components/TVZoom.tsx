import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TVZoomProps {
  children?: React.ReactNode;
}

export const TVZoom: React.FC<TVZoomProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scale from 1 to 50
  const scale = useTransform(scrollYProgress, [0, 0.9, 1], [1, 50, 50]);
  
  // Opacity of the content inside the TV screen
  // Fades in as we zoom in (starts at scale ~20 which is around scroll 0.4)
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  
  // Opacity of the TV itself (to fade out eventually or just stay scaled)
  const tvOpacity = useTransform(scrollYProgress, [0.85, 0.95], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale, opacity: tvOpacity }}
          className="relative w-[80vw] max-w-[800px] aspect-video flex items-center justify-center"
        >
          {/* Retro TV Frame (SVG or Placeholder) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
             <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_30px_rgba(188,19,254,0.3)]">
                <rect x="20" y="20" width="760" height="500" rx="40" fill="#2A1045" stroke="#BC13FE" strokeWidth="12" />
                <rect x="60" y="60" width="600" height="420" rx="10" fill="#0D001A" stroke="#BC13FE" strokeWidth="4" />
                {/* TV Knobs */}
                <circle cx="720" cy="100" r="30" fill="#BC13FE" />
                <circle cx="720" cy="180" r="30" fill="#BC13FE" />
                <rect x="690" y="240" width="60" height="120" rx="10" fill="#39FF14" opacity="0.3" />
                {/* TV Stand */}
                <path d="M300 520 L250 580 M500 520 L550 580" stroke="#BC13FE" strokeWidth="12" strokeLinecap="round" />
                {/* Antenna */}
                <path d="M400 20 L300 -50 M400 20 L500 -50" stroke="#BC13FE" strokeWidth="8" strokeLinecap="round" />
             </svg>
          </div>

          {/* TV Screen Content Area */}
          <div className="absolute inset-0 flex items-center justify-center p-[10%]">
            <div className="w-full h-full bg-[#0D001A]/80 overflow-hidden relative">
               {/* This is where the next section's content will appear as we zoom in */}
               <motion.div 
                 style={{ opacity: contentOpacity }}
                 className="absolute inset-0 flex items-center justify-center"
               >
                 <div className="text-center">
                    <h2 className="text-kidcore-green text-2xl md:text-4xl animate-pulse">LOADING...</h2>
                    <p className="text-kidcore-pink mt-4 font-vt323 text-xl">Diving into Aarunya</p>
                 </div>
               </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Actual Section 2 content that stays behind and is revealed by the zoom */}
        <motion.div 
          style={{ opacity: contentOpacity }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
