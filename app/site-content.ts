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
    "I'm looking for a fall 2026 internship in flight software, embedded control, autonomy, or aerospace/defense-adjacent systems—somewhere hardware and software ship together.",
  humancomputerlab:
    "I'm a Robotic Systems Intern at the Human Computer Lab, focused on human–computer interaction and related research.",
  sdcn:
    "At York's Spacecraft Dynamics, Control and Navigation Laboratory I worked on dynamics, estimation, and navigation problems for spacecraft—control-oriented math meeting real simulation and analysis.",
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
- I'm looking for a fall 2026 internship and roles close to real systems:
  flight software, embedded control, autonomy, simulation, perception,
  aerospace, and defense-adjacent hardware–software integration.
- I am a Robotic Systems Intern at the Human Computer Lab.
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
};

export const currentlyItems: CurrentlyItem[] = [
  {
    id: "human-computer-lab",
    topic: "humancomputerlab",
    prefix: "robotic systems intern @",
    image: { src: "/humancomputerlab.jpeg", alt: "Human Computer Lab" },
    linkLabel: "Human Computer Lab",
    href: "https://www.humancomputerlab.com/",
    location: "San Francisco, CA",
  },
  {
    id: "sellstatic",
    topic: "sellstatic",
    prefix: "prev swe intern @",
    image: { src: "/sellstatic.jpeg", alt: "SellStatic" },
    linkLabel: "SellStatic",
    href: site.links.sellstatic,
    location: "Toronto, ON",
  },
  {
    id: "sdcn",
    topic: "sdcn",
    prefix: "prev drone research @",
    image: { src: "/SDCNLAB.jpeg", alt: "SDCN Lab" },
    linkLabel: "Spacecraft Dynamics, Control and Navigation Laboratory",
    href: "https://www.yorku.ca/jjshan/SDCNLab.html",
    location: "Toronto, ON",
  },
  {
    id: "utias",
    topic: "uoft",
    prefix: "prev drone research @",
    image: { src: "/utias.jpeg", alt: "UTIAS Flight Systems and Control Laboratory" },
    linkLabel: "UTIAS Flight Systems and Control Laboratory",
    href: "https://utias.utoronto.ca",
    location: "Toronto, ON",
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
    linkLabel: "looking for fall 2026 internships",
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
    company: "SellStatic",
    role: "Software Engineering Intern",
    period: "Sep 2025 — Jan 2026",
    url: site.links.sellstatic,
    location: "Toronto, ON",
  },
  {
    company: "Spacecraft Dynamics, Control and Navigation Lab",
    role: "Undergraduate Research Assistant",
    period: "Sep 2025 — Dec 2025",
    url: "https://www.yorku.ca/jjshan/SDCNLab.html",
    location: "Toronto, ON",
  },
  {
    company: "UTIAS Flight Systems and Control Laboratory",
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

/** Single-column home (owenli.ca-style): work history blocks. */
export type OwenWorkEntry = {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  note?: string;
  description?: string;
  /** Small logo / mark beside the entry. */
  thumb?: { src: string; alt: string };
};

export const owenWorkEntries: OwenWorkEntry[] = [
  {
    role: "Robotic Systems Intern",
    company: "Human Computer Lab",
    companyUrl: "https://www.humancomputerlab.com/",
    period: "2026",
    note: "San Francisco, CA",
    thumb: { src: "/humancomputerlab.jpeg", alt: "Human Computer Lab" },
  },
  {
    role: "Software Engineering Intern",
    company: "SellStatic",
    companyUrl: site.links.sellstatic,
    period: "Sep 2025 — Jan 2026",
    note: "Toronto, ON",
    thumb: { src: "/sellstatic.jpeg", alt: "SellStatic" },
  },
  {
    role: "Undergraduate Research Assistant",
    company: "Spacecraft Dynamics, Control and Navigation Laboratory",
    companyUrl: "https://www.yorku.ca/jjshan/SDCNLab.html",
    period: "Sep 2025 — Dec 2025",
    note: "Toronto, ON",
    description:
      "Spacecraft dynamics, estimation, and navigation—control-oriented research with simulation and analysis.",
    thumb: { src: "/SDCNLAB.jpeg", alt: "SDCN Lab" },
  },
  {
    role: "Research — Autonomous Drone Racing",
    company: "UTIAS Flight Systems and Control Laboratory",
    companyUrl: "https://utias.utoronto.ca",
    period: "Apr 2023 — Aug 2025",
    note: "Toronto, ON",
    description:
      "Onboard vision, ROS integration, and flight testing for high-speed autonomous navigation.",
    thumb: { src: "/utias.jpeg", alt: "UTIAS" },
  },
];
