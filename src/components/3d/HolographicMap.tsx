import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text, Instance, Instances, ContactShadows, Environment, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// --- Types ---
interface BuildingData {
    id: string;
    name: string;
    hindiName: string;
    position: [number, number];
    size: [number, number];
    height: number;
    type?: 'complex' | 'simple' | 'landmark' | 'curved';
    icon?: string;
    color?: string;
    rotationY?: number;
}

// --- Configuration --- Realistic & Tech Theme
const THEME = {
    primary: '#BC13FE',     // Neon Purple (Accent)
    secondary: '#00FFFF',   // Cyan (Accent)
    building: '#F0F0F0',    // Concrete
    roof: '#333333',        // Dark Roof
    grass: '#2D5A27',       // Natural Green
    road: '#1A1A1A',        // Asphalt
    ground: '#050505',      // Dark Base
    windowColor: '#FFDD33'  // Warm Window Light
};

// --- Data: Campus Layout ---
const BUILDINGS: BuildingData[] = [
    { id: 'main-gate', name: 'MITS Main Gate', hindiName: 'मुख्य द्वार', position: [5, -25], size: [4, 2], height: 2, type: 'landmark', icon: '🎓' },
    { id: 'old-building', name: 'Old Building', hindiName: 'सिविल विभाग', position: [-6, -10], size: [16, 7], height: 4, type: 'complex' },
    { id: 'canteen', name: 'Canteen', hindiName: 'कैंटीन', position: [-15, -12], size: [4, 4], height: 2, type: 'simple', icon: '🍽️' },
    { id: 'ai-department', name: 'AI department', hindiName: 'एआई विभाग', position: [-3, 4], size: [9, 5], height: 8, type: 'simple', icon: '🤖' },
    { id: 'library', name: 'Central Library', hindiName: 'पुस्तकालय', position: [-7, -16], size: [4, 3], height: 5, type: 'complex', icon: '📚' },
    { id: 'stage-ground', name: 'stage ground', hindiName: 'स्टेज ग्राउंड', position: [-5, -22], size: [15, 6], height: 0.1, type: 'landmark', color: '#2D5A27' },
    { id: 'ai-ground', name: 'AI ground', hindiName: 'एआई ग्राउंड', position: [-3, -2], size: [9, 7], height: 0.1, type: 'landmark', color: '#3A6B35' },
    { id: 'statue-ground', name: 'statue ground', hindiName: 'स्टैच्यू ग्राउंड', position: [15, -18.5], size: [10, 10], height: 0.1, type: 'landmark', color: '#2D5A27' },
    { id: 'football-ground', name: 'football ground', hindiName: 'फुटबॉल ग्राउंड', position: [-5, 22], size: [30, 15], height: 0.1, type: 'landmark', color: '#1B4D17' },
    { id: 'biotech', name: 'Biotech Dept', hindiName: 'जैव प्रौद्योगिकी', position: [15, -11], size: [5, 5], height: 3.5, type: 'simple' },
    { id: 'dispensary', name: 'Dispensary', hindiName: 'औषधालय', position: [15, -4], size: [4, 4], height: 2, type: 'simple', icon: 'H' },
    { id: 'architecture', name: 'Architecture Dept', hindiName: 'वास्तुकला', position: [-10, -3], size: [4, 4], height: 4, type: 'complex' },
    { id: 'mechanical-dept', name: 'Mechanical Dept', hindiName: 'मैकेनिकल विभाग', position: [0, -5.5], size: [4, 4], height: 4, type: 'complex' },
    { id: 'statue-base', name: 'statue base', hindiName: 'स्टैच्यू आधार', position: [15, -18.5], size: [2, 2], height: 1, type: 'simple', color: '#A9A9A9' },
    { id: 'statue', name: 'statue', hindiName: 'मूर्ति', position: [15, -18.5], size: [0.5, 0.5], height: 3, type: 'simple', color: '#FFD700' },
    { id: 'mits-main', name: 'mechanical workshop', hindiName: 'मैकेनिकल वर्कशॉप', position: [0, 15], size: [7, 5], height: 5, type: 'complex', icon: '⚙️' },
    { id: 'diamond-gate', name: 'Diamond Jubilee Gate', hindiName: 'डायमंड गेट', position: [-20, 16], size: [4, 1], height: 3, type: 'landmark', rotationY: Math.PI / 2 },
];

