import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Coin {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}

export const CoinCollectorGame = ({ isActive = true }: { isActive?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const coinsRef = useRef<Coin[]>([]);
  const [score, setScore] = useState(0);
  const [collectedCoins, setCollectedCoins] = useState<Set<number>>(new Set());
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Initialize coins scattered across the screen
    const coins: Coin[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      collected: false,
    }));
    coinsRef.current = coins;

    // Track scroll progress
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(
          1,
          1 - rect.top / (window.innerHeight * 1.5)
        )
      );
      scrollProgressRef.current = progress;

      // Animate coins towards score counter based on scroll progress
      coins.forEach((coin) => {
        if (coin.collected) return;

        const coinElement = document.getElementById(`coin-${coin.id}`);
        if (!coinElement) return;

        // Random collection probability based on scroll progress
        if (Math.random() < progress * 0.05 && !collectedCoins.has(coin.id)) {
          coin.collected = true;
          setCollectedCoins((prev) => new Set([...prev, coin.id]));
          setScore((prev) => prev + 10);

          // Animate coin to counter
          gsap.to(coinElement, {
            left: '85%',
            top: '-20px',
            opacity: 0,
            duration: 0.6,
            ease: 'back.in',
            onComplete: () => {
              coinElement.style.display = 'none';
            },
          });

          // Trigger coin collection sound effect in triggerCoinSound
          triggerCoinCollectionEffect(coinElement);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Render coins
    coins.forEach((coin) => {
      const existingCoin = document.getElementById(`coin-${coin.id}`);
      if (!existingCoin && containerRef.current) {
        const coinEl = document.createElement('div');
        coinEl.id = `coin-${coin.id}`;
        coinEl.className = 'absolute w-6 h-6 font-pixel text-center transition-all cursor-grab active:cursor-grabbing';
        coinEl.style.left = `${coin.x}%`;
        coinEl.style.top = `${coin.y}%`;
        coinEl.style.transform = 'translate(-50%, -50%)';
        coinEl.innerHTML = `
          <div class="relative w-full h-full">
            <div class="absolute inset-0 rounded-full border-2 border-yellow-400 animate-spin bg-gradient-to-r from-yellow-300 to-yellow-500" style="animation-duration: 2s;"></div>
            <div class="absolute inset-1 rounded-full border border-yellow-300 opacity-50"></div>
            <span class="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-yellow-300 drop-shadow-lg" style="filter: drop-shadow(0 0 2px hsl(var(--electric-yellow)))">$</span>
          </div>
        `;

        // Add hover effect
        coinEl.addEventListener('mouseenter', () => {
          gsap.to(coinEl, {
            scale: 1.3,
            duration: 0.2,
          });
        });

        coinEl.addEventListener('mouseleave', () => {
          gsap.to(coinEl, {
            scale: 1,
            duration: 0.2,
          });
        });

        containerRef.current.appendChild(coinEl);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isActive, collectedCoins]);

  const triggerCoinCollectionEffect = (element: Element) => {
    // Pulse animation for visual feedback
    gsap.to(element, {
      scale: 1.5,
      opacity: 1,
      duration: 0.1,
    });

    // Create floating text "COIN!"
    const floatingText = document.createElement('div');
    floatingText.textContent = '+10';
    floatingText.className =
      'absolute font-pixel text-yellow-300 text-sm font-bold pointer-events-none';
    floatingText.style.left = element.getAttribute('style') || '0';
    floatingText.style.top = element.getAttribute('style') || '0';

    if (containerRef.current) {
      containerRef.current.appendChild(floatingText);

      gsap.to(floatingText, {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          floatingText.remove();
        },
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 bg-gradient-to-br from-yellow-900/20 to-background border-2 border-electric-yellow rounded-lg overflow-hidden"
    >
      {/* Game title */}
      <div className="absolute top-2 left-2 z-10">
        <span className="font-pixel text-[10px] text-yellow-300">COIN COLLECTOR</span>
      </div>

      {/* Game board grid */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 23px, hsl(var(--electric-yellow)) 23px, hsl(var(--electric-yellow)) 24px), repeating-linear-gradient(90deg, transparent, transparent 23px, hsl(var(--electric-yellow)) 23px, hsl(var(--electric-yellow)) 24px)',
        backgroundSize: '24px 24px',
      }} />

      {/* Score counter */}
      <div
        ref={scoreRef}
        className="absolute top-2 right-2 z-20 font-pixel text-sm text-electric-yellow bg-background/60 px-3 py-1 rounded border border-electric-yellow/50"
        style={{
          textShadow: '0 0 8px hsl(var(--electric-yellow))',
        }}
      >
        COINS: {score}
      </div>

      {/* Collected coins percentage */}
      <div className="absolute bottom-2 left-2 z-10 font-pixel text-[8px] text-muted-foreground">
        COLLECTED: {collectedCoins.size}/{coinsRef.current.length}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-2 right-2 z-10 w-32 h-3 border-2 border-electric-yellow/50 rounded bg-background/40">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all"
          style={{
            width: `${(collectedCoins.size / (coinsRef.current.length || 1)) * 100}%`,
          }}
        />
      </div>

      {/* Help text */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-pixel text-[7px] text-muted-foreground text-center">
        SCROLL TO COLLECT COINS!
      </div>

      {/* Coin elements will be rendered here dynamically */}
    </div>
  );
};

export default CoinCollectorGame;
