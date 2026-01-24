import { MainNavigation } from '@/components/ui/MainNavigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Competitions = () => {
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

            <div className="relative pt-40 pb-20 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
                    COMPETITIONS
                </h1>
                <div className="h-1 w-[120px] bg-primary mx-auto shadow-neon" />
                <p className="mt-8 text-sm md:text-base font-share-tech text-muted-foreground tracking-[0.4em] uppercase opacity-60 max-w-3xl mx-auto px-6">
                    // PICK YOUR DISCIPLINE. ENTER THE ARENA. DOMINATE.
                </p>
            </div>

            <div className="container mx-auto px-6 pb-20">
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

            <div className="container mx-auto px-6 pb-40">
                <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden p-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <span className="font-share-tech text-[10px] text-white/40 tracking-[0.3em] uppercase">
                                ARENA STATUS
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="font-share-tech text-[10px] text-secondary tracking-[0.2em] font-bold">OPTIMIZED</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-share-tech text-[10px] text-white/40 tracking-[0.3em] uppercase">
                                TOTAL PRIZE POOL
                            </span>
                            <span className="text-xl font-black text-primary">260,000 XP</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
    );
};

export default Competitions;
