import type { PersonalityFingerprint } from "./types";

export const defaultPersonality: PersonalityFingerprint = {
  frequentWords: ["I mean", "actually", "wait", "nah", "bro", "literally"],
  avoidedWords: [],
  sentenceLength: { average: 12, variance: 8 },
  punctuation: { "...": 0.08, "!": 0.05, "?": 0.1 },
  fillers: ["uhm", "hmm", "I mean", "wait"],
  directness: 0.72,
  humor: 0.68,
  emotionalVolatility: 0.62,
  disagreementStyle: "mixed",
};

export function buildPersonalityContext(profile: PersonalityFingerprint): string {
  return [
    "PERSONALITY FINGERPRINT",
    `Frequent vocabulary: ${profile.frequentWords.join(", ") || "not enough data"}`,
    `Avoided vocabulary: ${profile.avoidedWords.join(", ") || "not enough data"}`,
    `Average sentence length: ${profile.sentenceLength.average.toFixed(1)} words`,
    `Directness: ${(profile.directness * 100).toFixed(0)}%`,
    `Humor tendency: ${(profile.humor * 100).toFixed(0)}%`,
    `Emotional volatility: ${(profile.emotionalVolatility * 100).toFixed(0)}%`,
    `Disagreement style: ${profile.disagreementStyle}`,
    `Natural fillers: ${profile.fillers.join(", ") || "none known"}`,
    "",
    "Important: imitate patterns, not quirks mechanically. Never insert a filler just because it exists in the profile. Use it only when the conversational context suggests the person naturally would.",
  ].join("\n");
}
