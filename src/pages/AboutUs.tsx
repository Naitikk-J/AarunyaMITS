import { MainNavigation } from '@/components/ui/MainNavigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const teamMembers = [
  {
    name: 'CORE_DEVELOPER_01',
    role: 'FRONTEND_ENGINEER',
    icon: '⚡',
    contribution: 'Pixel-art UI components and scroll-driven engine.',
  },
  {
    name: 'CORE_DEVELOPER_02',
    role: 'BACKEND_ARCHITECT',
    icon: '🔧',
    contribution: 'Secure data pipelines and event logic infrastructure.',
  },
  {
    name: 'DESIGN_LEAD',
    role: 'UI/UX DESIGNER',
    icon: '🎨',
    contribution: 'Visual identity, branding, and interface design.',
  },
  {
    name: 'PROJECT_LEAD',
    role: 'COORDINATOR',
    icon: '👑',
    contribution: 'Team management and strategic planning.',
  },
];

const technologies = [
  'REACT', 'TYPESCRIPT', 'TAILWIND', 'VITE', 'GSAP', 'FRAMER_MOTION', 'PIXEL_FONTS'
];

const stats = [
  { label: 'YEARS ACTIVE', value: '15+' },
  { label: 'EVENTS HOSTED', value: '200+' },
  { label: 'PARTICIPANTS', value: '50K+' },
  { label: 'SPONSORS', value: '100+' },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#05010D] text-white font-orbitron selection:bg-primary selection:text-black">
      <MainNavigation />

      <div className="relative pt-40 pb-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
          ABOUT US
        </h1>
        <div className="h-1 w-[120px] bg-primary mx-auto shadow-neon" />
        <p className="mt-8 text-sm md:text-base font-share-tech text-muted-foreground tracking-[0.4em] uppercase opacity-60 max-w-3xl mx-auto px-6">
          // DOCUMENTATION ON THE CREATORS AND THE TECHNOLOGY
        </p>
      </div>

      <div className="container mx-auto px-6 pb-20">
        <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden p-10 md:p-16 mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50 pointer-events-none" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(188, 19, 254, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(188, 19, 254, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <Badge className="bg-primary text-black font-bold tracking-widest text-[8px] rounded-none px-4 py-2 border-none mb-6">
              MISSION_STATEMENT
            </Badge>
            <div className="text-6xl mb-8 drop-shadow-[0_0_20px_rgba(188,19,254,0.4)]">🎮</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
              AARUNYA 2026
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 opacity-80">
              AARUNYA 2026 is a digital-first festival experience designed to merge retro-gaming aesthetics 
              with modern campus life. Our goal is to create an interactive "Quest-driven" environment 
              where every participant is a player in a larger narrative.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed opacity-80">
              Since its inception, Aarunya has grown into one of Central India's most anticipated 
              college festivals, bringing together innovation, creativity, and celebration.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden p-8 text-center hover:border-primary/30 transition-all group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-black text-primary mb-2">
                  {stat.value}
                </div>
                <div className="font-share-tech text-[8px] text-white/40 tracking-[0.3em] uppercase">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="bg-primary text-black font-bold tracking-widest text-[8px] rounded-none px-4 py-2 border-none mb-4">
              THE_ARCHITECTS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              MEET THE TEAM
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="group">
                <div className="relative h-full bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden hover:border-primary shadow-[0_0_30px_rgba(188,19,254,0.05)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(188,19,254,0.15)] p-8 text-center">
                  <div className="text-5xl mb-6 drop-shadow-[0_0_20px_rgba(188,19,254,0.4)] group-hover:scale-110 transition-transform">
                    {member.icon}
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors mb-2 tracking-tight">
                    {member.name}
                  </h3>
                  <p className="font-share-tech text-[10px] text-primary/60 tracking-[0.2em] uppercase mb-4">
                    {member.role}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed opacity-80">
                    {member.contribution}
                  </p>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative bg-black/40 border-2 border-white/5 rounded-xl overflow-hidden py-12 mb-20">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-20 px-10">
                {technologies.map((tech) => (
                  <span key={tech} className="text-2xl md:text-4xl text-white/10 font-black uppercase tracking-widest hover:text-primary/30 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden p-12 text-center">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(188, 19, 254, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(188, 19, 254, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="relative z-10">
            <div className="text-5xl mb-6 drop-shadow-[0_0_20px_rgba(188,19,254,0.4)]">🚀</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
              READY TO COLLABORATE?
            </h3>
            <p className="font-share-tech text-[10px] text-white/40 tracking-[0.3em] uppercase leading-relaxed max-w-xl mx-auto mb-8">
              JOIN US IN CREATING THE NEXT BIG THING
            </p>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-primary text-black font-orbitron text-[10px] px-10 py-6 rounded-none border-none shadow-neon hover:shadow-[0_0_30px_rgba(188,19,254,0.4)] transition-all tracking-[0.3em] font-bold"
              >
                SUBMIT DATA
              </Button>
              <Button
                className="bg-transparent border border-primary/30 text-primary hover:bg-primary hover:text-black transition-all rounded-none text-[10px] tracking-[0.3em] font-bold px-10 py-6"
              >
                VIEW SOURCE
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}} />
    </div>
  );
};

export default AboutUs;
