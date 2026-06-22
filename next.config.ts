import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** Local dev only — keeps `.next` off iCloud-synced Documents (ETIMEDOUT / ENOENT). */
const distDir =
  process.env.NEXT_DIST_DIR ??
  (process.env.NODE_ENV === "development"
    ? path.join(os.tmpdir(), "minimalist-portfolio-next")
    : ".next");

const nextConfig: NextConfig = {
  distDir,
  /** Use this app as tracing root when parent folders contain other lockfiles. */
  outputFileTracingRoot: projectRoot,
  images: {
    /** Satisfies next/image quality + Next.js 16 requirement; avoids noisy dev warnings. */
    qualities: [75, 85, 90, 95, 100],
  },
  /**
   * iCloud / sync on ~/Documents can break webpack’s atomic renames into `.next/cache`.
   * In-memory-only cache avoids ENOENT on `_buildManifest.js.tmp.*` and missing manifests.
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
