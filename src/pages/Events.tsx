import { useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RESPONSIVE_FONTS, RESPONSIVE_SPACING, RESPONSIVE_BUTTON_SIZES } from '@/lib/responsive-styles';

const Events = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Headliners data
    const headliners = [
        {
            id: 1,
            title: 'Campus Tech Summit 2024',
            category: 'tech',
            date: 'March 15, 2024',
            description: 'Join us for the biggest tech event of the year featuring AI workshops, hackathons, and networking.',
            status: 'upcoming',
            image: '/api/placeholder/400/200',
            attendees: 500
        },
        {
            id: 2,
            title: 'Euphoria Music Festival',
            category: 'music',
            date: 'April 20, 2024',
            description: 'Experience the ultimate music festival with top artists and immersive performances.',
            status: 'featured',
            image: '/api/placeholder/400/200',
            attendees: 1200
        },
        {
            id: 3,
            title: 'Innovation Challenge',
            category: 'innovation',
            date: 'May 5, 2024',
            description: 'Compete in our annual innovation challenge and showcase your creative solutions.',
            status: 'registration',
            image: '/api/placeholder/400/200',
            attendees: 300
        },
        {
            id: 4,
            title: 'Cultural Exchange Night',
            category: 'culture',
            date: 'June 10, 2024',
            description: 'Celebrate diversity with food, music, and traditions from around the world.',
            status: 'upcoming',
            image: '/api/placeholder/400/200',
            attendees: 800
        }
    ];

    // Events data
    const zones = [
        {
            title: 'CULTURAL_ZONE',
            description: 'NEON STAGES, PERFORMANCES, AND ARTISTIC TAKEOVERS.',
            icon: '🎭',
            events: [
                { name: 'GALA_NIGHT', status: 'LIVE', timeLeft: null },
                { name: 'STREET_DANCE', status: 'UPCOMING', timeLeft: '1H 45M' },
                { name: 'ART_BATTLE', status: 'CLOSED', timeLeft: null },
            ],
        },
        {
            title: 'TECH_ZONE',
            description: 'HACKER LABS, WORKSHOPS, AND INNOVATION NODES.',
            icon: '⚡',
            events: [
                { name: 'ROBO_WARS', status: 'LIVE', timeLeft: null },
                { name: 'CODE_QUEST', status: 'UPCOMING', timeLeft: '2H 10M' },
                { name: 'IOT_EXPO', status: 'CLOSED', timeLeft: null },
            ],
        },
        {
            title: 'FUN_ZONE',
            description: 'ARCADE STREETS, POPUPS, AND SURPRISE QUESTS.',
            icon: '🎮',
            events: [
                { name: 'PIXEL_ARENA', status: 'LIVE', timeLeft: null },
                { name: 'TREASURE_HUNT', status: 'UPCOMING', timeLeft: '50M' },
                { name: 'VR_WORLD', status: 'CLOSED', timeLeft: null },
            ],
        },
    ];

    // Competitions data
    const competitions = [
        {
            name: 'CODE_SPRINT',
            desc: 'FAST-PACED ALGORITHMIC COMBAT UNDER NEON PRESSURE.',
            icon: '⚡',
            organizedBy: 'TECH_GUILD',
            tags: ['TEAM', 'TECH', 'TIMED'],
            difficulty: 'HARD',
            prize: '50,000 XP',
        },
        {
            name: 'DESIGN_ARENA',
            desc: 'PIXEL-PERFECT BATTLES WITH BOLD VISUALS.',
            icon: '🎨',
            organizedBy: 'CREATIVE_COMMONS',
            tags: ['UI/UX', 'PITCH'],
            difficulty: 'MEDIUM',
            prize: '35,000 XP',
        },
        {
            name: 'CULTURE_CLASH',
            desc: 'STAGE FACE-OFFS ACROSS MUSIC AND PERFORMANCE.',
            icon: '🎭',
            organizedBy: 'ART_COUNCIL',
            tags: ['STAGE', 'LIVE', 'CREW'],
            difficulty: 'EXTREME',
            prize: '75,000 XP',
        },
        {
            name: 'ROBO_WARS',
            desc: 'BUILD. BATTLE. DOMINATE THE ARENA.',
            icon: '🤖',
            organizedBy: 'MECH_DIVISION',
            tags: ['HARDWARE', 'COMBAT'],
            difficulty: 'EXTREME',
            prize: '100,000 XP',
        },
    ];

    const categories = [
        { id: 'all', label: 'All Events', color: 'bg-primary' },
        { id: 'tech', label: 'Technology', color: 'bg-primary' },
        { id: 'music', label: 'Music', color: 'bg-secondary' },
        { id: 'innovation', label: 'Innovation', color: 'bg-accent' },
        { id: 'culture', label: 'Culture', color: 'bg-primary-glow' }
    ];

    const filteredHeadliners = selectedCategory === 'all'
        ? headliners
        : headliners.filter(event => event.category === selectedCategory);

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            upcoming: { label: 'Upcoming', color: 'bg-primary' },
            featured: { label: 'Featured', color: 'bg-secondary' },
            registration: { label: 'Open for Registration', color: 'bg-accent' },
            past: { label: 'Past Event', color: 'bg-muted' }
        };
        return statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming;
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'EXTREME': return 'bg-red-600 text-white';
            case 'HARD': return 'bg-orange-500 text-black';
            case 'MEDIUM': return 'bg-secondary text-black';
            default: return 'bg-primary text-black';
        }
    };

    return (
        <div className="min-h-screen bg-[#05010D] text-white font-orbitron selection:bg-primary selection:text-black">
            <MainNavigation />

            {/* Header */}
            <div className="relative pt-40 pb-20 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
                    EVENTS
                </h1>
                <div className="h-1 w-[120px] bg-primary mx-auto shadow-neon" />
                <p className="mt-8 text-sm md:text-base font-share-tech text-muted-foreground tracking-[0.4em] uppercase opacity-60 max-w-3xl mx-auto px-6">
                    // DISCOVER THE MOST EXCITING EVENTS, HEADLINERS, AND COMPETITIONS
                </p>
            </div>

            {/* Category Filter */}
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`font-orbitron text-[10px] tracking-[0.3em] uppercase transition-all px-8 py-6 rounded-none border-2 ${
                                selectedCategory === category.id
                                    ? 'bg-primary border-primary text-black shadow-neon'
                                    : 'bg-transparent border-white/10 text-white/60 hover:border-primary/40 hover:text-primary'
                            }`}
                        >
                            {category.label}
                        </Button>
                    ))}
                </div>

                {/* Headliners Section */}
                <div className="mb-24">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-4xl font-black text-white tracking-tight">HEADLINERS</h2>
                        <div className="h-1 w-32 bg-primary" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredHeadliners.map((event) => {
                            const statusBadge = getStatusBadge(event.status);
                            return (
                                <div key={event.id} className="group">
                                    <div className="relative h-full bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden hover:border-primary shadow-[0_0_30px_rgba(188,19,254,0.05)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(188,19,254,0.15)] flex flex-col">
                                        <div className="absolute top-4 right-4 z-20">
                                            <Badge className={`${statusBadge.color} text-black font-bold tracking-widest text-[8px] rounded-none px-3 py-1 border-none`}>
                                                {statusBadge.label}
                                            </Badge>
                                        </div>

                                        <div className="h-48 bg-black/40 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(188, 19, 254, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(188, 19, 254, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                            <span className="text-6xl group-hover:scale-125 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(188,19,254,0.4)] relative z-10">
                                                {event.category === 'tech' ? '⚡' : event.category === 'music' ? '🔊' : event.category === 'innovation' ? '💡' : '🎨'}
                                            </span>
                                        </div>

                                        <div className="p-8 flex-grow flex flex-col">
                                            <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-primary transition-colors mb-2 tracking-tight">
                                                {event.title}
                                            </h3>
                                            <p className="font-share-tech text-[10px] text-primary/60 tracking-[0.3em] uppercase mb-4">
                                                {event.date} // {event.attendees} REGISTERED
                                            </p>
                                            <p className="text-muted-foreground text-sm mb-8 leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                                {event.description}
                                            </p>

                                            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] text-white/30 tracking-[0.4em] uppercase mb-1">Sector</span>
                                                    <span className="text-[10px] font-share-tech text-secondary tracking-[0.2em] font-bold">{event.category.toUpperCase()}</span>
                                                </div>

                                                <Button
                                                    size="sm"
                                                    className="bg-transparent border border-primary/30 text-primary hover:bg-primary hover:text-black transition-all rounded-none text-[9px] tracking-[0.4em] font-bold px-6 py-4"
                                                >
                                                    {event.status === 'registration' ? 'ACCESS NOW' : 'DETAILS'}
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Events Zones Section */}
                <div className="mb-24">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-4xl font-black text-white tracking-tight">EVENT ZONES</h2>
                        <div className="h-1 w-32 bg-secondary" />
                    </div>

                    <div className="space-y-24">
                        {zones.map((zone, idx) => (
                            <div key={zone.title} className="group">
                                <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden hover:border-primary/30 shadow-[0_0_30px_rgba(188,19,254,0.05)] transition-all duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                        <div className="lg:col-span-4 p-10 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-center">
                                            <div className="flex items-center gap-4 mb-6">
                                                <Badge className="bg-primary text-black font-bold tracking-widest text-[8px] rounded-none px-3 py-1 border-none">
                                                    ZONE_0{idx + 1}
                                                </Badge>
                                            </div>
                                            <div className="text-5xl mb-6 drop-shadow-[0_0_20px_rgba(188,19,254,0.4)]">
                                                {zone.icon}
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-black text-white group-hover:text-primary transition-colors mb-4 tracking-tight">
                                                {zone.title}
                                            </h2>
                                            <p className="font-share-tech text-[10px] text-white/40 tracking-[0.3em] uppercase leading-relaxed">
                                                {zone.description}
                                            </p>
                                            <div className="mt-8 h-1 w-full bg-white/5 relative overflow-hidden rounded-full">
                                                <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-secondary/60 animate-[loading_3s_ease-in-out_infinite]" />
                                            </div>
                                        </div>

                                        <div className="lg:col-span-8 p-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {zone.events.map((event) => (
                                                    <div
                                                        key={event.name}
                                                        className="relative p-6 bg-black/40 border border-white/5 rounded-lg hover:border-primary/40 hover:bg-black/60 transition-all group/card overflow-hidden"
                                                    >
                                                        <div className="absolute top-3 right-3">
                                                            {event.status === 'LIVE' && (
                                                                <div className="bg-red-600 text-[8px] px-2 py-1 rounded-sm animate-pulse font-bold tracking-wider">LIVE</div>
                                                            )}
                                                            {event.status === 'UPCOMING' && (
                                                                <div className="bg-secondary text-black text-[8px] px-2 py-1 rounded-sm font-bold tracking-wider">T-{event.timeLeft}</div>
                                                            )}
                                                            {event.status === 'CLOSED' && (
                                                                <div className="bg-white/20 text-[8px] px-2 py-1 rounded-sm font-bold tracking-wider">OFFLINE</div>
                                                            )}
                                                        </div>

                                                        <div className="space-y-4 pt-4">
                                                            <div className="text-lg font-bold text-white group-hover/card:text-primary transition-colors tracking-tight">
                                                                {event.name}
                                                            </div>
                                                            <p className="text-[9px] text-muted-foreground tracking-wider leading-relaxed">
                                                                Access this node to earn experience points and unlock rewards.
                                                            </p>
                                                            <Button
                                                                size="sm"
                                                                className="bg-transparent border border-primary/30 text-primary hover:bg-primary hover:text-black transition-all rounded-none text-[8px] tracking-[0.3em] font-bold px-4 py-2 w-full"
                                                            >
                                                                VIEW DETAILS
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Competitions Section */}
                <div className="mb-24">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-4xl font-black text-white tracking-tight">COMPETITIONS</h2>
                        <div className="h-1 w-32 bg-accent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {competitions.map((c, idx) => (
                            <div key={c.name} className="group">
                                <div className="relative h-full bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden hover:border-primary shadow-[0_0_30px_rgba(188,19,254,0.05)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(188,19,254,0.15)] flex flex-col">
                                    <div className="absolute top-4 right-4 z-20">
                                        <Badge className={`${getDifficultyColor(c.difficulty)} font-bold tracking-widest text-[8px] rounded-none px-3 py-1 border-none`}>
                                            {c.difficulty}
                                        </Badge>
                                    </div>

                                    <div className="h-48 bg-black/40 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(188, 19, 254, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(188, 19, 254, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                        <span className="text-7xl group-hover:scale-125 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(188,19,254,0.4)] relative z-10">
                                            {c.icon}
                                        </span>
                                        <div className="absolute -bottom-2 -right-2 text-white/5 text-6xl font-black select-none">
                                            0{idx + 1}
                                        </div>
                                    </div>

                                    <div className="p-8 flex-grow flex flex-col">
                                        <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-primary transition-colors mb-2 tracking-tight">
                                            {c.name}
                                        </h3>
                                        <p className="font-share-tech text-[10px] text-primary/60 tracking-[0.3em] uppercase mb-4">
                                            BY {c.organizedBy}
                                        </p>
                                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                            {c.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {c.tags.map((tag) => (
                                                <Badge 
                                                    key={tag} 
                                                    className="bg-transparent border border-primary/30 text-primary/80 rounded-none text-[8px] tracking-widest"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[8px] text-white/30 tracking-[0.4em] uppercase mb-1">Prize Pool</span>
                                                <span className="text-sm font-share-tech text-secondary tracking-[0.1em] font-bold">{c.prize}</span>
                                            </div>

                                            <Button
                                                size="sm"
                                                className="bg-transparent border border-primary/30 text-primary hover:bg-primary hover:text-black transition-all rounded-none text-[9px] tracking-[0.4em] font-bold px-6 py-4"
                                            >
                                                ENTER ARENA
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary Section */}
                <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4">
                            <span className="font-share-tech text-[10px] text-white/40 tracking-[0.3em] uppercase">
                                HEADLINERS
                            </span>
                            <span className="text-xl font-black text-primary">{headliners.length}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-share-tech text-[10px] text-white/40 tracking-[0.3em] uppercase">
                                EVENT ZONES
                            </span>
                            <span className="text-xl font-black text-secondary">{zones.length}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-share-tech text-[10px] text-white/40 tracking-[0.3em] uppercase">
                                COMPETITIONS
                            </span>
                            <span className="text-xl font-black text-accent">{competitions.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
            `}} />
        </div>
    );
};

export default Events;