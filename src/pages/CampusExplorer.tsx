import React, { useState, useCallback, useEffect, Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Preload, Stars, Environment, ContactShadows, Html, Text, Instance, Instances, useGLTF } from '@react-three/drei';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';
import statueModel from '@/components/models/statue.glb?url';

// Theme constants
const THEME = {
    primary: '#BC13FE',
    secondary: '#00FFFF',
    building: '#F0F0F0',
    roof: '#333333',
    grass: '#2D5A27',
    road: '#1A1A1A',
    ground: '#050505',
    windowColor: '#FFDD33'
};


const BUILDINGS = [
    { id: 'main-gate', name: 'MITS Main Gate', hindiName: 'मुख्य द्वार', position: [5, -27], size: [4, 1], height: 6, type: 'gate', icon: '🎓' },
    { id: 'old-building', name: 'CSE & IT Department', hindiName: 'सिविल विभाग', position: [-4, -10], size: [16, 3.5], height: 4, type: 'complex' },
    { id: 'old-building-2', name: 'CSE Annex 1', hindiName: 'सिविल विभाग', position: [1, -12.5], size: [6, 3.5], height: 2, type: 'complex' },
    { id: 'old-building-3', name: 'CSE Annex 2', hindiName: 'सिविल विभाग', position: [-9, -12.5], size: [6, 3.5], height: 2, type: 'complex' },
    { id: 'canteen', name: 'Canteen', hindiName: 'कैंटीन', position: [-18, -17], size: [2, 2], height: 2, type: 'simple', icon: '🍽️' },
    
    // Unique AI Department (Only one)
    { id: 'ai-department', name: 'AI department', hindiName: 'एआई विभाग', position: [-1, 2], size: [9, 5], height: 8, type: 'simple', icon: '🤖' },
    
    // HOSTELS (Distinct IDs, distinct positions)
    { id: 'girls-hostel', name: 'Girls Hostel', hindiName: 'छात्रावास', position: [22, 29], size: [8, 8], height: 7, type: 'hostel', icon: '🛏️', color: '#e0c0e0' },
    { id: 'boys-hostel', name: 'Boys Hostel', hindiName: 'छात्रालय', position: [-15, 40], size: [8, 10], height: 7, type: 'hostel', icon: '🛏️', color: '#c0d0e0' },
    
    // POWER STATION (New 'power-towers' type - smaller footprint, tall towers)
    { id: 'power-house', name: 'Power Station', hindiName: 'विद्युत घर', position: [-18, 25], size: [6, 8], height: 0.5, type: 'power-towers', icon: '⚡' },
    
    { id: 'library', name: 'Central Library', hindiName: 'पुस्तकालय', position: [-14, -12], size: [4, 3], height: 3, type: 'complex', icon: '📚' },
    { id: 'stage-ground', name: 'stage ground', hindiName: 'स्टेज ग्राउंड', position: [-5, -22], size: [15, 6], height: 0.1, type: 'landmark', color: '#2D5A27' },
    { id: 'parking', name: 'parking', hindiName: 'पार्किंग', position: [-19, -5], size: [3, 20], height: 0.1, type: 'landmark', color: '#2D5A27' },
    { id: 'ai-ground', name: 'AI ground', hindiName: 'एआई ग्राउंड', position: [-1, -4], size: [9, 7], height: 0.1, type: 'landmark', color: '#3A6B35' },
    { id: 'statue-ground', name: 'statue ground', hindiName: 'स्टैच्यू ग्राउंड', position: [15, -18.5], size: [10, 10], height: 0.1, type: 'landmark', color: '#2D5A27' },
    { id: 'gymnasium', name: 'gymnasium', hindiName: 'जिम', position: [11, 3.5], size: [8, 8], height: 0.1, type: 'landmark', color: '#2D5A27' },
    { id: 'football-ground', name: 'football ground', hindiName: 'फुटबॉल ग्राउंड', position: [0, 19], size: [30, 15], height: 0.1, type: 'landmark', color: '#1B4D17' },
    
    { id: 'biotech', name: 'Biotech Dept', hindiName: 'जैव प्रौद्योगिकी', position: [15, -11], size: [5, 5], height: 3.5, type: 'simple' },
    { id: 'dispensary', name: 'Dispensary', hindiName: 'औषधालय', position: [11, -3.5], size: [4, 4], height: 2, type: 'simple', icon: 'H' },
    { id: 'admission', name: 'Admission Sector', hindiName: 'प्रवेश', position: [18, 0], size: [4, 12], height: 2, type: 'simple', icon: 'H' },
    { id: 'amul', name: 'Amul Parlor', hindiName: 'अमूल', position: [7, -0.5], size: [2, 2], height: 1, type: 'simple', icon: 'H' },
    { id: 'architecture', name: 'Architecture Dept', hindiName: 'वास्तुकला', position: [-9.5, -6.5], size: [5, 5], height: 4, type: 'complex' },
    { id: 'mechanical-dept', name: 'Mechanical Dept', hindiName: 'मैकेनिकल विभाग', position: [2, -7.25], size: [4, 4], height: 4, type: 'complex' },
    { id: 'statue-base', name: 'statue base', hindiName: 'स्टैच्यू आधार', position: [15, -18.5], size: [2, 2], height: 1, type: 'simple', color: '#A9A9A9' },
    { id: 'mits-main', name: 'Mechanical Workshop', hindiName: 'मैकेनिकल वर्कशॉप', position: [-3, 15], size: [7, 4], height: 3, type: 'complex', icon: '⚙️' },
    { id: 'diamond-gate', name: 'Diamond Jubilee Gate', hindiName: 'डायमंड गेट', position: [-24, 9], size: [4, 1], height: 6, type: 'gate', rotationY: Math.PI / 2 },
];


