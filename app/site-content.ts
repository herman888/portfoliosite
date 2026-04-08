/** Chat + terminal topic keys used across the home page. */
export type SectionKey =
  | "age"
  | "projects"
  | "roles"
  | "drone"
  | "york"
  | "schulich"
  | "sellstatic"
  | "uoft"
  | "internships";

const githubProfile = "herman888";

export const site = {
  url: "https://hermanisayenka.ca",
  person: {
    firstName: "Herman",
    lastName: "Isayenka",
    /** One-line role for meta / OG. */
    headline: "Electrical Engineering student at York University.",
    /** Shown under your name on the classic profile block. */
    roleLine: "Electrical Engineering @ YorkU, Schulich Leader",
    displayTitle: "Developer Portfolio",
    age: 18,
    origin: "Belarus",
    scholarshipAmount: "$120,000",
    interests: {
      sports: ["hockey", "tennis", "rock climbing"] as const,
    },
  },
  links: {
    email: "herman.isayenka@gmail.com",
    linkedIn: "https://www.linkedin.com/in/hermanisayenka/",
    sellstatic: "https://www.sellstatic.com/",
    schulichLeaders: "https://www.schulichleaders.ca/",
    githubProfile,
    github: `https://github.com/${githubProfile}`,
    twitterCreator: "@hermanisayenka",
  },
} as const;

export const promptOptions: { key: SectionKey; label: string }[] = [
  { key: "age", label: "How old are you?" },
  { key: "projects", label: "Tell me about projects" },
  { key: "roles", label: "Looking for what roles?" },
];

