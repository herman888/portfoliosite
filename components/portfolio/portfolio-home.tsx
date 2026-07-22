"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { fullName, workEntries, site } from "@/app/site-content";
import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from "@/components/portfolio/social-icons";
import { MarkerHighlight } from "@/components/portfolio/MarkerHighlight";
import { playPortfolioSound, unlockPortfolioAudio } from "@/lib/portfolio-sounds";
import { InstagramReelCardPreview } from "@/components/media/InstagramReelCardPreview";
import { InstagramReelEmbed } from "@/components/media/InstagramReelEmbed";
import {
  allPortfolioProjects,
  PROJECT_LARP,
  projectCardImageFraming,
  type Project,
  type ProjectCarouselSlide,
} from "@/app/projects/projects-data";
import { LarpFeatured } from "@/components/portfolio/LarpFeatured";
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

function CarouselSlideImage({
  src,
  alt,
  fit,
  layout,
  p,
}: {
  src: string;
  alt: string;
  fit: "cover" | "contain";
  layout: "card" | "detail";
  p: Project;
}) {
  const [failed, setFailed] = useState(false);
  const detailFit = layout === "detail";
  const framing = projectCardImageFraming({ ...p, imageCardFit: fit });
  const useContain = fit === "contain";
  const imgClass = useContain
    ? "object-contain object-center"
    : detailFit
      ? "object-cover object-center"
      : framing.imageClassName;
  const objectPosition = p.imageObjectPosition ?? "center";

  if (p.imageUnoptimized || failed) {
    return (
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${imgClass}`}
        style={{ objectPosition }}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={imgClass}
      style={{ objectPosition }}
      sizes="(max-width: 640px) 100vw, 50vw"
      onError={() => setFailed(true)}
    />
  );
}

function ProjectImageCarousel({
  slides,
  name,
  p,
  layout,
}: {
  slides: ProjectCarouselSlide[];
  name: string;
  p: Project;
  layout: "card" | "detail";
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-muted">
      {slides.map((slide, i) => (
        <div
          key={slide.kind === "single" ? slide.src : `${slide.left}|${slide.right}`}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          {slide.kind === "single" ? (
            <div
              className="absolute inset-0"
              style={
                slide.background ? { backgroundColor: slide.background } : undefined
              }
            >
              <CarouselSlideImage
                src={slide.src}
                alt={`${name} preview ${i + 1}`}
                fit={slide.fit ?? "cover"}
                layout={layout}
                p={p}
              />
            </div>
          ) : (
            <div className="absolute inset-0 grid grid-cols-2">
              <div className="relative overflow-hidden border-r border-border/40 bg-white">
                <CarouselSlideImage
                  src={slide.left}
                  alt={`${name} preview left`}
                  fit={slide.leftFit ?? "cover"}
                  layout={layout}
                  p={p}
                />
              </div>
              <div className="relative overflow-hidden bg-white">
                <CarouselSlideImage
                  src={slide.right}
                  alt={`${name} preview right`}
                  fit={slide.rightFit ?? "contain"}
                  layout={layout}
                  p={p}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
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
  if (p.carouselSlides && p.carouselSlides.length > 1) {
    return (
      <ProjectImageCarousel
        slides={p.carouselSlides}
        name={name}
        p={p}
        layout={layout}
      />
    );
  }
  if (p.images && p.images.length > 1) {
    return (
      <ProjectImageCarousel
        slides={p.images.map((src) => ({ kind: "single" as const, src, fit: "cover" as const }))}
        name={name}
        p={p}
        layout={layout}
      />
    );
  }
  if (thumb) {
    const detailFit = layout === "detail";
    const framing = projectCardImageFraming(p);
    const cardHoverClass =
      p.imageObjectScale || p.imageCardFit === "contain"
        ? ""
        : "transition-transform duration-300 group-hover:scale-[1.02]";
    return (
      <ProjectThumbImage
        src={thumb}
        alt={`${name} preview`}
        unoptimized={Boolean(p.imageUnoptimized)}
        detailFit={detailFit}
        framing={framing}
        cardHoverClass={cardHoverClass}
        objectPosition={p.imageObjectPosition ?? "center"}
      />
    );
  }
  return (
    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
      No preview
    </div>
  );
}

function ProjectThumbImage({
  src,
  alt,
  unoptimized,
  detailFit,
  framing,
  cardHoverClass,
  objectPosition,
}: {
  src: string;
  alt: string;
  unoptimized: boolean;
  detailFit: boolean;
  framing: ReturnType<typeof projectCardImageFraming>;
  cardHoverClass: string;
  objectPosition: string;
}) {
  const [failed, setFailed] = useState(false);

  if (unoptimized || failed) {
    return (
      <img
        src={src}
        alt={alt}
        className={
          detailFit
            ? "absolute inset-0 h-full w-full object-contain object-center"
            : `${framing.className} ${cardHoverClass}`
        }
        style={detailFit ? { objectPosition } : framing.style}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={
        detailFit
          ? "object-contain object-center"
          : `${framing.imageClassName} ${cardHoverClass}`
      }
      style={detailFit ? { objectPosition } : framing.imageStyle}
      sizes="(max-width: 640px) 100vw, 50vw"
      onError={() => setFailed(true)}
    />
  );
}

function ProjectGridCard({
  p,
  idx,
  onSelect,
  compact = false,
}: {
  p: Project;
  idx: number;
  onSelect: (title: string) => void;
  compact?: boolean;
}) {
  const href = projectPrimaryHref(p);
  const { name, context } = splitProjectTitle(p.title);

  return (
    <motion.button
      key={p.title}
      type="button"
      onClick={() => onSelect(p.title)}
      className={projectCardClass}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
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
        <p
          className={`font-semibold tracking-tight text-foreground ${
            compact ? "text-sm leading-snug" : "text-base sm:text-[1.06rem]"
          }`}
        >
          {name}
        </p>
        <p
          className={`leading-relaxed text-muted-foreground whitespace-pre-line ${
            compact
              ? "line-clamp-2 min-h-[2.75rem] text-xs"
              : "line-clamp-3 min-h-[4.5rem] text-sm"
          }`}
        >
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
  suffix?: string;
  highlightColor: string;
  highlightVariant?: "highlight" | "underline";
};

const currentlyRows: CurrentlyRow[] = [
  {
    prefix: "embedded systems engineer intern @",
    image: { src: "/humancomputerlab.jpeg", alt: "Human Computer Lab" },
    linkLabel: "Human Computer Lab",
    href: "https://www.humancomputerlab.com/",
    highlightColor: "#67e8f9",
  },
  {
    prefix: "building",
    linkLabel: "Project L.A.R.P.",
    suffix: " — counter-UAS (500k+ views, vc interest, sf offers)",
    highlightColor: "#fda4af",
  },
  {
    prefix: "electrical engineering @",
    image: { src: "/york.png", alt: "York University" },
    linkLabel: "York University",
    href: "https://yorku.ca",
    highlightColor: "#fde047",
  },
  {
    prefix: `recipient of ${site.person.scholarshipAmount}`,
    image: { src: "/schulich.jpeg", alt: "Schulich Leader" },
    linkLabel: "Schulich Leader",
    href: site.links.schulichLeaders,
    highlightColor: "#fcd34d",
    highlightVariant: "underline",
  },
];

export function PortfolioHome() {
  const [typedName, setTypedName] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [currentlyVisible, setCurrentlyVisible] = useState(false);
  const [socialVisible, setSocialVisible] = useState(false);
  const [showOtherProjects, setShowOtherProjects] = useState(false);
  const [activeProjectTitle, setActiveProjectTitle] = useState<string | null>(null);

  const featuredProjectTitles = [
    "Fixed-Wing UAV Airframe Design",
    "Integrating UAV Controls into Navigation",
    "Optimizing UAV Autonomous Navigation",
    "UAV Navigation Model Training",
    "RedLamp - UoftHacks 2nd Place 🥈",
    "Foresters Financial - 1st Place Development Challenge 🥇",
    "Jane Street - 1st Place Estimation Competition 🥇",
    "CityPath AI - 3rd Place Shopify Hackathon 🥉",
    "GrowthSync - CtrlHackDel 2.0",
    "Finding N.E.M.O Hack Concordia",
    "Car line follower",
    "Car with obstacle detection",
    "Giveway - Hack The 6ix",
    "Meal2Go - Eureka Hacks",
    "KinKitchen - Hack Canada",
  ];
  const featuredProjects = featuredProjectTitles
    .map((title) => allPortfolioProjects.find((p) => p.title === title))
    .filter((p): p is Project => Boolean(p));
  const otherProjects = allPortfolioProjects.filter(
    (p) => p.title !== PROJECT_LARP.title && !featuredProjectTitles.includes(p.title)
  );
  const allDisplayProjects = [...featuredProjects, ...otherProjects];
  const activeProject =
    [PROJECT_LARP, ...featuredProjects, ...otherProjects].find(
      (p) => p.title === activeProjectTitle
    ) ?? null;
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
    const t1 = window.setTimeout(() => setCurrentlyVisible(true), 280);
    const t2 = window.setTimeout(() => setSocialVisible(true), 1600);
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

        {/* CURRENTLY — pencil highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={currentlyVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          onPointerDown={() => unlockPortfolioAudio()}
        >
          <div className="mb-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-xs font-medium tracking-wide text-muted-foreground">
                Currently
              </span>
              <motion.div
                className="h-px flex-1 origin-left bg-border"
                initial={{ scaleX: 0 }}
                animate={currentlyVisible ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ ...easeOut, duration: 0.55, delay: 0.05 }}
              />
            </div>
            <ul className="m-0 list-none space-y-4 p-0 text-[0.92rem] leading-relaxed sm:text-[0.95rem]">
              {currentlyRows.map((row, idx) => {
                const markDelay = 0.2 + idx * 0.38;
                const label = (
                  <MarkerHighlight
                    color={row.highlightColor}
                    delay={markDelay}
                    active={currentlyVisible}
                    pencil
                    variant={row.highlightVariant ?? "highlight"}
                    sound={row.highlightVariant === "underline" ? "underline" : "marker"}
                  >
                    {row.linkLabel}
                  </MarkerHighlight>
                );

                return (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      currentlyVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ ...easeOut, delay: idx * 0.1 }}
                  >
                    <motion.span
                      className="shrink-0 text-neutral-500"
                      aria-hidden
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={
                        currentlyVisible
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.6 }
                      }
                      transition={{ ...easeOut, delay: idx * 0.1 + 0.05 }}
                    >
                      &#x25B8;
                    </motion.span>
                    <span className="inline-flex min-w-0 flex-wrap items-center gap-1.5">
                      <span className="whitespace-nowrap text-muted-foreground">
                        {row.prefix}
                      </span>
                      {row.image ? (
                        <InlineThumb src={row.image.src} alt={row.image.alt} size="sm" />
                      ) : null}
                      {row.href ? (
                        <a
                          href={row.href}
                          className="whitespace-nowrap transition-opacity hover:opacity-80"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {label}
                        </a>
                      ) : (
                        label
                      )}
                      {row.suffix ? (
                        <span className="text-muted-foreground">{row.suffix}</span>
                      ) : null}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </motion.div>

        {/* Social icons */}
        <div className="mt-8" onPointerDown={() => unlockPortfolioAudio()}>
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
              onAnimationComplete={() => socialVisible && playPortfolioSound("pop")}
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
              href={site.links.instagram}
              className={socialIconLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile"
              initial={{ opacity: 0, x: -200, y: 18, rotate: -22, scale: 0.74 }}
              animate={
                socialVisible
                  ? {
                      opacity: 1,
                      x: [0, 18, -10, 5, 0],
                      y: [0, 8, -3, 2, 0],
                      rotate: [0, 14, -7, 3, 0],
                      scale: [1, 1.15, 0.94, 1.03, 1],
                    }
                  : { opacity: 0, x: -200, y: 18, rotate: -22, scale: 0.74 }
              }
              transition={{ ...socialDropTransition, delay: 0.075 }}
              onAnimationComplete={() => socialVisible && playPortfolioSound("pop")}
            >
              <InstagramIcon className="h-5 w-5" />
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
            {(["work", "projects"] as const).map((id, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                className={navClass}
                initial={{ opacity: 0, y: 8 }}
                animate={sectionsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ ...easeOut, delay: 0.05 + i * 0.06 }}
              >
                {id === "work" ? "Work" : "Projects"}
              </motion.a>
            ))}
          </nav>

          <motion.hr
            className="my-12 origin-left border-border"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={sectionsReady ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ ...easeOut, duration: 0.5, delay: 0.1 }}
          />

          <section id="work" className="scroll-mt-8">
            <motion.h2
              className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={easeOut}
            >
              Work
            </motion.h2>
            <div className="mt-8 space-y-10">
              {workEntries.map((job, idx) => (
                <motion.article
                  key={`${job.role}-${job.company}`}
                  className="flex gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={revealViewport}
                  transition={{ ...easeOut, delay: idx * 0.04 }}
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
            <div className="lg:relative lg:left-1/2 lg:w-screen lg:max-w-7xl lg:-translate-x-1/2 lg:px-6 xl:px-8">
              <motion.h2
                className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={easeOut}
              >
                Projects
              </motion.h2>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={revealViewport}
                transition={{ ...easeOut, duration: 0.5 }}
              >
                <LarpFeatured project={PROJECT_LARP} />
              </motion.div>

              <motion.h3
                className="mt-8 text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={revealViewport}
                transition={easeOut}
              >
                Other projects
              </motion.h3>

              {/* Mobile / tablet: featured first, then optional extras */}
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
                {featuredProjects.map((p, idx) => (
                  <ProjectGridCard
                    key={p.title}
                    p={p}
                    idx={idx}
                    onSelect={setActiveProjectTitle}
                  />
                ))}
              </div>

              <div className="mt-6 lg:hidden">
                <button
                  type="button"
                  onClick={() => setShowOtherProjects((v) => !v)}
                  className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-neutral-400 hover:text-foreground"
                >
                  {showOtherProjects ? "Hide other projects" : "View other projects"}
                </button>
              </div>

              {showOtherProjects ? (
                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
                  {otherProjects.map((p, idx) => (
                    <ProjectGridCard
                      key={p.title}
                      p={p}
                      idx={idx}
                      onSelect={setActiveProjectTitle}
                    />
                  ))}
                </div>
              ) : null}

              {/* Desktop: remaining projects in a 4-column grid */}
              <div className="mt-4 hidden grid-cols-4 gap-4 lg:grid">
                {allDisplayProjects.map((p, idx) => (
                  <ProjectGridCard
                    key={p.title}
                    p={p}
                    idx={idx}
                    onSelect={setActiveProjectTitle}
                    compact
                  />
                ))}
              </div>
            </div>
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
                  <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground sm:text-[1.0625rem] whitespace-pre-line">
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
