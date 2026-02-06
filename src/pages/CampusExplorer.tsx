import React, { useState, useCallback, useEffect, Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Preload, Stars, Environment, ContactShadows, Html, Text, Instance, Instances, useGLTF } from '@react-three/drei';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';
import statueModel from '@/components/models/statue.glb?url';
import { getCachedModel, cacheModel, getCachedTexture, cacheTexture, getCachedGeometry, cacheGeometry } from '@/utils/cache';

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

    // Unique AI Department
    { id: 'ai-department', name: 'AI department', hindiName: 'एआई विभाग', position: [-1, 2], size: [9, 5], height: 8, type: 'simple', icon: '🤖' },
    
    // --- UPDATED: GOLE KA MANDIR SQUARE (Replaced 'circle') ---
    { 
        id: 'gkm-square', 
        name: 'Gole Ka Mandir Square', 
        hindiName: 'गोले का मंदिर चौराहा', 
        position: [40, -35], 
        size: [12, 12], 
        height: 0.3, 
        type: 'landmark', // Renders as a flat ground/roundabout base
        color: '#444444', 
        icon: '📍' 
    },

    // HOSTELS
    { id: 'girls-hostel', name: 'Girls Hostel', hindiName: 'छात्रावास', position: [22, 29], size: [8, 8], height: 7, type: 'hostel', icon: '🛏️', color: '#e0c0e0' },
    { id: 'boys-hostel', name: 'Boys Hostel', hindiName: 'छात्रालय', position: [-15, 40], size: [8, 10], height: 7, type: 'hostel', icon: '🛏️', color: '#c0d0e0' },

    // POWER STATION
    { id: 'power-house', name: 'Power Station', hindiName: 'विद्युत घर', position: [-18, 25], size: [6, 8], height: 0.5, type: 'power-towers', icon: '⚡' },

    { id: 'library', name: 'Central Library', hindiName: 'पुस्तकालय', position: [-14, -12], size: [4, 3], height: 3, type: 'complex', icon: '📚' },
    { id: 'stage-ground', name: 'Stage Ground', hindiName: 'स्टेज ग्राउंड', position: [-5, -22], size: [15, 6], height: 0.1, type: 'landmark', color: '#2D5A27' },
    { id: 'parking', name: 'Parking', hindiName: 'पार्किंग', position: [-19, -5], size: [3, 20], height: 0.1, type: 'landmark', color: '#2D5A27' },
    { id: 'ai-ground', name: 'AI ground', hindiName: 'एआई ग्राउंड', position: [-1, -4], size: [9, 7], height: 0.1, type: 'landmark', color: '#3A6B35' },
    { id: 'statue-ground', name: 'Statue Ground', hindiName: 'स्टैच्यू ग्राउंड', position: [15, -18.5], size: [10, 10], height: 0.1, type: 'landmark', color: '#2D5A27' },
    { id: 'gymnasium', name: 'Gymnasium', hindiName: 'जिम', position: [11, 3.5], size: [8, 8], height: 0.1, type: 'landmark', color: '#2D5A27' },
    { id: 'football-ground', name: 'Football Ground', hindiName: 'फुटबॉल ग्राउंड', position: [0, 19], size: [30, 15], height: 0.1, type: 'landmark', color: '#1B4D17' },

    { id: 'biotech', name: 'Biotech Dept', hindiName: 'जैव प्रौद्योगिकी', position: [15, -11], size: [5, 5], height: 3.5, type: 'simple' },
    { id: 'dispensary', name: 'Dispensary', hindiName: 'औषधालय', position: [11, -3.5], size: [4, 4], height: 2, type: 'simple', icon: 'H' },
    { id: 'admission', name: 'Admission Sector', hindiName: 'प्रवेश', position: [18, 0], size: [4, 12], height: 2, type: 'simple', icon: 'H' },
    { id: 'amul', name: 'Amul Parlor', hindiName: 'अमूल', position: [7, -0.5], size: [2, 2], height: 1, type: 'simple', icon: 'H' },
    { id: 'architecture', name: 'Architecture Dept', hindiName: 'वास्तुकला', position: [-9.5, -6.5], size: [5, 5], height: 4, type: 'complex' },
    { id: 'mechanical-dept', name: 'Mechanical Dept', hindiName: 'मैकेनिकल विभाग', position: [2, -7.25], size: [4, 4], height: 4, type: 'complex' },
    { id: 'statue-base', name: 'Statue base', hindiName: 'स्टैच्यू आधार', position: [15, -18.5], size: [2, 2], height: 1, type: 'simple', color: '#A9A9A9' },
    { id: 'mits-main', name: 'Mechanical Workshop', hindiName: 'मैकेनिकल वर्कशॉप', position: [-3, 15], size: [7, 4], height: 3, type: 'complex', icon: '⚙️' },
    { id: 'diamond-gate', name: 'Diamond Jubilee Gate', hindiName: 'डायमंड गेट', position: [-24, 9], size: [4, 1], height: 6, type: 'gate', rotationY: Math.PI / 2 },
];


const ROADS = [
    // Original Grid
    { start: [-22, -26], end: [23, -26], width: 2 },  // Bottom horizontal
    { start: [5, -27], end: [5, 11], width: 2 },      // Main vertical spine

    // Extended Right Side
    { start: [22, -25], end: [22, 25], width: 2 },
    
    // Extended Left Side (Diamond Gate Area)
    { start: [-23, -27], end: [-23, 33.75], width: 2 },  // Left vertical spine
    { start: [-23, 10], end: [23, 10], width: 2 },     // Middle horizontal connector

    // Service Roads
    { start: [-23, 33], end: [-15, 33], width: 1.5 }, 

    // --- NEW: GOLE KA MANDIR SQUARE ROADS (EXTENDED TO ENDS) ---
    // 1. North Road (Vertical - Parallel to Diamond Gate road) -> Extends to +60 Z
    { start: [40, -35], end: [40, 60], width: 5 }, 
    { start: [-40, -35], end: [-40, 60], width: 5 }, 
    // 2. South Road -> Extends to -60 Z
    { start: [40, -35], end: [40, -60], width: 5 },
    { start: [-40, -35], end: [-40, -60], width: 5 },
    // 3. West Road (Connecting towards Campus) -> Extends to -60 X
    { start: [40, -35], end: [-60, -35], width: 5 },
    { start: [40, 50], end: [-60, 50], width: 5 },
    // 4. East Road -> Extends to +60 X
    { start: [40, -35], end: [60, -35], width: 5 },
    { start: [40, 50], end: [60, 50], width: 5 },
];


const generateTextures = () => {
    // Check cache first
    const cachedWindowTexture = getCachedTexture('window_texture');
    const cachedRoadTexture = getCachedTexture('road_texture');

    if (cachedWindowTexture && cachedRoadTexture) {
        console.log('✅ Using cached textures');
        return { window: cachedWindowTexture, road: cachedRoadTexture };
    }

    console.log('🔄 Generating textures...');

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

    // Cache the generated textures
    cacheTexture('window_texture', windowTexture);
    cacheTexture('road_texture', roadTexture);

    console.log('💾 Textures cached successfully');
    return { window: windowTexture, road: roadTexture };
};

