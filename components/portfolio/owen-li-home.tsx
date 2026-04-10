"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Activity, Cpu, FileText, Mail } from "lucide-react";
import { fullName, owenWorkEntries, site } from "@/app/site-content";
import { GitHubIcon, LinkedInIcon } from "@/components/portfolio/social-icons";
import { SkillsFrameworksSection } from "@/components/portfolio/skills-frameworks-section";
import { allPortfolioProjects, type Project } from "@/app/projects/projects-data";

const linkClass =
  "underline decoration-neutral-400 underline-offset-[5px] transition-colors hover:decoration-black";

const navClass =
  "text-neutral-700 transition-colors hover:text-black";

const socialIconLink =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-colors hover:border-neutral-300 hover:text-black sm:h-10 sm:w-10";

/** Prefer internal page, then Devpost, then repo — keeps GitHub icon as extra when `code` is GitHub. */
function projectPrimaryHref(p: Project): string | undefined {
  return p.link ?? p.devpost ?? p.code;
}

function projectThumbSrc(p: Project): string | undefined {
  return p.image ?? p.videoPoster ?? p.images?.[0];
}

/** Splits `Title (Hackathon)` into name + side label without brackets. */
function splitProjectTitle(title: string): { name: string; context?: string } {
  const m = title.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (m) {
    const name = m[1].trim();
    const context = m[2].trim();
    return name && context ? { name, context } : { name: title.trim() };
  }
  return { name: title.trim() };
}

function githubRepoUrl(p: Project): string | undefined {
  if (p.code?.includes("github.com")) return p.code;
  return undefined;
}

const projectTitleLinkClass =
  "font-medium text-black underline decoration-neutral-400 underline-offset-[5px] transition-colors hover:decoration-black";

function isExternalHref(href: string) {
  return href.startsWith("http");
}

const githubIconBtn =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-colors hover:border-neutral-300 hover:text-black";

