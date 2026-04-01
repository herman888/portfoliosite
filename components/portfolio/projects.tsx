"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/app/projects/projects-data";
import { easeOut, springSnappy } from "./portfolio-motion";

function hrefFor(p: Project): string {
  return p.link || p.code || p.devpost || "#";
}

function awardFor(p: Project): string | undefined {
  if (p.tags.includes("Winner")) {
    if (p.tags.includes("Shopify")) return "Shopify Hackathon Winner";
    if (p.tags.includes("UofTHacks")) return "UofTHacks Winner";
    const named = p.tags.find((t) =>
      ["CTRLHACKDEL", "ConUHacks", "HackThe6ix", "EurekaHacks"].includes(t)
    );
    if (named) return `${named} Winner`;
    return "Winner";
  }
  return p.tags.find((t) =>
    ["CTRLHACKDEL", "HackThe6ix", "EurekaHacks", "ConUHacks"].includes(t)
  );
}

export function PortfolioProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="projects"
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
          Projects
        </motion.h2>

        <div className="flex flex-col gap-12">
          {projects.map((project, index) => {
            const href = hrefFor(project);
            const award = awardFor(project);
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...easeOut, delay: 0.04 + index * 0.04 }}
              >
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group block"
                >
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-medium text-foreground group-hover:underline group-hover:decoration-foreground/30 group-hover:underline-offset-4">
                      <span className="inline-flex items-center gap-1.5">
                        {project.title}
                        <ArrowUpRight className="h-4 w-4 shrink-0 opacity-40 transition-opacity group-hover:opacity-70" />
                      </span>
                    </h3>
                    {award ? (
                      <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground">
                        {award}
                      </span>
                    ) : null}
                  </div>
                  <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                    {project.caption || project.description}
                  </p>
                  <p className="text-xs text-muted-foreground/75">
                    {project.tags.join(" · ")}
                  </p>
                </a>
              </motion.article>
            );
          })}
        </div>

        <motion.p
          className="mt-14 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <motion.a
            href="/projects"
            className="font-medium text-foreground underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground/50"
            whileHover={{ x: 2 }}
            transition={springSnappy}
          >
            All projects & filters
          </motion.a>
        </motion.p>
      </div>
    </section>
  );
}