const AreaLabels = () => {
    const labels = [
        // Campus Zones
        { text: "HOSTEL ZONE", position: [3, 0.2, 35], rotation: 0, size: 5, color: "#ffffff", opacity: 0.15 },
        { text: "ACADEMIC BLOCK", position: [-10, 0.2, 7], rotation: 0, size: 2, color: "#d8cccc", opacity: 0.15 },
        { text: "FOOTBALL GROUND", position: [0, 0.2, 19], rotation: 0, size: 3, color: "#ffffff", opacity: 0.3 },
        
        // Surrounding Areas
        { text: "MELA GROUND SECTOR", position: [-45, 0.2, 0], rotation: Math.PI / 2, size: 4, color: "#cccccc", opacity: 0.1 },
        { text: "RESIDENCY AREA", position: [50, 0.2, -20], rotation: -Math.PI / 2, size: 4, color: "#cccccc", opacity: 0.1 },
       // { text: "CITY CENTER", position: [40, 0.2, -55], rotation: 0, size: 4, color: "#aaaaaa", opacity: 0.1 },
        { text: "INDUSTRIAL AREA", position: [-40, 0.2, 50], rotation: 0, size: 4, color: "#aaaaaa", opacity: 0.1 },
        
        // Road Labels
        { text: "MELA ROAD", position: [-25, 0.2, 0], rotation: Math.PI / 2, size: 2, color: THEME.primary, opacity: 0.8 },
        { text: "MORAR ROAD", position: [40, 0.2, 10], rotation: Math.PI / 2, size: 2, color: "#aaaaaa", opacity: 0.5 },
    ];

    return (
        <group>
            {labels.map((label, index) => (
                <Text
                    key={index}
                    position={label.position as [number, number, number]}
                    rotation={[-Math.PI / 2, 0, label.rotation]}
                    fontSize={label.size}
                    color={label.color}
                    fillOpacity={label.opacity}
                    anchorX="center"
                    anchorY="middle"
                    fontWeight="bold"
                >
                    {label.text}
                </Text>
            ))}
        </group>
    );
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

    // Check cache for geometry
    const cachedPostGeo = getCachedGeometry('fence_post_geometry');
    const cachedRailGeo = getCachedGeometry('fence_rail_geometry');

    let postGeometry = cachedPostGeo;
    let railGeometry = cachedRailGeo;

    if (!postGeometry || !railGeometry) {
        console.log('🔄 Generating fence geometries...');
        postGeometry = new THREE.BoxGeometry(0.15, postHeight, 0.15);
        railGeometry = new THREE.BoxGeometry(1, 0.05, 0.05);

        // Cache the geometries
        cacheGeometry('fence_post_geometry', postGeometry);
        cacheGeometry('fence_rail_geometry', railGeometry);
        console.log('💾 Fence geometries cached successfully');
    }

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
                    <primitive object={postGeometry} />
                    <meshStandardMaterial color={fenceColor} roughness={0.7} />
                </mesh>
            ))}

            {/* 2. Top Rails (4 Sides) */}
            <group position={[0, postHeight - 0.1, 0]}>
                {/* Top Side */}
                <mesh position={[0, 0, -halfD]}>
                    <primitive object={railGeometry} />
                    <meshStandardMaterial color={railColor} />
                </mesh>
                {/* Bottom Side */}
                <mesh position={[0, 0, halfD]}>
                    <primitive object={railGeometry} />
                    <meshStandardMaterial color={railColor} />
                </mesh>
                {/* Left Side */}
                <mesh position={[-halfW, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <primitive object={railGeometry} />
                    <meshStandardMaterial color={railColor} />
                </mesh>
                {/* Right Side */}
                <mesh position={[halfW, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <primitive object={railGeometry} />
                    <meshStandardMaterial color={railColor} />
                </mesh>
            </group>

            {/* 3. Middle Rails (4 Sides) */}
            <group position={[0, postHeight / 2, 0]}>
                <mesh position={[0, 0, -halfD]}><primitive object={railGeometry} /><meshStandardMaterial color={railColor} /></mesh>
                <mesh position={[0, 0, halfD]}><primitive object={railGeometry} /><meshStandardMaterial color={railColor} /></mesh>
                <mesh position={[-halfW, 0, 0]} rotation={[0, Math.PI / 2, 0]}><primitive object={railGeometry} /><meshStandardMaterial color={railColor} /></mesh>
                <mesh position={[halfW, 0, 0]} rotation={[0, Math.PI / 2, 0]}><primitive object={railGeometry} /><meshStandardMaterial color={railColor} /></mesh>
            </group>
        </group>
    );
};

const HostelComplex = ({ position, hostelType, size, height }: { position: [number, number], hostelType: 'boys' | 'girls', size: [number, number], height: number }) => {
    // Create multiple hostel blocks in a complex
    const blockWidth = size[0] / 3;
    const blockDepth = size[1] / 2.5;
    const baseColor = hostelType === 'girls' ? '#e0c0e0' : '#c0d0e0'; // Light purple for girls, light blue for boys
    const windowColor = hostelType === 'girls' ? '#FF69B4' : '#4169E1'; // Pink accents for girls, blue for boys

    const blocks = [
        // Block 1 - Front Left
        { x: -size[0]/2 + blockWidth/2, z: -size[1]/2 + blockDepth/2, label: hostelType === 'girls' ? 'Block A' : 'Block A' },
        // Block 2 - Front Center
        { x: 0, z: -size[1]/2 + blockDepth/2, label: hostelType === 'girls' ? 'Block B' : 'Block B' },
        // Block 3 - Front Right
        { x: size[0]/2 - blockWidth/2, z: -size[1]/2 + blockDepth/2, label: hostelType === 'girls' ? 'Block C' : 'Block C' },
        // Block 4 - Back Left
        { x: -size[0]/2 + blockWidth/2, z: size[1]/2 - blockDepth/2, label: hostelType === 'girls' ? 'Block D' : 'Block D' },
        // Block 5 - Back Center
        { x: 0, z: size[1]/2 - blockDepth/2, label: hostelType === 'girls' ? 'Block E' : 'Block E' },
        // Block 6 - Back Right
        { x: size[0]/2 - blockWidth/2, z: size[1]/2 - blockDepth/2, label: hostelType === 'girls' ? 'Block F' : 'Block F' },
    ];

    return (
        <group position={[position[0], 0, position[1]]}>
            {/* Central Courtyard/Plaza - ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
                <planeGeometry args={[size[0], size[1]]} />
                <meshStandardMaterial color="#B8860B" roughness={0.85} />
            </mesh>

            {/* Hostel Blocks */}
            {blocks.map((block, i) => (
                <group key={`hostel-block-${i}`} position={[block.x, 0, block.z]}>
                    {/* Main building block */}
                    <mesh castShadow position={[0, height / 2, 0]}>
                        <boxGeometry args={[blockWidth - 0.5, height, blockDepth - 0.5]} />
                        <meshStandardMaterial
                            color={baseColor}
                            roughness={0.6}
                            metalness={0.1}
                            emissive={i % 2 === 0 ? windowColor : '#000000'}
                            emissiveIntensity={0.1}
                        />
                    </mesh>

                    {/* Roof */}
                    <mesh position={[0, height, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[blockWidth - 0.5, blockDepth - 0.5]} />
                        <meshStandardMaterial color="#333333" roughness={0.9} />
                    </mesh>

                    {/* Window grid pattern */}
                    {[...Array(Math.floor((blockWidth - 0.5) / 1.2))].map((_, wi) =>
                        [...Array(Math.floor(height / 1))].map((_, hi) => (
                            <mesh key={`window-${wi}-${hi}`} position={[-blockWidth/2 + 1 + wi * 1.2, 1 + hi * 1.2, blockDepth/2 - 0.1]}>
                                <boxGeometry args={[0.6, 0.6, 0.05]} />
                                <meshStandardMaterial color={windowColor} emissive={windowColor} emissiveIntensity={0.4} metalness={0.7} />
                            </mesh>
                        ))
                    )}

                    {/* Block name plate */}
                    <Html position={[0, height + 1, 0]} center distanceFactor={15}>
                        <div className="px-2 py-1 bg-black/70 rounded text-[8px] text-white font-bold whitespace-nowrap">
                            {block.label}
                        </div>
                    </Html>
                </group>
            ))}

            {/* Entrance gate/arch */}
            <group position={[0, 0, -size[1]/2 + 0.5]}>
                <mesh castShadow position={[-blockWidth/2, height * 0.8, 0]}>
                    <boxGeometry args={[blockWidth * 0.6, height * 0.6, 0.2]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.8} />
                </mesh>
                <mesh castShadow position={[blockWidth/2, height * 0.8, 0]}>
                    <boxGeometry args={[blockWidth * 0.6, height * 0.6, 0.2]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.8} />
                </mesh>
            </group>

            {/* Sports/Recreation area in center */}
            <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[2.5, 16]} />
                <meshStandardMaterial color="#90EE90" roughness={0.85} />
            </mesh>

            {/* Flagpole in center courtyard */}
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
                <meshStandardMaterial color="#333333" roughness={0.7} />
            </mesh>
            <mesh position={[0.3, 3.2, -0.1]}>
                <boxGeometry args={[0.6, 0.3, 0.05]} />
                <meshStandardMaterial color={hostelType === 'girls' ? '#FF1493' : '#1E90FF'} emissive={hostelType === 'girls' ? '#FF1493' : '#1E90FF'} emissiveIntensity={0.4} />
            </mesh>
        </group>
    );
};

const Building = ({ data, textures, showLabels }: any) => {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    // HOSTEL LOGIC: Use HostelComplex for hostels
    if (data.type === 'hostel') {
        return (
            <group>
                <HostelComplex
                    position={[data.position[0], data.position[1]]}
                    hostelType={data.id === 'girls-hostel' ? 'girls' : 'boys'}
                    size={data.size}
                    height={data.height}
                />
                {showLabels && (
                    <Html position={[data.position[0], data.height + 4, data.position[1]]} center distanceFactor={20}>
                        <div className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-[10px] text-white whitespace-nowrap font-orbitron shadow-xl pointer-events-none">
                            <span className="text-primary mr-1">●</span> {data.name}
                        </div>
                    </Html>
                )}
            </group>
        );
    }

    const geometry = useMemo(() => {
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
                position={[
                    0, 
                    // UPDATED: Removed 'gate' from this check so it defaults to data.height/2
                    (data.type === 'complex' || data.type === 'hostel') ? 0 : data.height / 2, 
                    0
                ]}
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
                    {[-2, 2].map((offset, i) => (
                        <group key={i} position={[offset, 0, 0]}>
                            <mesh position={[0, 4, 0]}><cylinderGeometry args={[0.1, 0.8, 8, 4]} /><meshStandardMaterial color="#333" roughness={0.5} /></mesh>
                            <mesh position={[0, 6, 0]}><boxGeometry args={[3, 0.2, 0.2]} /><meshStandardMaterial color="#333" /></mesh>
                            {i === 0 && <mesh position={[0, 7, 0]}><boxGeometry args={[2, 0.2, 0.2]} /><meshStandardMaterial color="#333" /></mesh>}
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


/*
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
*/

/*
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
*/

// ========================================
// GOLE KA MANDIR SQUARE - Detailed 3D Model
// ========================================

// Create realistic road texture with wear, cracks, and markings
const createRoadTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Base asphalt
    ctx.fillStyle = '#2D2D2D';
    ctx.fillRect(0, 0, 512, 512);

    // Add cracks
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 512, Math.random() * 512);
        ctx.lineTo(Math.random() * 512, Math.random() * 512);
        ctx.stroke();
    }

    // Add dust/dirt spots
    ctx.fillStyle = 'rgba(139,69,19,0.15)';
    for (let i = 0; i < 100; i++) {
        ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 30, Math.random() * 30);
    }

    // Add oil stains
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 20 + 5, 0, Math.PI * 2);
        ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
};

const GoleKaMandirSquare = () => {
    const roadTexture = useMemo(() => createRoadTexture(), []);
    // CENTRAL ROUNDABOUT - Enhanced Choraha (City Square)
    const CentralMonument = () => {
        return (
            <group position={[40, 0, -35]}>
                {/* Outer circular border/curb - Elevated */}
                <mesh position={[0, 0.08, 0]}>
                    <torusGeometry args={[6, 0.4, 16, 100]} />
                    <meshStandardMaterial color="#FFFFFF" roughness={0.7} metalness={0.3} />
                </mesh>

                {/* Inner circular grass/green area */}
                <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[5.8, 64]} />
                    <meshStandardMaterial color="#3A7D3A" roughness={0.9} />
                </mesh>

                {/* Circular paved area (lighter shade) */}
                <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[5.5, 64]} />
                    <meshStandardMaterial color="#4A9D4A" roughness={0.85} />
                </mesh>

                {/* Central circular pedestrian area - very light */}
                <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[3, 64]} />
                    <meshStandardMaterial color="#90EE90" roughness={0.8} />
                </mesh>

                {/* ENHANCED: Larger monument at center */}
                <mesh position={[0, 0.3, 0]}>
                    <cylinderGeometry args={[0.6, 0.8, 0.3, 16]} />
                    <meshStandardMaterial color="#FFD700" roughness={0.5} metalness={0.6} emissive="#FFD700" emissiveIntensity={0.2} />
                </mesh>

                {/* Central column/pillar */}
                <mesh position={[0, 0.8, 0]}>
                    <cylinderGeometry args={[0.25, 0.3, 1.2, 12]} />
                    <meshStandardMaterial color="#C0C0C0" roughness={0.4} metalness={0.8} />
                </mesh>

                {/* Monument top - decorative sphere */}
                <mesh position={[0, 1.5, 0]}>
                    <sphereGeometry args={[0.4, 16, 16]} />
                    <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.9} emissive="#FFD700" emissiveIntensity={0.3} />
                </mesh>

                {/* Light rays from monument */}
                <pointLight position={[0, 1.5, 0]} intensity={1.5} distance={20} color="#FFD700" />

                {/* Circular walking path markings around center */}
                {[0, 90, 180, 270].map((angle) => {
                    const x = Math.cos((angle * Math.PI) / 180) * 2;
                    const z = Math.sin((angle * Math.PI) / 180) * 2;
                    return (
                        <mesh key={`marker-${angle}`} position={[x, 0.06, z]}>
                            <cylinderGeometry args={[0.25, 0.25, 0.1, 12]} />
                            <meshStandardMaterial color="#FFD700" roughness={0.5} metalness={0.6} />
                        </mesh>
                    );
                })}

                {/* Additional paved circular ring patterns around center */}
                {[1.5, 2.5].map((radius, i) => (
                    <mesh key={`ring-${i}`} position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[radius, 0.1, 32, 100]} />
                        <meshStandardMaterial color="#C0C0C0" roughness={0.7} metalness={0.4} />
                    </mesh>
                ))}
            </group>
        );
    };

    // ROADS AND LANE MARKINGS
    const RoadsAndMarkings = () => {
        return (
            <group>
                {/* Main horizontal road (East-West) */}
                <mesh position={[40, 0.0, -35]}>
                    <planeGeometry args={[40, 12]} />
                    <meshStandardMaterial map={roadTexture} color="#2D2D2D" roughness={0.9} />
                </mesh>

                {/* Main vertical road (North-South) */}
                <mesh position={[40, 0.01, -35]}>
                    <planeGeometry args={[12, 40]} />
                    <meshStandardMaterial map={roadTexture} color="#2D2D2D" roughness={0.9} />
                </mesh>

                {/* Yellow center line (horizontal) */}
                <mesh position={[40, 0.02, -35]}>
                    <planeGeometry args={[38, 0.3]} />
                    <meshStandardMaterial color="#FFFF00" emissive="#FFFF00" emissiveIntensity={0.2} />
                </mesh>

                {/* Yellow center line (vertical) */}
                <mesh position={[40, 0.02, -35]}>
                    <planeGeometry args={[0.3, 38]} />
                    <meshStandardMaterial color="#FFFF00" emissive="#FFFF00" emissiveIntensity={0.2} />
                </mesh>

                {/* Zebra crossing - horizontal */}
                {[...Array(10)].map((_, i) => (
                    <mesh key={`zebra-h-${i}`} position={[40 - 15 + i * 3, 0.022, -35 - 6]}>
                        <planeGeometry args={[2.5, 0.5]} />
                        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.1} />
                    </mesh>
                ))}

                {/* Zebra crossing - vertical */}
                {[...Array(10)].map((_, i) => (
                    <mesh key={`zebra-v-${i}`} position={[40 + 6, 0.022, -35 - 15 + i * 3]}>
                        <planeGeometry args={[0.5, 2.5]} />
                        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.1} />
                    </mesh>
                ))}

                {/* Road shoulders and sidewalks */}
                <mesh position={[40 - 8, 0.015, -35]}>
                    <planeGeometry args={[2, 40]} />
                    <meshStandardMaterial color="#696969" roughness={0.95} />
                </mesh>
                <mesh position={[40 + 8, 0.015, -35]}>
                    <planeGeometry args={[2, 40]} />
                    <meshStandardMaterial color="#696969" roughness={0.95} />
                </mesh>
                <mesh position={[40, 0.015, -35 - 8]}>
                    <planeGeometry args={[40, 2]} />
                    <meshStandardMaterial color="#696969" roughness={0.95} />
                </mesh>
                <mesh position={[40, 0.015, -35 + 8]}>
                    <planeGeometry args={[40, 2]} />
                    <meshStandardMaterial color="#696969" roughness={0.95} />
                </mesh>
            </group>
        );
    };

    // TRAFFIC LIGHTS AND SIGNS - Enhanced System
    const TrafficInfrastructure = () => {
        return (
            <group>
                {/* Traffic lights at 4 intersections with dual systems */}
                {[[40 - 7, -35 - 7], [40 + 7, -35 - 7], [40 + 7, -35 + 7], [40 - 7, -35 + 7]].map((pos, i) => (
                    <group key={`traffic-${i}`} position={[pos[0], 0, pos[1]]}>
                        {/* Main pole */}
                        <mesh position={[0, 2, 0]}>
                            <cylinderGeometry args={[0.12, 0.12, 4, 8]} />
                            <meshStandardMaterial color="#222222" roughness={0.85} metalness={0.5} />
                        </mesh>

                        {/* Primary Traffic signal box */}
                        <mesh position={[0, 4, 0]}>
                            <boxGeometry args={[0.7, 1.6, 0.25]} />
                            <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.4} />
                        </mesh>

                        {/* Primary Signal Lights */}
                        {/* Red */}
                        <mesh position={[0, 4.35, 0.2]}>
                            <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
                            <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.8} />
                        </mesh>

                        {/* Yellow */}
                        <mesh position={[0, 3.85, 0.2]}>
                            <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
                            <meshStandardMaterial color="#FFDD00" emissive="#FFDD00" emissiveIntensity={0.7} />
                        </mesh>

                        {/* Green */}
                        <mesh position={[0, 3.35, 0.2]}>
                            <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
                            <meshStandardMaterial color="#00FF00" emissive="#00FF00" emissiveIntensity={0.8} />
                        </mesh>

                        {/* Secondary signal on opposite side */}
                        <mesh position={[0, 4, -0.15]}>
                            <boxGeometry args={[0.6, 1.4, 0.2]} />
                            <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.4} />
                        </mesh>

                        {/* Secondary lights - smaller */}
                        <mesh position={[0, 4.25, -0.25]}>
                            <cylinderGeometry args={[0.12, 0.12, 0.1, 12]} />
                            <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.7} />
                        </mesh>
                        <mesh position={[0, 3.75, -0.25]}>
                            <cylinderGeometry args={[0.12, 0.12, 0.1, 12]} />
                            <meshStandardMaterial color="#FFDD00" emissive="#FFDD00" emissiveIntensity={0.6} />
                        </mesh>
                        <mesh position={[0, 3.25, -0.25]}>
                            <cylinderGeometry args={[0.12, 0.12, 0.1, 12]} />
                            <meshStandardMaterial color="#00FF00" emissive="#00FF00" emissiveIntensity={0.7} />
                        </mesh>

                        {/* Enhanced light rays - brighter and more visible */}
                        <pointLight position={[0, 4.35, 0.8]} intensity={2.5} distance={12} color="#FF0000" />
                        <pointLight position={[0, 3.85, 0.8]} intensity={2} distance={10} color="#FFDD00" />
                        <pointLight position={[0, 3.35, 0.8]} intensity={2.5} distance={12} color="#00FF00" />

                        {/* Rear signals light */}
                        <pointLight position={[0, 4.25, -0.5]} intensity={1.8} distance={10} color="#FF0000" />
                        <pointLight position={[0, 3.25, -0.5]} intensity={1.8} distance={10} color="#00FF00" />
                    </group>
                ))}

                {/* Speed breakers (humps) - White and black striped for visibility */}
                {[40 - 5, 40 + 5].map((x, i) => (
                    <group key={`bump-${i}`}>
                        {/* Horizontal speed breakers */}
                        <mesh position={[x, 0.1, -35 - 5]}>
                            <boxGeometry args={[1.2, 0.2, 8]} />
                            <meshStandardMaterial color="#FFFFFF" roughness={0.7} metalness={0.2} />
                        </mesh>
                        <mesh position={[x, 0.1, -35 + 5]}>
                            <boxGeometry args={[1.2, 0.2, 8]} />
                            <meshStandardMaterial color="#FFFFFF" roughness={0.7} metalness={0.2} />
                        </mesh>

                        {/* Black stripes on speed breakers for contrast */}
                        {[...Array(8)].map((_, j) => (
                            <mesh key={`stripe-${i}-${j}`} position={[x, 0.11, -35 - 5 + j]}>
                                <planeGeometry args={[0.2, 1]} />
                                <meshStandardMaterial color="#000000" />
                            </mesh>
                        ))}
                    </group>
                ))}

                {/* Additional road markers - white dashed lines */}
                {[40 - 3, 40 + 3].map((x, i) => (
                    <group key={`marker-${i}`}>
                        {[...Array(6)].map((_, j) => (
                            <mesh key={`dash-${i}-${j}`} position={[x, 0.025, -35 + j * 3 - 7]}>
                                <planeGeometry args={[0.3, 1.5]} />
                                <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.3} />
                            </mesh>
                        ))}
                    </group>
                ))}
            </group>
        );
    };

    // SURROUNDING BUILDINGS - Mixed Indian Architecture with Shops & Commercial
    const SurroundingBuildings = () => {
        const buildings = [
            // NE corner
            { pos: [40 + 12, 0, -35 - 12], size: [6, 4, 8], height: 4, color: '#E8D4C0', type: 'shop' },
            { pos: [40 + 16, 0, -35 - 16], size: [5, 3.5, 6], height: 3, color: '#F5E6D3', type: 'residential' },
            { pos: [40 + 8, 0, -35 - 8], size: [4, 2.5, 5], height: 2, color: '#D4A76A', type: 'shop' },

            // SE corner
            { pos: [40 + 12, 0, -35 + 12], size: [7, 4, 8], height: 3.5, color: '#D9D2C5', type: 'shop' },
            { pos: [40 + 16, 0, -35 + 16], size: [5.5, 3, 7], height: 2.5, color: '#E8D4C0', type: 'residential' },
            { pos: [40 + 8, 0, -35 + 8], size: [4, 2.5, 5], height: 2.5, color: '#D4A76A', type: 'shop' },

            // NW corner
            { pos: [40 - 12, 0, -35 - 12], size: [6, 3.5, 8], height: 3, color: '#F0E8DD', type: 'residential' },
            { pos: [40 - 16, 0, -35 - 16], size: [5, 4, 6], height: 2.5, color: '#E8D4C0', type: 'shop' },
            { pos: [40 - 8, 0, -35 - 8], size: [4, 2.5, 5], height: 2.2, color: '#D4A76A', type: 'shop' },

            // SW corner
            { pos: [40 - 12, 0, -35 + 12], size: [7, 3, 8], height: 3.5, color: '#D9D2C5', type: 'shop' },
            { pos: [40 - 16, 0, -35 + 16], size: [5.5, 4, 7], height: 3, color: '#F5E6D3', type: 'residential' },
            { pos: [40 - 8, 0, -35 + 8], size: [4, 2.5, 5], height: 2.3, color: '#D4A76A', type: 'shop' },
        ];

        return (
            <group>
                {buildings.map((b, i) => (
                    <group key={`bldg-${i}`}>
                        {/* Building body */}
                        <mesh position={[b.pos[0], b.height / 2, b.pos[2]]}>
                            <boxGeometry args={[b.size[0], b.height, b.size[2]]} />
                            <meshStandardMaterial color={b.color} roughness={0.7} metalness={0.1} />
                        </mesh>

                        {/* Shop front signage for commercial buildings */}
                        {b.type === 'shop' && (
                            <mesh position={[b.pos[0], b.height - 0.3, b.pos[2] - b.size[2] / 2 + 0.1]}>
                                <boxGeometry args={[b.size[0] - 0.5, 0.6, 0.2]} />
                                <meshStandardMaterial color="#FF6600" emissive="#FF6600" emissiveIntensity={0.3} metalness={0.6} />
                            </mesh>
                        )}
                    </group>
                ))}
            </group>
        );
    };

    // STREET FURNITURE & UTILITIES
    const StreetFurniture = () => {
        return (
            <group>
                {/* Electric poles with transformers */}
                {[[40 - 10, -35 - 10], [40 + 10, -35 - 10], [40 + 10, -35 + 10], [40 - 10, -35 + 10]].map((pos, i) => (
                    <group key={`pole-${i}`} position={[pos[0], 0, pos[1]]}>
                        {/* Pole */}
                        <mesh position={[0, 2.5, 0]}>
                            <cylinderGeometry args={[0.08, 0.1, 5, 8]} />
                            <meshStandardMaterial color="#4A4A4A" roughness={0.9} />
                        </mesh>

                        {/* Transformer box */}
                        <mesh position={[0, 1, 0]}>
                            <boxGeometry args={[0.8, 0.8, 0.6]} />
                            <meshStandardMaterial color="#5A5A5A" roughness={0.8} metalness={0.4} />
                        </mesh>

                        {/* Power lines connectors */}
                        <pointLight position={[0, 5, 0]} intensity={0.3} distance={10} />
                    </group>
                ))}

                {/* Streetlights */}
                {[[40 - 6, -35 - 8], [40 + 6, -35 - 8], [40 + 6, -35 + 8], [40 - 6, -35 + 8]].map((pos, i) => (
                    <group key={`light-${i}`} position={[pos[0], 0, pos[1]]}>
                        <mesh position={[0, 2.5, 0]}>
                            <cylinderGeometry args={[0.05, 0.08, 5, 6]} />
                            <meshStandardMaterial color="#2A2A2A" roughness={0.9} />
                        </mesh>
                        <mesh position={[0, 5, 0]}>
                            <sphereGeometry args={[0.25, 8, 8]} />
                            <meshStandardMaterial color="#FFDD99" emissive="#FFDD99" emissiveIntensity={0.4} metalness={0.7} />
                        </mesh>
                        <pointLight position={[pos[0], 5.2, pos[1]]} intensity={1} distance={15} color="#FFDD99" />
                    </group>
                ))}

                {/* Benches */}
                {[[40 - 8, -35 + 5], [40 + 8, -35 + 5]].map((pos, i) => (
                    <group key={`bench-${i}`} position={[pos[0], 0, pos[1]]}>
                        <mesh position={[0, 0.4, 0]}>
                            <boxGeometry args={[2.5, 0.1, 0.4]} />
                            <meshStandardMaterial color="#8B7355" roughness={0.8} />
                        </mesh>
                        {[[-1, 0], [1, 0]].map((leg, j) => (
                            <mesh key={`leg-${j}`} position={[leg[0], 0.2, 0]}>
                                <boxGeometry args={[0.2, 0.4, 0.3]} />
                                <meshStandardMaterial color="#696969" />
                            </mesh>
                        ))}
                    </group>
                ))}

                {/* Trees around the square */}
                {[[40 - 10, -35 - 10], [40 + 10, -35 - 10], [40 + 10, -35 + 10], [40 - 10, -35 + 10], [40 - 5, -35], [40 + 5, -35]].map((pos, i) => (
                    <group key={`tree-${i}`} position={[pos[0], 0, pos[1]]}>
                        <mesh position={[0, 1.5, 0]}>
                            <cylinderGeometry args={[0.2, 0.3, 3, 8]} />
                            <meshStandardMaterial color="#654321" roughness={0.95} />
                        </mesh>
                        <mesh position={[0, 3.5, 0]}>
                            <sphereGeometry args={[1.5, 12, 12]} />
                            <meshStandardMaterial color="#2D5A27" roughness={0.85} />
                        </mesh>
                    </group>
                ))}
            </group>
        );
    };

    // VEHICLES - Indian Traffic (Busy Urban Scene with Extended Roads Traffic)
    const Vehicles = () => {
        const VehicleModel = ({ pos, rot, type, color }: { pos: [number, number, number], rot: number, type: 'car' | 'bike' | 'auto' | 'bus', color?: string }) => {
            if (type === 'bike') {
                const bikeColor = color || "#1A1A1A";
                return (
                    <group position={pos} rotation={[0, rot, 0]} castShadow>
                        <mesh><boxGeometry args={[0.6, 0.5, 1.5]} /><meshStandardMaterial color={bikeColor} metalness={0.8} /></mesh>
                        <mesh position={[0.3, 0.25, 0.5]}><cylinderGeometry args={[0.2, 0.2, 0.1, 12]} /><meshStandardMaterial color="#333" metalness={0.9} /></mesh>
                        <mesh position={[-0.3, 0.25, 0.5]}><cylinderGeometry args={[0.2, 0.2, 0.1, 12]} /><meshStandardMaterial color="#333" metalness={0.9} /></mesh>
                        <mesh position={[0, 0.4, 0]}><boxGeometry args={[0.1, 0.3, 0.8]} /><meshStandardMaterial color="#DAA520" metalness={0.7} /></mesh>
                    </group>
                );
            } else if (type === 'auto') {
                const autoColor = color || "#FFAA00";
                return (
                    <group position={pos} rotation={[0, rot, 0]} castShadow>
                        <mesh><boxGeometry args={[1.2, 1.2, 2]} /><meshStandardMaterial color={autoColor} metalness={0.4} roughness={0.6} /></mesh>
                        <mesh position={[0, 1.3, 0]}><boxGeometry args={[1.1, 0.8, 1.2]} /><meshStandardMaterial color={autoColor} opacity={0.7} transparent /></mesh>
                        <mesh position={[0.4, 0.35, 0.4]}><cylinderGeometry args={[0.25, 0.25, 0.15, 12]} /><meshStandardMaterial color="#222" metalness={0.95} /></mesh>
                        <mesh position={[-0.4, 0.35, 0.4]}><cylinderGeometry args={[0.25, 0.25, 0.15, 12]} /><meshStandardMaterial color="#222" metalness={0.95} /></mesh>
                    </group>
                );
            } else if (type === 'bus') {
                const busColor = color || "#FF6600";
                return (
                    <group position={pos} rotation={[0, rot, 0]} castShadow>
                        <mesh><boxGeometry args={[1.8, 2, 4]} /><meshStandardMaterial color={busColor} metalness={0.3} roughness={0.7} /></mesh>
                        <mesh position={[0, 2.5, 0]}><boxGeometry args={[1.7, 1.5, 3.5]} /><meshStandardMaterial color={busColor} opacity={0.6} transparent /></mesh>
                        <mesh position={[0.6, 0.5, 0.8]}><cylinderGeometry args={[0.35, 0.35, 0.2, 12]} /><meshStandardMaterial color="#222" metalness={0.95} /></mesh>
                        <mesh position={[-0.6, 0.5, 0.8]}><cylinderGeometry args={[0.35, 0.35, 0.2, 12]} /><meshStandardMaterial color="#222" metalness={0.95} /></mesh>
                    </group>
                );
            }
            // car
            const carColor = color || "#003399";
            return (
                <group position={pos} rotation={[0, rot, 0]} castShadow>
                    <mesh><boxGeometry args={[1.4, 0.8, 3]} /><meshStandardMaterial color={carColor} metalness={0.7} roughness={0.5} /></mesh>
                    <mesh position={[0, 0.9, 0.2]}><boxGeometry args={[1.2, 0.6, 1.5]} /><meshStandardMaterial color={carColor} opacity={0.6} transparent /></mesh>
                    <mesh position={[0.4, 0.3, 0.4]}><cylinderGeometry args={[0.25, 0.25, 0.15, 12]} /><meshStandardMaterial color="#222" metalness={0.95} /></mesh>
                    <mesh position={[-0.4, 0.3, 0.4]}><cylinderGeometry args={[0.25, 0.25, 0.15, 12]} /><meshStandardMaterial color="#222" metalness={0.95} /></mesh>
                    <mesh position={[0.5, 0.45, 2.8]}><boxGeometry args={[0.4, 0.3, 0.3]} /><meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.3} /></mesh>
                    <mesh position={[-0.5, 0.45, 2.8]}><boxGeometry args={[0.4, 0.3, 0.3]} /><meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.3} /></mesh>
                </group>
            );
        };

        return (
            <group>
                {/* Central square - East-West road traffic */}
                <VehicleModel pos={[40 - 3, 0.2, -35 - 3]} rot={0} type="car" color="#003399" />
                <VehicleModel pos={[40 + 2, 0.2, -35 + 2]} rot={Math.PI} type="auto" color="#FFAA00" />
                <VehicleModel pos={[40 - 2, 0.2, -35 + 4]} rot={Math.PI / 2} type="bike" color="#FF3300" />
                <VehicleModel pos={[40 + 4, 0.2, -35 - 4]} rot={-Math.PI / 2} type="bus" color="#FF6600" />

                {/* Central square - North-South road traffic */}
                <VehicleModel pos={[40 - 5, 0.2, -35 - 3]} rot={Math.PI / 2} type="car" color="#000099" />
                <VehicleModel pos={[40 + 5, 0.2, -35 + 5]} rot={-Math.PI / 2} type="bike" color="#FF9900" />
                <VehicleModel pos={[40 - 1, 0.2, -35 - 6]} rot={0} type="auto" color="#FF5500" />
                <VehicleModel pos={[40 + 3, 0.2, -35 + 3]} rot={Math.PI} type="bike" color="#CC0000" />

                {/* NORTH ROAD (Vertical - extending to +60 Z) */}
                <VehicleModel pos={[40, 0.2, -10]} rot={Math.PI / 2} type="car" color="#0066CC" />
                <VehicleModel pos={[40, 0.2, 5]} rot={Math.PI / 2} type="auto" color="#FFCC00" />
                <VehicleModel pos={[40, 0.2, 20]} rot={Math.PI / 2} type="bus" color="#FF7700" />
                <VehicleModel pos={[40, 0.2, 35]} rot={Math.PI / 2} type="car" color="#003366" />
                <VehicleModel pos={[40, 0.2, 50]} rot={Math.PI / 2} type="bike" color="#FF4444" />
                <VehicleModel pos={[40, 0.2, 58]} rot={Math.PI / 2} type="auto" color="#FF8800" />
                <VehicleModel pos={[40, 0.2, 45]} rot={-Math.PI / 2} type="bike" color="#990000" />

                {/* SOUTH ROAD (Vertical - extending to -60 Z) */}
                <VehicleModel pos={[40, 0.2, -50]} rot={-Math.PI / 2} type="car" color="#006699" />
                <VehicleModel pos={[40, 0.2, -30]} rot={-Math.PI / 2} type="auto" color="#FFBBBB" />
                <VehicleModel pos={[40, 0.2, -15]} rot={-Math.PI / 2} type="bus" color="#FF5500" />
                <VehicleModel pos={[40, 0.2, -58]} rot={-Math.PI / 2} type="car" color="#003399" />
                <VehicleModel pos={[40, 0.2, -45]} rot={-Math.PI / 2} type="bike" color="#FF6666" />
                <VehicleModel pos={[40, 0.2, -52]} rot={-Math.PI / 2} type="auto" color="#FFAA44" />
                <VehicleModel pos={[40, 0.2, -38]} rot={Math.PI / 2} type="bike" color="#CC3333" />

                {/* WEST ROAD (Horizontal - extending to -60 X) */}
                <VehicleModel pos={[10, 0.2, -35]} rot={0} type="car" color="#0033CC" />
                <VehicleModel pos={[-8, 0.2, -35]} rot={0} type="auto" color="#FFDD00" />
                <VehicleModel pos={[-25, 0.2, -35]} rot={0} type="bus" color="#FF8800" />
                <VehicleModel pos={[-45, 0.2, -35]} rot={0} type="car" color="#004488" />
                <VehicleModel pos={[-58, 0.2, -35]} rot={0} type="bike" color="#FF5555" />
                <VehicleModel pos={[-40, 0.2, -35]} rot={0} type="auto" color="#FFAA55" />
                <VehicleModel pos={[-52, 0.2, -35]} rot={Math.PI} type="bike" color="#BB2222" />

                {/* EAST ROAD (Horizontal - extending to +60 X) */}
                <VehicleModel pos={[58, 0.2, -35]} rot={Math.PI} type="car" color="#0055DD" />
                <VehicleModel pos={[45, 0.2, -35]} rot={Math.PI} type="auto" color="#FFCC33" />
                <VehicleModel pos={[60, 0.2, -35]} rot={Math.PI} type="bus" color="#FF7733" />
                <VehicleModel pos={[50, 0.2, -35]} rot={0} type="car" color="#002266" />
                <VehicleModel pos={[55, 0.2, -35]} rot={0} type="bike" color="#FF4444" />

                {/* UPPER HORIZONTAL ROADS */}
                <VehicleModel pos={[10, 0.2, 50]} rot={0} type="car" color="#0033AA" />
                <VehicleModel pos={[30, 0.2, 50]} rot={0} type="auto" color="#FFBB00" />
                <VehicleModel pos={[-20, 0.2, 50]} rot={0} type="bike" color="#FF6655" />
                <VehicleModel pos={[-45, 0.2, 50]} rot={0} type="bus" color="#FF7700" />
                <VehicleModel pos={[55, 0.2, 50]} rot={Math.PI} type="car" color="#003399" />
                <VehicleModel pos={[50, 0.2, 50]} rot={Math.PI} type="bike" color="#DD3333" />
                <VehicleModel pos={[-55, 0.2, 50]} rot={Math.PI} type="auto" color="#FFAA66" />
                <VehicleModel pos={[25, 0.2, 50]} rot={Math.PI} type="bus" color="#FF6600" />
            </group>
        );
    };

    // PEDESTRIANS - Indian pedestrians with casual and traditional clothing
    const Pedestrians = () => {
        const Person = ({ pos, skinColor, shirtColor, clothing }: { pos: [number, number, number], skinColor: string, shirtColor: string, clothing: 'casual' | 'traditional' }) => (
            <group position={pos} castShadow>
                {/* Head */}
                <mesh><sphereGeometry args={[0.15, 10, 10]} /><meshStandardMaterial color={skinColor} roughness={0.9} /></mesh>

                {/* Body - Shirt/Upper clothing */}
                <mesh position={[0, -0.35, 0]}><boxGeometry args={[0.3, 0.45, 0.25]} /><meshStandardMaterial color={shirtColor} roughness={0.85} /></mesh>

                {/* Pants/Traditional clothing */}
                {clothing === 'traditional' ? (
                    <mesh position={[0, -0.65, 0]}><boxGeometry args={[0.35, 0.3, 0.25]} /><meshStandardMaterial color="#4A4A4A" roughness={0.9} /></mesh>
                ) : (
                    <mesh position={[0, -0.65, 0]}><boxGeometry args={[0.3, 0.3, 0.25]} /><meshStandardMaterial color="#1A1A1A" roughness={0.85} /></mesh>
                )}

                {/* Arms - Left */}
                <mesh position={[-0.2, -0.35, 0]}><boxGeometry args={[0.1, 0.35, 0.12]} /><meshStandardMaterial color={skinColor} roughness={0.9} /></mesh>

                {/* Arms - Right */}
                <mesh position={[0.2, -0.35, 0]}><boxGeometry args={[0.1, 0.35, 0.12]} /><meshStandardMaterial color={skinColor} roughness={0.9} /></mesh>

                {/* Legs - Left */}
                <mesh position={[-0.1, -0.75, 0]}><boxGeometry args={[0.12, 0.3, 0.15]} /><meshStandardMaterial color={skinColor} roughness={0.9} /></mesh>

                {/* Legs - Right */}
                <mesh position={[0.1, -0.75, 0]}><boxGeometry args={[0.12, 0.3, 0.15]} /><meshStandardMaterial color={skinColor} roughness={0.9} /></mesh>
            </group>
        );

        return (
            <group>
                {/* On zebra crossing */}
                <Person pos={[40 - 3, 0.05, -35 - 6.5]} skinColor="#C19A6B" shirtColor="#FF6600" clothing="casual" />
                <Person pos={[40 + 2, 0.05, -35 - 6.5]} skinColor="#D2B48C" shirtColor="#0066FF" clothing="traditional" />
                <Person pos={[40 - 1, 0.05, -35 - 6.5]} skinColor="#C19A6B" shirtColor="#FFFF00" clothing="casual" />

                {/* On sidewalk south */}
                <Person pos={[40 + 4.5, 0.05, -35 - 5]} skinColor="#D2B48C" shirtColor="#FF3366" clothing="traditional" />
                <Person pos={[40 - 4.5, 0.05, -35 - 5.5]} skinColor="#C19A6B" shirtColor="#00FF00" clothing="casual" />

                {/* On zebra crossing - vertical */}
                <Person pos={[40 + 6.5, 0.05, -35 - 2]} skinColor="#D2B48C" shirtColor="#FF6600" clothing="casual" />
                <Person pos={[40 + 6.5, 0.05, -35 + 2]} skinColor="#C19A6B" shirtColor="#6600FF" clothing="traditional" />

                {/* On sidewalk - other sides */}
                <Person pos={[40 - 5, 0.05, -35 - 3]} skinColor="#C19A6B" shirtColor="#00CCFF" clothing="casual" />
                <Person pos={[40 + 5, 0.05, -35 + 5]} skinColor="#D2B48C" shirtColor="#FF9900" clothing="traditional" />
            </group>
        );
    };

    // SIGNBOARDS AND TEXT
    const Signboards = () => {
        return (
            <group>
                {/* Street name signs */}
                <mesh position={[40 - 15, 3, -35]}>
                    <boxGeometry args={[3, 0.8, 0.1]} />
                    <meshStandardMaterial color="#FFFFFF" roughness={0.5} metalness={0.5} />
                </mesh>

                {/* Direction signs */}
                {[[40 - 10, -35 - 10], [40 + 10, -35 - 10], [40 + 10, -35 + 10], [40 - 10, -35 + 10]].map((pos, i) => (
                    <group key={`sign-${i}`} position={[pos[0], 2, pos[1]]}>
                        <mesh><boxGeometry args={[1.5, 0.6, 0.1]} /><meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.2} /></mesh>
                    </group>
                ))}
            </group>
        );
    };

    // DUST AND ATMOSPHERE
    const DustParticles = () => (
        <group>
            <mesh position={[40, 2, -35]}>
                <sphereGeometry args={[25, 16, 16]} />
                <meshStandardMaterial color="#D4A574" transparent opacity={0.05} side={THREE.BackSide} />
            </mesh>
        </group>
    );

    // GROUND
    const Ground = () => (
        <mesh position={[40, 0, -35]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#5A5A5A" roughness={0.95} />
        </mesh>
    );

    return (
        <group>
            <Ground />
            <RoadsAndMarkings />
            <CentralMonument />
            {/* COMMENTED OUT: All detailed infrastructure - User requested clean square */}
            {/* <TrafficInfrastructure /> */}
            {/* <SurroundingBuildings /> */}
            {/* <StreetFurniture /> */}
            {/* <Signboards /> */}
            {/* <Vehicles /> */}
            {/* <Pedestrians /> */}
            {/* <DustParticles /> */}
        </group>
    );
};

