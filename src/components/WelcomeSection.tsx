import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const WelcomeSection: React.FC = () => {
  // Generate random particles
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      color: ['#BC13FE', '#39FF14', '#FF0099', '#FFE737'][Math.floor(Math.random() * 4)],
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5
    }));
  }, []);

    return (
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 8-bit Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ 
              y: '-10%', 
              opacity: [0, 1, 1, 0],
              x: `${p.x + (Math.random() * 10 - 5)}%` 
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              delay: p.delay,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 10px ${p.color}`,
              zIndex: 0
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-8xl font-press-start text-kidcore-yellow mb-8 drop-shadow-[0_0_20px_rgba(255,231,55,0.5)]"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <span className="glitch" data-text="WELCOME TO">WELCOME TO</span>
          <br />
          <span className="glitch text-kidcore-grape" data-text="AARUNYA">AARUNYA</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl font-vt323 text-kidcore-green max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          The ultimate digital festival where pixel art meets retro nostalgia.
          Get ready for a journey through the neon dimensions.
        </motion.p>
        
        <motion.div 
          className="mt-12 flex flex-wrap justify-center gap-6"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button className="px-8 py-4 bg-kidcore-pink text-white font-press-start text-sm hover:translate-y-1 active:translate-y-2 border-b-8 border-r-8 border-black transition-all">
            JOIN NOW
          </button>
          <button className="px-8 py-4 bg-kidcore-green text-black font-press-start text-sm hover:translate-y-1 active:translate-y-2 border-b-8 border-r-8 border-black transition-all">
            EXPLORE
          </button>
        </motion.div>
      </div>

        {/* Retro Grid Floor */}
        <div 
          className="absolute bottom-0 left-0 w-full h-1/3 opacity-10 pointer-events-none"
          style={{
            perspective: '500px',
            background: 'linear-gradient(to bottom, transparent, rgba(188, 19, 254, 0.3))'
          }}
        >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(#BC13FE 1px, transparent 1px), linear-gradient(90deg, #BC13FE 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'rotateX(60deg)',
            transformOrigin: 'top center'
          }}
        />
      </div>
    </section>
  );
};
