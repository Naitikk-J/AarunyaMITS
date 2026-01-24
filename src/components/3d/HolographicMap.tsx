import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

// --- Types ---
interface BuildingData {
    id: string;
    name: string;
    hindiName: string;
    // Position: [x, z], Size: [width, length], Height
    position: [number, number];
    size: [number, number];
    height: number;
    type?: 'complex' | 'simple' | 'landmark' | 'curved';
    icon?: string;
    color?: string;
    rotationY?: number; // Y-axis rotation in radians
}

// --- Configuration --- Kidcore Theme
const THEME = {
    primary: '#BC13FE',     // Neon Purple
    secondary: '#00FFFF',   // Cyan
    accent: '#FF0080',      // Hot Pink
    lime: '#00FF00',        // Lime Green
    yellow: '#FFDD33',      // Sunflower Yellow
    ground: '#05010D',      // Grit Black
    groundLight: '#1B065E', // Deep Purple
    groundDark: '#0D0221',  // Near Black
    black: '#05010D',       // Grit Black
    glow: '#BC13FE',        // Purple Glow
    glassOpacity: 0.2,
    edgeOpacity: 0.9,
    stoneBeige: '#1B065E',  // Deep Purple Base
    stoneShadow: '#0D0221'  // Darker shadow
};

// --- Data: Mapped to the Diamond Layout ---
const BUILDINGS: BuildingData[] = [
    // Top Corner
    { id: 'main-gate', name: 'MITS Main Gate', hindiName: 'मुख्य द्वार', position: [5, -25], size: [4, 2], height: 2, type: 'landmark', icon: '🎓', color: '#BC13FE' },

    // Left Wing
    { id: 'old-building', name: 'Old Building', hindiName: 'सिविल विभाग', position: [-6, -10], size: [16, 7], height: 2.5, type: 'complex', color: '#1B065E' },
    { id: 'canteen', name: 'Canteen', hindiName: 'कैंटीन', position: [-15, -12], size: [4, 4], height: 1.5, type: 'simple', icon: '🍽️', color: '#1B065E' },
    { id: 'ai-department', name: 'AI department', hindiName: 'एआई विभाग', position: [-3, 4], size: [9, 5], height: 6, type: 'simple', icon: '🤖', color: '#BC13FE' },
    { id: 'library', name: 'Central Library', hindiName: 'पुस्तकालय', position: [-7, -16], size: [4, 3], height: 3, type: 'complex', icon: '📚', color: '#1B065E' },

    // Center Grounds
    { id: 'stage-ground', name: 'stage ground', hindiName: 'स्टेज ग्राउंड', position: [-5, -22], size: [15, 6], height: 0.2, type: 'landmark', color: '#BC13FE' },
    { id: 'ai-ground', name: 'AI ground', hindiName: 'एआई ग्राउंड', position: [-3, -2], size: [9, 7], height: 0.2, type: 'landmark', color: '#00FFFF' },
    { id: 'statue-ground', name: 'statue ground', hindiName: 'स्टैच्यू ग्राउंड', position: [15, -18.5], size: [10, 10], height: 0.2, type: 'landmark', color: '#BC13FE' },
    { id: 'football-ground', name: 'football ground', hindiName: 'फुटबॉल ग्राउंड', position: [-5, 22], size: [30, 15], height: 0.2, type: 'landmark', color: '#00FFFF' },

    // Right Wing
    { id: 'biotech', name: 'Biotech Dept', hindiName: 'जैव प्रौद्योगिकी', position: [15, -11], size: [5, 5], height: 2.5, type: 'simple', color: '#1B065E' },
    { id: 'dispensary', name: 'Dispensary', hindiName: 'औषधालय', position: [15, -4], size: [4, 4], height: 1.5, type: 'simple', icon: 'H', color: '#FF0080' },

    // Bottom Section
    { id: 'architecture', name: 'Architecture Dept', hindiName: 'वास्तुकला', position: [-10, -3], size: [4, 4], height: 2.8, type: 'complex', color: '#1B065E' },
    { id: 'mechanical-dept', name: 'Mechanical Dept', hindiName: 'मैकेनिकल विभाग', position: [0, -5.5], size: [4, 4], height: 2.8, type: 'complex', color: '#1B065E' },
    { id: 'statue-base', name: 'statue base', hindiName: 'स्टैच्यू आधार', position: [15, -18.5], size: [2, 2], height: 1.5, type: 'simple', color: '#BC13FE' },
    { id: 'statue', name: 'statue', hindiName: 'मूर्ति', position: [15, -18.5], size: [1, 1], height: 3, type: 'simple', color: '#00FFFF' },
    { id: 'mits-main', name: 'mechanical workshop', hindiName: 'मैकेनिकल वर्कशॉप', position: [0, 15], size: [7, 5], height: 3.5, type: 'complex', icon: '⚙️', color: '#1B065E' },

    // Bottom Corner
    { id: 'diamond-gate', name: 'Diamond Jubilee Gate', hindiName: 'डायमंड गेट', position: [-20, 16], size: [4, 1], height: 2, type: 'landmark', color: '#BC13FE', rotationY: Math.PI / 2 },
];

