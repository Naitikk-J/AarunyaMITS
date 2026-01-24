import { useState, useEffect } from 'react';
import gsap from 'gsap';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface AchievementBadgeProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementBadge = ({ achievement, onClose }: AchievementBadgeProps) => {
  useEffect(() => {
    if (!achievement) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div className="fixed top-24 right-8 z-[100] animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="bg-background border-4 border-accent p-4 rounded-sm shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] flex items-center gap-4 max-w-xs">
        <div className="w-12 h-12 bg-accent/20 border-2 border-accent flex items-center justify-center font-pixel text-2xl text-accent">
          {achievement.icon || '🏆'}
        </div>
        <div>
          <h4 className="font-pixel text-[10px] text-accent uppercase tracking-widest mb-1">Achievement Unlocked!</h4>
          <h3 className="font-pixel text-sm text-foreground">{achievement.title}</h3>
          <p className="font-pixel text-[8px] text-muted-foreground mt-1">{achievement.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;
