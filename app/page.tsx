import { PortfolioNavigation } from "@/components/portfolio/navigation";
import { PortfolioHero } from "@/components/portfolio/hero";
import { PortfolioAbout } from "@/components/portfolio/about";
import { PortfolioExperience } from "@/components/portfolio/experience";
import { PortfolioProjects } from "@/components/portfolio/projects";
import { PortfolioContact } from "@/components/portfolio/contact";
import { PortfolioFooter } from "@/components/portfolio/footer";
import { PortfolioBackdrop } from "@/components/portfolio/portfolio-backdrop";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground antialiased">
      <PortfolioBackdrop />
      <PortfolioNavigation />
      <PortfolioHero />
      <PortfolioAbout />
      <PortfolioExperience />
      <PortfolioProjects />
      <PortfolioContact />
      <PortfolioFooter />
    </main>
  );
}
