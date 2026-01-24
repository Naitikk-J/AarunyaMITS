import { MainNavigation } from '@/components/ui/MainNavigation';
import { Badge } from '@/components/ui/badge';

const Events = () => {
  const zones = [
    {
      title: 'CULTURAL_ZONE',
      description: 'NEON STAGES, PERFORMANCES, AND ARTISTIC TAKEOVERS.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop',
      events: [
        { name: 'GALA_NIGHT', status: 'LIVE', timeLeft: null },
        { name: 'STREET_DANCE', status: 'UPCOMING', timeLeft: '1H 45M' },
        { name: 'ART_BATTLE', status: 'CLOSED', timeLeft: null },
      ],
    },
    {
      title: 'TECH_ZONE',
      description: 'HACKER LABS, WORKSHOPS, AND INNOVATION NODES.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop',
      events: [
        { name: 'ROBO_WARS', status: 'LIVE', timeLeft: null },
        { name: 'CODE_QUEST', status: 'UPCOMING', timeLeft: '2H 10M' },
        { name: 'IOT_EXPO', status: 'CLOSED', timeLeft: null },
      ],
    },
    {
      title: 'FUN_ZONE',
      description: 'ARCADE STREETS, POPUPS, AND SURPRISE QUESTS.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop',
      events: [
        { name: 'PIXEL_ARENA', status: 'LIVE', timeLeft: null },
        { name: 'TREASURE_HUNT', status: 'UPCOMING', timeLeft: '50M' },
        { name: 'VR_WORLD', status: 'CLOSED', timeLeft: null },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-electric-yellow selection:text-black font-pixel">
      <MainNavigation />

      {/* Header */}
      <div className="relative pt-32 pb-16 overflow-hidden border-b-4 border-electric-yellow/20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,214,51,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,214,51,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-pixel text-electric-yellow mb-4 glow-yellow uppercase tracking-tighter">
            MISSION_SELECT
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-[0.2em] max-w-2xl mx-auto">
            Explore the districts. Unlock live experiences. Choose your path.
          </p>
        </div>
      </div>

      {/* Zones */}
      <div className="container mx-auto px-6 py-20 space-y-32">
        {zones.map((zone, idx) => (
          <div key={zone.title} className="relative group">
            {/* Background Accent */}
            <div className={`absolute -inset-4 bg-electric-yellow/5 border-2 border-dashed border-electric-yellow/20 -z-10 transition-all group-hover:bg-electric-yellow/10`} />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Zone Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-block px-4 py-1 bg-electric-yellow text-black text-[10px] font-bold mb-4">
                  ZONE_0{idx + 1}
                </div>
                <h2 className="text-3xl text-electric-yellow glow-yellow-sm tracking-tighter uppercase">
                  {zone.title}
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed uppercase tracking-wider">
                  {zone.description}
                </p>
                <div className="pt-4">
                  <div className="h-1 w-full bg-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-electric-yellow/40 animate-[loading_3s_ease-in-out_infinite]" />
                  </div>
                </div>
              </div>

              {/* Zone Events Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                {zone.events.map((event) => (
                  <div
                    key={event.name}
                    className="
                      relative p-6 border-4 border-white/10 bg-white/5
                      hover:border-electric-yellow hover:bg-white/10 
                      transition-all group/card overflow-hidden
                    "
                  >
                    {/* Status Ribbon */}
                    <div className="absolute top-0 right-0">
                      {event.status === 'LIVE' && (
                        <div className="bg-red-600 text-[8px] px-3 py-1 animate-pulse">LIVE_NODE</div>
                      )}
                      {event.status === 'UPCOMING' && (
                        <div className="bg-blue-600 text-[8px] px-3 py-1">T-MINUS {event.timeLeft}</div>
                      )}
                      {event.status === 'CLOSED' && (
                        <div className="bg-white/20 text-[8px] px-3 py-1">OFFLINE</div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="text-lg text-white group-hover/card:text-electric-yellow transition-colors tracking-tight">
                        {event.name}
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest leading-tight">
                        Access this node to earn experience points and unlock rewards.
                      </div>
                      <button className="text-[10px] text-electric-yellow border-b border-electric-yellow pb-0.5 hover:opacity-80 transition-opacity uppercase">
                        View Details_
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

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
