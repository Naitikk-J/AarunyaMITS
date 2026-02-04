import { MainNavigation } from '@/components/ui/MainNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, Variants } from 'framer-motion';
import { GlitchText } from '@/components/GlitchText';

export default function Register() {
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

  return (
    <div className="min-h-screen bg-[#05010D] text-white font-vt323 selection:bg-primary selection:text-black overflow-x-hidden">
      <MainNavigation />

      <div className="content-scale">
        {/* HEADER */}
        <div className="relative pt-32 md:pt-48 pb-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />

          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-4 sm:mb-6">
              <GlitchText text="REGISTER" />
            </h1>

            <div className="h-0.5 w-16 md:w-24 bg-primary mx-auto shadow-[0_0_10px_#BC13FE]" />

            <p className="mt-4 text-[10px] sm:text-xs md:text-sm font-vt323 text-muted-foreground opacity-60 max-w-xl mx-auto px-4 leading-relaxed tracking-wider">
               // INSERT CREDENTIALS TO JOIN THE AARUNYA NETWORK
            </p>
          </motion.div>
        </div>

        {/* FORM */}
        <main className="container mx-auto px-4 sm:px-6 pb-20">
          <motion.div
            className="max-w-md mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="relative bg-[#0D0221]/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-primary/30 shadow-[0_0_30px_rgba(188,19,254,0.05)] transition-all duration-500 p-6 sm:p-8"
            >

              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50 pointer-events-none" />
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(188, 19, 254, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(188, 19, 254, 0.2) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              <div className="relative z-10">
                {/* TITLE */}
                <div className="text-center mb-6">
                  <div className="text-3xl sm:text-4xl mb-4 drop-shadow-[0_0_20px_rgba(188,19,254,0.4)]">
                    🎮
                  </div>

                  <h2 className="text-lg sm:text-xl font-black text-white mb-2 tracking-tight">
                    PLAYER REGISTRATION
                  </h2>

                  <div className="h-0.5 w-full bg-white/5 relative overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-secondary/60 animate-[scan_2s_linear_infinite]" />
                  </div>

                  <p className="font-vt323 text-[10px] sm:text-xs text-white/40 mt-3 uppercase tracking-wider">
                    Initialize your account to access exclusive features.
                  </p>
                </div>

                {/* INPUTS */}
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-1.5 group">
                    <Label className="font-vt323 text-xs sm:text-[13px] text-white/40 group-focus-within:text-primary transition-colors uppercase tracking-widest">
                      Username
                    </Label>
                    <Input
                      className="bg-black/40 border border-white/10 focus:border-primary rounded-md font-vt323 text-sm h-10 transition-all placeholder:text-white/20"
                      placeholder="player_one"
                    />
                  </div>

                  <div className="space-y-1.5 group">
                    <Label className="font-vt323 text-xs sm:text-[13px] text-white/40 group-focus-within:text-primary transition-colors uppercase tracking-widest">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      className="bg-black/40 border border-white/10 focus:border-primary rounded-md font-vt323 text-sm h-10 transition-all placeholder:text-white/20"
                      placeholder="player@domain.com"
                    />
                  </div>

                  <div className="space-y-1.5 group">
                    <Label className="font-vt323 text-xs sm:text-[13px] text-white/40 group-focus-within:text-primary transition-colors uppercase tracking-widest">
                      Password
                    </Label>
                    <Input
                      type="password"
                      className="bg-black/40 border border-white/10 focus:border-primary rounded-md font-vt323 text-sm h-10 transition-all placeholder:text-white/20"
                      placeholder="••••••••"
                    />
                  </div>

                  <Button className="w-full bg-primary text-black font-orbitron text-sm sm:text-base h-12 rounded-md border-none shadow-neon hover:shadow-[0_0_30px_rgba(188,19,254,0.4)] transition-all tracking-[0.2em] font-bold mt-2">
                    INITIALIZE ACCOUNT
                  </Button>
                </form>

                {/* STATUS */}
                <div className="mt-6 text-center border-t border-white/5 pt-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-vt323 text-xs sm:text-sm text-white/30 uppercase tracking-widest">
                      System Status
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]" />
                      <span className="font-vt323 text-xs sm:text-sm text-secondary font-bold tracking-widest">
                        Online
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>

        {/* BOTTOM LINE */}
        <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        ` }} />
      </div>
    </div>
  );
}
