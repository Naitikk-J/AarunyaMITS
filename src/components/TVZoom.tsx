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
          className="relative w-screen h-screen flex items-center justify-center"
        >
          {/* Retro TV Frame (SVG or Placeholder) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
             <svg viewBox="0 0 800 600" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_50px_rgba(188,19,254,0.4)]">
                {/* Frame border with glass effect */}
                <rect x="0" y="0" width="800" height="600" fill="rgba(42, 16, 69, 0.4)" backdrop-filter="blur(4px)" />
                <rect x="10" y="10" width="780" height="580" rx="20" stroke="#BC13FE" strokeWidth="15" />
                <rect x="40" y="40" width="620" height="520" rx="10" fill="rgba(13, 0, 26, 0.3)" stroke="#BC13FE" strokeWidth="4" />
                {/* TV Knobs */}
                <circle cx="720" cy="100" r="35" fill="#BC13FE" fillOpacity="0.8" />
                <circle cx="720" cy="200" r="35" fill="#BC13FE" fillOpacity="0.8" />
                <rect x="690" y="280" width="60" height="200" rx="10" fill="#39FF14" opacity="0.2" />
             </svg>
          </div>

          {/* TV Screen Content Area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[77%] h-[86%] mr-[18%] mb-[2%] overflow-hidden relative">
               {/* Grid background inside TV */}
               <div className="absolute inset-0 opacity-10" 
                    style={{ backgroundImage: 'linear-gradient(#BC13FE 1px, transparent 1px), linear-gradient(90deg, #BC13FE 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
               />
               
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