const ROADS = [
    { start: [-20, -20], end: [20, -20], width: 2 },
    { start: [20, -20], end: [20, 20], width: 2 },
    { start: [20, 20], end: [-20, 20], width: 2 },
    { start: [-20, 20], end: [-20, -20], width: 2 },
    { start: [0, -25], end: [0, 25], width: 1.5 },
    { start: [-25, 0], end: [25, 0], width: 1.5 },
];

// --- Helper: Texture Generation ---
const generateTextures = () => {
    const windowCanvas = document.createElement('canvas');
    windowCanvas.width = 128; windowCanvas.height = 128;
    const wctx = windowCanvas.getContext('2d')!;
    wctx.fillStyle = '#FFFFFF'; wctx.fillRect(0,0,128,128);
    wctx.fillStyle = '#222222';
    for(let x=10; x<120; x+=25) for(let y=10; y<120; y+=25) wctx.fillRect(x,y,15,15);
    const windowTexture = new THREE.CanvasTexture(windowCanvas);
    windowTexture.wrapS = windowTexture.wrapT = THREE.RepeatWrapping;
    windowTexture.repeat.set(2, 2);

    const roadCanvas = document.createElement('canvas');
    roadCanvas.width = 256; roadCanvas.height = 256;
    const rctx = roadCanvas.getContext('2d')!;
    rctx.fillStyle = '#1A1A1A'; rctx.fillRect(0,0,256,256);
    rctx.strokeStyle = '#555555'; rctx.setLineDash([10, 10]); rctx.lineWidth = 4;
    rctx.beginPath(); rctx.moveTo(128,0); rctx.lineTo(128,256); rctx.stroke();
    const roadTexture = new THREE.CanvasTexture(roadCanvas);
    roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;

    return { window: windowTexture, road: roadTexture };
};

// --- Sub-Components ---

