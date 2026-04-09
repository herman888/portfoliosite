"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/app/projects/projects-data";
import {
  humanComputerLabWorkPeriod,
  portfolioAbout,
  portfolioExperience,
  site,
} from "@/app/site-content";
import { PortfolioAbout } from "./about";
import { PortfolioContact } from "./contact";
import { PortfolioCurrentlyPanel } from "./currently-panel";
import { PortfolioFooter } from "./footer";
import { easeOut } from "./portfolio-motion";
import { GitHubIcon, LinkedInIcon } from "./social-icons";

function periodForPortfolioCompany(company: string): string {
  const row = portfolioExperience.find((e) => e.company === company);
  return row?.period ?? "—";
}

type LinkAffordance = {
  kind: "github" | "external" | "internal";
  href: string;
};

type EditorialItem = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  image?: string;
  href?: string;
  isNemo?: boolean;
  location?: string;
  /** Set for project cards — icon row below the main link. */
  linkAffordance?: LinkAffordance;
};

function hrefForProject(p: Project): string | undefined {
  return p.link ?? p.code ?? p.devpost;
}

function linkAffordanceForProject(p: Project): LinkAffordance | undefined {
  const primary = hrefForProject(p);
  if (!primary) return undefined;
  if (p.code?.includes("github.com")) {
    return { kind: "github", href: p.code };
  }
  if (primary.startsWith("http")) {
    return { kind: "external", href: primary };
  }
  return { kind: "internal", href: primary };
}

/** Top row — experience / roles (matches project card layout). */
const experienceStripItems: EditorialItem[] = [
  {
    id: "human-computer-lab",
    title: "HUMAN–COMPUTER LAB",
    subtitle: "Technical Intern",
    year: humanComputerLabWorkPeriod,
    location: "San Francisco, CA",
    image: "/humancomputerlab.jpeg",
    href: "https://www.humancomputerlab.com/",
  },
  {
    id: "sellstatic-strip",
    title: "SELLSTATIC",
    subtitle: "Software Engineering Intern",
    year: periodForPortfolioCompany("SellStatic"),
    location: "Toronto, ON",
    image: "/sellstatic.jpeg",
    href: site.links.sellstatic,
  },
  {
    id: "utias-strip",
    title: "UTIAS FLIGHT SYSTEMS AND CONTROL LABORATORY",
    subtitle: "Research Assistant",
    year: periodForPortfolioCompany("UTIAS Flight Systems and Control Laboratory"),
    location: "Toronto, ON",
    image: "/utias.jpeg",
    href: "https://utias.utoronto.ca",
  },
  {
    id: "sdcn-strip",
    title: "SPACECRAFT DYNAMICS, CONTROL AND NAVIGATION LAB",
    subtitle: "Undergraduate Researcher",
    year: periodForPortfolioCompany("Spacecraft Dynamics, Control and Navigation Lab"),
    location: "Toronto, ON",
    image: "/SDCNLAB.jpeg",
    href: "https://www.yorku.ca/jjshan/SDCNLab.html",
  },
];

/** Hero polaroids — only `background.JPG`, `background1.jpg`, `background2.jpg` (no separate “top” photo). */
const HERO_POLAROID_SRCS = ["/background.JPG", "/background2.jpg", "/background1.jpg"] as const;

const polaroidEase =
  "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0";

