import { MainNavigation } from '@/components/ui/MainNavigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Events = () => {
  const zones = [
    {
      title: 'CULTURAL_ZONE',
      description: 'NEON STAGES, PERFORMANCES, AND ARTISTIC TAKEOVERS.',
      icon: '🎭',
      events: [
        { name: 'GALA_NIGHT', status: 'LIVE', timeLeft: null },
        { name: 'STREET_DANCE', status: 'UPCOMING', timeLeft: '1H 45M' },
        { name: 'ART_BATTLE', status: 'CLOSED', timeLeft: null },
      ],
    },
    {
      title: 'TECH_ZONE',
      description: 'HACKER LABS, WORKSHOPS, AND INNOVATION NODES.',
      icon: '⚡',
      events: [
        { name: 'ROBO_WARS', status: 'LIVE', timeLeft: null },
        { name: 'CODE_QUEST', status: 'UPCOMING', timeLeft: '2H 10M' },
        { name: 'IOT_EXPO', status: 'CLOSED', timeLeft: null },
      ],
    },
    {
      title: 'FUN_ZONE',
      description: 'ARCADE STREETS, POPUPS, AND SURPRISE QUESTS.',
      icon: '🎮',
      events: [
        { name: 'PIXEL_ARENA', status: 'LIVE', timeLeft: null },
        { name: 'TREASURE_HUNT', status: 'UPCOMING', timeLeft: '50M' },
        { name: 'VR_WORLD', status: 'CLOSED', timeLeft: null },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#05010D] text-white font-orbitron selection:bg-primary selection:text-black">
      <MainNavigation />

      <div className="relative pt-40 pb-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
          EVENTS
        </h1>
        <div className="h-1 w-[120px] bg-primary mx-auto shadow-neon" />
        <p className="mt-8 text-sm md:text-base font-share-tech text-muted-foreground tracking-[0.4em] uppercase opacity-60 max-w-3xl mx-auto px-6">
          // EXPLORE THE DISTRICTS. UNLOCK LIVE EXPERIENCES.
        </p>
      </div>

      <div className="container mx-auto px-6 pb-40">
        <div className="space-y-24">
          {zones.map((zone, idx) => (
            <div key={zone.title} className="group">
              <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden hover:border-primary/30 shadow-[0_0_30px_rgba(188,19,254,0.05)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-4 p-10 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <Badge className="bg-primary text-black font-bold tracking-widest text-[8px] rounded-none px-3 py-1 border-none">
                        ZONE_0{idx + 1}
                      </Badge>
                    </div>
                    <div className="text-5xl mb-6 drop-shadow-[0_0_20px_rgba(188,19,254,0.4)]">
                      {zone.icon}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white group-hover:text-primary transition-colors mb-4 tracking-tight">
                      {zone.title}
                    </h2>
                    <p className="font-share-tech text-[10px] text-white/40 tracking-[0.3em] uppercase leading-relaxed">
                      {zone.description}
                    </p>
                    <div className="mt-8 h-1 w-full bg-white/5 relative overflow-hidden rounded-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-secondary/60 animate-[loading_3s_ease-in-out_infinite]" />
                    </div>
                  </div>

                  <div className="lg:col-span-8 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {zone.events.map((event) => (
                        <div
                          key={event.name}
                          className="relative p-6 bg-black/40 border border-white/5 rounded-lg hover:border-primary/40 hover:bg-black/60 transition-all group/card overflow-hidden"
                        >
                          <div className="absolute top-3 right-3">
                            {event.status === 'LIVE' && (
                              <div className="bg-red-600 text-[8px] px-2 py-1 rounded-sm animate-pulse font-bold tracking-wider">LIVE</div>
                            )}
                            {event.status === 'UPCOMING' && (
                              <div className="bg-secondary text-black text-[8px] px-2 py-1 rounded-sm font-bold tracking-wider">T-{event.timeLeft}</div>
                            )}
                            {event.status === 'CLOSED' && (
                              <div className="bg-white/20 text-[8px] px-2 py-1 rounded-sm font-bold tracking-wider">OFFLINE</div>
                            )}
                          </div>

                          <div className="space-y-4 pt-4">
                            <div className="text-lg font-bold text-white group-hover/card:text-primary transition-colors tracking-tight">
                              {event.name}
                            </div>
                            <p className="text-[9px] text-muted-foreground tracking-wider leading-relaxed">
                              Access this node to earn experience points and unlock rewards.
                            </p>
                            <Button
                              size="sm"
                              className="bg-transparent border border-primary/30 text-primary hover:bg-primary hover:text-black transition-all rounded-none text-[8px] tracking-[0.3em] font-bold px-4 py-2 w-full"
                            >
                              VIEW DETAILS
                            </Button>
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
      </div>

      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

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
