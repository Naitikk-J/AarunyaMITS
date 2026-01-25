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
      offset: ["start start", "end end"]
    });

    const pathData = "M 400 0 V 120 H 150 V 350 H 650 V 580 H 150 V 820 H 650 V 1100 H 150 V 1350 H 400 V 1600";
    
    const offsetDistance = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const ghostOffsetDistance = useTransform(scrollYProgress, [0, 0.05, 1], ["-10%", "0%", "92%"]);

    // Calculate Pac-man's Y position to center the camera
    const pacmanY = useTransform(scrollYProgress, 
      [0, 120/4100, 370/4100, 600/4100, 1100/4100, 1330/4100, 1830/4100, 2070/4100, 2570/4100, 2850/4100, 3350/4100, 3600/4100, 3850/4100, 1],
      [0, 120, 120, 350, 350, 580, 580, 820, 820, 1100, 1100, 1350, 1350, 1600]
    );

    const mazeY = useTransform(pacmanY, (y) => `calc(50vh - ${y}px)`);


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
        <div ref={containerRef} id="timeline" className="relative min-h-[450vh] bg-[#0D001A]">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{ 
              backgroundImage: `linear-gradient(var(--kidcore-blue) 1px, transparent 1px), linear-gradient(90deg, var(--kidcore-blue) 1px, transparent 1px)`,
              backgroundSize: '100px 100px'
            }} />
          </div>
  
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
            <h2 className="text-3xl md:text-6xl font-press-start text-center mb-12 text-kidcore-blue drop-shadow-[0_0_20px_rgba(0,255,249,0.8)] tracking-widest z-50">
              TIMELINE
            </h2>
  
            <motion.div 
              style={{ y: mazeY }}
              className="relative h-[1600px] w-full max-w-5xl rounded-[40px] border-[6px] border-[#00fff9]/30 bg-black/80 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            >

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
              className="absolute z-30 w-12 h-12 md:w-16 md:h-16"
            >
              <div className="relative w-full h-full bg-kidcore-yellow rounded-full shadow-[0_0_30px_#FFE737] border-2 border-white/50">
                 <div className="absolute top-1/4 right-1/4 w-2 h-2 md:w-3 md:h-3 bg-black rounded-full" />
                 <motion.div 
                    className="absolute inset-0 bg-black/20 origin-center"
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

            {/* Ghost Character (Blinky) */}
            <motion.div
              style={{
                offsetPath: `path("${pathData}")`,
                offsetDistance: ghostOffsetDistance,
                offsetRotate: 'auto'
              }}
              className="absolute z-20 w-10 h-10 md:w-14 md:h-14"
            >
              <div className="relative w-full h-full bg-radical-red rounded-t-full shadow-[0_0_25px_#FF003C] border-2 border-white/30">
                  {/* Ghost Eyes */}
                  <div className="absolute top-[20%] left-[20%] w-3 h-3 bg-white rounded-full">
                    <div className="absolute top-[20%] right-0 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  </div>
                  <div className="absolute top-[20%] right-[20%] w-3 h-3 bg-white rounded-full">
                    <div className="absolute top-[20%] right-0 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  </div>
                  {/* Wavy bottom */}
                  <div className="absolute -bottom-1 left-0 right-0 flex justify-around">
                     <div className="w-1/3 h-2 bg-radical-red rounded-b-full" />
                     <div className="w-1/3 h-2 bg-radical-red rounded-b-full" />
                     <div className="w-1/3 h-2 bg-radical-red rounded-b-full" />
                  </div>
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
                className={`p-4 md:p-8 absolute w-[75vw] md:w-[40%] max-w-[350px] rounded-2xl border-2 bg-kidcore-indigo/70 backdrop-blur-md z-30 ${
                  index % 2 === 0 
                    ? 'right-[2%] md:right-[8%] -translate-y-[60%]' 
                    : 'left-[2%] md:left-[8%] -translate-y-[40%]'
                } md:-translate-y-1/2`}
                style={{ 
                  borderColor: event.color,
                  boxShadow: `0 0 15px ${event.color}44, inset 0 0 10px ${event.color}22`
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-white/10 px-2 py-1 text-[8px] md:text-[10px] font-press-start text-white border border-white/20 rounded">
                    {event.date}
                  </span>
                  <div className="h-[2px] flex-1 bg-white/10" />
                </div>
                <h3 className="text-base md:text-lg font-press-start mb-3" style={{ color: event.color }}>
                  {event.title}
                </h3>
                <p className="font-vt323 text-lg md:text-xl text-white/80 leading-snug">
                  {event.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                   <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: event.color }} />
                   <span className="text-[8px] font-press-start opacity-40 text-white">LVL {index + 1}</span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