const StatueModel = ({ position, scale = [1, 1, 1], rotation = [0, 0, 0] }: { position: [number, number, number], scale?: [number, number, number], rotation?: [number, number, number] }) => {
    // Check cache for statue model
    const cachedModel = getCachedModel('statue_model');

    if (cachedModel) {
        console.log('✅ Using cached statue model');
        return <primitive object={cachedModel.scene} position={position} scale={scale} rotation={rotation} />;
    }

    const { scene } = useGLTF(statueModel);

    if (!scene) {
        return (
            <mesh position={position} scale={[1, 1, 1]}>
                <boxGeometry args={[1, 2, 1]} />
                <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
            </mesh>
        );
    }

    // Cache the loaded model
    cacheModel('statue_model', { scene, animations: [], cameras: [], asset: {}, parser: null, scenes: [scene], userData: {} });
    console.log('💾 Statue model cached successfully');
    
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

// COMMENTED OUT: Car component - Driving feature disabled
/*
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
*/

// COMMENTED OUT: DrivingCamera component - Driving feature disabled
/*
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
*/

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
            
            {/* Added Area Labels Component */}
            <AreaLabels />

            {/* TREES COMMENTED OUT */}
            {/* <SmartFoliage /> */}
            {/* <SingleHugeTree position={[-24, 0, 6]} height={6} /> */}

            <Streetlights />

            {/* GOLE KA MANDIR SQUARE - Detailed 3D Model */}
            <GoleKaMandirSquare />

            {/* Other campus buildings */}
            {BUILDINGS.filter(b => b.id !== 'gkm-square').map((b) => (
                <Building key={b.id} data={b} textures={textures} showLabels={!isDriving} />
            ))}
            
            {/* This static label is now handled by AreaLabels component, keeping code clean */}
            {/* <Text position={[-25, 0.1, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} fontSize={1.5} color={THEME.primary}>MELA ROAD</Text> */}
            
            <StatueModel position={[15, 1.5, -18.5]} scale={[1.5, 1.5, 1.5]} rotation={[0, Math.PI * 1.5, 0]} />
            {/* COMMENTED OUT: Car rendering - Driving feature disabled */}
            {/* {isDriving && <Car position={carPosition} rotation={carRotation} />} */}
        </group>
    );
};