const ROADS = [
    { points: [[-16, -20], [16, -20], [16, 20], [-16, 20], [-16, -20]] },
    { points: [[-18, -18], [18, 18]] },
    { points: [[-5, -5], [5, -5], [5, 5], [-5, 5], [-5, -5]] },
    { points: [[5, -25], [5, -20], [0, -10]] },
];

// --- Textures Generation (Globalized for performance) ---

const generateStoneTexture = (color: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 512, 512);
    const imageData = ctx.getImageData(0, 0, 512, 512);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 20;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
    }
    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
};

const generateMetallicGroundTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#05010D';
    ctx.fillRect(0, 0, 1024, 1024);
    const imageData = ctx.getImageData(0, 0, 1024, 1024);
    const data = imageData.data;
    for (let y = 0; y < 1024; y++) {
        for (let x = 0; x < 1024; x++) {
            const idx = (y * 1024 + x) * 4;
            const brushNoise = Math.sin(x * 0.1) * 5;
            const roughNoise = (Math.random() - 0.5) * 10;
            data[idx] += brushNoise + roughNoise;
            data[idx + 1] += brushNoise + roughNoise;
            data[idx + 2] += brushNoise + roughNoise + 5;
        }
    }
    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.repeat.set(4, 4);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
};

// --- Components ---

const NeonEdges = ({ geometry, color = THEME.primary }: { geometry: THREE.BufferGeometry, color?: string }) => {
    return (
        <lineSegments>
            <edgesGeometry args={[geometry]} />
            <lineBasicMaterial color={color} transparent opacity={0.6} linewidth={1} />
        </lineSegments>
    );
};

