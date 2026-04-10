"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { allPortfolioProjects, type Project } from "@/app/projects/projects-data";
import {
  educationLine,
  heroBioParagraphs,
  heroLocation,
  heroPortrait,
  heroTagline,
  site,
} from "@/app/site-content";
import { PortfolioAbout } from "./about";
import { PortfolioContact } from "./contact";
import { PortfolioCurrentlyPanel } from "./currently-panel";
import { PortfolioFooter } from "./footer";
import { easeOut } from "./portfolio-motion";
import { PortfolioSkillsSection } from "./portfolio-skills";
import { GitHubIcon, LinkedInIcon } from "./social-icons";

type LinkAffordance = {
  kind: "github" | "external" | "internal";
  href: string;
};

type EditorialItem = {
  id: string;
  /** Uppercase label (editorial grid). */
  title: string;
  /** Original project title for sentence-case “My work” cards. */
  displayName: string;
  subtitle?: string;
  year?: string;
  image?: string;
  video?: string;
  videoPoster?: string;
  imageObjectPosition?: string;
  href?: string;
  location?: string;
  /** Set for project cards — icon row below the main link. */
  linkAffordance?: LinkAffordance;
};

function projectToEditorialItem(p: Project): EditorialItem {
  return {
    id: p.title,
    title: p.title.toUpperCase(),
    displayName: p.title,
    subtitle: p.caption ?? p.description,
    year: p.year ?? "—",
    image: p.image ?? p.images?.[0],
    video: p.video,
    videoPoster: p.videoPoster,
    imageObjectPosition: p.imageObjectPosition,
    href: hrefForProject(p),
    linkAffordance: linkAffordanceForProject(p),
  };
}

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

const affordanceBtn =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-colors hover:border-neutral-300 hover:text-black sm:h-10 sm:w-10";

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

