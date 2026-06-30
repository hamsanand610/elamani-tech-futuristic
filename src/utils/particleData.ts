// Utility to generate procedural 3D coordinates for different shapes
// to be used by the Three.js morphing particle engine.

export const PARTICLE_COUNT = 8000;

// Helper to generate a random point on a sphere
function randomOnSphere(radius: number, centerX = 0, centerY = 0, centerZ = 0) {
  const u = Math.random();
  const v = Math.random();
  const theta = u * 2.0 * Math.PI;
  const phi = Math.acos(2.0 * v - 1.0);
  const r = radius * Math.cbrt(Math.random()); // distribute evenly inside volume
  
  return {
    x: centerX + r * Math.sin(phi) * Math.cos(theta),
    y: centerY + r * Math.sin(phi) * Math.sin(theta),
    z: centerZ + r * Math.cos(phi)
  };
}

// Helper to generate a random point on a cylinder
function randomOnCylinder(radius: number, height: number, centerX = 0, centerY = 0, centerZ = 0, verticalAxis = 'y') {
  const theta = Math.random() * 2 * Math.PI;
  const r = radius * Math.sqrt(Math.random());
  const h = (Math.random() - 0.5) * height;

  if (verticalAxis === 'x') {
    return {
      x: centerX + h,
      y: centerY + r * Math.sin(theta),
      z: centerZ + r * Math.cos(theta)
    };
  } else if (verticalAxis === 'z') {
    return {
      x: centerX + r * Math.sin(theta),
      y: centerY + r * Math.cos(theta),
      z: centerZ + h
    };
  } else {
    return {
      x: centerX + r * Math.sin(theta),
      y: centerY + h,
      z: centerZ + r * Math.cos(theta)
    };
  }
}

// Helper to generate a random point on a box
function randomOnBox(width: number, height: number, depth: number, centerX = 0, centerY = 0, centerZ = 0) {
  return {
    x: centerX + (Math.random() - 0.5) * width,
    y: centerY + (Math.random() - 0.5) * height,
    z: centerZ + (Math.random() - 0.5) * depth
  };
}

// Helper to generate points representing an approximation of India's map
function randomOnIndiaMap() {
  // We model India as a triangular shape with a wider northern region
  // and specific hubs (Bengaluru, Mumbai, Delhi, Hyderabad, Chennai, Kolkata, Pune)
  const hubs = [
    { name: 'Bengaluru', x: 0.05, y: -0.8, z: 0, weight: 0.18 },
    { name: 'Mumbai', x: -0.65, y: -0.3, z: 0, weight: 0.15 },
    { name: 'Delhi', x: -0.15, y: 0.7, z: 0, weight: 0.15 },
    { name: 'Hyderabad', x: 0.12, y: -0.4, z: 0, weight: 0.12 },
    { name: 'Chennai', x: 0.28, y: -1.0, z: 0, weight: 0.12 },
    { name: 'Pune', x: -0.55, y: -0.42, z: 0, weight: 0.08 },
    { name: 'Kolkata', x: 0.9, y: 0.05, z: 0, weight: 0.1 },
    { name: 'Ecosystem-Nodes', x: 0, y: 0, z: 0, weight: 0.1 } // distributed background nodes
  ];

  // Pick a random point based on geographical silhouette of India
  // Top (North): wider, extends from x = -1 to 1 at y = 1.0
  // Bottom (South): tapers down to x = 0 at y = -2.0
  // Middle: expands to x = -1.2 (west) and x = 1.2 (east)
  
  let x = 0;
  let y = 0;
  let z = (Math.random() - 0.5) * 0.15; // slightly thin map

  // Select whether this particle belongs to a hub or the outline/interior
  const rand = Math.random();
  if (rand < 0.6) {
    // 60% of particles form the outline and interior of the map
    let isValid = false;
    let attempts = 0;
    while (!isValid && attempts < 20) {
      attempts++;
      // Generate in bounding box
      const testY = Math.random() * 3.5 - 2.0; // -2.0 to 1.5
      const testX = (Math.random() - 0.5) * 2.8; // -1.4 to 1.4

      // Mathematical boundary check for India silhouette
      // North: wider, South: narrow
      let widthAtY = 0;
      if (testY < -0.8) {
        // Southern peninsula: sharp taper
        widthAtY = 0.5 + (testY + 2.0) * 0.6; // tapers to 0.5 at y=-0.8, 0 at y=-2.0
      } else if (testY < 0.5) {
        // Middle India: wide
        widthAtY = 1.3 - Math.abs(testY - 0.0) * 0.3;
      } else {
        // Northern India: tapers slightly, has the Kashmir crown
        widthAtY = 1.1 - (testY - 0.5) * 0.9;
      }

      if (Math.abs(testX) < widthAtY) {
        x = testX;
        y = testY;
        isValid = true;
      }
    }
    // Fallback if boundary check failed
    if (!isValid) {
      x = (Math.random() - 0.5) * 0.8;
      y = (Math.random() - 0.5) * 1.5;
    }
  } else {
    // 40% of particles cluster around the major hubs
    // Select a hub based on weight
    let accum = 0;
    const hubRand = Math.random();
    let selectedHub = hubs[0];
    for (const h of hubs) {
      accum += h.weight;
      if (hubRand <= accum) {
        selectedHub = h;
        break;
      }
    }

    // Generate tightly bound sphere around the selected hub
    const offset = randomOnSphere(0.2, selectedHub.x, selectedHub.y, selectedHub.z);
    x = offset.x;
    y = offset.y;
    z = offset.z;
  }

  return { x, y, z };
}

