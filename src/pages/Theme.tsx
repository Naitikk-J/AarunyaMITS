import { useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Theme = () => {
  const [selectedTheme, setSelectedTheme] = useState('cyberpunk');

  const themes = [
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Neon',
      description: 'Futuristic neon aesthetic with glowing elements and dark backgrounds',
      preview: {
        primary: 'hsl(330 100% 50%)',
        secondary: 'hsl(240 100% 50%)',
        accent: 'hsl(180 100% 50%)'
      },
      features: ['Neon glows', 'Holographic effects', 'Dark mode optimized', 'Cyberpunk typography'],
      active: true
    },
    {
      id: 'holographic',
      name: 'Holographic Blue',
      description: 'Clean holographic interface with blue accents and transparent elements',
      preview: {
        primary: 'hsl(210 100% 60%)',
        secondary: 'hsl(190 100% 50%)',
        accent: 'hsl(270 100% 60%)'
      },
      features: ['Transparent overlays', 'Blue gradients', 'Modern typography', 'Glass morphism'],
      active: false
    },
    {
      id: 'matrix',
      name: 'Matrix Green',
      description: 'Classic matrix theme with green code rain and terminal aesthetics',
      preview: {
        primary: 'hsl(120 100% 50%)',
        secondary: 'hsl(100 100% 40%)',
        accent: 'hsl(80 100% 50%)'
      },
      features: ['Code rain effects', 'Terminal fonts', 'Monospace typography', 'Retro computing'],
      active: false
    },
    {
      id: 'sunset',
      name: 'Sunset Gradient',
      description: 'Warm sunset colors with orange and purple gradients for a vibrant feel',
      preview: {
        primary: 'hsl(25 100% 60%)',
        secondary: 'hsl(280 100% 60%)',
        accent: 'hsl(320 100% 60%)'
      },
      features: ['Warm gradients', 'Sunset palettes', 'Friendly typography', 'Energetic vibes'],
      active: false
    }
  ];

  const applyTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    // In a real app, this would update CSS variables or theme context
    console.log('Applying theme:', themeId);
  };

    return (
      <div className="min-h-screen bg-[#05010D] text-white font-orbitron selection:bg-primary selection:text-black">
        <MainNavigation />
        
        {/* Header */}
        <div className="relative pt-40 pb-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
            VISUAL THEMES
          </h1>
          <div className="h-1 w-[120px] bg-primary mx-auto shadow-neon mb-8" />
          <p className="mt-8 text-sm md:text-base font-share-tech text-muted-foreground tracking-[0.4em] uppercase opacity-60 max-w-3xl mx-auto px-6">
            // CUSTOMIZE YOUR CAMPUS EXPLORER EXPERIENCE WITH IMMERSIVE VISUAL INTERFACES
          </p>
        </div>

        <div className="container mx-auto px-6 py-12">
          {/* Current Theme Preview */}
          <div className="mb-24">
            <div className="bg-[#0D0221]/60 backdrop-blur-xl border-2 border-primary/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(188,19,254,0.1)]">
              <div className="p-10">
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                  CURRENT STREAM: {themes.find(t => t.id === selectedTheme)?.name.toUpperCase()}
                </h2>
                <p className="font-share-tech text-xs text-primary/60 tracking-[0.3em] uppercase mb-8">
                  {themes.find(t => t.id === selectedTheme)?.description}
                </p>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white/10 shadow-neon" 
                         style={{ backgroundColor: themes.find(t => t.id === selectedTheme)?.preview.primary }} />
                    <div className="w-10 h-10 rounded-full border-2 border-white/10" 
                         style={{ backgroundColor: themes.find(t => t.id === selectedTheme)?.preview.secondary }} />
                    <div className="w-10 h-10 rounded-full border-2 border-white/10" 
                         style={{ backgroundColor: themes.find(t => t.id === selectedTheme)?.preview.accent }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-share-tech tracking-[0.2em] uppercase opacity-40">
                    PRIMARY // SECONDARY // ACCENT
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {themes.find(t => t.id === selectedTheme)?.features.map((feature, index) => (
                    <Badge key={index} className="bg-transparent border border-primary/20 text-primary/80 font-share-tech text-[10px] tracking-widest rounded-none px-4 py-1">
                      {feature.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Theme Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-40">
            {themes.map((theme) => (
              <div key={theme.id} className="group">
                <div className={`relative h-full bg-[#0D0221]/60 backdrop-blur-xl border-2 rounded-xl overflow-hidden transition-all duration-500 flex flex-col ${
                  selectedTheme === theme.id 
                    ? 'border-primary shadow-[0_0_30px_rgba(188,19,254,0.2)]' 
                    : 'border-white/5 hover:border-primary/40'
                }`}>
                  {/* Theme Preview */}
                  <div className="h-40 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br opacity-20 group-hover:scale-110 transition-transform duration-700" 
                         style={{ 
                           backgroundImage: `linear-gradient(135deg, ${theme.preview.primary}, ${theme.preview.secondary}, ${theme.preview.accent})` 
                         }} />
                    <div className="text-5xl group-hover:scale-125 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">🎨</div>
                    
                    {selectedTheme === theme.id && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-black font-black tracking-widest text-[8px] rounded-none px-3 py-1 border-none shadow-neon">
                          ACTIVE
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors mb-2 tracking-tight">
                      {theme.name.toUpperCase()}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-8 leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                      {theme.description}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex gap-2">
                          <div className="w-6 h-6 rounded-full border border-white/10" 
                               style={{ backgroundColor: theme.preview.primary }} />
                          <div className="w-6 h-6 rounded-full border border-white/10" 
                               style={{ backgroundColor: theme.preview.secondary }} />
                          <div className="w-6 h-6 rounded-full border border-white/10" 
                               style={{ backgroundColor: theme.preview.accent }} />
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => applyTheme(theme.id)}
                        className={`w-full font-orbitron text-[10px] tracking-[0.3em] font-bold py-6 rounded-none border-2 transition-all ${
                          selectedTheme === theme.id 
                            ? 'bg-transparent border-primary/40 text-primary cursor-default' 
                            : 'bg-primary border-primary text-black hover:bg-transparent hover:text-primary shadow-neon'
                        }`}
                      >
                        {selectedTheme === theme.id ? 'CURRENT INTERFACE' : 'REWRITE REALITY'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Theme Customization Info */}
          <div className="mb-40 pt-20 border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">🌈</div>
                <h4 className="text-lg font-black text-white mb-3 tracking-widest group-hover:text-primary transition-colors">COLOR SCHEMES</h4>
                <p className="text-muted-foreground font-medium text-xs leading-relaxed opacity-60">
                  CHOOSE FROM PREDEFINED COLOR PALETTES OR INJECT YOUR OWN SPECTRAL DATA.
                </p>
              </div>
              <div className="text-center group">
                <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">⚡</div>
                <h4 className="text-lg font-black text-white mb-3 tracking-widest group-hover:text-primary transition-colors">ANIMATIONS</h4>
                <p className="text-muted-foreground font-medium text-xs leading-relaxed opacity-60">
                  TOGGLE GLITCH EFFECTS, TRANSITION SPEEDS, AND TEMPORAL FLOW.
                </p>
              </div>
              <div className="text-center group">
                <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">🔧</div>
                <h4 className="text-lg font-black text-white mb-3 tracking-widest group-hover:text-primary transition-colors">ADVANCED</h4>
                <p className="text-muted-foreground font-medium text-xs leading-relaxed opacity-60">
                  FINE-TUNE INDIVIDUAL ELEMENTS AND LOW-LEVEL INTERFACE COMPONENTS.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer decoration */}
        <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />
      </div>
    );
};

export default Theme;