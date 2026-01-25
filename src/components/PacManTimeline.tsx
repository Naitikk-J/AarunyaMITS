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
        setEatenDots(prev => {
          const newEaten = [...prev];
          let changed = false;
          events.forEach(event => {
            if (latest >= event.pos && !newEaten.includes(event.id)) {
              newEaten.push(event.id);
              changed = true;
            }
          });
          return changed ? newEaten : prev;
        });
      });
      return () => unsubscribe();
    }, [scrollYProgress]);

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

              <div className="relative h-[200vw] md:h-[1600px] w-full rounded-[4vw] md:rounded-[40px] border-[0.8vw] md:border-[6px] border-[#00fff9]/30 bg-black/80 shadow-[0_0_5vw_rgba(0,0,0,0.9)]">
                <svg 
                  viewBox="0 0 800 1600" 
                  className="absolute inset-0 w-full h-full overflow-visible"
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
                  <rect width="100%" height="100%" fill="url(#maze-dots)" className="pointer-events-none" />

                  {/* High-Fidelity Maze Walls */}
                  <g fill="none" stroke="#00fff9" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" filter="url(#maze-glow)" className="pointer-events-none">
                    {/* Border Wall */}
                    <rect x="20" y="20" width="760" height="1560" rx="30" strokeWidth="6" opacity="0.8" />

                  {/* Top Section blocks */}
                  <rect x="70" y="70" width="130" height="70" rx="15" />
                  <rect x="250" y="70" width="300" height="40" rx="20" />
                  <rect x="600" y="70" width="130" height="70" rx="15" />

                  {/* T-Shapes and Dividers */}
                  <path d="M 70 190 H 200 V 280 H 70 Z" />
                  <path d="M 600 190 H 730 V 280 H 600 Z" />
                  
                  <path d="M 270 160 H 530 V 200 H 430 V 300 H 370 V 200 H 270 Z" />
                  
                  {/* Horizontal Bars */}
                  <rect x="70" y="330" width="130" height="30" rx="15" />
                  <rect x="600" y="330" width="130" height="30" rx="15" />
                  
                  <path d="M 270 350 H 370 V 450 H 270 Z" />
                  <path d="M 430 350 H 530 V 450 H 430 Z" />

                  {/* Side Inlets */}
                  <path d="M 20 400 H 100 V 500 H 20" />
                  <path d="M 780 400 H 700 V 500 H 780" />

                  {/* Ghost House */}
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

                {/* Power Pellets */}
                <circle cx="60" cy="60" r="14" fill="white" filter="url(#maze-glow)" className="pointer-events-none" />
                <circle cx="740" cy="60" r="14" fill="white" filter="url(#maze-glow)" className="pointer-events-none" />
                <circle cx="60" cy="1540" r="14" fill="white" filter="url(#maze-glow)" className="pointer-events-none" />
                <circle cx="740" cy="1540" r="14" fill="white" filter="url(#maze-glow)" className="pointer-events-none" />

                {/* Animated path dots */}
                {[...Array(40)].map((_, i) => (
                  <circle 
                    key={i} 
                    r="3.5" 
                    fill="#FFE737" 
                    filter="url(#maze-glow)"
                    className="pointer-events-none"
                    style={{
                      offsetPath: `path("${pathData}")`,
                      offsetDistance: `${(i / 40) * 100}%`
                    }}
                  />
                ))}

                {/* Event Nodes (Fruits/Gems) inside SVG */}
                {events.map((event, index) => (
                  <AnimatePresence key={event.id}>
                    {!eatenDots.includes(event.id) && (
                      <motion.g
                        exit={{ scale: 0, opacity: 0 }}
                        style={{
                          offsetPath: `path("${pathData}")`,
                          offsetDistance: `${event.pos * 100}%`
                        }}
                        className="pointer-events-none"
                      >
                        <circle 
                          r="20" 
                          fill={event.color} 
                          filter="url(#maze-glow)"
                          className="animate-pulse"
                        />
                        <rect 
                          x="-15" y="-15" width="30" height="30" 
                          fill={event.color} 
                          className="rotate-45"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </motion.g>
                    )}
                  </AnimatePresence>
                ))}

                {/* Pac-man Character inside SVG */}
                <motion.g
                  style={{
                    offsetPath: `path("${pathData}")`,
                    offsetDistance: offsetDistance,
                    offsetRotate: 'auto'
                  }}
                  className="pointer-events-none"
                >
                  <foreignObject x="-40" y="-40" width="80" height="80">
                    <div className="w-full h-full bg-kidcore-yellow rounded-full shadow-[0_0_30px_#FFE737] border-2 border-white/50 relative">
                       <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-black rounded-full" />
                       <motion.div 
                          className="absolute inset-0 bg-[#0D001A] origin-center"
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
                  </foreignObject>
                </motion.g>

                {/* Event Cards inside SVG for perfect positioning */}
                {events.map((event, index) => (
                  <motion.g
                    key={`card-${event.id}`}
                    style={{
                      offsetPath: `path("${pathData}")`,
                      offsetDistance: `${event.pos * 100}%`,
                      offsetRotate: '0deg'
                    }}
                  >
                    <foreignObject 
                      x={index % 2 === 0 ? 60 : -410} 
                      y="-100" 
                      width="350" 
                      height="300"
                      className="overflow-visible"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        className="p-6 rounded-2xl border-2 bg-kidcore-indigo/80 backdrop-blur-md pointer-events-auto"
                        style={{ 
                          borderColor: event.color,
                          boxShadow: `0 0 20px ${event.color}44, inset 0 0 10px ${event.color}22`
                        }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-white/10 px-2 py-1 text-[10px] font-press-start text-white border border-white/20 rounded">
                            {event.date}
                          </span>
                          <div className="h-[2px] flex-1 bg-white/10" />
                        </div>
                        <h3 className="text-lg font-press-start mb-3" style={{ color: event.color }}>
                          {event.title}
                        </h3>
                        <p className="font-vt323 text-xl text-white/80 leading-snug">
                          {event.description}
                        </p>
                        <div className="mt-4 flex justify-between items-center">
                           <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: event.color }} />
                           <span className="text-[8px] font-press-start opacity-40 text-white">LVL {index + 1}</span>
                        </div>
                      </motion.div>
                    </foreignObject>
                  </motion.g>
                ))}
              </svg>
            </div>
      </div>
    </div>
  );
};
