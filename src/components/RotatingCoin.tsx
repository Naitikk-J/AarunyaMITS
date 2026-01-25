import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function RotatingCoin({ className = "" }: { className?: string }) {
  return (
    <Link to="/register" className={`group relative block w-20 h-20 md:w-24 md:h-24 perspective-1000 ${className}`}>
      <motion.div
        className="relative w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center rounded-full bg-kidcore-yellow border-[3px] border-kidcore-blue shadow-[3px_3px_0px_var(--kidcore-pink)] overflow-hidden">
          <div className="absolute inset-1 border border-dashed border-kidcore-blue rounded-full" />
          <div className="p-2 text-center z-10">
            <span className="font-press-start text-[5px] md:text-[6px] leading-tight text-kidcore-black block">
              AARUNYA 2026
            </span>
            <span className="font-pixel text-[7px] md:text-[8px] text-kidcore-pink block mt-0.5 uppercase">
              MITS GWALIOR
            </span>
            <div className="mt-1 font-pixel text-[8px] bg-kidcore-blue text-white px-1 py-0.5 rounded border border-kidcore-black">
              REGISTER
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center rounded-full bg-kidcore-yellow border-[3px] border-kidcore-blue shadow-[3px_3px_0px_var(--kidcore-pink)] rotate-y-180 overflow-hidden">
          <div className="absolute inset-1 border border-dashed border-kidcore-blue rounded-full" />
          <div className="p-2 text-center z-10">
            <span className="font-press-start text-[5px] md:text-[6px] leading-tight text-kidcore-black block">
              AARUNYA 2026
            </span>
            <span className="font-pixel text-[7px] md:text-[8px] text-kidcore-pink block mt-0.5 uppercase">
              MITS GWALIOR
            </span>
            <div className="mt-1 font-pixel text-[8px] bg-kidcore-blue text-white px-1 py-0.5 rounded border border-kidcore-black">
              REGISTER
            </div>
          </div>
        </div>

        {/* Edge of the coin */}
        <div className="absolute inset-0 rounded-full bg-kidcore-orange -z-10 blur-[0.5px] transform translate-z-[-1px]" />
      </motion.div>
      
      {/* Floating Sparkles (Pixel Style) */}
      <motion.div 
        className="absolute -top-2 -right-2 w-4 h-4 bg-white pixelated opacity-80"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      />
      <motion.div 
        className="absolute -bottom-2 -left-2 w-3 h-3 bg-kidcore-blue pixelated opacity-80"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      />
    </Link>
  );
}
