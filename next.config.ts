import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /** Use this app as tracing root when parent folders contain other lockfiles. */
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
