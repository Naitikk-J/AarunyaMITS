import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text, Float, Instance, Instances } from '@react-three/drei';
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
    type?: 'complex' | 'simple' | 'landmark';
    icon?: string;
    color?: string;
    rotationY?: number; // Y-axis rotation in radians
}

// --- Configuration --- Kidcore Theme
const THEME = {
    primary: '#00A6FF',     // Electric Blue
    secondary: '#FF5E1F',   // Safety Orange
    accent: '#FF85C0',      // Bubblegum Pink
    lime: '#B0FF57',        // Lime Green
    yellow: '#FFDD33',      // Sunflower Yellow
    ground: '#4A4A4A',      // Metallic Grey Base
    groundLight: '#6A6A6A', // Light Metallic Grey
    groundDark: '#2A2A2A',  // Dark Metallic Grey
    black: '#1A1A1A',       // Gritty Black
    glow: '#FF5E1F',        // Orange Glow
    glassOpacity: 0.2,
    edgeOpacity: 0.9,
    stoneBeige: '#D4C5B9',  // Cream Stone Color
    stoneShadow: '#B8A89B'  // Darker stone for shadows
};

// --- Data: Mapped to the Diamond Layout ---
// The map is rotated 45deg.
const BUILDINGS: BuildingData[] = [
    // Top Corner
    { id: 'main-gate', name: 'MITS Main Gate', hindiName: 'मुख्य द्वार', position: [5, -25], size: [4, 2], height: 2, type: 'landmark', icon: '🎓', color: '#D4C5B9' },

    // Left Wing (Civil/Canteen area)
    { id: 'old building', name: 'Old Building', hindiName: 'सिविल विभाग', position: [-6, -10], size: [16, 7], height: 2.5, type: 'complex', color: '#D4C5B9' },
    { id: 'canteen', name: 'Canteen', hindiName: 'कैंटीन', position: [-15, -12], size: [4, 4], height: 1.5, type: 'simple', icon: '🍽️', color: '#C9BDB3' },
    { id: 'AI department', name: 'AI department', hindiName: 'कैंटीन', position: [-3, 4], size: [9, 5], height: 6, type: 'simple', icon: '🍽️', color: '#D4C5B9' },
    { id: 'library', name: 'Central Library', hindiName: 'पुस्तकालय', position: [-7, -16], size: [4, 3], height: 3, type: 'complex', icon: '📚', color: '#DDD4CC' },

    // Center
    { id: 'golden-garden', name: 'stage ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [-5, -22], size: [15, 6], height: 0.2, type: 'landmark', color: '#2D7A3E' },
    { id: 'golden-garden', name: 'AI ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [-3, -2], size: [9, 7], height: 0.2, type: 'landmark', color: '#3A9C52' },
    { id: 'golden-garden', name: 'statue ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [15, -18.5], size: [10, 10], height: 0.2, type: 'landmark', color: '#2D7A3E' },
    { id: 'golden-garden', name: 'football ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [-5, 22], size: [30, 15], height: 0.2, type: 'landmark', color: '#3A9C52' },

    // Right Wing (Biotech/Medical)
    { id: 'biotech', name: 'Biotech Dept', hindiName: 'जैव प्रौद्योगिकी', position: [15, -11], size: [5, 5], height: 2.5, type: 'simple', color: '#D4C5B9' },
    { id: 'dispensary', name: 'Dispensary', hindiName: 'औषधालय', position: [15, -4], size: [4, 4], height: 1.5, type: 'simple', icon: 'H', color: '#E63946' },

    // Bottom Section (Architecture/Main Block)
    { id: 'architecture', name: 'Architecture Dept', hindiName: 'वास्तुकला', position: [-10, -3], size: [4, 4], height: 2.8, type: 'complex', color: '#D4C5B9' },
    { id: 'architecture', name: 'Mechanical Dept', hindiName: 'वास्तुकला', position: [0, -5.5], size: [4, 4], height: 2.8, type: 'complex', color: '#DDD4CC' },
    { id: 'golden-garden', name: 'statue', hindiName: 'वास्तुकला', position: [15, -18.5], size: [2, 2], height: 1.5, type: 'simple', color: '#D4C5B9' },
    { id: 'golden-garden', name: 'statue', hindiName: 'वास्तुकला', position: [15, -18.5], size: [1, 1], height: 3, type: 'simple', color: '#C9BDB3' },
    { id: 'mits-main', name: 'mechanical workshop', hindiName: 'मुख्य भवन', position: [0, 15], size: [7, 5], height: 3.5, type: 'complex', icon: '🏛️', color: '#D4C5B9' },

    // Bottom Corner
    { id: 'diamond-gate', name: 'Diamond Jubilee Gate', hindiName: 'डायमंड गेट', position: [-20, 16], size: [4, 1], height: 2, type: 'landmark', color: '#D4C5B9', rotationY: Math.PI / 2 },
];

const ROADS = [
    // The Square/Diamond Perimeter
    { points: [[-16, -20], [16, -20], [16, 20], [-16, 20], [-16, -20]] }, // Outer Loop
    { points: [[-18, -18], [18, 18]] }, // Diagonal Cross (Sun City to Gate)
    { points: [[-5, -5], [5, -5], [5, 5], [-5, 5], [-5, -5]] }, // Inner Garden Loop

    // Road from MITS Main Gate to campus center
    { points: [[5, -25], [5, -20], [0, -10]] }, // Main gate entry road connecting to Old Building
];

// --- Components ---

/**
 * Generate stone texture canvas
 */
const generateStoneTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Base cream color
    ctx.fillStyle = THEME.stoneBeige;
    ctx.fillRect(0, 0, 512, 512);

    // Add stone noise/texture
    const imageData = ctx.getImageData(0, 0, 512, 512);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 40;
        data[i] += noise;     // R
        data[i + 1] += noise; // G
        data[i + 2] += noise; // B
    }

    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    return texture;
};

/**
 * Generate high-detail stone texture for neon mode (realistic)
 */
const generateDetailedStoneTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Base stone color gradient
    const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
    gradient.addColorStop(0, '#D4C5B9');
    gradient.addColorStop(0.5, '#D9CFCA');
    gradient.addColorStop(1, '#CFC4BA');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);

    // Add detailed stone pattern
    const imageData = ctx.getImageData(0, 0, 1024, 1024);
    const data = imageData.data;

    // Perlin-like noise for stone variations
    for (let y = 0; y < 1024; y++) {
        for (let x = 0; x < 1024; x++) {
            const idx = (y * 1024 + x) * 4;

            // Multi-layer noise for realistic stone
            const noise1 = Math.sin(x * 0.01 + y * 0.005) * 30;
            const noise2 = Math.sin(x * 0.005 + y * 0.01) * 25;
            const noise3 = Math.random() * 20;

            const combined = (noise1 + noise2 + noise3) / 3;
            const variance = combined * 0.6;

            // Blend with original color
            data[idx] += variance * 0.8;     // R
            data[idx + 1] += variance * 0.7; // G
            data[idx + 2] += variance * 0.6; // B
        }
    }

    ctx.putImageData(imageData, 0, 0);

    // Add mortar cracks
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 1024; i += 128) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 1024);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(1024, i);
        ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.repeat.set(2, 2);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
};

