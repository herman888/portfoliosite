"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/app/projects/projects-data";
import { ProjectGridCard } from "@/app/components/ProjectGridCard";
import { easeOut, springSnappy } from "./portfolio-motion";

export function PortfolioProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="projects"
      className="border-t border-border/80 py-24 px-6 md:px-10 lg:px-24"
      ref={ref}
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={easeOut}
          className="mb-12 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          {"Things I've done"}
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                ...easeOut,
                delay: 0.03 + index * 0.05,
              }}
            >
              <ProjectGridCard project={project} />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-14 text-center text-sm text-muted-foreground sm:text-left"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <motion.a
            href="/projects"
            className="font-medium text-foreground underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground/50"
            whileHover={{ x: 2 }}
            transition={springSnappy}
          >
            Filter by tag on the full projects page
          </motion.a>
        </motion.p>
      </div>
    </section>
  );
}
