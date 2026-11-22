import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { cleanText, isValidEmail } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without writing to the database.
  if (cleanText(payload.company, 100)) {
    return NextResponse.json({ ok: true, message: "You're on the list." });
  }

  const name = cleanText(payload.name, 80);
  const email = cleanText(payload.email, 160).toLowerCase();
  const postal = cleanText(payload.postal, 20);
  const source = cleanText(payload.source, 40) || "website";
  const consent = payload.consent === true;

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your first name.";
  if (!isValidEmail(email)) errors.email = "Please enter a valid email address.";
  if (!consent) errors.consent = "Consent is required to join the mailing list.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", errors },
      { status: 422 },
    );
  }

  try {
    const db = await getDb();
    await db.execute({
      sql: `INSERT INTO subscribers (name, email, postal_code, consent, source)
            VALUES (?, ?, ?, 1, ?)
            ON CONFLICT(email) DO UPDATE SET
              name = excluded.name,
              postal_code = excluded.postal_code,
              consent = excluded.consent,
              source = excluded.source`,
      args: [name, email, postal || null, source],
    });

    return NextResponse.json({
      ok: true,
      message: "Welcome to the family. Watch your inbox for tour news and new music.",
    });
  } catch (error) {
    console.error("subscribe failed", error);
    return NextResponse.json(
      { error: "We couldn't save your signup. Please try again in a moment." },
      { status: 500 },
    );
  }
}