/**
 * Generate detailed normal map for stone
 */
const generateDetailedNormalMap = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Base normal map (neutral)
    ctx.fillStyle = '#8080FF';
    ctx.fillRect(0, 0, 512, 512);

    const imageData = ctx.getImageData(0, 0, 512, 512);
    const data = imageData.data;

    // Add detailed bumps and cracks
    for (let y = 0; y < 512; y++) {
        for (let x = 0; x < 512; x++) {
            const idx = (y * 512 + x) * 4;

            // Simulate surface texture
            const bumpNoise = Math.sin(x * 0.01) * Math.cos(y * 0.01) * 20;
            const crackNoise = Math.sin(x * 0.005 + y * 0.005) * 15;

            data[idx] += bumpNoise + crackNoise;           // R (X normal)
            data[idx + 1] += (bumpNoise * 0.5) + crackNoise; // G (Y normal)
            data[idx + 2] = 200 + Math.random() * 30;       // B (Z normal - mostly up)
        }
    }

    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.repeat.set(2, 2);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
};

/**
 * Generate grass texture canvas
 */
const generateGrassTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Base grass color with variation
    ctx.fillStyle = THEME.ground;
    ctx.fillRect(0, 0, 512, 512);

    // Add grass blade-like strokes for texture
    const imageData = ctx.getImageData(0, 0, 512, 512);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // Create variation between dark and light green
        const noise = (Math.random() - 0.5) * 50;
        data[i] += noise * 0.3;     // R - less red variation
        data[i + 1] += noise;        // G - more green variation
        data[i + 2] += noise * 0.3; // B - less blue variation
    }

    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    return texture;
};

