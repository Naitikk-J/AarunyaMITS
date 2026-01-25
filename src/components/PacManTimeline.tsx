import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const events = [
  { id: 1, title: "INAUGURATION", date: "FEB 10", description: "The grand opening ceremony with 8-bit fireworks.", pos: 0.1, color: "var(--kidcore-blue)" },
  { id: 2, title: "PIXEL HACK", date: "FEB 11", description: "48-hour coding marathon in the neon grid.", pos: 0.35, color: "var(--kidcore-green)" },
  { id: 3, title: "ARCADE BATTLE", date: "FEB 12", description: "Retro gaming tournament for the ultimate champion.", pos: 0.6, color: "var(--kidcore-orange)" },
  { id: 4, title: "TECH SYMPOSIUM", date: "FEB 13", description: "Deep dives into the future of digital art.", pos: 0.85, color: "var(--kidcore-pink)" },
];

export const PacmanTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eatenDots, setEatenDots] = useState<number[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

    // SVG Path for the Pac-man road - updated to be more rectilinear like a maze
    const pathData = "M 400 0 V 120 H 150 V 350 H 650 V 580 H 150 V 820 H 650 V 1100 H 150 V 1350 H 400 V 1600";
    
    const offsetDistance = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
      const unsubscribe = scrollYProgress.on("change", (latest) => {
        events.forEach(event => {
          if (latest >= event.pos && !eatenDots.includes(event.id)) {
            setEatenDots(prev => [...prev, event.id]);
          }
        });
      });
      return () => unsubscribe();
    }, [scrollYProgress, eatenDots]);

    return (
      <div ref={containerRef} id="timeline" className="relative min-h-[300vh] py-24 bg-[#0D001A] overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `linear-gradient(var(--kidcore-blue) 1px, transparent 1px), linear-gradient(90deg, var(--kidcore-blue) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} />
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-press-start text-center mb-32 text-kidcore-blue drop-shadow-[0_0_20px_rgba(0,255,249,0.8)] tracking-widest">
            TIMELINE
          </h2>

            <div className="relative h-[1600px] w-full rounded-[40px] overflow-hidden border-[6px] border-[#00fff9]/30 bg-black/80 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
              <svg 
                viewBox="0 0 800 1600" 
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="xMidYMin meet"
              >
                <defs>
                  <filter id="maze-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood floodColor="#00fff9" floodOpacity="1" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <pattern id="maze-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1.5" fill="#00fff9" fillOpacity="0.4" />
                  </pattern>
                </defs>

                {/* Background Dots */}
                <rect width="100%" height="100%" fill="url(#maze-dots)" />

                {/* High-Fidelity Maze Walls */}
                <g fill="none" stroke="#00fff9" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" filter="url(#maze-glow)">
                  {/* Border Wall */}
                  <rect x="20" y="20" width="760" height="1560" rx="30" strokeWidth="6" opacity="0.8" />

                {/* Top Section blocks */}
                <rect x="70" y="70" width="130" height="70" rx="15" />
                <rect x="250" y="70" width="300" height="40" rx="20" />
                <rect x="600" y="70" width="130" height="70" rx="15" />

                {/* T-Shapes and Dividers */}
                <path d="M 70 190 H 200 V 280 H 70 Z" />
                <path d="M 600 190 H 730 V 280 H 600 Z" />
                
                <path d="M 270 160 H 530 V 200 H 430 V 300 H 370 V 200 H 270 Z" /> {/* Large T-Shape */}
                
                {/* Horizontal Bars */}
                <rect x="70" y="330" width="130" height="30" rx="15" />
                <rect x="600" y="330" width="130" height="30" rx="15" />
                
                <path d="M 270 350 H 370 V 450 H 270 Z" />
                <path d="M 430 350 H 530 V 450 H 430 Z" />

                {/* Side Inlets */}
                <path d="M 20 400 H 100 V 500 H 20" />
                <path d="M 780 400 H 700 V 500 H 780" />

                {/* Ghost House (Centerpiece) */}
                <g strokeWidth="6">
                  <rect x="300" y="550" width="200" height="120" rx="10" stroke="#00fff9" />
                  <line x1="360" y1="550" x2="440" y2="550" stroke="white" strokeWidth="4" />
                </g>

                {/* Vertical Separators */}
                <rect x="230" y="550" width="30" height="150" rx="15" />
                <rect x="540" y="550" width="30" height="150" rx="15" />

                {/* Bottom-Middle Section */}
                <path d="M 70 700 H 200 V 740 H 70 Z" />
                <path d="M 600 700 H 730 V 740 H 600 Z" />
                
                <path d="M 300 730 H 500 V 770 H 415 V 850 H 385 V 770 H 300 Z" />

                <rect x="70" y="800" width="130" height="100" rx="20" />
                <rect x="600" y="800" width="130" height="100" rx="20" />

                <path d="M 250 900 H 550 V 940 H 250 Z" />
                <path d="M 380 940 V 1050 H 420 V 940 Z" />

                {/* Lower Blocks */}
                <rect x="70" y="1000" width="130" height="50" rx="25" />
                <rect x="600" y="1000" width="130" height="50" rx="25" />

                <path d="M 150 1150 H 350 V 1200 H 150 Z" />
                <path d="M 450 1150 H 650 V 1200 H 450 Z" />

                <path d="M 380 1200 V 1350" strokeWidth="10" />
                
                <rect x="70" y="1400" width="300" height="40" rx="20" />
                <rect x="430" y="1400" width="300" height="40" rx="20" />
                
                <path d="M 70 1480 H 730 V 1530 H 70 Z" />
              </g>

              {/* Power Pellets - Large glowing white circles */}
              <circle cx="60" cy="60" r="14" fill="white" filter="url(#maze-glow)" />
              <circle cx="740" cy="60" r="14" fill="white" filter="url(#maze-glow)" />
              <circle cx="60" cy="1540" r="14" fill="white" filter="url(#maze-glow)" />
              <circle cx="740" cy="1540" r="14" fill="white" filter="url(#maze-glow)" />

              {/* The Active Path (Subtle guide) */}
              <path 
                d={pathData} 
                fill="none" 
                stroke="#00fff9" 
                strokeWidth="2" 
                className="opacity-10"
              />
              
              {/* Animated path dots */}
              {[...Array(40)].map((_, i) => (
                <circle 
                  key={i} 
                  r="3.5" 
                  fill="#FFE737" 
                  filter="url(#maze-glow)"
                  style={{
                    offsetPath: `path("${pathData}")`,
                    offsetDistance: `${(i / 40) * 100}%`
                  }}
                />
              ))}
            </svg>

          {/* Pac-man Character */}
          <motion.div
            style={{
              offsetPath: `path("${pathData}")`,
              offsetDistance: offsetDistance,
              offsetRotate: 'auto'
            }}
            className="absolute z-20 w-12 h-12 md:w-16 md:h-16"
          >
            <div className="relative w-full h-full bg-kidcore-yellow rounded-full shadow-[0_0_30px_#FFE737] border-2 border-white/50">
               <div className="absolute top-1/4 right-1/4 w-2 h-2 md:w-3 md:h-3 bg-black rounded-full" />
               <motion.div 
                  className="absolute inset-0 bg-kidcore-indigo origin-center"
                  animate={{ 
                    clipPath: [
                      'polygon(50% 50%, 100% 20%, 100% 80%)',
                      'polygon(50% 50%, 100% 50%, 100% 50%)',
                      'polygon(50% 50%, 100% 20%, 100% 80%)'
                    ] 
                  }}
                  transition={{ duration: 0.25, repeat: Infinity }}
               />
            </div>
          </motion.div>

          {/* Event Nodes (Gems/Fruits) */}
          {events.map((event, index) => (
            <div 
              key={event.id}
              className="absolute w-full"
              style={{
                top: `${event.pos * 100}%`,
              }}
            >
              <AnimatePresence>
                {!eatenDots.includes(event.id) && (
                  <motion.div 
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center z-10"
                    style={{
                      offsetPath: `path("${pathData}")`,
                      offsetDistance: `${event.pos * 100}%`
                    }}
                  >
                    <div 
                      className="w-8 h-8 md:w-10 md:h-10 rounded-lg rotate-45 border-2 border-white/80 animate-pulse"
                      style={{ 
                        backgroundColor: event.color,
                        boxShadow: `0 0 20px ${event.color}`
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

                {/* Event Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, margin: "-100px" }}
                  className={`p-4 md:p-8 absolute w-[85vw] md:w-[40%] max-w-[350px] rounded-2xl border-2 bg-kidcore-indigo/80 backdrop-blur-md left-1/2 -translate-x-1/2 md:translate-x-0 ${
                    index % 2 === 0 ? 'md:left-auto md:right-[8%]' : 'md:right-auto md:left-[8%]'
                  } -translate-y-1/2 mt-20 md:mt-0`}
                  style={{ 
                    borderColor: event.color,
                    boxShadow: `0 0 15px ${event.color}44, inset 0 0 10px ${event.color}22`
                  }}
                >
                  <div className="flex items-center gap-3 mb-2 md:mb-3">
                    <span className="bg-white/10 px-2 py-1 text-[7px] md:text-[10px] font-press-start text-white border border-white/20 rounded">
                      {event.date}
                    </span>
                    <div className="h-[1px] md:h-[2px] flex-1 bg-white/10" />
                  </div>
                  <h3 className="text-sm md:text-lg font-press-start mb-2 md:mb-3" style={{ color: event.color }}>
                    {event.title}
                  </h3>
                  <p className="font-vt323 text-base md:text-xl text-white/80 leading-snug">
                    {event.description}
                  </p>
                  <div className="mt-3 md:mt-4 flex justify-between items-center">
                     <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-ping" style={{ backgroundColor: event.color }} />
                     <span className="text-[7px] md:text-[8px] font-press-start opacity-40 text-white">LVL {index + 1}</span>
                  </div>
                </motion.div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
