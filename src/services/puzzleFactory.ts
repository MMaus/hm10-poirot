import type { Puzzle } from '@/puzzles/Puzzle'
import { MarplePuzzle } from '@/puzzles/MarplePuzzle'
import { PoirotPuzzle } from '@/puzzles/PoirotPuzzle'
import { HolmesPuzzle } from '@/puzzles/HolmesPuzzle'
import type { LlmResponse } from './llmService'

export function usePuzzleFactory() {
  const createPuzzle = (
    detective: string,
    llmService: { sendPrompt: (prompt: string) => Promise<LlmResponse> }
  ): Puzzle => {
    switch (detective.toLowerCase()) {
      case 'miss marple':
        return new MarplePuzzle(llmService)
      case 'hercule poirot':
        return new PoirotPuzzle(llmService)
      case 'sherlock holmes':
        return new HolmesPuzzle(llmService)
      default:
        throw new Error(`Unknown detective: ${detective}`)
    }
  }

  return {
    createPuzzle
  }
}
