import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, PerspectiveCamera, PresentationControls } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const Coin = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Coin Body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.4, 32]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2} 
          emissive="#FFD700"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.1, 16, 100]} />
        <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Front Text */}
      <Text
        position={[0, 0, 0.25]}
        fontSize={0.35}
        color="#8B4513"
        font="https://fonts.gstatic.com/s/pressstart2p/v15/e3t4ve96Z8rk0NW94Pfr88dX8402.woff"
        maxWidth={4}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        AARUNYA 2026{"\n"}MITS GWALIOR
      </Text>

      {/* Back Text */}
      <Text
        position={[0, 0, -0.25]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.35}
        color="#8B4513"
        font="https://fonts.gstatic.com/s/pressstart2p/v15/e3t4ve96Z8rk0NW94Pfr88dX8402.woff"
        maxWidth={4}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        AARUNYA 2026{"\n"}MITS GWALIOR
      </Text>

      {/* Register Text on Rim or just floating above? 
          User said "register button themed as a 3d coin". 
          I'll add "REGISTER" in a catchy way. */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="#FF0080"
        font="https://fonts.gstatic.com/s/pressstart2p/v15/e3t4ve96Z8rk0NW94Pfr88dX8402.woff"
        outlineWidth={0.05}
        outlineColor="#FFFFFF"
      >
        REGISTER
      </Text>
    </group>
  );
};

export const RegisterCoinButton: React.FC = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="relative w-48 h-48 md:w-64 md:h-64 cursor-pointer z-50 transition-transform duration-300 hover:scale-110"
      onClick={() => navigate('/register')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas shadows alpha>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Coin />
          </PresentationControls>
        </Float>
      </Canvas>
      
      {/* Pixel-art style shadow/glow beneath the coin */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/20 blur-xl rounded-full transition-opacity duration-300 ${hovered ? 'opacity-40' : 'opacity-20'}`} />
    </div>
  );
};
