import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolioTangent } from "@/app/site-content";
import { getEatsImagePaths } from "@/lib/eats-images";
import { PortfolioNavigation } from "@/components/portfolio/navigation";
import { PortfolioBackdrop } from "@/components/portfolio/portfolio-backdrop";
import { PortfolioFooter } from "@/components/portfolio/footer";

export default function RandomPage() {
  const eatsImages = getEatsImagePaths();

  return (
    <main className="relative min-h-screen bg-background text-foreground antialiased">
      <PortfolioBackdrop />
      <PortfolioNavigation />
      <section className="border-t border-border/80 pb-24 pt-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Home
          </Link>
          <h1 className="mb-10 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {portfolioTangent.title}
          </h1>

          {eatsImages.length > 0 ? (
            <ul
              className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3"
              aria-label="Food photos"
            >
              {eatsImages.map((src) => (
                <li
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/60 bg-muted/30"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </li>
              ))}
            </ul>
          ) : null}

          <p className="mt-12 text-xs text-muted-foreground">
            <Link
              href="/#about"
              className="inline-flex items-center gap-1 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Back to About
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
            </Link>
          </p>
        </div>
      </section>
      <PortfolioFooter />
    </main>
  );
}
