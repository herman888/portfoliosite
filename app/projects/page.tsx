"use client";

import { useMemo, useState } from "react";
import ProjectsSection from "../components/ProjectsSection";
import {
  hardwareProjects,
  softwareProjects,
} from "./projects-data";

export default function ProjectsPage() {
  const [softwareTag, setSoftwareTag] = useState<string>("");
  const [hardwareTag, setHardwareTag] = useState<string>("");

  const softwareTags = useMemo(() => {
    const s = new Set<string>();
    for (const p of softwareProjects) {
      for (const t of p.tags) s.add(t);
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, []);

  const hardwareTags = useMemo(() => {
    const s = new Set<string>();
    for (const p of hardwareProjects) {
      for (const t of p.tags) s.add(t);
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredSoftware = useMemo(() => {
    if (!softwareTag) return softwareProjects;
    return softwareProjects.filter((p) => p.tags.includes(softwareTag));
  }, [softwareTag]);

  const filteredHardware = useMemo(() => {
    if (!hardwareTag) return hardwareProjects;
    return hardwareProjects.filter((p) => p.tags.includes(hardwareTag));
  }, [hardwareTag]);

  return (
    <main className="min-h-screen bg-background text-foreground mx-auto w-full max-w-screen-2xl px-4 py-16 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16 sm:py-20">
      <section className="w-full rounded-xl border border-border bg-muted/20 px-3 py-8 sm:px-5 sm:py-10">
        <div className="mx-auto max-w-screen-2xl">
          <div className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
            Projects
          </div>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Software projects first, then hardware projects underneath.
          </p>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-5 sm:px-5 sm:py-6 dark:border-slate-800 dark:bg-slate-950/40">
            <p
              className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
            >
              Filter — software tags
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSoftwareTag("")}
                className={`px-3 py-1.5 text-[0.65rem] uppercase tracking-wider border rounded-md transition-colors ${
                  softwareTag === ""
                    ? "border-slate-800 bg-slate-900 text-white dark:border-slate-200 dark:bg-slate-100 dark:text-slate-900"
                    : "border-transparent bg-background/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                All tags
              </button>
              {softwareTags.map((t) => {
                const active = softwareTag === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSoftwareTag(t)}
                    className={`px-3 py-1.5 text-[0.65rem] uppercase tracking-wider border rounded-md transition-colors ${
                      active
                        ? "border-slate-800 bg-slate-900 text-white dark:border-slate-200 dark:bg-slate-100 dark:text-slate-900"
                        : "border-transparent bg-background/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200/95 bg-gradient-to-b from-slate-50 to-slate-100/30 px-3 py-8 sm:px-6 sm:py-10 dark:border-slate-800 dark:from-slate-950/80 dark:to-slate-950/40">
            <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">
                Software projects
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
                Four columns on large screens — apps, hacks, and code-heavy work.
              </p>
            </div>
            <ProjectsSection
              projects={filteredSoftware}
              columns="4"
              showHeading={false}
            />
          </div>

          <div className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50/80 px-3 py-5 sm:px-5 sm:py-6 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Filter — hardware tags
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setHardwareTag("")}
                className={`px-3 py-1.5 text-[0.65rem] uppercase tracking-wider border rounded-md transition-colors ${
                  hardwareTag === ""
                    ? "border-zinc-800 bg-zinc-900 text-zinc-50 dark:border-zinc-600 dark:bg-zinc-800"
                    : "border-transparent bg-background/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                All tags
              </button>
              {hardwareTags.map((t) => {
                const active = hardwareTag === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setHardwareTag(t)}
                    className={`px-3 py-1.5 text-[0.65rem] uppercase tracking-wider border rounded-md transition-colors ${
                      active
                        ? "border-zinc-800 bg-zinc-900 text-zinc-50 dark:border-zinc-600 dark:bg-zinc-800"
                        : "border-transparent bg-background/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-zinc-200/95 bg-gradient-to-b from-zinc-50 to-zinc-100/40 px-3 py-8 sm:px-6 sm:py-10 dark:border-zinc-800 dark:from-zinc-950/80 dark:to-zinc-950/45">
            <div className="mb-8 border-b border-zinc-200 pb-6 dark:border-zinc-800">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-200">
                Hardware projects
              </h2>
              <p className="mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
                Three columns — Arduino, electronics, and physical demos.
              </p>
            </div>
            <ProjectsSection
              projects={filteredHardware}
              columns="3"
              showHeading={false}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
