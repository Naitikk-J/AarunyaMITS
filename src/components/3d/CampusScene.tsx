import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import { HolographicMap, BUILDINGS } from './HolographicMap';
import { NeonParticles } from './NeonParticles';
import { WalkingCharacters } from './WalkingCharacters';
import { FloatingShapes } from './FloatingShapes';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import * as THREE from 'three';

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

function CameraController({ selectedBuilding, onZoomComplete }: { selectedBuilding?: string | null; onZoomComplete?: () => void }) {
    const controlsRef = useRef<any>(null);
    const camera = useThree((state) => state.camera);
    const [isZooming, setIsZooming] = useState(false);
    const centerPoint = new THREE.Vector3(0, 0.5, 0); // Center of the campus model
    const velocityRef = useRef(new THREE.Vector3(0, 0, 0)); // For momentum physics

    // Initialize camera and controls to look at center
    useEffect(() => {
        if (controlsRef.current) {
            controlsRef.current.target.copy(centerPoint);
            controlsRef.current.update();
            controlsRef.current.enableDamping = true;
            controlsRef.current.dampingFactor = 0.05;
            controlsRef.current.autoRotateSpeed = 0.3;
        }

        // Enhanced mouse wheel zoom with momentum
        const handleMouseWheel = (event: WheelEvent) => {
            if (!controlsRef.current) return;
            event.preventDefault();

            const zoomSpeed = 0.3;
            const direction = event.deltaY > 0 ? 1 : -1;

            controlsRef.current.object.position.multiplyScalar(
                1 + direction * zoomSpeed * 0.05
            );
        };

        window.addEventListener('wheel', handleMouseWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleMouseWheel);
    }, []);

    useFrame(() => {
        if (!controlsRef.current) return;
        // Ensure target stays at center point
        controlsRef.current.target.copy(centerPoint);
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

        const newTarget = new THREE.Vector3(rotatedX, 0.5 + building.height / 2, rotatedZ);

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
                // Return to center point after zoom completes
                controlsRef.current.target.copy(centerPoint);
                controlsRef.current.update();
                setIsZooming(false);
                onZoomComplete?.();
            }
        };

        animate();
    }, [selectedBuilding, camera, onZoomComplete, centerPoint]);

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
                target={[0, 0.5, 0]}
                autoRotate={!isZooming}
                autoRotateSpeed={0.3}
            />
        </>
    );
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
    const ambientRef1 = useRef<THREE.Light>(null);
    const ambientRef2 = useRef<THREE.Light | null>(null);
    const directionalRef = useRef<THREE.Light>(null);
    const point1Ref = useRef<THREE.Light | null>(null);
    const point2Ref = useRef<THREE.Light | null>(null);
    const point3Ref = useRef<THREE.Light | null>(null);
    const point4Ref = useRef<THREE.Light | null>(null);
    const groundShine1Ref = useRef<THREE.Light | null>(null);
    const groundShine2Ref = useRef<THREE.Light | null>(null);
    const groundShine3Ref = useRef<THREE.Light | null>(null);
    const groundShine4Ref = useRef<THREE.Light | null>(null);
    const starsRef = useRef<THREE.Points>(null);
    const deviceCapability = useDeviceCapability();

    // Animate lighting transition when day/night changes
    useEffect(() => {
        if (!ambientRef1.current) return;

        import('gsap').then(({ default: gsap }) => {
            const lights: Record<string, THREE.Light | null> = {
                ambient1: ambientRef1.current,
                ambient2: ambientRef2.current,
                directional: directionalRef.current,
                point1: point1Ref.current,
                point2: point2Ref.current,
                point3: point3Ref.current,
                point4: point4Ref.current,
                groundShine1: groundShine1Ref.current,
                groundShine2: groundShine2Ref.current,
                groundShine3: groundShine3Ref.current,
                groundShine4: groundShine4Ref.current,
            };

            if (isDayMode) {
                // Day mode - bright sunlight
                gsap.to(lights.ambient1, { intensity: 0.7, duration: 1 });
                if (lights.ambient2) gsap.to(lights.ambient2, { intensity: 0.5, duration: 1 });
                gsap.to(lights.directional, { intensity: 1.8, duration: 1 });
                if (lights.point1) gsap.to(lights.point1, { intensity: 0.4, duration: 1 });
                if (lights.point2) gsap.to(lights.point2, { intensity: 0.2, duration: 1 });
                if (lights.point3) gsap.to(lights.point3, { intensity: 0.2, duration: 1 });
                if (lights.point4) gsap.to(lights.point4, { intensity: 0.1, duration: 1 });
                if (lights.groundShine1) gsap.to(lights.groundShine1, { intensity: 1.2, duration: 1 });
                if (lights.groundShine2) gsap.to(lights.groundShine2, { intensity: 1.2, duration: 1 });
                if (lights.groundShine3) gsap.to(lights.groundShine3, { intensity: 1.2, duration: 1 });
                if (lights.groundShine4) gsap.to(lights.groundShine4, { intensity: 1.2, duration: 1 });
                if (starsRef.current) {
                    gsap.to(starsRef.current.material as any, { opacity: 0.2, duration: 1 });
                }
            } else {
                // Night mode - neon glow
                gsap.to(lights.ambient1, { intensity: 0.4, duration: 1 });
                if (lights.ambient2) gsap.to(lights.ambient2, { intensity: 0.2, duration: 1 });
                gsap.to(lights.directional, { intensity: 0.6, duration: 1 });
                if (lights.point1) gsap.to(lights.point1, { intensity: 1.4, duration: 1 });
                if (lights.point2) gsap.to(lights.point2, { intensity: 0.9, duration: 1 });
                if (lights.point3) gsap.to(lights.point3, { intensity: 0.9, duration: 1 });
                if (lights.point4) gsap.to(lights.point4, { intensity: 0.6, duration: 1 });
                if (lights.groundShine1) gsap.to(lights.groundShine1, { intensity: 1.6, duration: 1 });
                if (lights.groundShine2) gsap.to(lights.groundShine2, { intensity: 1.6, duration: 1 });
                if (lights.groundShine3) gsap.to(lights.groundShine3, { intensity: 1.6, duration: 1 });
                if (lights.groundShine4) gsap.to(lights.groundShine4, { intensity: 1.6, duration: 1 });
                if (starsRef.current) {
                    gsap.to(starsRef.current.material as any, { opacity: 0.8, duration: 1 });
                }
            }
        });
    }, [isDayMode]);

    return (
        <Canvas
            className="w-full h-full"
            gl={{
                antialias: deviceCapability.lodLevel === 'high',
                alpha: true,
                powerPreference: deviceCapability.hasGPU ? 'high-performance' : 'low-power',
                shadows: false,
                stencil: false,
                depth: true,
                toneMappingExposure: 1.2,
                precision: deviceCapability.isMobile ? 'lowp' : 'highp'
            }}
            dpr={deviceCapability.isMobile ? 1 : (deviceCapability.lodLevel === 'high' ? [1, 2] : 1)}
            frameloop={deviceCapability.isMobile ? 'always' : 'always'}
            performance={{ min: 0.6 }}
        >
            <Suspense fallback={null}>
                {/* Camera with Zoom Controller */}
                <CameraController selectedBuilding={selectedBuilding} onZoomComplete={onZoomComplete} />

                {/* Enhanced Kidcore Lighting Theme */}
                {/* Primary Ambient Light - Electric Blue */}
                <ambientLight
                    ref={ambientRef1}
                    intensity={isDayMode ? 0.7 : 0.5}
                    color="#00A6FF"
                />

                {!deviceCapability.isMobile && (
                    <ambientLight
                        ref={ambientRef2}
                        intensity={isDayMode ? 0.5 : 0.3}
                        color="#B0FF57"
                    />
                )}

                {/* Main Directional Light - Safety Orange */}
                <directionalLight
                    ref={directionalRef}
                    position={[40, 50, 30]}
                    intensity={isDayMode ? 1.8 : 0.6}
                    color={isDayMode ? "#FFEB3B" : "#e073d0"}
                />

                {/* Top Center Point Light - Bubblegum Pink */}
                {deviceCapability.lodLevel === 'high' && (
                    <pointLight
                        ref={point1Ref}
                        position={[0, 35, 0]}
                        intensity={isDayMode ? 0.4 : 1.4}
                        color="#FF85C0"
                        distance={100}
                    />
                )}

                {/* Back Left Point Light - Lime Green */}
                {deviceCapability.lodLevel === 'high' && (
                    <pointLight
                        ref={point2Ref}
                        position={[-40, 25, -40]}
                        intensity={isDayMode ? 0.2 : 0.9}
                        color="#B0FF57"
                        distance={80}
                    />
                )}

                {/* Front Right Point Light - Electric Blue */}
                {deviceCapability.lodLevel === 'high' && (
                    <pointLight
                        ref={point3Ref}
                        position={[40, 25, 40]}
                        intensity={isDayMode ? 0.2 : 0.9}
                        color="#00A6FF"
                        distance={80}
                    />
                )}

                {/* Additional accent light - Sun Yellow */}
                {deviceCapability.lodLevel === 'high' && (
                    <pointLight
                        ref={point4Ref}
                        position={[0, 20, -40]}
                        intensity={isDayMode ? 0.1 : 0.6}
                        color="#FFDD33"
                        distance={60}
                    />
                )}

                {/* Ground Shine Lights - Metallic reflection from all angles (Only on High LOD) */}
                {deviceCapability.lodLevel === 'high' && (
                    <>
                        {/* Front Right Ground Shine - White */}
                        <pointLight
                            ref={groundShine1Ref}
                            position={[30, 15, 30]}
                            intensity={isDayMode ? 1.2 : 1.6}
                            color="#FFFFFF"
                            distance={70}
                            decay={2}
                        />

                        {/* Front Left Ground Shine - White */}
                        <pointLight
                            ref={groundShine2Ref}
                            position={[-30, 15, 30]}
                            intensity={isDayMode ? 1.2 : 1.6}
                            color="#FFFFFF"
                            distance={70}
                            decay={2}
                        />

                        {/* Back Left Ground Shine - Cyan */}
                        <pointLight
                            ref={groundShine3Ref}
                            position={[-30, 15, -30]}
                            intensity={isDayMode ? 1.2 : 1.6}
                            color="#00FFFF"
                            distance={70}
                            decay={2}
                        />

                        {/* Back Right Ground Shine - Cyan */}
                        <pointLight
                            ref={groundShine4Ref}
                            position={[30, 15, -30]}
                            intensity={isDayMode ? 1.2 : 1.6}
                            color="#00FFFF"
                            distance={70}
                            decay={2}
                        />
                    </>
                )}

                {/* Stars background */}
                <Stars
                    ref={starsRef}
                    radius={150}
                    depth={80}
                    count={3000}
                    factor={4}
                    saturation={0.7}
                    fade
                    speed={0.5}
                />

                {/* Enhanced Dark background fog with Kidcore colors */}
                <fog attach="fog" args={[isDayMode ? '#87CEEB' : '#0A0E27', 50, 150]} />

                {/* Holographic Map */}
                <HolographicMap
                    onBuildingHover={onBuildingHover}
                    onBuildingClick={onBuildingClick}
                    isLoading={isLoading}
                    isDayMode={isDayMode}
                    visualMode={visualMode}
                />

                {/* Walking Characters - Show on all devices */}
                <WalkingCharacters />

                {/* Floating 3D Shapes - Only on high LOD */}
                {deviceCapability.lodLevel === 'high' && <FloatingShapes />}

                {/* Floating Particles */}
                <NeonParticles />
            </Suspense>
        </Canvas>
    );
}
