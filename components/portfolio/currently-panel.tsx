"use client";

import Image from "next/image";
import Link from "next/link";
import { currentlyItems } from "@/app/site-content";

type CurrentlyPanelProps = {
  /** Lighter layout without card chrome (Fiona-style flow). */
  bare?: boolean;
};

/** Light, large “Currently” list — sits under the hero on the editorial home. */
export function PortfolioCurrentlyPanel({ bare = false }: CurrentlyPanelProps) {
  const shell = bare
    ? "px-0 py-0"
    : "rounded-2xl border border-neutral-200 bg-neutral-50/50 px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14";

  return (
    <div className={shell}>
      <div className="mb-8 flex min-w-0 items-center gap-5 sm:mb-10">
        <span
          id="currently-heading"
          className="shrink-0 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-neutral-500 sm:text-xs"
        >
          Currently
        </span>
        <div className="h-px min-w-0 flex-1 bg-neutral-300" aria-hidden />
      </div>
      <ul className="space-y-5 text-[0.9375rem] leading-relaxed text-neutral-800 sm:space-y-7 sm:text-base md:text-lg md:leading-relaxed lg:text-xl">
        {currentlyItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-3.5"
          >
            <span
              className="w-5 shrink-0 select-none text-sm text-neutral-400 sm:text-base md:text-lg"
              aria-hidden
            >
              ▶
            </span>
            {item.prefix ? (
              <span className="text-neutral-600">{item.prefix}</span>
            ) : null}
            {item.image ? (
              <span className="inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm sm:h-11 sm:w-11 md:h-12 md:w-12">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={48}
                  height={48}
                  className="h-full w-full object-contain p-1"
                />
              </span>
            ) : null}
            {item.href ? (
              item.href.startsWith("/") ? (
                <Link
                  href={item.href}
                  className="font-medium text-black underline decoration-neutral-400 underline-offset-[5px] transition-colors hover:decoration-black"
                >
                  {item.linkLabel}
                </Link>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-black underline decoration-neutral-400 underline-offset-[5px] transition-colors hover:decoration-black"
                >
                  {item.linkLabel}
                </a>
              )
            ) : (
              <span className="font-medium text-black">{item.linkLabel}</span>
            )}
            {item.location ? (
              <span className="text-neutral-500">· {item.location}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
