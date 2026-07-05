"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { fullName, owenWorkEntries, site } from "@/app/site-content";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/portfolio/social-icons";
import { InstagramReelCardPreview } from "@/components/media/InstagramReelCardPreview";
import { InstagramReelEmbed } from "@/components/media/InstagramReelEmbed";
import { allPortfolioProjects, projectCardImageFraming, type Project } from "@/app/projects/projects-data";
import { easeOut } from "@/components/portfolio/portfolio-motion";

const linkClass =
  "underline decoration-neutral-400 underline-offset-[5px] transition-colors hover:decoration-neutral-600 text-foreground";

const navClass =
  "font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground";

const socialIconLink =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:border-neutral-400 hover:text-foreground sm:h-10 sm:w-10";

const projectCardClass =
  "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md";

const githubIconBtn =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-neutral-400 hover:text-foreground";

function projectPrimaryHref(p: Project): string | undefined {
  return p.link ?? p.devpost ?? p.code;
}

function projectThumbSrc(p: Project): string | undefined {
  return p.image ?? p.videoPoster ?? p.images?.[0];
}

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

function isExternalHref(href: string) {
  return href.startsWith("http");
}

function ProjectMedia({
  p,
  name,
  layout = "card",
  visualWide = false,
}: {
  p: Project;
  name: string;
  layout?: "card" | "detail";
  /** Full-width 2-col featured row (e.g. Project L.A.R.P) — wider Instagram embed. */
  visualWide?: boolean;
}) {
  const thumb = projectThumbSrc(p);
  if (
    p.instagramReelId &&
    layout === "card" &&
    p.instagramCardPreview === "autoplay" &&
    p.video
  ) {
    return (
      <video
        src={p.video}
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={`${name} preview video`}
      />
    );
  }
  if (p.instagramReelId) {
    const useLinkCard =
      layout === "card" && p.instagramCardPreview === "link";
    if (useLinkCard) {
      return (
        <InstagramReelCardPreview
          title={name}
          posterSrc={thumb}
          posterUnoptimized={p.imageUnoptimized}
          className="absolute inset-0 h-full w-full"
        />
      );
    }
    const density =
      layout === "detail" ? "detail" : visualWide ? "wide" : "card";
    return (
      <InstagramReelEmbed
        reelId={p.instagramReelId}
        title={`${name} on Instagram`}
        density={density}
        className={
          layout === "detail"
            ? "min-h-[min(420px,52vh)] w-full py-2"
            : visualWide
              ? "relative h-full w-full py-0.5"
              : "absolute inset-0"
        }
      />
    );
  }
  if (p.youtubeId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${p.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${p.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
        className="absolute inset-0 h-full w-full border-0"
        allow="autoplay; encrypted-media"
        loading="lazy"
        title={`${name} demo`}
      />
    );
  }
  if (p.video) {
    return (
      <video
        src={p.video}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={`${name} preview video`}
      />
    );
  }
  if (p.images && p.images.length > 1 && layout === "detail") {
    return (
      <div className="absolute inset-0 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {p.images.map((src, i) => (
          <div
            key={src}
            className="relative min-h-0 overflow-hidden rounded-lg bg-muted"
          >
            {p.imageUnoptimized ? (
              <img
                src={src}
                alt={`${name} preview ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <Image
                src={src}
                alt={`${name} preview ${i + 1}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 40vw"
              />
            )}
          </div>
        ))}
      </div>
    );
  }
  if (thumb) {
    const detailFit = layout === "detail";
    const framing = projectCardImageFraming(p);
    const cardHoverClass =
      p.imageObjectScale || p.imageCardFit === "contain"
        ? ""
        : "transition-transform duration-300 group-hover:scale-[1.02]";
    if (p.imageUnoptimized) {
      return (
        <img
          src={thumb}
          alt={`${name} preview`}
          className={
            detailFit
              ? "absolute inset-0 h-full w-full object-contain object-center"
              : `${framing.className} ${cardHoverClass}`
          }
          style={detailFit ? { objectPosition: p.imageObjectPosition ?? "center" } : framing.style}
          loading="lazy"
          decoding="async"
        />
      );
    }
    return (
      <Image
        src={thumb}
        alt={`${name} preview`}
        fill
        className={
          detailFit
            ? "object-contain object-center"
            : `${framing.imageClassName} ${cardHoverClass}`
        }
        style={
          detailFit
            ? { objectPosition: p.imageObjectPosition ?? "center" }
            : framing.imageStyle
        }
        sizes="(max-width: 640px) 100vw, 50vw"
      />
    );
  }
  return (
    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
      No preview
    </div>
  );
}

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
  const dim = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  return (
    <div
      className={`relative ${dim} shrink-0 overflow-hidden rounded border border-border bg-muted`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={size === "sm" ? "24px" : "28px"}
      />
    </div>
  );
}