const ROADS = [
    // Original Grid
    { start: [-22, -26], end: [23, -26], width: 2 },  // Bottom horizontal
    { start: [5, -27], end: [5, 11], width: 2 },      // Main vertical spine
    
    // Extended Right Side (To Girls Hostel & Admission)
    { start: [22, -25], end: [22, 25], width: 2 },    // Right vertical extended up
    //{ start: [7, 11], end: [22, 11], width: 2 },      // Connector to right vertical
    
    // Extended Left Side (To Power Station, Diamond Gate, Boys Hostel)
    { start: [-23, -27], end: [-23, 33.75], width: 2 },  // Left vertical spine
    { start: [-23, 10], end: [23, 10], width: 2 },     // Middle horizontal connector
    
    // Service Roads
    //{ start: [-20, 20], end: [-20, 20], width: 1.5 }, // Power Station Service Road (Direct connection)
    { start: [-23, 33], end: [-15, 33], width: 1.5 }, // Boys Hostel Road
    //{ start: [22, 22], end: [26, 22], width: 1.5 },   // Girls Hostel Road
];


const generateTextures = () => {
    const windowCanvas = document.createElement('canvas');
    windowCanvas.width = 128; windowCanvas.height = 128;
    const wctx = windowCanvas.getContext('2d')!;
    wctx.fillStyle = '#FFFFFF'; wctx.fillRect(0, 0, 128, 128);
    wctx.fillStyle = '#222222';
    for (let x = 10; x < 120; x += 25) for (let y = 10; y < 120; y += 25) wctx.fillRect(x, y, 15, 15);
    const windowTexture = new THREE.CanvasTexture(windowCanvas);
    windowTexture.wrapS = windowTexture.wrapT = THREE.RepeatWrapping;
    windowTexture.repeat.set(2, 2);

    const roadCanvas = document.createElement('canvas');
    roadCanvas.width = 256; roadCanvas.height = 256;
    const rctx = roadCanvas.getContext('2d')!;
    rctx.fillStyle = '#1A1A1A'; rctx.fillRect(0, 0, 256, 256);
    rctx.strokeStyle = '#555555'; rctx.setLineDash([10, 10]); rctx.lineWidth = 4;
    rctx.beginPath(); rctx.moveTo(128, 0); rctx.lineTo(128, 256); rctx.stroke();
    const roadTexture = new THREE.CanvasTexture(roadCanvas);
    roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;

    return { window: windowTexture, road: roadTexture };
};



