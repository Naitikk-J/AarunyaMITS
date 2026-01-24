import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'VIEW MAP', path: '/view-map' },
    { name: 'THEME', path: '/theme' },
    { name: 'HEADLINERS', path: '/headliners' },
    { name: 'EVENTS', path: '/events' },
    { name: 'SCHEDULE', path: '/schedule' },
    { name: 'REGISTER', path: '/register' },
    { name: 'COMPETITIONS', path: '/competitions' },
    { name: 'SPONSORS', path: '/sponsors' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
];

const PixelBorder = ({ className }: { className?: string }) => (
    <div className={cn("absolute pointer-events-none", className)}>
        <div className="w-2 h-2 bg-primary" />
    </div>
);

const GlitchText = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const [glitch, setGlitch] = useState(false);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 100);
        }, 3000 + Math.random() * 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className={cn("relative inline-block", className)}>
            <span className={cn(
                "relative z-10",
                glitch && "animate-[glitch_0.1s_ease-in-out]"
            )}>
                {children}
            </span>
            {glitch && (
                <>
                    <span className="absolute top-0 left-[2px] text-cyan-400 opacity-70 z-0">{children}</span>
                    <span className="absolute top-0 left-[-2px] text-red-500 opacity-70 z-0">{children}</span>
                </>
            )}
        </span>
    );
};

