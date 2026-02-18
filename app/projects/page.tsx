"use client";

const projects = [
	{
		title: 'CityPath AI (Shopify Hackathon Winner)',
		description:
			'CityPath AI is a Shopify Hackathon winning project. [Add your description here about what CityPath AI does, tech stack, and your role.]',
		tags: ['AI', 'Shopify', 'Hackathon', 'Winner', 'Python'],
		image: '/shopify.png',
		code: 'https://github.com/herman888/citypath-ai',
	},
	{
		title: 'RedLamp (UofTHacks Winner)',
		description:
			'RedLamp is a project that won UofTHacks. [Add your description here about what RedLamp does, tech stack, and your role.]',
		tags: ['Hackathon', 'Winner', 'UofTHacks', 'React', 'Node.js'],
		image: '/uofthacks.png',
		code: 'https://github.com/herman888/redlamp',
	},
	{
		title: 'GrowthSync (CTRLHACKDEL)',
		description:
			'GrowthSync was built for CTRLHACKDEL. [Add your description here about what GrowthSync does, tech stack, and your role.]',
		tags: ['CTRLHACKDEL', 'Growth', 'React', 'Node.js'],
		image: '/ctrlhackdel.png',
		code: 'https://github.com/herman888/growthsync',
	},
	{
		title: 'Finding N.E.M.O (ConUHacks)',
		description:
			'Finding N.E.M.O was built at ConUHacks. [Add your description here about what Finding N.E.M.O does, tech stack, and your role.]',
		tags: ['ConUHacks', 'NLP', 'Python', 'Hackathon'],
		image: '/project-nemo.jpg',
		code: 'https://github.com/herman888/finding-nemo',
	},
	{
		title: 'Arduino/Hardware Projects',
		description:
			'A collection of Arduino and hardware-based projects. [Add your description here about your hardware projects, tech stack, and your role.]',
		tags: ['Arduino', 'Hardware', 'Electronics', 'IoT'],
		image: '/project-arduino.jpg',
		code: 'https://github.com/herman888/arduino-hardware-projects',
	},
	{
		title: 'Giveway',
		description:
			'Giveway project. [Add your description here about what Giveway does, tech stack, and your role.]',
		tags: ['Web', 'React', 'Node.js'],
		image: '/giveway.png',
		code: 'https://github.com/herman888/giveway',
	},
	{
		title: 'Meal2Go',
		description:
			'Meal2Go project. [Add your description here about what Meal2Go does, tech stack, and your role.]',
		tags: ['Mobile', 'React Native', 'Food'],
		image: '/project-meal2go.jpg',
		code: 'https://github.com/herman888/meal2go',
	},
	{
		title: 'Drone Racing',
		description:
			'Drone Racing project. [Add your description here about what Drone Racing does, tech stack, and your role.]',
		tags: ['Drones', 'Racing', 'Python'],
		image: '/project-droneracing.jpg',
		code: 'https://github.com/herman888/drone-racing',
	},
	// Add more projects as needed
];

export default function ProjectsPage() {
	return (
		<div className="max-w-5xl mx-auto py-16 px-4">
			<h2 className="text-2xl font-bold mb-6">All Projects</h2>
			<div className="grid md:grid-cols-2 gap-8">
				{projects.map((project) => (
					<div
						key={project.title}
						className="bg-[#f5f5dc] rounded-xl shadow border border-[#d6c9a5] overflow-hidden flex flex-col"
					>
						{project.title === 'Finding N.E.M.O (ConUHacks)' ? (
							<div className="w-full h-48 bg-gray-200 flex items-center justify-center">
								<iframe
									title="Finding N.E.M.O Demo"
									width="400"
									height="192"
									src="https://www.youtube.com/embed/PQBeq-7WKRE"
									frameBorder="0"
									className="object-cover w-full h-full"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
							</div>
						) : (
							<div className="w-full h-48 bg-gray-200 flex items-center justify-center">
								<img
									src={project.image}
									alt={project.title}
									width={400}
									height={192}
									className="object-cover w-full h-full"
									onError={(e) => {
										e.currentTarget.src = '/fallback.png';
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
										d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
									/>
								</svg>
								Code
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
