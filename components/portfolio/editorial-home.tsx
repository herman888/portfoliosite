"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { projects } from "@/app/projects/projects-data";
import { fullName, portfolioAbout, portfolioTangent, site } from "@/app/site-content";
import { PortfolioAbout } from "./about";
import { PortfolioContact } from "./contact";
import { PortfolioFooter } from "./footer";

type FilterKey = "projects" | "random";

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

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "projects", label: "projects" },
  { key: "random", label: "random" },
];

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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
  const [filter, setFilter] = useState<FilterKey>("projects");

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

  const randomItems: EditorialItem[] = useMemo(
    () => [
      {
        id: "random-page",
        title: portfolioTangent.title.toUpperCase(),
        subtitle: portfolioTangent.body,
        year: "",
        image: "/shopify.png",
        href: "/random",
      },
    ],
    []
  );

  const visibleItems = filter === "random" ? randomItems : projectItems;

  const xUrl = `https://twitter.com/${site.links.twitterCreator.replace(/^@/, "")}`;

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 md:px-10 lg:px-12">
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
            <div>
              <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-black">
                {fullName}
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-600 md:text-lg">
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
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium uppercase tracking-wider transition-opacity hover:opacity-60"
                  aria-label="X"
                >
                  X
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <div className="relative h-[200px] w-full max-w-[280px] sm:h-[220px] sm:max-w-[300px]">
                <div
                  className="absolute right-4 top-2 w-[58%] rotate-[6deg] overflow-hidden rounded-sm border border-neutral-200 bg-white p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                  style={{ zIndex: 2 }}
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/shopify.png"
                      alt=""
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                </div>
                <div
                  className="absolute left-4 top-8 w-[58%] rotate-[-7deg] overflow-hidden rounded-sm border border-neutral-200 bg-white p-1.5 shadow-[0_10px_32px_rgba(0,0,0,0.1)]"
                  style={{ zIndex: 1 }}
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/droneracing.jpg"
                      alt=""
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                </div>
              </div>
              <Link
                href="/#about"
                className="mt-6 text-sm text-neutral-600 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-black hover:decoration-black"
              >
                who am i?
              </Link>
            </div>
          </div>
        </header>

        <nav className="flex flex-wrap gap-2" aria-label="Projects and random">
          {FILTERS.map(({ key, label }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                  active
                    ? "bg-black text-white"
                    : "border border-neutral-300 bg-white text-black hover:border-neutral-500"
                }`}
              >
                {label}
              </button>
            );
          })}
        </nav>

        <div
          id="projects"
          className={`mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ${
            filter === "random" ? "sm:grid-cols-1 lg:grid-cols-1 lg:max-w-md" : ""
          }`}
        >
          {visibleItems.map((item) => (
            <EditorialCard key={item.id} item={item} />
          ))}
        </div>

        {filter === "projects" ? (
          <p className="mt-12 text-sm text-neutral-600">
            <Link
              href="/projects"
              className="underline decoration-neutral-300 underline-offset-4 hover:text-black"
            >
              Filter by tag on the full projects page →
            </Link>
          </p>
        ) : null}
      </div>

      <PortfolioAbout omitHeaderContent />
      <PortfolioContact />
      <PortfolioFooter />
    </div>
  );
}
