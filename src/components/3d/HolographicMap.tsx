import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text, Float, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

// --- Types ---
interface BuildingData {
    id: string;
    name: string;
    hindiName: string;
    // Position: [x, z], Size: [width, length], Height
    position: [number, number];
    size: [number, number];
    height: number;
    type?: 'complex' | 'simple' | 'landmark';
    icon?: string;
    color?: string;
    rotation?: number;
}

// --- Configuration --- Realistic Campus Theme
const THEME = {
    primary: '#00A6FF',     // Electric Blue
    secondary: '#FF5E1F',   // Safety Orange
    accent: '#FF85C0',      // Bubblegum Pink
    lime: '#B0FF57',        // Lime Green
    yellow: '#FFDD33',      // Sunflower Yellow
    ground: '#EEEEEE',      // Light Gray Ground
    black: '#1A1A1A',       // Dark Black
    glow: '#FF5E1F',        // Orange Glow
    // Realistic building colors
    concrete: '#C0C0C0',    // Realistic Concrete Gray
    brick: '#A0523D',       // Brick Red
    darkConcrete: '#909090',// Darker Concrete
    glassOpacity: 0.25,
    edgeOpacity: 0.95,
    // Enhanced glow and lighting
    glowIntensity: 0.6,
    emissiveIntensity: 0.2
};

