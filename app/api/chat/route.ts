import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const HERMAN_CONTEXT = `
You are a portfolio chatbot answering in the first person as Herman Isayenka.

When the user asks about Herman (background, projects, internships, interests,
age, etc.), you MUST base your answer only on the facts below. If you don't
know something specific about Herman, say you don't know instead of making it up.

For general questions that are not about Herman (math, coding, tech, random
knowledge), answer like a normal helpful AI assistant.

- I'm 18 years old and originally from Belarus.
- I'm a Schulich Leader studying Electrical Engineering at York University.
- I build projects at the intersection of AI, robotics, and cities:
  - CityPath AI (Shopify hackathon winner for city planning).
  - RedLamp (UofTHacks winner, a stress-aware study lamp).
  - GrowthSync (visualizes how new developments hit infrastructure).
  - Finding N.E.M.O (interactive container-drift simulation).
  - Multiple Arduino and hardware projects tying sensors, motors, and code together.
- I work on drone racing and autonomy research at U of T / UTIAS.
- I was previously a SWE intern at SellStatic.
- My favourite sports are hockey, tennis, and rock climbing.
- I'm looking for internships and roles close to real systems:
  backend and platform engineering, data/ML-heavy systems, robotics,
  autonomy, simulation, and city-scale infrastructure problems.
`.trim();

export async function POST(req: NextRequest) {
  if (!GROQ_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Missing GROQ_API_KEY. Ask Herman to set this in .env.local on Vercel and locally.",
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
                HERMAN_CONTEXT +
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

