import { useState, useEffect } from 'react';
import gsap from 'gsap';

interface DialogueStep {
  text: string;
  speaker?: string;
}

interface PixelDialogueProps {
  steps: DialogueStep[];
  onComplete?: () => void;
  isVisible?: boolean;
}

export const PixelDialogue = ({ steps, onComplete, isVisible = true }: PixelDialogueProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isVisible || currentStep >= steps.length) return;

    const text = steps[currentStep].text;
    setDisplayedText('');
    setIsTyping(true);

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentStep, steps, isVisible]);

  const handleNext = () => {
    if (isTyping) {
      setDisplayedText(steps[currentStep].text);
      setIsTyping(false);
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete?.();
    }
  };

  if (!isVisible || currentStep >= steps.length) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90vw] max-w-2xl">
      <div 
        className="relative bg-background border-4 border-primary p-6 rounded-sm shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] cursor-pointer"
        onClick={handleNext}
      >
        {/* Speaker Name Tag */}
        {steps[currentStep].speaker && (
          <div className="absolute -top-4 left-4 bg-primary px-3 py-1 font-pixel text-[10px] text-primary-foreground border-2 border-primary">
            {steps[currentStep].speaker}
          </div>
        )}

        {/* Dialogue Text */}
        <p className="font-pixel text-sm md:text-base text-foreground leading-relaxed min-h-[3em]">
          {displayedText}
          <span className={`inline-block w-2 h-4 bg-primary ml-1 ${isTyping ? 'animate-pulse' : 'hidden'}`} />
        </p>

        {/* Advance Indicator */}
        {!isTyping && (
          <div className="absolute bottom-2 right-4 animate-bounce text-primary font-bold text-xl">
            ▼
          </div>
        )}
        
        {/* Help Text */}
        <div className="absolute -bottom-6 left-0 right-0 text-center">
          <span className="font-pixel text-[8px] text-muted-foreground uppercase tracking-widest">
            {isTyping ? 'Click to skip' : 'Click to continue'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PixelDialogue;