export const MainNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="w-full">
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-[#05010D]/95" : "bg-[#05010D]/80",
                "backdrop-blur-md"
            )}>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: `
                            linear-gradient(90deg, transparent 0%, transparent 50%, rgba(188,19,254,0.3) 50%, rgba(188,19,254,0.3) 100%),
                            linear-gradient(0deg, transparent 0%, transparent 50%, rgba(188,19,254,0.3) 50%, rgba(188,19,254,0.3) 100%)
                        `,
                        backgroundSize: '4px 4px'
                    }} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent">
                    <div className="absolute inset-0 animate-[scan_2s_linear_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                </div>

                <PixelBorder className="top-0 left-0" />
                <PixelBorder className="top-0 right-0" />
                <PixelBorder className="bottom-0 left-0" />
                <PixelBorder className="bottom-0 right-0" />

                <div className="container mx-auto px-4 relative">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex items-center gap-3 group relative">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-primary/20 blur-lg group-hover:bg-primary/40 transition-all" />
                                <div className="relative w-12 h-12 border-2 border-primary bg-black flex items-center justify-center overflow-hidden"
                                    style={{ imageRendering: 'pixelated' }}>
                                    <img
                                        src="/aarunya-logo.svg"
                                        alt="Aarunya 2026"
                                        className="h-10 w-auto transition-transform group-hover:scale-110 duration-300"
                                        style={{
                                            filter: "drop-shadow(0 0 8px hsl(var(--primary)))",
                                            imageRendering: 'pixelated',
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-secondary animate-pulse" />
                                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary animate-pulse delay-500" />
                            </div>
                            
                            <div className="hidden sm:flex flex-col">
                                <GlitchText className="font-orbitron text-lg text-primary tracking-[0.3em] font-bold leading-none">
                                    AARUNYA
                                </GlitchText>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[8px] font-share-tech text-white/40 tracking-[0.4em]">SYS_2026</span>
                                    <span className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
                                </div>
                            </div>
                        </Link>

                        <div className="hidden lg:flex items-center gap-0.5">
                            {navLinks.map((link, idx) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="group relative"
                                >
                                    <div className={cn(
                                        "relative px-3 py-2 font-orbitron text-[9px] tracking-[0.15em] transition-all duration-200",
                                        location.pathname === link.path
                                            ? "text-black bg-primary"
                                            : "text-white/70 hover:text-primary"
                                    )}>
                                        {location.pathname === link.path && (
                                            <>
                                                <span className="absolute -top-[2px] -left-[2px] w-1 h-1 bg-white" />
                                                <span className="absolute -top-[2px] -right-[2px] w-1 h-1 bg-white" />
                                                <span className="absolute -bottom-[2px] -left-[2px] w-1 h-1 bg-white" />
                                                <span className="absolute -bottom-[2px] -right-[2px] w-1 h-1 bg-white" />
                                            </>
                                        )}
                                        
                                        <span className="relative z-10 flex items-center gap-1">
                                            {location.pathname === link.path && (
                                                <span className="text-[6px]">►</span>
                                            )}
                                            {link.name}
                                        </span>

                                        {location.pathname !== link.path && (
                                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <button
                            className={cn(
                                "lg:hidden relative p-2 transition-all duration-200",
                                "border-2 border-primary bg-black/80",
                                isOpen ? "text-black bg-primary" : "text-primary hover:bg-primary hover:text-black"
                            )}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className="absolute -top-[2px] -left-[2px] w-1 h-1 bg-primary" />
                            <span className="absolute -top-[2px] -right-[2px] w-1 h-1 bg-primary" />
                            <span className="absolute -bottom-[2px] -left-[2px] w-1 h-1 bg-primary" />
                            <span className="absolute -bottom-[2px] -right-[2px] w-1 h-1 bg-primary" />
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            {isOpen && (
                <div className="fixed inset-0 z-30 lg:hidden top-20 pointer-events-auto">
                    <div
                        className="fixed inset-0 z-30 lg:hidden bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    
                    <div className="fixed top-20 left-0 right-0 z-40 lg:hidden w-full bg-[#05010D]/98 backdrop-blur-xl border-b-4 border-primary animate-in slide-in-from-top-2 duration-300">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10" style={{
                            backgroundImage: `
                                linear-gradient(90deg, transparent 0%, transparent 50%, rgba(188,19,254,0.3) 50%, rgba(188,19,254,0.3) 100%),
                                linear-gradient(0deg, transparent 0%, transparent 50%, rgba(188,19,254,0.3) 50%, rgba(188,19,254,0.3) 100%)
                            `,
                            backgroundSize: '4px 4px'
                        }} />
                        
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-1 max-h-[calc(100vh-80px)] overflow-y-auto relative">
                            <div className="absolute top-2 right-4 font-share-tech text-[8px] text-white/20 tracking-[0.4em]">
                                NAV_MENU_V2.0
                            </div>
                            
                            {navLinks.map((link, idx) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "relative px-4 py-3 font-orbitron text-xs tracking-[0.2em] transition-all duration-200 flex items-center gap-3",
                                        location.pathname === link.path
                                            ? "text-black bg-primary"
                                            : "text-white/70 hover:text-primary hover:bg-white/5"
                                    )}
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    {location.pathname === link.path && (
                                        <>
                                            <span className="absolute -top-[1px] -left-[1px] w-1 h-1 bg-white" />
                                            <span className="absolute -top-[1px] -right-[1px] w-1 h-1 bg-white" />
                                            <span className="absolute -bottom-[1px] -left-[1px] w-1 h-1 bg-white" />
                                            <span className="absolute -bottom-[1px] -right-[1px] w-1 h-1 bg-white" />
                                        </>
                                    )}
                                    
                                    <span className={cn(
                                        "w-6 text-center font-share-tech text-[8px]",
                                        location.pathname === link.path ? "text-black/50" : "text-primary/50"
                                    )}>
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    
                                    <span className="flex-1">{link.name}</span>
                                    
                                    {location.pathname === link.path && (
                                        <span className="text-[8px] animate-pulse">◄</span>
                                    )}
                                </Link>
                            ))}
                            
                            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between px-4">
                                <span className="font-share-tech text-[8px] text-white/30 tracking-[0.3em]">
                                    SIGNAL_ONLINE
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
                                    <span className="font-share-tech text-[8px] text-green-500 tracking-[0.2em]">CONNECTED</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes scan {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes glitch {
                    0% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                    100% { transform: translate(0); }
                }
            `}} />
        </div>
    );
};
