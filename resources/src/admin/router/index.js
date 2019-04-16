/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

// Routes
import paths from './paths'

function route(path, view, name) {
  return {
    name: name || view,
    path,
    component: (resovle) => import(
      `admin/views/${view}.vue`
      ).then(resovle)
  }
}

Vue.use(VueRouter)

// Create a new router
const router = new VueRouter({
  mode: 'history',
  routes: paths.map(path => route(path.path, path.view, path.name)).concat([
    {path: '*', redirect: '/dashboard'}
  ]),
  base: '/admin/',
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

Vue.use(Meta)

export default router
