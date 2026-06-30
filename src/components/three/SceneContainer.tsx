import { Suspense, useEffect, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, ToneMapping, Vignette, DepthOfField, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import MorphParticles from './MorphParticles';
import HologramGrid from './HologramGrid';
import { HumanoidBust, RoboticArm, PrecisionActuator, QuadrupedModel, IndiaMapNodes } from './Models';

interface SceneContainerProps {
  activeState: number;
}

// Controls camera transitions smoothly across sections
function CameraController({ activeState }: { activeState: number }) {
  const { camera } = useThree();
  
  const targets = useMemo(() => [
    { pos: [0, 0.1, 4.4], look: [0, 0.1, 0] },       // State 0: Hero (Center)
    { pos: [1.8, 0.0, 4.0], look: [-0.6, -0.15, 0] }, // State 1: Problem / Arm (Offset Right)
    { pos: [-1.8, 0.2, 3.8], look: [0.6, -0.1, 0] },   // State 2: Products (Offset Left)
    { pos: [0, 1.8, 4.8], look: [0, -0.2, 0] },       // State 3: Applications (High view)
    { pos: [0, -0.4, 5.0], look: [0, -0.4, 0] }       // State 4: Map / Core (Zoomed out)
  ], []);

  const currentTarget = targets[activeState] || targets[0];
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    targetPos.set(currentTarget.pos[0], currentTarget.pos[1], currentTarget.pos[2]);
    targetLook.set(currentTarget.look[0], currentTarget.look[1], currentTarget.look[2]);

    // Smoothly lerp camera coordinates
    camera.position.lerp(targetPos, 0.04);
    
    // Initialize lookAt tracker inside camera metadata
    if (!camera.userData.lookAt) {
      camera.userData.lookAt = new THREE.Vector3(0, 0, 0);
    }
    
    const currentLook = camera.userData.lookAt as THREE.Vector3;
    currentLook.lerp(targetLook, 0.04);
    camera.lookAt(currentLook);
  });

  return null;
}

// Spotlight that tracks pointer cursor on screen for dynamic reflections
function FollowSpotlight() {
  const lightRef = useRef<THREE.SpotLight>(null);
  
  useFrame((state) => {
    const { pointer } = state;
    if (lightRef.current) {
      // Project spotlight target according to pointer coords
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, pointer.x * 4, 0.05);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, pointer.y * 4 + 2, 0.05);
    }
  });

  return (
    <spotLight
      ref={lightRef}
      position={[0, 4, 5]}
      angle={0.7}
      penumbra={1}
      intensity={5.0}
      color="#06b6d4"
    />
  );
}

export default function SceneContainer({ activeState }: SceneContainerProps) {
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>(undefined);

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) setEventSource(root);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none transition-opacity duration-1000">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        eventSource={eventSource}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        {/* Soft atmospheric lighting */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} color="#06b6d4" />
        <directionalLight position={[-5, 5, -5]} intensity={0.2} color="#3b82f6" />
        <pointLight position={[0, 2, 1]} intensity={0.8} color="#06b6d4" />
        
        {/* Dynamic spot cursor focus light */}
        <FollowSpotlight />
        
        <Suspense fallback={null}>
          <CameraController activeState={activeState} />
          
          {/* Particles and Hologram Grid */}
          <MorphParticles activeState={activeState} />
          <HologramGrid />
          
          {/* Procedural Solid 3D Models overlays */}
          {activeState === 0 && <HumanoidBust />}
          {activeState === 1 && <RoboticArm />}
          {activeState === 2 && <PrecisionActuator />}
          {activeState === 3 && <QuadrupedModel />}
          {activeState === 4 && <IndiaMapNodes />}
          
          {/* Premium Post Processing Effects */}
          <EffectComposer enableNormalPass={false} multisampling={0}>
            <Bloom 
              luminanceThreshold={0.15} 
              luminanceSmoothing={0.95} 
              height={300} 
              intensity={1.5} 
            />
            <DepthOfField
              target={[0, 0, 0]}
              focalLength={0.35}
              bokehScale={4}
              height={480}
            />
            <Vignette
              offset={0.4}
              darkness={0.85}
            />
            <ChromaticAberration
              offset={new THREE.Vector2(0.0012, 0.0012)}
            />
            <ToneMapping />
          </EffectComposer>
        </Suspense>
      </Canvas>
      
      {/* Subtle overlay gradient to blend 3D with the dark background */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(0,0,0,0)_50%,rgba(5,5,5,0.85)_100%] pointer-events-none" />
    </div>
  );
}

