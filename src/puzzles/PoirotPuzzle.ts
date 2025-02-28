import { Puzzle } from './Puzzle'

export class PoirotPuzzle extends Puzzle {
  getFirstResponse(): string {
    return "Hello, this is a puzzle with Hercule Poirot"
  }
}
