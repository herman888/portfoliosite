"use client";

import React from "react";
import Image from "next/image";
import { type Project } from "../projects/projects-data";

type Props = {
  projects: Project[];
  onLearnMore?: () => void;
};

function ProjectCard({ project }: { project: Project }) {
  const imageSrc = project.image ?? project.images?.[0];
  const caption = project.caption ?? project.description;
  const href = project.link ?? project.code ?? project.devpost;

  const cardContent = (
    <>
      <div className="relative w-full aspect-[4/3] bg-muted overflow-hidden">
        {project.title === "Finding N.E.M.O (ConUHacks)" ? (
          <iframe
            title="Finding N.E.M.O Demo"
            src="https://www.youtube.com/embed/PQBeq-7WKRE"
            className="absolute inset-0 w-full h-full object-cover"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : null}
      </div>

      <div className="p-3 sm:p-4 md:p-5">
        <h3 className="projects-card-title mb-1 leading-tight">
          {project.title}
        </h3>
        <p className="projects-card-subtitle leading-snug">{caption}</p>
      </div>
    </>
  );

  return (
    <article className="projects-card group rounded-lg flex flex-col">
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="flex flex-col h-full"
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </article>
  );
}

export default function ProjectsSection({ projects, onLearnMore }: Props) {
  return (
    <>
      <div className="projects-heading mb-6 sm:mb-8">
        <h2 className="uppercase text-foreground font-semibold text-xs sm:text-sm tracking-widest shrink-0">
          Projects
        </h2>
        <div className="projects-heading-line" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-x-8 sm:gap-y-10 relative">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {onLearnMore && (
        <div className="mt-8 sm:mt-10 flex justify-center">
          <button
            type="button"
            onClick={onLearnMore}
            className="min-h-[44px] px-5 py-2.5 sm:py-2 border border-border bg-muted hover:bg-muted/80 text-[0.7rem] md:text-xs uppercase tracking-[0.25em] text-foreground"
          >
            Learn more
          </button>
        </div>
      )}
    </>
  );
}

