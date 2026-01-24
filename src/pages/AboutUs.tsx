import { useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const teamMembers = [
  {
    name: 'Teammate Name',
    role: 'Frontend Developer',
    image: '/team/member1.jpg',
    skills: ['React', 'Tailwind', 'Animations'],
    contribution: 'Designed UI, animations & kidcore interactions',
  },
  {
    name: 'Teammate Name',
    role: 'Backend Developer',
    image: '/team/member2.jpg',
    skills: ['Node.js', 'Auth', 'APIs'],
    contribution: 'Built backend logic & authentication system',
  },
];

const technologies = [
  'React',
  'TypeScript',
  'Tailwind',
  'Vite',
  'Node.js',
  'Cyber UI',
  'AARUNYA ID',
];

const AboutUs = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    setTilt({ x, y });
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <MainNavigation />

      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 via-accent/10 to-transparent py-24">
        <div className="absolute inset-0 scanlines opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-6xl md:text-7xl font-orbitron font-bold text-center mb-4 kidcore-text animate-rainbow">
            AARUNYA 2.0
          </h1>
          <p className="text-xl text-center text-muted-foreground font-rajdhani max-w-3xl mx-auto">
            A futuristic campus experience blending creativity, technology, and interaction.
          </p>
        </div>
      </div>

      {/* MISSION */}
      <section className="py-24 px-6">
        <Card className="glass-card max-w-4xl mx-auto text-center">
          <CardHeader>
            <CardTitle className="font-orbitron text-2xl kidcore-text">
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="font-rajdhani text-lg leading-relaxed text-muted-foreground">
            AARUNYA 2.0 is designed to merge technology, creativity, and
            interaction — redefining how students explore campus events through
            immersive digital experiences.
          </CardContent>
        </Card>
      </section>

      {/* TEAM */}
      <section className="py-24">
        <h2 className="text-center text-4xl font-orbitron mb-16 kidcore-text">
          CORE TEAM
        </h2>

        <div className="flex flex-wrap justify-center gap-14 px-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="w-72 h-96 perspective"
              onMouseMove={handleTilt}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            >
              <div
                className="relative w-full h-full preserve-3d transition-transform duration-500 floating-sticker"
                style={{
                  transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                }}
              >
                {/* FRONT */}
                <Card className="absolute inset-0 backface-hidden glass-card flex flex-col items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full border border-primary mb-4 object-cover"
                  />
                  <h3 className="text-xl font-orbitron text-primary">
                    {member.name}
                  </h3>
                  <p className="text-sm font-mono text-muted-foreground">
                    {member.role}
                  </p>
                </Card>

                {/* BACK */}
                <Card className="absolute inset-0 backface-hidden rotate-y-180 glass-card p-5">
                  <p className="text-sm mb-4 font-rajdhani text-muted-foreground">
                    {member.contribution}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="font-mono text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ TECH MARQUEE — FIXED */}
      {/* TECH MARQUEE — FINAL CORRECT VERSION */}
<section className="py-20 overflow-hidden relative">
  <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />

  {/* VIEWPORT */}
  <div className="w-full overflow-hidden">
    {/* TRACK */}
    <div className="flex animate-marquee min-w-max">
      {/* FIRST COPY */}
      <div className="flex gap-14 px-6">
        {technologies.map((tech, i) => (
          <span
            key={`tech-1-${i}`}
            className="text-xl md:text-2xl font-mono kidcore-text whitespace-nowrap"
          >
            ⚡ {tech}
          </span>
        ))}
      </div>

      {/* SECOND COPY */}
      <div className="flex gap-14 px-6">
        {technologies.map((tech, i) => (
          <span
            key={`tech-2-${i}`}
            className="text-xl md:text-2xl font-mono kidcore-text whitespace-nowrap"
          >
            ⚡ {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* CTA */}
      <section className="py-28 text-center">
        <h2 className="text-4xl font-orbitron mb-10 kidcore-text">
          JOIN THE AARUNYA REVOLUTION
        </h2>
        <div className="flex justify-center gap-6 flex-wrap">
          <Button className="kidcore-btn font-orbitron">Join Team</Button>
          <Button variant="outline" className="font-orbitron">
            Feedback
          </Button>
        </div>
      </section>

      {/* CORNERS */}
      <div className="fixed bottom-6 left-6 w-20 h-0.5 bg-gradient-to-r from-primary to-transparent" />
      <div className="fixed bottom-6 left-6 w-0.5 h-20 bg-gradient-to-t from-primary to-transparent" />
      <div className="fixed bottom-6 right-6 w-20 h-0.5 bg-gradient-to-l from-secondary to-transparent" />
      <div className="fixed bottom-6 right-6 w-0.5 h-20 bg-gradient-to-t from-secondary to-transparent" />
    </div>
  );
};

export default AboutUs;
