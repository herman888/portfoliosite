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
  code?: string;
  devpost?: string;
  link?: string;
  /** Shown on editorial grid (e.g. year or range). */
  year?: string;
  category: ProjectCategory;
};

export const projects: Project[] = [
  {
    title: "Drone Racing",
    description:
      "Developed @UTIAS Flight System and Control Laboratory. Built and tested drone racing systems, ran real and simulated flights, and contributed to research on autonomous flight and trajectory analysis.",
    caption: "High-speed autonomous drone racing research @ UTIAS.",
    tags: ["Drones", "Gazebo", "Python", "ROS", "Simulink", "Research"],
    image: "/droneracing.jpg",
    link: "/projects/drone-racing-summary",
    year: "2023–25",
    category: "software",
  },
  {
    title: "CityPath AI (Shopify Hackathon Winner)",
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
    title: "RedLamp (UofTHacks Winner)",
    description:
      "RedLamp is a study companion lamp, that detects student stress and responds with encouragement or guidance in real time, making studying feel less isolating while continuing to evolve with more personalized support.",
    caption: "Study lamp that detects stress and responds in real time.",
    tags: ["Hackathon", "Winner", "UofTHacks", "React", "Node.js"],
    image: "/uofthacks.png",
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
    code: "https://github.com/EVAnunit1307/City_Sync",
    devpost: "https://devpost.com/software/growthsync",
    year: "2024",
    category: "software",
  },
  {
    title: "Finding N.E.M.O (ConUHacks)",
    description:
      "Finding N.E.M.O turns the idea of a pirate treasure hunt into an interactive simulation where users track and recover lost shipping containers, blending a fun digital experience with a practical way to model container drift and plan recovery efforts.",
    caption: "Interactive simulation for container drift and recovery.",
    tags: ["ConUHacks", "NLP", "Python", "Hackathon"],
    image: "/project-nemo.jpg",
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
    code: gh("route-optimizer"),
    devpost: "https://devpost.com/software/placeholder-pomuiy",
    year: "2024",
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
    title: "KinKitchen",
    description:
      "Simulate real-world recipes step by step in 3D so cooking feels visual, interactive, and easier to follow.",
    caption: "Step-by-step 3D recipe simulation for home cooking.",
    tags: ["React", "Next.js", "Web", "Product"],
    image: "/kinkitchen.png",
    code: gh("kinkitchen"),
    year: "2025",
    category: "software",
  },
  {
    title: "Car with obstacle detection",
    description:
      "An Arduino-powered car that uses sensors to detect and avoid obstacles.",
    caption: "Arduino car with obstacle avoidance.",
    tags: ["Arduino", "Hardware", "Electronics"],
    video: "/car.mov",
    link: "/projects/arduino#car-obstacle",
    year: "2024–25",
    category: "hardware",
  },
  {
    title: "Car line follower",
    description:
      "A car that follows a line using infrared sensors and Arduino logic.",
    caption: "Line-following car with IR sensors.",
    tags: ["Arduino", "Hardware", "Electronics"],
    image: "/car.jpg",
    link: "/projects/arduino#car-line-follower",
    year: "2024–25",
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
    year: "2024–25",
    category: "hardware",
  },
  {
    title: "Digital timer",
    description:
      "A digital timer built with Arduino for precise timing. 555 timer IC and schematic in EasyEDA.",
    caption: "Arduino timer with 555 IC and EasyEDA schematic.",
    tags: ["Arduino", "Hardware", "Electronics"],
    video: "/timer.mp4",
    link: "/projects/arduino#digital-timer",
    year: "2024–25",
    category: "hardware",
  },
  {
    title: "Digital clock",
    description:
      "A digital clock using Arduino and a 7-segment display.",
    caption: "7-segment clock build.",
    tags: ["Arduino", "Hardware", "Electronics"],
    video: "/clock.mp4",
    link: "/projects/arduino#digital-clock",
    year: "2024–25",
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
    year: "2024–25",
    category: "hardware",
  },
];

export const softwareProjects = projects.filter((p) => p.category === "software");
export const hardwareProjects = projects.filter((p) => p.category === "hardware");
