import AarunyaLogo from "@/assets/aarunya-logo.svg";
import { RetroButton } from "./ui/retro-button";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-crt-black/90 backdrop-blur-sm border-b-4 border-cyber-blue">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img 
            src={AarunyaLogo} 
            alt="Aarunya" 
            className="w-8 h-8"
            style={{ 
              filter: "drop-shadow(0 0 5px hsl(var(--neon-magenta)))",
              imageRendering: 'pixelated',
            }}
          />
          <span className="font-pixel text-[10px] text-electric-yellow hidden sm:block glow-yellow tracking-wider">
            AARUNYA
          </span>
        </a>

        {/* Nav Links - Retro Style */}
        <div className="hidden md:flex items-center gap-2">
          {["EVENTS", "TIMELINE", "GALLERY", "CONTACT"].map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
            >
              <RetroButton variant="darkGray" className="w-24 text-[8px] font-pixel">
                {link}
              </RetroButton>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <RetroButton variant="default" className="w-28 text-[10px] font-pixel">
          REGISTER
        </RetroButton>
      </div>
    </nav>
  );
};

export default NavBar;
