import { useState, useEffect, useRef } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Schedule = () => {
  const days = [
    {
      id: 1,
      day: 'DAY 1',
      date: 'FRIDAY',
      items: [
        { time: '10:00 AM', title: 'Campus Check-in', type: 'INFO', location: 'Main Gate' },
        { time: '12:00 PM', title: 'Opening Ceremony', type: 'MAIN', location: 'Auditorium' },
        { time: '04:00 PM', title: 'Workshop Blocks', type: 'SKILL', location: 'Lab A' },
      ],
    },
    {
      id: 2,
      day: 'DAY 2',
      date: 'SATURDAY',
      items: [
        { time: '11:00 AM', title: 'Competitions R1', type: 'BATTLE', location: 'Arena' },
        { time: '03:00 PM', title: 'Cultural Shows', type: 'EVENT', location: 'Main Stage' },
        { time: '07:00 PM', title: 'Neon Headliners', type: 'LIVE', location: 'Open Grounds' },
      ],
    },
    {
      id: 3,
      day: 'DAY 3',
      date: 'SUNDAY',
      items: [
        { time: '10:30 AM', title: 'Battle Finals', type: 'BATTLE', location: 'Arena' },
        { time: '02:00 PM', title: 'Reward Ceremony', type: 'REWARD', location: 'Auditorium' },
        { time: '05:00 PM', title: 'System Shutdown', type: 'MAIN', location: 'Campus' },
      ],
    },
  ];

  const [activeDay, setActiveDay] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.1,
        });

        const node = card.parentElement?.querySelector('.timeline-node');
        if (node) {
          gsap.from(node, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
            },
            scale: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          });
        }
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#05010D] text-white font-orbitron overflow-x-hidden selection:bg-primary selection:text-black">
      <MainNavigation />

      {/* Hero Section */}
      <div className="pt-40 pb-20 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
          SCHEDULE
        </h1>
        <div className="h-1 w-[120px] bg-primary mx-auto shadow-neon" />
      </div>

      {/* Timeline Container */}
      <div ref={timelineRef} className="relative max-w-6xl mx-auto px-6 pb-40">
        
        {/* SVG Dashed Path - Matching the image's S-curve */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <svg width="200" height="100%" viewBox="0 0 200 1200" preserveAspectRatio="none" className="opacity-40 overflow-visible">
            <path
              d="M 100 0 Q 150 150 100 300 Q 50 450 100 600 Q 150 750 100 900 Q 50 1050 100 1200"
              fill="none"
              stroke="#BC13FE"
              strokeWidth="2"
              strokeDasharray="10 10"
              className="drop-shadow-[0_0_8px_rgba(188,19,254,0.5)]"
            />
          </svg>
        </div>

        {/* Days List */}
        <div className="relative space-y-48">
          {days.map((d, index) => (
            <div key={d.id} className="relative flex flex-col items-center">
              
              {/* Timeline Node - Circular marker on the path */}
              <div className="timeline-node absolute top-[-24px] z-20 w-8 h-8 rounded-full bg-[#05010D] border-2 border-primary shadow-[0_0_15px_rgba(188,19,254,0.8)] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-neon" />
              </div>

              {/* Day Card - Matching image layout */}
              <div
                ref={el => cardsRef.current[index] = el}
                className="w-full max-w-2xl group"
              >
                <div 
                  onClick={() => setActiveDay(activeDay === index ? null : index)}
                  className={`
                    relative cursor-pointer transition-all duration-500
                    bg-[#0D0221]/60 backdrop-blur-xl border-2 rounded-xl overflow-hidden
                    ${activeDay === index 
                      ? 'border-primary shadow-[0_0_30px_rgba(188,19,254,0.2)]' 
                      : 'border-white/5 hover:border-primary/40'}
                  `}
                >
                  <div className="p-10 text-center relative z-10">
                    <h2 
                      className={`text-4xl md:text-5xl font-black mb-2 tracking-widest transition-colors duration-500 ${activeDay === index ? 'text-primary' : 'text-white/80'}`}
                    >
                      {d.day}
                    </h2>
                    <p className="text-sm md:text-base font-share-tech text-muted-foreground tracking-[0.4em] uppercase opacity-60">
                      {d.date}
                    </p>
                  </div>

                  {/* Expanded Schedule Details */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out bg-black/40 ${activeDay === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-8 space-y-4 border-t border-white/10">
                      {d.items.map((item, i) => (
                        <div 
                          key={i}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20"
                        >
                          <div className="flex items-center gap-6">
                            <span className="text-lg font-share-tech text-primary font-bold min-w-[100px]">{item.time}</span>
                            <div>
                              <h3 className="text-lg font-bold tracking-wide uppercase">{item.title}</h3>
                              <span className="text-xs text-muted-foreground uppercase tracking-widest">{item.location}</span>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 flex items-center">
                            <span className="px-3 py-1 text-[10px] border border-primary/30 rounded-full text-primary/80 uppercase font-bold tracking-widest">
                              {item.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Background Accents */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${activeDay === index ? 'opacity-100' : ''}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Footer */}
      <div className="py-20 border-t border-white/5 relative bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(188,19,254,0.05)_0%,transparent_100%)] pointer-events-none" />
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-4 text-[10px] tracking-[0.5em] text-muted-foreground uppercase mb-4">
            <span className="w-12 h-[1px] bg-white/10" />
            End of Current Data Stream
            <span className="w-12 h-[1px] bg-white/10" />
          </div>
          <p className="text-xs text-white/20 font-share-tech">VERSION 2.0.26 // TIMELINE SYNCHRONIZED</p>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
