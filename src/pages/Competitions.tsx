import { MainNavigation } from '@/components/ui/MainNavigation';
import { Badge } from '@/components/ui/badge';

const Competitions = () => {
    const competitions = [
        {
            name: 'CODE_SPRINT',
            desc: 'FAST-PACED ALGORITHMIC COMBAT UNDER NEON PRESSURE.',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop',
            organizedBy: 'TECH_GUILD',
            tags: ['TEAM', 'TECH', 'TIMED'],
            difficulty: 'HARD',
        },
        {
            name: 'DESIGN_ARENA',
            desc: 'PIXEL-PERFECT BATTLES WITH BOLD VISUALS.',
            image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop',
            organizedBy: 'CREATIVE_COMMONS',
            tags: ['UI/UX', 'PITCH'],
            difficulty: 'MEDIUM',
        },
        {
            name: 'CULTURE_CLASH',
            desc: 'STAGE FACE-OFFS ACROSS MUSIC AND PERFORMANCE.',
            image: 'https://images.unsplash.com/photo-1514525253344-9914f25af0fc?w=800&auto=format&fit=crop',
            organizedBy: 'ART_COUNCIL',
            tags: ['STAGE', 'LIVE', 'CREW'],
            difficulty: 'EXTREME',
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-pixel selection:bg-electric-yellow selection:text-black">
            <MainNavigation />

            {/* Header */}
            <div className="relative pt-32 pb-16 overflow-hidden border-b-4 border-electric-yellow/20 bg-[linear-gradient(rgba(255,214,51,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,214,51,0.02)_1px,transparent_1px)] bg-[size:20px_20px]">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl text-electric-yellow mb-4 glow-yellow uppercase tracking-tighter">
                        BATTLE_ARENA
                    </h1>
                    <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.3em] max-w-2xl mx-auto">
                        Pick your discipline. Enter the arena. Dominate the board.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {competitions.map((c, idx) => (
                        <div 
                            key={c.name} 
                            className="
                                relative bg-black border-4 border-white/10 p-2
                                hover:border-electric-yellow hover:scale-[1.02] transition-all
                                group overflow-hidden
                            "
                        >
                            {/* Difficulty Tag */}
                            <div className="absolute top-4 right-4 z-20">
                                <div className={`text-[8px] px-2 py-1 border-2 ${
                                    c.difficulty === 'EXTREME' ? 'bg-red-600 border-red-400' : 
                                    c.difficulty === 'HARD' ? 'bg-orange-600 border-orange-400' : 
                                    'bg-blue-600 border-blue-400'
                                }`}>
                                    {c.difficulty}
                                </div>
                            </div>

                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden border-2 border-white/5 mb-4">
                                <img
                                    src={c.image}
                                    alt={c.name}
                                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                            </div>

                            {/* Info */}
                            <div className="p-4 space-y-4">
                                <h2 className="text-2xl text-electric-yellow tracking-tighter uppercase group-hover:glow-yellow-sm transition-all">
                                    {c.name}
                                </h2>
                                <p className="text-[10px] text-muted-foreground uppercase leading-relaxed h-12">
                                    {c.desc}
                                </p>
                                
                                <div className="pt-4 border-t-2 border-white/5 flex flex-wrap gap-2">
                                    {c.tags.map((tag) => (
                                        <Badge 
                                            key={tag} 
                                            className="bg-transparent border-2 border-electric-yellow/40 text-electric-yellow/80 rounded-none text-[8px]"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <button className="w-full mt-4 py-3 bg-white/5 hover:bg-electric-yellow hover:text-black border-2 border-white/10 hover:border-black transition-all text-[10px] font-bold tracking-widest uppercase">
                                    ENTER_COMPETITION
                                </button>
                            </div>

                            {/* Decorative ID Number */}
                            <div className="absolute -bottom-2 -right-2 text-white/5 text-4xl font-bold select-none">
                                0{idx + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Status */}
            <div className="container mx-auto px-6 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-4 border-dashed border-white/5">
                    <div className="font-pixel text-[10px] text-muted-foreground uppercase">
                        Current Arena Load: <span className="text-electric-yellow animate-pulse">OPTIMIZED</span>
                    </div>
                    <div className="font-pixel text-[10px] text-muted-foreground uppercase">
                        Total Prize Pool: <span className="text-electric-yellow">1,500,000 XP</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Competitions;
