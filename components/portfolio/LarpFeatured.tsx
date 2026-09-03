"use client";

import { motion } from "framer-motion";
import type { Project } from "@/app/projects/projects-data";
import { easeOut } from "@/components/portfolio/portfolio-motion";

type Props = {
  project: Project;
  compact?: boolean;
  idx?: number;
};

export function LarpFeatured({ project, compact = false, idx = 0 }: Props) {
  const videoSrc = project.video;
  const docsHref = project.link;
  const description = project.description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");

  if (!videoSrc) return null;

  const body = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <video
          src={videoSrc}
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={`${project.title} preview video`}
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 px-4 py-3">
        <p
          className={`font-semibold tracking-tight text-foreground ${
            compact ? "text-sm leading-snug" : "text-base sm:text-[1.06rem]"
          }`}
        >
          {project.title}
        </p>
        <p
          className={`leading-relaxed text-muted-foreground ${
            compact
              ? "line-clamp-2 min-h-[2.75rem] text-xs"
              : "line-clamp-3 min-h-[4.5rem] text-sm"
          }`}
        >
          {description}
        </p>
        <p className="text-xs text-muted-foreground">{project.year ?? "Project"}</p>
        {docsHref ? (
          <p className="text-xs text-muted-foreground">Docs</p>
        ) : null}
      </div>
    </>
  );

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ ...easeOut, delay: idx * 0.025 }}
    >
      {docsHref ? (
        <a
          href={docsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-full min-h-0 flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {body}
        </a>
      ) : (
        body
      )}
    </motion.article>
  );
}
