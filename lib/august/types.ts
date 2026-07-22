export type OrbState =
  | "idle"
  | "listening"
  | "thinking"
  | "remembering"
  | "uncertain"
  | "disagreeing"
  | "speaking";

export type MemoryType = "episodic" | "semantic" | "preference" | "belief" | "relationship";

export interface Memory {
  id: string;
  type: MemoryType;
  content: string;
  importance: number;
  confidence: number;
  createdAt: string;
  lastAccessedAt?: string;
  source?: string;
  tags: string[];
}

export interface BeliefAnchor {
  id: string;
  statement: string;
  strength: number;
  confidence: number;
  evidenceCount: number;
  opennessToChange: number;
  status: "active" | "evolving" | "contradicted" | "uncertain";
  supportingMemoryIds: string[];
  contradictingMemoryIds: string[];
}

export interface PersonalityFingerprint {
  frequentWords: string[];
  avoidedWords: string[];
  sentenceLength: { average: number; variance: number };
  punctuation: Record<string, number>;
  fillers: string[];
  directness: number;
  humor: number;
  emotionalVolatility: number;
  disagreementStyle: "pivot" | "double_down" | "deflect" | "explain" | "mixed";
}

export interface AugustBehavior {
  response: string;
  orbState: OrbState;
  confidence: number;
  emotionalIntensity: number;
  shouldDisagree: boolean;
  shouldInterrupt: boolean;
  hesitationMs: number;
  speechMarkers: string[];
  reasoning: string[];
}
