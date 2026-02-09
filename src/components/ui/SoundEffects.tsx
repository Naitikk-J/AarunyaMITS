import { useEffect, useRef, useState } from 'react';

interface SoundEffect {
  name: string;
  src: string;
  volume?: number;
  loop?: boolean;
}

interface UseSoundEffectsReturn {
  playSound: (soundName: string) => void;
  stopSound: (soundName: string) => void;
  toggleSound: (soundName: string) => void;
  isPlaying: (soundName: string) => boolean;
  setVolume: (soundName: string, volume: number) => void;
  muteAll: () => void;
  unmuteAll: () => void;
}

export const useSoundEffects = (sounds: SoundEffect[]): UseSoundEffectsReturn => {
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const [playingSounds, setPlayingSounds] = useState<Set<string>>(new Set());
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // Preload all sounds
    sounds.forEach(sound => {
      const audio = new Audio(sound.src);
      audio.volume = sound.volume ?? 0.5;
      audio.loop = sound.loop ?? false;
      audio.preload = 'auto';
      audioRefs.current.set(sound.name, audio);
    });

    // Request audio context permission on first user interaction
    const handleFirstInteraction = () => {
      // Try to play a silent audio to unlock audio context
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (context.state === 'suspended') {
        context.resume();
      }
      
      // Try to play a silent sound to unlock audio on mobile
      const silentAudio = new Audio();
      silentAudio.volume = 0;
      silentAudio.play().catch(() => {});
      
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      // Clean up all audio elements
      audioRefs.current.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [sounds]);

  const playSound = (soundName: string) => {
    if (muted) return;
    
    const audio = audioRefs.current.get(soundName);
    if (audio) {
      // Try to resume audio context if suspended
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (context.state === 'suspended') {
        context.resume();
      }
      
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.warn(`Failed to play sound ${soundName}:`, error);
        // Try to unlock audio on mobile devices
        if (error.name === 'NotAllowedError' || error.name === 'NotSupportedError') {
          // Create a new audio context and try to resume it
          const newContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          newContext.resume().then(() => {
            audio.play().catch(err => console.warn('Still failed to play sound:', err));
          });
        }
      });
      setPlayingSounds(prev => new Set([...prev, soundName]));
    }
  };

  const stopSound = (soundName: string) => {
    const audio = audioRefs.current.get(soundName);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setPlayingSounds(prev => {
        const newSet = new Set(prev);
        newSet.delete(soundName);
        return newSet;
      });
    }
  };

  const toggleSound = (soundName: string) => {
    if (isPlaying(soundName)) {
      stopSound(soundName);
    } else {
      playSound(soundName);
    }
  };

  const isPlaying = (soundName: string): boolean => {
    return playingSounds.has(soundName);
  };

  const setVolume = (soundName: string, volume: number) => {
    const audio = audioRefs.current.get(soundName);
    if (audio) {
      audio.volume = Math.max(0, Math.min(1, volume));
    }
  };

  const muteAll = () => {
    setMuted(true);
    audioRefs.current.forEach(audio => {
      audio.muted = true;
    });
  };

  const unmuteAll = () => {
    setMuted(false);
    audioRefs.current.forEach(audio => {
      audio.muted = false;
    });
  };

  return {
    playSound,
    stopSound,
    toggleSound,
    isPlaying,
    setVolume,
    muteAll,
    unmuteAll
  };
};

// Kidcore sound effects configuration
export const KIDCORE_SOUNDS = {
  click: { name: 'click', src: '/sounds/click.wav', volume: 0.3 },
  hover: { name: 'hover', src: '/sounds/hover.wav', volume: 0.2 },
  powerOn: { name: 'powerOn', src: '/sounds/power-on.wav', volume: 0.4 },
  powerOff: { name: 'powerOff', src: '/sounds/power-off.wav', volume: 0.4 },
  channelChange: { name: 'channelChange', src: '/sounds/channel-change.wav', volume: 0.3 },
  volumeUp: { name: 'volumeUp', src: '/sounds/volume-up.wav', volume: 0.3 },
  volumeDown: { name: 'volumeDown', src: '/sounds/volume-down.wav', volume: 0.3 },
  tvStatic: { name: 'tvStatic', src: '/sounds/tv-static.wav', volume: 0.2, loop: true },
  easterEgg: { name: 'easterEgg', src: '/sounds/easter-egg.wav', volume: 0.5 },
  buttonPress: { name: 'buttonPress', src: '/sounds/button-press.wav', volume: 0.3 },
  retroBeep: { name: 'retroBeep', src: '/sounds/retro-beep.wav', volume: 0.3 },
  pixelPop: { name: 'pixelPop', src: '/sounds/pixel-pop.wav', volume: 0.3 },
  gameStart: { name: 'gameStart', src: '/sounds/game-start.wav', volume: 0.4 },
  success: { name: 'success', src: '/sounds/success.wav', volume: 0.4 },
  error: { name: 'error', src: '/sounds/error.wav', volume: 0.3 }
};

// Hook for easy access to kidcore sounds
export const useKidcoreSounds = () => {
  return useSoundEffects(Object.values(KIDCORE_SOUNDS));
};

// Component for sound effects management
export const SoundEffectsProvider = ({ children }: { children: React.ReactNode }) => {
  const sounds = useKidcoreSounds();
  
  // Expose sounds to window for easy access in other components
  useEffect(() => {
    (window as any).__SOUND_EFFECTS__ = sounds;
    
    // Add global click handler to unlock audio on mobile
    const unlockAudio = () => {
      // Try to resume any suspended audio contexts
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (context.state === 'suspended') {
        context.resume();
      }
      
      // Try to play a silent sound to unlock audio
      const silentAudio = new Audio();
      silentAudio.volume = 0;
      silentAudio.play().catch(() => {});
      
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
    
    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);
    
    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
  }, [sounds]);

  return <>{children}</>;
};

// Utility function to play sounds easily
export const playSound = (soundName: string) => {
  const sounds = (window as any).__SOUND_EFFECTS__;
  if (sounds) {
    sounds.playSound(soundName);
  }
};

// Utility function to stop sounds easily
export const stopSound = (soundName: string) => {
  const sounds = (window as any).__SOUND_EFFECTS__;
  if (sounds) {
    sounds.stopSound(soundName);
  }
};