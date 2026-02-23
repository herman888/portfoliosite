"use client";

import Link from "next/link";

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
		<div className="max-w-5xl mx-auto py-16 px-4">
			<Link
				href="/projects"
				className="text-[#bfa94c] underline mb-4 inline-block"
			>
				&larr; Back to Projects
			</Link>
			<h2 className="text-2xl font-bold mb-6 text-center">
				Arduino/Hardware Projects
			</h2>
			<div className="grid md:grid-cols-2 gap-8">
				{arduinoProjects.map((project) => (
					<div
						key={project.title}
						className="bg-[#f5f5dc] rounded-xl shadow border border-[#d6c9a5] overflow-hidden flex flex-col"
					>
						<div className="w-full aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
							{project.video ? (
								<video
									src={project.video}
									controls
									className="rounded object-cover w-full h-full block p-0 m-0"
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
									className="rounded object-cover w-full h-full block p-0 m-0"
									style={
										(project.style || {
											objectFit: "cover",
											width: "100%",
											height: "100%",
											display: "block",
											padding: 0,
											margin: 0,
										}) as React.CSSProperties
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
						<div className="p-4 flex-1 flex flex-col">
							<h3 className="text-lg font-bold text-[#bfa94c] mb-1">
								{project.title}
							</h3>
							<p className="text-gray-700 mb-2 flex-1">
								{project.description}
							</p>
							{project.title === "Digital Timer" && (
								<button
									className="bg-[#bfa94c] text-white rounded px-4 py-2 mt-2 hover:bg-[#a88c3c] transition font-semibold border border-[#d6c9a5]"
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
