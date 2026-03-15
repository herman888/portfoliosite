import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono, Press_Start_2P } from 'next/font/google';
import './globals.css';
import AnimatedCursor from './components/AnimatedCursor';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const pixelFont = Press_Start_2P({
	variable: '--font-pixel',
	weight: '400',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	metadataBase: new URL('https://hermanisayenka.ca'),
	title: 'Herman Isayenka - Developer Portfolio',
	description:
		'Herman Isayenka. Electrical Engineering student at York University.',
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
		description: 'Herman Isayenka. Electrical Engineering student at York University.',
		url: 'https://hermanisayenka.ca',
		siteName: 'Herman Isayenka - Portfolio',
		images: [
			{
				url: '/portrait.jpg',
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
		description: 'Herman Isayenka. Electrical Engineering student at York University.',
		creator: '@hermanisayenka',
		images: ['/portrait.jpg'],
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
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${pixelFont.variable}`} suppressHydrationWarning>
			<body className="bg-black text-gray-100">
				<Script
					id="theme-init"
					strategy="beforeInteractive"
					dangerouslySetInnerHTML={{
						__html: `(function(){var t=localStorage.getItem('theme');var r=document.documentElement;r.classList.remove('theme-light','theme-dark');r.classList.add(t==='light'?'theme-light':'theme-dark');})();`,
					}}
				/>
				<AnimatedCursor />
				{children}
			</body>
		</html>
	);
}
