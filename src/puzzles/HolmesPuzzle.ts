import { Puzzle } from './Puzzle'

export class HolmesPuzzle extends Puzzle {
  getFirstResponse(): string {
    return "Hello, this is a puzzle with Sherlock Holmes"
  }
}
