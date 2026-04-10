import type { Viewport } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { siteMetadata } from "./site-metadata";

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
});

const plusJakarta = Plus_Jakarta_Sans({
	subsets: ['latin'],
	variable: '--font-editorial',
});

export const metadata = siteMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${jetbrainsMono.variable} ${plusJakarta.variable}`}
		>
			<body className="min-h-screen bg-background font-sans text-foreground antialiased">
				{children}
				<Analytics />
			</body>
		</html>
	);
}
