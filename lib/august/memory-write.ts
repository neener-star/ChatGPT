import type { Memory } from "./types";
import type { AugustResponse } from "./response-schema";

export function extractMemoryCandidates(result: AugustResponse, source: string): Memory[] {
  const now = new Date().toISOString();
  return result.memoryCandidates
    .filter((candidate) => candidate.importance >= 0.55 && candidate.confidence >= 0.55)
    .map((candidate, index) => ({
      id: `memory-${Date.now()}-${index}`,
      ...candidate,
      createdAt: now,
      source,
    }));
}
