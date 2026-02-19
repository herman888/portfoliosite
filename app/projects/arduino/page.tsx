"use client";

import Link from "next/link";

const arduinoProjects = [
  {
    title: "Car with Obstacle Detection",
    description: "An Arduino-powered car that uses sensors to detect and avoid obstacles.",
    image: "/car.jpg",
  },
  {
    title: "Car Line Follower",
    description: "A car that follows a line using infrared sensors and Arduino logic.",
    image: "/linefollower.jpg",
  },
  {
    title: "Autonomous Water Pump",
    description: "A smart water pump system that automatically waters plants based on soil moisture.",
    image: "/waterpump.jpg",
  },
  {
    title: "Digital Timer",
    description: "A digital timer built with Arduino for precise timing applications.",
    image: "/timer.jpg",
  },
  {
    title: "Digital Clock",
    description: "A digital clock project using Arduino and a 7-segment display.",
    image: "/clock.jpg",
  },
];

export default function ArduinoProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <Link href="/projects" className="text-[#bfa94c] underline mb-4 inline-block">&larr; Back to Projects</Link>
      <h2 className="text-2xl font-bold mb-6 text-center">Arduino/Hardware Projects</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {arduinoProjects.map((project) => (
          <div
            key={project.title}
            className="bg-[#f5f5dc] rounded-xl shadow border border-[#d6c9a5] overflow-hidden flex flex-col"
          >
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <img
                src={project.image}
                alt={project.title}
                width={400}
                height={192}
                className="object-cover w-full h-full"
                onError={(e) => {
                  if (e.currentTarget.src.indexOf('/fallback.png') === -1) {
                    e.currentTarget.src = '/fallback.png';
                  }
                }}
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-[#bfa94c] mb-1">
                {project.title}
              </h3>
              <p className="text-gray-700 mb-2 flex-1">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
