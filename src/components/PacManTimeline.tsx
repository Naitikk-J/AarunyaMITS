import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";

const events = [
  {
    id: 1,
    title: "INAUGURATION",
    date: "FEB 10",
    description: "The grand opening ceremony with 8-bit fireworks.",
    pos: 0.08,
    color: "var(--kidcore-blue)",
  },
  {
    id: 2,
    title: "PIXEL HACK",
    date: "FEB 11",
    description: "48-hour coding marathon in the neon grid.",
    pos: 0.33,
    color: "var(--kidcore-green)",
  },
  {
    id: 3,
    title: "ARCADE BATTLE",
    date: "FEB 12",
    description: "Retro gaming tournament for the ultimate champion.",
    pos: 0.6,
    color: "var(--kidcore-orange)",
  },
  {
    id: 4,
    title: "TECH SYMPOSIUM",
    date: "FEB 13",
    description: "Deep dives into the future of digital art.",
    pos: 0.85,
    color: "var(--kidcore-pink)",
  },
];

// SVG maze path
const pathData =
  "M 400 0 V 120 H 150 V 350 H 650 V 580 H 150 V 820 H 650 V 1100 H 150 V 1350 H 400 V 1600";

export const PacmanTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eatenDots, setEatenDots] = useState<number[]>([]);

    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"],
    });

    // Add spring for smooth movement
    const smoothProgress = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });

    const pacmanProgress = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    // Trigger events ONCE
    useEffect(() => {
      const unsubscribe = scrollYProgress.on("change", (latest) => {
        setEatenDots((prev) => {


        const updated = [...prev];
        events.forEach((event) => {
          if (latest >= event.pos && !updated.includes(event.id)) {
            updated.push(event.id);
          }
        });
        return updated;
      });
    });
  }, [scrollYProgress]);

  return (
    <div
      ref={containerRef}
      id="timeline"
      className="relative min-h-[300vh] py-32 bg-[#0D001A] overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--kidcore-blue) 1px, transparent 1px),
              linear-gradient(90deg, var(--kidcore-blue) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-6xl font-press-start text-center mb-32 text-kidcore-blue tracking-widest">
          TIMELINE
        </h2>

        <div className="relative h-[1600px] w-full rounded-[40px] overflow-hidden border-[6px] border-[#00fff9]/30 bg-black/80">
          {/* SVG MAZE */}
          <svg
            viewBox="0 0 800 1600"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMin meet"
          >
            <defs>
              <filter id="maze-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode />
                </feMerge>
              </filter>
            </defs>

            {/* Subtle guide path */}
            <path
              d={pathData}
              fill="none"
              stroke="#00fff9"
              strokeWidth="2"
              opacity="0.08"
            />

            {/* Path dots */}
            {[...Array(40)].map((_, i) => (
              <circle
                key={i}
                r="3.5"
                fill="#FFE737"
                filter="url(#maze-glow)"
                style={{
                  offsetPath: `path("${pathData}")`,
                  offsetDistance: `${(i / 40) * 100}%`,
                }}
              />
            ))}
          </svg>

          {/* PAC-MAN */}
          <motion.div
            style={{
              offsetPath: `path("${pathData}")`,
              offsetDistance: pacmanProgress,
              offsetRotate: "auto",
            }}
            className="absolute z-20 w-12 h-12 md:w-16 md:h-16"
          >
            <div className="relative w-full h-full bg-kidcore-yellow rounded-full shadow-[0_0_30px_#FFE737]">
              <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-black rounded-full" />
              <motion.div
                className="absolute inset-0 bg-kidcore-indigo"
                animate={{
                  clipPath: [
                    "polygon(50% 50%,100% 20%,100% 80%)",
                    "polygon(50% 50%,100% 50%,100% 50%)",
                    "polygon(50% 50%,100% 20%,100% 80%)",
                  ],
                }}
                transition={{ duration: 0.25, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* EVENTS */}
          {events.map((event, index) => {
            const eventY = index * 360 + 220;

            return (
              <div
                key={event.id}
                className="absolute w-full"
                style={{ top: `${eventY}px` }}
              >
                {/* Gem */}
                <AnimatePresence>
                  {!eatenDots.includes(event.id) && (
                    <motion.div
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute w-14 h-14 z-10"
                      style={{
                        offsetPath: `path("${pathData}")`,
                        offsetDistance: `${event.pos * 100}%`,
                      }}
                    >
                      <div
                        className="w-10 h-10 rotate-45 border-2 border-white"
                        style={{
                          background: event.color,
                          boxShadow: `0 0 20px ${event.color}`,
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
                  className={`absolute max-w-[360px] p-6 rounded-2xl backdrop-blur-md border-2 bg-kidcore-indigo/70 ${
                    index % 2 === 0 ? "right-8" : "left-8"
                  }`}
                  style={{
                    borderColor: event.color,
                    boxShadow: `0 0 20px ${event.color}44`,
                  }}
                >
                  <span className="text-[10px] font-press-start text-white/60">
                    {event.date}
                  </span>
                  <h3
                    className="font-press-start text-lg mt-3"
                    style={{ color: event.color }}
                  >
                    {event.title}
                  </h3>
                  <p className="font-vt323 text-xl text-white/80 mt-2">
                    {event.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
