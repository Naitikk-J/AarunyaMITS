import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import { HolographicMap, BUILDINGS } from './HolographicMap';
import { NeonParticles } from './NeonParticles';
import * as THREE from 'three';

interface CampusSceneProps {
    onBuildingHover: (building: string | null) => void;
    onBuildingClick: (building: string) => void;
    isLoading?: boolean;
    selectedBuilding?: string | null;
    onZoomComplete?: () => void;
}

function CameraController({ selectedBuilding, onZoomComplete }: { selectedBuilding?: string | null; onZoomComplete?: () => void }) {
    const controlsRef = useRef<any>(null);
    const camera = useThree((state) => state.camera);
    const [isZooming, setIsZooming] = useState(false);
    const initialPositionRef = useRef({ pos: new THREE.Vector3(35, 45, 35), target: new THREE.Vector3(0, 0, 0) });

    useFrame(() => {
        if (!controlsRef.current) return;
        controlsRef.current.update();
    });

    useEffect(() => {
        if (!selectedBuilding || !controlsRef.current) return;

        // Find building data
        const building = BUILDINGS.find(b => b.id === selectedBuilding);
        if (!building) return;

        setIsZooming(true);

        // Convert building position to world coordinates (accounting for 45 degree rotation)
        const angle = Math.PI / 4;
        const rotatedX = building.position[0] * Math.cos(angle) - building.position[1] * Math.sin(angle);
        const rotatedZ = building.position[0] * Math.sin(angle) + building.position[1] * Math.cos(angle);

        // Target position: looking at the building from above
        const zoomDistance = 15;
        const zoomHeight = 8;

        const newCameraPos = new THREE.Vector3(
            rotatedX + zoomDistance * 0.7,
            zoomHeight,
            rotatedZ + zoomDistance * 0.7
        );

        const newTarget = new THREE.Vector3(rotatedX, building.height / 2, rotatedZ);

        // Animate camera over time
        const startPos = new THREE.Vector3().copy(camera.position);
        const startTarget = new THREE.Vector3().copy(controlsRef.current.target);
        const duration = 1.5; // seconds
        const startTime = Date.now();

        const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            camera.position.lerpVectors(startPos, newCameraPos, easeProgress);
            controlsRef.current.target.lerpVectors(startTarget, newTarget, easeProgress);
            controlsRef.current.update();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setIsZooming(false);
                onZoomComplete?.();
            }
        };

        animate();
    }, [selectedBuilding, camera, onZoomComplete]);

    return (
        <>
            <PerspectiveCamera makeDefault position={[35, 45, 35]} fov={50} />
            <OrbitControls
                ref={controlsRef}
                enablePan={true}
                enableZoom={true}
                enableRotate={!isZooming}
                minDistance={5}
                maxDistance={100}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.5}
                target={[0, 0, 0]}
                autoRotate={!isZooming}
                autoRotateSpeed={0.3}
            />
        </>
    );
}

export function CampusScene({ onBuildingHover, onBuildingClick, isLoading = false, selectedBuilding, onZoomComplete }: CampusSceneProps) {
    return (
        <Canvas
            className="w-full h-full"
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                shadows: false,
                stencil: false,
                depth: true,
                toneMappingExposure: 1.2
            }}
            dpr={[1, 2]}
        >
            <Suspense fallback={null}>
                {/* Camera with Zoom Controller */}
                <CameraController selectedBuilding={selectedBuilding} onZoomComplete={onZoomComplete} />

                {/* Enhanced Kidcore Lighting Theme */}
                {/* Primary Ambient Light - Electric Blue */}
                <ambientLight intensity={0.5} color="#00A6FF" />

                {/* Secondary Ambient Light - Lime Green for depth */}
                <ambientLight intensity={0.3} color="#B0FF57" />

                {/* Main Directional Light - Safety Orange */}
                <directionalLight
                    position={[40, 50, 30]}
                    intensity={1.2}
                    color="#FF5E1F"
                />

                {/* Top Center Point Light - Bubblegum Pink */}
                <pointLight
                    position={[0, 35, 0]}
                    intensity={1.4}
                    color="#FF85C0"
                    distance={100}
                />

                {/* Back Left Point Light - Lime Green */}
                <pointLight
                    position={[-40, 25, -40]}
                    intensity={0.9}
                    color="#B0FF57"
                    distance={80}
                />

                {/* Front Right Point Light - Electric Blue */}
                <pointLight
                    position={[40, 25, 40]}
                    intensity={0.9}
                    color="#00A6FF"
                    distance={80}
                />

                {/* Additional accent light - Sun Yellow */}
                <pointLight
                    position={[0, 20, -40]}
                    intensity={0.6}
                    color="#FFDD33"
                    distance={60}
                />

                {/* Stars background */}
                <Stars radius={150} depth={80} count={3000} factor={4} saturation={0.7} fade speed={0.5} />

                {/* Enhanced Dark background fog with Kidcore colors */}
                <fog attach="fog" args={['#0A0E27', 50, 150]} />

                {/* Holographic Map */}
                <HolographicMap
                    onBuildingHover={onBuildingHover}
                    onBuildingClick={onBuildingClick}
                    isLoading={isLoading}
                />

                {/* Floating Particles */}
                <NeonParticles />
            </Suspense>
        </Canvas>
    );
}
