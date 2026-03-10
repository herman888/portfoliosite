"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Press_Start_2P } from "next/font/google";
import AsciiAvatar from "./components/AsciiAvatar";
import { projects, Project } from "./projects/projects-data";

type SectionKey =
  | "age"
  | "projects"
  | "roles"
  | "drone"
  | "york"
  | "schulich"
  | "sellstatic"
  | "uoft"
  | "internships";

const promptOptions: { key: SectionKey; label: string }[] = [
  { key: "age", label: "How old are you?" },
  { key: "projects", label: "Tell me about projects" },
  { key: "roles", label: "Looking for what roles?" },
];

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const questionPrompts: Record<SectionKey, string> = {
  age: "What year were you born?",
  projects: "Can you walk me through your projects?",
  roles: "What roles are you looking for right now?",
  drone: "Can you tell me more about your drone racing work?",
  york: "What do you study at York University?",
  schulich: "What is the Schulich Leader Scholarship?",
  sellstatic: "What did you do as a SWE intern at SellStatic?",
  uoft: "What kind of research are you doing at U of T / UTIAS?",
  internships: "What kind of internships are you looking for?",
};

// Fallback answers used if the external chat API fails,
// so the chatbot always returns something reasonable.
const fallbackAnswers: Record<SectionKey, string> = {
  age: "I'm 18 years old, originally from Belarus, and studying Electrical Engineering at York University as a Schulich Leader. Old enough to have shipped real projects and research, young enough to still be obsessed with learning new stacks and building hardware–software hybrids.",
  projects:
    "I build things at the intersection of AI, robotics, and cities: CityPath AI (Shopify hackathon winner for city planning), RedLamp (UofTHacks winner, a stress-aware study lamp), GrowthSync (visualizes how new developments hit infrastructure), Finding N.E.M.O (interactive container-drift simulation), plus a bunch of Arduino and hardware builds tying sensors, motors, and code together.",
  roles:
    "I'm looking for roles close to real systems: backend and platform engineering, data or ML-heavy systems, and anything that touches autonomy, drones, or city-scale infrastructure problems.",
  drone:
    "The drone racing work I do at UTIAS is all about high-speed autonomy: building and tuning flight stacks, running both simulated races and real flights through gates, and analyzing trajectories to understand how close we can get to the physical limits.",
  york:
    "I study Electrical Engineering at York University, which means a mix of circuits, control, embedded systems, and math-heavy courses that pair nicely with the robotics and infrastructure projects I build outside class.",
  schulich:
    "The Schulich Leader Scholarship is a major STEM scholarship in Canada. It gives me the freedom to take on ambitious research, hackathons, and hardware-heavy projects without worrying as much about finances or part-time work.",
  sellstatic:
    "I was previously a SWE intern at SellStatic, working on systems that make it easier for teams to ship and monitor web experiences. I spent a lot of time on backend logic, data plumbing, and smoothing out the developer experience.",
  uoft:
    "At the University of Toronto / UTIAS I work on drone racing and autonomy—building and testing flight systems, running both real and simulated races, and helping with research on how we can make high-speed flight safer and more reliable.",
  internships:
    "I'm actively looking for internships where I can work on real systems—backend, data-heavy products, robotics, or infrastructure—ideally somewhere that touches autonomy, simulation, or large-scale city problems.",
};

type InViewResult = { ref: React.RefObject<HTMLDivElement | null>; inView: boolean };

function useInViewOnce(threshold = 0.2): InViewResult {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref, inView };
}

function TypewriterText({ text }: { text: string }) {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    setVisibleChars(0);
    const interval = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 18);

    return () => clearInterval(interval);
  }, [text]);

  return <p className="chat-text">{text.slice(0, visibleChars)}</p>;
}

