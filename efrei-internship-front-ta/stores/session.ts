import { defineStore } from 'pinia'

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
}

export const useSessionStore = defineStore('session', {
  state: () => ({
    user: {
      id: -1,
      email: '',
      firstName: '',
      lastName: ''
    },
    isAuthenticated: false
  }),
  getters: {
    getUser(): User {
      return this.user
    },
    isAuthenticated(): boolean {
      return this.isAuthenticated
    }
  },
  actions: {
    login(user: User) {
      this.isAuthenticated = true
      this.user = user
    },
    logout() {
      this.isAuthenticated = false
      this.user = {
        id: -1,
        email: '',
        firstName: '',
        lastName: ''
      }
    }
  },
})