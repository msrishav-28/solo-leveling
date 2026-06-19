import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const tones = {
  mana: {
    color: '#00d9ff',
    glow: '#7ff5ff',
    fog: '#020617',
    grid: 'bg-grid',
    aura: 'radial-gradient(ellipse at 50% 78%, rgba(0,217,255,0.16), rgba(2,6,23,0.02) 44%, transparent 72%)',
  },
  danger: {
    color: '#ff0033',
    glow: '#ff8aa0',
    fog: '#09020a',
    grid: 'bg-grid-threat',
    aura: 'radial-gradient(ellipse at 50% 76%, rgba(255,0,51,0.16), rgba(2,6,23,0.04) 44%, transparent 72%)',
  },
  gold: {
    color: '#ffd700',
    glow: '#fff0a3',
    fog: '#090803',
    grid: 'bg-grid',
    aura: 'radial-gradient(ellipse at 50% 76%, rgba(255,215,0,0.14), rgba(2,6,23,0.03) 44%, transparent 72%)',
  },
};

function ManaField({ count, theme, urgency }) {
  const ref = useRef(null);
  const drift = useRef({ x: 0, y: 0 });

  const { positions, colors, sizes } = useMemo(() => {
    const nextPositions = new Float32Array(count * 3);
    const nextColors = new Float32Array(count * 3);
    const nextSizes = new Float32Array(count);
    const base = new THREE.Color(theme.color);
    const glow = new THREE.Color(theme.glow);

    for (let i = 0; i < count; i += 1) {
      const ring = Math.pow(Math.random(), 1.8);
      const angle = Math.random() * Math.PI * 2;
      const columnBias = Math.random() > 0.18 ? 1 : 2.2;
      const radius = ring * columnBias;

      nextPositions[i * 3] = Math.cos(angle) * radius;
      nextPositions[i * 3 + 1] = (Math.random() - 0.28) * 12.5;
      nextPositions[i * 3 + 2] = Math.sin(angle) * radius - Math.random() * 2.2;

      const color = base.clone().lerp(glow, Math.random() * 0.9);
      nextColors[i * 3] = color.r;
      nextColors[i * 3 + 1] = color.g;
      nextColors[i * 3 + 2] = color.b;
      nextSizes[i] = 0.018 + Math.random() * 0.028;
    }

    return { positions: nextPositions, colors: nextColors, sizes: nextSizes };
  }, [count, theme]);

  useFrame((state, delta) => {
    const points = ref.current;
    if (!points) return;

    const positionAttribute = points.geometry.attributes.position;
    const values = positionAttribute.array;
    const speed = urgency ? 0.52 : 0.32;

    for (let i = 1; i < values.length; i += 3) {
      values[i] += delta * speed;
      if (values[i] > 8.2) values[i] = -6.2;
    }

    positionAttribute.needsUpdate = true;
    drift.current.x += (state.pointer.x * 0.3 - drift.current.x) * 0.035;
    drift.current.y += (state.pointer.y * 0.16 - drift.current.y) * 0.035;
    points.rotation.y = drift.current.x;
    points.rotation.x = -drift.current.y;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation
        vertexColors
        transparent
        opacity={urgency ? 0.85 : 0.72}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GateFrame({ theme, urgency }) {
  const opacity = urgency ? 0.24 : 0.18;

  return (
    <group position={[0, -0.2, -2]}>
      {[-2.55, 2.55].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <planeGeometry args={[0.035, 10]} />
          <meshBasicMaterial color={theme.color} transparent opacity={opacity} />
        </mesh>
      ))}
      <mesh position={[0, 4.95, 0]}>
        <planeGeometry args={[5.2, 0.035]} />
        <meshBasicMaterial color={theme.color} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

function BackgroundScene({ theme, tone, intensity }) {
  const count =
    typeof window !== 'undefined' && window.innerWidth < 768
      ? Math.floor(900 * intensity)
      : Math.floor(2400 * intensity);

  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 6.2], fov: 58 }}
      dpr={[1, 1.45]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={[theme.fog, 6, 17]} />
      <GateFrame theme={theme} urgency={tone === 'danger'} />
      <ManaField count={count} theme={theme} urgency={tone === 'danger'} />
    </Canvas>
  );
}

export default function SystemBackground({ tone = 'mana', intensity = 1 }) {
  const theme = tones[tone] || tones.mana;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void">
      <BackgroundScene theme={theme} tone={tone} intensity={intensity} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: theme.aura }} />
      <div className={`absolute inset-0 ${theme.grid} pointer-events-none`} style={{ opacity: tone === 'danger' ? 0.42 : 0.54 }} />
      <div className="absolute inset-0 bg-vignette pointer-events-none" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />
    </div>
  );
}
