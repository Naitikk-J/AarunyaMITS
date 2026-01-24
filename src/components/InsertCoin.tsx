import { useEffect, useState } from "react";

interface InsertCoinProps {
  onClick?: () => void;
}

const InsertCoin = ({ onClick }: InsertCoinProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="flex flex-col items-center justify-center gap-4 cursor-pointer group select-none"
      onClick={onClick}
    >
      <div className="relative">
        <p
          className={`font-pixel text-electric-yellow text-lg md:text-2xl tracking-wider transition-all duration-100 group-hover:scale-110 group-active:scale-95 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            textShadow:
              "0 0 10px hsl(61 100% 60% / 0.8), 0 0 20px hsl(61 100% 60% / 0.5), 0 0 30px hsl(61 100% 60% / 0.3)",
          }}
        >
          INSERT COIN
        </p>
        <div className="absolute inset-0 bg-electric-yellow/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </div>
      <p className="font-pixel text-foreground/60 text-xs md:text-sm group-hover:text-foreground transition-colors">
        CLICK OR SCROLL TO START
      </p>
    </div>
  );
};

export default InsertCoin;
