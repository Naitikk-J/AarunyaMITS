import { MainNavigation } from '@/components/ui/MainNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
  return (
    <div className="min-h-screen bg-[#05010D] text-white font-vt323 selection:bg-primary selection:text-black">
      <MainNavigation />
      
      <div className="relative pt-40 pb-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
          REGISTER
        </h1>
        <div className="h-1 w-[120px] bg-primary mx-auto shadow-neon" />
        <p className="mt-8 text-sm md:text-base font-vt323 text-muted-foreground tracking-normal opacity-60 max-w-3xl mx-auto px-6 leading-relaxed">
          Insert your credentials to join the Aarunya network and access all festival features.
        </p>
      </div>

      <main className="container mx-auto px-6 pb-40">
        <div className="max-w-md mx-auto">
          <div className="relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl overflow-hidden hover:border-primary/30 shadow-[0_0_30px_rgba(188,19,254,0.05)] transition-all duration-500 p-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50 pointer-events-none" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(188, 19, 254, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(188, 19, 254, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="text-5xl mb-6 drop-shadow-[0_0_20px_rgba(188,19,254,0.4)]">🎮</div>
                <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
                  PLAYER REGISTRATION
                </h2>
                <div className="h-1 w-full bg-white/5 relative overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-secondary/60 animate-[scan_2s_linear_infinite]" />
                </div>
                <p className="font-vt323 text-[10px] text-white/40 mt-4 uppercase tracking-normal">
                  Initialize your account to access exclusive festival features and events.
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2 group">
                  <Label className="font-vt323 text-[10px] text-white/40 group-focus-within:text-primary transition-colors tracking-normal uppercase">
                    Username
                  </Label>
                  <Input 
                    className="bg-black/40 border border-white/10 focus:border-primary rounded-lg font-vt323 text-sm h-12 transition-all placeholder:text-white/20"
                    placeholder="player_one"
                  />
                </div>

                <div className="space-y-2 group">
                  <Label className="font-vt323 text-[10px] text-white/40 group-focus-within:text-primary transition-colors tracking-normal uppercase">
                    Email Address
                  </Label>
                  <Input 
                    type="email"
                    className="bg-black/40 border border-white/10 focus:border-primary rounded-lg font-vt323 text-sm h-12 transition-all placeholder:text-white/20"
                    placeholder="player@domain.com"
                  />
                </div>

                <div className="space-y-2 group">
                  <Label className="font-vt323 text-[10px] text-white/40 group-focus-within:text-primary transition-colors tracking-normal uppercase">
                    Password
                  </Label>
                  <Input 
                    type="password"
                    className="bg-black/40 border border-white/10 focus:border-primary rounded-lg font-vt323 text-sm h-12 transition-all placeholder:text-white/20"
                    placeholder="••••••••"
                  />
                </div>

                <Button 
                  className="w-full bg-primary text-black font-orbitron text-[10px] h-14 rounded-lg border-none shadow-neon hover:shadow-[0_0_30px_rgba(188,19,254,0.4)] transition-all tracking-[0.3em] font-bold"
                >
                  INITIALIZE ACCOUNT
                </Button>
              </form>

              <div className="mt-8 text-center border-t border-white/5 pt-6">
                <div className="flex items-center justify-center gap-4">
                  <span className="font-vt323 text-[8px] text-white/30 tracking-normal uppercase">
                    System Status
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-vt323 text-[10px] text-secondary tracking-normal font-bold">Online</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