export function generateParticlesForState(stateIndex: number): Float32Array {
  const positions = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let p = { x: 0, y: 0, z: 0 };

    switch (stateIndex) {
      case 0: // Humanoid Robot
        const r = Math.random();
        if (r < 0.3) {
          // Torso
          p = randomOnCylinder(0.45, 1.2, 0, -0.2, 0);
        } else if (r < 0.48) {
          // Head
          p = randomOnSphere(0.3, 0, 0.7, 0);
        } else if (r < 0.58) {
          // Left Arm
          p = randomOnCylinder(0.12, 1.0, -0.65, 0.0, 0);
        } else if (r < 0.68) {
          // Right Arm
          p = randomOnCylinder(0.12, 1.0, 0.65, 0.0, 0);
        } else if (r < 0.80) {
          // Left Leg
          p = randomOnCylinder(0.15, 1.2, -0.3, -1.3, 0);
        } else if (r < 0.92) {
          // Right Leg
          p = randomOnCylinder(0.15, 1.2, 0.3, -1.3, 0);
        } else if (r < 0.97) {
          // Shoulder mounts / joints
          p = randomOnSphere(0.15, Math.random() > 0.5 ? 0.55 : -0.55, 0.3, 0);
        } else {
          // Glowing Eyes
          const side = Math.random() > 0.5 ? 1 : -1;
          p = randomOnSphere(0.04, side * 0.1, 0.72, 0.25);
        }
        break;

      case 1: // Industrial Robotic Arm
        const armRand = Math.random();
        if (armRand < 0.2) {
          // Base
          p = randomOnCylinder(0.7, 0.3, 0, -1.85, 0);
        } else if (armRand < 0.5) {
          // Segment 1 (Lower Arm - vertical)
          p = randomOnCylinder(0.2, 1.1, 0, -1.1, 0);
        } else if (armRand < 0.6) {
          // Joint 1 (Elbow)
          p = randomOnSphere(0.25, 0, -0.5, 0);
        } else if (armRand < 0.82) {
          // Segment 2 (Upper Arm - tilted at 45 deg)
          // We can generate cylinder aligned along Y and then rotate/translate
          const rawPt = randomOnCylinder(0.14, 1.2, 0, 0, 0);
          // Rotate 45 degrees around Z axis and shift
          const angle = Math.PI / 4;
          p.x = rawPt.x * Math.cos(angle) - rawPt.y * Math.sin(angle) + 0.4;
          p.y = rawPt.x * Math.sin(angle) + rawPt.y * Math.cos(angle) + 0.1;
          p.z = rawPt.z;
        } else if (armRand < 0.9) {
          // Wrist / Joint 2
          p = randomOnSphere(0.18, 0.8, 0.5, 0);
        } else {
          // Gripper fingers
          const fingerSide = Math.random() > 0.5 ? 1 : -1;
          p = randomOnBox(0.3, 0.1, 0.08, 1.0, 0.5 + fingerSide * 0.15, 0);
        }
        break;

      case 2: // Precision Actuator (Cylindrical structure with coils and rings)
        const actRand = Math.random();
        if (actRand < 0.45) {
          // Actuator Housing
          p = randomOnCylinder(0.65, 1.6, 0, -0.4, 0);
        } else if (actRand < 0.65) {
          // Central Shaft (extends from top)
          p = randomOnCylinder(0.2, 1.0, 0, 0.9, 0);
        } else if (actRand < 0.8) {
          // Mounting Flange (Flat ring at center)
          p = randomOnCylinder(0.9, 0.1, 0, 0.1, 0);
        } else if (actRand < 0.92) {
          // Top & Bottom caps
          const heightCap = Math.random() > 0.5 ? 0.4 : -1.2;
          p = randomOnCylinder(0.65, 0.05, 0, heightCap, 0);
        } else {
          // Surrounding electrical connectors / boxes
          p = randomOnBox(0.4, 0.4, 0.4, 0.6, -0.4, 0.3);
        }
        break;

      case 3: // Quadruped Robot
        const quadRand = Math.random();
        if (quadRand < 0.4) {
          // Torso
          p = randomOnBox(1.3, 0.45, 0.55, 0, -0.4, 0);
        } else if (quadRand < 0.48) {
          // Head / Sensor pod
          p = randomOnBox(0.35, 0.3, 0.35, 0.8, -0.2, 0);
        } else if (quadRand < 0.6) {
          // Leg 1 (Front Left)
          const isLower = Math.random() > 0.5;
          p = randomOnCylinder(0.08, 0.7, 0.65, isLower ? -1.4 : -0.85, 0.25);
        } else if (quadRand < 0.72) {
          // Leg 2 (Front Right)
          const isLower = Math.random() > 0.5;
          p = randomOnCylinder(0.08, 0.7, 0.65, isLower ? -1.4 : -0.85, -0.25);
        } else if (quadRand < 0.84) {
          // Leg 3 (Back Left)
          const isLower = Math.random() > 0.5;
          p = randomOnCylinder(0.08, 0.7, -0.65, isLower ? -1.4 : -0.85, 0.25);
        } else if (quadRand < 0.96) {
          // Leg 4 (Back Right)
          const isLower = Math.random() > 0.5;
          p = randomOnCylinder(0.08, 0.7, -0.65, isLower ? -1.4 : -0.85, -0.25);
        } else {
          // Joint hubs / feet pads
          const isFront = Math.random() > 0.5 ? 0.65 : -0.65;
          const isLeft = Math.random() > 0.5 ? 0.25 : -0.25;
          p = randomOnSphere(0.09, isFront, -1.8, isLeft);
        }
        break;

      case 4: // India Tech Ecosystem Map
        p = randomOnIndiaMap();
        break;

      default:
        p = randomOnSphere(1.0);
        break;
    }

    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;
  }

  return positions;
}