/**
 * Generate metallic grey ground texture with realistic finish
 */
const generateMetallicGroundTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Base metallic grey
    ctx.fillStyle = '#5A5A5A';
    ctx.fillRect(0, 0, 1024, 1024);

    // Add metallic brushed effect
    const imageData = ctx.getImageData(0, 0, 1024, 1024);
    const data = imageData.data;

    // Create brushed metal pattern
    for (let y = 0; y < 1024; y++) {
        for (let x = 0; x < 1024; x++) {
            const idx = (y * 1024 + x) * 4;

            // Directional brushed lines effect
            const brushNoise = Math.sin(x * 0.01) * 30;
            const roughNoise = (Math.random() - 0.5) * 60;

            // Blend noise with preference for horizontal lines
            const combined = brushNoise + roughNoise * 0.3;

            data[idx] += combined * 0.4;      // R
            data[idx + 1] += combined * 0.4;  // G
            data[idx + 2] += combined * 0.45; // B (slightly more blue for cooler metal)
        }
    }

    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.repeat.set(4, 4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
};

/**
 * Generate normal map for metallic ground
 */
const generateMetallicNormalMap = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Base normal map (neutral blue)
    ctx.fillStyle = '#8080FF';
    ctx.fillRect(0, 0, 512, 512);

    const imageData = ctx.getImageData(0, 0, 512, 512);
    const data = imageData.data;

    // Add subtle detail bumps
    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 20;
        data[i] += noise;      // R (X normal)
        data[i + 1] += noise * 0.3; // G (Y normal)
        data[i + 2] += 128 + (Math.random() - 0.5) * 10; // B (Z normal, mostly up)
    }

    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.repeat.set(4, 4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
};

/**
 * Renders the glowing neon edges of a building
 */
const NeonEdges = ({ geometry, color = THEME.primary }: { geometry: THREE.BufferGeometry, color?: string }) => {
    return (
        <lineSegments>
            <edgesGeometry args={[geometry]} />
            <lineBasicMaterial color={color} transparent opacity={THEME.edgeOpacity} linewidth={2} />
        </lineSegments>
    );
};

