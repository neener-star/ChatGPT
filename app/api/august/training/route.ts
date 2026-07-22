import { NextResponse } from "next/server";
import { augustStore } from "@/lib/august/store";
import { learnFromExample } from "@/lib/august/learning";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const original = typeof body.original === "string" ? body.original.trim() : "";
    const correction = typeof body.correction === "string" ? body.correction.trim() : "";
    const rating = body.rating === "sounds_like_me" || body.rating === "not_me" ? body.rating : "neutral";
    if (!original || !correction) return NextResponse.json({ error: "Original and correction are required." }, { status: 400 });

    augustStore.personality = learnFromExample(augustStore.personality, { original, correction, rating });
    augustStore.memories.push({
      id: `training-${Date.now()}`, type: "episodic",
      content: `Training (${rating}). Original: ${original} Correction: ${correction}`,
      importance: 0.85, confidence: 0.95, tags: ["training", rating],
      createdAt: new Date().toISOString(), source: "training-page",
    });
    return NextResponse.json({ ok: true, status: "personality_updated", personality: augustStore.personality });
  } catch {
    return NextResponse.json({ error: "Could not train AUGUST." }, { status: 500 });
  }
}
