import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

interface CharacterData {
    id: string;
    position: THREE.Vector3;
    targetPosition: THREE.Vector3;
    color: string;
    speed: number;
}

const CHARACTER_SPAWNS = [
    { position: [-5, 0.4, -20], color: '#FF85C0' },
    { position: [10, 0.4, -10], color: '#00A6FF' },
    { position: [-15, 0.4, 5], color: '#B0FF57' },
    { position: [8, 0.4, 15], color: '#FFDD33' },
    { position: [-10, 0.4, -5], color: '#FF5E1F' },
    { position: [-5, 0.4, -20], color: '#15d929' },
    { position: [10, 0.4, -10], color: '#00A6FF' },
    { position: [-15, 0.4, 5], color: '#B0FF57' },
    { position: [8, 0.4, 15], color: '#e2e607' },
    { position: [-10, 0.4, -5], color: '#FF5E1F' },
];

const WAYPOINTS = [
    new THREE.Vector3(0, 0, -15),
    new THREE.Vector3(10, 0, -5),
    new THREE.Vector3(15, 0, 5),
    new THREE.Vector3(5, 0, 15),
    new THREE.Vector3(-10, 0, 10),
    new THREE.Vector3(-15, 0, -5),
    new THREE.Vector3(-5, 0, -10),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(12, 0, -12),
    new THREE.Vector3(-12, 0, 12),
];

const Character = ({ data, isMobile = false }: { data: CharacterData; isMobile?: boolean }) => {
    const meshRef = useRef<THREE.Group>(null);
    const currentWaypoint = useRef(0);

    useFrame(() => {
        if (!meshRef.current) return;

        const direction = data.targetPosition.clone().sub(data.position);
        const distance = direction.length();

        if (distance < 0.5) {
            // Reached waypoint, pick next one
            currentWaypoint.current = (currentWaypoint.current + 1) % WAYPOINTS.length;
            data.targetPosition.copy(WAYPOINTS[currentWaypoint.current]);
        } else {
            // Move towards waypoint
            direction.normalize().multiplyScalar(data.speed);
            data.position.add(direction);

            // Rotate towards direction
            const angle = Math.atan2(direction.x, direction.z);
            meshRef.current.rotation.y = THREE.MathUtils.lerp(
                meshRef.current.rotation.y,
                angle,
                0.05
            );
        }

        // Update mesh position with floating animation
        const t = Date.now() * 0.001;
        meshRef.current.position.copy(data.position);
        meshRef.current.position.y = data.position.y + Math.sin(t * 3) * 0.08;
    });

    return (
        <group ref={meshRef} position={[data.position.x, data.position.y, data.position.z]}>
            {/* Body - Capsule shape */}
            <mesh position={[0, 0.4, 0]}>
                <capsuleGeometry args={[0.25, 0.8, 8, 7]} />
                <meshStandardMaterial
                    color={data.color}
                    emissive={data.color}
                    emissiveIntensity={0.3}
                    metalness={0.4}
                    roughness={0.4}
                />
            </mesh>

            {/* Head */}
            <mesh position={[0, 1.1, 0]}>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial
                    color="#FDB8D0"
                    emissive="#FF5E1F"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Glow effect */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.44, 55]} />
                <meshBasicMaterial
                    color={data.color}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Floating glow light */}
            <pointLight
                position={[0, 0.5, 0]}
                intensity={isMobile ? 0.6 : 1.2}
                distance={isMobile ? 2 : 4}
                color={data.color}
            />
        </group>
    );
};

export function WalkingCharacters() {
    const deviceCapability = useDeviceCapability();
    const characters = useMemo(() => {
        return CHARACTER_SPAWNS.map((spawn, idx) => ({
            id: `char-${idx}`,
            position: new THREE.Vector3(...spawn.position),
            targetPosition: WAYPOINTS[idx % WAYPOINTS.length].clone(),
            color: spawn.color,
            speed: 0.03 + Math.random() * 0.02,
        }));
    }, []);

    return (
        <group>
            {characters.map((char) => (
                <Character key={char.id} data={char} isMobile={deviceCapability.isMobile} />
            ))}
        </group>
    );
}
