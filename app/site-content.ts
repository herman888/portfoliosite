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
  | "internships"
  | "humancomputerlab"
  | "sdcn";

const githubProfile = "herman888";

export const site = {
  url: "https://hermanisayenka.ca",
  person: {
    firstName: "Herman",
    lastName: "Isayenka",
    /** One-line role for meta / OG. */
    headline:
      "Electrical Engineering student building autonomy for aerospace, space, and defense.",
    /** Shown under your name on the classic profile block. */
    roleLine: "EE @ YorkU · Autonomy · Space · Defense",
    displayTitle: "Aerospace & Defense Portfolio",
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
    x: "https://x.com/hermanisayenka",
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
  humancomputerlab: "What is your role at the Human Computer Lab?",
  sdcn: "What did you do at the Spacecraft Dynamics, Control and Navigation Lab?",
};

export const fallbackAnswers: Record<SectionKey, string> = {
  age: `I'm ${site.person.age} years old, originally from ${site.person.origin}, and studying Electrical Engineering at York University as a Schulich Leader. Old enough to have shipped real projects and research, young enough to still be obsessed with learning new stacks and building hardware–software hybrids.`,
  projects:
    "Most of my work sits at the intersection of flight software and hardware: drone defence (Project L.A.R.P), autonomous UAV navigation at UTIAS, fixed-wing airframe builds, onboard vision with ROS, and spacecraft dynamics research at York's SDCN Lab—plus hackathon prototypes when there's time.",
  roles:
    "I'm looking for roles in autonomy, aerospace, and defense-adjacent systems: flight software, embedded control, perception for UAVs, simulation, and anything that ships on real hardware—not just slides.",
  drone:
    "The drone racing work I do at UTIAS is all about high-speed autonomy: building and tuning flight stacks, running both simulated races and real flights through gates, and analyzing trajectories to understand how close we can get to the physical limits.",
  york:
    "I study Electrical Engineering at York University, which means a mix of circuits, control, embedded systems, and math-heavy courses that pair nicely with the robotics and infrastructure projects I build outside class.",
  schulich:
    "The Schulich Leader Scholarship is a major STEM scholarship in Canada. It gives me the freedom to take on ambitious research, hackathons, and hardware-heavy projects without worrying as much about finances or part-time work.",
  sellstatic:
    "I was previously a SWE intern at SellStatic, working on systems that make it easier for teams to ship and monitor web experiences. I spent a lot of time on backend logic, data plumbing, and smoothing out the developer experience.",
  uoft:
    "At UTIAS I worked on high-speed drone autonomy—onboard vision, ROS integration, controller tuning, and closing the loop from simulation to flight tests through gates and structured logs.",
  internships:
    "I'm looking for a summer 2027 internship in flight software, embedded control, autonomy, or aerospace/defense-adjacent systems—somewhere hardware and software ship together.",
  humancomputerlab:
    "I'm an Embedded System Engineer Intern at the Human Computer Lab in the San Francisco Bay Area, working on human–computer interaction and related research.",
  sdcn:
    "At York's Spacecraft Dynamics, Control and Navigation Laboratory I worked as a UAV Simulation Researcher—building simulation pipelines and bridging sim to hardware.",
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
- Focus areas: aerospace autonomy, UAV perception & control, spacecraft dynamics, defense-adjacent flight systems.
- Project L.A.R.P — drone defence system (hands-on build + demo).
- UTIAS Flight Systems & Control Lab — onboard vision, ROS, autonomous navigation, flight testing.
- SDCN Lab (York) — spacecraft dynamics, control, and navigation research.
- Fixed-wing UAV airframe design, Simulink/Gazebo co-simulation, YOLO gate detection pipelines.
- Also: hackathon builds (CityPath AI, RedLamp, etc.) and Arduino hardware projects.
- I was previously a SWE intern at SellStatic.
- My favourite sports are ${site.person.interests.sports.join(", ")}.
- I'm looking for a summer 2027 internship and roles close to real systems:
  flight software, embedded control, autonomy, simulation, perception,
  aerospace, and defense-adjacent hardware–software integration.
- I am an Embedded System Engineer Intern at the Human Computer Lab (San Francisco Bay Area).
- FSC Lab (UTIAS): 2x intern — UAV Controls Research Intern (May 2025 – Sep 2025) and Computer Vision Research Intern (Apr 2023 – Sep 2023).
- UTIAS: UAV Navigation Research Intern (May 2024 – Sep 2024).
- SDCNLab: UAV Simulation Researcher (Sep 2025 – Dec 2025).
`.trim();

export type AboutBriefMode = "drone" | "space" | "defense";

export const aboutBriefs: Record<
  AboutBriefMode,
  { title: string; body: string }
> = {
  drone: {
    title: "Autonomy / Flight stacks",
    body: "High-speed UAV work at UTIAS: onboard vision, ROS graphs, controller tuning, and flight tests where latency and reliability matter as much as the algorithm on paper.",
  },
  space: {
    title: "Spacecraft dynamics & navigation",
    body: "Research at York's SDCN Lab on estimation, control, and navigation for spacecraft—problems where small errors compound fast and the model has to respect physics.",
  },
  defense: {
    title: "Defense-adjacent systems",
    body: "Project L.A.R.P and related builds: integrating sensors, actuators, and software into platforms meant to operate under stress—defence-oriented demos with real hardware in the loop.",
  },
};

export type CurrentlyItem = {
  /** Stable key for lists (topics may repeat for chat routing). */
  id: string;
  topic: SectionKey;
  /** Text before the optional logo + link (omit for link-only rows). */
  prefix?: string;
  image?: { src: string; alt: string };
  linkLabel: string;
  /** Used by the portfolio About “Currently” panel (terminal UI still uses topic). */
  href?: string;
  /** Shown after the link in the Currently list (e.g. city, province/state). */
  location?: string;
  /** Optional trailing detail after the link label. */
  suffix?: string;
};

export const currentlyItems: CurrentlyItem[] = [
  {
    id: "human-computer-lab",
    topic: "humancomputerlab",
    prefix: "embedded systems engineer intern @",
    image: { src: "/humancomputerlab.jpeg", alt: "Human Computer Lab" },
    linkLabel: "Human Computer Lab",
    href: "https://www.humancomputerlab.com/",
    location: "San Francisco Bay Area",
  },
  {
    id: "project-larp",
    topic: "projects",
    prefix: "building",
    linkLabel: "Project L.A.R.P.",
    suffix: " — counter-UAS (500k+ views, vc interest, sf offers)",
  },
  {
    id: "schulich",
    topic: "schulich",
    prefix: `recipient of ${site.person.scholarshipAmount}`,
    image: { src: "/schulich.jpeg", alt: "Schulich Leader" },
    linkLabel: "Schulich Leader",
    href: site.links.schulichLeaders,
  },
  {
    id: "york-eng",
    topic: "york",
    prefix: "electrical engineering @",
    image: { src: "/york.png", alt: "York University" },
    linkLabel: "York University",
    href: "https://yorku.ca",
  },
  {
    id: "internships",
    topic: "internships",
    linkLabel: "looking for summer 2027 internships",
    href: "/#contact",
  },
];

/** Fiona-style hero — location line under “I’m …”. */
export const heroLocation = "Toronto, ON";

/** Short line under name on the home hero (editorial layout). */
export const heroTagline =
  "building where software, hardware, and real systems meet";

/** Two paragraphs beside / below the portrait on the home hero. */
export const heroBioParagraphs: [string, string] = [
  "I work where code meets airframes, sensors, and control—UAV autonomy at UTIAS, spacecraft dynamics at York's SDCN Lab, and hands-on defense-oriented builds like Project L.A.R.P.",
  "Most of my time goes to perception pipelines, ROS integration, simulation before flight, and hardware that has to survive real tests—not just look good in a deck.",
];

export const educationLine = `Electrical Engineering @ York University · Schulich Leader`;

export const heroPortrait = {
  src: "/newpicture.png",
  alt: `Photo by ${site.person.firstName} ${site.person.lastName}`,
  /** `object-position` for next/image — sit higher to crop baked-in bars/captions at the bottom. */
  objectPosition: "center 28%" as const,
} as const;

export type PortfolioSkillCategory =
  | "languages"
  | "web"
  | "embedded"
  | "tools"
  | "research";

export type PortfolioSkill = {
  name: string;
  category: PortfolioSkillCategory;
};

export const portfolioSkillTabLabels: Record<PortfolioSkillCategory, string> = {
  languages: "Languages",
  web: "Web",
  embedded: "Embedded",
  tools: "Tools",
  research: "Research",
};

export const portfolioSkills: PortfolioSkill[] = [
  { name: "Python", category: "languages" },
  { name: "TypeScript", category: "languages" },
  { name: "JavaScript", category: "languages" },
  { name: "C++", category: "languages" },
  { name: "React", category: "web" },
  { name: "Next.js", category: "web" },
  { name: "Node.js", category: "web" },
  { name: "HTML", category: "web" },
  { name: "CSS", category: "web" },
  { name: "Tailwind CSS", category: "web" },
  { name: "Arduino", category: "embedded" },
  { name: "ROS", category: "embedded" },
  { name: "OpenCV", category: "embedded" },
  { name: "Git", category: "tools" },
  { name: "Gazebo", category: "research" },
  { name: "Simulink", category: "research" },
];

export const fullName = `${site.person.firstName} ${site.person.lastName}`;

export const navInitials =
  `${site.person.firstName[0]}${site.person.lastName[0]}`.toUpperCase();

/** Two-sentence blurb for the portfolio About section on the home page. */
export const portfolioAbout =
  "Electrical engineering student focused on aerospace autonomy, spacecraft dynamics, and defense-adjacent flight systems—closing the gap between simulation, onboard software, and hardware that actually flies.";

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

export const portfolioExperience: PortfolioExperience[] = [
  {
    company: "Human Computer Lab",
    role: "Embedded System Engineer Intern",
    period: "May 2026 — Present",
    url: "https://www.humancomputerlab.com/",
    location: "San Francisco Bay Area",
    highlight: "South Park Commons, FR8",
  },
  {
    company: "SellStatic",
    role: "Software Engineering Intern",
    period: "Sep 2025 — Jan 2026",
    url: site.links.sellstatic,
    location: "Toronto, ON · On-site",
    highlight: "frontend, backend, infra",
  },
  {
    company: "Spacecraft Dynamics, Control and Navigation Laboratory (SDCNLab)",
    role: "UAV Simulation Researcher",
    period: "Sep 2025 — Dec 2025",
    url: "https://www.yorku.ca/jjshan/SDCNLab.html",
    location: "Vaughan, ON",
    highlight: "sim → hardware",
  },
  {
    company: "Flight Systems and Control Laboratory (FSC Lab)",
    role: "2x Intern — UAV Controls & Computer Vision Research",
    period: "Apr 2023 — Sep 2025",
    url: "https://utias.utoronto.ca",
    location: "Toronto, ON",
    highlight:
      "UAV Controls Research Intern (May 2025 – Sep 2025) · Computer Vision Research Intern (Apr 2023 – Sep 2023)",
  },
  {
    company: "University of Toronto Institute for Aerospace Studies (UTIAS)",
    role: "UAV Navigation Research Intern",
    period: "May 2024 — Sep 2024",
    url: "https://utias.utoronto.ca",
    location: "Toronto, ON · Hybrid",
    highlight: "AI & Computer Vision",
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
    detail: "frontend, backend, infra",
  },
  {
    kind: "research",
    topic: "UAV simulation",
    institution: "SDCNLab",
  },
  {
    kind: "research",
    topic: "UAV controls & computer vision (2x intern)",
    institution: "FSC Lab, UTIAS",
  },
];

/** Single-column home: work history blocks. */
export type WorkEntry = {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  note?: string;
  description?: string;
  /** Small logo / mark beside the entry. */
  thumb?: { src: string; alt: string };
};

export const workEntries: WorkEntry[] = [
  {
    role: "Embedded System Engineer Intern",
    company: "Human Computer Lab",
    companyUrl: "https://www.humancomputerlab.com/",
    period: "May 2026 — Present",
    note: "San Francisco Bay Area · South Park Commons, FR8",
    thumb: { src: "/humancomputerlab.jpeg", alt: "Human Computer Lab" },
  },
  {
    role: "Software Engineering Intern",
    company: "SellStatic",
    companyUrl: site.links.sellstatic,
    period: "Sep 2025 — Jan 2026",
    note: "Toronto, ON · On-site · frontend, backend, infra",
    thumb: { src: "/sellstatic.jpeg", alt: "SellStatic" },
  },
  {
    role: "UAV Simulation Researcher",
    company: "Spacecraft Dynamics, Control and Navigation Laboratory (SDCNLab)",
    companyUrl: "https://www.yorku.ca/jjshan/SDCNLab.html",
    period: "Sep 2025 — Dec 2025",
    note: "Vaughan, ON · sim → hardware",
    thumb: { src: "/SDCNLAB.jpeg", alt: "SDCN Lab" },
  },
  {
    role: "UAV Controls Research Intern",
    company: "Flight Systems and Control Laboratory (FSC Lab)",
    companyUrl: "https://utias.utoronto.ca",
    period: "May 2025 — Sep 2025",
    note: "Toronto, ON · 2x Intern · AI & Computer Vision",
    thumb: { src: "/utias-fsc.jpeg", alt: "UTIAS FSC Lab" },
  },
  {
    role: "UAV Navigation Research Intern",
    company: "University of Toronto Institute for Aerospace Studies (UTIAS)",
    companyUrl: "https://utias.utoronto.ca",
    period: "May 2024 — Sep 2024",
    note: "Toronto, ON · Hybrid · AI & Computer Vision",
    thumb: { src: "/utias.jpeg", alt: "UTIAS" },
  },
  {
    role: "Computer Vision Research Intern",
    company: "Flight Systems and Control Laboratory (FSC Lab)",
    companyUrl: "https://utias.utoronto.ca",
    period: "Apr 2023 — Sep 2023",
    note: "Toronto, ON · Hybrid · 2x Intern · AI & Computer Vision",
    thumb: { src: "/utias-fsc.jpeg", alt: "UTIAS FSC Lab" },
  },
];
