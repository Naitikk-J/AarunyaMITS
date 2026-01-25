import React from 'react';
import { motion } from 'framer-motion';

export const TVIntro: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <h2 className="text-kidcore-yellow text-4xl md:text-6xl font-press-start mb-4 drop-shadow-[4px_4px_0px_#000]">
          ENTERING
        </h2>
        <h1 className="text-kidcore-pink text-6xl md:text-8xl font-press-start drop-shadow-[6px_6px_0px_#000] glitch" data-text="AARUNYA">
          AARUNYA
        </h1>
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="mt-8 text-kidcore-green text-xl md:text-2xl font-pixel"
        >
          PREPARE FOR THE DIGITAL CARNIVAL...
        </motion.div>
      </motion.div>
      
      {/* Decorative scanlines or something inside the TV */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};
