"use client";

import ProjectsSection from "../components/ProjectsSection";
import { allPortfolioProjects } from "./projects-data";

export default function ProjectsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-2xl overflow-x-clip bg-background px-4 py-12 text-foreground sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-10 xl:px-14 2xl:px-16">
      <section className="w-full">
        <div className="mx-auto max-w-screen-2xl">
          <div className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
            Projects
          </div>

          <div className="mt-10">
            <ProjectsSection
              projects={allPortfolioProjects}
              columns="4"
              showHeading={false}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