const Building = ({ data, onHover, onClick, showLabels = false, visualMode = 'normal', textures }: { data: BuildingData, onHover: any, onClick: any, showLabels?: boolean, visualMode?: 'normal' | 'wireframe' | 'neon', textures: any }) => {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    const animationRef = useRef<gsap.core.Timeline | null>(null);

    const geometry = useMemo(() => {
        if (data.type === 'complex') {
            const shape = new THREE.Shape();
            const w = data.size[0] / 2;
            const h = data.size[1] / 2;
            const bevel = 0.5;
            shape.moveTo(-w + bevel, -h);
            shape.lineTo(w - bevel, -h);
            shape.quadraticCurveTo(w, -h, w, -h + bevel);
            shape.lineTo(w, h - bevel);
            shape.quadraticCurveTo(w, h, w - bevel, h);
            shape.lineTo(-w + bevel, h);
            shape.quadraticCurveTo(-w, h, -w, h - bevel);
            shape.lineTo(-w, -h + bevel);
            shape.quadraticCurveTo(-w, -h, -w + bevel, -h);

            const holePath = new THREE.Path();
            const pad = 1.5;
            holePath.moveTo(-w + pad, -h + pad);
            holePath.lineTo(w - pad, -h + pad);
            holePath.lineTo(w - pad, h - pad);
            holePath.lineTo(-w + pad, h - pad);
            shape.holes.push(holePath);

            return new THREE.ExtrudeGeometry(shape, { depth: data.height, bevelEnabled: true, bevelThickness: 0.2, bevelSize: 0.1 });
        } else if (data.type === 'curved') {
            return new THREE.CylinderGeometry(data.size[0] / 2, data.size[0] / 2, data.height, 32);
        } else if (data.id.includes('gate')) {
            return new THREE.TorusGeometry(data.size[0] / 2, 0.4, 16, 32, Math.PI);
        }
        return new THREE.BoxGeometry(data.size[0], data.height, data.size[1]);
    }, [data]);

    useFrame((state) => {
        if (!mesh.current) return;
        if (!hovered) {
            mesh.current.position.y = (data.height / 2) + Math.sin(state.clock.getElapsedTime() * 1.5 + data.position[0]) * 0.05;
        }
    });

    const handlePointerOver = (e: any) => {
        e.stopPropagation();
        setHover(true);
        onHover(data.id);
        document.body.style.cursor = 'pointer';
        if (animationRef.current) animationRef.current.kill();
        animationRef.current = gsap.timeline();
        animationRef.current.to(mesh.current!.position, { y: (data.height / 2) + 0.5, duration: 0.3, ease: 'back.out' });
        animationRef.current.to(mesh.current!.scale, { x: 1.05, y: 1.05, z: 1.05, duration: 0.3, ease: 'back.out' }, 0);
    };

    const handlePointerOut = () => {
        setHover(false);
        onHover(null);
        document.body.style.cursor = 'default';
        if (animationRef.current) animationRef.current.kill();
        animationRef.current = gsap.timeline();
        animationRef.current.to(mesh.current!.position, { y: data.height / 2, duration: 0.4, ease: 'elastic.out' });
        animationRef.current.to(mesh.current!.scale, { x: 1, y: 1, z: 1, duration: 0.4, ease: 'elastic.out' }, 0);
    };

    return (
        <group position={[data.position[0], 0, data.position[1]]}>
            <mesh
                ref={mesh}
                geometry={geometry}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={() => onClick(data.id)}
                rotation={[data.type === 'complex' ? -Math.PI / 2 : 0, data.rotationY || 0, 0]}
                castShadow
                receiveShadow
            >
                {visualMode === 'wireframe' ? (
                    <meshBasicMaterial color={data.color || THEME.primary} wireframe transparent opacity={0.6} />
                ) : (
                    <meshStandardMaterial
                        map={textures.stone}
                        color={data.color || THEME.stoneBeige}
                        emissive={data.color || THEME.primary}
                        emissiveIntensity={hovered ? 0.5 : 0.1}
                        roughness={0.4}
                        metalness={0.2}
                        transparent
                        opacity={0.85}
                    />
                )}
                <NeonEdges geometry={geometry} color={data.color || THEME.primary} />
            </mesh>

            {showLabels && (
                <Html position={[0, data.height + 1, 0]} center distanceFactor={15}>
                    <div className="bg-black/80 border border-primary px-3 py-1 rounded text-[10px] font-orbitron text-white whitespace-nowrap pointer-events-none shadow-[0_0_10px_rgba(188,19,254,0.5)]">
                        {data.name}
                    </div>
                </Html>
            )}
        </group>
    );
};

const HoloRoads = () => {
    const lines = useMemo(() => {
        return ROADS.map(road => {
            const points = road.points.map(p => new THREE.Vector3(p[0], 0.02, p[1]));
            return new THREE.BufferGeometry().setFromPoints(points);
        });
    }, []);

    return (
        <group>
            {lines.map((geo, i) => (
                <line key={i} geometry={geo}>
                    <lineBasicMaterial color={THEME.secondary} transparent opacity={0.4} />
                </line>
            ))}
        </group>
    );
};

