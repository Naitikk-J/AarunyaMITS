import { MainNavigation } from '@/components/ui/MainNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-electric-yellow selection:text-black">
      <MainNavigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-md mx-auto relative">
          {/* Decorative Corner Pixels */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-electric-yellow" />
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-electric-yellow" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-electric-yellow" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-electric-yellow" />

          <div className="bg-black border-4 border-electric-yellow p-8 shadow-[8px_8px_0px_rgba(255,214,51,0.3)]">
            <div className="text-center mb-10">
              <h1 className="font-pixel text-3xl text-electric-yellow mb-2 tracking-tighter glow-yellow">
                PLAYER REGISTER
              </h1>
              <div className="h-1 w-full bg-electric-yellow/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-electric-yellow animate-[scan_2s_linear_infinite]" />
              </div>
              <p className="font-pixel text-[10px] text-muted-foreground mt-4 uppercase tracking-widest">
                Insert credentials to start your journey
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2 group">
                <Label className="font-pixel text-xs text-electric-yellow/80 group-focus-within:text-electric-yellow transition-colors">
                  USERNAME_
                </Label>
                <Input 
                  className="bg-black border-2 border-electric-yellow/30 focus:border-electric-yellow rounded-none font-pixel text-sm h-12 transition-all placeholder:text-white/10"
                  placeholder="PLAYER_ONE"
                />
              </div>

              <div className="space-y-2 group">
                <Label className="font-pixel text-xs text-electric-yellow/80 group-focus-within:text-electric-yellow transition-colors">
                  EMAIL_ADDRESS_
                </Label>
                <Input 
                  type="email"
                  className="bg-black border-2 border-electric-yellow/30 focus:border-electric-yellow rounded-none font-pixel text-sm h-12 transition-all placeholder:text-white/10"
                  placeholder="PLAYER@DOMAIN.COM"
                />
              </div>

              <div className="space-y-2 group">
                <Label className="font-pixel text-xs text-electric-yellow/80 group-focus-within:text-electric-yellow transition-colors">
                  PASSWORD_
                </Label>
                <Input 
                  type="password"
                  className="bg-black border-2 border-electric-yellow/30 focus:border-electric-yellow rounded-none font-pixel text-sm h-12 transition-all placeholder:text-white/10"
                  placeholder="********"
                />
              </div>

              <Button 
                className="w-full bg-electric-yellow text-black font-pixel text-sm h-14 rounded-none border-4 border-black shadow-[4px_4px_0px_#888] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#888] active:translate-y-[2px] active:shadow-none transition-all group"
              >
                <span className="group-hover:animate-pulse">START GAME</span>
              </Button>
            </form>

            <div className="mt-8 text-center border-t-2 border-white/5 pt-6">
              <p className="font-pixel text-[10px] text-muted-foreground uppercase">
                System Status: <span className="text-green-500 animate-pulse">Online</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { left: -33%; }
          100% { left: 100%; }
        }
      `}} />
    </div>
  );
}
