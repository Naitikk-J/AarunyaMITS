import { useState } from "react";
import AarunyaLogo from "@/assets/aarunya-logo.svg";
import PixelButton from "./PixelButton";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "EVENTS", href: "#events" },
    { name: "TIMELINE", href: "#timeline" },
    { name: "GALLERY", href: "#gallery" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-crt-black/90 backdrop-blur-sm border-b-4 border-cyber-blue">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img 
            src={AarunyaLogo} 
            alt="Aarunya" 
            className="w-8 h-8"
            style={{ 
              filter: "drop-shadow(0 0 5px hsl(var(--neon-magenta)))",
              imageRendering: 'pixelated',
            }}
          />
          <span className="font-pixel text-[10px] text-electric-yellow hidden xs:block glow-yellow tracking-wider">
            AARUNYA
          </span>
        </a>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="font-pixel text-[8px] text-foreground px-4 py-2 border-2 border-transparent hover:border-electric-yellow hover:bg-electric-yellow/10 transition-all tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* CTA Button */}
          <div className="hidden sm:block">
            <PixelButton variant="primary" size="sm">
              REGISTER
            </PixelButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-electric-yellow p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-crt-black/95 border-b-4 border-cyber-blue p-4 flex flex-col gap-2 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="font-pixel text-[10px] text-foreground p-3 border-2 border-transparent hover:border-electric-yellow hover:bg-electric-yellow/10 transition-all tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 sm:hidden">
            <PixelButton variant="primary" size="sm" className="w-full">
              REGISTER
            </PixelButton>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