// COMMENTED OUT: MobileControls component - Driving feature disabled
const MobileControls = ({ onMove }: { onMove: (x: number, y: number) => void }) => {
    return null;
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

    // Clear geometry cache on mount to prevent Three.js errors
    useEffect(() => {
        import('@/utils/cache').then(({ assetCache }) => {
            assetCache.clear();
        });
    }, []);


    useEffect(() => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) { setWebglSupported(false); setIsLoading(false); return; }
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // COMMENTED OUT: Keyboard handlers for driving - Driving feature disabled
    /*
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
    */

    // COMMENTED OUT: Physics loop for car driving - Driving feature disabled
    /*
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
    */

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
            <MainNavigation />
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
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4">CAMPUS EXPLORER</h1>
                <div className="h-1 w-[100px] bg-primary mx-auto shadow-neon" />
                <p className="mt-4 text-xs md:text-sm font-share-tech text-muted-foreground tracking-[0.4em] uppercase opacity-60 max-w-2xl mx-auto px-4">// EXPLORE MITS CAMPUS IN 3D</p>
            </div>
            <div className="container mx-auto px-4 pb-12">
                <div className="relative w-full overflow-hidden transition-all duration-500 rounded-xl border-2 border-white/10" style={{ height: 'calc(100vh - 320px)', minHeight: '400px', boxShadow: '0 0 60px rgba(188,19,254,0.2), inset 0 0 30px rgba(0,0,0,0.5)' }}>
                    {webglSupported ? (
                        <Canvas camera={{ position: [30, 25, 30], fov: 45 }} gl={{ antialias: true, alpha: true, stencil: false, depth: true, powerPreference: 'high-performance' }} dpr={Math.min(window.devicePixelRatio, 2)} style={{ width: '100%', height: '100%' }}>
                            <Suspense fallback={null}>
                                <PerspectiveCamera makeDefault position={[30, 25, 30]} fov={45} />
                                <OrbitControls autoRotate={true} autoRotateSpeed={0.5} enableZoom={true} enablePan={true} minDistance={5} maxDistance={60} minPolarAngle={0} maxPolarAngle={Math.PI / 2} zoomToCursor={true} />
                                {/* COMMENTED OUT: DrivingCamera - Driving feature disabled */}
                                {/* {isDriving && (<DrivingCamera carPosition={carPosition} carRotation={carRotation} viewMode={viewMode} speed={speed} />)} */}
                                <ambientLight intensity={0.5} />
                                <pointLight position={[20, 30, 20]} intensity={1.5} />
                                <pointLight position={[-20, 25, -20]} intensity={0.8} color="#00A6FF" />
                                {/* Lights for Gole Ka Mandir Square area */}
                                <pointLight position={[40, 25, -35]} intensity={2} distance={60} color="#FFDD99" />
                                <pointLight position={[40, 20, -35]} intensity={1.2} distance={50} color="#FFFFFF" />
                                <directionalLight position={[50, 40, -50]} intensity={0.6} castShadow />
                                <pointLight position={[40, 8, -35]} intensity={0.8} distance={30} color="#FFAA00" />
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
                    <div className="absolute inset-0 pointer-events-none scanlines opacity-20" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,1,13,0.8) 100%)' }} />
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[{ icon: '🎓', title: 'Main Gate', desc: 'Historic entrance since 1957' }, { icon: '🤖', title: 'AI Department', desc: 'State-of-the-art research facility' }, { icon: '📚', title: 'Central Library', desc: 'Over 100,000 books & resources' }].map((item, idx) => (
                        <div key={idx} className="group relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-lg p-4 hover:border-primary transition-all duration-500" style={{ boxShadow: '0 0 30px rgba(188,19,254,0.05)' }}>
                            <div className="text-3xl md:text-4xl mb-3">{item.icon}</div>
                            <h3 className="text-base md:text-lg font-black text-white group-hover:text-primary transition-colors mb-2">{item.title}</h3>
                            <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
    );
};

export default CampusExplorer;
