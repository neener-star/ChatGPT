import { NextResponse } from "next/server";
import { augustStore } from "@/lib/august/store";
import { serializeSnapshot } from "@/lib/august/persistence";

export async function GET() {
  const snapshot = {
    memories: augustStore.memories,
    beliefs: augustStore.beliefs,
    personality: augustStore.personality,
    updatedAt: new Date().toISOString(),
  };

  return new NextResponse(serializeSnapshot(snapshot), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="august-memory.json"',
    },
  });
}
