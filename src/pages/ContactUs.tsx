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
    { icon: '📷', label: 'Instagram', handle: '@aarunya_mits' },
    { icon: '🐦', label: 'Twitter', handle: '@aarunya_mits' },
    { icon: '📘', label: 'Facebook', handle: '/aarunya.mits' },
    { icon: '📺', label: 'YouTube', handle: '/aarunya' },
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* FORM */}
            <div className="bg-[#0D0221]/60 border border-white/10 rounded-xl p-6 sm:p-8 hover:border-primary/20 transition-colors duration-500">
              <Badge className="bg-primary/90 text-black text-[9px] tracking-widest px-2 py-0.5 mb-4">
                TRANSMISSION
              </Badge>

              <div className="text-3xl mb-4 grayscale hover:grayscale-0 transition-all duration-500">📡</div>

              <h2 className="text-lg sm:text-xl font-black mb-2 text-white/90">
                BROADCAST MESSAGE
              </h2>

              <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase mb-6">
                WE'LL GET BACK TO YOU WITHIN 24 HOURS
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[9px] tracking-[0.2em] uppercase text-white/40">
                      PLAYER_ID
                    </Label>
                    <Input className="h-10 bg-black/40 border-white/10 text-xs focus:border-primary/50 transition-colors" placeholder="ENTER NAME" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[9px] tracking-[0.2em] uppercase text-white/40">
                      COMM_NODE
                    </Label>
                    <Input type="email" className="h-10 bg-black/40 border-white/10 text-xs focus:border-primary/50 transition-colors" placeholder="ENTER EMAIL" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[9px] tracking-[0.2em] uppercase text-white/40">
                    TRANSMISSION_DATA
                  </Label>
                  <textarea className="w-full min-h-[120px] bg-black/40 border border-white/10 rounded-md p-3 resize-none text-xs focus:border-primary/50 transition-colors outline-none text-white/80 placeholder:text-white/20" placeholder="TYPE YOUR MESSAGE..." />
                </div>

                <Button className="w-full h-12 text-xs tracking-[0.2em] font-bold bg-primary hover:bg-primary/90 text-black transition-all">
                  SEND SIGNAL
                </Button>
              </form>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              {/* SOCIAL */}
              <div className="bg-[#0D0221]/60 border border-white/10 rounded-xl p-6 sm:p-8 hover:border-primary/20 transition-colors duration-500">
                <Badge className="bg-secondary/90 text-black text-[9px] tracking-widest px-2 py-0.5 mb-4">
                  SOCIAL NETWORK
                </Badge>

                <div className="grid grid-cols-2 gap-3">
                  {socials.map((s) => (
                    <motion.div
                      key={s.label}
                      whileHover={{ y: -2, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                      className="bg-black/40 border border-white/5 rounded-lg p-4 text-center cursor-pointer transition-colors"
                    >
                      <div className="text-2xl mb-1">{s.icon}</div>
                      <div className="text-[9px] tracking-[0.2em] text-white/40 uppercase mb-1">
                        {s.label}
                      </div>
                      <div className="text-xs text-primary font-bold">
                        {s.handle}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SIGNAL & LOCATION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#0D0221]/60 border border-white/10 rounded-xl p-5 flex flex-col justify-center gap-2 hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-white/40">
                      SIGNAL
                    </span>
                    <span className="text-secondary font-bold tracking-[0.1em] text-xs">
                      MAXIMUM
                    </span>
                  </div>
                  <span className="text-[9px] tracking-widest text-white/20">
                    LATENCY: 4MS
                  </span>
                </div>

                <div className="bg-[#0D0221]/60 border border-white/10 rounded-xl p-5 flex items-center gap-3 hover:border-primary/20 transition-colors">
                  <div className="text-2xl">📍</div>
                  <div>
                    <div className="text-[9px] tracking-[0.2em] uppercase text-white/30 mb-0.5">
                      LOCATION
                    </div>
                    <div className="font-bold text-xs text-white/90">MITS GWALIOR</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </div>
  );
};

export default ContactUs;
