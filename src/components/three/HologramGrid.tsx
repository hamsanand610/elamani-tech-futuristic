import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HologramGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      // Subtly pulse opacity or shift the grid slightly
      const time = state.clock.getElapsedTime();
      const material = gridRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.08 + Math.sin(time * 1.5) * 0.03;
    }
  });

  return (
    <group position={[0, -2.1, 0]}>
      <gridHelper
        ref={gridRef}
        args={[30, 30, '#06b6d4', '#1f2937']}
        position={[0, 0, 0]}
      >
        <lineBasicMaterial
          attach="material"
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </gridHelper>
      
      {/* Outer bounding circle for high-tech HUD look */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[14.8, 15, 64]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
