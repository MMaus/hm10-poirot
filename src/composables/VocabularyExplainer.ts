import { useTokenStore } from '@/stores/token'
import { GoogleGenerativeAI } from '@google/generative-ai'

export function useVocabularyExplainer() {
  const tokenStore = useTokenStore()

  const explain = async (word: string, _useAI: boolean = true): Promise<string> => {
    if (!_useAI) {
      return `This word means ${word}`
    }

    try {
      const genAI = new GoogleGenerativeAI(tokenStore.token)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

      const prompt = `Please explain the word ${word}`
      const result = await model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Error explaining word:', error)
      return `Error explaining the word ${word}`
    }
  }

  return {
    explain,
  }
}
