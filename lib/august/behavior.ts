import type { AugustBehavior, BeliefAnchor, Memory, PersonalityFingerprint } from "./types";

interface BehaviorInput {
  userMessage: string;
  memories: Memory[];
  beliefs: BeliefAnchor[];
  personality: PersonalityFingerprint;
}

/**
 * A deterministic first layer for AUGUST's human behavior.
 * The language model will eventually make the nuanced decision, while this
 * layer supplies stable signals for the UI, voice, and orb.
 */
export function inferBehavior(input: BehaviorInput): Omit<AugustBehavior, "response"> {
  const lower = input.userMessage.toLowerCase();
  const contradiction = input.beliefs.some((belief) => {
    const positive = belief.statement.toLowerCase();
    return positive.includes("likes") && (lower.includes("hate") || lower.includes("don't like"));
  });

  const uncertainty = /\b(maybe|probably|i guess|not sure|idk|i don't know)\b/i.test(lower);
  const emotionalIntensity = Math.min(
    1,
    0.25 + (/[!?]{2,}/.test(input.userMessage) ? 0.25 : 0) +
      (input.userMessage === input.userMessage.toUpperCase() && input.userMessage.length > 8 ? 0.35 : 0)
  );

  return {
    orbState: contradiction ? "disagreeing" : uncertainty ? "uncertain" : "thinking",
    confidence: contradiction ? 0.76 : uncertainty ? 0.52 : 0.7,
    emotionalIntensity,
    shouldDisagree: contradiction,
    shouldInterrupt: false,
    hesitationMs: uncertainty ? 500 : 180,
    speechMarkers: uncertainty ? ["hmm"] : [],
    reasoning: [
      contradiction ? "Possible conflict with a stored belief." : "No strong belief conflict detected.",
      uncertainty ? "User language contains uncertainty markers." : "User language is relatively decisive.",
      `Retrieved ${input.memories.length} relevant memories.`,
    ],
  };
}
