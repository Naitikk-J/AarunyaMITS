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
      case 'PLATINUM':
        return 'bg-gradient-to-r from-primary to-secondary text-black';
      case 'GOLD':
        return 'bg-secondary text-black';
      case 'SILVER':
        return 'bg-white/20 text-white';
      default:
        return 'bg-primary text-black';
    }
  };

  return (
    <div className="min-h-screen bg-[#05010D] text-white font-orbitron selection:bg-primary selection:text-black">
      <MainNavigation />

      <div className="content-scale">
        {/* HEADER */}
        <div className="relative pt-28 md:pt-40 pb-16 md:pb-20 text-center px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
            SPONSORS
          </h1>

          <div className="h-1 w-24 md:w-[120px] bg-primary mx-auto shadow-neon" />

          <p className="mt-6 text-sm sm:text-base md:text-xl tracking-widest text-white/60 max-w-3xl mx-auto font-share-tech uppercase">
  // THE ALLIANCES POWERING AARUNYA 2026
</p>

        </div>

        {/* CONTENT */}
        <div className="container mx-auto px-4 sm:px-6 pb-32">
          <div className="space-y-14">
            {tiers.map((tier, idx) => (
              <div key={tier.title} className="group">
                <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* LEFT */}
                    <div className="lg:col-span-4 p-6 sm:p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/5">
                      <Badge
                        className={`${getLevelColor(
                          tier.level
                        )} font-bold tracking-widest text-[20px] sm:text-[18px] rounded-none px-3 py-1 mb-6 inline-block`}
                      >
                        TIER_0{idx + 1}
                      </Badge>

                      <div className="text-4xl sm:text-5xl mb-6 drop-shadow-[0_0_20px_rgba(188,19,254,0.4)]">
                        {tier.icon}
                      </div>

                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-4">
                        {tier.title}
                      </h2>

                      <p className="font-share-tech text-[11px] sm:text-xs md:text-sm lg:text-base text-white/40 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                        {tier.description}
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-8 p-5 sm:p-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {tier.sponsors.map((sponsor) => (
                          <div
                            key={sponsor.name}
                            className="relative p-5 sm:p-6 bg-black/40 border border-white/5 rounded-lg hover:border-primary/40 hover:bg-black/60 transition-all overflow-hidden"
                          >
                            <div
                              className="absolute inset-0 opacity-10"
                              style={{
                                backgroundImage:
                                  'linear-gradient(rgba(188, 19, 254, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(188, 19, 254, 0.2) 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                              }}
                            />

                            <div className="relative z-10 space-y-3">
                              <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                                {sponsor.name}
                              </div>

                              <div className="flex items-center justify-between text-[10px] sm:text-xs md:text-sm">
                                <span className="uppercase tracking-[0.25em] text-white/30">
                                  Contribution
                                </span>
                                <span className="font-share-tech text-secondary font-bold text-sm sm:text-base md:text-lg">
                                  {sponsor.contribution}
                                </span>
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

          {/* CTA */}
          <div className="mt-20 text-center px-4">
            <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl p-8 sm:p-12 overflow-hidden">
              <div className="absolute inset-0 opacity-10" />

              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl mb-6">🚀</div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-4">
                  BECOME A SPONSOR
                </h3>

                <p className="font-share-tech text-xs sm:text-sm md:text-base text-white/40 uppercase tracking-[0.2em] sm:tracking-[0.3em] max-w-xl mx-auto mb-8">
                  JOIN THE ALLIANCE AND POWER THE NEXT GENERATION OF INNOVATION
                </p>

                <Button className="bg-primary text-black px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base md:text-lg tracking-[0.3em] font-bold">
  CONTACT US
</Button>

              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </div>
  );
};

export default Sponsors;