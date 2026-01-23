import { useState, useCallback, useEffect } from 'react';
import { CampusScene } from '@/components/3d/CampusScene';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { ControlsGuide } from '@/components/ui/ControlsGuide';
import { BottomActions } from '@/components/ui/BottomActions';
import { BuildingInfo } from '@/components/ui/BuildingInfo';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { EventModal } from '@/components/ui/EventModal';
import { KidcoreDecorations } from '@/components/ui/KidcoreDecorations';

const Index = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
    const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [webglSupported, setWebglSupported] = useState(true);
    const [isDayMode, setIsDayMode] = useState(false);
    const [visualMode, setVisualMode] = useState<'normal' | 'wireframe' | 'neon'>('normal');


    useEffect(() => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            setWebglSupported(false);
            setIsLoading(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(() => {
                setHoveredBuilding('main-gate');
            }, 100);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    // Handle keyboard hotkeys for visual modes
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === '1') {
                setVisualMode('normal');
            } else if (e.key === '2') {
                setVisualMode('wireframe');
            } else if (e.key === '3') {
                setVisualMode('neon');
            } else if (e.key === 'n' && e.ctrlKey) {
                e.preventDefault();
                setIsDayMode(!isDayMode);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isDayMode]);

    useEffect(() => {
        if (!isLoading && !hoveredBuilding) {
            setHoveredBuilding('main-gate');
        }
    }, [isLoading, hoveredBuilding]);

    const handleBuildingHover = useCallback((building: string | null) => {
        if (building) {
            setHoveredBuilding(building);
        }
    }, []);

    const handleBuildingClick = useCallback((building: string) => {
        setSelectedBuilding(building);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBuilding(null);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-background">
            {isLoading && <LoadingScreen />}
            <KidcoreDecorations />
            <MainNavigation />
            <ControlsGuide />
            {!isLoading && <BuildingInfo buildingId={hoveredBuilding} />}
            <div className="absolute inset-0">
                {webglSupported ? (
                    <CampusScene
                        onBuildingHover={handleBuildingHover}
                        onBuildingClick={handleBuildingClick}
                        isLoading={isLoading}
                        selectedBuilding={selectedBuilding}
                        isDayMode={isDayMode}
                        onDayNightToggle={setIsDayMode}
                        visualMode={visualMode}
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#0a1a2a] to-[#050c15] text-center">
                        <p className="font-orbitron text-lg text-primary">WebGL is not available on this device.</p>
                        <p className="text-sm text-muted-foreground">Showing a static placeholder instead.</p>
                        <img src="/placeholder.svg" alt="Campus map placeholder" className="max-w-md opacity-80" />
                    </div>
                )}
            </div>
            <div className="absolute inset-0 pointer-events-none scanlines opacity-30" />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, hsl(240 80% 5% / 0.8) 100%)',
                }}
            />
            <BottomActions />

            {/* Day/Night Toggle Button */}
            <button
                onClick={() => setIsDayMode(!isDayMode)}
                className="fixed bottom-32 right-6 z-50 p-3 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
                title={isDayMode ? 'Switch to Night Mode (Ctrl+N)' : 'Switch to Day Mode (Ctrl+N)'}
            >
                {isDayMode ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.83-2.83a1 1 0 00-1.414 1.414l2.83 2.83a1 1 0 001.414-1.414M2.05 6.464l2.83 2.83a1 1 0 101.414-1.414L3.464 5.05A1 1 0 102.05 6.464zm9.9-9.9l-2.83 2.83a1 1 0 001.414 1.414l2.83-2.83a1 1 0 00-1.414-1.414zm0 18.8l-2.828-2.829a1 1 0 00-1.414 1.415l2.828 2.828a1 1 0 001.414-1.415zM5.05 9.05L2.22 6.22a1 1 0 00-1.414 1.414l2.83 2.83a1 1 0 101.414-1.414zm10.606 0l-2.83-2.83a1 1 0 00-1.414 1.414l2.83 2.83a1 1 0 101.414-1.414zM6.464 17.95l-2.83-2.83a1 1 0 00-1.414 1.414l2.83 2.83a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                )}
            </button>

            {/* Visual Mode Indicator */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
                <div className="glass-nav-block px-4 py-2 rounded-lg text-xs font-orbitron tracking-wider text-center">
                    <div className="text-kidcore-yellow mb-1">Visual Mode: {visualMode.toUpperCase()}</div>
                    <div className="text-muted-foreground text-[10px] hidden md:block">
                        <div>Press 1: Normal</div>
                        <div>Press 2: Wireframe</div>
                        <div>Press 3: Neon</div>
                    </div>
                </div>
            </div>

            {/* Mobile Visual Mode Buttons */}
            <div className="fixed bottom-6 left-6 z-50 md:hidden flex flex-col gap-2">
                <button
                    onClick={() => setVisualMode('normal')}
                    className={`px-4 py-2 rounded-lg font-orbitron text-xs transition-all duration-200 ${
                        visualMode === 'normal'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                            : 'glass-nav-block text-muted-foreground hover:text-primary'
                    }`}
                    title="Normal View"
                >
                    Normal
                </button>
                <button
                    onClick={() => setVisualMode('wireframe')}
                    className={`px-4 py-2 rounded-lg font-orbitron text-xs transition-all duration-200 ${
                        visualMode === 'wireframe'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                            : 'glass-nav-block text-muted-foreground hover:text-primary'
                    }`}
                    title="Wireframe View"
                >
                    Wireframe
                </button>
                <button
                    onClick={() => setVisualMode('neon')}
                    className={`px-4 py-2 rounded-lg font-orbitron text-xs transition-all duration-200 ${
                        visualMode === 'neon'
                            ? 'bg-gradient-to-r from-lime-400 to-green-500 text-black shadow-lg shadow-lime-400/50'
                            : 'glass-nav-block text-muted-foreground hover:text-primary'
                    }`}
                    title="Neon View"
                >
                    Neon
                </button>
            </div>

            <div className="fixed top-20 left-6 w-20 h-0.5 bg-gradient-to-r from-primary to-transparent" />
            <div className="fixed top-20 left-6 w-0.5 h-20 bg-gradient-to-b from-primary to-transparent" />
            <div className="fixed top-20 right-6 w-20 h-0.5 bg-gradient-to-l from-secondary to-transparent" />
            <div className="fixed top-20 right-6 w-0.5 h-20 bg-gradient-to-b from-secondary to-transparent" />
            <div className="fixed bottom-20 left-6 w-20 h-0.5 bg-gradient-to-r from-secondary to-transparent" />
            <div className="fixed bottom-20 left-6 w-0.5 h-20 bg-gradient-to-t from-secondary to-transparent" />
            <div className="fixed bottom-20 right-6 w-20 h-0.5 bg-gradient-to-l from-primary to-transparent" />
            <div className="fixed bottom-20 right-6 w-0.5 h-20 bg-gradient-to-t from-primary to-transparent" />
            {selectedBuilding && (
                <EventModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    building={selectedBuilding}
                />
            )}
        </div>
    );
};

export default Index;
