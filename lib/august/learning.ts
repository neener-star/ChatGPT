import type { PersonalityFingerprint } from "./types";

export interface TrainingExample { original: string; correction: string; rating: "sounds_like_me" | "not_me" | "neutral"; }

const tokenize = (text: string) => text.toLowerCase().match(/[a-z']+/g) ?? [];

export function learnFromExample(current: PersonalityFingerprint, example: TrainingExample): PersonalityFingerprint {
  const words = tokenize(example.correction);
  const avoided = tokenize(example.original);
  const addUnique = (list: string[], values: string[]) => [...new Set([...list, ...values])].slice(-500);
  const correctionWeight = example.rating === "sounds_like_me" ? 1 : example.rating === "not_me" ? 0 : 0.5;

  return {
    ...current,
    frequentWords: addUnique(current.frequentWords, words.filter((w) => w.length > 3)),
    avoidedWords: addUnique(current.avoidedWords, avoided.filter((w) => w.length > 3 && correctionWeight < 0.5)),
    directness: Math.max(0, Math.min(1, current.directness + (example.correction.length < 90 ? 0.02 : -0.01))),
  };
}
