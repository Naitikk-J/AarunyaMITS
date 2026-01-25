import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

const events = [
  { id: 1, title: "INAUGURATION", date: "FEB 10", description: "The grand opening ceremony.", pos: 0.08, color: "var(--kidcore-blue)" },
  { id: 2, title: "PIXEL HACK", date: "FEB 11", description: "48-hour coding marathon.", pos: 0.33, color: "var(--kidcore-green)" },
  { id: 3, title: "ARCADE BATTLE", date: "FEB 12", description: "Retro gaming showdown.", pos: 0.6, color: "var(--kidcore-orange)" },
  { id: 4, title: "TECH SYMPOSIUM", date: "FEB 13", description: "Future of digital art.", pos: 0.85, color: "var(--kidcore-pink)" },
];

const pathData =
  "M 400 0 V 120 H 150 V 350 H 650 V 580 H 150 V 820 H 650 V 1100 H 150 V 1350 H 400 V 1600";

export const PacmanTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pacmanRef = useRef<HTMLDivElement>(null);
  const [pathLength, setPathLength] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Get real path length once
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Move pacman manually along path
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (!pathRef.current || !pacmanRef.current) return;
      const point = pathRef.current.getPointAtLength(latest * pathLength);
      pacmanRef.current.style.transform = `translate(${point.x}px, ${point.y}px)`;
    });
  }, [scrollYProgress, pathLength]);

  return (
    <div ref={containerRef} className="relative min-h-[300vh] bg-black py-32">
      <div className="relative h-[1600px] max-w-5xl mx-auto">
        <svg viewBox="0 0 800 1600" className="absolute inset-0 w-full h-full">
          <path ref={pathRef} d={pathData} fill="none" stroke="#00fff9" strokeWidth="2" />
        </svg>

        {/* PACMAN */}
        <motion.div
          ref={pacmanRef}
          className="absolute w-14 h-14 bg-yellow-400 rounded-full shadow-[0_0_20px_yellow]"
        >
          <div className="absolute top-3 right-3 w-3 h-3 bg-black rounded-full" />
        </motion.div>
      </div>
    </div>
  );
};
