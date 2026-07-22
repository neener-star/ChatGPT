import type { AugustBehavior, Memory } from "./types";

export interface AugustResponse {
  response: string;
  behavior: Omit<AugustBehavior, "response">;
  memoryCandidates: Array<Pick<Memory, "type" | "content" | "importance" | "confidence" | "tags">>;
  beliefSignals: Array<{
    statement: string;
    direction: "supports" | "contradicts" | "updates";
    confidence: number;
  }>;
}

export const AUGUST_RESPONSE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    response: { type: "string" },
    behavior: {
      type: "object",
      additionalProperties: false,
      properties: {
        orbState: { type: "string", enum: ["idle", "listening", "thinking", "remembering", "uncertain", "disagreeing", "speaking"] },
        confidence: { type: "number", minimum: 0, maximum: 1 },
        emotionalIntensity: { type: "number", minimum: 0, maximum: 1 },
        shouldDisagree: { type: "boolean" },
        shouldInterrupt: { type: "boolean" },
        hesitationMs: { type: "number", minimum: 0, maximum: 3000 },
        speechMarkers: { type: "array", items: { type: "string" } },
        reasoning: { type: "array", items: { type: "string" } }
      },
      required: ["orbState", "confidence", "emotionalIntensity", "shouldDisagree", "shouldInterrupt", "hesitationMs", "speechMarkers", "reasoning"]
    },
    memoryCandidates: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          type: { type: "string", enum: ["episodic", "semantic", "preference", "belief", "relationship"] },
          content: { type: "string" },
          importance: { type: "number", minimum: 0, maximum: 1 },
          confidence: { type: "number", minimum: 0, maximum: 1 },
          tags: { type: "array", items: { type: "string" } }
        },
        required: ["type", "content", "importance", "confidence", "tags"]
      }
    },
    beliefSignals: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          statement: { type: "string" },
          direction: { type: "string", enum: ["supports", "contradicts", "updates"] },
          confidence: { type: "number", minimum: 0, maximum: 1 }
        },
        required: ["statement", "direction", "confidence"]
      }
    }
  },
  required: ["response", "behavior", "memoryCandidates", "beliefSignals"]
} as const;
