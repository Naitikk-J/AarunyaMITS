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
            start: 'top bottom-=100',
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: index * 0.08,
        });

        const node = card.parentElement?.querySelector('.timeline-node');
        if (node) {
          gsap.from(node, {
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
            },
            scale: 0,
            duration: 0.4,
            ease: 'back.out(1.7)',
          });
        }
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#05010D] text-white font-orbitron overflow-x-hidden">
      <MainNavigation />

      {/* HERO */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 text-center relative px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
          SCHEDULE
        </h1>
        <div className="h-1 w-24 md:w-[120px] bg-primary mx-auto shadow-neon" />
      </div>

      {/* TIMELINE */}
      <div ref={timelineRef} className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-32 md:pb-40">

        {/* SVG PATH */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <svg
            width="160"
            height="100%"
            viewBox="0 0 200 1200"
            preserveAspectRatio="none"
            className="opacity-30 md:opacity-40"
          >
            <path
              d="M 100 0 Q 150 150 100 300 Q 50 450 100 600 Q 150 750 100 900 Q 50 1050 100 1200"
              fill="none"
              stroke="#BC13FE"
              strokeWidth="2"
              strokeDasharray="10 10"
            />
          </svg>
        </div>

        {/* DAYS */}
        <div className="relative space-y-32 md:space-y-48">
          {days.map((d, index) => (
            <div key={d.id} className="relative flex flex-col items-center">

              {/* NODE */}
              <div className="timeline-node absolute -top-5 z-20 w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#05010D] border-2 border-primary shadow-neon flex items-center justify-center">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-primary animate-pulse" />
              </div>

              {/* CARD */}
              <div ref={el => cardsRef.current[index] = el} className="w-full max-w-xl md:max-w-2xl">
                <div
                  onClick={() => setActiveDay(activeDay === index ? null : index)}
                  className={`cursor-pointer transition-all duration-500 bg-[#0D0221]/60 backdrop-blur-xl border-2 rounded-xl overflow-hidden
                    ${activeDay === index ? 'border-primary shadow-neon' : 'border-white/5 hover:border-primary/40'}
                  `}
                >
                  <div className="p-6 md:p-10 text-center">
                    <h2 className={`text-xl sm:text-2xl md:text-5xl font-black mb-2 tracking-widest transition-colors ${activeDay === index ? 'text-primary' : 'text-white/80'}`}>
                      {d.day}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base font-share-tech tracking-[0.25em] md:tracking-[0.4em] uppercase text-white/50">
                      {d.date}
                    </p>
                  </div>

                  {/* EXPANDED */}
                  <div className={`bg-black/40 overflow-hidden transition-all duration-500 ${activeDay === index ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-4 md:p-8 space-y-4 border-t border-white/10">
                      {d.items.map((item, i) => (
                        <div key={i} className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between p-4 rounded-lg bg-white/5 hover:bg-primary/10 transition">
                          <div className="flex gap-4 items-start">
                            <span className="text-sm md:text-lg font-share-tech text-primary font-bold min-w-[72px]">
                              {item.time}
                            </span>
                            <div>
                              <h3 className="text-sm md:text-lg font-bold uppercase">{item.title}</h3>
                              <span className="text-xs text-white/40 uppercase tracking-widest">
                                {item.location}
                              </span>
                            </div>
                          </div>
                          <span className="self-start md:self-center px-3 py-1 text-xs md:text-[15px] border border-primary/30 rounded-full text-primary uppercase font-bold tracking-widest">
                            {item.type}
                          </span>
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

      {/* FOOTER */}
      <div className="py-16 md:py-20 border-t border-white/5 bg-black text-center px-4">
        <div className="text-xs sm:text-sm tracking-[0.25em] md:tracking-[0.5em] text-white/40 uppercase mb-4">
          End of Current Data Stream
        </div>
        <p className="text-xs text-white/20 font-share-tech">
          VERSION 2.0.26 // TIMELINE SYNCHRONIZED
        </p>
      </div>
    </div>
  );
};

export default Schedule;
