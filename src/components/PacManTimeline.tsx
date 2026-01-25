import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const events = [
  { id: 1, title: "INAUGURATION", date: "FEB 10", description: "The grand opening ceremony with 8-bit fireworks.", pos: 0.1, color: "#BC13FE" },
  { id: 2, title: "PIXEL HACK", date: "FEB 11", description: "48-hour coding marathon in the neon grid.", pos: 0.35, color: "#39FF14" },
  { id: 3, title: "ARCADE BATTLE", date: "FEB 12", description: "Retro gaming tournament for the ultimate champion.", pos: 0.6, color: "#FF0099" },
  { id: 4, title: "TECH SYMPOSIUM", date: "FEB 13", description: "Deep dives into the future of digital art.", pos: 0.85, color: "#FFE737" },
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
    <div ref={containerRef} className="relative min-h-[200vh] py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-press-start text-center mb-24 text-kidcore-pink">
          TIMELINE
        </h2>

        <div className="relative h-[1600px] w-full">
          {/* The Maze Road SVG */}
          <svg 
            viewBox="0 0 800 1600" 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ filter: 'drop-shadow(0 0 10px #BC13FE)' }}
          >
            <path 
              d={pathData} 
              fill="none" 
              stroke="#2A1045" 
              strokeWidth="40" 
              strokeLinecap="round"
            />
            <path 
              d={pathData} 
              fill="none" 
              stroke="#BC13FE" 
              strokeWidth="4" 
              strokeDasharray="10 10"
              strokeLinecap="round"
            />
            
            {/* Blue Maze Wall style */}
            <path 
              d={pathData} 
              fill="none" 
              stroke="#0000FF" 
              strokeWidth="60" 
              strokeOpacity="0.1"
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
            className="absolute z-20 w-16 h-16"
          >
            <div className="relative w-full h-full bg-kidcore-yellow rounded-full shadow-[0_0_20px_#FFE737] animate-chomp"
                 style={{ clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)' }}>
               <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-black rounded-full" />
               {/* Mouth slice */}
               <motion.div 
                  className="absolute inset-0 bg-kidcore-indigo origin-center"
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
              className="absolute"
              style={{
                // We need to manually approximate positions on the path for UI elements
                // or use SVG pointAtLength if we had it. For now, manual placement.
                top: `${event.pos * 100}%`,
                left: index % 2 === 0 ? '60%' : '10%',
                width: '30%'
              }}
            >
              {/* Dot / Fruit */}
              <AnimatePresence>
                {!eatenDots.includes(event.id) && (
                  <motion.div 
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-8 -left-8 w-12 h-12 bg-[#39FF14] rounded-full shadow-[0_0_15px_#39FF14] flex items-center justify-center animate-pulse"
                    style={{ left: index % 2 === 0 ? '-40%' : '110%' }}
                  >
                     <div className="w-4 h-4 bg-white opacity-50 rounded-full" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Event Card */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                className="bg-[#1B065E] border-4 border-black p-6 shadow-[8px_8px_0_#000] relative"
                style={{ borderTopColor: event.color }}
              >
                <div className="absolute -top-4 left-4 bg-black px-2 py-1 text-xs font-press-start text-white">
                  {event.date}
                </div>
                <h3 className="text-xl font-press-start mb-2" style={{ color: event.color }}>
                  {event.title}
                </h3>
                <p className="font-vt323 text-lg text-gray-300">
                  {event.description}
                </p>
                <div className="mt-4 flex justify-end">
                   <div className="w-4 h-4 bg-kidcore-pink animate-ping" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Ghost chasing Pac-man */}
      <motion.div
        style={{
          offsetPath: `path("${pathData}")`,
          offsetDistance: useTransform(scrollYProgress, [0.1, 1], ["0%", "90%"]),
          offsetRotate: 'auto'
        }}
        className="absolute z-10 w-12 h-12"
      >
        <div className="relative w-full h-full bg-[#FF0000] rounded-t-full shadow-[0_0_15px_red]">
           <div className="absolute top-1/4 left-1/4 flex gap-2">
              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-blue-900 rounded-full" />
              </div>
              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-blue-900 rounded-full" />
              </div>
           </div>
           {/* Ghost bottom spikes */}
           <div className="absolute -bottom-2 left-0 w-full h-4 flex">
              <div className="flex-1 bg-[#FF0000]" style={{ clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)' }} />
              <div className="flex-1 bg-[#FF0000]" style={{ clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)' }} />
              <div className="flex-1 bg-[#FF0000]" style={{ clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)' }} />
           </div>
        </div>
      </motion.div>
    </div>
  );
};
