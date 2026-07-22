import type { AugustResponse } from "./response-schema";
import { getLocalProvider } from "./local-provider";

export interface AugustModelProvider {
  generate(input: { prompt: string; responseSchema: unknown }): Promise<AugustResponse>;
}

export function getConfiguredProvider(): AugustModelProvider | null {
  if (process.env.AUGUST_PROVIDER === "ollama") return getLocalProvider();
  return null;
}
