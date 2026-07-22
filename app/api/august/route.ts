import { NextResponse } from "next/server";
import { inferBehavior } from "@/lib/august/behavior";
import { rankMemories } from "@/lib/august/memory";
import { buildAugustPrompt } from "@/lib/august/prompt";
import { defaultPersonality } from "@/lib/august/personality";
import { augustStore } from "@/lib/august/store";
import { getConfiguredProvider } from "@/lib/august/provider";
import { AUGUST_RESPONSE_SCHEMA } from "@/lib/august/response-schema";
import { extractMemoryCandidates } from "@/lib/august/memory-write";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ error: "AUGUST needs a message." }, { status: 400 });
    }

    const memories = rankMemories(message, augustStore.memories);
    const personality = augustStore.personality.frequentWords.length
      ? augustStore.personality
      : defaultPersonality;

    const behavior = inferBehavior({
      userMessage: message,
      memories,
      beliefs: augustStore.beliefs,
      personality,
    });

    const prompt = buildAugustPrompt(message, memories, augustStore.beliefs, personality);
    const provider = getConfiguredProvider();

    if (!provider) {
      return NextResponse.json({
        ok: true,
        status: "brain_ready",
        behavior,
        retrievedMemories: memories,
        message: "AUGUST's cognitive pipeline is ready. Set AUGUST_PROVIDER=ollama to activate the local model.",
      });
    }

    const result = await provider.generate({
      prompt,
      responseSchema: AUGUST_RESPONSE_SCHEMA,
    });

    const newMemories = extractMemoryCandidates(result, "conversation");
    augustStore.memories.push(...newMemories);

    return NextResponse.json({
      ok: true,
      status: "responded",
      response: result.response,
      behavior: result.behavior,
      memoryCandidates: newMemories,
      beliefSignals: result.beliefSignals,
    });
  } catch (error) {
    console.error("AUGUST API error", error);
    return NextResponse.json({ error: "AUGUST could not process the request." }, { status: 500 });
  }
}
