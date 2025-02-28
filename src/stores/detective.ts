import { defineStore } from 'pinia'

export type Detective = 'Miss Marple' | 'Poirot' | 'Sherlock Holmes'

export const useDetectiveStore = defineStore('detective', {
  state: () => ({
    selectedDetective: 'Poirot' as Detective
  }),
  actions: {
    setDetective(detective: Detective) {
      this.selectedDetective = detective
    }
  }
})
