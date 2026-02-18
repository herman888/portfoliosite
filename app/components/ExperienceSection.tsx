const ExperienceSection = () => {
	const experiences = [
		{
			role: 'Full Stack Engineer Intern',
			company: 'SellStatic',
			period: 'Oct 2025 - Jan 2026',
			highlights: 'Led development of microservices architecture, 40% improvement in system performance',
		},
		{
			role: 'Software Engineer',
			company: 'Innovation Labs',
			period: '2017 - 2020',
			highlights: 'Architected cloud-native applications, mentored junior developers',
		},
		{
			role: 'Full Stack Developer',
			company: 'StartUp Inc',
			period: '2015 - 2017',
			highlights: 'Built scalable web applications using React and Node.js',
		},
	];

	return (
		<div className="w-full max-w-xl mx-auto bg-[#f5f5dc] p-6 rounded shadow text-gray-800">
			<h2 className="text-xl font-bold mb-4">Experience</h2>

			<div className="space-y-5">
				{experiences.map((exp) => (
					<div key={exp.company} className="relative">
						<div className="relative pl-4 border-l-2 border-gray-200">
							<div className="absolute -left-[5px] top-[10px] h-2.5 w-2.5 rounded-full bg-gray-300" />

							<div className="space-y-1">
								<div className="flex flex-col md:flex-row md:items-center md:justify-between">
									<h4 className="text-md font-medium text-gray-900">{exp.role}</h4>
									<span className="text-sm text-gray-500">{exp.period}</span>
								</div>
								<p className="text-sm font-medium text-gray-600">{exp.company}</p>
								<p className="text-sm text-gray-600 leading-relaxed">{exp.highlights}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ExperienceSection;
