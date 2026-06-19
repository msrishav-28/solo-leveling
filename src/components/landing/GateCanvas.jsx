import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GateParticles({ count = 3500 }) {
  const ref = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, colors } = useMemo(() => {
    const nextPositions = new Float32Array(count * 3);
    const nextColors = new Float32Array(count * 3);
    const mana = new THREE.Color('#00d9ff');
    const glow = new THREE.Color('#7ff5ff');

    for (let i = 0; i < count; i += 1) {
      const t = Math.random();
      const radius = Math.pow(Math.random(), 1.6) * 2.2;
      const angle = Math.random() * Math.PI * 2;

      nextPositions[i * 3] = Math.cos(angle) * radius;
      nextPositions[i * 3 + 1] = (Math.random() - 0.3) * 12;
      nextPositions[i * 3 + 2] = Math.sin(angle) * radius - Math.random() * 1.5;

      const color = mana.clone().lerp(glow, t);
      nextColors[i * 3] = color.r;
      nextColors[i * 3 + 1] = color.g;
      nextColors[i * 3 + 2] = color.b;
    }

    return { positions: nextPositions, colors: nextColors };
  }, [count]);

  useFrame((state, delta) => {
    const points = ref.current;
    if (!points) return;

    const positionAttribute = points.geometry.attributes.position;
    const values = positionAttribute.array;

    for (let i = 1; i < values.length; i += 3) {
      values[i] += delta * 0.35;
      if (values[i] > 8) values[i] = -6;
    }

    positionAttribute.needsUpdate = true;

    const { x, y } = state.pointer;
    mouse.current.x += (x * 0.4 - mouse.current.x) * 0.04;
    mouse.current.y += (y * 0.2 - mouse.current.y) * 0.04;
    points.rotation.y = mouse.current.x;
    points.rotation.x = -mouse.current.y;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GatePillars() {
  return (
    <group>
      {[-2.2, 2.2].map((x) => (
        <mesh key={x} position={[x, 0, -1.5]}>
          <planeGeometry args={[0.04, 9]} />
          <meshBasicMaterial color="#00d9ff" transparent opacity={0.35} />
        </mesh>
      ))}
      <mesh position={[0, 4.5, -1.5]}>
        <planeGeometry args={[4.5, 0.04]} />
        <meshBasicMaterial color="#00d9ff" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export function GateCanvas({ reduced }) {
  if (reduced) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="gate-mask hairline h-[70%] w-[55%] opacity-50" />
      </div>
    );
  }

  const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 1600 : 3500;

  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.6]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 6, 16]} />
      <GatePillars />
      <GateParticles count={particleCount} />
    </Canvas>
  );
}
