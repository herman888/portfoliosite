import { ImageResponse } from "next/og";
import { site } from "./site-content";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const letter = site.person.firstName.charAt(0).toUpperCase();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "black",
          borderRadius: "50%",
          border: "2px solid white",
          fontSize: 20,
          fontWeight: 700,
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {letter}
      </div>
    ),
    { ...size }
  );
}
