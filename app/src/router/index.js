import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import NotFound from '@/components/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      alias: '/'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { auth: true }
    },

    // not found handler
    {
      path: '*',
      component: NotFound
    }
  ]
})
