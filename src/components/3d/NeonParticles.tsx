import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

export function NeonParticles() {
    const particlesRef = useRef<THREE.Points>(null);
    const particlesRef2 = useRef<THREE.Points>(null);
    const deviceCapability = useDeviceCapability();

    const [positions, colors] = useMemo(() => {
        const count = deviceCapability.isMobile ? 8 : 15; // Reduce for mobile
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorPalette = [
            new THREE.Color('#00A6FF'), // Electric Blue
            new THREE.Color('#FF5E1F'), // Safety Orange
            new THREE.Color('#FF85C0'), // Bubblegum Pink
            new THREE.Color('#B0FF57'), // Lime Green
            new THREE.Color('#FFDD33'), // Sunflower Yellow
        ];

        for (let i = 0; i < count; i++) {
            // Random position in a larger dome above the grid for more coverage
            const radius = 25 + Math.random() * 45;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI * 0.6;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.cos(phi) + 8;
            positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

            // Random color from palette with bias towards blue and pink
            const colorChoice = Math.random();
            const color = colorChoice < 0.3 ? colorPalette[0] : // More blue
                colorChoice < 0.6 ? colorPalette[2] : // More pink
                    colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        return [positions, colors];
    }, []);

    // Create a second set of particles for layered effect
    const [positions2, colors2] = useMemo(() => {
        const count = deviceCapability.isMobile ? 30 : 75; // Reduce for mobile
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorPalette = [
            new THREE.Color('#00A6FF'),
            new THREE.Color('#B0FF57'),
            new THREE.Color('#FF5E1F'),
        ];

        for (let i = 0; i < count; i++) {
            const radius = 15 + Math.random() * 35;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI * 0.7;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.cos(phi) + 5;
            positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        return [positions, colors];
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            const time = state.clock.getElapsedTime();

            // Slowly rotate the entire particle system - counterclockwise
            particlesRef.current.rotation.y = time * 0.01;
            particlesRef.current.rotation.z = time * 0.005;

            // Update positions for floating effect with wave motion
            const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
            const originalPositions = new Float32Array(positions);

            for (let i = 0; i < positions.length / 3; i++) {
                // Create more dynamic floating motion
                positions[i * 3] = originalPositions[i * 3] + Math.sin(time + i * 0.1) * 0.5;
                positions[i * 3 + 1] = originalPositions[i * 3 + 1] + Math.sin(time * 0.7 + i) * 0.8;
                positions[i * 3 + 2] = originalPositions[i * 3 + 2] + Math.cos(time + i * 0.15) * 0.5;
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        if (particlesRef2.current) {
            const time = state.clock.getElapsedTime();

            // Rotate in opposite direction for visual interest
            particlesRef2.current.rotation.y = -time * 0.015;
            particlesRef2.current.rotation.x = time * 0.003;

            // Update positions with different wave pattern
            const positions = particlesRef2.current.geometry.attributes.position.array as Float32Array;
            const originalPositions = new Float32Array(positions);

            for (let i = 0; i < positions.length / 3; i++) {
                positions[i * 3] = originalPositions[i * 3] + Math.cos(time * 0.8 + i * 0.1) * 0.4;
                positions[i * 3 + 1] = originalPositions[i * 3 + 1] + Math.cos(time * 0.6 + i) * 0.6;
                positions[i * 3 + 2] = originalPositions[i * 3 + 2] + Math.sin(time * 0.9 + i * 0.15) * 0.4;
            }
            particlesRef2.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <group>
            {/* Primary particle layer - larger, more visible */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={colors.length / 3}
                        array={colors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.5}
                    transparent
                    opacity={0.9}
                    vertexColors
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    fog={false}
                />
            </points>

            {/* Secondary particle layer - adds depth and visual richness */}
            <points ref={particlesRef2}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions2.length / 3}
                        array={positions2}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={colors2.length / 3}
                        array={colors2}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.8}
                    transparent
                    opacity={0.6}
                    vertexColors
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    fog={false}
                />
            </points>
        </group>
    );
}
