import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';

// -------------------------------------------------------------
// Model 0: Humanoid Bust (State 0)
// -------------------------------------------------------------
export function HumanoidBust() {
  const headRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.5) * 0.15;
      headRef.current.position.y = Math.sin(time * 2) * 0.05;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.3;
      ring1Ref.current.rotation.x = time * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.45;
      ring2Ref.current.rotation.y = time * 0.15;
    }
  });

  return (
    <group position={[0, 0.2, 0]}>
      {/* Outer tracking ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Outer tracking ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.25} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Head core */}
      <mesh ref={headRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#0f172a" 
          wireframe 
          emissive="#06b6d4"
          emissiveIntensity={0.6}
        />
        
        {/* Cyber eyes */}
        <mesh position={[-0.18, 0.1, 0.4]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
        <mesh position={[0.18, 0.1, 0.4]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>

        {/* Neck */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 0.3, 16]} />
          <meshStandardMaterial color="#1e293b" wireframe emissive="#3b82f6" emissiveIntensity={0.3} />
        </mesh>

        {/* Collar / shoulders */}
        <mesh position={[0, -0.85, 0]}>
          <boxGeometry args={[1.2, 0.2, 0.4]} />
          <meshStandardMaterial color="#0f172a" wireframe emissive="#06b6d4" emissiveIntensity={0.4} />
        </mesh>
      </mesh>

      {/* Floating HUD stats tag */}
      <Html position={[0.65, 0.65, 0]} distanceFactor={4}>
        <div className="font-mono text-[9px] bg-black/85 border border-cyan-500/25 px-2.5 py-1.5 text-cyan-400 rounded-md shadow-2xl backdrop-blur-md w-36 select-none pointer-events-none">
          <div className="flex justify-between font-bold border-b border-cyan-500/20 pb-0.5 mb-1 text-[10px]">
            <span>PLATFORM R-01</span>
            <span className="text-emerald-400">OK</span>
          </div>
          <div>ACTUATORS: NOMINAL</div>
          <div>ANGLE LOGS: STABLE</div>
          <div className="mt-1 bg-cyan-950/40 h-1.5 rounded-full overflow-hidden border border-cyan-500/10">
            <div className="h-full bg-cyan-500 animate-[laser-scan_4s_ease-in-out_infinite]" style={{ width: '70%', animationDuration: '2s' }} />
          </div>
        </div>
      </Html>
    </group>
  );
}

// -------------------------------------------------------------
// Model 1: Robotic Arm (State 1)
// -------------------------------------------------------------
export function RoboticArm() {
  const baseRef = useRef<THREE.Group>(null);
  const lowerArmRef = useRef<THREE.Group>(null);
  const upperArmRef = useRef<THREE.Group>(null);
  const sparkRef = useRef<THREE.Points>(null);

  // Generate particle coordinate offsets for welding sparks
  const sparkCount = 20;
  const sparkGeo = useRef(new THREE.BufferGeometry());
  const sparkPositions = useRef(new Float32Array(sparkCount * 3));
  const sparkVelocities = useRef(Array.from({ length: sparkCount }, () => ({
    x: (Math.random() - 0.5) * 0.6,
    y: Math.random() * 0.8 + 0.4,
    z: (Math.random() - 0.5) * 0.6,
  })));

  useFrame((state) => {
    const { clock, pointer } = state;
    const time = clock.getElapsedTime();

    // Smooth pointer follow for the robotic arm structure
    if (baseRef.current) {
      baseRef.current.rotation.y = THREE.MathUtils.lerp(
        baseRef.current.rotation.y,
        pointer.x * 0.8,
        0.05
      );
    }

    if (lowerArmRef.current) {
      lowerArmRef.current.rotation.z = THREE.MathUtils.lerp(
        lowerArmRef.current.rotation.z,
        Math.PI / 6 + Math.sin(time * 1.5) * 0.1 + pointer.y * 0.3,
        0.05
      );
    }

    if (upperArmRef.current) {
      upperArmRef.current.rotation.z = THREE.MathUtils.lerp(
        upperArmRef.current.rotation.z,
        -Math.PI / 4 + Math.cos(time * 1.8) * 0.15,
        0.05
      );
    }

    // Welding spark animation loop
    const positions = sparkPositions.current;
    const velocities = sparkVelocities.current;

    for (let i = 0; i < sparkCount; i++) {
      const idx = i * 3;
      // Increment particle translation
      positions[idx] += velocities[i].x * 0.05;
      positions[idx + 1] += velocities[i].y * 0.05;
      positions[idx + 2] += velocities[i].z * 0.05;

      // Reset when particle ages / travels too high
      if (positions[idx + 1] > 1.2) {
        positions[idx] = 0;
        positions[idx + 1] = 0;
        positions[idx + 2] = 0;
      }
    }

    if (sparkRef.current) {
      sparkGeo.current.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
      sparkRef.current.geometry = sparkGeo.current;
    }
  });

  return (
    <group ref={baseRef} position={[0, -0.8, 0]}>
      {/* Base disc */}
      <mesh>
        <cylinderGeometry args={[0.6, 0.7, 0.15, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.1, 32]} />
        <meshStandardMaterial color="#06b6d4" wireframe emissive="#06b6d4" emissiveIntensity={0.2} />
      </mesh>

      {/* Shoulder Joint */}
      <group position={[0, 0.2, 0]}>
        <mesh>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} />
        </mesh>

        {/* Lower Arm segment group */}
        <group ref={lowerArmRef}>
          {/* Cylinder offset so its bottom is at the joint [0,0,0] */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.1, 0.12, 1.0, 16]} />
            <meshStandardMaterial color="#0f172a" wireframe emissive="#06b6d4" emissiveIntensity={0.5} />
          </mesh>

          {/* Elbow Joint (placed at the top of lower arm, i.e. Y=1.0) */}
          <group position={[0, 1.0, 0]}>
            <mesh>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial color="#3b82f6" />
            </mesh>

            {/* Upper Arm segment group */}
            <group ref={upperArmRef}>
              {/* Cylinder offset so its bottom is at the elbow joint [0,0,0] */}
              <mesh position={[0, 0.45, 0]}>
                <cylinderGeometry args={[0.07, 0.09, 0.9, 16]} />
                <meshStandardMaterial color="#1e293b" wireframe emissive="#06b6d4" emissiveIntensity={0.4} />
              </mesh>

              {/* Wrist & Gripper (placed at top of upper arm, Y=0.9) */}
              <group position={[0, 0.9, 0]}>
                <mesh>
                  <boxGeometry args={[0.15, 0.12, 0.15]} />
                  <meshStandardMaterial color="#06b6d4" />
                </mesh>

                {/* Gripper tip / spark source emitter */}
                <group position={[0, 0.1, 0]}>
                  {/* Dynamic laser light source */}
                  <pointLight intensity={2} distance={2.5} color="#f97316" />
                  
                  {/* Glowing tip cone */}
                  <mesh rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.05, 0.15, 8]} />
                    <meshBasicMaterial color="#f97316" transparent opacity={0.8} />
                  </mesh>

                  {/* Spark Particles */}
                  <points ref={sparkRef}>
                    <bufferGeometry ref={sparkGeo} />
                    <pointsMaterial
                      color="#f97316"
                      size={0.06}
                      transparent
                      opacity={0.9}
                      blending={THREE.AdditiveBlending}
                    />
                  </points>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// Model 2: Precision Actuator (State 2)
