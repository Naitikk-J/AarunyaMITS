import { useRef, useEffect, useState } from 'react';
import { MapboxMap } from './MapboxMap';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

interface CampusSceneProps {
    onBuildingHover: (building: string | null) => void;
    onBuildingClick: (building: string) => void;
    isLoading?: boolean;
    selectedBuilding?: string | null;
    onZoomComplete?: () => void;
    isDayMode?: boolean;
    onDayNightToggle?: (isDayMode: boolean) => void;
    visualMode?: 'normal' | 'wireframe' | 'neon';
}

export function CampusScene({
    onBuildingHover,
    onBuildingClick,
    isLoading = false,
    selectedBuilding,
    onZoomComplete,
    isDayMode = false,
    onDayNightToggle,
    visualMode = 'normal'
}: CampusSceneProps) {
    const deviceCapability = useDeviceCapability();

    return (
        <div className="w-full h-full relative">
            <MapboxMap
                onBuildingHover={onBuildingHover}
                onBuildingClick={onBuildingClick}
                isDayMode={isDayMode}
            />
        </div>
    );
}
