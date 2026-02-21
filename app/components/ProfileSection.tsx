import Image from 'next/image';

const ProfileSection = () => {
	return (
		<div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between bg-transparent py-16 px-4 gap-12">
			{/* Profile image on the left */}
			<div className="flex-shrink-0 flex flex-col items-center">
				<div className="w-56 h-56 rounded-full overflow-hidden border-4 border-[#d6c9a5] mb-4 relative">
					<Image src="/portrait.jpg" alt="Profile" fill style={{objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.15)'}} />
				</div>
				<div className="flex space-x-3 mt-2">
					<a href="https://github.com/herman888" target="_blank" rel="noopener noreferrer" className="bg-[#d6c9a5] p-2 rounded-full text-gray-700 hover:bg-[#e5e5c0] transition">
						<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
					</a>
					<a href="https://www.linkedin.com/in/hermanisayenka/" target="_blank" rel="noopener noreferrer" className="bg-[#d6c9a5] p-2 rounded-full text-gray-700 hover:bg-[#e5e5c0] transition">
						<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
					</a>
					<a href="mailto:herman.isayenka@gmail.com" className="bg-[#d6c9a5] p-2 rounded-full text-gray-700 hover:bg-[#e5e5c0] transition">
						<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
					</a>
				</div>
			</div>

			{/* Info on the right */}
			<div className="flex-1 flex flex-col items-start max-w-xl">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">Herman Isayenka</h1>
				<h2 className="text-lg text-gray-700 mb-4">Electrical Engineering @ YorkU, Schulich Leader</h2>
				<div className="border-l-2 border-[#d6c9a5] pl-4 mb-4">
					<p className="mb-2 text-gray-700">
						Interested in <b>software</b> (especially <b>big data</b>), <b>robotics</b>, and <b>autonomous systems</b>—but also in <b>hardware</b>: building things with my hands, soldering, and working with circuits. I love projects that combine both software and hardware, letting me bridge the digital and physical worlds.<br />
						I like Tennis, Rock Climbing, Hockey
					</p>
				</div>
				<h3 className="text-lg font-semibold mb-2">Previously I&apos;ve:</h3>
				<ul className="mb-4 text-gray-700">
					<li>Interned @ <b>SellStatic</b>: Cloud infra, backend, frontend</li>
					<li>Researched <b>Drone vision</b> @ University of Toronto</li>
				</ul>
				<button
					className="px-6 py-3 rounded border border-gray-600 bg-[#f5f5dc] text-gray-800 font-semibold shadow hover:bg-[#e5e5c0] transition mt-2"
					onClick={() => window.location.href = '/projects'}
				>
					I&apos;m always building. Check it out!
				</button>
			</div>
		</div>
	);
};

export default ProfileSection;
