import type { BeliefAnchor, Memory, PersonalityFingerprint } from "./types";

export interface AugustStore {
  memories: Memory[];
  beliefs: BeliefAnchor[];
  personality: PersonalityFingerprint;
}

/**
 * Temporary in-memory store for local development.
 * Replace with a persistent database adapter before production use.
 */
export const augustStore: AugustStore = {
  memories: [],
  beliefs: [],
  personality: {
    frequentWords: [],
    avoidedWords: [],
    sentenceLength: { average: 0, variance: 0 },
    punctuation: {},
    fillers: [],
    directness: 0.5,
    humor: 0.5,
    emotionalVolatility: 0.5,
    disagreementStyle: "mixed",
  },
};