const Fence = ({ size }: { size: [number, number] }) => {
    const width = size[0];
    const depth = size[1];
    const halfW = width / 2;
    const halfD = depth / 2;
    
    // Fence Settings
    const postHeight = 0.8;
    const postInterval = 2.5; // Distance between posts
    const fenceColor = '#555555';
    const railColor = '#888888';

    // Calculate number of posts per side
    const postsX = Math.ceil(width / postInterval);
    const postsZ = Math.ceil(depth / postInterval);

    // Generate Post Positions
    const posts = useMemo(() => {
        const positions = [];
        
        // Top & Bottom Sides (Along X axis)
        for (let i = 0; i <= postsX; i++) {
            const x = -halfW + (i * (width / postsX));
            positions.push([x, 0, -halfD]); // Top
            positions.push([x, 0, halfD]);  // Bottom
        }

        // Left & Right Sides (Along Z axis) - skipping corners to avoid duplicates
        for (let i = 1; i < postsZ; i++) {
            const z = -halfD + (i * (depth / postsZ));
            positions.push([-halfW, 0, z]); // Left
            positions.push([halfW, 0, z]);  // Right
        }
        return positions;
    }, [width, depth, halfW, halfD, postsX, postsZ]);

    return (
        <group position={[0, 0.05, 0]}> 
            {/* 1. Fence Posts */}
            {posts.map((pos, i) => (
                <mesh key={i} position={[pos[0], postHeight / 2, pos[2]]} castShadow>
                    <boxGeometry args={[0.15, postHeight, 0.15]} />
                    <meshStandardMaterial color={fenceColor} roughness={0.7} />
                </mesh>
            ))}

            {/* 2. Top Rails (4 Sides) */}
            <group position={[0, postHeight - 0.1, 0]}>
                {/* Top Side */}
                <mesh position={[0, 0, -halfD]}>
                    <boxGeometry args={[width, 0.05, 0.05]} />
                    <meshStandardMaterial color={railColor} />
                </mesh>
                {/* Bottom Side */}
                <mesh position={[0, 0, halfD]}>
                    <boxGeometry args={[width, 0.05, 0.05]} />
                    <meshStandardMaterial color={railColor} />
                </mesh>
                {/* Left Side */}
                <mesh position={[-halfW, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[depth, 0.05, 0.05]} />
                    <meshStandardMaterial color={railColor} />
                </mesh>
                {/* Right Side */}
                <mesh position={[halfW, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[depth, 0.05, 0.05]} />
                    <meshStandardMaterial color={railColor} />
                </mesh>
            </group>

             {/* 3. Middle Rails (4 Sides) */}
             <group position={[0, postHeight / 2, 0]}>
                <mesh position={[0, 0, -halfD]}><boxGeometry args={[width, 0.05, 0.05]} /><meshStandardMaterial color={railColor} /></mesh>
                <mesh position={[0, 0, halfD]}><boxGeometry args={[width, 0.05, 0.05]} /><meshStandardMaterial color={railColor} /></mesh>
                <mesh position={[-halfW, 0, 0]} rotation={[0, Math.PI / 2, 0]}><boxGeometry args={[depth, 0.05, 0.05]} /><meshStandardMaterial color={railColor} /></mesh>
                <mesh position={[halfW, 0, 0]} rotation={[0, Math.PI / 2, 0]}><boxGeometry args={[depth, 0.05, 0.05]} /><meshStandardMaterial color={railColor} /></mesh>
            </group>
        </group>
    );
};

const Building = ({ data, textures, showLabels }: any) => {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    const geometry = useMemo(() => {
        // HOSTEL LOGIC: U-Shape for hostels
        if (data.type === 'hostel') {
            const shape = new THREE.Shape();
            const w = data.size[0] / 2;
            const h = data.size[1] / 2;
            const wingThickness = 2.5;
            shape.moveTo(-w, -h); shape.lineTo(w, -h); shape.lineTo(w, h);
            shape.lineTo(w - wingThickness, h); shape.lineTo(w - wingThickness, -h + wingThickness);
            shape.lineTo(-w + wingThickness, -h + wingThickness); shape.lineTo(-w + wingThickness, h);
            shape.lineTo(-w, h); shape.lineTo(-w, -h);
            return new THREE.ExtrudeGeometry(shape, { depth: data.height, bevelEnabled: true, bevelThickness: 0.1 });
        }

        // COMPLEX LOGIC: Hollow center
        if (data.type === 'complex') {
            const shape = new THREE.Shape();
            const [w, h] = [data.size[0] / 2, data.size[1] / 2];
            shape.moveTo(-w, -h); shape.lineTo(w, -h); shape.lineTo(w, h); shape.lineTo(-w, h);
            const hole = new THREE.Path();
            const p = 1.2; hole.moveTo(-w + p, -h + p); hole.lineTo(w - p, -h + p); hole.lineTo(w - p, h - p); hole.lineTo(-w + p, h - p);
            shape.holes.push(hole);
            return new THREE.ExtrudeGeometry(shape, { depth: data.height, bevelEnabled: true, bevelThickness: 0.05 });
        }

        // POWER TOWERS LOGIC
        if (data.type === 'power-towers') return new THREE.BoxGeometry(data.size[0], 0.5, data.size[1]);

        // GATE LOGIC
        if (data.type === 'gate') {
            const shape = new THREE.Shape();
            const width = data.size[0] / 2;
            const height = data.height / 2;
            const thickness = 0.8;
            shape.moveTo(-width, -height);
            shape.lineTo(-width + thickness, -height); shape.lineTo(-width + thickness, height - 1);
            shape.lineTo(width - thickness, height - 1); shape.lineTo(width - thickness, -height);
            shape.lineTo(width, -height); shape.lineTo(width, height); shape.lineTo(-width, height);
            const geo = new THREE.ExtrudeGeometry(shape, { depth: data.size[1], bevelEnabled: true, bevelThickness: 0.05 });
            geo.center();
            return geo;
        }

        return new THREE.BoxGeometry(data.size[0], data.height, data.size[1]);
    }, [data]);

    return (
        <group position={[data.position[0], 0, data.position[1]]}>
            <mesh
                ref={mesh}
                geometry={geometry}
                rotation={[
                    (data.type === 'complex' || data.type === 'hostel') ? -Math.PI / 2 : 0, 
                    data.rotationY || 0, 
                    0
                ]}
                position={[0, (data.type === 'complex' || data.type === 'gate' || data.type === 'hostel') ? 0 : data.height / 2, 0]}
                onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
                onPointerOut={() => setHover(false)}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    map={data.type === 'power-towers' || data.type === 'landmark' ? undefined : textures.window}
                    color={data.color || THEME.building}
                    roughness={data.type === 'power-towers' ? 0.9 : 0.4}
                    metalness={data.type === 'power-towers' ? 0.2 : 0.1}
                    emissive={hovered ? THEME.primary : '#000000'}
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* --- NEW: RENDER FENCE IF IT IS A GROUND (Landmark) --- */}
            {data.type === 'landmark' && (
                <Fence size={data.size} />
            )}

            {/* Roof for Hollow Buildings */}
            {(data.type === 'complex' || data.type === 'hostel') && (
                <mesh position={[0, data.height, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[data.size[0], data.size[1]]} />
                    <meshStandardMaterial color={THEME.roof} roughness={0.9} />
                </mesh>
            )}

            {/* POWER STATION TOWERS */}
            {data.type === 'power-towers' && (
                <group>
                    {[ -2, 2 ].map((offset, i) => (
                        <group key={i} position={[offset, 0, 0]}>
                            <mesh position={[0, 4, 0]}><cylinderGeometry args={[0.1, 0.8, 8, 4]} /><meshStandardMaterial color="#333" roughness={0.5} /></mesh>
                            <mesh position={[0, 6, 0]}><boxGeometry args={[3, 0.2, 0.2]} /><meshStandardMaterial color="#333" /></mesh>
                            {i===0 && <mesh position={[0, 7, 0]}><boxGeometry args={[2, 0.2, 0.2]} /><meshStandardMaterial color="#333" /></mesh>}
                        </group>
                    ))}
                    <mesh position={[0, 1, 2]} castShadow><boxGeometry args={[2, 2, 2]} /><meshStandardMaterial color="#444" roughness={0.3} metalness={0.6} /></mesh>
                    <pointLight position={[0, 8, 0]} color="#ff0000" intensity={2} distance={8} />
                </group>
            )}

            {/* Labels */}
            {showLabels && data.id !== 'statue-ground' && data.id !== 'statue-base' && (
                <Html position={[0, data.type === 'power-towers' ? 8 : data.height + 2.5, 0]} center distanceFactor={15}>
                    <div className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-[10px] text-white whitespace-nowrap font-orbitron shadow-xl pointer-events-none">
                        <span className="text-primary mr-1">●</span> {data.name}
                    </div>
                </Html>
            )}
        </group>
    );
};


const SmartFoliage = () => {
    const trunkGeo = useMemo(() => new THREE.CylinderGeometry(0.1, 0.15, 0.8), []);
    const leafGeo = useMemo(() => new THREE.SphereGeometry(0.6, 7, 7), []);
    const trunkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#402905' }), []);
    const leafMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1B4D17', roughness: 0.9 }), []);

    const treeData = useMemo(() => {
        const trees = [];
        const buildingBuffer = 2;
        const roadBuffer = 1.8;
        const campusHalfSize = 58;

        for (let x = -60; x <= 60; x += 3.5) {
            for (let z = -60; z <= 60; z += 3.5) {
                if (Math.abs(x) > campusHalfSize || Math.abs(z) > campusHalfSize) {
                    continue;
                }
                let collision = false;
                for (const b of BUILDINGS) {
                    const halfW = (b.size[0] / 2) + buildingBuffer;
                    const halfD = (b.size[1] / 2) + buildingBuffer;
                    if (x > b.position[0] - halfW && x < b.position[0] + halfW && z > b.position[1] - halfD && z < b.position[1] + halfD) {
                        collision = true;
                        break;
                    }
                }
                if (collision) continue;
                for (const r of ROADS) {
                    const minX = Math.min(r.start[0], r.end[0]) - (r.width / 2 + roadBuffer);
                    const maxX = Math.max(r.start[0], r.end[0]) + (r.width / 2 + roadBuffer);
                    const minZ = Math.min(r.start[1], r.end[1]) - (r.width / 2 + roadBuffer);
                    const maxZ = Math.max(r.start[1], r.end[1]) + (r.width / 2 + roadBuffer);
                    if (x >= minX && x <= maxX && z >= minZ && z <= maxZ) {
                        collision = true;
                        break;
                    }
                }
                if (collision) continue;
                if (Math.abs(x) < 3 && Math.abs(z + 20) < 3) continue;
                if (Math.abs(x + 24) < 3 && Math.abs(z - 6) < 3) continue;

                const offsetX = (Math.random() - 0.5) * 1.5;
                const offsetZ = (Math.random() - 0.5) * 1.5;
                const scale = 0.8 + Math.random() * 0.6;

                trees.push({
                    position: [x + offsetX, 0, z + offsetZ],
                    scale: [scale, scale, scale]
                });
            }
        }
        return trees;
    }, []);

    return (
        <group>
            <Instances geometry={trunkGeo} material={trunkMat}>
                {treeData.map((t, i) => (
                    <Instance key={`trunk-${i}`} position={[t.position[0], 0.4 * t.scale[1], t.position[2]]} scale={t.scale as any} />
                ))}
            </Instances>
            <Instances geometry={leafGeo} material={leafMat}>
                {treeData.map((t, i) => (
                    <Instance key={`leaf-${i}`} position={[t.position[0], 1.2 * t.scale[1], t.position[2]]} scale={[t.scale[0], t.scale[1] * 1.2, t.scale[2]] as any} />
                ))}
            </Instances>
        </group>
    );
};

const SingleHugeTree = ({ position, height }: { position: [number, number, number], height: number }) => {
    const trunkHeight = height * 0.35;
    const trunkRadiusTop = height * 0.08;
    const trunkRadiusBottom = height * 0.12;
    const foliageRadius = height * 0.4;

    const trunkGeo = useMemo(() => new THREE.CylinderGeometry(trunkRadiusTop, trunkRadiusBottom, trunkHeight, 12), [trunkHeight, trunkRadiusTop, trunkRadiusBottom]);
    const leafGeo = useMemo(() => new THREE.SphereGeometry(foliageRadius, 16, 16), [foliageRadius]);
    const trunkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#402905', roughness: 0.9 }), []);
    const leafMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1B4D17', roughness: 0.8, metalness: 0.1 }), []);

    return (
        <group position={position}>
            <mesh geometry={trunkGeo} material={trunkMat} position={[0, trunkHeight / 2, 0]} castShadow receiveShadow />
            <mesh geometry={leafGeo} material={leafMat} position={[0, trunkHeight + foliageRadius * 0.7, 0]} scale={[1, 1.1, 1]} castShadow receiveShadow />
        </group>
    );
};

const StatueModel = ({ position, scale = [1, 1, 1], rotation = [0, 0, 0] }: { position: [number, number, number], scale?: [number, number, number], rotation?: [number, number, number] }) => {
    const { scene } = useGLTF(statueModel);
    if (!scene) {
        return (
            <mesh position={position} scale={[1, 1, 1]}>
                <boxGeometry args={[1, 2, 1]} />
                <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
            </mesh>
        );
    }
    return <primitive object={scene} position={position} scale={scale} rotation={rotation} />;
};

const Roads = ({ textures }: any) => {
    return (
        <group>
            {ROADS.map((r, i) => {
                const dx = r.end[0] - r.start[0];
                const dz = r.end[1] - r.start[1];
                const len = Math.sqrt(dx * dx + dz * dz);
                const angle = Math.atan2(dz, dx);
                return (
                    <mesh key={i} position={[(r.start[0] + r.end[0]) / 2, 0.02, (r.start[1] + r.end[1]) / 2]} rotation={[-Math.PI / 2, 0, -angle]} receiveShadow>
                        <planeGeometry args={[len, r.width]} />
                        <meshStandardMaterial map={textures.road} transparent opacity={0.9} />
                    </mesh>
                );
            })}
        </group>
    );
};

const Streetlights = () => {
    const poleGeo = useMemo(() => new THREE.CylinderGeometry(0.05, 0.05, 2.5), []);
    const lightGeo = useMemo(() => new THREE.SphereGeometry(0.15, 8, 8), []);
    const poleMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#333333' }), []);
    const lightMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#FFDD33' }), []);
    const positions = useMemo(() => [[-18, 0, -18], [18, 0, 18], [0, 0, 22], [0, 0, -22]], []);
    return (
        <group>
            <Instances geometry={poleGeo} material={poleMat}>
                {positions.map((p, i) => <Instance key={i} position={[p[0], 1.25, p[2]]} />)}
            </Instances>
            <Instances geometry={lightGeo} material={lightMat}>
                {positions.map((p, i) => (<Instance key={i} position={[p[0], 2.5, p[2]]} />))}
            </Instances>
            {positions.map((p, i) => (<pointLight key={i} position={[p[0], 2.5, p[2]]} intensity={0.8} distance={10} color="#FFDD33" />))}
        </group>
    );
};

const Car = ({ position, rotation }: { position: [number, number, number], rotation: number }) => {
    const wheelRotation = useRef(0);
    useFrame((_, delta) => { wheelRotation.current += delta * 10; });

    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh position={[0, 0.22, 0]} castShadow><boxGeometry args={[1.6, 0.3, 3.8]} /><meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.05} /></mesh>
            <mesh position={[0, 0.4, 0.3]} castShadow><boxGeometry args={[1.5, 0.25, 2.2]} /><meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[0, 0.55, -0.3]} castShadow><boxGeometry args={[1.3, 0.3, 1.4]} /><meshStandardMaterial color="#050505" metalness={0.95} roughness={0.05} /></mesh>
            <mesh position={[0, 0.62, -0.3]}><boxGeometry args={[1.2, 0.02, 1.2]} /><meshStandardMaterial color="#00ffff" transparent opacity={0.4} emissive="#00ffff" emissiveIntensity={0.5} /></mesh>
            <mesh position={[0.55, 0.48, -0.3]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.25, 0.02, 1.1]} /><meshStandardMaterial color="#00ffff" transparent opacity={0.3} emissive="#00ffff" emissiveIntensity={0.3} /></mesh>
            <mesh position={[-0.55, 0.48, -0.3]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.25, 0.02, 1.1]} /><meshStandardMaterial color="#00ffff" transparent opacity={0.3} emissive="#00ffff" emissiveIntensity={0.3} /></mesh>
            <mesh position={[0, 0.32, 1.9]} castShadow><boxGeometry args={[1.4, 0.15, 0.3]} /><meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[0, 0.32, -1.9]} castShadow><boxGeometry args={[1.4, 0.2, 0.3]} /><meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[0, 0.6, -1.85]}><boxGeometry args={[1.2, 0.08, 0.02]} /><meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1} /></mesh>
            <mesh position={[0.6, 0.42, -1.0]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.12, 0.05, 0.4]} /><meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.8} /></mesh>
            <mesh position={[-0.6, 0.42, -1.0]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.12, 0.05, 0.4]} /><meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.8} /></mesh>
            <mesh position={[0.6, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.03, 0.02, 3.5]} /><meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.6} /></mesh>
            <mesh position={[-0.6, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.03, 0.02, 3.5]} /><meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.6} /></mesh>
            {[[0.7, 0.15, 1.3], [-0.7, 0.15, 1.3], [0.7, 0.15, -1.2], [-0.7, 0.15, -1.2]].map((pos, i) => (
                <group key={i} position={pos as [number, number, number]}>
                    <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.25, 0.25, 0.18, 24]} /><meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} /></mesh>
                    <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.18, 0.18, 0.2, 6]} /><meshStandardMaterial color="#333333" metalness={0.95} roughness={0.1} /></mesh>
                    <mesh rotation={[0, 0, Math.PI / 2]} position={[pos[0] > 0 ? 0.1 : -0.1, 0, 0]}><ringGeometry args={[0.12, 0.17, 6]} /><meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.3} side={THREE.DoubleSide} /></mesh>
                </group>
            ))}
            <mesh position={[0.4, 0.32, 1.85]}><boxGeometry args={[0.2, 0.08, 0.05]} /><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} /></mesh>
            <mesh position={[-0.4, 0.32, 1.85]}><boxGeometry args={[0.2, 0.08, 0.05]} /><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} /></mesh>
            <mesh position={[0.4, 0.32, 1.83]}><boxGeometry args={[0.25, 0.12, 0.02]} /><meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.5} transparent opacity={0.8} /></mesh>
            <mesh position={[-0.4, 0.32, 1.83]}><boxGeometry args={[0.25, 0.12, 0.02]} /><meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.5} transparent opacity={0.8} /></mesh>
            <mesh position={[0.5, 0.32, -1.85]}><boxGeometry args={[0.3, 0.06, 0.05]} /><meshStandardMaterial color="#ff0033" emissive="#ff0033" emissiveIntensity={1.5} /></mesh>
            <mesh position={[-0.5, 0.32, -1.85]}><boxGeometry args={[0.3, 0.06, 0.05]} /><meshStandardMaterial color="#ff0033" emissive="#ff0033" emissiveIntensity={1.5} /></mesh>
            <mesh position={[0, 0.08, 0]}><boxGeometry args={[1.2, 0.02, 3.2]} /><meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.4} transparent opacity={0.6} /></mesh>
            <pointLight position={[0.4, 0.35, 2]} intensity={3} distance={15} color="#00ffff" />
            <pointLight position={[-0.4, 0.35, 2]} intensity={3} distance={15} color="#00ffff" />
            <pointLight position={[0, 0.35, -2]} intensity={1} distance={5} color="#ff0033" />
            <pointLight position={[0, 0, 0]} intensity={0.5} distance={4} color="#ff00ff" />
        </group>
    );
};

