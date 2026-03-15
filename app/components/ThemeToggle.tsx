"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "theme";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(THEME_KEY) as "dark" | "light" | null;
    const prefersDark = !window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(initial === "light" ? "theme-light" : "theme-dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(next === "light" ? "theme-light" : "theme-dark");
  };

  if (!mounted) {
    return (
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2 sm:right-4 w-10 h-10 flex items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#111]"
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle absolute right-3 top-1/2 -translate-y-1/2 sm:right-4 w-10 h-10 flex items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#111] text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
