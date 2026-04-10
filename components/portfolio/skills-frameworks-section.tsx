"use client";

import { useMemo, useState } from "react";
import {
  deviconIcon,
  PORTFOLIO_SKILLS,
  SKILL_FILTER_TABS,
  type SkillFilterId,
  type SkillItem,
} from "@/components/portfolio/skills-data";

function SkillTile({ skill }: { skill: SkillItem }) {
  const [iconFailed, setIconFailed] = useState(false);
  const hasIcon = Boolean(skill.icon) && !iconFailed;
  const src = skill.icon ? deviconIcon(skill.icon) : null;
  const fallback = skill.abbr ?? skill.label.slice(0, 2);

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white p-1.5 shadow-sm"
        aria-hidden
      >
        {hasIcon && src ? (
          // eslint-disable-next-line @next/next/no-img-element -- remote brand SVGs from Devicon CDN
          <img
            src={src}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            loading="lazy"
            decoding="async"
            onError={() => setIconFailed(true)}
          />
        ) : (
          <span className="select-none text-[0.7rem] font-semibold tabular-nums tracking-tight text-neutral-500">
            {fallback}
          </span>
        )}
      </div>
      <span className="max-w-[6rem] text-[0.6875rem] leading-snug text-neutral-600 sm:max-w-[6.5rem] sm:text-xs">
        {skill.label}
      </span>
    </div>
  );
}

export function SkillsFrameworksSection() {
  const [filter, setFilter] = useState<SkillFilterId>("all");

  const sorted = useMemo(
    () => [...PORTFOLIO_SKILLS].sort((a, b) => a.label.localeCompare(b.label)),
    []
  );

  const visible = useMemo(() => {
    if (filter === "all") return sorted;
    return sorted.filter((s) => s.categories.includes(filter));
  }, [filter, sorted]);

  return (
    <section
      id="skills"
      className="relative mt-16 scroll-mt-8 overflow-hidden rounded-2xl border border-neutral-100 bg-gradient-to-b from-neutral-50/80 via-white to-white px-5 py-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] sm:mt-20 sm:px-8 sm:py-12"
      aria-labelledby="skills-heading"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-amber-100/30 via-transparent to-sky-100/25 blur-3xl"
        aria-hidden
      />
      <div className="relative">
        <h2
          id="skills-heading"
          className="text-center text-xl font-semibold tracking-tight text-black sm:text-2xl"
        >
          Skills &amp; Frameworks
        </h2>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Filter skills by category"
        >
          {SKILL_FILTER_TABS.map((tab) => {
            const selected = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  selected
                    ? "bg-neutral-200/90 text-black"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
                }`}
                onClick={() => setFilter(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          className="mt-10 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6"
          role="list"
        >
          {visible.map((skill) => (
            <div key={skill.label} role="listitem">
              <SkillTile skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
