import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

export const MainNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="w-full">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b-4 border-kidcore-yellow m-0 rounded-none shadow-[0_4px_20px_rgba(255,214,51,0.3)]">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 group"
                        >
                            <div className="relative">
                                <img
                                    src="/aarunya-logo.svg"
                                    alt="Aarunya 2026"
                                    className="h-12 w-auto transition-transform group-hover:scale-110 duration-300"
                                    style={{
                                        filter: "drop-shadow(0 0 8px hsl(var(--electric-yellow)))",
                                        imageRendering: 'pixelated',
                                    }}
                                />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-magenta animate-pulse rounded-full" />
                            </div>
                            <span className="font-pixel text-lg text-electric-yellow hidden sm:block glow-yellow tracking-widest ml-2">
                                AARUNYA 2026
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={cn(
                                        "px-4 py-2 font-pixel text-[10px] tracking-wider transition-all duration-300 border-2 border-transparent",
                                        location.pathname === link.path
                                            ? "text-black bg-electric-yellow border-electric-yellow shadow-[4px_4px_0px_black] -translate-y-1"
                                            : "text-foreground hover:text-electric-yellow hover:border-electric-yellow hover:-translate-y-1"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 text-electric-yellow hover:text-white transition-colors border-2 border-electric-yellow bg-black/50"
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
                <div className="fixed inset-0 z-30 lg:hidden top-20 pointer-events-auto">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-30 lg:hidden bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    {/* Menu */}
                    <div className="fixed top-20 left-0 right-0 z-40 lg:hidden w-full bg-black/95 backdrop-blur-xl border-b-4 border-electric-yellow shadow-2xl animate-in slide-in-from-top-2 duration-300">
                        <div className="container mx-auto px-4 py-6 flex flex-col gap-2 max-h-[calc(100vh-80px)] overflow-y-auto">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "px-6 py-4 font-pixel text-sm tracking-widest transition-all duration-300 border-2",
                                        location.pathname === link.path
                                            ? "text-black bg-electric-yellow border-electric-yellow font-bold shadow-[4px_4px_0px_white]"
                                            : "text-foreground border-transparent hover:border-electric-yellow hover:text-electric-yellow"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
