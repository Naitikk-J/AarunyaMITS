import { MainNavigation } from '@/components/ui/MainNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
  return (
    <div className="min-h-screen bg-[#05010D] text-white font-vt323 selection:bg-primary selection:text-black">
      <MainNavigation />

      <div className="content-scale">
        {/* HEADER */}
        <div className="relative pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4 sm:mb-6">
            REGISTER
          </h1>

          <div className="h-1 w-24 sm:w-[120px] bg-primary mx-auto shadow-neon" />

          <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-xl font-vt323 text-muted-foreground opacity-60 max-w-3xl mx-auto px-4 sm:px-6 leading-relaxed">
            Insert your credentials to join the Aarunya network and access all festival features.
          </p>
        </div>

        {/* FORM */}
        <main className="container mx-auto px-4 sm:px-6 pb-32 sm:pb-40">
          <div className="max-w-md mx-auto">
            <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden hover:border-primary/30 shadow-[0_0_30px_rgba(188,19,254,0.05)] transition-all duration-500 p-6 sm:p-8 md:p-10">
              
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
                <div className="text-center mb-8 sm:mb-10">
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 drop-shadow-[0_0_20px_rgba(188,19,254,0.4)]">
                    🎮
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                    PLAYER REGISTRATION
                  </h2>

                  <div className="h-1 w-full bg-white/5 relative overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-secondary/60 animate-[scan_2s_linear_infinite]" />
                  </div>

                  <p className="font-vt323 text-sm sm:text-base md:text-lg text-white/40 mt-4 uppercase tracking-normal">
                    Initialize your account to access exclusive festival features and events.
                  </p>
                </div>

                {/* INPUTS */}
                <form className="space-y-5 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2 group">
                    <Label className="font-vt323 text-sm sm:text-base md:text-lg text-white/40 group-focus-within:text-primary transition-colors uppercase">
                      Username
                    </Label>
                    <Input
                      className="bg-black/40 border border-white/10 focus:border-primary rounded-lg font-vt323 text-sm sm:text-base md:text-lg h-11 sm:h-12 transition-all placeholder:text-white/20"
                      placeholder="player_one"
                    />
                  </div>

                  <div className="space-y-2 group">
                    <Label className="font-vt323 text-sm sm:text-base md:text-lg text-white/40 group-focus-within:text-primary transition-colors uppercase">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      className="bg-black/40 border border-white/10 focus:border-primary rounded-lg font-vt323 text-sm sm:text-base md:text-lg h-11 sm:h-12 transition-all placeholder:text-white/20"
                      placeholder="player@domain.com"
                    />
                  </div>

                  <div className="space-y-2 group">
                    <Label className="font-vt323 text-sm sm:text-base md:text-lg text-white/40 group-focus-within:text-primary transition-colors uppercase">
                      Password
                    </Label>
                    <Input
                      type="password"
                      className="bg-black/40 border border-white/10 focus:border-primary rounded-lg font-vt323 text-sm sm:text-base md:text-lg h-11 sm:h-12 transition-all placeholder:text-white/20"
                      placeholder="••••••••"
                    />
                  </div>

                  <Button className="w-full bg-primary text-black font-orbitron text-sm sm:text-base md:text-lg h-12 sm:h-14 rounded-lg border-none shadow-neon hover:shadow-[0_0_30px_rgba(188,19,254,0.4)] transition-all tracking-[0.2em] sm:tracking-[0.3em] font-bold">
                    INITIALIZE ACCOUNT
                  </Button>
                </form>

                {/* STATUS */}
                <div className="mt-6 sm:mt-8 text-center border-t border-white/5 pt-5 sm:pt-6">
                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <span className="font-vt323 text-sm sm:text-base md:text-lg text-white/30 uppercase">
                      System Status
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-vt323 text-sm sm:text-base md:text-lg text-secondary font-bold">
                        Online
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* BOTTOM LINE */}
        <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        ` }} />
      </div>
    </div>
  );
}