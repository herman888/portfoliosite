/** Lightweight UI sounds via Web Audio — no asset files needed. */

let audioCtx: AudioContext | null = null;
let unlocked = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  return audioCtx;
}

/** Call once after user gesture so sounds can play. */
export function unlockPortfolioAudio() {
  const ctx = getCtx();
  if (!ctx || unlocked) return;
  unlocked = true;
  if (ctx.state === "suspended") void ctx.resume();
}

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function playNoiseBurst({
  duration = 0.07,
  volume = 0.045,
  filterFreq = 900,
}: {
  duration?: number;
  volume?: number;
  filterFreq?: number;
}) {
  if (reducedMotion()) return;
  const ctx = getCtx();
  if (!ctx) return;
  unlockPortfolioAudio();
  if (ctx.state === "suspended") return;

  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = filterFreq;
  filter.Q.value = 0.7;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  src.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  src.start();
}

export type PortfolioSound = "marker" | "underline" | "pop" | "scribble";

export function playPortfolioSound(kind: PortfolioSound) {
  switch (kind) {
    case "marker":
      playNoiseBurst({ duration: 0.09, volume: 0.05, filterFreq: 720 });
      break;
    case "underline":
      playNoiseBurst({ duration: 0.12, volume: 0.038, filterFreq: 520 });
      break;
    case "pop":
      playNoiseBurst({ duration: 0.04, volume: 0.035, filterFreq: 1400 });
      break;
    case "scribble":
      playNoiseBurst({ duration: 0.06, volume: 0.03, filterFreq: 1100 });
      setTimeout(() => playNoiseBurst({ duration: 0.05, volume: 0.025, filterFreq: 850 }), 55);
      break;
    default:
      break;
  }
}
