import type { BeliefAnchor, Memory, PersonalityFingerprint } from "./types";
import { promises as fs } from "node:fs";
import path from "node:path";

export interface AugustDatabase {
  memories: Memory[];
  beliefs: BeliefAnchor[];
  personality: PersonalityFingerprint;
  updatedAt: string;
}

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "august-memory.json");

const emptyDatabase = (): AugustDatabase => ({
  memories: [],
  beliefs: [],
  personality: {
    frequentWords: [], avoidedWords: [], sentenceLength: { average: 0, variance: 0 },
    punctuation: {}, fillers: [], directness: 0.5, humor: 0.5,
    emotionalVolatility: 0.5, disagreementStyle: "mixed",
  },
  updatedAt: new Date().toISOString(),
});

export async function loadAugustDatabase(): Promise<AugustDatabase> {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    return JSON.parse(raw) as AugustDatabase;
  } catch {
    return emptyDatabase();
  }
}

export async function saveAugustDatabase(database: AugustDatabase): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify({ ...database, updatedAt: new Date().toISOString() }, null, 2), "utf8");
}
