import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ManaParticles(props) {
  const ref = useRef();
  // Generate particles in a column/gate shape rather than a sphere
  const [positions] = React.useState(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10; // x: wide spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10; // y: full height
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5; // z: depth
    }
    return pos;
  });

  useFrame((state, delta) => {
    // Upward floating "Mana" effect
    ref.current.rotation.y -= delta / 20;
    ref.current.position.y += delta * 0.2;
    if (ref.current.position.y > 2) {
      ref.current.position.y = -2;
    }
  });

  return (
    <group rotation={[0, 0, 0]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00ffff" // Cyan System Color
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

function ShadowMist() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={[0, -2, -5]}>
         {/* Abstract "Shadow" shapes */}
         <mesh scale={[10, 2, 2]}>
           <planeGeometry />
           <meshBasicMaterial color="#020617" transparent opacity={0.8} />
         </mesh>
      </group>
    </Float>
  );
}

export default function SystemBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020617]"> {/* Deep Slate/Blue Black */}
      {/* CSS Gradient for the "System Blue" glow from the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00d9ff]/10 via-transparent to-transparent pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={['#020617', 5, 15]} />
        <ambientLight intensity={0.5} />
        <ManaParticles />
      </Canvas>
      
      {/* Grid Overlay for "System Interface" feel */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #00d9ff 1px, transparent 1px),
                           linear-gradient(to bottom, #00d9ff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}