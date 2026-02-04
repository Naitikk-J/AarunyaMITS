import { useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const headliners = [
    {
      id: 1,
      title: 'Campus Tech Summit 2024',
      category: 'tech',
      date: 'March 15, 2024',
      description:
        'Join us for the biggest tech event of the year featuring AI workshops, hackathons, and networking.',
      status: 'upcoming',
      attendees: 500,
    },
    {
      id: 2,
      title: 'Euphoria Music Festival',
      category: 'music',
      date: 'April 20, 2024',
      description:
        'Experience the ultimate music festival with top artists and immersive performances.',
      status: 'featured',
      attendees: 1200,
    },
    {
      id: 3,
      title: 'Innovation Challenge',
      category: 'innovation',
      date: 'May 5, 2024',
      description:
        'Compete in our annual innovation challenge and showcase your creative solutions.',
      status: 'registration',
      attendees: 300,
    },
    {
      id: 4,
      title: 'Cultural Exchange Night',
      category: 'culture',
      date: 'June 10, 2024',
      description:
        'Celebrate diversity with food, music, and traditions from around the world.',
      status: 'upcoming',
      attendees: 800,
    },
  ];

  const zones = [
    {
      title: 'CULTURAL_ZONE',
      description: 'NEON STAGES, PERFORMANCES, AND ARTISTIC TAKEOVERS.',
      icon: '🎭',
      events: [
        { name: 'GALA_NIGHT', status: 'LIVE' },
        { name: 'STREET_DANCE', status: 'UPCOMING', timeLeft: '1H 45M' },
        { name: 'ART_BATTLE', status: 'CLOSED' },
      ],
    },
    {
      title: 'TECH_ZONE',
      description: 'HACKER LABS, WORKSHOPS, AND INNOVATION NODES.',
      icon: '⚡',
      events: [
        { name: 'ROBO_WARS', status: 'LIVE' },
        { name: 'CODE_QUEST', status: 'UPCOMING', timeLeft: '2H 10M' },
        { name: 'IOT_EXPO', status: 'CLOSED' },
      ],
    },
    {
      title: 'FUN_ZONE',
      description: 'ARCADE STREETS, POPUPS, AND SURPRISE QUESTS.',
      icon: '🎮',
      events: [
        { name: 'PIXEL_ARENA', status: 'LIVE' },
        { name: 'TREASURE_HUNT', status: 'UPCOMING', timeLeft: '50M' },
        { name: 'VR_WORLD', status: 'CLOSED' },
      ],
    },
  ];

  const competitions = [
    {
      name: 'CODE_SPRINT',
      desc: 'FAST-PACED ALGORITHMIC COMBAT UNDER NEON PRESSURE.',
      icon: '⚡',
      organizedBy: 'TECH_GUILD',
      tags: ['TEAM', 'TECH', 'TIMED'],
      difficulty: 'HARD',
      prize: '50,000 XP',
    },
    {
      name: 'DESIGN_ARENA',
      desc: 'PIXEL-PERFECT BATTLES WITH BOLD VISUALS.',
      icon: '🎨',
      organizedBy: 'CREATIVE_COMMONS',
      tags: ['UI/UX', 'PITCH'],
      difficulty: 'MEDIUM',
      prize: '35,000 XP',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'tech', label: 'Technology' },
    { id: 'music', label: 'Music' },
    { id: 'innovation', label: 'Innovation' },
    { id: 'culture', label: 'Culture' },
  ];

  const filteredHeadliners =
    selectedCategory === 'all'
      ? headliners
      : headliners.filter((e) => e.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#05010D] text-white font-orbitron">
      <MainNavigation />

      {/* HEADER */}
      <div className="pt-32 pb-16 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-b from-white to-white/30 text-transparent bg-clip-text">
          EVENTS
          
        </h1>
        <p className="mt-6 text-sm sm:text-base md:text-xl tracking-widest text-white/60 max-w-3xl mx-auto">
  // DISCOVER THE MOST EXCITING EVENTS, HEADLINERS, AND COMPETITIONS
</p>

      </div>

      {/* CATEGORY FILTER */}
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((c) => (
            <Button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base md:text-lg tracking-widest rounded-none border ${
                selectedCategory === c.id
                  ? 'bg-primary text-black border-primary'
                  : 'bg-transparent border-white/20 text-white/60'
              }`}
            >
              {c.label}
            </Button>
          ))}
        </div>

        {/* HEADLINERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {filteredHeadliners.map((e) => (
            <div
              key={e.id}
              className="bg-[#0D0221]/70 border border-white/10 rounded-xl p-6 flex flex-col">
              <div className="text-4xl sm:text-5xl mb-4 text-center">
                {e.category === 'tech'
                  ? '⚡'
                  : e.category === 'music'
                  ? '🔊'
                  : e.category === 'innovation'
                  ? '💡'
                  : '🎨'}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                {e.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg tracking-widest text-primary/70 mb-3">
                {e.date} · {e.attendees} REGISTERED
              </p>
              <p className="text-base sm:text-lg md:text-xl text-white/70 flex-grow">
                {e.description}
              </p>
              <Button className="mt-6 w-full rounded-none tracking-widest text-sm sm:text-base md:text-lg">

                DETAILS
              </Button>
            </div>
          ))}
        </div>

        {/* ZONES */}
        <div className="space-y-16 mb-24">
          {zones.map((z, i) => (
            <div
              key={z.title}
              className="bg-[#0D0221]/70 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{z.icon}</span>
                <h2 className="text-xl sm:text-2xl font-bold">
                  {z.title}
                </h2>
              </div>
              <p className="text-sm sm:text-base md:text-lg tracking-widest text-white/50 mb-6">
                {z.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {z.events.map((ev) => (
                  <div
                    key={ev.name}
                    className="border border-white/10 rounded-lg p-4 text-sm"
                  >
                    <div className="text-lg sm:text-xl md:text-2xl font-bold mb-3">{ev.name}</div>
                    <Button className="w-full rounded-none text-sm sm:text-base md:text-lg tracking-widest">
                      VIEW
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* COMPETITIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-24">
          {competitions.map((c) => (
            <div
              key={c.name}
              className="bg-[#0D0221]/70 border border-white/10 rounded-xl p-6 flex flex-col"
            >
              <div className="text-5xl mb-4">{c.icon}</div>
              <h3 className="text-xl font-bold mb-2">{c.name}</h3>
              <p className="text-sm sm:text-base md:text-lg tracking-widest text-primary/60 mb-4">
                BY {c.organizedBy}
              </p>
              <p className="text-base sm:text-lg md:text-xl text-white/70 flex-grow">{c.desc}</p>
              <Button className="mt-6 rounded-none tracking-widest text-sm sm:text-base md:text-lg">
                ENTER ARENA
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;