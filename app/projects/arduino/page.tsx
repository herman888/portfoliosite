"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

type ArduinoProject = {
  title: string;
  description: string;
  video?: string;
  image?: string;
  schematic?: string;
  imageStyle?: CSSProperties;
};

const HEATED_DRIVEWAY_REPO = "https://github.com/herman888/heated-driveway";

const ARDUINO_ANCHORS = [
  "car-obstacle",
  "car-line-follower",
  "water-pump",
  "digital-timer",
  "digital-clock",
] as const;

const arduinoProjects: ArduinoProject[] = [
  {
    title: "Car with obstacle detection",
    description:
      "An Arduino-powered car that uses sensors to detect and avoid obstacles.",
    video: "/car.mov",
  },
  {
    title: "Car line follower",
    description:
      "A car that follows a line using infrared sensors and Arduino logic.",
    image: "/car.jpg",
    imageStyle: { objectFit: "cover", objectPosition: "center 80%" },
  },
  {
    title: "Autonomous water pump",
    description:
      "A smart water pump system that automatically waters plants based on soil moisture.",
    image: "/water.jpg",
  },
  {
    title: "Digital timer",
    description:
      "A digital timer built with Arduino for precise timing. I used a 555 timer IC and designed the schematic in EasyEDA.",
    video: "/timer.mp4",
    schematic: "/schematic.png",
  },
  {
    title: "Digital clock",
    description:
      "A digital clock using Arduino and a 7-segment display.",
    video: "/clock.mp4",
  },
];

/** Fixed 16:9 slot: media is absolutely positioned so portrait video cannot stretch the card. */
function MediaSlot({ project }: { project: ArduinoProject }) {
  if (project.video) {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
        <video
          src={project.video}
          controls
          controlsList="nodownload"
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }
  if (project.image) {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element -- local assets + onError fallback */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
          style={project.imageStyle}
          onError={(e) => {
            const el = e.currentTarget;
            if (!el.src.endsWith("/fallback.png")) {
              el.src = "/fallback.png";
            }
          }}
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-video w-full items-center justify-center bg-muted text-sm text-muted-foreground">
      No media
    </div>
  );
}

function ProjectCard({
  project,
  anchorId,
}: {
  project: ArduinoProject;
  anchorId: string;
}) {
  return (
    <article
      id={anchorId}
      className="scroll-mt-28 flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <MediaSlot project={project} />
      <div className="flex min-h-[8.5rem] flex-1 flex-col p-4 md:p-5">
        <h2 className="font-sans text-base font-semibold leading-snug tracking-tight text-foreground">
          {project.title}
        </h2>
        <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        {project.schematic ? (
          <button
            type="button"
            className="mt-3 inline-flex w-fit items-center justify-center rounded-md border border-border bg-muted/60 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            onClick={() => window.open(project.schematic, "_blank")}
          >
            View schematic
          </button>
        ) : null}
      </div>
    </article>
  );
}

function HeatedDrivewayCard() {
  return (
    <a
      id="heated-driveway"
      href={HEATED_DRIVEWAY_REPO}
      target="_blank"
      rel="noopener noreferrer"
      className="group scroll-mt-28 flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm outline-none transition-shadow duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/heateddriveway.png"
          alt="Heated driveway project"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          onError={(e) => {
            const el = e.currentTarget;
            if (!el.src.endsWith("/fallback.png")) {
              el.src = "/fallback.png";
            }
          }}
        />
      </div>
      <div className="flex min-h-[8.5rem] flex-1 flex-col p-4 md:p-5">
        <h2 className="font-sans text-base font-semibold leading-snug tracking-tight text-foreground">
          Heated driveway
        </h2>
        <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-muted-foreground">
          Snow-detection and heating controller: moisture and temperature on Arduino,
          relay state machine, plus dashboards—see the repo for hardware pinout and
          calibration notes.
        </p>
        <span className="mt-3 text-xs font-medium text-foreground underline underline-offset-4 decoration-foreground/30 group-hover:decoration-foreground/60">
          github.com/herman888/heated-driveway →
        </span>
      </div>
    </a>
  );
}

export default function ArduinoProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <nav className="mb-10 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <Link href="/projects" className="transition-colors hover:text-foreground">
            Projects
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-foreground">Hardware</span>
        </nav>

        <header className="mb-12 max-w-2xl">
          <h1 className="font-sans text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Arduino &amp; hardware projects
          </h1>
          <p className="mt-3 font-sans text-base leading-relaxed text-muted-foreground">
            Builds with microcontrollers, sensors, and simple circuits—demos and
            photos from the bench. Each tile uses the same layout so the grid stays
            even.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {arduinoProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              anchorId={ARDUINO_ANCHORS[i] ?? `arduino-${i}`}
              project={project}
            />
          ))}
          <HeatedDrivewayCard />
        </div>

        <p className="mt-14">
          <Link
            href="/projects"
            className="font-sans text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/25 hover:decoration-foreground/50"
          >
            ← All projects
          </Link>
        </p>
      </div>
    </div>
  );
}
