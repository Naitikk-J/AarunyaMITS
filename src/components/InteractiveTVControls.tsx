import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface InteractiveTVControlsProps {
  screenRef?: React.RefObject<HTMLDivElement>;
  onPowerToggle?: (isPowered: boolean) => void;
  onChannelChange?: (channel: number) => void;
  onVolumeChange?: (volume: number) => void;
}

export const InteractiveTVControls = ({
  screenRef,
  onPowerToggle,
  onChannelChange,
  onVolumeChange,
}: InteractiveTVControlsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPowered, setIsPowered] = useState(true);
  const [channel, setChannel] = useState(1);
  const [volume, setVolume] = useState(5);
  const [easterEggCounter, setEasterEggCounter] = useState(0);

  // Handle POWER button click with glitch effect
  const handlePowerClick = () => {
    if (!containerRef.current || !screenRef?.current) return;

    const newPowered = !isPowered;
    setIsPowered(newPowered);
    onPowerToggle?.(newPowered);

    if (!newPowered) {
      // Power down effect - screen flicker and fade to black
      const tl = gsap.timeline();
      tl.to(screenRef.current, {
        opacity: 0.1,
        duration: 0.1,
        repeat: 3,
        yoyo: true,
        ease: 'power2.inOut',
      })
        .to(
          screenRef.current,
          {
            opacity: 0,
            duration: 0.3,
          },
          '-=0.1'
        );

      // Mute indicator animation
      animateControlButton('power-btn');
    } else {
      // Power up effect - screen flickers back on
      const tl = gsap.timeline();
      tl.to(screenRef.current, {
        opacity: 1,
        duration: 0.2,
        repeat: 2,
        yoyo: true,
        ease: 'power2.inOut',
      });

      animateControlButton('power-btn');
    }
  };

  // Handle CHANNEL button with noise and distortion
  const handleChannelChange = () => {
    const newChannel = (channel % 3) + 1;
    setChannel(newChannel);
    onChannelChange?.(newChannel);

    if (!screenRef?.current) return;

    // Channel switch glitch effect
    const tl = gsap.timeline();
    tl.to(screenRef.current, {
      opacity: 0,
      duration: 0.05,
    })
      .to(
        screenRef.current,
        {
          opacity: 1,
          duration: 0.05,
        },
        '-=0.03'
      )
      .to(
        screenRef.current,
        {
          opacity: 0,
          duration: 0.05,
        },
        '-=0.03'
      )
      .to(
        screenRef.current,
        {
          opacity: 1,
          duration: 0.05,
        },
        '-=0.03'
      );

    // Apply color palette shift based on channel
    const palettes = [
      'hsl(var(--neon-magenta))',
      'hsl(var(--cyber-blue))',
      'hsl(var(--electric-yellow))',
    ];
    gsap.to(screenRef.current, {
      filter: `hue-rotate(${newChannel * 120}deg)`,
      duration: 0.3,
    });

    animateControlButton('channel-btn');

    // Easter egg: channel 2 held for 3 seconds
    setEasterEggCounter((prev) => prev + 1);
    if (easterEggCounter === 2) {
      triggerEasterEgg();
      setEasterEggCounter(0);
    }
  };

  // Handle VOLUME button with screen shake
  const handleVolumeUp = () => {
    const newVolume = Math.min(volume + 1, 10);
    setVolume(newVolume);
    onVolumeChange?.(newVolume);

    if (!screenRef?.current) return;

    // Volume up - screen shake intensity proportional to volume
    const intensity = (newVolume / 10) * 2;
    gsap.to(screenRef.current, {
      x: () => gsap.utils.random(-intensity, intensity),
      duration: 0.1,
      repeat: 3,
      yoyo: true,
      ease: 'power2.inOut',
    });

    animateControlButton('volume-btn');
  };

  const handleVolumeDown = () => {
    const newVolume = Math.max(volume - 1, 0);
    setVolume(newVolume);
    onVolumeChange?.(newVolume);

    if (!screenRef?.current) return;

    const intensity = (newVolume / 10) * 2;
    gsap.to(screenRef.current, {
      x: () => gsap.utils.random(-intensity, intensity),
      duration: 0.1,
      repeat: 2,
      yoyo: true,
      ease: 'power2.inOut',
    });

    animateControlButton('volume-btn');
  };

  // Animate button press
  const animateControlButton = (btnId: string) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    gsap.to(btn, {
      scale: 0.85,
      duration: 0.1,
    })
      .to(
        btn,
        {
          scale: 1,
          duration: 0.1,
        },
        '-=0.05'
      );
  };

  // Easter egg trigger
  const triggerEasterEgg = () => {
    if (!screenRef?.current) return;

    const tl = gsap.timeline();
    // Rainbow hue cycle
    tl.to(screenRef.current, {
      filter: 'hue-rotate(360deg)',
      duration: 1,
      ease: 'power2.inOut',
    });

    // Create floating pixel text
    const easterEggText = document.createElement('div');
    easterEggText.textContent = '✨ SECRET FOUND ✨';
    easterEggText.className = 'font-pixel text-2xl text-electric-yellow animate-pulse absolute z-50';
    easterEggText.style.pointerEvents = 'none';
    screenRef.current.appendChild(easterEggText);

    gsap.to(easterEggText, {
      y: -100,
      opacity: 0,
      duration: 2,
      ease: 'power2.out',
      onComplete: () => {
        easterEggText.remove();
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-1/4 flex flex-col gap-6 translate-x-16 z-20"
    >
      {/* POWER Button */}
      <div className="flex flex-col items-center gap-2">
        <button
          id="power-btn"
          onClick={handlePowerClick}
          className={`
            w-12 h-12 rounded-full border-4 transition-all cursor-pointer
            font-pixel text-[10px] font-bold flex items-center justify-center
            ${
              isPowered
                ? 'border-lime-green bg-lime-green/20 text-lime-green shadow-glow-green'
                : 'border-gray-600 bg-gray-900/40 text-gray-600'
            }
            hover:scale-110 active:scale-95
          `}
          title="POWER: Click to toggle"
        >
          ⏻
        </button>
        <span className="font-pixel text-[7px] text-muted-foreground whitespace-nowrap">
          POWER
        </span>
      </div>

      {/* CHANNEL Button */}
      <div className="flex flex-col items-center gap-2">
        <button
          id="channel-btn"
          onClick={handleChannelChange}
          className={`
            w-12 h-12 rounded-full border-4 border-cyber-blue bg-cyber-blue/20
            font-pixel text-sm font-bold flex items-center justify-center
            text-cyber-blue shadow-glow-blue
            hover:scale-110 active:scale-95 transition-all cursor-pointer
          `}
          title="CHANNEL: Click to change channel"
        >
          {channel}
        </button>
        <span className="font-pixel text-[7px] text-muted-foreground">CH</span>
      </div>

      {/* VOLUME Control */}
      <div className="flex flex-col items-center gap-2">
        {/* Volume Up */}
        <button
          id="volume-btn"
          onClick={handleVolumeUp}
          className={`
            w-10 h-10 rounded-full border-3 border-electric-yellow bg-electric-yellow/20
            font-pixel text-lg font-bold flex items-center justify-center
            text-electric-yellow shadow-glow-yellow
            hover:scale-105 active:scale-90 transition-all cursor-pointer
          `}
          title="VOLUME UP"
        >
          +
        </button>

        {/* Volume Display */}
        <div className="flex items-center justify-center w-10 h-6 border-2 border-electric-yellow/50 rounded bg-background/40 font-pixel text-[7px] text-electric-yellow">
          {volume}
        </div>

        {/* Volume Down */}
        <button
          onClick={handleVolumeDown}
          className={`
            w-10 h-10 rounded-full border-3 border-radical-red bg-radical-red/20
            font-pixel text-lg font-bold flex items-center justify-center
            text-radical-red shadow-glow-red
            hover:scale-105 active:scale-90 transition-all cursor-pointer
          `}
          title="VOLUME DOWN"
        >
          −
        </button>

        <span className="font-pixel text-[7px] text-muted-foreground">VOL</span>
      </div>
    </div>
  );
};

export default InteractiveTVControls;
