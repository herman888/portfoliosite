import { NextRequest } from "next/server";

const ELEVEN_API_KEY = process.env.ELEVENLABS_API_KEY?.trim();
const ELEVEN_VOICE_ID = process.env.ELEVENLABS_VOICE_ID?.trim();

export async function POST(req: NextRequest) {
  if (!ELEVEN_API_KEY || !ELEVEN_VOICE_ID) {
    return new Response("Missing ElevenLabs configuration", { status: 500 });
  }

  const { text } = (await req.json()) as { text?: string };

  if (!text || !text.trim()) {
    return new Response("Missing text", { status: 400 });
  }

  try {
    const elevenRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVEN_API_KEY,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_turbo_v2",
          voice_settings: {
            stability: 0.4,
            similarity_boost: 0.8,
          },
        }),
      }
    );

    if (!elevenRes.ok) {
      const errorText = await elevenRes.text();
      console.error("ElevenLabs error:", errorText);
      return new Response("Failed to generate audio", { status: 502 });
    }

    const audioData = await elevenRes.arrayBuffer();

    return new Response(audioData, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("TTS route error:", err);
    return new Response("Error generating audio", { status: 500 });
  }
}

