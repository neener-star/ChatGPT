import type { Memory } from "./types";

export function rankMemories(query: string, memories: Memory[], limit = 8): Memory[] {
  const terms = query.toLowerCase().split(/\W+/).filter(Boolean);
  return memories
    .map((memory) => {
      const haystack = `${memory.content} ${memory.tags.join(" ")}`.toLowerCase();
      const matches = terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0);
      return { memory, score: matches * 0.6 + memory.importance * 0.25 + memory.confidence * 0.15 };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.memory);
}

export function formatMemoryContext(memories: Memory[]): string {
  if (!memories.length) return "No relevant memories were retrieved.";
  return memories.map((memory) => `- [${memory.type}] ${memory.content} (confidence ${(memory.confidence * 100).toFixed(0)}%)`).join("\n");
}