function EditorialCard({
  item,
  workStyle = false,
}: {
  item: EditorialItem;
  /** Larger, sentence-case titles — closer to fiona-cai.vercel.app “My work” list. */
  workStyle?: boolean;
}) {
  const imageSrc = item.image;
  const videoSrc = item.video;

  const media = (
    <div className="relative aspect-[16/11] w-full max-w-full overflow-hidden rounded-lg bg-neutral-100 sm:rounded-xl">
      {videoSrc ? (
        <video
          src={videoSrc}
          poster={item.videoPoster}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover bg-neutral-200"
        />
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          style={
            item.imageObjectPosition
              ? { objectPosition: item.imageObjectPosition }
              : undefined
          }
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
        <h3
          className={
            workStyle
              ? "text-base font-semibold leading-snug tracking-[-0.02em] text-black sm:text-lg md:text-xl"
              : "text-sm font-bold uppercase leading-snug tracking-[0.04em] text-black"
          }
        >
          {workStyle ? item.displayName : item.title}
        </h3>
        {item.year ? (
          <p className="text-xs font-medium tabular-nums leading-relaxed text-neutral-500">
            {item.year}
          </p>
        ) : null}
      </header>
      {item.subtitle ? (
        <p
          className={
            workStyle
              ? "text-pretty text-sm font-medium leading-relaxed text-neutral-600 md:text-base md:leading-snug"
              : "text-pretty text-sm leading-relaxed text-neutral-700"
          }
        >
          {item.subtitle}
        </p>
      ) : null}
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
  const workItems = useMemo(
    () => allPortfolioProjects.map(projectToEditorialItem),
    []
  );

  const nameLower = `${site.person.firstName} ${site.person.lastName}`.toLowerCase();

  const navLinkClass =
    "inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black active:bg-neutral-100 sm:min-h-0 sm:px-2 sm:py-1.5";

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-black antialiased">
      <div className="mx-auto w-full max-w-screen-2xl px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 md:px-8 md:pt-10 lg:px-10 xl:px-14 2xl:px-16">
        <header className="mb-12 md:mb-16">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <Link
              href="/"
              className="font-editorial w-fit text-lg font-medium tracking-[-0.02em] text-black transition-opacity hover:opacity-70 md:text-xl"
            >
              {nameLower}
            </Link>
            <nav
              className="-mx-3 flex w-full min-w-0 snap-x snap-mandatory gap-0.5 overflow-x-auto overflow-y-hidden overscroll-x-contain px-3 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:w-auto sm:max-w-none sm:flex-wrap sm:justify-end sm:gap-x-1 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
              aria-label="Primary"
            >
              <Link href="/#about" className={`${navLinkClass} snap-start`} scroll>
                About
              </Link>
              <Link href="/#projects" className={`${navLinkClass} snap-start`} scroll>
                Work
              </Link>
              <Link href="/#skills" className={`${navLinkClass} snap-start`} scroll>
                Skills
              </Link>
              <Link href="/#contact" className={`${navLinkClass} snap-start`}>
                Contact
              </Link>
              <a
                href="/resume.pdf"
                className={`${navLinkClass} font-medium text-black hover:text-black`}
              >
                Resume
              </a>
            </nav>
          </div>

          <div className="font-editorial space-y-0.5 sm:space-y-1 md:space-y-2">
            <p className="text-[clamp(1.35rem,6.5vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em] text-black">
              hey there,
            </p>
            <p className="text-[clamp(1.35rem,6.5vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em] text-black">
              I&apos;m {site.person.firstName}.
            </p>
            <p className="text-[clamp(1.35rem,6.5vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em] text-neutral-500">
              {heroLocation}
            </p>
            <p className="pt-3 text-pretty text-[0.95rem] leading-relaxed text-neutral-500 sm:pt-4 sm:text-base md:text-lg">
              {heroTagline}
            </p>
          </div>

          <div className="mt-10 grid gap-8 sm:mt-12 sm:gap-10 md:mt-16 md:grid-cols-[minmax(0,360px)_1fr] md:items-start md:gap-12 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-16">
            <div className="mx-auto w-full max-w-[min(100%,26rem)] sm:max-w-2xl md:mx-0 md:max-w-none">
              <div className="relative aspect-[3/2] w-full max-h-[min(88vh,34rem)] overflow-hidden rounded-2xl bg-neutral-100 shadow-[0_16px_40px_rgba(0,0,0,0.08)] sm:max-h-[min(90vh,40rem)] md:aspect-[4/3] md:max-h-none lg:aspect-[3/2]">
                <Image
                  src={heroPortrait.src}
                  alt={heroPortrait.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: heroPortrait.objectPosition }}
                  sizes="(max-width: 640px) min(100vw,26rem), (max-width: 1024px) 360px, 460px"
                  priority
                />
              </div>
            </div>
            <div className="min-w-0 space-y-5 text-[0.9375rem] leading-[1.65] text-neutral-700 sm:space-y-6 sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed">
              {heroBioParagraphs.map((para, i) => (
                <p key={i} className="text-pretty">
                  {para}
                </p>
              ))}
              <p className="text-pretty text-sm font-medium leading-snug text-black sm:text-base">
                {educationLine}
              </p>
              <div className="flex items-center gap-1 pt-1 sm:gap-5 sm:pt-2">
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-black transition-opacity hover:bg-neutral-100 hover:opacity-90"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="h-5 w-5" />
                </a>
                <a
                  href={site.links.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-black transition-opacity hover:bg-neutral-100 hover:opacity-90"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <PortfolioSkillsSection />

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="mt-16 scroll-mt-20 sm:mt-20 md:mt-24 md:scroll-mt-24"
        >
          <h2
            id="projects-heading"
            className="text-[clamp(1.5rem,5vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.02em] text-black"
          >
            My work
          </h2>
          <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-neutral-600 sm:mt-3 md:text-base">
            A collection of my projects and experiences.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-12 xl:grid-cols-4">
            {workItems.map((item) => (
              <EditorialCard key={item.id} item={item} workStyle />
            ))}
          </div>
        </section>

        <section
          id="currently"
          aria-labelledby="currently-heading"
          className="mt-16 scroll-mt-20 sm:mt-20 md:mt-24 md:scroll-mt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={easeOut}
          >
            <PortfolioCurrentlyPanel bare />
          </motion.div>
        </section>

      </div>

      <PortfolioAbout omitHeaderContent />
      <PortfolioContact />
      <PortfolioFooter />
    </div>
  );
}
