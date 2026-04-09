"use client";

import { useMemo, useState } from "react";
import { Code2, Cpu } from "lucide-react";
import ProjectsSection from "../components/ProjectsSection";
import {
  hardwareProjects,
  softwareProjects,
  type ProjectCategory,
} from "./projects-data";

export default function ProjectsPage() {
  const [category, setCategory] = useState<ProjectCategory>("software");
  const [selectedTag, setSelectedTag] = useState<string>("");

  const pool = category === "software" ? softwareProjects : hardwareProjects;

  const allTags = useMemo(() => {
    const s = new Set<string>();
    for (const p of pool) {
      for (const t of p.tags) s.add(t);
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [pool]);

  const filteredProjects = useMemo(() => {
    if (!selectedTag) return pool;
    return pool.filter((p) => p.tags.includes(selectedTag));
  }, [pool, selectedTag]);

  const isSoftware = category === "software";

  return (
    <main className="min-h-screen bg-background text-foreground mx-auto w-full max-w-screen-2xl px-4 py-16 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16 sm:py-20">
      <section className="w-full rounded-xl border border-border bg-muted/20 px-3 py-8 sm:px-5 sm:py-10">
        <div className="mx-auto max-w-screen-2xl">
          <div className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
            Projects
          </div>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Software and hardware live in separate zones — switch the lane, then
            narrow by tag.
          </p>

          <div
            className="mt-8 flex rounded-2xl border border-border bg-muted/60 p-1.5 sm:p-2"
            role="tablist"
            aria-label="Project category"
          >
            <button
              type="button"
              role="tab"
              aria-selected={isSoftware}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-[0.7rem] font-semibold uppercase tracking-wider transition-all sm:py-3.5 ${
                isSoftware
                  ? "bg-card text-foreground shadow-md ring-1 ring-foreground/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => {
                setCategory("software");
                setSelectedTag("");
              }}
            >
              <Code2 className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Software
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!isSoftware}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-[0.7rem] font-semibold uppercase tracking-wider transition-all sm:py-3.5 ${
                !isSoftware
                  ? "bg-card text-foreground shadow-md ring-1 ring-foreground/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => {
                setCategory("hardware");
                setSelectedTag("");
              }}
            >
              <Cpu className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Hardware
            </button>
          </div>

          <div
            className={`mt-6 rounded-xl border px-3 py-5 sm:px-5 sm:py-6 ${
              isSoftware
                ? "border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/40"
                : "border-zinc-200/95 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-950/40"
            }`}
          >
            <p
              className={`text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${
                isSoftware
                  ? "text-slate-500 dark:text-slate-400"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {isSoftware
                ? "Filter — software tags"
                : "Filter — hardware tags"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedTag("")}
                className={`px-3 py-1.5 text-[0.65rem] uppercase tracking-wider border rounded-md transition-colors ${
                  selectedTag === ""
                    ? isSoftware
                      ? "border-slate-800 bg-slate-900 text-white dark:border-slate-200 dark:bg-slate-100 dark:text-slate-900"
                      : "border-zinc-800 bg-zinc-900 text-zinc-50 dark:border-zinc-600 dark:bg-zinc-800"
                    : "border-transparent bg-background/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                All tags
              </button>
              {allTags.map((t) => {
                const active = selectedTag === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTag(t)}
                    className={`px-3 py-1.5 text-[0.65rem] uppercase tracking-wider border rounded-md transition-colors ${
                      active
                        ? isSoftware
                          ? "border-slate-800 bg-slate-900 text-white dark:border-slate-200 dark:bg-slate-100 dark:text-slate-900"
                          : "border-zinc-800 bg-zinc-900 text-zinc-50 dark:border-zinc-600 dark:bg-zinc-800"
                        : "border-transparent bg-background/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`mt-6 rounded-xl border px-3 py-8 sm:px-6 sm:py-10 ${
              isSoftware
                ? "border-slate-200/95 bg-gradient-to-b from-slate-50 to-slate-100/30 dark:border-slate-800 dark:from-slate-950/80 dark:to-slate-950/40"
                : "border-zinc-200/95 bg-gradient-to-b from-zinc-50 to-zinc-100/40 dark:border-zinc-800 dark:from-zinc-950/80 dark:to-zinc-950/45"
            }`}
          >
            <div
              className={`mb-8 border-b pb-6 ${
                isSoftware
                  ? "border-slate-200 dark:border-slate-800"
                  : "border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <h2
                className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                  isSoftware
                    ? "text-slate-700 dark:text-slate-300"
                    : "text-zinc-800 dark:text-zinc-200"
                }`}
              >
                {isSoftware ? "Software projects" : "Hardware projects"}
              </h2>
              <p
                className={`mt-2 max-w-xl text-sm ${
                  isSoftware
                    ? "text-slate-600 dark:text-slate-400"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                {isSoftware
                  ? "Four columns on large screens — apps, hacks, and code-heavy work."
                  : "Three columns — Arduino, electronics, and physical demos."}
              </p>
            </div>
            <ProjectsSection
              projects={filteredProjects}
              columns={isSoftware ? "4" : "3"}
              showHeading={false}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
