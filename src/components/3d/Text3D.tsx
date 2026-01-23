import React, { useMemo, useRef } from 'react';
import { Text3D, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Text3DProps {
    text: string;
    position?: [number, number, number];
    scale?: number;
    color?: string;
    emissiveColor?: string;
    animate?: boolean;
    size?: number;
    height?: number;
}

export function Text3D({ 
    text, 
    position = [0, 0, 0], 
    scale = 1,
    color = '#00A6FF',
    emissiveColor = '#00A6FF',
    animate = true,
    size = 1,
    height = 0.2
}: Text3DProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current || !animate) return;
        
        const t = state.clock.getElapsedTime();
        groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
        groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
        groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.3;
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            <Center>
                <mesh>
                    <boxGeometry args={[text.length * size * 0.6, size, height]} />
                    <meshPhysicalMaterial
                        color={color}
                        emissive={emissiveColor}
                        emissiveIntensity={0.5}
                        metalness={0.8}
                        roughness={0.2}
                        wireframe={false}
                    />
                </mesh>
                {/* Glow effect */}
                <mesh position={[0, 0, -0.1]}>
                    <boxGeometry args={[text.length * size * 0.7, size * 1.1, height * 0.5]} />
                    <meshBasicMaterial
                        color={emissiveColor}
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            </Center>
        </group>
    );
}

// 2D version with CSS 3D effects for UI
export function Text3DUI({ text, className = '' }: { text: string; className?: string }) {
    return (
        <div className={`text-3d-extruded ${className}`}>
            {text}
        </div>
    );
}
