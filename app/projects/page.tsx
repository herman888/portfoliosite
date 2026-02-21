"use client";

import { useState } from "react";
import Link from "next/link";
import FlyingDrone from "../components/FlyingDrone";

const projects = [
	{
		title: 'CityPath AI (Shopify Hackathon Winner)',
		description:
			'CityPath AI quickly analyzes past data, spots dangerous patterns, and tests safer street layout options in minutes, cutting down the time it takes to move from identifying a problem to finding a practical solution.',
		tags: ['AI', 'Shopify', 'Hackathon', 'Winner', 'Python'],
		image: '/shopify.png',
		code: 'https://github.com/herman888/citypathai',
	},
	{
		title: 'RedLamp (UofTHacks Winner)',
		description:
			'RedLamp is a study companion lamp, that detects student stress and responds with encouragement or guidance in real time, making studying feel less isolating while continuing to evolve with more personalized support.',
		tags: ['Hackathon', 'Winner', 'UofTHacks', 'React', 'Node.js'],
		image: '/uofthacks.png',
		code: 'https://github.com/Hackm0/lelampv3', // updated repo link
		devpost: 'https://devpost.com/software/red-lamp',
	},
	{
		title: 'GrowthSync (CTRLHACKDEL)',
		description:
			'GrowthSync helps city planners visualize how new subdivisions would affect existing infrastructure, traffic flow, and community resources, making it easier to understand the real impact of development before it happens.',
		tags: ['CTRLHACKDEL', 'Growth', 'React', 'Node.js'],
		image: '/ctrlhackdel.png',
		code: 'https://github.com/EVAnunit1307/City_Sync', // updated repo link
		devpost: 'https://devpost.com/software/growthsync',
	},
	{
		title: 'Finding N.E.M.O (ConUHacks)',
		description:
			'Finding N.E.M.O turns the idea of a pirate treasure hunt into an interactive simulation where users track and recover lost shipping containers, blending a fun digital experience with a practical way to model container drift and plan recovery efforts.',
		tags: ['ConUHacks', 'NLP', 'Python', 'Hackathon'],
		image: '/project-nemo.jpg',
		code: 'https://github.com/herman888/container-search', // updated repo link
		devpost: 'https://devpost.com/software/finding-n-e-m-o', // updated devpost link
	},
	{
		title: 'Arduino/Hardware Projects',
		description:
			'A collection of Arduino and hardware-based projects.',
		tags: ['Arduino', 'Hardware', 'Electronics', 'IoT'],
		images: ['/arduino.png'], // Use arduino.png as the project image
		code: 'https://github.com/herman888/arduino-hardware-projects',
		link: '/projects/arduino', // Add a link to the new Arduino projects page
	},
	{
		title: 'Giveway (HackThe6ix)',
		description:
			'Students or community members request a meal, Drivers sign in, see the closest requests, and follow one optimized route.',
		tags: ['HackThe6ix', 'Web', 'React', 'Node.js'], // added HackThe6ix tag
		image: '/giveway.png',
		code: 'https://github.com/herman888/route-optimizer', // updated repo link
		devpost: 'https://devpost.com/software/placeholder-pomuiy', // updated devpost link
	},
	{
		title: 'Meal2Go (EurekaHacks)', // updated title
		description:
			'A platform that offers quick and nutritious meal options tailored to the users health profile.',
		tags: ['EurekaHacks', 'OpenAI', 'Computer Vision'], // added EurekaHacks tag
		image: '/meal2go.png',
		code: 'https://github.com/itzsxhan/Food_Detection', // updated repo link
		devpost: 'https://devpost.com/software/mealtogo', // updated devpost link
	},
	{
		title: 'Drone Racing',
		description:
			'Developed @UTIAS Flight System and Contol Labratory',
		tags: ['Drones', 'Gazebo', 'Python', 'ROS', 'Simulink'],
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

			{/* Featured Drone Racing Project */}
			<div className="max-w-3xl mx-auto mb-16 rounded-2xl overflow-hidden shadow bg-[#222] border border-[#d6c9a5]">
				<div className="w-full h-64 md:h-80 relative">
					<img
						src="/droneracing.jpg"
						alt="Drone Racing Project"
						className="object-cover w-full h-full"
						style={{ borderTopLeftRadius: '1.25rem', borderTopRightRadius: '1.25rem' }}
					/>
				</div>
				<div className="bg-[#f5f5dc] p-8 border-t border-[#e5e5c0]">
					<h2 className="text-2xl font-bold mb-2 text-[#bfa94c]">Drone Racing</h2>
					<p className="text-gray-700 mb-4">Developed @UTIAS Flight System and Control Laboratory. Built and tested drone racing systems, ran real and simulated flights, and contributed to research on autonomous flight and trajectory analysis.</p>
					<div className="flex flex-wrap gap-2 mb-4">
						{['Drones', 'Gazebo', 'Python', 'ROS', 'Simulink'].map(tag => (
							<span key={tag} className="tag">{tag}</span>
						))}
					</div>
					<div className="flex gap-2">
						<Link href="/projects/drone-racing-summary" className="btn-primary px-4 py-2 font-semibold">Project Summary</Link>
						<a href="/droneracing.mp4" target="_blank" rel="noopener noreferrer" className="btn-primary px-4 py-2 font-semibold">Demo</a>
						<a href="https://github.com/herman888/drone-racing" target="_blank" rel="noopener noreferrer" className="btn-primary px-4 py-2 font-semibold">Code</a>
					</div>
				</div>
			</div>

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
											<span key={tag} className="tag">{tag}</span>
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
								className="bg-card rounded-xl shadow border border-[#d6c9a5] overflow-hidden flex flex-col"
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
											<span key={tag} className="tag">{tag}</span>
										))}
									</div>
									<div className="flex gap-2 mt-2">
										{project.title === 'Drone Racing' ? (
											<>
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
												<Link
													href="/projects/drone-racing-summary"
													className="inline-flex items-center px-3 py-1 border border-yellow-600 rounded shadow text-yellow-800 bg-white hover:bg-yellow-100 transition text-sm"
													style={{ textDecoration: 'none' }}
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
													Project Summary
												</Link>
											</>
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
														fill="currentColor"
														viewBox="0 0 16 16"
													>
														<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
													</svg>
													Code
												</a>
											)
										)}
										{project.devpost && project.title !== 'CityPath AI (Shopify Hackathon Winner)' && (
											<a
												href={project.devpost}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center px-3 py-1 border border-blue-400 rounded shadow text-blue-700 bg-white hover:bg-blue-100 transition text-sm"
											>
												<svg
													className="mr-1"
													width="16"
													height="16"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
													<text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">D</text>
												</svg>
												Devpost
											</a>
										)}
									</div>
								</div>
							</div>
						)
					))}
				</div>
			</div>
		</>
	);
}
