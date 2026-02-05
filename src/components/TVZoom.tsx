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

  // Smooth scale from 1 to 50 over a longer scroll distance with more gradual transitions
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1], [1, 1.5, 3, 6, 15, 35, 50]);

  // Combined opacity for the entire TV element to prevent flickering
  const combinedOpacity = useTransform(scrollYProgress, [0, 0, 1], [1, 1, 0]);

  // Y position to make it "go up" at the end - more gradual
  const tvY = useTransform(scrollYProgress, [0.7, 0.8, 0.9, 1], ["0%", "-20%", "-50%", "-100%"]);

  // Enable pointer events only when content is visible
  const pointerEvents = useTransform(scrollYProgress, [0.5, 0.51], ["none", "auto"] as any);

  return (
    <div ref={containerRef} className="relative h-[150vh] md:h-[200vh] w-full">
      <div className="sticky top-16 md:top-24 h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            scale,
            opacity: combinedOpacity,
            y: tvY,
            transformOrigin: "50% 50%"
          }}
          className="relative w-[92vw] md:w-[70vw] max-w-[850px] z-10"
        >
          <TVFrame className="w-full">
            <motion.div
              style={{ opacity: 1 }}
              className="absolute inset-0"
            >
              {children}
            </motion.div>
          </TVFrame>
        </motion.div>
      </div>
      {/* Negative margin to eliminate gap on mobile */}
      <div className="h-[50vh] md:h-[100vh] w-full" />
    </div>
  );

};
