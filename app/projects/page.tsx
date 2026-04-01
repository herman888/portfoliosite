"use client";

import { useMemo, useState } from "react";
import ProjectsSection from "../components/ProjectsSection";
import { projects } from "./projects-data";

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string>("");

  const allTags = useMemo(() => {
    const s = new Set<string>();
    for (const p of projects) {
      for (const t of p.tags) s.add(t);
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter((p) => p.tags.includes(selectedTag));
  }, [selectedTag]);

  return (
    <main className="min-h-screen bg-background text-foreground mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <section className="w-full px-3 sm:px-4 py-10 sm:py-12 rounded-lg border border-border bg-card">
        <div className="flex flex-col gap-3 mb-8">
          <div className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
            Projects / filter by tag
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedTag("")}
              className={`px-3 py-1 text-[0.7rem] uppercase tracking-wider border rounded-sm ${
                selectedTag === ""
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground bg-muted/50"
              }`}
            >
              ALL
            </button>
            {allTags.map((t) => {
              const active = selectedTag === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTag(t)}
                  className={`px-3 py-1 text-[0.7rem] uppercase tracking-wider border rounded-sm ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:text-foreground bg-muted/50"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <ProjectsSection projects={filteredProjects} columns="3" />
      </section>
    </main>
  );
}
