"use client";

import React, { useEffect, useMemo, useState } from "react";

export type PaletteCommand = {
  id: string;
  label: string;
  keywords?: string;
  run: () => void;
};

type Props = {
  commands: PaletteCommand[];
  placeholder?: string;
};

function fuzzyScore(query: string, text: string) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t === q) return 1000;
  if (t.includes(q)) return 500;
  // simple subsequence scoring
  let ti = 0;
  let score = 0;
  for (let qi = 0; qi < q.length; qi++) {
    const ch = q[qi];
    const found = t.indexOf(ch, ti);
    if (found === -1) return 0;
    score += 10;
    ti = found + 1;
  }
  return score;
}

export default function CommandPalette({ commands, placeholder }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return commands.slice(0, 10);
    const scored = commands
      .map((c) => {
        const text = `${c.label} ${c.keywords ?? ""}`;
        return { c, score: fuzzyScore(q, text) };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);
    return scored.slice(0, 10).map((x) => x.c);
  }, [commands, query]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
        setQuery("");
        setActiveIndex(0);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    setActiveIndex(0);
  }, [query, open]);

  if (!open) return null;

  return (
    <div className="command-palette-overlay" role="dialog" aria-modal="true">
      <div className="command-palette">
        <div className="command-palette-header">
          <div className="text-[0.7rem] uppercase tracking-[0.25em] text-gray-500">
            command palette
          </div>
          <div className="text-[0.65rem] text-gray-500">
            Ctrl/Cmd+K
          </div>
        </div>

        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder ?? "Type a command…"}
          className="command-palette-input"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(0, i - 1));
            }
            if (e.key === "Enter") {
              e.preventDefault();
              const cmd = filtered[activeIndex];
              if (!cmd) return;
              cmd.run();
              setOpen(false);
              setQuery("");
            }
          }}
        />

        <div className="command-palette-list">
          {filtered.length === 0 ? (
            <div className="command-palette-empty">No commands match.</div>
          ) : (
            filtered.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                className={`command-palette-item ${
                  idx === activeIndex ? "command-palette-item-active" : ""
                }`}
                onClick={() => {
                  c.run();
                  setOpen(false);
                  setQuery("");
                }}
              >
                <span className="command-palette-item-label">{c.label}</span>
              </button>
            ))
          )}
        </div>

        <div className="command-palette-hint text-gray-500 text-[0.65rem] mt-3">
          Tip: press <span className="text-gray-200">Esc</span> to close.
        </div>
      </div>
    </div>
  );
}

