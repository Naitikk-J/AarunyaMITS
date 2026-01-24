import { MainNavigation } from '@/components/ui/MainNavigation';
import { Badge } from '@/components/ui/badge';

const teamMembers = [
  {
    name: 'CORE_DEVELOPER_01',
    role: 'FRONTEND_ENGINEER',
    contribution: 'Pixel-art UI components and scroll-driven engine.',
  },
  {
    name: 'CORE_DEVELOPER_02',
    role: 'BACKEND_ARCHITECT',
    contribution: 'Secure data pipelines and event logic infrastructure.',
  },
];

const technologies = [
  'REACT', 'TYPESCRIPT', 'TAILWIND', 'VITE', 'GSAP', 'FRAMER_MOTION', 'PIXEL_FONTS'
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black text-white font-pixel selection:bg-electric-yellow selection:text-black">
      <MainNavigation />

      {/* Header */}
      <div className="relative pt-32 pb-16 overflow-hidden border-b-4 border-electric-yellow/20">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl text-electric-yellow mb-4 glow-yellow uppercase tracking-tighter">
            SYSTEM_SPECS
          </h1>
          <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.3em] max-w-2xl mx-auto">
            Documentation on the creators and the technology powering AARUNYA 2026.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="border-4 border-white/10 p-8 relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-electric-yellow" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-electric-yellow" />
            
            <h2 className="text-2xl text-electric-yellow mb-6 uppercase tracking-tight">MISSION_STATEMENT</h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed uppercase tracking-wider">
              AARUNYA 2026 is a digital-first festival experience designed to merge retro-gaming aesthetics 
              with modern campus life. Our goal is to create an interactive "Quest-driven" environment 
              where every participant is a player in a larger narrative.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 py-20 border-t-4 border-white/5 bg-white/5">
        <h2 className="text-3xl text-center text-electric-yellow mb-16 uppercase tracking-tighter">THE_ARCHITECTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.name} className="relative group">
              <div className="absolute inset-0 bg-electric-yellow/5 border-2 border-white/10 group-hover:border-electric-yellow transition-colors" />
              <div className="relative p-8 space-y-4">
                <div className="w-16 h-1 bg-electric-yellow mb-4" />
                <h3 className="text-xl text-white group-hover:text-electric-yellow transition-colors">{member.name}</h3>
                <p className="text-[10px] text-electric-yellow/60 uppercase">{member.role}</p>
                <p className="text-[10px] text-muted-foreground uppercase leading-relaxed">
                  {member.contribution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="py-20 overflow-hidden bg-black border-y-4 border-white/5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-20 px-10">
              {technologies.map((tech) => (
                <span key={tech} className="text-2xl md:text-4xl text-white/10 font-bold uppercase tracking-widest hover:text-electric-yellow/20 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 py-32 text-center">
        <h2 className="text-3xl text-white mb-10 uppercase tracking-tighter">READY_TO_COLABORATE?</h2>
        <div className="flex justify-center gap-6">
          <button className="px-8 py-4 bg-electric-yellow text-black text-xs font-bold uppercase border-4 border-black shadow-[4px_4px_0px_#888] hover:translate-y-[-2px] transition-all">
            SUBMIT_DATA
          </button>
          <button className="px-8 py-4 bg-transparent text-white text-xs font-bold uppercase border-4 border-white/20 hover:border-electric-yellow transition-all">
            VIEW_SOURCE
          </button>
        </div>
      </div>

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
