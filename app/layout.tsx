import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AnimatedCursor from './components/AnimatedCursor';
import Navbar from './components/Navbar';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Herman Isayenka - Developer Portfolio',
	description:
		'Portfolio site for Herman Isayenka, showcasing projects, hackathon wins, and more.',
	keywords: [
		'Herman Isayenka',
		'Portfolio',
		'Projects',
		'Vercel',
		'Hackathon',
		'Developer',
		'Software Developer',
		'Web Developer',
		'Clean Code',
		'Simple Design',
		'JavaScript',
		'TypeScript',
		'React',
		'Next.js',
		'User Experience',
		'Problem Solving',
		'Effective Solutions',
		'Web Development',
		'Frontend Development',
		'Backend Development',
	],
	authors: [{ name: 'Herman Isayenka' }],
	creator: 'Herman Isayenka',
	openGraph: {
		title: 'Herman Isayenka - Developer Portfolio',
		description: 'Portfolio site for Herman Isayenka, showcasing projects, hackathon wins, and more.',
		url: 'https://hermanisayenka.vercel.app',
		siteName: 'Herman Isayenka - Portfolio',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Herman Isayenka - Developer Portfolio',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Herman Isayenka - Developer Portfolio',
		description: 'Portfolio site for Herman Isayenka, showcasing projects, hackathon wins, and more.',
		creator: '@hermanisayenka',
		images: ['/og-image.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
			<body>
				<AnimatedCursor />
				<Navbar />
				<div className="container mx-auto px-4 py-8 bg-card shadow-lg min-h-screen flex flex-col items-center">
					{children}
				</div>
			</body>
		</html>
	);
}
