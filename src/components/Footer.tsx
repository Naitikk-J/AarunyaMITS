import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".footer-item", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative py-16 px-4 overflow-hidden" id="contact">
      {/* VHS Filter Overlay */}
      <div className="vhs-filter absolute inset-0 opacity-20 pointer-events-none" />

      {/* Floating Sticker Decorations */}
      <div className="floating-sticker absolute top-20 left-10 text-4xl select-none">🎨</div>
      <div className="floating-sticker absolute bottom-20 right-10 text-4xl select-none">⚡</div>
      <div className="floating-sticker absolute top-40 right-20 text-3xl select-none animate-float">💥</div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="footer-item glass-card p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  {/* Logo & Info */}
                  <div className="footer-item text-center md:text-left">
                    <div className="glitch-trigger mb-4">
                      <img
                        src="/aarunya-logo.svg"
                        alt="Aarunya 2026"
                        className="w-24 mx-auto md:mx-0 glitch-text"
                        style={{
                          filter: "drop-shadow(0 0 15px hsl(280 100% 60%))",
                        }}
                      />
                    </div>
                    <p className="font-press-start text-[10px] text-pacman-yellow mb-4 tracking-widest">
                      MITS GWALIOR
                    </p>
                    <p className="font-vt323 text-lg text-foreground/80">
                      Annual Cultural Festival 2026
                    </p>
                  </div>
  
                    {/* Quick Links */}
                    <div className="footer-item grid grid-cols-2 gap-x-8 gap-y-4 text-center md:text-left">
                      {["EVENTS", "SCHEDULE", "SPONSORS", "HISTORY", "ABOUT", "CONTACT"].map((link) => (
                        <a 
                          key={link}
                          href={link === "CONTACT" ? "/contact" : link === "ABOUT" ? "/about" : link === "HISTORY" ? "/history" : link === "SPONSORS" ? "/sponsors" : link === "SCHEDULE" ? "/schedule" : "/events"}
                          className="font-vt323 text-xl text-foreground hover:text-cyber-grape hover:translate-x-1 transition-all flex items-center gap-2"
                        >
                          <span className="text-slime-green">»</span> {link}
                        </a>
                      ))}
                    </div>
  
                    {/* Social & CTA */}
                    <div className="footer-item flex flex-col items-center gap-6">
                      <div className="font-press-start text-[10px] text-hot-pink animate-pulse tracking-widest">
                        STAY CONNECTED
                      </div>
                      <div className="flex gap-4">
                        {[
                          { icon: "📷", label: "Instagram" },
                          { icon: "🐦", label: "Twitter" },
                          { icon: "📘", label: "Facebook" },
                          { icon: "📺", label: "YouTube" },
                        ].map((social) => (
                          <a 
                            key={social.label}
                            href="#" 
                            className="w-12 h-12 kidcore-btn flex items-center justify-center text-xl p-0"
                            title={social.label}
                          >
                            {social.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                </div>
  
                {/* Bottom bar */}
                <div className="footer-item mt-12 pt-8 border-t-2 border-dashed border-cyber-grape/30 flex flex-col md:flex-row items-center justify-between gap-6">
                  <p className="font-vt323 text-lg text-foreground/60 tracking-wider">
                    © 2026 AARUNYA | MITS GWALIOR
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="font-press-start text-[8px] text-foreground/60">
                      PLAYER 1 READY
                    </span>
                    <div className="w-3 h-3 bg-slime-green animate-pulse rounded-full shadow-[0_0_10px_#39FF14]" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-press-start text-[8px] text-pacman-yellow">
                      HIGH SCORE:
                    </span>
                    <span className="font-press-start text-[12px] text-pacman-yellow glow-yellow">
                      999,999
                    </span>
                  </div>
                </div>
              </div>

            {/* Credits */}
            <div className="footer-item mt-8 text-center">
              <p className="font-press-start text-[8px] text-foreground/40 tracking-widest hover:text-hot-pink transition-colors cursor-default">
                PRESS START TO CONTINUE
              </p>
            </div>
          </div>
      </footer>
  );
};

export default Footer;