// -------------------------------------------------------------
export function PrecisionActuator() {
  const actuatorRef = useRef<THREE.Group>(null);
  const shaftRef = useRef<THREE.Mesh>(null);
  const orbit1Ref = useRef<THREE.Mesh>(null);
  const orbit2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (actuatorRef.current) {
      actuatorRef.current.rotation.y = time * 0.4;
    }
    if (shaftRef.current) {
      // Linear drive slide movement
      shaftRef.current.position.y = 0.5 + Math.sin(time * 3.5) * 0.35;
    }
    if (orbit1Ref.current) {
      orbit1Ref.current.rotation.z = time * 0.8;
    }
    if (orbit2Ref.current) {
      orbit2Ref.current.rotation.z = -time * 1.0;
    }
  });

  return (
    <group ref={actuatorRef} position={[0, 0, 0]}>
      {/* Outer protective housing */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.15} wireframe />
      </mesh>

      {/* Internal magnetic coils (glowing segments inside wireframe) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.9, 16]} />
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.2} emissive="#06b6d4" emissiveIntensity={0.5} />
      </mesh>

      {/* Actuating Drive Shaft */}
      <mesh ref={shaftRef} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.9, 16]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.08} />
        
        {/* Shaft top connector collar */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[0.26, 0.1, 0.26]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      </mesh>

      {/* Ring flange bracket at middle */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.08, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>

      {/* Rotating orbit bands */}
      <mesh ref={orbit1Ref} position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.015, 8, 48]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
      </mesh>
      <mesh ref={orbit2Ref} position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.015, 8, 48]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
      </mesh>

      {/* Diagnostic coordinate label */}
      <Html position={[-0.8, -0.6, 0]} distanceFactor={3.5}>
        <div className="font-mono text-[8px] bg-black/90 border border-blue-500/20 px-2 py-1 text-blue-400 rounded shadow-md w-28 uppercase select-none pointer-events-none">
          <div>ENC_TICK: 1048576</div>
          <div className="text-cyan-400">POS: LERPING</div>
          <div>TORQUE: NOMINAL</div>
        </div>
      </Html>
    </group>
  );
}

