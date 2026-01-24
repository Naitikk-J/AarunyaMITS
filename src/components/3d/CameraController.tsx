import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { BUILDINGS } from './HolographicMap';
import gsap from 'gsap';
import * as THREE from 'three';

interface CameraControllerProps {
    selectedBuilding: string | null;
}

export function CameraController({ selectedBuilding }: CameraControllerProps) {
    const { camera, controls } = useThree() as any;
    const initialPosition = useRef(new THREE.Vector3(30, 25, 30));
    const initialTarget = useRef(new THREE.Vector3(0, 0, 0));

    useEffect(() => {
        if (selectedBuilding) {
            const building = BUILDINGS.find((b) => b.id === selectedBuilding);
            if (building && controls) {
                // Calculate world position based on the group rotation [0, Math.PI / 4, 0]
                const x = building.position[0];
                const z = building.position[1];
                const angle = Math.PI / 4;
                
                const worldX = x * Math.cos(angle) - z * Math.sin(angle);
                const worldZ = x * Math.sin(angle) + z * Math.cos(angle);
                const worldY = building.height / 2;

                const targetPos = new THREE.Vector3(worldX, worldY, worldZ);
                
                // Calculate camera offset for zoom
                const offset = new THREE.Vector3(15, 10, 15);
                const cameraPos = targetPos.clone().add(offset);

                // Animate controls target
                gsap.to(controls.target, {
                    x: targetPos.x,
                    y: targetPos.y,
                    z: targetPos.z,
                    duration: 1.5,
                    ease: 'power3.inOut',
                });

                // Animate camera position
                gsap.to(camera.position, {
                    x: cameraPos.x,
                    y: cameraPos.y,
                    z: cameraPos.z,
                    duration: 1.5,
                    ease: 'power3.inOut',
                });
            }
        } else if (controls) {
            // Reset to initial position
            gsap.to(controls.target, {
                x: initialTarget.current.x,
                y: initialTarget.current.y,
                z: initialTarget.current.z,
                duration: 1.5,
                ease: 'power3.inOut',
            });

            gsap.to(camera.position, {
                x: initialPosition.current.x,
                y: initialPosition.current.y,
                z: initialPosition.current.z,
                duration: 1.5,
                ease: 'power3.inOut',
            });
        }
    }, [selectedBuilding, camera, controls]);

    return null;
}
