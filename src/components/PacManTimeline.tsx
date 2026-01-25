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
  const pathData = "M 400 0 V 200 H 100 V 450 H 700 V 750 H 150 V 1050 H 650 V 1350 H 400 V 1600";
  
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
    <div ref={containerRef} id="timeline" className="relative min-h-[250vh] py-24 bg-kidcore-indigo overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-press-start text-center mb-24 text-kidcore-blue drop-shadow-[0_0_15px_rgba(0,255,249,0.5)]">
          TIMELINE
        </h2>

        <div className="relative h-[1600px] w-full rounded-3xl overflow-hidden border-4 border-kidcore-blue/20 bg-black/40">
          <svg 
            viewBox="0 0 800 1600" 
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <defs>
              <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <pattern id="dot-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="white" fillOpacity="0.2" />
              </pattern>
            </defs>

            {/* Dot Grid Background */}
            <rect width="100%" height="100%" fill="url(#dot-grid)" />

            {/* Complex Maze Walls - Inspired by the photo */}
            <g fill="none" stroke="var(--kidcore-blue)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" filter="url(#neon-glow)">
              {/* Top Section */}
              <rect x="50" y="50" width="120" height="60" rx="10" />
              <rect x="220" y="50" width="150" height="30" rx="15" />
              <rect x="430" y="50" width="150" height="30" rx="15" />
              <rect x="630" y="50" width="120" height="60" rx="10" />
              
              <path d="M 50 160 H 170 V 220 H 50 Z" />
              <path d="M 630 160 H 750 V 220 H 630 Z" />
              <path d="M 220 130 H 300 V 250 H 220 Z" />
              <path d="M 500 130 H 580 V 250 H 500 Z" />
              
              {/* Middle Section */}
              <rect x="50" y="300" width="120" height="30" rx="15" />
              <rect x="630" y="300" width="120" height="30" rx="15" />
              
              <path d="M 220 330 H 580 V 370 H 220 Z" />
              <path d="M 380 370 V 450 H 420 V 370 Z" />
              
              <rect x="50" y="550" width="120" height="80" rx="10" />
              <rect x="630" y="550" width="120" height="80" rx="10" />
              
              <path d="M 220 530 H 350 V 600 H 220 Z" />
              <path d="M 450 530 H 580 V 600 H 450 Z" />
              
              {/* Ghost House Style Center */}
              <rect x="330" y="650" width="140" height="80" rx="5" strokeWidth="4" />
              <line x1="370" y1="650" x2="430" y2="650" stroke="white" strokeWidth="2" opacity="0.5" />
              
              {/* Lower Section */}
              <path d="M 50 780 H 170 V 840 H 50 Z" />
              <path d="M 630 780 H 750 V 840 H 630 Z" />
              
              <rect x="220" y="850" width="120" height="30" rx="15" />
              <rect x="460" y="850" width="120" height="30" rx="15" />
              
              <path d="M 50 950 H 250 V 990 H 50 Z" />
              <path d="M 550 950 H 750 V 990 H 550 Z" />
              
              <path d="M 380 920 V 1050 H 420 V 920 Z" />
              
              <rect x="150" y="1150" width="100" height="100" rx="20" />
              <rect x="550" y="1150" width="100" height="100" rx="20" />
              
              <path d="M 300 1200 H 500 V 1240 H 300 Z" />
              <path d="M 380 1240 V 1350 H 420 V 1240 Z" />
              
              <path d="M 50 1450 H 320 V 1500 H 50 Z" />
              <path d="M 480 1450 H 750 V 1500 H 480 Z" />
            </g>

            {/* Power Pellets */}
            <circle cx="50" cy="50" r="10" fill="white" filter="url(#neon-glow)" />
            <circle cx="750" cy="50" r="10" fill="white" filter="url(#neon-glow)" />
            <circle cx="50" cy="1550" r="10" fill="white" filter="url(#neon-glow)" />
            <circle cx="750" cy="1550" r="10" fill="white" filter="url(#neon-glow)" />

            {/* The Main Path Path (Invisible background for depth) */}
            <path 
              d={pathData} 
              fill="none" 
              stroke="var(--kidcore-blue)" 
              strokeWidth="4" 
              className="opacity-20"
            />
            
            {/* Food dots along the path */}
            {[...Array(30)].map((_, i) => (
              <circle 
                key={i} 
                r="4" 
                fill="var(--kidcore-yellow)" 
                filter="url(#neon-glow)"
                style={{
                  offsetPath: `path("${pathData}")`,
                  offsetDistance: `${(i / 30) * 100}%`
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
                className={`p-6 md:p-8 absolute w-[80vw] md:w-[40%] max-w-[350px] rounded-2xl border-2 bg-kidcore-indigo/80 backdrop-blur-md ${
                  index % 2 === 0 ? 'right-[5%] md:right-[8%]' : 'left-[5%] md:left-[8%]'
                } -translate-y-1/2`}
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
