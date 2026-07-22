import { NextResponse } from "next/server";
import { augustStore } from "@/lib/august/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const original = typeof body.original === "string" ? body.original.trim() : "";
    const correction = typeof body.correction === "string" ? body.correction.trim() : "";
    const rating = body.rating === "sounds_like_me" || body.rating === "not_me" ? body.rating : "neutral";

    if (!original || !correction) {
      return NextResponse.json({ error: "Original and corrected responses are required." }, { status: 400 });
    }

    // Training examples are kept as high-value episodic evidence for now.
    // The next personality-learning pass will extract vocabulary, rhythm,
    // tone, and disagreement patterns from these examples.
    augustStore.memories.push({
      id: `training-${Date.now()}`,
      type: "episodic",
      content: `AUGUST training example (${rating}). Original: ${original} Corrected: ${correction}`,
      importance: 0.85,
      confidence: 0.95,
      tags: ["training", rating, "response-correction"],
      createdAt: new Date().toISOString(),
      source: "training-page",
    });

    return NextResponse.json({ ok: true, status: "training_example_saved" });
  } catch {
    return NextResponse.json({ error: "Could not save training feedback." }, { status: 500 });
  }
}
