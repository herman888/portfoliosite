/** CDN SVGs from Devicon (MIT). */
export function deviconIcon(iconFile: string): string {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconFile}.svg`;
}

export type SkillCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "tools"
  | "design";

export type SkillFilterId = "all" | SkillCategory;

export const SKILL_FILTER_TABS: { id: SkillFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "languages", label: "Languages" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools" },
  { id: "design", label: "Design" },
];

export type SkillItem = {
  label: string;
  categories: SkillCategory[];
  /** Devicon path like `python/python-original`, or null for text fallback */
  icon: string | null;
  /** Short text when `icon` is null */
  abbr?: string;
};

/**
 * Inferred from portfolio: drone research, hackathon web stacks, CV/NLP, and Arduino builds.
 */
export const PORTFOLIO_SKILLS: SkillItem[] = [
  { label: "Arduino", categories: ["tools"], icon: "arduino/arduino-original" },
  { label: "C++", categories: ["languages"], icon: "cplusplus/cplusplus-original" },
  { label: "CSS", categories: ["frontend"], icon: "css3/css3-original" },
  { label: "Figma", categories: ["design"], icon: "figma/figma-original" },
  { label: "Git", categories: ["tools"], icon: "git/git-original" },
  { label: "GitHub", categories: ["tools"], icon: "github/github-original" },
  { label: "HTML", categories: ["frontend"], icon: "html5/html5-original" },
  { label: "JavaScript", categories: ["languages", "frontend"], icon: "javascript/javascript-original" },
  { label: "Next.js", categories: ["frontend"], icon: "nextjs/nextjs-original" },
  { label: "Node.js", categories: ["backend"], icon: "nodejs/nodejs-original" },
  /** Devicon CDN often blocks or omits brand; text tile. */
  { label: "OpenAI", categories: ["tools"], icon: null, abbr: "AI" },
  { label: "OpenCV", categories: ["tools"], icon: "opencv/opencv-original" },
  { label: "Python", categories: ["languages"], icon: "python/python-original" },
  { label: "React", categories: ["frontend"], icon: "react/react-original" },
  { label: "ROS", categories: ["tools"], icon: "ros/ros-original" },
  { label: "Shopify", categories: ["tools"], icon: null, abbr: "Sh" },
  { label: "Simulink", categories: ["tools"], icon: "matlab/matlab-original" },
  { label: "Tailwind CSS", categories: ["frontend"], icon: "tailwindcss/tailwindcss-original" },
  { label: "Three.js", categories: ["frontend"], icon: "threejs/threejs-original" },
  { label: "TypeScript", categories: ["languages"], icon: "typescript/typescript-original" },
  { label: "VS Code", categories: ["tools"], icon: "vscode/vscode-original" },
  { label: "Vercel", categories: ["tools"], icon: "vercel/vercel-original" },
  { label: "Gazebo", categories: ["tools"], icon: null, abbr: "Gz" },
  { label: "EasyEDA", categories: ["tools"], icon: null, abbr: "EE" },
];
