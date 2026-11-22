import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { cleanText, isValidEmail } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const topics = [
  "General question",
  "Booking & live shows",
  "Press & media",
  "Store order support",
  "Fan mail",
] as const;

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (cleanText(payload.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = cleanText(payload.name, 100);
  const email = cleanText(payload.email, 160).toLowerCase();
  const topic = cleanText(payload.topic, 60);
  const message = cleanText(payload.message, 4000);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!isValidEmail(email)) errors.email = "Please enter a valid email address.";
  if (!topics.includes(topic as (typeof topics)[number])) errors.topic = "Choose a topic.";
  if (message.length < 10) errors.message = "Please write at least 10 characters.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", errors },
      { status: 422 },
    );
  }

  try {
    const db = await getDb();
    await db.execute({
      sql: `INSERT INTO messages (name, email, topic, message) VALUES (?, ?, ?, ?)`,
      args: [name, email, topic, message],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact failed", error);
    return NextResponse.json(
      { error: "Your message couldn't be sent. Please try again." },
      { status: 500 },
    );
  }
}
