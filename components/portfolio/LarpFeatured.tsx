"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen } from "lucide-react";
import type { Project, ProjectVideoClip } from "@/app/projects/projects-data";

type Props = {
  project: Project;
};

export function LarpFeatured({ project }: Props) {
  const clips: ProjectVideoClip[] =
    project.videoClips && project.videoClips.length > 0
      ? project.videoClips
      : project.video
        ? [{ id: "v0", label: "V0", emoji: "🎬", src: project.video }]
        : [];

  const [activeId, setActiveId] = useState(clips[0]?.id ?? "");
  const [muted, setMuted] = useState(true);
  const [swapping, setSwapping] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const swapTimer = useRef<number | null>(null);

  const active = clips.find((c) => c.id === activeId) ?? clips[0];
  const lines = project.description
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const docsHref = project.link;

  useEffect(() => {
    return () => {
      if (swapTimer.current) window.clearTimeout(swapTimer.current);
    };
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !active) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) void vid.play().catch(() => {});
          else vid.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(vid);
    return () => observer.disconnect();
  }, [active?.src]);

  function swapTo(clip: ProjectVideoClip) {
    if (clip.id === activeId || !videoRef.current) return;
    setActiveId(clip.id);
    setSwapping(true);
    if (swapTimer.current) window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(() => {
      const vid = videoRef.current;
      if (!vid) return;
      vid.src = clip.src;
      vid.muted = muted;
      void vid.play().catch(() => {});
      setSwapping(false);
    }, 180);
  }

  function toggleSound() {
    const next = !muted;
    setMuted(next);
    const vid = videoRef.current;
    if (vid) {
      vid.muted = next;
      if (!next) void vid.play().catch(() => {});
    }
  }

  if (!active) return null;

  return (
    <article className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:border-neutral-300 hover:shadow-md sm:max-w-2xl">
      <div className="grid grid-cols-[112px_1fr] sm:grid-cols-[140px_1fr]">
        <div className="flex items-center justify-center bg-muted p-2.5 sm:p-3">
          <div className="relative w-full overflow-hidden rounded-md border border-border bg-neutral-900 aspect-[9/16]">
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full cursor-pointer object-cover transition-opacity duration-150 ${
                swapping ? "opacity-0" : "opacity-100"
              }`}
              src={active.src}
              muted={muted}
              loop
              playsInline
              preload="metadata"
              onClick={toggleSound}
              aria-label={`${project.title} ${active.label}`}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-2 border-l border-border px-3 py-3 sm:gap-2.5 sm:px-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-800">
              building now
            </span>
            <button
              type="button"
              onClick={toggleSound}
              className="rounded-md border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors hover:border-neutral-400 hover:text-foreground"
            >
              {muted ? "Sound off" : "Sound on"}
            </button>
          </div>

          <div className="min-w-0">
            <h3 className="text-[0.95rem] font-semibold tracking-tight text-foreground sm:text-base">
              {project.title}
            </h3>
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground sm:text-[13px] sm:leading-relaxed">
              {project.caption ?? lines[0]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {clips.map((clip) => {
              const isActive = clip.id === activeId;
              return (
                <button
                  key={clip.id}
                  type="button"
                  onClick={() => swapTo(clip)}
                  title={clip.label}
                  className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors ${
                    isActive
                      ? "border-neutral-400 bg-muted text-foreground"
                      : "border-border text-muted-foreground hover:border-neutral-400 hover:text-foreground"
                  }`}
                >
                  <span aria-hidden className="text-[13px] leading-none">
                    {clip.emoji ?? "▶"}
                  </span>
                  <span className="font-mono tracking-tight">{clip.label}</span>
                </button>
              );
            })}
            {docsHref ? (
              <a
                href={docsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-neutral-400 hover:text-foreground"
              >
                <BookOpen className="h-3.5 w-3.5" aria-hidden />
                <span className="font-mono tracking-tight">Docs</span>
              </a>
            ) : null}
          </div>

          {lines.length > 0 ? (
            <p className="text-[11px] leading-snug text-muted-foreground line-clamp-2 sm:text-xs">
              {lines.join(" · ")}
            </p>
          ) : null}

          {project.code ? (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-[11px] text-muted-foreground underline decoration-neutral-400 underline-offset-[3px] transition-colors hover:decoration-neutral-600 hover:text-foreground"
            >
              Watch on Instagram
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
