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
  'REACT',
  'TYPESCRIPT',
  'TAILWIND',
  'VITE',
  'GSAP',
  'FRAMER_MOTION',
  'PIXEL_FONTS',
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

      <div className="content-scale">
        {/* HEADER */}
        <div className="relative pt-28 md:pt-40 pb-16 md:pb-20 text-center px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
            ABOUT US
          </h1>

          <div className="h-1 w-24 md:w-[120px] bg-primary mx-auto shadow-neon" />

          <p className="mt-6 text-xs sm:text-sm md:text-base font-share-tech text-muted-foreground uppercase opacity-60 max-w-3xl mx-auto tracking-[0.25em] sm:tracking-[0.4em]">
            // DOCUMENTATION ON THE CREATORS AND THE TECHNOLOGY
          </p>
        </div>

        <div className="container mx-auto px-4 sm:px-6 pb-20">
          {/* MISSION */}
          <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden p-6 sm:p-10 md:p-16 mb-20">
            <div className="absolute inset-0 opacity-10" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <Badge className="bg-primary text-black font-bold tracking-widest text-[12px] sm:text-[15px] rounded-none px-4 py-2 mb-6">
                MISSION_STATEMENT
              </Badge>

              <div className="text-4xl sm:text-6xl mb-8">🎮</div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
                AARUNYA 2026
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground mb-6 opacity-80">
                AARUNYA 2026 is a digital-first festival experience designed to
                merge retro-gaming aesthetics with modern campus life.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground opacity-80">
                Since its inception, Aarunya has grown into one of Central
                India's most anticipated college festivals.
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#0D0221]/60 border-2 border-white/5 rounded-xl p-6 sm:p-8 text-center"
              >
                <div className="text-2xl sm:text-4xl font-black text-primary mb-2">
                  {stat.value}
                </div>
                <div className="font-share-tech text-[10px] sm:text-[12px] tracking-[0.25em] text-white/40">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* TEAM */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge className="bg-primary text-black text-[12px] tracking-widest px-4 py-2 mb-4">
                THE_ARCHITECTS
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-black">MEET THE TEAM</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-[#0D0221]/60 border-2 border-white/5 rounded-xl p-6 sm:p-8 text-center"
                >
                  <div className="text-4xl sm:text-5xl mb-6">{member.icon}</div>
                  <h3 className="text-lg font-black mb-2">{member.name}</h3>
                  <p className="text-xs sm:text-[15px] text-primary/60 tracking-[0.2em] uppercase mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground opacity-80">
                    {member.contribution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* MARQUEE */}
          <div className="relative bg-black/40 border-2 border-white/5 rounded-xl py-10 mb-20 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-10 sm:gap-20 px-6 sm:px-10">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xl sm:text-4xl text-white/10 font-black tracking-widest"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#0D0221]/60 border-2 border-white/5 rounded-xl p-8 sm:p-12 text-center">
            <div className="text-4xl sm:text-5xl mb-6">🚀</div>

            <h3 className="text-xl sm:text-3xl font-black mb-4">
              READY TO COLLABORATE?
            </h3>

            <p className="text-xs sm:text-[15px] text-white/40 tracking-[0.2em] sm:tracking-[0.3em] mb-8">
              JOIN US IN CREATING THE NEXT BIG THING
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-primary text-black px-8 py-5 tracking-[0.25em] font-bold">
                SUBMIT DATA
              </Button>
              <Button className="border border-primary/30 text-primary px-8 py-5 tracking-[0.25em] font-bold">
                VIEW SOURCE
              </Button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 20s linear infinite;
            }
          `,
          }}
        />
      </div>
    </div>
  );
};

export default AboutUs;
