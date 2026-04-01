"use client";

import { useMemo, useState } from "react";
import { site } from "../site-content";

type Channel = "email" | "linkedin" | "github";

const inputClass =
  "px-3 py-2 bg-background text-foreground border border-border placeholder:text-muted-foreground rounded-sm outline-none focus:ring-2 focus:ring-ring";

export default function ContactPage() {
  const [channel, setChannel] = useState<Channel>("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const mailto = useMemo(() => {
    const safeName = name.trim() || "Visitor";
    const subject = encodeURIComponent(`Portfolio message (${safeName})`);
    const body = encodeURIComponent(
      `Name: ${safeName}\nEmail: ${email.trim() || "(not provided)"}\n\n${message.trim()}`
    );
    return `mailto:${site.links.email}?subject=${subject}&body=${body}`;
  }, [name, email, message]);

  const send = () => {
    setStatus(null);
    if (channel !== "email") {
      if (channel === "linkedin")
        window.open(site.links.linkedIn, "_blank", "noopener,noreferrer");
      if (channel === "github")
        window.open(site.links.github, "_blank", "noopener,noreferrer");
      setStatus("Channel opened.");
      return;
    }

    if (!message.trim()) {
      setStatus("Message is empty. Transmit something first.");
      return;
    }

    window.location.href = mailto;
    setStatus("Opened your email client. If nothing happened, check pop-up settings.");
  };

  return (
    <main className="min-h-screen bg-background text-foreground w-full max-w-4xl mx-auto px-3 sm:px-4 py-16 sm:py-20">
      <div className="border border-border bg-card text-card-foreground p-4 sm:p-6 md:p-8 rounded-sm">
        <div className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
          CONTACT / TRANSMIT
        </div>

        <h1 className="mt-3 text-2xl sm:text-3xl font-bold">Choose a channel</h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {(
            [
              { id: "email", label: "EMAIL" },
              { id: "linkedin", label: "LINKEDIN" },
              { id: "github", label: "GITHUB" },
            ] as const
          ).map((c) => {
            const active = channel === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setChannel(c.id)}
                className={`px-3 py-1 text-[0.7rem] uppercase tracking-wider border rounded-sm ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:text-foreground bg-muted/50"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {channel === "email" ? (
          <form
            className="mt-6 flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              className={inputClass}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={inputClass}
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <textarea
              className={`${inputClass} min-h-[140px]`}
              placeholder="Message (drones, cities, autonomy, internships...)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-4 py-2 text-[0.7rem] uppercase tracking-wider border border-border bg-muted hover:bg-muted/80"
              >
                Transmit
              </button>
              {status ? (
                <p
                  className={`text-[0.65rem] ${status.includes("empty") ? "text-destructive" : "text-muted-foreground"}`}
                >
                  {status}
                </p>
              ) : null}
            </div>
          </form>
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-muted-foreground text-[0.72rem] leading-relaxed">
              This channel opens an external profile (no message form).
            </p>
            <button
              type="button"
              onClick={send}
              className="px-4 py-2 text-[0.7rem] uppercase tracking-wider border border-border bg-muted hover:bg-muted/80 w-fit"
            >
              Open {channel.toUpperCase()}
            </button>
            {status ? (
              <p className="text-muted-foreground text-[0.65rem]">{status}</p>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
