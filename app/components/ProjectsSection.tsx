"use client";

import React from "react";
import { type Project } from "../projects/projects-data";
import { ProjectGridCard } from "./ProjectGridCard";

type Props = {
  projects: Project[];
  onLearnMore?: () => void;
  /** Default: 3 columns on large screens (1 → 2 → 3). */
  columns?: "2" | "3";
  showHeading?: boolean;
};

export default function ProjectsSection({
  projects,
  onLearnMore,
  columns = "3",
  showHeading = true,
}: Props) {
  const gridClass =
    columns === "3"
      ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      : "grid grid-cols-1 gap-6 md:grid-cols-2";

  return (
    <>
      {showHeading ? (
        <div className="projects-heading mb-8 sm:mb-10">
          <h2 className="shrink-0 text-xs font-semibold uppercase tracking-widest text-foreground sm:text-sm">
            {"Things I've done"}
          </h2>
          <div className="projects-heading-line" />
        </div>
      ) : null}

      <div className={`${gridClass} relative`}>
        {projects.map((project) => (
          <ProjectGridCard key={project.title} project={project} />
        ))}
      </div>

      {onLearnMore ? (
        <div className="mt-10 flex justify-center sm:mt-12">
          <button
            type="button"
            onClick={onLearnMore}
            className="min-h-[44px] border border-border bg-muted px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-muted/80 sm:py-2 md:text-xs"
          >
            Learn more
          </button>
        </div>
      ) : null}
    </>
  );
}
