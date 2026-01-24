import { MainNavigation } from '@/components/ui/MainNavigation';
import { Badge } from '@/components/ui/badge';

const ContactUs = () => {
    const contacts = [
        {
            title: 'GENERAL_PASS',
            description: 'QUESTIONS, CREDENTIALS, AND INFO.',
            channel: 'CH_01',
            items: ['HELP@AARUNYA.GAME', 'EXT_101'],
        },
        {
            title: 'GUILD_PARTNER',
            description: 'SPONSORSHIPS AND ALLIANCES.',
            channel: 'CH_02',
            items: ['GUILD@AARUNYA.GAME', 'EXT_202'],
        },
        {
            title: 'ARENA_SUPPORT',
            description: 'COMPETITION RULES AND DISPUTES.',
            channel: 'CH_03',
            items: ['ARENA@AARUNYA.GAME', 'EXT_303'],
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-pixel selection:bg-electric-yellow selection:text-black">
            <MainNavigation />

            {/* Header */}
            <div className="relative pt-32 pb-16 overflow-hidden border-b-4 border-electric-yellow/20">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl text-electric-yellow mb-4 glow-yellow uppercase tracking-tighter">
                        SIGNAL_RECEIVER
                    </h1>
                    <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.3em] max-w-2xl mx-auto">
                        Broadcast your message to the core team.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {contacts.map((c) => (
                        <div 
                            key={c.title} 
                            className="
                                relative p-8 border-4 border-white/10 bg-white/5
                                hover:border-electric-yellow hover:bg-white/10 
                                transition-all group overflow-hidden
                            "
                        >
                            {/* Channel Indicator */}
                            <div className="absolute top-0 right-0 p-2 bg-electric-yellow text-black text-[8px] font-bold">
                                {c.channel}
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-2xl text-electric-yellow uppercase tracking-tight group-hover:glow-yellow-sm">
                                    {c.title}
                                </h2>
                                <p className="text-[10px] text-muted-foreground uppercase leading-relaxed">
                                    {c.description}
                                </p>
                                
                                <div className="space-y-2 pt-4 border-t-2 border-white/5">
                                    {c.items.map((item) => (
                                        <div key={item} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-electric-yellow animate-pulse" />
                                            <span className="text-[10px] text-white hover:text-electric-yellow transition-colors cursor-pointer uppercase">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Form */}
                <div className="mt-20 max-w-2xl mx-auto p-10 border-4 border-electric-yellow/20 bg-black relative">
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-electric-yellow" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-electric-yellow" />

                    <h2 className="text-2xl text-center text-white mb-10 uppercase tracking-tighter">BROADCAST_MESSAGE</h2>
                    
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input 
                                className="bg-black border-2 border-white/10 p-4 font-pixel text-[10px] focus:border-electric-yellow outline-none uppercase"
                                placeholder="PLAYER_ID"
                            />
                            <input 
                                className="bg-black border-2 border-white/10 p-4 font-pixel text-[10px] focus:border-electric-yellow outline-none uppercase"
                                placeholder="COMM_NODE"
                            />
                        </div>
                        <textarea 
                            className="w-full bg-black border-2 border-white/10 p-4 font-pixel text-[10px] focus:border-electric-yellow outline-none min-h-[150px] uppercase"
                            placeholder="TRANSMISSION_DATA..."
                        />
                        <button className="w-full py-4 bg-electric-yellow text-black font-bold text-xs uppercase hover:bg-white transition-colors shadow-[4px_4px_0px_#444]">
                            SEND_SIGNAL
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Decoration */}
            <div className="py-20 text-center">
                <p className="text-[8px] text-muted-foreground uppercase tracking-[0.5em]">
                    Signal strength: <span className="text-green-500">MAXIMUM</span> | Latency: 4ms
                </p>
            </div>
        </div>
    );
};

export default ContactUs;
