"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

const inView = { once: true as const, margin: "-60px" as const };

type AboutProps = {
  /** Hide intro paragraph when the hero already shows it. */
  omitHeaderContent?: boolean;
};

export function PortfolioAbout({ omitHeaderContent }: AboutProps = {}) {
  return (
    <section
      id="about"
      className="border-t border-border/80 py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16"
    >
      <div className="mx-auto max-w-screen-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={easeOut}
          className="mb-10 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          About
        </motion.h2>

        {omitHeaderContent ? null : (
          <>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ ...easeOut, delay: 0.05 }}
              className="mb-12 max-w-xl text-lg leading-relaxed text-foreground md:text-xl"
            >
              {portfolioAbout}
            </motion.p>

          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ ...easeOut, delay: 0.08 }}
          className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start"
        >
          <div>
            <h3 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Education
            </h3>
            <div className="divide-y divide-border border-t border-border">
              {portfolioEducation.map((item) => (
                <a
                  key={item.company}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 py-6 transition-colors hover:text-foreground"
                >
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md border border-border/60 bg-muted/20">
                    <Image
                      src="/york.png"
                      alt="York University"
                      width={44}
                      height={44}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <span className="flex items-center gap-1.5 text-base font-medium text-foreground">
                        {item.company}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-60" />
                      </span>
                      <span className="shrink-0 text-sm tabular-nums text-muted-foreground sm:pt-0.5">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.role} at {item.company}.
                    </p>
                  </div>
                </a>
              ))}
              <a
                href={site.links.schulichLeaders}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 py-6 transition-colors hover:text-foreground"
              >
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md border border-border/60 bg-muted/20">
                  <Image
                    src="/schulich.jpeg"
                    alt="Schulich Leader Scholarship"
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-base font-medium text-foreground">
                    Schulich Leader Scholarship
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-60" />
                  </span>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {site.person.scholarshipAmount} — national STEM scholarship in
                    Canada.
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Skills
              </p>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={chipWrap}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
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
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Interests
              </p>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={chipWrap}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
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
        </motion.div>
      </div>
    </section>
  );
}
