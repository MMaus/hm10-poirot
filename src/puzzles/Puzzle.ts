import type { LlmResponse } from '@/services/llmService'

export abstract class Puzzle {
  protected llmService: {
    sendPrompt: (prompt: string) => Promise<LlmResponse>
  }

  constructor(llmService: { sendPrompt: (prompt: string) => Promise<LlmResponse> }) {
    this.llmService = llmService
  }

  abstract getFirstResponse(): string
}
