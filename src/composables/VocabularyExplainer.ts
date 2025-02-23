import { useTokenStore } from '@/stores/token'
import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * Returns a prompt for a short explanation of a word.
 *
 * @param word The word to be explained.
 * @returns A prompt for a short explanation of the word.
 */
const shortExplainerPrompt = (word: string) => `
Please give a brief, one sentence explanation of the word '${word}'.
Then, add a blank line, followed by a short example sentence in simple language using the word.
The example sentence should be prefixed with 'Example: '
`

const germanTranslationPrompt = (word: string) => `
Please give a list of the (or all common) German translations of the word '${word}'.
Respond with the translations only, separated by comma.
`

export function useVocabularyExplainer() {
  const tokenStore = useTokenStore()

  type ChipState = 'clear' | 'green' | 'yellow'
  const genAI = new GoogleGenerativeAI(tokenStore.token)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const explain = async (word: string, _useAI: boolean = true, state: ChipState = 'clear'): Promise<string> => {
    if (!_useAI) {
      return `You clicked on ${word} in status ${state}`
    }

    try {
      if (state === 'clear' || state === 'green') {

        const prompt = shortExplainerPrompt(word)
        const result = await model.generateContent(prompt)
        const response = await result.response
        return response.text()
      }
      if (state === 'yellow') {
        const prompt = germanTranslationPrompt(word)
        const result = await model.generateContent(prompt)
        const response = await result.response
        return response.text()
      }
    } catch (error) {
      console.error('Error explaining word:', error)
      return `Error explaining the word ${word}`
    }
    return ""
  }

  return {
    explain,
  }
}