const DrivingCamera = ({ carPosition, carRotation, viewMode, speed }: { carPosition: [number, number, number], carRotation: number, viewMode: 'third' | 'first', speed: number }) => {
    const { set } = useThree();
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const smoothedCameraPos = useRef(new THREE.Vector3());
    const lookAtTarget = useRef(new THREE.Vector3());

    const isMobile = useMemo(() => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
            window.innerWidth <= 768;
    }, []);

    useEffect(() => {
        if (cameraRef.current) {
            set({ camera: cameraRef.current });
        }
    }, [set]);

    useFrame(() => {
        if (!cameraRef.current) return;

        if (viewMode === 'third') {
            const fixedCameraHeight = 90;
            const centerX = 0;
            const centerZ = 0;
            cameraRef.current.position.set(centerX, fixedCameraHeight, centerZ);
            cameraRef.current.lookAt(centerX, 0, centerZ);
            cameraRef.current.fov = 45;
            cameraRef.current.updateProjectionMatrix();
        } else {
            if (isMobile) {
                const driverHeight = 0.55;
                const forwardOffset = 0.3;
                const cameraX = carPosition[0] + Math.sin(carRotation) * forwardOffset;
                const cameraZ = carPosition[2] + Math.cos(carRotation) * forwardOffset;
                const cameraY = carPosition[1] + driverHeight;
                cameraRef.current.position.set(cameraX, cameraY, cameraZ);
                cameraRef.current.rotation.set(0, carRotation, 0);
                const lookAtDistance = 50;
                const lookAtX = carPosition[0] + Math.sin(carRotation) * lookAtDistance;
                const lookAtZ = carPosition[2] + Math.cos(carRotation) * lookAtDistance;
                const lookAtY = carPosition[1] + driverHeight;
                cameraRef.current.lookAt(lookAtX, lookAtY, lookAtZ);
                cameraRef.current.fov = 90;
                cameraRef.current.updateProjectionMatrix();
            } else {
                const height = 0.55;
                const forwardOffset = 0.3;
                const cameraX = carPosition[0] + Math.sin(carRotation) * forwardOffset;
                const cameraZ = carPosition[2] + Math.cos(carRotation) * forwardOffset;
                const cameraY = carPosition[1] + height;
                smoothedCameraPos.current.lerp(new THREE.Vector3(cameraX, cameraY, cameraZ), 0.25);
                const cameraPos = smoothedCameraPos.current;
                const minX = -35; const maxX = 35;
                const minZ = -35; const maxZ = 35;
                cameraPos.x = Math.max(minX, Math.min(maxX, cameraPos.x));
                cameraPos.z = Math.max(minZ, Math.min(maxZ, cameraPos.z));
                cameraRef.current.position.copy(cameraPos);
                const lookAtDistance = 30;
                const lookAtX = carPosition[0] + Math.sin(carRotation) * lookAtDistance;
                const lookAtZ = carPosition[2] + Math.cos(carRotation) * lookAtDistance;
                const lookAtY = carPosition[1] + height + 0.5;
                lookAtTarget.current.lerp(new THREE.Vector3(lookAtX, lookAtY, lookAtZ), 0.2);
                cameraRef.current.lookAt(lookAtTarget.current);
                cameraRef.current.fov = 85;
                cameraRef.current.updateProjectionMatrix();
            }
        }
    });

    return <perspectiveCamera ref={cameraRef} fov={viewMode === 'first' ? (isMobile ? 90 : 85) : 60} near={0.1} far={1000} />;
};

