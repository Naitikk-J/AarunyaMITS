import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

interface ShapeData {
    id: string;
    position: [number, number, number];
    scale: number;
    color: string;
    type: 'cube' | 'sphere' | 'tetrahedron' | 'star';
    speed: number;
}

const SHAPES_DESKTOP: ShapeData[] = [
    // Cubes
    { id: 'cube-1', position: [-30, 40, -40], scale: 2, color: '#00A6FF', type: 'cube', speed: 0.3 },
    { id: 'cube-2', position: [50, 30, -60], scale: 1.5, color: '#FF85C0', type: 'cube', speed: 0.25 },
    { id: 'cube-3', position: [-50, 50, 20], scale: 1.8, color: '#B0FF57', type: 'cube', speed: 0.35 },

    // Spheres
    { id: 'sphere-1', position: [40, 60, 40], scale: 2.2, color: '#FFDD33', type: 'sphere', speed: 0.28 },
    { id: 'sphere-2', position: [-60, 45, 50], scale: 1.6, color: '#FF5E1F', type: 'sphere', speed: 0.32 },

    // Tetrahedrons
    { id: 'tetra-1', position: [60, 55, -30], scale: 1.9, color: '#00A6FF', type: 'tetrahedron', speed: 0.33 },
    { id: 'tetra-2', position: [-40, 35, -50], scale: 1.4, color: '#FF85C0', type: 'tetrahedron', speed: 0.27 },

    // Stars (represented as octahedrons)
    { id: 'star-1', position: [30, 70, 30], scale: 2.3, color: '#B0FF57', type: 'star', speed: 0.36 },
    { id: 'star-2', position: [-70, 40, -20], scale: 1.7, color: '#FFDD33', type: 'star', speed: 0.29 },
];

const SHAPES_MOBILE: ShapeData[] = [
    { id: 'cube-1', position: [-30, 40, -40], scale: 2, color: '#00A6FF', type: 'cube', speed: 0.3 },
    { id: 'sphere-1', position: [40, 60, 40], scale: 2.2, color: '#FFDD33', type: 'sphere', speed: 0.28 },
    { id: 'star-1', position: [30, 70, 30], scale: 2.3, color: '#B0FF57', type: 'star', speed: 0.36 },
];

const Shape = ({ data }: { data: ShapeData }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const rotationSpeed = useRef([
        Math.random() * 0.01,
        Math.random() * 0.01,
        Math.random() * 0.01
    ]);

    const geometry = useMemo(() => {
        switch (data.type) {
            case 'cube':
                return new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
            case 'sphere':
                return new THREE.IcosahedronGeometry(1, 4);
            case 'tetrahedron':
                return new THREE.TetrahedronGeometry(1, 3);
            case 'star':
                return new THREE.OctahedronGeometry(1, 2);
            default:
                return new THREE.BoxGeometry(1, 1, 1);
        }
    }, [data.type]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const t = state.clock.getElapsedTime();

        // Floating animation
        meshRef.current.position.y = data.position[1] + Math.sin(t * data.speed) * 5;

        // Rotation
        meshRef.current.rotation.x += rotationSpeed.current[0];
        meshRef.current.rotation.y += rotationSpeed.current[1];
        meshRef.current.rotation.z += rotationSpeed.current[2];

        // Pulsing scale
        const pulse = 1 + Math.sin(t * data.speed * 0.5) * 0.15;
        meshRef.current.scale.set(
            data.scale * pulse,
            data.scale * pulse,
            data.scale * pulse
        );
    });

    return (
        <mesh
            ref={meshRef}
            geometry={geometry}
            position={[data.position[0], data.position[1], data.position[2]]}
            scale={data.scale}
        >
            <meshPhysicalMaterial
                color={data.color}
                emissive={data.color}
                emissiveIntensity={0.3}
                metalness={0.6}
                roughness={0.3}
                transparent
                opacity={0.6}
                wireframe={Math.random() > 0.7}
            />
            
            {/* Glow edges */}
            <edgesGeometry args={[geometry]} />
            <lineBasicMaterial
                color={data.color}
                transparent
                opacity={0.5}
                linewidth={2}
            />
        </mesh>
    );
};

export function FloatingShapes() {
    const deviceCapability = useDeviceCapability();
    const shapes = deviceCapability.isMobile ? SHAPES_MOBILE : SHAPES_DESKTOP;

    return (
        <group>
            {shapes.map((shape) => (
                <Shape key={shape.id} data={shape} />
            ))}
        </group>
    );
}
