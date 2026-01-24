import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'MAP', path: '/view-map' },
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

export const MainNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoverIdx, setHoverIdx] = useState<number | null>(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="w-full" style={{ imageRendering: 'pixelated' }}>
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-[#1a0a2e]" : "bg-[#0d0520]"
            )}>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0" style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)'
                    }} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 flex">
                    {[...Array(60)].map((_, i) => (
                        <div 
                            key={i} 
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

                <div className="absolute top-0 left-0 right-0 h-1 flex">
                    {[...Array(60)].map((_, i) => (
                        <div 
                            key={i} 
                            className="flex-1 h-full"
                            style={{
                                background: i % 2 === 0 
                                    ? '#ff00ff' 
                                    : '#00ffff',
                                opacity: 0.6
                            }}
                        />
                    ))}
                </div>

                <div className="absolute top-1 left-0 w-3 h-3 bg-[#ff00ff]" style={{ boxShadow: '0 0 10px #ff00ff, inset -1px -1px 0 #ff66ff' }} />
                <div className="absolute top-1 right-0 w-3 h-3 bg-[#00ffff]" style={{ boxShadow: '0 0 10px #00ffff, inset 1px -1px 0 #66ffff' }} />
                <div className="absolute bottom-1 left-0 w-3 h-3 bg-[#00ffff]" style={{ boxShadow: '0 0 10px #00ffff, inset -1px 1px 0 #66ffff' }} />
                <div className="absolute bottom-1 right-0 w-3 h-3 bg-[#ff00ff]" style={{ boxShadow: '0 0 10px #ff00ff, inset 1px 1px 0 #ff66ff' }} />

                <div className="container mx-auto px-6 relative">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-3 group relative">
                            <div className="relative">
                                <img
                                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d75f38c7-4d8b-4d07-9e34-9f97ded313dc/AARUNYA-TYPO-resized-1769290270496.webp?width=200&height=200&resize=contain"
                                    alt="Aarunya 2026"
                                    className="h-12 w-auto transition-transform group-hover:scale-105 duration-300"
                                    style={{
                                        imageRendering: 'pixelated',
                                        filter: 'drop-shadow(0 0 12px #ff00ff) drop-shadow(0 0 24px #00ffff)'
                                    }}
                                />
                            </div>
                        </Link>

                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link, idx) => {
                                const isActive = location.pathname === link.path;
                                const isHovered = hoverIdx === idx;
                                
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onMouseEnter={() => setHoverIdx(idx)}
                                        onMouseLeave={() => setHoverIdx(null)}
                                        className="relative group"
                                    >
                                        <div 
                                            className={cn(
                                                "relative px-2.5 py-1.5 text-[10px] font-bold tracking-wider transition-all duration-150",
                                                "border-2",
                                                isActive 
                                                    ? "bg-gradient-to-b from-[#ff00ff] to-[#cc00cc] text-white border-[#ff66ff]" 
                                                    : isHovered
                                                        ? "bg-gradient-to-b from-[#2a1a4a] to-[#1a0a2e] text-[#00ffff] border-[#00ffff]"
                                                        : "bg-transparent text-[#ff99ff] border-transparent hover:border-[#ff00ff]/50"
                                            )}
                                            style={{
                                                fontFamily: '"Press Start 2P", "Courier New", monospace',
                                                fontSize: '8px',
                                                textShadow: isActive 
                                                    ? '0 0 10px #fff, 2px 2px 0 #880088' 
                                                    : isHovered 
                                                        ? '0 0 10px #00ffff'
                                                        : '1px 1px 0 #440044',
                                                boxShadow: isActive 
                                                    ? 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 15px #ff00ff'
                                                    : isHovered
                                                        ? 'inset -1px -1px 0 #006666, inset 1px 1px 0 #66ffff, 0 0 10px #00ffff'
                                                        : 'none'
                                            }}
                                        >
                                            {isActive && (
                                                <>
                                                    <span className="absolute -top-1 -left-1 w-2 h-2 bg-[#00ffff]" style={{ boxShadow: '0 0 6px #00ffff' }} />
                                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00ffff]" style={{ boxShadow: '0 0 6px #00ffff' }} />
                                                    <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#00ffff]" style={{ boxShadow: '0 0 6px #00ffff' }} />
                                                    <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#00ffff]" style={{ boxShadow: '0 0 6px #00ffff' }} />
                                                </>
                                            )}
                                            
                                            <span className="relative z-10 flex items-center gap-1">
                                                {isActive && <span className="animate-pulse">►</span>}
                                                {link.name}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        <button
                            className="lg:hidden relative p-2 transition-all duration-200"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                            style={{
                                background: isOpen 
                                    ? 'linear-gradient(to bottom, #ff00ff, #cc00cc)'
                                    : 'linear-gradient(to bottom, #2a1a4a, #1a0a2e)',
                                border: '3px solid',
                                borderColor: isOpen ? '#ff66ff' : '#ff00ff',
                                boxShadow: isOpen 
                                    ? 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 15px #ff00ff'
                                    : 'inset -2px -2px 0 #0a0510, inset 2px 2px 0 #3a2a5a'
                            }}
                        >
                            <span className="absolute -top-1 -left-1 w-2 h-2 bg-[#00ffff]" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff00ff]" />
                            <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#ff00ff]" />
                            <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#00ffff]" />
                            
                            <div className="flex flex-col gap-1" style={{ width: '18px' }}>
                                <span className={cn(
                                    "block h-[3px] transition-all duration-200",
                                    isOpen ? "rotate-45 translate-y-[6px] bg-white" : "bg-[#ff00ff]"
                                )} style={{ boxShadow: '0 0 4px currentColor' }} />
                                <span className={cn(
                                    "block h-[3px] transition-all duration-200",
                                    isOpen ? "opacity-0 bg-white" : "bg-[#00ffff]"
                                )} style={{ boxShadow: '0 0 4px currentColor' }} />
                                <span className={cn(
                                    "block h-[3px] transition-all duration-200",
                                    isOpen ? "-rotate-45 -translate-y-[6px] bg-white" : "bg-[#ff00ff]"
                                )} style={{ boxShadow: '0 0 4px currentColor' }} />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {isOpen && (
                <div className="fixed inset-0 z-40 lg:hidden top-16">
                    <div
                        className="fixed inset-0 bg-black/90"
                        onClick={() => setIsOpen(false)}
                        style={{
                            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,255,0.05) 2px, rgba(255,0,255,0.05) 4px)'
                        }}
                    />
                    
                    <div 
                        className="fixed top-16 left-0 right-0 z-50 overflow-hidden"
                        style={{
                            background: 'linear-gradient(to bottom, #1a0a2e, #0d0520)',
                            borderBottom: '4px solid',
                            borderImage: 'repeating-linear-gradient(90deg, #ff00ff, #ff00ff 8px, #00ffff 8px, #00ffff 16px) 1'
                        }}
                    >
                        <div className="absolute inset-0 pointer-events-none" style={{
                            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)'
                        }} />
                        
                        <div className="container mx-auto px-4 py-3 flex flex-col gap-1 max-h-[calc(100vh-64px)] overflow-y-auto relative">
                            <div 
                                className="text-center py-2 mb-2"
                                style={{
                                    fontFamily: '"Press Start 2P", monospace',
                                    fontSize: '8px',
                                    color: '#00ffff',
                                    textShadow: '0 0 10px #00ffff',
                                    borderBottom: '2px dashed #ff00ff'
                                }}
                            >
                                ═══ SELECT DESTINATION ═══
                            </div>
                            
                            {navLinks.map((link, idx) => {
                                const isActive = location.pathname === link.path;
                                
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="relative"
                                    >
                                        <div 
                                            className={cn(
                                                "relative px-4 py-3 transition-all duration-150 flex items-center gap-3",
                                                "border-2"
                                            )}
                                            style={{
                                                fontFamily: '"Press Start 2P", monospace',
                                                fontSize: '9px',
                                                background: isActive 
                                                    ? 'linear-gradient(to right, #ff00ff, #cc00cc)'
                                                    : 'linear-gradient(to right, #1a0a2e, #2a1a4a)',
                                                color: isActive ? '#ffffff' : '#ff99ff',
                                                borderColor: isActive ? '#ff66ff' : '#440044',
                                                textShadow: isActive 
                                                    ? '0 0 10px #fff, 2px 2px 0 #880088'
                                                    : '1px 1px 0 #220022',
                                                boxShadow: isActive 
                                                    ? 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 15px #ff00ff'
                                                    : 'inset -2px -2px 0 #0a0510, inset 2px 2px 0 #2a1a4a'
                                            }}
                                        >
                                            {isActive && (
                                                <>
                                                    <span className="absolute -top-1 -left-1 w-2 h-2 bg-[#00ffff]" style={{ boxShadow: '0 0 6px #00ffff' }} />
                                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00ffff]" style={{ boxShadow: '0 0 6px #00ffff' }} />
                                                    <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#00ffff]" style={{ boxShadow: '0 0 6px #00ffff' }} />
                                                    <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#00ffff]" style={{ boxShadow: '0 0 6px #00ffff' }} />
                                                </>
                                            )}
                                            
                                            <span 
                                                className="w-8 text-center"
                                                style={{
                                                    color: isActive ? '#00ffff' : '#00ffff',
                                                    textShadow: '0 0 8px #00ffff'
                                                }}
                                            >
                                                {String(idx + 1).padStart(2, '0')}
                                            </span>
                                            
                                            <span className="flex-1">{link.name}</span>
                                            
                                            {isActive && (
                                                <span className="animate-pulse" style={{ color: '#00ffff', textShadow: '0 0 8px #00ffff' }}>◄</span>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                            
                            <div 
                                className="mt-3 pt-3 flex items-center justify-center gap-4"
                                style={{
                                    borderTop: '2px dashed #ff00ff'
                                }}
                            >
                                <span 
                                    className="flex items-center gap-2"
                                    style={{
                                        fontFamily: '"Press Start 2P", monospace',
                                        fontSize: '7px',
                                        color: '#00ff00',
                                        textShadow: '0 0 8px #00ff00'
                                    }}
                                >
                                    <span className="w-2 h-2 bg-[#00ff00] animate-pulse" style={{ boxShadow: '0 0 8px #00ff00' }} />
                                    ONLINE
                                </span>
                                <span 
                                    style={{
                                        fontFamily: '"Press Start 2P", monospace',
                                        fontSize: '7px',
                                        color: '#666666'
                                    }}
                                >
                                    v2.0.26
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
