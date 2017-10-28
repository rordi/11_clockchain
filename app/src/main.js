// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Notie from 'vue-notie'
import router from './router'
import { store } from './store'

Vue.config.productionTip = false

// moment.js
const moment = require('moment')
require('moment/locale/de')
Vue.use(require('vue-moment'), { moment })
Vue.use(Notie)

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  // delete any pending requests in store, as well as errors from previous requests
  store.commit('END_REQUEST')

  // scroll to top
  window.scrollTo(0, 0)
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
