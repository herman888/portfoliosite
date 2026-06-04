import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /** Use this app as tracing root when parent folders contain other lockfiles. */
  outputFileTracingRoot: projectRoot,
  images: {
    /** Satisfies next/image quality + Next.js 16 requirement; avoids noisy dev warnings. */
    qualities: [75, 85, 90, 95, 100],
  },
};

export default nextConfig;
