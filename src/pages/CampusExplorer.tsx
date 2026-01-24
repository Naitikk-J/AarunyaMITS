import React, { useState, useCallback, useEffect, Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Preload, Stars, Environment, ContactShadows, Html, Text, Instance, Instances } from '@react-three/drei';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

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

const Building = ({ data, textures, showLabels }: any) => {
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
                onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
                onPointerOut={() => setHover(false)}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    map={textures.window}
                    color={data.color || THEME.building}
                    roughness={0.4}
                    metalness={0.1}
                    emissive={hovered ? THEME.primary : '#000000'}
                    emissiveIntensity={0.2}
                />
            </mesh>
            
            {data.type === 'complex' && (
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

const RealisticFoliage = ({ count = 50 }: { count?: number }) => {
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

const Streetlights = () => {
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

const Car = ({ position, rotation }: { position: [number, number, number], rotation: number }) => {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh position={[0, 0.3, 0]} castShadow>
                <boxGeometry args={[1.2, 0.4, 2.5]} />
                <meshStandardMaterial color="#ff00ff" metalness={0.8} roughness={0.2} emissive="#ff00ff" emissiveIntensity={0.3} />
            </mesh>
            <mesh position={[0, 0.6, -0.2]} castShadow>
                <boxGeometry args={[1, 0.35, 1.2]} />
                <meshStandardMaterial color="#1a0030" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0.5, 0.1, 0.8]}>
                <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
                <meshStandardMaterial color="#111111" />
            </mesh>
            <mesh position={[-0.5, 0.1, 0.8]}>
                <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
                <meshStandardMaterial color="#111111" />
            </mesh>
            <mesh position={[0.5, 0.1, -0.8]}>
                <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
                <meshStandardMaterial color="#111111" />
            </mesh>
            <mesh position={[-0.5, 0.1, -0.8]}>
                <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
                <meshStandardMaterial color="#111111" />
            </mesh>
            <pointLight position={[0, 0.4, 1.3]} intensity={2} distance={8} color="#ffffff" />
            <pointLight position={[0, 0.4, -1.3]} intensity={0.5} distance={3} color="#ff0000" />
        </group>
    );
};

const DrivingCamera = ({ carPosition, carRotation }: { carPosition: [number, number, number], carRotation: number }) => {
    const { camera } = useThree();
    
    useFrame(() => {
        const offsetX = Math.sin(carRotation) * -8;
        const offsetZ = Math.cos(carRotation) * -8;
        
        camera.position.lerp(
            new THREE.Vector3(
                carPosition[0] + offsetX,
                carPosition[1] + 6,
                carPosition[2] + offsetZ
            ),
            0.1
        );
        
        const target = new THREE.Vector3(carPosition[0], carPosition[1] + 0.5, carPosition[2]);
        camera.lookAt(target);
    });
    
    return null;
};

const CampusMap = ({ textures, isDriving, carPosition, carRotation }: any) => {
    return (
        <group rotation={[0, Math.PI / 4, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <circleGeometry args={[35, 64]} />
                <meshStandardMaterial color={THEME.ground} roughness={0.8} metalness={0.1} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <circleGeometry args={[34.8, 64]} />
                <meshStandardMaterial color={THEME.grass} roughness={1} />
            </mesh>
            <Roads textures={textures} />
            <RealisticFoliage count={50} />
            <Streetlights />
            {BUILDINGS.map((b) => (
                <Building key={b.id} data={b} textures={textures} showLabels={!isDriving} />
            ))}
            <Text position={[-25, 0.1, 0]} rotation={[-Math.PI/2, 0, Math.PI/2]} fontSize={1.5} color={THEME.primary}>
                MELA ROAD
            </Text>
            {isDriving && <Car position={carPosition} rotation={carRotation} />}
        </group>
    );
};

const MobileJoystick = ({ onMove }: { onMove: (x: number, y: number) => void }) => {
    const joystickRef = useRef<HTMLDivElement>(null);
    const knobRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });

    const handleStart = (clientX: number, clientY: number) => {
        setIsDragging(true);
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (!isDragging || !joystickRef.current) return;
        
        const rect = joystickRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        let deltaX = clientX - centerX;
        let deltaY = clientY - centerY;
        
        const maxRadius = 40;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance > maxRadius) {
            deltaX = (deltaX / distance) * maxRadius;
            deltaY = (deltaY / distance) * maxRadius;
        }
        
        setKnobPos({ x: deltaX, y: deltaY });
        onMove(deltaX / maxRadius, -deltaY / maxRadius);
    };

    const handleEnd = () => {
        setIsDragging(false);
        setKnobPos({ x: 0, y: 0 });
        onMove(0, 0);
    };

    return (
        <div
            ref={joystickRef}
            className="fixed bottom-8 left-8 w-32 h-32 rounded-full z-50 md:hidden"
            style={{
                background: 'radial-gradient(circle, rgba(188,19,254,0.3) 0%, rgba(0,255,255,0.2) 100%)',
                border: '3px solid #ff00ff',
                boxShadow: '0 0 30px rgba(188,19,254,0.5), inset 0 0 20px rgba(0,255,255,0.3)'
            }}
            onTouchStart={(e) => {
                e.preventDefault();
                handleStart(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
                e.preventDefault();
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchEnd={handleEnd}
            onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
            onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
        >
            <div
                ref={knobRef}
                className="absolute w-14 h-14 rounded-full"
                style={{
                    background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
                    boxShadow: '0 0 20px #ff00ff',
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${knobPos.x}px), calc(-50% + ${knobPos.y}px))`,
                    transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                }}
            />
            <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '6px', color: '#00ffff', textShadow: '0 0 10px #00ffff' }}
            >
                {!isDragging && 'MOVE'}
            </div>
        </div>
    );
};

const CampusExplorer = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [webglSupported, setWebglSupported] = useState(true);
    const [isDriving, setIsDriving] = useState(false);
    const [carPosition, setCarPosition] = useState<[number, number, number]>([0, 0, -20]);
    const [carRotation, setCarRotation] = useState(0);
    const [speed, setSpeed] = useState(0);
    const keysPressed = useRef<Set<string>>(new Set());
    const joystickInput = useRef({ x: 0, y: 0 });
    const textures = useMemo(() => generateTextures(), []);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            setWebglSupported(false);
            setIsLoading(false);
            return;
        }
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isDriving) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            keysPressed.current.add(e.key.toLowerCase());
            if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            keysPressed.current.delete(e.key.toLowerCase());
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isDriving]);

    useEffect(() => {
        if (!isDriving) return;

        const interval = setInterval(() => {
            const keys = keysPressed.current;
            let newSpeed = speed;
            let newRotation = carRotation;

            const forward = keys.has('w') || keys.has('arrowup') || joystickInput.current.y > 0.3;
            const backward = keys.has('s') || keys.has('arrowdown') || joystickInput.current.y < -0.3;
            const left = keys.has('a') || keys.has('arrowleft') || joystickInput.current.x < -0.3;
            const right = keys.has('d') || keys.has('arrowright') || joystickInput.current.x > 0.3;

            if (forward) {
                newSpeed = Math.min(speed + 0.02, 0.3);
            } else if (backward) {
                newSpeed = Math.max(speed - 0.02, -0.15);
            } else {
                newSpeed = speed * 0.95;
                if (Math.abs(newSpeed) < 0.01) newSpeed = 0;
            }

            if (Math.abs(newSpeed) > 0.01) {
                if (left) newRotation += 0.03;
                if (right) newRotation -= 0.03;
            }

            const newX = carPosition[0] + Math.sin(newRotation) * newSpeed;
            const newZ = carPosition[2] + Math.cos(newRotation) * newSpeed;

            const boundedX = Math.max(-30, Math.min(30, newX));
            const boundedZ = Math.max(-30, Math.min(30, newZ));

            setCarPosition([boundedX, 0, boundedZ]);
            setCarRotation(newRotation);
            setSpeed(newSpeed);
        }, 16);

        return () => clearInterval(interval);
    }, [isDriving, carPosition, carRotation, speed]);

    const handleJoystickMove = useCallback((x: number, y: number) => {
        joystickInput.current = { x, y };
    }, []);

    const startDriving = () => {
        setIsDriving(true);
        setCarPosition([0, 0, -20]);
        setCarRotation(0);
        setSpeed(0);
    };

    const stopDriving = () => {
        setIsDriving(false);
        setSpeed(0);
        keysPressed.current.clear();
        joystickInput.current = { x: 0, y: 0 };
    };

    return (
        <div className="min-h-screen bg-[#05010D] text-white font-orbitron selection:bg-primary selection:text-black">
            <MainNavigation />

            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05010D]">
                    <div className="text-center">
                        <div className="text-6xl mb-8 animate-pulse">🏛️</div>
                        <div 
                            className="text-xl tracking-[0.3em] text-primary animate-pulse"
                            style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '12px' }}
                        >
                            LOADING CAMPUS...
                        </div>
                        <div className="mt-4 w-48 h-2 bg-white/10 mx-auto overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse" style={{ width: '60%' }} />
                        </div>
                    </div>
                </div>
            )}

            <div className="relative pt-32 pb-12 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] pointer-events-none" />
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
                    CAMPUS EXPLORER
                </h1>
                <div className="h-1 w-[120px] bg-primary mx-auto shadow-neon" />
                <p className="mt-6 text-sm font-share-tech text-muted-foreground tracking-[0.4em] uppercase opacity-60 max-w-3xl mx-auto px-6">
                    // EXPLORE MITS CAMPUS IN 3D
                </p>

                <div className="mt-8 flex justify-center gap-4 flex-wrap px-6">
                    {!isDriving ? (
                        <Button
                            onClick={startDriving}
                            className="font-orbitron text-[10px] tracking-[0.3em] uppercase px-8 py-6 rounded-none border-2 bg-gradient-to-b from-[#ff00ff] to-[#cc00cc] border-[#ff66ff] text-white hover:shadow-[0_0_30px_#ff00ff] transition-all"
                            style={{
                                fontFamily: '"Press Start 2P", monospace',
                                fontSize: '10px',
                                boxShadow: 'inset -2px -2px 0 #880088, inset 2px 2px 0 #ff66ff, 0 0 15px #ff00ff'
                            }}
                        >
                            🚗 DRIVE IN CAMPUS
                        </Button>
                    ) : (
                        <Button
                            onClick={stopDriving}
                            className="font-orbitron text-[10px] tracking-[0.3em] uppercase px-8 py-6 rounded-none border-2 bg-gradient-to-b from-[#00ffff] to-[#0088ff] border-[#66ffff] text-black hover:shadow-[0_0_30px_#00ffff] transition-all"
                            style={{
                                fontFamily: '"Press Start 2P", monospace',
                                fontSize: '10px',
                                boxShadow: 'inset -2px -2px 0 #006688, inset 2px 2px 0 #66ffff, 0 0 15px #00ffff'
                            }}
                        >
                            ✕ EXIT DRIVING
                        </Button>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-6 pb-20">
                <div 
                    className="relative w-full rounded-xl overflow-hidden border-2 border-white/10"
                    style={{ 
                        height: 'calc(100vh - 380px)', 
                        minHeight: '500px',
                        boxShadow: '0 0 60px rgba(188,19,254,0.2), inset 0 0 30px rgba(0,0,0,0.5)'
                    }}
                >
                    {webglSupported ? (
                        <Canvas
                            camera={{ position: [30, 25, 30], fov: 45 }}
                            gl={{
                                antialias: true,
                                alpha: true,
                                stencil: false,
                                depth: true,
                                powerPreference: 'high-performance',
                            }}
                            dpr={Math.min(window.devicePixelRatio, 2)}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <Suspense fallback={null}>
                                <PerspectiveCamera makeDefault position={[30, 25, 30]} fov={45} />
                                
                                {!isDriving && (
                                    <OrbitControls
                                        autoRotate={!isDriving}
                                        autoRotateSpeed={0.5}
                                        enableZoom={true}
                                        enablePan={true}
                                        minDistance={15}
                                        maxDistance={100}
                                    />
                                )}
                                
                                {isDriving && (
                                    <DrivingCamera carPosition={carPosition} carRotation={carRotation} />
                                )}

                                <ambientLight intensity={0.4} />
                                <pointLight position={[20, 30, 20]} intensity={1.5} />
                                <pointLight position={[-20, 25, -20]} intensity={0.8} color="#00A6FF" />
                                <fog attach="fog" args={['#050c15', 50, 300]} />

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

                                <CampusMap 
                                    textures={textures} 
                                    isDriving={isDriving}
                                    carPosition={carPosition}
                                    carRotation={carRotation}
                                />

                                <mesh position={[0, -0.6, 0]}>
                                    <cylinderGeometry args={[36, 35, 1, 64]} />
                                    <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
                                </mesh>
                                <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                                    <ringGeometry args={[35.1, 35.5, 64]} />
                                    <meshBasicMaterial color={THEME.primary} transparent opacity={0.3} />
                                </mesh>

                                <Preload all />
                            </Suspense>
                        </Canvas>
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#0a1a2a] to-[#050c15] text-center">
                            <p className="font-orbitron text-lg text-primary">WebGL is not available on this device.</p>
                        </div>
                    )}

                    {isDriving && (
                        <>
                            <MobileJoystick onMove={handleJoystickMove} />
                            
                            <div 
                                className="absolute top-4 left-4 z-50 px-4 py-3 rounded-lg hidden md:block"
                                style={{
                                    background: 'rgba(0,0,0,0.8)',
                                    border: '2px solid #ff00ff',
                                    boxShadow: '0 0 20px rgba(255,0,255,0.3)'
                                }}
                            >
                                <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#00ffff', marginBottom: '8px' }}>
                                    ═══ CONTROLS ═══
                                </div>
                                <div className="text-[10px] text-white/80 space-y-1" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px' }}>
                                    <div><span className="text-primary">W/↑</span> Forward</div>
                                    <div><span className="text-primary">S/↓</span> Reverse</div>
                                    <div><span className="text-primary">A/←</span> Turn Left</div>
                                    <div><span className="text-primary">D/→</span> Turn Right</div>
                                </div>
                            </div>

                            <div 
                                className="absolute bottom-4 right-4 z-50 px-4 py-2 rounded-lg"
                                style={{
                                    background: 'rgba(0,0,0,0.8)',
                                    border: '2px solid #00ffff',
                                    boxShadow: '0 0 20px rgba(0,255,255,0.3)'
                                }}
                            >
                                <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#ff00ff' }}>
                                    SPEED: {Math.abs(Math.round(speed * 100))} KM/H
                                </div>
                            </div>
                        </>
                    )}

                    <div className="absolute inset-0 pointer-events-none scanlines opacity-20" />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,1,13,0.8) 100%)',
                        }}
                    />
                </div>

                {!isDriving && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: '🎓', title: 'Main Gate', desc: 'Historic entrance since 1957' },
                            { icon: '🤖', title: 'AI Department', desc: 'State-of-the-art research facility' },
                            { icon: '📚', title: 'Central Library', desc: 'Over 100,000 books & resources' }
                        ].map((item, idx) => (
                            <div 
                                key={idx}
                                className="group relative bg-[#0D0221]/60 backdrop-blur-xl border-2 border-white/5 rounded-xl p-6 hover:border-primary transition-all duration-500"
                                style={{ boxShadow: '0 0 30px rgba(188,19,254,0.05)' }}
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
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