const typedDisplayName = `${site.person.firstName} ${site.person.lastName}`;

type CurrentlyRow = {
  prefix: string;
  image?: { src: string; alt: string };
  linkLabel: string;
  href?: string;
};

const currentlyRows: CurrentlyRow[] = [
  {
    prefix: "embedded systems engineer intern @",
    image: { src: "/humancomputerlab.jpeg", alt: "Human Computer Lab" },
    linkLabel: "Human Computer Lab",
    href: "https://www.humancomputerlab.com/",
  },
  {
    prefix: "prev swe intern @",
    image: { src: "/sellstatic.jpeg", alt: "SellStatic" },
    linkLabel: "SellStatic",
    href: site.links.sellstatic,
  },
  {
    prefix: "prev uav simulation research @",
    image: { src: "/SDCNLAB.jpeg", alt: "SDCN Lab" },
    linkLabel: "SDCNLab",
    href: "https://www.yorku.ca/jjshan/SDCNLab.html",
  },
  {
    prefix: "prev 2x intern @",
    image: { src: "/utias.jpeg", alt: "UTIAS Flight Systems and Control Laboratory" },
    linkLabel: "Flight Systems and Control Laboratory (FSC Lab)",
    href: "https://utias.utoronto.ca",
  },
  {
    prefix: "electrical engineering @",
    image: { src: "/york.png", alt: "York University" },
    linkLabel: "York University",
    href: "https://yorku.ca",
  },
  {
    prefix: `recipient of ${site.person.scholarshipAmount}`,
    image: { src: "/schulich.jpeg", alt: "Schulich Leader" },
    linkLabel: "Schulich Leader",
    href: site.links.schulichLeaders,
  },
  {
    prefix: "seeking fall 2026 internships — autonomy / aerospace / defense",
    linkLabel: "",
  },
];

