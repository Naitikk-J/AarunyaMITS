import React from 'react';
import { motion } from 'framer-motion';

export const TVIntro: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center px-4 flex flex-col items-center"
    >
      <img 
        src="/aarunya-logo.svg" 
        alt="Aarunya Logo" 
        className="w-[90%] md:w-[600px] h-auto mb-4 object-contain"
      />
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-kidcore-green text-xs sm:text-sm md:text-2xl font-pixel drop-shadow-[2px_2px_0px_#000]"
      >
        PREPARE FOR THE MITS CARNIVAL...
      </motion.div>
    </motion.div>

      
      {/* Decorative scanlines or something inside the TV */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};
