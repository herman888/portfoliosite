"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fullName, site } from "@/app/site-content";
import { fadeUp, springSnappy, staggerContainer } from "./portfolio-motion";

export function PortfolioHero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-16">
      <motion.div
        className="max-w-2xl"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="text-muted-foreground text-sm mb-5 tracking-wide"
        >
          Electrical Engineering @ York University
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight leading-[1.08] mb-8"
        >
          {fullName}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed mb-10"
        >
          Schulich Leader building software and hardware solutions. Previously at{" "}
          <a
            href={site.links.linkedIn}
            className="text-foreground underline underline-offset-[5px] decoration-foreground/25 hover:decoration-foreground/60 transition-colors"
          >
            SellStatic
          </a>{" "}
          and{" "}
          <a
            href="https://utias.utoronto.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-[5px] decoration-foreground/25 hover:decoration-foreground/60 transition-colors"
          >
            University of Toronto
          </a>
          .
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={springSnappy}
          >
            View projects
            <ArrowUpRight className="h-4 w-4 opacity-90" />
          </motion.a>
          <motion.a
            href="#contact"
            className="inline-flex items-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted/60 transition-colors"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={springSnappy}
          >
            Contact
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
