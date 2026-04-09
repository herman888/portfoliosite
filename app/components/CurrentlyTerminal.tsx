"use client";

import React from "react";
import Image from "next/image";
import { currentlyItems } from "../site-content";

type Props = {
  onJumpToChat: (topicKey: string) => void;
};

export default function CurrentlyTerminal({ onJumpToChat }: Props) {
  return (
    <div className="border-t border-[#2a2a2a] pt-4">
      <div className="about-me-terminal">
        <div className="tracking-[0.2em] uppercase text-[0.65rem] text-gray-500 mb-3 font-medium">
          Currently
        </div>
        <ul className="space-y-1.5 about-me-line">
          {currentlyItems.map((item) => (
            <li key={item.id} className="flex items-center gap-2 flex-wrap">
              <span className="text-gray-500 select-none">▸</span>
              {item.prefix ? (
                <span>{item.prefix}</span>
              ) : null}
              {item.image ? (
                <span className="inline-flex shrink-0 w-6 h-6 rounded-sm overflow-hidden align-middle">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => onJumpToChat(item.topic)}
                className="underline decoration-gray-500 underline-offset-1 hover:decoration-gray-300"
              >
                {item.linkLabel}
              </button>
              {item.location ? (
                <span className="text-gray-500">· {item.location}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

