export default defineNuxtRouteMiddleware((to, from) => {
  const sessionStore = useSessionStore()

  if (to.path !== '/login' && !sessionStore.$state.authenticated) {
    return navigateTo('/login')
  }

  if (to.path === '/login' && sessionStore.$state.authenticated) {
    return navigateTo('/')
  }
})