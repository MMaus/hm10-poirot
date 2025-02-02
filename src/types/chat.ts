export interface ChatStep {
  id: string
  type: 'user' | 'llm'
  message: string
  timestamp: number
}
