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

  // SVG Path for the Pac-man road
  const pathData = "M 400 0 Q 600 200 400 400 T 400 800 Q 200 1000 400 1200 T 400 1600";
  
  const offsetDistance = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Track scroll to "eat" dots
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
    <div ref={containerRef} id="timeline" className="relative min-h-[250vh] py-24 bg-kidcore-cream/50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-press-start text-center mb-24 text-kidcore-blue drop-shadow-[4px_4px_0px_var(--kidcore-pink)]">
          TIMELINE
        </h2>

        <div className="relative h-[1600px] w-full">
          {/* The Maze Road SVG */}
          <svg 
            viewBox="0 0 800 1600" 
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <path 
              d={pathData} 
              fill="none" 
              stroke="var(--kidcore-black)" 
              strokeWidth="40" 
              strokeLinecap="round"
              className="opacity-10"
            />
            <path 
              d={pathData} 
              fill="none" 
              stroke="var(--kidcore-blue)" 
              strokeWidth="6" 
              strokeDasharray="12 12"
              strokeLinecap="round"
            />
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
            <div className="relative w-full h-full bg-kidcore-yellow rounded-full shadow-[0_0_20px_var(--kidcore-yellow)] border-4 border-kidcore-black">
               <div className="absolute top-1/4 right-1/4 w-2 h-2 md:w-3 md:h-3 bg-black rounded-full" />
               <motion.div 
                  className="absolute inset-0 bg-kidcore-cream origin-center"
                  animate={{ 
                    clipPath: [
                      'polygon(50% 50%, 100% 25%, 100% 75%)',
                      'polygon(50% 50%, 100% 50%, 100% 50%)',
                      'polygon(50% 50%, 100% 25%, 100% 75%)'
                    ] 
                  }}
                  transition={{ duration: 0.3, repeat: Infinity }}
               />
            </div>
          </motion.div>

          {/* Dots and Info Cards */}
          {events.map((event, index) => (
            <div 
              key={event.id}
              className="absolute w-full"
              style={{
                top: `${event.pos * 100}%`,
              }}
            >
              {/* Dot / Fruit */}
              <AnimatePresence>
                {!eatenDots.includes(event.id) && (
                  <motion.div 
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-kidcore-green rounded-full shadow-[0_0_15px_var(--kidcore-green)] flex items-center justify-center animate-pulse border-4 border-kidcore-black z-10"
                  >
                     <div className="w-3 h-3 bg-white opacity-50 rounded-full" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Event Card */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                className={`glass-card p-6 md:p-8 absolute w-[70vw] md:w-[35%] max-w-[400px] ${
                  index % 2 === 0 ? 'right-[5%] md:right-[10%]' : 'left-[5%] md:left-[10%]'
                } -translate-y-1/2`}
                style={{ 
                  borderColor: event.color,
                  boxShadow: `8px 8px 0px var(--kidcore-black)`
                }}
              >
                <div className="absolute -top-4 left-4 bg-kidcore-black px-3 py-1 text-[8px] md:text-xs font-press-start text-white">
                  {event.date}
                </div>
                <h3 className="text-sm md:text-xl font-press-start mb-2" style={{ color: event.color }}>
                  {event.title}
                </h3>
                <p className="font-vt323 text-base md:text-xl text-kidcore-black leading-tight">
                  {event.description}
                </p>
                <div className="mt-4 flex justify-end">
                   <div className="w-3 h-3 bg-kidcore-pink animate-ping" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
