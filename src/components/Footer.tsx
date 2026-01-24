import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PixelButton from "./PixelButton";
import { PixelStar, PixelHeart, PixelDivider } from "./PixelDecorations";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-item", 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "top 40%",
            toggleActions: "play reverse play reverse"
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative py-16 px-4 overflow-hidden" id="contact">
      {/* Rainbow pixel border */}
      <PixelDivider className="absolute top-0 left-0 right-0" />

      {/* Decorations */}
      <PixelStar className="absolute top-20 left-10 w-6 h-6 opacity-30" />
      <PixelHeart className="absolute bottom-20 right-10 w-6 h-6 opacity-30" />

        <div className="max-w-6xl mx-auto">
          <div
            className="footer-item relative p-1"
            style={{
              background: 'linear-gradient(90deg, hsl(var(--radical-red)), hsl(var(--electric-yellow)), hsl(var(--lime-green)), hsl(var(--cyber-blue)), hsl(var(--neon-magenta)))',
            }}
          >
            <div className="bg-crt-black p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Logo & Info */}
                <div className="footer-item text-center md:text-left">
                  <img
                    src="/aarunya-logo.svg"
                    alt="Aarunya 2026"
                    className="w-24 mb-4 mx-auto md:mx-0"
                    style={{
                      filter: "drop-shadow(0 0 10px hsl(var(--neon-magenta)))",
                      imageRendering: 'pixelated',
                    }}
                  />
                  <p className="font-pixel text-xs text-electric-yellow mb-2 tracking-wider">
                    MITS GWALIOR
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Annual Cultural Festival 2026
                  </p>
                </div>

                  {/* Quick Links */}
                  <div className="footer-item grid grid-cols-2 gap-x-8 gap-y-3 text-center md:text-left">
                    {["EVENTS", "SCHEDULE", "SPONSORS", "HISTORY", "ABOUT", "CONTACT"].map((link) => (
                      <a 
                        key={link}
                        href={link === "CONTACT" ? "/contact" : link === "ABOUT" ? "/about" : link === "HISTORY" ? "/history" : link === "SPONSORS" ? "/sponsors" : link === "SCHEDULE" ? "/schedule" : "/events"}
                        className="font-pixel text-[8px] text-foreground hover:text-electric-yellow transition-colors tracking-wider"
                      >
                        &gt; {link}
                      </a>
                    ))}
                  </div>

                  {/* Social & CTA */}
                  <div className="footer-item flex flex-col items-center gap-4">
                    <div className="font-pixel text-[10px] text-electric-yellow animate-pulse tracking-widest">
                      STAY CONNECTED
                    </div>
                    <div className="flex gap-3">
                      {[
                        { icon: "📷", label: "Instagram" },
                        { icon: "🐦", label: "Twitter" },
                        { icon: "📘", label: "Facebook" },
                        { icon: "📺", label: "YouTube" },
                      ].map((social) => (
                        <a 
                          key={social.label}
                          href="#" 
                          className="w-10 h-10 border-4 border-crt-black bg-card flex items-center justify-center text-lg shadow-[3px_3px_0_0_hsl(var(--crt-black))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_hsl(var(--crt-black))] transition-all"
                          title={social.label}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
              </div>

              {/* Bottom bar */}
              <div className="footer-item mt-8 pt-6 border-t-4 border-muted flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="font-pixel text-[8px] text-muted-foreground tracking-wider">
                  © 2026 AARUNYA | MITS GWALIOR
                </p>
                <div className="flex items-center gap-3">
                  <span className="font-pixel text-[8px] text-muted-foreground">
                    PLAYER 1 READY
                  </span>
                  <div className="w-3 h-3 bg-lime-green animate-pulse" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[8px] text-electric-yellow">
                    HIGH SCORE:
                  </span>
                  <span className="font-pixel text-[10px] text-electric-yellow glow-yellow">
                    999999
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Credits */}
          <div className="footer-item mt-6 text-center">
            <p className="font-pixel text-[8px] text-muted-foreground tracking-widest">
              PRESS START TO CONTINUE
            </p>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
