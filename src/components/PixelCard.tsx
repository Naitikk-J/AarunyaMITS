import { ReactNode, CSSProperties } from "react";

interface PixelCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "accent";
  style?: CSSProperties;
}

const variantStyles = {
  default: "bg-card border-muted",
  primary: "bg-radical-red/20 border-radical-red",
  secondary: "bg-cyber-blue/20 border-cyber-blue",
  accent: "bg-neon-magenta/20 border-neon-magenta",
};

const PixelCard = ({ children, className = "", variant = "default", style }: PixelCardProps) => {
  return (
    <div 
      className={`
        relative p-6
        border-4
        ${variantStyles[variant]}
        shadow-[8px_8px_0_0_hsl(var(--crt-black))]
        transition-all duration-200
        hover:translate-x-[-2px] hover:translate-y-[-2px]
        hover:shadow-[10px_10px_0_0_hsl(var(--crt-black))]
        ${className}
      `}
      style={{ imageRendering: 'pixelated', ...style }}
    >
      {/* Pixel corner decorations */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-electric-yellow" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-lime-green" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-neon-magenta" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyber-blue" />
      
      {children}
    </div>
  );
};

export default PixelCard;