// -------------------------------------------------------------
// Model 3: Quadruped Platform (State 3)
// -------------------------------------------------------------
export function QuadrupedModel() {
  const chassisRef = useRef<THREE.Group>(null);
  const scannerRef = useRef<THREE.Mesh>(null);
  const laserRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Idle breathing/suspension motion
    if (chassisRef.current) {
      chassisRef.current.position.y = -0.3 + Math.sin(time * 2.2) * 0.08;
      chassisRef.current.rotation.x = Math.sin(time * 1.5) * 0.02;
      chassisRef.current.rotation.z = Math.cos(time * 1.2) * 0.02;
    }

    // Spin LiDAR scanner
    if (scannerRef.current) {
      scannerRef.current.rotation.y = time * 8;
    }

    // Sweep laser visual left & right
    if (laserRef.current) {
      laserRef.current.rotation.z = Math.sin(time * 3) * 0.25;
    }
  });

  return (
    <group ref={chassisRef} position={[0, -0.3, 0]}>
      {/* Main Chassis Body */}
      <mesh>
        <boxGeometry args={[1.2, 0.4, 0.6]} />
        <meshStandardMaterial color="#0f172a" wireframe emissive="#06b6d4" emissiveIntensity={0.4} />
      </mesh>

      {/* LiDAR Scanner on top */}
      <group position={[0.4, 0.25, 0]}>
        <mesh ref={scannerRef}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>

        {/* Fanning laser sweep */}
        <group ref={laserRef} position={[0, -0.1, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
            <coneGeometry args={[0.5, 1.6, 16, 1, true]} />
            <meshBasicMaterial 
              color="#06b6d4" 
              transparent 
              opacity={0.12} 
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide} 
            />
          </mesh>
        </group>
      </group>

      {/* Cybernetic legs assemblies */}
      {/* Front Left */}
      <LegAssembly jointPos={[0.45, -0.15, 0.32]} isFront={true} />
      {/* Front Right */}
      <LegAssembly jointPos={[0.45, -0.15, -0.32]} isFront={true} />
      {/* Rear Left */}
      <LegAssembly jointPos={[-0.45, -0.15, 0.32]} isFront={false} />
      {/* Rear Right */}
      <LegAssembly jointPos={[-0.45, -0.15, -0.32]} isFront={false} />
    </group>
  );
}

