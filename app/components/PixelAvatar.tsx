"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type PointCloudData = {
  positions: Float32Array;
  colors: Float32Array;
  count: number;
};

function usePortraitPointCloud(
  src: string,
  options: { sampleStep?: number; depth?: number } = {}
): PointCloudData | null {
  const { sampleStep = 1, depth = 0.15 } = options;
  const [data, setData] = useState<PointCloudData | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const size = 384;
      canvas.width = size;
      canvas.height = size;

      ctx.drawImage(img, 0, 0, size, size);
      const imageData = ctx.getImageData(0, 0, size, size).data;

      const positions: number[] = [];
      const colors: number[] = [];

      for (let y = 0; y < size; y += sampleStep) {
        for (let x = 0; x < size; x += sampleStep) {
          const i = (y * size + x) * 4;
          const r = imageData[i] / 255;
          const g = imageData[i + 1] / 255;
          const b = imageData[i + 2] / 255;
          const a = imageData[i + 3] / 255;

          if (a < 0.18) continue;

          // keep slightly wider band but still trim empty background
          const nxNorm = x / size;
          if (nxNorm < 0.12 || nxNorm > 0.88) continue;

          const brightness = (r + g + b) / 3;

          const nx = (nxNorm - 0.5) * 1.6;
          const ny = -(y / size - 0.5) * 2.1;
          const nz = (0.5 - brightness) * depth;

          positions.push(nx, ny, nz);
          const shade = 0.35 + brightness * 0.65;
          colors.push(shade, shade, shade);
        }
      }

      const count = positions.length / 3;
      setData({
        positions: new Float32Array(positions),
        colors: new Float32Array(colors),
        count,
      });
    };

    return () => {
      cancelled = true;
    };
  }, [src, sampleStep, depth]);

  return data;
}

function PixelAvatarPoints() {
  const data = usePortraitPointCloud("/portrait.jpg");
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      const autoY = Math.sin(t * 0.25) * 0.08;
      const autoX = Math.cos(t * 0.18) * 0.03;

      groupRef.current.rotation.y =
        THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          targetRotation.current.y + autoY,
          0.15
        );
      groupRef.current.rotation.x =
        THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          targetRotation.current.x + autoX,
          0.15
        );
    }
  });

  const geometry = useMemo(() => {
    if (!data) return null;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(data.positions, 3)
    );
    geo.setAttribute("color", new THREE.BufferAttribute(data.colors, 3));
    return geo;
  }, [data]);

  const handlePointerDown = (event: THREE.Event) => {
    isDragging.current = true;
    const e = event as any;
    lastPos.current = { x: e.pointer.x, y: e.pointer.y };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    lastPos.current = null;
  };

  const handlePointerMove = (event: THREE.Event) => {
    if (!isDragging.current || !lastPos.current) return;
    const e = event as any;
    const dx = (e.pointer.x - lastPos.current.x) / window.innerWidth;
    const dy = (e.pointer.y - lastPos.current.y) / window.innerHeight;
    lastPos.current = { x: e.pointer.x, y: e.pointer.y };

    targetRotation.current.y = THREE.MathUtils.clamp(
      targetRotation.current.y + dx * 3,
      -0.7,
      0.7
    );
    targetRotation.current.x = THREE.MathUtils.clamp(
      targetRotation.current.x + dy * 2,
      -0.3,
      0.3
    );
  };

  if (!data || !geometry) return null;

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <points
        ref={pointsRef}
        geometry={geometry}
        frustumCulled={false}
        scale={1.35}
      >
        <pointsMaterial
          size={0.012}
          vertexColors
          depthWrite={false}
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  );
}

const PixelAvatar: React.FC = () => {
  return (
    <div className="w-[260px] h-[260px] md:w-[360px] md:h-[360px]">
      <Canvas camera={{ position: [0, 0, 3.3] }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        <PixelAvatarPoints />
      </Canvas>
    </div>
  );
};

export default PixelAvatar;

