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

    useEffect(() => {
        // Track velocity safely
        const velocityTracker = {
            lastPos: window.scrollY,
            lastTime: Date.now(),
            velocity: 0
        };

        const updateVelocity = () => {
            const currentPos = window.scrollY;
            const currentTime = Date.now();
            const distance = currentPos - velocityTracker.lastPos;
            const time = currentTime - velocityTracker.lastTime;
            
            if (time > 0) {
                velocityTracker.velocity = Math.abs(distance / time);
                document.documentElement.style.setProperty('--scroll-velocity', velocityTracker.velocity.toString());
            }
            
            velocityTracker.lastPos = currentPos;
            velocityTracker.lastTime = currentTime;
        };

        window.addEventListener('scroll', updateVelocity, { passive: true });

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

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            gsap.globalTimeline.pause();
        }

        return () => {
            window.removeEventListener('scroll', updateVelocity);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const dialogueSteps = [
        { speaker: 'SYSTEM', text: 'Welcome Player 1 to AARUNYA 2026.' },
        { speaker: 'SYSTEM', text: 'Scroll down to begin your adventure through the digital maze.' },
        { speaker: 'SYSTEM', text: 'Watch out for secrets hidden within the CRT frame!' }
    ];

    return (
        <div 
            ref={mainRef} 
            className="relative w-full overflow-x-hidden"
            style={{
                backgroundImage: 'url(/Loadingscreen.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <MainNavigation />

            <ArcadeLoadingScreen 
                isVisible={isLoadingLevel} 
                levelName={currentLevel}
                onComplete={() => setIsLoadingLevel(false)}
            />

            <AchievementBadge 
                achievement={achievement} 
                onClose={() => setAchievement(null)} 
            />

            <PixelDialogue 
                steps={dialogueSteps} 
                isVisible={showDialogue}
                onComplete={() => setShowDialogue(false)}
            />

            <div className="relative">
                <div id="hero" className="min-h-screen">
                    <HeroSection />
                </div>

                <div id="welcome" className="relative">
                    <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
                        <PacManChaseGame />
                    </div>
                    <WelcomeSection />
                </div>

                {/* Timeline Section - Optimized Scroll Length */}
                <div id="timeline-section" className="relative bg-transparent pt-8 pb-4">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-pixel text-2xl text-secondary mb-6 text-center">MISSION: COIN COLLECTOR</h2>
                            <CoinCollectorGame />
                        </div>
                    </div>
                    <PacManTimeline />
                </div>

                <div id="games" className="py-20 bg-transparent relative overflow-hidden">
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

                <Footer />
                <CRTOverlay />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                :root {
                    --crt-distortion: 0;
                    --scroll-velocity: 0;
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
