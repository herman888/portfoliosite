import Link from "next/link";
import type { ReactNode } from "react";

type Hero = {
  src: string;
  alt: string;
  /** `cover` fills the frame (no side letterboxing). `contain` only if you need the full uncropped photo. */
  variant?: "cover" | "contain";
  /** Outer box height, Tailwind classes. Default: readable hero on desktop. */
  heightClass?: string;
  /** CSS `object-position` for the image (e.g. `"center 45%"`). */
  objectPosition?: string;
};

type Props = {
  title: string;
  year: string;
  breadcrumb: string;
  hero?: Hero;
  children: ReactNode;
};

export function ProjectTechnicalArticle({
  title,
  year,
  breadcrumb,
  hero,
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-20">
        <nav className="mb-10 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <Link href="/projects" className="transition-colors hover:text-foreground">
            Projects
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-foreground">{breadcrumb}</span>
        </nav>

        {hero ? (
          <div className="mb-10 overflow-hidden rounded-xl border border-border bg-background shadow-sm ring-1 ring-black/[0.06]">
            <div
              className={`relative block w-full ${hero.heightClass ?? "h-52 md:h-64 lg:h-72"}`}
            >
              {/* Native <img>: avoids next/image + optimizer failures on some JPEGs from tooling exports */}
              <img
                src={hero.src}
                alt={hero.alt}
                className={
                  hero.variant === "contain"
                    ? "absolute inset-0 h-full w-full object-contain object-center"
                    : "absolute inset-0 h-full w-full object-cover"
                }
                style={{ objectPosition: hero.objectPosition ?? "center" }}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        ) : null}

        <header className="mb-10 border-b border-border pb-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {title}
            </h1>
            <span className="shrink-0 text-sm font-medium tabular-nums text-muted-foreground">
              {year}
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Technical write-up</p>
        </header>

        <div className="space-y-6 text-base leading-relaxed text-foreground">
          {children}
        </div>

        <div className="mt-14 flex flex-wrap gap-3 border-t border-border pt-10">
          <Link
            href="/projects"
            className="inline-flex rounded-md border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:opacity-90"
          >
            All projects
          </Link>
          <Link
            href="/"
            className="inline-flex rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/60"
          >
            Home
          </Link>
        </div>
      </article>
    </div>
  );
}

export function WriteupH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="pt-2 text-lg font-semibold tracking-tight text-foreground md:text-xl">
      {children}
    </h2>
  );
}

export function WriteupP({ children }: { children: ReactNode }) {
  return <p className="text-foreground">{children}</p>;
}

export function WriteupUl({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-foreground marker:text-muted-foreground">
      {children}
    </ul>
  );
}
