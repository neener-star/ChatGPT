import type { AugustResponse } from "./response-schema";

export interface AugustModelProvider {
  generate(input: {
    prompt: string;
    responseSchema: unknown;
  }): Promise<AugustResponse>;
}

export function getConfiguredProvider(): AugustModelProvider | null {
  // Provider adapters will be plugged in here. Keeping this boundary means
  // AUGUST's memory and personality architecture stays independent of the model vendor.
  return null;
}
