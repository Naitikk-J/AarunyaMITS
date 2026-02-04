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
            className={`relative overflow-hidden ${isMobile ? 'py-2 px-2' : isTablet ? 'py-4 px-3' : 'py-6 px-4'}`}
            style={{
                background: 'linear-gradient(135deg, #1a0a2e 0%, #2a0a4a 50%, #1a0a2e 100%)',
                borderTop: '1px solid',
                borderImage: 'linear-gradient(90deg, #ff00ff, #00ffff) 1'
            }}
        >
            {/* Animated Glow Background Layers */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Magenta glow blob */}
                <div
                    className="absolute -top-10 -left-10 w-20 h-20 rounded-full blur-3xl pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 0, 255, 0.15) 0%, transparent 70%)',
                        animation: 'float 15s ease-in-out infinite'
                    }}
                />
                {/* Cyan glow blob */}
                <div
                    className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full blur-3xl pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%)',
                        animation: 'float 20s ease-in-out infinite reverse'
                    }}
                />
            </div>

            {/* Top Gradient Bar - matches navbar style */}
            <div className="absolute top-0 left-0 right-0 h-1 flex z-20">
                {[...Array(60)].map((_, i) => (
                    <div
                        key={`top-gradient-${i}`}
                        className="flex-1 h-full"
                        style={{
                            background: i % 2 === 0
                                ? 'linear-gradient(to bottom, #ff00ff, #bc13fe)'
                                : 'linear-gradient(to bottom, #00ffff, #0088ff)',
                            boxShadow: i % 2 === 0
                                ? '0 0 8px #ff00ff'
                                : '0 0 8px #00ffff'
                        }}
                    />
                ))}
            </div>

            {/* CRT Scanlines */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
                zIndex: 5
            }} />

            {/* Decorations */}
            <PixelStar className={`absolute ${isMobile ? 'top-10 left-6 w-6 h-6' : isTablet ? 'top-16 left-8 w-7 h-7' : 'top-20 left-10 w-8 h-8'} text-[#00ffff] animate-pulse`} color="#00ffff" />
            <PixelHeart className={`absolute ${isMobile ? 'bottom-10 right-6 w-6 h-6' : isTablet ? 'bottom-16 right-8 w-7 h-7' : 'bottom-20 right-12 w-8 h-8'} text-[#ff00ff] animate-pulse`} color="#ff00ff" />

            <div className="max-w-10xl mx-auto relative z-10">
                <div
                    className="relative"
                    style={{
                        borderWidth: "3px",
                        borderStyle: "solid",
                        borderColor: "#ff00ff",
                        background: 'linear-gradient(135deg, rgba(26, 10, 46, 0.95) 0%, rgba(42, 10, 74, 0.95) 50%, rgba(26, 10, 46, 0.95) 100%)',
                        boxShadow: 'inset 0 0 20px rgba(255, 0, 255, 0.2), 0 0 30px rgba(255, 0, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <div className={`${isMobile ? 'p-4' : isTablet ? 'p-6' : 'p-6 md:p-10'}`}>
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
                                <p className={`font-press-start ${isMobile ? 'text-[8px]' : isTablet ? 'text-[9px]' : 'text-[10px]'} text-[#ff00ff] tracking-wider mt-2`} style={{ textShadow: '0 0 10px #ff00ff' }}>
                                    MITS GWALIOR
                                </p>
                                <p className={`font-pixel ${isMobile ? 'text-[8px]' : isTablet ? 'text-[9px]' : 'text-[10px]'} text-[#00ffff] mt-1`} style={{ textShadow: '0 0 10px #00ffff' }}>
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
                                            key={`social-icon-${i}`}
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

                        {/* Additional Sections - Privacy, Terms, Refund, Contact */}
                        <div
                            className={`footer-item mt-10 pt-8`}
                            style={{
                                borderTop: '2px solid',
                                borderImage: 'linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff) 1',
                                boxShadow: '0 2px 15px rgba(255, 0, 255, 0.3)'
                            }}
                        >
                            <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : isTablet ? 'grid-cols-2 gap-6' : 'grid-cols-4 gap-8'}`}>
                                {/* Privacy Policy */}
                                <div className="footer-section">
                                    <h3 className={`font-press-start ${isMobile ? 'text-[7px]' : isTablet ? 'text-[8px]' : 'text-[9px]'} text-[#00ffff] mb-3 tracking-wider`} style={{ textShadow: '0 0 8px #00ffff' }}>
                                        PRIVACY
                                    </h3>
                                    <ul className={`font-pixel space-y-2 ${isMobile ? 'text-[6px]' : isTablet ? 'text-[7px]' : 'text-[8px]'}`}>
                                        <li>
                                            <a href="#privacy-policy" className="text-[#ff99ff] hover:text-[#ff00ff] transition-colors" style={{ textShadow: '0 0 4px rgba(255,0,255,0.3)' }}>
                                                Policy Details
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#data-handling" className="text-[#ff99ff] hover:text-[#ff00ff] transition-colors" style={{ textShadow: '0 0 4px rgba(255,0,255,0.3)' }}>
                                                Data Handling
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#cookies" className="text-[#ff99ff] hover:text-[#ff00ff] transition-colors" style={{ textShadow: '0 0 4px rgba(255,0,255,0.3)' }}>
                                                Cookie Policy
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Terms & Conditions */}
                                <div className="footer-section">
                                    <h3 className={`font-press-start ${isMobile ? 'text-[7px]' : isTablet ? 'text-[8px]' : 'text-[9px]'} text-[#00ffff] mb-3 tracking-wider`} style={{ textShadow: '0 0 8px #00ffff' }}>
                                        TERMS
                                    </h3>
                                    <ul className={`font-pixel space-y-2 ${isMobile ? 'text-[6px]' : isTablet ? 'text-[7px]' : 'text-[8px]'}`}>
                                        <li>
                                            <a href="#terms-conditions" className="text-[#ff99ff] hover:text-[#ff00ff] transition-colors" style={{ textShadow: '0 0 4px rgba(255,0,255,0.3)' }}>
                                                Conditions
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#user-rights" className="text-[#ff99ff] hover:text-[#ff00ff] transition-colors" style={{ textShadow: '0 0 4px rgba(255,0,255,0.3)' }}>
                                                User Rights
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#usage" className="text-[#ff99ff] hover:text-[#ff00ff] transition-colors" style={{ textShadow: '0 0 4px rgba(255,0,255,0.3)' }}>
                                                Usage Rules
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Return & Refund */}
                                <div className="footer-section">
                                    <h3 className={`font-press-start ${isMobile ? 'text-[7px]' : isTablet ? 'text-[8px]' : 'text-[9px]'} text-[#00ffff] mb-3 tracking-wider`} style={{ textShadow: '0 0 8px #00ffff' }}>
                                        RETURNS
                                    </h3>
                                    <ul className={`font-pixel space-y-2 ${isMobile ? 'text-[6px]' : isTablet ? 'text-[7px]' : 'text-[8px]'}`}>
                                        <li>
                                            <a href="#return-policy" className="text-[#ff99ff] hover:text-[#ff00ff] transition-colors" style={{ textShadow: '0 0 4px rgba(255,0,255,0.3)' }}>
                                                Return Policy
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#refund-process" className="text-[#ff99ff] hover:text-[#ff00ff] transition-colors" style={{ textShadow: '0 0 4px rgba(255,0,255,0.3)' }}>
                                                Refund Process
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#shipping" className="text-[#ff99ff] hover:text-[#ff00ff] transition-colors" style={{ textShadow: '0 0 4px rgba(255,0,255,0.3)' }}>
                                                Shipping Info
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Contact */}
                                <div className="footer-section">
                                    <h3 className={`font-press-start ${isMobile ? 'text-[7px]' : isTablet ? 'text-[8px]' : 'text-[9px]'} text-[#00ffff] mb-3 tracking-wider`} style={{ textShadow: '0 0 8px #00ffff' }}>
                                        CONTACT
                                    </h3>
                                    <ul className={`font-pixel space-y-2 ${isMobile ? 'text-[6px]' : isTablet ? 'text-[7px]' : 'text-[8px]'}`}>
                                        <li>
                                            <a href="mailto:info@aarunya.com" className="text-[#ff99ff] hover:text-[#ff00ff] transition-colors" style={{ textShadow: '0 0 4px rgba(255,0,255,0.3)' }}>
                                                Email Us
                                            </a>
                                        </li>
                                        <li>
                                            <a href="tel:+911234567890" className="text-[#ff99ff] hover:text-[#ff00ff] transition-colors" style={{ textShadow: '0 0 4px rgba(255,0,255,0.3)' }}>
                                                Call Us
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#contact-form" className="text-[#ff99ff] hover:text-[#ff00ff] transition-colors" style={{ textShadow: '0 0 4px rgba(255,0,255,0.3)' }}>
                                                Contact Form
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Status Bar */}
                        <div
                            className={`footer-item mt-10 pt-6 ${isMobile ? 'flex flex-col' : 'flex flex-col md:flex-row'} justify-between items-center ${isMobile ? 'gap-4' : 'gap-6'}`}
                            style={{
                                borderTop: '2px solid',
                                borderImage: 'linear-gradient(90deg, #00ffff, #ff00ff, #00ffff) 1'
                            }}
                        >
                            <div className={`flex items-center ${isMobile ? 'gap-1' : 'gap-2'}`}>
                                <span className={`font-pixel ${isMobile ? 'text-[8px]' : isTablet ? 'text-[9px]' : 'text-[10px]'} text-[#00ffff]`} style={{ textShadow: '0 0 8px #00ffff' }}>
                                    STATUS:
                                </span>
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={`status-indicator-${i}`}
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
            <div className={`relative z-10 ${isMobile ? 'mt-8' : 'mt-16'} text-center`}>
                <div
                    className={`relative px-8 py-4 font-bold tracking-wider transition-all duration-300 cursor-pointer inline-block ${isMobile ? 'text-[8px]' : isTablet ? 'text-[9px]' : 'text-[9px]'}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{
                        fontFamily: '"Press Start 2P", monospace',
                        background: 'linear-gradient(135deg, #ff00ff, #ff0088)',
                        color: '#ffffff',
                        border: '2px solid #ff00ff',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 0 20px #ff00ff, inset 0 0 20px rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #00ffff, #00ddff)';
                        e.currentTarget.style.borderColor = '#00ffff';
                        e.currentTarget.style.boxShadow = '0 0 30px #00ffff, inset 0 0 20px rgba(0, 255, 255, 0.2)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #ff00ff, #ff0088)';
                        e.currentTarget.style.borderColor = '#ff00ff';
                        e.currentTarget.style.boxShadow = '0 0 20px #ff00ff, inset 0 0 20px rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <span className="relative z-10">⬆ RETURN TO TOP ⬆</span>
                </div>
                <p className={`font-press-start ${isMobile ? 'text-[7px]' : isTablet ? 'text-[8px]' : 'text-[9px]'} text-[#00ffff] mt-6 tracking-wider`} style={{ textShadow: '0 0 12px #00ffff' }}>
                    ✦ SYSTEM ACTIVE • CREATIVITY ∞ • VIBES 100% ✦
                </p>
            </div>

            {/* Bottom Gradient Bar - matches navbar style */}
            <div className="absolute bottom-0 left-0 right-0 h-1 flex mt-8">
                {[...Array(60)].map((_, i) => (
                    <div
                        key={`bottom-gradient-${i}`}
                        className="flex-1 h-full"
                        style={{
                            background: i % 2 === 0
                                ? 'linear-gradient(to top, #ff00ff, #bc13fe)'
                                : 'linear-gradient(to top, #00ffff, #0088ff)',
                            boxShadow: i % 2 === 0
                                ? '0 0 8px #ff00ff'
                                : '0 0 8px #00ffff'
                        }}
                    />
                ))}
            </div>

            {/* Corner accent elements - matches navbar */}
            <div className="absolute top-0 left-0 w-3 h-3 bg-[#ff00ff] z-20" style={{ boxShadow: '0 0 10px #ff00ff, inset -1px -1px 0 #ff66ff' }} />
            <div className="absolute top-0 right-0 w-3 h-3 bg-[#00ffff] z-20" style={{ boxShadow: '0 0 10px #00ffff, inset 1px -1px 0 #66ffff' }} />
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#00ffff] z-20" style={{ boxShadow: '0 0 10px #00ffff, inset -1px 1px 0 #66ffff' }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#ff00ff] z-20" style={{ boxShadow: '0 0 10px #ff00ff, inset 1px 1px 0 #ff66ff' }} />

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(-20px) translateX(10px); }
                    50% { transform: translateY(-40px) translateX(0px); }
                    75% { transform: translateY(-20px) translateX(-10px); }
                }

                @keyframes glow-pulse {
                    0%, 100% {
                        box-shadow: inset 0 0 20px rgba(255, 0, 255, 0.2), 0 0 30px rgba(255, 0, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.1);
                    }
                    50% {
                        box-shadow: inset 0 0 30px rgba(255, 0, 255, 0.3), 0 0 40px rgba(255, 0, 255, 0.4), 0 0 80px rgba(0, 255, 255, 0.2);
                    }
                }

                .footer-section h3 {
                    position: relative;
                    display: inline-block;
                    padding-bottom: 8px;
                    margin-bottom: 12px;
                }

                .footer-section h3::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, #00ffff, transparent);
                    box-shadow: 0 0 8px #00ffff;
                }

                .footer-section ul li a {
                    position: relative;
                    display: inline-block;
                }

                .footer-section ul li a::before {
                    content: '▸';
                    position: absolute;
                    left: -12px;
                    color: #ff00ff;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .footer-section ul li a:hover::before {
                    opacity: 1;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
