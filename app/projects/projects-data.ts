import { site } from "../site-content";

const gh = (repo: string) =>
  `https://github.com/${site.links.githubProfile}/${repo}`;

export type ProjectCategory = "software" | "hardware";

export type Project = {
  title: string;
  description: string;
  caption?: string;
  tags: string[];
  image?: string;
  images?: string[];
  /** Card preview video (hardware demos). */
  video?: string;
  /** Shown as the video poster / first-frame preview in grids. */
  videoPoster?: string;
  /** CSS `object-position` for still thumbnails (e.g. `"center 85%"`). */
  imageObjectPosition?: string;
  /** YouTube video ID for embed autoplay background. */
  youtubeId?: string;
  code?: string;
  devpost?: string;
  link?: string;
  /** Shown on editorial grid (e.g. year or range). */
  year?: string;
  category: ProjectCategory;
};

export const projects: Project[] = [
  {
    title: "Optimizing UAV Autonomous Navigation",
    description:
      "Built a MATLAB/Simulink + Gazebo-style co-simulation stack around a quadrotor plant with realistic thrust saturation, motor bandwidth limits, and first-order actuator dynamics so controllers were tuned against hardware-like constraints—not an idealized double integrator. Implemented cascaded attitude/rate control (inner rate loop, outer attitude loop) with anti-windup on torque/thrust integrators, reference shaping on roll/pitch commands, and explicit thrust mixing / saturation handling to study when the stack clips during aggressive gate turns. Generated and scored trajectories using time-aligned state histories (position, velocity, quaternion, body rates, per-motor command) and gate-centric metrics: crossing tube error, heading misalignment at the plane, peak ω and ṗ norms, and margin to saturation before/after the gate. Ran scripted gain sweeps and disturbance injections (wind gust models, mass offsets) to map stability margins and failure modes, then exported comparable signals from flight bags for overlay: aligned attitude, ω, specific force, and commanded thrust after time-base sync and unit checks. Closed the sim-to-real gap iteratively by feeding identified discrepancies (effective delay, underestimated drag in high-β segments, IMU noise floors) back into the plant and delay blocks so the next controller revision predicted the same failure modes observed in logs.",
    caption:
      "Simulink/Gazebo co-sim: cascaded rate/attitude control, saturation-aware thrust mixing, gate-passage metrics, scripted sweeps, flight-log overlay for sim-to-real.",
    tags: ["Drones", "Gazebo", "Simulink", "Python", "Research", "UTIAS", "UTIAS Summer"],
    image: "/simulation.png",
    link: "/projects/optimizing-uav-navigation",
    year: "2025",
    category: "software",
  },
  {
    title: "Integrating UAV Controls into Navigation",
    description:
      "Exported trained vision weights to an onboard runtime (PyTorch → ONNX-style deploy path), wrapped inference in a ROS perception node with explicit message contracts (camera frame_id, capture time, detections, confidence), and wired outputs into the navigation stack so outer-loop commands were driven from live gate geometry instead of static waypoints. Hardened the real-time path with bounded subscriber queues, newest-frame-wins and hard-drop policies when inference missed deadlines, and structured logging so every flight could replay image time, publish time, and control ticks on one timeline. Bench work covered camera intrinsics/extrinsics validation, clock sanity (chrony / PPS alignment between camera host and flight computer where used), and optional IMU-assisted motion priors to stabilize boxes under motion blur. Field progression followed a ladder: tethered hover with perception-only logging, low-speed gate approaches under explicit speed caps, then iterative flights while tracking end-to-end latency from frame grab through topic publish to command, alongside motor saturation and tracking-error monitors when the planner tightened corners. Added lightweight CI for launch graphs, model checksums, and schema/smoke tests so lab laptops and cage rigs stayed on the same artifact hash between flight days.",
    caption:
      "Onboard ROS: ONNX/PyTorch export, timestamped vision topics, bounded queues + frame drops, detection→nav interface, unified flight logs, staged flight tests, CI on configs and models.",
    tags: ["Drones", "Python", "ROS", "Research", "UTIAS", "UTIAS Summer"],
    image: "/testdrone.jpg",
    imageObjectPosition: "left top",
    video: "/droneracing.mp4",
    link: "/projects/integrating-uav-controls",
    year: "2024",
    category: "software",
  },
  {
    title: "UAV Navigation Model Training",
    description:
      "Collected flight data, built a Roboflow dataset, and trained/fine-tuned a YOLOv8 gate detector (PyTorch / Ultralytics) with OpenCV tooling for preprocessing and QA.",
    caption: "Roboflow dataset · YOLOv8 (Ultralytics) · OpenCV QA.",
    tags: ["Drones", "Python", "Research", "UTIAS", "UTIAS Summer"],
    image: "/uav-gate-yolo-detection.png",
    video: "/drone-racing-2023-loop.mp4",
    link: "/projects/uav-navigation-model-training",
    year: "2023",
    category: "software",
  },
  {
    title: "Fixed-Wing UAV Airframe Design",
    description:
      "Iterated three laser-cut wing architectures—open light mesh, denser ribbed torque box, then a blended layout—trading torsional stiffness, build time, and skinning quality until the structure matched what we needed for avionics and covering. Version 0 was a deliberate prototype: balsa/ply ribs and spars skinned with heat-shrink film using a covering iron and heat gun so the film pulled tight and compact over the frame before we committed to final integration. Documented each mesh style with pros/cons (weight vs twist, panel buckling vs reworkability), then converged on the assembled airframe shown in the build photos with GPS and wiring integrated in the bay.",
    caption:
      "3 wing iterations · rib mesh trade-offs · V0 heat-shrink prototype · final integrated airframe.",
    tags: ["Aerodynamics", "Fabrication", "Research", "UTIAS", "UTIAS Summer"],
    image: "/wing-airframe-hero.jpg",
    imageObjectPosition: "center 45%",
    link: "/projects/fixed-wing-uav-airframe",
    year: "2023",
    category: "software",
  },
  {
    title: "CityPath AI (Shopify Hackathon)",
    description:
      "CityPath AI quickly analyzes past data, spots dangerous patterns, and tests safer street layout options in minutes, cutting down the time it takes to move from identifying a problem to finding a practical solution.",
    caption: "AI for safer street layouts and city planning.",
    tags: ["AI", "Shopify", "Hackathon", "Winner", "Python"],
    image: "/shopify.png",
    code: gh("citypathai"),
    year: "2025",
    category: "software",
  },
  {
    title: "RedLamp (UofTHacks)",
    description:
      "RedLamp is a study companion lamp, that detects student stress and responds with encouragement or guidance in real time, making studying feel less isolating while continuing to evolve with more personalized support.",
    caption: "Study lamp that detects stress and responds in real time.",
    tags: ["Hackathon", "Winner", "UofTHacks", "React", "Node.js"],
    image: "/uofthacks.png",
    youtubeId: "gwU1twqMq40",
    code: "https://github.com/Hackm0/lelampv3",
    devpost: "https://devpost.com/software/red-lamp",
    year: "2025",
    category: "software",
  },
  {
    title: "GrowthSync (CTRLHACKDEL)",
    description:
      "GrowthSync helps city planners visualize how new subdivisions would affect existing infrastructure, traffic flow, and community resources, making it easier to understand the real impact of development before it happens.",
    caption: "Visualize how new development affects infrastructure.",
    tags: ["CTRLHACKDEL", "Growth", "React", "Node.js"],
    image: "/ctrlhackdel.png",
    youtubeId: "P3chEYABVYA",
    code: "https://github.com/EVAnunit1307/City_Sync",
    devpost: "https://devpost.com/software/growthsync",
    year: "2026",
    category: "software",
  },
  {
    title: "Finding N.E.M.O (ConUHacks)",
    description:
      "Finding N.E.M.O turns the idea of a pirate treasure hunt into an interactive simulation where users track and recover lost shipping containers, blending a fun digital experience with a practical way to model container drift and plan recovery efforts.",
    caption: "Interactive simulation for container drift and recovery.",
    tags: ["ConUHacks", "NLP", "Python", "Hackathon"],
    image: "/findingnemo.png",
    youtubeId: "PQBeq-7WKRE",
    code: gh("container-search"),
    devpost: "https://devpost.com/software/finding-n-e-m-o",
    year: "2025",
    category: "software",
  },
  {
    title: "Giveway (HackThe6ix)",
    description:
      "Students or community members request a meal, Drivers sign in, see the closest requests, and follow one optimized route.",
    caption: "Meal requests and optimized driver routes.",
    tags: ["HackThe6ix", "Web", "React", "Node.js"],
    image: "/giveway.png",
    youtubeId: "man2-PK6fbg",
    code: gh("route-optimizer"),
    devpost: "https://devpost.com/software/placeholder-pomuiy",
    year: "2025",
    category: "software",
  },
  {
    title: "Meal2Go (EurekaHacks)",
    description:
      "A platform that offers quick and nutritious meal options tailored to the users health profile.",
    caption: "Quick, health-tailored meal options.",
    tags: ["EurekaHacks", "OpenAI", "Computer Vision"],
    image: "/meal2go.png",
    code: "https://github.com/itzsxhan/Food_Detection",
    devpost: "https://devpost.com/software/mealtogo",
    year: "2024",
    category: "software",
  },
  {
    title: "KinKitchen (HackCanada 2026)",
    description:
      "Simulate real-world recipes step by step in 3D so cooking feels visual, interactive, and easier to follow — developed for HackCanada 2026.",
    caption: "HackCanada 2026 — step-by-step 3D recipe simulation.",
    tags: ["HackCanada", "Hackathon", "React", "Next.js", "Web", "3D"],
    image: "/kinkitchen.png",
    youtubeId: "1M8MoqCxQCI",
    code: gh("kinkitchen"),
    year: "2026",
    category: "software",
  },
  {
    title: "Car with obstacle detection",
    description:
      "An Arduino-powered car that uses sensors to detect and avoid obstacles.",
    caption: "Arduino car with obstacle avoidance.",
    tags: ["Arduino", "Hardware", "Electronics"],
    video: "/car.mov",
    videoPoster: "/car-obstacle-poster.jpg",
    link: "/projects/arduino#car-obstacle",
    year: "2024",
    category: "hardware",
  },
  {
    title: "Car line follower",
    description:
      "A car that follows a line using infrared sensors and Arduino logic.",
    caption: "Line-following car with IR sensors.",
    tags: ["Arduino", "Hardware", "Electronics"],
    image: "/car.jpg",
    imageObjectPosition: "center 82%",
    link: "/projects/arduino#car-line-follower",
    year: "2024",
    category: "hardware",
  },
  {
    title: "Autonomous water pump",
    description:
      "A smart water pump system that automatically waters plants based on soil moisture.",
    caption: "Moisture-based plant watering.",
    tags: ["Arduino", "Hardware", "IoT"],
    image: "/water.jpg",
    link: "/projects/arduino#water-pump",
    year: "2024",
    category: "hardware",
  },
  {
    title: "Digital timer",
    description:
      "A digital timer built with Arduino for precise timing. 555 timer IC and schematic in EasyEDA.",
    caption: "Arduino timer with 555 IC and EasyEDA schematic.",
    tags: ["Arduino", "Hardware", "Electronics"],
    video: "/timer.mp4",
    videoPoster: "/digital-timer-poster.jpg",
    link: "/projects/arduino#digital-timer",
    year: "2025",
    category: "hardware",
  },
  {
    title: "Digital clock",
    description:
      "A digital clock using Arduino and a 7-segment display.",
    caption: "7-segment clock build.",
    tags: ["Arduino", "Hardware", "Electronics"],
    video: "/clock.mp4",
    videoPoster: "/digital-clock-poster.jpg",
    link: "/projects/arduino#digital-clock",
    year: "2025",
    category: "hardware",
  },
  {
    title: "Heated driveway",
    description:
      "Snow-detection and heating controller: moisture and temperature on Arduino, relay state machine, plus dashboards.",
    caption: "Arduino-based heated driveway control system.",
    tags: ["Arduino", "Hardware", "IoT"],
    image: "/heateddriveway.png",
    code: "https://github.com/herman888/heated-driveway",
    year: "2026",
    category: "hardware",
  },
];

