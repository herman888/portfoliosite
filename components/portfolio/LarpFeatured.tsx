"use client";

import type { Project } from "@/app/projects/projects-data";

type Props = {
  project: Project;
};

export function LarpFeatured({ project }: Props) {
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
        <p className="text-base font-semibold leading-snug tracking-tight text-foreground sm:text-[1.06rem] lg:text-sm">
          {project.title}
        </p>
        <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-relaxed text-muted-foreground lg:line-clamp-2 lg:min-h-[2.75rem] lg:text-xs">
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
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md">
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
    </article>
  );
}
