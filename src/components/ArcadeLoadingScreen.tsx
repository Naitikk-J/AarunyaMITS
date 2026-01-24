import { useState, useEffect } from 'react';
import gsap from 'gsap';

interface ArcadeLoadingScreenProps {
  isVisible: boolean;
  duration?: number;
  levelName?: string;
  onComplete?: () => void;
}

export const ArcadeLoadingScreen = ({
  isVisible,
  duration = 2,
  levelName = 'LEVEL',
  onComplete,
}: ArcadeLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / (duration * 1000)) * 100, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isVisible, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-sm">
      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
          animation: 'scan 8s linear infinite',
        }}
      />

      {/* Main container */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8">
        {/* Rotating pixel shapes */}
        <div className="flex gap-4 mb-4">
          {/* Spinning diamond */}
          <div
            className="w-12 h-12 border-4 border-primary opacity-75"
            style={{
              clip: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              animation: 'spin 2s linear infinite',
            }}
          />

          {/* Pulsing star */}
          <div
            className="w-12 h-12 flex items-center justify-center font-pixel text-4xl text-secondary animate-pulse"
            style={{
              textShadow: '0 0 10px hsl(var(--secondary))',
            }}
          >
            ✨
          </div>

          {/* Spinning diamond (opposite direction) */}
          <div
            className="w-12 h-12 border-4 border-accent opacity-75"
            style={{
              clip: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              animation: 'spin 2s linear infinite reverse',
            }}
          />
        </div>

        {/* Loading text with typing effect */}
        <div className="text-center">
          <h1 className="font-pixel text-4xl text-primary mb-4 tracking-widest" style={{
            textShadow: '0 0 20px hsl(var(--primary))',
            animation: 'flicker 0.1s infinite',
          }}>
            LOADING...
          </h1>
          <p className="font-pixel text-sm text-secondary tracking-wider" style={{
            opacity: 0.8,
          }}>
            {levelName}
          </p>
        </div>

        {/* Animated progress bar */}
        <div className="w-64 space-y-2">
          <div className="relative h-6 border-4 border-primary bg-background/40 rounded-sm overflow-hidden">
            {/* Progress fill with animation */}
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 10px hsl(var(--primary)), inset 0 0 10px hsl(var(--primary))',
              }}
            />

            {/* Scan line effect on progress bar */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)',
                animation: 'pulse 1s ease-in-out infinite',
              }}
            />
          </div>

          {/* Percentage text */}
          <div className="text-center font-pixel text-sm text-primary tracking-wider">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Arcade button indicators */}
        <div className="flex gap-3 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full border border-secondary ${
                i < Math.floor((progress / 100) * 5) ? 'bg-secondary' : 'bg-background'
              }`}
              style={{
                boxShadow: i < Math.floor((progress / 100) * 5) ? '0 0 8px hsl(var(--secondary))' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Retro flavor text - changes during load */}
        <div className="mt-8 text-center">
          <p className="font-pixel text-[10px] text-muted-foreground tracking-wide mb-2 h-4">
            {progress < 25 && 'INSERT COIN...'}
            {progress >= 25 && progress < 50 && 'CHARGING ARCADE...'}
            {progress >= 50 && progress < 75 && 'INITIALIZING NEON...'}
            {progress >= 75 && 'GET READY!'}
          </p>
        </div>

        {/* Bottom corner decorations */}
        <div className="absolute bottom-8 left-8 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent" />
        <div className="absolute bottom-8 left-8 w-0.5 h-12 bg-gradient-to-t from-primary to-transparent" />
        <div className="absolute bottom-8 right-8 w-12 h-0.5 bg-gradient-to-l from-secondary to-transparent" />
        <div className="absolute bottom-8 right-8 w-0.5 h-12 bg-gradient-to-t from-secondary to-transparent" />
      </div>

      {/* Styles for animations */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes flicker {
          0%, 100% {
            opacity: 1;
            text-shadow: 0 0 20px hsl(var(--primary));
          }
          50% {
            opacity: 0.95;
            text-shadow: 0 0 25px hsl(var(--primary));
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default ArcadeLoadingScreen;
