import type { BeliefAnchor, Memory } from "./types";

export function detectBeliefConflict(message: string, beliefs: BeliefAnchor[]): BeliefAnchor[] {
  const normalized = message.toLowerCase();
  return beliefs.filter((belief) => {
    if (belief.status === "contradicted") return false;
    const terms = belief.statement.toLowerCase().split(/\W+/).filter((term) => term.length > 3);
    const overlap = terms.filter((term) => normalized.includes(term)).length;
    const explicitNegation = /\b(don't|do not|never|hate|can't stand|not anymore)\b/i.test(message);
    return overlap >= Math.max(1, Math.floor(terms.length * 0.25)) && explicitNegation;
  });
}

export function evolveBelief(
  belief: BeliefAnchor,
  supporting: Memory[],
  contradicting: Memory[]
): BeliefAnchor {
  const evidence = supporting.length + contradicting.length;
  if (!evidence) return belief;

  const supportRatio = supporting.length / evidence;
  const contradictionRatio = contradicting.length / evidence;
  const confidence = Math.max(0.05, Math.min(0.98, belief.confidence * 0.7 + supportRatio * 0.2 + (1 - contradictionRatio) * 0.1));

  return {
    ...belief,
    confidence,
    evidenceCount: belief.evidenceCount + evidence,
    status: contradictionRatio > 0.65 ? "evolving" : belief.status,
    opennessToChange: Math.max(belief.opennessToChange, contradictionRatio),
  };
}