const CampusMap = ({ textures, isDriving, carPosition, carRotation }: any) => {
    return (
        <group rotation={[0, Math.PI / 4, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[120, 120]} />
                <meshStandardMaterial color={THEME.ground} roughness={0.8} metalness={0.1} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[119, 119]} />
                <meshStandardMaterial color={THEME.grass} roughness={1} />
            </mesh>
            <Roads textures={textures} />
            <SmartFoliage />
            <SingleHugeTree position={[-24, 0, 6]} height={6} />
            <Streetlights />
            {BUILDINGS.map((b) => (
                <Building key={b.id} data={b} textures={textures} showLabels={!isDriving} />
            ))}
            <Text position={[-25, 0.1, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} fontSize={1.5} color={THEME.primary}>
                MELA ROAD
            </Text>
            <StatueModel position={[15, 1.5, -18.5]} scale={[1.5, 1.5, 1.5]} rotation={[0, Math.PI * 1.5, 0]} />
            {isDriving && <Car position={carPosition} rotation={carRotation} />}
        </group>
    );
};

const MobileControls = ({ onMove }: { onMove: (x: number, y: number) => void }) => {
    const [forwardPressed, setForwardPressed] = useState(false);
    const [backwardPressed, setBackwardPressed] = useState(false);
    const [leftPressed, setLeftPressed] = useState(false);
    const [rightPressed, setRightPressed] = useState(false);

    useEffect(() => {
        let forwardValue = 0;
        let backwardValue = 0;
        let leftValue = 0;
        let rightValue = 0;

        if (forwardPressed) forwardValue = 1;
        if (backwardPressed) backwardValue = -1;
        if (leftPressed) leftValue = -1;
        if (rightPressed) rightValue = 1;

        const y = forwardValue + backwardValue;
        const x = leftValue + rightValue;

        onMove(x, y);
    }, [forwardPressed, backwardPressed, leftPressed, rightPressed, onMove]);

    const ButtonControl = ({ children, onPressIn, onPressOut, className }: { children: React.ReactNode, onPressIn: () => void, onPressOut: () => void, className?: string }) => (
        <button
            className={`w-16 h-16 rounded-full z-50 md:hidden ${className}`}
            style={{
                background: 'radial-gradient(circle, rgba(188,19,254,0.3) 0%, rgba(0,255,255,0.2) 100%)',
                border: '3px solid #ff00ff',
                boxShadow: '0 0 30px rgba(188,19,254,0.5), inset 0 0 20px rgba(0,255,255,0.3)',
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '8px',
                color: '#00ffff',
                textShadow: '0 0 10px #00ffff',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                touchAction: 'none',
                cursor: 'pointer'
            }}
            onTouchStart={(e) => { onPressIn(); }}
            onTouchEnd={onPressOut}
            onTouchCancel={onPressOut}
            onMouseDown={(e) => { onPressIn(); }}
            onMouseUp={onPressOut}
            onMouseLeave={onPressOut}
            onPointerDown={(e) => { onPressIn(); }}
            onPointerUp={onPressOut}
            onPointerLeave={onPressOut}
            onPointerCancel={onPressOut}
        >
            {children}
        </button>
    );

    return (
        <div className="fixed bottom-24 left-4 z-50 md:hidden">
            {/* Forward/Backward Controls (Left Side) */}
            <div className="flex flex-col gap-4">
                <ButtonControl
                    onPressIn={() => setForwardPressed(true)}
                    onPressOut={() => setForwardPressed(false)}
                    className="bg-gradient-to-b from-[#00ffff] to-[#0088ff] hover:shadow-[0_0_30px_#00ffff]"
                >
                    ⬆️
                </ButtonControl>
                <ButtonControl
                    onPressIn={() => setBackwardPressed(true)}
                    onPressOut={() => setBackwardPressed(false)}
                    className="bg-gradient-to-b from-[#ff0033] to-[#cc0000] hover:shadow-[0_0_30px_#ff0033]"
                >
                    ⬇️
                </ButtonControl>
            </div>

            {/* Left/Right Controls (Right Side) */}
            <div className="fixed bottom-24 right-4 flex flex-col gap-4 z-50">
                <ButtonControl
                    onPressIn={() => setLeftPressed(true)}
                    onPressOut={() => setLeftPressed(false)}
                    className="bg-gradient-to-b from-[#ff00ff] to-[#cc00cc] hover:shadow-[0_0_30px_#ff00ff]"
                >
                    ⬅️
                </ButtonControl>
                <ButtonControl
                    onPressIn={() => setRightPressed(true)}
                    onPressOut={() => setRightPressed(false)}
                    className="bg-gradient-to-b from-[#00ffff] to-[#0088ff] hover:shadow-[0_0_30px_#00ffff]"
                >
                    ➡️
                </ButtonControl>
            </div>
        </div>
    );
};

const CampusExplorer = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [webglSupported, setWebglSupported] = useState(true);
    const [isDriving, setIsDriving] = useState(false);
    const [viewMode, setViewMode] = useState<'third' | 'first'>('third');
    const [carPosition, setCarPosition] = useState<[number, number, number]>([0, 0, -20]);
    const [carRotation, setCarRotation] = useState(0);
    const [speed, setSpeed] = useState(0);
    const keysPressed = useRef<Set<string>>(new Set());
    const joystickInput = useRef({ x: 0, y: 0 });
    const textures = useMemo(() => generateTextures(), []);
    const isMobile = useMemo(() => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
            window.innerWidth <= 768;
    }, []);


    useEffect(() => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) { setWebglSupported(false); setIsLoading(false); return; }
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isDriving) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key === 'c') { e.preventDefault(); setViewMode(prev => prev === 'third' ? 'first' : 'third'); return; }
            const movementKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
            if (movementKeys.includes(key)) { e.preventDefault(); keysPressed.current.add(key); }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            const movementKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
            if (movementKeys.includes(key)) { keysPressed.current.delete(key); }
        };
        window.addEventListener('keydown', handleKeyDown, true);
        window.addEventListener('keyup', handleKeyUp, true);
        return () => { window.removeEventListener('keydown', handleKeyDown, true); window.removeEventListener('keyup', handleKeyUp, true); };
    }, [isDriving]);

    useEffect(() => {
        if (!isDriving) return;

        const carPhysicsInterval = setInterval(() => {
            const keys = keysPressed.current;
            let newSpeed = speed;
            let newRotation = carRotation;
            
            const joystickForward = joystickInput.current.y > 0.2;
            const joystickBackward = joystickInput.current.y < -0.2;
            const joystickLeft = joystickInput.current.x < -0.2;
            const joystickRight = joystickInput.current.x > 0.2;

            const forward = keys.has('w') || keys.has('arrowup') || joystickForward;
            const backward = keys.has('s') || keys.has('arrowdown') || joystickBackward;
            const left = keys.has('a') || keys.has('arrowleft') || joystickLeft;
            const right = keys.has('d') || keys.has('arrowright') || joystickRight;

            if (forward) {
                newSpeed = Math.min(speed + 0.025, 0.35);
            } else if (backward) {
                newSpeed = Math.max(speed - 0.025, -0.18);
            } else {
                newSpeed = speed * 0.92;
                if (Math.abs(newSpeed) < 0.005) newSpeed = 0;
            }

            if (Math.abs(newSpeed) > 0.01) {
                const rotationSpeed = Math.abs(newSpeed) > 0.1 ? 0.04 : 0.03;
                if (left) newRotation += rotationSpeed;
                if (right) newRotation -= rotationSpeed;
            }

            const moveX = Math.sin(newRotation) * newSpeed;
            const moveZ = Math.cos(newRotation) * newSpeed;

            let newX = carPosition[0] + moveX;
            let newZ = carPosition[2] + moveZ;

            newX = Math.max(-38, Math.min(38, newX));
            newZ = Math.max(-38, Math.min(38, newZ));

            setCarPosition([newX, 0, newZ]);
            setCarRotation(newRotation);
            setSpeed(newSpeed);
        }, 16);

        return () => clearInterval(carPhysicsInterval);
    }, [isDriving, carPosition, carRotation, speed]);

    const handleJoystickMove = useCallback((x: number, y: number) => { joystickInput.current = { x, y }; }, []);
    const startDriving = () => { setIsDriving(true); setCarPosition([0, 0, -20]); setCarRotation(0); setSpeed(0); };
    const stopDriving = () => { setIsDriving(false); setSpeed(0); keysPressed.current.clear(); joystickInput.current = { x: 0, y: 0 }; };

    return (
        <div className="min-h-screen bg-[#05010D] text-white font-orbitron selection:bg-primary selection:text-black overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ff00ff #1a0030' }}>
            <style>{`
                @media (max-width: 768px) {
                    ::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }
                    ::-webkit-scrollbar-track {
                        background: #1a0030;
                        border-left: 1px solid #ff00ff40;
                    }
                    ::-webkit-scrollbar-thumb {
                        background: #ff00ff;
                        border-radius: 4px;
                        border: 1px solid #ff66ff;
                    }
                    ::-webkit-scrollbar-thumb:hover {
                        background: #ff66ff;
                    }
                }
            `}</style>
            {!isDriving && <MainNavigation />}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05010D]">
                    <div className="text-center">
                        <div className="text-6xl mb-8 animate-pulse">🏛️</div>
                        <div className="text-xl tracking-[0.3em] text-primary animate-pulse" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '12px' }}>LOADING CAMPUS...</div>
                        <div className="mt-4 w-48 h-2 bg-white/10 mx-auto overflow-hidden"><div className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse" style={{ width: '60%' }} /></div>
                    </div>
                </div>
            )}
            <div className="relative pt-24 pb-8 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4">CAMPUS EXPLORER</h1>
                <div className="h-1 w-[100px] bg-primary mx-auto shadow-neon" />
                <p className="mt-4 text-xs md:text-sm font-share-tech text-muted-foreground tracking-[0.4em] uppercase opacity-60 max-w-2xl mx-auto px-4">// EXPLORE MITS CAMPUS IN 3D</p>
                <div className="mt-6 flex justify-center gap-3 flex-wrap px-4">
                    {!isDriving ? (
                        <Button onClick={startDriving} className="font-orbitron text-[8px] md:text-[10px] tracking-[0.3em] uppercase px-6 py-4 md:px-8 md:py-6 rounded-none border-2 bg-gradient-to-b from-[#ff00ff] to-[#cc00cc] border-[#ff66ff] text-white hover:shadow-[0_0_30px_#ff00ff] transition-all" style={{ fontFamily: '"Press Start 2P", monospace', boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 15px #ff00ff' }}>🚗 DRIVE IN CAMPUS</Button>
                    ) : (
                        <Button onClick={stopDriving} className="font-orbitron text-[8px] md:text-[10px] tracking-[0.3em] uppercase px-6 py-4 md:px-8 md:py-6 rounded-none border-2 bg-gradient-to-b from-[#00ffff] to-[#0088ff] border-[#66ffff] text-black hover:shadow-[0_0_30px_#00ffff] transition-all" style={{ fontFamily: '"Press Start 2P", monospace', boxShadow: 'inset -2px -2px 0 #006688, inset 2px 2px 0 #66ffff, 0 0 15px #00ffff' }}>✕ EXIT DRIVING</Button>
                    )}
                </div>
            </div>
            <div className={`container mx-auto px-4 pb-12 ${isDriving ? 'p-0 m-0 max-w-none' : ''}`}>
                <div className={`relative w-full overflow-hidden transition-all duration-500 ${isDriving ? 'fixed inset-0 z-[100] rounded-none border-0' : 'rounded-xl border-2 border-white/10'}`} style={{ height: isDriving ? '100vh' : 'calc(100vh - 320px)', minHeight: isDriving ? '100vh' : '400px', width: isDriving ? '100vw' : '100%', maxWidth: isDriving ? 'none' : '100%', left: isDriving ? '0' : 'auto', right: isDriving ? '0' : 'auto', top: isDriving ? '0' : 'auto', bottom: isDriving ? '0' : 'auto', boxShadow: isDriving ? 'none' : '0 0 60px rgba(188,19,254,0.2), inset 0 0 30px rgba(0,0,0,0.5)', overflow: isDriving ? 'hidden' : 'visible' }}>
                    {isDriving && (<button onClick={stopDriving} className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] px-3 py-2 bg-black/80 border border-primary/50 text-primary text-[7px] md:text-[8px] font-press-start hover:bg-primary hover:text-black transition-all flex items-center gap-2 shadow-neon-small" style={{ fontFamily: '"Press Start 2P", monospace' }}><span>✕</span> EXIT DRIVING</button>)}
                    {webglSupported ? (
                        <Canvas camera={{ position: [30, 25, 30], fov: 45 }} gl={{ antialias: true, alpha: true, stencil: false, depth: true, powerPreference: 'high-performance' }} dpr={Math.min(window.devicePixelRatio, 2)} style={{ width: '100%', height: '100%' }}>
                            <Suspense fallback={null}>
                                <PerspectiveCamera makeDefault position={[30, 25, 30]} fov={45} />
                                {!isDriving && (<OrbitControls autoRotate={!isDriving} autoRotateSpeed={0.5} enableZoom={true} enablePan={true} minDistance={5} maxDistance={60} minPolarAngle={0} maxPolarAngle={Math.PI / 2} zoomToCursor={true} />)}
                                {isDriving && (<DrivingCamera carPosition={carPosition} carRotation={carRotation} viewMode={viewMode} speed={speed} />)}
                                <ambientLight intensity={0.4} />
                                <pointLight position={[20, 30, 20]} intensity={1.5} />
                                <pointLight position={[-20, 25, -20]} intensity={0.8} color="#00A6FF" />
                                <fog attach="fog" args={['#050c15', 50, 300]} />
                                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                                <Environment preset="city" />
                                <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={60} blur={2.5} far={10} resolution={256} color="#000000" frames={1} />
                                <CampusMap textures={textures} isDriving={isDriving} carPosition={carPosition} carRotation={carRotation} />
                                <mesh position={[0, -0.6, 0]}><cylinderGeometry args={[46, 45, 1, 64]} /><meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} /></mesh>
                                <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[45.1, 45.5, 64]} /><meshBasicMaterial color={THEME.primary} transparent opacity={0.3} /></mesh>
                                <Preload all />
                            </Suspense>
                        </Canvas>
                    ) : (<div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#0a1a2a] to-[#050c15] text-center"><p className="font-orbitron text-lg text-primary">WebGL is not available on this device.</p></div>)}
                    {isDriving && (
                        <>
                            <MobileControls onMove={handleJoystickMove} />
                            {viewMode === 'first' && (
                                <div className="absolute inset-0 pointer-events-none z-40">
                                    <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24" style={{ background: 'linear-gradient(to top, rgba(10,0,20,0.95) 0%, rgba(10,0,20,0.7) 50%, transparent 100%)' }} />
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[240px] md:w-[280px] h-14 md:h-16 rounded-t-xl" style={{ background: 'linear-gradient(to bottom, #1a0030, #0a0015)', border: '2px solid #ff00ff40', borderBottom: 'none', boxShadow: '0 0 20px rgba(255,0,255,0.2), inset 0 -10px 30px rgba(0,0,0,0.5)' }}>
                                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 md:w-20 h-16 md:h-20 rounded-full border-4 border-[#ff00ff80] flex items-center justify-center" style={{ background: 'radial-gradient(circle, #0a0015 0%, #000 100%)' }}>
                                            <div className="text-center"><div className="text-[#00ffff] text-base md:text-lg font-bold" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '12px md:14px' }}>{Math.abs(Math.round(speed * 100))}</div><div className="text-[#ff00ff80] text-[5px] md:text-[6px]" style={{ fontFamily: '"Press Start 2P", monospace' }}>KM/H</div></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    <div className="absolute inset-0 pointer-events-none scanlines opacity-20" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,1,13,0.8) 100%)' }} />
                </div>
                {!isDriving && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[{ icon: '🎓', title: 'Main Gate', desc: 'Historic entrance since 1957' }, { icon: '🤖', title: 'AI Department', desc: 'State-of-the-art research facility' }, { icon: '📚', title: 'Central Library', desc: 'Over 100,000 books & resources' }].map((item, idx) => (
                            <div key={idx} className="group relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-lg p-4 hover:border-primary transition-all duration-500" style={{ boxShadow: '0 0 30px rgba(188,19,254,0.05)' }}>
                                <div className="text-3xl md:text-4xl mb-3">{item.icon}</div>
                                <h3 className="text-base md:text-lg font-black text-white group-hover:text-primary transition-colors mb-2">{item.title}</h3>
                                <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
    );
};

export default CampusExplorer;