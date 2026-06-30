import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { generateParticlesForState } from '../../utils/particleData';

interface MorphParticlesProps {
  activeState: number;
}

export default function MorphParticles({ activeState }: MorphParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate particle positions for all states
  const states = useMemo(() => {
    return [
      generateParticlesForState(0), // Humanoid Robot
      generateParticlesForState(1), // Robotic Arm
      generateParticlesForState(2), // Precision Actuator
      generateParticlesForState(3), // Quadruped Robot
      generateParticlesForState(4), // India Tech Map
    ];
  }, []);

  // Set up the custom shader material
  const uniforms = useMemo(() => ({
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(999, 999, 999) },
    uColor1: { value: new THREE.Color('#06b6d4') }, // Glowing Cyan
    uColor2: { value: new THREE.Color('#3b82f6') }, // Electric Blue
  }), []);

  // Geometry setups
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    
    // Initial position attribute (source)
    const initialPos = new THREE.BufferAttribute(states[0].slice(), 3);
    geo.setAttribute('position', initialPos);
    
    // Target position attribute
    const targetPos = new THREE.BufferAttribute(states[0].slice(), 3);
    geo.setAttribute('aTargetPosition', targetPos);

    return geo;
  }, [states]);

  // Keep track of the previous state to handle morphing
  const prevStateRef = useRef(0);

  useEffect(() => {
    if (!geometry || !shaderMaterialRef.current) return;

    const sourceState = prevStateRef.current;
    const targetState = activeState;

    if (sourceState === targetState) return;

    // Update geometry attributes for morphing
    const positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const targetAttr = geometry.getAttribute('aTargetPosition') as THREE.BufferAttribute;

    // Copy source coordinates into current positions
    positionAttr.copyArray(states[sourceState]);
    positionAttr.needsUpdate = true;

    // Copy target coordinates into target positions
    targetAttr.copyArray(states[targetState]);
    targetAttr.needsUpdate = true;

    // Reset progress uniform and animate using GSAP
    uniforms.uProgress.value = 0;
    
    gsap.killTweensOf(uniforms.uProgress);
    gsap.to(uniforms.uProgress, {
      value: 1,
      duration: 1.8,
      ease: 'power3.inOut',
      onComplete: () => {
        // Once done, source becomes target
        positionAttr.copyArray(states[targetState]);
        positionAttr.needsUpdate = true;
      }
    });

    // Update previous state reference
    prevStateRef.current = targetState;
  }, [activeState, geometry, states, uniforms.uProgress]);

  // Mouse interaction tracker
  const mouseWorld = useMemo(() => new THREE.Vector3(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);

  useFrame((state) => {
    const { clock, pointer, camera } = state;
    
    // Update time uniform
    if (uniforms) {
      uniforms.uTime.value = clock.getElapsedTime();
    }

    // Project mouse coordinates to Z=0 plane
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(plane, mouseWorld);
    
    if (uniforms && mouseWorld) {
      // Lerp mouse uniform for smooth tracking
      uniforms.uMouse.value.lerp(mouseWorld, 0.1);
    }

    // Slowly rotate the entire particle group for dynamic depth
    if (pointsRef.current) {
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y,
        pointer.x * 0.15 + clock.getElapsedTime() * 0.02,
        0.05
      );
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        pointer.y * 0.08,
        0.05
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <primitive object={geometry} />
      <shaderMaterial
        ref={shaderMaterialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Inline shaders to keep dependencies self-contained and easy to read
const vertexShader = `
  uniform float uProgress;
  uniform float uTime;
  uniform vec3 uMouse;
  attribute vec3 aTargetPosition;
  varying vec3 vPosition;
  varying float vDistance;

  void main() {
    // Morph between positions
    vec3 mixedPos = mix(position, aTargetPosition, uProgress);
    
    // Subtle organic breathing animation
    float time = uTime * 0.8;
    vec3 noise = vec3(
      sin(time + mixedPos.y * 2.5 + mixedPos.z * 1.5),
      cos(time * 0.7 + mixedPos.x * 2.0 + mixedPos.z * 1.2),
      sin(time * 1.1 + mixedPos.x * 1.5 + mixedPos.y * 1.8)
    ) * 0.06;
    
    mixedPos += noise;
    
    // Magnetic mouse repulsion and depth projection
    float dist = distance(mixedPos.xy, uMouse.xy);
    if (dist < 1.6) {
      float force = (1.6 - dist) / 1.6;
      vec2 dir = normalize(mixedPos.xy - uMouse.xy);
      mixedPos.xy += dir * force * 0.35;
      mixedPos.z += force * 0.3; // Pop out on Z
    }
    
    vec4 mvPosition = modelViewMatrix * vec4(mixedPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Particle size attenuation with camera distance and breathing scale
    float sizePulse = 1.0 + 0.4 * sin(uTime * 3.0 + position.y * 4.0);
    gl_PointSize = (10.0 / -mvPosition.z) * sizePulse;
    
    vPosition = mixedPos;
    vDistance = dist;
  }
`;

const fragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;
  varying vec3 vPosition;
  varying float vDistance;

  void main() {
    // Round particles with soft edges
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;
    
    // Anti-aliasing edge glow
    float alpha = smoothstep(0.5, 0.08, dist);
    
    // Color gradient based on vertical height
    vec3 color = mix(uColor1, uColor2, clamp(vPosition.y * 0.35 + 0.5, 0.0, 1.0));
    
    // Mouse proximity highlight (glowing core)
    if (vDistance < 1.6) {
      float glow = (1.6 - vDistance) / 1.6;
      color += vec3(0.4, 0.8, 1.0) * glow * 0.4;
    }
    
    // Dynamic noise pulsing
    alpha *= 0.5 + 0.5 * sin(uTime * 2.0 + vPosition.x * 2.5);
    
    gl_FragColor = vec4(color, alpha);
  }
`;
