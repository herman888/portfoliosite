"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolioExperience } from "@/app/site-content";
import { easeOut } from "./portfolio-motion";

export function PortfolioExperience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="experience"
      className="border-t border-border/80 py-24 px-6 md:px-10 lg:px-24"
      ref={ref}
    >
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={easeOut}
          className="mb-12 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          Experience
        </motion.h2>

        <ul className="divide-y divide-border">
          {portfolioExperience.map((exp, index) => (
            <motion.li
              key={exp.company}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...easeOut, delay: 0.06 + index * 0.06 }}
            >
              <a
                href={exp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 py-6 transition-colors hover:text-foreground sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <span className="flex items-center gap-1.5 text-base font-medium text-foreground">
                    {exp.company}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-60" />
                  </span>
                  <p className="mt-0.5 text-sm text-muted-foreground">{exp.role}</p>
                  {exp.highlight ? (
                    <p className="mt-1 text-xs text-muted-foreground/80">
                      {exp.highlight}
                    </p>
                  ) : null}
                </div>
                <span className="shrink-0 text-sm tabular-nums text-muted-foreground sm:pt-0.5">
                  {exp.period}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
