import { useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FEST_START_DATE = new Date(); // 🔁 adjust if needed

const Schedule = () => {
  const todayIndex = Math.floor(
    (new Date().getTime() - FEST_START_DATE.getTime()) / (1000 * 60 * 60 * 24)
  );

  const [openDay, setOpenDay] = useState<number>(todayIndex);

  const days = [
    {
      day: 'DAY 1',
      date: 'FRIDAY',
      items: [
        { time: '10:00', title: 'Campus Check-in', type: 'INFO' },
        { time: '12:00', title: 'Opening Ceremony', type: 'MAIN' },
        { time: '16:00', title: 'Workshop Blocks', type: 'WORKSHOP' },
      ],
    },
    {
      day: 'DAY 2',
      date: 'SATURDAY',
      items: [
        { time: '11:00', title: 'Competitions Round 1', type: 'COMPETE' },
        { time: '15:00', title: 'Cultural Events', type: 'EVENT' },
        { time: '19:00', title: 'Headliners', type: 'LIVE' },
      ],
    },
    {
      day: 'DAY 3',
      date: 'SUNDAY',
      items: [
        { time: '10:30', title: 'Finals', type: 'COMPETE' },
        { time: '14:00', title: 'Prize Distribution', type: 'MAIN' },
        { time: '17:00', title: 'Closing Ceremony', type: 'MAIN' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 via-accent/10 to-transparent py-20">
        <div className="absolute inset-0 scanlines opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold text-center mb-4 kidcore-text animate-rainbow">
            FEST TIMELINE
          </h1>
          <p className="text-xl text-center text-muted-foreground font-rajdhani max-w-3xl mx-auto">
            Track the festival journey — day by day, beat by beat.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="container mx-auto px-6 py-24 relative">
        {/* Curved Neon Path */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[300px] pointer-events-none"
          viewBox="0 0 300 1000"
          fill="none"
        >
          <path
            d="
              M150 0
              C50 150, 50 250, 150 350
              C250 450, 250 550, 150 650
              C50 750, 50 850, 150 1000
            "
            stroke="url(#kidcoreGradient)"
            strokeWidth="3"
            strokeDasharray="6 10"
            className="opacity-70"
          />
          <defs>
            <linearGradient id="kidcoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Timeline Cards */}
        <div className="relative space-y-28">
          {days.map((d, index) => {
            const status =
              index < todayIndex
                ? 'completed'
                : index === todayIndex
                ? 'active'
                : 'upcoming';

            return (
              <div
                key={d.day}
                className={`relative ${
                  index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'
                }`}
              >
                {/* Timeline Node */}
                <div
                  className={`
                    absolute left-1/2 -translate-x-1/2 -top-7 w-5 h-5 rounded-full
                    ${status === 'completed' && 'bg-primary shadow-neon'}
                    ${status === 'active' && 'bg-secondary animate-kidcore-pulse shadow-neon-secondary'}
                    ${status === 'upcoming' && 'bg-background border-2 border-secondary'}
                  `}
                />

                <Card
                  onClick={() => setOpenDay(openDay === index ? -1 : index)}
                  className="
                    max-w-xl mx-auto cursor-pointer
                    glass-card floating-sticker
                  "
                >
                  <CardHeader className="text-center">
                    <CardTitle className="font-orbitron text-2xl kidcore-text">
                      {d.day}
                    </CardTitle>
                    <CardDescription className="font-rajdhani text-muted-foreground">
                      {d.date}
                    </CardDescription>
                  </CardHeader>

                  {openDay === index && (
                    <CardContent className="space-y-5">
                      {d.items.map((item) => (
                        <div
                          key={`${d.day}-${item.time}`}
                          className="
                            flex items-center gap-4 p-3 rounded-xl
                            hover:bg-primary/10 transition
                          "
                        >
                          <span className="font-mono text-sm text-primary min-w-[72px]">
                            {item.time}
                          </span>

                          <div className="flex-1 font-rajdhani text-foreground">
                            {item.title}
                          </div>

                          <Badge
                            variant="outline"
                            className="font-mono text-xs border-primary/50 text-primary"
                          >
                            {item.type}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="fixed bottom-6 left-6 w-20 h-0.5 bg-gradient-to-r from-primary to-transparent" />
      <div className="fixed bottom-6 left-6 w-0.5 h-20 bg-gradient-to-t from-primary to-transparent" />
      <div className="fixed bottom-6 right-6 w-20 h-0.5 bg-gradient-to-l from-secondary to-transparent" />
      <div className="fixed bottom-6 right-6 w-0.5 h-20 bg-gradient-to-t from-secondary to-transparent" />
    </div>
  );
};

export default Schedule;