export function OwenLiStyleHome() {
  const [typedName, setTypedName] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [currentlyVisible, setCurrentlyVisible] = useState(false);
  const [socialVisible, setSocialVisible] = useState(false);
  const [showOtherProjects, setShowOtherProjects] = useState(false);
  const [activeProjectTitle, setActiveProjectTitle] = useState<string | null>(null);

  const featuredProjectTitles = [
    "Project L.A.R.P",
    "Fixed-Wing UAV Airframe Design",
    "Integrating UAV Controls into Navigation",
    "Optimizing UAV Autonomous Navigation",
    "UAV Navigation Model Training",
    "RedLamp (UofTHacks)",
    "CityPath AI (Shopify Hackathon)",
    "GrowthSync (CTRLHACKDEL)",
    "Finding N.E.M.O (ConUHacks)",
    "Car line follower",
    "Car with obstacle detection",
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
      setCurrentlyVisible(true);
      setSocialVisible(true);
      return;
    }
    const t1 = window.setTimeout(() => setCurrentlyVisible(true), 200);
    const t2 = window.setTimeout(() => setSocialVisible(true), 600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [typingDone]);

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
    <div className="portfolio-space min-h-screen text-foreground antialiased">
      <div className="mx-auto max-w-2xl px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <header className="mb-10">
          <h1
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]"
            aria-label={typedDisplayName}
          >
            <span aria-hidden="true">{typedName}</span>
            {!typingDone ? (
              <span
                aria-hidden
                className="ml-0.5 inline-block min-w-[0.35em] animate-pulse font-light text-muted-foreground"
              >
                |
              </span>
            ) : null}
          </h1>
        </header>

        {/* CURRENTLY terminal block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={currentlyVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-medium tracking-wide text-muted-foreground">
                Currently
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <ul className="m-0 list-none space-y-4 p-0 text-[0.92rem] leading-relaxed sm:text-[0.95rem]">
              {currentlyRows.map((row, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={currentlyVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ ...easeOut, delay: idx * 0.08 }}
                >
                  <span className="shrink-0 text-neutral-500" aria-hidden>
                    &#x25B8;
                  </span>
                  <span className="inline-flex min-w-0 flex-wrap items-center gap-1.5">
                    <span className="whitespace-nowrap text-muted-foreground">{row.prefix}</span>
                    {row.image ? (
                      <InlineThumb src={row.image.src} alt={row.image.alt} size="sm" />
                    ) : null}
                    {row.linkLabel && row.href ? (
                      <a
                        href={row.href}
                        className="whitespace-nowrap text-foreground underline decoration-neutral-400 underline-offset-[3px] transition-colors hover:decoration-neutral-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.linkLabel}
                      </a>
                    ) : null}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Social icons */}
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
            <motion.a
              href={site.links.x}
              className={socialIconLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X profile"
              initial={{ opacity: 0, x: 240, y: 14, rotate: 24, scale: 0.74 }}
              animate={
                socialVisible
                  ? {
                      opacity: 1,
                      x: [0, -20, 10, -5, 0],
                      y: [0, 9, -4, 2, 0],
                      rotate: [0, -16, 8, -3, 0],
                      scale: [1, 1.16, 0.94, 1.03, 1],
                    }
                  : { opacity: 0, x: 240, y: 14, rotate: 24, scale: 0.74 }
              }
              transition={{ ...socialDropTransition, delay: 0.09 }}
            >
              <XIcon className="h-5 w-5" />
            </motion.a>
          </p>
        </div>

        {/* Lower sections — gated until social icons land */}
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

          <hr className="my-12 border-border" />

          <section id="work" className="scroll-mt-8">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
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
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                      <Image
                        src={job.thumb.src}
                        alt={job.thumb.alt}
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    </div>
                  ) : (
                    <div
                      className="h-11 w-11 shrink-0 rounded-md border border-dashed border-border bg-muted"
                      aria-hidden
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[1.05rem] leading-relaxed sm:text-[1.0625rem]">
                      <span className="font-medium text-foreground">{job.role}</span>
                      <span className="text-muted-foreground"> | </span>
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
                        <span className="text-foreground">{job.company}</span>
                      )}
                      <span className="text-muted-foreground"> | </span>
                      <span className="text-muted-foreground">{job.period}</span>
                    </p>
                    {job.note ? (
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">
                        {job.note}
                      </p>
                    ) : null}
                    {job.description ? (
                      <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
                        {job.description}
                      </p>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="projects" className="mt-16 scroll-mt-8 sm:mt-20">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Projects
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {featuredProjects.map((p, idx) => {
                const href = projectPrimaryHref(p);
                const { name, context } = splitProjectTitle(p.title);
                return (
                  <motion.button
                    key={p.title}
                    type="button"
                    onClick={() => setActiveProjectTitle(p.title)}
                    className={projectCardClass}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={{ ...easeOut, delay: idx * 0.025 }}
                  >
                    <div
                      className={`relative w-full overflow-hidden bg-muted ${
                        p.instagramReelId && p.instagramCardPreview !== "link" && p.instagramCardPreview !== "autoplay"
                          ? "flex min-h-[300px] items-center justify-center py-2 sm:min-h-[340px]"
                          : "aspect-[16/10]"
                      }`}
                    >
                      <ProjectMedia p={p} name={name} />
                    </div>
                    <div className="flex flex-1 flex-col space-y-2 px-4 py-3">
                      <p className="text-base font-semibold tracking-tight text-foreground sm:text-[1.06rem]">
                        {name}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 min-h-[4.5rem]">
                        {p.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {[context, p.year].filter(Boolean).join(" · ") || "Project"}
                      </p>
                      {href ? (
                        <p className="text-xs text-muted-foreground">Click card for details</p>
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
                className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-neutral-400 hover:text-foreground"
              >
                {showOtherProjects ? "Hide other projects" : "View other projects"}
              </button>
            </div>

            {showOtherProjects ? (
              <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {otherProjects.map((p, idx) => {
                  const href = projectPrimaryHref(p);
                  const { name, context } = splitProjectTitle(p.title);
                  return (
                    <motion.button
                      key={p.title}
                      type="button"
                      onClick={() => setActiveProjectTitle(p.title)}
                      className={projectCardClass}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={revealViewport}
                      transition={{ ...easeOut, delay: idx * 0.025 }}
                    >
                      <div
                        className={`relative w-full overflow-hidden bg-muted ${
                          p.instagramReelId
                            ? "flex min-h-[300px] items-center justify-center py-2 sm:min-h-[340px]"
                            : "aspect-[16/10]"
                        }`}
                      >
                        <ProjectMedia p={p} name={name} />
                      </div>
                      <div className="flex flex-1 flex-col space-y-2 px-4 py-3">
                        <p className="text-base font-semibold tracking-tight text-foreground sm:text-[1.06rem]">
                          {name}
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 min-h-[4.5rem]">
                          {p.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {[context, p.year].filter(Boolean).join(" · ") || "Project"}
                        </p>
                        {href ? (
                          <p className="text-xs text-muted-foreground">Click card for details</p>
                        ) : null}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            ) : null}
          </section>
        </motion.div>

        {/* Project detail modal */}
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
            onClick={() => setActiveProjectTitle(null)}
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${splitProjectTitle(activeProject.title).name} details`}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={easeOut}
            >
              <div className="flex flex-col gap-4 p-5 sm:p-6">
                <div
                  className={
                    activeProject.images && activeProject.images.length > 1
                      ? "relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted"
                      : activeProject.instagramReelId
                        ? "relative mx-auto flex min-h-[min(400px,50vh)] max-h-[min(720px,78vh)] w-full max-w-lg items-center justify-center overflow-hidden rounded-xl border border-border bg-muted sm:max-w-xl"
                        : "relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-xl border border-border bg-muted max-h-[min(58vh,560px)] sm:max-w-lg"
                  }
                >
                  <ProjectMedia
                    p={activeProject}
                    name={splitProjectTitle(activeProject.title).name}
                    layout="detail"
                  />
                </div>
                <div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="text-[1.2rem] font-medium leading-snug text-foreground sm:text-[1.25rem]">
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
                    <p className="text-sm text-muted-foreground">
                      {[splitProjectTitle(activeProject.title).context, activeProject.year]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
                    {activeProject.description}
                  </p>
                  {activeProject.caption &&
                  activeProject.caption !== activeProject.description ? (
                    <p className="mt-1.5 text-sm text-muted-foreground">{activeProject.caption}</p>
                  ) : null}
                  <div className="mt-5 flex flex-wrap gap-3">
                    {projectPrimaryHref(activeProject) ? (
                      isExternalHref(projectPrimaryHref(activeProject) as string) ? (
                        <a
                          href={projectPrimaryHref(activeProject)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                        >
                          Open project
                        </a>
                      ) : (
                        <Link
                          href={projectPrimaryHref(activeProject) as string}
                          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                          onClick={() => {
                            setActiveProjectTitle(null);
                            document.body.style.overflow = "";
                          }}
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
                        className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-neutral-400"
                      >
                        View code
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setActiveProjectTitle(null)}
                      className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-neutral-400"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}

        <footer className="mt-20 border-t border-border pt-10 text-sm text-muted-foreground">
          <p>{fullName}</p>
        </footer>
      </div>
    </div>
  );
}