export const softwareProjects = projects.filter((p) => p.category === "software");
export const hardwareProjects = projects.filter((p) => p.category === "hardware");

const HACKATHON_TAG_HINTS = new Set([
  "Hackathon",
  "HackThe6ix",
  "EurekaHacks",
  "CTRLHACKDEL",
  "HackCanada",
]);

/** Weekend / competition builds (distinct from research coursework software). */
export function isHackathonSoftware(p: Project): boolean {
  if (p.category !== "software") return false;
  if (p.tags.some((t) => HACKATHON_TAG_HINTS.has(t))) return true;
  const hay = `${p.title} ${p.tags.join(" ")}`.toLowerCase();
  return /uofthacks|conuhacks|hackthe6ix|eurekahacks|ctrlhackdel|shopify hackathon|hackcanada|hack canada/.test(
    hay
  );
}

export const softwareHackathonProjects = softwareProjects.filter(isHackathonSoftware);
export const softwareResearchProjects = softwareProjects.filter(
  (p) => !isHackathonSoftware(p)
);

/** Single list for home + /projects: UTIAS summers first, then hackathons, other software, hardware. */
export const allPortfolioProjects: Project[] = (() => {
  const utiasSummers = softwareResearchProjects
    .filter((p) => p.tags.includes("UTIAS Summer"))
    .sort((a, b) => {
      const byYear = (b.year ?? "").localeCompare(a.year ?? "");
      if (byYear !== 0) return byYear;
      const airframe = (t: string) => (t.includes("Airframe") ? 1 : 0);
      return airframe(a.title) - airframe(b.title);
    });
  const researchSansUtiiasSummer = softwareResearchProjects
    .filter((p) => !p.tags.includes("UTIAS Summer"))
    .sort((a, b) => (b.year ?? "").localeCompare(a.year ?? ""));
  return [
    ...utiasSummers,
    ...researchSansUtiiasSummer,
    ...softwareHackathonProjects,
    ...hardwareProjects,
  ];
})();
