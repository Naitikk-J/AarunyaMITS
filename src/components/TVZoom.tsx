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
    const scale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 50, 50]);
    
    // Opacity of the content inside the TV screen
    const contentOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
    
    // Opacity of the TV itself
    const tvOpacity = useTransform(scrollYProgress, [0.6, 0.75], [1, 0]);
    
    // Y position to make it "go up" at the end
    const tvY = useTransform(scrollYProgress, [0.75, 1], ["0%", "-120%"]);
    
    // Enable pointer events only when content is visible
    const pointerEvents = useTransform(scrollYProgress, [0.5, 0.51], ["none", "auto"] as any);

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale, opacity: tvOpacity, y: tvY }}
          className="relative w-[90vw] max-w-[1000px] z-10"
        >
          <TVFrame className="w-full">
            {/* Inner screen content */}
            <motion.div 
              style={{ opacity: contentOpacity }}
              className="absolute inset-0 flex items-center justify-center bg-black/20"
            >
              <div className="text-center p-4">
                <h2 className="text-kidcore-green text-2xl md:text-4xl animate-pulse font-pixel">LOADING...</h2>
                <p className="text-kidcore-pink mt-4 font-vt323 text-xl">Diving into Aarunya</p>
              </div>
            </motion.div>
          </TVFrame>
        </motion.div>
        
        {/* Actual Section 2 content that stays behind and is revealed by the zoom */}
        <motion.div 
          style={{ 
            opacity: contentOpacity, 
            pointerEvents: pointerEvents as any
          }}
          className="absolute inset-0 z-0"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
