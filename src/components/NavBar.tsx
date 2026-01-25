import { useState } from "react";
import { RetroButton } from "./ui/retro-button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["EVENTS", "TIMELINE", "GALLERY", "CONTACT"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-kidcore-cream/90 backdrop-blur-sm border-b-4 border-kidcore-blue shadow-[0_4px_0px_var(--kidcore-pink)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img 
            src="/aarunya-logo.svg" 
            alt="Aarunya" 
            className="w-10 h-10 pixelated"
            style={{ 
              filter: "drop-shadow(2px 2px 0px var(--kidcore-blue))",
            }}
          />
          <span className="font-press-start text-[10px] text-kidcore-black hidden sm:block tracking-wider">
            AARUNYA
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
            >
              <RetroButton variant="white" className="w-24 text-[8px] font-pixel">
                {link}
              </RetroButton>
            </a>
          ))}
          <RetroButton variant="default" className="w-28 text-[10px] font-pixel ml-4">
            REGISTER
          </RetroButton>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
           <button 
            onClick={() => setIsOpen(!isOpen)}
            className="kidcore-btn p-2 w-10 h-10 flex items-center justify-center"
           >
             {isOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-kidcore-cream border-b-4 border-kidcore-blue p-6 md:hidden flex flex-col gap-4 shadow-[0_10px_0px_var(--kidcore-pink)]"
          >
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
              >
                <RetroButton variant="white" className="w-full text-xs font-pixel">
                  {link}
                </RetroButton>
              </a>
            ))}
            <RetroButton variant="default" className="w-full text-xs font-pixel mt-2">
              REGISTER NOW
            </RetroButton>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
