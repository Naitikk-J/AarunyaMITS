import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelStar, PixelHeart } from "./PixelDecorations";
import { RetroButton } from "./ui/retro-button";
import { useResponsive } from "../hooks/use-responsive";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    const { isMobile, isTablet, isDesktop } = useResponsive();

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
            className={`relative overflow-hidden ${isMobile ? 'py-8 px-2' : isTablet ? 'py-12 px-3' : 'py-16 px-4'}`}
            style={{
                background: 'linear-gradient(to bottom, #1a0a2e, #0d0520)',
                borderTop: '4px solid',
                borderImage: 'repeating-linear-gradient(90deg, #ff00ff, #ff00ff 8px, #00ffff 8px, #00ffff 16px) 1'
            }}
        >
            {/* CRT Scanlines */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)'
            }} />

            {/* Decorations */}
            <PixelStar className={`absolute ${isMobile ? 'top-10 left-6 w-6 h-6' : isTablet ? 'top-16 left-8 w-7 h-7' : 'top-20 left-10 w-8 h-8'} text-[#00ffff] animate-pulse`} color="#00ffff" />
            <PixelHeart className={`absolute ${isMobile ? 'bottom-10 right-6 w-6 h-6' : isTablet ? 'bottom-16 right-8 w-7 h-7' : 'bottom-20 right-12 w-8 h-8'} text-[#ff00ff] animate-pulse`} color="#ff00ff" />

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
                    <div className={`bg-white/80 backdrop-blur-sm ${isMobile ? 'p-4' : isTablet ? 'p-6' : 'p-6 md:p-10'} border-4 border-kidcore-black`}>
                        {/* TOP */}
                        <div className={`flex ${isMobile ? 'flex-col' : 'flex-col md:flex-row'} justify-between gap-10`}>
                            {/* Logo */}
                            <div className="footer-item">
                                <a href="#" className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'} group relative`}>
                                    <img
                                        src="/aarunya-logo.svg"
                                        alt="Aarunya 2026"
                                        className={`${isMobile ? 'h-8 w-auto' : isTablet ? 'h-10 w-auto' : 'h-12 w-auto'} transition-transform group-hover:scale-105 duration-300`}
                                        style={{
                                            imageRendering: 'pixelated',
                                            filter: 'drop-shadow(0 0 12px #ff00ff) drop-shadow(0 0 24px #00ffff)',
                                        }}
                                    />
                                </a>
                                <p className={`font-press-start ${isMobile ? 'text-[8px]' : isTablet ? 'text-[9px]' : 'text-[10px]'} text-[#ff99ff] tracking-wider mt-2`} style={{ textShadow: '1px 1px 0 #440044' }}>
                                    MITS GWALIOR
                                </p>
                                <p className={`font-pixel ${isMobile ? 'text-[8px]' : isTablet ? 'text-[9px]' : 'text-[10px]'} text-[#00ffff] mt-1`} style={{ textShadow: '0 0 8px #00ffff' }}>
                                    SYSTEM ACTIVE
                                </p>
                            </div>

                            {/* Nav */}
                            <div className="footer-item">
                                <div className={`flex ${isMobile ? 'flex-wrap justify-center' : 'items-center'} ${isMobile ? 'gap-2' : 'gap-1.5'}`}>
                                    {[
                                        { name: 'HOME', path: '/' },
                                        { name: 'MEMORIES', path: '/gallery' },
                                        { name: 'MAP', path: '/view-map' },
                                        { name: 'EVENTS', path: '/events' },
                                        { name: 'SCHEDULE', path: '/schedule' },
                                        { name: 'SPONSORS', path: '/sponsors' },
                                        { name: 'ABOUT', path: '/about' },
                                        { name: 'CONTACT', path: '/contact' },
                                        { name: 'REGISTER', path: '/register' },
                                    ].map((link, idx) => (
                                        <a
                                            key={link.path}
                                            href={link.path}
                                            className="relative group"
                                        >
                                            <div
                                                className={`relative px-3 py-2.5 font-bold tracking-wider transition-all duration-150 border-2 ${isMobile ? 'text-[7px]' : isTablet ? 'text-[8px]' : 'text-[9px]'}`}
                                                style={{
                                                    fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                    background: 'linear-gradient(to bottom, #1a0a2e, #2a1a4a)',
                                                    color: '#ff99ff',
                                                    borderColor: '#440044',
                                                    textShadow: '1px 1px 0 #220022',
                                                    boxShadow: 'inset -2px -2px 0 #0a0510, inset 2px 2px 0 #2a1a4a'
                                                }}
                                            >
                                                <span className="relative z-10">{link.name}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Social */}
                            <div className="footer-item">
                                <p className={`font-pixel text-[#00ffff] mb-4 text-center md:text-left ${isMobile ? 'text-[8px]' : isTablet ? 'text-[9px]' : ''}`} style={{ textShadow: '0 0 8px #00ffff' }}>
                                    CONNECT
                                </p>
                                <div className={`flex ${isMobile ? 'gap-2' : 'gap-4'} justify-center md:justify-start`}>
                                    {["🎨", "⚡", "💥", "📌"].map((icon, i) => (
                                        <div
                                            className={`${isMobile ? 'w-8 h-8 text-lg' : isTablet ? 'w-10 h-10 text-xl' : 'w-12 h-12 text-xl'} flex items-center justify-center cursor-pointer border-2 border-[#440044] bg-gradient-to-b from-[#1a0a2e] to-[#2a1a4a] text-[#00ffff] hover:text-[#ff00ff] transition-all duration-200`}
                                            style={{
                                                fontFamily: '"Press Start 2P", monospace',
                                                fontSize: isMobile ? '10px' : isTablet ? '11px' : '12px',
                                                textShadow: '0 0 8px currentColor',
                                                boxShadow: 'inset -2px -2px 0 #0a0510, inset 2px 2px 0 #2a1a4a'
                                            }}
                                        >
                                            {icon}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className={`footer-item mt-10 pt-6 border-t-4 border-dashed border-[#ff00ff] ${isMobile ? 'flex flex-col' : 'flex flex-col md:flex-row'} justify-between items-center ${isMobile ? 'gap-4' : 'gap-6'}`}>
                            <div className={`flex items-center ${isMobile ? 'gap-1' : 'gap-2'}`}>
                                <span className={`font-pixel ${isMobile ? 'text-[8px]' : isTablet ? 'text-[9px]' : 'text-[10px]'} text-[#00ffff]`} style={{ textShadow: '0 0 8px #00ffff' }}>
                                    STATUS:
                                </span>
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className={`${isMobile ? 'w-3 h-3' : isTablet ? 'w-4 h-4' : 'w-5 h-5'} bg-[#00ffff] border-2 border-[#006666]`}
                                        style={{
                                            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                                            boxShadow: '0 0 8px #00ffff'
                                        }}
                                    />
                                ))}
                            </div>

                            <div className={`font-press-start ${isMobile ? 'text-[8px]' : isTablet ? 'text-[9px]' : 'text-[10px]'} text-[#ff99ff] ${isMobile ? 'text-center' : 'text-center md:text-right'} tracking-wider`} style={{ textShadow: '1px 1px 0 #440044' }}>
                                © 2026 AARUNYA FESTIVAL <br />
                                MITS GWALIOR • SYSTEM ONLINE
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PLAYFUL FOOTER END */}
            <div className={`footer-item ${isMobile ? 'mt-8' : 'mt-16'} text-center`}>
                <div
                    className={`relative px-6 py-3 font-bold tracking-wider transition-all duration-150 border-2 cursor-pointer ${isMobile ? 'text-[8px]' : isTablet ? 'text-[9px]' : 'text-[9px]'}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{
                        fontFamily: '"Press Start 2P", monospace',
                        background: 'linear-gradient(to bottom, #1a0a2e, #2a1a4a)',
                        color: '#ff99ff',
                        borderColor: '#440044',
                        textShadow: '1px 1px 0 #220022',
                        boxShadow: 'inset -2px -2px 0 #0a0510, inset 2px 2px 0 #2a1a4a',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(to bottom, #2a1a4a, #1a0a2e)';
                        e.currentTarget.style.color = '#00ffff';
                        e.currentTarget.style.textShadow = '0 0 8px #00ffff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(to bottom, #1a0a2e, #2a1a4a)';
                        e.currentTarget.style.color = '#ff99ff';
                        e.currentTarget.style.textShadow = '1px 1px 0 #220022';
                    }}
                >
                    <span className="relative z-10">[ RETURN TO TOP ]</span>
                </div>
                <p className={`font-press-start ${isMobile ? 'text-[8px]' : isTablet ? 'text-[9px]' : 'text-[10px]'} text-[#00ffff] mt-4 tracking-wider`} style={{ textShadow: '0 0 8px #00ffff' }}>
                    SYSTEM ACTIVE • CREATIVITY ∞ • VIBES 100%
                </p>
            </div>
        </footer>
    );
};

export default Footer;
