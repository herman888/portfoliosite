"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { Activity, Cpu, Mail } from "lucide-react";
import { fullName, owenWorkEntries, site } from "@/app/site-content";
import { GitHubIcon, LinkedInIcon } from "@/components/portfolio/social-icons";
import { allPortfolioProjects, type Project } from "@/app/projects/projects-data";
import { easeOut } from "@/components/portfolio/portfolio-motion";

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

function shouldUseProjectVideo(p: Project): boolean {
  return p.title === "Car with obstacle detection" && Boolean(p.video);
}

const projectTitleLinkClass =
  "font-medium text-black underline decoration-neutral-400 underline-offset-[5px] transition-colors hover:decoration-black";

function isExternalHref(href: string) {
  return href.startsWith("http");
}

const githubIconBtn =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-colors hover:border-neutral-300 hover:text-black";
const revealViewport = { once: false, margin: "-40px" };
const socialDropTransition = {
  duration: 0.62,
  ease: [0.18, 0.9, 0.24, 1],
};

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

const typedDisplayName = `${site.person.firstName} ${site.person.lastName}`;
type TypedPart =
  | { kind: "text"; value: string }
  | { kind: "link"; value: string; href: string; className?: string };

const introTypedRows: TypedPart[][] = [
  [
    { kind: "text", value: "Electrical engineering student at " },
    {
      kind: "link",
      value: "York University",
      href: "https://yorku.ca",
      className: linkClass,
    },
    { kind: "text", value: "." },
  ],
  [
    {
      kind: "link",
      value: "Schulich Leader",
      href: site.links.schulichLeaders,
      className:
        "font-medium text-black no-underline transition-opacity hover:opacity-70",
    },
    { kind: "text", value: " — $120,000 STEM award." },
  ],
  [{ kind: "text", value: "Interested in software, hardware, and robotics." }],
  [{ kind: "text", value: "i enjoy rock climbing, hockey, and tennis." }],
];
const introTypedTotals = introTypedRows.map((row) =>
  row.reduce((sum, p) => sum + p.value.length, 0)
);

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
  const [typedIntroLengths, setTypedIntroLengths] = useState([0, 0, 0, 0]);
  const [socialVisible, setSocialVisible] = useState(false);
  const [showOtherProjects, setShowOtherProjects] = useState(false);
  const [activeProjectTitle, setActiveProjectTitle] = useState<string | null>(null);

  const featuredProjectTitles = [
    "Drone Racing",
    "RedLamp (UofTHacks)",
    "CityPath AI (Shopify Hackathon)",
    "GrowthSync (CTRLHACKDEL)",
    "Car line follower",
    "Car with obstacle detection",
    "Finding N.E.M.O (ConUHacks)",
    "Giveway (HackThe6ix)",
    "Meal2Go (EurekaHacks)",
    "KinKitchen (HackCanada 2026)",
  ];
  const featuredProjects = featuredProjectTitles
    .map((title) => allPortfolioProjects.find((p) => p.title === title))
    .filter((p): p is Project => Boolean(p));
  const otherProjects = allPortfolioProjects.filter(
    (p) => !featuredProjectTitles.includes(p.title)
  );
  const activeProject =
    [...featuredProjects, ...otherProjects].find((p) => p.title === activeProjectTitle) ?? null;
  const socialReady = typedIntroLengths.every(
    (count, i) => count >= (introTypedTotals[i] ?? 0)
  );
  const sectionsReady = socialVisible;

  useEffect(() => {
    const full = typedDisplayName;
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
    if (!typingDone) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTypedIntroLengths(introTypedTotals);
      return;
    }

    const totals = introTypedTotals;
    let rowIdx = 0;
    let charIdx = 0;
    const id = window.setInterval(() => {
      setTypedIntroLengths((prev) => {
        const next = [...prev];
        if (rowIdx >= totals.length) return next;
        charIdx += 1;
        next[rowIdx] = Math.min(charIdx, totals[rowIdx]);
        if (charIdx >= totals[rowIdx]) {
          rowIdx += 1;
          charIdx = 0;
        }
        return next;
      });
      if (rowIdx >= totals.length) window.clearInterval(id);
    }, 18);

    return () => window.clearInterval(id);
  }, [typingDone]);

  useEffect(() => {
    if (socialReady) {
      setSocialVisible(true);
    }
  }, [socialReady]);

  useEffect(() => {
    if (!typingDone) {
      setSocialVisible(false);
      return;
    }
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setSocialVisible(true);
      return;
    }
    const totalChars = introTypedTotals.reduce((sum, n) => sum + n, 0);
    const estimatedTypingMs = totalChars * 16;
    const id = window.setTimeout(() => setSocialVisible(true), estimatedTypingMs);
    return () => window.clearTimeout(id);
  }, [typingDone]);

  const renderTypedParts = (parts: TypedPart[], shownChars: number) => {
    let left = shownChars;
    return parts.map((part, idx) => {
      const take = Math.max(0, Math.min(left, part.value.length));
      const visible = part.value.slice(0, take);
      left -= take;
      if (!visible) return null;
      if (part.kind === "link") {
        return (
          <a
            key={`${part.href}-${idx}`}
            href={part.href}
            className={part.className ?? linkClass}
            target="_blank"
            rel="noopener noreferrer"
          >
            {visible}
          </a>
        );
      }
      return <span key={`${part.value}-${idx}`}>{visible}</span>;
    });
  };

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
            aria-label={typedDisplayName}
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
            {renderTypedParts(introTypedRows[0], typedIntroLengths[0])}
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
            {renderTypedParts(introTypedRows[1], typedIntroLengths[1])}
          </JotRow>
          <JotRow
            iconLabel="Focus"
            icon={<Cpu className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5" strokeWidth={1.75} />}
          >
            {renderTypedParts(introTypedRows[2], typedIntroLengths[2])}
          </JotRow>
          <JotRow
            iconLabel="Rock climbing, hockey, tennis"
            icon={<Activity className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5" strokeWidth={1.75} />}
          >
            {renderTypedParts(introTypedRows[3], typedIntroLengths[3])}
          </JotRow>
        </ul>

        <div className="mt-8">
          <p className="m-0 flex flex-wrap items-center gap-3 pt-1 sm:gap-4">
            <motion.a
              href={`mailto:${site.links.email}`}
              className={socialIconLink}
              aria-label={`Email ${site.links.email}`}
              initial={{ opacity: 0, x: -220, y: -24, rotate: -26, scale: 0.76 }}
              animate={
                socialVisible
                  ? {
                      opacity: 1,
                      x: [0, 20, -12, 6, 0],
                      y: [0, 9, -4, 2, 0],
                      rotate: [0, 16, -8, 4, 0],
                      scale: [1, 1.16, 0.94, 1.03, 1],
                    }
                  : { opacity: 0, x: -220, y: -24, rotate: -26, scale: 0.76 }
              }
              transition={{ ...socialDropTransition, delay: 0 }}
            >
              <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </motion.a>
            <motion.a
              href={site.links.linkedIn}
              className={socialIconLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              initial={{ opacity: 0, x: 250, y: -20, rotate: 28, scale: 0.74 }}
              animate={
                socialVisible
                  ? {
                      opacity: 1,
                      x: [0, -22, 11, -6, 0],
                      y: [0, 11, -5, 2, 0],
                      rotate: [0, -18, 9, -4, 0],
                      scale: [1, 1.17, 0.93, 1.03, 1],
                    }
                  : { opacity: 0, x: 250, y: -20, rotate: 28, scale: 0.74 }
              }
              transition={{ ...socialDropTransition, delay: 0.03 }}
            >
              <LinkedInIcon className="h-5 w-5" />
            </motion.a>
            <motion.a
              href={site.links.github}
              className={socialIconLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              initial={{ opacity: 0, x: -260, y: 12, rotate: -30, scale: 0.72 }}
              animate={
                socialVisible
                  ? {
                      opacity: 1,
                      x: [0, 24, -13, 7, 0],
                      y: [0, 10, -4, 2, 0],
                      rotate: [0, 20, -11, 5, 0],
                      scale: [1, 1.18, 0.92, 1.04, 1],
                    }
                  : { opacity: 0, x: -260, y: 12, rotate: -30, scale: 0.72 }
              }
              transition={{ ...socialDropTransition, delay: 0.06 }}
            >
              <GitHubIcon className="h-5 w-5" />
            </motion.a>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ ...easeOut, duration: 0.4, delay: 0 }}
        >
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
          </nav>

          <hr className="my-12 border-neutral-200" />

          <section id="work" className="scroll-mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">
            Work
          </h2>
          <div className="mt-8 space-y-10">
            {owenWorkEntries.map((job, idx) => (
              <motion.article
                key={`${job.role}-${job.company}`}
                className="flex gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ ...easeOut, delay: idx * 0.03 }}
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
              </motion.article>
            ))}
          </div>
          </section>

          <section id="projects" className="mt-16 scroll-mt-8 sm:mt-20">
          <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">
            Projects
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featuredProjects.map((p, idx) => {
              const href = projectPrimaryHref(p);
              const thumb = projectThumbSrc(p);
              const { name, context } = splitProjectTitle(p.title);
              return (
                <motion.button
                  key={p.title}
                  type="button"
                  onClick={() => setActiveProjectTitle(p.title)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{ ...easeOut, delay: idx * 0.025 }}
                >
                  <div className="relative aspect-[16/10] w-full bg-neutral-100">
                    {shouldUseProjectVideo(p) ? (
                      <video
                        src={p.video}
                        className="absolute inset-0 h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={`${name} preview video`}
                      />
                    ) : thumb ? (
                      <Image
                        src={thumb}
                        alt={`${name} preview`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        style={{
                          objectPosition: p.imageObjectPosition ?? "center",
                        }}
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                        No preview
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 px-4 py-3">
                    <p className="text-base font-semibold tracking-tight text-black sm:text-[1.06rem]">
                      {name}
                    </p>
                    <p className="text-sm leading-relaxed text-neutral-600 line-clamp-3 min-h-[4.5rem]">
                      {p.description}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {[context, p.year].filter(Boolean).join(" · ") || "Project"}
                    </p>
                    {href ? (
                      <p className="text-xs text-neutral-500">Click card for details</p>
                    ) : null}
                  </div>
                </motion.button>
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
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {otherProjects.map((p, idx) => {
                const href = projectPrimaryHref(p);
                const thumb = projectThumbSrc(p);
                const { name, context } = splitProjectTitle(p.title);
                return (
                  <motion.button
                    key={p.title}
                    type="button"
                    onClick={() => setActiveProjectTitle(p.title)}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={{ ...easeOut, delay: idx * 0.025 }}
                  >
                    <div className="relative aspect-[16/10] w-full bg-neutral-100">
                      {shouldUseProjectVideo(p) ? (
                        <video
                          src={p.video}
                          className="absolute inset-0 h-full w-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          aria-label={`${name} preview video`}
                        />
                      ) : thumb ? (
                        <Image
                          src={thumb}
                          alt={`${name} preview`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          style={{
                            objectPosition: p.imageObjectPosition ?? "center",
                          }}
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                          No preview
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col space-y-2 px-4 py-3">
                      <p className="text-base font-semibold tracking-tight text-black sm:text-[1.06rem]">
                        {name}
                      </p>
                      <p className="text-sm leading-relaxed text-neutral-600 line-clamp-3 min-h-[4.5rem]">
                        {p.description}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {[context, p.year].filter(Boolean).join(" · ") || "Project"}
                      </p>
                      {href ? (
                        <p className="text-xs text-neutral-500">Click card for details</p>
                      ) : null}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          ) : null}
          </section>
        </motion.div>

        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
            onClick={() => setActiveProjectTitle(null)}
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-full max-w-3xl overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${splitProjectTitle(activeProject.title).name} details`}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={easeOut}
            >
              <div className="flex flex-col gap-4 p-5 sm:p-6">
                <div className="relative h-52 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 sm:h-64">
                  {shouldUseProjectVideo(activeProject) ? (
                    <video
                      src={activeProject.video}
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={`${splitProjectTitle(activeProject.title).name} demo video`}
                      controls
                    />
                  ) : projectThumbSrc(activeProject) ? (
                    <Image
                      src={projectThumbSrc(activeProject) as string}
                      alt={`${splitProjectTitle(activeProject.title).name} visual`}
                      fill
                      className="object-cover"
                      style={{
                        objectPosition: activeProject.imageObjectPosition ?? "center",
                      }}
                      sizes="(max-width: 768px) 100vw, 720px"
                    />
                  ) : null}
                </div>
                <div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="text-[1.2rem] font-medium leading-snug text-black sm:text-[1.25rem]">
                        {splitProjectTitle(activeProject.title).name}
                      </span>
                      {githubRepoUrl(activeProject) ? (
                        <a
                          href={githubRepoUrl(activeProject)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={githubIconBtn}
                          aria-label={`${splitProjectTitle(activeProject.title).name} on GitHub`}
                        >
                          <GitHubIcon className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                    <p className="text-sm text-neutral-500">
                      {[splitProjectTitle(activeProject.title).context, activeProject.year]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <p className="mt-3 text-[1.05rem] leading-relaxed text-neutral-800 sm:text-[1.0625rem]">
                    {activeProject.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
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
            </motion.div>
          </motion.div>
        ) : null}

        <footer className="mt-20 border-t border-neutral-200 pt-10 text-sm text-neutral-500">
          <p>{fullName}</p>
        </footer>
      </div>
    </div>
  );
}
