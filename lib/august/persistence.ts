import type { BeliefAnchor, Memory, PersonalityFingerprint } from "./types";

export interface AugustSnapshot {
  memories: Memory[];
  beliefs: BeliefAnchor[];
  personality: PersonalityFingerprint;
  updatedAt: string;
}

const KEY = "august-snapshot-v1";

export function serializeSnapshot(snapshot: AugustSnapshot): string {
  return JSON.stringify(snapshot, null, 2);
}

export function parseSnapshot(raw: string): AugustSnapshot | null {
  try {
    const parsed = JSON.parse(raw) as AugustSnapshot;
    if (!parsed || !Array.isArray(parsed.memories) || !Array.isArray(parsed.beliefs) || !parsed.personality) return null;
    return parsed;
  } catch {
    return null;
  }
}

export { KEY };