const HolographicTrees = ({ count = 50 }: { count?: number }) => {
    const treeGeometry = useMemo(() => new THREE.ConeGeometry(0.5, 1.5, 8), []);
    const treeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: THEME.primary,
        emissive: THEME.primary,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.7
    }), []);

    const positions = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const r = 26 + Math.random() * 2;
            temp.push([Math.cos(angle) * r, 0.75, Math.sin(angle) * r]);
        }
        return temp;
    }, [count]);

    return (
        <Instances geometry={treeGeometry} material={treeMaterial}>
            {positions.map((pos, i) => (
                <Instance key={i} position={pos as [number, number, number]} />
            ))}
        </Instances>
    );
};

const GrassInstances = () => {
    const grassGeometry = useMemo(() => new THREE.PlaneGeometry(0.2, 0.5), []);
    const grassMaterial = useMemo(() => new THREE.MeshBasicMaterial({
        color: THEME.secondary,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
    }), []);

    const groundAreas = [
        { center: [-5, -22], size: [15, 6] },
        { center: [-3, -2], size: [9, 7] },
        { center: [15, -18.5], size: [10, 10] },
        { center: [-5, 22], size: [30, 15] }
    ];

    const instances = useMemo(() => {
        const temp = [];
        for (const area of groundAreas) {
            for (let i = 0; i < 40; i++) {
                const x = area.center[0] + (Math.random() - 0.5) * area.size[0];
                const z = area.center[1] + (Math.random() - 0.5) * area.size[1];
                temp.push({ position: [x, 0.25, z], rotation: [0, Math.random() * Math.PI, 0] });
            }
        }
        return temp;
    }, []);

    return (
        <Instances geometry={grassGeometry} material={grassMaterial}>
            {instances.map((props, i) => (
                <Instance key={i} {...props as any} />
            ))}
        </Instances>
    );
};

export function HolographicMap({ onBuildingHover, onBuildingClick, isLoading = false, visualMode = 'normal' }: { onBuildingHover: (id: string | null) => void, onBuildingClick: (id: string) => void, isLoading?: boolean, visualMode?: 'normal' | 'wireframe' | 'neon' }) {
    const [showLabels, setShowLabels] = useState(false);
    const textures = useMemo(() => ({
        stone: generateStoneTexture(THEME.stoneBeige),
        ground: generateMetallicGroundTexture()
    }), []);

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => setShowLabels(true), 1000);
            return () => clearTimeout(timer);
        }
        setShowLabels(false);
    }, [isLoading]);

    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight position={[20, 30, 20]} intensity={1} color={THEME.primary} />
            <pointLight position={[-20, 30, -20]} intensity={0.5} color={THEME.secondary} />

            <group rotation={[0, Math.PI / 4, 0]}>
                {/* Ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <circleGeometry args={[30, 64]} />
                    <meshStandardMaterial
                        map={textures.ground}
                        color="#05010D"
                        metalness={0.8}
                        roughness={0.2}
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                <HoloRoads />
                <HolographicTrees />
                <GrassInstances />

                {BUILDINGS.map((building) => (
                    <Building
                        key={building.id}
                        data={building}
                        onHover={onBuildingHover}
                        onClick={onBuildingClick}
                        showLabels={showLabels}
                        visualMode={visualMode}
                        textures={textures}
                    />
                ))}

                <Text
                    position={[-22, 0.5, 0]}
                    rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                    fontSize={1.2}
                    color={THEME.primary}
                >
                    MELA ROAD
                </Text>
            </group>

            {/* Projector Base Look */}
            <mesh position={[0, -0.5, 0]}>
                <cylinderGeometry args={[31, 28, 1, 64]} />
                <meshStandardMaterial color="#05010D" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[30, 30.5, 64]} />
                <meshBasicMaterial color={THEME.primary} transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

export { BUILDINGS };