// --- Data: Mapped to the Diamond Layout ---
// The map is rotated 45deg.
export const BUILDINGS: BuildingData[] = [
    // Top Corner
    { id: 'diamond-gate', name: 'MITS Main Gate', hindiName: 'मुख्य द्वार', position: [-20, 16], size: [32.4, 4.05], height: 4.5, type: 'landmark', icon: '🎓', rotation: Math.PI / 2, color: '#A0A0A0' },

    // Left Wing (Civil/Canteen area)
    { id: 'old building', name: 'Old Building', hindiName: 'सिविल विभाग', position: [-6, -10], size: [21.6, 9.45], height: 5, type: 'complex', color: '#B8A899' },
    { id: 'canteen', name: 'Canteen', hindiName: 'कैंटीन', position: [-15, -12], size: [5.4, 5.4], height: 1.5, type: 'simple', icon: '🍽️', color: '#C9B59A' },
    { id: 'AI department', name: 'AI department', hindiName: 'कैंटीन', position: [-3, 4], size: [12.15, 6.75], height: 6, type: 'simple', icon: '🍽️', color: '#B0B0B0' },
    { id: 'library', name: 'Central Library', hindiName: 'पुस्तकालय', position: [-7, -16], size: [5.4, 4.05], height: 3, type: 'complex', icon: '📚', color: '#A8A8A8' },

    // Center - All grounds now green
    { id: 'golden-garden', name: 'stage ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [-5, -22], size: [20.25, 8.1], height: 0.2, type: 'landmark', color: '#3A8D3A' },
    { id: 'golden-garden', name: 'AI ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [-3, -2], size: [12.15, 9.45], height: 0.2, type: 'landmark', color: '#3A8D3A' },
    { id: 'golden-garden', name: 'statue ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [15, -18.5], size: [13.5, 13.5], height: 0.2, type: 'landmark', color: '#3A8D3A' },
    { id: 'golden-garden', name: 'football ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [-5, 22], size: [40.5, 20.25], height: 0.8, type: 'landmark', color: '#3A8D3A' },

    // Right Wing (Biotech/Medical)
    { id: 'biotech', name: 'Biotech Dept', hindiName: 'जैव प्रौद्योगिकी', position: [15, -11], size: [6.75, 6.75], height: 2.5, type: 'simple', color: '#B5B5B5' },
    { id: 'dispensary', name: 'Dispensary', hindiName: 'औषधालय', position: [15, -4], size: [5.4, 5.4], height: 1.5, type: 'simple', icon: 'H', color: '#C0C0C0' },

    // Bottom Section (Architecture/Main Block)
    { id: 'architecture', name: 'Architecture Dept', hindiName: 'वास्तुकला', position: [-10, -3], size: [5.4, 5.4], height: 2.8, type: 'complex', color: '#B0A090' },
    { id: 'architecture', name: 'Mechanical Dept', hindiName: 'वास्तुकला', position: [0, -5.5], size: [5.4, 5.4], height: 2.8, type: 'complex', color: '#A8A8A8' },
    { id: 'golden-garden', name: 'statue', hindiName: 'वास्तुकला', position: [15, -18.5], size: [2.7, 2.7], height: 1.5, type: 'simple', color: '#888888' },
    { id: 'golden-garden', name: 'statue', hindiName: 'वास्तुकला', position: [15, -18.5], size: [1.35, 1.35], height: 3, type: 'simple', color: '#888888' },
    { id: 'mits-main', name: 'mechanical workshop', hindiName: 'मुख्य भवन', position: [0, 15], size: [9.45, 6.75], height: 3.5, type: 'complex', icon: '🏛️', color: '#B8B8B8' },

    // Bottom Corner (now the old main gate)
    { id: 'main-gate', name: 'Diamond Jubilee Gate', hindiName: 'डायमंड गेट', position: [5, -25], size: [37.8, 8.1], height: 10.5, type: 'landmark', color: '#A0A0A0' },
];

const ROADS = [
    // Perimeter roads - Campus boundary
    { points: [[-16, -20], [16, -20], [16, 20], [-16, 20], [-16, -20]] }, // Outer perimeter loop

    // Main entrance roads from gates
    { points: [[5, -25], [5, -20], [5, -10]] }, // MITS Main Gate entry road
    { points: [[-20, 16], [-15, 12], [-10, 8], [-5, 4]] }, // Diamond Jubilee Gate entry road

    // Central hub - connecting major buildings
    { points: [[-6, -10], [0, -5.5], [0, 0], [0, 15]] }, // Old Building -> Mechanical Dept -> Center -> Workshop
    { points: [[0, -5.5], [5, -5], [10, -5], [15, -4]] }, // Mechanical Dept -> Dispensary
    { points: [[0, 0], [-6, -10], [-10, -3], [-15, -12]] }, // Center -> Old Building -> Architecture -> Canteen
    { points: [[0, -5.5], [-3, 4]] }, // Mechanical Dept -> AI Department
    { points: [[0, 0], [15, -11]] }, // Center -> Biotech
    { points: [[-7, -16], [-6, -10], [0, -5.5]] }, // Library -> Old Building -> Mechanical Dept

    // Inner campus loop around central areas
    { points: [[-10, -10], [10, -10], [10, 10], [-10, 10], [-10, -10]] }, // Inner perimeter

    // Cross connections
    { points: [[-15, -12], [-10, -3], [0, 4], [15, -4]] }, // Left side to right side
    { points: [[5, -20], [0, -10], [-10, 0], [-20, 16]] }, // Top to bottom diagonal
];

// --- Components ---

/**
 * Solid Realistic Building Material
 * Concrete/stone-like appearance with realistic details
 */
const HoloMaterial = ({ hovered, color = THEME.primary, map }: { hovered: boolean, color?: string, map?: THREE.Texture }) => (
    <meshStandardMaterial
        map={map}
        color={color}
        emissive={hovered ? color : '#000000'}
        emissiveIntensity={hovered ? 0.15 : 0}
        roughness={0.8}
        metalness={0.05}
        transparent={false}
        side={THREE.FrontSide}
    />
);

/**
 * Renders subtle neon edge highlights for solid buildings
 */
const NeonEdges = ({ geometry, color = THEME.primary }: { geometry: THREE.BufferGeometry, color?: string }) => {
    return (
        <group>
            {/* Primary neon edge - subtle accent */}
            <lineSegments>
                <edgesGeometry args={[geometry]} />
                <lineBasicMaterial
                    color={color}
                    transparent
                    opacity={0.4}
                    linewidth={2}
                    fog={false}
                />
            </lineSegments>

            {/* Secondary subtle glow - minimal */}
            <lineSegments>
                <edgesGeometry args={[geometry]} />
                <lineBasicMaterial
                    color={color}
                    transparent
                    opacity={0.15}
                    linewidth={4}
                />
            </lineSegments>
        </group>
    );
};

/**
 * Create a realistic window grid texture for buildings
 */
const createWindowTexture = (width: number, height: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Base wall color - realistic concrete
    ctx.fillStyle = '#A8A8A8';
    ctx.fillRect(0, 0, 512, 512);

    // Add subtle concrete texture/noise
    const imageData = ctx.getImageData(0, 0, 512, 512);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 15;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
    }
    ctx.putImageData(imageData, 0, 0);

    // Draw window grid - realistic windows
    const windowSize = 48;
    const spacing = 12;
    const frameWidth = 3;
    const columns = Math.floor(512 / (windowSize + spacing));
    const rows = Math.floor(512 / (windowSize + spacing));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const x = col * (windowSize + spacing) + spacing;
            const y = row * (windowSize + spacing) + spacing;

            // Window frame - dark metal
            ctx.fillStyle = '#505050';
            ctx.fillRect(x - frameWidth, y - frameWidth, windowSize + frameWidth * 2, windowSize + frameWidth * 2);

            // Window glass - some lit, some dark
            const isLit = Math.random() > 0.4;

            if (isLit) {
                // Lit window - bright glass with subtle reflection
                ctx.fillStyle = '#F5F5DC';
                ctx.fillRect(x, y, windowSize, windowSize);

                // Window panes
                ctx.strokeStyle = '#808080';
                ctx.globalAlpha = 0.4;
                ctx.lineWidth = 1.5;
                // Vertical divider
                ctx.beginPath();
                ctx.moveTo(x + windowSize / 2, y);
                ctx.lineTo(x + windowSize / 2, y + windowSize);
                ctx.stroke();
                // Horizontal divider
                ctx.beginPath();
                ctx.moveTo(x, y + windowSize / 2);
                ctx.lineTo(x + windowSize, y + windowSize / 2);
                ctx.stroke();
            } else {
                // Dark window - reflective glass
                ctx.fillStyle = '#404040';
                ctx.fillRect(x, y, windowSize, windowSize);

                // Subtle reflection
                ctx.strokeStyle = '#606060';
                ctx.globalAlpha = 0.2;
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, windowSize, windowSize);
            }

            ctx.globalAlpha = 1.0;
        }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    return texture;
};

const Building = ({ data, onHover, onClick, showLabels = false }: { data: BuildingData, onHover: any, onClick: any, showLabels?: boolean }) => {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    // Create specific geometries based on "type" to mimic the satellite map shapes
    const geometry = useMemo(() => {
        if (data.type === 'complex') {
            // Creates a hollow-ish building (Courtyard style) with beveled corners
            const shape = new THREE.Shape();
            const w = data.size[0] / 2;
            const h = data.size[1] / 2;
            const bevel = 0.3;

            // Outer rectangle with beveled corners
            shape.moveTo(-w + bevel, -h);
            shape.lineTo(w - bevel, -h);
            shape.quadraticCurveTo(w, -h, w, -h + bevel);
            shape.lineTo(w, h - bevel);
            shape.quadraticCurveTo(w, h, w - bevel, h);
            shape.lineTo(-w + bevel, h);
            shape.quadraticCurveTo(-w, h, -w, h - bevel);
            shape.lineTo(-w, -h + bevel);
            shape.quadraticCurveTo(-w, -h, -w + bevel, -h);

            // Inner hole (Courtyard) with beveled corners
            const holePath = new THREE.Path();
            const pad = 1.2;
            holePath.moveTo(-w + pad + 0.2, -h + pad);
            holePath.lineTo(w - pad - 0.2, -h + pad);
            holePath.quadraticCurveTo(w - pad, -h + pad, w - pad, -h + pad + 0.2);
            holePath.lineTo(w - pad, h - pad - 0.2);
            holePath.quadraticCurveTo(w - pad, h - pad, w - pad - 0.2, h - pad);
            holePath.lineTo(-w + pad + 0.2, h - pad);
            holePath.quadraticCurveTo(-w + pad, h - pad, -w + pad, h - pad - 0.2);
            holePath.lineTo(-w + pad, -h + pad + 0.2);
            holePath.quadraticCurveTo(-w + pad, -h + pad, -w + pad + 0.2, -h + pad);
            shape.holes.push(holePath);

            return new THREE.ExtrudeGeometry(shape, { depth: data.height, bevelEnabled: true, bevelThickness: 0.15, bevelSize: 0.1, bevelSegments: 3 });
        } else if (data.id === 'main-gate' || data.id === 'diamond-gate') {
            // Create a simple gate-like structure with a box for the horizontal beam
            // We'll build the gate with pillars and beam in the component JSX instead
            return new THREE.BoxGeometry(0.5, data.height, 0.5, 4, 8, 4);
        }
        // Default Box with better proportions and more segments for detail
        return new THREE.BoxGeometry(data.size[0], data.height, data.size[1], 8, 16, 8);
    }, [data]);

    useFrame((state) => {
        if (!mesh.current) return;
        // Float animation
        const t = state.clock.getElapsedTime();
        mesh.current.position.y = (data.height / 2) + Math.sin(t * 2 + data.position[0]) * 0.1;

        // Rotation for archways
        if (data.id.includes('gate')) {
            mesh.current.rotation.x = 0; // Reset default rotation for torus
        }
    });

    const handlePointerOver = (e: any) => {
        e.stopPropagation();
        setHover(true);
        onHover(data.id);
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        setHover(false);
        onHover(null);
        document.body.style.cursor = 'default';
    };

    // Create window texture
    const windowTexture = useMemo(() => createWindowTexture(data.size[0], data.size[1]), [data.size]);

    // Determine building color variants based on type
    const getColorVariant = (color: string | undefined) => {
        const baseColor = color || THEME.primary;
        // Add darker shade for different walls
        return baseColor;
    };

    return (
        <group position={[data.position[0], 0, data.position[1]]}>
            {/* Main Building/Ground Mesh - Hidden for gates and landmark grounds (rendered separately) */}
            {data.id !== 'main-gate' && data.id !== 'diamond-gate' && data.id !== 'golden-garden' && (
                <mesh
                    ref={mesh}
                    geometry={geometry}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    onClick={() => onClick(data.id)}
                    rotation={[data.type === 'complex' ? -Math.PI / 2 : 0, 0, 0]}
                >
                    <HoloMaterial hovered={hovered} color={data.color} map={windowTexture} />
                    <NeonEdges geometry={geometry} color={data.color || THEME.primary} />
                </mesh>
            )}

            {/* Ground/Grass Mesh */}
            {data.id === 'golden-garden' && (
                <mesh
                    ref={mesh}
                    geometry={geometry}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    onClick={() => onClick(data.id)}
                    rotation={[data.type === 'complex' ? -Math.PI / 2 : 0, 0, 0]}
                >
                    <meshStandardMaterial
                        color={data.color || '#22BB33'}
                        emissive={data.color || '#22BB33'}
                        emissiveIntensity={hovered ? 0.3 : 0.08}
                        roughness={0.8}
                        metalness={0.0}
                    />
                </mesh>
            )}

            {/* Realistic Gate Structure */}
            {(data.id === 'main-gate' || data.id === 'diamond-gate') && (
                <group
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    onClick={() => onClick(data.id)}
                    rotation={[0, data.rotation || 0, 0]}
                >
                    {/* Invisible hitbox for interaction */}
                    <mesh position={[0, data.height / 2, 0]}>
                        <boxGeometry args={[3.5, data.height + 1, 1]} />
                        <meshBasicMaterial transparent opacity={0} />
                    </mesh>

                    {/* Left pillar */}
                    <mesh position={[-1.5, data.height / 2, 0]}>
                        <cylinderGeometry args={[0.4, 0.4, data.height + 0.5, 16]} />
                        <meshStandardMaterial
                            color="#4a4a4a"
                            emissive={THEME.primary}
                            emissiveIntensity={hovered ? 0.4 : 0.1}
                            roughness={0.4}
                            metalness={0.3}
                        />
                    </mesh>

                    {/* Right pillar */}
                    <mesh position={[1.5, data.height / 2, 0]}>
                        <cylinderGeometry args={[0.4, 0.4, data.height + 0.5, 16]} />
                        <meshStandardMaterial
                            color="#4a4a4a"
                            emissive={THEME.primary}
                            emissiveIntensity={hovered ? 0.4 : 0.1}
                            roughness={0.4}
                            metalness={0.3}
                        />
                    </mesh>

                    {/* Top horizontal beam */}
                    <mesh position={[0, data.height + 0.2, 0]}>
                        <boxGeometry args={[3.2, 0.5, 0.5]} />
                        <meshStandardMaterial
                            color="#3a3a3a"
                            emissive={THEME.secondary}
                            emissiveIntensity={hovered ? 0.5 : 0.15}
                            roughness={0.3}
                            metalness={0.5}
                        />
                    </mesh>

                    {/* Gate decorative arch */}
                    <mesh position={[0, data.height + 0.3, 0]}>
                        <torusGeometry args={[1.2, 0.25, 16, 32, Math.PI]} />
                        <meshStandardMaterial
                            color="#FF5E1F"
                            emissive="#FF5E1F"
                            emissiveIntensity={hovered ? 0.6 : 0.3}
                            roughness={0.3}
                            metalness={0.7}
                        />
                    </mesh>

                    {/* Center gate bars */}
                    {[-0.6, 0, 0.6].map((offset, i) => (
                        <mesh key={i} position={[offset, data.height / 2, 0]}>
                            <cylinderGeometry args={[0.15, 0.15, data.height, 8]} />
                            <meshStandardMaterial
                                color="#2a2a2a"
                                emissive={THEME.accent}
                                emissiveIntensity={hovered ? 0.4 : 0.12}
                                roughness={0.4}
                                metalness={0.6}
                            />
                        </mesh>
                    ))}

                    {/* Gate glow effect */}
                    <mesh position={[0, data.height / 2, 0]}>
                        <boxGeometry args={[3.5, data.height + 0.8, 0.1]} />
                        <meshBasicMaterial
                            color={THEME.primary}
                            transparent
                            opacity={hovered ? 0.2 : 0.05}
                            fog={false}
                        />
                    </mesh>
                </group>
            )}

            {/* Detailed Side Walls for Realism (for all buildings except gates) */}
            {data.id !== 'main-gate' && data.id !== 'diamond-gate' && (
                <group>
                    {/* Front wall - solid concrete with window details */}
                    <mesh position={[0, data.height / 2, data.size[1] / 2]}>
                        <planeGeometry args={[data.size[0], data.height, 8, 16]} />
                        <meshStandardMaterial
                            map={windowTexture}
                            color={data.color || THEME.primary}
                            emissive={data.color || THEME.primary}
                            emissiveIntensity={hovered ? 0.5 : 0.15}
                            roughness={0.5}
                            metalness={0.0}
                        />
                    </mesh>

                    {/* Back wall - darker shade, solid concrete */}
                    <mesh position={[0, data.height / 2, -data.size[1] / 2]} rotation={[0, Math.PI, 0]}>
                        <planeGeometry args={[data.size[0], data.height, 8, 16]} />
                        <meshStandardMaterial
                            map={windowTexture}
                            color={data.color || THEME.primary}
                            emissive={data.color || THEME.primary}
                            emissiveIntensity={hovered ? 0.3 : 0.08}
                            roughness={0.6}
                            metalness={0.0}
                        />
                    </mesh>

                    {/* Right wall - solid concrete */}
                    <mesh position={[data.size[0] / 2, data.height / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
                        <planeGeometry args={[data.size[1], data.height, 8, 16]} />
                        <meshStandardMaterial
                            map={windowTexture}
                            color={data.color || THEME.primary}
                            emissive={data.color || THEME.primary}
                            emissiveIntensity={hovered ? 0.4 : 0.12}
                            roughness={0.5}
                            metalness={0.0}
                        />
                    </mesh>

                    {/* Left wall - solid concrete */}
                    <mesh position={[-data.size[0] / 2, data.height / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
                        <planeGeometry args={[data.size[1], data.height, 8, 16]} />
                        <meshStandardMaterial
                            map={windowTexture}
                            color={data.color || THEME.primary}
                            emissive={data.color || THEME.primary}
                            emissiveIntensity={hovered ? 0.4 : 0.12}
                            roughness={0.6}
                            metalness={0.0}
                        />
                    </mesh>

                    {/* Roof Top - solid metal with more realism */}
                    <mesh position={[0, data.height, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[data.size[0], data.size[1], 8, 8]} />
                        <meshStandardMaterial
                            color="#1a1a1a"
                            emissive={data.color || THEME.primary}
                            emissiveIntensity={hovered ? 0.5 : 0.2}
                            roughness={0.6}
                            metalness={0.3}
                        />
                    </mesh>
                </group>
            )}


            {/* Entrance Door Details - for realistic look */}
            {data.type !== 'landmark' && data.id !== 'main-gate' && data.id !== 'diamond-gate' && (
                <group>
                    {/* Main entrance door - center bottom of front wall */}
                    <mesh position={[0, 0.8, data.size[1] / 2 + 0.05]}>
                        <boxGeometry args={[1, 2, 0.2]} />
                        <meshStandardMaterial
                            color="#8B4513"
                            emissive="#FF5E1F"
                            emissiveIntensity={hovered ? 0.4 : 0.1}
                            metalness={0.3}
                            roughness={0.6}
                        />
                    </mesh>

                    {/* Door frame - solid metal */}
                    <mesh position={[0, 0.8, data.size[1] / 2 + 0.08]}>
                        <boxGeometry args={[1.25, 2.35, 0.08]} />
                        <meshStandardMaterial
                            color={data.color || THEME.primary}
                            emissive={data.color || THEME.primary}
                            emissiveIntensity={hovered ? 0.3 : 0.08}
                            roughness={0.3}
                            metalness={0.6}
                        />
                    </mesh>

                    {/* Door handle - glowing detail */}
                    <mesh position={[0.4, 1, data.size[1] / 2 + 0.15]}>
                        <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
                        <meshStandardMaterial
                            color="#FFD700"
                            emissive="#FFD700"
                            emissiveIntensity={hovered ? 0.6 : 0.3}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>
                </group>
            )}

            {/* Roof antenna/spire for tall buildings */}
            {data.height >= 3 && data.type !== 'landmark' && data.id !== 'main-gate' && data.id !== 'diamond-gate' && (
                <group>
                    {/* Antenna tower */}
                    <mesh position={[0, data.height + 0.5, 0]}>
                        <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
                        <meshStandardMaterial
                            color="#FF5E1F"
                            emissive="#FF5E1F"
                            emissiveIntensity={hovered ? 0.8 : 0.4}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>

                    {/* Antenna tip */}
                    <mesh position={[0, data.height + 1.1, 0]}>
                        <coneGeometry args={[0.1, 0.3, 8]} />
                        <meshStandardMaterial
                            color="#FF85C0"
                            emissive="#FF85C0"
                            emissiveIntensity={hovered ? 0.8 : 0.5}
                            metalness={0.9}
                            roughness={0.1}
                        />
                    </mesh>

                    {/* Antenna subtle glow effect */}
                    <mesh position={[0, data.height + 0.5, 0]}>
                        <cylinderGeometry args={[0.25, 0.25, 1.2, 16]} />
                        <meshBasicMaterial
                            color="#FF85C0"
                            transparent
                            opacity={hovered ? 0.15 : 0.05}
                            fog={false}
                        />
                    </mesh>
                </group>
            )}

            {/* Building Name - Visible After Loading */}
            {showLabels && (
                <Html
                    position={[0, data.height + 1.5, 0]}
                    center
                    distanceFactor={20}
                    zIndexRange={[1000, 0]}
                    occlude="blended"
                >
                    <div style={{
                        background: 'rgba(0, 166, 255, 0.85)',
                        border: '2px solid #1A1A1A',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        color: '#1A1A1A',
                        fontFamily: 'Orbitron, sans-serif',
                        textAlign: 'center',
                        backdropFilter: 'blur(8px)',
                        boxShadow: `0 0 20px rgba(255, 94, 31, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.2)`,
                        fontSize: '0.85em',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        transform: 'translateZ(100px)',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                    }}>
                        <div style={{ fontSize: '1em', color: '#1A1A1A', letterSpacing: '0.5px' }}>
                            {data.name}
                        </div>
                        {data.hindiName && (
                            <div style={{ fontSize: '0.75em', color: '#FF5E1F', marginTop: '2px', letterSpacing: '0.3px' }}>
                                {data.hindiName}
                            </div>
                        )}
                    </div>
                </Html>
            )}

            {/* Enhanced Hover Label */}
            {hovered && (
                <Html position={[0, data.height + 3.5, 0]} center distanceFactor={20} zIndexRange={[1000, 0]} occlude="blended">
                    <div style={{
                        background: 'rgba(255, 85, 192, 0.95)',
                        border: '3px solid #1A1A1A',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        color: '#1A1A1A',
                        fontFamily: 'Orbitron, sans-serif',
                        textAlign: 'center',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 0 30px rgba(255, 85, 192, 0.8), 0 0 60px rgba(255, 94, 31, 0.4)',
                        fontSize: '0.95em',
                        fontWeight: 'bold'
                    }}>
                        <div style={{ fontSize: '1.1em', fontWeight: 'bold' }}>📍 {data.icon || '🏢'} {data.name}</div>
                        <div style={{ fontSize: '0.75em', marginTop: '4px', opacity: 0.8 }}>{data.type?.toUpperCase()}</div>
                    </div>
                </Html>
            )}
        </group>
    );
};

const HoloRoads = () => {
    // Convert points to Three vectors and create road meshes
    const roads = useMemo(() => {
        return ROADS.map(road => {
            const points = road.points;
            const segments = [];
            for (let i = 0; i < points.length - 1; i++) {
                const p1 = points[i];
                const p2 = points[i + 1];
                const direction = [p2[0] - p1[0], p2[1] - p1[1]];
                const length = Math.sqrt(direction[0] * direction[0] + direction[1] * direction[1]);
                const angle = Math.atan2(direction[1], direction[0]);
                segments.push({
                    position: [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2],
                    angle,
                    length
                });
            }
            return segments;
        });
    }, []);

    return (
        <group>
            {/* Realistic asphalt roads */}
            {roads.map((roadSegments, roadIdx) =>
                roadSegments.map((segment, segIdx) => (
                    <mesh
                        key={`road-${roadIdx}-${segIdx}`}
                        position={[segment.position[0], 0.06, segment.position[1]]}
                        rotation={[0, segment.angle, 0]}
                    >
                        <boxGeometry args={[segment.length, 0.08, 2.2]} />
                        <meshStandardMaterial
                            color="#404040"
                            roughness={0.9}
                            metalness={0.0}
                            emissive="#000000"
                        />
                    </mesh>
                ))
            )}

            {/* Road center line markings */}
            {roads.map((roadSegments, roadIdx) =>
                roadSegments.map((segment, segIdx) => (
                    <mesh
                        key={`line-${roadIdx}-${segIdx}`}
                        position={[segment.position[0], 0.07, segment.position[1]]}
                        rotation={[0, segment.angle, 0]}
                    >
                        <boxGeometry args={[segment.length, 0.02, 0.15]} />
                        <meshBasicMaterial
                            color="#FFFF99"
                            transparent
                            opacity={0.6}
                        />
                    </mesh>
                ))
            )}
        </group>
    );
};

const SciFiBase = () => {
    // Realistic ground base for the campus model
    return (
        <group position={[0, -2, 0]}>
            {/* Main Ground Platform - Realistic concrete look */}
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[50, 50, 2, 64, 8]} />
                <meshStandardMaterial
                    color="#D3D3D3"
                    metalness={0.1}
                    roughness={0.85}
                    emissive="#000000"
                    emissiveIntensity={0}
                    flatShading={false}
                />
            </mesh>

            {/* Base Support Ring - Darker concrete */}
            <mesh position={[0, 0.8, 0]}>
                <cylinderGeometry args={[50, 48, 1.5, 64]} />
                <meshStandardMaterial
                    color="#A9A9A9"
                    metalness={0.08}
                    roughness={0.9}
                    emissive="#000000"
                    emissiveIntensity={0}
                />
            </mesh>

            {/* Subtle edge definition */}
            <mesh position={[0, 2.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[48, 51, 64]} />
                <meshStandardMaterial
                    color="#808080"
                    metalness={0.15}
                    roughness={0.7}
                />
            </mesh>

            {/* Base shadow for depth */}
            <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[52, 64]} />
                <meshBasicMaterial
                    color="#000000"
                    transparent
                    opacity={0.15}
                />
            </mesh>
        </group>
    );
};

/**
 * Fencing component for grounds
 */
const GroundFencing = () => {
    // Define grounds to fence - these are the grass areas
    const groundsToFence = [
        { position: [-5, -22], size: [20.25, 8.1], name: 'stage ground' },
        { position: [-3, -2], size: [12.15, 9.45], name: 'AI ground' },
        { position: [15, -18.5], size: [13.5, 13.5], name: 'statue ground' },
        { position: [-5, 22], size: [40.5, 20.25], name: 'football ground' },
    ];

    return (
        <group>
            {groundsToFence.map((ground, idx) => {
                const halfWidth = ground.size[0] / 2;
                const halfLength = ground.size[1] / 2;
                const fenceHeight = 1.2;
                const postSpacing = 2;

                return (
                    <group key={idx} position={[ground.position[0], 0, ground.position[1]]}>
                        {/* Front fence (along X axis) */}
                        {Array.from({ length: Math.ceil(ground.size[0] / postSpacing) + 1 }).map((_, i) => {
                            const xPos = -halfWidth + (i * postSpacing);
                            return (
                                <group key={`front-${i}`} position={[xPos, 0, halfLength]}>
                                    {/* Fence post */}
                                    <mesh position={[0, fenceHeight / 2, 0]}>
                                        <boxGeometry args={[0.15, fenceHeight, 0.15]} />
                                        <meshStandardMaterial color="#8B7355" roughness={0.9} metalness={0.1} />
                                    </mesh>
                                    {/* Horizontal rail */}
                                    {i < Math.ceil(ground.size[0] / postSpacing) && (
                                        <mesh position={[postSpacing / 2, fenceHeight * 0.6, 0]}>
                                            <boxGeometry args={[postSpacing - 0.2, 0.08, 0.08]} />
                                            <meshStandardMaterial color="#8B7355" roughness={0.9} metalness={0.1} />
                                        </mesh>
                                    )}
                                </group>
                            );
                        })}

                        {/* Back fence (along X axis) */}
                        {Array.from({ length: Math.ceil(ground.size[0] / postSpacing) + 1 }).map((_, i) => {
                            const xPos = -halfWidth + (i * postSpacing);
                            return (
                                <group key={`back-${i}`} position={[xPos, 0, -halfLength]}>
                                    {/* Fence post */}
                                    <mesh position={[0, fenceHeight / 2, 0]}>
                                        <boxGeometry args={[0.15, fenceHeight, 0.15]} />
                                        <meshStandardMaterial color="#8B7355" roughness={0.9} metalness={0.1} />
                                    </mesh>
                                    {/* Horizontal rail */}
                                    {i < Math.ceil(ground.size[0] / postSpacing) && (
                                        <mesh position={[postSpacing / 2, fenceHeight * 0.6, 0]}>
                                            <boxGeometry args={[postSpacing - 0.2, 0.08, 0.08]} />
                                            <meshStandardMaterial color="#8B7355" roughness={0.9} metalness={0.1} />
                                        </mesh>
                                    )}
                                </group>
                            );
                        })}

                        {/* Left fence (along Z axis) */}
                        {Array.from({ length: Math.ceil(ground.size[1] / postSpacing) + 1 }).map((_, i) => {
                            const zPos = -halfLength + (i * postSpacing);
                            return (
                                <group key={`left-${i}`} position={[-halfWidth, 0, zPos]}>
                                    {/* Fence post */}
                                    <mesh position={[0, fenceHeight / 2, 0]}>
                                        <boxGeometry args={[0.15, fenceHeight, 0.15]} />
                                        <meshStandardMaterial color="#8B7355" roughness={0.9} metalness={0.1} />
                                    </mesh>
                                    {/* Horizontal rail */}
                                    {i < Math.ceil(ground.size[1] / postSpacing) && (
                                        <mesh position={[0, fenceHeight * 0.6, postSpacing / 2]}>
                                            <boxGeometry args={[0.08, 0.08, postSpacing - 0.2]} />
                                            <meshStandardMaterial color="#8B7355" roughness={0.9} metalness={0.1} />
                                        </mesh>
                                    )}
                                </group>
                            );
                        })}

                        {/* Right fence (along Z axis) */}
                        {Array.from({ length: Math.ceil(ground.size[1] / postSpacing) + 1 }).map((_, i) => {
                            const zPos = -halfLength + (i * postSpacing);
                            return (
                                <group key={`right-${i}`} position={[halfWidth, 0, zPos]}>
                                    {/* Fence post */}
                                    <mesh position={[0, fenceHeight / 2, 0]}>
                                        <boxGeometry args={[0.15, fenceHeight, 0.15]} />
                                        <meshStandardMaterial color="#8B7355" roughness={0.9} metalness={0.1} />
                                    </mesh>
                                    {/* Horizontal rail */}
                                    {i < Math.ceil(ground.size[1] / postSpacing) && (
                                        <mesh position={[0, fenceHeight * 0.6, postSpacing / 2]}>
                                            <boxGeometry args={[0.08, 0.08, postSpacing - 0.2]} />
                                            <meshStandardMaterial color="#8B7355" roughness={0.9} metalness={0.1} />
                                        </mesh>
                                    )}
                                </group>
                            );
                        })}
                    </group>
                );
            })}
        </group>
    );
};

const HolographicTrees = () => {
    // Use Instances for better performance with many trees
    const count = 80;
    const circumferenceRadius = 45; // Fixed radius for circular arrangement
    const trees = useMemo(() => {
        const temp = [];
        // Arrange trees evenly around a circumference
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2; // Evenly spaced angles
            const scale = 0.6 + (Math.sin(i * 0.1) * 0.2) + 0.2; // Varied scale with pattern
            temp.push({
                position: [Math.cos(angle) * circumferenceRadius, 0, Math.sin(angle) * circumferenceRadius] as [number, number, number],
                scale: scale,
                colorVariant: i % 5 // Cycling through color variants for even distribution
            });
        }
        return temp;
    }, []);

    const treeColors = [
        '#B0FF57',    // Lime Green - primary
        '#00A6FF',    // Electric Blue - accent
        '#FF85C0',    // Bubblegum Pink - accent
        '#FF5E1F',    // Safety Orange - accent
        '#FFDD33',    // Sun Yellow - accent
    ];

    return (
        <group>
            {/* Large cone-shaped holographic trees with enhanced glow - Kidcore Theme */}
            {trees.map((data, i) => {
                const treeColor = treeColors[data.colorVariant];
                return (
                    <group key={i} position={data.position}>
                        {/* Main tree cone with enhanced emissive */}
                        <mesh scale={[data.scale, data.scale * 1.5, data.scale]} castShadow>
                            <coneGeometry args={[0.8, 2, 8]} />
                            <meshPhysicalMaterial
                                color={treeColor}
                                emissive={treeColor}
                                emissiveIntensity={0.6}
                                transparent
                                opacity={0.8}
                                metalness={0.4}
                                roughness={0.5}
                                transmission={0.3}
                                thickness={1}
                            />
                        </mesh>

                        {/* Primary glow outline */}
                        <mesh scale={[data.scale * 1.1, data.scale * 1.6, data.scale * 1.1]}>
                            <coneGeometry args={[0.8, 2, 8]} />
                            <meshBasicMaterial
                                color={treeColor}
                                transparent
                                opacity={0.4}
                                wireframe
                                fog={false}
                            />
                        </mesh>

                        {/* Secondary glow halo */}
                        <mesh scale={[data.scale * 1.2, data.scale * 1.8, data.scale * 1.2]}>
                            <coneGeometry args={[0.8, 2, 8]} />
                            <meshBasicMaterial
                                color={treeColor}
                                transparent
                                opacity={0.15}
                            />
                        </mesh>

                        {/* Tree trunk - darker with glow */}
                        <mesh position={[0, -0.5, 0]} scale={[data.scale * 0.3, data.scale * 0.8, data.scale * 0.3]}>
                            <cylinderGeometry args={[0.4, 0.5, 1, 4]} />
                            <meshStandardMaterial
                                color="#1A1A1A"
                                emissive={treeColor}
                                emissiveIntensity={0.3}
                                metalness={0.6}
                                roughness={0.3}
                            />
                        </mesh>
                    </group>
                );
            })}

            {/* Enhanced ambient tree particles for depth */}
            <group>
                {trees.slice(0, 20).map((data, i) => (
                    <mesh
                        key={`particle-${i}`}
                        position={[data.position[0], 1 + Math.random() * 2, data.position[2]]}
                        scale={[0.25, 0.25, 0.25]}
                    >
                        <sphereGeometry args={[1, 4, 4]} />
                        <meshBasicMaterial
                            color={treeColors[i % treeColors.length]}
                            transparent
                            opacity={0.6}
                            fog={false}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
};

// --- Main Export ---

export function HolographicMap({ onBuildingHover, onBuildingClick, isLoading = false }: { onBuildingHover: (id: string | null) => void, onBuildingClick: (id: string) => void, isLoading?: boolean }) {
    // Rotation logic to match the "Diamond" orientation in the image
    // The reference image is isometric (Diamond shape). 
    // We rotate the whole content by 45 degrees (Math.PI / 4)

    const [showLabels, setShowLabels] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            // Show labels 0.5s after loading completes
            const timer = setTimeout(() => setShowLabels(true), 500);
            return () => clearTimeout(timer);
        } else {
            setShowLabels(false);
        }
    }, [isLoading]);

    return (
        <group>
            {/* Adjust lighting for Hologram effect */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 20, 10]} intensity={1} color={THEME.primary} distance={50} />
            <pointLight position={[-10, 20, -10]} intensity={0.5} color="#00ffaa" distance={50} />

            {/* Projector Base */}
            <SciFiBase />

            {/* The Map Content - Rotated to form Diamond shape */}
            <group rotation={[0, Math.PI / 4, 0]} position={[0, 0.5, 0]}>

                {/* Ground Plane - Realistic campus ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[50, 64]} />
                    <meshStandardMaterial
                        color="#D9D9D9"
                        roughness={0.85}
                        metalness={0}
                        emissive="#000000"
                    />
                </mesh>

                <HoloRoads />
                <HolographicTrees />
                <GroundFencing />

                {BUILDINGS.map((building) => (
                    <Building
                        key={building.id}
                        data={building}
                        onHover={onBuildingHover}
                        onClick={onBuildingClick}
                        showLabels={showLabels}
                    />
                ))}

                {/* Street Names floating */}
                <Text
                    position={[-22, 1, 0]}
                    rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                    fontSize={1.5}
                    color={THEME.primary}
                >
                    MELA ROAD
                </Text>


            </group>
        </group>
    );
}
