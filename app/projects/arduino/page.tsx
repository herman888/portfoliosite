"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

const arduinoProjects = [
	{
		title: "Car with Obstacle Detection",
		description:
			"An Arduino-powered car that uses sensors to detect and avoid obstacles.",
		video: "/car.mov",
	},
	{
		title: "Car Line Follower",
		description:
			"A car that follows a line using infrared sensors and Arduino logic.",
		image: "/car.jpg",
		style: {
			objectFit: "cover",
			width: "100%",
			height: "100%",
			objectPosition: "center 80%",
		}, // Shift image down a little more
	},
	{
		title: "Autonomous Water Pump",
		description:
			"A smart water pump system that automatically waters plants based on soil moisture.",
		image: "/water.jpg",
	},
	{
		title: "Digital Timer",
		description:
			"A digital timer built with Arduino for precise timing applications. I used a 555 timer IC for this project, and designed the schematic in EASY EDA. Click below to view the schematic diagram.",
		video: "/timer.mp4",
		schematic: "/schematic.png",
	},
	{
		title: "Digital Clock",
		description:
			"A digital clock project using Arduino and a 7-segment display.",
		video: "/clock.mp4",
	},
];

export default function ArduinoProjectsPage() {
	return (
		<div className="max-w-5xl mx-auto py-16 px-4 text-gray-100">
			<Link
				href="/"
				className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-white"
			>
				<span>&larr;</span>
				<span>Back to Home</span>
			</Link>
			<h2 className="about-me-line mb-10 text-center text-base md:text-lg">
				Arduino/Hardware Projects
			</h2>
			<div className="grid gap-8 md:grid-cols-2">
				{arduinoProjects.map((project) => (
					<div
						key={project.title}
						className="flex flex-col overflow-hidden border border-[#2a2a2a] bg-black/40"
					>
						<div className="flex aspect-square w-full items-center justify-center overflow-hidden bg-black">
							{project.video ? (
								<video
									src={project.video}
									controls
									className="block h-full w-full object-cover p-0 m-0"
									style={{
										objectFit: "cover",
										width: "100%",
										height: "100%",
										display: "block",
										padding: 0,
										margin: 0,
									}}
								/>
							) : (
								<img
									src={project.image}
									alt={project.title}
									className="block h-full w-full object-cover p-0 m-0"
									style={
										(project.style || {
											objectFit: "cover",
											width: "100%",
											height: "100%",
											display: "block",
											padding: 0,
											margin: 0,
										}) as CSSProperties
									}
									onError={(e) => {
										if (
											e.currentTarget.src.indexOf(
												"/fallback.png"
											) === -1
										) {
											e.currentTarget.src = "/fallback.png";
										}
									}}
								/>
							)}
						</div>
						<div className="flex flex-1 flex-col bg-[#050505] p-4">
							<h3 className="about-me-line mb-2 text-[0.8rem] uppercase tracking-[0.18em] text-[#f5f5f5]">
								{project.title}
							</h3>
							<p className="chat-text mb-2 flex-1 text-[0.7rem] text-gray-300">
								{project.description}
							</p>
							{project.title === "Digital Timer" && (
								<button
									className="mt-3 inline-flex items-center justify-center border border-[#2a2a2a] bg-black/40 px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-gray-100 transition hover:bg-black/80"
									onClick={() =>
										window.open(project.schematic, "_blank")
									}
								>
									View Schematic Diagram
								</button>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
