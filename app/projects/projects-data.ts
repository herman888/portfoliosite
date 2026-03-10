export type Project = {
  title: string;
  description: string;
  caption?: string;
  tags: string[];
  image?: string;
  images?: string[];
  code?: string;
  devpost?: string;
  link?: string;
};

export const projects: Project[] = [
  {
    title: "Drone Racing",
    description:
      "Developed @UTIAS Flight System and Control Laboratory. Built and tested drone racing systems, ran real and simulated flights, and contributed to research on autonomous flight and trajectory analysis.",
    caption: "High-speed autonomous drone racing research @ UTIAS.",
    tags: ["Drones", "Gazebo", "Python", "ROS", "Simulink"],
    image: "/droneracing.jpg",
    link: "/projects/drone-racing-summary",
  },
  {
    title: "CityPath AI (Shopify Hackathon Winner)",
    description:
      "CityPath AI quickly analyzes past data, spots dangerous patterns, and tests safer street layout options in minutes, cutting down the time it takes to move from identifying a problem to finding a practical solution.",
    caption: "AI for safer street layouts and city planning.",
    tags: ["AI", "Shopify", "Hackathon", "Winner", "Python"],
    image: "/shopify.png",
    code: "https://github.com/herman888/citypathai",
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
  },
  {
    title: "Finding N.E.M.O (ConUHacks)",
    description:
      "Finding N.E.M.O turns the idea of a pirate treasure hunt into an interactive simulation where users track and recover lost shipping containers, blending a fun digital experience with a practical way to model container drift and plan recovery efforts.",
    caption: "Interactive simulation for container drift and recovery.",
    tags: ["ConUHacks", "NLP", "Python", "Hackathon"],
    image: "/project-nemo.jpg",
    code: "https://github.com/herman888/container-search",
    devpost: "https://devpost.com/software/finding-n-e-m-o",
  },
  {
    title: "Arduino/Hardware Projects",
    description: "A collection of Arduino and hardware-based projects.",
    caption: "Arduino and hardware builds.",
    tags: ["Arduino", "Hardware", "Electronics", "IoT"],
    images: ["/arduino.png"],
    code: "https://github.com/herman888/arduino-hardware-projects",
    link: "/projects/arduino",
  },
  {
    title: "Giveway (HackThe6ix)",
    description:
      "Students or community members request a meal, Drivers sign in, see the closest requests, and follow one optimized route.",
    caption: "Meal requests and optimized driver routes.",
    tags: ["HackThe6ix", "Web", "React", "Node.js"],
    image: "/giveway.png",
    code: "https://github.com/herman888/route-optimizer",
    devpost: "https://devpost.com/software/placeholder-pomuiy",
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
  },
];