const Building = ({ data, onHover, onClick, showLabels, textures, visualMode }: any) => {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    const geometry = useMemo(() => {
        if (data.type === 'complex') {
            const shape = new THREE.Shape();
            const [w, h] = [data.size[0] / 2, data.size[1] / 2];
            shape.moveTo(-w, -h); shape.lineTo(w, -h); shape.lineTo(w, h); shape.lineTo(-w, h);
            const hole = new THREE.Path();
            const p = 1.2; hole.moveTo(-w+p, -h+p); hole.lineTo(w-p, -h+p); hole.lineTo(w-p, h-p); hole.lineTo(-w+p, h-p);
            shape.holes.push(hole);
            return new THREE.ExtrudeGeometry(shape, { depth: data.height, bevelEnabled: true, bevelThickness: 0.05 });
        }
        return new THREE.BoxGeometry(data.size[0], data.height, data.size[1]);
    }, [data]);

    return (
        <group position={[data.position[0], 0, data.position[1]]}>
            <mesh
                ref={mesh}
                geometry={geometry}
                rotation={[data.type === 'complex' ? -Math.PI / 2 : 0, data.rotationY || 0, 0]}
                position={[0, data.height / 2, 0]}
                onPointerOver={(e) => { e.stopPropagation(); setHover(true); onHover(data.id); }}
                onPointerOut={() => { setHover(false); onHover(null); }}
                onClick={() => onClick(data.id)}
                castShadow
                receiveShadow
            >
                {visualMode === 'wireframe' ? (
                    <meshBasicMaterial color={THEME.primary} wireframe />
                ) : (
                    <meshStandardMaterial
                        map={textures.window}
                        color={data.color || THEME.building}
                        roughness={0.4}
                        metalness={0.1}
                        emissive={hovered ? THEME.primary : '#000000'}
                        emissiveIntensity={0.2}
                    />
                )}
            </mesh>
            
            {data.type === 'complex' && visualMode !== 'wireframe' && (
                <mesh position={[0, data.height, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[data.size[0], data.size[1]]} />
                    <meshStandardMaterial color={THEME.roof} roughness={0.9} />
                </mesh>
            )}

            {showLabels && (
                <Html position={[0, data.height + 1.5, 0]} center distanceFactor={15}>
                    <div className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-[10px] text-white whitespace-nowrap font-orbitron shadow-xl pointer-events-none">
                        <span className="text-primary mr-1">●</span> {data.name}
                    </div>
                </Html>
            )}
        </group>
    );
};

const RealisticFoliage = ({ count = 80 }: { count?: number }) => {
    const trunkGeo = useMemo(() => new THREE.CylinderGeometry(0.1, 0.15, 0.8), []);
    const leafGeo = useMemo(() => new THREE.SphereGeometry(0.6, 8, 8), []);
    const trunkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#402905' }), []);
    const leafMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1B4D17', roughness: 0.9 }), []);

    const positions = useMemo(() => {
        return Array.from({ length: count }, () => {
            const angle = Math.random() * Math.PI * 2;
            const r = 22 + Math.random() * 8;
            return [Math.cos(angle) * r, 0, Math.sin(angle) * r];
        });
    }, [count]);

    return (
        <group>
            <Instances geometry={trunkGeo} material={trunkMat}>
                {positions.map((p, i) => <Instance key={i} position={[p[0], 0.4, p[2]]} />)}
            </Instances>
            <Instances geometry={leafGeo} material={leafMat}>
                {positions.map((p, i) => <Instance key={i} position={[p[0], 1.2, p[2]]} scale={[1, 1.2, 1]} />)}
            </Instances>
        </group>
    );
};

const Roads = ({ textures }: any) => {
    return (
        <group>
            {ROADS.map((r, i) => {
                const dx = r.end[0] - r.start[0];
                const dz = r.end[1] - r.start[1];
                const len = Math.sqrt(dx*dx + dz*dz);
                const angle = Math.atan2(dz, dx);
                return (
                    <mesh key={i} position={[(r.start[0]+r.end[0])/2, 0.02, (r.start[1]+r.end[1])/2]} rotation={[-Math.PI/2, 0, -angle]} receiveShadow>
                        <planeGeometry args={[len, r.width]} />
                        <meshStandardMaterial map={textures.road} transparent opacity={0.9} />
                    </mesh>
                );
            })}
        </group>
    );
};

const Streetlights = ({ count = 12 }: { count?: number }) => {
    const poleGeo = useMemo(() => new THREE.CylinderGeometry(0.05, 0.05, 2.5), []);
    const lightGeo = useMemo(() => new THREE.SphereGeometry(0.15, 8, 8), []);
    const poleMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#333333' }), []);
    const lightMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#FFDD33' }), []);

    const positions = useMemo(() => [
        [-18, 0, -18], [18, 0, 18], [0, 0, 22], [0, 0, -22]
    ], []);

    return (
        <group>
            <Instances geometry={poleGeo} material={poleMat}>
                {positions.map((p, i) => <Instance key={i} position={[p[0], 1.25, p[2]]} />)}
            </Instances>
            <Instances geometry={lightGeo} material={lightMat}>
                {positions.map((p, i) => (
                    <Instance key={i} position={[p[0], 2.5, p[2]]} />
                ))}
            </Instances>
            {positions.map((p, i) => (
                <pointLight key={i} position={[p[0], 2.5, p[2]]} intensity={0.8} distance={10} color="#FFDD33" />
            ))}
        </group>
    );
};

// --- Main Component ---

export function HolographicMap({ onBuildingHover, onBuildingClick, isLoading, visualMode = 'normal' }: any) {
    const [showLabels, setShowLabels] = useState(false);
    const textures = useMemo(() => generateTextures(), []);

    useEffect(() => {
        const timer = setTimeout(() => setShowLabels(!isLoading), 1500);
        return () => clearTimeout(timer);
    }, [isLoading]);

    return (
        <group>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Environment preset="city" />
            <ContactShadows
                position={[0, 0, 0]}
                opacity={0.4}
                scale={60}
                blur={2.5}
                far={10}
                resolution={256}
                color="#000000"
                frames={1}
            />
            
            <group rotation={[0, Math.PI / 4, 0]}>
                {/* Ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <circleGeometry args={[35, 64]} />
                    <meshStandardMaterial color={THEME.ground} roughness={0.8} metalness={0.1} />
                </mesh>

                {/* Grass Areas */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                    <circleGeometry args={[34.8, 64]} />
                    <meshStandardMaterial color={THEME.grass} roughness={1} />
                </mesh>

                <Roads textures={textures} />
                <RealisticFoliage count={50} />
                <Streetlights />

                {BUILDINGS.map((b) => (
                    <Building
                        key={b.id}
                        data={b}
                        onHover={onBuildingHover}
                        onClick={onBuildingClick}
                        showLabels={showLabels}
                        textures={textures}
                        visualMode={visualMode}
                    />
                ))}

                <Text position={[-25, 0.1, 0]} rotation={[-Math.PI/2, 0, Math.PI/2]} fontSize={1.5} color={THEME.primary}>
                    MELA ROAD
                </Text>
            </group>

            {/* Base Design */}
            <mesh position={[0, -0.6, 0]}>
                <cylinderGeometry args={[36, 35, 1, 64]} />
                <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[35.1, 35.5, 64]} />
                <meshBasicMaterial color={THEME.primary} transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

export { BUILDINGS };
