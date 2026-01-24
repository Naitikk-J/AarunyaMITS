import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MainNavigation } from '@/components/ui/MainNavigation';
import HeroSection from '@/components/HeroSection';
import WelcomeSection from '@/components/WelcomeSection';
import PacManTimeline from '@/components/PacManTimeline';
import CRTOverlay from '@/components/CRTOverlay';
import Footer from '@/components/Footer';
import ArcadeLoadingScreen from '@/components/ArcadeLoadingScreen';
import PacManChaseGame from '@/components/PacManChaseGame';
import CoinCollectorGame from '@/components/CoinCollectorGame';
import JumpPlatformGame from '@/components/JumpPlatformGame';
import PixelDialogue from '@/components/PixelDialogue';
import AchievementBadge from '@/components/AchievementBadge';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
    const [isLoadingLevel, setIsLoadingLevel] = useState(false);
    const [currentLevel, setCurrentLevel] = useState('INTRO ROOM');
    const [achievement, setAchievement] = useState<{ id: string; title: string; description: string; icon?: string } | null>(null);
    const [showDialogue, setShowDialogue] = useState(true);
    const mainRef = useRef<HTMLDivElement>(null);
    const scrollVelocity = useRef(0);

    useEffect(() => {
        // ... (existing velocity tracker code)
        
        // Horizontal Scroll for Timeline Maze (8.5)
        const timelineTrigger = ScrollTrigger.create({
            trigger: "#timeline",
            start: "top top",
            end: () => `+=${document.querySelector('#timeline')?.scrollWidth || 2000}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
        });

        // Achievement for finding the secret arcade
        ScrollTrigger.create({
            trigger: "#games",
            start: "top center",
            onEnter: () => {
                setAchievement({
                    id: 'secret-arcade',
                    title: 'Arcade Master',
                    description: 'You found the hidden games zone!',
                    icon: '🎮'
                });
            },
            once: true
        });

        // prefers-reduced-motion safeguard
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            gsap.globalTimeline.pause();
        }

        return () => {
            gsap.ticker.remove(trackVelocity);
            timelineTrigger.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [currentLevel]);

    const handleLevelTransition = (levelName: string) => {
        setIsLoadingLevel(true);
        setCurrentLevel(levelName);
        // Play level complete jingle here if sound enabled
    };

    const dialogueSteps = [
        { speaker: 'SYSTEM', text: 'Welcome Player 1 to AARUNYA 2026.' },
        { speaker: 'SYSTEM', text: 'Scroll down to begin your adventure through the digital maze.' },
        { speaker: 'SYSTEM', text: 'Watch out for secrets hidden within the CRT frame!' }
    ];

    return (
        <div ref={mainRef} className="relative w-full bg-background overflow-x-hidden">
            {/* Navigation */}
            <MainNavigation />

            {/* Arcade Loading Screen */}
            <ArcadeLoadingScreen 
                isVisible={isLoadingLevel} 
                levelName={currentLevel}
                onComplete={() => setIsLoadingLevel(false)}
            />

            {/* Achievement Badge */}
            <AchievementBadge 
                achievement={achievement} 
                onClose={() => setAchievement(null)} 
            />

            {/* Pixel Dialogue System */}
            <PixelDialogue 
                steps={dialogueSteps} 
                isVisible={showDialogue}
                onComplete={() => setShowDialogue(false)}
            />

            {/* Main Content */}
            <div className="relative">
                {/* Hero Section */}
                <div id="hero" className="min-h-screen">
                    <HeroSection />
                </div>

                {/* Welcome Section */}
                <div id="welcome" className="relative">
                    <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
                        <PacManChaseGame />
                    </div>
                    <WelcomeSection />
                </div>

                {/* Timeline Section */}
                <div id="timeline" className="relative bg-background/50 py-20">
                    <div className="container mx-auto px-4 mb-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-pixel text-2xl text-secondary mb-8 text-center">MISSION: COIN COLLECTOR</h2>
                            <CoinCollectorGame />
                        </div>
                    </div>
                    <PacManTimeline />
                </div>

                {/* Arcade Zone Section */}
                <div id="games" className="py-20 bg-background relative overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="font-pixel text-3xl text-primary mb-6">ARCADE CHALLENGE</h2>
                                <p className="text-muted-foreground mb-8">
                                    Master the scroll to reach new heights. The festival is just the beginning of your journey.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 bg-primary/20 border border-primary flex items-center justify-center font-pixel text-xs text-primary">1</div>
                                        <p className="font-pixel text-[10px] uppercase tracking-wider">Scroll to Jump</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 bg-secondary/20 border border-secondary flex items-center justify-center font-pixel text-xs text-secondary">2</div>
                                        <p className="font-pixel text-[10px] uppercase tracking-wider">Reach the top</p>
                                    </div>
                                </div>
                            </div>
                            <JumpPlatformGame />
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <Footer />

                {/* CRT Overlay Effects */}
                <CRTOverlay />
            </div>

            {/* Global level transition styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                :root {
                    --crt-distortion: 0;
                }
                .crt-distortion-effect {
                    filter: url(#crt-distort);
                }
                @keyframes flash {
                    0% { background-color: transparent; }
                    50% { background-color: white; }
                    100% { background-color: transparent; }
                }
                .level-complete-flash {
                    animation: flash 0.3s ease-out;
                }
            `}} />
        </div>
    );
};

export default Index;