function InlineThumb({
  src,
  alt,
  size = "md",
}: {
  src: string;
  alt: string;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  return (
    <div
      className={`relative ${dim} shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-neutral-50`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={size === "sm" ? "36px" : "44px"}
      />
    </div>
  );
}

const nameLower = `${site.person.firstName} ${site.person.lastName}`.toLowerCase();

function JotIcon({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div
      className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-600 shadow-sm sm:h-10 sm:w-10"
      aria-hidden
      title={label}
    >
      {children}
    </div>
  );
}

function JotRow({
  icon,
  iconLabel,
  children,
}: {
  icon: ReactNode;
  iconLabel: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3 sm:gap-3.5">
      <JotIcon label={iconLabel}>{icon}</JotIcon>
      <div className="min-w-0 flex-1 pt-0.5 text-[1.05rem] leading-relaxed text-neutral-900 sm:text-[1.0625rem]">
        {children}
      </div>
    </li>
  );
}

export function OwenLiStyleHome() {
  const [typedName, setTypedName] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [showOtherProjects, setShowOtherProjects] = useState(false);
  const [activeProjectTitle, setActiveProjectTitle] = useState<string | null>(null);

  const featuredProjectTitles = [
    "Drone Racing",
    "RedLamp (UofTHacks)",
    "CityPath AI (Shopify Hackathon)",
    "GrowthSync (CTRLHACKDEL)",
  ];
  const featuredProjects = featuredProjectTitles
    .map((title) => allPortfolioProjects.find((p) => p.title === title))
    .filter((p): p is Project => Boolean(p));
  const otherProjects = allPortfolioProjects.filter(
    (p) => !featuredProjectTitles.includes(p.title)
  );
  const activeProject =
    featuredProjects.find((p) => p.title === activeProjectTitle) ?? null;

  useEffect(() => {
    const full = nameLower;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setTypedName(full);
      setTypingDone(true);
      return;
    }

    let i = 0;
    const stepMs = 52;
    const id = window.setInterval(() => {
      i += 1;
      setTypedName(full.slice(0, i));
      if (i >= full.length) {
        window.clearInterval(id);
        setTypingDone(true);
      }
    }, stepMs);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProjectTitle(null);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <div className="mx-auto max-w-2xl px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <header className="mb-10">
          <h1
            className="text-2xl font-semibold tracking-tight text-black sm:text-[1.65rem]"
            aria-label={nameLower}
          >
            <span aria-hidden="true">{typedName}</span>
            {!typingDone ? (
              <span
                aria-hidden
                className="ml-0.5 inline-block min-w-[0.35em] animate-pulse font-light text-neutral-400"
              >
                |
              </span>
            ) : null}
          </h1>
        </header>

        <ul
          className="m-0 list-none space-y-4 p-0 sm:space-y-[1.125rem]"
          role="list"
        >
          <JotRow
            iconLabel="York University"
            icon={
              <Image
                src="/york.png"
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-contain p-0.5"
              />
            }
          >
            Electrical engineering student at{" "}
            <a
              href="https://yorku.ca"
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              York University
            </a>
            .
          </JotRow>
          <JotRow
            iconLabel="Schulich Leader"
            icon={
              <Image
                src="/schulich.jpeg"
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-contain p-0.5"
              />
            }
          >
            <a
              href={site.links.schulichLeaders}
              className="font-medium text-black no-underline transition-opacity hover:opacity-70"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schulich Leader
            </a>
            <span className="text-neutral-600"> — $120,000 Stem Award</span>
            .
          </JotRow>
          <JotRow
            iconLabel="Focus"
            icon={<Cpu className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5" strokeWidth={1.75} />}
          >
            Interested in software, hardware, and robotics.
          </JotRow>
          <JotRow
            iconLabel="Rock climbing, hockey, tennis"
            icon={<Activity className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5" strokeWidth={1.75} />}
          >
            i enjoy rock climbing, hockey, and tennis.
          </JotRow>
        </ul>

        <div className="mt-8">
          <p className="m-0 flex flex-wrap items-center gap-3 pt-1 sm:gap-4">
            <a
              href={`mailto:${site.links.email}`}
              className={socialIconLink}
              aria-label={`Email ${site.links.email}`}
            >
              <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </a>
            <a
              href={site.links.linkedIn}
              className={socialIconLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href={site.links.github}
              className={socialIconLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href="/resume.pdf"
              className={socialIconLink}
              aria-label="Download resume PDF"
            >
              <FileText className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </a>
          </p>
        </div>

        <nav
          className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium sm:gap-x-6"
          aria-label="On this page"
        >
          <a href="#work" className={navClass}>
            Work
          </a>
          <a href="#projects" className={navClass}>
            Projects
          </a>
          <a href="#skills" className={navClass}>
            Skills
          </a>
        </nav>

        <hr className="my-12 border-neutral-200" />

        <section id="work" className="scroll-mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">
            Work
          </h2>
          <div className="mt-8 space-y-10">
            {owenWorkEntries.map((job) => (
              <article
                key={`${job.role}-${job.company}`}
                className="flex gap-3 sm:gap-4"
              >
                {job.thumb ? (
                  <InlineThumb src={job.thumb.src} alt={job.thumb.alt} />
                ) : (
                  <div
                    className="h-11 w-11 shrink-0 rounded-md border border-dashed border-neutral-200 bg-neutral-50"
                    aria-hidden
                  />
                )}
                <div className="min-w-0 flex-1">
                <p className="text-[1.05rem] leading-relaxed sm:text-[1.0625rem]">
                  <span className="font-medium text-black">{job.role}</span>
                  <span className="text-neutral-500"> | </span>
                  {job.companyUrl ? (
                    <a
                      href={job.companyUrl}
                      className={linkClass}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {job.company}
                    </a>
                  ) : (
                    <span>{job.company}</span>
                  )}
                  <span className="text-neutral-500"> | </span>
                  <span className="text-neutral-700">{job.period}</span>
                </p>
                {job.note ? (
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-neutral-600">
                    {job.note}
                  </p>
                ) : null}
                {job.description ? (
                  <p className="mt-3 text-[1.05rem] leading-relaxed text-neutral-800 sm:text-[1.0625rem]">
                    {job.description}
                  </p>
                ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="mt-16 scroll-mt-8 sm:mt-20">
          <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">
            Projects
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featuredProjects.map((p) => {
              const href = projectPrimaryHref(p);
              const thumb = projectThumbSrc(p);
              const { name, context } = splitProjectTitle(p.title);
              return (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setActiveProjectTitle(p.title)}
                  className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] w-full bg-neutral-100">
                    {thumb ? (
                      <Image
                        src={thumb}
                        alt={`${name} preview`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                        No preview
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 px-4 py-3">
                    <p className="text-base font-semibold tracking-tight text-black sm:text-[1.06rem]">
                      {name}
                    </p>
                    <p className="text-sm leading-relaxed text-neutral-600 line-clamp-3">
                      {p.description}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {[context, p.year].filter(Boolean).join(" · ") || "Project"}
                    </p>
                    {href ? (
                      <p className="text-xs text-neutral-500">Click card for details</p>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowOtherProjects((v) => !v)}
              className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:text-black"
            >
              {showOtherProjects ? "Hide other projects" : "View other projects"}
            </button>
          </div>

          {showOtherProjects ? (
            <div className="mt-7 space-y-10">
              {otherProjects.map((p) => {
                const href = projectPrimaryHref(p);
                const body = p.description;
                const thumb = projectThumbSrc(p);
                const { name, context } = splitProjectTitle(p.title);
                const ghUrl = githubRepoUrl(p);
                const rightMeta = [context, p.year].filter(Boolean).join(" · ");
                return (
                  <article key={p.title} className="flex gap-3 sm:gap-4">
                    {thumb ? (
                      href ? (
                        isExternalHref(href) ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0"
                          >
                            <InlineThumb
                              src={thumb}
                              alt={`${name} — open project`}
                            />
                          </a>
                        ) : (
                          <Link href={href} className="shrink-0">
                            <InlineThumb
                              src={thumb}
                              alt={`${name} — open project`}
                            />
                          </Link>
                        )
                      ) : (
                        <InlineThumb src={thumb} alt="" />
                      )
                    ) : (
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-100 text-[0.65rem] font-medium text-neutral-400"
                        aria-hidden
                      >
                        —
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-4">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          {href ? (
                            isExternalHref(href) ? (
                              <a
                                href={href}
                                className={`text-[1.05rem] leading-snug sm:text-[1.0625rem] ${projectTitleLinkClass}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {name}
                              </a>
                            ) : (
                              <Link
                                href={href}
                                className={`text-[1.05rem] leading-snug sm:text-[1.0625rem] ${projectTitleLinkClass}`}
                              >
                                {name}
                              </Link>
                            )
                          ) : (
                            <span className="text-[1.05rem] font-medium leading-snug text-black sm:text-[1.0625rem]">
                              {name}
                            </span>
                          )}
                          {ghUrl ? (
                            <a
                              href={ghUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={githubIconBtn}
                              aria-label={`${name} on GitHub`}
                            >
                              <GitHubIcon className="h-4 w-4" />
                            </a>
                          ) : null}
                        </div>
                        {rightMeta ? (
                          <p className="m-0 shrink-0 text-[0.9375rem] leading-snug text-neutral-500 sm:max-w-[min(100%,20rem)] sm:text-right sm:text-[0.95rem]">
                            {rightMeta}
                          </p>
                        ) : null}
                      </div>
                      <p className="mt-2 text-[1.05rem] leading-relaxed text-neutral-800 sm:text-[1.0625rem]">
                        {body}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : null}
        </section>

        {activeProject ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
            onClick={() => setActiveProjectTitle(null)}
            role="presentation"
          >
            <div
              className="w-full max-w-5xl overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${splitProjectTitle(activeProject.title).name} details`}
            >
              <div className="grid grid-cols-1 md:grid-cols-[1.45fr_1fr]">
                <div className="relative min-h-[260px] bg-[#b7d4af] md:min-h-[440px]">
                  {projectThumbSrc(activeProject) ? (
                    <Image
                      src={projectThumbSrc(activeProject) as string}
                      alt={`${splitProjectTitle(activeProject.title).name} visual`}
                      fill
                      className="object-cover p-6 md:p-8"
                      sizes="(max-width: 768px) 100vw, 65vw"
                    />
                  ) : null}
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-4xl font-bold leading-none text-black">03</p>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-black">
                    {splitProjectTitle(activeProject.title).name}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500">
                    {[splitProjectTitle(activeProject.title).context, activeProject.year]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <p className="mt-6 text-[1.06rem] leading-relaxed text-neutral-800">
                    {activeProject.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {projectPrimaryHref(activeProject) ? (
                      isExternalHref(projectPrimaryHref(activeProject) as string) ? (
                        <a
                          href={projectPrimaryHref(activeProject)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85"
                        >
                          Open project
                        </a>
                      ) : (
                        <Link
                          href={projectPrimaryHref(activeProject) as string}
                          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85"
                        >
                          Open project
                        </Link>
                      )
                    ) : null}
                    {githubRepoUrl(activeProject) ? (
                      <a
                        href={githubRepoUrl(activeProject)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
                      >
                        View code
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setActiveProjectTitle(null)}
                      className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <SkillsFrameworksSection />

        <footer className="mt-20 border-t border-neutral-200 pt-10 text-sm text-neutral-500">
          <p>{fullName}</p>
        </footer>
      </div>
    </div>
  );
}
