import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Platform {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  reached: boolean;
}

export const JumpPlatformGame = ({ isActive = true }: { isActive?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<Platform[]>([]);
  const [platformsReached, setPlatformsReached] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const lastScrollRef = useRef(0);
  const isJumpingRef = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || !playerRef.current) return;

    // Create platforms at different heights
    const platforms: Platform[] = [
      { id: 0, x: 10, y: 80, width: 15, height: 8, reached: false },
      { id: 1, x: 35, y: 65, width: 15, height: 8, reached: false },
      { id: 2, x: 60, y: 50, width: 15, height: 8, reached: false },
      { id: 3, x: 25, y: 35, width: 15, height: 8, reached: false },
      { id: 4, x: 50, y: 20, width: 20, height: 8, reached: false },
      { id: 5, x: 5, y: 0, width: 25, height: 10, reached: false },
    ];

    platformsRef.current = platforms;
    setTotalHeight(platforms.length * 20);

    // Render platforms
    platforms.forEach((platform) => {
      const platformEl = document.createElement('div');
      platformEl.id = `platform-${platform.id}`;
      platformEl.className =
        'absolute bg-gradient-to-r from-lime-400 to-lime-500 rounded-sm border-2 border-lime-300 shadow-glow-green transition-all';
      platformEl.style.left = `${platform.x}%`;
      platformEl.style.top = `${platform.y}%`;
      platformEl.style.width = `${platform.width}%`;
      platformEl.style.height = `${platform.height}%`;
      platformEl.style.filter = 'drop-shadow(0 0 4px hsl(var(--lime-green)))';

      containerRef.current?.appendChild(platformEl);
    });

    // Scroll-driven jump mechanic
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDelta = currentScroll - lastScrollRef.current;
      lastScrollRef.current = currentScroll;

      if (!playerRef.current) return;

      // Simulate jump based on scroll momentum
      if (scrollDelta > 0 && !isJumpingRef.current) {
        isJumpingRef.current = true;

        const jumpHeight = Math.min(scrollDelta / 5, 30);

        const tl = gsap.timeline({
          onComplete: () => {
            isJumpingRef.current = false;
          },
        });

        tl.to(
          playerRef.current,
          {
            y: -jumpHeight,
            duration: 0.3,
            ease: 'power2.out',
          }
        ).to(
          playerRef.current,
          {
            y: 0,
            duration: 0.3,
            ease: 'bounce.out',
          },
          0.3
        );

        // Check for platform collisions
        checkPlatformCollision(jumpHeight);
      }
    };

    const checkPlatformCollision = (jumpHeight: number) => {
      if (!playerRef.current) return;

      const playerRect = playerRef.current.getBoundingClientRect();

      platforms.forEach((platform) => {
        if (platform.reached) return;

        const platformEl = document.getElementById(`platform-${platform.id}`);
        if (!platformEl) return;

        const platformRect = platformEl.getBoundingClientRect();

        // Simple collision detection
        if (
          playerRect.bottom >= platformRect.top - 5 &&
          playerRect.bottom <= platformRect.top + 15 &&
          playerRect.right >= platformRect.left &&
          playerRect.left <= platformRect.right
        ) {
          platform.reached = true;
          setPlatformsReached((prev) => prev + 1);

          // Celebrate platform reach
          gsap.to(platformEl, {
            scale: 1.2,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
          });

          // Add glow effect
          gsap.to(platformEl, {
            boxShadow: '0 0 20px hsl(var(--lime-green))',
            duration: 0.3,
          });

          // Floating text effect
          const celebration = document.createElement('div');
          celebration.textContent = '✓';
          celebration.className =
            'absolute font-pixel text-lime-400 text-xl font-bold pointer-events-none';
          celebration.style.left = `${platform.x + platform.width / 2}%`;
          celebration.style.top = `${platform.y - 10}%`;

          containerRef.current?.appendChild(celebration);

          gsap.to(celebration, {
            y: -30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
              celebration.remove();
            },
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-80 bg-gradient-to-b from-purple-900/30 to-background border-2 border-lime-green rounded-lg overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Game title */}
      <div className="absolute top-2 left-2 z-20">
        <span className="font-pixel text-[10px] text-lime-400">JUMP PLATFORM</span>
      </div>

      {/* Height tracker */}
      <div className="absolute top-2 right-2 z-20">
        <span className="font-pixel text-[10px] text-lime-400">HEIGHT: {platformsReached}m</span>
      </div>

      {/* Player character */}
      <div
        ref={playerRef}
        className="absolute left-1/2 -translate-x-1/2 bottom-10 z-30 w-8 h-8"
        style={{ willChange: 'transform' }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-radical-red drop-shadow-lg"
          style={{
            filter: 'drop-shadow(0 0 4px hsl(var(--radical-red)))',
          }}
        >
          {/* Player body - simple square */}
          <rect x="25" y="20" width="50" height="50" fill="currentColor" />
          {/* Eyes */}
          <circle cx="40" cy="35" r="5" fill="white" />
          <circle cx="60" cy="35" r="5" fill="white" />
          {/* Pupils */}
          <circle cx="40" cy="37" r="2" fill="black" />
          <circle cx="60" cy="37" r="2" fill="black" />
          {/* Smile */}
          <path
            d="M 40 50 Q 50 58 60 50"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, hsl(var(--lime-green)) 19px, hsl(var(--lime-green)) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, hsl(var(--lime-green)) 19px, hsl(var(--lime-green)) 20px)',
        backgroundSize: '20px 20px',
      }} />

      {/* Cloud decorations - parallax */}
      <div className="absolute top-12 left-5 opacity-20 font-pixel text-[24px] text-cyan-300">☁</div>
      <div className="absolute top-32 right-10 opacity-30 font-pixel text-[32px] text-cyan-300">☁</div>
      <div className="absolute bottom-20 left-1/4 opacity-15 font-pixel text-[28px] text-cyan-300">☁</div>

      {/* Score/Progress info */}
      <div className="absolute bottom-2 left-2 font-pixel text-[8px] text-muted-foreground">
        PLATFORMS REACHED: {platformsReached}/{platformsRef.current.length}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 right-2 font-pixel text-[7px] text-muted-foreground text-right">
        SCROLL TO JUMP!
      </div>
    </div>
  );
};

export default JumpPlatformGame;
