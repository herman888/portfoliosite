import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolioTangent } from "@/app/site-content";
import { PortfolioNavigation } from "@/components/portfolio/navigation";
import { PortfolioBackdrop } from "@/components/portfolio/portfolio-backdrop";
import { PortfolioFooter } from "@/components/portfolio/footer";

export default function RandomPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground antialiased">
      <PortfolioBackdrop />
      <PortfolioNavigation />
      <section className="border-t border-border/80 px-6 pb-24 pt-32 md:px-10 lg:px-24">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Home
          </Link>
          <h1 className="mb-10 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {portfolioTangent.title}
          </h1>
          <div className="rounded-lg border border-dashed border-border/80 bg-muted/20 px-5 py-6">
            <p className="max-w-xl text-lg leading-relaxed text-foreground md:text-xl">
              {portfolioTangent.body}
            </p>
          </div>
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
