"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  portfolioAbout,
  portfolioEducation,
  portfolioSkills,
  site,
} from "@/app/site-content";
import { easeOut, fadeUpSmall } from "./portfolio-motion";

const interests = site.person.interests.sports.map(
  (s) => s.charAt(0).toUpperCase() + s.slice(1)
);

const chipWrap: typeof fadeUpSmall = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

export function PortfolioAbout() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      className="border-t border-border/80 py-24 px-6 md:px-10 lg:px-24"
      ref={ref}
    >
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={easeOut}
          className="mb-10 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          About
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...easeOut, delay: 0.05 }}
          className="mb-12 max-w-xl text-lg leading-relaxed text-foreground md:text-xl"
        >
          {portfolioAbout}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...easeOut, delay: 0.08 }}
          className="mb-12"
        >
          <h3 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Education
          </h3>
          <ul className="divide-y divide-border border-t border-border">
            {portfolioEducation.map((item) => (
              <li key={item.company}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 py-6 transition-colors hover:text-foreground sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <span className="flex items-center gap-1.5 text-base font-medium text-foreground">
                      {item.company}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-60" />
                    </span>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.role}
                    </p>
                    {item.highlight ? (
                      <p className="mt-1 text-xs text-muted-foreground/80">
                        {item.highlight}
                      </p>
                    ) : null}
                  </div>
                  <span className="shrink-0 text-sm tabular-nums text-muted-foreground sm:pt-0.5">
                    {item.period}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Skills
          </p>
          <motion.div
            className="flex flex-wrap gap-2"
            variants={chipWrap}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {portfolioSkills.map((skill) => (
              <motion.span
                key={skill}
                variants={fadeUpSmall}
                className="rounded-full border border-border bg-muted/40 px-3 py-1 text-sm text-foreground"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Interests
          </p>
          <motion.div
            className="flex flex-wrap gap-2"
            variants={chipWrap}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {interests.map((interest) => (
              <motion.span
                key={interest}
                variants={fadeUpSmall}
                className="rounded-full border border-border bg-muted/40 px-3 py-1 text-sm text-foreground"
              >
                {interest}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
