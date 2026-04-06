"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/app/site-content";
import { easeOut, springSnappy } from "./portfolio-motion";

const inView = { once: true as const, margin: "-60px" as const };

export function PortfolioContact() {
  return (
    <section
      id="contact"
      className="border-t border-border/80 py-24 px-6 md:px-10 lg:px-24"
    >
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={easeOut}
          className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          Contact
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ ...easeOut, delay: 0.05 }}
          className="mb-8 text-xl font-medium leading-snug text-foreground md:text-2xl"
        >
          Open to internships and collaborations. If something here resonates,
          say hello.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ ...easeOut, delay: 0.1 }}
        >
          <motion.a
            href={`mailto:${site.links.email}`}
            className="inline-flex items-center gap-2 text-base font-medium text-foreground underline underline-offset-[6px] decoration-foreground/25 hover:decoration-foreground/55"
            whileHover={{ x: 2 }}
            transition={springSnappy}
          >
            {site.links.email}
            <ArrowUpRight className="h-4 w-4 opacity-70" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
