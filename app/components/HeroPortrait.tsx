"use client";

import React from "react";
import Image from "next/image";
import AsciiAvatar, { type PortraitHitTestRef } from "./AsciiAvatar";
import { fullName } from "../site-content";

type Props = {
  isPortraitHovered: boolean;
  setIsPortraitHovered: (next: boolean) => void;
  portraitHitTestRef: React.MutableRefObject<PortraitHitTestRef>;
};

export default function HeroPortrait({
  isPortraitHovered,
  setIsPortraitHovered,
  portraitHitTestRef,
}: Props) {
  return (
    <section className="hero-content-reveal flex-1 flex items-center justify-center w-full min-h-0 max-h-[35vh] sm:max-h-[40vh] pt-20 sm:pt-28 md:pt-48 lg:pt-64">
      <div
        className="pixel-portrait hero-portrait-animate ascii-portrait-large cursor-pointer"
        onMouseMove={(e) =>
          setIsPortraitHovered(
            portraitHitTestRef.current?.isOverPerson(e.clientX, e.clientY) ??
              false
          )
        }
        onMouseLeave={() => setIsPortraitHovered(false)}
        role="img"
        aria-label={`${fullName} portrait`}
      >
        <div
          className={`transition-opacity duration-200 ${isPortraitHovered ? "opacity-0" : "opacity-100"}`}
          style={{ pointerEvents: isPortraitHovered ? "none" : undefined }}
        >
          <AsciiAvatar hitTestRef={portraitHitTestRef} />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-200 ${isPortraitHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div className="relative w-full h-full">
            <Image
              src="/portrait.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 200px, 280px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