function inferSectionFromQuestion(
  question: string,
  fallback: SectionKey
): SectionKey {
  const normalized = question.toLowerCase();

  if (
    normalized.includes("how old") ||
    normalized.includes("age") ||
    normalized.includes("year were you born") ||
    normalized.includes("born")
  ) {
    return "age";
  }
  if (
    normalized.includes("project") ||
    normalized.includes("build") ||
    normalized.includes("work on")
  ) {
    return "projects";
  }
  if (
    normalized.includes("role") ||
    normalized.includes("job") ||
    normalized.includes("position")
  ) {
    return "roles";
  }
  if (normalized.includes("intern") || normalized.includes("internship")) {
    return "internships";
  }
  if (
    normalized.includes("drone") ||
    normalized.includes("racing") ||
    normalized.includes("utias")
  ) {
    return "drone";
  }
  if (normalized.includes("york")) {
    return "york";
  }
  if (normalized.includes("schulich")) {
    return "schulich";
  }
  if (normalized.includes("sellstatic")) {
    return "sellstatic";
  }
  if (
    normalized.includes("uoft") ||
    normalized.includes("u of t") ||
    normalized.includes("university of toronto")
  ) {
    return "uoft";
  }

  return fallback;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionKey>("projects");
  const { ref: currentlyRef, inView: currentlyInView } = useInViewOnce();
  const { ref: projectsRef, inView: projectsInView } = useInViewOnce();
  const chatSectionRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const jumpToChat = (topic: SectionKey) => {
    setActiveSection(topic);
    setInputValue(questionPrompts[topic]);
    setAnswer("");
    setError(null);
    setTimeout(() => {
      chatSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 10);
  };

  // Audio playback removed for now; chat answers are text-only.

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;
    const inferredKey = inferSectionFromQuestion(inputValue, activeSection);
    setActiveSection(inferredKey);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: inputValue,
          topic: inferredKey,
        }),
      });

      if (!res.ok) {
        throw new Error("Chat request failed");
      }

      const data = (await res.json()) as { answer?: string };
      if (data.answer && data.answer.trim().length > 0) {
        setAnswer(data.answer);
      } else {
        setAnswer(fallbackAnswers[inferredKey]);
      }
    } catch (err) {
      console.error(err);
      // Fall back to deterministic canned answer for Herman-related topics
      setAnswer(fallbackAnswers[inferredKey]);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="hero-root min-h-screen w-full flex flex-col items-center justify-between py-0">
      {/* Name in its own top bar — drops down, then portrait sits clearly below */}
      <header className="hero-name-drop hero-name-block shrink-0 text-center relative z-10">
        <div
          className={`${pixelFont.className} pixel-hero-title text-[10px] md:text-xs`}
        >
          HERMAN
        </div>
        <div
          className={`${pixelFont.className} pixel-hero-subtitle mt-2 text-xl md:text-3xl`}
        >
          ISAYENKA
        </div>
      </header>

      {/* Portrait — well below the name, no overlap */}
      <section className="hero-content-reveal flex-1 flex items-center justify-center w-full min-h-0 max-h-[40vh] pt-48 md:pt-64">
        <div className="pixel-portrait hero-portrait-animate ascii-portrait-large">
          <AsciiAvatar />
        </div>
      </section>

      {/* Chat panel — below the image, aligned left */}
      <section
        ref={chatSectionRef}
        className="w-full max-w-4xl px-4 pt-10 md:pt-16 pb-2 md:pb-4 shrink-0 hero-content-reveal self-start ml-4 md:ml-8"
      >
        <div className="chat-panel chat-panel-animate px-4 py-3 md:px-6 md:py-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {promptOptions.map((option) => {
              const isActive = activeSection === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => {
                    setActiveSection(option.key);
                    setInputValue(questionPrompts[option.key]);
                    setAnswer("");
                    setError(null);
                  }}
                  className={`chat-prompt px-3 py-2 flex items-center gap-2 ${
                    isActive ? "chat-prompt-active" : ""
                  }`}
                >
                  <span className="text-sm leading-none">↳</span>
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-[#2a2a2a] pt-3 flex flex-col gap-2 text-xs md:text-sm text-gray-200">
            <div className="flex items-center justify-between gap-2 text-[0.7rem] text-gray-500">
              <span className="uppercase tracking-[0.2em]">
                Ask about Herman
              </span>
            </div>
            <div className="chat-input w-full mt-2 px-3 py-2 text-gray-200 min-h-[3.5rem]">
              {isLoading && (
                <p className="chat-text text-gray-500">Thinking...</p>
              )}
              {!isLoading && error && (
                <p className="chat-text text-red-400">{error}</p>
              )}
              {!isLoading && !error && answer && (
                <TypewriterText key={answer} text={answer} />
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                className="chat-input flex-1 px-3 py-2 bg-black text-gray-100 placeholder-gray-500"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder={questionPrompts[activeSection]}
              />
              <button
                type="button"
                className="chat-input w-8 h-8 flex items-center justify-center"
                onClick={handleSubmit}
                aria-label="Send"
              >
                ⌲
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Conversation mode + currently */}
      <section
        ref={currentlyRef}
        className={`w-full max-w-4xl mt-12 pl-4 pr-2 md:pl-8 md:pr-2 text-xs md:text-sm transition-all duration-700 self-start ${
          currentlyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="border-t border-[#2a2a2a] pt-4">
          <div className="about-me-terminal">
            <div className="tracking-[0.2em] uppercase text-[0.65rem] text-gray-500 mb-3 font-medium">
              Currently
            </div>
            <ul className="space-y-1.5 about-me-line">
              <li className="flex items-center gap-2">
                <span className="text-gray-500 select-none">▸</span>
                <span>engineering @</span>
                <span className="inline-flex shrink-0 w-6 h-6 rounded-sm overflow-hidden align-middle">
                  <Image
                    src="/york.png"
                    alt=""
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </span>
                <button
                  type="button"
                  onClick={() => jumpToChat("york")}
                  className="underline decoration-gray-500 underline-offset-1 hover:decoration-gray-300"
                >
                  York University
                </button>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500 select-none">▸</span>
                <span>recipient of $120,000</span>
                <span className="inline-flex shrink-0 w-6 h-6 rounded-sm overflow-hidden align-middle">
                  <Image
                    src="/schulich.jpeg"
                    alt=""
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </span>
                <button
                  type="button"
                  onClick={() => jumpToChat("schulich")}
                  className="underline decoration-gray-500 underline-offset-1 hover:decoration-gray-300"
                >
                  Schulich Leader Scholarship
                </button>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500 select-none">▸</span>
                <span>prev swe intern @</span>
                <span className="inline-flex shrink-0 w-6 h-6 rounded-sm overflow-hidden align-middle">
                  <Image
                    src="/sellstatic.jpeg"
                    alt=""
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </span>
                <button
                  type="button"
                  onClick={() => jumpToChat("sellstatic")}
                  className="underline decoration-gray-500 underline-offset-1 hover:decoration-gray-300"
                >
                  SellStatic
                </button>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500 select-none">▸</span>
                <span>research @</span>
                <span className="inline-flex shrink-0 w-6 h-6 rounded-sm overflow-hidden align-middle">
                  <Image
                    src="/utias.jpeg"
                    alt=""
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </span>
                <button
                  type="button"
                  onClick={() => jumpToChat("uoft")}
                  className="underline decoration-gray-500 underline-offset-1 hover:decoration-gray-300"
                >
                  University of Toronto
                </button>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500 select-none">▸</span>
                <button
                  type="button"
                  onClick={() => jumpToChat("internships")}
                  className="underline decoration-gray-500 underline-offset-1 hover:decoration-gray-300"
                >
                  seeking internships
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects section */}
      <section
        ref={projectsRef}
        className={`projects-section w-full max-w-5xl mt-16 px-4 py-12 md:py-16 relative transition-all duration-700 ${
          projectsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="projects-heading mb-8">
          <h2 className="uppercase text-gray-200 font-semibold text-sm tracking-widest shrink-0">
            Projects
          </h2>
          <div className="projects-heading-line" />
        </div>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-10 relative">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => jumpToChat("drone")}
            className="px-5 py-2 border border-[#2a2a2a] bg-black/40 hover:bg-black/70 text-[0.7rem] md:text-xs uppercase tracking-[0.25em]"
          >
            Learn more
          </button>
        </div>
      </section>

      {/* Footer — connect */}
      <footer className="footer-connect">
        <div className="footer-connect-inner">
          <div className="footer-connect-heading">
            <div className="footer-connect-heading-line" />
            <span>Connect</span>
            <div className="footer-connect-heading-line" />
          </div>
          <div className="footer-connect-links">
            <a href="mailto:herman.isayenka@gmail.com">Email</a>
            <span className="footer-connect-separator">/</span>
            <a
              href="https://www.linkedin.com/in/hermanisayenka/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <span className="footer-connect-separator">/</span>
            <a
              href="https://github.com/herman888"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="footer-connect-meta">
            DESIGNED &amp; BUILT BY HERMAN ISAYENKA
          </div>
        </div>
      </footer>
    </main>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const imageSrc = project.image ?? project.images?.[0];
  const caption = project.caption ?? project.description;
  const href = project.link ?? project.code ?? project.devpost;

  const cardContent = (
    <>
      <div className="relative w-full aspect-[4/3] bg-black overflow-hidden">
        {project.title === "Finding N.E.M.O (ConUHacks)" ? (
          <iframe
            title="Finding N.E.M.O Demo"
            src="https://www.youtube.com/embed/PQBeq-7WKRE"
            className="absolute inset-0 w-full h-full object-cover"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : null}
      </div>
      <div className="p-4 md:p-5">
        <h3 className="projects-card-title mb-1 leading-tight">
          {project.title}
        </h3>
        <p className="projects-card-subtitle leading-snug">
          {caption}
        </p>
      </div>
    </>
  );

  return (
    <article className="projects-card group rounded-lg flex flex-col">
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="flex flex-col h-full"
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </article>
  );
}
