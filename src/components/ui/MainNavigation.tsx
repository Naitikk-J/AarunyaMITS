import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

export const MainNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-card bg-background/85 backdrop-blur-xl border-b border-secondary/40 m-0 rounded-none">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="font-orbitron text-2xl font-bold bg-gradient-to-r from-kidcore-blue via-kidcore-pink to-kidcore-orange bg-clip-text text-transparent animate-rainbow"
                    >
                        AARUNYA
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    "px-4 py-2 text-xs font-orbitron tracking-wider transition-all duration-300 rounded-lg",
                                    location.pathname === link.path
                                        ? "text-kidcore-black bg-kidcore-yellow shadow-lg scale-105"
                                        : "text-foreground hover:text-kidcore-yellow hover:bg-kidcore-blue/20 hover:scale-105"
                                )}
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
                        className="lg:hidden p-2 text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="lg:hidden absolute top-16 left-0 right-0 glass-card bg-background/95 backdrop-blur-xl border-b border-secondary/40 m-0 rounded-none">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "px-4 py-2 text-sm font-orbitron tracking-wider transition-all duration-300 rounded-lg",
                                    location.pathname === link.path
                                        ? "text-kidcore-black bg-kidcore-yellow"
                                        : "text-foreground hover:text-kidcore-yellow hover:bg-kidcore-blue/20"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex gap-2 mt-4 pt-4 border-t border-kidcore-blue/30">
                            <Link to="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" size="sm" className="w-full font-orbitron text-xs tracking-wider hover:bg-kidcore-blue/30 hover:text-kidcore-yellow">
                                    LOGIN
                                </Button>
                            </Link>
                            <Link to="/register" className="flex-1" onClick={() => setIsOpen(false)}>
                                <Button size="sm" className="w-full font-orbitron text-xs tracking-wider kidcore-btn">
                                    REGISTER
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
