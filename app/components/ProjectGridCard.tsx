"use client";

import Image from "next/image";
import Link from "next/link";
import { InstagramReelCardPreview } from "@/components/media/InstagramReelCardPreview";
import { InstagramReelEmbed } from "@/components/media/InstagramReelEmbed";
import type { Project } from "../projects/projects-data";
import { projectCardImageFraming } from "../projects/projects-data";

function hrefFor(p: Project): string | undefined {
  return p.link ?? p.code ?? p.devpost;
}

function isExternalHref(href: string) {
  return href.startsWith("http");
}

type Props = {
  project: Project;
};

/**
 * Card layout: 16:9 media on top, title + caption below.
 * Uses `font-sans` so it follows the site Inter / layout fonts (not legacy monospace project styles).
 */
export function ProjectGridCard({ project }: Props) {
  const gallery = project.images;
  const imageSrc = project.image ?? gallery?.[0];
  const videoSrc = project.video;
  const bodyText =
    project.instagramCardPreview === "link" ||
    project.instagramCardPreview === "autoplay"
      ? project.description
      : project.caption ?? project.description;
  const href = hrefFor(project);

  const media = (
    <div
      className={`relative w-full bg-muted ${
        project.instagramReelId
          ? project.instagramCardPreview === "autoplay" && project.video
            ? "aspect-video overflow-hidden"
            : project.instagramCardPreview === "link"
              ? "aspect-video overflow-hidden"
              : "flex min-h-[280px] items-center justify-center overflow-hidden bg-white py-2 sm:min-h-[320px]"
          : "aspect-video"
      }`}
    >
      {project.instagramReelId ? (
        project.instagramCardPreview === "autoplay" && videoSrc ? (
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
        ) : project.instagramCardPreview === "link" ? (
          <InstagramReelCardPreview
            title={project.title}
            posterSrc={imageSrc}
            posterUnoptimized={project.imageUnoptimized}
            className="h-full w-full"
          />
        ) : (
          <InstagramReelEmbed
            reelId={project.instagramReelId}
            title={project.title}
            density="card"
            className="h-full w-full min-h-0"
          />
        )
      ) : videoSrc ? (
        <video
          src={videoSrc}
          poster={project.videoPoster}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover bg-muted"
        />
      ) : imageSrc ? (
        (() => {
          const framing = projectCardImageFraming(project);
          const hoverClass =
            project.imageObjectScale || project.imageCardFit === "contain"
              ? ""
              : "transition-transform duration-500 group-hover:scale-[1.03]";
          return project.imageUnoptimized ? (
            <img
              src={imageSrc}
              alt={project.title}
              className={`${framing.className} ${hoverClass}`}
              style={framing.style}
              loading="lazy"
              decoding="async"
            />
          ) : project.imageObjectScale ? (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute" style={framing.zoomBox}>
                <Image
                  src={imageSrc}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={framing.imageClassName}
                  style={framing.imageStyle}
                />
              </div>
            </div>
          ) : (
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`${framing.imageClassName} ${hoverClass}`}
              style={framing.imageStyle}
            />
          );
        })()
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
        {bodyText}
      </p>
    </div>
  );

  const shell =
    "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow duration-300 hover:shadow-md";

  if (href) {
    const linkClass =
      "flex h-full min-h-0 flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
    if (isExternalHref(href)) {
      return (
        <article className={shell}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {media}
            {body}
          </a>
        </article>
      );
    }
    return (
      <article className={shell}>
        <Link href={href} className={linkClass}>
          {media}
          {body}
        </Link>
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
