"use client";

import { useState } from "react";
import Link from "next/link";
import FlyingDrone from "../components/FlyingDrone";

const projects = [
	{
		title: 'CityPath AI (Shopify Hackathon Winner)',
		description:
			'CityPath AI automates the entire analysis and redesign workflow. It parses historical data, identifies hazardous patterns, and simulates alternative street layouts to estimate safety impacts all within minutes. This significantly shortens the time between identifying an issue and determining a safer, more effective street configuration.',
		tags: ['AI', 'Shopify', 'Hackathon', 'Winner', 'Python'],
		image: '/shopify.png',
		code: 'https://github.com/herman888/citypathai',
	},
	{
		title: 'RedLamp (UofTHacks Winner)',
		description:
			'RedLamp is a study companion lamp that detects student emotions and offers encouragement or guidance when stress is detected, making studying less isolating. Built from scratch with both hardware and software, it continues to evolve to provide more personalized, real-time support.',
		tags: ['Hackathon', 'Winner', 'UofTHacks', 'React', 'Node.js'],
		image: '/uofthacks.png',
		code: 'https://github.com/Hackm0/lelampv3', // updated repo link
		devpost: 'https://devpost.com/software/red-lamp',
	},
	{
		title: 'GrowthSync (CTRLHACKDEL)',
		description:
			'GrowthSync was built for CTRLHACKDEL. [Add your description here about what GrowthSync does, tech stack, and your role.]',
		tags: ['CTRLHACKDEL', 'Growth', 'React', 'Node.js'],
		image: '/ctrlhackdel.png',
		code: 'https://github.com/EVAnunit1307/City_Sync', // updated repo link
		devpost: 'https://devpost.com/software/growthsync',
	},
	{
		title: 'Finding N.E.M.O (ConUHacks)',
		description:
			'Finding N.E.M.O was built at ConUHacks. [Add your description here about what Finding N.E.M.O does, tech stack, and your role.]',
		tags: ['ConUHacks', 'NLP', 'Python', 'Hackathon'],
		image: '/project-nemo.jpg',
		code: 'https://github.com/herman888/container-search', // updated repo link
		devpost: 'https://devpost.com/software/finding-n-e-m-o', // updated devpost link
	},
	{
		title: 'Arduino/Hardware Projects',
		description:
			'A collection of Arduino and hardware-based projects. [Add your description here about your hardware projects, tech stack, and your role.]',
		tags: ['Arduino', 'Hardware', 'Electronics', 'IoT'],
		images: ['/arduino.png'], // Use arduino.png as the project image
		code: 'https://github.com/herman888/arduino-hardware-projects',
		link: '/projects/arduino', // Add a link to the new Arduino projects page
	},
	{
		title: 'Giveway (HackThe6ix)',
		description:
			'Giveway project. [Add your description here about what Giveway does, tech stack, and your role.]',
		tags: ['HackThe6ix', 'Web', 'React', 'Node.js'], // added HackThe6ix tag
		image: '/giveway.png',
		code: 'https://github.com/herman888/route-optimizer', // updated repo link
		devpost: 'https://devpost.com/software/placeholder-pomuiy', // updated devpost link
	},
	{
		title: 'Meal2Go (EurekaHacks)', // updated title
		description:
			'Meal2Go project. [Add your description here about what Meal2Go does, tech stack, and your role.]',
		tags: ['EurekaHacks', 'Mobile', 'React Native', 'Food'], // added EurekaHacks tag
		image: '/meal2go.png',
		code: 'https://github.com/itzsxhan/Food_Detection', // updated repo link
		devpost: 'https://devpost.com/software/mealtogo', // updated devpost link
	},
	{
		title: 'Drone Racing',
		description:
			'Drone Racing project. [Add your description here about what Drone Racing does, tech stack, and your role.]',
		tags: ['Drones', 'Racing', 'Python'],
		image: '/droneracing.jpg',
		code: 'https://github.com/herman888/drone-racing',
	},
	// Add more projects as needed
];

