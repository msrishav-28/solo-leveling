import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function Stars(props) {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00d9ff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingBlob() {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.position.y = Math.sin(t / 2) * 0.1;
    mesh.current.rotation.x = Math.cos(t / 4) * 0.2;
  });

  return (
    <Sphere visible args={[1, 100, 200]} scale={2} position={[2, 0, -2]}>
      <MeshDistortMaterial
        color="#b700ff"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0}
        metalness={1}
      />
    </Sphere>
  );
}

export default function Space3D() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0E0E0E]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Stars />
        <FloatingBlob />
      </Canvas>
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
    </div>
  );
}