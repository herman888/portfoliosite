"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { RadarMode } from "./FlightRadarHero";

export type TerminalTopic = { key: string; prompt: string };

type Props = {
  topics: TerminalTopic[];
  canPlayVoice: boolean;
  onJumpToChat: (topicKey: string) => void;
  onJumpToProjects: () => void;
  onJumpToCurrently: () => void;
  onPlayVoice: () => void;
  radarMode: RadarMode;
  onSetRadarMode: (next: RadarMode) => void;
  onNavigateTo: (path: string) => void;
};

type TerminalLine = {
  id: string;
  kind: "system" | "input" | "result";
  text: string;
};

const makeId = () => Math.random().toString(16).slice(2);

export default function TerminalMiniGame(props: Props) {
  const {
    topics,
    canPlayVoice,
    onJumpToChat,
    onJumpToProjects,
    onJumpToCurrently,
    onPlayVoice,
    radarMode,
    onSetRadarMode,
    onNavigateTo,
  } = props;

  const [lines, setLines] = useState<TerminalLine[]>(() => [
    {
      id: makeId(),
      kind: "system",
      text: "COMMS TERMINAL ONLINE. Type `help`.",
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const historyIndexRef = useRef(-1);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Keep focus consistent after mount so the terminal feels alive.
    const t = window.setTimeout(() => inputRef.current?.focus(), 200);
    return () => window.clearTimeout(t);
  }, []);

  const helpText = useMemo(() => {
    const topicKeys = topics.map((t) => t.key).join(", ");
    return [
      "Commands:",
      "  help                         - show commands",
      "  clear                        - clear terminal",
      "  projects                     - jump to Projects section",
      "  current                      - jump to Currently section",
      `  chat <topicKey>            - tune comms (topic: ${topicKeys})`,
      "  voice                        - play voice for the latest answer",
      "  mode scan|orbit|return      - change radar mode",
      "  connect                      - go to Contact page",
    ].join("\n");
  }, [topics]);

  const pushLine = (kind: TerminalLine["kind"], text: string) => {
    setLines((prev) => [...prev, { id: makeId(), kind, text }]);
  };

  const resolveTopicKey = (raw: string) => {
    const normalized = raw.trim().toLowerCase();
    return topics.find((t) => t.key.toLowerCase() === normalized)?.key;
  };

  const execute = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    pushLine("input", `> ${trimmed}`);

    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ").trim();
    const c = cmd.toLowerCase();

    if (c === "help") {
      pushLine("result", helpText);
      return;
    }
    if (c === "clear") {
      setLines([
        { id: makeId(), kind: "system", text: "TERMINAL CLEARED. Type `help`." },
      ]);
      return;
    }
    if (c === "projects") {
      onJumpToProjects();
      pushLine("result", "Route locked: PROJECTS.");
      return;
    }
    if (c === "current" || c === "currently") {
      onJumpToCurrently();
      pushLine("result", "Route locked: CURRENTLY.");
      return;
    }
    if (c === "connect") {
      onNavigateTo("/contact");
      pushLine("result", "Channel opened: CONTACT.");
      return;
    }
    if (c === "voice" || c === "playvoice") {
      if (!canPlayVoice) {
        pushLine("result", "No answer loaded yet. Ask a question first.");
        return;
      }
      onPlayVoice();
      pushLine("result", "Voice command accepted. Playing audio…");
      return;
    }
    if (c === "mode" || c === "radar") {
      const a = arg.toLowerCase();
      if (a === "scan") onSetRadarMode("scan");
      else if (a === "orbit") onSetRadarMode("orbit");
      else if (a === "return") onSetRadarMode("return");
      else {
        pushLine("result", "Unknown mode. Use: scan, orbit, return.");
        return;
      }
      pushLine("result", `Radar mode set: ${a}`);
      return;
    }
    if (c === "chat") {
      const key = resolveTopicKey(arg);
      if (!key) {
        pushLine(
          "result",
          `Unknown topic. Try one of: ${topics
            .map((t) => t.key)
            .slice(0, 5)
            .join(", ")}…`
        );
        return;
      }
      onJumpToChat(key);
      pushLine("result", `Comms tuned: ${key.toUpperCase()}.`);
      return;
    }

    pushLine("result", `Unknown command: ${cmd}. Type 'help'.`);
  };

  const onSubmit = () => {
    const v = input;
    setInput("");
    setHistory((prev) => {
      const next = [...prev, v];
      return next.slice(-30);
    });
    historyIndexRef.current = -1;
    execute(v);
  };

  return (
    <div className="terminal-window chat-panel p-3 sm:p-3 md:p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[0.65rem] uppercase tracking-[0.25em] text-gray-500">
          terminal / comms
        </div>
        <div className="text-[0.65rem] text-gray-500">
          radar: <span className="text-gray-200">{radarMode}</span>
        </div>
      </div>

      <div className="mt-3 terminal-lines">
        {lines.slice(-18).map((l) => (
          <pre
            key={l.id}
            className={`terminal-line whitespace-pre-wrap ${
              l.kind === "input"
                ? "text-gray-200"
                : l.kind === "result"
                  ? "text-[#bfa94c]"
                  : "text-gray-500"
            }`}
          >
            {l.text}
          </pre>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-gray-500 text-[0.75rem] select-none">_</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit();
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              const prev = historyIndexRef.current;
              const nextIndex =
                prev < 0 ? history.length - 1 : Math.max(0, prev - 1);
              const v = history[nextIndex];
              if (v !== undefined) setInput(v);
              historyIndexRef.current = nextIndex;
            }
            if (e.key === "ArrowDown") {
              e.preventDefault();
              const prev = historyIndexRef.current;
              const nextIndex = prev < 0 ? -1 : prev + 1;
              if (nextIndex >= history.length) {
                setInput("");
                historyIndexRef.current = -1;
              } else {
                const v = history[nextIndex];
                if (v !== undefined) setInput(v);
                historyIndexRef.current = nextIndex;
              }
            }
          }}
          placeholder="type a command… (help)"
          className="terminal-input flex-1 bg-black/30 border border-[#2a2a2a] rounded-sm px-2 py-1 text-gray-200 text-[0.75rem] outline-none focus:border-gray-500"
        />
        <button
          type="button"
          className="terminal-run px-2 py-1 border border-[#2a2a2a] rounded-sm text-[0.75rem] text-gray-300 hover:text-white hover:border-gray-500"
          onClick={onSubmit}
          aria-label="Run command"
        >
          RUN
        </button>
      </div>
    </div>
  );
}

