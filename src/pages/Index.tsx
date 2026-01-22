import { useState, useCallback, useEffect } from 'react';
import { CampusScene } from '@/components/3d/CampusScene';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { ControlsGuide } from '@/components/ui/ControlsGuide';
import { BottomActions } from '@/components/ui/BottomActions';
import { BuildingInfo } from '@/components/ui/BuildingInfo';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { EventModal } from '@/components/ui/EventModal';

const Index = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
    const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [webglSupported, setWebglSupported] = useState(true);

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
            <MainNavigation />
            <ControlsGuide />
            {!isLoading && <BuildingInfo buildingId={hoveredBuilding} />}
            <div className="absolute inset-0">
                {webglSupported ? (
                    <CampusScene
                        onBuildingHover={handleBuildingHover}
                        onBuildingClick={handleBuildingClick}
                        isLoading={isLoading}
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
