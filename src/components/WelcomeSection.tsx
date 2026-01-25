import React from 'react';
import { motion } from 'framer-motion';
import { RetroButton } from './ui/retro-button';

export const WelcomeSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-kidcore-cream py-24 overflow-hidden">
      {/* Gritty Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Stickers - More of them and varied */}
        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[5%] w-32 h-32 bg-kidcore-yellow border-4 border-black flex items-center justify-center rotate-[-10deg] z-0 shadow-[8px_8px_0px_#000]"
        >
          <span className="text-black font-press-start text-[10px] text-center">AARUNYA<br/>FEST</span>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 40, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] right-[8%] w-40 h-40 bg-kidcore-pink border-4 border-black flex items-center justify-center rotate-[15deg] rounded-full z-0 shadow-[10px_10px_0px_#000]"
        >
          <span className="text-white font-press-start text-xs text-center px-2 leading-loose">RETRO<br/>VIBES<br/>2K26</span>
        </motion.div>

        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] left-[10%] w-24 h-24 bg-kidcore-green border-4 border-black flex items-center justify-center rotate-[-5deg] z-0 shadow-[6px_6px_0px_#000]"
        >
          <span className="text-black font-press-start text-sm">GG</span>
        </motion.div>

        {/* Big Decorative Shapes */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-kidcore-blue/20 rounded-full blur-3xl" />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-kidcore-yellow/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        {/* Main Heading */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-press-start text-kidcore-orange mb-6 drop-shadow-[4px_4px_0px_#000]">
            WELCOME TO
          </h2>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-press-start text-white leading-none tracking-tighter">
            <span className="block text-kidcore-blue drop-shadow-[8px_8px_0px_#000] glitch" data-text="AARUNYA">AARUNYA</span>
            <span className="block text-kidcore-pink drop-shadow-[8px_8px_0px_#000] -mt-2 md:-mt-6">2.0</span>
          </h1>
        </motion.div>

        {/* Description Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-3xl w-full bg-black/80 border-4 border-kidcore-blue p-8 md:p-12 relative shadow-[10px_10px_0px_theme(colors.kidcore.blue)] mb-12"
        >
          {/* Decorative corners */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-kidcore-yellow" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-kidcore-yellow" />

          <p className="text-xl md:text-2xl font-vt323 text-kidcore-green text-center leading-relaxed">
            STEP INTO THE ULTIMATE DIGITAL CARNIVAL WHERE PIXELS COME TO LIFE! 
            EXPERIENCE A MULTIDIMENSIONAL FESTIVAL OF TECHNOLOGY, ART, AND MUSIC. 
            FROM RETRO ARCADE VIBES TO FUTURE-TECH INNOVATIONS, AARUNYA 2.0 IS 
            WHERE THE ANALOG PAST MEETS THE DIGITAL FUTURE.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 pointer-events-auto mt-8 md:mt-12"
        >
          <RetroButton variant="default" className="scale-110 sm:scale-125 md:scale-150 mx-2 sm:mx-8">
            JOIN
          </RetroButton>
          <RetroButton variant="white" className="scale-110 sm:scale-125 md:scale-150 mx-2 sm:mx-8">
            INFO
          </RetroButton>
        </motion.div>
      </div>

      {/* VHS Overlay effect specific to this section */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://media.giphy.com/media/oEI9uWUicG7vA68tV6/giphy.gif')] bg-cover mix-blend-overlay" />
    </section>
  );
};
