import { defineStore } from 'pinia'

interface User {
  id: number
  email: string
  firstname: string
  lastname: string
}

export const useSessionStore = defineStore('studentSession', {
  state: () => ({
    user: {
      id: -1,
      email: '',
      firstname: '',
      lastname: ''
    },
    authenticated: false,
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
      this.authenticated = true
      this.user = user
    },
    logout() {
      this.authenticated = false
      this.user = {
        id: -1,
        email: '',
        firstname: '',
        lastname: ''
      }
    }
  },
  persist: true
})

export type { User as UserType }