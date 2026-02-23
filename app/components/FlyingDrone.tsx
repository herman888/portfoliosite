import { useEffect, useRef } from "react";

// Drone SVG (same as cursor, but larger)
const DroneSVG = () => (
  <svg width="60" height="60" viewBox="0 0 40 40" fill="none">
    <ellipse cx="20" cy="20" rx="7" ry="7" fill="#bfa94c" />
    <rect x="19" y="2" width="2" height="12" rx="1" fill="#6366f1" />
    <rect x="19" y="26" width="2" height="12" rx="1" fill="#6366f1" />
    <rect x="2" y="19" width="12" height="2" rx="1" fill="#6366f1" />
    <rect x="26" y="19" width="12" height="2" rx="1" fill="#6366f1" />
    <ellipse cx="20" cy="6" rx="3" ry="1.5" fill="#6366f1" />
    <ellipse cx="20" cy="34" rx="3" ry="1.5" fill="#6366f1" />
    <ellipse cx="6" cy="20" rx="1.5" ry="3" fill="#6366f1" />
    <ellipse cx="34" cy="20" rx="1.5" ry="3" fill="#6366f1" />
    <circle cx="20" cy="20" r="3" fill="#fff" />
  </svg>
);

export default function FlyingDrone() {
  const droneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let running = true;
    const moveDrone = () => {
      if (!droneRef.current) return;
      // Get viewport size
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Random position, keeping drone inside viewport
      const x = Math.random() * (vw - 60) + 30;
      const y = Math.random() * (vh - 60) + 30;
      droneRef.current.style.transform = `translate(${x}px, ${y}px)`;
      // Move every 3-6 seconds
      if (running) {
        setTimeout(moveDrone, 3000 + Math.random() * 3000);
      }
    };
    // Initial position
    moveDrone();
    return () => { running = false; };
  }, []);

  return (
    <div
      ref={droneRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 60,
        height: 60,
        zIndex: 1000,
        pointerEvents: "none",
        transition: "transform 2.5s cubic-bezier(0.4,0.7,0.2,1)",
        boxShadow: "0 8px 32px 0 rgba(99,102,241,0.15)",
        borderRadius: "50%",
        background: "rgba(245,245,220,0.15)",
        border: "2px solid #bfa94c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DroneSVG />
    </div>
  );
}
