import { useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Badge } from '@/components/ui/badge';

const FEST_START_DATE = new Date();

const Schedule = () => {
  const todayIndex = 0; // Fixed for demo

  const [openDay, setOpenDay] = useState<number>(0);

  const days = [
    {
      day: 'DAY_01',
      date: 'FRIDAY',
      items: [
        { time: '10:00', title: 'CAMPUS_CHECK_IN', type: 'INFO' },
        { time: '12:00', title: 'OPENING_CEREMONY', type: 'MAIN' },
        { time: '16:00', title: 'WORKSHOP_BLOCKS', type: 'SKILL' },
      ],
    },
    {
      day: 'DAY_02',
      date: 'SATURDAY',
      items: [
        { time: '11:00', title: 'COMPETITIONS_R1', type: 'BATTLE' },
        { time: '15:00', title: 'CULTURAL_SHOWS', type: 'EVENT' },
        { time: '19:00', title: 'NEON_HEADLINERS', type: 'LIVE' },
      ],
    },
    {
      day: 'DAY_03',
      date: 'SUNDAY',
      items: [
        { time: '10:30', title: 'BATTLE_FINALS', type: 'BATTLE' },
        { time: '14:00', title: 'REWARD_CEREMONY', type: 'REWARD' },
        { time: '17:00', title: 'SYSTEM_SHUTDOWN', type: 'MAIN' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-electric-yellow selection:text-black font-pixel">
      <MainNavigation />

      {/* Header */}
      <div className="relative pt-32 pb-16 overflow-hidden border-b-4 border-electric-yellow/20 bg-[radial-gradient(circle_at_center,rgba(255,214,51,0.05)_0%,transparent_100%)]">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl text-electric-yellow mb-4 glow-yellow uppercase tracking-tighter">
            QUEST_TIMELINE
          </h1>
          <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.3em] max-w-2xl mx-auto">
            Track your progress through the three-day circuit.
          </p>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {days.map((d, index) => (
            <div key={d.day} className="relative group">
              {/* Vertical Connector */}
              {index !== days.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-1 bg-gradient-to-b from-electric-yellow/40 to-transparent z-0" />
              )}
              
              <div className="relative z-10 flex gap-8 items-start">
                {/* Date Marker */}
                <div className={`
                  w-12 h-12 flex-shrink-0 flex items-center justify-center border-4
                  ${index === todayIndex ? 'bg-electric-yellow border-black shadow-[0_0_15px_rgba(255,214,51,0.5)]' : 'bg-black border-white/20'}
                `}>
                  <span className={`text-xs ${index === todayIndex ? 'text-black font-bold' : 'text-white/40'}`}>
                    0{index + 1}
                  </span>
                </div>

                {/* Day Content */}
                <div className="flex-1">
                  <div 
                    className={`
                      p-6 border-4 transition-all cursor-pointer
                      ${openDay === index ? 'border-electric-yellow bg-white/5' : 'border-white/5 bg-transparent hover:border-white/20'}
                    `}
                    onClick={() => setOpenDay(index)}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className={`text-2xl tracking-tighter uppercase ${openDay === index ? 'text-electric-yellow' : 'text-white/60'}`}>
                        {d.day} <span className="text-xs ml-2 opacity-40">({d.date})_</span>
                      </h2>
                      <div className={`text-[10px] uppercase ${openDay === index ? 'text-electric-yellow animate-pulse' : 'text-white/20'}`}>
                        {openDay === index ? 'NODE_ACTIVE' : 'EXPAND_NODE+'}
                      </div>
                    </div>

                    {openDay === index && (
                      <div className="space-y-4 pt-4 border-t-2 border-white/5">
                        {d.items.map((item) => (
                          <div 
                            key={item.title}
                            className="flex items-center gap-6 p-3 group/item hover:bg-electric-yellow/5 transition-colors"
                          >
                            <span className="text-[10px] text-electric-yellow/60 group-hover/item:text-electric-yellow w-12">
                              {item.time}
                            </span>
                            <div className="flex-1 text-xs uppercase tracking-wider group-hover/item:translate-x-1 transition-transform">
                              {item.title}
                            </div>
                            <div className="px-2 py-0.5 border border-white/20 text-[8px] text-muted-foreground group-hover/item:border-electric-yellow/40 group-hover/item:text-electric-yellow transition-colors">
                              {item.type}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="py-20 text-center">
        <div className="inline-block px-4 py-2 border-2 border-dashed border-white/10 text-[10px] text-muted-foreground uppercase">
          End of timeline. New events may appear at any time.
        </div>
      </div>
    </div>
  );
};

export default Schedule;
