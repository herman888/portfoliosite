"use client";

import { useEffect } from "react";

const EMBED_SCRIPT_SRC = "https://www.instagram.com/embed.js";

type Instgrm = { Embeds: { process: () => void } };

function getInstgrm(): Instgrm | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { instgrm?: Instgrm }).instgrm;
}

function processEmbeds() {
  getInstgrm()?.Embeds.process();
}

function loadEmbedScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (getInstgrm()) {
    processEmbeds();
    return Promise.resolve();
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${EMBED_SCRIPT_SRC}"]`,
  );
  if (existing) {
    return new Promise((resolve) => {
      const done = () => {
        processEmbeds();
        resolve();
      };
      if (existing.dataset.loaded === "1") {
        done();
        return;
      }
      existing.addEventListener("load", done, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = EMBED_SCRIPT_SRC;
    s.async = true;
    s.dataset.loaded = "0";
    s.onload = () => {
      s.dataset.loaded = "1";
      processEmbeds();
      resolve();
    };
    s.onerror = () => reject(new Error("Instagram embed.js failed to load"));
    document.body.appendChild(s);
  });
}

type Props = {
  reelId: string;
  title: string;
  /** Extra classes on the outer wrapper (e.g. absolute inset-0). */
  className?: string;
  /** Card, wide 2-col banner, or modal. */
  density?: "card" | "detail" | "wide";
};

/**
 * Official Instagram embed (blockquote + embed.js). Plain /embed/ iframes often
 * show a blank frame or block autoplay; this matches what Instagram’s “Embed”
 * copy-paste uses.
 */
export function InstagramReelEmbed({
  reelId,
  title,
  className = "",
  density = "card",
}: Props) {
  const permalink = `https://www.instagram.com/reel/${reelId}/`;
  const scale =
    density === "detail"
      ? "scale-[1.12] sm:scale-[1.18]"
      : density === "wide"
        ? "scale-[0.82] sm:scale-[0.88] md:scale-[0.94] lg:scale-[1]"
        : "scale-[1.38] sm:scale-[1.52] md:scale-[1.62]";
  const embedMax =
    density === "wide" ? "max-w-[min(420px,calc(100vw-2rem))]" : "max-w-[326px]";

  useEffect(() => {
    let cancelled = false;
    void loadEmbedScript()
      .then(() => {
        if (cancelled) return;
        // Re-scan after React has committed the blockquote (embed.js mutates DOM).
        requestAnimationFrame(() => processEmbeds());
      })
      .catch(() => {
        /* network / adblock — user can still use “Open project” link */
      });
    return () => {
      cancelled = true;
    };
  }, [reelId, density]);

  return (
    <div
      className={`flex min-h-0 w-full flex-col items-center justify-center overflow-hidden bg-white ${className}`}
    >
      {/* Instagram’s iframe is ~326px wide; centering it in a full-width card leaves huge black gutters — scale up from a fixed base width. */}
      <div
        className={`mx-auto flex w-full ${embedMax} justify-center overflow-visible py-0.5 ${scale}`}
        style={{ transformOrigin: "center center" }}
      >
        <blockquote
          className={`instagram-media !m-0 w-full min-w-0 ${embedMax}`}
          data-instgrm-permalink={permalink}
          data-instgrm-version="14"
          style={{
            background: "transparent",
            border: 0,
            margin: 0,
          }}
        >
          <a href={permalink} target="_blank" rel="noopener noreferrer">
            {title} — view on Instagram
          </a>
        </blockquote>
      </div>
    </div>
  );
}
