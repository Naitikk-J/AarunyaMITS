import { ReactNode, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface TVFrameProps {
  children: ReactNode;
  className?: string;
}

const Knob = ({ color = "bg-kidcore-yellow", size = "w-8 h-8", label = "" }) => (
  <div className="flex flex-col items-center gap-1">
    <div className={`${size} rounded-full border-4 border-black ${color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative`}>
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-black rounded-full" />
    </div>
    {label && <span className="text-[8px] font-bold text-black uppercase">{label}</span>}
  </div>
);

const VUMeter = ({ label = "VU" }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="w-16 h-10 border-4 border-black bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 border-2 border-black/20 rounded-full" />
      <motion.div 
        animate={{ rotate: [-20, 10, -5, 15, -15] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1 left-1/2 w-0.5 h-8 bg-black origin-bottom -translate-x-1/2" 
      />
      <div className="absolute top-1 right-1 text-[6px] font-bold text-black">{label}</div>
    </div>
  </div>
);

const TVFrame = ({ children, className = "" }: TVFrameProps) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const [isPowered, setIsPowered] = useState(true);
  const [channel, setChannel] = useState(1);
  const [volume, setVolume] = useState(5);

  const handlePowerToggle = () => {
    const newPowered = !isPowered;
    setIsPowered(newPowered);
    
    if (!screenRef.current) return;
    
    if (!newPowered) {
      gsap.to(screenRef.current, {
        scaleY: 0.005,
        scaleX: 1.05,
        duration: 0.2,
        ease: "power4.in",
        onComplete: () => {
          gsap.to(screenRef.current, { scaleX: 0, duration: 0.1 });
        }
      });
    } else {
      gsap.to(screenRef.current, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.4,
        ease: "back.out(2)"
      });
    }
  };

  const handleChannelChange = () => {
    setChannel(prev => (prev % 3) + 1);
    if (!screenRef.current) return;
    gsap.fromTo(screenRef.current, 
      { filter: "brightness(2) contrast(2) saturate(0)" },
      { filter: "brightness(1) contrast(1) saturate(1)", duration: 0.4 }
    );
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Boombox Body */}
      <div className="bg-kidcore-pink border-[10px] border-black rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col gap-4 overflow-hidden">
        
        {/* Top Control Section */}
        <div className="flex items-center justify-between bg-kidcore-pink border-b-[6px] border-black pb-4">
          <div className="flex gap-4 items-end">
            <div className="bg-kidcore-yellow border-4 border-black p-2 flex flex-col items-center">
              <span className="text-[10px] font-bold leading-none">FRIDAY</span>
              <span className="text-xl font-black leading-none">SEP. 18</span>
            </div>
            <div className="flex gap-2">
              <Knob color="bg-kidcore-blue" size="w-6 h-6" />
              <Knob color="bg-kidcore-green" size="w-6 h-6" />
              <Knob color="bg-white" size="w-6 h-6" />
            </div>
          </div>

          <div className="flex gap-3">
            <VUMeter label="L" />
            <VUMeter label="R" />
          </div>

          <div className="bg-kidcore-blue border-4 border-black p-1 px-4 hidden md:block">
             <span className="text-sm font-black text-black">CHEER UP CHARLIES</span>
          </div>
        </div>

        {/* Middle Section: Cassette & More Dials */}
        <div className="flex gap-4 h-24">
           <div className="flex-1 bg-black/10 border-4 border-black rounded-lg relative overflow-hidden p-2 flex gap-2">
              <div className="w-1/3 bg-kidcore-blue/40 border-2 border-black rounded flex items-center justify-center">
                 <div className="w-8 h-8 rounded-full border-4 border-black bg-white/20" />
              </div>
              <div className="flex-1 flex flex-col gap-1 justify-center">
                 <div className="h-2 bg-kidcore-green border-2 border-black" />
                 <div className="h-2 bg-kidcore-yellow border-2 border-black" />
                 <div className="h-2 bg-white border-2 border-black" />
              </div>
           </div>
           <div className="flex gap-2 items-center">
              <Knob color="bg-white" size="w-10 h-10" label="TUNE" />
              <div className="w-12 h-12 rounded-full border-4 border-black bg-black/20 flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-kidcore-green animate-pulse" />
              </div>
           </div>
        </div>

        {/* Screen Area */}
        <div className="relative border-[8px] border-black rounded-xl bg-black overflow-hidden aspect-video shadow-[inset_0_0_40px_rgba(0,0,0,1)]">
          <div 
            ref={screenRef}
            className="w-full h-full relative"
          >
            {/* CRT Effect Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
            
            {/* Content */}
            <div className={`w-full h-full flex items-center justify-center transition-opacity duration-300 ${isPowered ? 'opacity-100' : 'opacity-0'}`}>
              {children}
            </div>
          </div>
        </div>

        {/* Bottom Control Section */}
        <div className="grid grid-cols-12 gap-4 items-center bg-black/5 p-4 border-4 border-black rounded-xl">
           {/* Speaker Grill */}
           <div className="col-span-4 flex flex-col gap-1.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-1 bg-black/40 rounded-full" />
              ))}
           </div>

           {/* Central Controls */}
           <div className="col-span-5 flex justify-center gap-6">
              <div onClick={handlePowerToggle} className="cursor-pointer">
                 <Knob color={isPowered ? "bg-kidcore-green" : "bg-red-500"} size="w-12 h-12" label="PWR" />
              </div>
              <div onClick={handleChannelChange} className="cursor-pointer">
                 <Knob color="bg-kidcore-yellow" size="w-12 h-12" label={`CH ${channel}`} />
              </div>
              <div className="flex flex-col items-center gap-1">
                 <div className="w-12 h-12 border-4 border-black bg-white rounded-lg flex items-center justify-center font-black text-xl">
                    {volume}
                 </div>
                 <span className="text-[8px] font-bold text-black uppercase">VOL</span>
              </div>
           </div>

           {/* Large Dial/Buttons */}
           <div className="col-span-3 flex justify-end gap-2">
              <div className="w-14 h-14 rounded-full border-[6px] border-black bg-kidcore-green shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                 <div className="w-1 h-6 bg-black rotate-45" />
              </div>
           </div>
        </div>
      </div>

      {/* Retro Labels/Stickers */}
      <div className="absolute -top-4 -right-4 bg-kidcore-yellow border-4 border-black px-4 py-1 rotate-12 shadow-lg z-20">
         <span className="text-xs font-black text-black">AARUNYA '26</span>
      </div>
    </div>
  );
};

export default TVFrame;
