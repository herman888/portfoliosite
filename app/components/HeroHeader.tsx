"use client";

import React from "react";
import { Press_Start_2P } from "next/font/google";
import { site } from "../site-content";
import ThemeToggle from "./ThemeToggle";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function HeroHeader() {
  return (
    <header className="hero-name-drop hero-name-block shrink-0 text-center relative z-10 px-3 sm:px-4">
      <ThemeToggle />
      <div
        className={`${pixelFont.className} pixel-hero-title text-[11px] sm:text-[10px] md:text-xs`}
      >
        {site.person.firstName.toUpperCase()}
      </div>
      <div
        className={`${pixelFont.className} pixel-hero-subtitle mt-1.5 sm:mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl`}
      >
        {site.person.lastName.toUpperCase()}
      </div>
    </header>
  );
}

