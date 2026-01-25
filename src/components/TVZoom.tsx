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
    const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    
    // Opacity of the TV itself
    const tvOpacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);
    
    // Y position to make it "go up" at the end
    const tvY = useTransform(scrollYProgress, [0.8, 1], ["0%", "-120%"]);
    
    // Enable pointer events only when content is visible
    const pointerEvents = useTransform(scrollYProgress, [0.5, 0.51], ["none", "auto"] as any);

    return (
      <div ref={containerRef} className="relative h-[200vh] w-full">
        <div className="sticky top-0 h-[100vh] w-full flex items-center justify-center overflow-hidden">
          <motion.div 
            style={{ 
              scale, 
              opacity: tvOpacity, 
              y: tvY,
              transformOrigin: "40% 50%" 
            }}
            className="relative w-[92vw] md:w-[70vw] max-w-[850px] z-10"
          >
            <TVFrame className="w-full">
              <motion.div 
                style={{ opacity: contentOpacity }}
                className="absolute inset-0"
              >
                {children}
              </motion.div>
            </TVFrame>
          </motion.div>
        </div>
      </div>
    );

};
