import { ref } from 'vue'

export interface LlmResponse {
  text: string
  timestamp: number
}

export function useLlmService() {
  const isLoading = ref(false)
  const lastResponse = ref<LlmResponse | null>(null)
  const error = ref<string | null>(null)

  const sendPrompt = async (prompt: string): Promise<LlmResponse> => {
    isLoading.value = true
    error.value = null

    try {
      // TODO: Implement actual LLM API call here
      // This is a placeholder implementation
      const response: LlmResponse = {
        text: 'Response from LLM' + prompt,
        timestamp: Date.now(),
      }

      lastResponse.value = response
      return response
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unknown error occurred'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  const clearLastResponse = () => {
    lastResponse.value = null
  }

  return {
    // State
    isLoading,
    lastResponse,
    error,

    // Methods
    sendPrompt,
    clearLastResponse,
  }
}
