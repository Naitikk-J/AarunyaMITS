import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PacManChaseGameProps {
    isActive?: boolean;
}

export const PacManChaseGame = ({ isActive = true }: PacManChaseGameProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pacManRef = useRef<HTMLDivElement>(null);
    const ghostsRef = useRef<HTMLDivElement[]>([]);
    const [scrollVelocity, setScrollVelocity] = useState(0);
    const lastScrollRef = useRef(0);

    useEffect(() => {
        if (!isActive || !containerRef.current || !pacManRef.current) return;

        // Track scroll velocity
        let ticking = false;

        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setScrollVelocity(Math.abs(currentScroll - lastScrollRef.current));
            lastScrollRef.current = currentScroll;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initialize Pac-Man scroll-driven animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1,
            }
        });

        if (pacManRef.current) {
            tl.to(pacManRef.current, {
                x: "85vw",
                ease: 'none',
            });
        }

        // Animate ghosts with scroll-driven position
        ghostsRef.current.forEach((ghost, index) => {
            if (!ghost) return;

            const offset = (index + 1) * 50;
            tl.to(ghost, {
                x: `calc(85vw - ${offset}px)`,
                ease: 'none',
            }, 0);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            tl.kill();
            ScrollTrigger.getAll().forEach((t) => {
                if (t.vars.trigger === containerRef.current) t.kill();
            });
        };
    }, [isActive, scrollVelocity]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-48 bg-gradient-to-b from-cyber-blue/20 to-background border-2 border-cyber-blue rounded-lg overflow-hidden"
            style={{ perspective: '1200px' }}
        >
            {/* Game title */}
            <div className="absolute top-2 left-2 z-10">
                <span className="font-pixel text-[10px] text-cyan-400">PAC-MAN CHASE</span>
            </div>

            {/* Scroll speed indicator */}
            <div className="absolute top-2 right-2 z-10 font-pixel text-[8px] text-yellow-300">
                SPEED: {Math.min(Math.round(scrollVelocity / 5), 10)}
            </div>

            {/* Game board - simple grid */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, hsl(var(--cyber-blue)) 19px, hsl(var(--cyber-blue)) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, hsl(var(--cyber-blue)) 19px, hsl(var(--cyber-blue)) 20px)',
                backgroundSize: '20px 20px',
            }} />

            {/* Pac-Man */}
            <div
                ref={pacManRef}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 z-20"
                style={{
                    willChange: 'transform',
                }}
            >
                <div className="relative w-full h-full">
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full fill-yellow-300 drop-shadow-lg"
                        style={{
                            filter: 'drop-shadow(0 0 4px hsl(var(--electric-yellow)))',
                        }}
                    >
                        <circle cx="50" cy="50" r="45" />
                        <polygon points="50,50 75,35 75,65" fill="currentColor" opacity="0" />
                    </svg>
                    {/* Animated mouth */}
                    <div className="absolute inset-1 rounded-full border-4 border-yellow-400 opacity-0 animate-pulse" />
                </div>
            </div>

            {/* Ghosts - three chasing Pac-Man */}
            {[
                { color: 'text-red-500', name: 'BLINKY' },
                { color: 'text-pink-500', name: 'PINKY' },
                { color: 'text-cyan-400', name: 'INKY' },
            ].map((ghost, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        if (el) ghostsRef.current[index] = el;
                    }}
                    className="absolute top-1/3 -left-8 z-10"
                    style={{
                        willChange: 'transform',
                    }}
                >
                    <svg
                        viewBox="0 0 100 100"
                        className={`w-8 h-8 ${ghost.color} drop-shadow-lg`}
                        style={{
                            filter: `drop-shadow(0 0 4px currentColor)`,
                        }}
                    >
                        {/* Ghost body */}
                        <g>
                            {/* Head */}
                            <circle cx="50" cy="40" r="30" fill="currentColor" />
                            {/* Body */}
                            <polygon points="20,40 20,70 80,70 80,40" fill="currentColor" />
                            {/* Bottom wavy */}
                            <circle cx="30" cy="70" r="10" fill="currentColor" />
                            <circle cx="50" cy="70" r="10" fill="currentColor" />
                            <circle cx="70" cy="70" r="10" fill="currentColor" />
                            {/* Eyes */}
                            <circle cx="40" cy="35" r="4" fill="white" />
                            <circle cx="60" cy="35" r="4" fill="white" />
                            <circle cx="40" cy="37" r="2" fill="black" />
                            <circle cx="60" cy="37" r="2" fill="black" />
                        </g>
                    </svg>
                    <div className="font-pixel text-[6px] text-center mt-1 opacity-70">
                        {ghost.name}
                    </div>
                </div>
            ))}

            {/* Score counter */}
            <div className="absolute bottom-2 right-2 font-pixel text-[10px] text-electric-yellow bg-background/60 px-2 py-1 rounded">
                POINTS: {Math.floor(scrollVelocity * 10)}
            </div>

            {/* Help text */}
            <div className="absolute bottom-2 left-2 font-pixel text-[7px] text-muted-foreground">
                SCROLL TO RUN!
            </div>
        </div>
    );
};

export default PacManChaseGame;