export default function ProjectsPage() {
	const [arduinoIndex] = useState(0);
	const arduinoProject = projects.find(
		(p) => p.title === "Arduino/Hardware Projects"
	);
	const arduinoImages = arduinoProject?.images || [];

	return (
		<>
			<FlyingDrone />
			<div className="max-w-5xl mx-auto py-16 px-4">
				<h2 className="text-2xl font-bold mb-6">All Projects</h2>
				<div className="grid md:grid-cols-2 gap-8">
					{projects.map((project) => (
						project.title === 'Arduino/Hardware Projects' ? (
							<Link
								key={project.title}
								href={project.link || '#'}
								className="bg-[#f5f5dc] rounded-xl shadow border border-[#d6c9a5] overflow-hidden flex flex-col cursor-pointer transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#bfa94c]"
								style={{ textDecoration: 'none' }}
							>
								<div className="w-full aspect-square bg-gray-200 flex items-center justify-center relative">
									<img
										src={arduinoImages[arduinoIndex]}
										alt={project.title + ' ' + (arduinoIndex + 1)}
										width={400}
										height={400}
										style={{ objectFit: 'contain', width: '100%', height: '100%', objectPosition: 'center 100%', transform: arduinoIndex === 0 ? 'scale(1)' : 'none' }}
										className="rounded"
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
									<div className="flex flex-wrap gap-2 mb-2">
										{project.tags.map((tag) => (
											<span
												key={tag}
												className="bg-[#f5e9c6] text-[#bfa94c] px-2 py-1 rounded-full text-xs font-semibold"
											>
												{tag}
											</span>
										))}
									</div>
									<button
										type="button"
										onClick={(e) => {
											e.stopPropagation();
											window.location.href = project.link || '/projects/arduino';
										}}
										className="inline-flex items-center px-3 py-1 border border-yellow-600 rounded shadow text-yellow-800 bg-white hover:bg-yellow-100 transition text-sm mt-2"
									>
										<svg
											className="mr-1"
											width="16"
											height="16"
											fill="none"
											viewBox="0 0 24 24"
										>
											<path
												fill="currentColor"
												d="M3 6h18M3 12h18M3 18h18"
											/>
										</svg>
										View All Projects
									</button>
								</div>
							</Link>
						) : (
							<div
								key={project.title}
								className="bg-[#f5f5dc] rounded-xl shadow border border-[#d6c9a5] overflow-hidden flex flex-col"
							>
								{project.title === 'Finding N.E.M.O (ConUHacks)' ? (
									<div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
										<iframe
											title="Finding N.E.M.O Demo"
											src="https://www.youtube.com/embed/PQBeq-7WKRE"
											frameBorder="0"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
											className="object-cover w-full h-full rounded"
										></iframe>
									</div>
								) : (
									<div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
										<img
											src={project.image}
											alt={project.title}
											width={400}
											height={400}
											className="object-cover w-full h-full"
											onError={(e) => {
												if (e.currentTarget.src.indexOf('/fallback.png') === -1) {
													e.currentTarget.src = '/fallback.png';
												}
											}}
										/>
									</div>
								)}
								<div className="p-4 flex-1 flex flex-col">
									<h3 className="text-lg font-bold text-[#bfa94c] mb-1">
										{project.title}
									</h3>
									<p className="text-gray-700 mb-2 flex-1">
										{project.description}
									</p>
									<div className="flex flex-wrap gap-2 mb-2">
										{project.tags.map((tag) => (
											<span
												key={tag}
												className="bg-[#f5e9c6] text-[#bfa94c] px-2 py-1 rounded-full text-xs font-semibold"
											>
												{tag}
											</span>
										))}
									</div>
									<div className="flex gap-2 mt-2">
										{project.title === 'Drone Racing' ? (
											<button
												type="button"
												onClick={() => window.open('/droneracing.mp4', '_blank', 'noopener,noreferrer')}
												className="inline-flex items-center px-3 py-1 border border-green-600 rounded shadow text-green-800 bg-white hover:bg-green-100 transition text-sm"
											>
												<svg
													className="mr-1"
													width="16"
													height="16"
													fill="none"
													viewBox="0 0 24 24"
												>
													<path
														fill="currentColor"
														d="M8 5v14l11-7z"
													/>
												</svg>
												Demo
											</button>
										) : project.title === 'Arduino/Hardware Projects' ? (
											<button
												type="button"
												onClick={() => window.location.href = project.link || '/projects/arduino'}
												className="inline-flex items-center px-3 py-1 border border-yellow-600 rounded shadow text-yellow-800 bg-white hover:bg-yellow-100 transition text-sm"
											>
												<svg
													className="mr-1"
													width="16"
													height="16"
													fill="none"
													viewBox="0 0 24 24"
												>
													<path
														fill="currentColor"
														d="M3 6h18M3 12h18M3 18h18"
													/>
												</svg>
												View All Projects
											</button>
										) : (
											project.code && (
												<a
													href={project.code}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center px-3 py-1 border border-gray-400 rounded shadow text-gray-700 bg-white hover:bg-[#f5e5c0] transition text-sm"
												>
													<svg
														className="mr-1"
														width="16"
														height="16"
														fill="none"
														viewBox="0 0 24 24"
													>
														<path
															fill="currentColor"
															d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.0
