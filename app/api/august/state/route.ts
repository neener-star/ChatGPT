import { NextResponse } from "next/server";
import { augustStore } from "@/lib/august/store";

export async function GET() {
  return NextResponse.json({
    memories: augustStore.memories,
    beliefs: augustStore.beliefs,
    personality: augustStore.personality,
  });
}
