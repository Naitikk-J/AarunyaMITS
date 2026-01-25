import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TVFrame from './TVFrame';

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
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  
  // Opacity of the TV itself
  const tvOpacity = useTransform(scrollYProgress, [0.85, 0.95], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale, opacity: tvOpacity }}
          className="relative w-[90vw] max-w-[1000px] z-10"
        >
          <TVFrame className="w-full">
            {/* TV Screen Content Area */}
            <div className="w-full h-full bg-[#0D001A] overflow-hidden relative">
               {/* Grid background inside TV */}
               <div className="absolute inset-0 opacity-20" 
                    style={{ backgroundImage: 'linear-gradient(#BC13FE 1px, transparent 1px), linear-gradient(90deg, #BC13FE 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
               />
               
               {/* Collage Elements (from reference image) */}
               <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                  {/* GG Sticker */}
                  <motion.div 
                    initial={{ x: -20, y: 100, opacity: 0, rotate: -15 }}
                    animate={{ x: 40, y: 160, opacity: 1 }}
                    className="absolute p-2 bg-white border-4 border-black font-press-start text-black text-[10px] md:text-xs"
                  >
                    GG
                  </motion.div>

                  {/* FESTIVAL Block */}
                  <motion.div 
                    initial={{ x: 200, y: -50, opacity: 0 }}
                    animate={{ x: 180, y: 120, opacity: 1 }}
                    className="absolute p-2 bg-kidcore-green border-4 border-black font-press-start text-black text-[8px] md:text-[10px] uppercase"
                  >
                    FESTIVAL
                  </motion.div>

                  {/* PEACE Heart */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-kidcore-pink border-4 border-black rounded-full"
                  >
                    <span className="text-white text-xs md:text-sm font-press-start">PEACE</span>
                  </motion.div>

                  {/* Abstract Shapes */}
                  <div className="absolute top-10 left-1/4 w-4 h-4 bg-kidcore-yellow border-2 border-black rotate-45" />
                  <div className="absolute bottom-1/4 left-10 w-6 h-6 bg-kidcore-grape border-2 border-black rounded-sm" />
               </div>

               {/* This is where the next section's content will appear as we zoom in */}
               <motion.div 
                 style={{ opacity: contentOpacity }}
                 className="absolute inset-0 flex items-center justify-center"
               >
                 <div className="text-center p-4">
                    <h2 className="text-kidcore-green text-2xl md:text-4xl animate-pulse font-pixel">LOADING...</h2>
                    <p className="text-kidcore-pink mt-4 font-vt323 text-xl">Diving into Aarunya</p>
                 </div>
               </motion.div>
            </div>
          </TVFrame>
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
