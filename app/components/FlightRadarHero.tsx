"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type RadarMode = "scan" | "orbit" | "return";

type Props = {
  mode: RadarMode;
  onModeChange: (next: RadarMode) => void;
};

function RadarScene({ mode }: { mode: RadarMode }) {
  const sweepRef = useRef<THREE.Mesh>(null);
  const droneRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const points = useMemo(() => {
    // Small static point cloud around the radar.
    const count = 900;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Bias points towards the ring area for a radar-like look.
      const r = 1.2 + Math.random() * 3.0;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const y = (Math.random() - 0.5) * 0.7;

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const shade = 0.35 + Math.random() * 0.65;
      colors[i * 3 + 0] = shade; // grayscale; we keep it subtle
      colors[i * 3 + 1] = shade;
      colors[i * 3 + 2] = shade;
    }

    return { positions, colors, count };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (sweepRef.current) {
      const baseSpeed = 0.55;
      const modeSpeed =
        mode === "scan" ? 1 : mode === "orbit" ? 1.5 : 0.8;
      sweepRef.current.rotation.z = t * baseSpeed * modeSpeed;
    }

    if (groupRef.current && droneRef.current) {
      const k = mode === "scan" ? 0.35 : mode === "orbit" ? 0.55 : 0.25;
      const radius = mode === "return" ? 1.2 - (Math.sin(t * 0.3) + 1) * 0.35 : 2.0;

      const x = Math.cos(t * k) * radius;
      const z = Math.sin(t * k) * radius;
      const y = Math.sin(t * (k * 1.4)) * 0.25;
      droneRef.current.position.set(x, y, z);

      // Orientation: face direction of movement.
      droneRef.current.rotation.y = t * k + Math.PI / 2;
      droneRef.current.rotation.x = Math.sin(t * k) * 0.1;

      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 2]} intensity={0.5} />

      {/* Radar base (wire ring) */}
      <mesh rotation-x={Math.PI / 2}>
        <ringGeometry args={[1.2, 3.8, 128]} />
        <meshBasicMaterial color={new THREE.Color("#6366f1")} wireframe transparent opacity={0.6} />
      </mesh>

      {/* Scan sweep (thin arc) */}
      <mesh ref={sweepRef} rotation-x={Math.PI / 2}>
        <torusGeometry args={[3.0, 0.04, 8, 100]} />
        <meshBasicMaterial color={new THREE.Color("#bfa94c")} transparent opacity={0.65} />
      </mesh>

      {/* Point cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[points.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[points.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.03}
          transparent
          opacity={0.35}
        />
      </points>

      {/* Drone silhouette */}
      <mesh ref={droneRef}>
        <coneGeometry args={[0.16, 0.5, 8]} />
        <meshStandardMaterial color={new THREE.Color("#f5f5f5")} emissive={new THREE.Color("#bfa94c")} emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

export default function FlightRadarHero({ mode, onModeChange }: Props) {
  return (
    <div className="flight-radar-hero relative w-full h-[360px] md:h-[520px] overflow-hidden rounded-lg border border-[#2a2a2a] bg-black/20">
      <Canvas
        camera={{ position: [0, 4, 7], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <RadarScene mode={mode} />
      </Canvas>

      {/* Mode overlay */}
      <div className="absolute left-3 top-3 flex flex-wrap gap-2">
        {(
          [
            { id: "scan", label: "SCAN" },
            { id: "orbit", label: "ORBIT" },
            { id: "return", label: "RETURN" },
          ] as const
        ).map((m) => {
          const active = mode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onModeChange(m.id)}
              className={`px-2 py-1 text-[0.65rem] uppercase tracking-wider border rounded-sm ${
                active
                  ? "border-[#f5f5f5] text-black bg-[#f5f5f5]"
                  : "border-[#2a2a2a] text-gray-300 hover:text-white bg-black/30"
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* HUD overlay */}
      <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
        <div className="text-[0.65rem] uppercase tracking-[0.25em] text-gray-500">
          flight/radar interface
        </div>
        <div className="text-gray-300 text-[0.75rem] mt-1">
          {mode === "scan" && "sweeping signals…"}
          {mode === "orbit" && "locking orbit track…"}
          {mode === "return" && "returning to base…"}
        </div>
      </div>
    </div>
  );
}

