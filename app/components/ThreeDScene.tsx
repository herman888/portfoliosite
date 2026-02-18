"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const ThreeDScene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3] }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Sphere visible args={[1, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
        />
      </Sphere>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default ThreeDScene;
