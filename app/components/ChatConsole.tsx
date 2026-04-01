"use client";

import React, { useEffect, useState } from "react";
import { site } from "../site-content";

type PromptOption = { key: string; label: string };

type Props = {
  promptOptions: PromptOption[];
  activeSection: string;
  onPromptSelect: (key: string) => void;

  isLoading: boolean;
  error: string | null;
  answer: string;

  inputValue: string;
  onInputChange: (next: string) => void;
  inputPlaceholder: string;
  onSubmit: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  sectionRef: React.RefObject<HTMLElement | null>;

  isGeneratingAudio: boolean;
  isPlayingAudio: boolean;
  ttsError: string | null;
  onPlayVoice: () => void;
};

function TypewriterText({ text }: { text: string }) {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    setVisibleChars(0);
    const interval = window.setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= text.length) {
          window.clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 18);

    return () => window.clearInterval(interval);
  }, [text]);

  return <p className="chat-text">{text.slice(0, visibleChars)}</p>;
}

export default function ChatConsole(props: Props) {
  const {
    promptOptions,
    activeSection,
    onPromptSelect,
    isLoading,
    error,
    answer,
    inputValue,
    onInputChange,
    inputPlaceholder,
    onSubmit,
    audioRef,
    sectionRef,
    isGeneratingAudio,
    isPlayingAudio,
    ttsError,
    onPlayVoice,
  } = props;

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement | null>}
      className="w-full max-w-4xl mx-auto px-3 sm:px-4 pt-6 sm:pt-10 md:pt-16 pb-4 md:pb-4 shrink-0 hero-content-reveal self-start sm:ml-4 md:ml-8"
    >
      <div className="chat-panel chat-panel-animate px-3 py-3 sm:px-4 md:px-6 md:py-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          {promptOptions.map((option) => {
            const isActive = activeSection === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => onPromptSelect(option.key)}
                className={`chat-prompt px-3 py-2 flex items-center gap-2 ${
                  isActive ? "chat-prompt-active" : ""
                }`}
              >
                <span className="text-sm leading-none">↳</span>
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>

        <div className="border-t border-[#2a2a2a] pt-3 flex flex-col gap-2 text-xs md:text-sm text-gray-200">
          <div className="flex items-center justify-between gap-2 text-[0.7rem] text-gray-500">
            <span className="uppercase tracking-[0.2em]">
              Ask about {site.person.firstName}
            </span>
          </div>

          <div className="chat-input w-full mt-2 px-3 py-2 text-gray-200 min-h-[3.5rem]">
            {isLoading && <p className="chat-text text-gray-500">Thinking...</p>}
            {!isLoading && error && (
              <p className="chat-text text-red-400">{error}</p>
            )}

            {!isLoading && !error && answer && (
              <>
                <TypewriterText key={answer} text={answer} />
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={onPlayVoice}
                      disabled={isGeneratingAudio}
                      className="chat-input flex items-center gap-1.5 px-2 py-1 text-[0.65rem] uppercase tracking-wider text-gray-400 hover:text-gray-200 disabled:opacity-50 w-fit"
                      aria-label={isPlayingAudio ? "Playing" : "Play answer with voice"}
                    >
                      {isGeneratingAudio
                        ? "Generating..."
                        : isPlayingAudio
                          ? "🔊 Playing"
                          : "🔊 Play voice"}
                    </button>

                    {ttsError && (
                      <p className="chat-text text-red-400 text-[0.6rem]">
                        {ttsError}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <audio ref={audioRef} className="hidden" />

          <div className="flex items-center gap-2 mt-2 min-h-[44px] sm:min-h-0">
            <input
              className="chat-input flex-1 min-h-[44px] sm:min-h-[2.25rem] px-3 py-2 bg-black text-gray-100 placeholder-gray-500"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSubmit();
                }
              }}
              placeholder={inputPlaceholder}
            />
            <button
              type="button"
              className="chat-input w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center shrink-0"
              onClick={onSubmit}
              aria-label="Send"
            >
              ⌲
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

