import Image from "next/image";
import { Play } from "lucide-react";

type Props = {
  /** Accessible label for the poster image. */
  title: string;
  posterSrc?: string;
  posterUnoptimized?: boolean;
  className?: string;
};

/**
 * Grid-card thumbnail for Instagram-backed projects: same 16:10 feel as photo/video
 * cards, with a play affordance. Title and copy live in the card body only.
 */
export function InstagramReelCardPreview({
  title,
  posterSrc,
  posterUnoptimized = false,
  className = "",
}: Props) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-neutral-100 ${className}`}
    >
      {posterSrc ? (
        posterUnoptimized ? (
          <img
            src={posterSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <Image
            src={posterSrc}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200"
          aria-hidden
        />
      )}
      <div
        className="absolute inset-0 bg-neutral-950/15 transition-colors group-hover:bg-neutral-950/25"
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-md ring-1 ring-black/5 transition-transform group-hover:scale-105 sm:h-12 sm:w-12">
          <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden />
          <span className="sr-only">Play {title} reel</span>
        </span>
      </div>
    </div>
  );
}
