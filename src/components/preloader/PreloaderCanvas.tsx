import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { usePreloader } from '@/contexts/PreloaderContext';
import { ArcadeCabinet } from './ArcadeCabinet';
import { Coin } from './Coin';
import { ParticleExplosion } from './ParticleExplosion';
import { ScreenGlitch } from './ScreenGlitch';
import { CameraController } from './CameraController';
import { PostProcessingEffects } from './PostProcessingEffects';

const KIDCORE_COLORS = {
  cyberGrape: '#6700ff',
  electricViolet: '#8a00ff',
  phlox: '#b700ff',
  heliotrope: '#da00ff',
  magenta: '#f500ff',
  neonGreen: '#ccff00',
  hotPink: '#ff0080',
};

const SceneContent = () => {

  // Ensure scene clears properly with transparent background
  useFrame((state) => {
    const gl = state.gl;
    gl.setClearColor(0x000000, 0); // Transparent clear
  });

  return (
    <>
      {/* Lighting Setup */}
      {/* Main key light - mimics arcade screen glow */}
      <rectAreaLight
        width={2}
        height={1.5}
        intensity={3}
        color={KIDCORE_COLORS.heliotrope}
        position={[0.5, 1, 1.5]}
        rotation={[-0.2, 0.3, 0]}
      />

      {/* Rim light - separates cabinet from background */}
      <spotLight
        position={[0, 1.5, -2]}
        intensity={2}
        color={KIDCORE_COLORS.neonGreen}
        angle={1.2}
        penumbra={0.8}
        castShadow
      />

      {/* Backlight - creates glow */}
      <pointLight
        position={[0, 0.5, -2]}
        intensity={1.5}
        color={KIDCORE_COLORS.magenta}
      />

      {/* Ambient light - subtle */}
      <ambientLight intensity={0.3} color={KIDCORE_COLORS.cyberGrape} />

      {/* Environment map */}
      <Environment preset="night" />

      {/* Main scene objects */}
      <ArcadeCabinet />
      <Coin />
      <ParticleExplosion />
      <ScreenGlitch />

      {/* Camera controller for zoom transition */}
      <CameraController />
      
      {/* Post-processing effects */}
      <PostProcessingEffects />

      {/* Ensure proper lighting for visibility */}
      <fog attach="fog" args={['#8a00ff', 1, 15]} />
    </>
  );
};

export const PreloaderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isVisible, phase } = usePreloader();

  // Handle visibility and prevent pointer events when complete
  const canvasStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 40,
    pointerEvents: phase === 'COMPLETE' ? 'none' : 'auto',
    opacity: phase === 'COMPLETE' ? 0 : 1,
    transition: phase === 'COMPLETE' ? 'opacity 0.5s ease-out' : 'none',
    background: 'transparent',
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    // Critical: Ensure no default canvas background
    mixBlendMode: 'normal',
    isolation: 'isolate',
    // Let the 3D scene provide its own background through fog and lighting
  };

  if (!isVisible) return null;

  return (
    <Canvas 
      ref={canvasRef} 
      style={canvasStyle} 
      gl={{ 
        antialias: true, 
        alpha: true,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance"
      }}
      frameloop="always"
    >
      <PerspectiveCamera makeDefault position={[0, 0.5, 4]} fov={35} near={0.1} far={100} />
      <SceneContent />
    </Canvas>
  );
};