function PolaroidStack() {
  const frame =
    "overflow-hidden rounded-sm border border-neutral-200 bg-white p-1.5 transition-transform will-change-transform";

  return (
    <div
      className="group/polaroids relative mx-auto h-[248px] w-full max-w-[300px] cursor-default sm:h-[268px] sm:max-w-[320px]"
      role="group"
      aria-label="Campus and city photos"
    >
      {/* z1 — back (anchored to bottom so nothing floats to the top alone) */}
      <div
        className={`absolute bottom-2 left-[6%] z-[1] w-[56%] rotate-[-6deg] shadow-[0_10px_28px_rgba(0,0,0,0.12)] ${frame} ${polaroidEase} group-hover/polaroids:-translate-x-2 group-hover/polaroids:-translate-y-7 group-hover/polaroids:-rotate-[12deg] group-hover/polaroids:scale-[1.07] group-hover/polaroids:shadow-[0_22px_50px_rgba(0,0,0,0.18)] motion-reduce:group-hover/polaroids:translate-x-0 motion-reduce:group-hover/polaroids:translate-y-0 motion-reduce:group-hover/polaroids:rotate-[-6deg] motion-reduce:group-hover/polaroids:scale-100`}
        style={{ transitionDelay: "0ms" }}
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={HERO_POLAROID_SRCS[2]}
            alt=""
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>
      </div>
      {/* z2 — middle */}
      <div
        className={`absolute bottom-1 left-[20%] z-[2] w-[58%] rotate-[2deg] shadow-[0_12px_36px_rgba(0,0,0,0.14)] ${frame} ${polaroidEase} group-hover/polaroids:-translate-y-12 group-hover/polaroids:translate-x-2 group-hover/polaroids:rotate-0 group-hover/polaroids:scale-[1.08] group-hover/polaroids:shadow-[0_26px_56px_rgba(0,0,0,0.2)] motion-reduce:group-hover/polaroids:translate-x-0 motion-reduce:group-hover/polaroids:translate-y-0 motion-reduce:group-hover/polaroids:rotate-[2deg] motion-reduce:group-hover/polaroids:scale-100`}
        style={{ transitionDelay: "45ms" }}
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={HERO_POLAROID_SRCS[1]}
            alt=""
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>
      </div>
      {/* z3 — front (still bottom-anchored, not `top-*`) */}
      <div
        className={`absolute bottom-3 right-[2%] z-[3] w-[58%] rotate-[7deg] shadow-[0_14px_40px_rgba(0,0,0,0.15)] ${frame} ${polaroidEase} group-hover/polaroids:translate-x-3 group-hover/polaroids:-translate-y-9 group-hover/polaroids:rotate-[14deg] group-hover/polaroids:scale-[1.09] group-hover/polaroids:shadow-[0_28px_60px_rgba(0,0,0,0.22)] motion-reduce:group-hover/polaroids:translate-x-0 motion-reduce:group-hover/polaroids:translate-y-0 motion-reduce:group-hover/polaroids:rotate-[7deg] motion-reduce:group-hover/polaroids:scale-100`}
        style={{ transitionDelay: "90ms" }}
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={HERO_POLAROID_SRCS[0]}
            alt=""
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>
      </div>
    </div>
  );
}

const affordanceBtn =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-colors hover:border-neutral-300 hover:text-black";

function ProjectLinkAffordance({ item }: { item: EditorialItem }) {
  const a = item.linkAffordance;
  if (!a) return null;
  const label =
    a.kind === "github"
      ? "View repository on GitHub"
      : a.kind === "external"
        ? "Open external link"
        : "Open project page";

  if (a.kind === "internal") {
    return (
      <Link
        href={a.href}
        className={affordanceBtn}
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
      >
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </Link>
    );
  }

  return (
    <a
      href={a.href}
      target="_blank"
      rel="noopener noreferrer"
      className={affordanceBtn}
      aria-label={label}
      onClick={(e) => e.stopPropagation()}
    >
      {a.kind === "github" ? (
        <GitHubIcon className="h-4 w-4" />
      ) : (
        <ExternalLink className="h-4 w-4" strokeWidth={2} />
      )}
    </a>
  );
}

