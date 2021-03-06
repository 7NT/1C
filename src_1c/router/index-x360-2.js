import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from 'src/auth'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({
    y: 0
  }),
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth || auth.authenticated()) {
    // All is okay, let the route change continue
    next()
  } else {
    console.log('Not authenticated')
    // Cancel the route change and redirect back to the Home page
    next({
      path: '/home'
    })
  }
})

export default router
