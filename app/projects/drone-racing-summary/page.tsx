import Link from "next/link";
import Image from "next/image";

export default function DroneRacingSummary() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-20">
        <nav className="mb-10 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <Link href="/projects" className="hover:text-foreground transition-colors">
            Projects
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-foreground">Drone racing</span>
        </nav>

        <div className="mb-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <a
            href="/team.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block h-48 w-full md:h-56"
          >
            <Image
              src="/team.jpg"
              alt="Drone racing team at UTIAS"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 42rem"
              priority
            />
          </a>
        </div>

        <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Image
            src="/utias.jpeg"
            alt="UTIAS"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border border-border object-cover"
          />
          <p className="text-center text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground sm:text-left">
            Associated with UTIAS Flight Systems and Control Laboratory
          </p>
        </div>

        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Drone racing project summary
        </h1>
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Three summers of work at the Flight System and Control Laboratory:
          data, training, hardware, simulation, and trajectory analysis.
        </p>

        <section className="mb-12 border-t border-border pt-10">
          <h2 className="mb-6 text-lg font-semibold text-foreground md:text-xl">
            Summer 2023: Data collection &amp; annotation
          </h2>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:w-48">
              <div className="relative aspect-[3/2] w-full sm:h-32">
                <Image
                  src="/data.png"
                  alt="Data collection"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground md:text-base">
              <li>Collected flight data from various drone test runs</li>
              <li>Annotated sensor readings and flight logs for supervised learning</li>
              <li>Developed scripts for automated data preprocessing</li>
              <li>Collaborated with lab members to refine annotation protocols</li>
            </ul>
          </div>
        </section>

        <section className="mb-12 border-t border-border pt-10">
          <h2 className="mb-6 text-lg font-semibold text-foreground md:text-xl">
            Summer 2024: Data training &amp; hardware integration
          </h2>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:w-48">
              <div className="relative aspect-[3/2] w-full bg-muted sm:h-32">
                <Image
                  src="/testdrone.jpg"
                  alt="Hardware integration"
                  fill
                  className="object-contain object-left-top p-1"
                  sizes="192px"
                />
              </div>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground md:text-base">
              <li>Trained models on collected flight data</li>
              <li>Integrated trained models with drone hardware for real-time testing</li>
              <li>Conducted component test flights and performance evaluations</li>
              <li>Set up CI/CD pipelines for rapid deployment and testing</li>
            </ul>
          </div>
        </section>

        <section className="mb-14 border-t border-border pt-10">
          <h2 className="mb-6 text-lg font-semibold text-foreground md:text-xl">
            Summer 2025: Simulation &amp; trajectory analysis
          </h2>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:w-48">
              <div className="relative aspect-[3/2] w-full sm:h-32">
                <Image
                  src="/simulation.png"
                  alt="Simulation"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground md:text-base">
              <li>Simulated drone trajectories using Simulink and Gazebo</li>
              <li>Analyzed flight paths and optimized control algorithms</li>
              <li>Developed tools for visualizing and comparing simulated vs. real flight data</li>
              <li>Documented findings and contributed to lab publications</li>
            </ul>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 border-t border-border pt-10">
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
