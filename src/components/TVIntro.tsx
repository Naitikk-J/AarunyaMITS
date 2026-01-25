import React from 'react';
import { motion } from 'framer-motion';

export const TVIntro: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
          className="text-center px-4"
        >
          <h2 className="text-kidcore-yellow text-xl sm:text-2xl md:text-5xl font-press-start mb-2 md:mb-4 drop-shadow-[2px_2px_0px_#000] md:drop-shadow-[4px_4px_0px_#000]">
            ENTERING
          </h2>
          <h1 className="text-kidcore-pink text-3xl sm:text-4xl md:text-7xl font-press-start drop-shadow-[3px_3px_0px_#000] md:drop-shadow-[6px_6px_0px_#000] glitch" data-text="AARUNYA">
            AARUNYA
          </h1>
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="mt-4 md:mt-8 text-kidcore-green text-xs sm:text-sm md:text-2xl font-pixel"
          >
            PREPARE FOR THE MITS CARNIVAL...
          </motion.div>
        </motion.div>

      
      {/* Decorative scanlines or something inside the TV */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};
