"use client";

import Image from "next/image";
import type { Project } from "../projects/projects-data";

function hrefFor(p: Project): string | undefined {
  return p.link ?? p.code ?? p.devpost;
}

type Props = {
  project: Project;
};

/**
 * Card layout: 16:9 media on top, title + caption below.
 * Uses `font-sans` so it follows the site Inter / layout fonts (not legacy monospace project styles).
 */
export function ProjectGridCard({ project }: Props) {
  const imageSrc = project.image ?? project.images?.[0];
  const videoSrc = project.video;
  const caption = project.caption ?? project.description;
  const href = hrefFor(project);

  const media = (
    <div className="relative aspect-video w-full bg-muted">
      {videoSrc ? (
        <video
          src={videoSrc}
          poster={project.videoPoster}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover bg-muted"
        />
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={
            project.imageObjectPosition
              ? { objectPosition: project.imageObjectPosition }
              : undefined
          }
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          Preview
        </div>
      )}
    </div>
  );

  const body = (
    <div className="flex flex-1 flex-col p-4 md:p-5">
      <h3 className="font-sans text-base font-semibold leading-snug tracking-tight text-foreground line-clamp-2">
        {project.title}
      </h3>
      <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {caption}
      </p>
    </div>
  );

  const shell =
    "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow duration-300 hover:shadow-md";

  if (href) {
    return (
      <article className={shell}>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="flex h-full min-h-0 flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {media}
          {body}
        </a>
      </article>
    );
  }

  return (
    <article className={shell}>
      {media}
      {body}
    </article>
  );
}