const Building = ({ data, onHover, onClick, showLabels = false, visualMode = 'normal' }: { data: BuildingData, onHover: any, onClick: any, showLabels?: boolean, visualMode?: 'normal' | 'wireframe' | 'neon' }) => {
    const mesh = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHover] = useState(false);
    const stoneTexture = useMemo(() => generateStoneTexture(), []);
    const detailedStoneTexture = useMemo(() => generateDetailedStoneTexture(), []);
    const detailedNormalMap = useMemo(() => generateDetailedNormalMap(), []);
    const animationRef = useRef<gsap.core.Timeline | null>(null);

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
            // Archway shape with more detail
            return new THREE.TorusGeometry(data.size[0] / 3, 0.35, 16, 32, Math.PI);
        }
        // Default Box with better proportions
        return new THREE.BoxGeometry(data.size[0], data.height, data.size[1], 4, 8, 4);
    }, [data]);

    useFrame((state) => {
        if (!mesh.current) return;
        // Float animation
        const t = state.clock.getElapsedTime();
        if (!hovered) {
            mesh.current.position.y = (data.height / 2) + Math.sin(t * 2 + data.position[0]) * 0.1;
        }

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

        // Kill any existing animation
        if (animationRef.current) {
            animationRef.current.kill();
        }

        // Create bounce animation
        if (mesh.current && groupRef.current) {
            animationRef.current = gsap.timeline();
            animationRef.current.to(
                mesh.current.position,
                {
                    y: (data.height / 2) + 0.8,
                    duration: 0.3,
                    ease: 'back.out'
                },
                0
            );
            // Add scale pulse
            animationRef.current.to(
                mesh.current.scale,
                {
                    x: 1.08,
                    y: 1.08,
                    z: 1.08,
                    duration: 0.3,
                    ease: 'back.out'
                },
                0
            );
        }
    };

    const handlePointerOut = () => {
        setHover(false);
        onHover(null);
        document.body.style.cursor = 'default';

        // Animate back to normal
        if (animationRef.current) {
            animationRef.current.kill();
        }
        if (mesh.current) {
            animationRef.current = gsap.timeline();
            animationRef.current.to(
                mesh.current.position,
                {
                    y: data.height / 2,
                    duration: 0.4,
                    ease: 'elastic.out'
                },
                0
            );
            animationRef.current.to(
                mesh.current.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.4,
                    ease: 'elastic.out'
                },
                0
            );
        }
    };

    return (
        <group ref={groupRef} position={[data.position[0], 0, data.position[1]]}>
            {/* The Building Mesh */}
            <mesh
                ref={mesh}
                geometry={geometry}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={() => onClick(data.id)}
                rotation={[data.type === 'complex' ? -Math.PI / 2 : 0, data.rotationY || 0, 0]} // Rotate extruded geo
                castShadow
                receiveShadow
            >
                {visualMode === 'normal' && (
                    <>
                        <meshStandardMaterial
                            map={stoneTexture}
                            normalMap={detailedNormalMap}
                            color={data.color || THEME.stoneBeige}
                            emissive={data.color || THEME.stoneBeige}
                            emissiveIntensity={hovered ? 0.3 : 0.08}
                            roughness={0.65}
                            metalness={0.1}
                            envMapIntensity={1.2}
                            transparent
                            opacity={hovered ? 0.9 : 0.8}
                            side={THREE.DoubleSide}
                        />
                        <NeonEdges geometry={geometry} color={data.color || THEME.primary} />
                    </>
                )}

                {visualMode === 'wireframe' && (
                    <>
                        <meshBasicMaterial
                            color={data.color || THEME.stoneBeige}
                            wireframe={true}
                            transparent
                            opacity={hovered ? 0.9 : 0.6}
                            side={THREE.DoubleSide}
                        />
                        <NeonEdges geometry={geometry} color={THEME.primary} />
                    </>
                )}

                {visualMode === 'neon' && (
                    <>
                        <meshStandardMaterial
                            map={detailedStoneTexture}
                            normalMap={detailedNormalMap}
                            color={data.color || THEME.stoneBeige}
                            emissive={THEME.primary}
                            emissiveIntensity={hovered ? 0.7 : 0.4}
                            emissiveMap={detailedStoneTexture}
                            metalness={0.12}
                            roughness={0.45}
                            envMapIntensity={1.5}
                            transparent
                            opacity={1}
                            side={THREE.DoubleSide}
                        />
                        <NeonEdges geometry={geometry} color={THEME.primary} />
                    </>
                )}
            </mesh>

            {/* Base Glow Plate */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
                <planeGeometry args={[data.size[0] * 1.2, data.size[1] * 1.2]} />
                <meshBasicMaterial
                    color={visualMode === 'wireframe' ? THEME.primary : (visualMode === 'neon' ? THEME.primary : data.color || THEME.primary)}
                    transparent
                    opacity={visualMode === 'neon' ? (hovered ? 0.4 : 0.15) : (visualMode === 'wireframe' ? (hovered ? 0.35 : 0.08) : (hovered ? 0.35 : 0.08))}
                />
            </mesh>

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
    // Convert points to Three vectors
    const lines = useMemo(() => {
        return ROADS.map(road => {
            const points = road.points.map(p => new THREE.Vector3(p[0], 0.05, p[1]));
            return new THREE.BufferGeometry().setFromPoints(points);
        });
    }, []);

    return (
        <group>
            {/* Main road lines - Electric Blue glowing roads */}
            {lines.map((geo, i) => (
                <group key={i}>
                    {/* Primary glowing line */}
                    <lineSegments geometry={geo}>
                        <lineBasicMaterial color="#00A6FF" transparent opacity={0.8} linewidth={2} />
                    </lineSegments>

                    {/* Secondary glow effect - Orange */}
                    <lineSegments geometry={geo}>
                        <lineBasicMaterial color="#FF5E1F" transparent opacity={0.3} linewidth={4} />
                    </lineSegments>
                </group>
            ))}

            {/* Animated road markers along paths */}
            {ROADS.map((road, roadIdx) =>
                road.points.slice(0, -1).map((point, pointIdx) => (
                    <mesh
                        key={`marker-${roadIdx}-${pointIdx}`}
                        position={[point[0], 0.1, point[1]]}
                        scale={[0.3, 0.1, 0.3]}
                    >
                        <boxGeometry args={[1, 1, 1]} />
                        <meshBasicMaterial color="#B0FF57" transparent opacity={0.6} />
                    </mesh>
                ))
            )}
        </group>
    );
};

const HangingBulb = ({ bulbColor = THEME.primary }: { bulbColor?: string }) => {
    const bulbRef = useRef<THREE.Group>(null);
    const baseYPos = 24; // Position relative to SciFiBase

    // Slight floating animation
    useFrame((state) => {
        if (bulbRef.current) {
            const t = state.clock.getElapsedTime();
            bulbRef.current.position.y = baseYPos + Math.sin(t * 1.5) * 0.2;
        }
    });

    return (
        <group ref={bulbRef} position={[0, baseYPos, 0]}>
            {/* Filament wire holder - connecting to ring */}
            <mesh position={[0, 0.3, 0]} castShadow>
                <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
                <meshStandardMaterial color="#C0C0C0" metalness={0.85} roughness={0.15} envMapIntensity={1.2} />
            </mesh>

            {/* Bulb glass sphere - larger and more visible */}
            <mesh position={[0, -0.5, 0]} castShadow>
                <sphereGeometry args={[3, 32, 32]} />
                <meshPhysicalMaterial
                    color={bulbColor}
                    emissive={bulbColor}
                    emissiveIntensity={1.3}
                    metalness={0.04}
                    roughness={0.1}
                    transparent
                    opacity={0.92}
                    clearcoat={1}
                    clearcoatRoughness={0.05}
                    envMapIntensity={1.4}
                />
            </mesh>

            {/* Bulb glow effect - outer sphere */}
            <mesh position={[0, -0.5, 0]}>
                <sphereGeometry args={[0.55, 32, 32]} />
                <meshBasicMaterial
                    color={bulbColor}
                    transparent
                    opacity={0.45}
                />
            </mesh>

            {/* Bulb base/socket */}
            <mesh position={[0, -1.05, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.18, 0.2, 16]} />
                <meshStandardMaterial color="#2A2A2A" metalness={0.55} roughness={0.45} envMapIntensity={1.1} />
            </mesh>

            {/* Base threads detail */}
            <mesh position={[0, -1.2, 0]} castShadow>
                <cylinderGeometry args={[0.19, 0.19, 0.1, 16]} />
                <meshStandardMaterial color="#1A1A1A" metalness={0.65} roughness={0.35} />
            </mesh>

            {/* Light emission from bulb - stronger */}
            <pointLight
                position={[0, -0.5, 0]}
                color={bulbColor}
                intensity={2.0}
                distance={25}
            />
        </group>
    );
};

const SciFiBase = ({ bulbColor = THEME.primary }: { bulbColor?: string }) => {
    // The "Projector" look at the bottom
    return (
        <group position={[0, -2, 0]}>
            {/* Main Cylinder Base */}
            <mesh position={[0, 1, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[28, 20, 2, 64]} />
                <meshStandardMaterial color="#021014" metalness={0.75} roughness={0.25} envMapIntensity={1.3} />
            </mesh>

            {/* Glowing Ring */}
            <mesh position={[0, 2.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <ringGeometry args={[26, 27, 64]} />
                <meshBasicMaterial color={THEME.primary} transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>

            {/* Hanging Bulb from Ring */}
            <HangingBulb bulbColor={bulbColor} />

            {/* Decorative Outer Rings */}
            <mesh position={[0, 0.5, 0]}>
                <torusGeometry args={[25, 0.5, 16, 100]} />
                <meshStandardMaterial color="#004455" />
            </mesh>
        </group>
    );
};

const HolographicTrees = ({ visualMode = 'normal', isMobile = false }: { visualMode?: 'normal' | 'wireframe' | 'neon', isMobile?: boolean }) => {
    // Arrange trees along the circumference of the circular base
    // Reduce tree count on mobile for better performance
    let count: number;
    if (isMobile) {
        count = 30; // Significantly reduced for mobile
    } else if (visualMode === 'neon') {
        count = 100;
    } else if (visualMode === 'wireframe') {
        count = 60;
    } else {
        count = 80;
    }
    const circumferenceRadius = 27.5; // Radius of the circular base
    const trees = useMemo(() => {
        const temp = [];
        // Arrange trees evenly spaced around the circumference
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2; // Evenly distributed angles
            const x = Math.cos(angle) * circumferenceRadius;
            const z = Math.sin(angle) * circumferenceRadius;
            const scale = 0.65 + Math.random() * 0.3; // Consistent scale variation
            temp.push({
                position: [x, 0, z] as [number, number, number],
                scale: scale,
                colorVariant: i % 3 // Rotate through colors for even distribution
            });
        }
        return temp;
    }, [count]);

    const treeColors = [
        '#B0FF57',    // Lime Green - primary
        '#00A6FF',    // Electric Blue - accent
        '#FF85C0',    // Bubblegum Pink - accent
    ];

    return (
        <group>
            {/* Large cone-shaped holographic trees */}
            {trees.map((data, i) => {
                const treeColor = treeColors[data.colorVariant];
                return (
                    <group key={i} position={data.position}>
                        {/* Main tree cone */}
                        <mesh scale={[data.scale, data.scale * 1.5, data.scale]} castShadow receiveShadow>
                            <coneGeometry args={[0.8, 2, 8]} />
                            {visualMode === 'wireframe' ? (
                                <meshBasicMaterial
                                    color={THEME.primary}
                                    wireframe={true}
                                    transparent
                                    opacity={0.8}
                                />
                            ) : visualMode === 'neon' ? (
                                <meshPhysicalMaterial
                                    color={treeColor}
                                    emissive={treeColor}
                                    emissiveIntensity={1.3}
                                    transparent
                                    opacity={0.95}
                                    metalness={0.5}
                                    roughness={0.25}
                                    clearcoat={0.8}
                                    clearcoatRoughness={0.1}
                                    envMapIntensity={1.3}
                                />
                            ) : (
                                <meshPhysicalMaterial
                                    color={treeColor}
                                    emissive={treeColor}
                                    emissiveIntensity={0.45}
                                    transparent
                                    opacity={0.75}
                                    metalness={0.25}
                                    roughness={0.55}
                                    envMapIntensity={1.1}
                                />
                            )}
                        </mesh>

                        {/* Glowing tree outline */}
                        <mesh scale={[data.scale * 1.05, data.scale * 1.55, data.scale * 1.05]}>
                            <coneGeometry args={[0.8, 2, 8]} />
                            <meshBasicMaterial
                                color={treeColor}
                                transparent
                                opacity={visualMode === 'neon' ? 0.55 : 0.35}
                                wireframe
                            />
                        </mesh>

                        {/* Tree trunk - darker base */}
                        <mesh position={[0, -0.5, 0]} scale={[data.scale * 0.3, data.scale * 0.8, data.scale * 0.3]} castShadow receiveShadow>
                            <cylinderGeometry args={[0.4, 0.5, 1, 4]} />
                            {visualMode === 'neon' ? (
                                <meshPhysicalMaterial
                                    color="#1A1A1A"
                                    emissive={THEME.primary}
                                    emissiveIntensity={0.85}
                                    metalness={0.75}
                                    roughness={0.25}
                                    envMapIntensity={1.2}
                                />
                            ) : (
                                <meshStandardMaterial
                                    color="#1A1A1A"
                                    emissive="#FF5E1F"
                                    emissiveIntensity={visualMode === 'wireframe' ? 0 : 0.25}
                                    roughness={0.8}
                                />
                            )}
                        </mesh>
                    </group>
                );
            })}

            {/* Ambient tree particles for depth */}
            <group>
                {trees.slice(0, 20).map((data, i) => (
                    <mesh
                        key={`particle-${i}`}
                        position={[data.position[0], 1 + Math.random() * 2, data.position[2]]}
                        scale={[0.2, 0.2, 0.2]}
                    >
                        <sphereGeometry args={[1, 4, 4]} />
                        <meshBasicMaterial
                            color={treeColors[i % 3]}
                            transparent
                            opacity={0.4}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
};

const GrassBlades = () => {
    const deviceCapability = useDeviceCapability();

    // Define ground areas where grass should be rendered
    const groundAreas = [
        { center: [-5, -22], size: [15, 6], name: 'stage ground' },
        { center: [-3, -2], size: [9, 7], name: 'AI ground' },
        { center: [15, -18.5], size: [10, 10], name: 'statue ground' },
        { center: [-5, 22], size: [30, 15], name: 'football ground' }
    ];

    const isPointInGround = (x: number, z: number): boolean => {
        for (let area of groundAreas) {
            const [cx, cz] = area.center;
            const [w, h] = area.size;
            if (Math.abs(x - cx) <= w / 2 && Math.abs(z - cz) <= h / 2) {
                return true;
            }
        }
        return false;
    };

    const grassBlades = useMemo(() => {
        const temp = [];
        const grassPerArea = deviceCapability.isMobile ? 20 : 80; // Reduce for mobile

        for (let area of groundAreas) {
            const [cx, cz] = area.center;
            const [w, h] = area.size;

            for (let i = 0; i < grassPerArea; i++) {
                const x = cx + (Math.random() - 0.5) * w;
                const z = cz + (Math.random() - 0.5) * h;

                const scale = 0.5 + Math.random() * 0.8;
                temp.push({
                    position: [x, 0.05, z] as [number, number, number],
                    scale: scale,
                    rotation: Math.random() * Math.PI * 2
                });
            }
        }
        return temp;
    }, []);

    return (
        <group>
            {/* Individual grass blades only on designated ground areas */}
            {grassBlades.map((data, i) => (
                <group key={i} position={data.position} rotation={[0, data.rotation, 0]}>
                    {/* Grass blade 1 */}
                    <mesh scale={[data.scale * 0.15, data.scale * 0.6, data.scale * 0.1]} castShadow receiveShadow>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial
                            color={Math.random() > 0.5 ? '#2D7A3E' : '#3A9C52'}
                            emissive="#2D7A3E"
                            emissiveIntensity={0.12}
                            metalness={0.05}
                            roughness={0.75}
                        />
                    </mesh>
                    {/* Grass blade 2 - rotated */}
                    <mesh rotation={[0, Math.PI / 3, 0]} scale={[data.scale * 0.15, data.scale * 0.5, data.scale * 0.1]} castShadow receiveShadow>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial
                            color="#3A9C52"
                            emissive="#2D7A3E"
                            emissiveIntensity={0.1}
                            metalness={0.05}
                            roughness={0.75}
                        />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

// --- Main Export ---

export function HolographicMap({ onBuildingHover, onBuildingClick, isLoading = false, isDayMode = false, visualMode = 'normal' }: { onBuildingHover: (id: string | null) => void, onBuildingClick: (id: string) => void, isLoading?: boolean, isDayMode?: boolean, visualMode?: 'normal' | 'wireframe' | 'neon' }) {
    // Rotation logic to match the "Diamond" orientation in the image
    // The reference image is isometric (Diamond shape).
    // We rotate the whole content by 45 degrees (Math.PI / 4)

    const deviceCapability = useDeviceCapability();
    const [showLabels, setShowLabels] = useState(false);
    const grassTexture = useMemo(() => generateGrassTexture(), []);
    const metallicTexture = useMemo(() => generateMetallicGroundTexture(), []);
    const normalMap = useMemo(() => generateMetallicNormalMap(), []);
    const detailedStoneTexture = useMemo(() => generateDetailedStoneTexture(), []);
    const detailedNormalMap = useMemo(() => generateDetailedNormalMap(), []);

    // Determine bulb color based on day/night mode
    const bulbColor = isDayMode ? '#FFEB3B' : '#FF85C0';

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
            <ambientLight intensity={visualMode === 'neon' ? 0.35 : 0.2} color={visualMode === 'neon' ? '#FFFFFF' : '#FFFFFF'} />
            <pointLight position={[10, 20, 10]} intensity={visualMode === 'neon' ? 1.5 : 1} color={THEME.primary} distance={60} />
            {!deviceCapability.isMobile && (
                <pointLight position={[-10, 20, -10]} intensity={visualMode === 'neon' ? 1.2 : 0.5} color="#00ffaa" distance={60} />
            )}

            {/* Enhanced ground reflection lighting - 360 degree shine (only on non-mobile) */}
            {!deviceCapability.isMobile && (
                <>
                    <pointLight position={[20, 12, 20]} intensity={visualMode === 'neon' ? 1.5 : 1.0} color="#FFFFFF" distance={80} />
                    <pointLight position={[-20, 12, 20]} intensity={visualMode === 'neon' ? 1.5 : 1.0} color="#FFFFFF" distance={80} />
                    <pointLight position={[20, 12, -20]} intensity={visualMode === 'neon' ? 1.3 : 1.0} color="#00DDDD" distance={80} />
                    <pointLight position={[-20, 12, -20]} intensity={visualMode === 'neon' ? 1.3 : 1.0} color="#00DDDD" distance={80} />
                </>
            )}

            {/* Projector Base */}
            <SciFiBase bulbColor={bulbColor} />

            {/* The Map Content - Rotated to form Diamond shape */}
            <group rotation={[0, Math.PI / 4, 0]} position={[0, 0.5, 0]}>

                {/* Ground Plane with Metallic Grey Base Material */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
                    <circleGeometry args={[30, 128]} />
                    {visualMode === 'wireframe' ? (
                        <meshBasicMaterial
                            wireframe={true}
                            color={THEME.primary}
                            transparent
                            opacity={0.7}
                            side={THREE.DoubleSide}
                        />
                    ) : visualMode === 'neon' ? (
                        <meshStandardMaterial
                            map={detailedStoneTexture}
                            normalMap={detailedNormalMap}
                            color="#A69F96"
                            emissive={THEME.primary}
                            emissiveIntensity={0.28}
                            emissiveMap={detailedStoneTexture}
                            metalness={0.2}
                            roughness={0.35}
                            envMapIntensity={1.4}
                            side={THREE.DoubleSide}
                        />
                    ) : (
                        <meshStandardMaterial
                            map={metallicTexture}
                            normalMap={normalMap}
                            color="#9A9A9A"
                            metalness={0.8}
                            roughness={0.2}
                            emissive="#7A7A7A"
                            emissiveIntensity={0.15}
                            emissiveMap={metallicTexture}
                            envMapIntensity={1.6}
                            side={THREE.DoubleSide}
                        />
                    )}
                </mesh>

                <HoloRoads />
                <HolographicTrees visualMode={visualMode} isMobile={deviceCapability.isMobile} />

                {BUILDINGS.map((building) => (
                    <Building
                        key={building.id}
                        data={building}
                        onHover={onBuildingHover}
                        onClick={onBuildingClick}
                        showLabels={showLabels}
                        visualMode={visualMode}
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

export { BUILDINGS };
