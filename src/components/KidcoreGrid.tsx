import PixelCard from "./PixelCard";
import PixelButton from "./PixelButton";
import { PixelStar, PixelHeart, PixelMusicNote, PixelController, PixelDivider } from "./PixelDecorations";

const categories = [
  { 
    title: "MUSIC", 
    desc: "Battle of Bands, DJ Night, Solo Singing", 
    bg: "bg-radical-red",
    icon: "🎸"
  },
  { 
    title: "DANCE", 
    desc: "Group & Solo Competitions, Flash Mob", 
    bg: "bg-neon-magenta",
    icon: "💃"
  },
  { 
    title: "ART", 
    desc: "Exhibitions, Workshops, Live Painting", 
    bg: "bg-cyber-blue",
    icon: "🎨"
  },
  { 
    title: "DRAMA", 
    desc: "Nukkad Natak, Stage Plays, Mime", 
    bg: "bg-lime-green",
    icon: "🎭"
  },
  { 
    title: "GAMING", 
    desc: "Esports, LAN Party, Retro Arcade", 
    bg: "bg-arcade-orange",
    icon: "🕹️"
  },
  { 
    title: "LITERARY", 
    desc: "Debates, Poetry, Creative Writing", 
    bg: "bg-electric-yellow",
    icon: "📚"
  },
];

const KidcoreGrid = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden" id="events">
      {/* Pixel art background decorations */}
      <PixelStar className="absolute top-10 left-10 w-8 h-8 opacity-30 animate-pulse" color="electric-yellow" />
      <PixelHeart className="absolute top-20 right-10 w-6 h-6 opacity-30 animate-pulse" color="radical-red" />
      <PixelMusicNote className="absolute bottom-20 left-20 w-6 h-8 opacity-30 animate-pulse" color="neon-magenta" />
      <PixelController className="absolute bottom-10 right-10 w-12 h-8 opacity-30" />

      <div className="max-w-6xl mx-auto">
        <h2 className="font-pixel text-xl md:text-3xl text-center text-radical-red mb-4 glow-red tracking-wider">
          WHAT AWAITS YOU
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto text-sm">
          Four days of music, art, competition, and unforgettable memories
        </p>

        <PixelDivider className="mb-12" />

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { num: "50+", label: "EVENTS" },
            { num: "10K+", label: "PARTICIPANTS" },
            { num: "4", label: "DAYS" },
            { num: "₹5L+", label: "PRIZES" },
          ].map((stat, i) => (
            <PixelCard key={i} className="text-center py-6">
              <div className="font-pixel text-2xl md:text-3xl text-electric-yellow glow-yellow mb-2">
                {stat.num}
              </div>
              <div className="font-pixel text-[8px] text-muted-foreground tracking-wider">
                {stat.label}
              </div>
            </PixelCard>
          ))}
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat, i) => (
            <div 
              key={i}
              className={`
                ${cat.bg} p-6 
                border-4 border-crt-black 
                shadow-[6px_6px_0_0_hsl(var(--crt-black))]
                transition-all duration-200
                hover:translate-x-[-3px] hover:translate-y-[-3px]
                hover:shadow-[9px_9px_0_0_hsl(var(--crt-black))]
                cursor-pointer
              `}
              style={{ imageRendering: 'pixelated' }}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{cat.icon}</span>
                <div>
                  <h3 className="font-pixel text-sm text-crt-black mb-1">{cat.title}</h3>
                  <p className="text-xs text-crt-black/70">{cat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <PixelButton variant="secondary" size="lg">
            VIEW ALL EVENTS
          </PixelButton>
        </div>
      </div>
    </section>
  );
};

export default KidcoreGrid;
