import { acceptHMRUpdate, defineStore } from 'pinia'
import type { User } from '~/types/auth.ts'

export const useAuthStore = defineStore('auth', () => {
  const { loggedIn, user, session, clear, fetch } = useUserSession()
  const signIn = async (body: User) => {
    await $fetch('/api/auth/signin', {
      method: 'POST',
      body,
    })
    await fetch()
  }
  const signUp = async (body: User) => {
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body,
    })
    await fetch()
  }

  return {
    loggedIn,
    user,
    session,
    clear,
    fetch,
    signIn,
    signUp,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