export const questionPrompts: Record<SectionKey, string> = {
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

export const fallbackAnswers: Record<SectionKey, string> = {
  age: `I'm ${site.person.age} years old, originally from ${site.person.origin}, and studying Electrical Engineering at York University as a Schulich Leader. Old enough to have shipped real projects and research, young enough to still be obsessed with learning new stacks and building hardware–software hybrids.`,
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

/** Groq system prompt — keep in sync with fallback facts. */
export const chatSystemContext = `
You are a portfolio chatbot answering in the first person as ${site.person.firstName} ${site.person.lastName}.

When the user asks about ${site.person.firstName} (background, projects, internships, interests,
age, etc.), you MUST base your answer only on the facts below. If you don't
know something specific about ${site.person.firstName}, say you don't know instead of making it up.

For general questions that are not about ${site.person.firstName} (math, coding, tech, random
knowledge), answer like a normal helpful AI assistant.

- I'm ${site.person.age} years old and originally from ${site.person.origin}.
- I'm a Schulich Leader studying Electrical Engineering at York University.
- I build projects at the intersection of AI, robotics, and cities:
  - CityPath AI (Shopify hackathon winner for city planning).
  - RedLamp (UofTHacks winner, a stress-aware study lamp).
  - GrowthSync (visualizes how new developments hit infrastructure).
  - Finding N.E.M.O (interactive container-drift simulation).
  - Multiple Arduino and hardware projects tying sensors, motors, and code together.
- I work on drone racing and autonomy research at U of T / UTIAS.
- I was an undergraduate research assistant at SDCN Lab (York) from Sep 2025 to Dec 2025.
- I was previously a SWE intern at SellStatic.
- My favourite sports are ${site.person.interests.sports.join(", ")}.
- I'm looking for internships and roles close to real systems:
  backend and platform engineering, data/ML-heavy systems, robotics,
  autonomy, simulation, and city-scale infrastructure problems.
`.trim();

export type AboutBriefMode = "drone" | "air" | "city";

export const aboutBriefs: Record<
  AboutBriefMode,
  { title: string; body: string }
> = {
  drone: {
    title: "Autonomy / Flight stacks",
    body: "I build high-speed autonomy: tuning flight controllers, analyzing trajectories, and testing both simulated and real races. Speed is the constraint; reliability is the goal.",
  },
  air: {
    title: "Control / Systems thinking",
    body: 'I like problems where dynamics meet software: estimation, planning, and robust control. The "why" matters as much as the "it flies."',
  },
  city: {
    title: "AI / Infrastructure for cities",
    body: "CityPath AI connects planning with data-driven experiments—spotting dangerous patterns, evaluating options, and shrinking the time from problem to practical roadmaps.",
  },
};

export type CurrentlyItem = {
  topic: SectionKey;
  /** Text before the optional logo + link (omit for link-only rows). */
  prefix?: string;
  image?: { src: string; alt: string };
  linkLabel: string;
};

export const currentlyItems: CurrentlyItem[] = [
  {
    topic: "york",
    prefix: "engineering @",
    image: { src: "/york.png", alt: "York University" },
    linkLabel: "York University",
  },
  {
    topic: "schulich",
    prefix: `recipient of ${site.person.scholarshipAmount}`,
    image: { src: "/schulich.jpeg", alt: "Schulich Leader Scholarship" },
    linkLabel: "Schulich Leader Scholarship",
  },
  {
    topic: "sellstatic",
    prefix: "prev swe intern @",
    image: { src: "/sellstatic.jpeg", alt: "SellStatic" },
    linkLabel: "SellStatic",
  },
  {
    topic: "uoft",
    prefix: "research @",
    image: { src: "/utias.jpeg", alt: "University of Toronto" },
    linkLabel: "University of Toronto",
  },
  {
    topic: "internships",
    linkLabel: "seeking internships",
  },
];

export const fullName = `${site.person.firstName} ${site.person.lastName}`;

export const navInitials =
  `${site.person.firstName[0]}${site.person.lastName[0]}`.toUpperCase();

/** v0-style About section */
export const portfolioSkills = [
  "Python",
  "C/C++",
  "Arduino",
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
] as const;

/** Two-sentence blurb for the portfolio About section on the home page. */
export const portfolioAbout =
  "I'm genuinely interested in software and robotics, and I like going deep on both. I spend most of my time building and learning where code meets hardware, control, and real-world problems.";

/** Short off-script note — reserved when eats page is re-enabled. */
export const portfolioTangent = {
  title: "eats",
  body: "Offline you'll usually find me on skates, a climbing wall, or a trail — anything that isn't waiting on a build.",
} as const;

export type PortfolioExperience = {
  company: string;
  role: string;
  period: string;
  url: string;
  highlight?: string;
  location?: string;
};

/** Shown under About — kept separate from work experience. */
export const portfolioEducation: PortfolioExperience[] = [
  {
    company: "York University",
    role: "Electrical Engineering",
    period: "2025 — Present",
    url: "https://yorku.ca",
  },
];

export const portfolioExperience: PortfolioExperience[] = [
  {
    company: "SellStatic",
    role: "Software Engineering Intern",
    period: "Sep 2025 — Jan 2026",
    url: site.links.sellstatic,
    location: "Toronto, ON",
  },
  {
    company: "SDCN Lab",
    role: "Undergraduate Research Assistant",
    period: "Sep 2025 — Dec 2025",
    url: "https://www.yorku.ca/jjshan/SDCNLab.html",
    location: "Toronto, ON",
  },
  {
    company: "UTIAS Flight Systems and Control Lab",
    role: "Research — Autonomous Drone Racing",
    period: "Apr 2023 — Aug 2025",
    url: "https://utias.utoronto.ca",
    location: "Toronto, ON",
  },
];

/** Longer bio for `ProfileSection` (light-theme home variant). */
export const profileAbout =
  "Interested in software (especially big data), robotics, and autonomous systems—but also in hardware: building things with my hands, soldering, and working with circuits. I love projects that combine both software and hardware, letting me bridge the digital and physical worlds.";

export type ProfilePastItem =
  | { kind: "intern"; org: string; detail: string }
  | { kind: "research"; topic: string; institution: string };

export const profilePastItems: ProfilePastItem[] = [
  {
    kind: "intern",
    org: "SellStatic",
    detail: "Cloud infra, backend, frontend",
  },
  {
    kind: "research",
    topic: "Drone vision",
    institution: "University of Toronto",
  },
];
