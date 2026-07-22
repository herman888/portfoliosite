"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pencil } from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";
import { playPortfolioSound, type PortfolioSound } from "@/lib/portfolio-sounds";

type Variant = "highlight" | "underline";

type Props = {
  children: ReactNode;
  color: string;
  delay?: number;
  variant?: Variant;
  sound?: PortfolioSound;
  active?: boolean;
  /** Tiny pencil that rides the stroke as it draws. */
  pencil?: boolean;
  className?: string;
};

export function MarkerHighlight({
  children,
  color,
  delay = 0,
  variant = "highlight",
  sound = "marker",
  active = true,
  pencil = false,
  className = "",
}: Props) {
  const reduceMotion = useReducedMotion();
  const played = useRef(false);

  useEffect(() => {
    if (!active || reduceMotion || played.current) return;
    const ms = delay * 1000 + 80;
    const id = window.setTimeout(() => {
      played.current = true;
      playPortfolioSound(sound);
    }, ms);
    return () => window.clearTimeout(id);
  }, [active, delay, reduceMotion, sound]);

  if (reduceMotion) {
    return (
      <span
        className={`relative inline font-medium ${className}`}
        style={
          variant === "highlight"
            ? {
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
                background: `${color}55`,
              }
            : undefined
        }
      >
        {children}
        {variant === "underline" ? (
          <span
            className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-[3px] rounded-full opacity-80"
            style={{ background: color }}
            aria-hidden
          />
        ) : null}
      </span>
    );
  }

  const strokeDuration = variant === "underline" ? 0.65 : 0.55;

  return (
    <span className={`relative inline whitespace-nowrap ${className}`}>
      {variant === "highlight" ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -left-[3%] -right-[3%] bottom-[0.08em] -z-10 origin-left rounded-[3px]"
          style={{
            height: "0.58em",
            backgroundColor: color,
            rotate: "-0.6deg",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={active ? { scaleX: 1, opacity: 0.52 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: strokeDuration, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -bottom-1 left-0 right-0 -z-10 h-[4px] origin-left"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 8' preserveAspectRatio='none'><path d='M0 5 Q15 1 30 5 T60 4 T90 6 T120 3' fill='none' stroke='${color}' stroke-width='3.5' stroke-linecap='round'/></svg>`
            )}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={active ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: strokeDuration, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {pencil ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-1/2 z-10 -mt-2.5 text-neutral-600"
          initial={{ left: "-4%", opacity: 0, rotate: -25 }}
          animate={
            active
              ? {
                  left: ["-4%", "96%"],
                  opacity: [0, 1, 1, 0],
                  rotate: [-25, -12, -18],
                }
              : { left: "-4%", opacity: 0, rotate: -25 }
          }
          transition={{
            duration: strokeDuration,
            delay,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.12, 0.85, 1],
          }}
        >
          <Pencil className="h-3.5 w-3.5" strokeWidth={2.25} />
        </motion.span>
      ) : null}

      <span className="relative font-medium text-foreground">{children}</span>
    </span>
  );
}
