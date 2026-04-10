"use client";

import { useMemo, useState } from "react";
import {
  portfolioSkillTabLabels,
  portfolioSkills,
  type PortfolioSkillCategory,
} from "@/app/site-content";

const TABS: { id: "all" | PortfolioSkillCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "languages", label: portfolioSkillTabLabels.languages },
  { id: "web", label: portfolioSkillTabLabels.web },
  { id: "embedded", label: portfolioSkillTabLabels.embedded },
  { id: "tools", label: portfolioSkillTabLabels.tools },
  { id: "research", label: portfolioSkillTabLabels.research },
];

export function PortfolioSkillsSection() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("all");

  const visible = useMemo(() => {
    if (active === "all") return portfolioSkills;
    return portfolioSkills.filter((s) => s.category === active);
  }, [active]);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mt-16 scroll-mt-20 sm:mt-20 md:mt-24 md:scroll-mt-24"
    >
      <h2
        id="skills-heading"
        className="text-[clamp(1.5rem,5vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.02em] text-black"
      >
        Skills &amp; frameworks
      </h2>

      <div
        className="-mx-1 mt-6 flex snap-x snap-mandatory gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mt-8 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Filter skills by category"
      >
        {TABS.map((tab) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab.id)}
              className={`min-h-11 shrink-0 snap-start rounded-full px-4 py-2.5 text-sm transition-colors sm:min-h-10 sm:py-2 ${
                selected
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <ul
        className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-2.5"
        aria-live="polite"
      >
        {visible.map((skill) => (
          <li
            key={`${skill.category}-${skill.name}`}
            className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm leading-none text-neutral-800 shadow-sm sm:py-1.5"
          >
            {skill.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
