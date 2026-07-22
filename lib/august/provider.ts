import type { AugustResponse } from "./response-schema";

export interface AugustModelProvider {
  generate(input: { prompt: string; responseSchema: unknown }): Promise<AugustResponse>;
}

/**
 * The provider is selected at runtime. This keeps AUGUST's cognitive architecture
 * independent from a specific model vendor and makes local development possible
 * without exposing API keys to the browser.
 */
export function getConfiguredProvider(): AugustModelProvider | null {
  return null;
}
