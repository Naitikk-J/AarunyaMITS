import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PixelCard from "./PixelCard";
import { PixelCoin } from "./PixelDecorations";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  color: string;
}

const events: TimelineEvent[] = [
  {
    id: 1,
    title: "OPENING CEREMONY",
    description: "The dawn breaks! Join us for an electrifying kick-off",
    date: "DAY 1",
    color: "radical-red",
  },
  {
    id: 2,
    title: "BATTLE OF BANDS",
    description: "Rock the stage! Music that moves mountains",
    date: "DAY 2",
    color: "electric-yellow",
  },
  {
    id: 3,
    title: "CULTURAL NIGHT",
    description: "A celebration of art, dance, and tradition",
    date: "DAY 3",
    color: "neon-magenta",
  },
  {
    id: 4,
    title: "GRAND FINALE",
    description: "The ultimate showdown! Who will claim victory?",
    date: "DAY 4",
    color: "lime-green",
  },
];

const PacManTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pacmanRef = useRef<HTMLDivElement>(null);
  const [eatenDots, setEatenDots] = useState<number[]>([]);
  const [activeEvent, setActiveEvent] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current || !pathRef.current || !pacmanRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    // Scroll flow animations for timeline elements
    const ctx = gsap.context(() => {
      gsap.fromTo(".pixel-border-8bit, .flex-1.grid > div",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play reverse play reverse"
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out"
        }
      );
    }, containerRef);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const point = path.getPointAtLength(progress * pathLength);

          if (pacmanRef.current) {
            pacmanRef.current.style.left = `${point.x}px`;
            pacmanRef.current.style.top = `${point.y}px`;
          }

          const newEatenDots: number[] = [];
          const dotPositions = [0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 0.9];

          dotPositions.forEach((pos, index) => {
            if (progress > pos) {
              newEatenDots.push(index);
            }
          });

          setEatenDots(newEatenDots);

          if (progress < 0.25) setActiveEvent(0);
          else if (progress < 0.5) setActiveEvent(1);
          else if (progress < 0.75) setActiveEvent(2);
          else setActiveEvent(3);
        },
      },
    });

    // Add a dummy animation to activate the scroll trigger
    tl.to({}, { duration: 1 });

    return () => {
      ctx.revert();
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, []);

  const getDotPosition = (index: number) => {
    const positions = [
      { x: 80, y: 50 },
      { x: 180, y: 50 },
      { x: 280, y: 150 },
      { x: 180, y: 250 },
      { x: 280, y: 350 },
      { x: 180, y: 450 },
      { x: 80, y: 450 },
    ];
    return positions[index] || { x: 0, y: 0 };
  };

  return (
    <section className="relative py-4" ref={containerRef}>
      <div className="sticky top-10 mx-auto max-w-6xl px-4">
        <h2 className="font-pixel text-xl md:text-3xl text-electric-yellow text-center mb-4 glow-yellow tracking-wider">
          EVENT TIMELINE
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-sm">
          Follow Pac-Man through the festival journey
        </p>

        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start">
          {/* SVG Path Container */}
          <div className="relative w-[360px] h-[500px] flex-shrink-0 pixel-border-8bit p-4 bg-crt-black/50">
            <svg
              viewBox="0 0 360 500"
              className="w-full h-full"
              style={{ overflow: "visible" }}
            >
              {/* Maze walls - pixel style */}
              <path
                d="M 20 40 H 340 V 120 H 260 V 180 H 340 V 260 H 100 V 320 H 20 V 260 H 100 V 200 H 20 V 120 H 100 V 40"
                fill="none"
                stroke="hsl(var(--cyber-blue))"
                strokeWidth="8"
                strokeLinecap="square"
                className="opacity-40"
              />
              
              {/* Path */}
              <path
                ref={pathRef}
                d="M 30 50 H 280 Q 330 50 330 100 V 200 Q 330 250 280 250 H 80 Q 30 250 30 300 V 400 Q 30 450 80 450 H 280"
                fill="none"
                stroke="hsl(var(--cyber-blue))"
                strokeWidth="4"
                strokeLinecap="square"
                strokeDasharray="8 4"
                className="opacity-60"
              />

              {/* Power pellets at event positions */}
              {events.map((event, index) => {
                const positions = [
                  { x: 30, y: 50 },
                  { x: 330, y: 150 },
                  { x: 30, y: 350 },
                  { x: 280, y: 450 },
                ];
                const pos = positions[index];
                return (
                  <g key={event.id}>
                    <rect
                      x={pos.x - 12}
                      y={pos.y - 12}
                      width={24}
                      height={24}
                      fill={`hsl(var(--${event.color}))`}
                      className={`transition-all duration-300 ${
                        activeEvent >= index ? "animate-pulse-glow" : "opacity-60"
                      }`}
                      style={{
                        filter: activeEvent >= index
                          ? `drop-shadow(0 0 10px hsl(var(--${event.color})))`
                          : "none",
                      }}
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 4}
                      textAnchor="middle"
                      className="font-pixel text-[10px] fill-crt-black"
                    >
                      {index + 1}
                    </text>
                  </g>
                );
              })}

              {/* Regular dots */}
              {[0, 1, 2, 3, 4, 5, 6].map((index) => {
                const pos = getDotPosition(index);
                return (
                  <rect
                    key={`dot-${index}`}
                    x={pos.x - 4}
                    y={pos.y - 4}
                    width={8}
                    height={8}
                    fill="hsl(var(--electric-yellow))"
                    className={`transition-all duration-200 ${
                      eatenDots.includes(index) ? "opacity-20" : "opacity-100"
                    }`}
                    style={{
                      filter: !eatenDots.includes(index)
                        ? "drop-shadow(0 0 5px hsl(var(--electric-yellow)))"
                        : "none",
                    }}
                  />
                );
              })}
            </svg>

            {/* Pac-Man - Pixel Style */}
            <div
              ref={pacmanRef}
              className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: 30, top: 50, imageRendering: 'pixelated' }}
            >
              <svg viewBox="0 0 16 16" className="w-full h-full animate-chomp">
                <rect x="4" y="0" width="8" height="2" fill="hsl(var(--electric-yellow))" />
                <rect x="2" y="2" width="12" height="2" fill="hsl(var(--electric-yellow))" />
                <rect x="0" y="4" width="16" height="2" fill="hsl(var(--electric-yellow))" />
                <rect x="0" y="6" width="10" height="2" fill="hsl(var(--electric-yellow))" />
                <rect x="12" y="6" width="4" height="2" fill="hsl(var(--electric-yellow))" />
                <rect x="0" y="8" width="8" height="2" fill="hsl(var(--electric-yellow))" />
                <rect x="0" y="10" width="10" height="2" fill="hsl(var(--electric-yellow))" />
                <rect x="12" y="10" width="4" height="2" fill="hsl(var(--electric-yellow))" />
                <rect x="2" y="12" width="12" height="2" fill="hsl(var(--electric-yellow))" />
                <rect x="4" y="14" width="8" height="2" fill="hsl(var(--electric-yellow))" />
                {/* Eye */}
                <rect x="6" y="4" width="2" height="2" fill="hsl(var(--crt-black))" />
              </svg>
            </div>

            {/* Coin decorations */}
            <PixelCoin className="absolute -top-6 -left-6 w-8 h-8" />
            <PixelCoin className="absolute -bottom-6 -right-6 w-8 h-8" />
          </div>

          {/* Event Cards */}
          <div className="flex-1 grid gap-4">
            {events.map((event, index) => (
              <PixelCard
                key={event.id}
                variant={activeEvent === index ? "primary" : "default"}
                className={`transition-all duration-500 ${
                  activeEvent === index
                    ? "scale-105 border-l-8"
                    : "opacity-60 scale-100"
                }`}
                style={{
                  borderLeftColor: activeEvent === index
                    ? `hsl(var(--${event.color}))`
                    : undefined,
                } as React.CSSProperties}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="font-pixel text-[10px] px-3 py-1.5"
                    style={{
                      backgroundColor: `hsl(var(--${event.color}))`,
                      color: 'hsl(var(--crt-black))',
                    }}
                  >
                    {event.date}
                  </span>
                  <div>
                    <h3
                      className="font-pixel text-sm mb-2"
                      style={{
                        color: activeEvent === index
                          ? `hsl(var(--${event.color}))`
                          : "hsl(var(--foreground))",
                      }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">{event.description}</p>
                  </div>
                </div>
              </PixelCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PacManTimeline;
