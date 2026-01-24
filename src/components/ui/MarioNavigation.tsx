import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'THEME', path: '/theme' },
    { name: 'HEADLINERS', path: '/headliners' },
    { name: 'EVENTS', path: '/events' },
    { name: 'SCHEDULE', path: '/schedule' },
    { name: 'COMPETITIONS', path: '/competitions' },
    { name: 'SPONSORS', path: '/sponsors' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
];

export const MarioNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [marioPosition, setMarioPosition] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [marioY, setMarioY] = useState(0);
    const jumpIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const location = useLocation();
    const { playSound } = useSoundEffects();

    // Mario character animation when hovering over links
    useEffect(() => {
        if (hoveredLink && !isOpen) {
            const linkIndex = navLinks.findIndex(l => l.path === hoveredLink);
            if (linkIndex !== -1) {
                const basePosition = 50 + linkIndex * 80;
                setMarioPosition(basePosition);

                // Play hover sound
                playSound('hover');

                // Trigger jump animation
                setIsJumping(true);

                if (jumpIntervalRef.current) clearInterval(jumpIntervalRef.current);

                let jumpPhase = 0;
                jumpIntervalRef.current = setInterval(() => {
                    jumpPhase = (jumpPhase + 1) % 8;

                    // Sine wave jump motion
                    const jumpHeight = Math.sin((jumpPhase / 8) * Math.PI) * 30;
                    setMarioY(-Math.abs(jumpHeight));
                }, 50);
            }
        } else if (!hoveredLink) {
            setMarioY(0);
            setIsJumping(false);
            if (jumpIntervalRef.current) clearInterval(jumpIntervalRef.current);
        }

        return () => {
            if (jumpIntervalRef.current) clearInterval(jumpIntervalRef.current);
        };
    }, [hoveredLink, isOpen, playSound]);

    const handleNavClick = () => {
        playSound('click');
        setIsOpen(false);
        setHoveredLink(null);
    };

    return (
        <>
            <nav className="fixed top-4 left-0 right-0 z-50 glass-card bg-background/85 backdrop-blur-xl border-b border-secondary/40 m-0 rounded-none">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center hover:opacity-80 transition-opacity"
                        >
                            <img
                                src="/aarunya-logo.webp"
                                alt="Aarunya 2025"
                                className="h-12 w-auto"
                            />
                        </Link>

                        {/* Desktop Navigation with Mario Character */}
                        <div className="hidden lg:flex items-center gap-2 relative">
                            {/* Animated Mario character above nav items */}
                            <div
                                className="absolute -top-16 transition-all duration-200 ease-out"
                                style={{
                                    left: `${marioPosition}px`,
                                    transform: `translateY(${marioY}px)`,
                                    pointerEvents: 'none',
                                    willChange: 'transform',
                                    zIndex: 51,
                                }}
                            >
                                {/* Mario sprite using CSS */}
                                <div className="relative w-12 h-16">
                                    {/* Head */}
                                    <div className="absolute top-0 left-1 w-8 h-6 bg-kidcore-orange rounded-sm shadow-lg">
                                        {/* Eyes */}
                                        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-black rounded-full" />
                                        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-black rounded-full" />
                                        {/* Smile */}
                                        <div className="absolute bottom-1 left-3 w-2 h-1 bg-black rounded-full" />
                                    </div>
                                    {/* Body */}
                                    <div className="absolute top-6 left-2 w-6 h-4 bg-red-600 rounded-sm shadow-lg" />
                                    {/* Arms */}
                                    <div className="absolute top-6 left-0 w-2 h-4 bg-kidcore-orange rounded-sm" />
                                    <div className="absolute top-6 right-0 w-2 h-4 bg-kidcore-orange rounded-sm" />
                                    {/* Legs */}
                                    <div className="absolute top-10 left-2 w-2 h-4 bg-blue-700 rounded-sm" />
                                    <div className="absolute top-10 right-2 w-2 h-4 bg-blue-700 rounded-sm" />
                                </div>
                            </div>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onMouseEnter={() => setHoveredLink(link.path)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    onClick={handleNavClick}
                                    className={cn(
                                        "px-4 py-2 text-xs font-orbitron tracking-wider transition-all duration-300 rounded-lg",
                                        location.pathname === link.path
                                            ? "text-kidcore-black bg-kidcore-yellow shadow-lg scale-105"
                                            : "text-foreground hover:text-kidcore-yellow hover:bg-kidcore-blue/20 hover:scale-105"
                                    )}
                                    style={{
                                        transform: hoveredLink === link.path ? 'scaleY(0.95)' : 'scaleY(1)',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Auth Buttons - Desktop */}
                        <div className="hidden lg:flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="ghost" size="sm" className="font-mono text-xs tracking-wider">
                                    LOGIN
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button size="sm" className="font-mono text-xs tracking-wider">
                                    REGISTER
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 text-foreground hover:text-kidcore-yellow transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Dropdown */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-30 lg:hidden bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    {/* Menu */}
                    <div className="fixed top-16 left-0 right-0 z-40 lg:hidden w-full bg-background/95 backdrop-blur-xl border-b border-secondary/40 shadow-lg animate-in slide-in-from-top-2 duration-300">
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-1 max-h-[calc(100vh-64px)] overflow-y-auto">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={handleNavClick}
                                    className={cn(
                                        "px-4 py-3 text-sm font-orbitron tracking-wider transition-all duration-300 rounded-lg block",
                                        location.pathname === link.path
                                            ? "text-kidcore-black bg-kidcore-yellow font-bold"
                                            : "text-foreground hover:text-kidcore-yellow hover:bg-kidcore-blue/20"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-kidcore-blue/30">
                                <Link to="/login" onClick={handleNavClick} className="w-full">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full font-orbitron text-xs tracking-wider hover:bg-kidcore-blue/30 hover:text-kidcore-yellow transition-colors"
                                    >
                                        LOGIN
                                    </Button>
                                </Link>
                                <Link to="/register" onClick={handleNavClick} className="w-full">
                                    <Button
                                        size="sm"
                                        className="w-full font-orbitron text-xs tracking-wider kidcore-btn"
                                    >
                                        REGISTER
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
