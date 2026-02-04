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

      {/* HEADER */}
      <div className="relative pt-28 md:pt-40 pb-16 md:pb-20 text-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
          CONTACT
        </h1>

        <div className="h-1 w-20 md:w-28 bg-primary mx-auto shadow-neon" />

        <p className="mt-6 text-xs sm:text-sm md:text-base lg:text-lg font-share-tech text-muted-foreground uppercase opacity-60 max-w-3xl mx-auto tracking-widest">
          // BROADCAST YOUR MESSAGE TO THE CORE TEAM
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pb-20">
        {/* CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {contacts.map((c) => (
            <div
              key={c.title}
              className="relative bg-[#0D0221]/60 border-2 border-white/5 rounded-xl p-6 sm:p-8"
            >
              <Badge className="absolute top-4 right-4 bg-primary text-black text-xs sm:text-sm tracking-widest px-3 py-1">
                {c.channel}
              </Badge>

              <div className="space-y-5">
                <div className="text-3xl sm:text-4xl md:text-5xl">{c.icon}</div>

                <h2 className=" text-base sm:text-lg md:text-xl lg:text-2xl font-black break-words text-center leading-tight">
                {c.title}
                </h2>


                <p className="font-share-tech text-xs sm:text-sm md:text-base text-white/40 tracking-widest uppercase">
                  {c.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  {c.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-xs sm:text-sm md:text-base tracking-widest">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FORM + INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* FORM */}
          <div className="bg-[#0D0221]/60 border-2 border-white/5 rounded-xl p-6 sm:p-10">
            <Badge className="bg-primary text-black text-xs sm:text-sm tracking-widest px-3 py-1 mb-6">
              TRANSMISSION
            </Badge>

            <div className="text-3xl sm:text-4xl md:text-5xl mb-6">📡</div>

            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black mb-4">
              BROADCAST MESSAGE
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-white/40 tracking-widest uppercase mb-8">
              WE'LL GET BACK TO YOU WITHIN 24 HOURS
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm md:text-base tracking-widest uppercase text-white/40">
                    PLAYER_ID
                  </Label>
                  <Input className="h-12 bg-black/40 border-white/10 text-sm md:text-base" />
                </div>

                <div>
                  <Label className="text-xs sm:text-sm md:text-base tracking-widest uppercase text-white/40">
                    COMM_NODE
                  </Label>
                  <Input type="email" className="h-12 bg-black/40 border-white/10 text-sm md:text-base" />
                </div>
              </div>

              <div>
                <Label className="text-xs sm:text-sm md:text-base tracking-widest uppercase text-white/40">
                  TRANSMISSION_DATA
                </Label>
                <textarea className="w-full min-h-[140px] bg-black/40 border border-white/10 rounded-lg p-4 text-sm md:text-base resize-none" />
              </div>

              <Button className="w-full h-14 text-sm sm:text-base tracking-widest font-bold">
                SEND SIGNAL
              </Button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">
            {/* SOCIAL */}
            <div className="bg-[#0D0221]/60 border-2 border-white/5 rounded-xl p-6 sm:p-10">
              <Badge className="bg-secondary text-black text-xs sm:text-sm tracking-widest px-3 py-1 mb-6">
                SOCIAL NETWORK
              </Badge>

              <div className="grid grid-cols-2 gap-4">
                {socials.map((s) => (
                  <div
                    key={s.label}
                    className="bg-black/40 border border-white/5 rounded-lg p-4 sm:p-6 text-center"
                  >
                    <div className="text-2xl sm:text-3xl mb-2">{s.icon}</div>

                    <div className="text-xs sm:text-sm md:text-base tracking-widest text-white/40 uppercase">
                      {s.label}
                    </div>

                    <div className="text-xs sm:text-sm md:text-base text-primary font-bold">
                      {s.handle}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LOCATION */}
            <div className="bg-[#0D0221]/60 border-2 border-white/5 rounded-xl p-6 flex items-center gap-4">
              <div className="text-2xl sm:text-3xl">📍</div>
              <div>
                <div className="text-xs sm:text-sm md:text-base tracking-widest uppercase text-white/30">
                  LOCATION
                </div>
                <div className="text-sm sm:text-base md:text-lg font-bold">
                  MITS GWALIOR, MP
                </div>
                <div className="text-xs sm:text-sm md:text-base tracking-widest uppercase text-primary/60">
                  MADHYA PRADESH, INDIA
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
