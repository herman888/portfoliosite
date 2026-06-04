import type { Metadata } from "next";
import { fullName, site } from "./site-content";

/**
 * In dev, use localhost so relative URLs resolve on `next dev` (default port 3000).
 * Override with NEXT_PUBLIC_SITE_URL if you use another origin (e.g. http://127.0.0.1:3001).
 */
function metadataBase(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv);
    } catch {
      // Invalid env (e.g. missing scheme) would crash layout/metadata; fall back below.
    }
  }
  if (process.env.NODE_ENV === "development") {
    return new URL("http://localhost:3000");
  }
  return new URL(site.url);
}

export const siteMetadata: Metadata = {
  metadataBase: metadataBase(),
  title: `${fullName} | Developer Portfolio`,
  description: `${fullName}. ${site.person.headline}`,
  keywords: [
    fullName,
    "Portfolio",
    "Projects",
    "Vercel",
    "Hackathon",
    "Developer",
    "Software Developer",
    "Web Developer",
    "Clean Code",
    "Simple Design",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "User Experience",
    "Problem Solving",
    "Effective Solutions",
    "Web Development",
    "Frontend Development",
    "Backend Development",
  ],
  authors: [{ name: fullName }],
  creator: fullName,
  openGraph: {
    title: `${fullName} | Developer Portfolio`,
    description: `${fullName}. ${site.person.headline}`,
    url: site.url,
    siteName: `${fullName} - Portfolio`,
    images: [
      {
        url: "/portrait.jpg",
        width: 1200,
        height: 630,
        alt: `${fullName} | Developer Portfolio`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${fullName} | Developer Portfolio`,
    description: `${fullName}. ${site.person.headline}`,
    creator: site.links.twitterCreator,
    images: ["/portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
