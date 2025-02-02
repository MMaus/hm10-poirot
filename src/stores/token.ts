import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', {
  state: () => ({
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    setToken(newToken: string) {
      this.token = newToken
    },
    saveToken() {
      localStorage.setItem('token', this.token)
    }
  }
})
