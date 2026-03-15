"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const CHARSET = "@%#WMNX0x+:-. ";

function brightnessToChar(b: number) {
  const idx = Math.floor(b * (CHARSET.length - 1));
  return CHARSET[idx];
}

export type PortraitHitTestRef = {
  isOverPerson(clientX: number, clientY: number): boolean;
} | null;

type AsciiAvatarProps = {
  hitTestRef?: React.MutableRefObject<PortraitHitTestRef>;
};

const AsciiAvatar: React.FC<AsciiAvatarProps> = ({ hitTestRef }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [noiseSeed, setNoiseSeed] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const personMaskRef = useRef<boolean[][] | null>(null);
  const dimensionsRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = "/portrait.jpg";
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const targetWidth = 160;
      const aspect = img.height / img.width;
      const targetHeight = Math.round(targetWidth * aspect * 0.78);

      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Use most of the image, light center crop so framing matches original
      const srcWidth = img.width * 0.88;
      const srcX = (img.width - srcWidth) / 2;
      ctx.drawImage(
        img,
        srcX,
        0,
        srcWidth,
        img.height,
        0,
        0,
        targetWidth,
        targetHeight
      );
      const data = ctx.getImageData(0, 0, targetWidth, targetHeight).data;

      const outputWidth = Math.floor(targetWidth * 0.82);
      const xOffset = Math.floor((targetWidth - outputWidth) / 2);
      const centerX = outputWidth / 2;
      const newLines: string[] = [];
      const personMask: boolean[][] = [];
      for (let y = 0; y < targetHeight; y++) {
        let row = "";
        personMask.push([]);
        for (let x = 0; x < outputWidth; x++) {
          const i = (y * targetWidth + (x + xOffset)) * 4;
          const r = data[i] / 255;
          const g = data[i + 1] / 255;
          const b = data[i + 2] / 255;
          const a = data[i + 3] / 255;
          if (a < 0.22) {
            row += " ";
            personMask[y].push(false);
            continue;
          }
          const raw = (r + g + b) / 3;
          const brightness = Math.pow(raw, 0.82);
          const baseChar = brightnessToChar(1 - brightness);

          // distance from horizontal center (0 = center, 1 = edges)
          const distFromCenter = Math.abs(x - centerX) / centerX;

          // whole face + head + torso: keep completely stable so it matches the real photo
          const isFaceOrBody =
            (brightness < 0.78 && distFromCenter < 0.92) ||
            distFromCenter < 0.55;

          personMask[y].push(isFaceOrBody);

          if (isFaceOrBody) {
            row += baseChar;
          } else {
            // only outer sliver / background: very light shimmer
            const n = (x * 73856093 + y * 19349663 + noiseSeed) & 31;
            if (n === 0) {
              const jitter =
                ((x * 92837111 + y * 689287499 + noiseSeed) & 1) === 0 ? -1 : 1;
              const idx = Math.max(
                0,
                Math.min(
                  CHARSET.length - 1,
                  CHARSET.indexOf(baseChar) + jitter
                )
              );
              row += CHARSET[idx];
            } else {
              row += baseChar;
            }
          }
        }
        newLines.push(row);
      }
      personMaskRef.current = personMask;
      dimensionsRef.current = { w: outputWidth, h: targetHeight };
      setLines(newLines);
    };
  }, [noiseSeed]);

  useEffect(() => {
    if (lines.length === 0 || !hitTestRef) return;
    const mask = personMaskRef.current;
    const dim = dimensionsRef.current;
    const el = wrapperRef.current;
    if (!mask || !el || dim.w === 0 || dim.h === 0) return;
    hitTestRef.current = {
      isOverPerson(clientX: number, clientY: number) {
        const rect = el.getBoundingClientRect();
        const col = Math.floor(((clientX - rect.left) / rect.width) * dim.w);
        const row = Math.floor(((clientY - rect.top) / rect.height) * dim.h);
        if (col < 0 || col >= dim.w || row < 0 || row >= dim.h) return false;
        return !!mask[row][col];
      },
    };
    return () => {
      hitTestRef.current = null;
    };
  }, [lines, hitTestRef]);

  useEffect(() => {
    const id = setInterval(() => {
      setNoiseSeed((s) => (s + 1) & 0xffffffff);
    }, 130);
    return () => clearInterval(id);
  }, []);

  const content = useMemo(
    () =>
      lines.map((line, idx) => (
        <span key={idx} className="ascii-row">
          {line}
        </span>
      )),
    [lines]
  );

  return (
    <div ref={wrapperRef} className="ascii-avatar-wrapper">
      <pre className="ascii-avatar">{content}</pre>
    </div>
  );
};

export default AsciiAvatar;

