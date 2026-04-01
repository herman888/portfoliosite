import { NextRequest, NextResponse } from "next/server";
import { chatSystemContext, site } from "../../site-content";

// Loaded from .env.local (locally) or Vercel env (production)
const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(req: NextRequest) {
  if (!GROQ_API_KEY) {
    return NextResponse.json(
      {
        error: `Missing GROQ_API_KEY. Ask ${site.person.firstName} to set this in .env.local on Vercel and locally.`,
      },
      { status: 500 }
    );
  }

  try {
    const { question, topic } = (await req.json()) as {
      question?: string;
      topic?: string;
    };

    const userQuestion = (question || "").toString().trim();
    if (!userQuestion) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const topicSuffix = topic ? `\n\nThe current topic is: ${topic}.` : "";

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                chatSystemContext +
                "\n\nAnswer concisely (2–4 sentences) in a friendly tone." +
                topicSuffix,
            },
            {
              role: "user",
              content: userQuestion,
            },
          ],
          temperature: 0.2,
          max_tokens: 400,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", errorText);
      return NextResponse.json(
        { error: "Upstream chat API error." },
        { status: 502 }
      );
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const answer =
      data.choices?.[0]?.message?.content?.trim() ??
      "I couldn't generate a response just now.";

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Unexpected error in chat route." },
      { status: 500 }
    );
  }
}

