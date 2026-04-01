"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { aboutBriefs, type AboutBriefMode } from "../site-content";

const modes: { id: AboutBriefMode; label: string }[] = [
  { id: "drone", label: "DRONE" },
  { id: "air", label: "AIRPLANE" },
  { id: "city", label: "CITY" },
];

export default function AboutPage() {
  const [mode, setMode] = useState<AboutBriefMode>("drone");

  const content = useMemo(() => aboutBriefs[mode], [mode]);

  return (
    <main className="min-h-screen bg-background text-foreground w-full max-w-4xl mx-auto px-3 sm:px-4 py-16 sm:py-20">
      <div className="border border-border bg-card text-card-foreground p-4 sm:p-6 md:p-8 rounded-sm">
        <div className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
          ABOUT / MISSION BRIEF
        </div>

        <h1 className="mt-3 text-2xl sm:text-3xl font-bold">{content.title}</h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {modes.map((m) => {
            const active = m.id === mode;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`px-3 py-1 text-[0.7rem] uppercase tracking-wider border rounded-sm ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:text-foreground bg-muted/50"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-muted-foreground text-[0.72rem] leading-relaxed">
          {content.body}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="px-4 py-2 text-[0.7rem] uppercase tracking-wider border border-border bg-muted/50 hover:bg-muted"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 text-[0.7rem] uppercase tracking-wider border border-border bg-muted/50 hover:bg-muted"
          >
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
