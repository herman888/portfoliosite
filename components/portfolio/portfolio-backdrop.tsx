"use client";

/**
 * Minimal ambient: single soft vertical wash — no grid, no pointer tracking, no motion.
 */
export function PortfolioBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.995 0 0) 0%, oklch(0.99 0 0) 35%, oklch(0.975 0.005 250 / 0.4) 100%)",
        }}
      />
    </div>
  );
}
