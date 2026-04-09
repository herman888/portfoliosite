"use client";

import { motion } from "framer-motion";
import { portfolioAbout, site } from "@/app/site-content";
import { easeOut } from "./portfolio-motion";
import { GitHubIcon, LinkedInIcon } from "./social-icons";

const inView = { once: true as const, margin: "-60px" as const };

type AboutProps = {
  /** When true, skip name/bio/socials (shown in editorial hero). */
  omitHeaderContent?: boolean;
};

export function PortfolioAbout({ omitHeaderContent }: AboutProps = {}) {
  const displayName = `${site.person.firstName} ${site.person.lastName}`.toLowerCase();

  if (omitHeaderContent) {
    return (
      <section
        id="about"
        aria-labelledby="about-heading"
        className="scroll-mt-24"
      >
        <h2 id="about-heading" className="sr-only">
          About — {displayName}
        </h2>
      </section>
    );
  }

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-t border-border/80 py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="font-editorial">
          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={easeOut}
            className="text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-foreground"
          >
            {displayName}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ ...easeOut, delay: 0.05 }}
            className="mt-6 max-w-md text-base font-normal leading-relaxed text-muted-foreground md:text-lg"
          >
            {portfolioAbout}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ ...easeOut, delay: 0.08 }}
            className="mt-8 flex items-center gap-5 text-foreground"
          >
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-60"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href={site.links.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-60"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
