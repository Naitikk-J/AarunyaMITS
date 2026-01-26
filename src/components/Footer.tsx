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
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            id="contact"
            className="relative overflow-hidden py-16 px-4 "
            style={{
                backgroundImage: `
          linear-gradient(to right, rgba(26, 26, 26, 0.05) 2px, transparent 2px),
          linear-gradient(to bottom, rgba(26, 26, 26, 0.05) 2px, transparent 2px)
        `,
                backgroundSize: "40px 40px",
            }}
        >
            {/* CRT Scanlines (Subtle for light theme) */}
            <div className="absolute inset-0 pointer-events-none scanlines opacity-5" />

            {/* Pixel Rainbow Border */}
            <div className="absolute top-0 left-0 right-0 h-2 flex">
                {["#00A6FF", "#FF5E1F", "#FF85C0", "#FFDD33", "#B0FF57"].map(
                    (c, i) => (
                        <div key={i} className="flex-1" style={{ background: c }} />
                    )
                )}
            </div>

            {/* Decorations */}
            <PixelStar className="absolute top-20 left-10 w-8 h-8 text-kidcore-pink animate-pulse" />
            <PixelHeart className="absolute bottom-20 right-12 w-8 h-8 text-kidcore-orange animate-pulse" />

            <div className="max-w-10xl mx-auto relative z-10 ">
                <div
                    className="glass-card p-1"
                    style={{
                        opacity: 100,
                        borderWidth: "6px",
                        borderStyle: "dashed",
                        borderColor: "var(--kidcore-blue)",
                        boxShadow: "10px 10px 0px var(--kidcore-pink), 20px 20px 0px var(--kidcore-yellow)",
                    }}
                >
                    <div className="bg-white/80 backdrop-blur-sm p-6 md:p-10 border-4 border-kidcore-black">
                        {/* TOP */}
                        <div className="flex flex-col md:flex-row justify-between gap-10">
                            {/* Logo */}
                            <div className="footer-item">
                                <img
                                    src="/aarunya-logo.svg"
                                    className="w-32 pixelated mb-4"
                                    style={{
                                        filter: "drop-shadow(4px 4px 0px var(--kidcore-blue))",
                                    }}
                                />
                                <p className="font-pixel text-s text-kidcore-pink">
                                    MITS GWALIOR
                                </p>
                                <p className="font-pixel text-[10px] text-kidcore-pink mt-1">
                                    KIDCORE MODE ACTIVE
                                </p>
                            </div>

                            {/* Nav */}
                            <div className="footer-item">
                                <p className="font-pixel text-kidcore-pink mb-3 text-2xl">
                                    &gt; NAVIGATION  
                                </p>
                                <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-md text-kidcore-pink">
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
                                            className="font-pixel text-[10px] text-kidcore-black hover:text-kidcore-blue relative group"
                                        >
                                            <span className="absolute -left-3 opacity-0 group-hover:opacity-100 text-kidcore-pink">
                                                ▶
                                            </span>
                                            {l}
                                            <span className="block h-px w-0 group-hover:w-full bg-gradient-to-r from-kidcore-blue to-kidcore-pink transition-all" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Social */}
                            <div className="footer-item">
                                <p className="font-pixel text-kidcore-pink mb-4 text-center md:text-left">
                                    GET IN TOUCH
                                </p>
                                <div className="flex gap-4 justify-center md:justify-start">
                                    {["🎨", "⚡", "💥", "📌"].map((icon, i) => (
                                        <div
                                            key={i}
                                            className="kidcore-btn w-12 h-12 flex items-center justify-center text-xl cursor-pointer"
                                            style={{
                                                padding: 0,
                                                minWidth: "48px",
                                            }}
                                        >
                                            {icon}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="footer-item mt-10 pt-6 border-t-4 border-dashed border-kidcore-blue flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="font-pixel text-[10px] text-kidcore-pink">
                                    ENERGY:
                                </span>
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="w-5 h-5 bg-kidcore-yellow border-2 border-kidcore-black"
                                        style={{
                                            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="font-pixel text-[10px] text-kidcore-pink text-center md:text-right">
                                © 2026 AARUNYA FESTIVAL <br />
                                MITS GWALIOR • MADE WITH ❤️
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PLAYFUL FOOTER END */}
            <div className="footer-item mt-16 text-center">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="kidcore-btn px-8 py-3 text-sm font-pixel"
                >
                    [ BACK TO TOP ]
                </button>
                <p className="font-pixel text-[9px] text-kidcore-orange mt-4">
                    SYSTEM ACTIVE • CREATIVITY ∞ • VIBES 100%
                </p>
            </div>
        </footer>
    );
};

export default Footer;
