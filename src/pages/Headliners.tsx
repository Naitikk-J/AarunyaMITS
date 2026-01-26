import { useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Headliners = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

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

    return (
        <div className="min-h-screen bg-[#05010D] text-white font-orbitron selection:bg-primary selection:text-black">
            <MainNavigation />

            {/* Header */}
            <div className="relative pt-40 pb-20 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
                    HEADLINERS
                </h1>
                <div className="h-1 w-[120px] bg-primary mx-auto shadow-neon" />
                <p className="mt-8 text-sm md:text-base font-share-tech text-muted-foreground tracking-[0.4em] uppercase opacity-60 max-w-3xl mx-auto px-6">
                    // DISCOVER THE MOST EXCITING EVENTS AND ACHIEVEMENTS
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

                {/* Events Grid - Styled like Schedule cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-40">
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

                                    {/* Background Accents */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredHeadliners.length === 0 && (
                    <div className="text-center py-24">
                        <div className="text-8xl mb-6 opacity-20 animate-pulse">🎭</div>
                        <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">
                            NO DATA STREAMS FOUND
                        </h3>
                        <p className="text-muted-foreground font-share-tech tracking-widest uppercase opacity-60">
                            // TRY SELECTING A DIFFERENT SECTOR OR CHECK BACK LATER
                        </p>
                    </div>
                )}
            </div>

            {/* Footer decoration */}
            <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
    );
};

export default Headliners;
