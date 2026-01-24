import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Events = () => {
  const zones = [
    {
      title: 'CULTURAL ZONE',
      description: 'Neon stages, performances, and artistic takeovers.',
      image: '/zones/cultural.png',
      events: [
        { name: 'Event 1', status: 'LIVE', timeLeft: null },
        { name: 'Event 2', status: 'UPCOMING', timeLeft: '1h 45m' },
        { name: 'Event 3', status: 'CLOSED', timeLeft: null },
      ],
    },
    {
      title: 'TECH ZONE',
      description: 'Hacker labs, workshops, and innovation nodes.',
      image: '/zones/tech.png',
      events: [
        { name: 'Event 1', status: 'LIVE', timeLeft: null },
        { name: 'Event 2', status: 'UPCOMING', timeLeft: '2h 10m' },
        { name: 'Event 3', status: 'CLOSED', timeLeft: null },
      ],
    },
    {
      title: 'FUN ZONE',
      description: 'Arcade streets, popups, and surprise quests.',
      image: '/zones/fun.png',
      events: [
        { name: 'Event 1', status: 'LIVE', timeLeft: null },
        { name: 'Event 2', status: 'UPCOMING', timeLeft: '50m' },
        { name: 'Event 3', status: 'CLOSED', timeLeft: null },
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
            EVENT ZONES
          </h1>
          <p className="text-xl text-center text-muted-foreground font-rajdhani max-w-3xl mx-auto">
            Explore the districts. Unlock live experiences.
          </p>
        </div>
      </div>

      {/* Zones */}
      <div className="container mx-auto px-6 py-20 space-y-24">
        {zones.map((zone) => (
          <Card
            key={zone.title}
            className="
              glass-card floating-sticker
              max-w-6xl mx-auto overflow-hidden
            "
          >
            {/* Zone Image */}
            <div className="relative h-40 md:h-48 overflow-hidden">
              <img
                src={zone.image}
                alt={zone.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>

            {/* Zone Header */}
            <CardHeader className="pt-6">
              <CardTitle className="font-orbitron text-3xl kidcore-text">
                {zone.title}
              </CardTitle>
              <CardDescription className="font-rajdhani text-muted-foreground text-base">
                {zone.description}
              </CardDescription>
            </CardHeader>

            {/* Zone Events */}
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {zone.events.map((event) => (
                  <div
                    key={event.name}
                    className="
                      relative p-5 rounded-xl
                      border border-primary/30
                      bg-background/60 backdrop-blur-md
                      hover:shadow-neon transition-all
                    "
                  >
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      {event.status === 'LIVE' && (
                        <Badge className="bg-red-500 text-white font-mono text-xs animate-pulse">
                          LIVE
                        </Badge>
                      )}
                      {event.status === 'UPCOMING' && (
                        <Badge className="bg-secondary text-white font-mono text-xs">
                          {event.timeLeft}
                        </Badge>
                      )}
                      {event.status === 'CLOSED' && (
                        <Badge variant="outline" className="font-mono text-xs opacity-60">
                          CLOSED
                        </Badge>
                      )}
                    </div>

                    <div className="font-orbitron text-lg text-primary mb-2">
                      {event.name}
                    </div>
                    <div className="text-sm font-rajdhani text-muted-foreground">
                      Access this node before it expires.
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Corner Decorations */}
      <div className="fixed bottom-6 left-6 w-20 h-0.5 bg-gradient-to-r from-primary to-transparent" />
      <div className="fixed bottom-6 left-6 w-0.5 h-20 bg-gradient-to-t from-primary to-transparent" />
      <div className="fixed bottom-6 right-6 w-20 h-0.5 bg-gradient-to-l from-secondary to-transparent" />
      <div className="fixed bottom-6 right-6 w-0.5 h-20 bg-gradient-to-t from-secondary to-transparent" />
    </div>
  );
};

export default Events;
