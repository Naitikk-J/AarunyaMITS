import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelStar, PixelHeart } from "./PixelDecorations";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".footer-item");

      gsap.from(items, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "steps(4)",
      });

      gsap.to(items, {
        yoyo: true,
        repeat: -1,
        duration: 0.6,
        ease: "steps(4)",
        y: "+=2",
      });

      gsap.to(".neon-pulse", {
        opacity: 0.6,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "steps(2)",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative overflow-hidden py-16 px-4 bg-[#0a0a0a] crt-overlay"
      style={{
        backgroundImage: `
          linear-gradient(to right, #1a0a2a 2px, transparent 2px),
          linear-gradient(to bottom, #1a0a2a 2px, transparent 2px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {/* CRT Scanlines */}
      <div className="absolute inset-0 pointer-events-none scanlines" />

      {/* Pixel Rainbow Border */}
      <div className="absolute top-0 left-0 right-0 h-2 flex">
        {["#BC13FE", "#00FFFF", "#FF44CC", "#FFF01F", "#00FF9D"].map(
          (c, i) => (
            <div key={i} className="flex-1" style={{ background: c }} />
          )
        )}
      </div>

      {/* Decorations */}
      <PixelStar className="absolute top-20 left-10 w-8 h-8 neon-pulse" />
      <PixelHeart className="absolute bottom-20 right-12 w-8 h-8 neon-pulse" />

      <div className="max-w-6xl mx-auto relative z-10 footer-item">
        <div
          className="p-2"
          style={{
            border: "8px solid",
            borderImage:
              "repeating-linear-gradient(45deg, #BC13FE 0 4px, #00FFFF 4px 8px) 8",
            boxShadow:
              "0 0 30px rgba(188,19,254,.4), inset 0 0 20px rgba(188,19,254,.2)",
          }}
        >
          <div className="bg-[#1a0a2a] p-10 border-4 border-black">
            {/* TOP */}
            <div className="flex flex-col md:flex-row justify-between gap-10">
              {/* Logo */}
              <div className="footer-item">
                <img
                  src="/aarunya-logo.svg"
                  className="w-32 pixelated mb-4"
                  style={{
                    filter:
                      "drop-shadow(0 0 10px #BC13FE) drop-shadow(0 0 30px #BC13FE)",
                  }}
                />
                <p className="font-pixel text-xs text-cyan-400">
                  MITS GWALIOR
                </p>
                <p className="font-pixel text-[10px] text-pink-400 mt-1">
                  ARCADE MODE ACTIVE
                </p>
              </div>

              {/* Nav */}
              <div className="footer-item">
                <p className="font-pixel text-yellow-400 mb-3">
                  &gt; NAVIGATION
                </p>
                <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                  {[
                    "EVENTS",
                    "SCHEDULE",
                    "SPONSORS",
                    "ABOUT",
                    "CONTACT",
                  ].map((l) => (
                    <a
                      key={l}
                      href={`#${l.toLowerCase()}`}
                      className="font-pixel text-[10px] text-white hover:text-green-400 relative group"
                    >
                      <span className="absolute -left-3 opacity-0 group-hover:opacity-100 text-pink-400">
                        ▶
                      </span>
                      {l}
                      <span className="block h-px w-0 group-hover:w-full bg-gradient-to-r from-cyan-400 to-pink-400 transition-all" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="footer-item text-center">
                <p className="font-pixel text-green-400 mb-4">
                  INSERT COINS
                </p>
                <div className="flex gap-4 justify-center">
                  {["👾", "🎮", "🕹️", "🎯"].map((icon, i) => (
                    <div
                      key={i}
                      className="arcade-btn w-14 h-14 border-4 border-white bg-black flex items-center justify-center text-2xl"
                      style={{
                        boxShadow: "0 4px 0 #000, 0 0 15px currentColor",
                      }}
                    >
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="footer-item mt-10 pt-6 border-t-4 border-dashed border-cyan-400 flex flex-col md:flex-row justify-between gap-6">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[10px] text-pink-400">
                  LIVES:
                </span>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-5 h-5 bg-gradient-to-br from-pink-400 to-purple-600"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                    }}
                  />
                ))}
              </div>

              <div className="font-pixel text-[10px] text-cyan-300">
                © 2026 AARUNYA ARCADE <br />
                MITS GWALIOR
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRESS START */}
      <div className="footer-item mt-10 text-center">
        <p className="font-pixel text-sm border-2 border-white inline-block px-6 py-3 animate-pulse">
          [ PRESS START ]
        </p>
        <p className="font-pixel text-[9px] text-green-400 mt-3">
          SYSTEM READY • COINS ∞ • PLAYERS 999+
        </p>
      </div>
    </footer>
  );
};

export default Footer;
