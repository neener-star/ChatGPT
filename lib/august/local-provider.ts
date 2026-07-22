import type { AugustModelProvider } from "./provider";
import type { AugustResponse } from "./response-schema";

export class OllamaProvider implements AugustModelProvider {
  constructor(
    private readonly baseUrl = process.env.OLLAMA_BASE_URL ?? "http://127.0.0.1:11434",
    private readonly model = process.env.OLLAMA_MODEL ?? "llama3.2"
  ) {}

  async generate(input: { prompt: string; responseSchema: unknown }): Promise<AugustResponse> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.model,
        stream: false,
        format: input.responseSchema,
        messages: [{ role: "user", content: input.prompt }],
        options: { temperature: 0.8 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Local AUGUST model returned ${response.status}.`);
    }

    const data = await response.json();
    return JSON.parse(data.message?.content ?? "{}");
  }
}

export function getLocalProvider(): OllamaProvider {
  return new OllamaProvider();
}
