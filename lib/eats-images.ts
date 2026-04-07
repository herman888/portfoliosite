import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

/** Paths under `/eats/...` for files in `public/eats` (build/runtime read). */
export function getEatsImagePaths(): string[] {
  const dir = path.join(process.cwd(), "public", "eats");
  try {
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((name) => IMAGE_EXT.test(name))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((name) => `/eats/${encodeURIComponent(name)}`);
  } catch {
    return [];
  }
}