// Subcomponent: Articulated Quadruped Leg
interface LegAssemblyProps {
  jointPos: [number, number, number];
  isFront: boolean;
}
function LegAssembly({ jointPos, isFront }: LegAssemblyProps) {
  const jointRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Simulate rhythmic suspension compliance
    if (jointRef.current) {
      const phase = isFront ? 0 : Math.PI / 2;
      jointRef.current.rotation.z = Math.sin(time * 2.2 + phase) * 0.12;
    }
  });

  return (
    <group ref={jointRef} position={jointPos}>
      {/* Hip Joint */}
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      {/* Thigh segment */}
      <mesh position={[0, -0.22, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.05, 0.04, 0.45, 8]} />
        <meshStandardMaterial color="#1e293b" wireframe />
      </mesh>

      {/* Knee joint */}
      <group position={[0.07, -0.4, 0]}>
        <mesh>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#06b6d4" />
        </mesh>
        
        {/* Shin segment */}
        <mesh position={[-0.05, -0.2, 0]} rotation={[0, 0, -0.25]}>
          <cylinderGeometry args={[0.035, 0.025, 0.42, 8]} />
          <meshStandardMaterial color="#0f172a" wireframe />
        </mesh>

        {/* Footpad */}
        <mesh position={[-0.1, -0.4, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// Model 4: Connected Tech Ecosystem Map (State 4)
// -------------------------------------------------------------
export function IndiaMapNodes() {
  const mapRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  // Define Hub Coordinates scaled inside R3F boundaries
  const hubs = [
    { name: 'Bengaluru', pos: [0.05 * 2.2, -0.8 * 2.2, 0] as [number, number, number], color: '#06b6d4' },
    { name: 'Mumbai', pos: [-0.65 * 2.2, -0.3 * 2.2, 0] as [number, number, number], color: '#f97316' },
    { name: 'Delhi', pos: [-0.15 * 2.2, 0.7 * 2.2, 0] as [number, number, number], color: '#3b82f6' },
    { name: 'Chennai', pos: [0.28 * 2.2, -1.0 * 2.2, 0] as [number, number, number], color: '#06b6d4' },
    { name: 'Hyderabad', pos: [0.12 * 2.2, -0.4 * 2.2, 0] as [number, number, number], color: '#3b82f6' },
  ];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mapRef.current) {
      mapRef.current.rotation.y = Math.sin(time * 0.15) * 0.1;
    }
    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(1.0 + Math.sin(time * 4) * 0.25);
    }
  });

  return (
    <group ref={mapRef} position={[0, 0.1, 0]}>
      {/* Neon connection lines between nodes */}
      <ConnectionLine start={hubs[0].pos} end={hubs[1].pos} />
      <ConnectionLine start={hubs[0].pos} end={hubs[3].pos} />
      <ConnectionLine start={hubs[0].pos} end={hubs[4].pos} />
      <ConnectionLine start={hubs[1].pos} end={hubs[2].pos} />
      <ConnectionLine start={hubs[2].pos} end={hubs[4].pos} />

      {/* Render core technology hubs */}
      {hubs.map((hub) => (
        <group key={hub.name} position={hub.pos}>
          {/* Node core */}
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color={hub.color} />
          </mesh>
          
          {/* Glowing pulse ring */}
          <mesh ref={hub.name === 'Bengaluru' ? pulseRef : null}>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshBasicMaterial color={hub.color} transparent opacity={0.15} blending={THREE.AdditiveBlending} />
          </mesh>

          {/* Floating UI tags */}
          <Html position={[0.1, 0.1, 0]} distanceFactor={4.5}>
            <span className="font-mono text-[7px] text-gray-500 uppercase tracking-widest bg-black/60 px-1 border border-white/5 whitespace-nowrap">
              {hub.name} Node
            </span>
          </Html>
        </group>
      ))}
    </group>
  );
}

// Subcomponent: Pulsing line tube between nodes
interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
}
function ConnectionLine({ start, end }: ConnectionLineProps) {
  return (
    <Line
      points={[new THREE.Vector3(...start), new THREE.Vector3(...end)]}
      color="#06b6d4"
      lineWidth={1.2}
      transparent
      opacity={0.25}
      blending={THREE.AdditiveBlending}
    />
  );
}
