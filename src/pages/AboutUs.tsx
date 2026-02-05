import { MainNavigation } from '@/components/ui/MainNavigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, Variants } from 'framer-motion';
import { GlitchText } from '@/components/GlitchText';

const teamGroups = [
  {
    role: 'FRONTEND DEVELOPERS',
    icon: '⚡',
    members: [
      { name: 'Naitik Jain', link: 'https://www.linkedin.com/in/naitik-jain-9290b8324' },
      { name: 'Nihari Shrivastava', link: 'https://www.linkedin.com/in/nihari-shrivastava-878739279' }
    ]
  },
  {
    role: 'UI/UX DESIGNERS',
    icon: '🎨',
    members: [
      { name: 'Nemish Nagaria', link: 'https://www.linkedin.com/in/nemish-nagaria-555198313' },
      { name: 'Shruti Gupta', link: 'https://in.linkedin.com/in/shruti-gupta-200734340' }
    ]
  },
  {
    role: 'BACKEND DEVELOPERS',
    icon: '🔧',
    members: [
      { name: 'Sanchit Jain', link: 'https://linkedin.com/in/lnSanchit' },
      { name: 'Viraj Gupta', link: 'https://www.linkedin.com/in/viraj-gupta-ok/' },
      { name: 'Pulastya Bhagwat', link: 'https://www.linkedin.com/in/pulastya-bhagwat/' },
      { name: 'Vishesh Dwivedi', link: 'https://www.linkedin.com/in/vishesh-dwivedi-3917b1377' }
    ]
  }
];

const technologies = [
  'REACT',
  'TYPESCRIPT',
  'TAILWIND',
  'VITE',
  'GSAP',
  'FRAMER_MOTION',
  'PIXEL_FONTS',
  'THREE.JS',
];

const stats = [
  { label: 'YEARS ACTIVE', value: '1+' },
  { label: 'EVENTS HOSTED', value: '50+' },
  { label: 'PARTICIPANTS', value: '1000+' },
  { label: 'SPONSORS', value: '10+' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#05010D] text-white font-orbitron selection:bg-primary selection:text-black overflow-x-hidden">
      <MainNavigation />

      <div className="content-scale">
        {/* HEADER */}
        <div className="relative pt-32 md:pt-48 pb-12 text-center px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.08)_0%,transparent_70%)] pointer-events-none" />

          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-black tracking-tight mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <GlitchText text="ABOUT US" />
            </h1>

            <div className="h-0.5 w-16 md:w-24 bg-primary mx-auto shadow-[0_0_10px_#BC13FE]" />

            <p className="mt-4 text-[9px] sm:text-[10px] md:text-xs font-share-tech text-white/50 uppercase max-w-xl mx-auto tracking-[0.2em]">
                // DOCUMENTATION ON THE CREATORS AND THE TECHNOLOGY
            </p>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 pb-10 max-w-5xl">
          {/* MISSION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative bg-[#0D0221]/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden p-6 md:p-8 mb-10 hover:border-primary/30 transition-colors duration-500 group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <Badge className="bg-primary/90 hover:bg-primary text-black font-bold tracking-widest text-[9px] sm:text-[10px] rounded px-2 py-0.5 mb-4">
                MISSION_STATEMENT
              </Badge>

              <div className="text-2xl sm:text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">🎮</div>

              <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-3 text-white/90">
                AARUNYA 2026
              </h2>

              <p className="text-xs md:text-sm text-white/70 mb-3 leading-relaxed">
                AARUNYA 2026 is a digital-first festival experience designed to
                merge retro-gaming aesthetics with modern campus life.
              </p>

              <p className="text-xs md:text-sm text-white/60 leading-relaxed">
                Since its inception, Aarunya has grown into one of Central
                India's most anticipated college festivals.
              </p>
            </div>
          </motion.div>

          {/* STATS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(188, 19, 254, 0.05)" }}
                className="bg-[#0D0221]/60 border border-white/10 rounded-lg p-4 text-center hover:border-primary/40 transition-all duration-300"
              >
                <div className="text-xl sm:text-2xl font-black text-primary mb-1 drop-shadow-[0_0_8px_rgba(188,19,254,0.4)]">
                  {stat.value}
                </div>
                <div className="font-share-tech text-[9px] sm:text-[10px] tracking-[0.2em] text-white/40">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* TEAM */}
          <div className="mb-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <Badge className="bg-primary/90 text-black text-[9px] tracking-widest px-2 py-0.5 mb-2">
                THE_ARCHITECTS
              </Badge>
              <h2 className="text-lg sm:text-2xl font-black text-white/90">MEET THE TEAM</h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {teamGroups.map((group) => (
                <motion.div
                  key={group.role}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-[#0D0221]/60 border border-white/10 rounded-xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="relative w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-primary/50 transition-colors">
                    <div className="text-2xl sm:text-3xl grayscale group-hover:grayscale-0 transition-all">{group.icon}</div>
                  </div>

                  <h3 className="text-sm font-black mb-4 text-primary tracking-widest uppercase border-b border-white/10 pb-2">
                    {group.role}
                  </h3>

                  <div className="flex flex-col gap-3 flex-grow justify-center">
                    {group.members.map((member) => (
                      <a
                        key={member.name}
                        href={member.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#00ffff] font-bold text-sm sm:text-base tracking-wider transition-colors flex items-center justify-center gap-2 group/member"
                      >
                        <span className="opacity-0 group-hover/member:opacity-100 transition-opacity text-primary">›</span>
                        {member.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* MARQUEE - Full Width */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full relative bg-black/40 border-y border-white/10 py-6 mb-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#05010D] via-transparent to-[#05010D] z-10 pointer-events-none" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-8 md:gap-16 px-4 md:px-8">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-base sm:text-lg text-white/30 font-black tracking-widest hover:text-primary transition-colors duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 pb-16 max-w-5xl">
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0D0221]/60 border border-white/10 rounded-xl p-6 sm:p-8 text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="text-2xl sm:text-3xl mb-3 grayscale group-hover:grayscale-0 transition-all duration-500">🚀</div>

            <h3 className="text-lg sm:text-xl font-black mb-2 text-white/90">
              READY TO COLLABORATE?
            </h3>

            <p className="text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em] mb-5">
              JOIN US IN CREATING THE NEXT BIG THING
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 relative z-10">
              <Button className="bg-primary hover:bg-primary/90 text-black px-5 py-3 text-[10px] tracking-[0.2em] font-bold">
                SUBMIT DATA
              </Button>
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 px-5 py-3 text-[10px] tracking-[0.2em] font-bold bg-transparent">
                VIEW SOURCE
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
          `,
          }}
        />
      </div>
    </div>
  );
};

export default AboutUs;
