import { NextResponse } from "next/server";
import { inferBehavior } from "@/lib/august/behavior";
import { rankMemories } from "@/lib/august/memory";
import { buildAugustPrompt } from "@/lib/august/prompt";
import { defaultPersonality } from "@/lib/august/personality";
import { augustStore } from "@/lib/august/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ error: "AUGUST needs a message." }, { status: 400 });
    }

    const memories = rankMemories(message, augustStore.memories);
    const behavior = inferBehavior({
      userMessage: message,
      memories,
      beliefs: augustStore.beliefs,
      personality: augustStore.personality.frequentWords.length ? augustStore.personality : defaultPersonality,
    });

    const prompt = buildAugustPrompt(
      message,
      memories,
      augustStore.beliefs,
      augustStore.personality.frequentWords.length ? augustStore.personality : defaultPersonality
    );

    // The model provider is intentionally not hard-coded yet.
    // This endpoint currently exposes the assembled context so the UI can be wired
    // before an API key is added. The production implementation will call the chosen
    // provider here and validate its structured response against response-schema.ts.
    return NextResponse.json({
      ok: true,
      status: "brain_ready",
      behavior,
      retrievedMemories: memories,
      promptPreview: process.env.NODE_ENV === "development" ? prompt : undefined,
      message: "AUGUST's cognitive pipeline is ready for a model provider.",
    });
  } catch {
    return NextResponse.json({ error: "AUGUST could not process the request." }, { status: 500 });
  }
}
