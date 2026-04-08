"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { projects } from "@/app/projects/projects-data";
import { portfolioAbout, site } from "@/app/site-content";
import { PortfolioAbout } from "./about";
import { PortfolioContact } from "./contact";
import { PortfolioFooter } from "./footer";

type EditorialItem = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  image?: string;
  href?: string;
  isNemo?: boolean;
};

function hrefForProject(p: (typeof projects)[number]): string | undefined {
  return p.link ?? p.code ?? p.devpost;
}

/** Top row — experience / roles (matches project card layout). */
const experienceStripItems: EditorialItem[] = [
  {
    id: "human-computer-lab",
    title: "HUMAN–COMPUTER LAB",
    subtitle: "Technical Intern",
    year: "2025",
    image: "/humancomputerlab.jpeg",
    href: "https://www.yorku.ca/lassonde/",
  },
  {
    id: "sellstatic-strip",
    title: "SELLSTATIC",
    subtitle: "Software Engineering Intern",
    year: "2025–26",
    image: "/sellstatic.jpeg",
    href: site.links.sellstatic,
  },
  {
    id: "utias-strip",
    title: "UTIAS",
    subtitle: "Research Assistant",
    year: "2023–25",
    image: "/utias.jpeg",
    href: "https://utias.utoronto.ca",
  },
  {
    id: "sdcn-strip",
    title: "SDCNLAB",
    subtitle: "Undergraduate Researcher",
    year: "2025",
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

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
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
    <div className="mt-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[0.8125rem] font-bold uppercase leading-snug tracking-wide text-black">
          {item.title}
        </h3>
        {item.year ? (
          <span className="shrink-0 tabular-nums text-sm text-neutral-600">{item.year}</span>
        ) : null}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{item.subtitle}</p>
    </div>
  );

  const inner = (
    <>
      {media}
      {text}
    </>
  );

  if (item.href) {
    return (
      <article className="group">
        <a
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
      })),
    []
  );

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <div className="mx-auto w-full max-w-screen-2xl px-4 pb-20 pt-10 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16">
        <header className="mb-14 md:mb-20">
          <div className="mb-10 flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-neutral-600">
            <Link href="/projects" className="transition-colors hover:text-black">
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
              <Link
                href="/#about"
                className="mt-6 text-sm text-neutral-600 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-black hover:decoration-black"
              >
                who am i?
              </Link>
            </div>
          </div>
        </header>

        <section
          id="work"
          aria-labelledby="work-heading"
          className="mt-10 border-b border-neutral-200 pb-12"
        >
          <h2
            id="work-heading"
            className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-neutral-600"
          >
            Work
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
            {experienceStripItems.map((item) => (
              <EditorialCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="mt-12"
        >
          <h2
            id="projects-heading"
            className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-neutral-600"
          >
            Projects
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
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
