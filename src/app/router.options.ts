import type { RouterOptions } from 'vue-router'

// https://router.vuejs.org/api/#routeroptions
export default <RouterOptions>{
  scrollBehavior: (to, from, savedPosition) => {
    const nuxtApp = useNuxtApp()

    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:finish', async () => {
        await nextTick()
        setTimeout(() => {
          if (savedPosition)
            resolve(savedPosition)

          resolve({ top: 0 })
        }, 150)
      })
    })
  },
}
