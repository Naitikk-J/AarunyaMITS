import { MainNavigation } from '@/components/ui/MainNavigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, Variants } from 'framer-motion';
import { GlitchText } from '@/components/GlitchText';
import { useResponsive } from '@/hooks/use-responsive';

const ContactUs = () => {
    const { isMobile } = useResponsive();

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
        {
            icon: '📷',
            label: 'Instagram',
            handle: '@aarunya.mits',
            url: 'https://www.instagram.com/aarunya.mits/'
        },
        {
            icon: '🌐',
            label: 'Aarunya 1.0',
            handle: 'View Archive',
            url: 'https://web.mitsgwalior.in/notifications/aarunya-2025-the-official-fest-of-madhav-institute-of-technology-and-science-mits-du-will-be-held-on-march-7-9-2025'
        },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#05010D] text-white font-orbitron selection:bg-primary selection:text-black overflow-x-hidden">
            <MainNavigation />

            {/* Animated Backgrounds - Glowing Stars */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(188,19,254,0.1),transparent_70%)]" />
                <div className="absolute inset-0 animate-[pulse_4s_infinite]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '50px 50px', opacity: 0.1 }} />
            </div>

            <div className="content-scale">
                {/* HEADER */}
                <div className="relative pt-32 md:pt-48 pb-12 text-center px-4">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.08)_0%,transparent_70%)] pointer-events-none" />

                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-2xl md:text-3xl lg:text-5xl font-black tracking-tight mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            <GlitchText text="CONTACT" />
                        </h1>

                        <div className="h-0.5 w-16 md:w-24 bg-primary mx-auto shadow-[0_0_10px_#BC13FE]" />

                        <p className="mt-4 text-[9px] sm:text-[10px] md:text-xs font-share-tech text-white/50 uppercase max-w-xl mx-auto tracking-[0.2em]">
              // BROADCAST YOUR MESSAGE TO THE CORE TEAM
                        </p>
                    </motion.div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 pb-20 max-w-5xl">
                    {/* CONTACT CARDS */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
                    >
                        {contacts.map((c) => (
                            <motion.div
                                key={c.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(188, 19, 254, 0.05)" }}
                                className="relative bg-[#0D0221]/60 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-primary/40 group"
                            >
                                <Badge className="absolute top-4 right-4 bg-primary/90 text-black text-[9px] tracking-widest px-2 py-0.5">
                                    {c.channel}
                                </Badge>

                                <div className="space-y-4">
                                    <div className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-300">{c.icon}</div>
                                    <h2 className="text-sm font-black text-white/90">{c.title}</h2>
                                    <p className="font-share-tech text-[10px] text-white/40 tracking-[0.1em] uppercase">
                                        {c.description}
                                    </p>

                                    <div className="space-y-2 pt-3 border-t border-white/5">
                                        {c.items.map((item) => (
                                            <div key={item} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_5px_#BC13FE]" />
                                                <span className="text-[10px] tracking-widest text-white/70 group-hover:text-white transition-colors">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* FORM + INFO */}

                </div>

                <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </div>
        </div>
    );
};

export default ContactUs;
