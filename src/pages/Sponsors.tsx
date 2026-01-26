import { MainNavigation } from '@/components/ui/MainNavigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Sponsors = () => {
    const tiers = [
        {
            title: 'TITLE SPONSORS',
            description: 'PRIMARY POWER SOURCES FOR THE FESTIVAL GRID.',
            icon: '👑',
            level: 'PLATINUM',
            sponsors: [
                { name: 'TECH CORP', contribution: '500,000 XP' },
                { name: 'FUTURE INC', contribution: '500,000 XP' },
            ],
        },
        {
            title: 'GOLD SPONSORS',
            description: 'BOOSTERS THAT KEEP THE NEON RUNNING ALL NIGHT.',
            icon: '⭐',
            level: 'GOLD',
            sponsors: [
                { name: 'INNOVATE LTD', contribution: '250,000 XP' },
                { name: 'DIGITAL DYNAMICS', contribution: '250,000 XP' },
                { name: 'NEXUS LABS', contribution: '250,000 XP' },
            ],
        },
        {
            title: 'COMMUNITY PARTNERS',
            description: 'FRIENDS OF THE FEST AND LOCAL COLLABORATORS.',
            icon: '🤝',
            level: 'SILVER',
            sponsors: [
                { name: 'LOCAL CAFE', contribution: '50,000 XP' },
                { name: 'CAMPUS STORE', contribution: '50,000 XP' },
            ],
        },
    ];

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'PLATINUM': return 'bg-gradient-to-r from-primary to-secondary text-black';
            case 'GOLD': return 'bg-secondary text-black';
            case 'SILVER': return 'bg-white/20 text-white';
            default: return 'bg-primary text-black';
        }
    };

    return (
        <div className="min-h-screen bg-[#05010D] text-white font-orbitron selection:bg-primary selection:text-black">
            <MainNavigation />

            <div className="relative pt-40 pb-20 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
                    SPONSORS
                </h1>
                <div className="h-1 w-[120px] bg-primary mx-auto shadow-neon" />
                <p className="mt-8 text-sm md:text-base font-share-tech text-muted-foreground tracking-[0.4em] uppercase opacity-60 max-w-3xl mx-auto px-6">
                    // THE ALLIANCES POWERING AARUNYA 2026
                </p>
            </div>

            <div className="container mx-auto px-6 pb-40">
                <div className="space-y-16">
                    {tiers.map((tier, idx) => (
                        <div key={tier.title} className="group">
                            <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden hover:border-primary/30 shadow-[0_0_30px_rgba(188,19,254,0.05)] transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                    <div className="lg:col-span-4 p-10 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 mb-6">
                                            <Badge className={`${getLevelColor(tier.level)} font-bold tracking-widest text-[8px] rounded-none px-3 py-1 border-none`}>
                                                TIER_0{idx + 1}
                                            </Badge>
                                        </div>
                                        <div className="text-5xl mb-6 drop-shadow-[0_0_20px_rgba(188,19,254,0.4)]">
                                            {tier.icon}
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black text-white group-hover:text-primary transition-colors mb-4 tracking-tight">
                                            {tier.title}
                                        </h2>
                                        <p className="font-share-tech text-[10px] text-white/40 tracking-[0.3em] uppercase leading-relaxed">
                                            {tier.description}
                                        </p>
                                    </div>

                                    <div className="lg:col-span-8 p-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {tier.sponsors.map((sponsor) => (
                                                <div
                                                    key={sponsor.name}
                                                    className="relative p-6 bg-black/40 border border-white/5 rounded-lg hover:border-primary/40 hover:bg-black/60 transition-all group/card overflow-hidden"
                                                >
                                                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(188, 19, 254, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(188, 19, 254, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                                    
                                                    <div className="relative z-10 space-y-4">
                                                        <div className="text-xl font-bold text-white group-hover/card:text-primary transition-colors tracking-tight">
                                                            {sponsor.name}
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[8px] text-white/30 tracking-[0.4em] uppercase">Contribution</span>
                                                            <span className="font-share-tech text-sm text-secondary tracking-[0.1em] font-bold">{sponsor.contribution}</span>
                                                        </div>
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

                <div className="mt-20 text-center">
                    <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden p-12">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(188, 19, 254, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(188, 19, 254, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <div className="relative z-10">
                            <div className="text-5xl mb-6 drop-shadow-[0_0_20px_rgba(188,19,254,0.4)]">🚀</div>
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
                                BECOME A SPONSOR
                            </h3>
                            <p className="font-share-tech text-[10px] text-white/40 tracking-[0.3em] uppercase leading-relaxed max-w-xl mx-auto mb-8">
                                JOIN THE ALLIANCE AND POWER THE NEXT GENERATION OF INNOVATION
                            </p>
                            <Button
                                className="bg-primary text-black font-orbitron text-[10px] px-10 py-6 rounded-none border-none shadow-neon hover:shadow-[0_0_30px_rgba(188,19,254,0.4)] transition-all tracking-[0.3em] font-bold"
                            >
                                CONTACT US
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
    );
};

export default Sponsors;