function EditorialCard({ item }: { item: EditorialItem }) {
  const imageSrc = item.image;
  const isNemo = item.isNemo;

  const media = (
    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-neutral-100">
      {isNemo ? (
        <iframe
          title="Finding N.E.M.O Demo"
          src="https://www.youtube.com/embed/PQBeq-7WKRE"
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-neutral-500">
          Preview
        </div>
      )}
    </div>
  );

  const text = (
    <div className="mt-4 flex flex-col gap-3">
      <header className="space-y-1">
        <h3 className="text-sm font-bold uppercase leading-snug tracking-[0.04em] text-black">
          {item.title}
        </h3>
        {item.year ? (
          <p className="text-xs font-medium tabular-nums leading-relaxed text-neutral-500">
            {item.year}
          </p>
        ) : null}
      </header>
      <p className="text-sm leading-[1.55] text-neutral-700">{item.subtitle}</p>
      {item.location ? (
        <p className="text-xs leading-normal text-neutral-500">{item.location}</p>
      ) : null}
    </div>
  );

  const inner = (
    <>
      {media}
      {text}
    </>
  );

  const isExternalHref = Boolean(item.href?.startsWith("http"));

  if (item.href && item.linkAffordance) {
    return (
      <article className="group">
        <a
          href={item.href}
          target={isExternalHref ? "_blank" : undefined}
          rel={isExternalHref ? "noopener noreferrer" : undefined}
          className="block outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          {inner}
        </a>
        <div className="mt-3">
          <ProjectLinkAffordance item={item} />
        </div>
      </article>
    );
  }

  if (item.href) {
    return (
      <article className="group">
        <a
          href={item.href}
          target={isExternalHref ? "_blank" : undefined}
          rel={isExternalHref ? "noopener noreferrer" : undefined}
          className="block outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          {inner}
        </a>
      </article>
    );
  }

  return <article>{inner}</article>;
}

export function PortfolioEditorialHome() {
  const projectItems: EditorialItem[] = useMemo(
    () =>
      projects.map((p) => ({
        id: p.title,
        title: p.title.toUpperCase(),
        subtitle: p.caption ?? p.description,
        year: p.year ?? "—",
        image: p.image ?? p.images?.[0],
        href: hrefForProject(p),
        isNemo: p.title === "Finding N.E.M.O (ConUHacks)",
        linkAffordance: linkAffordanceForProject(p),
      })),
    []
  );

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <div className="mx-auto w-full max-w-screen-2xl px-4 pb-20 pt-10 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16">
        <header className="mb-8 md:mb-10">
          <div className="mb-10 flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-neutral-600">
            <Link
              href="/#about"
              className="transition-colors hover:text-black"
              scroll
            >
              about
            </Link>
            <Link
              href="/#projects"
              className="transition-colors hover:text-black"
              scroll
            >
              all projects
            </Link>
            <Link href="/#contact" className="transition-colors hover:text-black">
              contact
            </Link>
            <a
              href="/resume.pdf"
              className="font-medium text-black transition-opacity hover:opacity-70"
            >
              resume
            </a>
          </div>

          <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-10 lg:gap-16">
            <div className="font-editorial">
              <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-black">
                {`${site.person.firstName} ${site.person.lastName}`.toLowerCase()}
              </h1>
              <p className="mt-6 max-w-md text-base font-normal leading-relaxed text-neutral-600 md:text-lg">
                {portfolioAbout}
              </p>
              <div className="mt-8 flex items-center gap-5 text-black">
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
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <PolaroidStack />
            </div>
          </div>
        </header>

        <section
          id="currently"
          aria-labelledby="currently-heading"
          className="scroll-mt-24 mb-14 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={easeOut}
          >
            <PortfolioCurrentlyPanel />
          </motion.div>
        </section>

        <section
          id="work"
          aria-labelledby="work-heading"
          className="scroll-mt-24 rounded-2xl border border-neutral-200/90 bg-neutral-50/70 px-4 py-10 sm:px-6 sm:py-12"
        >
          <h2
            id="work-heading"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800"
          >
            Work
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
            Internships and research placements — where I was on a team or in a lab.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
            {experienceStripItems.map((item) => (
              <EditorialCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="scroll-mt-24 mt-12 rounded-2xl border border-neutral-900/10 bg-white px-4 py-10 shadow-sm sm:px-6 sm:py-12"
        >
          <h2
            id="projects-heading"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-black"
          >
            Projects
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
            Things I&apos;ve shipped or demoed — hackathons, repos, and write-ups.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
            {projectItems.map((item) => (
              <EditorialCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <p className="mt-12 text-sm text-neutral-600">
          <Link
            href="/projects"
            className="underline decoration-neutral-300 underline-offset-4 hover:text-black"
          >
            Filter by tag on the full projects page →
          </Link>
        </p>
      </div>

      <PortfolioAbout omitHeaderContent />
      <PortfolioContact />
      <PortfolioFooter />
    </div>
  );
}
