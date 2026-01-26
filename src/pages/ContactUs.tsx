import { MainNavigation } from '@/components/ui/MainNavigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ContactUs = () => {
    const contacts = [
        {
            title: 'GENERAL_PASS',
            description: 'QUESTIONS, CREDENTIALS, AND INFO.',
            icon: '📧',
            channel: 'CH_01',
            items: ['HELP@AARUNYA.GAME', 'EXT_101'],
        },
        {
            title: 'GUILD_PARTNER',
            description: 'SPONSORSHIPS AND ALLIANCES.',
            icon: '🤝',
            channel: 'CH_02',
            items: ['GUILD@AARUNYA.GAME', 'EXT_202'],
        },
        {
            title: 'ARENA_SUPPORT',
            description: 'COMPETITION RULES AND DISPUTES.',
            icon: '🎮',
            channel: 'CH_03',
            items: ['ARENA@AARUNYA.GAME', 'EXT_303'],
        },
    ];

    const socials = [
        { icon: '📷', label: 'Instagram', handle: '@aarunya_mits' },
        { icon: '🐦', label: 'Twitter', handle: '@aarunya_mits' },
        { icon: '📘', label: 'Facebook', handle: '/aarunya.mits' },
        { icon: '📺', label: 'YouTube', handle: '/aarunya' },
    ];

    return (
        <div className="min-h-screen bg-[#05010D] text-white font-orbitron selection:bg-primary selection:text-black">
            <MainNavigation />

            <div className="relative pt-40 pb-20 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
                    CONTACT
                </h1>
                <div className="h-1 w-[120px] bg-primary mx-auto shadow-neon" />
                <p className="mt-8 text-sm md:text-base font-share-tech text-muted-foreground tracking-[0.4em] uppercase opacity-60 max-w-3xl mx-auto px-6">
                    // BROADCAST YOUR MESSAGE TO THE CORE TEAM
                </p>
            </div>

            <div className="container mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {contacts.map((c) => (
                        <div key={c.title} className="group">
                            <div className="relative h-full bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden hover:border-primary shadow-[0_0_30px_rgba(188,19,254,0.05)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(188,19,254,0.15)] p-8">
                                <div className="absolute top-4 right-4 z-20">
                                    <Badge className="bg-primary text-black font-bold tracking-widest text-[8px] rounded-none px-3 py-1 border-none">
                                        {c.channel}
                                    </Badge>
                                </div>

                                <div className="space-y-6">
                                    <div className="text-4xl drop-shadow-[0_0_20px_rgba(188,19,254,0.4)] group-hover:scale-110 transition-transform inline-block">
                                        {c.icon}
                                    </div>
                                    <h2 className="text-xl font-black text-white group-hover:text-primary transition-colors tracking-tight">
                                        {c.title}
                                    </h2>
                                    <p className="font-share-tech text-[10px] text-white/40 tracking-[0.2em] uppercase leading-relaxed">
                                        {c.description}
                                    </p>
                                    
                                    <div className="space-y-3 pt-6 border-t border-white/5">
                                        {c.items.map((item) => (
                                            <div key={item} className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                                <span className="text-[10px] text-white hover:text-primary transition-colors cursor-pointer tracking-widest">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden p-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50 pointer-events-none" />
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(188, 19, 254, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(188, 19, 254, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <Badge className="bg-primary text-black font-bold tracking-widest text-[8px] rounded-none px-3 py-1 border-none">
                                    TRANSMISSION
                                </Badge>
                            </div>
                            <div className="text-5xl mb-6 drop-shadow-[0_0_20px_rgba(188,19,254,0.4)]">📡</div>
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
                                BROADCAST MESSAGE
                            </h2>
                            <p className="font-share-tech text-[10px] text-white/40 tracking-[0.3em] uppercase leading-relaxed mb-8">
                                WE'LL GET BACK TO YOU WITHIN 24 HOURS
                            </p>

                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2 group">
                                        <Label className="font-share-tech text-[10px] text-white/40 group-focus-within:text-primary transition-colors tracking-[0.3em] uppercase">
                                            PLAYER_ID
                                        </Label>
                                        <Input 
                                            className="bg-black/40 border border-white/10 focus:border-primary rounded-lg font-orbitron text-sm h-12 transition-all placeholder:text-white/20"
                                            placeholder="YOUR NAME"
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <Label className="font-share-tech text-[10px] text-white/40 group-focus-within:text-primary transition-colors tracking-[0.3em] uppercase">
                                            COMM_NODE
                                        </Label>
                                        <Input 
                                            type="email"
                                            className="bg-black/40 border border-white/10 focus:border-primary rounded-lg font-orbitron text-sm h-12 transition-all placeholder:text-white/20"
                                            placeholder="EMAIL@DOMAIN.COM"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <Label className="font-share-tech text-[10px] text-white/40 group-focus-within:text-primary transition-colors tracking-[0.3em] uppercase">
                                        TRANSMISSION_DATA
                                    </Label>
                                    <textarea 
                                        className="w-full bg-black/40 border border-white/10 focus:border-primary rounded-lg font-orbitron text-sm p-4 transition-all placeholder:text-white/20 min-h-[150px] resize-none focus:outline-none"
                                        placeholder="YOUR MESSAGE..."
                                    />
                                </div>

                                <Button 
                                    className="w-full bg-primary text-black font-orbitron text-[10px] h-14 rounded-lg border-none shadow-neon hover:shadow-[0_0_30px_rgba(188,19,254,0.4)] transition-all tracking-[0.3em] font-bold"
                                >
                                    SEND SIGNAL
                                </Button>
                            </form>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden p-10">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(188, 19, 254, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(188, 19, 254, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <Badge className="bg-secondary text-black font-bold tracking-widest text-[8px] rounded-none px-3 py-1 border-none">
                                        SOCIAL NETWORK
                                    </Badge>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    {socials.map((social) => (
                                        <a 
                                            key={social.label}
                                            href="#"
                                            className="group/social flex flex-col items-center gap-2 p-6 bg-black/40 border border-white/5 rounded-lg hover:border-primary/40 hover:bg-black/60 transition-all text-center"
                                        >
                                            <span className="text-3xl group-hover/social:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(188,19,254,0.4)]">{social.icon}</span>
                                            <div className="font-share-tech text-[8px] text-white/30 tracking-[0.3em] uppercase">
                                                {social.label}
                                            </div>
                                            <div className="text-[10px] text-primary font-bold">
                                                {social.handle}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden p-8">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <span className="font-share-tech text-[10px] text-white/40 tracking-[0.3em] uppercase">
                                        SIGNAL STRENGTH
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="font-share-tech text-[10px] text-secondary tracking-[0.2em] font-bold">MAXIMUM</span>
                                    </span>
                                </div>
                                <span className="font-share-tech text-[8px] text-white/20 tracking-widest">
                                    LATENCY: 4MS
                                </span>
                            </div>
                        </div>

                        <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden p-8">
                            <div className="flex items-center gap-6">
                                <div className="text-4xl drop-shadow-[0_0_20px_rgba(188,19,254,0.4)]">📍</div>
                                <div>
                                    <div className="font-share-tech text-[8px] text-white/30 tracking-[0.4em] uppercase mb-2">
                                        LOCATION
                                    </div>
                                    <div className="text-lg font-bold text-white">
                                        MITS GWALIOR, MP
                                    </div>
                                    <div className="font-share-tech text-[10px] text-primary/60 tracking-[0.2em] uppercase mt-1">
                                        MADHYA PRADESH, INDIA
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
    );
};

export default ContactUs;
